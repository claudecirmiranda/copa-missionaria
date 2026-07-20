/*
=========================================================
COPA MISSIONÁRIA DAS NAÇÕES
perguntas.js

Cada pergunta tem:
  - pergunta   : o enunciado
  - resposta   : a resposta correta
  - referencia : versículo bíblico que remete à pergunta/resposta

As chaves 1..4 são o valor da pergunta em gols, que é também a
dificuldade: 1 = quase toda criança sabe, 4 = para quem estudou.

Toda referência foi conferida contra o texto da Bíblia ACF em
ferramentas/biblia-acf.json. Para auditar o banco de novo:
    node ferramentas/verificar-lote.js perguntas.js
Veja ferramentas/README.md antes de acrescentar perguntas.
=========================================================
*/

const perguntas = {

    1: [

        // --- banco original (tema missionário) ---
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
        { pergunta: "Quem abriu o Mar Vermelho?", resposta: "Moisés", referencia: "Êxodo 14:21" },

        // Gênesis
        { pergunta: "Segundo Eva, qual animal a enganou para ela comer do fruto?", resposta: "A serpente", referencia: "Gênesis 3:13" },
        { pergunta: "Em que jardim o Senhor Deus pôs o homem que tinha formado?", resposta: "Éden", referencia: "Gênesis 2:8" },

        // Êxodo
        { pergunta: "Qual era o nome do pão que Deus deu ao povo de Israel para comer no deserto?", resposta: "Maná", referencia: "Êxodo 16:31" },
        { pergunta: "Nos Dez Mandamentos, Deus mandou honrar quem?", resposta: "Pai e mãe", referencia: "Êxodo 20:12" },

        // Deuteronômio
        { pergunta: "Moisés lembrou o povo de que Deus os sustentou no deserto. Com que alimento?", resposta: "O maná", referencia: "Deuteronômio 8:3" },

        // Josué
        { pergunta: "Quem escondeu os dois espias enviados a Jericó?", resposta: "Raabe", referencia: "Josué 2:3-4" },

        // Juízes
        { pergunta: "Qual juiz de Israel perdeu a sua força depois que raparam as sete tranças do seu cabelo?", resposta: "Sansão", referencia: "Juízes 16:19-20" },

        // Rute
        { pergunta: "De qual povo era Rute?", resposta: "Moabita", referencia: "Rute 1:4" },

        // 1 Samuel
        { pergunta: "Quem era a mãe de Samuel?", resposta: "Ana", referencia: "1 Samuel 1:20" },
        { pergunta: "Quem foi o primeiro rei de Israel, a quem o Senhor escolheu?", resposta: "Saul", referencia: "1 Samuel 10:21-24" },

        // 2 Samuel
        { pergunta: "Quem os anciãos de Israel ungiram rei sobre Israel em Hebrom?", resposta: "Davi", referencia: "2 Samuel 5:3" },

        // 1 Reis
        { pergunta: "Qual rei pediu a Deus um coração sábio e entendido, em vez de pedir riquezas?", resposta: "Salomão", referencia: "1 Reis 3:9-12" },

        // 2 Reis
        { pergunta: "Quem foi curado da lepra depois de mergulhar sete vezes no rio Jordão?", resposta: "Naamã", referencia: "2 Reis 5:9-14" },

        // 2 Crônicas
        { pergunta: "Qual rei começou a edificar a casa do Senhor em Jerusalém?", resposta: "Salomão", referencia: "2 Crônicas 3:1" },

        // Neemias
        { pergunta: "Qual cidade estava assolada, com as portas queimadas a fogo, e que Neemias chamou o povo para reedificar o muro?", resposta: "Jerusalém", referencia: "Neemias 2:17" },

        // Ester
        { pergunta: "Quem o rei Assuero fez rainha em lugar de Vasti?", resposta: "Ester", referencia: "Ester 2:17" },

        // Jó
        { pergunta: "Quem feriu Jó de úlceras malignas, desde a planta do pé até ao alto da cabeça?", resposta: "Satanás", referencia: "Jó 2:7" },

        // Salmos
        { pergunta: "Segundo o Salmo 23, o SENHOR é o meu quê?", resposta: "Pastor", referencia: "Salmos 23:1" },
        { pergunta: "Complete o Salmo 100: Servi ao Senhor com ________.", resposta: "Alegria", referencia: "Salmos 100:2" },

        // Provérbios
        { pergunta: "Segundo Provérbios, a qual pequeno inseto o preguiçoso deve ir observar para se tornar sábio?", resposta: "Formiga", referencia: "Provérbios 6:6" },

        // Eclesiastes
        { pergunta: "Segundo Eclesiastes 3, há tempo de chorar e tempo de quê?", resposta: "Rir", referencia: "Eclesiastes 3:4" },

        // Isaías
        { pergunta: "Isaías anunciou que a virgem conceberia e daria à luz um filho. Qual nome esse menino receberia?", resposta: "Emanuel", referencia: "Isaías 7:14" },

        // Daniel
        { pergunta: "Qual rei mandou lançar Sadraque, Mesaque e Abednego na fornalha de fogo ardente?", resposta: "Nabucodonosor", referencia: "Daniel 3:19-20" },

        // Jonas
        { pergunta: "Para qual grande cidade Deus mandou Jonas ir pregar?", resposta: "Nínive", referencia: "Jonas 1:2" },

        // Mateus
        { pergunta: "Para onde o anjo mandou José fugir com o menino Jesus e sua mãe?", resposta: "Egito", referencia: "Mateus 2:13" },
        { pergunta: "Que sinal Judas combinou para entregar Jesus aos que vinham prendê-lo?", resposta: "Um beijo", referencia: "Mateus 26:48-49" },

        // Marcos
        { pergunta: "Quantos pães os discípulos tinham quando Jesus lhes perguntou?", resposta: "Cinco", referencia: "Marcos 6:38" },
        { pergunta: "Quantos dias Jesus esteve no deserto sendo tentado por Satanás?", resposta: "Quarenta", referencia: "Marcos 1:13" },

        // Lucas
        { pergunta: "Depois que Jesus nasceu, Maria o envolveu em panos e o deitou onde?", resposta: "Manjedoura", referencia: "Lucas 2:7" },
        { pergunta: "Na parábola de Jesus, quem se moveu de íntima compaixão e cuidou do homem ferido no caminho?", resposta: "Um samaritano", referencia: "Lucas 10:33" },

        // João
        { pergunta: "Quem Jesus chamou para fora do sepulcro, dizendo: sai para fora?", resposta: "Lázaro", referencia: "João 11:43-44" },

        // Atos
        { pergunta: "Quem foi elevado às alturas, e uma nuvem o ocultou dos olhos dos discípulos?", resposta: "Jesus", referencia: "Atos 1:9-11" },
        { pergunta: "No dia de Pentecostes, o que pousou sobre cada um dos discípulos?", resposta: "Línguas de fogo", referencia: "Atos 2:3" },

        // Romanos
        { pergunta: "Em qual cidade moravam os cristãos que receberam a carta aos Romanos?", resposta: "Roma", referencia: "Romanos 1:7" },

        // 1 Coríntios
        { pergunta: "Paulo disse que permanecem a fé, a esperança e o amor. Qual desses três é o maior?", resposta: "O amor", referencia: "1 Coríntios 13:13" },

        // 2 Coríntios
        { pergunta: "Qual apóstolo escreveu a carta de 2 Coríntios?", resposta: "Paulo", referencia: "2 Coríntios 1:1" },

        // Efésios
        { pergunta: "Segundo Efésios 1:1, quem escreveu aos santos que estão em Éfeso?", resposta: "Paulo", referencia: "Efésios 1:1" },

        // Filipenses
        { pergunta: "Complete o versículo: Posso todas as coisas em Cristo que me ________.", resposta: "Fortalece", referencia: "Filipenses 4:13" },

        // Colossenses
        { pergunta: "Quem escreveu a carta aos Colossenses?", resposta: "Paulo", referencia: "Colossenses 1:1" },

        // 1 Tessalonicenses
        { pergunta: "Complete o versículo: Orai sem ______.", resposta: "Cessar", referencia: "1 Tessalonicenses 5:17" },

        // 1 Timóteo
        { pergunta: "Segundo Paulo, quem foi formado primeiro?", resposta: "Adão", referencia: "1 Timóteo 2:13" },

        // 2 Timóteo
        { pergunta: "Quem escreveu a carta de 2 Timóteo?", resposta: "Paulo", referencia: "2 Timóteo 1:1" },

        // Hebreus
        { pergunta: "Segundo Hebreus 12, para quem devemos olhar, o autor e consumador da fé?", resposta: "Jesus", referencia: "Hebreus 12:2" },

        // Tiago
        { pergunta: "Segundo o livro de Tiago, a quem devemos pedir quando nos falta sabedoria?", resposta: "A Deus", referencia: "Tiago 1:5" },

        // 1 Pedro
        { pergunta: "Pedro diz que o diabo anda em derredor bramando como qual animal?", resposta: "Leão", referencia: "1 Pedro 5:8" },

        // 2 Pedro
        { pergunta: "Segundo 2 Pedro 2, quem Deus guardou quando trouxe o dilúvio sobre o mundo dos ímpios?", resposta: "Noé", referencia: "2 Pedro 2:5" },

        // 1 João
        { pergunta: "Segundo 1 João 4, complete: aquele que não ama não conhece a Deus, porque Deus é...", resposta: "Amor", referencia: "1 João 4:8" },

        // Judas
        { pergunta: "Segundo a carta de Judas, de qual terra o Senhor tirou o povo que salvou?", resposta: "Egito", referencia: "Judas 1:5" },

        // Apocalipse
        { pergunta: "Segundo Apocalipse 21, o que Deus limpará dos olhos do seu povo?", resposta: "Toda a lágrima", referencia: "Apocalipse 21:4" }

    ],

    2: [

        // --- banco original (tema missionário) ---
        { pergunta: "Quem escreveu o livro de Atos?", resposta: "Lucas", referencia: "Atos 1:1" },
        { pergunta: "Qual discípulo andou sobre as águas?", resposta: "Pedro", referencia: "Mateus 14:29" },
        { pergunta: "Quem interpretou os sonhos do faraó?", resposta: "José", referencia: "Gênesis 41:25" },
        { pergunta: "Qual era o rio onde Jesus foi batizado?", resposta: "Rio Jordão", referencia: "Marcos 1:9" },
        { pergunta: "Quem derrubou as muralhas de Jericó?", resposta: "Josué", referencia: "Josué 6:20" },
        { pergunta: "Quem era cobrador de impostos antes de seguir Jesus?", resposta: "Mateus", referencia: "Mateus 9:9" },
        { pergunta: "Quem foi o primeiro mártir da Igreja?", resposta: "Estêvão", referencia: "Atos 7:59-60" },
        { pergunta: "Quem subiu ao céu em um redemoinho?", resposta: "Elias", referencia: "2 Reis 2:11" },
        { pergunta: "Quem substituiu Judas Iscariotes?", resposta: "Matias", referencia: "Atos 1:26" },
        { pergunta: "Qual discípulo duvidou da ressurreição de Jesus?", resposta: "Tomé", referencia: "João 20:25" },

        // Gênesis
        { pergunta: "Que tipo de túnica Israel fez para José?", resposta: "De várias cores", referencia: "Gênesis 37:3" },
        { pergunta: "Que folha a pomba trouxe no bico quando voltou para Noé?", resposta: "De oliveira", referencia: "Gênesis 8:11" },
        { pergunta: "Que nome recebeu a cidade onde o Senhor confundiu a língua de toda a terra?", resposta: "Babel", referencia: "Gênesis 11:9" },

        // Êxodo
        { pergunta: "O que Deus mandou Moisés tirar dos pés, porque o lugar era terra santa?", resposta: "Os sapatos", referencia: "Êxodo 3:5" },
        { pergunta: "Em que a mãe de Moisés colocou o menino para pôr à margem do rio?", resposta: "Arca de juncos", referencia: "Êxodo 2:3" },
        { pergunta: "Quando Arão feriu com a vara as águas do rio do Egito, em que elas se tornaram?", resposta: "Sangue", referencia: "Êxodo 7:20" },
        { pergunta: "Que animal Arão fez com o ouro que o povo lhe trouxe?", resposta: "Um bezerro", referencia: "Êxodo 32:2-4" },

        // Levítico
        { pergunta: "Complete o mandamento de Levítico 19: amarás o teu próximo como...", resposta: "A ti mesmo", referencia: "Levítico 19:18" },

        // Números
        { pergunta: "Que animal falou com Balaão?", resposta: "A jumenta", referencia: "Números 22:28" },

        // Deuteronômio
        { pergunta: "O que o Senhor escreveu nas tábuas de pedra que Moisés levou ao monte?", resposta: "Dez mandamentos", referencia: "Deuteronômio 10:4" },

        // Josué
        { pergunta: "Quantas vezes o povo rodeou Jericó no sétimo dia?", resposta: "Sete vezes", referencia: "Josué 6:15" },

        // Juízes
        { pergunta: "Quantos homens ficaram com Gideão para o SENHOR livrar Israel dos midianitas?", resposta: "Trezentos", referencia: "Juízes 7:7" },
        { pergunta: "Qual mulher profetisa julgava a Israel naquele tempo?", resposta: "Débora", referencia: "Juízes 4:4" },

        // Rute
        { pergunta: "Quem tomou Rute por mulher e com ela teve um filho?", resposta: "Boaz", referencia: "Rute 4:13" },
        { pergunta: "Que cereal Rute apanhava no campo até a tarde?", resposta: "Cevada", referencia: "Rute 2:17" },

        // 1 Samuel
        { pergunta: "Quantos seixos Davi escolheu do ribeiro antes de enfrentar Golias?", resposta: "Cinco", referencia: "1 Samuel 17:40" },
        { pergunta: "Que instrumento Davi tocava para que Saul sentisse alívio?", resposta: "Harpa", referencia: "1 Samuel 16:23" },
        { pergunta: "Qual filho de Saul fez aliança com Davi e o amou como à sua própria alma?", resposta: "Jônatas", referencia: "1 Samuel 18:1-3" },

        // 2 Samuel
        { pergunta: "Quem o SENHOR enviou a Davi para lhe contar a história do homem rico que tomou a cordeira do homem pobre?", resposta: "Natã", referencia: "2 Samuel 12:1-4" },

        // 1 Reis
        { pergunta: "Que aves Deus mandou levar pão e carne a Elias junto ao ribeiro de Querite?", resposta: "Corvos", referencia: "1 Reis 17:6" },

        // 2 Reis
        { pergunta: "A viúva pobre disse a Eliseu que só tinha uma botija de quê em casa?", resposta: "Azeite", referencia: "2 Reis 4:1-2" },
        { pergunta: "Quantos anos tinha Josias quando começou a reinar?", resposta: "Oito anos", referencia: "2 Reis 22:1" },

        // 1 Crônicas
        { pergunta: "Davi chamou o seu filho e lhe ordenou que edificasse uma casa ao Senhor Deus de Israel. Quem era esse filho?", resposta: "Salomão", referencia: "1 Crônicas 22:6" },

        // Esdras
        { pergunta: "Qual rei da Pérsia disse que o Senhor o tinha encarregado de edificar uma casa em Jerusalém?", resposta: "Ciro", referencia: "Esdras 1:2" },

        // Neemias
        { pergunta: "Antes de ir a Jerusalém, qual era o cargo de Neemias no palácio do rei?", resposta: "Copeiro do rei", referencia: "Neemias 1:11" },
        { pergunta: "Quem leu o livro da lei diante de todo o povo, na praça da porta das águas?", resposta: "Esdras", referencia: "Neemias 8:2-3" },

        // Ester
        { pergunta: "Quem não se inclinava nem se prostrava diante de Hamã?", resposta: "Mardoqueu", referencia: "Ester 3:2" },
        { pergunta: "Quem mandou fazer a forca para enforcar Mardoqueu?", resposta: "Hamã", referencia: "Ester 5:14" },

        // Jó
        { pergunta: "Em que terra morava o homem chamado Jó?", resposta: "Uz", referencia: "Jó 1:1" },
        { pergunta: "Quantos amigos de Jó vieram do seu lugar para consolá-lo?", resposta: "Três", referencia: "Jó 2:11" },

        // Salmos
        { pergunta: "Complete o Salmo 119: Lâmpada para os meus ________ é tua palavra.", resposta: "Pés", referencia: "Salmos 119:105" },
        { pergunta: "Complete o Salmo 150: Tudo quanto tem ________ louve ao Senhor.", resposta: "Fôlego", referencia: "Salmos 150:6" },
        { pergunta: "Segundo o Salmo 121, de onde vem o meu socorro?", resposta: "Do Senhor", referencia: "Salmos 121:2" },

        // Provérbios
        { pergunta: "Complete o versículo: Educa a criança no ______ em que deve andar.", resposta: "Caminho", referencia: "Provérbios 22:6" },
        { pergunta: "Segundo Provérbios, que tipo de resposta desvia o furor?", resposta: "Branda", referencia: "Provérbios 15:1" },

        // Eclesiastes
        { pergunta: "Segundo Eclesiastes 12, de quem o jovem deve se lembrar nos dias da sua mocidade?", resposta: "Do Criador", referencia: "Eclesiastes 12:1" },

        // Cânticos
        { pergunta: "Complete o versículo de Cânticos: \"Eu sou a rosa de Sarom, o lírio dos ______.\"", resposta: "Vales", referencia: "Cânticos 2:1" },

        // Isaías
        { pergunta: "Complete o último nome do menino que Isaías anunciou: Maravilhoso, Conselheiro, Deus Forte, Pai da Eternidade, Príncipe da...", resposta: "Paz", referencia: "Isaías 9:6" },
        { pergunta: "Na visão de Isaías, o Senhor estava assentado num alto e sublime trono. Que seres de seis asas estavam por cima dele?", resposta: "Serafins", referencia: "Isaías 6:1-2" },

        // Jeremias
        { pergunta: "Quando Deus o chamou para ser profeta, Jeremias disse que não sabia falar porque ainda era o quê?", resposta: "Um menino", referencia: "Jeremias 1:6" },

        // Lamentações
        { pergunta: "Em Lamentações, o profeta diz que as misericórdias do Senhor são novas a cada o quê?", resposta: "Cada manhã", referencia: "Lamentações 3:22-23" },

        // Ezequiel
        { pergunta: "O vale onde o Senhor pôs Ezequiel estava cheio de quê?", resposta: "Ossos", referencia: "Ezequiel 37:1" },

        // Daniel
        { pergunta: "Que comida Daniel pediu para comer no lugar das iguarias do rei?", resposta: "Legumes", referencia: "Daniel 1:11-12" },
        { pergunta: "Quem Deus enviou para fechar a boca dos leões?", resposta: "O seu anjo", referencia: "Daniel 6:22" },
        { pergunta: "De qual reino era o rei Nabucodonosor, que veio e sitiou Jerusalém?", resposta: "Babilônia", referencia: "Daniel 1:1" },

        // Oseias
        { pergunta: "No livro de Oseias, Deus diz que amou Israel quando ele era menino. De onde Deus disse que chamou o seu filho?", resposta: "Do Egito", referencia: "Oseias 11:1" },

        // Joel
        { pergunta: "No livro de Joel, o que Deus prometeu derramar sobre toda a carne?", resposta: "O Espírito", referencia: "Joel 2:28" },

        // Amós
        { pergunta: "Segundo o profeta Amós, qual animal rugiu, e por isso todos temem?", resposta: "Leão", referencia: "Amós 3:8" },

        // Obadias
        { pergunta: "Na visão de Obadias, o Senhor DEUS falou a respeito de qual nação?", resposta: "Edom", referencia: "Obadias 1:1" },

        // Jonas
        { pergunta: "Jonas fugiu num navio. Para qual lugar esse navio ia?", resposta: "Társis", referencia: "Jonas 1:3" },
        { pergunta: "Quantos dias e quantas noites Jonas esteve nas entranhas do peixe?", resposta: "Três", referencia: "Jonas 1:17" },

        // Miqueias
        { pergunta: "O profeta Miqueias disse que de uma cidade pequena sairia aquele que governaria em Israel. Que cidade era essa?", resposta: "Belém Efrata", referencia: "Miqueias 5:2" },

        // Naum
        { pergunta: "Contra qual cidade foi a visão do profeta Naum?", resposta: "Nínive", referencia: "Naum 1:1" },

        // Habacuque
        { pergunta: "Complete o versículo de Habacuque: \"mas o justo pela sua ____ viverá\".", resposta: "Fé", referencia: "Habacuque 2:4" },

        // Ageu
        { pergunta: "Complete o que o Senhor diz no livro de Ageu: \"Minha é a prata, e meu é o ...\"", resposta: "Ouro", referencia: "Ageu 2:8" },

        // Zacarias
        { pergunta: "Segundo a profecia de Zacarias, o rei viria montado sobre qual animal?", resposta: "Um jumento", referencia: "Zacarias 9:9" },

        // Malaquias
        { pergunta: "Segundo o profeta Malaquias, em que o povo estava roubando a Deus?", resposta: "Dízimos e ofertas", referencia: "Malaquias 3:8" },

        // Mateus
        { pergunta: "Qual rei mandou matar os meninos de Belém de dois anos para baixo?", resposta: "Herodes", referencia: "Mateus 2:16" },
        { pergunta: "Na parábola de Jesus, sobre o que o homem prudente edificou a sua casa?", resposta: "Rocha", referencia: "Mateus 7:24" },
        { pergunta: "Quantos dias e noites Jesus jejuou no deserto?", resposta: "Quarenta", referencia: "Mateus 4:2" },

        // Marcos
        { pergunta: "Que animal levaram a Jesus, e sobre ele Jesus se assentou?", resposta: "Jumentinho", referencia: "Marcos 11:7" },
        { pergunta: "Que insetos João comia, junto com mel silvestre?", resposta: "Gafanhotos", referencia: "Marcos 1:6" },
        { pergunta: "O povo dizia que Jesus, o filho de Maria, tinha qual profissão?", resposta: "Carpinteiro", referencia: "Marcos 6:3" },

        // Lucas
        { pergunta: "Em que árvore Zaqueu subiu para conseguir ver Jesus?", resposta: "Figueira brava", referencia: "Lucas 19:2-4" },
        { pergunta: "Na parábola, depois de gastar tudo, que animais o filho mais novo foi apascentar?", resposta: "Porcos", referencia: "Lucas 15:13-15" },
        { pergunta: "Dos dez leprosos que Jesus limpou, quantos voltaram para lhe dar graças?", resposta: "Um", referencia: "Lucas 17:15-17" },

        // João
        { pergunta: "Ao ver Jesus vindo para ele, João disse: Eis o quê de Deus, que tira o pecado do mundo?", resposta: "Cordeiro", referencia: "João 1:29" },
        { pergunta: "Quantos pães de cevada tinha o rapaz antes de Jesus alimentar a multidão?", resposta: "Cinco", referencia: "João 6:9" },
        { pergunta: "Jesus deitou água numa bacia e começou a lavar o quê nos discípulos?", resposta: "Os pés", referencia: "João 13:5" },
        { pergunta: "Quem foi ao sepulcro de madrugada no primeiro dia da semana e viu a pedra tirada?", resposta: "Maria Madalena", referencia: "João 20:1" },

        // Atos
        { pergunta: "Perto de qual cidade um resplendor de luz do céu cercou Saulo?", resposta: "Damasco", referencia: "Atos 9:3" },
        { pergunta: "O que aconteceu de repente e abriu todas as portas do cárcere de Paulo e Silas?", resposta: "Terremoto", referencia: "Atos 16:26" },

        // Romanos
        { pergunta: "Segundo Romanos 6, qual é o salário do pecado?", resposta: "A morte", referencia: "Romanos 6:23" },
        { pergunta: "Segundo Romanos 4, quem creu a Deus, e isso lhe foi imputado como justiça?", resposta: "Abraão", referencia: "Romanos 4:3" },

        // 1 Coríntios
        { pergunta: "Paulo disse: \"Eu plantei, Apolo regou\". Mas quem deu o crescimento?", resposta: "Deus", referencia: "1 Coríntios 3:6" },
        { pergunta: "Paulo escreveu que Cristo foi sepultado e ressuscitou. Em que dia Ele ressuscitou?", resposta: "Terceiro dia", referencia: "1 Coríntios 15:4" },

        // 2 Coríntios
        { pergunta: "Segundo 2 Coríntios 9, Deus ama quem dá de que jeito?", resposta: "Com alegria", referencia: "2 Coríntios 9:7" },

        // Gálatas
        { pergunta: "Segundo Gálatas 5:22, qual é o primeiro fruto do Espírito que Paulo cita?", resposta: "Amor", referencia: "Gálatas 5:22" },

        // Efésios
        { pergunta: "Segundo Efésios 6:1, como os filhos devem ser com seus pais?", resposta: "Obedientes", referencia: "Efésios 6:1" },
        { pergunta: "De que Paulo manda que nos revistamos para ficarmos firmes contra as ciladas do diabo?", resposta: "Armadura de Deus", referencia: "Efésios 6:11" },

        // Filipenses
        { pergunta: "Complete o versículo: Para que ao nome de Jesus se dobre todo o ________.", resposta: "Joelho", referencia: "Filipenses 2:10" },
        { pergunta: "Em Filipenses 1, qual servo de Jesus Cristo é citado junto com Paulo?", resposta: "Timóteo", referencia: "Filipenses 1:1" },

        // Colossenses
        { pergunta: "A quem os filhos devem obedecer em tudo?", resposta: "Aos pais", referencia: "Colossenses 3:20" },

        // 1 Tessalonicenses
        { pergunta: "Qual companheiro Paulo enviou aos tessalonicenses para confortá-los e exortá-los acerca da fé deles?", resposta: "Timóteo", referencia: "1 Tessalonicenses 3:2" },

        // 2 Tessalonicenses
        { pergunta: "Na carta de 2 Tessalonicenses, Paulo manda que, se alguém não quiser trabalhar, o que ele também não deve fazer?", resposta: "Comer", referencia: "2 Tessalonicenses 3:10" },

        // 1 Timóteo
        { pergunta: "Segundo Paulo, o amor a que coisa é a raiz de toda a espécie de males?", resposta: "Dinheiro", referencia: "1 Timóteo 6:10" },

        // 2 Timóteo
        { pergunta: "Paulo mandou Timóteo sofrer as aflições como bom quê de Jesus Cristo?", resposta: "Soldado", referencia: "2 Timóteo 2:3" },

        // Tito
        { pergunta: "Quem escreveu a carta a Tito?", resposta: "Paulo", referencia: "Tito 1:1-4" },

        // Filemom
        { pergunta: "Na carta a Filemom, qual era o nome do filho por quem Paulo pediu, e que ele gerou nas suas prisões?", resposta: "Onésimo", referencia: "Filemom 1:10" },

        // Hebreus
        { pergunta: "Segundo Hebreus 11, por quantos meses Moisés foi escondido por seus pais depois que nasceu?", resposta: "Três meses", referencia: "Hebreus 11:23" },

        // Tiago
        { pergunta: "Tiago diz que todo o homem deve ser tardio para falar, mas pronto para o quê?", resposta: "Ouvir", referencia: "Tiago 1:19" },
        { pergunta: "Tiago diz que nenhum homem pode domar o quê?", resposta: "A língua", referencia: "Tiago 3:8" },

        // 1 Pedro
        { pergunta: "Complete o que Pedro escreveu: Sede santos, porque eu sou _______.", resposta: "Santo", referencia: "1 Pedro 1:16" },
        { pergunta: "Segundo a carta de Pedro, o que devemos lançar sobre Deus, porque ele tem cuidado de nós?", resposta: "Ansiedade", referencia: "1 Pedro 5:6-7" },

        // 2 Pedro
        { pergunta: "Segundo 2 Pedro 2, qual animal falou com voz humana e impediu a loucura do profeta?", resposta: "O jumento", referencia: "2 Pedro 2:16" },

        // 1 João
        { pergunta: "Em 1 João 3, João lembra de um homem que era do maligno e matou o seu irmão. Quem era esse homem?", resposta: "Caim", referencia: "1 João 3:12" },
        { pergunta: "Segundo 1 João 1, o que nos purifica de todo o pecado?", resposta: "Sangue de Jesus", referencia: "1 João 1:7" },

        // 2 João
        { pergunta: "Complete o mandamento que a carta de 2 João lembra: \"que nos ______ uns aos outros\".", resposta: "Amemos", referencia: "2 João 1:5" },

        // 3 João
        { pergunta: "Complete o que João escreveu nesta carta: \"Amado, não sigas o mal, mas o...\"", resposta: "Bem", referencia: "3 João 1:11" },

        // Apocalipse
        { pergunta: "Complete o que Jesus diz: Eis que estou à porta, e ______.", resposta: "Bato", referencia: "Apocalipse 3:20" },
        { pergunta: "Que duas letras o Senhor usa para dizer que é o princípio e o fim?", resposta: "Alfa e Ômega", referencia: "Apocalipse 1:8" }

    ],

    3: [

        // --- banco original (tema missionário) ---
        { pergunta: "Qual foi o primeiro milagre de Jesus?", resposta: "Transformar água em vinho", referencia: "João 2:9-11" },
        { pergunta: "Quem escreveu o livro de Apocalipse?", resposta: "João", referencia: "Apocalipse 1:1" },
        { pergunta: "Em qual ilha João recebeu a revelação do Apocalipse?", resposta: "Patmos", referencia: "Apocalipse 1:9" },
        { pergunta: "Quem foi o sucessor do profeta Elias?", resposta: "Eliseu", referencia: "2 Reis 2:15" },
        { pergunta: "Quem encontrou o Livro da Lei no templo durante o reinado de Josias?", resposta: "Hilquias", referencia: "2 Reis 22:8" },
        { pergunta: "Qual era o nome da avó de Timóteo?", resposta: "Lóide", referencia: "2 Timóteo 1:5" },
        { pergunta: "Quem interpretou a escrita na parede para o rei Belsazar?", resposta: "Daniel", referencia: "Daniel 5:25-28" },
        { pergunta: "Qual foi a primeira cidade conquistada por Josué?", resposta: "Jericó", referencia: "Josué 6:20" },

        // Gênesis
        { pergunta: "Em que a mulher de Ló ficou convertida quando olhou para trás?", resposta: "Estátua de sal", referencia: "Gênesis 19:26" },
        { pergunta: "Que animal Abraão ofereceu em holocausto em lugar de seu filho?", resposta: "Um carneiro", referencia: "Gênesis 22:13" },
        { pergunta: "Que novo nome Jacó recebeu depois de lutar até a alva subir?", resposta: "Israel", referencia: "Gênesis 32:24-28" },

        // Êxodo
        { pergunta: "O que Moisés feriu em Horebe para sair água e o povo beber?", resposta: "A rocha", referencia: "Êxodo 17:6" },
        { pergunta: "Qual profetisa, irmã de Arão, tomou o tamboril e saiu com as mulheres dançando?", resposta: "Miriã", referencia: "Êxodo 15:20" },

        // Levítico
        { pergunta: "No dia da expiação, como se chamava o bode que era apresentado vivo e enviado ao deserto?", resposta: "Bode emissário", referencia: "Levítico 16:10" },

        // Números
        { pergunta: "O que Moisés pôs sobre uma haste para que os picados pelas serpentes vivessem?", resposta: "Serpente de metal", referencia: "Números 21:9" },

        // Josué
        { pergunta: "Quantas pedras os filhos de Israel levantaram do meio do Jordão?", resposta: "Doze", referencia: "Josué 4:8" },
        { pergunta: "Josué mandou o sol se deter sobre qual cidade?", resposta: "Gibeom", referencia: "Josué 10:12" },

        // Juízes
        { pergunta: "Qual libertador de Israel a Bíblia diz que era homem canhoto?", resposta: "Eúde", referencia: "Juízes 3:15" },

        // Rute
        { pergunta: "Que nome as vizinhas deram ao filho de Rute e Boaz?", resposta: "Obede", referencia: "Rute 4:13-17" },
        { pergunta: "Por causa da amargura, que nome Noemi pediu que a chamassem?", resposta: "Mara", referencia: "Rute 1:20" },

        // 1 Samuel
        { pergunta: "Qual sacerdote ensinou Samuel a responder quando o Senhor o chamasse?", resposta: "Eli", referencia: "1 Samuel 3:8-9" },
        { pergunta: "O homem vê o que está diante dos olhos. Para onde o Senhor olha?", resposta: "O coração", referencia: "1 Samuel 16:7" },
        { pergunta: "Segundo Samuel, o que é melhor do que o sacrificar?", resposta: "Obedecer", referencia: "1 Samuel 15:22" },

        // 2 Samuel
        { pergunta: "Qual era o nome do filho de Jônatas a quem Davi disse que sempre comeria pão à sua mesa?", resposta: "Mefibosete", referencia: "2 Samuel 9:6-7" },
        { pergunta: "Absalão fugia montado num mulo quando sua cabeça se prendeu numa árvore e ele ficou pendurado. Que árvore era essa?", resposta: "Carvalho", referencia: "2 Samuel 18:9" },

        // 1 Reis
        { pergunta: "Em que monte Elias mandou reunir todo o Israel e os profetas de Baal?", resposta: "Monte Carmelo", referencia: "1 Reis 18:19" },
        { pergunta: "Quem ouviu a fama de Salomão e veio provar o rei com questões difíceis?", resposta: "Rainha de Sabá", referencia: "1 Reis 10:1" },

        // 2 Reis
        { pergunta: "Quantos anos Deus acrescentou à vida do rei Ezequias?", resposta: "Quinze anos", referencia: "2 Reis 20:6" },
        { pergunta: "Cortando madeira junto ao Jordão, o que caiu na água e Eliseu fez flutuar?", resposta: "O ferro", referencia: "2 Reis 6:4-6" },

        // 1 Crônicas
        { pergunta: "Davi disse que ninguém podia levar a arca de Deus. Só um grupo podia. Qual?", resposta: "Os levitas", referencia: "1 Crônicas 15:2" },

        // 2 Crônicas
        { pergunta: "O que desceu do céu e consumiu o holocausto quando Salomão acabou de orar?", resposta: "Fogo", referencia: "2 Crônicas 7:1" },

        // Esdras
        { pergunta: "Quando lançaram os fundamentos do novo templo, o que fizeram os sacerdotes idosos que tinham visto a primeira casa?", resposta: "Choraram", referencia: "Esdras 3:12" },

        // Neemias
        { pergunta: "Os homens que edificavam o muro de Jerusalém faziam a obra com uma das mãos. O que eles tinham na outra mão?", resposta: "As armas", referencia: "Neemias 4:17" },
        { pergunta: "Qual era o nome do rei a quem Neemias servia o vinho?", resposta: "Artaxerxes", referencia: "Neemias 2:1" },

        // Ester
        { pergunta: "Por quantos dias Ester mandou que os judeus jejuassem por ela?", resposta: "Três dias", referencia: "Ester 4:16" },

        // Jó
        { pergunta: "Complete o que Jó disse: O Senhor o deu, e o Senhor o ________.", resposta: "Tomou", referencia: "Jó 1:21" },

        // Salmos
        { pergunta: "Segundo o Salmo 1, quem tem prazer na lei do Senhor será como o quê, junto a ribeiros de águas?", resposta: "Uma árvore", referencia: "Salmos 1:2-3" },
        { pergunta: "Complete o Salmo 46: Deus é o nosso refúgio e ________.", resposta: "Fortaleza", referencia: "Salmos 46:1" },
        { pergunta: "Segundo o Salmo 91, a quem Deus dará ordem para te guardar em todos os teus caminhos?", resposta: "Aos seus anjos", referencia: "Salmos 91:11" },

        // Provérbios
        { pergunta: "Segundo Provérbios, o coração alegre é como o quê?", resposta: "Bom remédio", referencia: "Provérbios 17:22" },
        { pergunta: "Quantas colunas a sabedoria lavrou ao edificar a sua casa?", resposta: "Sete", referencia: "Provérbios 9:1" },

        // Cânticos
        { pergunta: "Em Cânticos, quais animaizinhos fazem mal às vinhas que estão em flor?", resposta: "Raposinhas", referencia: "Cânticos 2:15" },

        // Isaías
        { pergunta: "Isaías disse que um dia o lobo morará com qual outro animal?", resposta: "Cordeiro", referencia: "Isaías 11:6" },
        { pergunta: "Segundo Isaías, os que esperam no Senhor subirão com asas como quais aves?", resposta: "Águias", referencia: "Isaías 40:31" },

        // Jeremias
        { pergunta: "Quem escreveu no rolo do livro as palavras que Jeremias ditava?", resposta: "Baruque", referencia: "Jeremias 36:4" },

        // Lamentações
        { pergunta: "De qual lugar profundo o profeta disse que invocou o nome do Senhor?", resposta: "Masmorra", referencia: "Lamentações 3:55" },

        // Ezequiel
        { pergunta: "O que Deus mandou Ezequiel comer?", resposta: "Um rolo", referencia: "Ezequiel 3:1" },

        // Daniel
        { pergunta: "O que Nabucodonosor comia, como os bois, depois de ser tirado dentre os homens?", resposta: "Erva", referencia: "Daniel 4:33" },
        { pergunta: "Qual rei mandou trazer os vasos do templo de Jerusalém para beber vinho neles?", resposta: "Belsazar", referencia: "Daniel 5:2" },
        { pergunta: "Para o lado de qual cidade estavam abertas as janelas do quarto onde Daniel orava?", resposta: "Jerusalém", referencia: "Daniel 6:10" },

        // Oseias
        { pergunta: "Qual era o nome da mulher, filha de Diblaim, que Oseias tomou e que lhe deu um filho?", resposta: "Gômer", referencia: "Oseias 1:3" },

        // Joel
        { pergunta: "Deus mandou o povo rasgar o coração, e não o quê?", resposta: "As vestes", referencia: "Joel 2:13" },

        // Amós
        { pergunta: "Na visão de Amós, o Senhor estava sobre um muro. O que Ele tinha na mão?", resposta: "Um prumo", referencia: "Amós 7:7-8" },

        // Obadias
        { pergunta: "Segundo Obadias, o que enganou Edom?", resposta: "A soberba", referencia: "Obadias 1:3" },

        // Jonas
        { pergunta: "Jonas pregava que faltavam quantos dias para Nínive ser subvertida?", resposta: "Quarenta", referencia: "Jonas 3:4" },
        { pergunta: "Que planta Deus fez nascer para dar sombra sobre a cabeça de Jonas?", resposta: "Aboboreira", referencia: "Jonas 4:6" },

        // Miqueias
        { pergunta: "Miqueias profetizou que as nações converteriam as suas espadas em quê?", resposta: "Pás", referencia: "Miqueias 4:3" },

        // Naum
        { pergunta: "Complete o que Naum disse: Eis sobre os montes os pés do que traz as...", resposta: "Boas novas", referencia: "Naum 1:15" },

        // Habacuque
        { pergunta: "O Senhor mandou Habacuque escrever a visão bem legível sobre o quê?", resposta: "Tábuas", referencia: "Habacuque 2:2" },

        // Sofonias
        { pergunta: "Complete o versículo de Sofonias 3: O Senhor teu Deus, o ________, está no meio de ti.", resposta: "Poderoso", referencia: "Sofonias 3:17" },
        { pergunta: "Nos dias de qual rei de Judá a palavra do SENHOR veio ao profeta Sofonias?", resposta: "Josias", referencia: "Sofonias 1:1" },
        { pergunta: "Qual cidade da Assíria o Senhor disse que faria uma desolação, terra seca como o deserto?", resposta: "Nínive", referencia: "Sofonias 2:13" },

        // Ageu
        { pergunta: "No livro de Ageu, o Senhor mandou subir ao monte e trazer o quê para edificar a casa?", resposta: "Madeira", referencia: "Ageu 1:8" },

        // Zacarias
        { pergunta: "Zacarias disse que as ruas de Jerusalém se encheriam de quem, brincando nelas?", resposta: "Meninos e meninas", referencia: "Zacarias 8:4-5" },

        // Malaquias
        { pergunta: "Qual profeta Deus prometeu enviar antes que viesse o grande e terrível dia do Senhor?", resposta: "Elias", referencia: "Malaquias 4:5" },

        // Mateus
        { pergunta: "Quando Jesus alimentou a multidão com cinco pães e dois peixes, quantas alcofas de pedaços sobraram?", resposta: "Doze", referencia: "Mateus 14:20" },
        { pergunta: "Quais dois homens apareceram falando com Jesus quando ele se transfigurou no monte?", resposta: "Moisés e Elias", referencia: "Mateus 17:3" },
        { pergunta: "Em que cidade Jesus foi habitar depois de deixar Nazaré?", resposta: "Cafarnaum", referencia: "Mateus 4:13" },

        // Marcos
        { pergunta: "Qual era o nome do cego que estava mendigando junto do caminho, na saída de Jericó?", resposta: "Bartimeu", referencia: "Marcos 10:46" },
        { pergunta: "Qual preso Pilatos soltou no lugar de Jesus?", resposta: "Barrabás", referencia: "Marcos 15:15" },
        { pergunta: "Que palavras Jesus disse ao tomar a mão da menina que estava morta?", resposta: "Talita cumi", referencia: "Marcos 5:41" },

        // Lucas
        { pergunta: "Como se chamava o sacerdote a quem o anjo disse que sua mulher Isabel teria um filho chamado João?", resposta: "Zacarias", referencia: "Lucas 1:5-13" },
        { pergunta: "Como se chamava o príncipe da sinagoga que se prostrou aos pés de Jesus rogando que entrasse em sua casa?", resposta: "Jairo", referencia: "Lucas 8:41" },
        { pergunta: "Para qual aldeia iam os dois discípulos quando Jesus se aproximou e caminhou com eles?", resposta: "Emaús", referencia: "Lucas 24:13-15" },

        // João
        { pergunta: "Qual fariseu, príncipe dos judeus, foi ter de noite com Jesus?", resposta: "Nicodemos", referencia: "João 3:1-2" },
        { pergunta: "Junto de qual fonte Jesus se assentou e pediu de beber à mulher de Samaria?", resposta: "Fonte de Jacó", referencia: "João 4:6-7" },
        { pergunta: "Em qual tanque Jesus mandou o cego ir lavar-se?", resposta: "Siloé", referencia: "João 9:7" },

        // Atos
        { pergunta: "A qual mulher morta Pedro disse \"levanta-te\", e ela abriu os olhos?", resposta: "Tabita", referencia: "Atos 9:40" },
        { pergunta: "Em qual cidade os discípulos foram chamados cristãos pela primeira vez?", resposta: "Antioquia", referencia: "Atos 11:26" },
        { pergunta: "Quem desceu à água com o eunuco etíope e o batizou?", resposta: "Filipe", referencia: "Atos 8:38" },

        // Romanos
        { pergunta: "Complete Romanos 12:21: Não te deixes vencer do mal, mas vence o mal com o...", resposta: "Bem", referencia: "Romanos 12:21" },
        { pergunta: "Segundo Romanos 5, a morte reinou desde Adão até quem?", resposta: "Moisés", referencia: "Romanos 5:14" },

        // 1 Coríntios
        { pergunta: "Paulo disse que, no estádio, todos os que correm, correm. Mas quantos levam o prêmio?", resposta: "Um só", referencia: "1 Coríntios 9:24" },

        // Gálatas
        { pergunta: "Além de Barnabé, quem Paulo levou consigo quando subiu outra vez a Jerusalém?", resposta: "Tito", referencia: "Gálatas 2:1" },

        // Efésios
        { pergunta: "Segundo Efésios 2:8, pela graça somos salvos por meio de quê?", resposta: "Da fé", referencia: "Efésios 2:8" },

        // Filipenses
        { pergunta: "Segundo Filipenses 4, o que excede todo o entendimento e guardará os vossos corações?", resposta: "A paz de Deus", referencia: "Filipenses 4:7" },

        // 2 Tessalonicenses
        { pergunta: "Paulo diz que o Senhor é fiel, que confirmará os irmãos e os guardará de quem?", resposta: "Do maligno", referencia: "2 Tessalonicenses 3:3" },

        // Tito
        { pergunta: "Onde Paulo deixou Tito para pôr em boa ordem as coisas que ainda restam?", resposta: "Creta", referencia: "Tito 1:5" },

        // Filemom
        { pergunta: "Paulo disse que, se Onésimo tivesse feito algum dano ou devesse alguma coisa a Filemom, quem pagaria?", resposta: "Paulo", referencia: "Filemom 1:18-19" },
        { pergunta: "Paulo disse que Filemom teria Onésimo de volta não já como servo, mas como o quê?", resposta: "Irmão amado", referencia: "Filemom 1:15-16" },

        // Hebreus
        { pergunta: "Segundo Hebreus 11, quem foi trasladado pela fé para não ver a morte?", resposta: "Enoque", referencia: "Hebreus 11:5" },
        { pergunta: "Segundo Hebreus 12, quem vendeu o seu direito de primogenitura por uma refeição?", resposta: "Esaú", referencia: "Hebreus 12:16" },

        // Tiago
        { pergunta: "Segundo o livro de Tiago, de quem ouvimos falar da paciência?", resposta: "Jó", referencia: "Tiago 5:11" },
        { pergunta: "Segundo Tiago, a religião pura e imaculada é visitar, nas suas tribulações, os órfãos e quem mais?", resposta: "As viúvas", referencia: "Tiago 1:27" },

        // 1 Pedro
        { pergunta: "Pedro escreveu que quantas almas se salvaram pela água dentro da arca, nos dias de Noé?", resposta: "Oito", referencia: "1 Pedro 3:20" },
        { pergunta: "Na carta de Pedro, quem obedecia a Abraão, chamando-lhe senhor?", resposta: "Sara", referencia: "1 Pedro 3:6" },

        // 2 Pedro
        { pergunta: "Em 2 Pedro 3, Pedro chama de \"nosso amado irmão\" um homem que também escreveu cartas. Quem é ele?", resposta: "Paulo", referencia: "2 Pedro 3:15" },

        // 1 João
        { pergunta: "Segundo 1 João 3, o Pai nos concedeu tão grande amor que fôssemos chamados o quê?", resposta: "Filhos de Deus", referencia: "1 João 3:1" },
        { pergunta: "Segundo 1 João 5, qual é a vitória que vence o mundo?", resposta: "A nossa fé", referencia: "1 João 5:4" },

        // 2 João
        { pergunta: "Em 2 João, quais dois materiais o ancião disse que NÃO quis usar para escrever a carta?", resposta: "Papel e tinta", referencia: "2 João 1:12" },

        // 3 João
        { pergunta: "Na carta de 3 João, qual é o nome do amado a quem o presbítero escreveu?", resposta: "Gaio", referencia: "3 João 1:1" },

        // Judas
        { pergunta: "Qual arcanjo contendia com o diabo e disputava a respeito do corpo de Moisés?", resposta: "Miguel", referencia: "Judas 1:9" },

        // Apocalipse
        { pergunta: "O que Jesus prometeu dar a quem for fiel até à morte?", resposta: "Coroa da vida", referencia: "Apocalipse 2:10" },
        { pergunta: "De qual tribo é o Leão que venceu para abrir o livro e desatar os seus sete selos?", resposta: "Judá", referencia: "Apocalipse 5:5" }

    ],

    4: [

        // --- banco original (tema missionário) ---
        { pergunta: "Complete: Ide por todo o ________.", resposta: "Mundo", referencia: "Marcos 16:15" },
        { pergunta: "O que significa a palavra Evangelho?", resposta: "Boas Notícias", referencia: "Lucas 2:10" },
        { pergunta: "Qual foi a última ordem de Jesus antes de subir ao céu?", resposta: "Pregar o Evangelho e fazer discípulos de todas as nações", referencia: "Mateus 28:19-20" },
        { pergunta: "Como uma criança pode ser missionária?", resposta: "Falando de Jesus, orando, ajudando as pessoas e dando bom exemplo.", referencia: "1 Timóteo 4:12" },
        { pergunta: "Qual livro da Bíblia conta as viagens missionárias de Paulo?", resposta: "Atos dos Apóstolos", referencia: "Atos 13:2-3" },
        { pergunta: "Complete: Deus amou o ________ de tal maneira...", resposta: "Mundo", referencia: "João 3:16" },
        { pergunta: "Quem foi o maior missionário do Novo Testamento?", resposta: "Apóstolo Paulo", referencia: "Atos 9:15" },
        { pergunta: "Segundo Mateus 28, Jesus mandou fazer discípulos de quem?", resposta: "De todas as nações", referencia: "Mateus 28:19" },

        // Gênesis
        { pergunta: "Que guisado Jacó deu a Esaú, que assim desprezou a sua primogenitura?", resposta: "De lentilhas", referencia: "Gênesis 25:34" },
        { pergunta: "Que nome Jacó deu ao lugar onde sonhou com a escada que tocava nos céus?", resposta: "Betel", referencia: "Gênesis 28:12-19" },

        // Êxodo
        { pergunta: "Quem sustentou as mãos de Moisés, um de um lado e o outro do outro, na peleja contra Amaleque?", resposta: "Arão e Hur", referencia: "Êxodo 17:12" },
        { pergunta: "Quais eram os nomes das duas parteiras das hebréias?", resposta: "Sifrá e Puá", referencia: "Êxodo 1:15" },

        // Levítico
        { pergunta: "Quais dois filhos de Arão ofereceram fogo estranho perante o Senhor?", resposta: "Nadabe e Abiú", referencia: "Levítico 10:1" },

        // Números
        { pergunta: "Que fruto a vara de Arão deu quando floresceu?", resposta: "Amêndoas", referencia: "Números 17:8" },

        // Deuteronômio
        { pergunta: "A que monte Moisés subiu para que o Senhor lhe mostrasse toda a terra prometida?", resposta: "Monte Nebo", referencia: "Deuteronômio 34:1" },

        // Josué
        { pergunta: "Quem tomou do anátema e acendeu a ira do Senhor contra Israel?", resposta: "Acã", referencia: "Josué 7:1" },
        { pergunta: "Qual cidade Josué deu a Calebe por herança?", resposta: "Hebrom", referencia: "Josué 14:13" },

        // Juízes
        { pergunta: "Qual libertador de Israel era filho de Quenaz e irmão de Calebe?", resposta: "Otniel", referencia: "Juízes 3:9" },
        { pergunta: "Que palavra os gileaditas mandavam dizer para descobrir quem era efraimita?", resposta: "Chibolete", referencia: "Juízes 12:5-6" },

        // Rute
        { pergunta: "Em Israel, o que o homem descalçava e dava ao outro para confirmar um negócio?", resposta: "O sapato", referencia: "Rute 4:7" },

        // 1 Samuel
        { pergunta: "Que nome Samuel deu à pedra que pôs entre Mizpá e Sem?", resposta: "Ebenézer", referencia: "1 Samuel 7:12" },
        { pergunta: "Qual era o nome do deus dos filisteus que caiu com o rosto em terra diante da arca?", resposta: "Dagom", referencia: "1 Samuel 5:4" },

        // 2 Samuel
        { pergunta: "Qual filha de Saul olhou pela janela e desprezou Davi no seu coração ao vê-lo bailando e saltando diante do Senhor?", resposta: "Mical", referencia: "2 Samuel 6:16" },

        // 1 Reis
        { pergunta: "Em quantos anos Salomão edificou a casa do Senhor?", resposta: "Sete anos", referencia: "1 Reis 6:38" },
        { pergunta: "Qual foi a mulher que o rei Acabe tomou por esposa, filha de Etbaal?", resposta: "Jezabel", referencia: "1 Reis 16:31" },

        // 2 Reis
        { pergunta: "Em que cidade Eliseu estava quando o exército da Síria chegou de noite e a cercou?", resposta: "Dotã", referencia: "2 Reis 6:11-14" },

        // 1 Crônicas
        { pergunta: "Davi prometeu que quem ferisse primeiro os jebuseus seria chefe e capitão. Quem subiu primeiro e foi feito chefe?", resposta: "Joabe", referencia: "1 Crônicas 11:6" },

        // 2 Crônicas
        { pergunta: "O rei Jeosafá mandou quem sair na frente dos soldados armados, louvando ao Senhor?", resposta: "Cantores", referencia: "2 Crônicas 20:20-21" },

        // Esdras
        { pergunta: "O que Esdras apregoou junto ao rio Aava, para o povo se humilhar diante de Deus?", resposta: "Um jejum", referencia: "Esdras 8:21" },

        // Neemias
        { pergunta: "Em quantos dias o muro de Jerusalém foi acabado?", resposta: "52 dias", referencia: "Neemias 6:15" },

        // Ester
        { pergunta: "Com que outro nome Mardoqueu criou Ester?", resposta: "Hadassa", referencia: "Ester 2:7" },
        { pergunta: "Que nome deram àqueles dias, tirado do nome Pur?", resposta: "Purim", referencia: "Ester 9:26" },

        // Jó
        { pergunta: "De onde o Senhor respondeu a Jó?", resposta: "Redemoinho", referencia: "Jó 38:1" },
        { pergunta: "Qual era o nome da primeira filha que Jó teve depois que o Senhor o abençoou de novo?", resposta: "Jemima", referencia: "Jó 42:12-14" },

        // Salmos
        { pergunta: "Segundo o Salmo 42, qual animal brama pelas correntes das águas?", resposta: "O cervo", referencia: "Salmos 42:1" },
        { pergunta: "Segundo o Salmo 137, em que árvores o povo pendurou as suas harpas?", resposta: "Salgueiros", referencia: "Salmos 137:2" },

        // Provérbios
        { pergunta: "Segundo Provérbios, os homens de qual rei de Judá transcreveram os provérbios de Salomão?", resposta: "Ezequias", referencia: "Provérbios 25:1" },

        // Eclesiastes
        { pergunta: "Segundo Eclesiastes 11, sobre o que devemos lançar o nosso pão?", resposta: "Sobre as águas", referencia: "Eclesiastes 11:1" },

        // Cânticos
        { pergunta: "Complete o versículo de Cânticos: \"As muitas ______ não podem apagar este amor.\"", resposta: "Águas", referencia: "Cânticos 8:7" },

        // Isaías
        { pergunta: "Quantos anos o Senhor acrescentou aos dias do rei Ezequias depois de ouvir a sua oração?", resposta: "Quinze anos", referencia: "Isaías 38:5" },

        // Jeremias
        { pergunta: "Quem tirou Jeremias da cisterna puxando-o com cordas?", resposta: "Ebede-Meleque", referencia: "Jeremias 38:11-13" },

        // Lamentações
        { pergunta: "Que animais Lamentações diz que andam pelo monte de Sião, que está assolado?", resposta: "Raposas", referencia: "Lamentações 5:18" },

        // Ezequiel
        { pergunta: "Na visão de Ezequiel, quantos rostos tinha cada ser vivente?", resposta: "Quatro", referencia: "Ezequiel 1:5-6" },

        // Daniel
        { pergunta: "Que novo nome o chefe dos eunucos pôs em Daniel na Babilônia?", resposta: "Beltessazar", referencia: "Daniel 1:7" },
        { pergunta: "Na estátua do sonho, os pés eram em parte de ferro e em parte de quê?", resposta: "Barro", referencia: "Daniel 2:33" },
        { pergunta: "Que nome a voz chamou para dar a entender a visão a Daniel?", resposta: "Gabriel", referencia: "Daniel 8:16" },

        // Oseias
        { pergunta: "Complete o versículo de Oseias sobre Israel: \"Porque semearam vento, e segarão ________.\"", resposta: "Tormenta", referencia: "Oseias 8:7" },

        // Joel
        { pergunta: "O profeta Joel era filho de quem?", resposta: "Petuel", referencia: "Joel 1:1" },

        // Amós
        { pergunta: "Amós disse a Amazias que não era profeta, mas boiadeiro e cultivador de quê?", resposta: "Sicômoros", referencia: "Amós 7:14" },

        // Obadias
        { pergunta: "Obadias disse que a casa de Jacó seria fogo. E a casa de Esaú seria o quê?", resposta: "Palha", referencia: "Obadias 1:18" },

        // Jonas
        { pergunta: "Qual era o nome do pai de Jonas?", resposta: "Amitai", referencia: "Jonas 1:1" },

        // Miqueias
        { pergunta: "Em Miqueias, Deus lembra que enviou adiante do povo, na saída do Egito, Moisés, Arão e mais uma pessoa. Quem era ela?", resposta: "Miriã", referencia: "Miqueias 6:4" },

        // Naum
        { pergunta: "Naum pergunta: onde está agora o covil de qual animal?", resposta: "Leões", referencia: "Naum 2:11" },

        // Habacuque
        { pergunta: "Habacuque disse que o Senhor Deus faria os seus pés como os de qual animal?", resposta: "Cervas", referencia: "Habacuque 3:19" },

        // Ageu
        { pergunta: "Quem era o governador de Judá a quem o profeta Ageu levou a palavra do Senhor?", resposta: "Zorobabel", referencia: "Ageu 1:1" },

        // Zacarias
        { pergunta: "Zacarias contou que pesaram o seu salário. Quantas moedas de prata foram?", resposta: "Trinta", referencia: "Zacarias 11:12" },

        // Malaquias
        { pergunta: "Segundo o profeta Malaquias, o que nascerá para os que temem o nome de Deus, trazendo cura nas suas asas?", resposta: "Sol da justiça", referencia: "Malaquias 4:2" },

        // Mateus
        { pergunta: "Para a casa de qual sumo sacerdote Jesus foi levado depois de preso?", resposta: "Caifás", referencia: "Mateus 26:57" },
        { pergunta: "Quem foi obrigado a levar a cruz de Jesus?", resposta: "Simão cireneu", referencia: "Mateus 27:32" },

        // Marcos
        { pergunta: "Que nome Jesus deu a Tiago e João, que significa \"Filhos do trovão\"?", resposta: "Boanerges", referencia: "Marcos 3:17" },
        { pergunta: "Quando Jesus perguntou ao espírito imundo \"Qual é o teu nome?\", que nome ele respondeu?", resposta: "Legião", referencia: "Marcos 5:8-9" },

        // Lucas
        { pergunta: "Na sinagoga de Nazaré, foi dado a Jesus o livro de qual profeta para ler?", resposta: "Isaías", referencia: "Lucas 4:16-17" },
        { pergunta: "Como se chamava a profetisa, filha de Fanuel, que estava no templo quando o menino Jesus foi apresentado?", resposta: "Ana", referencia: "Lucas 2:36-38" },

        // João
        { pergunta: "Havia quantos anos que estava enfermo o homem do tanque de Betesda?", resposta: "Trinta e oito", referencia: "João 5:2-5" },
        { pergunta: "Quantos grandes peixes tinha a rede que Simão Pedro puxou para terra?", resposta: "153", referencia: "João 21:11" },

        // Atos
        { pergunta: "Qual jovem dormiu numa janela e caiu do terceiro andar durante a pregação de Paulo?", resposta: "Eutico", referencia: "Atos 20:9" },
        { pergunta: "Como se chamava a porta do templo onde punham o coxo para pedir esmola?", resposta: "Formosa", referencia: "Atos 3:2" },
        { pergunta: "Como se chamava a ilha onde Paulo e os outros escaparam do naufrágio?", resposta: "Malta", referencia: "Atos 28:1" },

        // Romanos
        { pergunta: "No fim da carta, quem diz: Eu, que esta carta escrevi, vos saúdo no Senhor?", resposta: "Tércio", referencia: "Romanos 16:22" },

        // 1 Coríntios
        { pergunta: "Paulo deu graças a Deus por não ter batizado nenhum dos coríntios, a não ser dois homens. Quem foram eles?", resposta: "Crispo e Gaio", referencia: "1 Coríntios 1:14" },
        { pergunta: "Em qual cidade Paulo disse que ficaria até o Pentecostes?", resposta: "Éfeso", referencia: "1 Coríntios 16:8" },

        // 2 Coríntios
        { pergunta: "Para escapar de Damasco, Paulo foi descido pela janela da muralha dentro de quê?", resposta: "Num cesto", referencia: "2 Coríntios 11:32-33" },

        // Gálatas
        { pergunta: "Paulo conta que, depois que Deus o chamou, ele não voltou a Jerusalém, mas partiu para qual lugar?", resposta: "Arábia", referencia: "Gálatas 1:15-17" },

        // Efésios
        { pergunta: "Segundo Efésios 2:20, quem é a principal pedra da esquina?", resposta: "Jesus Cristo", referencia: "Efésios 2:20" },
        { pergunta: "Que irmão amado Paulo enviou aos efésios para lhes contar tudo sobre ele?", resposta: "Tíquico", referencia: "Efésios 6:21" },

        // Filipenses
        { pergunta: "Em Filipenses 3, Paulo disse que era de qual tribo?", resposta: "Benjamim", referencia: "Filipenses 3:5" },
        { pergunta: "Qual cooperador Paulo mandou aos filipenses, que esteve doente e quase à morte?", resposta: "Epafrodito", referencia: "Filipenses 2:25-27" },

        // Colossenses
        { pergunta: "Paulo diz que a nossa palavra deve ser sempre agradável e temperada com o quê?", resposta: "Com sal", referencia: "Colossenses 4:6" },

        // 1 Tessalonicenses
        { pergunta: "Em 1 Tessalonicenses 5, a esperança da salvação é comparada a qual peça da armadura?", resposta: "Capacete", referencia: "1 Tessalonicenses 5:8" },

        // 2 Tessalonicenses
        { pergunta: "Quem escreveu a carta de 2 Tessalonicenses junto com Paulo?", resposta: "Silvano e Timóteo", referencia: "2 Tessalonicenses 1:1" },

        // 1 Timóteo
        { pergunta: "Paulo rogou que Timóteo ficasse em qual cidade?", resposta: "Éfeso", referencia: "1 Timóteo 1:3" },

        // 2 Timóteo
        { pergunta: "Que peça de roupa Paulo pediu que Timóteo trouxesse de Trôade?", resposta: "Capa", referencia: "2 Timóteo 4:13" },

        // Hebreus
        { pergunta: "Segundo Hebreus 7, Melquisedeque era rei de qual cidade?", resposta: "Salém", referencia: "Hebreus 7:1" },
        { pergunta: "Segundo Hebreus 9, dentro da arca da aliança estava a vara de quem, que tinha florescido?", resposta: "Arão", referencia: "Hebreus 9:4" },

        // 1 Pedro
        { pergunta: "Por meio de qual fiel irmão Pedro escreveu brevemente a sua carta?", resposta: "Silvano", referencia: "1 Pedro 5:12" },

        // 1 João
        { pergunta: "Segundo 1 João 5, do que João manda os filhinhos se guardarem?", resposta: "Dos ídolos", referencia: "1 João 5:21" },

        // 2 João
        { pergunta: "A quem o ancião dirigiu a carta de 2 João?", resposta: "Senhora eleita", referencia: "2 João 1:1" },

        // 3 João
        { pergunta: "Quem procurava ter o primado na igreja, não recebia os irmãos e ainda os lançava fora?", resposta: "Diótrefes", referencia: "3 João 1:9-10" },

        // Judas
        { pergunta: "Quem profetizou dizendo: Eis que é vindo o Senhor com milhares de seus santos?", resposta: "Enoque", referencia: "Judas 1:14" },

        // Apocalipse
        { pergunta: "Quantos anciãos João viu assentados em tronos ao redor do trono de Deus?", resposta: "Vinte e quatro", referencia: "Apocalipse 4:4" }

    ]

};

