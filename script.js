/* =========================================================
   COPA MISSIONÁRIA DAS NAÇÕES — Game Show para EBF
   script.js
   ========================================================= */

"use strict";

/* =========================================================
   1. DADOS PADRÃO (equipes e bandeiras)
   ========================================================= */

// Paleta de bandeiras disponíveis no seletor de equipes
const BANDEIRAS = [
    { n:"Brasil", b:"🇧🇷" },   { n:"Japão", b:"🇯🇵" },     { n:"Itália", b:"🇮🇹" },
    { n:"Quênia", b:"🇰🇪" },   { n:"Índia", b:"🇮🇳" },     { n:"México", b:"🇲🇽" },
    { n:"Portugal", b:"🇵🇹" }, { n:"Coreia do Sul", b:"🇰🇷" }, { n:"Nigéria", b:"🇳🇬" },
    { n:"Argentina", b:"🇦🇷" },{ n:"China", b:"🇨🇳" },     { n:"Egito", b:"🇪🇬" },
    { n:"Peru", b:"🇵🇪" },     { n:"Alemanha", b:"🇩🇪" },  { n:"França", b:"🇫🇷" },
    { n:"Angola", b:"🇦🇴" },   { n:"Espanha", b:"🇪🇸" },   { n:"Chile", b:"🇨🇱" },
    { n:"Estados Unidos", b:"🇺🇸" }, { n:"Moçambique", b:"🇲🇿" }, { n:"Israel", b:"🇮🇱" },
    { n:"Colômbia", b:"🇨🇴" }, { n:"Filipinas", b:"🇵🇭" }, { n:"Indonésia", b:"🇮🇩" }
];

// Equipes padrão (usadas até 16 times)
const TIMES_PADRAO = BANDEIRAS.slice(0, 16).map(t => ({ nome:t.n, band:t.b }));

const TEMPO_PADRAO = 30; // segundos por pergunta
const CHAVE = "copa_missionaria_estado_v1";

/* =========================================================
   2. ESTADO
   ========================================================= */

let estado = {
    numTimes: 8,
    times: [],        // [{nome, band}] na ordem sorteada
    rodadas: [],      // [ [ {a,b,sa,sb,venc} ] ]  a/b = índice em times ou null
    atual: { r:0, j:0 },
    vez: "a",         // equipe que está respondendo agora (revezamento)
    modoCard: false,  // true = cards visuais impressos (crianças < 6 anos)
    somOn: true,
    vozOn: true
};

/* Fases do turno:
   aguardando  → ninguém respondendo, líder sorteia a pergunta da vez
   respondendo → pergunta na tela, cronômetro correndo
   julgando    → resposta revelada, cronômetro parado, líder marca acertou/errou */
let fase = "aguardando";

let perguntaAtual = null;
let modificador = null;   // {tipo, mult, valorFixo, texto}

let tempo = TEMPO_PADRAO;
let timer = null;
let rodando = false;

// Narrações de erro (o clássico "quase gol" de estádio)
const FRASES_ERRO = [
    "🥅 Na trave!",
    "😮 Pra fora!",
    "🧤 Defesa do goleiro!",
    "😅 Passou raspando!",
    "🙈 Por cima do travessão!"
];

/* =========================================================
   3. ATALHOS DE ELEMENTOS
   ========================================================= */

const $ = id => document.getElementById(id);

const telas = {
    setup:   $("tela-setup"),
    jogo:    $("tela-jogo"),
    chave:   $("tela-chave"),
    campeao: $("tela-campeao")
};

/* =========================================================
   4. MOTOR DE ÁUDIO (Web Audio — sem arquivos)
   ========================================================= */

let audioCtx = null;
function ctx(){
    if(!audioCtx){
        const AC = window.AudioContext || window.webkitAudioContext;
        if(AC) audioCtx = new AC();
    }
    if(audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
}

function envelope(gain, t0, ataque, sustain, release, pico){
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(pico, t0 + ataque);
    gain.gain.setValueAtTime(pico, t0 + ataque + sustain);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + ataque + sustain + release);
}

// Apito de árbitro
function somApito(longo){
    const c = ctx(); if(!c || !estado.somOn) return;
    const t0 = c.currentTime;
    const dur = longo ? 0.9 : 0.35;
    const osc = c.createOscillator();
    const lfo = c.createOscillator();
    const lfoGain = c.createGain();
    const g = c.createGain();
    osc.type = "triangle";
    osc.frequency.value = 2100;
    lfo.type = "sine"; lfo.frequency.value = 22; lfoGain.gain.value = 120;
    lfo.connect(lfoGain).connect(osc.frequency);
    envelope(g, t0, 0.02, dur - 0.1, 0.08, 0.35);
    osc.connect(g).connect(c.destination);
    osc.start(t0); lfo.start(t0);
    osc.stop(t0 + dur); lfo.stop(t0 + dur);
}

// Trombeta de gol (estádio)
function somGol(){
    const c = ctx(); if(!c || !estado.somOn) return;
    const t0 = c.currentTime;
    [220, 277, 330].forEach((f, i) => {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(f, t0);
        osc.frequency.linearRampToValueAtTime(f * 1.02, t0 + 1.1);
        envelope(g, t0, 0.05, 0.9, 0.35, 0.18 - i*0.03);
        osc.connect(g).connect(c.destination);
        osc.start(t0); osc.stop(t0 + 1.4);
    });
    somTorcida();
}

