# Ferramentas do banco de perguntas

Ferramentas de **autoria e verificação** das perguntas. O jogo **não depende**
delas: `index.html` continua abrindo com duplo-clique, offline, sem servidor e
sem Node. Nada daqui é carregado em tempo de execução.

## Por que existe

As perguntas do jogo mostram um versículo (`referencia`) na revelação da
resposta. Escrever essas referências de memória — humano ou modelo — produz
erro numa taxa alta e silenciosa: no piloto, 3 de 13 perguntas escritas com
cuidado tinham problema real (referência um versículo fora, palavra que não
existe na tradução, versículo que não provava a resposta). Nenhum seria pego
por revisão de leitura.

A regra do banco é: **toda referência é conferida contra o texto real da
Bíblia antes de entrar**.

## `biblia-acf.json`

Bíblia Almeida Corrigida Fiel (domínio público), 66 livros, 31.106 versículos.
Formato: `[{ name, abbrev, chapters: [ [versículo, ...], ... ] }]`.

## `biblia.js` — consulta

Como CLI, a partir da raiz do projeto:

```bash
node ferramentas/biblia.js verso "João 3:16"      # um versículo
node ferramentas/biblia.js verso "João 3:1-2"     # intervalo
node ferramentas/biblia.js texto "Obadias"        # livro inteiro
node ferramentas/biblia.js texto "João" 3         # só o capítulo 3
node ferramentas/biblia.js busca "Jonas" "peixe"  # procura no livro
node ferramentas/biblia.js livros
```

Referência inexistente imprime `ERRO` e sai com código 1 — é isso que impede
uma referência inventada de passar despercebida.

Como módulo: `require("./ferramentas/biblia")` expõe `verso`, `busca`, `texto`.

Aceita os nomes usados no jogo e traduz para os da ACF (`Cantares de Salomão`
→ `Cânticos`, `Lamentações` → `Lamentações de Jeremias`, `Oseias` → `Oséias`,
`Miqueias` → `Miquéias`).

## `verificar-lote.js` — conferência

```bash
node ferramentas/verificar-lote.js lote.json [--verboso]
```

Recebe um array de `{ gols, pergunta, resposta, referencia }`.

**Erros graves** (saem com código 1, barram o lote): referência que não existe,
`gols` fora de 1–4, campo vazio, pergunta repetida — dentro do lote ou contra
as que já estão em `perguntas.js`.

**Avisos** (não barram, pedem olho humano): a resposta não aparecer literal no
versículo, ou passar de 15 caracteres. O aviso de "não aparece literal" tem
falso-positivo por natureza — `"Cinco"` contra `"cinco pães"` passa, mas `"5"`
não, e as duas estão certas. Por isso é aviso, não erro.

## Padrão de uma pergunta

```js
{ gols: 2, pergunta: "Quem procurou Jesus durante a noite para conversar?",
  resposta: "Nicodemos", referencia: "João 3:1-2" }
```

- `gols` — dificuldade e valor, 1 (quase toda criança sabe) a 4 (difícil).
- `resposta` — curta, 1 a 3 palavras. O líder julga de ouvido, ao vivo.
  A média das perguntas originais é 10 caracteres.
- `referencia` — versículo que **prova** a resposta, no vocabulário da ACF.
  Sem meta-pergunta ("quantos capítulos tem o livro"): se o versículo não
  prova, a pergunta não entra.
