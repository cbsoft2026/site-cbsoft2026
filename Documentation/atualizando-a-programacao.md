# Atualizando a programação

Toda a programação do evento fica na pasta:

```text
public/data/events
```

<!-- Atualmente a programação existe apenas em **português**, então todas as
alterações devem ser feitas em:

```text
public/data/events/pt
``` -->

A estrutura é organizada da seguinte forma:

```text
public/data/events/pt
├── [programa]/
├── [simposio]/
└── schedule/
```

Cada pasta pode conter alguns dos seguintes arquivos:

```text
chamada.md
artigo.json
painel.json
palestra.json
session.json
tutorial.json
```

## Organização dos arquivos JSON

A programação é dividida em diferentes arquivos JSON
(`palestra.json`, `painel.json`, `session.json` e `tutorial.json`) para separar
os diferentes tipos de atividades.

Cada tipo possui suas próprias características e campos específicos. Por
exemplo, palestras possuem `speakers`, enquanto sessões podem possuir um
`chair`.

Além da organização dos dados, essa separação também é utilizada na geração da
programação do site. Cada tipo de atividade é identificado individualmente e
exibido com uma cor diferente, facilitando a visualização e a distinção entre
palestras, painéis, sessões e tutoriais.

### Organização das trilhas

Alguns **programas** e **simpósios** são divididos em trilhas (_tracks_).

Nesses casos, o arquivo `chamada.md` de cada trilha fica dentro do diretório da
própria trilha, enquanto os arquivos de programação (`palestra.json`,
`painel.json`, `session.json` e `tutorial.json`) continuam no diretório
principal do programa ou simpósio.

Por exemplo:

```text
public/data/events/pt/[programa]/
├── artigo.json
├── palestra.json
├── session.json
├── tutorial.json
├── painel.json
├── trilha-1/
│   └── chamada.md
├── trilha-2/
│   └── chamada.md
└── trilha-3/
    └── chamada.md
```

## Arquivos

### `palestra.json`

Contém a lista de palestras.

Exemplo:

```json
[
  {
    "title": "Abertura e Prêmios SBLP",
    "speakers": ["jeronimo-castrillon"],
    "schedule": {
      "start": "2026-09-10T09:00:00-03:00",
      "end": "2026-09-10T10:30:00-03:00"
    },
    "description": "Keynote SBLP - Sala Alan Turing (auditório FAU)",
    "rooms": ["auditorio-fau", "auditorio-ime", "b5", "b16", "b9", "b10", "b1", "b2", "b3", "ccsl", "b101", "numec"]
  }
]
```

Campos:

| Campo            | Descrição                                      |
| ---------------- | ---------------------------------------------- |
| `title`          | Título da palestra.                            |
| `speakers`       | Lista com os identificadores dos palestrantes. |
| `schedule.start` | Data e horário de início (formato ISO 8601).   |
| `schedule.end`   | Data e horário de término (formato ISO 8601).  |
| `description`    | Texto exibido na programação.                  |
| `rooms`          | Lista das salas onde a palestra acontece.      |

---

### `session.json`

Contém as sessões da programação.

Além dos campos da palestra, uma sessão também pode possuir:

| Campo   | Descrição                |
| ------- | ------------------------ |
| `chair` | Responsável pela sessão. |

---

### `tutorial.json`

Contém a lista de tutoriais e segue a mesma estrutura utilizada em
`palestra.json`.

---

### `artigo.json`

Contém a lista de artigos de uma sessão.

Exemplo:

```json
[
  {
    "title": "...",
    "authors": ["...", "..."],
    "schedule": {
      "start": "2026-09-08T11:00:00-03:00",
      "end": "2026-09-08T11:10:00-03:00"
    }
  }
]
```

> [!NOTE]
> Cada artigo é atribuído a uma sessão, definindo um horário de início e um
> horário de término dentro do período da sessão.

---

## Programação geral

A pasta `schedule` possui um arquivo chamado:

```text
public/data/events/pt/schedule/schedules.json
```

Esse arquivo é utilizado para atividades gerais da programação, como:

- Credenciamento
- Coffee break
- Almoço
- Cerimônia de abertura
- Encerramento

Cada item possui a seguinte estrutura:

```json
{
  "schedule": {
    "start": "2026-09-10T08:00:00-03:00",
    "end": "2026-09-10T09:00:00-03:00"
  },
  "title": "Credenciamento",
  "rooms": ["auditorio-fau"],
  "description": "Recepção dos participantes"
}
```

## Cuidados ao editar

Os arquivos de programação utilizam o formato **JSON**.

Alguns cuidados importantes:

- Não deixe vírgula após o último elemento de um objeto ou lista.
- Utilize sempre aspas duplas (`"`).

Por exemplo, o código abaixo é **inválido**:

```text
{
  "title": "Minha palestra",
  "rooms": ["auditorio-fau"],
                            ^ vírgula após o último elemento
}
```
