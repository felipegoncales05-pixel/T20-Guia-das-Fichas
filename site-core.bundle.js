
/* data.js */
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
        ["12","Aumento de Atributo (INT)","Voo; Inteligência +1 e aprimora a CD"]
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
      id:"cipher",number:"04",name:"Cipher (Cypher)",universe:"Honkai: Star Rail",catalogCategory:"chrysos",label:"LADRA FANTASMA // QUÂNTICO",symbol:"◇",theme:"cipher",
      portrait:{url:"https://miyoversee.com/wp-content/uploads/2025/06/cipher.webp",credit:"Arte da personagem · Miyoversee",page:"https://miyoversee.com/quantum/cipher/"},
      excerpt:"A gata que transforma cada distração em oportunidade e cada inimigo em alvo.",
      info:{race:"Moreau — Herança do Gato",className:"Ladina",origin:"Criminoso",devotion:"Hyninn",role:"Furtividade · Trapaça · Ataque oportunista",partner:"Nenhum"},
      stats:{pv:13,pm:4,defense:16,speed:"9 m",hpGain:4,pmGain:4},
      attrs:[{key:"CON",value:1,buy:1,race:0,why:"Resistência moderada."},{key:"CAR",value:3,buy:2,race:1,why:"Truques, finta e charme."},{key:"SAB",value:1,buy:1,race:0,why:"Percepção e instinto."},{key:"INT",value:3,buy:2,race:1,why:"Planejamento e perícias."},{key:"FOR",value:0,buy:0,race:0,why:"Foco em agilidade, não força."},{key:"DEX",value:4,buy:3,race:1,why:"Furtividade e velocidade felina."}],
      summary:"Ladina Moreau Gato que utiliza garras, precisão, acrobacia e truques. Hyninn sustenta a fantasia da ladra enganadora; Ataque Furtivo e Oportunismo aproximam seus ataques de acompanhamento.",
      history:["Cifera, também conhecida como Cipher, é uma ladra de Amphoreus associada à astúcia e ao engano. Suas orelhas e cauda são parte marcante do design e combinam diretamente com a Herança do Gato.","Na adaptação, a mecânica de registrar dano de aliados é aproximada por preparação de Ataque Furtivo e ataques oportunistas. Não há armazenamento de dano ou dano verdadeiro."],
      skills:[["Acrobacia","+9","DEX +4, treino +2, CAR +3 racial"],["Furtividade","+8","DEX +4, treino +2, sentidos +2"],["Ladinagem","+6","Abrir fechaduras e furtar"],["Pontaria","+6","Arremessos de adaga"],["Reflexos","+6","Esquiva"],["Iniciativa","+6","Combate rápido"],["Percepção","+5","Sentidos felinos"],["Cura","+3","Treinada para Mestre Assassino no nível 12"],["Enganação","+5","Fintas e disfarces"],["Investigação","+5","Observar detalhes"],["Jogatina","+5","Trapaças"],["Vontade","+3","Resistência mental"]],
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
    ,
    {
      id:"rentarou",number:"05",name:"Rentarou Aijou",universe:"The 100 Girlfriends Who Really, Really, Really, Really, Really Love You",label:"CORAÇÃO INABALÁVEL // APOIO",symbol:"♥",theme:"rentarou",
      portrait:{url:"https://hyakkano.com/xUtUy1FY/wp-content/themes/hyakkano_v1/assets/images/common/character/rentaro/img_rentaro.png",credit:"Arte oficial do anime · hyakkano.com",page:"https://hyakkano.com/character/rentaro/"},
      excerpt:"Não importa o tamanho do perigo: sua maior habilidade é nunca abandonar ninguém.",
      info:{race:"Humano",className:"Nobre",origin:"Herói Camponês",devotion:"Sem devoção obrigatória",role:"Suporte, comando e proteção social",partner:"As namoradas são parte da história, não parceiros gratuitos"},
      stats:{pv:19,pm:7,defense:16,speed:"9 m",hpGain:7,pmGain:4},
      attrs:[
        {key:"CON",value:3,buy:2,race:1,why:"Suportar sacrifícios e proteger quem ama."},
        {key:"CAR",value:4,buy:3,race:1,why:"Empatia, dedicação e liderança emocional."},
        {key:"SAB",value:2,buy:2,race:0,why:"Perceber necessidades e sentimentos."},
        {key:"INT",value:1,buy:1,race:0,why:"Criatividade para resolver crises."},
        {key:"FOR",value:0,buy:0,race:0,why:"Não depende de força bruta."},
        {key:"DEX",value:2,buy:1,race:1,why:"Agilidade para acudir os outros."}
      ],
      summary:"Nobre humano de origem humilde. O suporte funciona desde o nível 1 com Comandar, Orgulho, Coração Heroico e Surto Heroico; a progressão desbloqueia Inspirar Confiança, Estrategista, Gritar Ordens e Inspirar Glória. O romance é narrativa: não concede aliados ou vantagens mecânicas gratuitas.",
      history:[
        "Depois de sofrer cem rejeições, Rentarou Aijou descobre que está destinado a encontrar cem almas gêmeas. A partir daí, sua vida se torna uma sucessão de encontros, situações absurdas e escolhas tomadas com dedicação extrema.",
        "Rentarou se destaca por tratar cada pessoa importante para ele com cuidado e respeito, muitas vezes enfrentando riscos exagerados para protegê-la. Em Tormenta20, sua coragem vira Surto Heroico, sua empatia vira Diplomacia e sua habilidade de manter o grupo unido vira a classe Nobre.",
        "A classe Nobre não exige ascendência aristocrática: o livro aceita líderes e diplomatas de várias origens. Aqui, o Espólio representa um uniforme impecável e os poderes sociais são o verdadeiro coração da build."
      ],
      skills:[
        ["Diplomacia","+6","Carisma +4, treinamento +2; melhora no 4º, 5º e 11º níveis"],
        ["Vontade","+4","Sabedoria +2 e treinamento +2"],
        ["Intuição","+4","Ler emoções e identificar preocupações"],
        ["Iniciativa","+4","Reagir para proteger os amigos"],
        ["Luta","+2","Combate físico emergencial, sem ser sua especialidade"],
        ["Fortitude","+5","Constituição +3 e treinamento +2"],
        ["Cura","+4","Treino adicional humano: socorrer aliados"],
        ["Percepção","+4","Perícia adicional por Inteligência +1"]
      ],
      initial:[
        "Autoconfiança: use Carisma +4 na Defesa em vez de Destreza",
        "Espólio: escolha um traje da corte (reflavor de uniforme escolar formal)",
        "Orgulho: gaste PM para melhorar testes de perícia",
        "Comandar (Versátil humano): ação de movimento e 1 PM; aliados em alcance médio recebem +1 em testes de perícia até o fim da cena",
        "Coração Heroico e Surto Heroico (Herói Camponês): +3 PM; ação adicional por 5 PM, uma vez por rodada"
      ],
      gear:[
        {name:"Uniforme escolar impecável",rule:"Traje da corte · Espólio do Nobre",detail:"Blazer escuro arroxeado, camisa branca e gravata vermelha. Como traje da corte, cumpre as regras de vestuário formal em ambientes apropriados; não dá bônus universal de Carisma. O Espólio permite um item de até T$ 2.000.",qty:"1",image:"https://hyakkano.com/xUtUy1FY/wp-content/themes/hyakkano_v1/assets/images/common/character/rentaro/img_rentaro.png",source:"https://hyakkano.com/character/rentaro/",credit:"Site oficial do anime"},
        {name:"Proteção sob o blazer",rule:"Armadura de couro · Defesa +2",detail:"A armadura inicial fica por baixo das roupas. A Defesa 16 resulta de 10 + Carisma 4 (Autoconfiança) + couro 2, sem escudo empunhado.",qty:"1"},
        {name:"Bastão de emergência",rule:"Clava · arma simples",detail:"Equipamento de origem Herói Camponês; pode ter visual de um bastão/guarda-chuva resistente, sem trocar dano ou alcance. Usar somente quando conversar não resolve.",qty:"1"},
        {name:"Arma marcial de reserva",rule:"Espada longa (opcional entre os itens iniciais)",detail:"A classe tem proficiência marcial. Fica guardada; o visual escolar não implica uso permanente de uma arma.",qty:"1"},
        {name:"Escudo leve guardado",rule:"Escudo leve · não incluído na Defesa 16",detail:"Recebido com os equipamentos iniciais pela proficiência, mas guardado para manter as mãos livres e o uniforme reconhecível.",qty:"1"},
        {name:"Bolsa e estojo de recados",rule:"Mochila, saco de dormir, trajes básicos",detail:"Equipamentos de viagem; caderno de compromissos e cartas são adereços narrativos sem bônus mecânicos.",qty:"1 conjunto"},
        {name:"Kit de medicamentos (aquisição futura)",rule:"Item geral comprado com T$",detail:"A perícia Cura é treinada desde o começo, mas o kit deve ser comprado ou recebido na aventura. Não está incluído gratuitamente.",qty:"0 no início",image:"https://hyakkano.com/xUtUy1FY/wp-content/themes/hyakkano_v1/assets/images/pc/character/rentaro/img_face_rentaro.png",source:"https://hyakkano.com/character/rentaro/",credit:"Expressões oficiais de Rentarou"}
      ],
      attacks:[
        {name:"Bastão de emergência",test:"+2",damage:"1d6 impacto",cost:"0 PM",detail:"Ataque corpo a corpo com clava (FOR 0; Luta treinada +2). A preferência é defesa e apoio, não dano."},
        {name:"Comandar — incentivo",test:"Sem teste",damage:"+1 em perícias dos aliados",cost:"1 PM",detail:"Ação de movimento. Afeta aliados em alcance médio até o fim da cena, conforme o poder oficial."},
        {name:"Surto Heroico — socorro",test:"Ação adicional",damage:"Conforme a ação",cost:"5 PM",detail:"Uma vez por rodada, ganha ação padrão ou de movimento extra; ideal para alcançar quem está em perigo."}
      ],
      progression:[
        ["1","Autoconfiança · Espólio · Orgulho · Comandar · Surto Heroico · Coração Heroico","O namorado que jamais desiste"],
        ["2","Inspirar Confiança · Palavras Afiadas 2d6 (automático)","Oferecer segundas chances aos aliados"],
        ["3","Estrategista · Riqueza (automático)","Organizar a equipe em torno de cada pessoa"],
        ["4","Voz Poderosa · Gritar Ordens (automático)","Palavras que alcançam todo o grupo"],
        ["5","Aumento de Atributo (CAR +1) · Presença Aristocrática (automático)","Convicção inabalável"],
        ["6","Liderar pelo Exemplo · Palavras Afiadas 4d6 (automático)","Inspirar ações pela própria coragem"],
        ["7","Jogo da Corte","Diplomacia mesmo em crises absurdas"],
        ["8","Inspirar Glória","Conceder uma ação padrão extra a um aliado"],
        ["9","Língua de Prata","Conseguir o impossível com palavras"],
        ["10","Educação Privilegiada · Palavras Afiadas 6d6 (automático)","Aprender duas novas perícias"],
        ["11","Aumento de Atributo (CAR +1)","Carisma extraordinário"],
        ["12","General","Estrategia que fornece PM temporários aos aliados"]
      ],
      techniques:[
        {level:1,name:"Apoio Incondicional",mechanic:"Comandar",cost:"1 PM + ação de movimento",effect:"+1 em testes de perícia de aliados em alcance médio até o fim da cena.",flavor:"Uma promessa basta para levantar a moral da equipe."},
        {level:1,name:"Não Vou Abandonar Ninguém",mechanic:"Surto Heroico",cost:"5 PM",effect:"Ação padrão ou de movimento extra; só uma ativação por rodada.",flavor:"A determinação move Rentarou além do próprio cansaço."},
        {level:2,name:"Você Consegue!",mechanic:"Inspirar Confiança",cost:"2 PM",effect:"Permite que um aliado em alcance curto role novamente um teste.",flavor:"Ele acredita no grupo mesmo nos piores momentos."},
        {level:3,name:"Encontro Planejado",mechanic:"Estrategista",cost:"1 PM por aliado escolhido",effect:"Ação padrão para organizar aliados no alcance curto; cada um ganha uma ação de movimento no próximo turno.",flavor:"Cada pessoa recebe atenção e espaço para agir."},
        {level:4,name:"Declaração Inabalável",mechanic:"Gritar Ordens + Voz Poderosa",cost:"PM escolhidos (até CAR)",effect:"Aumenta os testes dos aliados pelo PM investido até o início do próximo turno; Voz Poderosa amplia alcance conforme o poder.",flavor:"Uma frase sincera atravessa até o caos."},
        {level:6,name:"Exemplo de Amor",mechanic:"Liderar pelo Exemplo",cost:"2 PM",effect:"Em certas perícias, companheiros podem aproveitar o resultado de seu teste bem-sucedido.",flavor:"Ele mostra primeiro como enfrentar o medo."},
        {level:8,name:"O Amor Faz Milagres",mechanic:"Inspirar Glória",cost:"5 PM",effect:"Um aliado em alcance curto ganha uma ação padrão extra no próximo turno, uma vez por cena por alvo.",flavor:"Não é milagre mágico: é o poder de motivar as pessoas."},
        {level:12,name:"Uma Família, Cem Motivos",mechanic:"General + Estrategista",cost:"1 PM por aliado em Estrategista",effect:"Aliados direcionados também ganham 1d4 PM temporários segundo as regras de General.",flavor:"Sua presença transforma um grupo em equipe."}
      ],
      notes:{
        overview:"O Nobre pode ser um líder carismático que não nasceu na nobreza. Nenhum romance concede parceiros, ações gratuitas ou cem aliados em combate.",
        attributes:"Compra de 10 pontos: FOR 0 (0), DES 1 (1), CON 2 (2), INT 1 (1), SAB 2 (2), CAR 3 (4). Humano acrescenta +1 em DES, CON e CAR.",
        equipment:"O Espólio foi destinado ao traje da corte, reinterpretado como uniforme formal. A armadura de couro é inicial; o escudo fica guardado. O kit de medicamentos não é grátis.",
        abilities:"Comandar dá +1 até o fim da cena e custa 1 PM, enquanto Gritar Ordens é um bônus diferente, temporário, obtido no 4º nível. Inspiração não gera ações infinitas.",
        progression:"PV = 19 + 7 por nível extra; PM = 4 por nível +3 de Coração Heroico, com +3 nos níveis 5 e 11. Carisma sobe no 5º e no 11º níveis; confira a patente do poder e efeitos opcionais.",
        techniques:"As técnicas têm nomes narrativos. Gritar Ordens não altera uma magia nem exige afinidade divina; Inspirar Glória e General cumprem seus custos e pré-requisitos normais."
      },
      media:[
        {name:"Rentarou — traje original",image:"https://hyakkano.com/xUtUy1FY/wp-content/themes/hyakkano_v1/assets/images/common/character/rentaro/img_rentaro.png",source:"https://hyakkano.com/character/rentaro/",credit:"Arte oficial · Site do anime"},
        {name:"Rentarou — expressões",image:"https://hyakkano.com/xUtUy1FY/wp-content/themes/hyakkano_v1/assets/images/pc/character/rentaro/img_face_rentaro.png",source:"https://hyakkano.com/character/rentaro/",credit:"Retratos oficiais · Site do anime"}
      ],
      sources:[
        {name:"Rentarou Aijou — site oficial do anime",url:"https://hyakkano.com/character/rentaro/"},
        {name:"The 100 Girlfriends — site oficial",url:"https://hyakkano.com/"}
      ]
    }

  ]
};

