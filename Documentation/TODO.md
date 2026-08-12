# TODO

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
