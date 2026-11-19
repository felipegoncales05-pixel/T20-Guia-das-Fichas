# O Sistema // T20 — Guia das Fichas

Catálogo de fichas **não oficial** de Tormenta20, inspirado na linguagem visual de dossiês da aba PERSONAGENS do [Terminal DCX](https://github.com/felipegoncales05-pixel/Agencia-Operacional-DCX). Este repositório é independente: não reutiliza autenticação, banco de dados ou credenciais do DCX.

## Dossiês iniciais

- **Gyro Zeppeli** — Guerreiro humano, Spin/Steel Balls, Valkyrie como montaria condicionada ao mestre; tema velho oeste
- **D.** — Arcanista Bruxo humano, quickhacks/Cyberdeck e evolução Capricorn; tema tecnológico azul e vermelho
- **David Martinez** — Lutador humano, Sandevistan via Surto Heroico; tema amarelo/ciano Edgerunners
- **Cipher (Cypher)** — Ladina Moreau Gato, Hyninn, garras e ataques furtivos; tema azul/roxo/dourado Honkai: Star Rail

**Recursos:** cards clicáveis, busca e filtro de universo, história, radar hexagonal de CON/CAR/SAB/INT/FOR/DEX, valores de criação, PV/PM/Defesa nível 1, perícias, inventário expansível, ataques, técnicas, progressão interativa 1–12, fontes e créditos. Cada card gera uma URL de hash compartilhável, por exemplo #/gyro/attributes.

## Estrutura

- index.html — entrada e estrutura semântica
- styles.css — HUD responsiva inspirada no DCX com quatro temas
- data.js — os quatro dossiês, progressão, referências e fontes
- app.js — busca, rota por hash, radar, inventário, progressão e ações
- tests/site-smoke.cjs — teste mínimo de integridade de dados
- .github/workflows/ci.yml — verificação de sintaxe e dados
- .github/workflows/pages.yml — publicação estática via GitHub Pages

## Abrir localmente

Abra index.html num navegador moderno. O catálogo não depende de npm, API, Firebase ou servidor. Recomenda-se um servidor estático local para um teste idêntico ao Pages, por exemplo com Python http.server.

## Publicar no GitHub Pages

1. No GitHub do repositório, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **GitHub Actions**.
3. Acesse **Actions → Publicar O Sistema no GitHub Pages** e execute o workflow, se necessário.
4. Após concluir com sucesso, o site normalmente ficará em https://felipegoncales05-pixel.github.io/T20-Guia-das-Fichas/ .

> A URL acima é o endereço esperado, não uma garantia de que o Pages já está ativado.

## Precisão de regras

Fichas iniciais e progressões são adaptações baseadas na conversa de criação. **Requerem conferência na edição oficial em uso e nas erratas**, sobretudo custos de PM, pré-requisitos de poderes de suplementos, itens iniciais e requisitos de devoção. Itens com visual de outro universo não recebem estatísticas novas. A classe, as habilidades, as magias e as condições de uso continuam as de Tormenta20. Valkyrie como parceiro inicial depende de anuência do mestre.

Livros oficiais:
- [Tormenta20 — Edição Jogo do Ano](https://jamboeditora.com.br/produto/tormenta20-edicao-jogo-do-ano/)
- [Heróis de Arton](https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/)
- [Ameaças de Arton](https://jamboeditora.com.br/produto/ameacas-de-arton/)

## Imagens, uso e créditos

O projeto usa **URLs externas e identificadas** de imagens ilustrativas, com crédito e ligação para a página de origem. Não são arquivos hospedados no repositório, e podem ficar indisponíveis ou sofrer restrição de hotlink. Nenhuma imagem originalmente mostrada por busca dinâmica no ChatGPT possui necessariamente um arquivo reaproveitável; por isso o site usa referências equivalentes e identificadas. Os direitos das imagens e personagens são de seus titulares. Para publicação estável, substitua por ilustrações próprias ou com autorização e atualize os campos portrait, media e gear em data.js.

**D. (armadura final):** a imagem enviada pelo usuário dentro da conversa não foi publicada como arquivo binário do GitHub. O dossiê descreve o traje e usa arte promocional externa até que um recurso autorizado seja hospedado.

Todos os textos de observação no site são creditados a **O Sistema**.

Projeto pessoal, gratuito, sem vínculo com Jambô Editora, CD PROJEKT RED, Netflix, Shueisha ou HoYoverse.