/* guide.js */
/* Referências de consulta e instruções originais resumidas, sem reproduzir textos dos livros. */
window.T20_GUIDE = {
 books: {
  core:{name:"Tormenta20 — Jogo do Ano v1.3",url:"https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf",edition:"v1.3 · 2024"},
  heroes:{name:"Heróis de Arton",url:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/",edition:"v1.1 · 2025"},
  threats:{name:"Ameaças de Arton",url:"https://jamboeditora.com.br/produto/ameacas-de-arton/",edition:"Consulte edição usada na mesa"}
 },
 instructions:"As páginas são as numerações impressas do livro, não necessariamente o índice do visualizador de PDF. Alguns efeitos de magias têm apenas capítulo/índice indicado quando a página exata do verbete não pôde ser verificada.",
 people:{
 gyro:{
  levels:[
   {why:"Começar como arremessador confiável: a Steel Ball é uma azagaia com visual diferente.",use:"Ataque com Pontaria; Acuidade usa DES no ataque e dano, Estilo de Arremesso soma +2 no dano. Ataque Especial custa 1 PM para +4 em ataque ou dano.",ref:[["core","64–66","Ataque Especial"],["core","124–125","Acuidade com Arma e Estilo de Arremesso"],["core","95–96","Origem Soldado"]]},
   {why:"Reproduzir dois lançamentos em sequência.",use:"Uma vez por rodada, após atacar com uma arma arremessada, gaste 1 PM e lance outra contra o mesmo alvo. Precisa de uma segunda esfera.",ref:[["core","124–125","Arremesso Múltiplo"]]},
   {why:"Lutar de Valkyrie sem a penalidade normal dos ataques montados.",use:"Ginete remove a penalidade de ataque à distância montado. Durão é automático do Guerreiro: ao sofrer dano, pode gastar 3 PM para reduzi-lo à metade.",ref:[["core","126","Ginete"],["core","66","Durão"]],automatic:"Durão é habilidade de classe, não escolha adicional."},
   {why:"Arremessar quando aliados já estejam engajados com o oponente.",use:"Disparo Preciso remove a penalidade de −5 em ataques à distância contra inimigos envolvidos em combate corpo a corpo.",ref:[["core","124–125","Disparo Preciso"]]},
   {why:"Criar a primeira técnica exclusiva de ricochete.",use:"Escolha Golpe Pessoal (arma: azagaia) com Preciso e Ricocheteante: 2 PM, role dois dados de ataque e use o melhor; a esfera retorna. Ataque Especial aumenta para +8.",ref:[["core","65–66","Golpe Pessoal, Preciso e Ricocheteante"],["core","64–65","Ataque Especial +8"]]},
   {why:"Transformar Sabedoria em precisão de dano e acelerar a cadência.",use:"Arqueiro adiciona SAB (+3) ao dano de ataques à distância. Ataque Extra é automático: ao agredir, gaste 2 PM por outro ataque, uma vez por rodada.",ref:[["core","64–66","Arqueiro e Ataque Extra"]],automatic:"Ataque Extra é habilidade de classe."},
   {why:"Cumprir a exigência do Spin de deslocamento; não é um bônus gratuito de dano.",use:"Arremesso Potente permite substituir DES por FOR no teste com arma de arremesso, mas Gyro normalmente continua usando DES por ser maior. É requisito para Arremesso Devastador.",ref:[["core","124–125","Arremesso Potente"]]},
   {why:"O Spin deixa de ser somente dano e passa a controlar o campo.",use:"Ao acertar ataque com arma de arremesso, pague 1 PM para tentar derrubar ou empurrar com o próprio resultado do ataque, conforme o poder.",ref:[["heroes","78","Arremesso Devastador"]]},
   {why:"Fazer uma esfera causar impacto adicional num lançamento decisivo.",use:"Na Mosca: gaste 1 PM num ataque à distância; se acertar, adicione um dado de dano da arma. Ataque Especial sobe automaticamente para +12.",ref:[["heroes","79","Na Mosca"],["core","64–65","Ataque Especial +12"]]},
   {why:"Representar a Golden Rectangle como técnica preparada.",use:"Escolha um SEGUNDO Golpe Pessoal (não substitui automaticamente o primeiro). Sugestão: Carregado, Preciso, Penetrante, Impactante e Ricocheteante. Confira o custo total, as ações e o limite de PM com o mestre.",ref:[["heroes","68","Carregado / novos efeitos de Golpe Pessoal"],["core","65–66","Efeitos de Golpe Pessoal"]]},
   {why:"Consolidar o dano físico das Steel Balls.",use:"Especialização em Arma (azagaia): +2 nas rolagens de dano com essa arma, continuamente.",ref:[["core","65–66","Especialização em Arma"]]},
   {why:"Concluir o domínio do Spin e o uso da arma escolhida.",use:"Mestre em Arma aumenta o dano base da azagaia em um passo. Em ataques com ela, é possível pagar 2 PM para rolar o teste novamente, conforme o poder.",ref:[["core","66","Mestre em Arma"]]}
  ],
  basics:[
   {name:"Acuidade com Arma",why:"Permite o Gyro usar sua maior característica: Destreza.",use:"Aplica DES em ataque e dano com a azagaia, em vez de FOR.",ref:[["core","124","Acuidade com Arma"]]},
   {name:"Steel Balls / azagaia",why:"Evita inventar estatísticas de arma.",use:"Mantenha alcance, tipo de dano, recarga e regras da azagaia oficial; só a aparência muda.",ref:[["core","cap. 3, seção Armas","Azagaia"]]},
   {name:"Valkyrie",why:"Preservar o combate de jóquei sem conceder parceiro gratuito.",use:"A montaria normal deve ser adquirida. Os benefícios de um parceiro exigem poder ou aprovação do mestre.",ref:[["core","cap. 3, seção Montarias; p. 260","Montaria / parceiro"]]}
  ]
 },
 d:{
  levels:[
   {why:"O cyberdeck é uma interface visual para o foco mágico de Bruxo.",use:"Aprenda Adaga Mental, Raio do Enfraquecimento e Seta Infalível de Talude. Cada uma custa PM, usa sua execução e continua sendo magia pelas regras.",ref:[["core","37","Bruxo e magias do 1º círculo"],["core","cap. 4, verbetes por nome","Magias iniciais"]]},
   {why:"O netrunner intensifica o dano dos quickhacks.",use:"Arcano de Batalha soma INT (+4) às rolagens de dano de magias que causem dano. Aprenda uma magia nova de 1º círculo ao subir de nível.",ref:[["core","38","Arcano de Batalha"],["core","37","Aprendizado de magias"]]},
   {why:"Dar presença mecânica à interface da Capri sem inventar uma segunda personagem.",use:"Familiar: escolha um familiar oficial (como cobra). Ele concede apenas os benefícios da espécie e se comunica telepaticamente.",ref:[["core","38","Familiar e opções"]]},
   {why:"Forçar a dificuldade de resistir a um hack decisivo.",use:"Magia Pungente permite pagar +1 PM para aumentar em +2 a CD da magia lançada; é um custo opcional por uso.",ref:[["core","38","Magia Pungente"]]},
   {why:"As magias ficam mais difíceis de resistir e o 2º círculo libera Dissipar Magia.",use:"Fortalecimento Arcano aumenta a CD das suas magias em +1 permanentemente. A partir do nível 5 você pode aprender magias do 2º círculo.",ref:[["core","37–38","Fortalecimento Arcano / 2º círculo"],["core","cap. 4, Dissipar Magia","Dissipar Magia"]]},
   {why:"Expandir a reserva de energia e liberar o Campo de Força.",use:"Poder Mágico concede +1 PM por nível de Arcanista, inclusive níveis anteriores. Campo de Força é magia do 2º círculo e gera proteção mágica temporária, não uma armadura permanente.",ref:[["core","38–39","Poder Mágico"],["core","cap. 4, Campo de Força","Campo de Força"]]},
   {why:"Evitar que o corpo caia enquanto o cyberdeck permanece funcional.",use:"Foco Vital permite sobreviver a dano fatal segurando o foco, mas o foco absorve o excedente e pode ser destruído. Velocidade é uma magia aprendida nesse patamar.",ref:[["core","38","Foco Vital"],["core","cap. 4, Velocidade","Magia Velocidade"]]},
   {why:"Simular quickhacks executados em sequência e furtividade digital.",use:"Magia Acelerada altera a execução de uma magia para livre, pagando os custos e respeitando restrições de execução. A magia adicional proposta é Invisibilidade.",ref:[["core","131","Magia Acelerada"],["core","cap. 4, Invisibilidade","Invisibilidade"]]},
   {why:"Melhorar a precisão de uma escola de quickhacks e obter magias de 3º círculo.",use:"Escolha Encantamento para Especialista em Escola: +2 na CD dessa escola. O nível 9 também libera magias de 3º círculo, como Relâmpago.",ref:[["core","38","Especialista em Escola"],["core","37","Magias de 3º círculo"]]},
   {why:"Interromper técnicas arcanas hostis e liberar a Telecinesia.",use:"Contramágica Aprimorada permite tentar contramágica como reação, uma vez por rodada. Exige conhecer Dissipar Magia. Telecinesia é uma magia, sem capacidades adicionais de hack.",ref:[["core","38","Contramágica Aprimorada"],["core","cap. 4, Telecinesia","Telecinesia"]]},
   {why:"Acrescentar flexibilidade ao repertório neural.",use:"Conhecimento Mágico faz aprender duas magias extras de círculos que já possa usar, além da magia aprendida normalmente neste nível.",ref:[["core","38","Conhecimento Mágico"]]},
   {why:"Concluir a evolução como netrunner de alto poder.",use:"Aumento de Atributo (INT) aumenta INT de +4 para +5; revise CD das magias e PM. Como sugestão de nova magia escolha Voo (3º círculo).",ref:[["core","38","Aumento de Atributo / Arcanista"],["core","cap. 4, Voo","Magia Voo"]]}
  ],
  basics:[
   {name:"Cyberdeck / foco arcano",why:"Bruxo exige um objeto para canalizar magias.",use:"Empunhe o foco e mantenha a outra mão livre conforme o Caminho do Bruxo; se perder o foco, há teste especial de Misticismo.",ref:[["core","37","Caminho do Bruxo"]]},
   {name:"Quickhacks",why:"Reproduzir sabotagem sem criar novas regras.",use:"São magias normais: alvo, CD, círculo, custo, ação e duração vêm do capítulo de magias.",ref:[["core","cap. 4","Conjuração e magias"]]}
  ]
 },
 david:{
  levels:[
   {why:"Sandevistan consome energia rapidamente, enquanto Briga representa a base corporal.",use:"Surto Heroico custa 5 PM para ganhar ação padrão ou de movimento (1x/rodada). Golpe Relâmpago custa 1 PM para outro ataque desarmado quando agride. Coração Heroico concede +3 PM iniciais.",ref:[["core","91","Herói Camponês e Coração Heroico"],["core","130–131","Surto Heroico"],["core","76","Briga e Golpe Relâmpago"]]},
   {why:"Melhorar a mobilidade do edgerunner.",use:"Atlético aumenta o deslocamento terrestre em 3 m e oferece benefícios de Atletismo conforme a descrição oficial.",ref:[["core","127–130","Atlético"]]},
   {why:"Reproduzir reforços corporais e resistência a golpes.",use:"Braços Calejados soma FOR na Defesa enquanto estiver sem armadura, limitado pelo nível. Casca Grossa vem automaticamente da classe, somando CON à Defesa.",ref:[["core","76","Braços Calejados"],["core","75–77","Casca Grossa"]],automatic:"Casca Grossa é habilidade de classe."},
   {why:"Aumentar o vigor do corpo implantado.",use:"Sarado soma FOR aos PV máximos e em Fortitude. O bônus aumenta se a Força aumentar posteriormente.",ref:[["core","77","Sarado"]]},
   {why:"Tirar inimigos do equilíbrio e fortalecer ataques desarmados.",use:"Rasteira usa manobra associada à luta desarmada. Automaticamente Briga aumenta o dado para 1d8 e Golpe Cruel melhora a margem de ameaça.",ref:[["core","76–77","Rasteira, Briga e Golpe Cruel"]],automatic:"Briga 1d8 e Golpe Cruel vêm da classe no nível 5."},
   {why:"Executar combinações cada vez mais longas.",use:"Trocação pode gerar novos socos após acertos desarmados pagando PM progressivos. Interrompa se errar ou não tiver PM.",ref:[["core","77","Trocação"]]},
   {why:"Melhorar Gorilla Arms de modo permanente.",use:"Aumento de Atributo eleva FOR para +5, melhorando ataque, dano, PV de Sarado e a Defesa de Braços Calejados. Casca Grossa ganha +1 automático.",ref:[["core","76–77","Aumento de Atributo e Casca Grossa"]]},
   {why:"Socar criaturas com proteções resistentes.",use:"Punhos de Adamante modifica seus golpes desarmados conforme o poder, tornando-os mais eficazes contra certas resistências.",ref:[["core","77","Punhos de Adamante"]]},
   {why:"Usar sobrecarga com custo defensivo.",use:"Golpe Imprudente amplia dano durante Golpe Relâmpago, mas diminui a Defesa. Briga cresce para 1d10 e Golpe Violento eleva o multiplicador crítico automaticamente.",ref:[["core","77","Golpe Imprudente, Briga e Golpe Violento"]],automatic:"Briga 1d10 e Golpe Violento vêm da classe."},
   {why:"Aprimorar a potência dos implantes.",use:"Trincado adiciona CON (+3) ao dano desarmado de David. É bônus de dano, não um novo ataque.",ref:[["core","77","Trincado"]]},
   {why:"Lutar sob pressão e resistir a contra-ataques.",use:"Confiança dos Ringues dá PM temporários quando inimigos erram ataques corpo a corpo. Casca Grossa ganha mais +1 à Defesa neste nível.",ref:[["core","76–77","Confiança dos Ringues e Casca Grossa"]]},
   {why:"Representar uma sequência devastadora final.",use:"Antes de atacar, pague 2 PM e anuncie quantos golpes acertará. Se conseguir, o último golpe recebe bônus de dano cumulativo conforme o número anunciado.",ref:[["core","77","Sequência Destruidora"]]}
  ],
  basics:[
   {name:"Sandevistan",why:"A mecânica é um estouro temporário de ações.",use:"É o Surto Heroico da origem: não concede iniciativa automática ou ações infinitas.",ref:[["core","130–131","Surto Heroico"]]},
   {name:"Coração Heroico",why:"Aumenta a quantidade de ativações disponíveis.",use:"+3 PM no nível 1 e +3 PM adicionais quando entra nos níveis 5 e 11.",ref:[["core","91","Coração Heroico"]]},
   {name:"Gorilla Arms",why:"Músculos reforçados são melhor representados por Lutador.",use:"Briga, Trocação, Punhos de Adamante e Trincado são poderes/regras, não equipamentos gratuitos.",ref:[["core","75–77","Lutador"]]}
  ]
 },
 cipher:{
  levels:[
   {why:"Uma ladra felina de verdade; Moreau Gato é parte mecânica da ficha.",use:"As garras e sentidos são raciais. Ataque Furtivo acrescenta 1d6 ao ataque válido uma vez por rodada. Especialista melhora perícias pagando 1 PM. Punguista é da origem e Farsa do Fingidor depende da devoção a Hyninn.",ref:[["threats","305–306","Moreau — Herança do Gato"],["core","72–74","Ladina e Especialista"],["core","88–89","Criminoso / Punguista"],["core","cap. 2, poderes concedidos","Farsa do Fingidor"]]},
   {why:"Permitir que as garras sejam controladas por Destreza.",use:"Acuidade troca FOR por DES em ataque e dano com armas leves/naturais que atendam ao poder. Evasão é automática e evita dano quando passa em certos testes de Reflexos.",ref:[["core","124","Acuidade com Arma"],["core","73","Evasão"]],automatic:"Evasão é recebida automaticamente pela classe."},
   {why:"Elevar furtividade e a capacidade de roubar.",use:"Mente Criminosa soma INT (+3) aos valores de Ladinagem e Furtividade. Ataque Furtivo aumenta automaticamente para 2d6.",ref:[["core","73–74","Mente Criminosa e Ataque Furtivo"]]},
   {why:"Abrir brechas para um golpe de ladra.",use:"Finta Aprimorada permite fintar como ação de movimento. Esquiva Sobrenatural é automática: Cipher não é surpreendida.",ref:[["core","125","Finta Aprimorada"],["core","74","Esquiva Sobrenatural"]],automatic:"Esquiva Sobrenatural é de classe."},
   {why:"Simular a marca Patron para amplificar um golpe decisivo.",use:"Gaste ação de movimento e 3 PM para estudar uma criatura em alcance curto. Seu próximo Ataque Furtivo válido dentro da janela dobra os dados furtivos.",ref:[["core","73","Assassinar"]]},
   {why:"Atacar junto com seus aliados.",use:"Uma vez por rodada, quando um aliado causa dano a inimigo adjacente a Cipher, pague 2 PM para atacar esse inimigo corpo a corpo.",ref:[["core","74","Oportunismo"]]},
   {why:"Transformar movimento felino em enganação ofensiva.",use:"Finta Acrobática soma DES nos testes de Enganação para fintar, atendendo aos pré-requisitos de treinamento.",ref:[["heroes","71","Finta Acrobática"]]},
   {why:"Escapar pela frente do inimigo e confundir a percepção.",use:"Enganar os Olhos se aplica quando passa por um inimigo com Acrobacia. Ele pode considerá-la invisível por uma rodada, salvo resistência. Olhos nas Costas é automático e impede flanqueamento.",ref:[["heroes","71","Enganar os Olhos"],["core","74","Olhos nas Costas"]],automatic:"Olhos nas Costas é habilidade de classe."},
   {why:"Melhorar Ataque Furtivo quando os dados quase atingem o máximo.",use:"Ataque Furtivo Letal permite novos dados em resultados específicos dos dados do furtivo. Ataque Furtivo base já está em 5d6 neste patamar.",ref:[["heroes","71","Ataque Furtivo Letal"],["core","73","Ataque Furtivo"]]},
   {why:"Abrir combate com uma ação extra.",use:"Emboscar: na primeira rodada de combate, pode pagar 2 PM por uma ação padrão adicional. Evasão Aprimorada é automática.",ref:[["core","73–74","Emboscar e Evasão Aprimorada"]],automatic:"Evasão Aprimorada é de classe."},
   {why:"Fazer mais de um ataque furtivo na mesma rodada.",use:"Assassino em Série permite pagar 2 PM para aplicar Ataque Furtivo pela segunda vez na rodada se ambos os ataques cumprirem as condições. O dano furtivo base chega a 6d6.",ref:[["heroes","71","Assassino em Série"],["core","73","Ataque Furtivo"]]},
   {why:"Reproduzir a suprema como execução preparada.",use:"Mestre Assassino aprimora Assassinar com opções adicionais pagas separadamente. Exige Cura e Percepção treinadas, além de Assassinar e Ataque Furtivo Letal.",ref:[["heroes","72","Mestre Assassino"]]}
  ],
  basics:[
   {name:"Herança do Gato",why:"Representar a identidade felina sem homebrew.",use:"Garras, sentidos e redução de dano por queda seguem exclusivamente os traços raciais Moreau.",ref:[["threats","305–306","Moreau Gato"]]},
   {name:"Ataque Furtivo",why:"A principal fonte de dano da ladra.",use:"Requer alvo desprevenido, flanqueado ou outras condições previstas; não se aplica indiscriminadamente.",ref:[["core","73","Ataque Furtivo"]]},
   {name:"Hyninn",why:"Complementa os truques e enganação.",use:"Consulte as obrigações da divindade e a condição de devota antes de usar Farsa do Fingidor.",ref:[["core","cap. 2, deuses e poderes concedidos","Hyninn / Farsa do Fingidor"]]}
  ]
 }
}};


/* rentarou-guide.js */
/* Complemento da ficha Rentarou — textos resumidos, com referências à edição oficial. */
window.T20_GUIDE.people.rentarou = {
 levels: [
  {why:"A principal arma dele é manter o grupo unido.",use:"Nobre 1: Autoconfiança usa CAR na Defesa; Espólio concede o traje; Orgulho melhora testes gastando PM. Humano: Comandar dá +1 nos testes dos aliados em alcance médio por 1 PM e ação de movimento, até o fim da cena. Origem: Coração Heroico dá +3 PM; Surto Heroico custa 5 PM para uma ação adicional, uma vez por rodada.",ref:[["core","78–79","Nobre"],["core","91–92","Herói Camponês"],["core","130","Comandar e Surto Heroico"]]},
  {why:"Oferecer a cada aliado uma segunda chance.",use:"Inspirar Confiança: por 2 PM, um aliado em alcance curto pode repetir um teste. Palavras Afiadas é automático: 1 PM e ação padrão, Diplomacia contra Vontade de alvo inteligente. Causa 2d6 psíquico não letal, ou metade se perder.",automatic:"Palavras Afiadas 2d6 é de classe.",ref:[["core","79–80","Inspirar Confiança e Palavras Afiadas"]]},
  {why:"Planejar os movimentos do grupo com atenção individual.",use:"Estrategista: ação padrão e 1 PM por aliado (máximo CAR) em alcance curto; no próximo turno cada escolhido recebe ação de movimento. Riqueza automática depende do contexto e não significa dinheiro infinito.",automatic:"Riqueza no nível 3 é automática.",ref:[["core","79–80","Estrategista e Riqueza"]]},
  {why:"Fazer a voz de Rentarou alcançar toda a equipe.",use:"Voz Poderosa: +2 em Diplomacia/Intimidação, habilidades de Nobre de curto para médio. Gritar Ordens é automático e custa PM escolhidos até CAR; aliados recebem bônus igual aos PM gastos nos testes até início do próximo turno.",automatic:"Gritar Ordens é de classe.",ref:[["core","80","Voz Poderosa e Gritar Ordens"]]},
  {why:"Sua convicção se converte em presença e proteção.",use:"Aumento de Atributo: CAR +4 → +5; +1 em Defesa e Diplomacia. Presença Aristocrática: ao sofrer ameaça de dano, por 2 PM faça o agressor testar Vontade; falha desperdiça a ação, uma vez por cena por criatura. Coração Heroico concede +3 PM extras.",automatic:"Presença Aristocrática é de classe.",ref:[["core","79–80","Aumento de Atributo e Presença Aristocrática"],["core","91–92","Coração Heroico"]]},
  {why:"Ensinar pelo próprio exemplo, em vez de só exigir.",use:"Liderar pelo Exemplo: por 2 PM, até seu próximo turno, aliados em alcance curto podem utilizar o resultado de um teste de perícia bem-sucedido seu para a mesma perícia. Palavras Afiadas cresce para 4d6 mediante o custo de classe.",automatic:"Palavras Afiadas 4d6.",ref:[["core","80","Liderar pelo Exemplo; Palavras Afiadas"]]},
  {why:"Lidar com crises sociais sem perder a calma.",use:"Jogo da Corte permite pagar 1 PM para refazer um teste de Diplomacia, Intuição ou Nobreza. Não concede treinamento automático em Nobreza.",ref:[["core","80","Jogo da Corte"]]},
  {why:"Inspirar ações que parecem impossíveis.",use:"Inspirar Glória: por 5 PM, uma vez por rodada, dá a um aliado em alcance curto ação padrão extra no próximo turno. Só funciona uma vez por cena por aliado. Exige Inspirar Confiança e nível 8 de Nobre.",ref:[["core","80","Inspirar Glória"]]},
  {why:"Falar por aqueles que não conseguem ser ouvidos.",use:"Língua de Prata: pague 2 PM em teste baseado em CAR para receber +metade do nível (+4 neste nível). Não se aplica a testes de outros atributos.",ref:[["core","80","Língua de Prata"]]},
  {why:"Aprender maneiras novas de ajudar o grupo.",use:"Educação Privilegiada treina duas perícias da lista do Nobre: aqui Enganação e Investigação. Palavras Afiadas chega a 6d6 usando seu custo de classe.",automatic:"Palavras Afiadas 6d6.",ref:[["core","79–80","Educação Privilegiada e Palavras Afiadas"]]},
  {why:"Uma determinação que atravessa mais um patamar.",use:"Novo Aumento de Atributo: CAR +5 → +6 (novo patamar campeão). +1 em Defesa e testes baseados em CAR. Coração Heroico dá +3 PM adicionais no 11º nível.",ref:[["core","79","Aumento de Atributo"],["core","91–92","Coração Heroico"]]},
  {why:"A equipe ganha energia trabalhando junta.",use:"General: ao usar Estrategista, aliados direcionados recebem 1d4 PM temporários até fim do turno deles. Esses PM não podem gerar novos PM. Requer Estrategista e Nobre 12.",ref:[["core","79","General e Estrategista"]]}
 ],
 basics: [
  {name:"Comandar",why:"Apoio real desde a primeira rodada.",use:"Ação de movimento e 1 PM; +1 em testes de aliados em alcance médio até fim da cena. Não confundir com Gritar Ordens.",ref:[["core","130","Comandar"]]},
  {name:"Orgulho e Autoconfiança",why:"Carisma sustenta defesa e a liderança.",use:"Orgulho: +2 por PM no teste de perícia (máximo CAR PM). Autoconfiança permite CAR em vez de DES na Defesa, se a armadura permitir.",ref:[["core","78–79","Orgulho e Autoconfiança"]]},
  {name:"Coração Heroico e Surto Heroico",why:"Sacrifício e aceleração de emergência.",use:"+3 PM inicial, +3 PM no nível 5 e no 11. Surto Heroico: 5 PM por ação padrão ou movimento extra, até uma vez por rodada.",ref:[["core","91–92","Origem; Coração Heroico"],["core","130","Surto Heroico"]]},
  {name:"Uniforme e proteção",why:"Estética estudantil sem inventar bônus.",use:"Espólio: traje da corte com aparência de uniforme formal. Armadura de couro inicial (+2 Defesa) sob a roupa. Escudo guardado não conta na Defesa.",ref:[["core","78–79","Espólio"],["core","140–141","Itens iniciais"],["core","158–159","Traje da corte"]]},
  {name:"Palavras Afiadas",why:"Resolver ameaças sem violência letal.",use:"Diplomacia contra Vontade de criatura inteligente; dano psíquico não letal, metade na falha. O dano cresce no 6º e 10º nível.",ref:[["core","80","Palavras Afiadas"]]}
 ]
};

/* expansion.js */
/* Expansão multiverso — somente regras oficiais com reflavor.
   Esta camada acrescenta personagens sem alterar as cinco fichas originais. */
(()=>{
const data=window.T20_DATA, guides=window.T20_GUIDE;
if(!data||!guides) return;
const art={
 yoru:"https://statico.soapcentral.com/editor/2025/08/82cc1-17555889435280-1920.jpg",
 diego:"https://renote.net/files/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeUhkWWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ%3D%3D--30051562fdccb2811baa77c80dfcc1b79eb84587/%E3%83%87%E3%82%A3%E3%82%A8%E3%82%B4.png",
 diegoAlt:"https://img3.wikia.nocookie.net/__cb20140718123302/jjba/images/f/f0/Diego%27s-World.png",
 ado:"https://static.zerochan.net/Ado.%28Nico.Nico.Singer%29.1024.4360839.webp",
 cyrene:"https://static.zerochan.net/Cyrene.%28Honkai.Star.Rail%29.full.4623397.jpg",
 marin:"https://bisquedoll-anime.com/assets/img/char_img_01.png",
 makima:"https://images8.alphacoders.com/128/thumb-1920-1284789.jpg",
 optimus:"https://vignette.wikia.nocookie.net/transformers-prime/images/a/a1/Optimus_prime_prime_beast_hunters_promo_by_barricade24-dau08wv.png/revision/latest?cb=20180308090000&path-prefix=pl"
};
const order=["CON","CAR","SAB","INT","FOR","DEX"];
const label={CON:"Constituição",CAR:"Carisma",SAB:"Sabedoria",INT:"Inteligência",FOR:"Força",DEX:"Destreza"};
const skillAttr={
 "Luta":"FOR","Pontaria":"DEX","Fortitude":"CON","Reflexos":"DEX","Vontade":"SAB",
 "Iniciativa":"DEX","Cavalgar":"DEX","Furtividade":"DEX","Acrobacia":"DEX",
 "Atletismo":"FOR","Percepção":"SAB","Intuição":"SAB","Sobrevivência":"SAB",
 "Adestramento":"CAR","Atuação":"CAR","Diplomacia":"CAR","Enganação":"CAR",
 "Intimidação":"CAR","Misticismo":"INT","Investigação":"INT","Conhecimento":"INT",
 "Nobreza":"INT","Ladinagem":"DEX","Ofício (armeiro)":"INT","Ofício (engenhoqueiro)":"INT",
 "Ofício (alquimista)":"INT","Ofício (costureira)":"INT","Ofício (maquiagem)":"INT",
 "Ofício (artesão)":"INT","Cura":"SAB","Guerra":"INT","Pilotagem":"DEX"
};
const doc={
 core:"https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf",
 heroes:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/",
 threats:"https://jamboeditora.com.br/produto/ameacas-de-arton/"
};
const make=(x)=>{
 const attrs=order.map(k=>({key:k,buy:x.buy[k]||0,race:x.raceBonus[k]||0,value:(x.buy[k]||0)+(x.raceBonus[k]||0),why:x.whys[k]||"Atributo secundário."}));
 const values=Object.fromEntries(attrs.map(a=>[a.key,a.value]));
 const skills=x.skills.map(s=>{let name=Array.isArray(s)?s[0]:s;const desc=Array.isArray(s)?s[1]:"Perícia treinada";const attr=skillAttr[name]||"INT";return [name,(values[attr]+2>=0?"+":"")+(values[attr]+2),desc]});
 return {
  id:x.id,number:x.number,name:x.name,universe:x.universe,catalogCategory:x.catalogCategory,label:x.label,symbol:x.symbol,theme:x.theme,
  portrait:{url:x.image,credit:x.credit,page:x.source},
  excerpt:x.excerpt,info:{race:x.race,className:x.className,origin:x.origin,devotion:x.devotion,role:x.role,partner:x.partner||"Nenhum parceiro automático"},
  stats:x.stats,attrs,summary:x.summary,history:x.history,skills,initial:x.initial,
  gear:x.gear.map(g=>({name:g[0],rule:g[1],detail:g[2],qty:g[3]||"1",image:g[4],source:g[5],credit:g[6]})),
  attacks:x.attacks.map(a=>({name:a[0],test:a[1],damage:a[2],cost:a[3],detail:a[4]})),
  progression:x.progression.map((p,i)=>[String(i+1),p[0],p[1]]),
  techniques:x.techniques.map(t=>({level:t[0],name:t[1],mechanic:t[2],cost:t[3],effect:t[4],flavor:t[5]})),
  notes:{overview:x.notes[0],attributes:x.notes[1],equipment:x.notes[2],abilities:x.notes[3],progression:x.notes[4],techniques:x.notes[5]},
  media:[{name:x.name+" — arte",image:x.image,source:x.source,credit:x.credit},...(x.media||[])],
  sources:x.sources.map(k=>({name:k[0],url:k[1]})),
  _config:{classPage:x.page,levelHow:x.levelHow||[],extraRefs:x.extraRefs||{},basicHow:x.basicHow||[]}
 };
};
const profiles=[
{
 id:"yoru",number:"06",name:"Yoru",universe:"Chainsaw Man",label:"WAR DEVIL // ARSENAL",symbol:"⚔",theme:"yoru",image:art.yoru,
 credit:"Painel de Chainsaw Man, reproduzido em SoapCentral",source:"https://chainsaw-man.fandom.com/wiki/Yoru",
 race:"Humana (corpo compartilhado com Asa)",className:"Inventora",origin:"Artesã",devotion:"Sem devoção",role:"Armas fabricadas, combate e preparação",
 buy:{CON:1,CAR:0,SAB:1,INT:3,FOR:2,DEX:2},raceBonus:{INT:1,FOR:1,DEX:1},
 whys:{CON:"Resistir aos confrontos.",CAR:"Personalidade intimidadora, não diplomática.",SAB:"Instinto predatório.",INT:"Criar e explorar armas.",FOR:"Empunhar armas perigosas.",DEX:"Atacar antes do alvo."},
 stats:{pv:13,pm:4,defense:15,speed:"9 m",hpGain:4,pmGain:4},page:"68–71",
 excerpt:"Toda arma é uma escolha. A culpa é parte da história; o dano segue as regras.",
 summary:"Inventora humana com Ofício (armeiro) e Engenhosidade. Protótipo e fabricação oficial são a aproximação para as armas geradas pela Demônio da Guerra, sem transformar pessoas ou objetos instantaneamente.",
 history:["Yoru é o Demônio da Guerra, que divide o corpo de Asa Mitaka. Sua habilidade na obra transforma objetos que considera seus em armas, cuja potência se relaciona com culpa e propriedade.","Em Arton, isso vira fabricação, protótipos, melhorias e engenhocas. Transformar seres humanos em armas, gerar arsenal do nada ou usar contratos demoníacos não é gratuito nem uma função oficial do Inventor."],
 skills:[["Ofício (armeiro)","Criar armamentos"],["Ofício (engenhoqueiro)","Preparar dispositivos"],["Luta","Espadas e armas de contato"],["Pontaria","Armas à distância"],["Misticismo","Estudar efeitos"],["Guerra","Táticas bélicas"],["Iniciativa","Agir antes do alvo"],["Fortitude","Suportar ferimentos"],["Vontade","Manter a consciência na guerra"]],
 initial:["Engenhosidade — gastar PM para melhorar perícias", "Protótipo — item superior dentro das regras do Inventor","Ofício (armeiro) treinado; humano concede treino/poder geral", "Origem Artesã: Vontade treinada + Frutos do Trabalho; Humano (Versátil): Fortitude treinada + Sortudo"],
 gear:[
 ["Espada da guerra","Espada longa oficial","O visual sugere uma espada criada a partir de algo possuído, mas usa uma espada existente ou fabricada.", "1"],
 ["Protótipo bélico","Protótipo de Inventor","Escolha um item superior permitido pela classe; melhorias têm custo, limite e fabricação reais.","1"],
 ["Ferramentas de armeira","Instrumentos de Ofício","Exigidos para o tempo de fabricação; nenhuma arma nasce por comando verbal.","1"],
 ["Jaqueta escolar","Traje de viajante","Uniforme de Asa e Yoru, sem bônus sobrenatural.","1"],
 ["Arsenal futuro","Armas superiores / engenhocas","Armas adicionais e dispositivos são obtidos com recursos oficiais, não com vítimas transformadas.","Progressão"]
 ],
 attacks:[["Golpe da Guerra","+5","1d8+3","0 PM","Espada longa, atributo FOR +3, Luta treinada +2; arma deve estar disponível."],["Engenhosidade","Teste de perícia","Bônus conforme PM","Variável","Foco em Ofício e tática; não aumenta dano de espada por si só."]],
 progression:[
 ["Engenhosidade · Protótipo","Arsenal básico"],
 ["Armeiro","Usar INT em armas fabricadas"],
 ["Maestria em Perícia","Reduzir falhas na fabricação"],
 ["Balística","Trabalhar com armas de alcance"],
 ["Engenhoqueiro","Primeiros dispositivos da guerra"],
 ["Manutenção Eficiente","Manter engenhocas e equipamentos"],
 ["Encontrar Fraqueza (automático) · Saque Rápido","Identificar vulnerabilidades"],
 ["Aumento de Atributo (INT)","Criar armas melhores"],
 ["Fabricar Item Mágico Menor (automático) · Aumento de Atributo (DEX)","Equipamentos extraordinários"],
 ["Autômato","Aliado mecânico obtido legalmente"],
 ["Aumento de Atributo (FOR)","Impulso físico"],
 ["Aumento de Atributo (CON)","Aguentar a própria guerra"]
 ],
 techniques:[
 [1,"Espada do Remorso","Espada longa","0 PM","Ataque com arma real usando FOR. O vínculo emocional é narrativa.","Transformar arrependimento em lâmina."],
 [1,"Arsenal da Guerra","Protótipo","Item da classe","Possui um item superior permitido; sua obtenção segue o Inventor.","O primeiro instrumento de Yoru."],
 [2,"Arma Reivindicada","Armeiro","Passivo","Usa INT para atacar e causar dano com arma fabricada por ela, conforme requisitos do poder.","A técnica supera a força bruta."],
 [5,"Transmutação Industrial","Engenhoqueiro","Conforme engenhoca","Simula efeito de magia apenas por uma engenhoca fabricada e ativada.","A arma parece mudar de forma."],
 [7,"Ponto Fraco","Encontrar Fraqueza","Conforme classe","Identifica fraqueza de inimigo nos limites da habilidade.","Nenhuma defesa é perfeita."]
 ],
 notes:[
 "O corpo compartilhado de Asa é interpretação narrativa de uma humana; não concede dupla consciência com ações extras.",
 "Compra de 10 pontos. Humano: +1 INT, FOR e DEX. Atributos elevados representam fabricar e manejar armas.",
 "Toda arma criada deve obedecer a preço, tempo de trabalho, materiais, propriedades e limites de equipamentos de Tormenta20.",
 "Armeiro e Engenhoqueiro não permitem fabricar armas instantaneamente no combate. Uma arma fabricada de pessoa não é regra oficial.",
 "Inventor recebe poderes desde o nível 2 e várias melhorias de fabricação automáticas. Revisar custos e os pré-requisitos do poder ao subir.",
 "O peso emocional das armas é narrativa; não altera dano, crítico ou bônus de ataque."
 ],
 sources:[["Yoru — Chainsaw Man Wiki","https://chainsaw-man.fandom.com/wiki/Yoru"],["Tormenta20 — Inventor",doc.core]],
 levelHow:[
 "Escolha a arma/protótipo dentro do limite permitido; Engenhosidade melhora Ofício, não transforma gente.",
 "Armeiro permite usar INT em armas que a própria personagem fabricou, respeitando sua proficiência.",
 "Maestria em Perícia favorece Ofício e evita falhas desastrosas na produção.",
 "Balística reforça ataques com armas à distância; apenas armas elegíveis usam o benefício.",
 "Construa uma engenhoca de efeito legal, registre o custo, espaço e a magia simulada.",
 "Mantenha o estoque de engenhocas e pague manutenção e ativação conforme o poder.",
 "Encontrar Fraqueza é automático. Saque Rápido melhora trocas de armamento sem ignorar ações de ataque.",
 "INT aumenta a capacidade de criação e perícias técnicas; revise a distribuição, custos e patamares.",
 "Fabricar Item Mágico Menor é automático e necessita dos recursos e regras de fabricação do nível.",
 "O Autômato exige materiais, fabricação e segue regras de parceiro, nunca ganha ações de jogador.",
 "Aumente FOR para representar armamento pesado, dentro das restrições de aumento de atributo.",
 "Aumente CON para sobreviver às consequências da guerra. Confirme limitações de patamar."
 ]
},
{
 id:"diego",number:"07",name:"Diego Brando",universe:"JoJo — Steel Ball Run",label:"SCARY MONSTERS // JÓQUEI",symbol:"🦖",theme:"diego",image:art.diego,
 credit:"Arte de Diego Brando · RENOTE",source:"https://jojowiki.com/Dio_Brando_(Steel_Ball_Run)",
 race:"Humano",className:"Druida",origin:"Amigo dos Animais",devotion:"Megalokk",role:"Metamorfose, perseguição e animais",partner:"Silver Bullet; raptor como parceiro quando liberado",
 buy:{CON:1,CAR:1,SAB:2,INT:0,FOR:2,DEX:3},raceBonus:{CON:1,SAB:1,DEX:1},
 whys:{CON:"Resistir aos golpes.",CAR:"Presença arrogante.",SAB:"Instintos do dinossauro.",INT:"Improvisação predatória.",FOR:"Mordida e manobras.",DEX:"Velocidade de corredor."},
 stats:{pv:18,pm:7,defense:16,speed:"9 m",hpGain:6,pmGain:4},page:"61–63",
 excerpt:"Um campeão de corrida cujo verdadeiro instinto é sobreviver como predador.",
 summary:"Druida humano de Megalokk com Forma Selvagem a partir do nível 2. Scary Monsters é a estética de dinossauro; as formas usam os bônus oficiais de animal. Silver Bullet é um cavalo, não parceiro automático.",
 history:["Diego Brando participa da Steel Ball Run como um jóquei ambicioso e competitivo. A técnica Scary Monsters permite assumir características de dinossauro e dominar criaturas na história.","Esta é a versão original, diferente do Diego paralelo que possui THE WORLD. O botão Alternative abre um dossiê mecânico separado, sem mesclar as duas versões."],
 skills:[["Sobrevivência","Instintos de predador"],["Vontade","Determinação"],["Luta","Garras e mordida"],["Cavalgar","Silver Bullet"],["Adestramento","Aliados animais"],["Iniciativa","Caça veloz"],["Reflexos","Fuga e esquiva"],["Percepção","Detectar presas"]],
 initial:["Devoto fiel de Megalokk — cumprir obrigações da divindade","Empatia Selvagem e duas magias de 1º círculo","Presas Primordiais e Olhar Amedrontador (poderes concedidos, se escolhidos)","Origem Amigo dos Animais: Adestramento treinado + Amigo Especial (cavalo comum); Humano (Versátil): Reflexos treinado + Sortudo"],
 gear:[
 ["Silver Bullet","Cavalo comum","Montaria obtida conforme a origem; o benefício de parceiro exige uma fonte mecânica.","1",art.diego,"https://jojowiki.com/Silver_Bullet","REN OTE / JoJo Wiki"],
 ["Garras e presas","Armas naturais / poder concedido","No nível 1 a mordida de Presas Primordiais custa PM; Formas Selvagens têm ataques próprios.","Variável"],
 ["Traje de jóquei","Traje de viajante","Verde-água ou azul esverdeado, com desenho em losangos.","1"],
 ["Companheiro raptor","Companheiro Animal","Aliado que usa regras de parceiro, não ficha de monstro independente. Disponível mais tarde.","Nível 3"],
 ["Sela e arreios","Equipamento de montaria","Adquirir de acordo com preços e benefícios oficiais.","A adquirir"]
 ],
 attacks:[["Mordida inicial","+4","1d6+2","1 PM","Presas Primordiais, quando ativada, usa FOR no ataque e dano."],["Forma Selvagem","Conforme forma","Armas naturais","3 PM a partir do nível 2","Somente a forma escolhida concede seus bônus; não acumula todas simultaneamente."]],
 progression:[
 ["Devoto Fiel · Empatia Selvagem · Magias","Primeiras presas"],
 ["Forma Selvagem · Caminho dos Ermos (automático)","Scary Monsters desperta"],
 ["Companheiro Animal","Raptor subordinado"],
 ["Sentidos Aguçados","Caçador perceptivo"],
 ["Ginete","Dominar o combate montado"],
 ["Forma Selvagem Aprimorada · 2º círculo","Raptor maior e mais perigoso"],
 ["Presas Afiadas","Golpes naturais aprimorados"],
 ["Companheiro Animal Aprimorado","Raptor fortalecido"],
 ["Magia Natural","Conjurar na forma de dinossauro"],
 ["Aumento de Atributo (SAB) · 3º círculo","Instinto aprimorado"],
 ["Companheiro Animal","Segundo aliado, se limite permitir"],
 ["Forma Selvagem Superior","Metamorfose máxima"]
 ],
 techniques:[
 [1,"Primeira Mordida","Presas Primordiais","1 PM","Mordida natural conforme poder concedido.","O monstro aparece antes da transformação completa."],
 [2,"Scary Monsters","Forma Selvagem","3 PM","Assuma uma forma animal com aparência de dinossauro.","Garras, escamas e olhos de predador."],
 [3,"Dinosaur Pack","Companheiro Animal","Passivo após obtenção","Aliado mecânico conforme tipo escolhido; não converte inimigos.","Um caçador não está sozinho."],
 [6,"Apex Raptor","Forma Selvagem Aprimorada","6 PM totais","Transformação melhorada, observando tamanho e atributos oficiais.","A forma do predador se expande."],
 [12,"Primeval Monster","Forma Selvagem Superior","10 PM totais","Usa o grau superior da forma escolhida, sem novos poderes de infecção.","O topo da cadeia alimentar."]
 ],
 notes:[
 "Diego original possui Scary Monsters, não THE WORLD. Clique em Alternative para abrir a variante paralela.",
 "A distribuição utiliza 10 pontos de compra; bônus humanos em DES, CON e SAB.",
 "Silver Bullet entra como cavalo físico da origem. O parceiro precisa de poder ou concessão específica.",
 "A transformação de outras pessoas em dinossauros não é um efeito padrão de Forma Selvagem, Empatia Selvagem ou Companheiro Animal.",
 "Gastos de Forma Selvagem e acesso a círculos dependem das habilidades de Druida. Ao subir de nível revise o estágio exato.",
 "Formas não oferecem simultaneamente todos os bônus, e magias seguem as obrigações de Megalokk."
 ],
 sources:[["Scary Monsters — JoJo Wiki","https://jojowiki.com/Scary_Monsters"],["Diego Brando — JoJo Wiki","https://jojowiki.com/Dio_Brando_(Steel_Ball_Run)"]],
 levelHow:[
 "Use Presas Primordiais quando precisar morder e Olhar Amedrontador para intimidar nos limites das regras.",
 "Gaste ação completa e 3 PM para assumir uma forma. Seus bônus substituem os de outras formas e não criam um NPC extra.",
 "O parceiro raptor fornece bônus conforme o tipo de aliado. Ele não ataca com uma ficha própria por padrão.",
 "Sentidos Aguçados facilita rastrear e perceber o perigo; aplica seus testes de perícia normais.",
 "Ginete é o poder para atacar montado sem penalidade aplicável, mantendo as regras do cavalo.",
 "Forma Selvagem Aprimorada aumenta bônus e custo total; o 2º círculo de magias também é liberado.",
 "Presas Afiadas melhora armas naturais conforme seu pré-requisito e efeito.",
 "Aprimore seu companheiro sem extrapolar o limite de parceiros da campanha.",
 "Magia Natural permite conjurar na forma selvagem obedecendo execução, PM, resistências e escolas.",
 "SAB melhora magias, perícias e CDs. O 3º círculo surge no 10º de Druida.",
 "Segundo Companheiro Animal cria novo parceiro apenas se o poder puder ser escolhido de novo e couber no limite.",
 "Forma Selvagem Superior é o ápice de transformação pelas regras oficiais; não concede infecção."
 ]
},
{
 id:"ado",number:"08",name:"Ado",universe:"J-pop · Cantora japonesa",label:"BLUE ROSE // VOZ",symbol:"♫",theme:"ado",image:art.ado,
 credit:"Arte ilustrada de Ado · Kuda Aer, via Zerochan",source:"https://www.universal-music.co.jp/ado/",
 race:"Humana",className:"Barda",origin:"Artista",devotion:"Nenhuma obrigatória",role:"Suporte musical, debuffs e presença de palco",
 buy:{CON:1,CAR:3,SAB:2,INT:1,FOR:0,DEX:2},raceBonus:{CON:1,CAR:1,DEX:1},
 whys:{CON:"Fôlego de apresentações.",CAR:"Presença vocal marcante.",SAB:"Interpretação emocional.",INT:"Conhecimento musical.",FOR:"Não é uma combatente física.",DEX:"Movimento performático."},
 stats:{pv:14,pm:8,defense:15,speed:"9 m",hpGain:5,pmGain:4},page:"44–46",
 excerpt:"A voz atravessa o silêncio. A rosa azul floresce entre notas e sombras.",
 summary:"Barda humana de temática vocal azul-neon: Inspiração, Atuação e magias arcanas de Encantamento/Ilusão/Evocação representam a performance. Ado é uma cantora real; a arte é um avatar ilustrado, sem pressupor aparência pessoal.",
 history:["Ado é uma artista japonesa reconhecida por performances vocais intensas e pela identidade visual da rosa azul. Sua presença pública é representada principalmente por ilustrações e clipes, não por um retrato obrigatório.","No Tormenta20, Ado inspira aliados como Barda e aplica efeitos mágicos com interpretação vocal. O som não produz dano de área automaticamente; cada efeito requer uma magia ou poder definido no livro."],
 skills:[["Atuação","Voz e palco"],["Reflexos","Movimento"],["Diplomacia","Comunicar emoções"],["Iniciativa","Entrada no refrão"],["Intuição","Ler o público"],["Percepção","Escuta refinada"],["Misticismo","Afinidade musical"],["Vontade","Suportar pressão"],["Enganação","Expressar histórias"],["Cura","Ajudar colegas de apresentação"]],
 initial:["Inspiração +1 — ação padrão, 2 PM, ajuda aliados","Duas magias de 1º círculo: Adaga Mental e Criar Ilusão","Três escolas escolhidas: Encantamento, Ilusão e Evocação","Origem Artista: Enganação treinada + Dom Artístico; Humano (Versátil): Cura treinada + Sortudo"],
 gear:[
 ["Microfone azul","Instrumento musical (reflavor)","Foco cênico para Atuação, não amplificador de magia ou arma gratuita.","1",art.ado,"https://www.universal-music.co.jp/ado/","Ado / Universal"],
 ["Rosa azul","Adereço de cena","Marca de identidade visual, sem bônus mecânico.","1"],
 ["Capa escura de palco","Traje de artista","Representa a figura ilustrada; couro leve +2 Defesa sob o traje.","1"],
 ["Mochila de turnê","Kit de viagem","Itens usuais de personagem, sem equipamento mágico inicial.","1"]
 ],
 attacks:[["Adaga Mental","Vontade vs CD 14","2d6 psíquico","1 PM","Magia de 1º círculo; ação e resistência conforme texto oficial."],["Inspiração","Aliados próximos","+1 testes perícia","2 PM","Bônus de perícia até o fim da cena, não dano ou cura automática."]],
 progression:[
 ["Inspiração +1 · 1º círculo","Primeiro concerto"],
 ["Arte Mágica · Eclético (automático)","Presença sobrenatural"],
 ["Música: Balada Fascinante","Prender a atenção do alvo"],
 ["Aumentar Repertório","Vozes e efeitos novos"],
 ["Aumento de Atributo (CAR) · Inspiração +2","A voz cresce"],
 ["Melodia Curativa · 2º círculo","Refrão que reanima"],
 ["Aumentar Repertório","Repertório avançado"],
 ["Fascinar em Massa","Alcançar multidões"],
 ["Melodia Restauradora · Inspiração +3","Aliviar condições"],
 ["Aumento de Atributo (CON) · 3º círculo","Performance mais resistente"],
 ["Aumento de Atributo (CAR)","Presença extraordinária"],
 ["Aumentar Repertório","Concerto final"]
 ],
 techniques:[
 [1,"Blue Rose Overture","Inspiração","2 PM","Inspiração +1 em testes de perícia de aliados em alcance curto.","A primeira nota reúne o grupo."],
 [1,"Vocal Break","Adaga Mental","1 PM","Dano psíquico e condição nos limites da magia.","Um grito atravessa a defesa emocional."],
 [3,"Palco Hipnótico","Música: Balada Fascinante","Conforme poder","Usa Atuação e as limitações de Fascinar.","Silêncio absoluto da plateia."],
 [6,"Refrão Restaurador","Melodia Curativa","Conforme poder","Recuperação por habilidade oficial, com alvos, ação e PM definidos.","Uma nota levanta os aliados."],
 [8,"Encore","Fascinar em Massa","Conforme poder","Estende Fascinar a vários alvos, conforme pré-requisitos.","O concerto domina a cena."]
 ],
 notes:[
 "Ado é uma artista real; o dossiê usa persona ilustrada creditada, não atribui aparência física não divulgada.",
 "CAR é atributo-chave de Bardo. Cálculos incluem sua adição inicial à reserva de PM.",
 "O microfone é adereço, não item mágico nem arma com dano sônico gratuito.",
 "Atuação, Inspiração e magias são recursos distintos; não se pode substituir qualquer magia por canção sem custo.",
 "Bardo ganha 2º círculo no nível 6 e 3º no 10. Inspiração cresce nos níveis 5 e 9.",
 "Inspiração e magia consomem recursos; não transmitem música nem reproduzem canções existentes."
 ],
 sources:[["Ado — Universal Music Japan","https://www.universal-music.co.jp/ado/"],["Ado — site oficial","https://ado-official.com/"]],
 levelHow:[
 "Ative Inspiração por 2 PM antes de uma rodada difícil; lance Adaga Mental ou Criar Ilusão respeitando a escola.",
 "Arte Mágica aumenta CD enquanto Inspiração está ativa; Eclético é automático e amplia testes não treinados.",
 "Fascinar depende de Atuação e condições de alcance, atenção e duração do poder.",
 "Aumentar Repertório adiciona magias legais das escolas ou conforme a exceção oficial do poder.",
 "CAR sobe de +4 para +5, afeta CD/PM/Atuação; Inspiração +2 requer custo aprimorado.",
 "Melodia Curativa usa Inspiração como fundamento; 2º círculo permite magias novas, não de qualquer escola.",
 "Novas magias de suporte ou controle respeitam escolas de Bardo.",
 "Fascinar em Massa exige Música: Balada Fascinante e as condições do poder; não hipnotiza todos sem resistência.",
 "Melodia Restauradora requer Melodia Curativa; Inspiração +3 aumenta alcance tático de buffs.",
 "CON +1 reforça PV e Fortitude; o 3º círculo fica disponível para magia nova.",
 "CAR pode crescer mais uma vez em novo patamar, mantendo o cálculo de CD e PM.",
 "Selecione magias que realmente conheça e use seus custos; a performance visual não concede efeitos extras."
 ]
},
{
 id:"cyrene",number:"09",name:"Cyrene",universe:"Honkai: Star Rail · Amphoreus",catalogCategory:"chrysos",label:"REMEMBRANCE // GELO",symbol:"❋",theme:"cyrene",image:art.cyrene,
 credit:"Arte promocional da HoYoverse, reproduzida em Zerochan",source:"https://www.hoyoverse.com/en-us/news/160640",
 race:"Humana (visual de Amphoreus)",className:"Arcanista — Feiticeira Feérica",origin:"Herdeira (reflavor narrativo)",devotion:"Nenhuma obrigatória",role:"Magias de controle, gelo e suporte",
 buy:{CON:1,CAR:3,SAB:1,INT:2,FOR:0,DEX:2},raceBonus:{CON:1,CAR:1,DEX:1},
 whys:{CON:"Suportar pressões de Amphoreus.",CAR:"Ligação emocional e magia.",SAB:"Memórias e intuição.",INT:"Conhecimento de ciclos.",FOR:"Não depende de força física.",DEX:"Movimento etéreo."},
 stats:{pv:10,pm:10,defense:13,speed:"9 m",hpGain:5,pmGain:6},page:"37–39",
 excerpt:"Gelo, lembranças e vínculos que persistem mesmo quando o amanhã muda.",
 summary:"Feiticeira humana de Linhagem Feérica. Encantamento, Ilusão e efeitos de frio são apresentados como poderes de Reminiscência; Conjurar Monstro só vira memosprite ao obter a magia e continua usando suas estatísticas oficiais.",
 history:["Cyrene é uma personagem cinco estrelas de Gelo e do Caminho da Reminiscência em Honkai: Star Rail. Sua identidade se conecta ao encerramento da jornada de Amphoreus e a lembranças preservadas.","Esta build enfatiza apoio e controle do campo, com magia arcana de gelo e ilusão. Um memosprite não existe como entidade gratuita no nível 1: a representação precisa de um Familiar ou de uma magia que gere criatura nas regras."],
 skills:[["Misticismo","Efeitos arcanos"],["Vontade","Preservar lembranças"],["Intuição","Reconhecer emoções"],["Diplomacia","Laços do grupo"],["Percepção","Observar o tempo"],["Reflexos","Evitar perigos"],["Conhecimento","História e ciclos"],["Iniciativa","Ação coordenada"],["Nobreza","História de Amphoreus"]],
 initial:["Caminho Feiticeira com Linhagem Feérica básica","Enganação treinada e magia extra de Encantamento/Ilusão da linhagem","Magias iniciais como Sono e Área Escorregadia; escolha e disponibilidade conforme Feiticeiro","Origem Herdeira: Nobreza treinada + Herança, escolhendo item dentro do limite da origem; Humano (Versátil): Percepção treinada + Magia Ilimitada"],
 gear:[
 ["Cristal de memória","Adereço arcano","O foco não é exigido para Feiticeira. O objeto é símbolo de lembranças, não item mágico gratuito.","1",art.cyrene,"https://www.hoyoverse.com/en-us/news/160640","HoYoverse"],
 ["Laços de gelo","Traje de viajante","Vestido celestial; sem armadura no nível 1 para preservar conjuração.","1"],
 ["Memosprite","Familiar / Conjurar Monstro","Aparece apenas quando o poder ou magia correspondente é adquirido, com estatísticas oficiais.","Bloqueado no nível 1"],
 ["Diário de lembranças","Livro comum","Registrar histórias é função narrativa, não feitiço novo.","1"]
 ],
 attacks:[["Área Escorregadia","Reflexos CD 14","Controle de terreno","1 PM","Dificulta a movimentação na área conforme magia de 1º círculo."],["Sono","Vontade CD 14","Condição conforme magia","1 PM","Efeito de sono de 1º círculo, com imunidades e resistências normais."]],
 progression:[
 ["Linhagem Feérica · 1º círculo","Primeiras memórias"],
 ["Familiar","Memosprite simbólico"],
 ["Magia Pungente","Resistências mais difíceis"],
 ["Poder Mágico","Mais energia arcana"],
 ["Fortalecimento Arcano · 2º círculo","Magia e memórias mais fortes"],
 ["Herança Aprimorada","Memória feérica amadurece"],
 ["Fortalecimento Arcano","Magia mais efetiva"],
 ["Magia Acelerada","Reações velozes"],
 ["Raio Arcano · 3º círculo","Laços memoráveis"],
 ["Raio Elemental","Ataque de gelo e lentidão"],
 ["Conhecimento Mágico","Novos efeitos de gelo"],
 ["Aumento de Atributo (CAR)","Memória viva"]
 ],
 techniques:[
 [1,"Frostbound Memory","Área Escorregadia","1 PM","Controla o chão pelas regras de magia, sem congelar criaturas automaticamente.","Um campo de gelo florido aparece."],
 [1,"Sonhos do Passado","Sono","1 PM","Incapacita alvos apenas se cumpridas as condições de resistência.","Um sussurro atravessa a memória."],
 [2,"Memória Companheira","Familiar","Poder de classe","Familiar concede benefícios oficiais de parceiro especial, não turno completo.","Um ser recordado acompanha Cyrene."],
 [6,"Recordação Coletiva","Herança Aprimorada","Passivo","Magias de Encantamento e Ilusão melhoram a CD e podem custar menos PM.","O vínculo se intensifica."],
 [9,"Memosprite Evocado","Conjurar Monstro (se aprendido)","Custo da magia","O monstro usa regras da magia e não é o memosprite original literal.","Recordações tomam forma."]
 ],
 notes:[
 "Cyrene foi anunciada pela HoYoverse como personagem de Gelo, 5★ e Caminho da Reminiscência. A build não cria o sistema de Remembrance Path em T20.",
 "Humana com bônus em CON, CAR e DEX. Magias usam CAR, não dano físico.",
 "Traje e cristal não fornecem bônus; Familiar não é invocação livre.",
 "Linhagem Feérica concede treinamento em Enganação e uma magia extra; é distinta de poderes escolhidos em níveis posteriores.",
 "Arcanista alcança o 2º círculo no nível 5 e o 3º no 9. Feiticeiro aprende menos magias que Bruxo/Mago; confira cada escolha.",
 "Memosprite é nome narrativo para Familiar ou Conjurar Monstro. Não acumula ataques, ações ou dano de aliados como no HSR."
 ],
 sources:[["Cyrene — anúncio da HoYoverse","https://www.hoyoverse.com/en-us/news/160640"],["Cyrene — guia de habilidades (KeqingMains)","https://hsr.keqingmains.com/cyrene/"]],
 levelHow:[
 "Escolha as magias do Feiticeiro. A linhagem Feérica fornece Enganação e uma magia extra compatível.",
 "O Familiar concede bônus de espécie; descreva como memosprite sem criar ficha extra de combate.",
 "Magia Pungente custa PM adicional para elevar CD das magias que permitam resistência.",
 "Poder Mágico aumenta a reserva em função do nível; aplique retroativamente.",
 "Fortalecimento Arcano soma +1 à CD das magias. O 2º círculo permite aprender Conjurar Monstro para representar o memosprite.",
 "Herança Aprimorada só pode ser escolhida a partir do nível 6 e melhora Encantamento e Ilusão.",
 "Fortalecimento Arcano aumenta CD de magia de modo permanente.",
 "Magia Acelerada altera a execução de uma magia pagando os custos e limites oficiais.",
 "Raio Arcano permite dano de essência com resistência. O 3º círculo fica disponível para magias aprendidas.",
 "Raio Elemental exige Raio Arcano e permite causar frio e lentidão conforme o poder.",
 "Conhecimento Mágico permite selecionar novos efeitos de suporte e frio.",
 "CAR +1 aumenta CD, perícias sociais e PM total no novo patamar."
 ]
},
{
 id:"marin",number:"10",name:"Marin Kitagawa",universe:"My Dress-Up Darling",label:"COSPLAY // EXPRESSÃO",symbol:"✿",theme:"marin",image:art.marin,
 credit:"Retrato oficial de Marin · bisquedoll-anime.com",source:"https://bisquedoll-anime.com/",
 race:"Humana",className:"Barda",origin:"Artista",devotion:"Nenhuma obrigatória",role:"Ilusão, disfarce e apoio social",
 buy:{CON:1,CAR:3,SAB:1,INT:2,FOR:0,DEX:2},raceBonus:{CAR:1,INT:1,DEX:1},
 whys:{CON:"Fôlego para eventos.",CAR:"Expressividade e magnetismo.",SAB:"Atenção aos outros.",INT:"Conhecimento de personagens.",FOR:"Não é lutadora profissional.",DEX:"Poses e acrobacias."},
 stats:{pv:13,pm:8,defense:15,speed:"9 m",hpGain:4,pmGain:4},page:"44–46",
 excerpt:"Cada figurino conta uma história. Seu verdadeiro talento é dar vida a personagens.",
 summary:"Barda humana com atuação, Enganação, ilusão e repertório de personagens. Marin interpreta e veste cosplays, enquanto Wakana Gojo frequentemente confecciona as peças; a ficha não atribui a ela fabricação profissional de roupas.",
 history:["Marin Kitagawa é uma estudante expansiva e apaixonada por anime, jogos e cosplay. Seu vínculo com Wakana Gojo desenvolve-se por meio de figurinos, performances e confiança mútua.","Em Arton, sua arte inspira o grupo e suas magias de Ilusão são a maneira de representar maquiagem, figurino e dramatização extraordinários. Cosplay não muda atributos, raça ou classe de verdade."],
 skills:[["Atuação","Interpretar personagens"],["Reflexos","Movimentação"],["Enganação","Disfarces e imitação"],["Diplomacia","Fazer amizades"],["Acrobacia","Poses e movimentos"],["Intuição","Ler reações"],["Percepção","Notar detalhes de figurino"],["Conhecimento","Cultura pop e referências"],["Ofício (maquiagem)","Maquiagem e acabamento"]],
 initial:["Inspiração +1 via performance e encenação","Magias iniciais: Criar Ilusão e Enfeitiçar","Escolas: Ilusão, Encantamento e Transmutação","Origem Artista: Atraente + Dom Artístico; Humano (Versátil): Percepção treinada + Sortudo"],
 gear:[
 ["Uniforme de Marin","Traje de viajante","Visual escolar casual, sem ganho de Defesa por estilo.","1",art.marin,"https://bisquedoll-anime.com/","Site oficial"],
 ["Kit de maquiagem","Ferramentas de Ofício","Materiais usados com tempo e perícia, não magia gratuita.","1"],
 ["Cosplay de Shizuku-tan","Traje especial de aparência","Figurino criado com ajuda de Gojo. Não concede poderes da personagem retratada.","A adquirir"],
 ["Câmera e acessórios","Itens mundanos","Referências de poses, poses fotográficas e registro de figurinos.","A adquirir"],
 ["Armadura leve escondida","Armadura de couro","Defesa +2 sob o traje, se compatível com a cena e regras de armadura.","1"]
 ],
 attacks:[["Criar Ilusão","Vontade conforme magia","Ilusão visual","1 PM","Não cria objetos físicos permanentes nem muda atributos."],["Inspiração","Aliados em alcance curto","+1 em perícias","2 PM","Pode ser interpretada como performance de cosplay que motiva o grupo."]],
 progression:[
 ["Inspiração +1 · 1º círculo","Primeiro cosplay"],
 ["Música: Balada Fascinante · Eclético (automático)","Dominar a atenção"],
 ["Arte Mágica","Cenas mais convincentes"],
 ["Aumentar Repertório","Novos personagens"],
 ["Aumento de Atributo (CAR) · Inspiração +2","Palco maior"],
 ["Paródia · 2º círculo","Reproduzir efeitos de magia vista, conforme poder"],
 ["Aumentar Repertório","Novos disfarces"],
 ["Fascinar em Massa","Cosplay de multidão"],
 ["Aumento de Atributo (INT) · Inspiração +3","Mais referências"],
 ["Aumentar Repertório · 3º círculo","Figurino épico"],
 ["Aumento de Atributo (CAR)","Performance inesquecível"],
 ["Aumentar Repertório","Cosplay final"]
 ],
 techniques:[
 [1,"Shizuku-tan Cosplay","Criar Ilusão","1 PM","Efeito visual com limites de magia, não transformação real.","O figurino ganha magia."],
 [1,"Cosplay Motivation","Inspiração","2 PM","+1 aos testes de perícia dos aliados em alcance curto até o fim da cena.","Uma apresentação encoraja o grupo."],
 [2,"Perfect Pose","Música: Balada Fascinante","Conforme poder","Captura atenção dos alvos nas condições de Atuação.","O público prende a respiração."],
 [6,"Imitação de Cena","Paródia","Conforme poder","Pode copiar uma magia vista sob as condições de Paródia.","A personagem de ficção parece viva."],
 [8,"Convenção Completa","Fascinar em Massa","Conforme poder","Estende Fascinar aos alvos válidos.","Todo o salão assiste."]
 ],
 notes:[
 "Marin é estudante e cosplayer; as roupas profissionais são confeccionadas em colaboração com Gojo, sem bônus gratuitos de equipamento.",
 "CAR4 e INT3 são prioridades da performance e da pesquisa.",
 "Cosplay não concede as habilidades da personagem interpretada. Itens precisam ser adquiridos ou fabricados legalmente.",
 "Magias de ilusão e encenação têm duração, resistência e área; o visual não modifica as regras.",
 "Bardo aprende novos círculos nos níveis 6 e 10; Inspiração melhora nos níveis 5 e 9.",
 "Paródia tem condições de magia observada e custo; nenhum visual permite lançar feitiços de outro sistema indiscriminadamente."
 ],
 sources:[["My Dress-Up Darling — site oficial","https://bisquedoll-anime.com/"],["Marin Kitagawa — personagem","https://en.wikipedia.org/wiki/Marin_Kitagawa"]],
 levelHow:[
 "Comece apoiando com Inspiração e Criar Ilusão; maquiagem mundana depende de tempo e itens.",
 "Fascinar usa Atuação para desviar atenção, Eclético é automático e auxilia testes não treinados.",
 "Arte Mágica melhora a dificuldade das magias quando Inspiração está ativa.",
 "Aumentar Repertório aprende magias permitidas pelo poder e escolas, sem trocar a classe.",
 "CAR cresce e Inspiração +2 amplia o suporte quando investe o custo adicional.",
 "Paródia tem pré-requisitos e depende de uma magia vista. O 2º círculo amplia efeitos de ilusão.",
 "Aprenda novas magias para representar outros figurinos e cenas.",
 "Fascinar em Massa exige Música: Balada Fascinante; não afeta uma cidade automaticamente.",
 "INT melhora Conhecimento, Misticismo e Ofício; Inspiração +3 melhora a potência do suporte.",
 "O 3º círculo permite magias mais elaboradas, desde que conhecidas e das escolas apropriadas.",
 "CAR ganha outro +1 no novo patamar e amplia atuação social.",
 "Feche a progressão escolhendo mais magias e aperfeiçoando apresentações."
 ]
},
{
 id:"makima",number:"11",name:"Makima",universe:"Chainsaw Man",label:"CONTROL DEVIL // AUTORIDADE",symbol:"◎",theme:"makima",image:art.makima,
 credit:"Ilustração de Makima por eastman, via Wallpaper Abyss",source:"https://chainsaw-man.fandom.com/wiki/Makima",
 race:"Humana (aparência do demônio)",className:"Arcanista — Feiticeira Feérica",origin:"Membro de Guilda",devotion:"Sem devoção",role:"Controle mental, manipulação e pressão social",
 buy:{CON:1,CAR:3,SAB:2,INT:2,FOR:0,DEX:1},raceBonus:{CON:1,CAR:1,INT:1},
 whys:{CON:"Sobrevivência silenciosa.",CAR:"Autoridade esmagadora.",SAB:"Leitura estratégica.",INT:"Manipulação de planos.",FOR:"Não depende de força física.",DEX:"Movimentos contidos."},
 stats:{pv:10,pm:10,defense:11,speed:"9 m",hpGain:5,pmGain:6},page:"37–39",
 excerpt:"Uma ordem sussurrada pode ser mais perigosa que qualquer espada.",
 summary:"Feiticeira de Linhagem Feérica: magias de Encantamento e Ilusão representam influência e controle, sem dominação automática de qualquer criatura. A hierarquia da Segurança Pública é o reflavor da origem Membro de Guilda.",
 history:["Makima é uma figura da Segurança Pública em Chainsaw Man, cujas relações de poder e manipulação são parte central da narrativa. Sua identidade está ligada ao Demônio do Controle.","No Tormenta20, sua capacidade de impor vontades é representada por magias com CD, resistência e alcance. Contratos ilimitados, mortes substituídas e controle automático de adversários não surgem pela classe."],
 skills:[["Enganação","Controlar narrativas"],["Diplomacia","Influenciar terceiros"],["Intimidação","Ordens ameaçadoras"],["Vontade","Foco absoluto"],["Misticismo","Magias mentais"],["Intuição","Detectar hesitação"],["Percepção","Vigilância"],["Investigação","Planejamento"]],
 initial:["Feiticeira Feérica básica: treino Enganação e magia extra de Encantamento/Ilusão","Magias como Enfeitiçar e Sono, respeitando número de magias aprendidas","Origem Membro de Guilda: Diplomacia treinada + Rede de Contatos; Humano (Versátil): Intuição treinada + Foco em Perícia (Diplomacia)","Carisma +4 define CD e reserva inicial de PM"],
 gear:[
 ["Terno da Segurança Pública","Traje da corte / viajante","Visual formal de Makima. Não oferece bônus de controle de NPCs.","1",art.makima,"https://chainsaw-man.fandom.com/wiki/Makima","Chainsaw Man"],
 ["Documentos de autoridade","Insígnia narrativa","Identificação institucional, sem poderes de comando universais.","1"],
 ["Telefone e recados","Itens mundanos","Comunicação e coordenação, apenas onde a ambientação permitir.","1"],
 ["Laços de contrato","Magias de Encantamento","Não são contratos gratuitos: cada magia tem custo e resistência próprios.","Habilidades"]
 ],
 attacks:[["Enfeitiçar","Vontade CD 14","Condição social","1 PM","O alvo recebe a condição prevista na magia; não vira escravo permanente."],["Sono","Vontade CD 14","Controle limitado","1 PM","A criatura pode resistir; tem imunidades e limitações de círculo."]],
 progression:[
 ["Linhagem Feérica básica · 1º círculo","Primeira influência"],
 ["Conhecimento Mágico","Aprimorar repertório mental"],
 ["Magia Pungente","Elevar a dificuldade"],
 ["Poder Mágico","Reservas para contratos"],
 ["Fortalecimento Arcano · 2º círculo","Pressão mental avançada"],
 ["Herança Aprimorada","Controle feérico amadurecido"],
 ["Conhecimento Mágico (Dissipar Magia)","Preparar contramágica"],
 ["Aumento de Atributo (CAR)","Autoridade aumentada"],
 ["Magia Acelerada · 3º círculo","Ordens rápidas"],
 ["Contramágica Aprimorada","Silenciar ações mágicas"],
 ["Conhecimento Mágico","Novos efeitos de influência"],
 ["Magia Ilimitada","Domínio mais intenso"]
 ],
 techniques:[
 [1,"Silêncio Obediente","Enfeitiçar","1 PM","Condição prevista pela magia com resistência; não concede servo permanente.","Uma ordem basta para tentar conquistar confiança."],
 [1,"Autoridade Inquietante","Sono","1 PM","Efeito mágico de sono; certas criaturas são imunes.","A presença faz o adversário fraquejar."],
 [3,"Controle Amplificado","Magia Pungente","Custo +1 PM","Aumenta CD de magias elegíveis, respeitando seu limite de gasto.","Ninguém escapa facilmente do olhar."],
 [6,"Manipulação Refinada","Herança Aprimorada","Passivo","Melhora CD de Encantamento/Ilusão e reduz custo dessas escolas.","A ordem se torna mais difícil de resistir."],
 [10,"Calem-se","Contramágica Aprimorada","Conforme poder","Contramágica como reação, seguindo requisitos de Dissipar Magia.","Até a magia do inimigo para."]
 ],
 notes:[
 "Makima é o Demônio do Controle; a raça humana representa apenas a aparência. Isso não dá imunidades ou contratos de chefe.",
 "CAR4 aumenta a CD; depois cresce por Aumento de Atributo no nível 8.",
 "Terno, identificação e telefone não são itens mágicos. A posse de documentos não escraviza NPCs.",
 "Feiticeira Feérica ganha magia extra e Enganação. Controle mental sempre respeita testes de resistência.",
 "Círculos: 1º no nível 1, 2º no nível 5, 3º no nível 9. Feiticeiro aprende magias em ritmo próprio.",
 "Não existe controle ilimitado de criaturas inferiores com essa build; escolhas sociais e combates obedecem à mesa."
 ],
 sources:[["Makima — Chainsaw Man Wiki","https://chainsaw-man.fandom.com/wiki/Makima"],["Linhagem Feérica — Tormenta20",doc.core]],
 levelHow:[
 "Escolha magias iniciais de influência dentro do repertório do Feiticeiro e a magia extra da linhagem.",
 "Conhecimento Mágico adiciona duas magias conhecidas de círculos já disponíveis.",
 "Pague PM adicional por Magia Pungente ao lançar um controle decisivo.",
 "Poder Mágico aumenta PM totais retroativamente, sem criar uma bateria externa.",
 "Fortalecimento Arcano aumenta a CD em +1. O 2º círculo surge no 5º.",
 "Herança Aprimorada a partir do 6º reforça Encantamento/Ilusão da Feiticeira.",
 "Conhecimento Mágico permite aprender Dissipar Magia para cumprir o requisito de Contramágica Aprimorada.",
 "CAR sobe de +4 para +5; atualize CD e PM, sem controlar um NPC gratuitamente.",
 "Magia Acelerada permite acelerar a execução, com custos. O 3º círculo fica disponível.",
 "Contramágica Aprimorada exige Dissipar Magia conhecida e respeita suas reações.",
 "Novas magias podem ampliar controle, mas cada alvo continua tendo suas resistências.",
 "Magia Ilimitada aumenta limites de aprimoramento; cuidado com consumo de PM."
 ]
},
{
 id:"optimus",number:"12",name:"Optimus Prime",universe:"Transformers · Autobots",label:"AUTOBOT // COMANDANTE",symbol:"⬡",theme:"optimus",image:art.optimus,
 credit:"Optimus Prime Beast Hunters (arte promocional), via Transformers Wiki",source:"https://tfwiki.net/wiki/Optimus_Prime_(Prime)",
 race:"Golem de Ferro",className:"Paladino",origin:"Sem Origem (regra racial)",devotion:"Khalmyr / paladino do bem se permitido",role:"Tanque, proteção, apoio e dano sagrado",
 buy:{CON:2,CAR:3,SAB:1,INT:1,FOR:2,DEX:0},raceBonus:{CON:1,CAR:-1,FOR:2},
 whys:{CON:"Estrutura metálica resistente.",CAR:"Liderança e sacrifício.",SAB:"Juízo equilibrado.",INT:"Memória de séculos.",FOR:"Poder mecânico.",DEX:"Movimentos controlados."},
 stats:{pv:23,pm:5,defense:14,speed:"9 m",hpGain:8,pmGain:3},page:"82–84; raça p. 27",
 excerpt:"Liberdade é o direito de todos os seres sencientes. A esperança ainda se transforma.",
 summary:"Golem de Ferro Paladino: Chassi e sem origem representam corpo Autobot; Golpe Divino, Código do Herói, Aura Sagrada e Cura pelas Mãos representam a liderança e proteção de Optimus. Transformação em caminhão NÃO é habilidade racial ou de classe: apenas estética até o mestre permitir outro recurso oficial.",
 history:["Optimus Prime é um líder dos Autobots em Transformers, conhecido por seu senso de justiça, sacrifício e defesa da liberdade. O visual adotado nesta ficha é inspirado em Transformers Prime/Beast Hunters.","Como Golem Paladino, é um construto consciente equipado para defender aliados. A figura de caminhão, o blaster de íons e o tamanho colossal exigiriam outras regras, itens e autorização do mestre; não são vantagens iniciais."],
 skills:[["Luta","Lâmina energon"],["Vontade","Ideal de liberdade"],["Fortitude","Resistência do chassi"],["Diplomacia","Comando sábio"],["Guerra","Tática autobot"]],
 initial:["Golem de Ferro: FOR +2, CON +1, CAR −1; Chassi +2 Defesa e penalidade de armadura","Sem Origem: escolha um poder geral em vez dos benefícios de origem; sugestão Estilo de Duas Mãos","Paladino 1: Abençoado, Código do Herói e Golpe Divino","Devoção a Khalmyr: Coragem Total e Reparar Injustiça, observando Obrigações e Restrições; sem transformação ou laser grátis"],
 gear:[
 ["Lâmina energon","Montante (arma marcial de duas mãos)","Visual energético; sem dano elemental automático. Verifique aquisição legal da arma.","1",art.optimus,"https://tfwiki.net/wiki/Optimus_Prime_(Prime)","Transformers Wiki"],
 ["Chassi de Ferro","Racial Golem","A Defesa 14 usa 10 +2 do Chassi +2 de armadura leve. Consulte a penalidade de armadura −2 do Chassi.","1"],
 ["Armadura leve","Armadura de couro","Proteção conservadora sob o chassi; sem armadura pesada gratuita ou melhorias sobrenaturais.","1"],
 ["Blaster de íons","Arma de fogo futura","Somente após adquirir uma arma de fogo oficial e munição; o feixe energético é narrativa.","Não inicial"],
 ["Alt mode: caminhão","Representação narrativa","Não concede deslocamento maior, carga, voo ou transformação mecânica sem regra e autorização.","Não habilitado"]
 ],
 attacks:[["Lâmina energon","+6","2d6+4","0 PM","Montante com FOR +4, Luta treinada +2; dano físico normal."],["Golpe Divino","+6","2d6+4 + 1d8","2 PM conforme classe","Ataque de Paladino com efeito divino, respeitando custo e bônus do poder."]],
 progression:[
 ["Abençoado · Código do Herói · Golpe Divino","Autobot inicial"],
 ["Cura pelas Mãos · Virtude: Compaixão","Reparar aliados"],
 ["Aura Sagrada · Ataque Poderoso","Proteger o esquadrão"],
 ["Julgamento Divino: Iluminação","Inspirar a resistência"],
 ["Bênção da Justiça · Golpe Divino +2d8 · Aumento de Atributo (FOR)","Poder do Prime"],
 ["Cura pelas Mãos 2d8+2 · Combate Defensivo","Proteção em combate"],
 ["Aura de Cura","Força da liderança"],
 ["Virtude Paladinesca: Humildade","Fortalecer a coragem"],
 ["Golpe Divino +3d8 · Foco em Arma","Energon concentrado"],
 ["Cura pelas Mãos 3d8+3 · Aumento de Atributo (CON)","Resistência de aço"],
 ["Orar (Benção)","Dever e oração"],
 ["Virtude Paladinesca: Caridade","O último Autobot resiste"]
 ],
 techniques:[
 [1,"Energon Blade","Montante","0 PM","Golpe físico normal com arma marcial de duas mãos; não causa energia gratuita.","Uma lâmina ilumina a batalha."],
 [1,"Autobot Valor","Golpe Divino","Conforme classe","Ataque com bônus/dano de Golpe Divino e gasto de PM.","Poder para defender, nunca dominar."],
 [2,"Repair Protocol","Cura pelas Mãos","Conforme classe","Cura oficial a toque; os alvos devem ser elegíveis e a ação consumida.","Mecânica e esperança."],
 [3,"Autobot Formation","Aura Sagrada","1 PM se exigido","Aura de Paladino melhora testes de resistência de aliados na área.","Nenhum Autobot fica para trás."],
 [9,"Matrix of Leadership","Golpe Divino +3d8","Conforme classe","Dano divino oficial; a Matriz é somente simbologia.","A liderança ilumina o golpe."],
 [12,"Till All Are One","Virtudes / Aura","Conforme habilidades","Defesa, cura e coordenação do grupo sem transformação em veículo gratuita.","Até que todos sejam um."]
 ],
 notes:[
 "Optimus é um Golem de Ferro de tamanho Médio nas regras, mesmo que seja um robô gigante na obra. Alt-mode e blaster exigem novas aquisições/regras oficiais disponíveis.",
 "Golem ganha FOR +2, CON +1, CAR −1. A soma da compra utiliza 10 pontos e não recebe bônus humano.",
 "Sem Origem é obrigatório para Golem; em troca recebe um poder geral. Escudo ou arma energética precisam ser obtidos nas regras, nada grátis.",
 "Golpe Divino, auras e cura usam PM. Não incluem poder de invocar Autobots como NPCs.",
 "Paladino ganha Cura pelas Mãos no nível 2, Aura Sagrada no 3 e Golpe Divino mais forte em níveis altos. Use custos oficiais.",
 "Não há transformação livre em caminhão ou combinação de veículos; o visual é interpretação sem alteração de deslocamento ou ações."
 ],
 sources:[["Optimus Prime — Transformers Wiki","https://tfwiki.net/wiki/Optimus_Prime_(Prime)"],["Golem e Paladino — Tormenta20",doc.core]],
 levelHow:[
 "Use Golpe Divino dentro dos custos e cumpra o Código do Herói. O golem não escolhe origem.",
 "Cura pelas Mãos remove ferimentos dentro das regras. Compaixão é poder paladinesco sugerido.",
 "Aura Sagrada protege companheiros próximos. Encouraçado só funciona com a armadura indicada no poder.",
 "Julgamento Divino se usa apenas nas condições e alvos do julgamento escolhido.",
 "FOR aumenta para +5; Bênção da Justiça e Golpe Divino +2d8 são automáticos no 5º.",
 "A cura cresce para 2d8+2. Combate Defensivo troca acerto por proteção.",
 "Aura de Cura usa Aura Sagrada para recuperar PV de aliados no alcance.",
 "Humildade é uma virtude: permite obter PM temporários mediante oração e conduta.",
 "Golpe Divino +3d8 é automático; Foco em Arma exige escolha exata da arma.",
 "Cura pelas Mãos cresce para 3d8+3; CON +1 melhora PV e Fortitude.",
 "Orar ensina magia divina de 1º círculo; Benção usa SAB como atributo-chave.",
 "Caridade reduz custos de habilidades que têm aliados como alvo; é a terceira virtude escolhida."
 ]
}
];
const normal=profiles.map(make);
data.characters.push(...normal);
const diegoBase=normal.find(x=>x.id==="diego");
const diegoAlt=make({
 id:"diego",number:"07/ALT",name:"Diego Brando — Alternative",universe:"JoJo — Steel Ball Run",label:"THE WORLD // TEMPO PARADO",symbol:"◷",theme:"diego-alt",
 image:art.diegoAlt,credit:"Diego paralelo e THE WORLD · JoJo Wikia",source:"https://jojowiki.com/Parallel_World_Diego",
 race:"Humano",className:"Guerreiro",origin:"Herói Camponês",devotion:"Livre",role:"Ataques precisos, ações extras e combate montado",partner:"Silver Bullet (cavalo a adquirir/autorização)",
 buy:{CON:1,CAR:1,SAB:1,INT:1,FOR:2,DEX:3},raceBonus:{CON:1,FOR:1,DEX:1},
 whys:{CON:"Resistência contra o destino.",CAR:"Presença calculista.",SAB:"Percepção do tempo.",INT:"Planejamento de emboscadas.",FOR:"Lançamento e golpes.",DEX:"Movimentos inacreditavelmente rápidos."},
 stats:{pv:22,pm:6,defense:16,speed:"9 m",hpGain:7,pmGain:3},page:"64–66; origem p. 91–92",
 excerpt:"O segundo Diego não precisa de dinossauros. Ele controla instantes de batalha.",
 summary:"Guerreiro humano de Heroi Camponês com Surto Heroico e Coração Heroico. THE WORLD é representado por uma ação adicional uma vez por rodada, Golpe Pessoal e Ataque Extra; NÃO congela literalmente o tempo.",
 history:["Esta é a contraparte de Diego Brando trazida de outro universo no arco final de Steel Ball Run. Diferentemente do original, ele possui THE WORLD, um Stand capaz de parar o tempo por um intervalo.","A ficha usa Guerreiro e efeitos de economia de ações de Tormenta20 para simular essa vantagem. Parar o Tempo é uma magia arcana avançada, não liberada por Guerreiro de nível 12."],
 skills:[["Luta","Ataques de THE WORLD"],["Pontaria","Facas e arremessos"],["Cavalgar","Jóquei extraordinário"],["Iniciativa","Ataque antes do alvo"],["Percepção","Antecipar o inimigo"],["Fortitude","Sobreviver"]],
 initial:["Ataque Especial +4 (Guerreiro 1)","Coração Heroico +3 PM e Surto Heroico (origem)","Humano (Versátil): Percepção treinada + Sortudo","THE WORLD é o nome dos efeitos; Stand não tem turno independente"],
 gear:[
 ["Facas arremessáveis","Adagas oficiais","Lançamentos repetidos durante o 'tempo parado', sem multiplicar ações indevidamente.","4",art.diegoAlt,"https://jojowiki.com/Parallel_World_Diego","JoJo"],
 ["THE WORLD","Reflavor de poderes","Stand humanoide dourado. Não tem PV, Defesa nem iniciativa próprios.","Efeito"],
 ["Silver Bullet","Cavalo comum","Adquirir ou ter autorização do mestre, pois Herói Camponês não concede cavalo.","A adquirir"],
 ["Roupa do jóquei","Traje de viajante","Azul e dourado com losangos; sem bônus de defesa mágica.","1"],
 ["Armadura de couro","Armadura leve","Defesa +2 na ficha.","1"]
 ],
 attacks:[["Dagas lançadas","+6","1d4+3","0 PM","Facas usam FOR no dano; DES no ataque se a arma for de arremesso leve conforme regra."],["THE WORLD: Tempo Parado","Ação adicional","Conforme ataque","5 PM","Surto Heroico concede uma ação padrão ou de movimento, uma vez por rodada."]],
 progression:[
 ["Ataque Especial +4 · Surto Heroico · Coração Heroico","THE WORLD básico"],
 ["Estilo de Arremesso","Facas em sequência"],
 ["Ginete · Durão (automático)","Tempo montado"],
 ["Arremesso Múltiplo","Chuva de facas"],
 ["Golpe Pessoal · Ataque Especial +8","Lâmina certeira"],
 ["Arqueiro · Ataque Extra (automático)","Mais ações, ainda limitadas"],
 ["Foco em Arma (adaga)","Dagas precisas"],
 ["Disparo Preciso","Alvo em combate próximo"],
 ["Na Mosca · Ataque Especial +12","Facada inevitável"],
 ["Golpe Pessoal II","THE WORLD refinado"],
 ["Especialização em Arma (adaga)","Acerto letal"],
 ["Mestre em Arma (adaga)","Poder máximo marcial"]
 ],
 techniques:[
 [1,"THE WORLD","Surto Heroico","5 PM","Ação padrão ou de movimento extra no turno, só uma vez por rodada.","O mundo parece imóvel."],
 [2,"Knife Rain","Estilo de Arremesso","Passivo","Saque e dano seguem o poder escolhido; não cria facas extras.","Lâminas pairam na cena."],
 [5,"Time-Stop Strike","Golpe Pessoal","PM conforme efeitos","Ataque especial com propriedades selecionadas e teto de PM por golpe.","Um golpe no intervalo entre segundos."],
 [6,"Temporal Barrage","Ataque Extra","2 PM","Outro ataque na ação agredir uma vez por rodada.","Os golpes se acumulam."],
 [10,"Five Seconds","Golpe Pessoal II + Surto Heroico","Custos somados","Combina técnicas se houver ações e PM suficientes; não suspende as ações dos inimigos.","O Stand domina a cena."]
 ],
 notes:[
 "A forma Alternative é outro Diego, não evolução de Scary Monsters. Não pode usar Forma Selvagem junto com THE WORLD pela troca visual.",
 "Compra 10 pontos; humano +1 em FOR, CON e DEX. Destina-se a Guerreiro, não Druida.",
 "Silver Bullet não é gratuito na origem Herói Camponês. THE WORLD não é um aliado NPC.",
 "Surto Heroico fornece somente uma ação adicional, e não paralisa criaturas. Golpe Pessoal não congela tempo.",
 "A evolução segue Guerreiro e recursos de Coração Heroico, inclusive +3 PM nos níveis 5 e 11.",
 "O poder literal de parar o tempo exige recursos de nível superior não presentes nesta versão."
 ],
 sources:[["Parallel World Diego — JoJo Wiki","https://jojowiki.com/Parallel_World_Diego"],["THE WORLD — JoJo Wiki","https://jojowiki.com/The_World_(Steel_Ball_Run)"]],
 levelHow:[
 "Surto Heroico: 5 PM, uma ação adicional uma vez por rodada. Ataque Especial dá +4 em acerto/dano por 1 PM.",
 "Estilo de Arremesso melhora uso de facas em ataques à distância e saque conforme o poder.",
 "Ginete remove a penalidade de ataque montado. Durão reduz dano gastando PM (habilidade automática).",
 "Arremesso Múltiplo permite um arremesso adicional sob suas condições e custo; exige arma reserva.",
 "Escolha propriedades de Golpe Pessoal permitidas para adaga, respeitando custo máximo por golpe.",
 "Arqueiro melhora dano à distância; Ataque Extra é automático e custa 2 PM por mais um ataque.",
 "Foco em Arma aumenta ataque com adagas sem alterar o tempo.",
 "Disparo Preciso reduz a penalidade de atacar alvo envolvido em combate.",
 "Na Mosca dá dado adicional com gasto, se o ataque acertar. Ataque Especial sobe para +12.",
 "Escolha um segundo Golpe Pessoal; ele não substitui o primeiro automaticamente.",
 "Especialização em Arma soma +2 dano em adagas.",
 "Mestre em Arma aumenta dado e permite repetir ataque pagando PM. Ainda não é Parar o Tempo literal."
 ]
});
window.T20_ALTERNATES={diego:{normal:diegoBase,alternative:diegoAlt}};
const indexText=(p,i)=>({
 why:p[2],
 use:(p._config?.levelHow||[])[i]||"Use os efeitos legais do poder, seguindo custos e pré-requisitos.",
 ref:[["core",p._config?.classPage||"cap. 1","Classe, habilidade e progressão"]]
});
for(const c of [...normal,diegoAlt]){
 const cfg=c._config;
 c.skillReference=cfg.classPage;
 const basic=[
  {name:c.initial[0],why:c.summary,use:c.notes.abilities,ref:[["core",cfg.classPage,"Classe, habilidades e nível 1"]]},
  {name:c.gear[0].name,why:c.gear[0].detail,use:c.notes.equipment,ref:[["core","cap. 3, Equipamentos","Armas, armaduras e itens"]]},
  {name:"Limites da adaptação",why:c.notes.overview,use:c.notes.techniques,ref:[["core","cap. 5, Regras do Jogo","Ações, testes, duração e PM"]]}
 ];
 const g={levels:c.progression.map((p,i)=>indexText({...p,2:p[2],_config:cfg},i)),basics:basic};
 // Para notas por nível, o significado vem do texto dos guias de uso; páginas são as do livro.
 g.levels=c.progression.map(([n,power,why],i)=>({
  why, use:cfg.levelHow[i]||"Leia a habilidade e aplique seus custos oficiais.",
  ref:[["core",cfg.classPage,"Nível "+n+" — "+power]]
 }));
 if(c.id==="diego"&&c.theme==="diego")g.levels[1].ref.push(["core","61–63","Forma Selvagem"]);
 if(c.id==="optimus")g.levels[0].ref.push(["core","27","Golem: Sem Origem, Chassi"]);
 if(c.id==="yoru")g.levels[0].ref.push(["core","68–71","Inventor e Protótipo"]);
 if(c.id==="ado"||c.id==="marin")g.levels[0].ref.push(["core","44–46","Bardo e Inspiração"]);
 if(c.theme==="diego-alt")window.T20_ALTERNATE_GUIDES={diego:g};
 else guides.people[c.id]=g;
 delete c._config;
}
})();


/* expansion-runtime.js */
/* Cálculos de níveis para os novos dossiês — sem alterar os cinco originais. */
(()=>{
const expanded=new Set(["yoru","diego","ado","cyrene","marin","makima","optimus"]);
const val=(c,k)=>c.attrs.find(x=>x.key===k)?.value||0;
const delta=(c,n,k)=>{
 if(c.id==="d"&&k==="INT"&&n>=12)return 1;
 if(c.id==="david"&&k==="FOR"&&n>=7)return 1;
 if(c.id==="rentarou"&&k==="CAR")return (n>=5?1:0)+(n>=11?1:0);
 if(c.id==="yoru")return (k==="INT"&&n>=8)||(k==="DEX"&&n>=9)||(k==="FOR"&&n>=11)||(k==="CON"&&n>=12)?1:0;
 if(c.id==="diego"&&c.theme==="diego"&&k==="SAB"&&n>=10)return 1;
 if(c.id==="ado"&&k==="CAR")return(n>=5?1:0)+(n>=11?1:0);
 if(c.id==="cyrene"&&k==="CAR"&&n>=12)return 1;
 if(c.id==="marin"&&k==="CAR")return(n>=5?1:0)+(n>=11?1:0);
 if(c.id==="marin"&&k==="INT"&&n>=9)return 1;
 if(c.id==="makima"&&k==="CAR"&&n>=8)return 1;
 if(c.id==="optimus"&&k==="FOR"&&n>=5)return 1;
 if(c.id==="optimus"&&k==="CON"&&n>=10)return 1;
 return 0;
};
const trained=(n)=>n>=7?4:2;
const signed=(n)=>(n>=0?"+":"")+n;
const attrBySkill={
 "Luta":"FOR","Pontaria":"DEX","Fortitude":"CON","Reflexos":"DEX","Vontade":"SAB","Iniciativa":"DEX","Cavalgar":"DEX","Furtividade":"DEX","Acrobacia":"DEX","Atletismo":"FOR","Percepção":"SAB","Intuição":"SAB","Sobrevivência":"SAB","Adestramento":"CAR","Atuação":"CAR","Diplomacia":"CAR","Enganação":"CAR","Intimidação":"CAR","Misticismo":"INT","Investigação":"INT","Conhecimento":"INT","Guerra":"INT","Ofício (armeiro)":"INT","Ofício (engenhoqueiro)":"INT","Ofício (maquiagem)":"INT","Ofício (costureira)":"INT","Ladinagem":"DEX"
};
const stats=(c,n)=>{
 const a=(k)=>val(c,k)+delta(c,n,k);
 const half=Math.floor(n/2),con=a("CON"),car=a("CAR"),str=a("FOR"),dex=a("DEX"),int=a("INT");
 const o={level:n,pv:c.stats.pv+(n-1)*c.stats.hpGain,pm:c.stats.pm+(n-1)*c.stats.pmGain,defense:c.stats.defense+delta(c,n,"DEX"),move:c.stats.speed,
 attack:"—",damage:"Conforme habilidade",extra:"",magicDC:null,attributeInt:int,attributeStr:str,floor:half,training:trained(n),explanation:""};
 if(c.id==="yoru"){
  o.pv+=n>=12?n:0;
  o.attack=signed(str+2+half+(n>=7?2:0));o.damage="Espada 1d8+"+str;
  o.extra="Ofício (armeiro) "+signed(int+2+half+(n>=7?2:0));
  o.explanation="Inventora: 4 PM por nível, fabricação mediante tempo, ferramentas e Tibares; INT melhora a perícia de Ofício. Constituição elevada no 12º adiciona PV retroativamente.";
 }else if(c.id==="diego"&&c.theme==="diego"){
  o.pm+=delta(c,n,"SAB");
  o.attack=signed(str+2+half+(n>=7?2:0));
  o.damage=n>=2?"Forma Selvagem: consultar forma ativa":"Mordida 1d6+"+str;
  o.magicDC=10+half+a("SAB");
  o.extra=n>=12?"Forma Selvagem Superior":n>=6?"Forma Selvagem Aprimorada":n>=2?"Forma Selvagem":"Presas Primordiais";
  o.explanation="Druida: transformação usa apenas os bônus de uma forma por vez. Aumento de SAB no 10º aumenta a CD e +1 PM total, não por nível.";
 }else if(c.id==="diego"){
  o.pm+=(n>=5?3:0)+(n>=11?3:0);
  o.attack=signed(dex+2+half+(n>=7?2:0));
  o.damage="Adaga 1d4+"+str;
  o.extra="Ataque Especial "+signed(n>=9?12:n>=5?8:4);
  o.explanation="Guerreiro paralelo: Surto Heroico custa 5 PM por ação padrão ou movimento extra, só uma vez por rodada. Coração Heroico adiciona +3 PM no 5º e 11º.";
 }else if(c.id==="ado"||c.id==="marin"){
  o.pm+=delta(c,n,"CAR");
  o.attack=signed(dex+2+half+(n>=7?2:0));
  o.damage="Magias do "+(n>=10?"3º":n>=6?"2º":"1º")+" círculo";
  o.magicDC=10+half+car;
  o.extra="Inspiração +"+(n>=9?3:n>=5?2:1);
  o.explanation="Barda: Inspiração dá bônus em testes de perícia e exige PM. PM incluem CAR do primeiro nível e aumentos de CAR posteriores; sem magias grátis além do repertório.";
 }else if(c.id==="cyrene"||c.id==="makima"){
  if(n>=4)o.pm+=n; // Poder Mágico no 4º nível.
  o.pm+=delta(c,n,"CAR");
  o.magicDC=10+half+car+(c.id==="cyrene"&&n>=5?1:0)+(c.id==="makima"&&n>=5?1:0);
  o.extra="Magias do "+(n>=9?"3º":n>=5?"2º":"1º")+" círculo";
  o.explanation="Feiticeira: CD básica de magia e PM são calculados com CAR; Poder Mágico acrescenta PM retroativos. A CD exibida não inclui modificadores de escola ou gastos opcionais.";
 }else if(c.id==="optimus"){
  o.pv+=n>=10?n:0;
  o.pm+=n>=12?6:n>=8?3:n>=2?1:0;
  o.attack=signed(str+2+half+(n>=7?2:0));
  o.damage="Montante 2d6+"+str+(n>=9?" + 3d8":n>=5?" + 2d8":" + 1d8")+" (Golpe Divino, se usado)";
  o.extra="Chassi +2 Defesa • Sem Origem";
  o.explanation="Golem Paladino: Chassi concede +2 na Defesa; paladino recebe 3 PM por nível. CON elevada no 10º soma PV retroativamente. Transformação em caminhão não é gratuita.";
 }
 return o;
};
const skill=(c,entry,n)=>{
 const k=attrBySkill[entry[0]]||"INT";
 let b=val(c,k)+delta(c,n,k)+trained(n)+Math.floor(n/2);
 if(c.id==="diego"&&c.theme==="diego"&&n>=4&&entry[0]==="Percepção")b+=2;
 return signed(b);
};
window.T20_EXPANSION={expanded,stats,skill,delta};
})();


/* mega-data.js */
/* O SISTEMA // Multiverse wave 2 — catálogo expandido e verificável. 
   Todos os poderes são mecânicas oficiais reinterpretadas; nenhum poder de obra externa se torna regra nova. */
(()=>{
const d=window.T20_DATA,g=window.T20_GUIDE;if(!d||!g)return;
const defs={"list":[{"id":"jojo-dio1","name":"Dio Brando","universe":"JoJo • Parte 1","group":"jojo","identity":"Dio vampiro / Máscara de Pedra","klass":"Lutador","focus":"striker","color":"#d8a54d","source":"https://jojowiki.com/Dio_Brando","mechanic":"Punhos, gelo vampírico e resistência narrativa","item":"Máscara de Pedra / traje vitoriano","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"jojo-kars","name":"Kars","universe":"JoJo • Parte 2","group":"jojo","identity":"Homem do Pilar / Ser Perfeito","klass":"Druida","focus":"bruiser","color":"#bb6fd9","source":"https://jojowiki.com/Kars","mechanic":"Metamorfose e armas naturais via Forma Selvagem","item":"Lâminas ósseas (arma comum)","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"jojo-dio3","name":"DIO","universe":"JoJo • Parte 3","group":"jojo","identity":"THE WORLD / supremacia","klass":"Guerreiro","focus":"striker","color":"#eec443","source":"https://jojowiki.com/DIO","mechanic":"Ataque Extra e Surto Heroico (se adquirido) simulam tempo parado","item":"Facas arremessáveis","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"jojo-kira","name":"Yoshikage Kira","universe":"JoJo • Parte 4","group":"jojo","identity":"Killer Queen / explosões","klass":"Inventor","focus":"mind","color":"#f1a2c9","source":"https://jojowiki.com/Yoshikage_Kira","mechanic":"Engenhoqueiro e explosivos comprados, nunca bombas grátis","item":"Engenhos explosivos de Inventor","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"jojo-diavolo","name":"Diavolo","universe":"JoJo • Parte 5","group":"jojo","identity":"King Crimson / Epitaph","klass":"Ladino","focus":"stealth","color":"#e96c7d","source":"https://jojowiki.com/Diavolo","mechanic":"Evasão e Emboscar simulam o apagamento temporal","item":"Adaga e disfarces","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"jojo-pucci","name":"Enrico Pucci","universe":"JoJo • Parte 6","group":"jojo","identity":"Whitesnake → C-Moon → Made in Heaven","klass":"Arcanista","focus":"caster","color":"#c7d6e6","source":"https://jojowiki.com/Enrico_Pucci","mechanic":"Magias de controle e Velocidade por evolução; sem reescrever o universo","item":"Símbolo sagrado narrativo","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"jojo-valentine","name":"Funny Valentine","universe":"JoJo • Parte 7","group":"jojo","identity":"D4C / Love Train","klass":"Arcanista","focus":"mind","color":"#e9a8d9","source":"https://jojowiki.com/Funny_Valentine","mechanic":"Conjurar Monstro e Campo de Força como reflavor dimensional","item":"Casaco presidencial e foco arcano","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"jojo-tooru","name":"Tooru","universe":"JoJo • Parte 8","group":"jojo","identity":"Wonder of U / Calamidade","klass":"Arcanista","focus":"mind","color":"#c2a8ef","source":"https://jojowiki.com/Toru","mechanic":"Controle de área e magias reativas, não fatalidade inevitável","item":"Traje discreto e foco de magia","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"yuta","name":"Yuta Okkotsu","universe":"Jujutsu Kaisen","group":"jjk","identity":"Rika / energia amaldiçoada","klass":"Arcanista","focus":"caster","color":"#e9e9f4","source":"https://jujutsu-kaisen.fandom.com/wiki/Yuta_Okkotsu","mechanic":"Magias, familiar e Conjurar Monstro: Rika não ganha turno grátis","item":"Katana e amuleto","image":"https://a.storyblok.com/f/178900/750x719/abf59283d4/df68b91a4f7c133352f2a4867d1bf5771627578039_main.png/m/filters%3Aquality%2895%29format%28webp%29","credit":"Crunchyroll / arte promocional de JJK 0"},{"id":"goku","name":"Son Goku","universe":"Dragon Ball Z","group":"dragonball","identity":"Ki / Super Saiyajin","klass":"Lutador","focus":"bruiser","color":"#fca541","source":"https://en.dragon-ball-official.com/","mechanic":"Briga, Trocação e Surto Heroico (origem)","item":"Bastão Nyoibo / traje laranja","image":"https://images8.alphacoders.com/135/1355535.jpeg","credit":"Dragon Ball Daima / imagem promocional"},{"id":"hsr-aglaea","name":"Aglaea","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Romance / tecelagem dourada","klass":"Bardo","focus":"support","color":"#f6d48c","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Inspiração e Ilusão simulam fios e marionetes","item":"Fios dourados e tecidos","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1402.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-tribbie","name":"Tribbie","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Passage / múltiplas mensageiras","klass":"Bardo","focus":"support","color":"#ffa88f","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Inspiração e Fascinar simulam apoio e passagem","item":"Sinos e mensageiros visuais","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1403.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-mydei","name":"Mydei","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Strife / príncipe guerreiro","klass":"Guerreiro","focus":"bruiser","color":"#c75f61","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Ataque Especial, Durão e Golpe Pessoal representam fúria","item":"Espada longa / armadura de guerreiro","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1404.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-castorice","name":"Castorice","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Death / borboletas","klass":"Arcanista","focus":"caster","color":"#b4a1ed","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Conjurar Monstro e magia de necromancia; sem morte automática","item":"Borboletas etéreas (ilusão)","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1407.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-anaxa","name":"Anaxa","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Reason / filósofo","klass":"Arcanista","focus":"mind","color":"#7ad9be","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Magia Pungente e Conhecimento Mágico simulam teoria absoluta","item":"Livro de estudos","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1405.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-hyacine","name":"Hyacine","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Sky / cura","klass":"Clérigo","focus":"support","color":"#8cdcf2","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Curar Ferimentos e magias de suporte simulam tratamento","item":"Bolsa de médico e adereços celestes","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1409.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-phainon","name":"Phainon","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Worldbearing / chama","klass":"Guerreiro","focus":"striker","color":"#ffb876","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Golpe Pessoal e Ataque Extra representam estados de combate","item":"Montante e capa","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1408.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-hysilens","name":"Hysilens","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Ocean / melodias","klass":"Bardo","focus":"support","color":"#64afcc","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Música e encantamentos simulam pressão do oceano","item":"Instrumento marinho","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1410.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-cerydra","name":"Cerydra","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Law / soberana","klass":"Nobre","focus":"mind","color":"#d4a5b6","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Comandar, Orgulho e Liderar pelo Exemplo simulam estratégia","item":"Coroa e estandarte","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1412.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-evernight","name":"Evernight","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Time / esquecimento","klass":"Arcanista","focus":"caster","color":"#798bb6","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Ilusão e controle representam sombras e memórias","item":"Cristal noturno","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1413.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"hsr-terrae","name":"Dan Heng — Permansor Terrae","universe":"Honkai: Star Rail · Chrysos","group":"chrysos","identity":"Earth / proteção","klass":"Paladino","focus":"bruiser","color":"#8dcbad","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Aura Sagrada e escudo simulam guardião da terra","item":"Lança e proteção de pedra","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1414.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"em-herta","name":"The Herta","universe":"Honkai: Star Rail · Emanadora","group":"emanator","identity":"Erudition / pesquisa cósmica","klass":"Arcanista","focus":"mind","color":"#c0a6ef","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Conhecimento Mágico e controle arcano","item":"Livro e equipe de pesquisa","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1401.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"em-acheron","name":"Acheron","universe":"Honkai: Star Rail · Emanadora","group":"emanator","identity":"Nihility / espada","klass":"Guerreiro","focus":"striker","color":"#9950ce","source":"https://hsr.hoyoverse.com/en-us/character","mechanic":"Golpe Pessoal e armas; sem cortar conceitos de existência","item":"Katana","image":"https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1308.png","credit":"HoYoverse / materiais do jogo via StarRailRes"},{"id":"em-phantylia","name":"Phantylia","universe":"Honkai: Star Rail · Emanadora","group":"emanator","identity":"Destruction / ilusões","klass":"Arcanista","focus":"mind","color":"#e8b26d","source":"https://honkai-star-rail.fandom.com/wiki/Phantylia","mechanic":"Magias destrutivas e de ilusão","item":"Leques e flor de lótus","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-diamond","name":"Diamond","universe":"Honkai: Star Rail · Emanador","group":"emanator","identity":"Preservation / pedra angular","klass":"Paladino","focus":"bruiser","color":"#88d0e9","source":"https://honkai-star-rail.fandom.com/wiki/Diamond","mechanic":"Aura Sagrada, defesa e recursos adquiridos","item":"Pedra angular simbólica","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-taravan","name":"Taravan Keane","universe":"Honkai: Star Rail · Emanador","group":"emanator","identity":"Preservation / logística","klass":"Inventor","focus":"mind","color":"#b7c5d7","source":"https://honkai-star-rail.fandom.com/wiki/Taravan_Keane","mechanic":"Inventor e equipamentos defensivos; aparência não confirmada","item":"Emblema logístico simbólico","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-zandar","name":"Zandar One Kuwabara","universe":"Honkai: Star Rail · Emanador","group":"emanator","identity":"Erudition / Nous","klass":"Arcanista","focus":"mind","color":"#9cc8ed","source":"https://honkai-star-rail.fandom.com/wiki/Zandar_One_Kuwabara","mechanic":"Conhecimento, magia e cálculo de estratégias","item":"Emblema de Erudição","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-shuhu","name":"Shuhu","universe":"Honkai: Star Rail · Emanador","group":"emanator","identity":"Abundance / imortalidade","klass":"Clérigo","focus":"support","color":"#90d9ad","source":"https://honkai-star-rail.fandom.com/wiki/Shuhu","mechanic":"Curar Ferimentos, sustentação e magias de vida","item":"Raízes vegetais abstratas","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-zephyro","name":"Zephyro","universe":"Honkai: Star Rail · Lord Ravager","group":"emanator","identity":"Destruction / chama","klass":"Arcanista","focus":"caster","color":"#ed7d66","source":"https://honkai-star-rail.fandom.com/wiki/Zephyro","mechanic":"Magias de evocação destrutiva sem poder planetário","item":"Chama cósmica simbólica","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-celenova","name":"Celenova","universe":"Honkai: Star Rail · Lord Ravager","group":"emanator","identity":"Destruction / legiões","klass":"Nobre","focus":"mind","color":"#bb92a2","source":"https://honkai-star-rail.fandom.com/wiki/Celenova","mechanic":"Comandar e recursos sociais representam sua liderança militar","item":"Insígnia de legião","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-irontomb","name":"Irontomb","universe":"Honkai: Star Rail · Lord Ravager","group":"emanator","identity":"Destruction / máquina","klass":"Inventor","focus":"mind","color":"#99aeaf","source":"https://honkai-star-rail.fandom.com/wiki/Irontomb","mechanic":"Engenhoqueiro e autômato, não destruição de mundos","item":"Núcleo mecânico abstrato","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-archforger","name":"Archforger","universe":"Honkai: Star Rail · Lord Ravager","group":"emanator","identity":"Destruction / forja","klass":"Inventor","focus":"mind","color":"#e69b65","source":"https://honkai-star-rail.fandom.com/wiki/Lord_Ravager","mechanic":"Armeiro e Engenhoqueiro simulam forja destrutiva","item":"Bigorna astral simbólica","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-asat","name":"Asat Pramad","universe":"Honkai: Star Rail · Lord Ravager","group":"emanator","identity":"Destruction / fim do riso","klass":"Arcanista","focus":"mind","color":"#b59bce","source":"https://honkai-star-rail.fandom.com/wiki/Lord_Ravager","mechanic":"Encantamento e medo, sem controle ilimitado de emoções","item":"Máscara partida simbólica","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"em-luxbane","name":"Luxbane","universe":"Honkai: Star Rail · Lord Ravager","group":"emanator","identity":"Destruction / devorador solar","klass":"Arcanista","focus":"caster","color":"#cd7866","source":"https://honkai-star-rail.fandom.com/wiki/Lord_Ravager","mechanic":"Evocação e dano de fogo, sem destruir estrelas","item":"Eclipse abstrato","image":null,"credit":"Emblema original do projeto — visual canônico não reproduzido"},{"id":"elster","name":"Elster — LSTR-512","universe":"SIGNALIS","group":"signalis","identity":"Replika / Penrose-512","klass":"Ladino","focus":"stealth","color":"#ef5737","source":"https://signalis.wiki.gg/wiki/Elster_(LSTR-512)","mechanic":"Percepção, Evasão e furtividade sobrevivem a Sierpinski","item":"Pistola de fabricação oficial (a adquirir) e kit técnico","image":"https://img2.joyreactor.com/pics/post/full/Elster-%28Signalis%29-SIGNALIS-games-8515009.jpeg","credit":"Arte de fã de taostOOO, via JoyReactor"}]};
defs.list.push(...[{"id":"jojo-jonathan","name":"Jonathan Joestar","universe":"JoJo • Parte 1 — Phantom Blood","group":"jojo","identity":"Hamon / Sunlight Yellow Overdrive","klass":"Paladino","focus":"striker","color":"#edca72","source":"https://jojowiki.com/Jonathan_Joestar","mechanic":"Golpe Divino e virtudes representam Hamon, sem criar dano solar gratuito","item":"Espada da família Joestar","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"jojo-joseph","name":"Joseph Joestar","universe":"JoJo • Parte 2 — Battle Tendency","group":"jojo","identity":"Hamon / truques e bolas Clacker","klass":"Ladino","focus":"stealth","color":"#d99ae1","source":"https://jojowiki.com/Joseph_Joestar","mechanic":"Emboscar, fintas e armas de arremesso representam improvisação e Hamon","item":"Clackers e cordas","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"jojo-jotaro","name":"Jotaro Kujo","universe":"JoJo • Parte 3 — Stardust Crusaders","group":"jojo","identity":"Star Platinum / Ora Ora / tempo","klass":"Guerreiro","focus":"striker","color":"#b5a2ed","source":"https://jojowiki.com/Jotaro_Kujo","mechanic":"Golpe Pessoal e Ataque Extra simulam Star Platinum; tempo parado sem congelamento literal","item":"Casaco longo com corrente","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"jojo-josuke4","name":"Josuke Higashikata (Parte 4)","universe":"JoJo • Parte 4 — Diamond Is Unbreakable","group":"jojo","identity":"Crazy Diamond / restauração","klass":"Paladino","focus":"support","color":"#ff94bd","source":"https://jojowiki.com/Josuke_Higashikata","mechanic":"Cura pelas Mãos representa conserto de ferimentos; não revive pessoas","item":"Uniforme azul com corações","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"jojo-giorno","name":"Giorno Giovanna","universe":"JoJo • Parte 5 — Vento Aureo","group":"jojo","identity":"Gold Experience / criação da vida","klass":"Druida","focus":"support","color":"#e9cb67","source":"https://jojowiki.com/Giorno_Giovanna","mechanic":"Conjurar Monstro, Companheiro Animal e magias de cura representam vida nova","item":"Brotos dourados e joaninhas","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"jojo-jolyne","name":"Jolyne Cujoh","universe":"JoJo • Parte 6 — Stone Ocean","group":"jojo","identity":"Stone Free / fios e teias","klass":"Ladino","focus":"stealth","color":"#8cdbab","source":"https://jojowiki.com/Jolyne_Cujoh","mechanic":"Furtividade, mobilidade e cordas representam fio de Stone Free","item":"Carretel de fios verdes","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"jojo-johnny","name":"Johnny Joestar","universe":"JoJo • Parte 7 — Steel Ball Run","group":"jojo","identity":"Tusk ACT 1–4 / Spin","klass":"Guerreiro","focus":"striker","color":"#a7c9f7","source":"https://jojowiki.com/Johnny_Joestar","mechanic":"Ataques à distância de arremesso e Golpe Pessoal representam unhas giratórias","item":"Projéteis em formato de unhas azuis","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"jojo-gappy","name":"Josuke Higashikata (JoJolion)","universe":"JoJo • Parte 8 — JoJolion","group":"jojo","identity":"Soft & Wet / bolhas e Go Beyond","klass":"Arcanista","focus":"mind","color":"#a3daee","source":"https://jojowiki.com/Josuke_Higashikata_(JoJolion)","mechanic":"Ilusões, proteção e magias de controle representam bolhas; não roubam atributos gratuitamente","item":"Bolhas translúcidas e uniforme de marinheiro","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"denji","name":"Denji","universe":"Chainsaw Man","group":"chainsaw","identity":"Chainsaw Devil / risco e regeneração","klass":"Guerreiro","focus":"bruiser","color":"#f8a54d","source":"https://chainsaw-man.fandom.com/wiki/Denji","mechanic":"Golpes de duas mãos e Durão representam motosserras; regeneração só com cura oficial","item":"Espadas serrilhadas / cordão no peito","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"satoru-gojo","name":"Satoru Gojo","universe":"Jujutsu Kaisen","group":"jjk","identity":"Limitless / Six Eyes / Infinite Void","klass":"Arcanista","focus":"caster","color":"#8fdff3","source":"https://jujutsu-kaisen.fandom.com/wiki/Satoru_Gojo","mechanic":"Campo de Força, Velocidade e magias de controle simulam Infinito e domínio","item":"Venda azul nos olhos","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"shigaraki","name":"Tomura Shigaraki","universe":"My Hero Academia","group":"mha","identity":"Decay / All For One","klass":"Arcanista","focus":"mind","color":"#b0a8c5","source":"https://myheroacademia.fandom.com/wiki/Tomura_Shigaraki","mechanic":"Magias de trevas, dano e terreno representam decomposição, sem morte automática","item":"Luvas e mãos simbólicas","image":null,"credit":"Pôster original de O Sistema, não arte oficial"},{"id":"midoriya","name":"Izuku Midoriya","universe":"My Hero Academia","group":"mha","identity":"One For All / Detroit Smash","klass":"Lutador","focus":"bruiser","color":"#8ddb9d","source":"https://myheroacademia.fandom.com/wiki/Izuku_Midoriya","mechanic":"Briga, Trocação, Surto Heroico se permitido e movimentos atléticos simulam One For All","item":"Luvas verdes e tênis vermelhos","image":null,"credit":"Pôster original de O Sistema, não arte oficial"}]);
const abilityBook={
 Arcanista:["Caminho do Arcanista e magias de 1º círculo","Poder Mágico","Magia Pungente","Conhecimento Mágico","Fortalecimento Arcano • 2º círculo","Magia Acelerada","Conhecimento Mágico","Aumento de Atributo","Magias do 3º círculo","Magia Discreta","Conhecimento Mágico","Magia Ilimitada"],
 Guerreiro:["Ataque Especial +4","Estilo de Duas Mãos","Durão (automático) • Foco em Arma","Ataque Poderoso","Golpe Pessoal • Ataque Especial +8","Ataque Extra (automático) • Saque Rápido","Aumento de Atributo","Foco em Arma","Ataque Especial +12","Golpe Pessoal II","Especialização em Arma","Mestre em Arma"],
 Lutador:["Briga • Golpe Relâmpago","Atlético","Casca Grossa (automático) • Braços Calejados","Sarado","Briga 1d8 (automático) • Rasteira","Trocação","Aumento de Atributo","Punhos de Adamante","Briga 1d10 (automático) • Golpe Imprudente","Trincado","Confiança dos Ringues","Sequência Destruidora"],
 Druida:["Devoto Fiel • Empatia Selvagem • magias","Forma Selvagem","Companheiro Animal","Sentidos Aguçados","Ginete","Forma Selvagem Aprimorada • 2º círculo","Presas Afiadas","Companheiro Animal Aprimorado","Magia Natural","Magias do 3º círculo • Aumento de Atributo","Aumento de Atributo","Forma Selvagem Superior"],
 Ladino:["Ataque Furtivo • Especialista","Acuidade com Arma • Evasão (automático)","Mente Criminosa","Finta Aprimorada • Esquiva Sobrenatural","Assassinar","Oportunismo","Aumento de Atributo","Enganar os Olhos • Olhos nas Costas","Ataque Furtivo aprimorado","Emboscar • Evasão Aprimorada","Foco em Arma","Saque Rápido"],
 Inventor:["Engenhosidade • Protótipo","Armeiro","Maestria em Perícia","Balística","Engenhoqueiro","Manutenção Eficiente","Encontrar Fraqueza (automático)","Aumento de Atributo (INT)","Fabricar Item Mágico Menor","Autômato","Aumento de Atributo","Aumento de Atributo"],
 Bardo:["Inspiração +1 • magias de 1º círculo","Arte Mágica • Eclético (automático)","Música: Balada Fascinante","Aumentar Repertório","Aumento de Atributo (CAR) • Inspiração +2","Melodia Curativa • 2º círculo","Aumentar Repertório","Fascinar em Massa","Melodia Restauradora • Inspiração +3","Magias do 3º círculo","Aumento de Atributo","Aumentar Repertório"],
 Nobre:["Autoconfiança • Espólio • Orgulho","Inspirar Confiança • Palavras Afiadas","Estrategista • Riqueza (automático)","Voz Poderosa • Gritar Ordens","Aumento de Atributo (CAR) • Presença Aristocrática","Liderar pelo Exemplo","Jogo da Corte","Inspirar Glória","Língua de Prata","Educação Privilegiada","Aumento de Atributo","General"],
 Paladino:["Abençoado • Código do Herói • Golpe Divino","Cura pelas Mãos • Virtude","Aura Sagrada • Ataque Poderoso","Julgamento Divino","Bênção da Justiça • Golpe Divino aprimorado","Combate Defensivo","Aura de Cura","Virtude Paladinesca","Foco em Arma • Golpe Divino aprimorado","Cura pelas Mãos aprimorada","Orar","Virtude Paladinesca"],
 Clérigo:["Devoto Fiel • Magias de 1º círculo","Abençoar Arma","Símbolo Sagrado Energizado","Canalizar Energia","Magias do 2º círculo","Conhecimento Mágico","Aumento de Atributo (SAB)","Magia Pungente","Magias do 3º círculo","Conhecimento Mágico","Aumento de Atributo","Magia Ilimitada"]
};
const classRules={
 Arcanista:{p:8,pg:2,pm:6,page:"37–39",stat:"INT",weapon:"Cajado",damage:"1d6",skills:["Misticismo","Vontade","Conhecimento","Iniciativa","Percepção","Reflexos"]},
 Guerreiro:{p:20,pg:5,pm:3,page:"64–66",stat:"FOR",weapon:"Espada longa",damage:"1d8",skills:["Luta","Fortitude","Iniciativa","Reflexos","Atletismo","Percepção"]},
 Lutador:{p:20,pg:5,pm:3,page:"75–77",stat:"FOR",weapon:"Punhos",damage:"1d6",skills:["Luta","Fortitude","Atletismo","Iniciativa","Reflexos","Vontade"]},
 Druida:{p:16,pg:4,pm:4,page:"61–63",stat:"SAB",weapon:"Bastão",damage:"1d6",skills:["Sobrevivência","Vontade","Adestramento","Percepção","Luta","Iniciativa"]},
 Ladino:{p:12,pg:3,pm:4,page:"72–74",stat:"DEX",weapon:"Adaga",damage:"1d4",skills:["Furtividade","Ladinagem","Iniciativa","Reflexos","Percepção","Enganação"]},
 Inventor:{p:12,pg:3,pm:4,page:"68–71",stat:"INT",weapon:"Espada curta",damage:"1d6",skills:["Ofício (armeiro)","Ofício (engenhoqueiro)","Misticismo","Iniciativa","Percepção","Fortitude"]},
 Bardo:{p:12,pg:3,pm:4,page:"44–46",stat:"CAR",weapon:"Adaga",damage:"1d4",skills:["Atuação","Diplomacia","Enganação","Vontade","Reflexos","Misticismo"]},
 Nobre:{p:16,pg:4,pm:4,page:"78–80",stat:"CAR",weapon:"Espada longa",damage:"1d8",skills:["Diplomacia","Intuição","Nobreza","Vontade","Guerra","Percepção"]},
 Paladino:{p:20,pg:5,pm:3,page:"82–84",stat:"CAR",weapon:"Espada longa",damage:"1d8",skills:["Luta","Vontade","Fortitude","Diplomacia","Religião","Percepção"]},
 Clérigo:{p:16,pg:4,pm:5,page:"56–58",stat:"SAB",weapon:"Cajado",damage:"1d6",skills:["Religião","Vontade","Cura","Misticismo","Percepção","Fortitude"]}
};
const skillAttr={"Luta":"FOR","Pontaria":"DEX","Atletismo":"FOR","Fortitude":"CON","Reflexos":"DEX","Vontade":"SAB","Iniciativa":"DEX","Cavalgar":"DEX","Furtividade":"DEX","Acrobacia":"DEX","Percepção":"SAB","Intuição":"SAB","Sobrevivência":"SAB","Adestramento":"CAR","Atuação":"CAR","Diplomacia":"CAR","Enganação":"CAR","Intimidação":"CAR","Misticismo":"INT","Investigação":"INT","Conhecimento":"INT","Nobreza":"INT","Guerra":"INT","Ladinagem":"DEX","Religião":"SAB","Cura":"SAB","Ofício (armeiro)":"INT","Ofício (engenhoqueiro)":"INT"};
const buy={
 striker:{CON:2,CAR:1,SAB:1,INT:0,FOR:3,DEX:2},
 bruiser:{CON:3,CAR:1,SAB:1,INT:0,FOR:2,DEX:2},
 caster:{CON:1,CAR:3,SAB:1,INT:2,FOR:0,DEX:2},
 mind:{CON:1,CAR:2,SAB:2,INT:3,FOR:0,DEX:1},
 support:{CON:1,CAR:3,SAB:2,INT:1,FOR:0,DEX:2},
 stealth:{CON:1,CAR:2,SAB:1,INT:1,FOR:1,DEX:3}
};
const official="https://jamboeditora.com.br/produto/tormenta20-edicao-jogo-do-ano/";
const externalArts={};
const emoji={jojo:"✦",jjk:"◈",dragonball:"✷",chrysos:"✧",emanator:"⬡",signalis:"▣"};
const origIcon=(p)=>{
 // É um retrato tipográfico ORIGINAL, não arte da personagem; para figuras sem imagem oficial disponível.
 const txt=(p.name.length>20?p.name.slice(0,20):p.name).replace(/[&<>"']/g,"");
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><rect width="600" height="800" fill="#10141d"/><g fill="none" stroke="'+p.color+'" opacity=".27" stroke-width="4"><circle cx="300" cy="340" r="220"/><circle cx="300" cy="340" r="178"/><path d="M0 685 L600 300 M0 410 L600 25 M65 0 L400 800"/></g><text x="300" y="366" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="140" fill="'+p.color+'">'+(emoji[p.group]||"◈")+'</text><text x="300" y="680" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="31" fill="#f2f3f6">'+txt+'</text><text x="300" y="728" text-anchor="middle" font-family="monospace" font-size="20" fill="'+p.color+'">O SISTEMA // T20</text></svg>';
 return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
};
function build(p,variant){
 const cfg={...p,...variant};
 const R=classRules[cfg.klass],b=buy[cfg.focus]||buy.striker;
 const race=cfg.id==="elster"?"Golem de Ferro":"Humano";
 const rb=race==="Humano"?{[R.stat]:1,DEX:1,CON:1}:{FOR:2,CON:1,CAR:-1};
 const uniqueKeys=Object.keys(rb);
 if(race==="Humano"&&uniqueKeys.length<3)rb.SAB=1;
 const attrs=["CON","CAR","SAB","INT","FOR","DEX"].map(k=>({key:k,buy:b[k]||0,race:rb[k]||0,value:(b[k]||0)+(rb[k]||0),why:k===R.stat?"Atributo-chave para a mecânica principal.":k==="CON"?"Resistência e PV.":k==="DEX"?"Iniciativa e mobilidade.":"Atributo secundário conforme a função."}));
 const attr=Object.fromEntries(attrs.map(a=>[a.key,a.value]));
 const isCaster=["Arcanista","Bardo","Clérigo","Druida"].includes(cfg.klass);
 const pm=R.pm+(isCaster?attr[R.stat]:cfg.klass==="Nobre"||cfg.klass==="Paladino"?attr.CAR:0);
 const hp=R.p+attr.CON;
 const def=10+(cfg.klass==="Nobre"?attr.CAR:attr.DEX)+(cfg.klass==="Arcanista"||cfg.klass==="Bardo"?0:2)+(race!=="Humano"?2:0);
 const skills=R.skills.map(n=>[n,(attr[skillAttr[n]||"INT"]+2>=0?"+":"")+(attr[skillAttr[n]||"INT"]+2), "Treinada • veja os bônus de nível e classe"]);
 const powers=abilityBook[cfg.klass];
 const prog=powers.map((v,i)=>[String(i+1),v,(i===0?"Identidade: "+cfg.identity+". ":"Desenvolve "+cfg.mechanic+". ")+"É preciso confirmar requisitos, custos e escolhas permitidas do livro; não é uma habilidade concedida automaticamente."]);
 const baseNotes=[
  "Ficha não oficial: "+cfg.name+" representa "+cfg.identity+". A obra de origem não concede capacidades adicionais sem mecânica de Tormenta20.",
  "Compra de atributos: 10 pontos, conforme distribuição "+cfg.focus+". "+race+" aplicado; não existe raça especial da obra original.",
  "Equipamentos são oficiais ou meros adereços visuais; acessórios de outra franquia não criam propriedades mágicas.",
  "Poderes aparecem na progressão por nível, mas só podem ser usados após sua escolha e caso os pré-requisitos sejam cumpridos. Recursos automáticos de classe são indicados no livro.",
  "PV aumentam "+R.pg+" + CON por nível após o primeiro; PM aumentam "+R.pm+" por nível. Bônus futuros de atributo podem ajustar os totais conforme a regra.",
  "A técnica "+cfg.identity+" é reflavor das regras de "+cfg.klass+"; não reproduz feitos cósmicos, time-stop real ou invocação gratuita."
 ];
 const pic=cfg.image||origIcon(cfg);
 const weapons=[
  {name:cfg.item,rule:"Aparência narrativa de equipamento oficial",detail:"Proposta visual: "+cfg.item+". Na mesa, use equipamento disponível e os preços, proficiências e danos do livro, sem bônus adicionais.",qty:"1",image:pic,source:cfg.source,credit:cfg.image?cfg.credit:"Selo original O Sistema"},
  {name:R.weapon,rule:"Equipamento-base da classe",detail:"Usa o dano e proficiência de "+R.weapon+" conforme o livro. Aquisição sujeita a equipamentos iniciais e ao mestre.",qty:"1"},
  {name:"Traje característico",rule:"Traje de viajante",detail:"Cores e silhueta da obra como visual, sem aumento de Defesa.",qty:"1"},
  {name:isCaster?"Foco / componente de magia":"Kit de viagem",rule:isCaster?"Componente arcano ou símbolo narrativo":"Itens mundanos",detail:"O item é comum, não concede magias ou ações extras.",qty:"1"}
 ];
 const techniques=[
  {level:1,name:cfg.identity,mechanic:powers[0],cost:"Conforme habilidade",effect:cfg.mechanic+". Consulte o poder e as ações permitidas; os efeitos de fora de Arton são somente aparência.",flavor:"Assinatura narrativa do personagem."},
  {level:3,name:"Protocolo de Combate",mechanic:powers[2],cost:"Conforme livro",effect:"Use o recurso desbloqueado no nível 3, obedecendo aos requisitos.",flavor:"Evolução da identidade: "+cfg.identity},
  {level:6,name:"Operação Avançada",mechanic:powers[5],cost:"Conforme livro",effect:"Aplique o poder ou progressão do nível 6 somente se puder escolhê-lo.",flavor:"Habilidades avançadas não criam regras novas."},
  {level:9,name:"Sinal Máximo",mechanic:powers[8],cost:"Conforme livro",effect:"Recurso do 9º nível. Efeitos de dano, área, ações e concentração seguem seu texto oficial.",flavor:cfg.name+" alcança o auge."}
 ];
 const c={id:cfg.id,number:String(cfg.number).padStart(2,"0"),name:cfg.name,universe:cfg.universe,label:cfg.identity.toUpperCase(),symbol:emoji[cfg.group]||"◈",theme:cfg.group==="signalis"?"signalis":cfg.group==="dragonball"?"goku-"+(cfg.form||"z"):"mega-"+cfg.id,
 catalogCategory:cfg.group,portrait:{url:pic,credit:cfg.image?cfg.credit:"Emblema simbólico original",page:cfg.source},
 excerpt:cfg.mechanic,info:{race,className:cfg.klass,origin:race!=="Humano"?"Sem Origem":"Herói Camponês (a confirmar na mesa)",devotion:"Livre; consultar requisitos de classe",role:cfg.identity,partner:"Nenhum parceiro grátis; uso condicionado a poder"},
 stats:{pv:hp,pm,defense:def,speed:"9 m",hpGain:R.pg+attr.CON,pmGain:R.pm},
 attrs,summary:"Adaptação de "+cfg.name+": "+cfg.mechanic+". Construção oficial de "+cfg.klass+", priorizando "+R.stat+". As técnicas têm nome narrativo e dependem de escolhas, custos e pré-requisitos de T20.",
 history:[cfg.name+" representa "+cfg.identity+" em "+cfg.universe+". A adaptação usa "+cfg.klass+" como base mecânica para seus recursos.",
 "A ficha é jogável em Arton mediante validação do mestre. Nenhuma habilidade da franquia é reproduzida literalmente se não houver efeito oficial correspondente."],
 skills,initial:[...powers.slice(0,1),race==="Humano"?"Humano: Versátil, escolha um poder geral e uma perícia adicional (a definir)":"Golem: Sem Origem, Chassi e restrições raciais", "Origem, itens e devoção devem ser escolhidos conforme pré-requisitos oficiais"],
 gear:weapons,attacks:[{name:R.weapon,test:"+"+(attr[R.stat]+2),damage:R.damage+"+"+(attr.FOR),cost:"0 PM",detail:"Ataque básico da arma; confira proficiência e distância. Sem poderes automáticos externos."}],
 progression:prog,techniques,notes:{overview:baseNotes[0],attributes:baseNotes[1],equipment:baseNotes[2],abilities:baseNotes[3],progression:baseNotes[4],techniques:baseNotes[5]},
 media:[{name:cfg.name+" — referência",image:pic,source:cfg.source,credit:cfg.image?cfg.credit:"Arte tipográfica original; sem visual oficial confirmado"}],
 sources:[{name:"Referência do personagem / obra",url:cfg.source},{name:"Tormenta20 — Edição Jogo do Ano",url:official}],
 _mega:{className:cfg.klass,mainAttr:R.stat,group:cfg.group,color:cfg.color,skillAttr,description:cfg.mechanic,form:cfg.form||null}
 };
 const guide={levels:prog.map(([lvl,power,desc],i)=>({
  why:"O nível "+lvl+" introduz "+power+". "+cfg.identity+" é representado por esta escolha; confirme se ela é automática, se exige poder de classe ou se é opção de poder geral.",
  use:"No combate, utilize "+power+" exatamente com as ações, custos em PM, requisitos e testes indicados no livro. "+cfg.mechanic+"; não aplique os poderes originais do personagem como bônus independentes.",
  ref:[["core",R.page,"Classe "+cfg.klass+" / "+power],["core","cap. 4 e cap. 5","Magias e regras de combate, quando aplicável"]]
 })),basics:[
  {name:powers[0],why:"Estabelecer a mecânica inicial da ficha.",use:"Leia "+cfg.klass+" nas páginas indicadas e aplique somente habilidades que a classe concede ao nível 1.",ref:[["core",R.page,"Classe "+cfg.klass]]},
  {name:cfg.identity,why:cfg.mechanic,use:"Representação narrativa. Não substitui a ação ou o custo do poder original.",ref:[["core",R.page,"Habilidade e combate"]]},
  {name:"Equipamento e pré-requisitos",why:"Aparência não significa gratuidade.",use:"A arma e os itens devem ser comprados ou recebidos pela criação da ficha; proficiência e aprimoramentos seguem os capítulos oficiais.",ref:[["core","cap. 3, Equipamentos","Itens e aquisição"]]}
 ]};
 c._guide=guide;
 return c;
}
let counter=13;
const cards=defs.list.map(p=>build({...p,number:counter++}));
d.characters.push(...cards);
const coreGoku=cards.find(c=>c.id==="goku");
const gu={z:coreGoku};
for(const [key,data] of Object.entries({
 gt:{identity:"SUPER SAIYAJIN 4 // PRIMAL",klass:"Druida",focus:"bruiser",color:"#df5749",mechanic:"Forma Selvagem representa o SSJ4 sem conceder asas, voo ou poderes automáticos.",form:"gt",universe:"Dragon Ball GT"},
 daima:{identity:"DAIMA // POLE & SSJ4",klass:"Guerreiro",focus:"striker",color:"#b86bd5",mechanic:"O bastão mágico funciona como arma oficial; Surto Heroico depende de origem.",form:"daima",universe:"Dragon Ball DAIMA"},
 super:{identity:"GOD KI // ULTRA INSTINCT",klass:"Arcanista",focus:"caster",color:"#63c8f0",mechanic:"Velocidade, Campo de Força e efeitos mágicos simulam Ki Divino; não existe esquiva automática.",form:"super",universe:"Dragon Ball Super"}
})){gu[key]=build({...defs.list.find(c=>c.id==="goku"),...data,id:"goku",number:coreGoku.number,name:"Son Goku — "+key.toUpperCase()})}
gu.z.portrait.url="https://cdn.dokkan.fyi/assets/en/character/card/1006760/card_1006760_character.png";
gu.z.portrait.credit="Dragon Ball Dokkan Battle — imagem do jogo";
gu.gt.portrait.url="https://i.imgur.com/uAL1QP5.jpg";
gu.gt.portrait.credit="Imagem promocional Dragon Ball GT";
gu.super.portrait.url="https://en.dragon-ball-official.com/dragonball/jp/news/2023/12/%E3%83%AC%E3%82%B8%E3%82%A7%E3%83%B3%E3%82%BA%E7%94%A8%E6%82%9F%E7%A9%BA%28CMYK%29_%E5%85%88%E7%94%9F%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%B3%E4%BB%98%E3%81%8D.jpg?_=1771666020";
gu.super.portrait.credit="Dragon Ball Official — Toyotarou";
window.T20_GOKU_VARIANTS=gu;
window.T20_MEGA={ids:new Set(cards.map(c=>c.id)),classes:classRules,skillAttr,origIcon};
})();


/* mega-runtime.js */
/* Calculadora de progressão da expansão.
   Valida a estrutura do nível escolhido; escolha opcional e bônus situacionais requerem mesa. */
(()=>{
const src=window.T20_MEGA;if(!src)return;
const val=(c,k)=>c.attrs.find(a=>a.key===k)?.value||0;
const levelDelta=(c,n,k)=>{
 let t=0;
 for(let i=1;i<=Math.min(12,n);i++){
   const title=c.progression[i-1]?.[1]||"";
   if(title.includes("Aumento de Atributo")){
     const explicit=title.match(/Aumento de Atributo \((CON|CAR|SAB|INT|FOR|DEX)\)/);
     const key=explicit?.[1]||c._mega.mainAttr;
     if(k===key)t++;
   }
 }
 return t;
};
const pmAttr=klass=>["Arcanista","Clérigo","Druida","Bardo","Nobre","Paladino"].includes(klass);
const stats=(c,n)=>{
 const klass=c._mega.className,R=src.classes[klass],delta=k=>levelDelta(c,n,k);
 const total=k=>val(c,k)+delta(k),con=total("CON"),main=total(c._mega.mainAttr);
 const hpBonus=delta("CON")*n;
 const initialCasterBonus=pmAttr(klass)?delta(c._mega.mainAttr):0;
 let pm=c.stats.pm+(n-1)*R.pm+initialCasterBonus;
 let pv=c.stats.pv+(n-1)*c.stats.hpGain+hpBonus;
 let defense=c.stats.defense+(klass==="Nobre"?delta("CAR"):delta("DEX"));
 let attack=(total("FOR")+2+Math.floor(n/2)+(n>=7?2:0));
 let extra="Nível "+n+" / "+klass;
 if(klass==="Guerreiro")extra="Ataque Especial +"+(n>=9?12:n>=5?8:4);
 if(klass==="Bardo")extra="Inspiração +"+(n>=9?3:n>=5?2:1);
 if(klass==="Ladino")extra="Ataque Furtivo "+(1+Math.floor((n-1)/2))+"d6 (se válido)";
 if(klass==="Druida")extra=n>=12?"Forma Selvagem Superior":n>=6?"Forma Selvagem Aprimorada":n>=2?"Forma Selvagem":"Magias de 1º círculo";
 if(klass==="Arcanista"||klass==="Clérigo")extra="Magias do "+(n>=9?"3º":n>=5?"2º":"1º")+" círculo (se aprendidas)";
 if(klass==="Paladino")extra="Golpe Divino e habilidades paladinescas";
 const magicDC=["Arcanista","Bardo","Clérigo","Druida"].includes(klass)?10+Math.floor(n/2)+main:null;
 const damage=klass==="Arcanista"||klass==="Clérigo"||klass==="Bardo"||klass==="Druida"?"Conforme magia e círculo":"Arma base "+(R.damage)+"+"+total("FOR");
 return {
  level:n,pv,pm,defense,move:c.stats.speed,attack:(attack>=0?"+":"")+attack,damage,extra,magicDC,
  attributeInt:total("INT"),attributeStr:total("FOR"),floor:Math.floor(n/2),training:n>=7?4:2,
  explanation:"PV e PM acompanham a progressão da classe e os aumentos escolhidos. A árvore indica uma PROPOSTA: só considere cada poder adquirido após conferir pré-requisitos, escolhas de poder e limites de PM no livro. "+c._mega.description
 };
};
const skill=(c,entry,n)=>{
 const name=entry[0],attr=src.skillAttr[name]||"INT";
 const b=val(c,attr)+levelDelta(c,n,attr)+2+Math.floor(n/2)+(n>=7?2:0);
 return (b>=0?"+":"")+b;
};
src.delta=levelDelta;src.stats=stats;src.skill=skill;
})();


/* catalog-media.js */
/* O SISTEMA // Catálogo de fontes de imagem resiliente.
   URLs oficiais/referências verificadas; mantém alternativas caso o servidor recuse hotlink. */
(()=>{
 const data=window.T20_DATA,alternate=window.T20_ALTERNATES?.diego?.alternative;
 if(!data)return;
 const upgrades=[
  {
   id:"diego",
   url:"https://jojo-portal-anime.com/sbr/assets/images/pc/character/img_character-visual-03.png",
   credit:"Arte oficial de Diego Brando · anime Steel Ball Run",
   page:"https://jojo-portal-anime.com/sbr/character/03/"
  },
  {
   id:"marin",
   url:"https://static.zerochan.net/Kitagawa.Marin.full.3561466.jpg",
   credit:"Design de Marin Kitagawa por Ishida Kazumasa · reprodução em Zerochan",
   page:"https://www.zerochan.net/3561466"
  },
  {
   id:"ado",
   url:"https://rockinon.com/images/entry/default/207107/1",
   credit:"Persona ilustrada de Ado · divulgação em rockin'on",
   page:"https://rockinon.com/news/detail/207107"
  },
  {
   id:"elster",
   url:"https://images.nintendolife.com/d03911fb9b35c/signalis-cover.cover_large.jpg",
   credit:"Arte de capa de SIGNALIS · Nintendo Life / rose-engine",
   page:"https://www.nintendolife.com/reviews/switch-eshop/signalis"
  }
 ];
 const fallbackURLs={};
 for(const u of upgrades){
  const c=data.characters.find(c=>c.id===u.id);
  if(!c)continue;
  const previous=c.portrait?.url;
  if(!previous||previous===u.url)continue;
  fallbackURLs[u.url]=[previous];
  fallbackURLs[previous]=[u.url];
  c.portrait.url=u.url;c.portrait.credit=u.credit;c.portrait.page=u.page;
  const media=c.media?.find(m=>m.image===previous);
  if(media){media.image=u.url;media.credit=u.credit;media.source=u.page}
  for(const g of c.gear||[]){
   if(g.image===previous){g.image=u.url;g.source=u.page;g.credit=u.credit}
  }
 }
 // Outros servidores conhecidos por impedir carregamento entre domínios.
 // Nunca repetir uma URL já tentada; o tratamento final usa a arte tipográfica local.
 window.T20_MEDIA_BACKUPS=fallbackURLs;

 // Dimensões dos retratos conferidos no Atlas. Uma posição permite recortar a
 // arte sem perder o rosto, enquanto as imagens sem posição aparecem inteiras.
 const frames={
  d:[720,959,"50% 45%"],
  david:[600,300,"50% 38%"],
  cipher:[600,598],
  cyrene:[600,562],
  "em-phantylia":[1024,1024],
  "em-zandar":[720,908,"50% 30%"],
  "em-zephyro":[1250,704,"23% 50%"],
  "em-celenova":[1250,750,"57% 50%"],
  "em-irontomb":[1024,1024],
  "em-archforger":[1920,1080,"54% 50%"],
  "em-asat":[1920,1080,"50% 50%"],
  "em-luxbane":[1250,739,"19% 50%"],
  "hsr-silver-wolf":[980,803],
  "hsr-aha":[980,769],
  "hsr-himeko-nova":[980,572,"72% 35%"],
  "hsr-welt":[980,724],
  "hsr-stelle":[816,1080],
  "hunter-kafka":[980,796],
  "hunter-blade":[980,673,"59% 36%"],
  "hunter-firefly":[980,926],
  "hsr-feixiao":[980,771],
  lucy:[1500,844,"50% 38%"],
  weak:[250,410],
  "adam-smasher":[650,650,"50% 50%"],
  talia:[250,410],
  roman:[250,410]
 };
 for(const id of ["hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine",
  "hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae","em-herta","em-acheron"]){
  frames[id]=[376,512,"50% 0%"];
 }
 window.T20_PORTRAIT_FRAMES=frames;
})();


/* acheron-samurai.js */
/* O SISTEMA // Correção canônica: Acheron é Samurai (Dragão Brasil 199).
   Executa depois da expansão e antes da interface; não reclassifica outros Emanadores. */
(()=>{
const data=window.T20_DATA, mega=window.T20_MEGA, guide=window.T20_GUIDE;
if(!data||!mega||!guide)return;
const c=data.characters.find(x=>x.id==="em-acheron");if(!c)return;
guide.books.db199={name:"Dragão Brasil nº 199 — classe Samurai",url:"https://jamboeditora.com.br/selos-literarios/dragao-brasil/",edition:"Dragão Brasil 199 · classe opcional; verificar PDF da mesa"};
mega.classes.Samurai={p:20,pg:5,pm:3,page:"Dragão Brasil 199 — seção Samurai",stat:"FOR",weapon:"Katana ancestral",damage:"1d8",skills:["Luta","Vontade","Iniciativa","Percepção"]};
c.info.className="Samurai (Dragão Brasil nº 199)";
c.info.role="Duelista de katana · dano concentrado · Emanadora da Nihilidade";
c.label="NIHILITY // KIAI ANCESTRAL";
c.summary="Samurai opcional da Dragão Brasil nº 199. Sua katana é a Arma Ancestral, o Grito de Kiai concentra seus cortes e a técnica Corte do Vácuo representa parte do visual de aniquilação. Não possui poder literal de eliminar existência nem invocações gratuitas.";
c._mega.className="Samurai";
c._mega.mainAttr="FOR";
c._mega.page="DB 199: Samurai (seção da classe)";
c._mega.description="Acheron adota a classe opcional Samurai da Dragão Brasil nº 199. O Código do Samurai é obrigatório até obter o poder Ronin; a interpretação narrativa não elimina suas restrições.";
const buy={CON:1,CAR:1,SAB:2,INT:0,FOR:3,DEX:2};
const race={CON:1,FOR:1,DEX:1};
for(const a of c.attrs){a.buy=buy[a.key]??0;a.race=race[a.key]??0;a.value=a.buy+a.race;a.why={
CON:"Resiliência de quem atravessa lugares devastados.",CAR:"Presença fria e introspectiva.",SAB:"Sensibilidade ao caminho e instintos de batalha.",INT:"Conhecimento fragmentado de um mundo perdido.",FOR:"Golpes profundos da katana ancestral.",DEX:"Saque preciso e movimentação letal."
}[a.key]}
const score=Object.fromEntries(c.attrs.map(a=>[a.key,a.value]));
c.stats={pv:20+score.CON,pm:3,defense:10+score.DEX+2,speed:"9 m",hpGain:5+score.CON,pmGain:3};
c.skills=[
 ["Luta","+6","Treinada · golpes com katana ancestral"],
 ["Vontade","+4","Treinada · força de vontade da Nihilidade"],
 ["Iniciativa","+5","Treinada · Iaijutsu a partir do 3º nível"],
 ["Percepção","+4","Treinada · detectar aproximações"],
 ["Cavalgar","+5","Treino adicional humano (Versátil) · deslocamento montado"]
];
c.initial=[
 "Arma Ancestral (katana com 1 melhoria até T$ 500): escolha Precisa para habilitar Corte do Vácuo mais adiante.",
 "Código do Samurai: manter a palavra, ajudar inocentes, não mentir, trapacear ou roubar; violar o código faz perder PM até o dia seguinte.",
 "Grito de Kiai: ao atacar corpo a corpo, pague 2 PM para rolar dois dados de ataque e ficar com o melhor; no acerto soma +1d4 de dano (aumenta nos níveis 5 e 9).",
 "Humana: bônus raciais FOR, DES e CON. Versátil concede Cavalgar treinado e Foco em Arma (katana); nenhum poder automático de Emanadora."
];
c.gear=[
 {name:"Katana ancestral de Acheron",rule:"DB 199 · Arma Ancestral (katana precisa)",detail:"Arma superior inicial da classe. 1 melhoria com valor total de até T$ 500. Adquire melhorias extras nos níveis 4, 6 e 8; encantamentos nos níveis 10 e 12. Não reproduz literalmente o poder cósmico da Nihilidade.",qty:"1",image:c.portrait.url,source:"https://jamboeditora.com.br/selos-literarios/dragao-brasil/",credit:"Ilustração do personagem; regras na Dragão Brasil 199"},
 {name:"Bainha cerimonial",rule:"Acessório narrativo",detail:"Serve às cenas de saque da katana; não oferece ataque extra nem vantagem mecânica gratuita.",qty:"1"},
 {name:"Uniforme de peregrina",rule:"Traje de viajante",detail:"Casaco e tons roxo-preto da versão original. Armadura leve padrão apenas se adquirida e vestida.",qty:"1"},
 {name:"Equipamento de viagem",rule:"Kit de aventureira",detail:"Itens ordinários conforme equipamentos e recursos iniciais permitidos pelo mestre.",qty:"1 conjunto"}
];
c.attacks=[
 {name:"Katana ancestral",test:"+6 no nível 1",damage:"1d8+4 corte",cost:"0 PM",detail:"Ataque básico da arma; usando FOR +4, treino de Luta +2. Modificadores específicos da melhoria precisam ser considerados em separado."},
 {name:"Grito de Kiai",test:"Dois dados de ataque, fica o melhor",damage:"Katana +1d4 (nível 1), +1d6 (5), +1d8 (9)",cost:"2 PM",detail:"Dano extra num acerto corpo a corpo e aumento por faixa de nível. É efeito oficial da classe, sem cortes existenciais."},
 {name:"Corte do Vácuo",test:"Ataque com katana",damage:"Dano convertido para essência",cost:"1 PM, após aprender",detail:"Poder Despertar Ancestral com arma precisa; alcance curto. Selecione legalmente o poder de Samurai e mantenha a melhoria exigida."}
];
const levels=[
 ["Arma Ancestral (1 melhoria) · Código do Samurai · Grito de Kiai 1d4","Primeira lâmina: uma katana precisa de custo permitido."],
 ["Ataque Disciplinado","Soma Sabedoria ao dano da arma ancestral (limitado pelo nível)."],
 ["Iaijutsu · Olhar Assustador +1 (automático)","Reação rápida e precisão na primeira rodada; exige Iniciativa treinada."],
 ["Corte da Correnteza · Arma Ancestral (2 melhorias)","Ataques de uma mão com outra livre ganham bônus críticos; escolha segunda melhoria."],
 ["Arma Reverberante · Grito de Kiai 1d6 (automático)","Pague +1 PM com Kiai na arma ancestral para outro dado."],
 ["Arma Veloz · Arma Ancestral (3 melhorias)","Um ataque adicional na ação agredir por 2 PM, uma vez por rodada."],
 ["Equilíbrio Interior","Uma nova chance em resultado natural 1, uma vez por teste."],
 ["Serenidade dos Kami · Arma Ancestral (4 melhorias)","PV temporários ao meditar; completar melhorias oficiais da arma."],
 ["Espírito Incisivo · Olhar Assustador +2 · Kiai 1d8","Melhora multiplicador crítico, presença e impacto do Kiai."],
 ["Despertar Ancestral: Corte do Vácuo · Arma Espiritual (1 encanto)","Katana precisa projeta um corte de essência; escolher primeiro encanto."],
 ["Aumento de Atributo (SAB)","Sabedoria reforça dano disciplinado e habilidades."],
 ["Kiai Estremecedor · Arma Espiritual (2 encantos)","Corte de Kiai pode derrubar inimigos conforme teste de Fortitude; segundo encanto."]
];
c.progression=levels.map((p,i)=>[String(i+1),...p]);
c.techniques=[
 {level:1,name:"Nihility Slash",mechanic:"Grito de Kiai",cost:"2 PM",effect:"Dois dados no teste de ataque e dano extra de Kiai em acerto; aplica somente dano permitido pela classe.",flavor:"Atravessar a paisagem com um único corte."},
 {level:3,name:"Unseen Moment",mechanic:"Iaijutsu",cost:"Passivo",effect:"SAB em Iniciativa e saque livre; bônus de primeira rodada segundo a habilidade.",flavor:"A lâmina parece ter sido sacada antes da percepção."},
 {level:5,name:"Crimson Fracture",mechanic:"Arma Reverberante",cost:"Grito de Kiai +1 PM",effect:"Dado adicional do Kiai quando utilizar a arma ancestral, conforme o poder.",flavor:"A cauda vermelha do golpe atravessa a penumbra."},
 {level:6,name:"Blade Beyond Time",mechanic:"Arma Veloz",cost:"2 PM",effect:"Um ataque adicional quando usa agredir com a katana ancestral, uma vez por rodada.",flavor:"Uma sequência de cortes se sobrepõe."},
 {level:10,name:"Void Severance",mechanic:"Despertar Ancestral — Corte do Vácuo",cost:"1 PM",effect:"Corte de alcance curto, dano de essência e pré-requisito de katana precisa.",flavor:"O vazio se manifesta como efeito mecânico controlado."},
 {level:12,name:"Final Requiem",mechanic:"Kiai Estremecedor",cost:"Grito de Kiai +1 PM",effect:"Os oponentes em alcance curto do alvo ficam caídos se falharem no teste de Fortitude.",flavor:"Uma reverberação derruba quem presencia a lâmina."}
];
c.notes={
 ...c.notes,
 overview:"Acheron utiliza oficialmente a classe OPCIONAL Samurai (DB 199), não Guerreiro. O Código é obrigatório nesta build e poderá gerar complicações narrativas.",
 attributes:"Compra de 10 pontos: CON 1, CAR 1, SAB 2, INT 0, FOR 3, DES 2; humano +1 em CON, FOR e DES. A classe exige treino em Luta e Vontade.",
 equipment:"A Arma Ancestral começa com uma melhoria e melhora nos níveis 4, 6, 8; encanta nos níveis 10 e 12. Visual de katana da Nihilidade, sem dano cósmico literal.",
 abilities:"Grito de Kiai custa 2 PM e rola dois dados no teste de ataque. Arma Veloz custa 2 PM para ataque adicional em ação agredir uma vez por rodada. Corte do Vácuo exige arma precisa.",
 progression:"Samurai da DB 199: 20+CON PV no nível 1, 5+CON por nível adicional e 3 PM por nível. A tabela inclui habilidades automáticas e um poder opcional escolhido em cada nível 2 a 12.",
 techniques:"A técnica é narrativa, o efeito mecânico é o poder da DB 199. Sem eliminar planetas, imortalidade ou alvos por simples ataque."
};
c.sources=[...c.sources.filter(s=>!/Tormenta20|Guerreiro/i.test(s.name)),{name:"Samurai — Dragão Brasil 199 (Jambô Editora)",url:"https://jamboeditora.com.br/selos-literarios/dragao-brasil/"}];
const use=[
 "No 1º nível receba katana ancestral com 1 melhoria e siga o Código. Grito de Kiai custa 2 PM por um ataque corpo a corpo especial.",
 "Ataque Disciplinado aplica SAB no dano da arma ancestral, com limite de nível. Exige SAB pelo menos +1.",
 "Iaijutsu soma SAB à Iniciativa, permite saque livre e bônus na primeira rodada conforme a rolagem; Olhar Assustador +1 é automático.",
 "Corte da Correnteza exige katana em uma mão e outra livre; maior ameaça de crítico, e a arma ancestral ganha segunda melhoria.",
 "Kiai cresce automaticamente a 1d6; Arma Reverberante pode acrescentar outro dado pelo custo extra de 1 PM.",
 "Arma Veloz: ao usar agredir com a katana ancestral, pague 2 PM por um ataque adicional, uma vez por rodada. Terceira melhoria.",
 "Equilíbrio Interior permite repetir um 1 natural, apenas uma vez por teste; Vontade é treinamento obrigatório.",
 "Serenidade dos Kami: ação de movimento e 3 PM por PV temporários igual nível + SAB. Quarta melhoria da katana.",
 "Kiai cresce a +1d8 e Olhar Assustador a +2; Espírito Incisivo melhora o multiplicador crítico.",
 "Com a melhoria Precisa, Corte do Vácuo permite gastar 1 PM para ataque de essência em alcance curto. Arma ganha um encanto.",
 "Aumento de Atributo em SAB adiciona +1; atualize bônus de Ataque Disciplinado, CD e percepção.",
 "Kiai Estremecedor pode derrubar oponentes perto do alvo (Fortitude evita); a arma ancestral recebe segundo encanto."
];
guide.people[c.id]={
 levels:c.progression.map(([n,power,why],i)=>({why,use:use[i],ref:[["db199","seção Samurai, tabela e poderes","Nível "+n+" — "+power],["core","cap. 3","Katana e melhorias"]]})),
 basics:[
 {name:"Arma Ancestral",why:"Representar a espada de Acheron com progressão oficial.",use:"Começa com katana superior e uma melhoria dentro do limite; novas melhorias aos níveis 4, 6 e 8; encantos nos níveis 10 e 12.",ref:[["db199","habilidade Arma Ancestral","Samurai"]]},
 {name:"Grito de Kiai",why:"Simular os cortes devastadores.",use:"Ao atacar corpo a corpo, 2 PM para rolar dois dados e usar o melhor. Se acertar, adiciona 1d4 dano inicialmente, 1d6 no nível 5 e 1d8 no 9.",ref:[["db199","habilidade Grito de Kiai","Samurai"]]},
 {name:"Código do Samurai",why:"É restrição mecânica obrigatória, não mera decoração temática.",use:"Manter promessas, não mentir, trapacear ou roubar e ajudar inocentes; violar o Código faz perder PM até o dia seguinte. O jogador e o mestre devem acertar sua interpretação para Acheron.",ref:[["db199","habilidade Código do Samurai","Samurai"]]},
 {name:"Corte do Vácuo",why:"Aproximar a Nihilidade sem inventar dano infinito.",use:"No nível 10 com katana precisa, pague 1 PM e projete corte de essência em alcance curto como Despertar Ancestral.",ref:[["db199","Despertar Ancestral — Corte do Vácuo","Samurai"]]}
]};
})();


/* heroes-custom.js */
/* O SISTEMA // Wave 3 — dossiês dos oito JoJos e quatro convidados.
   Poderes originais são adaptações narrativas, nunca mecânicas gratuitas. */
(()=>{
const data=window.T20_DATA, guides=window.T20_GUIDE;
if(!data||!guides)return;
const characters={"jojo-jonathan":{"hero":"Hamon","source":"https://jojowiki.com/Jonathan_Joestar","theme":"vitoriano · aço azul e ouro","bio":["Jonathan Joestar é o protagonista de Phantom Blood. Sua honra, força física e domínio do Hamon confrontam as ameaças sobrenaturais.","Em Tormenta20, a base Paladino representa bravura, disciplina, cura e golpes radiantes. Hamon é a aparência narrativa das capacidades da classe, sem dar dano solar gratuito."],"tags":["Sunlight Yellow Overdrive","Zoom Punch","Luck & Pluck","Hamon Breath"],"rules":["Golpe Divino","Cura pelas Mãos","Aura Sagrada","Virtude Paladinesca"],"gear":[["Espada Luck & Pluck","Espada longa","A espada de Jonathan funciona como espada longa regular; não ganha efeitos de Hamon sem habilidade correspondente."],["Luvas e uniforme vitoriano","Traje de viajante","Tecido azul, detalhes dourados e peças formais da Inglaterra vitoriana."]],"accent":"#e9c86d"},"jojo-joseph":{"hero":"Hamon estratégico","source":"https://jojowiki.com/Joseph_Joestar","theme":"enganos · roxo e cobre","bio":["Joseph Joestar protagoniza Battle Tendency e vence pelo improviso, humor e tática, além do Hamon.","Ladino cria brechas com Enganação, Emboscar e ataques oportunos; clackers e fios são armas e ferramentas existentes, não feitiços gratuitos."],"tags":["Clacker Volley","Seu Próximo Truque","Hamon Trap","Run Away"],"rules":["Ataque Furtivo","Mente Criminosa","Emboscar","Finta"],"gear":[["Clackers","Reflavor de armas de arremesso","Use dano, alcance e proficiência de arma oficial aprovada pelo mestre."],["Corda e armadilhas","Itens mundanos","Cordas e engenhocas precisam ser compradas e preparadas."]],"accent":"#d2a0ed"},"jojo-jotaro":{"hero":"Star Platinum","source":"https://jojowiki.com/Jotaro_Kujo","theme":"corrente · roxo e dourado","bio":["Jotaro Kujo conduz Stardust Crusaders. Star Platinum se destaca pela precisão, força, reflexos e rajadas de socos.","Guerreiro usa Ataque Especial, Golpe Pessoal e Ataque Extra para representar os golpes. Parar o tempo literalmente não está disponível nesta ficha."],"tags":["ORA ORA","Star Finger","Star Platinum","Time Stop (reflavor)"],"rules":["Ataque Especial","Golpe Pessoal","Ataque Extra","Durão"],"gear":[["Corrente do boné","Acessório narrativo","Não é arma adicional."],["Luvas de Star Platinum","Reflavor de arma marcial","Os ataques seguem a arma ou ataque desarmado equipado; não surgem ações de Stand."]],"accent":"#bda4ff"},"jojo-josuke4":{"hero":"Crazy Diamond","source":"https://jojowiki.com/Josuke_Higashikata","theme":"corações · vidro se recompondo","bio":["Josuke Higashikata protege Morioh em Diamond Is Unbreakable com Crazy Diamond, capaz de restaurar objetos e curar outras pessoas.","Paladino traduz esse cuidado em Cura pelas Mãos e Aura de Cura. A cura não revive mortos e consertar objetos depende de habilidade oficial ou autorização."],"tags":["Crazy Diamond","Dora Dora","Restoration","Protect Morioh"],"rules":["Cura pelas Mãos","Aura Sagrada","Golpe Divino","Aura de Cura"],"gear":[["Uniforme de Morioh","Traje formal azul-marinho","Corações dourados e pins: efeito visual."],["Cristal recomposto","Adereço de interpretação","Não repara outros objetos por conta própria."]],"accent":"#ff92bc"},"jojo-giorno":{"hero":"Gold Experience","source":"https://jojowiki.com/Giorno_Giovanna","theme":"dourado · joaninhas e folhas","bio":["Giorno Giovanna lidera Vento Aureo usando Gold Experience para gerar vida e recuperar aliados.","Druida oferece cura e interações com animais; efeitos de transformar objetos em seres vivos ou Gold Experience Requiem são apenas narrativos até haver regra equivalente."],"tags":["Gold Experience","Life Creation","Muda Muda","Golden Requiem (narrativo)"],"rules":["Empatia Selvagem","Companheiro Animal","Forma Selvagem","Magias de cura"],"gear":[["Broche de joaninha","Adereço de ouro","Marca visual, sem item mágico inicial."],["Pequeno ramo vivo","Componente narrativo","Vida conjurada apenas ao lançar magia ou usar poder apropriado."]],"accent":"#f4cb67"},"jojo-jolyne":{"hero":"Stone Free","source":"https://jojowiki.com/Jolyne_Cujoh","theme":"linhas entrelaçadas · verde oceano","bio":["Jolyne Cujoh protagoniza Stone Ocean e transforma parte do corpo em fios controláveis.","Ladina usa acrobacias, furtividade e cordas para imitar deslocamento, investigação e ataques surpresa. Os fios não ganham alcance infinito."],"tags":["Stone Free","Thread Trap","Mobius Strip","Yare Yare Dawa"],"rules":["Ataque Furtivo","Evasão","Acuidade com Arma","Emboscar"],"gear":[["Carretel de Stone Free","Corda e ferramentas","Corda oficial, alcance, cordas e testes normais."],["Uniforme verde com teias","Traje de viajante","Traço de fios cruzados sem proteção extra."]],"accent":"#7cdda3"},"jojo-johnny":{"hero":"Tusk / Spin","source":"https://jojowiki.com/Johnny_Joestar","theme":"unhas azuis · espiral dourada","bio":["Johnny Joestar é protagonista de Steel Ball Run e aprimora o Spin com Tusk, além de atuar como atirador montado.","Guerreiro usa arremessos, Ataque Especial e Golpe Pessoal. Suas unhas giratórias são um efeito visual aplicado às armas oficiais; as evoluções ACT não concedem habilidades gratuitas."],"tags":["Tusk ACT 1","Tusk ACT 2","Golden Rectangle","Tusk ACT 4"],"rules":["Estilo de Arremesso","Arremesso Múltiplo","Golpe Pessoal","Ataque Extra"],"gear":[["Projéteis de unhas","Azagaias leves (visual alternativo)","Adquira munição/armas pelas regras. Spin não atravessa defesas infinitas."],["Slow Dancer","Cavalo comum","Montaria é adquirida separadamente ou concedida pelo mestre; não fornece parceiro gratuito."]],"accent":"#98c7f8"},"jojo-gappy":{"hero":"Soft & Wet","source":"https://jojowiki.com/Josuke_Higashikata_(JoJolion)","theme":"bolhas · azul pérola","bio":["Josuke Higashikata de JoJolion é conhecido como Gappy e utiliza Soft & Wet, produzindo bolhas com efeitos variados.","Arcanista representa bolhas por ilusão, controle de área e Campo de Força. Roubos de características e Go Beyond exigem magia/poder equivalente; não são automáticos."],"tags":["Soft & Wet","Bubble Plunder","Go Beyond","Morioh Mystery"],"rules":["Magia Pungente","Campo de Força","Conhecimento Mágico","Magia Acelerada"],"gear":[["Bolhas de Soft & Wet","Efeitos de magia/bolhas","Não transferem atrito, visão ou som sem magia que suporte exatamente esse efeito."],["Uniforme de marinheiro","Traje comum azul","Visual canônico sem bônus mecânico."]],"accent":"#8edfe8"},"denji":{"hero":"Chainsaw Man","source":"https://chainsaw-man.fandom.com/wiki/Denji","theme":"serra · laranja enferrujado","bio":["Denji faz pactos e luta com motosserras em Chainsaw Man. Sobreviver e proteger pessoas são suas motivações.","Guerreiro representa os ataques frenéticos, Durão e Ataque Extra. Transformação e regeneração têm consequências narrativas: curar PV exige recursos de Tormenta20."],"tags":["Chainsaw Rev","Chainsaw Rush","Blood Fuel","Chainsaw Devil"],"rules":["Ataque Especial","Durão","Ataque Extra","Golpe Pessoal"],"gear":[["Lâminas de motosserra","Espadas de duas mãos (visual)","Arma oficial de aço, sem corte automático, dano adicional gratuito ou combustível de sangue."],["Cordão no peito","Adereço","Ativar apenas poderes legais da ficha, não transformação de chefe."]],"accent":"#eea247"},"satoru-gojo":{"hero":"Limitless / Six Eyes","source":"https://jujutsu-kaisen.fandom.com/wiki/Satoru_Gojo","theme":"azul espectral · infinito","bio":["Satoru Gojo é um feiticeiro de Jujutsu Kaisen que manipula o Limitless e os Six Eyes.","Arcanista prioriza Campo de Força, Velocidade, magia de dano e controle. Infinito nunca é invulnerabilidade automática; Domínio exige magia e limitações explícitas."],"tags":["Infinity","Blue","Red","Unlimited Void"],"rules":["Campo de Força","Fortalecimento Arcano","Magia Acelerada","Velocidade"],"gear":[["Venda dos Seis Olhos","Traje e adereço","Não concede percepção sobrenatural, PM infinito ou bônus automático."],["Esfera azul/vermelha","Efeitos de magias","Apresentação estética de magias oficiais aprendidas."]],"accent":"#8bcde8"},"shigaraki":{"hero":"Decay","source":"https://myheroacademia.fandom.com/wiki/Tomura_Shigaraki","theme":"desintegração · cinza e lilás","bio":["Tomura Shigaraki se torna uma das principais ameaças de My Hero Academia graças à individualidade Decay.","Arcanista simula desintegração com dano de magia e controle do terreno. Tocar em algo não elimina instantaneamente criaturas ou equipamentos."],"tags":["Decay","Fracture","Desintegration","Awakening"],"rules":["Magia Pungente","Conjurar Monstro","Conhecimento Mágico","Magia Acelerada"],"gear":[["Mãos de família","Adereço de traje","Componente visual, sem controle de aliados."],["Poeira cinzenta","Efeito arcano","Terreno difícil e dano exigem a magia correta."]],"accent":"#b8aac6"},"midoriya":{"hero":"One For All","source":"https://myheroacademia.fandom.com/wiki/Izuku_Midoriya","theme":"eletricidade verde · caderno de heróis","bio":["Izuku Midoriya, o Deku, recebe One For All e desenvolve um estilo heroico de combate físico.","Lutador usa Briga, Golpe Relâmpago, Trocação e recursos de mobilidade. O risco de lesão é narrativo: golpes não oferecem força ilimitada."],"tags":["Detroit Smash","Full Cowl","Blackwhip (reflavor)","One For All"],"rules":["Golpe Relâmpago","Atlético","Casca Grossa","Trocação"],"gear":[["Luvas verdes","Luvas de luta (adereço)","Defesa e dano dependem dos poderes e armas oficiais."],["Caderno de heróis","Livro comum","Observações úteis em interpretação, sem bônus constante."]],"accent":"#80e3a5"}};
const actionPlan={
 "Paladino":["Golpe Divino para ataque especial","Cura pelas Mãos para recuperar um aliado","Aura Sagrada para resistência e proteção","Julgamento Divino para pressionar ameaça","Bênção da Justiça e dano divino melhorado","Combate Defensivo contra inimigos fortes","Aura de Cura se adquirida e mantida","Virtude para disciplina e resistência","Foco em Arma e Golpe Divino mais forte","Melhoria de cura pelas mãos","Orar para aprender uma magia divina","Virtude adicional e suporte coletivo"],
 "Guerreiro":["Ataque Especial +4 por gasto de PM","Estilo de Duas Mãos em arma elegível","Durão como habilidade automática, Foco em Arma escolhido","Ataque Poderoso com penalidade no acerto","Golpe Pessoal com efeitos válidos e custo máximo","Ataque Extra automático por 2 PM","Aumento de Atributo no patamar correto","Poder de classe ou geral permitido","Ataque Especial +12 automático no 9º","Segundo Golpe Pessoal diferente do primeiro","Especialização em Arma para +2 dano","Mestre em Arma no 12º nível conforme pré-requisitos"],
 "Ladino":["Ataque Furtivo quando o alvo cumpre condições","Evasão automática e Acuidade em arma elegível","Mente Criminosa em Furtividade e Ladinagem","Finta Aprimorada e Esquiva Sobrenatural","Assassinar só após estudar alvo e gastar PM","Oportunismo consome PM para ataque de reação elegível","Aumento de Atributo no patamar correto","Enganar os Olhos e Olhos nas Costas se disponíveis","Ataque Furtivo aprimorado progressivamente","Emboscar na primeira rodada; Evasão Aprimorada automática","Foco em Arma para arma de escolha","Saque Rápido para equipar arma dentro das ações permitidas"],
 "Druida":["Devoto Fiel, Empatia Selvagem e magias","Forma Selvagem a partir do 2º nível","Companheiro Animal como parceiro, não NPC independente","Sentidos Aguçados em Percepção e rastreio","Ginete se combater montado","Forma Selvagem Aprimorada e magias de 2º círculo","Presas Afiadas apenas para armas naturais elegíveis","Companheiro Animal Aprimorado com limites de parceiro","Magia Natural para conjurar em Forma Selvagem","Magias do 3º círculo e aumento de atributo","Novo Aumento de Atributo se respeitar patamar","Forma Selvagem Superior no 12º nível"],
 "Arcanista":["Caminho de Arcanista e magias do 1º círculo","Poder Mágico para PM retroativos","Magia Pungente para aumentar CD mediante gasto","Conhecimento Mágico para mais magias conhecidas","Fortalecimento Arcano e acesso ao 2º círculo","Magia Acelerada pagando PM adicionais","Conhecimento Mágico para ampliar repertório","Aumento de Atributo no patamar","Magias de 3º círculo se conhecidas","Magia Discreta para conjurar com discrição","Mais Conhecimento Mágico dentro da progressão","Magia Ilimitada aumenta teto de gasto, não gera PM"],
 "Lutador":["Briga e Golpe Relâmpago por PM","Atlético aumenta mobilidade","Casca Grossa automática e Braços Calejados","Sarado para PV e Fortitude","Briga 1d8 e Rasteira","Trocação paga PM crescente após acertos","Aumento de Atributo em FOR","Punhos de Adamante para resistência física","Briga 1d10 e Golpe Imprudente","Trincado para dano com CON","Confiança dos Ringues concede PM temporários válidos","Sequência Destruidora exige anunciar golpes e pagar PM"]
};
const refs={
 "Paladino":"82–84","Guerreiro":"64–66","Ladino":"72–74","Druida":"61–63","Arcanista":"37–39","Lutador":"75–77"
};
for(const [id,p] of Object.entries(characters)){
 const c=data.characters.find(c=>c.id===id);if(!c)continue;
 c.excerpt=p.tags[0]+" // "+c.excerpt;
 c.history=p.bio;
 c.summary=p.bio[1]+" Atributos, dano, PM, itens, ações e pré-requisitos seguem Tormenta20.";
 c.info.role=p.hero+" · "+c.info.role;
 c._mega.description=p.theme+"; "+c._mega.description;
 c.notes.overview=p.bio[1];
 c.notes.abilities="Habilidades originais representadas somente por efeitos oficiais. "+p.tags.join(" • ")+". Consulte ações, custo de PM e pré-requisitos antes de ativar.";
 c.notes.equipment="Nenhum objeto icônico concede benefícios sem regras: "+p.gear.map(g=>g[0]).join("; ")+".";
 c.notes.progression="Construção 1–12 proposta com o chassi de "+c.info.className+" de Tormenta20. Os poderes listados como opcionais devem ser selecionados ao subir de nível; habilidades automáticas são recebidas conforme a classe.";
 c.notes.techniques=p.tags.join(" • ")+" são nomes narrativos para poderes com efeitos estritamente de Tormenta20.";
 c.gear.splice(0,1,...p.gear.map(([name,rule,detail])=>({name,rule,detail,qty:"1"})));
 c.attacks[0].name=p.tags[0];c.attacks[0].detail="Adaptação da técnica "+p.tags[0]+". "+(actionPlan[c.info.className]?.[0]||"Siga a classe.")+" Não aplica poderes de outra franquia gratuitamente.";
 c.techniques=p.tags.map((name,i)=>{
 const level=[1,3,6,10][i],power=c.progression[Math.min(level-1,c.progression.length-1)][1];
 return {level,name,mechanic:power,cost:"Conforme habilidade oficial",effect:(actionPlan[c.info.className]||[])[Math.min(level-1,11)]+". Nenhuma ação ou dano além do poder.",flavor:"Representação de "+p.hero+" no nível "+level+"."};
 });
 const rules=actionPlan[c.info.className]||Array(12).fill("Siga o livro.");
 const ref=refs[c.info.className]||"cap. 1";
 c._guide={
  levels:c.progression.map(([lv,power,description],i)=>({
   why:"Representar "+p.hero+" no estágio "+lv+" da evolução: "+(p.tags[Math.min(3,Math.floor(i/3))])+".",
   use:rules[i]+". "+description+". Se o poder ainda não foi escolhido ou faltar requisito, mantenha a técnica bloqueada.",
   ref:[["core",ref,"Classe "+c.info.className+" / "+power],["core","cap. 3–5","Equipamentos, PM, ações e resistências"]]
  })),
  basics:[
   {name:p.tags[0],why:p.bio[1],use:rules[0],ref:[["core",ref,"Habilidades iniciais de "+c.info.className]]},
   {name:p.gear[0][0],why:"Manter o visual do personagem sem itens gratuitos.",use:p.gear[0][2],ref:[["core","cap. 3","Equipamentos e proficiências"]]},
   {name:"Limite da adaptação",why:p.theme,use:"Não conceder invulnerabilidade, alteração de realidade, ressuscitação irrestrita ou novas ações sem poder específico e gasto de PM.",ref:[["core","cap. 5","Ações e combate"]]}
  ]
 };
 c.sources.unshift({name:p.hero+" — fonte da obra original",url:p.source});
 c.portrait={url:"./assets/portraits/"+id+".svg",credit:"Pôster tipográfico original de O Sistema; não é arte oficial",page:p.source};
 c.media=[{name:c.name+" — representação artística",image:c.portrait.url,source:p.source,credit:c.portrait.credit}];
}
})();

/* d-salvage.js */
/* D. — correção visual definitiva: gambiarra de rua, NÃO cyberskeleton.
   A imagem é uma ilustração original gerada para este projeto, hospedada no próprio GitHub Pages. */
(()=>{
const c=window.T20_DATA?.characters?.find(x=>x.id==="d");if(!c)return;
const original=c.portrait?.url;
const asset="./assets/portraits/d-salvage.avif";
c.portrait={url:asset,credit:"Ilustração original para O Sistema: armadura improvisada de sucata local, gerada digitalmente",page:"https://github.com/felipegoncales05-pixel/T20-Guia-das-Fichas"};
c.excerpt="SCRAPFRAME // WASTELAND RIG • proteção improvisada soldada nas ruas, nunca cyberskeleton militar.";
c.label="STREET-RIG // SALVAGE ARMOR";
c.info.role="Netrunner · reparos de rua · armadura de sucata improvisada";
c.summary+=" A vestimenta final de D. é uma gambiarra de peças locais: placas irregulares parafusadas, cintas de contenção, cabos reutilizados, módulos pequenos e metal riscado; não é o cyberskeleton de David Martinez.";
c.history.push("Protocolo de equipamento: o traje de D. foi montado com sucata disponível, peças de origem diferente e reparos de Capri. Possui silhueta ágil e remendada; nenhum módulo militar de exoesqueleto pesado ou cyberskeleton faz parte do design final.");
c.notes.equipment+=" A armadura final é sucata local reaproveitada. Não é o cyberskeleton de David ou um exoesqueleto militar de fábrica.";
const gear=c.gear?.find(x=>/traje|armadura|exoesqueleto|cyberskeleton|cromo/i.test(x.name+" "+x.rule+" "+x.detail));
if(gear){
 gear.name="Scrapframe // armadura da Capri";
 gear.rule="Visual de armadura improvisada · regras de equipamento escolhido";
 gear.detail="Placas metálicas desiguais, peças mecânicas reaproveitadas, fitas, soldas visíveis, marcas amarelas gastas e cabos azulados. A estética de sucata não fornece Defesa adicional; aplique somente bônus de equipamento legal comprado ou construído.";
 gear.image=asset;gear.source=c.portrait.page;gear.credit=c.portrait.credit;
}else c.gear?.unshift({name:"Scrapframe // armadura da Capri",rule:"Visual improvisado; não é cyberskeleton",detail:"Sucata local e módulos consertados, sem bônus automáticos de armadura.",qty:"1",image:asset,source:c.portrait.page,credit:c.portrait.credit});
c.media=[{name:"D. — Scrapframe feito de sucata local",image:asset,source:c.portrait.page,credit:c.portrait.credit},...(c.media||[]).filter(x=>x.image!==original)];
c.sources.push({name:"Arte original da armadura Scrapframe neste projeto",url:c.portrait.page});
})();


/* user-gallery.js */
/* O SISTEMA // Ilustrações que o narrador enviou (2026-11-19).
   Ordem vinculada literalmente à lista fornecida: Dio, DIO, D., Valentine,
   Gyro, Pucci, Kira, Tooru, Diavolo, Zandar One Kuwabara.
   PNGs originais ficam no repositório, e o site usa WebPs locais otimizados. */
(()=>{
const data=window.T20_DATA;if(!data)return;
const ids=["jojo-dio1","jojo-dio3","d","jojo-valentine","gyro","jojo-pucci","jojo-kira","jojo-tooru","jojo-diavolo","em-zandar"];
const folder="https://github.com/felipegoncales05-pixel/T20-Guia-das-Fichas/tree/main/assets/art";
for(const id of ids){
 const c=data.characters.find(c=>c.id===id);if(!c)continue;
 const previous=c.portrait?.url;
 const image="./assets/art-optimized/"+id+".webp";
 const credit="Imagem fornecida pelo usuário para esta ficha; autoria original não identificada";
 c.portrait={url:image,credit,page:folder};
 c.media=[{name:c.name+" — arte escolhida pelo usuário",image,source:folder,credit},
   ...(c.media||[]).filter(m=>m.image!==image)];
 for(const gear of c.gear||[]){
  if(gear.image===previous&&id!=="d"){
   gear.image=image;gear.source=folder;gear.credit=credit;
  }
 }
 if(!c.sources.some(s=>s.url===folder))c.sources.push({name:"Ilustrações enviadas para O Sistema — acervo do site",url:folder});
}
window.T20_USER_ART_IDS=ids;
})();

/* local-media.js */
/* Retratos recuperados e otimizados para carregamento local.
   Proveniência, URL original e créditos: assets/card-art/sources.json. */
(()=>{
  const data=window.T20_DATA;if(!data)return;
  const ids=["david","cipher","rentarou","yoru","diego","ado","cyrene","marin","makima","optimus","yuta","goku",
    "hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine","hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae",
    "em-herta","em-acheron","elster"];
  const overrides={
    optimus:{credit:"Render de Optimus Prime Beast Hunters por Barricade24 · DeviantArt",page:"https://www.deviantart.com/barricade24/art/Optimus-Prime-Prime-Beast-Hunters-Promo-655061791"},
    "diego-alternative":{credit:"Diego paralelo e THE WORLD · All-Star Battle R, via JoJo Wiki",page:"https://jojowiki.com/File:Alternate_World_Diego_ASBR.png"}
  };
  function use(c,key){
    if(!c)return;
    const old=c.portrait?.url;
    const img="./assets/card-art/"+key+".webp";
    const extra=overrides[key]||{};
    c.portrait={...c.portrait,url:img,credit:extra.credit||c.portrait.credit,page:extra.page||c.portrait.page};
    for(const m of c.media||[])if(m.image===old){m.image=img;if(extra.credit)m.credit=extra.credit;if(extra.page)m.source=extra.page}
    for(const g of c.gear||[])if(g.image===old){g.image=img;if(extra.credit)g.credit=extra.credit;if(extra.page)g.source=extra.page}
  }
  for(const id of ids)use(data.characters.find(c=>c.id===id),id);
  use(window.T20_ALTERNATES?.diego?.alternative,"diego-alternative");
  for(const id of ["gt","daima","super"])use(window.T20_GOKU_VARIANTS?.[id],"goku-"+id);
  window.T20_LOCAL_MEDIA_IDS=[...ids,"diego-alternative","goku-gt","goku-daima","goku-super"];
})();

