/* Regras usadas pelos dossiês da expansão IX. Consultar a edição indicada. */
(()=>{
 "use strict";
 const rules=window.T20_RULES;
 const source=(book,page,section)=>({book,page,section,url:rules.books.find(item=>item.id===book).url});
 const core=(page,name)=>source("jda-1.3",page,name);
 const addPower=(id,name,classId,page,action,cost,effect,limit,requires={})=>{
  rules.abilities[id]={name,classId,kind:"poder",source:core(page,name),requires,
   manual:{action,cost,effect,limit,example:effect}};
 };
 const general=(id,name,page,action,cost,effect,requires)=>addPower(id,name,"geral",page,action,cost,effect,"Aplique nas condições descritas e com o equipamento correspondente.",requires);
 general("estilo-arma-escudo","Estilo de Arma e Escudo","125","Enquanto empunhar escudo","Passivo","Aumenta em 2 o bônus de Defesa do escudo.",{skills:["Luta"],shield:true});
 general("estilo-arma-longa","Estilo de Arma Longa","125","Com arma alongada","Passivo","Melhora o ataque com arma alongada em +2 e permite atacar adjacentes.",{attributes:{FOR:1},skills:["Luta"]});
 general("estilo-disparo","Estilo de Disparo","124–125","Ao causar dano com arma de disparo","Passivo","Soma Destreza ao dano da arma de disparo.",{skills:["Pontaria"]});
 general("disparo-preciso","Disparo Preciso","125","Ao disparar contra alvo engajado","Passivo","Retira a penalidade de –5 por disparar contra alvo em combate corpo a corpo.",{powers:["estilo-disparo"]});
 general("acuidade-arma","Acuidade com Arma","124","Com arma leve, ágil ou de arremesso","Passivo","Permite usar Destreza em vez de Força nos ataques corpo a corpo e os de arremesso aplicáveis.",{attributes:{DES:1}});
 general("reflexos-combate","Reflexos de Combate","128","No primeiro turno","Passivo","Oferece uma ação de movimento extra na primeira rodada.",{attributes:{DES:1}});
 general("vitalidade","Vitalidade","129","Ao calcular PV e Fortitude","Passivo","+1 PV por nível de personagem e +2 em Fortitude.",{attributes:{CON:1}});
 general("esquiva","Esquiva","126","Para evitar golpes e efeitos de área","Passivo","+2 em Defesa e Reflexos.",{attributes:{DES:1}});
 general("ataque-poderoso","Ataque Poderoso","124","Antes de ataque corpo a corpo","Passivo","Pode trocar 2 de acerto por 5 de dano.",{attributes:{FOR:1}});
 addPower("arqueiro","Arqueiro","guerreiro","65","Com arma de ataque à distância","Passivo","Soma Sabedoria ao dano, limitada pelo nível de Guerreiro.","Use apenas enquanto empunhar uma arma à distância.",{attributes:{SAB:1}});
 addPower("especializacao-armadura","Especialização em Armadura","guerreiro","65","Enquanto usar armadura pesada","Passivo","Recebe RD 5.","Exige armadura pesada de fato equipada.",{classLevel:12});
 addPower("maos-rapidas","Mãos Rápidas","ladino","73","Ao usar Ladinagem para tarefas compatíveis","1 PM","Faz uma das tarefas descritas de Ladinagem como ação livre.","Uma vez por rodada.",{attributes:{DES:2},skills:["Ladinagem"]});
 addPower("oportunismo","Oportunismo","ladino","73","Quando um aliado causa dano a um inimigo adjacente","2 PM","Faz um ataque corpo a corpo contra esse inimigo.","Uma vez por rodada.",{classLevel:6});
 addPower("roubo-mana","Roubo de Mana","ladino","73","Ao acertar Ataque Furtivo","Passivo","A vítima perde PM, se os tiver, e você recebe PM temporários de acordo com os dados de Ataque Furtivo.","Uma vez por cena.");
 addPower("escriba-arcano","Escriba Arcano","arcanista","38","Durante estudo com texto arcano","T$ e tempo de estudo","Permite aprender uma magia registrando-a a partir de um grimório ou pergaminho.","Exige caminho Mago e treino em Ofício (escriba).",{path:"mago",skills:["Ofício (escriba)"]});
 addPower("contramagica-aprimorada","Contramágica Aprimorada","arcanista","38","Como reação","Custo da contramágica","Permite uma contramágica por rodada como reação.","Exige conhecer Dissipar Magia.",{spell:"Dissipar Magia"});
 addPower("magia-discreta","Magia Discreta","geral","131","Ao lançar uma magia","Aprimoramento de +2 PM","Dispensa gestos e palavras na execução.","Continua sujeita ao custo, alcance e resistência da magia.",{caster:true});
 // O texto e os requisitos dos poderes usados abaixo seguem a edição Jogo do Ano v1.3.
 const skills={emboscar:["Furtividade"],sombra:["Furtividade"],"velocidade-ladina":["Iniciativa"],"rolamento-defensivo":["Reflexos"]};
 for(const [id,trained] of Object.entries(skills))rules.abilities[id].requires={...rules.abilities[id].requires,skills:trained};
 rules.abilities["foco-vital"].requires={path:"bruxo"};
 rules.abilities["raio-arcano"].manual.limit="Reflexos reduz à metade (CD Int). É um poder de classe, sem benefícios de Briga.";
 rules.abilities["especialista-escola"].manual.effect="Aumenta em 2 a CD de magias da escola escolhida.";

 const race=(name,page,modifiers,movement,tag,note,extra={})=>({
  name,source:core(page,name),modifiers,movement,tag,note,...extra
 });
 const elemental=(name,element,damage,spell)=>race(name,"26",{CAR:2,INT:1,SAB:-1},9,
  "Desejos · Resistência Elemental · Tatuagem Mística",
  "Ascendência de "+element+": RD 10 a "+damage+". A tatuagem permite lançar "+spell+" (CAR), usando o custo da magia. Desejos depende de pedido genuíno de outra criatura.",{racialSpell:spell});
 const golem=(name,modifiers,movement,chassis,energy,extra={})=>({
  name,source:source("ameacas","134–135",name),modifiers,movement,noOrigin:true,
  tag:"Chassi · Tamanho · Criatura Artificial · Fonte de Energia · Propósito de Criação",
  note:chassis+" "+energy+" Construto. não usa cura mundana nem itens de alimentação. Use Ofício (artesão) para cuidados prolongados e recarregue inerte por oito horas.",...extra
 });
 Object.assign(rules.races,{
  anao:race("Anão","21",{CON:2,SAB:1,DES:-1},6,"Conhecimento das Rochas · Duro como Pedra · Tradição de Heredrimm","Correção de PV racial incluída. As armas tradicionais contam como simples. Armadura e carga não diminuem os 6 m.",{pvAtFirst:3,pvPerLaterLevel:1}),
  elfo:race("Elfo","23",{INT:2,DES:1,CON:-1},12,"Graça de Glórienn · Sangue Feérico · Sentidos Élficos","Maior deslocamento e afinidade arcana. Sangue Feérico dá +1 PM por nível.",{pmPerLevel:1}),
  dahllan:race("Dahllan","22",{SAB:2,DES:1,INT:-1},9,"Amiga das Plantas · Armadura de Allihanna · Empatia Selvagem","Pode lançar Controlar Plantas (SAB) por Amiga das Plantas. Armadura de Allihanna requer ação de movimento e 1 PM, com duração de cena."),
  "qareen-agua":elemental("Qareen da Água","água","frio","Névoa"),
  "qareen-ar":elemental("Qareen do Ar","ar","eletricidade","Toque Chocante"),
  "qareen-terra":elemental("Qareen da Terra","terra","ácido","Curar Ferimentos"),
  "qareen-fogo":elemental("Qareen do Fogo","fogo","fogo","Explosão de Chamas"),
  minotauro:race("Minotauro","25",{FOR:2,CON:1,SAB:-1},9,"Chifres · Couro Rígido · Faro · Medo de Altura","Tem arma natural e Defesa racial. Respeite penalidade de altura e condição dos ataques com chifres.",{defense:1}),
  kliren:race("Kliren","28",{INT:2,CAR:1,FOR:-1},9,"Engenhosidade · Híbrido · Ossos Frágeis · Vanguardista","Vanguardista treina um Ofício. Engenhosidade usa INT em teste permitido por 2 PM, exceto ataque. Impacto causa 1 ponto de dano a mais por dado."),
  goblin:race("Goblin","23",{DES:2,INT:1,CAR:-1},9,"Engenhoso · Espelunqueiro · Peste Esguia · Rato das Ruas","Pequeno. Ganha escalada e usa Ofício com a condição de ferramentas prevista para Engenhoso.",{size:"Pequeno"}),
  lefou:race("Lefou","24",{FOR:1,DES:1,CON:1,CAR:-1},9,"Cria da Tormenta · Deformidade","A versão escolhe +1 em FOR, DES e CON. Deformidade aplica +2 a Atletismo e Intimidação no modelo proposto; poderes da Tormenta seguem suas regras."),
  hynne:race("Hynne","27",{DES:2,CAR:1,FOR:-1},6,"Arremessador · Pequeno e Rechonchudo · Sorte Salvadora","Pequeno. Sorte Salvadora repete uma resistência por 1 PM, usando o segundo resultado.",{size:"Pequeno"}),
  osteon:race("Osteon","29",{DES:1,INT:1,SAB:1,CON:-1},9,"Armadura Óssea · Memória Póstuma · Natureza Esquelética · Preço da Não Vida","Memória Póstuma nesta build treina Acrobacia. RD 5 contra corte, frio e perfuração. Cura mágica de luz causa dano e trevas recuperam PV."),
  aggelus:race("Suraggel (Aggelus)","30–31",{SAB:2,CAR:1},9,"Herança Divina · Luz Sagrada","Visão no escuro e bônus em Intuição/Diplomacia. Pode lançar Luz (CAR), pagando PM."),
  sulfure:race("Suraggel (Sulfure)","30–31",{DES:2,INT:1},9,"Herança Divina · Sombras Profanas","Visão no escuro, bônus em Enganação/Furtividade e Escuridão (INT) como magia racial."),
  "moreau-leao":{
   name:"Moreau do Leão",source:source("ameacas","303–305","Herança do Leão"),modifiers:{FOR:1,CON:1,DES:1},movement:9,
   tag:"Mordida · Rugido Imponente · Sentidos da Realeza",
   note:"Herança do Leão. Use Rugido Imponente com ação de movimento e 1 PM. A mordida é arma natural e segue custo e limites próprios."
  },
  "golem-ferro-grande":golem("Golem de Ferro (Grande)",{FOR:1,CON:1,DES:-1},6,
   "Chassi de ferro, tamanho Grande; +2 de Defesa do chassi e penalidade de armadura de 2.",
   "Fonte de Vapor: imunidade a fogo, lentidão por frio e cone de vapor sujeito a ação e PM.",{size:"Grande",defense:2}),
  "golem-bronze-v":golem("Golem de Bronze (FOR/DES)",{FOR:1,DES:1},9,
   "Chassi de bronze Médio; armadura é removível e conta no limite de itens vestidos.",
   "Fonte Alquímica: usar ação padrão para ingerir item alquímico e recuperar 1 PM."),
  "golem-bronze-n":golem("Golem de Bronze (FOR/CON)",{FOR:1,CON:1},9,
   "Chassi de bronze Médio; carga e armadura não reduzem o deslocamento.",
   "Fonte Elemental de ar: imunidade a eletricidade e recuperação por dano mágico desse tipo."),
  "golem-bronze-uzi":golem("Golem de Bronze (Pequeno)",{DES:1,INT:1,CON:1},9,
   "Chassi de bronze com +1 INT e CON. Tamanho Pequeno acrescenta +1 DES.",
   "Fonte Elemental de ar: imunidade a eletricidade. As técnicas do Solver vêm das magias.",{size:"Pequeno"}),
  "golem-espelhos":golem("Golem de Espelhos",{CAR:2,SAB:1,CON:-1},9,
   "Chassi de Espelhos Médio. Imita uma habilidade vista em alcance curto por 1 PM até o fim do próximo turno.",
   "Fonte Elemental de ar: imunidade a eletricidade. Se a habilidade espelhada usar um atributo, use CAR.")
 });
 Object.assign(rules.races.humano,{
  movement:9,tag:"Versátil · três atributos diferentes +1",
  note:"Versátil é aplicado como treinamento em duas perícias indicadas na ficha."
 });
 Object.assign(rules.origins,{
  taverneiro:{name:"Taverneiro",choices:["Diplomacia","Jogatina","Ofício (cozinheiro)","Gororoba","Proficiência","Vitalidade"],source:core("95","Taverneiro")},
  artista:{name:"Artista",choices:["Atuação","Enganação","Atraente","Dom Artístico","Sortudo","Torcida"],source:core("89","Artista")}
 });
 rules.books.find(book=>book.id==="ameacas").status="parcial";

 const spellRows=[
  ["seta","Seta Infalível de Talude",1,"evocacao","203–204","Ataque à distância de essência sem rolagem de ataque, conforme o número de setas."],
  ["chamas","Explosão de Chamas",1,"evocacao","191","Conjure fogo em cone e permita Reflexos."],
  ["choque","Toque Chocante",1,"evocacao","208","Aplica dano elétrico em alvo tocado, com Fortitude."],
  ["armadura","Armadura Arcana",1,"abjuracao","181","Proteja-se com bônus de Defesa durante a cena."],
  ["nevoa","Névoa",1,"convocacao","197–198","Use camuflagem da névoa para esconder movimento."],
  ["area","Área Escorregadia",1,"convocacao","180–181","Cria terreno escorregadio; resolve quedas com Reflexos e passagem com Acrobacia."],
  ["teia","Teia",1,"convocacao","206–207","Prende e dificulta o movimento na área da teia."],
  ["ilusion","Criar Ilusão",1,"ilusao","186","Projeta uma imagem ou som. A ilusão respeita alcance, duração, interação e teste."],
  ["disfarce","Disfarce Ilusório",1,"ilusao","189","Muda a aparência percebida dentro dos limites da magia."],
  ["espelhos","Imagem Espelhada",1,"ilusao","194","Cria duplicatas para dificultar ataques contra você."],
  ["leque","Leque Cromático",1,"ilusao","196","Afeta criaturas próximas conforme os resultados de Vontade."],
  ["hipnose","Hipnotismo",1,"encantamento","193–194","Desvia a atenção de alvos suscetíveis com teste de Vontade."],
  ["sono","Sono",1,"encantamento","205–206","Usa Vontade para resolver sonolência ou sono conforme a versão."],
  ["adaga","Adaga Mental",1,"encantamento","178–179","Pressão mental em alvo com teste de Vontade."],
  ["alarme","Alarme",1,"abjuracao","179","Prepare um perímetro que alerta sobre intrusão."],
  ["alastrar","Amedrontar",1,"necromancia","180","Abala ou amedronta conforme o teste e os limites da magia."],
  ["raio-fraco","Raio do Enfraquecimento",1,"necromancia","201","Enfraquece o alvo com teste de Fortitude."],
  ["objeto","Criar Objetos",1,"transmutacao","187","Produz um objeto mundano temporário dentro das regras da magia."],
  ["monstro","Conjurar Monstro",1,"convocacao","184–185","Cria um auxiliar temporário com ações, alcance e controle definidos na magia."],
  ["campo","Campo de Força",2,"abjuracao","182","Protege com PV temporários ou a versão reativa se escolhida e paga."],
  ["saltar","Salto Dimensional",2,"convocacao","203","Desloca-se por magia para ponto permitido, dentro do alcance."],
  ["amarras","Amarras Etéreas",2,"convocacao","180","Usa laços mágicos para conter criaturas dentro do teste previsto."],
  ["uivantes","Sopro das Uivantes",2,"evocacao","205","Dano de frio em cone com teste de Fortitude e condições conforme a magia."],
  ["relampago","Relâmpago",2,"evocacao","201","Dano elétrico em linha com Reflexos para reduzir o dano."],
  ["bola","Bola de Fogo",2,"evocacao","182","Escolha a área de explosão e permita Reflexos para metade."],
  ["dissipar","Dissipar Magia",2,"abjuracao","189–190","Encerra efeito válido com o teste previsto ou serve para contramágica."],
  ["velocidade","Velocidade",2,"transmutacao","209","Sustenta ação padrão adicional que não pode lançar magias."],
  ["invis","Invisibilidade",2,"ilusao","195","Oculta o alvo até a condição de término indicada pela magia."],
  ["camuflagem","Camuflagem Ilusória",2,"ilusao","182","Dificulta acertar a criatura por camuflagem."],
  ["aparencia","Aparência Perfeita",2,"ilusao","180","Modifica a presença social pela duração da magia."],
  ["sussurros","Sussurros Insanos",2,"encantamento","206","Perturba a percepção de alvos suscetíveis a efeitos mentais."],
  ["desespero","Desespero Esmagador",2,"encantamento","188","Desmoraliza alvos na área quando falham em Vontade."],
  ["vampirico","Toque Vampírico",2,"necromancia","208","Resolve dano de trevas e recuperação conforme o resultado de Fortitude."],
  ["flecha-acida","Flecha Ácida",2,"evocacao","192","Projétil ácido com dano imediato e dano subsequente no alvo válido."],
  ["servo","Servo Morto-Vivo",2,"necromancia","204","Anima um lacaio temporário pelas regras de parceiro."],
  ["metamorfose","Metamorfose",2,"transmutacao","197","Adota forma animal válida, usando somente os ajustes descritos."],
  ["voo","Voo",3,"transmutacao","210","Concede deslocamento de voo de 12 m pela duração da magia."],
  ["telecinesia","Telecinesia",3,"transmutacao","207","Move ou arremessa objetos e criaturas, dentro dos testes e limites da magia."],
  ["miragem","Miragem",3,"ilusao","197","Encobre uma área com ilusão de cenário; interação pode revelar a farsa."],
  ["ilacerante","Ilusão Lacerante",3,"ilusao","194","Usa imagem cortante em área, com resistência de Vontade."],
  ["imobilizar","Imobilizar",3,"encantamento","194–195","Paralisa alvo suscetível enquanto as condições da magia forem atendidas."],
  ["deteccao","Dificultar Detecção",3,"abjuracao","191","Evita tentativas de detectar ou observar o alvo conforme as condições da magia."]
 ];
 rules.cosmosSpells=Object.fromEntries(spellRows.map(([id,name,circle,school,page,how])=>
  [id,{name,circle,school,source:"Jogo do Ano v1.3, p. "+page,how}]));
})();