/*
=========================================================
SORTEIO SEM REPETIÇÃO

historico guarda, por categoria, os índices já usados NESTA copa.
É salvo no localStorage junto com o estado e zerado a cada nova copa.
=========================================================
*/

const historico = {

    1: [],
    2: [],
    3: [],
    4: []

};

// Todas as perguntas ainda não usadas, de todas as categorias
function perguntasDisponiveis(gols = null){

    const pool = [];

    Object.keys(perguntas).forEach(k => {

        const g = Number(k);
        if(gols && g !== gols) return;

        perguntas[g].forEach((_, i) => {

            if(!historico[g].includes(i)) pool.push({ g, i });

        });

    });

    return pool;

}

function sortearPergunta(gols = null){

    let pool = perguntasDisponiveis(gols);
    let reiniciou = false;

    // Banco esgotado: começa um novo ciclo para o jogo não travar
    if(!pool.length){

        if(gols) historico[gols] = [];
        else Object.keys(historico).forEach(k => { historico[k] = []; });

        pool = perguntasDisponiveis(gols);
        reiniciou = true;

    }

    const escolha = pool[Math.floor(Math.random()*pool.length)];

    historico[escolha.g].push(escolha.i);

    const q = perguntas[escolha.g][escolha.i];

    return{

        gols: escolha.g,

        pergunta: q.pergunta,

        resposta: q.resposta,

        referencia: q.referencia,

        reiniciou

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
