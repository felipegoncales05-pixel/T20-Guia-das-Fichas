# Fase VI — 16 novas fichas T20

**Publicação prevista:** 16 novas fichas T20, somadas às 69 originais e às 57 Umas (142 fichas no catálogo), preservando variantes de Diego e Goku. 192 novos níveis de progressão, 16 guias, 16 retratos/insígnias de referência e integração ao Laboratório.

## Matriz das classes e raças

| Nº | Personagem | Obra | Classe / especialização | Raça T20 | Identidade |
|---:|---|---|---|---|---|
| 1 | Megumin | KonoSuba | Arcanista / Feiticeira | Qareen | EXPLOSION // MAGIA DEFINITIVA |
| 2 | Eris Boreas Greyrat | Mushoku Tensei | Guerreiro | Moreau do Leão | ESPADA SAGRADA // ESCOLA DO DEUS DA ESPADA |
| 3 | Rudeus Greyrat | Mushoku Tensei | Arcanista / Mago | Elfo | QUADRIMAGIA // MAGO DA LAMA |
| 4 | Roxy Migurdia | Mushoku Tensei | Arcanista / Bruxa | Suraggel Sulfure | MESTRA DE MAGIA AQUÁTICA |
| 5 | Rover (WuWa) | Wuthering Waves | Guerreiro | Meio-Elfo | RESSONÂNCIA // LÂMINA ERRANTE |
| 6 | Chisa (WuWa) | Wuthering Waves | Guerreiro | Suraggel Sulfure | HAVOC // TESOURA CARMESIM |
| 7 | Vergil | Devil May Cry | Guerreiro | Suraggel Sulfure | YAMATO // CORTE DA MOTIVAÇÃO |
| 8 | Cartethyia | Wuthering Waves | Paladino | Suraggel Aggelus | VENTO DIVINO // ESPADA DA REDENÇÃO |
| 9 | Edward Elric | Fullmetal Alchemist | Inventor | Meio-Elfo | ALQUIMIA // TROCA EQUIVALENTE |
| 10 | Raiden Shogun | Genshin Impact | Paladino | Golem | EUTIMIA // MARIONETE DA ARCONTE |
| 11 | Xiao | Genshin Impact | Guerreiro | Suraggel Sulfure | YAKSHA // LANÇA DOS VENTOS |
| 12 | Geralt de Rívia | The Witcher | Caçador | Moreau do Lobo | BRUXO // DUAS ESPADAS E ELIXIRES |
| 13 | Ciri (Cirilla) | The Witcher | Ladino / Ventanista | Eiradaan | SANGUE ANCESTRAL // REFLEXO E TEMPO |
| 14 | Qin Shi Huang (Shuumatsu) | Shuumatsu no Valkyrie | Lutador | Moreau do Leão | IMPERADOR // TÉCNICA CHI YOU |
| 15 | Nikola Tesla (Shuumatsu) | Shuumatsu no Valkyrie | Inventor | Kliren | SUPER AUTOMATON β // CIÊNCIA INFINITA |
| 16 | D.Va (Overwatch) | Overwatch | Inventor | Goblin | MEKA // DEFESA DE MATRIZ |

## Diretrizes de adaptação

- O usuário escreveu *Megumim*: esta ficha representa **Megumin**, de *KonoSuba*.
- *Rover* foi representada na apresentação feminina de Wuthering Waves (sem alterar as mecânicas da personagem). Não são criadas fichas de diferentes elementos de ressonância sem solicitação.
- Chisa é uma ressonadora **Havoc/Broadblade**. A tradução usa Guerreiro com arma pesada, Golpe Pessoal e controle narrativo, sem adicionar corte causal, cura ou estado negativo não adquirido. Fonte: [perfil oficial](https://wutheringwaves.kurogames.com/en/main/news/detail/3595).
- Cartethyia é uma personagem Aero/Sword; Paladino foi escolhido para preservar o tema de espada e proteção. Fonte: [anúncio oficial](https://wutheringwaves.kurogames.com/en/main/news/detail/2733).
- As formas narrativas das franquias **não** adicionam turnos, teleportes, arsenal mágico ou reduções de custo; seguem sempre a ficha T20.
- Algumas variantes do livro *Heróis de Arton* só estão mapeadas, **não** totalmente implementadas. A única variante desta leva com tabela integrada é **Ventanista**, na ficha de Ciri. Especializações não automáticas (Feiticeira, Mago, Bruxa) exigem escolha do caminho e seus pré-requisitos.
- Compra-base de **10 pontos** distribuída entre os seis atributos, com modificadores raciais dos livros. Raças variam entre Qareen, Moreau do Leão/Lobo, Elfo, Sulfure, Aggelus, Meio-Elfo, Golem, Eiradaan, Kliren e Goblin. Todas são releituras de Arton, não espécies canônicas dos personagens.
- PV, PM e Defesa são **subtotais**, sem equipamentos, magias ativadas ou poderes não adquiridos. Para inventores, a tecnologia externa não equivale a um Golem ou mecha gratuito. O Laboratório indica opções indisponíveis no motor em vez de inventar bônus.
- Cada ficha possui 12 registros de nível, 12 seções de manual com uso/fonte, estilos narrativos, equipamentos e técnicas. Nomes de técnicas são títulos originais inspirados na função, não cópias literais de descrições das obras.

## Fontes Tormenta20
- **Jogo do Ano v1.3**, pp. 17–40 (compra de atributos, raças e Arcanista) e pp. 49–85 (classes).
- **Ameaças de Arton**, pp. 303–305 (heranças Moreau).
- **Heróis de Arton v1.1**, pp. 12–13 (Eiradaan) e 44–45 (Ventanista).
- Fontes de personagem em `crossovers-data.js`: KonoSuba, Mushoku Tensei, Kuro Games, Capcom/Steam, Aniplex, HoYoverse, CD Projekt Red, Shuumatsu e Blizzard.
- As fontes privadas são usadas para verificação das regras, **nunca publicadas em PDF**.

## Implementação
`crossovers-data.js` define os 16 perfis e 192 opções editoriais, `crossovers-runtime.js` monta as fichas, `app.js` exibe classes, retratos e filtros, e `build-lab.js` abre 16 cópias editáveis. `tests/crossovers.cjs` verifica individualmente a estrutura, as fontes, os subtotais e a preservação de todas as 126 entradas anteriores. O teste Chromium cobre 11 tamanhos de tela, inclusive a categoria WuWa e D.Va.

**Status de aprovação mecânica:** *parcial/pendente*. A existência do dossiê não comprova que os poderes opcionais sejam uma build de mesa validada. Requer conferência da ficha com as decisões do mestre, sobretudo magias e equipamentos.
