/* Arquivo de fichas. Regras e propriedade intelectual pertencem aos seus titulares. */
window.T20_DATA = {
  rulebooks: [
    {name:"Tormenta20 — Jogo do Ano",url:"https://jamboeditora.com.br/produto/tormenta20-edicao-jogo-do-ano/",detail:"Regras de criação, classes, equipamentos e combate"},
    {name:"Heróis de Arton",url:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/",detail:"Poderes de combate, de classe e Golpe Pessoal"},
    {name:"Ameaças de Arton",url:"https://jamboeditora.com.br/produto/ameacas-de-arton/",detail:"Moreau e aliados"}
  ],
  characters: [
    {
      id:"gyro",number:"01",name:"Gyro Zeppeli",universe:"JoJo's Bizarre Adventure — Steel Ball Run",label:"MESTRE DO SPIN",symbol:"✦",theme:"gyro",
      portrait:{url:"https://cdn.donmai.us/720x720/55/51/5551e15ef07fe647c285cce0a9f57f1c.webp",credit:"Imagem de referência · Donmai",page:"https://donmai.moe/wiki_pages/gyro_zeppeli"},
      excerpt:"O giro perfeito não depende de magia: depende de técnica, ângulo e precisão.",
      info:{race:"Humano",className:"Guerreiro",origin:"Soldado",devotion:"Livre",role:"Atirador de precisão · Controle",partner:"Valkyrie (montaria, com autorização do mestre)"},
      stats:{pv:22,pm:3,defense:16,speed:"9 m",hpGain:7,pmGain:3},
      attrs:[{key:"CON",value:2,buy:1,race:1,why:"Resistência para enfrentar a corrida."},{key:"CAR",value:1,buy:1,race:0,why:"Presença e provocação."},{key:"SAB",value:3,buy:2,race:1,why:"Leitura da geometria e percepção."},{key:"INT",value:1,buy:1,race:0,why:"Conhecimento técnico."},{key:"FOR",value:1,buy:1,race:0,why:"Potência física nos arremessos."},{key:"DEX",value:4,buy:3,race:1,why:"Controle preciso da trajetória."}],
      summary:"Guerreiro humano focado em arremesso de azagaias reinterpretadas como Steel Balls. O Spin é a descrição narrativa de Ataque Especial, Golpe Pessoal e poderes de arremesso.",
      history:["Integrante da família Zeppeli, Gyro participa da corrida Steel Ball Run carregando um objetivo que vai além da vitória. Sua especialidade são as esferas de aço, manejadas com a técnica de rotação conhecida como Spin.","Na versão de Tormenta20, o talento é marcial. Valkyrie é sua montaria; a relação entre galope e Golden Rectangle surge na narrativa e no preparo dos golpes."],
      skills:[["Pontaria","+6","Principal ataque à distância"],["Cavalgar","+6","Conduzir Valkyrie"],["Iniciativa","+6","Agir antes do inimigo"],["Fortitude","+4","Resistir ao desgaste"],["Guerra","+3","Analisar combate"],["Percepção","+5","Identificar ângulos"],["Adestramento","+3","Lidar com montarias"]],
      initial:["Estilo de Arremesso (origem Soldado)","Acuidade com Arma (Versátil humano)","Ataque Especial +4 (Guerreiro 1)"],
      gear:[
        {name:"Steel Balls",rule:"4 azagaias",detail:"Armas de arremesso com visual de esferas de aço. Mantêm dano perfurante e alcance das azagaias.",qty:"4",image:"https://static.jojowiki.com/images/thumb/1/16/latest/20221008194542/GrandGuerilla_Artwork_10.png/1200px-GrandGuerilla_Artwork_10.png",credit:"JoJo Wiki — Gyro com Steel Ball",source:"https://jojowiki.com/File:GrandGuerilla_Artwork_10.png"},
        {name:"Valkyrie",rule:"Cavalo comum / parceiro se autorizado",detail:"Montaria de Gyro. No nível 1 exige aquisição ou autorização do mestre; o benefício de parceiro não é gratuito.",qty:"1",image:"https://static.jojowiki.com/images/thumb/4/4f/latest/20250429064703/Valkyrie_Infobox_Manga.png/1200px-Valkyrie_Infobox_Manga.png",credit:"JoJo Wiki — Valkyrie",source:"https://jojowiki.com/Valkyrie"},
        {name:"Armadura de couro",rule:"Armadura leve · Defesa +2",detail:"Proteção discreta para preservar o estilo de jóquei.",qty:"1"},
        {name:"Mochila e saco de dormir",rule:"Equipamento de viagem",detail:"Itens da longa travessia.",qty:"1 conjunto"},
        {name:"Armas reserva",rule:"Equipamento inicial de Guerreiro / Soldado",detail:"Mantidas sem alterar as estatísticas oficiais.",qty:"Conforme criação"}
      ],
      attacks:[{name:"Steel Ball Throw",test:"+6",damage:"1d6+6",cost:"0 PM",detail:"Azagaia; Destreza +4 e Estilo de Arremesso +2 no dano."},{name:"Spin de precisão",test:"+10",damage:"1d6+6",cost:"1 PM",detail:"Ataque Especial +4 aplicado ao teste de ataque, ou ao dano em vez disso."}],
      progression:[
        ["1","Estilo de Arremesso · Acuidade com Arma · Ataque Especial +4","Esferas e Spin básico"],
        ["2","Arremesso Múltiplo","Duas Steel Balls"],
        ["3","Ginete · Durão (automático)","Combate montado"],
        ["4","Disparo Preciso","Ataques em alvos em combate"],
        ["5","Golpe Pessoal I · Ataque Especial +8","Spin Ricocheteante"],
        ["6","Arqueiro · Ataque Extra (automático)","Spin especializado"],
        ["7","Arremesso Potente","Pré-requisito de controle"],
        ["8","Arremesso Devastador","Derrubar e empurrar"],
        ["9","Na Mosca · Ataque Especial +12","Dano de precisão"],
        ["10","Golpe Pessoal II","Golden Spin"],
        ["11","Especialização em Arma","Steel Ball aperfeiçoada"],
        ["12","Mestre em Arma","Domínio das esferas"]
      ],
      techniques:[
        {level:1,name:"Steel Ball Throw",mechanic:"Azagaia + Estilo de Arremesso",cost:"0 PM",effect:"Arremesso básico com 1d6+6 de dano.",flavor:"O giro toma forma no lançamento."},
        {level:1,name:"Spin: Precision Shot",mechanic:"Ataque Especial",cost:"1 PM",effect:"+4 no ataque ou no dano.",flavor:"Concentração da rotação em um ponto exato."},
        {level:2,name:"Double Steel Ball",mechanic:"Arremesso Múltiplo",cost:"1 PM",effect:"Arremesso adicional nas condições do poder.",flavor:"Duas esferas em rápida sequência."},
        {level:5,name:"Returning Spin",mechanic:"Golpe Pessoal: Preciso + Ricocheteante",cost:"2 PM",effect:"Rola duas vezes no teste de ataque e a arma retorna.",flavor:"A esfera desenha um arco impossível."},
        {level:8,name:"Spin: Displacement",mechanic:"Arremesso Devastador",cost:"1 PM",effect:"Permite tentativa de derrubar ou empurrar com arremesso, seguindo o poder.",flavor:"A rotação desestabiliza o adversário."},
        {level:10,name:"Golden Spin / Ball Breaker",mechanic:"Golpe Pessoal com efeitos Preciso, Penetrante, Impactante, Ricocheteante e Carregado",cost:"Consultar soma de custos no livro",effect:"Golpe preparado que melhora precisão, penetração e impacto; não envelhece ou atravessa dimensões.",flavor:"O ápice da técnica Zeppeli."}
      ],
      notes:{overview:"As Steel Balls conservam as estatísticas de azagaia. A trajetória circular e o Ball Breaker são interpretação visual, não alterações de regra.",attributes:"Destreza é o atributo-base do ataque. O bônus racial humano foi aplicado em DES, CON e SAB.",equipment:"O cavalo como parceiro desde o nível 1 depende de decisão do mestre; sem isso, vale como montaria comum comprada ou adquirida na história.",abilities:"Carregado e Arremesso Devastador estão em Heróis de Arton; confira as descrições integrais no suplemento.",progression:"Os espaços de poder geral são escolhidos nos níveis de poder de Guerreiro; Durão e Ataque Extra entram automaticamente.",techniques:"Golpe Pessoal exige verificar custo, teto por golpe e versões disponíveis no nível; o Ball Breaker aqui não reproduz poderes sobrenaturais literais."},
      media:[{name:"Steel Ball / Spin",image:"https://static.jojowiki.com/images/thumb/1/16/latest/20221008194542/GrandGuerilla_Artwork_10.png/1200px-GrandGuerilla_Artwork_10.png",source:"https://jojowiki.com/File:GrandGuerilla_Artwork_10.png",credit:"JoJo Wiki"},{name:"Valkyrie",image:"https://static.jojowiki.com/images/thumb/4/4f/latest/20250429064703/Valkyrie_Infobox_Manga.png/1200px-Valkyrie_Infobox_Manga.png",source:"https://jojowiki.com/Valkyrie",credit:"JoJo Wiki"}],
      sources:[{name:"Steel Ball Run — Gyro (site oficial)",url:"https://jojo-portal-anime.com/sbr/character/02/"},{name:"Valkyrie — JoJo Wiki",url:"https://jojowiki.com/Valkyrie"}]
    },
    {
      id:"d",number:"02",name:"D.",universe:"Cyberpunk: Edgerunners 2",label:"NETRUNNER // CAPRICORN",symbol:"⌁",theme:"d",
      portrait:{url:"https://pbs.twimg.com/media/HMDDmf-XMAAWntL.jpg",credit:"Retrato promocional · @edgerunners",page:"https://www.cyberpunk.net/en/edgerunners2"},
      excerpt:"Um netrunner da Snake Nation em uma rota de vingança. O cyberdeck é sua arma.",
      info:{race:"Humano",className:"Arcanista — Bruxo",origin:"Nômade",devotion:"Livre",role:"Controle, suporte e sabotagem",partner:"Capri (interpretação narrativa do foco/familiar)"},
      stats:{pv:11,pm:10,defense:13,speed:"9 m",hpGain:5,pmGain:6},
      attrs:[{key:"CON",value:3,buy:2,race:1,why:"Corpo reforçado e sobrevivência."},{key:"CAR",value:1,buy:1,race:0,why:"Influência social pontual."},{key:"SAB",value:1,buy:1,race:0,why:"Atenção em operações."},{key:"INT",value:4,buy:3,race:1,why:"Conhecimento técnico e quickhacks."},{key:"FOR",value:0,buy:0,race:0,why:"Não depende de força física."},{key:"DEX",value:3,buy:2,race:1,why:"Reflexos e manobras."}],
      summary:"Arcanista Bruxo humano: magias reflavorizadas como quickhacks e foco arcano apresentado como cyberdeck. O exoesqueleto final representa a evolução dos recursos defensivos e de mobilidade.",
      history:["D. é um netrunner da Snake Nation. Seu clã foi destruído e a vingança o coloca diante de segredos corporativos de Night City.","O projeto Capricorn e a engrama Capri são elementos importantes de Edgerunners 2. Nesta ficha, Capri é uma interface narrativa, e o traje mecânico final não concede armadura ou ataques gratuitos: tudo precisa corresponder a magias e equipamentos oficiais."],
      skills:[["Misticismo","+6","Quickhacks como magias"],["Investigação","+6","Investigar sistemas"],["Ofício (engenhoqueiro)","+6","Intervenção técnica"],["Iniciativa","+5","Reagir em Night City"],["Pontaria","+5","Armas ocasionais"],["Pilotagem","+5","Condução de veículos"],["Ladinagem","+5","Infiltração"],["Furtividade","+5","Evasão"],["Percepção","+3","Vigilância"],["Sobrevivência","+3","Vida nômade"],["Vontade","+3","Resistência mental"]],
      initial:["Caminho do Bruxo e foco arcano","Versátil humano: perícia adicional + Proficiência (armas de fogo)","Magias de 1º círculo como quickhacks"],
      gear:[
        {name:"Cyberdeck",rule:"Foco arcano do Bruxo",detail:"Dispositivo visual que representa o foco usado na conjuração; não hackeia eletrônicos automaticamente.",qty:"1",image:"https://www.cyberpunk.net/build/images/edgerunners2/swiper/1-584a6f02.jpg",source:"https://www.cyberpunk.net/en/edgerunners2",credit:"Cyberpunk.net — arte oficial"},
        {name:"Jaqueta e interface",rule:"Traje de viajante",detail:"Visual azul com detalhes cibernéticos, sem bônus de armadura.",qty:"1"},
        {name:"Faca de sobrevivência",rule:"Adaga",detail:"Reserva corporal.",qty:"1"},
        {name:"Pistola Liberty (futura)",rule:"Pistola oficial",detail:"Compra futura com dinheiro de campanha; não faz parte do inventário gratuito.",qty:"0 no nível 1"},
        {name:"Exoesqueleto final",rule:"Reflavor de magias/itens obtidos",detail:"Armadura angular da sequência final: a proteção é simulada com Campo de Força e outras magias, não como item gratuito.",qty:"Objetivo narrativo"}
      ],
      attacks:[{name:"Neural Shock",test:"CD 14",damage:"2d6 psíquico",cost:"1 PM",detail:"Adaga Mental: resistência conforme a magia."},{name:"Neural Projectiles",test:"Acerto automático",damage:"2d4+2",cost:"1 PM",detail:"Seta Infalível de Talude; alcance curto."}],
      progression:[
        ["1","Bruxo · magias de 1º círculo","Neural Shock / System Collapse / Neural Projectiles"],
        ["2","Arcano de Batalha","Hack ofensivo"],
        ["3","Familiar","Interface simbólica de Capri"],
        ["4","Magia Pungente","Rotinas intensificadas"],
        ["5","Fortalecimento Arcano · acesso ao 2º círculo","Dissipar Magia"],
        ["6","Poder Mágico","Campo de Força"],
        ["7","Foco Vital","Velocidade"],
        ["8","Magia Acelerada","Invisibilidade"],
        ["9","Especialização em Escola · acesso ao 3º círculo","Relâmpago"],
        ["10","Contramágica Aprimorada","Telecinesia"],
        ["11","Conhecimento Mágico","Selo de Mana"],
        ["12","Poder Mágico ou melhoria equivalente","Voo"]
      ],
      techniques:[
        {level:1,name:"Neural Shock",mechanic:"Adaga Mental",cost:"1 PM",effect:"2d6 psíquico; possível condição pela resistência.",flavor:"Descarga neural."},
        {level:1,name:"System Collapse",mechanic:"Raio do Enfraquecimento",cost:"1 PM",effect:"Debilita o alvo dentro das condições oficiais da magia.",flavor:"Sabotagem motora."},
        {level:1,name:"Neural Projectiles",mechanic:"Seta Infalível de Talude",cost:"1 PM",effect:"Ataque de essência que não exige teste de ataque.",flavor:"Projéteis de dados."},
        {level:6,name:"Defensive Chassis",mechanic:"Campo de Força",cost:"Conforme magia",effect:"Defesa temporária de origem mágica; não cria um objeto permanente.",flavor:"Placas do traje final se desdobram."},
        {level:7,name:"Overclock",mechanic:"Velocidade",cost:"Conforme magia",effect:"Aceleração de acordo com as ações e limitações da magia.",flavor:"Pico de resposta do sistema."},
        {level:10,name:"Capricorn: Gravitational Override",mechanic:"Telecinesia",cost:"Conforme magia",effect:"Controle de objetos/criaturas nos limites da magia de 3º círculo.",flavor:"A interface da Capri remodela o espaço aparente."}
      ],
      notes:{overview:"O traje final apresentado na conversa é a referência visual. A imagem enviada no chat não foi republicada automaticamente; a arte promocional creditada representa D. neste primeiro lançamento.",attributes:"INT +4 rege as magias de Bruxo, enquanto DEX +3 sustenta a mobilidade.",equipment:"Pistola e exoesqueleto não são itens gratuitos. As magias mantêm duração, escola, alvo e custo oficiais.",abilities:"Quickhacks são magias para todos os efeitos. Capri não recebe turno separado por ser apenas um tema de foco ou familiar.",progression:"Magias de 2º círculo surgem no nível 5 e de 3º círculo no nível 9 para Arcanista puro; a sequência foi ajustada a isso.",techniques:"A manipulação gravitacional representa Telecinesia; não concede poderes inéditos à magia."},
      media:[{name:"D. / identidade nômade",image:"https://pbs.twimg.com/media/HMDDmf-XMAAWntL.jpg",source:"https://www.cyberpunk.net/en/edgerunners2",credit:"Perfil promocional de D."},{name:"Night City / elenco",image:"https://www.cyberpunk.net/build/images/edgerunners2/swiper/1-584a6f02.jpg",source:"https://www.cyberpunk.net/en/edgerunners2",credit:"Arte oficial do anime"}],
      sources:[{name:"Cyberpunk: Edgerunners 2 — D. / Capri (oficial)",url:"https://www.cyberpunk.net/en/edgerunners2"}]
    },
    {
      id:"david",number:"03",name:"David Martinez",universe:"Cyberpunk: Edgerunners",label:"SANDEVISTAN // IMPULSO",symbol:"⚡",theme:"david",
      portrait:{url:"https://i0.wp.com/thepathwitcher.blog/wp-content/uploads/2024/05/david-main-image.png?fit=1200%2C600&ssl=1",credit:"Cena de Edgerunners · The Path",page:"https://thepathwitcher.blog/2024/05/16/david-martinez-myth-special/"},
      excerpt:"Um corpo reforçado, um impulso de velocidade e um preço alto a pagar por cada segundo.",
      info:{race:"Humano",className:"Lutador",origin:"Herói Camponês",devotion:"Livre",role:"Corpo a corpo · Explosão de ações",partner:"Nenhum"},
      stats:{pv:23,pm:6,defense:13,speed:"9 m",hpGain:8,pmGain:3},
      attrs:[{key:"CON",value:3,buy:2,race:1,why:"Resistência à sobrecarga."},{key:"CAR",value:0,buy:0,race:0,why:"Autoconfiança instável."},{key:"SAB",value:1,buy:1,race:0,why:"Leitura de situação."},{key:"INT",value:1,buy:1,race:0,why:"Aprendizagem prática."},{key:"FOR",value:4,buy:3,race:1,why:"Potência com implantes."},{key:"DEX",value:3,buy:2,race:1,why:"Reflexos acelerados."}],
      summary:"Lutador humano. Surto Heroico simula o pico de ações do Sandevistan; Briga e Golpe Relâmpago representam o combate físico após os implantes.",
      history:["David cresceu em Night City e passou a usar a jaqueta amarela que pertenceu à sua mãe. Ao entrar no mundo dos edgerunners, o Sandevistan transformou sua maneira de lutar.","A build foca no risco e na intensidade: a aceleração custa muitos PM, enquanto o avanço de Lutador aumenta a frequência e a potência dos golpes."],
      skills:[["Luta","+6","Combate corpo a corpo"],["Fortitude","+5","Aguentar sobrecarga"],["Atletismo","+6","Mobilidade física"],["Iniciativa","+5","Reagir rapidamente"],["Reflexos","+5","Evitar impactos"],["Percepção","+3","Consciência de campo"],["Acrobacia","+5","Saltos e esquivas"],["Pontaria","+5","Armas de fogo, se houver"]],
      initial:["Surto Heroico + Coração Heroico (origem)","Reflexos de Combate (Versátil humano)","Briga + Golpe Relâmpago (Lutador 1)"],
      gear:[
        {name:"Jaqueta amarela",rule:"Traje de viajante",detail:"Peça visual icônica de David; não concede proteção extraordinária.",qty:"1",image:"https://i0.wp.com/thepathwitcher.blog/wp-content/uploads/2024/05/david-main-image.png?fit=1200%2C600&ssl=1",source:"https://thepathwitcher.blog/2024/05/16/david-martinez-myth-special/",credit:"Cena de Edgerunners"},
        {name:"Sandevistan",rule:"Surto Heroico",detail:"Ação adicional por 5 PM. Não é um implante mecânico com estatísticas independentes.",qty:"Habilidade"},
        {name:"Gorilla Arms",rule:"Briga / Trocação / Punhos de Adamante",detail:"Reforços corporais narrados por poderes de Lutador.",qty:"Evolução"},
        {name:"Cyberesqueleto",rule:"Objetivo de alto nível (narrativo)",detail:"O anime tem capacidade muito superior; sem item oficial equivalente, não recebe estatísticas extras.",qty:"Não inicial"}
      ],
      attacks:[{name:"Soco",test:"+6",damage:"1d6+4",cost:"0 PM",detail:"Ataque desarmado de Lutador 1."},{name:"Sandevistan",test:"Ação extra",damage:"Conforme ataque",cost:"5 PM",detail:"Surto Heroico fornece ação padrão ou de movimento adicional."}],
      progression:[
        ["1","Surto Heroico · Coração Heroico · Briga · Golpe Relâmpago","Sandevistan básico"],
        ["2","Atlético","Velocidade"],
        ["3","Braços Calejados","Reforço dos membros"],
        ["4","Sarado","Músculos reforçados"],
        ["5","Rasteira","Golpe incapacitante"],
        ["6","Trocação","Sequências de socos"],
        ["7","Aumento de Atributo (FOR)","Gorilla Arms"],
        ["8","Punhos de Adamante","Golpes pesados"],
        ["9","Golpe Imprudente","Sobrecarga"],
        ["10","Trincado","Máximo reforço"],
        ["11","Confiança dos Ringues","Resiliência"],
        ["12","Sequência Destruidora","Combo máximo"]
      ],
      techniques:[
        {level:1,name:"Sandevistan",mechanic:"Surto Heroico",cost:"5 PM",effect:"Uma ação padrão ou de movimento adicional, no limite do poder.",flavor:"O mundo parece desacelerar."},
        {level:1,name:"Street Brawler",mechanic:"Briga",cost:"0 PM",effect:"Soco com dano base 1d6+FOR.",flavor:"Ataques diretos e imprevisíveis."},
        {level:1,name:"Rapid Strike",mechanic:"Golpe Relâmpago",cost:"1 PM",effect:"Ataque adicional dentro das condições da habilidade.",flavor:"Uma sequência veloz de punhos."},
        {level:6,name:"Gorilla Arms Combo",mechanic:"Trocação",cost:"PM crescente",effect:"Ataques consecutivos segundo a habilidade.",flavor:"Sobrecarga de atuadores."},
        {level:8,name:"Titan Fists",mechanic:"Punhos de Adamante",cost:"Conforme poder",effect:"Os punhos passam a superar parte da resistência.",flavor:"Força dos implantes pesados."}
      ],
      notes:{overview:"Sandevistan usa Surto Heroico. A aceleração não altera as regras de iniciativa nem concede ações ilimitadas.",attributes:"FOR +4, DES +3 e CON +3 reproduzem dano corporal e resistência.",equipment:"Cyberware é nomenclatura de poderes. Não há cromo gratuito como equipamento extra.",abilities:"Os 6 PM iniciais permitem um uso caro de Surto Heroico e pouco recurso restante.",progression:"Foque em poderes desarmados da classe. Confira pré-requisitos específicos dos suplementos que estiverem na mesa.",techniques:"Sandevistan e Golpe Relâmpago têm custos separados; qualquer combinação respeita o total de PM."},
      media:[{name:"David / jaqueta e implantes",image:"https://i0.wp.com/thepathwitcher.blog/wp-content/uploads/2024/05/david-main-image.png?fit=1200%2C600&ssl=1",source:"https://thepathwitcher.blog/2024/05/16/david-martinez-myth-special/",credit:"The Path"},{name:"Design de David",image:"https://huggingface.co/api/resolve-cache/models/sd-concepts-library/david-martinez-edgerunners/42d78213465b7b84084ed8572790571c577799a8/concept_images%2F18.jpeg",source:"https://huggingface.co/sd-concepts-library/david-martinez-edgerunners",credit:"Coleção de referência"}],
      sources:[{name:"Cyberpunk: Edgerunners — David (Cyberpunk Wiki)",url:"https://cyberpunk.fandom.com/wiki/David_Martinez"},{name:"Guia de cosplay David (CD PROJEKT RED)",url:"https://cdn-s-cyberpunk.cdprojektred.com/cosplay-guides/DAVID_MARTINEZ_COSPLAY_GUIDE_PTBR.pdf"}]
    },
    {
      id:"cipher",number:"04",name:"Cipher (Cypher)",universe:"Honkai: Star Rail",label:"LADRA FANTASMA // QUÂNTICO",symbol:"◇",theme:"cipher",
      portrait:{url:"https://miyoversee.com/wp-content/uploads/2025/06/cipher.webp",credit:"Arte da personagem · Miyoversee",page:"https://miyoversee.com/quantum/cipher/"},
      excerpt:"A gata que transforma cada distração em oportunidade e cada inimigo em alvo.",
      info:{race:"Moreau — Herança do Gato",className:"Ladina",origin:"Criminoso",devotion:"Hyninn",role:"Furtividade · Trapaça · Ataque oportunista",partner:"Nenhum"},
      stats:{pv:13,pm:4,defense:16,speed:"9 m",hpGain:4,pmGain:4},
      attrs:[{key:"CON",value:1,buy:1,race:0,why:"Resistência moderada."},{key:"CAR",value:3,buy:2,race:1,why:"Truques, finta e charme."},{key:"SAB",value:1,buy:1,race:0,why:"Percepção e instinto."},{key:"INT",value:3,buy:2,race:1,why:"Planejamento e perícias."},{key:"FOR",value:0,buy:0,race:0,why:"Foco em agilidade, não força."},{key:"DEX",value:4,buy:3,race:1,why:"Furtividade e velocidade felina."}],
      summary:"Ladina Moreau Gato que utiliza garras, precisão, acrobacia e truques. Hyninn sustenta a fantasia da ladra enganadora; Ataque Furtivo e Oportunismo aproximam seus ataques de acompanhamento.",
      history:["Cifera, também conhecida como Cipher, é uma ladra de Amphoreus associada à astúcia e ao engano. Suas orelhas e cauda são parte marcante do design e combinam diretamente com a Herança do Gato.","Na adaptação, a mecânica de registrar dano de aliados é aproximada por preparação de Ataque Furtivo e ataques oportunistas. Não há armazenamento de dano ou dano verdadeiro."],
      skills:[["Acrobacia","+9","DEX +4, treino +2, CAR +3 racial"],["Furtividade","+8","DEX +4, treino +2, sentidos +2"],["Ladinagem","+6","Abrir fechaduras e furtar"],["Pontaria","+6","Arremessos de adaga"],["Reflexos","+6","Esquiva"],["Iniciativa","+6","Combate rápido"],["Percepção","+5","Sentidos felinos"],["Enganação","+5","Fintas e disfarces"],["Investigação","+5","Observar detalhes"],["Jogatina","+5","Trapaças"],["Vontade","+3","Resistência mental"]],
      initial:["Moreau Gato: Muitas Vidas, Garras e Sentidos Felinos","Ataque Furtivo +1d6 e Especialista (Ladina 1)","Punguista (origem Criminoso)","Farsa do Fingidor (Hyninn, se cumpridos os requisitos de devoção)"],
      gear:[
        {name:"Garras de Moreau",rule:"Armas naturais · 1d6 corte",detail:"Duas garras. A garra extra depende do custo e das condições da habilidade racial.",qty:"2",image:"https://miyoversee.com/wp-content/uploads/2025/06/cipher.webp",source:"https://miyoversee.com/quantum/cipher/",credit:"Arte de Cipher"},
        {name:"Adaga",rule:"1d4 · crítico 19–20/x2",detail:"Arremesso e combate próximos; a aparência pode ser uma lâmina ornamentada.",qty:"1"},
        {name:"Gazua",rule:"Ferramenta de Ladinagem",detail:"Suporte para furtos e infiltração.",qty:"1"},
        {name:"Armadura de couro",rule:"Defesa +2",detail:"Proteção leve para manter mobilidade.",qty:"1"},
        {name:"Kit de viagem",rule:"Mochila, saco de dormir e traje",detail:"Equipamento inicial básico.",qty:"1 conjunto"}
      ],
      attacks:[{name:"Adaga",test:"+6",damage:"1d4",cost:"0 PM",detail:"Sem Acuidade com Arma no nível 1; DES no ataque, FOR 0 no dano."},{name:"Garra",test:"+2",damage:"1d6",cost:"Conforme racial",detail:"Sem Acuidade com Arma no nível 1; use Luta e FOR."},{name:"Ataque Furtivo",test:"Condição",damage:"+1d6",cost:"0 PM",detail:"Adicional ao dano de ataque qualificado, uma vez por rodada."}],
      progression:[
        ["1","Ataque Furtivo · Especialista · Punguista","Ladra Moreau"],
        ["2","Acuidade com Arma","Garras de precisão"],
        ["3","Mente Criminosa","Perícia aprimorada"],
        ["4","Finta Aprimorada","Criar brechas"],
        ["5","Assassinar","Patron"],
        ["6","Oportunismo","Follow-up Attack"],
        ["7","Finta Acrobática","Manobra felina"],
        ["8","Enganar os Olhos","Truque fantasma"],
        ["9","Ataque Furtivo Letal","Furtivo aperfeiçoado"],
        ["10","Emboscar","Ação extra no começo"],
        ["11","Assassino em Série","Furtivos adicionais, com gasto"],
        ["12","Mestre Assassino","Suprema"]
      ],
      techniques:[
        {level:1,name:"Kitty Claws",mechanic:"Garras de Moreau",cost:"1 PM para ataque extra racial",effect:"Ataques naturais seguindo a condição de Garras.",flavor:"Arranhões rápidos e precisos."},
        {level:1,name:"Phantom Thief",mechanic:"Ataque Furtivo",cost:"0 PM",effect:"Acrescenta +1d6 quando o alvo está em condição vulnerável ao ataque.",flavor:"Surgir onde ninguém esperava."},
        {level:5,name:"Patron",mechanic:"Assassinar",cost:"3 PM",effect:"Prepara um furtivo mais forte contra alvo analisado.",flavor:"A marca da presa."},
        {level:6,name:"Follow-up Attack",mechanic:"Oportunismo",cost:"2 PM",effect:"Acompanhamento corpo a corpo de ataque aliado, sob condições do poder.",flavor:"O golpe vem logo após a distração."},
        {level:8,name:"Phantom Cat's Trick",mechanic:"Enganar os Olhos",cost:"Conforme poder",effect:"Movimentação acrobática que confunde o inimigo.",flavor:"Desaparecimento de uma ladra."},
        {level:12,name:"Yours Truly, Kitty Phantom Thief!",mechanic:"Assassinar + Ataque Furtivo + poderes de Ladina",cost:"Custos combinados",effect:"Suprema narrativa sem acumular dano aliado literalmente.",flavor:"Uma última trapaça brilhante."}
      ],
      notes:{overview:"Moreau Gato é obrigatório. Não recebe Versátil humano. Os traços felinos têm efeitos raciais próprios.",attributes:"Distribuição de 10 pontos, bônus raciais em CAR, DES e INT. Atributos no radar usam escala gráfica de 0 a 5, não letras de Stand.",equipment:"Garras são armas naturais; no nível 1 não recebem DEX no dano sem Acuidade.",abilities:"Oportunismo funciona apenas quando as condições de posicionamento e ataque do poder são atendidas.",progression:"Heróis de Arton acrescenta opções de finta e furtivo. Confirme os pré-requisitos na edição usada pela mesa.",techniques:"Patron é aproximação narrativa: não registra nem armazena os danos dos outros personagens."},
      media:[{name:"Cipher / visual oficial",image:"https://miyoversee.com/wp-content/uploads/2025/06/cipher.webp",source:"https://miyoversee.com/quantum/cipher/",credit:"Miyoversee"},{name:"Ataque quântico",image:"https://img.gachabase.net/conv/hsr/assets/22494680670a8acac66a9bc49d6a5e54.png?q=50&sig=ff6435b23a007c6b8e00ee57fd1d09c1012f387b02bafe8be2d80ab6fa95ffc9",source:"https://hsr.gachabase.net/characters/1406/cipher/release",credit:"Gachabase · arte de Honkai: Star Rail"}],
      sources:[{name:"Cipher — Honkai: Star Rail (site oficial)",url:"https://hsr.hoyoverse.com/en-us/character?charIndex=12&worldIndex=11"},{name:"Cipher — HSR (referência visual)",url:"https://miyoversee.com/quantum/cipher/"}]
    }
  ]
};