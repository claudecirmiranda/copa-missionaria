/* =========================================================
   Confere um lote de perguntas contra a Bíblia ACF e contra
   o padrão do jogo. É a checagem que NÃO depende de julgamento
   de modelo: ou a referência existe, ou não existe.

   Uso:
     node ferramentas/verificar-lote.js perguntas.js      (audita o banco do jogo)
     node ferramentas/verificar-lote.js <lote.json>       (audita um lote novo)
     node ferramentas/verificar-lote.js <arquivo> --verboso

   Um lote .json deve ser um array de:
     { gols, pergunta, resposta, referencia }

   Sai com código 1 se alguma pergunta tiver REFERÊNCIA INVÁLIDA
   (o único erro que nunca pode passar).
   ========================================================= */
const fs = require("fs");
const path = require("path");
const B = require("./biblia");

const arq = process.argv[2];
const verboso = process.argv.includes("--verboso");
if (!arq) { console.log("uso: node ferramentas/verificar-lote.js <arquivo.json> [--verboso]"); process.exit(1); }

/* Auditar o próprio banco (perguntas.js) e conferir um lote novo são a
   mesma checagem — muda só de onde vêm as perguntas e contra o que se
   compara para achar repetição. */
const auditandoBanco = /perguntas\.js$/i.test(arq);

function carregarBanco(caminho) {
    const sb = {};
    new Function("c", fs.readFileSync(caminho, "utf8") + "\nc.p = perguntas;")(sb);
    // as chaves 1..4 do banco são o valor em gols
    return Object.entries(sb.p).flatMap(([gols, arr]) => arr.map(q => ({ gols: +gols, ...q })));
}

const lote = auditandoBanco
    ? carregarBanco(arq)
    : JSON.parse(fs.readFileSync(arq, "utf8"));

// Para um lote novo, "repetida" = já está no jogo. Auditando o próprio
// banco, essa comparação seria contra si mesmo e acusaria tudo.
const jaExistem = auditandoBanco
    ? new Set()
    : new Set(carregarBanco(path.join(__dirname, "..", "perguntas.js")).map(q => q.pergunta.trim().toLowerCase()));

const norm = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const graves = [];   // impedem o lote de entrar no jogo
const avisos = [];   // pedem olho humano, não bloqueiam
const vistas = new Set();

lote.forEach((q, i) => {
    const id = `#${i + 1} "${q.pergunta}"`;

    const v = B.verso(q.referencia);
    if (!v.ok) graves.push(`${id}\n     REFERÊNCIA INVÁLIDA: ${v.erro}`);

    if (![1, 2, 3, 4].includes(q.gols)) graves.push(`${id}\n     gols inválido: ${q.gols}`);
    if (!q.pergunta || !q.resposta) graves.push(`${id}\n     campo vazio`);

    const k = norm(q.pergunta).trim();
    if (jaExistem.has(q.pergunta.trim().toLowerCase())) graves.push(`${id}\n     repete uma pergunta que já está no jogo`);
    if (vistas.has(k)) graves.push(`${id}\n     repetida dentro do próprio lote`);
    vistas.add(k);

    // avisos: a resposta aparecer literal no versículo é só uma pista.
    // "Cinco" x "cinco pães" passa; "5" x "cinco pães" não — daí ser aviso.
    if (v.ok) {
        const r = norm(q.resposta).replace(/^(dos?|das?|o|a|as|os)\s+/, "");
        if (!norm(v.texto).includes(r)) avisos.push(`${id}\n     resposta não aparece literal em ${q.referencia} — conferir\n     versículo: ${v.texto.slice(0, 120)}`);
    }
    if (q.resposta && q.resposta.length > 15) avisos.push(`${id}\n     resposta com ${q.resposta.length} chars (alvo: até 15)`);

    if (verboso && v.ok) {
        console.log(`${id}\n     R: ${q.resposta}  [${q.gols} gol]\n     ${q.referencia}: ${v.texto.slice(0, 110)}\n`);
    }
});

// distribuição por dificuldade e por livro
const porGols = {}; lote.forEach(q => porGols[q.gols] = (porGols[q.gols] || 0) + 1);
const porLivro = {};
lote.forEach(q => {
    const m = String(q.referencia).match(/^(.+?)\s+\d+:/);
    const l = m ? m[1] : "?";
    porLivro[l] = (porLivro[l] || 0) + 1;
});

console.log("=".repeat(64));
console.log(`Perguntas no lote : ${lote.length}`);
console.log(`Livros cobertos   : ${Object.keys(porLivro).length}`);
console.log(`Por dificuldade   : ${JSON.stringify(porGols)}`);
const tam = lote.map(q => (q.resposta || "").length);
console.log(`Resposta média    : ${Math.round(tam.reduce((a, b) => a + b, 0) / (tam.length || 1))} chars (as 38 originais: 10)`);
console.log("");
console.log(`ERROS GRAVES      : ${graves.length}`);
graves.forEach(g => console.log("  !! " + g));
console.log("");
console.log(`AVISOS (revisar)  : ${avisos.length}`);
avisos.forEach(a => console.log("  ?  " + a));

process.exit(graves.length ? 1 : 0);
