#### Chamada de Trabalhos

A Trilha de Ferramentas é uma parte importante do Simpósio Brasileiro de Engenharia de Software (SBES). O objetivo desta trilha é fornecer um fórum para apresentação e demonstração de ferramentas que visam dar suporte a qualquer aspecto relacionado à engenharia de software. A trilha consiste em apresentações teóricas e demonstrações de ferramentas, favorecendo a discussão entre os autores das ferramentas e os participantes do SBES, tanto da academia quanto da indústria.

Pesquisadores são encorajados a submeter ferramentas resultantes de seus projetos de pesquisa aplicada, enquanto profissionais podem apresentar ferramentas comerciais ou internas que trouxeram ganhos de produtividade e/ou qualidade a processos de desenvolvimento de software.

#### Datas Importantes

| | |
|---|---|
| Registro do artigo (submissão do resumo) | {paper_registration} **(PRAZO FIRME)** |
| Submissão de artigo e vídeo | {submission_date} **(PRAZO FIRME)** |
| Envio de notificação aos autores | {notification_acceptance} |
| Submissão da versão final | {camera_ready} |

#### Preparação e Submissão do Artigo/Vídeo

Convidamos autores a enviarem artigos descrevendo ferramentas de apoio a diversos aspectos e necessidades relacionados aos tópicos de interesse e temas listados na chamada de trabalhos da Trilha de Pesquisa do SBES, incluindo ferramentas que apoiem:

* Atividades do processo de desenvolvimento de software (especificação, design e implementação, validação e verificação, e evolução);
* Atividades de apoio ao processo de desenvolvimento de software (e.g., gestão de projetos e gerência de configuração);
* Pesquisa em Engenharia de Software (e.g., condução de estudos experimentais ou revisões sistemáticas da literatura).

Cada submissão consiste em um artigo acompanhado por um vídeo de demonstração da ferramenta. A submissão de trabalhos deve estar em conformidade com as seguintes instruções de envio e formatação:

* O artigo deve ser original e não estar submetido ou ter sido publicado em outros veículos acadêmicos.
* O artigo deve incluir claramente:
    * Descrição da motivação/problema abordado pela ferramenta;
    * Descrição das principais funcionalidades e potenciais usuários da ferramenta;
    * Exemplo de uso e capturas de tela ilustrando a interface da ferramenta (quando aplicável);
    * Descrição da arquitetura da ferramenta, seus componentes principais e suas interfaces;
    * Uma breve comparação com ferramentas relacionadas existentes; e
    * Tipo de licença de software.
