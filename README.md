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

**Recursos:** cards clicáveis, busca e filtro de universo, história, radar hexagonal de CON/CAR/SAB/INT/FOR/DEX, valores de criação, PV/PM/Defesa nível 1, perícias, inventário expansível, ataques, técnicas, progressão interativa 1–12, fontes e créditos. Cada card gera uma URL de hash compartilhável, por exemplo #/gyro/attributes.

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
- .github/workflows/ci.yml — verificação de sintaxe e dados
- GitHub Pages: publicação automática da branch main, pasta / (root)

## Abrir localmente

Abra index.html num navegador moderno. O catálogo não depende de npm, API, Firebase ou servidor. Recomenda-se um servidor estático local para um teste idêntico ao Pages, por exemplo com Python http.server.

## Publicar no GitHub Pages

1. Em **Settings → Pages**, selecione **Source: Deploy from a branch**.
2. Selecione **Branch: main** e **Folder: / (root)**, e clique em Save.
3. O GitHub Pages construirá automaticamente o site a partir de index.html no diretório principal.
4. Após a publicação aparecer como concluída, o endereço será https://felipegoncales05-pixel.github.io/T20-Guia-das-Fichas/ .

O workflow de deploy customizado foi removido porque não é necessário para publicação por branch; continua disponível o workflow de validação dos dados.

## Precisão de regras

Fichas iniciais e progressões são adaptações baseadas na conversa de criação. **Requerem conferência na edição oficial em uso e nas erratas**, sobretudo custos de PM, pré-requisitos de poderes de suplementos, itens iniciais e requisitos de devoção. Itens com visual de outro universo não recebem estatísticas novas. A classe, as habilidades, as magias e as condições de uso continuam as de Tormenta20. Valkyrie como parceiro inicial depende de anuência do mestre.

Livros oficiais:
- [Tormenta20 — Edição Jogo do Ano](https://jamboeditora.com.br/produto/tormenta20-edicao-jogo-do-ano/)
- [Heróis de Arton](https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/)
- [Ameaças de Arton](https://jamboeditora.com.br/produto/ameacas-de-arton/)

## Imagens, uso e créditos

O projeto usa **URLs externas e identificadas** de imagens ilustrativas, com crédito e ligação para a página de origem. Não são arquivos hospedados no repositório, e podem ficar indisponíveis ou sofrer restrição de hotlink. Nenhuma imagem originalmente mostrada por busca dinâmica no ChatGPT possui necessariamente um arquivo reaproveitável; por isso o site usa referências equivalentes e identificadas. Os direitos das imagens e personagens são de seus titulares. Para publicação estável, substitua por ilustrações próprias ou com autorização e atualize os campos portrait, media e gear em data.js.

**Diego — segredo:** na ficha de Diego, use o botão `Alternative` acima do retrato para alternar entre Scary Monsters (Druida) e THE WORLD (Guerreiro). As versões possuem estatísticas e progressões independentes. THE WORLD não congela literalmente o tempo: Surto Heroico simula apenas uma ação extra com PM.

**Adaptações não literais:** os equipamentos de Yoru devem ser construídos pelo Inventor, e Optimus não se transforma automaticamente em caminhão. Ado usa avatar ilustrado creditado; o site não afirma mostrar uma foto pessoal da cantora. Devido a bloqueios de hotlink, imagens externas podem exibir substitutos.

**D. (armadura final):** a imagem enviada pelo usuário dentro da conversa não foi publicada como arquivo binário do GitHub. O dossiê descreve o traje e usa arte promocional externa até que um recurso autorizado seja hospedado.

Todos os textos de observação no site são creditados a **O Sistema**.

Projeto pessoal, gratuito, sem vínculo com Jambô Editora, CD PROJEKT RED, Netflix, Shueisha ou HoYoverse.
