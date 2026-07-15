/*
=========================================================
COPA MISSIONÁRIA DAS NAÇÕES
perguntas.js

Cada pergunta tem:
  - pergunta   : o enunciado
  - resposta   : a resposta correta
  - referencia : versículo bíblico que remete à pergunta/resposta
=========================================================
*/

const perguntas = {

    1: [

        { pergunta: "Quem criou o céu e a terra?", resposta: "Deus", referencia: "Gênesis 1:1" },
        { pergunta: "Quem construiu a arca?", resposta: "Noé", referencia: "Gênesis 6:14" },
        { pergunta: "Quem derrotou Golias?", resposta: "Davi", referencia: "1 Samuel 17:50" },
        { pergunta: "Quem nasceu em Belém?", resposta: "Jesus", referencia: "Lucas 2:4-7" },
        { pergunta: "Quem foi engolido por um grande peixe?", resposta: "Jonas", referencia: "Jonas 1:17" },
        { pergunta: "Qual é o primeiro livro da Bíblia?", resposta: "Gênesis", referencia: "Gênesis 1:1" },
        { pergunta: "Qual é o último livro da Bíblia?", resposta: "Apocalipse", referencia: "Apocalipse 22:21" },
        { pergunta: "Quem batizou Jesus?", resposta: "João Batista", referencia: "Mateus 3:13-16" },
        { pergunta: "Quem era a mãe de Jesus?", resposta: "Maria", referencia: "Lucas 1:30-31" },
        { pergunta: "Quantos discípulos Jesus escolheu?", resposta: "12", referencia: "Lucas 6:13" },
        { pergunta: "Quem foi lançado na cova dos leões?", resposta: "Daniel", referencia: "Daniel 6:16" },
        { pergunta: "Quem abriu o Mar Vermelho?", resposta: "Moisés", referencia: "Êxodo 14:21" }

    ],

    2: [

        { pergunta: "Quem escreveu o livro de Atos?", resposta: "Lucas", referencia: "Atos 1:1" },
        { pergunta: "Qual discípulo andou sobre as águas?", resposta: "Pedro", referencia: "Mateus 14:29" },
        { pergunta: "Quem interpretou os sonhos do faraó?", resposta: "José", referencia: "Gênesis 41:25" },
        { pergunta: "Qual era o rio onde Jesus foi batizado?", resposta: "Rio Jordão", referencia: "Marcos 1:9" },
        { pergunta: "Quem derrubou as muralhas de Jericó?", resposta: "Josué", referencia: "Josué 6:20" },
        { pergunta: "Quem era cobrador de impostos antes de seguir Jesus?", resposta: "Mateus", referencia: "Mateus 9:9" },
        { pergunta: "Quem foi o primeiro mártir da Igreja?", resposta: "Estêvão", referencia: "Atos 7:59-60" },
        { pergunta: "Quem subiu ao céu em um redemoinho?", resposta: "Elias", referencia: "2 Reis 2:11" },
        { pergunta: "Quem substituiu Judas Iscariotes?", resposta: "Matias", referencia: "Atos 1:26" },
        { pergunta: "Qual discípulo duvidou da ressurreição de Jesus?", resposta: "Tomé", referencia: "João 20:25" }

    ],

    3: [

        { pergunta: "Qual foi o primeiro milagre de Jesus?", resposta: "Transformar água em vinho", referencia: "João 2:9-11" },
        { pergunta: "Quem escreveu o livro de Apocalipse?", resposta: "João", referencia: "Apocalipse 1:1" },
        { pergunta: "Em qual ilha João recebeu a revelação do Apocalipse?", resposta: "Patmos", referencia: "Apocalipse 1:9" },
        { pergunta: "Quem foi o sucessor do profeta Elias?", resposta: "Eliseu", referencia: "2 Reis 2:15" },
        { pergunta: "Quem encontrou o Livro da Lei no templo durante o reinado de Josias?", resposta: "Hilquias", referencia: "2 Reis 22:8" },
        { pergunta: "Qual era o nome da avó de Timóteo?", resposta: "Lóide", referencia: "2 Timóteo 1:5" },
        { pergunta: "Quem interpretou a escrita na parede para o rei Belsazar?", resposta: "Daniel", referencia: "Daniel 5:25-28" },
        { pergunta: "Qual foi a primeira cidade conquistada por Josué?", resposta: "Jericó", referencia: "Josué 6:20" }

    ],

    4: [

        { pergunta: "Complete: Ide por todo o ________.", resposta: "Mundo", referencia: "Marcos 16:15" },
        { pergunta: "O que significa a palavra Evangelho?", resposta: "Boas Notícias", referencia: "Lucas 2:10" },
        { pergunta: "Qual foi a última ordem de Jesus antes de subir ao céu?", resposta: "Pregar o Evangelho e fazer discípulos de todas as nações", referencia: "Mateus 28:19-20" },
        { pergunta: "Como uma criança pode ser missionária?", resposta: "Falando de Jesus, orando, ajudando as pessoas e dando bom exemplo.", referencia: "1 Timóteo 4:12" },
        { pergunta: "Qual livro da Bíblia conta as viagens missionárias de Paulo?", resposta: "Atos dos Apóstolos", referencia: "Atos 13:2-3" },
        { pergunta: "Complete: Deus amou o ________ de tal maneira...", resposta: "Mundo", referencia: "João 3:16" },
        { pergunta: "Quem foi o maior missionário do Novo Testamento?", resposta: "Apóstolo Paulo", referencia: "Atos 9:15" },
        { pergunta: "Segundo Mateus 28, Jesus mandou fazer discípulos de quem?", resposta: "De todas as nações", referencia: "Mateus 28:19" }

    ]

};

/*
=========================================================
SORTEIO SEM REPETIÇÃO
=========================================================
*/

const historico = {

    1: [],
    2: [],
    3: [],
    4: []

};

function sortearPergunta(gols = null){

    // Escolhe categoria aleatória
    if(!gols){

        const categorias = [1,2,3,4];
        gols = categorias[Math.floor(Math.random()*categorias.length)];

    }

    // Reinicia quando acabar
    if(historico[gols].length === perguntas[gols].length){

        historico[gols] = [];

    }

    let indice;

    do{

        indice = Math.floor(Math.random()*perguntas[gols].length);

    }while(historico[gols].includes(indice));

    historico[gols].push(indice);

    return{

        gols,

        pergunta: perguntas[gols][indice].pergunta,

        resposta: perguntas[gols][indice].resposta,

        referencia: perguntas[gols][indice].referencia

    };

}

/*
=========================================================
CARTAS ESPECIAIS
=========================================================
*/

const cartasEspeciais = [

    {

        nome:"⚽ Gol em Dobro",

        descricao:"A próxima resposta correta vale o dobro."

    },

    {

        nome:"🥅 Pênalti Bíblico",

        descricao:"Vale 3 gols. Apenas uma pergunta."

    },

    {

        nome:"🙋 Ajuda da Equipe",

        descricao:"A equipe pode conversar durante 15 segundos."

    },

    {

        nome:"⭐ Pergunta Ouro",

        descricao:"Pergunta Missionária valendo 4 gols."

    }

];