// Torcida (ruído filtrado com "onda")
function somTorcida(){
    const c = ctx(); if(!c || !estado.somOn) return;
    const t0 = c.currentTime;
    const dur = 2.2;
    const buffer = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i] = (Math.random()*2-1) * 0.6;
    const src = c.createBufferSource(); src.buffer = buffer;
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 900; bp.Q.value = 0.7;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.5);
    g.gain.setValueAtTime(0.25, t0 + 1.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(bp).connect(g).connect(c.destination);
    src.start(t0); src.stop(t0 + dur);
}

// Fanfarra de campeão
function somFanfarra(){
    const c = ctx(); if(!c || !estado.somOn) return;
    const t0 = c.currentTime;
    const notas = [523.25, 659.25, 783.99, 1046.5]; // C E G C
    notas.forEach((f, i) => {
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = "square";
        osc.frequency.value = f;
        const start = t0 + i*0.16;
        envelope(g, start, 0.02, i===3 ? 0.6 : 0.14, 0.2, 0.16);
        osc.connect(g).connect(c.destination);
        osc.start(start); osc.stop(start + 1);
    });
    setTimeout(somTorcida, 300);
}

/* =========================================================
   5. NARRAÇÃO (voz pt-BR do navegador)
   ========================================================= */

let vozes = [];
function carregarVozes(){
    if(!("speechSynthesis" in window)) return;
    vozes = speechSynthesis.getVoices();
}
if("speechSynthesis" in window){
    carregarVozes();
    speechSynthesis.onvoiceschanged = carregarVozes;
}
function melhorVozPT(){
    if(!vozes.length) carregarVozes();
    return vozes.find(v => /pt[-_]?BR/i.test(v.lang))
        || vozes.find(v => /^pt/i.test(v.lang))
        || null;
}
function narrar(texto, empolgado){
    if(!estado.vozOn || !("speechSynthesis" in window)) return;
    try { speechSynthesis.cancel(); } catch(e){}
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "pt-BR";
    u.rate = empolgado ? 1.08 : 1;
    u.pitch = empolgado ? 1.15 : 1;
    u.volume = 1;
    const v = melhorVozPT();
    if(v) u.voice = v;
    speechSynthesis.speak(u);
}

/* =========================================================
   6. TOAST (aviso rápido na tela)
   ========================================================= */

function toast(msg, cor){
    const t = document.createElement("div");
    t.textContent = msg;
    // Fica no topo (o rodapé é do Painel do Líder, usado a cada turno) e
    // pointer-events:none para nunca roubar o clique de um botão embaixo.
    t.style.cssText =
        "position:fixed;left:50%;top:76px;transform:translateX(-50%);z-index:9999;" +
        "pointer-events:none;" +
        "background:" + (cor || "#0f4fa8") + ";color:#fff;font-weight:800;font-size:1.1rem;" +
        "padding:14px 26px;border-radius:16px;box-shadow:0 12px 30px rgba(0,0,0,.4);" +
        "max-width:90vw;text-align:center;animation:fadeTela .3s;";
    document.body.appendChild(t);
    setTimeout(() => { t.style.transition = "opacity .4s"; t.style.opacity = "0"; }, 2600);
    setTimeout(() => t.remove(), 3100);
}

/* =========================================================
   7. NAVEGAÇÃO ENTRE TELAS
   ========================================================= */

function mostrarTela(nome){
    Object.values(telas).forEach(t => t.classList.add("hidden"));
    telas[nome].classList.remove("hidden");
    window.scrollTo(0, 0);
}

/* =========================================================
   8. TELA DE CONFIGURAÇÃO (SETUP)
   ========================================================= */

function opcoesBandeira(sel){
    return BANDEIRAS.map(t =>
        `<option value="${t.b}" ${t.b===sel ? "selected":""}>${t.b} ${t.n}</option>`
    ).join("");
}

function garantirTimes(n){
    // Preenche/ajusta estado.times para ter n equipes, preservando edições
    for(let i=0;i<n;i++){
        if(!estado.times[i]){
            const p = TIMES_PADRAO[i] || { nome:"Equipe "+(i+1), band:"🏳️" };
            estado.times[i] = { nome:p.nome, band:p.band };
        }
    }
    estado.times.length = n;
}

function renderSetup(){
    garantirTimes(estado.numTimes);

    // botões de quantidade
    document.querySelectorAll("#escolha-times button").forEach(b => {
        b.classList.toggle("ativo", Number(b.dataset.n) === estado.numTimes);
    });

    aplicarModoCard();

    const grid = $("grid-times");
    grid.innerHTML = estado.times.map((t, i) => `
        <div class="time-linha">
            <span class="num">${i+1}</span>
            <span class="preview-band" data-i="${i}" title="Prévia da bandeira">${flagHTML(t.band)}</span>
            <select data-i="${i}" class="sel-band">${opcoesBandeira(t.band)}</select>
            <input data-i="${i}" class="inp-nome" value="${t.nome.replace(/"/g,'&quot;')}" maxlength="20">
        </div>
    `).join("");

    grid.querySelectorAll(".sel-band").forEach(s => {
        s.onchange = () => {
            const i = Number(s.dataset.i);
            estado.times[i].band = s.value;
            const prev = grid.querySelector(`.preview-band[data-i="${i}"]`);
            if(prev) prev.innerHTML = flagHTML(s.value);
            const nome = BANDEIRAS.find(x => x.b === s.value);
            // se o nome ainda for o padrão, atualiza junto
            const inp = grid.querySelector(`.inp-nome[data-i="${i}"]`);
            if(nome && (inp.value === TIMES_PADRAO[i]?.nome || inp.value.trim()==="")){
                inp.value = nome.n; estado.times[i].nome = nome.n;
            }
        };
    });
    grid.querySelectorAll(".inp-nome").forEach(inp => {
        inp.oninput = () => { estado.times[Number(inp.dataset.i)].nome = inp.value; };
    });
}

