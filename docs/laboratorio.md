# O Sistema // Laboratório de Builds

O laboratório (`#/laboratorio`) cria **fichas pessoais locais**, separadas dos 69 dossiês T20 ativos (59 originais e dez adicionados posteriormente). Abrir Toji, Aizen, Vegitto, Gogeta, Soul of Cinder, Isaac, Adão, Grimm, Sekiro ou Kaneki no laboratório cria uma cópia vinculada ao ID de catálogo; não modifica a entrada, a arte ou a fonte de origem. Um retorno ao laboratório reabre a mesma cópia local.

## Fonte e limites da edição

O catálogo inicial usa [Tormenta20 — Edição Jogo do Ano v1.3](https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf), disponibilizada pela Jambô. Foram conferidos a compra de atributos (p. 17), Humano (p. 19), multiclasse (p. 35) e as tabelas de Guerreiro (p. 64–67), Ladino (p. 72–74) e Lutador (p. 75–77). As habilidades automáticas dessas três classes até o nível 12 têm manuais resumidos, condição, custo, efeito, limite, exemplo e página. O catálogo de **poderes escolhidos** é deliberadamente pequeno. O índice em `rules-catalog.js` ainda requer confronto com erratas posteriores antes de aprovar qualquer ficha.

Heróis de Arton passou ao estado **parcialmente catalogado** após consulta ao PDF v1.1; Atleta, Inovador, Necromante e Ventanista possuem níveis 1–12 indexados, mas cálculos finais continuam parciais. Ameaças, Atlas, Deuses e a coletânea Dragão Brasil permanecem com opções mecânicas pendentes. O nome do produto, por si só, não valida raça, classe variante, poder, magia ou equipamento. Para incorporar uma opção: conferir o texto na edição e errata adotadas, cadastrar sua fonte e página, pré-requisitos, substituições e manual, adicionar a validação necessária e obter autorização editorial da mesa. Classes variantes não são classes acumuláveis por padrão.

## O que o motor calcula

`build-engine.js` percorre o histórico de níveis globalmente e conta níveis de cada classe separadamente. O 1º nível do personagem usa os PV iniciais da primeira classe; o 1º nível de uma classe adicional usa o **ganho subsequente** de PV. PM são somados por avanço. A Constituição e o bônus humano informado entram nos PV. O subtotal mostrado é somente **PV/PM de classe**: efeitos de poderes, origem, magias, outros atributos, raça e erratas ainda não entram. O motor não usa a classe do último nível para recalcular os anteriores.

Um poder escolhido é checado contra classe, fonte permitida, nível de classe, atributos cadastrados e repetição. O formulário exige justificativa e explicação de uso. Cada avanço mostra ganhos automáticos, escolha de poder e página. As progressões cadastradas de Ataque Especial, Ataque Furtivo, Briga e Casca Grossa são exibidas conforme o nível da **classe**. Uma variante de classe não conferida bloqueia o subtotal de PV/PM. Nenhuma combinação incompatível ou suplemento não catalogado é automaticamente aprovado.

## Por que as dez propostas ainda exigem revisão mecânica

Os dez foram integrados como pontos de partida editáveis no laboratório, mantendo os IDs, cards e retratos. **Agora existem propostas preenchidas de 12 níveis, com classes, origens, equipamentos e escolhas; isso ainda não equivale a validação editorial ou aprovação da mesa.** Faltam uma adaptação mecânica individual revisada, o restante das opções de cada classe, as origens, Versátil humano, perícias, proficiências, magias, equipamentos com efeito e os suplementos desejados. O laboratório mostra estas lacunas e mantém toda ficha em rascunho. O guia de combate possui campos para estratégia, abertura, combinações, recursos, pontos fortes/fracos e evolução, todos aguardando escolhas verificadas. O exemplo “Toji — Guerreiro 8 / Ladino 4” no pedido descreve uma possibilidade de distribuição, não uma decisão implementada.

## Persistência e revisão

Os dados ficam no `localStorage` do navegador sob `t20-laboratorio-v1`. A exportação produz JSON com `schemaVersion: 1`, `id` local e estado `rascunho`; a importação valida formato, tamanho, livros e limites antes de salvar. Fichas pessoais **não entram no catálogo** e não são enviadas ao GitHub. Faça backup com Exportar JSON.

Para preparar uma ficha exportada para revisão no repositório:

```sh
node tools/import-lab-draft.cjs caminho/da/ficha.json
```

O comando valida o JSON, gera `review-drafts/local-<id>.json` sem sobrescrever arquivo existente e imprime as pendências. Um responsável deve revisar fontes, cálculos, poderes e narrativa antes de incluir o arquivo em um PR. A conversão para `data.js` não é automática e nunca muda o estado da ficha para aprovada. Não inclua dados pessoais na descrição ou no histórico.

## Arquivos

- `rules-catalog.js`: opções conferidas e índice de livros.
- `build-engine.js`: esquema versionado, cálculo por nível e diagnóstico.
- `build-lab.js` e `build-lab.css`: interface e persistência local.
- `tests/build-engine.cjs`: progressão de uma, duas e três classes, pré-requisitos, fontes e JSON.

## Próxima revisão de conteúdo

Conferir as erratas da v1.3 e as edições dos suplementos adotadas pela mesa; catalogar cada classe e poder necessário aos dez personagens; revisar uma build completa por personagem com justificativa, exemplo e limitação de **cada** recurso antes de chamá-la jogável. O painel `#/arquivo` continua registrando decisões editoriais separadamente das fichas pessoais.

## Início guiado dos dez personagens

