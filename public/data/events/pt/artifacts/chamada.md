#### Introdução

O CBSoft 2026 consolidará a avaliação de Artefatos e a atribuição de **Selos para artigos que disponibilizam Artefatos**. Assim como em 2025, os PDFs dos artigos com artefatos avaliados com sucesso receberão selos para publicação como parte oficial do CBSoft. O objetivo do Festival de Artefatos é:

1. Promover a Ciência Aberta na pesquisa em Engenharia de Software;

1. Recompensar os autores de artigos que compartilham seus artefatos;

1. Ajudar os leitores a identificar artigos com artefatos disponíveis e funcionais.

Artigos com selos contêm artefatos reutilizáveis, promovendo a transparência e permitindo que outros pesquisadores repliquem o estudo, validem suas descobertas e desenvolvam suas pesquisas por meio da reutilização. Artigos com selos também têm maior prestígio na comunidade científica.

Autores de artigos aceitos no SBES (em qualquer trilha), SAST, SBCARS e SBLP 2026 podem submeter os artefatos associados a esses artigos para avaliação.

#### Tipos de Artefatos

**Artefato** é um termo guarda-chuva que engloba diversos tipos de materiais e produtos. Ele inclui desde materiais básicos, como **questionários de entrevistas**, até produtos mais complexos, como **ferramentas totalmente automatizadas**. Todos os artefatos que possam ser úteis para **futuros projetos de pesquisa** são bem-vindos.

Entre os artefatos de interesse estão, entre outros:

- **Repositórios de dados**, contendo dados utilizados ou produzidos durante o estudo;​

- Ferramentas e frameworks, que sejam implementações de sistemas e serviços que possam ser utilizados e potencialmente estendidos;​

- **Artefatos qualitativos**, como **roteiros de entrevista e modelos de questionários (surveys)**. Transcrições de entrevistas e resultados de surveys também são muito valiosos, desde que os autores possam compartilhá-los (por exemplo, entrevistas podem conter **informações sensíveis sobre uma empresa**);​

- **Modelos de aprendizado de máquina específicos para Engenharia de Software,** por exemplo, modelos pré-treinados que possam ser usados para resolver problemas da área;​

- **Pacotes de replicação**, que podem ser uma combinação dos itens acima, dependendo do tipo de pesquisa, e que ajudam outros pesquisadores a **replicar o estudo apresentado no artigo aceito**.

#### Atribuição de Selos

Os **artefatos** podem ser considerados **Available (Disponível)** ou **Functional (Funcional)**, resultando na obtenção dos respectivos **selos de artefato** (ver abaixo). Esses selos são **independentes entre si** e podem ser aplicados a qualquer artigo.

<img src="/2026/images/artifacts/artifacts_available.png" width="300"><br/>

Um artigo receberá o selo "**Available**" se os seguintes critérios forem atendidos:
- O **artefato é relevante para o artigo**;​
- O artefato está **depositado em um repositório de arquivamento publicamente acessível**, e um **DOI ou link para esse repositório persistente** é fornecido (ver Instruções de Submissão);​
- O artefato está **devidamente documentado**, com um arquivo `README` explicando, no mínimo, **o conteúdo do repositório**.

<img src="/2026/images/artifacts/artifacts_functional.png" width="300"><br/>

Um artigo receberá o selo "**Functional**" se os seguintes critérios forem atendidos:
- O **artefato é relevante para o artigo**;​
- O artefato está **devidamente documentado**, com um arquivo `README` que fornece descrição suficiente para permitir que o artefato seja utilizado;​
- O artefato está **completo** (com todos os dados e componentes) para **execução completa**;​
- O artefato é **executável**, ou seja, **outros pesquisadores conseguem executá-lo com sucesso**.​

Se o **Comitê de Avaliação de Artefatos** aceitar um artefato submetido:

- A **primeira página do artigo** dos receberá o(s) **selo(s) concedido(s)**;​
- O artigo será **marcado com o(s) selo(s)** na **lista de artigos aceitos** na página do respectivo simpósio e no **programa do CBSoft 2026**;​
- Os autores de Artefatos selecionados serão **convidados a apresentar seus artefatos em uma sessão especial durante o CBSoft 2026**;​
- O artefato **concorrerá ao prêmio de Melhor Artefato (Best Artifact Award)**, que será entregue na **abertura do CBSoft 2026**, reconhecendo o esforço dos autores na criação e compartilhamento de **artefatos de pesquisa de destaque**.

#### Instruções de Submissão e Datas Importantes

