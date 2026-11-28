# Especificações dos temas

O registro em `atlas-themes.js` associa cada ID estável à paleta, tipografia, composição, coreografia e cor da ilustração. Subtemas partem da obra principal e trocam a composição conforme o recorte. Steel Ball Run usa cartaz western com sol e curvas de Spin. Honkai mantém o compêndio serifado. Fate e Cavaleiros atualizam o título, o motivo, a navegação e o controle de continuidade em conjunto. Os dois recortes de The Boys seguem o elenco da série do Prime Video. A equipe principal tem um fólio de concreto claro e Os Sete têm uma cartela azul escura.

- **Galeria.** Quadros largos de JoJo e Cyberpunk abrem uma grade editorial. As demais entradas combinam molduras de órbita, capas em papel, sinalização, arcos, pistas e pranchas de oficina. A sequência visual acompanha a ordem do teclado.
- **Universo.** O enquadramento muda conforme a obra. Terminais e compêndios têm filtros laterais no desktop. As cartas de Fate se concentram abaixo de um palco axial. Cavaleiros usa uma elevação em dois planos. Em telas estreitas, os visores usam largura integral ou passam para cima ou para baixo do título.
- **Dossiê.** O atalho do Atlas usa a cor e a tipografia da continuidade. O retrato, as fontes, os seletores de versão e os componentes do dossiê continuam no próprio tema.
- **Movimento.** A entrada transforma o plano novo, e a saída recolhe o anterior. As coreografias combinam deslocamento, escala, rotação ou passos discretos. A preferência por movimento reduzido pula as duas fases. A galeria restaura o foco e a rolagem para o portal de origem. Ao voltar de uma entrada pelo seletor, o título da central recebe o foco.
- **Roteamento.** O hash é a fonte de verdade. A troca de rota cancela a transição pendente. Um endereço inválido do Atlas abre a central. A navegação nativa usa a View Transitions API e a alternativa usa Web Animations com uma cortina gráfica sem interação.
- **Produção.** `index.html` carrega registro, arte e controlador do Atlas antes do bundle de expansão. `node scripts/build-site.cjs --check` confere o vínculo do roteador gerado com a fonte.

## Cobertura

A galeria reúne **42 cenas originais**, 15 composições e 25 perfis de movimento entre as rotas principais. Steel Ball Run acrescenta o cartaz western à família de continuidades.

| Universo | Dossiês | Composição de rota | Perfil de movimento |
| --- | ---: | --- | --- |
| Fate | 98 | Palco axial | invoke |
| Cavaleiros do Zodíaco | 90 | Elevação monumental | rise |
| JoJo's Bizarre Adventure | 65 | Quadros oblíquos | panels |
| Uma Musume | 57 | Pista e placar | sprint |
| Honkai: Star Rail | 36 | Compêndio orbital | orbit |
| The Boys | 12 | Fólio editorial | press |
| Cyberpunk | 7 | Console | signal |
| Dragon Ball | 4 | Capa de ação | strike |
| Chainsaw Man | 3 | Galeria industrial com colunas e serrilha | strike |
| Jujutsu Kaisen | 3 | Quadros oblíquos | split |
| Murder Drones | 3 | Console | lock |
| Mushoku Tensei | 3 | Paisagem e margem | page |
| Record of Ragnarok | 3 | Elevação monumental | clash |
| Wuthering Waves | 3 | Painel de frequência sobre um horizonte de penhascos | pulse |
| Blue Lock | 2 | Pista e placar | dash |
| Devil May Cry | 2 | Pórtico de palco | veil |
| Genshin Impact | 2 | Paisagem e margem | unfold |
| My Hero Academia | 2 | Prancha de herói com abas e retícula | spring |
| The Witcher | 2 | Fólio editorial | press |
| Zenless Zone Zero | 2 | Marquise de mídia analógica | sweep |
| Ado | 1 | Pórtico de palco | veil |
| Black Souls | 1 | Fólio editorial | sew |
| Bleach | 1 | Fólio editorial | page |
| Dark Souls | 1 | Elevação monumental | ash |
| Dungeon Meshi | 1 | Fólio editorial | unfold |
| Fullmetal Alchemist | 1 | Palco axial | pulse |
| Kamen Rider | 1 | Prancheta de oficina | lock |
| KonoSuba | 1 | Fólio editorial | page |
| Marvel | 1 | Marquise | reel |
| My Dress-Up Darling | 1 | Fólio editorial | sew |
| One Punch Man | 1 | Capa de ação | split |
| Overwatch | 1 | Console | dash |
| Sekiro | 1 | Paisagem e margem | unfold |
| SIGNALIS | 1 | Visor terminal | scan |
| Swordmaster's Youngest Son | 1 | Pórtico de palco | rise |
| The 100 Girlfriends Who Really, Really, Really, Really, Really Love You | 1 | Faixas de revista | sweep |
| The Amazing Digital Circus | 1 | Marquise | spring |
| The Binding of Isaac | 1 | Visor terminal | page |
| The Greatest Estate Developer | 1 | Prancheta de oficina | draft |
| Tokyo Ghoul | 1 | Pórtico de palco | split |
| Transformers · Autobots | 1 | Prancheta de oficina | assemble |
| Undertale | 1 | Visor terminal | step |

[Referências e traduções visuais](../references/README.md)
