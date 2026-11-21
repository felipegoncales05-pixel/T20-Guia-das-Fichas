# O SISTEMA // T20 — Auditoria de imagens e desempenho

**Versão auditada:** repositório com 319 personagens (incluindo Fase VIII), novembro de 2026.

## Diagnóstico verificado

- `tests/media-integrity.cjs` inspeciona os 319 dossiês, retratos, galerias, equipamentos e as capas configuradas.
- No estado auditado, foram encontrados **1.231 apontamentos** de mídia: **183 referências locais**, **286 URLs externas** e **762 pôsteres SVG incorporados**. Essas contagens representam *referências*, não arquivos exclusivos.
- O inventário dos dossiês tinha todos os arquivos locais. A auditoria da página publicada encontrou uma URL de SVG montada para cada um dos 57 dossiês de Umamusume e 16 crossovers, embora essas fichas usem pôsteres incorporados. Cards e dossiês agora compartilham a seleção de reservas.
- A grande quantidade de fontes externas — incluindo diferentes CDNs e sites que podem restringir hotlink — continua sendo a principal causa potencial de indisponibilidade da *arte original*. Uma reserva SVG garante visibilidade, mas não é um substituto perfeito para o portrait desejado.
- `performance.css` desativava todas as animações e também a HUD da Capri e os efeitos de David; o antigo `app.js` iniciava a requisição das 24 imagens de card com prioridade alta e recorria ao proxy `wsrv.nl` quando havia falha.
- `tests/responsive-browser.cjs` e `tests/site-smoke.cjs` continham expectativas anteriores ao uso de bundles e da Fase VIII (298 versus 319 personagens). Uma reprovação nesses casos não prova perda de dados.

## Estratégia aplicada

1. **Lotes:** o catálogo inicial apresenta 24 cards e acrescenta outros lotes conforme a interação. Os 319 continuam pesquisáveis e filtráveis.
2. **Carregamento:** apenas os quatro primeiros retratos ganham prioridade alta; os demais são carregados com `loading="lazy"`, `decoding="async"` e `fetchpriority="low"`.
3. **Recuperação:** quando uma imagem falha, o site tenta a arte local do personagem, uma fonte externa alternativa cadastrada e, por fim, o pôster de reserva. O cartão, dossiê, galeria ou equipamento identifica a reserva visualmente e no texto alternativo. O link de origem continua apontando para a referência cadastrada. O navegador evita repetir tentativas por imagem e usa as falhas registradas na sessão ao voltar ao dossiê.
4. **Identidade visual:** efeitos de personagens selecionados, HUD de Capri e glitch de David voltam a existir, mas ficam ativos somente na interação em ponteiros compatíveis e sem preferência por movimento reduzido. Não há animações custosas permanentes de todo o catálogo.
5. **Produção:** os bundles `site-core.bundle.js`, `site-engine.bundle.js`, `site-expansion.bundle.js` e `site.min.css` foram atualizados com suas fontes, e `index.html` ganhou nova chave de cache.
6. **Auditoria:** `tests/media-integrity.cjs` inspeciona referências locais no CI; as falhas em execução podem ser consultadas no console com `T20_IMAGE_DIAGNOSTICS.report()`, sem enviar telemetria a terceiros.

## Direção de qualidade para novas imagens

| Contexto | Diretriz inicial | Observações |
| --- | --- | --- |
| Miniatura de card | 480–720 px de largura, WebP qualidade 82–88, preferir até 120 KB | Preservar detalhes faciais e crop; ajustar arte original, não esticar |
| Retrato de dossiê | 900–1200 px, WebP qualidade 85–90, alvo de 150–350 KB | Usar imagem com resolução suficiente para monitores retina |
| PNG com transparência | Converter a WebP mantendo alfa, só quando houver ganho real | Conferir contorno e sombras contra fundos escuros |
| SVG editorial | Manter vetorial, evitando filtros pesados | Não apresentar pôster como imagem oficial |
| Artes originais do usuário | Preservar arquivo original e usar derivadas otimizadas | Não apagar PNG original ou créditos |

Os tamanhos são *metas de partida*, não limites absolutos; fotografias complexas podem precisar de mais espaço. Validar qualidade visual em 320, 375, 768, 1024 e 1440 px.

## O que falta para independência permanente de terceiros

Para cada retrato ou capa externa que falha no uso real:

1. Identificar personagem, ID, URL de origem, detentor da arte, crédito e permissão de hospedagem local.
2. Obter uma cópia autorizada de qualidade adequada; não copiar indiscriminadamente fanarts, capas protegidas ou imagens que não permitam redistribuição.
3. Salvar em pasta local apropriada, com crédito e procedência no manifesto.
4. Atualizar o ponteiro do **card** ou **dossiê** correto, sem sobrescrever a ilustração aprovada pelo usuário quando são independentes.
5. Testar o arquivo com browser sem rede e o carregamento de todos os estados/variantes.

Se não houver cópia autorizada, manter a fonte remota com pôster de reserva e registrar a pendência. **Não é possível prometer 100% de disponibilidade de imagens terceirizadas que continuam alojadas em outros sites.**

## Comandos de verificação

```sh
node scripts/build-site.cjs --check
node tests/media-integrity.cjs
node tests/site-smoke.cjs
node tests/browser-lite.cjs
node tests/phase8-smoke.cjs
node tests/responsive-browser.cjs
```

`tests/responsive-browser.cjs` exige Playwright Chromium instalado; esse teste é executado pelo GitHub Actions.

**Não alterar builds, regras, links de dossiês nem imagens aprovadas para obter desempenho.**