document.querySelectorAll("#escolha-times button").forEach(b => {
    b.onclick = () => { estado.numTimes = Number(b.dataset.n); renderSetup(); };
});

/* Modo Card Visual — para crianças menores de 6 anos.
   O card com a pergunta é físico (impresso) e os pais ajudam; o app
   mostra só os botões Acertou/Errou e continua cronometrando. */
function aplicarModoCard(){
    const rotulo = estado.modoCard ? "ON" : "OFF";
    const bs = $("btn-modo-card-setup");
    const bj = $("btn-modo-card");
    if(bs){
        bs.textContent = `🧸 Modo Card Visual: ${rotulo}`;
        bs.classList.toggle("ligado", estado.modoCard);
    }
    if(bj) bj.textContent = `🧸 Card: ${rotulo}`;
    document.body.classList.toggle("modo-card", estado.modoCard);
}

function alternarModoCard(){
    estado.modoCard = !estado.modoCard;
    aplicarModoCard();
    salvar();
    if(!telas.jogo.classList.contains("hidden")){
        // troca de modo no meio do jogo: recomeça o turno da equipe da vez
        prepararTurno();
    }
    toast(estado.modoCard
        ? "🧸 Modo Card Visual ligado — use os cards impressos."
        : "📖 Modo normal — perguntas na tela.", "#1666c9");
}

$("btn-modo-card-setup").onclick = alternarModoCard;
$("btn-modo-card").onclick = alternarModoCard;

$("btn-iniciar").onclick = () => {
    garantirTimes(estado.numTimes);
    // valida nomes vazios
    estado.times.forEach((t,i) => { if(!t.nome.trim()) t.nome = "Equipe "+(i+1); });
    gerarChave();
    zerarHistorico(); // campeonato novo → todas as perguntas disponíveis
    estado.atual = { r:0, j:0 };
    ctx(); // "acorda" o áudio no primeiro gesto do usuário
    salvar();
    mostrarTela("jogo");
    carregarPartida();
    somApito(false);
    setTimeout(() => {
        const p = getPartida();
        narrar(`Começa a partida! ${nomeTime(p.a)} contra ${nomeTime(p.b)}.`);
    }, 400);
};

/* =========================================================
   9. GERAÇÃO E LÓGICA DO CHAVEAMENTO
   ========================================================= */

function gerarChave(){
    const n = estado.numTimes;
    const rodadas = [];
    // Rodada 0: pares na ordem definida
    const primeira = [];
    for(let i=0;i<n;i+=2){
        primeira.push({ a:i, b:i+1, sa:0, sb:0, venc:null });
    }
    rodadas.push(primeira);
    // Rodadas seguintes até a final
    let qtd = primeira.length;
    while(qtd > 1){
        qtd = qtd / 2;
        const rodada = [];
        for(let i=0;i<qtd;i++) rodada.push({ a:null, b:null, sa:0, sb:0, venc:null });
        rodadas.push(rodada);
    }
    estado.rodadas = rodadas;
}

function nomeFase(r){
    const jogos = estado.rodadas[r].length;
    if(jogos === 1) return "Final";
    if(jogos === 2) return "Semifinal";
    if(jogos === 4) return "Quartas de Final";
    if(jogos === 8) return "Oitavas de Final";
    if(jogos === 16) return "Fase de 32";
    return "Rodada " + (r+1);
}

function getPartida(){ return estado.rodadas[estado.atual.r][estado.atual.j]; }
function nomeTime(i){ return i==null ? "A definir" : estado.times[i].nome; }
function bandTime(i){ return i==null ? "🏳️" : estado.times[i].band; }

// HTML da bandeira: usa img/bandeiras/<emoji>.png; se o arquivo não existir,
// o onerror substitui pela própria bandeira em emoji (funciona com a pasta incompleta).
function flagHTML(emoji){
    const src = "img/bandeiras/" + encodeURIComponent(emoji) + ".png";
    return `<img class="flag-img" src="${src}" alt="" onerror="this.outerHTML='${emoji}'">`;
}
function bandImg(i){
    if(i == null) return "🏳️";
    return flagHTML(estado.times[i].band);
}

// Encontra o próximo confronto jogável (com os dois times definidos e sem vencedor)
function proximaPartidaPendente(){
    for(let r=0;r<estado.rodadas.length;r++){
        for(let j=0;j<estado.rodadas[r].length;j++){
            const p = estado.rodadas[r][j];
            if(p.venc === null && p.a != null && p.b != null){
                return { r, j };
            }
        }
    }
    return null;
}

