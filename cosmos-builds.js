/* Progressões de mesa da expansão IX, no mesmo modelo de ficha dos dossiês anteriores. */
(()=>{
 "use strict";
 const w=window,engine=w.T20_BUILD_ENGINE,rules=w.T20_RULES;
 const templates={
  guarda:["guerreiro","forte","machado","estilo-arma-escudo solidez especializacao-arma golpe-pessoal ataque-reflexo romper-resistencias impeto golpe-raspao valentao tornado-dor especializacao-armadura"],
  escudo:["guerreiro","forte","longa","ataque-reflexo estilo-arma-escudo solidez golpe-pessoal especializacao-arma impeto valentao romper-resistencias golpe-raspao tornado-dor especializacao-armadura"],
  lancas:["guerreiro","forte","alabarda","estilo-arma-longa ataque-reflexo destruidor golpe-pessoal impeto valentao especializacao-arma romper-resistencias tornado-dor golpe-raspao especializacao-armadura"],
  quebra:["guerreiro","forte","marreta","destruidor ataque-poderoso especializacao-arma golpe-pessoal golpe-raspao impeto romper-resistencias tornado-dor valentao ataque-reflexo especializacao-armadura"],
  lamina:["guerreiro","agil","florete","acuidade-arma esgrimista especializacao-arma golpe-pessoal ataque-reflexo valentao impeto romper-resistencias golpe-raspao tornado-dor esquiva"],
  arco:["guerreiro","arqueiro","arco","estilo-disparo disparo-preciso arqueiro golpe-pessoal especializacao-arma impeto reflexos-combate romper-resistencias valentao golpe-raspao esquiva"],
  punhos:["lutador","forte","desarmado","ate-acertar bracos-calejados sarado golpe-imprudente trocacao voadora punhos-adamante confianca-ringues golpe-baixo rasteira convencido"],
  pressao:["lutador","forte","desarmado","voadora golpe-imprudente ate-acertar cabecada trocacao sarado punhos-adamante bracos-calejados confianca-ringues golpe-baixo rasteira"],
  muralha:["lutador","forte","desarmado","bracos-calejados sarado lutador-chao rasteira golpe-baixo ate-acertar punhos-adamante confianca-ringues trocacao cabecada convencido"],
  arrancada:["lutador","agil","desarmado","voadora bracos-calejados rasteira ate-acertar trocacao golpe-imprudente punhos-adamante confianca-ringues cabecada golpe-baixo esquiva"],
  rua:["ladino","agil","adaga","acuidade-arma maos-rapidas sombra assassinar velocidade-ladina rolamento-defensivo escapista gatuno emboscar oportunismo esquiva"],
  cronista:["ladino","agil","besta","escapista mente-criminosa sombra velocidade-ladina gatuno rolamento-defensivo maos-rapidas emboscar estilo-disparo disparo-preciso esquiva"],
  invasao:["ladino","agil","adaga","maos-rapidas sombra acuidade-arma velocidade-ladina mente-criminosa rolamento-defensivo escapista gatuno emboscar reflexos-combate esquiva","ventanista"],
  barreira:["arcanista","arcano","grimorio","especialista-escola poder-magico raio-arcano fortalecimento-arcano magia-pungente conhecimento-magico raio-poderoso contramagica-aprimorada fluxo-mana magia-discreta esquiva","mago","barreira","Abjuração"],
  esfera:["arcanista","arcano","foco","raio-arcano raio-elemental arcano-batalha raio-poderoso fortalecimento-arcano foco-vital magia-pungente especialista-escola fluxo-mana poder-magico esquiva","bruxo","esfera","Evocação"],
  gelo:["arcanista","arcano","foco","raio-arcano raio-elemental raio-poderoso fortalecimento-arcano arcano-batalha especialista-escola foco-vital magia-pungente fluxo-mana poder-magico esquiva","bruxo","gelo","Evocação"],
  mente:["arcanista","arcano","grimorio","especialista-escola poder-magico magia-pungente fortalecimento-arcano conhecimento-magico magia-discreta raio-arcano contramagica-aprimorada fluxo-mana raio-poderoso esquiva","mago","mente","Encantamento"],
  ilusao:["arcanista","arcano","grimorio","especialista-escola magia-pungente poder-magico fortalecimento-arcano conhecimento-magico magia-discreta envolto-misterio contramagica-aprimorada fluxo-mana raio-arcano esquiva","mago","ilusao","Ilusão"],
  tumulo:["arcanista","arcano","foco","raio-arcano raio-elemental poder-magico fortalecimento-arcano foco-vital especialista-escola magia-pungente raio-poderoso fluxo-mana magia-discreta esquiva","bruxo","tumulo","Necromancia"],
  botica:["arcanista","arcano","grimorio","especialista-escola poder-magico magia-pungente fortalecimento-arcano conhecimento-magico raio-arcano raio-poderoso contramagica-aprimorada fluxo-mana magia-discreta esquiva","mago","botica","Abjuração"],
  artificio:["arcanista","arcano","foco","raio-arcano raio-poderoso especialista-escola fortalecimento-arcano arcano-batalha foco-vital poder-magico magia-pungente fluxo-mana magia-discreta esquiva","bruxo","artificio","Transmutação"],
  ossos:["arcanista","arcano","grimorio","poder-magico especialista-escola raio-arcano fortalecimento-arcano magia-pungente raio-poderoso magia-discreta contramagica-aprimorada fluxo-mana arcano-batalha esquiva","mago","ossos","Convocação"]
 };
 const abilityScores={
  forte:[3,2,2,0,1,1],agil:[1,3,1,2,1,1],arqueiro:[1,4,1,0,1,0],arcano:[0,2,2,3,1,1]
 };
 const loadouts={
  machado:{weapon:"Machado de batalha",die:"1d8",shield:true},
  longa:{weapon:"Espada longa",die:"1d8",shield:true},
  alabarda:{weapon:"Alabarda",die:"1d10",hands:"duas mãos"},
  marreta:{weapon:"Marreta",die:"3d4",hands:"duas mãos"},
  florete:{weapon:"Florete",die:"1d6",agile:true},
  arco:{weapon:"Arco longo",die:"1d8",ranged:true,hands:"duas mãos"},
  adaga:{weapon:"Adaga",die:"1d4",agile:true},
  besta:{weapon:"Besta leve",die:"1d8",ranged:true,hands:"duas mãos"},
  desarmado:{weapon:"Ataque desarmado",die:"1d6"},
  grimorio:{weapon:"Bordão",die:"1d6",caster:true,hands:"duas mãos"},
  foco:{weapon:"Adaga",die:"1d4",caster:true}
 };
 // Cada pacote de magia indica o círculo da aprendizagem regular. Magos também
 // aprendem uma adicional no 1º e quando abrem novo círculo.
 const repertoires={
  barreira:["armadura area seta espelhos alarme nevoa teia","campo dissipar amarras saltar invis","voo deteccao telecinesia imobilizar miragem","disfarce velocidade"],
  esfera:["seta choque chamas armadura nevoa teia","relampago campo bola saltar velocidade","voo telecinesia ilacerante imobilizar"],
  gelo:["seta nevoa area armadura teia espelhos","uivantes campo amarras saltar dissipar","voo telecinesia imobilizar ilacerante"],
  mente:["adaga hipnose sono armadura espelhos seta ilusion","sussurros desespero campo dissipar saltar","imobilizar miragem ilacerante voo telecinesia","disfarce camuflagem"],
  ilusao:["ilusion espelhos leque disfarce sono armadura seta","camuflagem invis campo dissipar aparencia","miragem ilacerante voo imobilizar telecinesia","hipnose sussurros"],
  tumulo:["raio-fraco alastrar seta armadura nevoa teia","vampirico amarras campo saltar dissipar","imobilizar ilacerante voo telecinesia"],
  botica:["armadura alarme nevoa area espelhos ilusion seta","campo dissipar amarras saltar velocidade","imobilizar voo telecinesia miragem ilacerante","sono invis"],
  artificio:["seta objeto area armadura choque teia","amarras saltar dissipar relampago velocidade","telecinesia voo imobilizar miragem"],
  ossos:["seta area espelhos armadura alastrar teia nevoa","saltar amarras campo dissipar velocidade","telecinesia miragem voo imobilizar ilacerante"]
 };
 const ventanistaSpells=[[1,"ilusion"],[1,"disfarce"],[2,"adaga"],[4,"espelhos"],[6,"invis"],[8,"sussurros"],[10,"miragem"],[12,"ilacerante"]];
 const originChoices={
  guarda:["taverneiro","Ofício (cozinheiro)","Gororoba"],
  marcial:["soldado","Guerra","Pontaria"],
  arco:["soldado","Guerra","Luta"],
  erudito:["estudioso","Conhecimento","Guerra"],
  eremita:["eremita","Religião","Sobrevivência"],
  fugitivo:["criminoso","Furtividade","Enganação"],
  cronista:["artista","Atuação","Enganação"]
 };
 const martialSkills={
  guerreiro:["Luta","Fortitude","Iniciativa","Reflexos"],
  lutador:["Luta","Fortitude","Iniciativa","Atletismo","Acrobacia","Intimidação"],
  ladino:["Ladinagem","Reflexos","Furtividade","Iniciativa","Acrobacia","Intuição","Pontaria","Percepção","Luta","Investigação"],
  arcanista:["Misticismo","Vontade","Iniciativa","Percepção"]
 };
 const attributesFor=s=>Object.fromEntries(engine.KEYS.map((key,i)=>[key,abilityScores[templates[s.build][1]][i]]));
 const attributes={Luta:"FOR",Pontaria:"DES",Fortitude:"CON",Reflexos:"DES",Vontade:"SAB",Iniciativa:"DES",
  Atletismo:"FOR",Acrobacia:"DES",Intimidação:"CAR",Ladinagem:"DES",Furtividade:"DES",Intuição:"SAB",
  Percepção:"SAB",Atuação:"CAR",Enganação:"CAR",Diplomacia:"CAR",Religião:"SAB",Sobrevivência:"SAB",
  Cura:"SAB"};
 const formatted=n=>(n>=0?"+":"")+n;
 const resources=new WeakMap();
 const sourcePage=(source)=>[source.book==="jda-1.3"?"core":source.book==="ameacas"?"threats":source.book,source.page,source.section];
 const split=xs=>xs.split(" ");
 function spell(level,key,why){
  const def=rules.cosmosSpells[key];
  if(!def)throw Error("Magia sem regra: "+key);
  return {...def,classLevel:level,why};
 }
 function learn(casterCount,path,pack,choices,why){
  const pool=repertoires[pack].slice(0,3).map(split);
  const bonus=repertoires[pack][3]?.split(" ")||[];
  const book=[];
  for(let level=1;level<=casterCount;level++){
   const circle=level<5?1:level<9?2:3;
   const unlock=[1,5,9].includes(level);
   const regular=level===1?3:1;
   const count=regular+(unlock&&path==="mago"?1:0);
   for(let n=0;n<count;n++)book.push(spell(level,pool[circle-1].shift(),why));
   if(choices[level-1]==="conhecimento-magico"){
    for(let n=0;n<2;n++)book.push(spell(level,bonus.shift(),why));
   }
  }
  return book;
 }
 function create(seed){
  const [klass,,kit,choices,track,spellPack,school]=templates[seed.build];
  const race=rules.races[seed.raceId],spec=loadouts[kit];
  const d=engine.makeDraft({catalogId:seed.id,name:seed.name,work:seed.universe,theme:seed.group});
  d.raceId=seed.raceId;
  d.description=seed.concept;
  d.raceBonuses=seed.raceId==="humano"?(klass==="arcanista"?["DES","CON","INT"]:klass==="ladino"?["DES","INT","CAR"]:["FOR","DES","CON"]):[];
  d.attributes=attributesFor(seed);
  const [origin,...benefits]=originChoices[seed.origin||(klass==="arcanista"?"erudito":klass==="ladino"?(seed.build==="cronista"?"cronista":"fugitivo"):kit==="arco"?"arco":"marcial")];
  const skills=[...martialSkills[klass]];
  if(klass==="ladino"&&origin==="criminoso")skills[2]="Atletismo";
  if(klass==="ladino"&&seed.build==="cronista")skills[8]="Diplomacia";
  if(kit==="arco")skills[0]="Pontaria";
  if(race.noOrigin)d.purposePower=seed.purpose||"vitalidade";
  else{d.originId=origin;d.originBenefits=benefits;}
  const grantedSkills=d.originBenefits.filter(name=>name!=="Gororoba");
  if(seed.raceId==="humano")grantedSkills.push("Diplomacia","Cura");
  if(seed.raceId==="kliren")grantedSkills.push("Ofício (engenhoqueiro)");
  if(seed.raceId==="osteon")grantedSkills.push("Acrobacia");
  const int=Math.max(0,d.attributes.INT+(race.modifiers?.INT||0)+(d.raceBonuses.includes("INT")?1:0));
  const trained=new Set([...skills,...grantedSkills]);
  const extras=["Conhecimento","Investigação","Cura","Ofício (artesão)","Sobrevivência","Diplomacia","Intuição","Percepção","Enganação","Misticismo","Vontade"];
  extras.filter(name=>!trained.has(name)).slice(0,int).forEach(name=>trained.add(name));
  d.trainedSkills=[...trained];
  const picks=split(choices),extraLevels=seed.arcaneLevels||0;
  const mainCount=12-extraLevels;
  d.arcanePath=klass==="arcanista"?track:extraLevels?"bruxo":"";
  if(klass==="arcanista")d.spellbook=learn(12,track,spellPack,["",...picks],seed.signature);
  if(track==="ventanista"){
   d.allowedBooks.push("herois");
   d.spellbook=ventanistaSpells.map(([level,key])=>spell(level,key,seed.signature));
  }
  if(extraLevels)d.spellbook=learn(extraLevels,"bruxo","esfera",[],seed.signature);
  if(race.source.book!=="jda-1.3")d.allowedBooks.push(race.source.book);
  const extraPicks=["raio-arcano","arcano-batalha","raio-poderoso","raio-elemental","fortalecimento-arcano"];
  d.levels=Array.from({length:12},(_,i)=>{
   const extra=i>=mainCount;
   const powerId=extra?extraPicks[i-mainCount-1]||"":picks[i-1]||"";
   const rule=rules.abilities[powerId];
   const selection={
    "especializacao-arma":"Arma escolhida: "+spec.weapon+".",
    "golpe-pessoal":"Arma: "+spec.weapon+". Efeito Letal (+2 PM): margem de ameaça +2, sem acumular com outro efeito letal do golpe.",
    "especialista-escola":"Escola escolhida: "+school+".",
    "raio-elemental":"Use o tipo de dano que representa "+seed.signature+", dentre as opções do poder."
   }[powerId]||"";
   return {...engine.emptyLevel(),classId:extra?"arcanista":klass,variantId:i===0&&track==="ventanista"?track:"",
    powerId,why:"Nível "+(i+1)+" · "+seed.signature+". "+(rule?.manual.effect||seed.concept),
    usage:(rule?rule.manual.action+" · "+rule.manual.cost+". "+selection:seed.tactic)+" "+(rule?.manual.limit||""),
    sourceNote:rule?rule.source.section+" · "+rule.source.page:"Tabela de Classe / Jogo do Ano v1.3"};
  });
  d.inventory=[
   {name:spec.weapon,quantity:1,note:seed.item||(origin==="soldado"?"Escolha esta arma marcial no equipamento inicial de Soldado.":"Arma do capítulo 3, com proficiência, alcance e dano da tabela.")},
   ...(spec.shield?[{name:"Escudo leve",quantity:1,note:"T$ 5. Bônus de Defesa enquanto empunhado, incluindo Estilo de Arma e Escudo quando escolhido."}]:[]),
   ...(spec.ranged?[{name:kit==="arco"?"Flechas":"Virotes",quantity:20,note:"Munição compatível, vendida em lotes de 20."}]:[]),
   ...(klass==="guerreiro"?[{name:"Armadura de couro",quantity:1,note:"T$ 20, +2 Defesa. Quando tiver orçamento para Brunea ou outra armadura pesada, pode usar Especialização em Armadura."}]:[]),
   ...(d.arcanePath?[{name:d.arcanePath==="mago"?"Grimório":"Foco de Bruxo",quantity:1,note:d.arcanePath==="mago"?"Estude por 1 hora e memorize metade do repertório antes de conjurar.":"Empunhe o foco em uma mão e gesticule com a outra, ou faça o teste de Misticismo previsto."}]:[]),
   ...(seed.build==="guarda"&&seed.origin==="guarda"?[{name:"Utensílios de cozinheiro",quantity:1,note:"Faça testes de Ofício (cozinheiro). Alimente e cuide do grupo em exploração."}]:[]),
   {name:"Traje da obra",quantity:1,note:"Representação visual. Use apenas os bônus do equipamento realmente adquirido."}
  ];
  d.combat={style:seed.concept,opening:seed.tactic,combos:seed.signature,
   resources:"Separe o PM da defesa do necessário para aplicar as técnicas. Ataques básicos ainda funcionam quando os PM acabam.",
   strengths:race.tag,weaknesses:race.note,evolution:"Seleções e referências estão registradas nos níveis 1 a 12."};
  return {report:engine.evaluate(d),spec};
 }
 function raceFor(seed){
  const race=rules.races[seed.raceId];
  const [klass]=templates[seed.build];
  const humanBonuses=klass==="arcanista"?{DES:1,CON:1,INT:1}:klass==="ladino"?{DES:1,INT:1,CAR:1}:{FOR:1,DES:1,CON:1};
  return {book:sourcePage(race.source)[0],page:race.source.page,bonus:race.modifiers||humanBonuses,speed:race.movement,tag:race.tag,
   caveat:race.note,defense:race.defense,noOrigin:race.noOrigin};
 }
 function apply(c,seed){
  const {report,spec}=create(seed),d=report.sheet,race=rules.races[d.raceId],origin=rules.origins[d.originId];
  const [first]=report.rows;
  resources.set(c,{report,spec});
  if(!first.pv||!first.pm||report.rows.some(row=>row.pv===null||row.pm===null))throw Error("Não calculou ficha "+seed.id+": "+report.issues.join(" · "));
  c._cosmos={source:seed.source,aliases:seed.aliases||"",series:seed.arc,signature:seed.signature};
  c._crossover.reviewStatus="progressão editorial indexada";
  if(report.classVariants.ladino==="ventanista"){
   c._crossover.variant="Ventanista";
   c.sources.push({name:"Heróis de Arton · Ventanista · pp. 44–45",url:first.source.url});
  }
  c.info.className=Object.entries(report.levelsByClass).map(([id,n])=>rules.classes[id].name+
   (id==="arcanista"?" ("+(d.arcanePath==="mago"?"Mago":"Bruxo")+")":report.classVariants[id]?" — "+engine.options.variants[report.classVariants[id]].name:"")+ " "+n).join(" / ");
  c.info.origin=race.noOrigin?"Propósito de Criação — "+rules.abilities[d.purposePower].name:origin.name+" · "+d.originBenefits.join(" / ");
  c.info.role=seed.concept;
  c.info.partner="Coopere com aliados em campo. Parceiros e invocações usam a regra da opção adquirida.";
  c.stats={...c.stats,pv:first.pv,pm:first.pm,hpGain:report.rows[1].hpDelta,pmGain:report.rows[1].pmDelta};
  c.summary=seed.concept+" "+seed.raceReason+" "+seed.tactic;
  c.history=[seed.canon,seed.raceReason,seed.tactic];
  c.skills=d.trainedSkills.map(name=>[name,skill(c,name,1),"Perícia treinada na criação; some os bônus condicionais de raça, poderes ou itens quando aplicáveis."]);
  const firstSpells=first.classId==="arcanista"||report.classVariants[first.classId]==="ventanista"?d.spellbook.filter(x=>x.classLevel===1):[];
  c.initial=[...first.grants.map(x=>x.ability.name),race.tag,c.info.origin,race.note,
   ...(d.originBenefits.includes("Gororoba")?["Gororoba: prepare pratos especiais adicionais sem a penalidade cumulativa descrita em Ofício."]:[]),
   ...firstSpells.map(x=>x.name+" · "+x.how)];
  c.progression=report.rows.map((row,i)=>{
   const rowSpells=d.spellbook.filter(x=>(seed.arcaneLevels&&row.classId==="arcanista"?true:!seed.arcaneLevels)&&x.classLevel===row.classLevel);
   const names=[row.choice?.name,...row.grants.map(x=>x.ability.name),...rowSpells.map(x=>x.name)].filter(Boolean);
   return [String(i+1),rules.classes[row.classId].name+" "+row.classLevel+" · "+names.join(" / "),
    d.levels[i].usage+" PV "+row.pv+" · PM "+row.pm+(rowSpells.length?" · "+rowSpells.map(x=>x.name+": "+x.how).join(" "):"")];
  });
  c._guide.levels=report.rows.map((row,i)=>({
   why:d.levels[i].why,use:c.progression[i][2],automatic:row.grants.map(x=>x.ability.name).join(" · "),
   ref:[sourcePage(row.choice?.source||row.source),sourcePage(race.source)]
  }));
  c._guide.basics=[
   {name:"Raça e construção",why:seed.raceReason,use:race.note,ref:[sourcePage(race.source)]},
   {name:"Treinos e origem",why:c.info.origin,use:d.trainedSkills.join(" · "),ref:[sourcePage(origin?.source||race.source)]},
   {name:"Abertura e posição",why:seed.signature,use:seed.tactic,ref:[sourcePage(first.source)]}
  ];
  c.gear=d.inventory.map(x=>({name:x.name,rule:"Equipamento de Tormenta20",qty:String(x.quantity),detail:x.note}));
  c.attacks=[{name:spec.weapon,test:skill(c,spec.ranged?"Pontaria":"Luta",1),
   damage:damage(c,spec,1),cost:"0 PM (ataque básico)",
   detail:spec.ranged?"Use as regras de alcance, cobertura e recarga da arma.":"Resolva ataque, Defesa e dano conforme a arma oficial."}];
  c.techniques=[1,5,8,12].map((level,i)=>({level,name:i===0?seed.signature:seed.styles[i],mechanic:c.progression[level-1][1],
   cost:report.rows[level-1].choice?.manual.cost||"Conforme ação e habilidade escolhidas",effect:i===0?seed.tactic:c.progression[level-1][2],flavor:"ADAPTAÇÃO T20"}));
  c.notes={overview:seed.raceReason,attributes:"Compra de 10 pontos. Raça, subtotais de PV/PM e vantagens condicionais aparecem na ficha.",
   equipment:"Use as proficiências e o orçamento de T20. Armaduras, escudos e itens superiores precisam estar equipados para conceder bônus.",
   abilities:race.note,progression:d.arcanePath==="mago"?"O grimório reúne as magias aprendidas. O Mago estuda por 1 hora e memoriza metade antes de lançar. A progressão mostra os subtotais por nível.":"Progressão de mesa com poderes selecionados e subtotais de PV e PM por nível.",
   techniques:"A ficha usa ações, limites e testes de Tormenta20 para representar "+seed.signature+"."};
  c.media=[{name:seed.image?seed.name+" — referência visual":"Insígnia de "+seed.name,image:c.portrait.url,source:seed.imageSource||seed.source,credit:c.portrait.credit}];
 }
 function skill(c,name,n){
  const val=c.attrs.find(a=>a.key===(attributes[name]||"INT")).value;
  const trained=resources.get(c)?.report.sheet.trainedSkills.includes(name);
  return formatted(val+Math.floor(n/2)+(trained?(n>=7?4:2):0));
 }
 function damage(c,spec,n){
  const {report}=resources.get(c);
  const classLevels=report.rows.slice(0,n).filter(row=>row.classId==="lutador").length;
  const die=classLevels?(classLevels>=9?"1d10":classLevels>=5?"1d8":"1d6"):spec.die;
  const str=report.attributes.FOR;
  const choices=report.rows.slice(0,n).map(row=>row.choice?.name);
  const extra=(choices.includes("Estilo de Disparo")?report.attributes.DES:0)+(choices.includes("Arqueiro")?report.attributes.SAB:0)+
   (choices.includes("Especialização em Arma")?2:0)+(choices.includes("Esgrimista")?Math.max(0,Math.min(n,report.attributes.INT)):0);
  return die+formatted((spec.ranged?0:str)+extra);
 }
 function stats(c,n){
  const {report,spec}=resources.get(c);
  const step=report.rows[n-1],choices=report.rows.slice(0,n).map(row=>row.choice?.name),attrs=report.attributes;
  const brawler=report.rows.slice(0,n).filter(row=>row.classId==="lutador").length;
  const race=rules.races[report.sheet.raceId],cast=report.rows.slice(0,n).filter(row=>row.classId==="arcanista").length;
  const vent=report.classVariants.ladino==="ventanista";
  const acuidade=spec.agile&&choices.includes("Acuidade com Arma");
  const attackKey=spec.ranged||acuidade?"DES":"FOR";
  const trained=report.sheet.trainedSkills.includes(spec.ranged?"Pontaria":"Luta");
  const floor=Math.floor(n/2),training=n>=7?4:2;
  const defense=10+attrs.DES+(race.defense||0)+(choices.includes("Esquiva")?2:0)+
   (choices.includes("Braços Calejados")?Math.min(attrs.FOR,brawler):0)+(brawler>=3?Math.min(attrs.CON,brawler)+Math.floor((brawler-3)/4):0);
  return {level:n,pv:step.pv,pm:step.pm,defense,move:race.movement+" m",attack:formatted(attrs[attackKey]+floor+(trained?training:0)),
   damage:damage(c,spec,n),extra:rules.classes[step.classId].name+" "+step.classLevel,
   magicDC:cast||vent?10+floor+attrs[vent?"CAR":"INT"]:null,attributeInt:attrs.INT,attributeStr:attrs.FOR,floor,training,
   explanation:"PV/PM são subtotais da progressão e da raça e incluem Vitalidade de criação quando escolhida. Some outros bônus de poderes e equipamento quando se aplicarem. A Defesa aqui considera o personagem sem armadura e sem escudo."};
 }
 w.T20_COSMOS_BUILDS={apply,create,raceFor,attributesFor,skill,stats,draft(c){
  const saved=resources.get(c).report.sheet;
  return engine.normalize({...saved,id:engine.makeDraft().id});
 },report:c=>resources.get(c).report};
})();
