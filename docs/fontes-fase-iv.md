# Biblioteca T20 — matriz de verificação de fontes (Fase IV)

Esta matriz registra a **consulta aos PDFs compartilhados pelo usuário**, sem redistribuir os PDFs ou incorporar seus textos protegidos ao repositório. Cada opção implementada guarda edição, páginas e resumo mecânico autoral. **Disponibilizar um PDF não significa que todas as regras do livro já estão cadastradas.**

| Arquivo fornecido | Tipo identificado | Escopo no site |
|---|---|---|
| T20 - Livro Básico - Jogo do Ano.pdf | Livro básico | Base das classes, pontos, perícias e progressão; cadastro ainda parcial |
| T20 Heróis de Arton.pdf | Suplemento oficial, 1ª ed. maio/2025, v1.1 | Tabela 1-2 (14 variantes); quatro progressões de níveis 1–12 codificadas |
| T20 Deuses de Arton.pdf | Suplemento oficial, 1ª ed. maio/2025, v1.1 | Catálogo a aprofundar; não atribuir poderes sem análise da página |
| T20 Atlas de Arton.pdf | Suplemento oficial, 2023 | Origens regionais pendentes de cadastro mecânico |
| T20 Ameaças de Arton.pdf | Suplemento oficial, 2023 | Raças, aliados e itens a conferir individualmente |
| Dragão Brasil T20.pdf | Compilação de conteúdo associado à revista | **Não** é uma edição única; identificar número e versão original de cada regra antes de habilitar |
| Deuses de Arton.pdf | Compilação identificada internamente como **não oficial e não canônica** de deuses menores | Tratar como conteúdo de mesa / homebrew, não confundir com o suplemento oficial |
| Arton Prístina.pdf | Pasta 'Suplemento HB' | Homebrew; regras desabilitadas até autorização expressa |
| Mitos de Arton.pdf | Pasta 'Suplemento HB' | Homebrew; regras desabilitadas até autorização expressa |
| Monster hunter T20.pdf | Pasta 'Suplemento HB', adaptação | Homebrew/crossover; não validar automaticamente como T20 oficial |

## Classes variantes de Heróis de Arton (fonte: v1.1, Tabela 1-2, p. 22)

| Classe básica | Classe variante | Páginas da variante | Situação em O Sistema |
|---|---|---|---|
| Arcanista | Necromante | 34–35 | Progressão 1–12 e manuais autorais estruturados |
| Bárbaro | Machado de Pedra | 32–33 | Filiação confirmada; motor de classe ainda incompleto |
| Bardo | Magimarcialista | 33–34 | Filiação confirmada; motor de classe ainda incompleto |
| Bucaneiro | Duelista | 27–28 | Filiação confirmada; motor de classe ainda incompleto |
| Caçador | Seteiro | 38–39 | Filiação confirmada; motor de classe ainda incompleto |
| Cavaleiro | Vassalo | 41–43 | Filiação confirmada; motor de classe ainda incompleto |
| Clérigo | Usurpador | 40–41 | Filiação confirmada; motor de classe ainda incompleto |
| Druida | Ermitão | 29–30 | Filiação confirmada; motor de classe ainda incompleto |
| Guerreiro | Inovador | 30–31 | Progressão 1–12 e manuais autorais estruturados |
| Inventor | Alquimista | 22–24 | Filiação confirmada; motor de classe ainda incompleto |
| Ladino | Ventanista | 44–45 | Progressão 1–12 e manuais autorais estruturados |
| Lutador | Atleta | 24–25 | Progressão 1–12 e manuais autorais estruturados |
| Nobre | Burguês | 25–27 | Filiação confirmada; motor de classe ainda incompleto |
| Paladino | Santo | 37–38 | Filiação confirmada; motor de classe ainda incompleto |

**Nova classe básica Treinador:** *Heróis de Arton*, pp. 16–21; identificada, porém não possui motor de cálculo integral no site.

### Regra estrutural verificada (Heróis de Arton, p. 22)

A variante de classe substitui a lista de habilidades automáticas por sua própria tabela. Ela conserva a lista de poderes da classe básica, salvo modificações expressas. Variante e classe básica contam como a mesma classe para pré-requisitos e não podem ser adquiridas como duas classes de uma multiclasse. A escolha ocorre no 1º nível da classe e não é retroativamente alterável.

O resolvedor `class-options.js` preserva essa separação por `grantPolicy:"lista-explicita"`. Cada um dos 48 níveis cadastrados (4 variantes × níveis 1–12) tem `keep` e `add` próprios, conferidos contra as tabelas 1-4, 1-8, 1-11 e 1-16. Uma habilidade não listada na tabela da variante **não é concedida automaticamente**.

### Limitações que permanecem visíveis

- **Atleta:** mobilidade, proficiências específicas e simulação de Primor Atlético precisam de verificação dos derivados.
- **Inovador:** equipamentos superiores e proficiências condicionais devem ser auditados. O texto da habilidade no 7º nível e o nome exibido na tabela divergem; conferir errata.
- **Necromante:** escola de cada magia, proporção de necromancia e custo em PV precisam ser conferidos; o motor não administra automaticamente parceiros cadáveres.
- **Ventanista:** conta o bônus de Carisma no total de PM, identifica magias simuladas e restringe escolas; efeitos de disfarce e recuperação condicionais de PM exigem registro na mesa.
- **Todos os quatro:** cálculos completos de Defesa, iniciativa, dano, equipamentos, proficiências e requisitos narrativos permanecem parciais. O motor exibe subtotal e nunca marca uma ficha como aprovada automaticamente.
- **Outras dez variantes:** nomes, bases e páginas identificados, mas suas habilidades não devem ser ativadas antes da integração da classe e verificação de cada progressão.

## Política de publicação

A identidade visual e as 69 fichas originais foram preservadas. A adição de fontes não autoriza homebrew por padrão nem substitui o julgamento narrativo necessário para reconstruir builds. A filial de desenvolvimento e seu PR rascunho não devem ser mesclados à `main` até completar a auditoria editorial e os testes.
