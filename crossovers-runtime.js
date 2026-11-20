/* FASE VI — conversões T20 com 12 níveis, fontes, classes e raças de
 * Jogo do Ano v1.3, Ameaças de Arton e Heróis de Arton v1.1.
 * Direitos de personagens, artes e regras reservados a seus titulares. */
(()=>{
 "use strict";
 const w=window,data=w.T20_DATA,guide=w.T20_GUIDE,rules=w.T20_RULES,
  opts=w.T20_CLASS_OPTIONS,seeds=w.T20_CROSSOVERS_SEEDS,base=w.T20_UMA;
 if(!data||!guide||!rules||!opts||!seeds||!base)return;
 const source={
  core:"https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf",
  threats:"https://jamboeditora.com.br/produto/ameacas-de-arton/",
  heroes:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/"
 };
 const races={...base.races,
  "Kliren":{book:"core",page:"28",bonus:{INT:2,CAR:1,FOR:-1},speed:9,
   tag:"Híbrido · Engenhosidade · Ossos Frágeis · Vanguardista",
   caveat:"O conhecimento de engenharia não concede equipamento superior sem aquisição. Ossos Frágeis adiciona dano de impacto; Engenhosidade exige 2 PM em testes válidos (não ataques)."},
  "Goblin":{book:"core",page:"23",bonus:{DES:2,INT:1,CAR:-1},speed:9,
   tag:"Engenhoso · Espelunqueiro · Peste Esguia · Rato das Ruas",
   caveat:"Criatura Pequena, com escalada; vantagem de Ofício só segue condição de ferramentas e não confere mecha gratuito."},
  "Golem":{book:"core",page:"27",bonus:{FOR:2,CON:1,CAR:-1},speed:6,defense:2,noOrigin:true,
   tag:"Chassi (+2 Defesa, –2 penalidade) · Criatura Artificial · Fonte Elemental (ar) · Propósito de Criação",
   caveat:"Construto: descanso inerte, imunidades e reparos de Ofício aplicáveis. Não escolhe origem; escolhe poder geral de Propósito de Criação, pendente de decisão. Fonte Elemental ar/eletricidade confere imunidade, não eletricidade ofensiva."},
  "Eiradaan":{book:"heroes",page:"12–13",bonus:{SAB:2,CAR:1,FOR:-1},speed:9,
   tag:"Essência Feérica · Magia Instintiva · Sentidos Místicos · Canção da Melancolia",
   caveat:"Espírito feérico; sofre efeito negativo de Canção da Melancolia em Vontade mental. Magia Instintiva não é poder de teleporte gratuito."}
 };
 const classes=base.classes;
 const buy={
  brawler:{FOR:3,DES:2,CON:2,INT:0,SAB:1,CAR:1},
  finesse:{FOR:1,DES:3,CON:1,INT:2,SAB:1,CAR:1},
  racer:{FOR:1,DES:3,CON:2,INT:1,SAB:1,CAR:1},
  tactician:{FOR:0,DES:2,CON:1,INT:3,SAB:2,CAR:1},
  charisma:{FOR:0,DES:2,CON:2,INT:1,SAB:1,CAR:3},
  support:{FOR:0,DES:2,CON:2,INT:2,SAB:2,CAR:2}
 };
 const costs=rules.pointBuy||{"-1":-1,"0":0,"1":1,"2":2,"3":4,"4":7};
 const skillAttr={"Luta":"FOR","Pontaria":"DES","Fortitude":"CON","Reflexos":"DES","Vontade":"SAB",
  "Iniciativa":"DES","Furtividade":"DES","Ladinagem":"DES","Acrobacia":"DES","Atletismo":"FOR",
  "Cavalgar":"DES","Guerra":"INT","Misticismo":"INT","Conhecimento":"INT","Percepção":"SAB",
  "Intuição":"SAB","Sobrevivência":"SAB","Adestramento":"CAR","Enganação":"CAR",
  "Diplomacia":"CAR","Atuação":"CAR","Nobreza":"INT","Religião":"SAB","Cura":"SAB",
  "Intimidação":"CAR","Ofício (armeiro)":"INT","Ofício (engenhoqueiro)":"INT"};
 const fmt=v=>(v>=0?"+":"")+v;
 const owned=new Set(data.characters.map(c=>c.id));
 const made=[],byId={};
 const classId=klass=>({"Arcanista":"arcanista","Guerreiro":"guerreiro",
  "Ladino":"ladino","Lutador":"lutador","Paladino":"paladino",
  "Caçador":"cacador","Inventor":"inventor"})[klass]||"";
 const magicClasses=new Set(["Arcanista","Clérigo","Bardo","Druida"]);
 const abilityName=id=>rules.abilities[id]?.name||String(id);
 const grant=(s,n)=>{
  if(s.variant){
   const v=opts.variants[s.variant.toLowerCase()];
   const lv=v?.levels?.[n];
   if(!v||v.status!=="verificado"||!lv)throw Error("Variante sem tabela: "+s.id+"/"+n);
   return [...(lv.keep||[]),...(lv.add||[])].map(abilityName);
  }
  const cl=rules.classes[classId(s.className)];
  return (cl?.grants?.[n]||[]).map(abilityName);
 };
 for(const s of seeds){
  const race=races[s.race],cl=classes[s.className],profile=buy[s.profile];
  if(owned.has(s.id)||byId[s.id]||!race||!cl||!profile||s.levels.length!==12)throw Error("Ficha inválida: "+s.id);
  if(Object.values(profile).reduce((a,v)=>a+(costs[String(v)]??99),0)!==10)throw Error("Compra não fecha 10: "+s.id);
  if(s.variant&&!opts.variants[s.variant.toLowerCase()])throw Error("Variante não mapeada: "+s.variant);
  const key=s.path==="feiticeiro"?"CAR":cl.key,attrs0=Object.fromEntries(
   ["FOR","DES","CON","INT","SAB","CAR"].map(k=>[k,profile[k]+(race.bonus[k]||0)]));
  const attrs=["CON","CAR","SAB","INT","FOR","DES"].map(k=>({
   key:k,buy:profile[k],race:race.bonus[k]||0,value:attrs0[k],
   why:k===key?"Atributo-chave efetivo da trilha "+(s.subclass||s.className)+".":k==="CON"?
   "Resistência física e aumento de PV.":"Compra de atributos + ajuste racial do livro."
  }));
  const classLabel=s.className+(s.variant?" — variante "+s.variant:s.subclass?" — "+s.subclass:"");
  const basePM=cl.pm+(cl.pmAttr?attrs0[key]:0),racialPM=race.extraPMPerLevel||race.extraPMOdd?1:0;
  const defense=10+attrs0.DES+(race.defense||0);
  const pv0=cl.pv+attrs0.CON,pm0=basePM+racialPM;
  const guides=[],progression=[];
  for(let i=0;i<12;i++){
   const level=i+1,automatic=grant(s,level);
   const proposal=s.levels[i],label="Nível "+level+" / "+proposal;
   const variantNote=s.variant?"A classe variante substitui as habilidades automáticas listadas da classe-base. "+
    "O poder selecionável da classe-base só existe se escolhido e habilitado. ":"";
   const why="A escolha do nível "+level+" é: "+proposal+". Serve ao conceito de "+
    s.identity+": "+s.concept+"."+(automatic.length?" A tabela concede nesta etapa "+automatic.join(", ")+".":"");
   const use=variantNote+"Base de "+s.className+" com referência em Jogo do Ano. "+
    "Habilidades automáticas comprovadas: "+(automatic.join(" / ")||"nenhuma adicional registrada")+
    ". Os demais itens desta proposta NÃO são poderes recebidos gratuitamente: selecione um poder real, confira pré-requisitos, "+
    "ação e custo em PM antes de usar. "+race.caveat+
    " Recursos externos (teleporte, armadura mágica, explosões, ecos e transmutação) não criam mecânica extra.";
   const refs=[["core",s.bookPage,"Classe "+s.className+"; "+proposal],
    [race.book,race.page,"Raça "+s.race]];
   if(s.variant)refs.unshift(["heroes",opts.variants[s.variant.toLowerCase()].source.page,"Classe variante "+s.variant]);
   progression.push([String(level),label+
    (automatic.length?" · Automática: "+automatic.join(" / "):""),
    "PLANO DO NÍVEL "+level+" // "+s.identity+". "+proposal+". "+s.concept+
    " "+(automatic.length?"Habilidades automáticas: "+automatic.join(" / ")+". ":"")+
    "Escolhas de poderes, armas, magias e aprimoramentos dependem de aquisição e requisitos oficiais; não há efeitos gratuitos."
   ]);
   guides.push({why,use,automatic:automatic.join(" · "),ref:refs});
  }
  const img=s.image||base.origIcon?.({name:s.name,color:s.color,group:"manga"})||
   "data:image/svg+xml;charset=utf-8,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='500' height='700'><rect width='100%' height='100%' fill='#112031'/></svg>");
  const skillNames=[...new Set([...(cl.skill||[]),...(s.className==="Inventor"?["Ofício (engenhoqueiro)"]:[]),
   ...(s.className==="Caçador"?["Sobrevivência"]:[])])];
  const skills=skillNames.map(name=>[name,fmt(attrs0[skillAttr[name]||"INT"]+2),
   "Treinamento orientativo (depende das vagas e origem), bônus por nível ainda a somar"]);
  const c={
   id:s.id,number:String(s.number).padStart(2,"0"),name:s.name,universe:s.universe,
   label:s.identity,theme:s.id,catalogCategory:s.group,symbol:"✦",
   portrait:{url:img,credit:s.imageCredit||"Insígnia editorial original",page:s.source},
   excerpt:s.concept,
   info:{
    race:s.race,className:classLabel,
    origin:race.noOrigin?"Sem Origem (Golem — Propósito de Criação)":"Origem temática a escolher; sem poderes de origem gratuitos",
    devotion:"Não especificada; conferir obrigações de classe e devoção",
    role:s.identity,partner:"Companheiros, mascotes, invocações e mechas requerem poder ou equipamento obtido"
   },
   stats:{pv:pv0,pm:pm0,defense,speed:race.speed+" m",
    hpGain:cl.gain+attrs0.CON,pmGain:cl.pm},
   attrs,
   summary:"Adaptação T20: "+s.concept+" Perfil "+classLabel+" / "+s.race+
    ". Cálculos base sem equipamento ou poder opcional. "+s.signature+".",
   history:[
    s.name+" é adaptado de "+s.universe+". A proposta de Arton destaca "+s.identity.toLowerCase()+".",
    "Raça "+s.race+" e classe "+classLabel+" foram escolhidas por afinidade de mecânica, "+
     "sem afirmar que esta é a raça original da obra. "+s.concept,
    "Não há acesso livre a tecnologia, magias, poderes divinos ou habilidades cinematográficas: "+
     "o que não está previsto na ficha T20 depende de uma escolha e de aprovação da mesa."
   ],
   skills,
   initial:[
    ...grant(s,1),
    race.tag,
    "Raça "+s.race+" com atributos oficiais aplicados; "+(race.noOrigin?
       "sem origem e com escolha de poder geral do Golem pendente":
       "origem e seus benefícios não foram atribuídos automaticamente"),
    s.path?"Caminho de Arcanista: "+s.path+"; lista real de magias a confirmar":
     "Poderes opcionais e proficiências devem ser validados antes da mesa"
   ],
   gear:[
    {name:s.weapon,rule:"Equipamento de classe ou representação visual",qty:"1",
     detail:"Ajustar arma oficial, proficiência, custo, dano e disponibilidade; não há arma mágica externa gratuita.",
     image:img,source:s.source,credit:s.imageCredit},
    {name:"Traje de "+s.name,rule:"Traje de viajante (cosmético)",qty:"1",
     detail:"Veste o visual da obra sem aumentar Defesa, atributos ou velocidade."},
    {name:s.className==="Inventor"?"Ferramentas de Ofício":
      magicClasses.has(s.className)?"Foco / componentes de magia":"Equipamento de viagem",
     rule:"Adquirir e equipar conforme Jogo do Ano",qty:"1",
     detail:"Se necessário para capacidade da classe, conferir regras de uso, preços e carga."},
    {name:"Marca técnica — "+s.identity,rule:"Acessório narrativo sem bônus",qty:"1",
     detail:"Selo temático para roleplay. Não concede magia, teleporte, elemento, arma nova nem segundo personagem."}
   ],
   attacks:[{name:s.weapon,
    test:fmt((s.className==="Caçador"?attrs0.DES:attrs0.FOR)+2),
    damage:(s.weapon.includes("duas mãos")?"2d6":cl.die)+fmt(attrs0.FOR),
    cost:"0 PM (ataque simples)",
    detail:"Simulação de ataque inicial com treino presumido e arma-base. Teste, proficiência e dano efetivo dependem do equipamento comprado; não adiciona efeitos temáticos."
   }],
   progression,
   techniques:s.styles.map((title,i)=>({
    level:[1,4,7][i]||10,name:title,
    mechanic:s.levels[[0,3,6][i]||9],cost:"Ação e PM conforme poder selecionado",
    effect:s.concept+" Nome fictício: requer efeito oficial, disponibilidade e limites de PM; não concede nova habilidade.",
    flavor:"TÉCNICA // "+s.identity
   })),
   notes:{
    overview:"Esta ficha representa "+s.name+" por analogia de regras. "+race.caveat+
      " Objetivos e visual originais não dão bônus próprios.",
    attributes:"Compra de 10/10 pontos, antes de ajustes de "+s.race+" ("+race.book+", p. "+race.page+
      "). PV/PM calculados com atributos e PM racial quando aplicável; Defesa sem armadura ou bônus de classe dependentes de poderes. "+
      "Atributo-chave: "+key+". "+(race.noOrigin?"Sem origem, conforme regra de Golem.":"Origem não escolhida; benefícios ausentes."),
    equipment:"Itens e nomes de equipamentos ilustrativos. Nada se torna mágico sem adquirir uma habilidade, magia ou item de Tormenta20.",
    abilities:"Concedidas automaticamente: somente as habilidades marcadas como automáticas na progressão. "+
      "Poderes citados como 'proposta' não foram concedidos; verificar disponibilidade, requisitos e recursos. "+
      (s.variant?"Variante "+s.variant+" altera o pacote de habilidades automáticas, não é multiclasse.":""),
    progression:"Progressão 1–12, guia detalhado por nível. PV e PM são subtotais da classe, "+
      "CON e raça; não incluem magia de duração, equipamento, aumentos hipotéticos de atributos ou poderes selecionáveis.",
    techniques:"Técnicas recebem nomes da obra apenas para narrativa. Sem transpor regras de combate da franquia."
   },
   media:[{name:s.name+" — retrato da franquia",image:img,source:s.source,credit:s.imageCredit}],
   sources:[
    {name:s.universe+" — referência da personagem",url:s.source},
    {name:"Jogo do Ano v1.3, classe "+s.className+" / regras base",url:source.core},
    {name:"Raça "+s.race+" — "+(race.book==="core"?"Jogo do Ano":race.book==="heroes"?"Heróis de Arton":"Ameaças de Arton"),url:source[race.book]},
    ...(s.variant?[{name:"Heróis de Arton — classe variante "+s.variant,url:source.heroes}]:[])
   ],
   _crossover:{id:s.id,original:s.name,group:s.group,className:s.className,
    variant:s.variant||"",race:s.race,raceData:race,mainAttr:key,
    classBookPage:s.bookPage,concept:s.concept,source:s.source,styles:s.styles,
    reviewStatus:"editorial-validado; poderes-a-conferir"},
   _guide:{levels:guides,basics:[
    {name:"Origem e raça",why:"Construir uma versão artoniana com efeitos rastreáveis.",
     use:race.caveat,ref:[[race.book,race.page,"Raça "+s.race]]},
    {name:classLabel,why:s.concept,
     use:"Sem bonus de outras franquias; confira tabelas e custo de recursos.",
     ref:[[s.variant?"heroes":"core",s.variant?opts.variants[s.variant.toLowerCase()].source.page:s.bookPage,classLabel]]},
    {name:"Plano de combate e função",why:s.signature,
     use:"Conferir equipamentos, proficiências e opções individuais antes de aprovar.",
     ref:[["core",s.bookPage,"Classe "+s.className]]}
   ]}
  };
  made.push(c);byId[c.id]=c;
 }
 if(made.length!==16||new Set(made.map(c=>c.id)).size!==16)throw Error("Fase VI incompleta");
 data.characters.push(...made);
 for(const c of made){
  guide.people[c.id]=c._guide;
  if(w.T20_VISUAL){
   const palettes={konosuba:"gothic",mushoku:"fantasy",wuwa:"astral",dmc:"brutal",
    fma:"machine",genshin:"astral",witcher:"western",shuumatsu:"arena",overwatch:"cyber"};
   w.T20_VISUAL.profiles[c.id]=[c._crossover.styles[0].toUpperCase().slice(0,14),
    palettes[c.catalogCategory]==="fantasy"?"gothic":palettes[c.catalogCategory]||"manga",
    "prism","spine",seeds.find(s=>s.id===c.id).color,"#172331"];
   w.T20_VISUAL.finishes[c.id]=c.catalogCategory==="overwatch"?"circuitry":
    c.catalogCategory==="witcher"?"stone":c.catalogCategory==="wuwa"?"glass":"ink";
  }
 }
 const ids=new Set(made.map(c=>c.id));
 function delta(c,n,k){return 0;}
 function stats(c,n){
  const lvl=Math.min(12,Math.max(1,Number(n)||1)),s=c._crossover,cl=classes[s.className],
   race=s.raceData,attr=Object.fromEntries(c.attrs.map(a=>[a.key,a.value]));
  const extra=race.extraPMPerLevel?lvl:race.extraPMOdd?Math.ceil(lvl/2):0;
  const initialRacePM=race.extraPMPerLevel||race.extraPMOdd?1:0;
  const pv=c.stats.pv+(lvl-1)*c.stats.hpGain;
  const pm=c.stats.pm-initialRacePM+(lvl-1)*cl.pm+extra;
  const isCaster=magicClasses.has(s.className);
  return {level:lvl,pv,pm,defense:c.stats.defense,move:race.speed+" m",
   attack:fmt((s.className==="Caçador"?attr.DES:attr.FOR)+2+Math.floor(lvl/2)+(lvl>=7?2:0)),
   damage:isCaster?"Conforme magia realmente aprendida":cl.die+fmt(attr.FOR),
   extra:s.variant?"Variante "+s.variant+" (consulte tabela oficial)":
    (isCaster?"Acesso ao círculo da classe, se habilitado":"Progressão base de "+s.className+" (recursos condicionais)"),
   magicDC:isCaster?10+Math.floor(lvl/2)+attr[s.mainAttr]:null,
   attributeInt:attr.INT,attributeStr:attr.FOR,floor:Math.floor(lvl/2),
   training:lvl>=7?4:2,
   explanation:"SUBTOTAL POR NÍVEL: PV, PM, deslocamento e Defesa sem equipamentos ou poderes opcionais. "+
    "Não simula magia da franquia ou aprimoramento não adquirido. "+
    "Classe "+s.className+", raça "+s.race+". Poderes da progressão são propostas ainda sujeitas a requisitos."
  };
 }
 function skill(c,entry,n){
  const lvl=Math.min(12,Math.max(1,Number(n)||1)),a=skillAttr[entry[0]]||"INT";
  const base=c.attrs.find(x=>x.key===a)?.value||0;
  return fmt(base+2+Math.floor(lvl/2)+(lvl>=7?2:0));
 }
 function draftById(id,engine){
  const c=byId[id];if(!c||!engine)return null;
  const d=engine.makeDraft({catalogId:id,name:c.name,work:c.universe,theme:c.catalogCategory});
  d.attributes=Object.fromEntries(c.attrs.map(a=>[a.key,a.buy]));
  const cls=classId(c._crossover.className);
  d.levels=c.progression.map((x,i)=>({
   ...engine.emptyLevel(),classId:engine.rules.classes[cls]?cls:"",
   variantId:i===0?c._crossover.variant.toLowerCase():"",
   arcanePath:i===0&&c._crossover.className==="Arcanista"?
    (seeds.find(s=>s.id===id).path||""):"",
   why:c._guide.levels[i].why.slice(0,500),
   usage:c._guide.levels[i].use.slice(0,500),
   sourceNote:"Jogo do Ano v1.3 p. "+c._crossover.classBookPage+
    (c._crossover.variant?"; Heróis de Arton variante "+c._crossover.variant:"")
  }));
  d.allowedBooks=["jda-1.3",...(c._crossover.variant?["herois"]:[])];
  d.description=c.summary.slice(0,500);
  d.notes="Raça "+c._crossover.race+" não automatizada pelo motor; "+
   c.notes.attributes+" Classe e poderes opcionais exigem verificação.";
  return engine.normalize(d);
 }
 w.T20_CROSSOVERS={count:made.length,ids,characters:made,seeds,
  races,classes,stats,skill,delta,draftById};
})();
