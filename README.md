# O Sistema // T20 — Guia das Fichas

Catálogo de fichas **não oficial** de Tormenta20, inspirado na linguagem visual de dossiês da aba PERSONAGENS do [Terminal DCX](https://github.com/felipegoncales05-pixel/Agencia-Operacional-DCX). Este repositório é independente: não reutiliza autenticação, banco de dados ou credenciais do DCX.

## Dossiês iniciais

- **Gyro Zeppeli** — Guerreiro humano, Spin/Steel Balls, Valkyrie como montaria condicionada ao mestre; tema velho oeste
- **D.** — Arcanista Bruxo humano, quickhacks/Cyberdeck e evolução Capricorn; tema tecnológico azul e vermelho
- **David Martinez** — Lutador humano, Sandevistan via Surto Heroico; tema amarelo/ciano Edgerunners
- **Cipher (Cypher)** — Ladina Moreau Gato, Hyninn, garras e ataques furtivos; tema azul/roxo/dourado Honkai: Star Rail
- **Rentarou Aijou** — Nobre humano, Herói Camponês, suporte e proteção; tema com corações rosa/lilás/menta e arte oficial do anime
- **Yoru (Chainsaw Man)** — Inventora, armas construídas, preto/vermelho
- **Diego Brando (Steel Ball Run)** — Druida de Scary Monsters com botão secreto **Alternative** que alterna para um Guerreiro de THE WORLD (duas fichas mecânicas num card)
- **Ado (cantora japonesa)** — Barda, visual da rosa azul e apoio vocal; arte ilustrativa, não retrato pessoal
- **Cyrene (Honkai: Star Rail)** — Feiticeira Feérica, magia de gelo/encantamento e memórias
- **Marin Kitagawa** — Barda, cosplay, ilusão, maquiagem e suporte
- **Makima** — Feiticeira Feérica, magia de controle com testes de resistência
- **Optimus Prime** — Golem de Ferro Paladino, chassi, aura, defesa e liderança

**Recursos:** 59 cards em ordem alfabética, pesquisa em destaque e filtro de universo, história, radar hexagonal de CON/CAR/SAB/INT/FOR/DEX, valores de criação, PV/PM/Defesa nível 1, perícias, inventário expansível, ataques, técnicas, progressão interativa 1–12, fontes, créditos, comparação e revisão. Cada card gera uma URL de hash compartilhável, por exemplo `#/gyro/attributes`.

## Estrutura

- index.html — entrada e estrutura semântica
- styles.css — HUD responsiva inspirada no DCX com doze temas (e a variação THE WORLD)
- data.js — os doze dossiês, progressão, referências e fontes
- app.js — busca, rota por hash, radar, inventário, progressão e ações
- rentarou.css — tema visual exclusivo para Rentarou
- rentarou-guide.js — explicações, usos e referências de páginas da build de Rentarou
- expansion.js — sete novas fichas, a variante alternativa de Diego, histórias, equipamentos, fontes e manuais
- expansion-runtime.js — cálculos por nível das novas fichas (PV/PM, defesa, CDs, atributos, perícias)
- expansion.css — temas das sete novas fichas e do modo THE WORLD
- tests/site-smoke.cjs — teste mínimo de integridade de dados
- local-media.js — retratos locais recuperados das referências da ficha
- assets/card-art/sources.json — proveniência dos retratos recuperados
- character-art.js e assets/character-art/sources.json — 20 retratos adicionais locais, suas origens e créditos
- card-worlds.css e card-worlds.js — identidade visual dos universos e interação da HUD de Capri nos cards
- visual-direction.js e visual-direction.css — assinaturas visuais dos 59 personagens, quatro variantes extras e composição editorial reutilizável
- assets/motifs/capri-source.json — proveniência da ilustração usada na HUD do card de D.
- review-data.js e review.css — registros editoriais locais, exportação/importação e interface
- .github/workflows/ci.yml — verificação de sintaxe e dados
- GitHub Pages: publicação automática da branch main, pasta / (root)

## Expansão de personagens e visuais

O catálogo agora inclui **59 dossiês**. Em JoJo, estão os oito protagonistas das partes 1 a 8: Jonathan, Joseph, Jotaro, Josuke (parte 4), Giorno, Jolyne, Johnny e Josuke (JoJolion). Os convidados adicionais são Denji, Satoru Gojo, Tomura Shigaraki e Izuku Midoriya. Eles mantêm a ficha em sete abas, progressão 1–12 e temas únicos.

A **Acheron** foi convertida de Guerreiro para **Samurai**, usando a classe opcional da **Dragão Brasil nº 199**, com Arma Ancestral, Código do Samurai, Grito de Kiai, melhorias e poderes por nível. A descrição do livro e os custos se encontram na edição mencionada; a ficha é uma adaptação não oficial, com escolhas opcionais sujeitas à mesa.

**Imagens locais:** os 59 personagens têm um pôster-reserva original em `assets/portraits/{id}.svg`. Ele aparece atrás da arte externa durante o carregamento, garantindo uma imagem identificável mesmo que o servidor remoto falhe. Pôsteres-reserva são ilustrações gráficas simbólicas e não fingem ser arte oficial das obras. A ficha de D. mantém `assets/portraits/d-salvage.avif` na galeria de equipamentos, com uma representação de armadura improvisada (Scrapframe), sem cyberskeleton. O retrato principal, porém, utiliza a terceira imagem enviada pelo usuário, otimizada e hospedada localmente.

**Retratos corrigidos:** 20 cards que exibiam apenas arte simbólica agora usam arquivos do próprio repositório: Kars e oito protagonistas de JoJo, Denji, Gojo, Midoriya, Shigaraki e sete Lord Ravagers de Honkai: Star Rail. As URLs de origem, páginas e créditos estão em `assets/character-art/sources.json`; os arquivos locais não dependem de hotlink. **Diamond, Taravan e Shuhu** continuam com símbolos e a indicação “RETRATO PENDENTE”, porque não foi confirmada uma aparência para cada um. As capturas de trailer dos Lord Ravagers representam a identidade visual mostrada na obra e não alteram as regras das fichas.

**Artes do usuário — 19/11/2026:** foram recebidas dez imagens, associadas *exatamente* nesta ordem: Dio Brando → `jojo-dio1`, DIO → `jojo-dio3`, D. → `d`, Funny Valentine → `jojo-valentine`, Gyro Zeppeli → `gyro`, Enrico Pucci → `jojo-pucci`, Yoshikage Kira → `jojo-kira`, Tooru → `jojo-tooru`, Diavolo → `jojo-diavolo` e Zandar One Kuwabara → `em-zandar`. Os originais estão em `assets/art/*.png`, e versões WebP de menor tamanho ficam em `assets/art-optimized/*.webp`. O site carrega as versões WebP pelo script `user-gallery.js`; não utiliza URLs de terceiros para esses dez retratos. Essas imagens foram fornecidas pelo usuário e não possuem créditos autorais individuais verificados. O visual da ilustração de Funny Valentine foi mantido conforme enviado, sem substituição por arte oficial. O carregamento remoto de outros personagens continua sujeito a bloqueios de servidores externos, com fallback SVG local.

**Efeitos dos cards:** `character-fx.css` mantém Steel Balls pixeladas giratórias para Gyro, unhas azuis e Spin dourado para Johnny, bandeira com 44 estrelas e 13 listras para Valentine, glitches sutis para David, sucata de rua para D., bolhas, fios, clackers, Hamon e detalhes para os outros protagonistas. Os efeitos desaparecem ou ficam estáticos na preferência de movimento reduzido.

**Remodelagem dos cards:** `card-worlds.css` distingue JoJo (retícula, enquadramento e tipografia de quadrinho), Honkai: Star Rail (carta astral), SIGNALIS (monitor industrial), Dragon Ball, My Hero Academia, Jujutsu Kaisen, Chainsaw Man, Cyberpunk e os demais universos. David recebe uma falha de sinal breve e intermitente como efeito visual de cyberpsicose. No card de D., a HUD mostra uma reprodução local da arte oficial de Capri; a pupila acompanha o ponteiro dentro do card e uma pequena risada aparece periodicamente. São elementos decorativos, sem alterar regras, níveis ou fontes de T20. Em dispositivos de toque não há rastreamento do ponteiro; com movimento reduzido, as animações ficam estáticas. Fonte da arte de Capri: `assets/motifs/capri-source.json`.

### Direção de arte editorial

`visual-direction.js` atribui uma receita visual a **cada um dos 59 personagens** e às quatro versões adicionais de Diego/Goku. Cada receita contém uma palavra de composição, família visual, motivo geométrico, layout, cor de destaque e cor de fundo. Esses campos descrevem apenas a apresentação; nenhuma habilidade ou regra é derivada deles. `visual-direction.css` aplica a mesma assinatura ao card e ao dossiê interno por meio de `data-art`, `data-family`, `data-pattern`, `data-layout` e `data-variant`. JoJo combina linguagens de quadrinho, retícula e corrida; Night City mantém os efeitos de David e a HUD de Capri em D.; Elster conserva a HUD industrial de SIGNALIS. As demais famílias e personagens têm paletas e motivos próprios no mapa de perfis.

O catálogo oferece seleção de versão **dentro do mesmo card**: Scary Monsters/THE WORLD para Diego e DBZ/GT/Daima/Super para Goku. A escolha muda o retrato, a cor, o rótulo, a classe e o destino da ficha, e os botões informam seu estado com `aria-pressed`. Há 59 entradas e 63 fichas contando as variantes. No dossiê, as abas, comparação, fontes, progressão e revisão usam os dados já existentes. O retrato SVG de reserva só permanece visível até a arte principal carregar; em falha de imagem, o mecanismo de recuperação local continua ativo.

Para adicionar um personagem, cadastre os dados na fonte apropriada, registre uma entrada em `profiles` e escolha uma combinação das famílias/padrões/layouts já disponíveis (ou crie uma receita CSS). Para uma variante adicional no mesmo card, inclua a ficha nos dados de variantes e a assinatura em `variations`, depois adicione o botão ao seletor do card. Confira o retrato local e sua proveniência em `assets/*/sources.json`. A verificação `node tests/site-smoke.cjs` detecta perfis ausentes e regressões de integridade; `node tests/browser-lite.cjs` verifica navegação e HUD; a ação de PR executa Chromium nos onze tamanhos e anexa capturas `entrada`/`catalogo` para 375, 768 e 1440 pixels.

**Novos arquivos:** `acheron-samurai.js`, `heroes-custom.js`, `d-salvage.js`, `character-fx.css`, `assets/motifs/valentine-44.svg` e `assets/portraits/`.

## Busca, ordem e imagens (atualização 2026-11-19)

- Os **59 dossiês** aparecem automaticamente em ordem alfabética A–Z, independentemente da ordem de cadastramento. A ordenação respeita acentos e números.
- A **barra de pesquisa** tem destaque no catálogo e localiza nome, universo, classe e descrição. Pode pesquisar sem acentos; use a tecla `/` quando o catálogo estiver aberto. `Esc` limpa uma busca ativa.
- Os filtros mostram a categoria **JoJo** (partes 1 a 8), em lugar de Steel Ball Run; o filtro geral Honkai: Star Rail também inclui Herdeiros de Chrysos e Emanadores.
- A contagem indica quantos resultados foram encontrados. O botão **LIMPAR** restaura o catálogo completo.
- Os 30 retratos externos que respondiam com arte correspondente foram convertidos para WebP local em `assets/card-art/`, incluindo Diego, Marin, Ado, Elster, Chrysos, Yuta e variantes de Goku. A proveniência e os créditos estão em `assets/card-art/sources.json`. As dez artes enviadas pelo usuário continuam em `assets/art-optimized/`. Outros cards com pôster simbólico são marcados como **retrato pendente**; não há personagem oficial confirmado nesses arquivos. O fallback tipográfico evita ícones quebrados se um recurso secundário falhar.
- `catalog.css` implementa busca, contador e arte-reserva de maneira responsiva.

## Abrir localmente

Abra index.html num navegador moderno. O catálogo não depende de npm, API, Firebase ou servidor. Recomenda-se um servidor estático local para um teste idêntico ao Pages, por exemplo com Python http.server.

## Publicar no GitHub Pages

1. Em **Settings → Pages**, selecione **Source: Deploy from a branch**.
2. Selecione **Branch: main** e **Folder: / (root)**, e clique em Save.
3. O GitHub Pages construirá automaticamente o site a partir de index.html no diretório principal.
4. Após a publicação aparecer como concluída, o endereço será https://felipegoncales05-pixel.github.io/T20-Guia-das-Fichas/ .

O workflow de deploy customizado foi removido porque não é necessário para publicação por branch; continua disponível o workflow de validação dos dados.

## Precisão de regras

Fichas iniciais e progressões são adaptações já existentes neste repositório. **Todas entram na fila de revisão**, especialmente as geradas em lote: custos de PM, pré-requisitos de poderes de suplementos, itens iniciais e requisitos de devoção exigem conferência na edição oficial em uso e nas erratas. A interface não declara uma build aprovada automaticamente. Itens com visual de outro universo não recebem estatísticas novas. Valkyrie como parceiro inicial depende de anuência do mestre.

Livros oficiais:
- [Tormenta20 — Edição Jogo do Ano](https://jamboeditora.com.br/produto/tormenta20-edicao-jogo-do-ano/)
- [Heróis de Arton](https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/)
- [Ameaças de Arton](https://jamboeditora.com.br/produto/ameacas-de-arton/)

## Imagens, uso e créditos

O projeto combina dez retratos enviados pelo usuário, 30 referências externas copiadas em WebP local e pôsteres SVG simbólicos de reserva. Os arquivos em `assets/card-art/` têm origem e crédito registrados em `sources.json`; a presença local resolve falhas de hotlink, sem atribuir licença ao projeto. Os créditos individuais das dez imagens enviadas não foram identificados e são descritos como arte fornecida pelo usuário. Para substituir artes, atualize `local-media.js`, `user-gallery.js` ou os dados de origem e confira o arquivo de proveniência.

**Diego — segredo:** na ficha de Diego, use o botão `THE WORLD / ALTERNATIVE` acima do retrato para alternar entre Scary Monsters (Druida) e THE WORLD (Guerreiro). As versões possuem estatísticas e progressões independentes. Links diretos: `#/diego/normal/overview` e `#/diego/alternative/overview`. THE WORLD não congela literalmente o tempo: Surto Heroico simula apenas uma ação extra com PM.

**Adaptações não literais:** os equipamentos de Yoru devem ser construídos pelo Inventor, e Optimus não se transforma automaticamente em caminhão. Ado usa avatar ilustrado creditado; o site não afirma mostrar uma foto pessoal da cantora. Devido a bloqueios de hotlink, imagens externas podem exibir pôsteres-reserva locais.

**D. (armadura final):** o retrato principal usa a imagem enviada pelo usuário (terceira na ordem), armazenada em `assets/art/d.png` e exibida por `assets/art-optimized/d.webp`. A ficha mantém a descrição da armadura improvisada por Capri com sucata local. A ilustração secundária `assets/portraits/d-salvage.avif` mostra o equipamento Scrapframe; não é o cyberskeleton de David Martinez.

Todos os textos de observação no site são creditados a **O Sistema**.

## Comparação e revisão

- A aba **Comparar** coloca lado a lado duas versões e seus níveis (1–12). Diego tem duas versões; Goku tem quatro. Nas outras fichas, compare dois níveis da mesma build. Os valores são os do repositório e permanecem sujeitos à revisão editorial.
- A aba **Revisão** por personagem e o painel `#/arquivo` permitem registrar fontes, regras, decisões, pendências e correções. Um registro nasce pendente; sua aprovação é manual. O painel lista as 59 fichas como pendentes de conferência, independentemente do estado de uma anotação individual.
- As anotações ficam em `localStorage` **somente no navegador usado**. Exporte `t20-guia-revisao.json` para guardar ou compartilhar e importe o arquivo em outro navegador. Isso não altera `data.js` nem publica decisões para outros visitantes. Para consolidar uma decisão no projeto, revise o JSON e atualize os dados versionados no GitHub.
- Páginas explícitas já presentes nos guias são mostradas. Referências a capítulos/verbete são identificadas como tal; ausências aparecem como pendências, sem completar números por adivinhação.

Projeto pessoal, gratuito, sem vínculo com Jambô Editora, CD PROJEKT RED, Netflix, Shueisha ou HoYoverse.
