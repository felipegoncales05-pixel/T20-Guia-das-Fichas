# Atlas Multiversal — versão 1

A área **Atlas Multiversal** complementa o Guia das Fichas original, sem trocar o motor de Tormenta20 nem substituir a base de dados.

## Acesso e funções

- Rota #/atlas: diretório de universos e fichas existentes.
- Rota #/atlas/slug-do-universo: recorte de um universo, com link de retorno ao índice completo.
- Busca normalizada por nome, título da obra, classe, raça, origem, resumo e técnicas registradas.
- Filtros independentes de classe, raça e universo; ordenação e paginação de 24 resultados por página.
- Comparação **editorial** de dois dossiês (classe, raça e origem), com navegação para as fichas.
- Links diretos para Laboratório, revisão e dossiês já existentes.
- Interface responsiva sem imagens adicionais ou efeitos animados pesados.

## Integração

atlas.js fornece window.T20_ATLAS.render(root, slug) e uma função pura createIndex(characters) para construir metadados pesquisáveis a partir de window.T20_DATA.characters. Os metadados são calculados apenas quando a matriz de origem ou seu tamanho muda. Nenhum objeto de ficha é modificado.

app.js reconhece a rota atlas e a encaminha ao módulo. site-expansion.bundle.js contém a mesma mudança, porque o GitHub Pages carrega os bundles de produção. index.html carrega atlas.js entre site-engine.bundle.js e site-expansion.bundle.js, de modo que a API do Atlas exista quando o roteador da aplicação inicializar.

atlas.css é um módulo leve, separado de site.min.css. O link principal aparece no cabeçalho e na tela inicial.

## Como validar

Rodar localmente a partir da raiz:

    node tests/atlas.cjs
    node scripts/build-site.cjs --check
    node tests/phase9-smoke.cjs

O teste do Atlas espera os 421 dossiês presentes no snapshot da Fase IX, 90 Cavaleiros de Ouro, IDs sem duplicação e nenhum efeito colateral nos dados. Quando o catálogo crescer, atualize o teste de contagem junto com a nova expansão.

## Limites desta entrega

Esta versão **não** faz geração automática de adaptações, nem importa personagens de fontes externas. O Atlas indexa somente os dossiês já cadastrados. As builds seguem as regras e pendências do Guia das Fichas, sem aprovação automática.

**Importante para escalar:** a busca e a renderização dos resultados são paginadas e não adicionam retratos, mas os bundles antigos ainda carregam os dados de todos os dossiês na abertura da aplicação. A separação física em manifestos leves por universo e o carregamento sob demanda de JSON são a próxima etapa técnica; sua implantação exigirá migrar cuidadosamente os importadores e os testes de todas as fases.

Como etapas futuras, também será possível adicionar relações entre personagens, tags de poderes padronizadas, comparação mecânica por nível e processo de importação com verificação de fontes. Nenhum desses recursos é apresentado como pronto aqui.