Somente autores de **artigos aceitos para publicação** poderão realizar a submissão de Artefatos. A submissão e avaliação de Artefatos ocorrerá em conjunto com as datas de cada simpósio e trilha do CBSoft 2026. A **submissão será realizada no intervalo entre a notificação de aceite e envio da versão final (camera-ready)** de seu artigo para o respectivo simpósio e trilha. Autores que desejem submeter seus Artefatos para avaliação deverão utilizar a página do [JEMS 3](https://jems3.sbc.org.br/artifacts2026/) exclusiva para submissão de Artefatos.

Considere a Trilha de Pesquisa do SBES 2026, por exemplo. A notificação será enviada aos autores no dia 03/07/26 e o envio da versão final será no dia 17/07/26. Este será o mesmo intervalo que os autores de artigos aceitos na Trilha de Pesquisa do SBES 2026 terão para submeter seus artefatos para avaliação. A mesma lógica se aplica para todos os demais simpósios e trilhas do CBSoft 2026. Caso o **Artefato ligado a um artigo seja submetido fora do intervalo** do seu respectivo simpósio ou trilha, **o Artefato será rejeitado automaticamente**.

##### Passo 1. Preparação e Documentação do Artefato

Os Artefatos (ou seja, seu conteúdo) devem ser autocontidos. Todas as instruções sobre os artefatos (como estão organizados, como utilizá-los, etc.) devem estar nos próprios conteúdos do Artefato. Pessoas além do Comitê de Avaliação de Artefatos devem ser capazes de utilizar esses artefatos.

Os conteúdos de um Artefato devem conter os arquivos do artefato e a documentação sobre ele. Abaixo, os autores podem ver a estrutura esperada. **Artefatos cujos conteúdos não seguirem a estrutura esperada serão rejeitados automaticamente**.

```
├─ <artifact folders and files>
├─ LICENSE
└─ README
```

> Atenção: a estrutura esperada considera que o conteúdo acima está diretamente **na raiz do repositório**. Não crie nenhuma pasta ou subpasta adicional acima dos arquivos `LICENSE` e `README`.

O arquivo `LICENSE` deve descrever os **direitos de distribuição**. Observe que, para receber o selo "**Available**", a licença deve ser uma **licença de código aberto** para código ou uma **licença permissiva** (por exemplo, uma licença **Creative Commons**) para outros tipos de
artefatos.

O arquivo **LICENSE é obrigatório** mesmo que a licença seja exibida na página de descrição do repositório. A licença do arquivo `LICENSE` deve ser a mesma que a licença exibida na página do repositório.

O arquivo `README` é o documento que qualquer pessoa consultará ao acessar os repositórios dos artefatos. O arquivo **README é obrigatório** mesmo que o seu conteúdo seja o mesmo exibido na página de descrição do repositório.

O conteúdo do `README` deve conter os seguintes itens obrigatórios:

- O `README` deve descrever o artefato e explicar como o conteúdo está organizado. Essas informações são o mínimo necessário para que outras pessoas se interessem em utilizar o artefato.
- O `README` deve conter um **link para o artigo aceito**. O PDF do artigo pode estar dentro do repositório do artefato ou em um serviço externo (por exemplo, **ArXiv**).
- Para artefatos focados em **dados**, o `README` deve abordar **requisitos de armazenamento e declarações éticas e legais**, quando relevantes.
- Para artefatos focados em **código**, o `README` deve cobrir aspectos relacionados a **como instalar e executar** o artefato. O `README` deve conter duas seções específicas: uma para **requisitos (Requirements)** e outra para **instalação (Installation)**.​

A seção **Requirements** deve descrever os requisitos para executar o sistema de software. Requisitos básicos, como a **versão do Java**, devem ser descritos. Um arquivo `requirements.txt` com informações explícitas de versionamento (por exemplo, para ambientes apenas em **Python**) deve ser fornecido quando relevante. Para garantir a completude e funcionamento pleno dos sistemas de software, a seção de requisitos também deve abordar aspectos de **requisitos de hardware** (por exemplo, desempenho, armazenamento ou periféricos não convencionais) e **ambientes de software** (por exemplo, **Docker, máquinas virtuais e sistema operacional**).

A seção **Installation** deve incluir instruções que ilustram **um exemplo básico de uso ou um método para testar a instalação**. Isso pode incluir, por exemplo, qual saída deve ser esperada para confirmar que o código foi instalado e está funcionando corretamente.

Como regra geral, os autores devem fornecer **instruções, código e dados suficientes**, de forma que uma pessoa da área de **Ciência da Computação**, com conhecimento razoável de **scripts, ferramentas de build, etc.**, consiga **instalar, compilar e executar o código**.

##### Passo 2. Tornando o Artefato Disponível para Avaliação

###### Para o selo "Available":​

Os autores devem tornar o artefato **publicamente disponível** para o Comitê de Avaliação (e para potenciais usuários). Os autores devem colocar seus artefatos em um **repositório de arquivamento publicamente acessível** (e que possua um **DOI**).

Observe que links para **sites individuais, armazenamentos temporários** (por exemplo, Google Drive) e **GitHub** são considerados **não persistentes**. Assim, artefatos colocados nesses locais **serão rejeitados automaticamente**. Exemplos de repositórios de armazenamento **persistentes que oferecem DOI** incluem **Zenodo**, **Figshare** e **Open Science Framework**.

###### Para o selo "Functional":​

Os artefatos **não precisam necessariamente estar publicamente disponíveis** ou em **repositórios de arquivamento publicamente acessível (com DOI)** para o processo de avaliação caso o objetivo seja apenas obter o selo "**Functional**". Esse é o caso de artefatos que os autores pretendem **compartilhar com usuários mediante solicitação**. Nesse caso, para o processo de avaliação, os autores devem fornecer **um link privado** ou **um link protegido por senha**.

##### Passo 3. Submissão do Artefato

Para o Festival de Artefatos 2026, a submissão ocorrerá **junto com a preparação da versão final do artigo (camera ready)** aceito para publicação no CBSoft 2026, ou seja: o prazo final de submissão do camera ready será **o mesmo prazo** de submissão ao Festival de Artefatos para a respectiva trilha. Deve-se utilizar **o mesmo template de camera ready** ([Overleaf](https://www.overleaf.com/project/69320bdf1918ba90eb56e9f3), [ZIP](https://cbsoft.sbc.org.br/2026/Template_para_eventos_do_CBSoft.zip)) do CBSoft 26, pois o mesmo já inclui uma seção dedicada ao Festival de Artefatos no formato necessário.

Para submeter um artigo ao Festival de Artefatos 2026, a versão final (camera ready) deve incluir uma seção chamada **Artifact Availability**. Esta seção deve ser incluída imediatamente após a Conclusão e antes da seção de Agradecimentos. Ela não deve ser numerada e deve ter exatamente o título **Artifact Availability**. A seção deve descrever:

- o que está sendo disponibilizado
- **o link para acesso**, para o caso de artefatos públicos, ou a **forma oficial que os leitores devem utilizar para obter acesso**, para casos de artefatos compartilhados mediante solicitação
- tipo de licença e condições de uso, quando aplicáveis

Submissões de artefatos cuja versão final do artigo não incluir a seção de Artifact Availability como descrito acima serão **rejeitados automaticamente**.

O link principal deve direcionar os leitores para uma **versão específica do artefato**. Por exemplo, se você enviou os artefatos para o **Zenodo**, deve fornecer um link para a **versão final exata com as atualizações**, e não um link geral para "**todas as versões**". Outros links pertinentes (como um link para o **GitHub** ou para um vídeo de demonstração da ferramenta) podem ser adicionados após a declaração do link principal.

> Atenção: Se durante o processo de preparação do PDF (camera-ready) você publicou uma nova versão do artefato com uma atualização no repositório (por exemplo, em resposta aos comentários de revisores ou para cumprir o checklist dos coordenadores do festival), o link principal para o repositório declarado na seção **Artifact Availability** deve ser atualizado de acordo.

Os artefatos devem ser **submetidos eletronicamente pelo sistema [JEMS 3](https://jems3.sbc.org.br/artifacts2026/)**. Os autores
devem enviar as seguintes informações:

- **Título e autores** do artigo aceito;
- **Identificador do artigo** aceito no seu simpósio e/ou trilha;
- **Badges:** O(s) selo(s) reivindicado(s), isto é, "**Available**" e/ou "**Functional**", com uma
breve explicação de por que o artefato é elegível para os respectivos selos;
- **Arquivo PDF da versão final (camera-ready)** do artigo aceito.

#### Organização

##### Co-Chairs do Comitê de Programa

Matheus Paixão, Universidade Estadual do Ceará (UECE)

Daniel Lucrédio, Universidade Federal de São Carlos (UFSCAR)

##### Comitê de Programa

*A ser definido.*

<br/>