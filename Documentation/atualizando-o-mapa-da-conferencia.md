# Atualizando o mapa da conferência

O mapa da conferência utiliza dados do **OpenStreetMap (OSM)** para representar os prédios do local do evento. A visualização do mapa utiliza o **CARTO** como provedor dos mapas base.

Os dados dos prédios e os mapas dos andares ficam dentro de:

```text
public/data/buildings/
```

A estrutura é organizada da seguinte forma:

```text
public/data/buildings
├── index.json
├── index.ts
├── [osm_id]/
│   ├── floor-0.svg
│   ├── floor-1.svg
│   └── ...
└── ...
```

## Dados dos prédios

Cada prédio é identificado pelo seu `osm_id`, que corresponde ao identificador do prédio no OpenStreetMap.

Por exemplo:

```text
public/data/buildings/154079142/
```

corresponde ao prédio com o OSM ID:

```text
154079142
```

## Obtendo os dados do OpenStreetMap

O projeto possui o script:

```text
scripts/downloadBuilding.py
```

Esse script recebe um `osm_id` e obtém a respectiva _feature_ do OpenStreetMap em formato GeoJSON.

O objetivo é utilizar o OpenStreetMap como fonte dos dados geográficos dos prédios, sem precisar manter manualmente essas informações no código.

O GeoJSON obtido pelo script deve ser armazenado em:

```text
public/data/buildings/index.json
```

### Por que utilizar `index.json`?

O `index.json` funciona como um cache local dos dados dos prédios.

Dessa forma, a página não precisa realizar uma nova requisição ao OpenStreetMap sempre que o mapa for carregado. Isso reduz o número de requisições externas e permite que os dados dos prédios sejam carregados mais rapidamente.

A ideia geral é:

```text
OpenStreetMap
      │
      │ downloadBuilding.py
      v
    GeoJSON
      │
      v
public/data/buildings/index.json
      │
      v
   aplicação
```

> [!NOTE]
> Quando um prédio for adicionado ou quando seus dados no OpenStreetMap forem alterados, o `index.json` deve ser atualizado utilizando o `scripts/downloadBuilding.py`.

## `index.json`

O arquivo:

```text
public/data/buildings/index.json
```

contém as _features_ GeoJSON dos prédios utilizados pelo mapa.

Cada prédio é identificado pelo seu `osm_id`.

O arquivo é utilizado pela aplicação para obter a geometria do prédio sem precisar consultar novamente o OpenStreetMap durante o carregamento da página.

---

## `index.ts`

Além dos dados geográficos, a aplicação possui o arquivo:

```text
public/data/buildings/index.ts
```

Esse arquivo contém a configuração dos prédios utilizados no mapa.

Cada prédio possui informações como:

- nome;
- tipo;
- andares disponíveis;
- componente responsável pela visualização de cada andar.

Por exemplo:

```ts
154079142: {
  name: 'bloco-b',
  type: 'building',
  floors: [
    {
      id: 0,
      name: 'Térreo',
      component: BlocoBFloor0,
    },
    {
      id: 1,
      name: 'Primeiro Andar',
      component: BlocoBFloor0,
    },
  ],
},
```

---

## Mapas dos andares

Cada prédio pode possuir um ou mais mapas de seus andares.

Esses arquivos ficam dentro do diretório correspondente ao `osm_id`:

```text
public/data/buildings/[osm_id]
```

Por exemplo:

```text
public/data/buildings/154079142/
├── floor-0.svg
├── floor-1.svg
└── ...
```

Cada arquivo SVG representa um andar do prédio.

Uma possível organização é:

```text
154079142/
├── floor-0.svg  # Térreo
├── floor-1.svg  # Primeiro Andar
└── floor-2.svg  # Segundo Andar
```

> [!IMPORTANT]
> O identificador utilizado para cada andar deve ser consistente entre a configuração do prédio e o respectivo mapa SVG.

### Editando os mapas dos andares

Os mapas dos andares são arquivos **SVG** e podem ser editados utilizando o Inkscape.

Para editar um andar, abra o arquivo correspondente no Inkscape. Por exemplo:

```text
public/data/buildings/154079142/floor-0.svg
```

Após realizar as alterações, é importante garantir que a área da página do SVG corresponda ao tamanho do mapa.

No Inkscape, utilize:

```text
Ctrl + Shift + R
```

Esse comando redimensiona a página para se ajustar ao conteúdo do desenho. Isso é importante porque a aplicação utiliza a área da página do SVG para posicionar e exibir o mapa corretamente.

Depois de ajustar a página, exporte o arquivo novamente no formato **Plain SVG**.

## Fontes dos dados

O mapa utiliza diferentes fontes para suas informações:

- **OpenStreetMap** — fornece os dados geográficos dos prédios.
- **CARTO** — fornece o mapa base utilizado na visualização.
- **SVGs locais** — representam os mapas detalhados dos andares dos prédios.

Os dados do OpenStreetMap são obtidos pelo script:

```text
scripts/downloadBuilding.py
```

e armazenados localmente em:

```text
public/data/buildings/index.json
```

Essa abordagem permite manter os dados necessários para o funcionamento do mapa localmente, evitando que a aplicação precise baixar novamente os dados dos prédios a cada carregamento.