// Registra vencedor e propaga para a próxima rodada
function definirVencedor(lado){
    const { r, j } = estado.atual;
    const p = estado.rodadas[r][j];
    p.venc = lado;
    const vencedorIdx = lado === "a" ? p.a : p.b;

    if(r + 1 < estado.rodadas.length){
        const destino = estado.rodadas[r+1][Math.floor(j/2)];
        if(j % 2 === 0) destino.a = vencedorIdx;
        else destino.b = vencedorIdx;
    }
    salvar();

    // Final decidida?
    if(r === estado.rodadas.length - 1){
        mostrarCampeao(vencedorIdx);
        return;
    }
    const prox = proximaPartidaPendente();
    if(prox){
        estado.atual = prox;
        estado.vez = "a"; // nova partida sempre começa pela equipe da esquerda
        renderChave();
        mostrarTela("chave");
        setTimeout(() => {
            const np = getPartida();
            narrar(`Próximo confronto: ${nomeTime(np.a)} contra ${nomeTime(np.b)}, pela ${nomeFase(estado.atual.r)}.`);
        }, 500);
    }
}

/* =========================================================
   10. RENDER DA PARTIDA (TELA DE JOGO)
   ========================================================= */

function carregarPartida(){
    const p = getPartida();
    $("fase-nome").textContent = nomeFase(estado.atual.r);
    $("jogo-num").textContent = "Jogo " + (estado.atual.j + 1);
    $("band-a").innerHTML = bandImg(p.a);
    $("band-b").innerHTML = bandImg(p.b);
    $("nome-a").textContent = nomeTime(p.a);
    $("nome-b").textContent = nomeTime(p.b);
    $("placar-a").textContent = p.sa;
    $("placar-b").textContent = p.sb;
    if(estado.vez !== "a" && estado.vez !== "b") estado.vez = "a";
    modificador = null;
    atualizarVencendo();
    atualizarContador();
    prepararTurno();
}

/* =========================================================
   10.1 TURNO / REVEZAMENTO
   O gol é sempre da equipe da vez — não existe mais botão "GOL"
   em cada card; quem marca é quem estava respondendo.
   ========================================================= */

function timeDaVez(){
    const p = getPartida();
    return estado.vez === "a" ? p.a : p.b;
}

function nomeDaVez(){ return nomeTime(timeDaVez()); }

function passarVez(){
    estado.vez = estado.vez === "a" ? "b" : "a";
}

// Volta o turno ao início (aguardando sorteio) para a equipe da vez
function prepararTurno(){
    fase = "aguardando";
    perguntaAtual = null;
    $("resposta").classList.add("hidden");
    $("resposta").textContent = "";
    $("valor-pergunta").textContent = estado.modoCard ? "⚽ 1 Gol" : "?? Gols";
    resetarTempo();
    renderTurno();
    salvar();
}

function renderTurno(){
    const p = getPartida();
    const vezA = estado.vez === "a";

    $("card-a").classList.toggle("vez", vezA);
    $("card-b").classList.toggle("vez", !vezA);
    $("vez-nome").textContent = nomeDaVez();

    const sortear = $("sortear");
    const mostrar = $("mostrar-resposta");
    const acertou = $("btn-acertou");
    const errou   = $("btn-errou");

    // Visibilidade dos botões conforme a fase do turno
    sortear.classList.toggle("hidden", fase !== "aguardando");
    mostrar.classList.toggle("hidden", fase !== "respondendo");
    acertou.classList.toggle("hidden", fase !== "julgando");
    errou.classList.toggle("hidden", fase !== "julgando");

    // O <span> é obrigatório: .pergunta-texto é flex e descartaria os
    // espaços em volta do <strong>, colando as palavras.
    if(estado.modoCard){
        sortear.textContent = `▶ Começar a vez de ${nomeDaVez()}`;
        if(fase === "aguardando"){
            $("pergunta").innerHTML =
                `<span>🧸 <strong>Modo Card Visual</strong><br>Mostre o card impresso para ${nomeDaVez()} e clique em “Começar a vez”.</span>`;
        } else {
            $("pergunta").innerHTML =
                `<span>🧸 Card na mão de <strong>${nomeDaVez()}</strong> — os pais podem ajudar!</span>`;
        }
        return;
    }

    sortear.textContent = `🎲 Sortear Pergunta — ${nomeDaVez()}`;
    if(fase === "aguardando"){
        $("pergunta").textContent = `🎙️ Vez de ${nomeDaVez()} — clique em “Sortear Pergunta”.`;
    }
}

/* Controle de perguntas já feitas no campeonato (sem repetição) */
function totalPerguntas(){
    return Object.keys(perguntas).reduce((s,k) => s + perguntas[k].length, 0);
}
function usadasPerguntas(){
    return Object.keys(historico).reduce((s,k) => s + (historico[k] ? historico[k].length : 0), 0);
}
function atualizarContador(){
    const el = $("contador-perguntas");
    if(el) el.textContent = `🎯 Perguntas já feitas: ${usadasPerguntas()} de ${totalPerguntas()} (sem repetir)`;
}
function zerarHistorico(){
    Object.keys(historico).forEach(k => { historico[k] = []; });
}

function atualizarPlacar(){
    const p = getPartida();
    $("placar-a").textContent = p.sa;
    $("placar-b").textContent = p.sb;
    atualizarVencendo();
    salvar();
}

