# Revisão cinematográfica do Atlas Multiversal

A proposta parte da versão publicada em `39be50f`. A central abre uma galeria editorial com 42 portais. Cada rota usa uma cena vetorial própria, composições de título, arte e dossiês, chrome temático e movimento de entrada e saída. O catálogo continua com 421 fichas.

## Antes e depois

O Chromium capturou 176 imagens antes e 176 depois em 1440 × 900, 768 × 1024, 390 × 844 e 320 × 700. Cada conjunto contém a central, as 42 rotas e o dossiê de Gyro. As capturas do dossiê aguardaram a decodificação do retrato no build correspondente. A comparação lado a lado considerou a fonte visual, a página publicada e a página proposta. [Diagnóstico da versão publicada](audit/baseline.md) · [Prancha comparativa](audit/comparativo.jpg) · [Rubrica por universo](audit/revisao-editorial.md)

Os 108 quadros de transição registram entrada e saída de nove universos em desktop e celular. Cada sequência congela os tempos reais das animações do Chromium em 0, 112 e 238 ms. A aparência da transição em execução depende da cadência do dispositivo. [Quadros selecionados](audit/transicoes.jpg)

## Implementação e cobertura

O registro central de temas reúne os IDs e suas continuidades. Arte, renderização e movimento ficam em módulos sem dependências de produção. A View Transitions API aplica as duas fases com propriedades de composição. O fallback usa a Web Animations API e preserva a navegação por hash e teclado. O controlador limpa o estado de rota ao cancelar e restaura o portal, foco e rolagem ao voltar. A preferência por movimento reduzido pula as fases. [Especificações e lista das 42 obras](themes/universe-specifications.md)

As referências estão vinculadas por obra. O manifesto identifica as capturas observadas e distingue website, arte promocional, captura de jogo e acervo. [Links das referências consultadas](references/README.md)

## Testes

| Verificação | Evidência |
| --- | --- |
| `node tests/atlas.cjs` | 421 entradas únicas, 42 temas e cenas distintas, contraste de texto das paletas e continuidade de Goku. |
| `node tests/phase9-smoke.cjs` | 102 dossiês, 65 variantes, 2.004 avanços e cópias do Laboratório da Fase IX. |
| `node tests/atlas-browser.cjs` | 42 rotas em quatro tamanhos, busca, filtros, comparação, retorno ao dossiê, histórico, fallback, rotas rápidas, movimento reduzido e limpeza de estilos. |
| `node tests/responsive-browser.cjs` | 11 viewports, carregamento dos retratos locais, preservação das 421 fichas e dez builds automáticas, inclusive em 320 px. |
| Demais suítes Node | Builds, presets, versões, mídias, expansões e navegação. |
| `node scripts/build-site.cjs --check` | Bundle de expansão reproduz o roteador da branch. |
| Chromium a 390 px | Entrada e saída executadas nas 42 rotas, total de 84 passagens. |

## Desempenho

O Atlas adiciona grafismos incorporados ao documento e usa os estilos e fontes já disponíveis no projeto. Os cinco arquivos temáticos somam 33.4 KiB após compressão gzip individual. O conteúdo fora da área visível da galeria tem desenho adiado pelo navegador. As fases em telas de até 570 px usam até 250 ms na entrada e 200 ms na saída, além do tempo de renderização.

Na amostra de seis temas em 320 × 700 com CPU emulada a 4×, o conteúdo ficou disponível entre 191 e 338 ms no caminho nativo e entre 265 e 523 ms com a alternativa de compatibilidade. O fim das duas fases variou de 513 a 663 ms e de 490 a 778 ms, respectivamente. A medição foi feita no Chromium headless, com as fontes remotas desligadas.

## Pendências de revisão

A rubrica registra as obras abaixo de 8,5 e as limitações das referências. Menus interativos de Wuthering Waves, Devil May Cry 5 e Zenless ficaram com evidência visual parcial. Genshin foi refinado a partir da arte oficial da PlayStation. A continuidade dos registros agrupados como equipe principal em The Boys segue em revisão editorial. [Limites das referências](references/README.md#limites-da-leitura) · [Avaliação editorial](audit/revisao-editorial.md)
