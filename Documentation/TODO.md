# TODO

### Melhorar o cadastro de artigos em sessões técnicas

`[enhancement]` `[content]`

Para cadastrar artigos vinculados a uma sessão técnica, precisa repetir várias
informações que são iguais para todos os artigos da sessão.

Por exemplo:

```json
{
  "title": "{TITLE}",
  "authors": ["{AUTHOR1}", "{AUTHOR2}"],
  "schedule": {
    "start": "2026-09-10T16:30:00-03:00",
    "end": "2026-09-10T16:50:00-03:00"
  },
  "rooms": ["ccsl"],
  "track": "tools"
}
```

Para os artigos de uma mesma sessão, `rooms` e `track`, por exemplo, acabam
sendo repetidos várias vezes. Na prática, o que muda entre os artigos é o
título, autores e horário.

Isso também deixa mais complicado mover um artigo de uma sessão para outra, já
que é necessário alterar manualmente essas informações.

Seria interessante revisar essa estrutura para evitar essa repetição e deixar
mais simples o gerenciamento dos artigos dentro das sessões técnicas.

### Melhorar desempenho e tamanho da página de programação

A quantidade de eventos na programação aumentou bastante e, com isso, a página está ficando muito grande e mais lenta para carregar.

Precisa avaliar alguma solução para reduzir o tamanho da página e melhorar o tempo de carregamento, principalmente pensando no aumento da quantidade de eventos.

`[enhancement]` `[performance]`

### Simplicar caminho `url` para simpósios

Atualmente o caminho é:

```text
src/app/[locale]/(main)/symposiums/
```

pode ser movido para

```text
src/app/[locale]/(main)/[program]/
```

junto com os outros co-eventos, workshops, entre outros, para simplificar
caminho `url` para simpósios.

Necessário também mover `tracks` e não é necessário criar um caminho `call/`
para as **Chamadas de Trabalho** pode ser simplificado como o caminho padrão
ser a chamada.

### Adicionar suporte a SEO multilíngue (`hreflang`)

`[seo]`

1. Adicionar tags `hreflang` em todas as páginas.

```html
<link rel="alternate" hreflang="pt" href="https://cbsoft.sbc.org.br/2026/pt/" />
<link rel="alternate" hreflang="en" href="https://cbsoft.sbc.org.br/2026/en/" />
<link rel="alternate" hreflang="x-default" href="https://cbsoft.sbc.org.br/2026/" />
```

2. Adicionar urls canônicas para cada página de idioma.

- página `pt`:

```html
<link rel="canonical" href="https://cbsoft.sbc.org.br/2026/pt/" />
```

- página `en`:

```html
<link rel="canonical" href="https://cbsoft.sbc.org.br/2026/en/" />
```

3. Deve ser implementado em todas as páginas (não apenas na página inicial).

4. Adicionar suporte a sitemap XML multilíngue (`hreflang` no sitemap)

> Repositório interessante que adiciona suporte no Jekyll: https://github.com/untra/polyglot

### Melhoria na forma de inserir imagens dentro de `locales/`

`[enhancement]` `[maintenance]`

Atualmente, quando preciso inserir uma imagem em uma página mantida em `locales/` devo inserir a imagem em `public/images/`.

Exemplo:

- `locales/[locale]/pages/cbsoft/accommodation.json`
- `public/images/tristar.webp`