function atualizarVencendo(){
    const p = getPartida();
    $("card-a").classList.toggle("vencendo", p.sa > p.sb);
    $("card-b").classList.toggle("vencendo", p.sb > p.sa);
}

/* =========================================================
   11. PERGUNTAS
   ========================================================= */

$("sortear").onclick = () => {
    if(fase !== "aguardando") return;
    ctx();
    $("resposta").classList.add("hidden");
    $("resposta").textContent = "";

    if(estado.modoCard){
        // Card impresso: nada de pergunta na tela, vai direto para o julgamento
        perguntaAtual = null;
        fase = "julgando";
        $("valor-pergunta").textContent = "⚽ 1 Gol";
        narrar(`Vez de ${nomeDaVez()}. Valendo!`);
    } else {
        perguntaAtual = sortearPergunta();
        if(perguntaAtual.reiniciou){
            toast("🔄 Todas as perguntas já foram usadas — recomeçando o banco.", "#ef8a00");
        }
        fase = "respondendo";
        $("pergunta").textContent = perguntaAtual.pergunta;
        const g = perguntaAtual.gols;
        $("valor-pergunta").textContent = "⚽ ".repeat(g) + `(${g} Gol${g>1?"s":""})`;
        atualizarContador();
        narrar(`Pergunta para ${nomeDaVez()}. ${perguntaAtual.pergunta}`);
    }

    renderTurno();
    salvar();
    resetarTempo();
    iniciarTempo();
};

function mostrarRevelacao(resposta, referencia){
    const ov = $("reveal-overlay");
    ov.innerHTML = `
        <div class="reveal-card">
            <div class="rotulo">✅ RESPOSTA</div>
            <div class="resp">${resposta}</div>
            ${referencia ? `<div class="versiculo-grande">📖 <span>${referencia}</span></div>` : ``}
            <span class="fechar-dica">Clique em qualquer lugar para fechar</span>
        </div>`;
    ov.classList.remove("hidden");
}
function fecharRevelacao(){ $("reveal-overlay").classList.add("hidden"); }
$("reveal-overlay").onclick = fecharRevelacao;
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") fecharRevelacao();
});

/* Mostrar a resposta = a equipe já respondeu.
   O cronômetro para na hora e o líder decide: acertou ou errou. */
$("mostrar-resposta").onclick = () => {
    if(fase !== "respondendo" || !perguntaAtual){
        toast("Sorteie uma pergunta primeiro.", "#ef8a00");
        return;
    }
    pararTempo();
    fase = "julgando";
    const r = $("resposta");
    r.classList.remove("hidden");
    r.innerHTML = "<strong>Resposta:</strong> " + perguntaAtual.resposta
        + (perguntaAtual.referencia ? `<div class="ref">📖 ${perguntaAtual.referencia}</div>` : "");
    mostrarRevelacao(perguntaAtual.resposta, perguntaAtual.referencia);
    somApito(false);
    renderTurno();
};

/* =========================================================
   12. ACERTOU / ERROU — o gol é sempre da equipe da vez
   ========================================================= */

function valorDoGol(){
    let v = perguntaAtual ? perguntaAtual.gols : 1;
    if(modificador){
        if(modificador.valorFixo) v = modificador.valorFixo;
        if(modificador.mult) v *= modificador.mult;
    }
    return v;
}

function marcarGol(){
    const p = getPartida();
    const lado = estado.vez;
    const v = valorDoGol();
    if(lado === "a") p.sa += v; else p.sb += v;

    const el = lado === "a" ? $("placar-a") : $("placar-b");
    el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");

    atualizarPlacar();
    somGol();
    confeteBurst(30);
    narrar(`GOOOOOL${v>1?", "+v+" gols":""} do ${nomeDaVez()}!`, true);
    toast(`⚽ +${v} para ${nomeDaVez()}!`, "#159a43");
}

// Fim do turno: consome o modificador, passa a vez e prepara o próximo sorteio
function encerrarTurno(){
    modificador = null;
    pararTempo();
    passarVez();
    prepararTurno();
    setTimeout(() => narrar(`Agora é a vez de ${nomeDaVez()}.`), 2000);
}

$("btn-acertou").onclick = () => {
    if(fase !== "julgando") return;
    marcarGol();
    encerrarTurno();
};

$("btn-errou").onclick = () => {
    if(fase !== "julgando") return;
    const frase = FRASES_ERRO[Math.floor(Math.random()*FRASES_ERRO.length)];
    somApito(false);
    toast(`${frase} Sem gol para ${nomeDaVez()}.`, "#d32f2f");
    narrar(frase.replace(/[^\p{L}\s!]/gu, "").trim(), true);
    encerrarTurno();
};

$("btn-trocar-vez").onclick = () => {
    passarVez();
    prepararTurno();
    toast(`🔁 Vez de ${nomeDaVez()}.`, "#37455f");
};

$("btn-menos-a").onclick = () => { const p=getPartida(); if(p.sa>0){p.sa--; atualizarPlacar();} };
$("btn-menos-b").onclick = () => { const p=getPartida(); if(p.sb>0){p.sb--; atualizarPlacar();} };

/* =========================================================
   13. CARTAS ESPECIAIS
   ========================================================= */

const classesCarta = ["carta-ouro","carta-vermelha","carta-azul","carta-verde"];

