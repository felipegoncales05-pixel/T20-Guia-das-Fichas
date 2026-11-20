/* O SISTEMA // Conversão automática de dez presets completos em dossiês ativos.
   As builds são adaptações T20 não oficiais: sem poderes gratuitos das franquias.
   A auditoria das escolhas originais permanece disponível no Laboratório. */
(()=>{
 "use strict";
 const data=window.T20_DATA,engine=window.T20_BUILD_ENGINE,presets=window.T20_BUILD_PRESETS,rules=window.T20_RULES;
 const seeds=(window.T20_PLANNED||[]).slice();
 if(!data||!engine||!presets||!rules||seeds.length!==10)return;
 const rulebook=rules.books.find(b=>b.id==="jda-1.3");
 const DEX="DES",official=rulebook?.url||"https://jamboeditora.com.br/produto/tormenta20-edicao-jogo-do-ano/";
 const order=["CON","CAR","SAB","INT","FOR","DEX"];
 const colors={toji:"#a9c6b2",aizen:"#bdd4e7",vegitto:"#f4bb74",gogeta:"#ed8e73",
  "soul-of-cinder":"#e2a478",isaac:"#dfbeae",adao:"#dfcda7",grimm:"#bf9ab1",sekiro:"#c7ad88",kaneki:"#d9b1b2"};
 const sign=n=>n>=0?"+"+n:String(n);
 const classText=(draft)=>[...new Set(draft.levels.map(l=>l.classId))].map(id=>
  (rules.classes[id]?.name||id)+" "+draft.levels.filter(l=>l.classId===id).length).join(" / ");
 const classNames={toji:"CAÇADOR SEM MALDIÇÃO",aizen:"HIPNOSE PERFEITA",vegitto:"FUSÃO POTARA",
  gogeta:"FUSÃO METAMORU","soul-of-cinder":"ALMA DAS CINZAS",isaac:"LÁGRIMAS ARCANAS",
  adao:"OLHOS DO SENHOR",grimm:"ESPADACHIM AMALDIÇOADO",sekiro:"LOBO DE UM BRAÇO",kaneki:"KAGUNE"};
 const names=["toji","aizen","vegitto","gogeta","soul-of-cinder","isaac","adao","grimm","sekiro","kaneki"];
 const cache={};
 const created=seeds.map((seed,i)=>{
  const draft=presets.fromPlanned(seed,engine),report=engine.evaluate(draft),spec=presets.specs[seed.id];
  if(!spec||draft.levels.length!==12||report.rows.length!==12||report.basePV==null||report.basePM==null)
   throw Error("Falha na geração automática de "+seed.id);
  cache[seed.id]={draft,report};
  const attrOf=k=>report.attributes[k==="DEX"?DEX:k];
  const attrs=order.map(k=>({key:k,buy:draft.attributes[k==="DEX"?DEX:k],
   race:draft.raceBonuses.includes(k==="DEX"?DEX:k)?1:0,value:attrOf(k),
   why:k==="FOR"?"Força e técnica ofensiva conforme as escolhas de combate.":k==="DEX"?"Reflexos, iniciativa e precisão.":k==="CON"?"Sobrevivência e pontos de vida.":k==="INT"?"Estudo, leitura de combate e magia arcana quando selecionada.":k==="SAB"?"Percepção e resistência mental.":"Presença social e expressão da personalidade."}));
  const origin=rules.origins[draft.originId],firstClass=rules.classes[draft.levels[0].classId];
  const hitSkill=draft.trainedSkills.includes("Luta")?"Luta":draft.trainedSkills.includes("Pontaria")?"Pontaria":null;
  const classPath=classText(draft);
  const sub=(n)=>report.rows[Math.max(0,Math.min(11,n-1))];
  const levels=report.rows.map((row,index)=>{
   const selected=draft.levels[index];
   const picked=row.choice?.name;
   const gain=row.grants.map(g=>g.ability?.name||g.id);
   const powerTitle=picked||gain.join(" + ")||("Entrada em "+rules.classes[row.classId].name);
   return [String(index+1),rules.classes[row.classId].name+" "+row.classLevel+" · "+powerTitle,
    selected.why+" "+selected.limits+" "+(gain.length?"Habilidades automáticas: "+gain.join(", ")+".":"")];
  });
  const guide={levels:report.rows.map((row,i)=>{
   const entry=draft.levels[i],ability=row.choice,grants=row.grants.map(g=>g.ability).filter(Boolean);
   const page=ability?.source?.page||rules.classes[row.classId].source.page;
   const ref=[["core",page,(ability?.name||rules.classes[row.classId].name)+" · "+rules.classes[row.classId].name]];
   for(const g of grants)ref.push(["core",g.source.page,g.name+" (automática)"]);
   return {why:entry.why+" "+(ability?.manual?.effect||"")+" "+entry.synergy,
    use:entry.usage+" "+(ability?.manual?.limit||"")+" "+entry.limits,
    automatic:grants.map(g=>g.name).join(" · "),ref};
  }),basics:[
   {name:"Caminho "+classPath,why:spec.title+". "+spec.tactic,
    use:"Siga os níveis de classe da ordem apresentada: "+draft.levels.map((row,i)=>(i+1)+":"+rules.classes[row.classId].name).join(", ")+". Não reúna habilidades antes dos respectivos níveis.",
    ref:[["core",firstClass.source.page,"Classe inicial"],["core","cap. 1","Multiclasse, perícias e atributos"]]},
   {name:"Origem: "+origin.name,why:"Benefícios de origem escolhidos: "+draft.originBenefits.join(" e ")+".",
    use:"Use somente os dois benefícios declarados e respeite o equipamento inicial da origem.",
    ref:[["core","cap. 1","Origens e benefícios"]]},
   {name:"Inventário e limites",why:spec.ambiguity,
    use:spec.tactic+" Os itens de outras obras são aparência de equipamentos de T20, não poderes gratuitos.",
    ref:[["core","cap. 3","Equipamentos e proficiências"]]}
  ]};
  const skills=draft.trainedSkills.map(k=>{
   const assoc={"Luta":"FOR","Pontaria":"DEX","Fortitude":"CON","Reflexos":"DEX","Vontade":"SAB","Iniciativa":"DEX",
    "Furtividade":"DEX","Ladinagem":"DEX","Atletismo":"FOR","Acrobacia":"DEX","Percepção":"SAB","Intuição":"SAB",
    "Sobrevivência":"SAB","Cavalgar":"DEX","Guerra":"INT","Misticismo":"INT","Conhecimento":"INT","Enganação":"CAR","Atuação":"CAR"};
   const base=attrOf(assoc[k]||"INT")+2;
   return [k,sign(base),"Treinada • +2 (níveis 1–6), +4 (níveis 7–12) + metade do nível"];
  });
  const gear=draft.inventory.map((g,index)=>({name:g.name,rule:index===0?"Arma, implemento ou item temático reinterpretado":"Equipamento comum ou adereço narrativo",
   qty:String(g.quantity),detail:g.note+" "+spec.ambiguity,image:index===0?seed.portrait:undefined,
   source:index===0?seed.sourcePage:undefined,credit:index===0?seed.artCredit:undefined}));
  const techniques=report.rows.filter((row,i)=>i===0||!!row.choice&&([2,4,5,8,11].includes(i)||i===1)).map((row,index)=>({
   level:row.globalLevel,name:row.choice?.name||row.grants[0]?.ability?.name||"Habilidade de "+rules.classes[row.classId].name,
   mechanic:row.choice?.name||row.grants.map(g=>g.ability?.name||g.id).join(" + "),
   cost:row.choice?.manual?.cost||row.grants[0]?.ability?.manual?.cost||"Conforme habilidade",
   effect:draft.levels[row.globalLevel-1].usage+" "+(row.choice?.manual?.effect||"")+" "+draft.levels[row.globalLevel-1].limits,
   flavor:classNames[seed.id]+" · "+rules.classes[row.classId].name+" "+row.classLevel}));
  for(const sp of draft.spellbook.slice(0,4))techniques.push({level:draft.levels.findIndex((r,j)=>{
    return r.classId==="arcanista"&&report.rows[j]?.classLevel>=sp.classLevel;})+1,
    name:sp.name,mechanic:"Magia arcana "+sp.circle+"º círculo",cost:"Conforme magia no livro",
    effect:sp.how+" "+sp.why,flavor:classNames[seed.id]});
  const attackAttribute=hitSkill==="Pontaria"?"DEX":"FOR",attack=hitSkill?sign(attrOf(attackAttribute)+2):"—";
  const top=report.rows[0],full=report.rows[11];
  const c={
   id:seed.id,number:String(60+i).padStart(2,"0"),name:seed.name,universe:seed.universe,
   label:classNames[seed.id],symbol:"✦",theme:"auto-"+seed.id,catalogCategory:seed.catalogCategory,
   portrait:{url:seed.portrait,credit:seed.artCredit,page:seed.sourcePage},
   excerpt:spec.title+". "+spec.tactic,
   info:{race:"Humano",className:classPath+(draft.arcanePath?" · "+draft.arcanePath[0].toUpperCase()+draft.arcanePath.slice(1):""),
    origin:origin.name,devotion:"Livre (sem efeito automático)",role:spec.title,partner:"Nenhum parceiro gratuito"},
   stats:{pv:top.pv,pm:top.pm,defense:10+attrOf("DEX"),speed:"9 m",
    hpGain:firstClass.gainPV+attrOf("CON"),pmGain:firstClass.gainPM},
   attrs,summary:spec.title+". Construção já preenchida: "+classPath+
    ". Origem "+origin.name+"; compra de dez pontos, bônus de humano, perícias, poderes e 12 níveis definidos. "+spec.tactic,
   history:[seed.name+" — "+seed.universe+". "+spec.title+". Adaptado para Tormenta20 Jogo do Ano; poderes externos só aparecem quando cobertos por regras existentes.",
    "Linha de classes: "+classPath+". "+spec.ambiguity],
   skills,initial:[...top.grants.map(g=>g.ability?.name||g.id),"Humano: Versátil (aplicar escolhas do livro)",
    "Origem "+origin.name+": "+draft.originBenefits.join(" + ")],
   gear,attacks:[{name:hitSkill||"Magias",test:attack,
    damage:hitSkill?"Conforme arma equipada + atributo; aplicar modificadores válidos":"Conforme magia aprendida e seu círculo",
    cost:"0 PM para ataque normal; habilidades têm seus custos",detail:"Bônus do nível 1, sujeito ao equipamento e à proficiência efetiva. "+spec.ambiguity}],
   progression:levels,techniques,notes:{
    overview:spec.ambiguity,
    attributes:"Compra exata de 10 pontos, Humano +1 em "+draft.raceBonuses.join(", ")+". Origem "+origin.name+": "+draft.originBenefits.join(" e ")+".",
    equipment:spec.gear.join("; ")+". "+spec.ambiguity,
    abilities:"Poderes definidos nos 12 níveis. Cada aquisição respeita sua classe e pré-requisitos. Magias propostas: "+(draft.spellbook.map(m=>m.name+" ("+m.circle+"º círculo de Arcanista "+m.classLevel+")").join("; ")||"não usa magias de Arcanista")+".",
    progression:"Nível global 12: "+classPath+" · PV subtotal "+full.pv+" · PM subtotal "+full.pm+". Os totais são calculados por cada avanço em sua classe, sem presumir bônus de itens, talentos opcionais ou magia. "+spec.ambiguity,
    techniques:spec.tactic+" "+spec.ambiguity},
   media:[{name:seed.name+" — arte de referência",image:seed.portrait,source:seed.sourcePage,credit:seed.artCredit}],
   sources:[{name:"Tormenta20 — Jogo do Ano v1.3 (classes, origens, magias)",url:official},
    {name:seed.name+" — referência visual e obra",url:seed.sourcePage}],
   _guide:guide,_auto:{id:seed.id,draft,fullReport:report,issues:report.issues,attackSkill:hitSkill,
    classPath,summary:spec.title+" · "+spec.tactic,spellbook:draft.spellbook}
  };
  return c;
 });
 data.characters.push(...created);
 window.T20_AUTOMATIC_SEEDS=seeds;
 window.T20_PLANNED=[];
 window.T20_AUTOMATIC={
  ids:new Set(names),byId:cache,
  stats(c,n){
   const entry=cache[c.id];if(!entry)return null;
   const level=Math.max(1,Math.min(12,Number(n)||1)),row=entry.report.rows[level-1];
   const a=entry.report.attributes,half=Math.floor(level/2),training=level>=7?4:2;
   const skill=c._auto.attackSkill,att=skill==="Pontaria"?"DES":"FOR";
   const count=row.classId==="arcanista"?row.classLevel:entry.report.rows.slice(0,level).filter(x=>x.classId==="arcanista").length;
   return {level,pv:row.pv,pm:row.pm,defense:10+a.DES,move:"9 m",
    attack:skill?sign(a[att]+training+half):"—",
    damage:skill?"Conforme arma, proficiência e efeitos ativados":"Conforme magia e efeitos ativados",
    extra:c.progression[level-1][1],magicDC:count?10+half+a.INT:null,
    attributeInt:a.INT,attributeStr:a.FOR,floor:half,training,
    explanation:"Subtotal calculado nível a nível: "+row.pv+" PV e "+row.pm+" PM. "+c._auto.classPath+
     ". Os custos de poderes e magias e os efeitos de equipamento dependem da aplicação das regras; "+c.notes.progression};
  },
  skill(c,entry,n){
   const attrs=cache[c.id]?.report?.attributes||{},half=Math.floor(Math.max(1,Number(n)||1)/2),training=n>=7?4:2;
   const assoc={"Luta":"FOR","Pontaria":"DES","Fortitude":"CON","Reflexos":"DES","Vontade":"SAB",
    "Iniciativa":"DES","Furtividade":"DES","Ladinagem":"DES","Atletismo":"FOR","Acrobacia":"DES",
    "Percepção":"SAB","Intuição":"SAB","Sobrevivência":"SAB","Cavalgar":"DES","Guerra":"INT",
    "Misticismo":"INT","Conhecimento":"INT","Enganação":"CAR","Atuação":"CAR"};
   return sign((attrs[assoc[entry[0]]||"INT"]||0)+training+half);
  }
 };
})();
