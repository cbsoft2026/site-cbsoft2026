# Convenção de Commits

Utilizamos uma convenção baseada em Conventional Commits.

Formato:

```
<tipo>: <descrição>
<tipo>: <contexto>: <descrição>
<tipo>: <contexto>: <subcontexto>: <descrição>
```

Exemplos válidos:

```
docs: atualiza README
fix: corrige link quebrado

chore: industry: atualiza dados
docs: support: melhora instruções

feat: sbes: industry: adiciona nova indústria
fix: sbes: company: corrige website da empresa
```

Tipos mais comuns:

- `feat`
- `fix`
- `docs`
- `chore`
- `refactor`
- `test`

Utilize quantos níveis de contexto forem necessários para tornar o commit mais claro.

O corpo da mensagem de commit pode ser utilizado para adicionar contexto, justificativas ou detalhes complementares sobre a alteração.