function renderCartas(){
    const box = $("cartas");
    box.innerHTML = cartasEspeciais.map((c,i) =>
        `<button class="cartaEspecial ${classesCarta[i%4]}" data-i="${i}">
            ${c.nome}<small>${c.descricao}</small>
        </button>`
    ).join("");
    box.querySelectorAll(".cartaEspecial").forEach(btn => {
        btn.onclick = () => ativarCarta(Number(btn.dataset.i));
    });
}

function ativarCarta(i){
    const c = cartasEspeciais[i];
    // Efeito por índice (segue a ordem do perguntas.js)
    if(i === 0){ modificador = { mult:2, texto:c.nome }; toast("⚽⚽ Ativado! O próximo gol vale EM DOBRO.", "#f5b400"); }
    else if(i === 1){ modificador = { valorFixo:3, texto:c.nome }; toast("🥅 Pênalti Bíblico! Próximo gol vale 3.", "#d32f2f"); }
    else if(i === 3){ modificador = { valorFixo:4, texto:c.nome }; toast("⭐ Pergunta Ouro! Próximo gol vale 4.", "#159a43"); }
    else { // Ajuda da Equipe → +15s no cronômetro da vez
        if(fase === "aguardando"){
            toast("🙋 Sorteie a pergunta antes de pedir ajuda.", "#ef8a00");
            return;
        }
        tempo += 15;
        if(!rodando && fase === "respondendo") iniciarTempo();
        atualizarTempo(); toast("🙋 +15 segundos para a equipe!", "#1666c9");
    }
    somApito(false);
    narrar(c.nome);
}

/* =========================================================
   14. CRONÔMETRO + BARRA DE TEMPO
   ========================================================= */

function formatar(s){
    const m = Math.floor(s/60).toString().padStart(2,"0");
    const ss = Math.max(0,s%60).toString().padStart(2,"0");
    return m + ":" + ss;
}

function atualizarTempo(){
    $("cronometro").textContent = formatar(Math.max(0, tempo));
    const pct = Math.max(0, Math.min(100, (tempo / TEMPO_PADRAO) * 100));
    const barra = $("barra-tempo");
    barra.style.width = pct + "%";
    const urgente = tempo <= 10;
    $("cronometro").classList.toggle("urgente", urgente);
    barra.classList.toggle("urgente", urgente);
}

function iniciarTempo(){
    if(rodando) return;
    rodando = true;
    $("btn-tempo").textContent = "⏸";
    clearInterval(timer);
    timer = setInterval(() => {
        tempo--;
        atualizarTempo();
        if(tempo <= 0) esgotarTempo();
    }, 1000);
}

// Cronômetro zerou: a equipe perde a vez e a bola passa para a adversária
function esgotarTempo(){
    pararTempo();
    const quemPerdeu = nomeDaVez();
    somApito(true);
    toast(`⏱️ Tempo esgotado! ${quemPerdeu} perdeu a vez.`, "#d32f2f");
    narrar(`Tempo esgotado! ${quemPerdeu} perdeu a vez.`, true);
    encerrarTurno();
}

function pararTempo(){
    rodando = false;
    $("btn-tempo").textContent = "▶";
    clearInterval(timer);
}

function resetarTempo(){
    pararTempo();
    tempo = TEMPO_PADRAO;
    atualizarTempo();
}

$("btn-tempo").onclick = () => { rodando ? pararTempo() : iniciarTempo(); };
$("btn-tempo-reset").onclick = resetarTempo;

/* =========================================================
   15. ENCERRAR PARTIDA / PÊNALTIS
   ========================================================= */

$("btn-encerrar").onclick = () => {
    const p = getPartida();
    pararTempo();
    if(p.sa === p.sb){
        abrirPenaltis();
    } else {
        const lado = p.sa > p.sb ? "a" : "b";
        const idx = lado === "a" ? p.a : p.b;
        somApito(true);
        toast(`🏁 ${nomeTime(idx)} venceu a partida!`, "#159a43");
        confeteBurst(40);
        definirVencedor(lado);
    }
};

