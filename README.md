![CBSOFT Logo](./public/images/logos/cbsoft-logo.svg)

## Iniciando o projeto

Caso queira usar o Docker Compose como alternativa à instalação manual, veja a seção [Docker Compose](#docker-compose).

Antes de começar, é necessário ter o [Node.js](https://nodejs.org/pt/download) instalado e criar um arquivo `.env` para configurar parâmetros do `sitemap.xml`.

1. **Instalar dependências**

```bash
npm install
```

2. **Rodar em modo desenvolvimento**

Caso queira rodar em modo desenvolvimento, basta

```bash
npm run dev
```

A aplicação ficará disponível em: [http://localhost:3000/{NEXT_PUBLIC_URL}/{LOCALE}](http://localhost:3000/{NEXT_PUBLIC_URL}/{LOCALE}).

3. **Gerar o build do projeto**

```bash
npm run build
```

gerando todos os arquivos necessários na pasta `out/`.

## Docker Compose

Para gerar os arquivos na pasta `out/`

```bash
docker-compose -f docker-compose.yml up --build 
```

Para usar o modo watch do docker para desenvolvimento

```bash
docker-compose up --build 
```

> [!NOTE]
> O modo desenvolvimento do nextjs consome bastante memória ram.

## Alterações de informações

| Tipo | Localização | Observação |
|------|------------|------------|
| Dados anuais | `public/data/` | Atualizados anualmente[^1] |
| Traduções | `locale/` (`pt` e `en`) | Textos traduzidos |

* **Dados anuais:** Arquivos que precisam ser atualizados todo ano devem ser colocados na pasta `public/data/`.

* **Traduções:** Textos para os idiomas `pt` e `en` devem estar na pasta `locale/`.

Para observar as alterações na página é necessário compilar os *json*'s e os *yaml*'s

```bash
npm run generate-messages
npm run generate-events
npm run generate-data
```
ou simplesmente realizar o build.

[^1]: Idealmente