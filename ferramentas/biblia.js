/* =========================================================
   Bíblia Almeida Corrigida Fiel (domínio público) — consulta offline.
   Ferramenta de AUTORIA/VERIFICAÇÃO do banco de perguntas.
   O jogo NÃO depende deste arquivo: ele só roda na hora de criar
   ou conferir perguntas.

   Como módulo:
     const B = require("./ferramentas/biblia");
     B.verso("João 3:16")        -> { ok, livro, texto }
     B.busca("João", "cordeiro") -> [ { ref, texto }, ... ]

   Como CLI (a partir da raiz do projeto):
     node ferramentas/biblia.js verso "João 3:16"
     node ferramentas/biblia.js verso "João 3:1-2"
     node ferramentas/biblia.js texto "Obadias"        (livro inteiro)
     node ferramentas/biblia.js texto "João" 3         (só o capítulo 3)
     node ferramentas/biblia.js busca "João" "cordeiro"
     node ferramentas/biblia.js livros
   ========================================================= */
const fs = require("fs");
const path = require("path");

const LIVROS = JSON.parse(
    fs.readFileSync(path.join(__dirname, "biblia-acf.json"), "utf8")
);

const norm = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/\s+/g, " ").trim();

/* Nomes usados no jogo -> nomes da ACF. Sem isto, "Cantares de Salomão"
   e "Lamentações" não são encontrados. */
const ALIAS = {
    "cantares de salomao": "Cânticos", "cantares": "Cânticos",
    "canticos dos canticos": "Cânticos",
    "lamentacoes": "Lamentações de Jeremias",
    "lamentacoes de jeremias": "Lamentações de Jeremias",
    "oseias": "Oséias",
    "miqueias": "Miquéias"
};

function acharLivro(nome) {
    const n = norm(nome);
    const alvo = ALIAS[n] ? norm(ALIAS[n]) : n;
    return LIVROS.find(b => norm(b.name) === alvo) || null;
}

/* Aceita "João 3:16" e intervalos "João 3:1-2".
   Devolve { ok:false, erro } quando a referência não existe — é este
   retorno que impede uma referência inventada de entrar no banco. */
function verso(ref) {
    const m = String(ref).match(/^\s*(.+?)\s+(\d+)\s*:\s*(\d+)(?:\s*-\s*(\d+))?\s*$/);
    if (!m) return { ok: false, erro: `formato não é versículo: "${ref}"` };

    const livro = acharLivro(m[1]);
    if (!livro) return { ok: false, erro: `livro inexistente: "${m[1]}"` };

    const cap = livro.chapters[+m[2] - 1];
    if (!cap) return { ok: false, erro: `${livro.name} não tem capítulo ${m[2]} (tem ${livro.chapters.length})` };

    const ini = +m[3];
    const fim = m[4] ? +m[4] : ini;
    if (!cap[ini - 1]) return { ok: false, erro: `${livro.name} ${m[2]} não tem versículo ${ini} (tem ${cap.length})` };
    if (!cap[fim - 1]) return { ok: false, erro: `${livro.name} ${m[2]} não tem versículo ${fim} (tem ${cap.length})` };

    return { ok: true, livro: livro.name, texto: cap.slice(ini - 1, fim).join(" ") };
}

function busca(nomeLivro, termo) {
    const livro = acharLivro(nomeLivro);
    if (!livro) return [];
    const alvo = norm(termo);
    const achados = [];
    livro.chapters.forEach((cap, ci) => cap.forEach((v, vi) => {
        if (norm(v).includes(alvo)) achados.push({ ref: `${livro.name} ${ci + 1}:${vi + 1}`, texto: v });
    }));
    return achados;
}

function texto(nomeLivro, capitulo) {
    const livro = acharLivro(nomeLivro);
    if (!livro) return null;
    const caps = capitulo
        ? [[+capitulo, livro.chapters[+capitulo - 1]]]
        : livro.chapters.map((c, i) => [i + 1, c]);
    const linhas = [];
    for (const [n, cap] of caps) {
        if (!cap) continue;
        cap.forEach((v, i) => linhas.push(`${livro.name} ${n}:${i + 1}  ${v}`));
    }
    return linhas.join("\n");
}

module.exports = { verso, busca, texto, acharLivro, LIVROS };

/* ---------------- CLI ---------------- */
if (require.main === module) {
    const [cmd, a, b] = process.argv.slice(2);
    if (cmd === "verso") {
        const r = verso(a);
        console.log(r.ok ? `${a}\n${r.texto}` : `ERRO: ${r.erro}`);
        process.exit(r.ok ? 0 : 1);
    } else if (cmd === "texto") {
        const t = texto(a, b);
        if (t === null) { console.log(`ERRO: livro inexistente: "${a}"`); process.exit(1); }
        console.log(t);
    } else if (cmd === "busca") {
        const r = busca(a, b);
        if (!r.length) console.log(`nada encontrado para "${b}" em ${a}`);
        r.forEach(x => console.log(`${x.ref}  ${x.texto}`));
    } else if (cmd === "livros") {
        LIVROS.forEach(b => console.log(`${b.name} (${b.chapters.length} cap.)`));
    } else {
        console.log("uso: verso <ref> | texto <livro> [cap] | busca <livro> <termo> | livros");
        process.exit(1);
    }
}