function abrirPenaltis(){
    const p = getPartida();
    somApito(true);
    narrar("Empate! Vamos para a disputa de pênaltis!");

    const pen = { a:[], b:[], vez:"a", pergunta:null, respVisivel:false };

    function golsPen(arr){ return arr.filter(x => x === "gol").length; }

    // Nova cobrança: sorteia uma pergunta e anuncia a equipe da vez
    // (no Modo Card a pergunta é o card impresso, então não sorteia nada)
    function novaCobranca(){
        pen.pergunta = estado.modoCard ? null : sortearPergunta();
        pen.respVisivel = false;
        atualizarContador();
        salvar();
        const idx = pen.vez === "a" ? p.a : p.b;
        narrar(`Cobrança de ${nomeTime(idx)}.`);
    }

    function decidido(){
        const ga = golsPen(pen.a), gb = golsPen(pen.b);
        const ra = Math.max(0, 5 - pen.a.length), rb = Math.max(0, 5 - pen.b.length);
        if(ga > gb + rb) return "a";
        if(gb > ga + ra) return "b";
        // após 5 cada (ou mais), se igual nº de cobranças e placar diferente → decidido
        if(pen.a.length >= 5 && pen.b.length >= 5 && pen.a.length === pen.b.length && ga !== gb){
            return ga > gb ? "a" : "b";
        }
        return null;
    }

    function marcadoresHTML(arr){
        let html = "";
        const total = Math.max(5, arr.length);
        for(let i=0;i<total;i++){
            const v = arr[i];
            const cls = v === "gol" ? "gol" : v === "erro" ? "erro" : "";
            const ico = v === "gol" ? "⚽" : v === "erro" ? "✗" : "";
            html += `<div class="pen-bola ${cls}">${ico}</div>`;
        }
        return html;
    }

    function render(){
        const venc = decidido();
        const vezIdx = pen.vez === "a" ? p.a : p.b;
        const q = pen.pergunta;
        $("modal").innerHTML = `
            <div class="modal-card">
                <h2>🥅 Disputa de Pênaltis</h2>
                ${venc
                    ? `<p class="pen-vez">🏆 ${nomeTime(venc==='a'?p.a:p.b)} venceu nos pênaltis!</p>`
                    : `<p class="pen-vez">🥅 Cobrança de: ${bandImg(vezIdx)} ${nomeTime(vezIdx)}</p>`}
                <div class="penaltis-times">
                    <div class="pen-time">
                        <h3>${bandImg(p.a)} ${nomeTime(p.a)}</h3>
                        <div class="pen-placar">${golsPen(pen.a)}</div>
                        <div class="pen-marcadores">${marcadoresHTML(pen.a)}</div>
                    </div>
                    <div class="pen-time">
                        <h3>${bandImg(p.b)} ${nomeTime(p.b)}</h3>
                        <div class="pen-placar">${golsPen(pen.b)}</div>
                        <div class="pen-marcadores">${marcadoresHTML(pen.b)}</div>
                    </div>
                </div>
                ${venc
                    ? `<button class="btn-verde btn-grande" id="pen-confirmar">✅ Avançar Vencedor</button>`
                    : `<div class="pen-pergunta">
                          ${q
                            ? `<div class="rotulo">📖 Pergunta da cobrança</div>
                               <div class="pen-texto">${q.pergunta}</div>
                               ${pen.respVisivel ? `<div class="pen-resp"><strong>Resposta:</strong> ${q.resposta}${q.referencia ? `<div class="ref">📖 ${q.referencia}</div>` : ``}</div>` : ``}`
                            : `<div class="rotulo">🧸 Modo Card Visual</div>
                               <div class="pen-texto">Mostre o card impresso para ${nomeTime(vezIdx)}.</div>`}
                       </div>
                       <div class="pen-botoes">
                          ${q ? `<button class="btn-azul btn" id="pen-mostrar">✅ Mostrar Resposta</button>` : ``}
                          <button class="btn-verde btn-grande" id="pen-gol">⚽ ACERTOU (Gol)</button>
                          <button class="btn-vermelho btn-grande" id="pen-erro">✗ ERROU</button>
                       </div>`}
            </div>`;
        $("modal").classList.remove("hidden");

        if(venc){
            $("pen-confirmar").onclick = () => {
                $("modal").classList.add("hidden");
                confeteBurst(40);
                definirVencedor(venc);
            };
        } else {
            if($("pen-mostrar")) $("pen-mostrar").onclick = () => {
                pen.respVisivel = true;
                mostrarRevelacao(pen.pergunta.resposta, pen.pergunta.referencia);
                somApito(false);
                render();
            };
            const cobrar = (resultado) => {
                pen[pen.vez].push(resultado);
                if(resultado === "gol"){
                    somGol();
                    narrar(`GOL de ${nomeTime(pen.vez === "a" ? p.a : p.b)}!`, true);
                } else {
                    somApito(false);
                }
                pen.vez = pen.vez === "a" ? "b" : "a";
                if(!decidido()) novaCobranca();  // só sorteia se a disputa continua
                render();
            };
            $("pen-gol").onclick = () => cobrar("gol");
            $("pen-erro").onclick = () => cobrar("erro");
        }
    }

    novaCobranca();
    render();
}

/* =========================================================
   16. CHAVEAMENTO VISUAL
   ========================================================= */

function renderChave(){
    const box = $("chave");
    box.innerHTML = estado.rodadas.map((rodada, r) => `
        <div class="rodada">
            <div class="rodada-titulo">${nomeFase(r)}</div>
            ${rodada.map((p, j) => {
                const atual = (r === estado.atual.r && j === estado.atual.j && p.venc === null);
                const slot = (idx, sc, venceu, tbd) => `
                    <div class="slot ${venceu?'venceu':''} ${tbd?'tbd':''}">
                        <span class="band">${bandImg(idx)}</span>
                        <span class="nm">${tbd ? 'A definir' : nomeTime(idx)}</span>
                        <span class="sc">${tbd ? '-' : sc}</span>
                    </div>`;
                return `<div class="confronto ${atual?'atual':''}">
                    ${slot(p.a, p.sa, p.venc==='a', p.a==null)}
                    ${slot(p.b, p.sb, p.venc==='b', p.b==null)}
                </div>`;
            }).join("")}
        </div>
    `).join("");
}

$("btn-chave").onclick = () => { renderChave(); mostrarTela("chave"); };
$("btn-voltar-jogo").onclick = () => { carregarPartida(); mostrarTela("jogo"); };

/* =========================================================
   17. TELA DO CAMPEÃO
   ========================================================= */

