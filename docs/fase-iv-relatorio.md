# FASE IV — auditoria de classes, variantes e revisão do catálogo

**Estado:** implementação parcial, **NÃO** aprovada mecanicamente e **NÃO** publicada na `main`.

## Referências e ponto de restauração

- Base original preservada no commit `0ef894e9e6ddde95133ff8bcbfc400dc1b399d5d`.
- Branch integral de backup: `backup-fase-iv-69-fichas-20261119`.
- Branch de desenvolvimento: `fase-iv-classes-auditoria-20261119`.
- Nenhuma arte, categoria, ID, animação ou dossiê foi reescrito nesta etapa.

## O que já está implementado

1. `class-options.js`: índice explícito das classes básicas tradicionais e do Treinador, identificando quais só têm nome catalogado e quais contam com regras parcialmente estruturadas. Índice de variantes oficialmente anunciadas (Alquimista, Necromante, Duelista), caminhos do Arcanista e distinções em revisão.
2. Resolvedor mecânico de variante **somente quando a definição individual estiver verificada**: substituições, remoções, preservação de habilidades, perfil de PV/PM, fonte e compatibilidade em cada nível de classe. Detecta variante incompatível, mudança retroativa e regras incompletas.
3. `build-engine.js`: integração sem reiniciar ganhos da classe inicial; armazena classe variante no primeiro nível daquela classe, propagando-a nos avanços seguintes. Mantém rascunhos antigos no `schemaVersion: 1` e salva os campos adicionais, sem forçar variantes nos arquivos antigos.
4. Registro independente de distinções: admissão narrativa, aprovação da mesa, notas e bloqueio de poderes não verificados. Campo de arquétipo narrativo sem efeito numérico.
5. `build-lab.js` e CSS: painel **CLASSES // CAMINHOS DE PODER** dentro do Laboratório; visualização de variantes elegíveis, diferenças de habilidade, catálogo pendente, distinções e análise de recomendações conservadora.
6. `catalog-revision.js`: inventário de auditoria obtido **em tempo de execução** de `T20_DATA.characters`, incluindo Diego THE WORLD e Goku GT/DAIMA/Super como registros independentes. Exportação de JSON de auditoria e de snapshot dos dossiês pelo Laboratório.
7. Testes de máquina e smoke para o novo resolvedor e cobertura de IDs.

## Limite importante sobre os suplementos

A descrição pública da Jambô confirma a existência de variantes em **Heróis de Arton**, mas não fornece a tabela completa de substituições, pré-requisitos, PV, PM, progressão e erratas individuais. Os nomes estão catalogados como **PENDENTES** e não são liberados para cálculos. Uma classe ou variante só deve passar a `status:"verificado"` após uma revisão **legítima** da edição, página e condições da mesa.

Fonte de referência: https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/

A infraestrutura aceita futuramente uma definição de variante com: `baseClassId`, `status`, `source`, `stats` (se mudarem) e `levels[nível]`. **`grantPolicy` é obrigatório** em uma variante verificada: `lista-explicita` exige que cada nível declare `keep/add`, sem herança implícita, enquanto `substituicoes-verificadas` aceita os grants da classe original exceto os explicitamente substituídos **somente quando a fonte autorizar esse comportamento**. `powers.remove` e `powers.exclusive` controlam a lista de poderes disponíveis. Os IDs devem existir no catálogo de habilidades e ter manual. **Não use o exemplo artificial de testes como regra oficial.**

## Revisão das 69 fichas: situação efetiva

O catálogo tem 69 dossiês e quatro versões adicionais indexadas como adaptações separadas: Diego THE WORLD e Goku GT, DAIMA e Super. Não transformar uma versão da obra em classe variante T20. Os registros possuem:

- ID e versão; obra, categoria e retrato preservados.
- Estado da build anterior (quando estruturada), progressão e guia do dossiê.
- Status técnico e pendências verificáveis.
- Campo reservado para decisão de reconstrução e revisão editorial individual.

**Essa varredura é inventário técnico, não 69 revisões narrativas concluídas.** Não houve reconstrução indiscriminada das builds nem reescrita dos 69 guias. O arquivo aponta honestamente `AGUARDANDO FONTE / DECISÃO DA MESA` enquanto não há fundamentação suficiente. As dez fichas de presets recentes continuam rascunhos para análise, e o restante dos dossiês não deve ser proclamado mecanicamente validado sem reconstrução estruturada.

## Pendências antes de concluir a Fase IV

- Conferir legalmente livro básico, opções de todas as classes, a nova classe Treinador, variantes, distinções e erratas, inserindo fontes/páginas completas.
- Associar cada variante à sua classe básica correta, substituir poderes no nível correto e prover manuais próprios; atualmente as variantes anunciadas estão bloqueadas.
- Recalcular todos os derivados da ficha (ataques, dano, Defesa, perícias, magias, itens e condições), não somente PV/PM base.
- Analisar personagem por personagem e construir 69 propostas justificadas, escolhendo conscientemente entre manter, refinar, aplicar variante, reconstruir multiclasse ou pendência.
- Reconstruir os manuais e guias de combate das builds alteradas, confrontando diferenças de antes/depois.
- Realizar inspeção visual responsiva e validação editorial, sem confundir testes automáticos com aprovação de regra.

## Testes

- `node tests/class-options.cjs`: fixture **fictícia apenas dentro do teste**, exercitando substituições, elegibilidade, recursos, JSON, bloqueio por fonte, mudança retroativa e distinção pendente.
- `node tests/build-engine.cjs`: multiclasse e cálculos existentes.
- `node tests/build-presets.cjs`: dez propostas já registradas.
- `node tests/site-smoke.cjs`: 69 IDs + quatro versões, cards, referências e seus contratos atuais.
- `node tests/browser-lite.cjs` e `node tests/responsive-browser.cjs`: navegação e visual.

As suites são chamadas pelo workflow `.github/workflows/ci.yml` quando um pull request é aberto. Registro de CI e capturas deve ser anexado antes de aprovação.

## Comportamento seguro

- A interface não concede uma distinção só porque o mestre autorizou sua admissão; poderes mecânicos ainda exigem registro verificado.
- O gerador não aplica automaticamente uma variante em rascunhos antigos.
- O catálogo não é modificado por edições no Laboratório: as escolhas ficam no navegador e podem ser exportadas.
- Backups são gerados por exportação, e a branch de backup preserva integralmente o estado anterior.