Os artigos devem ser formatados de acordo com o formato de 2 colunas para artigos de conferência da ACM (ACM_SigConf), disponível em [https://www.acm.org/publications/proceedings-template](https://www.acm.org/publications/proceedings-template). Usuários de LaTeX devem utilizar a classe `acmart.cls` fornecida no modelo, com o formato de conferência habilitado no preâmbulo do documento:

```latex
\documentclass[sigconf]{acmart}
```

Além disso, será necessário remover algumas seções do template padrão da ACM. Para tal, utilize os comandos a seguir:

```latex
\setcopyright{none}
\settopmatter{printccs=false}
\settopmatter{printacmref=false}
\renewcommand\footnotetextcopyrightpermission[1]{}
```

Os(as) autores(as) devem utilizar o estilo bibliográfico `ACM-Reference-Format.bst` disponível no template:

```latex
\bibliographystyle{ACM-Reference-Format}
```

Logo após a seção de Conclusão, deve ser incluída uma seção não-numerada intitulada "Disponibilidade dos Artefatos":

```latex
\section*{Disponibilidade dos Artefatos}
```

* Os artigos devem ter no máximo 6 (seis) páginas, incluindo figuras (em boa qualidade), tabelas, apêndices e agradecimentos, e até 1 (uma) página adicional para referências. Os artigos podem ser escritos em português ou inglês. Artigos em português também devem incluir um resumo em inglês. Os artigos devem ser submetidos em Adobe Portable Document Format (PDF).
* Um link para um vídeo de demonstração com alta resolução com áudio descrevendo os passos (os detalhes da funcionalidade da ferramenta devem estar claramente visíveis) DEVE constar no final do resumo do artigo. O vídeo de demonstração deve ter duração de três a cinco minutos e deve mostrar o uso da ferramenta, destacando suas principais contribuições. O vídeo deve também fornecer uma visão geral da ferramenta, seus objetivos e usuários em potencial, além das principais características e resultados.
* O vídeo de demonstração deve ser hospedado em um local com armazenamento permanente (repositórios digitais preservados, como [zenodo.org](zenodo.org), [figshare.com](figshare.com), [www.softwareheritage.org](www.softwareheritage.org), [osf.io](osf.io)). Encoraja-se também hospedar uma versão do vídeo em plataformas de streaming (por exemplo, YouTube, Vimeo) para facilitar a visualização dos revisores e do público em geral.
* Os autores são fortemente incentivados a tornar o código e os conjuntos de dados de suas ferramentas acadêmicas de código aberto e fornecer um URL para eles com a submissão. Mais uma vez, deve-se dar preferência ao uso de repositórios digitais preservados (por exemplo, [zenodo.org](zenodo.org), [figshare.com](figshare.com), [www.softwareheritage.org](www.softwareheritage.org)). Para o caso de ferramentas internas, autores são aconselhados a proverem uma explicação clara das razões para manter a ferramenta proprietária ao invés de open source.
* A demonstração deve apresentar a ferramenta com áudio no mesmo idioma em que o artigo foi escrito.
* A Trilha de Ferramentas usará o modelo de revisão anônima simples ("single-anonymous") e, portanto, as identidades dos autores devem aparecer nos materiais enviados.
* Os artigos devem ser submetidos eletronicamente por meio do [JEMS 3](https://jems3.sbc.org.br/events/472).

Submissões que não incluam um artigo BEM COMO um vídeo de demonstração, que não estejam em conformidade com o formato de envio necessário, que estejam fora do escopo da trilha ou que tenham sido submetidos ou publicados em qualquer outro fórum (conferência ou revista), serão rejeitadas sem revisão e os coordenadores do(s) outro(s) fóruns serão notificados. Todos os outros trabalhos serão revisados por pelo menos três membros do comitê do programa.

#### Sobre o uso de IA (Inteligência Artificial) ou tecnologias assistidas por IA em trabalhos de pesquisa

Ao submeterem trabalhos ao SBES 2026, os autores reconhecem que estão em conformidade com a política de uso de IA Generativa, baseada nas políticas existentes propostas pela IEEE, ACM, e Springer.

É proibido:

* Listar ferramentas e tecnologias de IA Generativa, como o ChatGPT, como autores de trabalhos; e
* Utilizar textos ou seções integralmente produzidos por ferramentas de IA generativa.

É permitido (com menção explícita nos agradecimentos):

* Utilizar ferramentas de IA generativa para criar partes do conteúdo, com menção nos agradecimentos do artigo indicando o que foi gerado e qual ferramenta foi utilizada. É importante verificar os termos de uso da ferramenta, ficando tal verificação sob responsabilidade dos autores do artigo. Por exemplo, nos agradecimentos: ChatGPT foi utilizado para gerar o primeiro parágrafo da Seção 3 e para gerar a Tabela 3.2.

É permitido (sem necessidade de menção):

* Usar IA ou tecnologias assistidas por IA para melhorar a qualidade das imagens em relação ao contraste e clareza; e
* Utilizar ferramentas de IA generativa para editar e melhorar a qualidade do seu texto existente (de forma semelhante a um assistente como o Grammarly para melhorar a ortografia, gramática, pontuação, clareza, engajamento).

#### Critérios de avaliação

Cada submissão será analisada de acordo com os critérios de avaliação abaixo:

* a relevância da ferramenta proposta para o público do SBES;
* a novidade/originalidade da ferramenta e como ela se relaciona com esforços anteriores da indústria ou da academia;
* a qualidade da apresentação da ferramenta no artigo e no vídeo associado; e
* o grau em que considera a literatura relevante.

#### Desclassificação de Artigos

Artigos fora do escopo da Trilha de Ferramentas do SBES 2026 ou que não estiverem em conformidade com o formato exigido e demais regras serão desclassificados e rejeitados sem passar pelo processo de revisão.

Se uma submissão simultânea ou publicação prévia em outro fórum (evento ou periódico) de artigo submetido ao SBES for identificada e reportada a qualquer tempo, o artigo será rejeitado e os autores poderão ficar impedidos de submeter artigos nas próximas edições do SBES. Além disso, os organizadores do outro fórum serão comunicados sobre a ocorrência. 

Caso sejam observadas evidências da utilização de ferramentas de IA generativa na submissão que não esteja em conformidade com as  recomendações para o uso de IA generativa especificadas nesta chamada, o artigo será rejeitado sem revisão e os autores poderão ficar impedidos de submeter artigos nas próximas edições do SBES.

#### Informações Gerais

A publicação do trabalho implica em pelo menos um autor se inscrever (de acordo com as regras de inscrição estabelecidas pela organização local do evento) e participar PRESENCIALMENTE do SBES 2026 em São Paulo para apresentar o artigo e a ferramenta. A apresentação do artigo e a demonstração da ferramenta são obrigatórias para todas as ferramentas aceitas. Demonstrações de ferramentas devem ser PRESENCIALMENTE e os vídeos de demonstração enviados NÃO devem ser usados. O formato e o horário das apresentações serão anunciados posteriormente. Os artigos aceitos que não forem apresentados não serão incluídos nos anais do SBES 2026.

#### Prêmio Artigo de Destaque

O SBES 2026 premiará o melhor artigo da Trilha de Ferramentas. O artigo premiado será anunciado durante a abertura do CBSoft 2026.

#### Prêmio Revisor de Destaque

A Trilha de Ferramentas do SBES reconhece a generosidade dos membros do Comitê de Programa que dedicam tempo e esforço para revisar os trabalhos submetidos. Um certificado de Revisor de Destaque será concedido aos revisores que se destacarem dos seus pares em termos de pontualidade, aderência das revisões aos critérios de revisão da trilha, qualidade técnica das revisões e participação ativa nas discussões que envolvem o Comitê de Programa.

#### Organização

###### Coordenação do Comitê de Programa

Edna Dias Canedo - Universidade de Brasília (UnB)

Rodrigo Pereira dos Santos - Universidade Federal do Estado do Rio de Janeiro (UNIRIO) 

<br/>

> Trilha de Ferramentas