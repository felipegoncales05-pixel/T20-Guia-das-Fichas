# Protótipo Gemini no Atlas Multiversal

A revisão aplica o `atlas-gemini-prototipo.html` fornecido a Honkai: Star Rail e Cyberpunk, sobre o Atlas da versão `ff6f04c`. O Compêndio Astral usa Cinzel, molduras douradas, retratos verticais e navegação por continuidade. O Terminal de Night City usa Chakra Petch, grade ciano, molduras chanfradas e etiquetas amarelas. A galeria tem retratos 3:4 e a lista usa a mesma imagem em miniatura.

A troca de apresentação conserva a página, os filtros e os elementos de imagem. As galerias mostram até 12 fichas por página. O universo e as continuidades vêm do registro existente, e os totais usam o catálogo carregado. O botão **Ver ficha** usa o roteador do catálogo e abre o dossiê completo. O painel de comparação aparece após a primeira seleção e abre os campos reais de classe, raça e origem quando há duas fichas.

## Retratos

Foram conferidas as 43 fichas dos pilotos. O Atlas decodificou 34 retratos locais, cinco remotos e quatro pôsteres de reserva. As imagens usam os créditos e as páginas de origem das fichas. A moldura reserva espaço antes da carga, os metadados aplicam as dimensões quando disponíveis e o carregamento é progressivo. Os retratos têm enquadramento por ficha. As artes que não têm um recorte verificado aparecem inteiras.

As cinco URLs abaixo já estavam nas fichas de Cyberpunk e passaram no Chromium sem cabeçalho Referer. Os testes também simulam um bloqueio de hotlink para conferir o pôster de reserva.

| Ficha | Resposta | Origem cadastrada | Imagem conferida |
| --- | --- | --- | --- |
| Lucy Kushinada | 200 · JPEG · 1500 × 844 | [Famitsu](https://www.famitsu.com/news/202208/31274023.html) | [Arquivo](https://www.famitsu.com/images/000/274/023/z_630ec84fd5b68.jpg) |
| Adam Smasher | 200 · JPEG · 650 × 650 | [Ranker](https://www.ranker.com/list/best-cyberpunk-edgerunners-characters/jay_kobayashi) | [Arquivo](https://imgix.ranker.com/user_node_img/4371/87408883/original/87408883-photo-u1527402880?auto=format&fit=crop&fm=pjpg&q=78&w=650) |
| Kingsley Weakly | 200 · PNG · 250 × 410 | [CD PROJEKT RED / TRIGGER](https://www.cyberpunk.net/pt-br/edgerunners2) | [Arquivo](https://www.cyberpunk.net/build/images/edgerunners2/characters/weak-d06b35b1.png) |
| Talia | 200 · PNG · 250 × 410 | [CD PROJEKT RED / TRIGGER](https://www.cyberpunk.net/pt-br/edgerunners2) | [Arquivo](https://www.cyberpunk.net/build/images/edgerunners2/characters/talia-f6ecd1a0.png) |
| Roman | 200 · PNG · 250 × 410 | [CD PROJEKT RED / TRIGGER](https://www.cyberpunk.net/pt-br/edgerunners2) | [Arquivo](https://www.cyberpunk.net/build/images/edgerunners2/characters/roman-7104f5a9.png) |

### Pendências de mídia

**Diamond, Taravan Keane, Shuhu e Elio** usam os pôsteres de reserva do catálogo até que haja uma imagem identificada e com condições de uso verificadas. A pesquisa incluiu a galeria oficial e os registros narrativos de cada personagem. [Galeria de Honkai](https://hsr.hoyoverse.com/character) · [Diamond](https://honkai-star-rail.fandom.com/wiki/Diamond) · [Taravan Keane](https://honkai-star-rail.fandom.com/wiki/Taravan_Keane) · [Shuhu](https://honkai-star-rail.fandom.com/wiki/Shuhu) · [Elio](https://honkai-star-rail.fandom.com/wiki/Elio)

As fontes Cinzel e Chakra Petch são locais e têm licença SIL OFL 1.1. [Cinzel](../../assets/fonts/cinzel-OFL.txt) · [Chakra Petch](../../assets/fonts/chakra-petch-OFL.txt)

## Arquivos

| Arquivo | Alteração |
| --- | --- |
| `atlas-themes.js` | Registro das duas apresentações e rótulos compactos das continuidades. |
| `atlas.js` | Índice com metadados de retrato, Galeria/Lista, filtros, paginação e comparação compacta. |
| `atlas-directory.css` | Layout, cores, tipografia, retratos, grade e lista dos dois pilotos. |
| `app.js` | Reúso dos links e da recuperação de imagens, com atalho de busca no Atlas. |
| `catalog-media.js` | Dimensões e enquadramento dos retratos já cadastrados. |
| `index.html` | Inclusão da folha de estilo e atualização das chaves de cache. |
| `site-core.bundle.js`, `site-expansion.bundle.js` | Bundles gerados a partir das fontes. |
| `assets/fonts/` | Dois arquivos WOFF2 e suas licenças. |
| `tests/atlas.cjs`, `tests/atlas-browser.cjs` | Testes das duas galerias, do catálogo e das rotas. |

## Validação

- `node tests/atlas.cjs` confere o índice de 421 fichas, os 42 universos e as associações de retrato dos 43 pilotos.
- `node tests/atlas-browser.cjs` percorre as 42 rotas em quatro tamanhos e verifica Galeria/Lista, digitação, filtros, ordenação, comparação, fallback e dossiês.
- `node tests/responsive-browser.cjs` confere o catálogo e o Laboratório em 11 tamanhos.
- `node scripts/build-site.cjs --check` confere os arquivos de produção.

Em uma verificação adicional no Chromium, os 43 links coletados nas galerias abriram os dossiês originais. As duas apresentações passaram em 320 e 1440 px, com foco visível no seletor de continuidade.

As pranchas mostram o Atlas anterior e as duas galerias integradas, com capturas do Chromium. [Desktop](desktop.jpg) · [Celular](celular.jpg)