let confeteLoop = null;

function mostrarCampeao(idx){
    $("campeao-flag").innerHTML = bandImg(idx);
    $("campeao-nome").textContent = nomeTime(idx);
    mostrarTela("campeao");
    somFanfarra();
    narrar(`${nomeTime(idx)} é a grande campeã da Copa Missionária das Nações! Parabéns!`, true);
    confeteBurst(80);
    clearInterval(confeteLoop);
    confeteLoop = setInterval(() => confeteBurst(24), 700);
}

$("btn-nova-copa").onclick = () => {
    clearInterval(confeteLoop);
    localStorage.removeItem(CHAVE);
    zerarHistorico(); // nova copa → todas as perguntas voltam a ficar disponíveis
    estado = { numTimes:8, times:[], rodadas:[], atual:{r:0,j:0}, vez:"a",
               modoCard:estado.modoCard, somOn:estado.somOn, vozOn:estado.vozOn };
    renderSetup();
    mostrarTela("setup");
};

/* =========================================================
   18. CONFETES
   ========================================================= */

const CORES_CONFETE = ["#e53935","#1e88e5","#ffd447","#43a047","#ff9800","#ffffff","#8e24aa"];

function confeteBurst(qtd){
    for(let i=0;i<qtd;i++){
        const c = document.createElement("div");
        c.className = "confete";
        c.style.left = Math.random()*100 + "vw";
        c.style.background = CORES_CONFETE[Math.floor(Math.random()*CORES_CONFETE.length)];
        c.style.animationDuration = (2 + Math.random()*2) + "s";
        c.style.transform = "rotate(" + Math.random()*360 + "deg)";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4200);
    }
}

/* =========================================================
   19. CONTROLES DE TOPO (som, voz, tela cheia)
   ========================================================= */

$("btn-som").onclick = () => {
    estado.somOn = !estado.somOn;
    $("btn-som").textContent = estado.somOn ? "🔊 Som: ON" : "🔇 Som: OFF";
    if(estado.somOn){ ctx(); somApito(false); }
    salvar();
};

$("btn-voz").onclick = () => {
    estado.vozOn = !estado.vozOn;
    $("btn-voz").textContent = estado.vozOn ? "🎙️ Voz: ON" : "🔕 Voz: OFF";
    if(!estado.vozOn && "speechSynthesis" in window) speechSynthesis.cancel();
    salvar();
};

$("btn-tela-cheia").onclick = () => {
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen?.().catch(()=>{});
    } else {
        document.exitFullscreen?.();
    }
};
document.addEventListener("fullscreenchange", () => {
    $("btn-tela-cheia").textContent = document.fullscreenElement ? "🡼 Sair" : "📺 Tela Cheia";
});

/* =========================================================
   20. CONTROLES DO LÍDER (reiniciar)
   ========================================================= */

$("btn-reiniciar-partida").onclick = () => {
    const p = getPartida();
    p.sa = 0; p.sb = 0;
    atualizarPlacar();
    modificador = null;
    estado.vez = "a";
    prepararTurno();
    toast("Placar zerado.", "#37455f");
};

$("btn-reiniciar-copa").onclick = () => {
    if(confirm("Reiniciar TODA a Copa? O chaveamento atual será perdido.")){
        localStorage.removeItem(CHAVE);
        zerarHistorico();
        estado = { numTimes:estado.numTimes, times:[], rodadas:[], atual:{r:0,j:0}, vez:"a",
                   modoCard:estado.modoCard, somOn:estado.somOn, vozOn:estado.vozOn };
        renderSetup();
        mostrarTela("setup");
    }
};

/* =========================================================
   21. PERSISTÊNCIA (localStorage)
   ========================================================= */

function salvar(){
    try {
        estado.historico = historico; // perguntas já feitas no campeonato
        localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch(e){}
}

function carregar(){
    try {
        const s = localStorage.getItem(CHAVE);
        if(!s) return false;
        const d = JSON.parse(s);
        if(d && d.rodadas && d.rodadas.length){
            estado = Object.assign(estado, d);
            // restaura o histórico de perguntas no objeto vivo usado por sortearPergunta()
            if(d.historico){
                Object.keys(historico).forEach(k => {
                    historico[k] = Array.isArray(d.historico[k]) ? d.historico[k] : [];
                });
            }
            return true;
        }
    } catch(e){}
    return false;
}

/* =========================================================
   22. INICIALIZAÇÃO
   ========================================================= */

function aplicarBotoesAudio(){
    $("btn-som").textContent = estado.somOn ? "🔊 Som: ON" : "🔇 Som: OFF";
    $("btn-voz").textContent = estado.vozOn ? "🎙️ Voz: ON" : "🔕 Voz: OFF";
}

function init(){
    renderCartas();
    const temJogo = carregar();
    aplicarBotoesAudio();
    aplicarModoCard();

    if(temJogo){
        // Retoma a Copa em andamento
        const prox = proximaPartidaPendente();
        if(prox){
            estado.atual = prox;
            mostrarTela("jogo");
            carregarPartida();
            toast("↩️ Copa em andamento retomada.", "#0f4fa8");
        } else {
            // já terminou tudo → volta ao setup
            renderSetup();
            mostrarTela("setup");
        }
    } else {
        renderSetup();
        mostrarTela("setup");
    }
}

init();