`build-concepts.js` registra um roteiro narrativo de 12 níveis para cada um dos dez dossiês. O botão de planejamento ou o acesso direto a `#/laboratorio/{id}` abre uma cópia local e preserva as escolhas anteriores. Toji, Vegitto, Gogeta, Soul of Cinder, Adão, Sekiro e Kaneki possuem **distribuições de classes provisórias** usando as classes parcialmente indexadas. Aizen, Isaac e Grimm exigem seleção mecânica posterior, pois suas hipóteses de Arcanista ou outras opções não foram catalogadas. Todas as fichas começam como rascunho, sem poderes escolhidos automaticamente e com origem, raça, perícias e equipamentos pendentes. Os comentários de cada nível explicam o motivo narrativo, o uso pretendido e as ambiguidades da obra.

Na biblioteca, a seleção de suplementos registra somente a intenção de consulta e gera alertas; poderes e variantes seguem bloqueados enquanto faltarem fonte e pré-requisitos. As habilidades já catalogadas mostram patamares disponíveis por nível de **classe**, limitações e exemplos, e o editor permite registrar decisão de edição/errata e versões específicas. A ficha nunca é marcada automaticamente como aprovada.

## Registro de opções de suplemento por nível

Cada nível pode armazenar um **registro editorial opcional** com nome da habilidade, livro, edição, página, pré-requisitos, resumo do efeito, versões alternativas e resolução da ambiguidade. Os campos são persistidos no JSON v1, sem mudar fichas anteriores. O registro não concede a habilidade mecanicamente, não altera estatísticas e permanece na lista de pendências até a opção ser catalogada, verificada e aprovada. Ele serve para construir propostas rastreáveis sem inventar regras de Heróis de Arton, Deuses de Arton, Atlas de Arton, Ameaças de Arton ou Dragão Brasil.


## Dez adaptações com progressão escolhida — revisão de 19/11/2026

O arquivo \`build-presets.js\` agora pré-preenche uma proposta de 12 níveis para cada um dos dez personagens, com distribuição de classes, origem, dois benefícios de perícia, compra de dez pontos de atributos, três bônus humanos, lista planejada de perícias, poderes de classe por nível, equipamentos, táticas e notas de ambiguidade. Arcanistas recebem o caminho Mago/Bruxo e um grimório editável com nomes, círculos e nível da classe na aquisição. As referências de regras partem de Tormenta20 — Edição Jogo do Ano v1.3; nenhum suplemento foi necessário para os conceitos escolhidos. Os livros adicionais seguem listados para avaliação futura, não habilitados como regras automáticas.

**Natureza da entrega:** adaptações preenchidas para revisão, ainda no estado \`rascunho\`. O motor calcula subtotais e identifica pré-requisitos, mas não promete fichas definitivas para mesa: ainda faltam validar benefícios de Versátil, proficiências e inventário inicial, escolher escola/familiar/Golpe Pessoal em cada caso, aplicar efeitos de poderes que alteram os subtotais, e conferir aprendizagem exata/erratas de magias e suplementos. Não transformar esse estágio em "aprovado" sem revisão. As 59 fichas originais não foram alteradas. O catálogo continua com 59 fichas existentes e dez dossiês editoriais, com acesso ao laboratório para editar as adaptações.


## Fase IV — Classes, caminhos de poder e auditoria

O Laboratório dispõe do módulo `class-options.js` para diferenciar classe básica, variante, caminho, distinção e rótulo narrativo. O resolvedor de `build-engine.js` consegue aplicar regras de substituição **quando forem cadastradas com fonte, edição, página e pré-requisitos verificados**, sem duplicar habilidades ou reiniciar PV ao entrar em multiclasse. **Alquimista e Duelista continuam pendentes mecanicamente; Atleta, Inovador, Necromante e Ventanista já têm progressão estruturada de 1–12.** Nenhuma distinção recebe poderes automáticos sem validação.

O painel **CLASSES // CAMINHOS DE PODER** registra variantes elegíveis da classe, compara substituições, armazena admissões de distinção e oferece análise conservadora. Para um livro ainda não conferido, ele informa a limitação em vez de recomendar uma adaptação fictícia. O campo de arquétipo narrativo não altera nenhuma regra. O `schemaVersion: 1` permanece compatível com os JSON antigos, enquanto informações adicionadas e campos desconhecidos são tratados separadamente para evitar perda silenciosa.

Os botões **AUDITORIA 69 + 4** e **BACKUP DOSSIÊS** exportam manifestos JSON do catálogo carregado. O inventário nominal está em [fase-iv-inventario.json](fase-iv-inventario.json) e os limites concretos da expansão estão no [relatório da Fase IV](fase-iv-relatorio.md). As 69 revisões mecânicas individuais e a reconstrução dos guias **ainda não foram realizadas**; a auditoria é apenas o estado de partida para esse trabalho.


### Consulta confirmada do suplemento Heróis de Arton v1.1

A biblioteca fornecida permitiu mapear as **14** variantes e criar a progressão 1–12 de quatro variantes correspondentes às classes já parcialmente implementadas: Atleta/Lutador (p. 24–25), Inovador/Guerreiro (p. 30–31), Necromante/Arcanista (p. 34–35) e Ventanista/Ladino (p. 44–45). O suplemento é marcado como parcialmente indexado, **sem liberar automaticamente suas demais regras**. O campo de escola de magia foi adicionado para os filtros de Necromante e Ventanista. O motor preserva o total de PM adicional de Carisma do Ventanista, mas não calcula automaticamente recursos condicionais e escolhas narrativas.

A classificação dos outros PDFs está em [Fontes da Fase IV](fontes-fase-iv.md). A progressão e o guia das 69 fichas não foram reconstruídos somente por existir uma nova fonte.
