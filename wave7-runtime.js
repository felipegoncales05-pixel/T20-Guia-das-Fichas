/* FASE VII — JoBros, The Boys, heróis e Servos, 12 níveis e formas Fate; fontes de
 * Jogo do Ano v1.3, Ameaças de Arton e Heróis de Arton v1.1.
 * Direitos de personagens, artes e regras reservados a seus titulares. */
(()=>{
 "use strict";
 const w=window,data=w.T20_DATA,guide=w.T20_GUIDE,rules=w.T20_RULES,
  opts=w.T20_CLASS_OPTIONS,seeds=[...(w.T20_WAVE7_SEEDS||[]),...(w.T20_WAVE7_FATE_SEEDS||[])],base=w.T20_UMA;
 const altSpecs=w.T20_WAVE7_ALT_SPECS||[];
 if(!seeds.length||!altSpecs.length)throw Error("Dados da fase VII ausentes");
 const indexed=new Map(seeds.map(x=>[x.id,x]));
 const pages={Arcanista:"36–40",Bardo:"43–46",Caçador:"49–52",Cavaleiro:"52–56",Clérigo:"56–60",Druida:"60–64",Guerreiro:"64–67",Inventor:"67–72",Ladino:"72–74",Lutador:"75–77",Nobre:"78–81",Paladino:"81–85"};
 const altSeeds=altSpecs.map(spec=>{
  const baseSeed=indexed.get(spec.parentId);
  if(!baseSeed)throw Error("Variante sem Servo original: "+spec.parentId);
  return {...baseSeed,...spec,id:spec.parentId+"--"+spec.key,
   name:baseSeed.name+" — "+spec.label,
   identity:spec.servantClass.toUpperCase()+" // "+spec.identity,
   signature:spec.identity+" — "+spec.concept,
   bookPage:pages[spec.className],
   path:spec.className==="Arcanista"?"mago":null,
   styles:[spec.identity,"Controle da forma e custo de mana","Golpe Nobre convertido em efeito oficial","Clímax limitado aos poderes adquiridos"],
   isAlt:true};
 });
 const allSeeds=[...seeds,...altSeeds];
 const classPlans={
  Arcanista:["Caminho do Arcanista e magias de 1º círculo","Conhecimento Mágico (selecionar se permitido)","Poder Mágico (escolha a validar)","Magia Pungente ou Magia Discreta, após verificar requisitos","Magias do 2º círculo e controle de alcance","Defesa com Campo de Força se conhecida","Aumento de atributo-chave, mediante poder adquirido","Aprimoramentos de magias e limite de PM","Magias do 3º círculo se habilitado","Conhecimento Mágico adicional (avaliar repetição)","Proteção e resistência contra magias","Conjuração decisiva e recursos sustentáveis"],
  Bardo:["Inspiração e magias iniciais","Poder de Atuação com requisitos","Magia discreta (opção)","Melodia de apoio, se escolhida","Magias do 2º círculo e Inspiração","Aumento de Carisma se poder adquirido","Técnica de controle mental quando aprendida","Recursos de Inspiração e repertório","Magias do 3º círculo e proteção","Perícia social e magia sustentada","Aprimoramento de Atuação (selecionar)","Apresentação suprema limitada por PM"],
  Bucaneiro:["Audácia e Insolência","Esgrimista (selecionar)","Ataque Acrobático (conferir)","Aumento de Destreza (opcional)","Golpe de Sorte (conferir)","Duelista e mobilidade","Técnica defensiva em combate","Reflexos e uso de arma ágil","Audácia com preparação","Manejo de recursos do duelo","Atributo de combate (opcional)","Golpe final condicionado a rolagem"],
  Caçador:["Marca da Presa e Rastreador","Emboscar (opção a confirmar)","Olho do Falcão ou armadilha (escolher)","Estilo de combate com pré-requisitos","Aumento de Destreza (se escolher)","Aprimorar a preparação da presa","Técnicas de exploração e Sobrevivência","Especialização em alvo e distância","Tática de emboscada","Arma e munição adquiridas","Marca da Presa em patamar avançado","Caçada final com custo real"],
  Cavaleiro:["Baluarte e Código de Honra","Postura de Combate (escolher)","Montaria apenas se habilidade e requisitos","Especialização de formação (opcional)","Aumento de atributo de defesa","Proteção contra manobras","Comando de aliados e equipamento","Postura aprimorada se adquirida","Baluarte de defesa conforme nível","Resistência e liderança em campo","Aprimorar equipamento e postura","Guardião do grupo com limites de ação"],
  Clérigo:["Devoto Fiel e magias divinas","Canalizar Energia se escolhido","Poder de cura ou proteção (escolha)","Liturgia e ação de magia (conferir)","Magias do 2º círculo se habilitado","Resistência do grupo por magia","Aumento de Sabedoria se escolhido","Cura em área se magia disponível","Magias do 3º círculo se habilitado","Sustentação de bênçãos","Proteção de aliados em longa batalha","Oração decisiva com PM real"],
  Druida:["Devoto Fiel e magias da natureza","Forma Selvagem se escolhida","Companheiro Animal sujeito a poder","Sentidos Aguçados (se escolher)","Aumento de Sabedoria se adquirir","Magias do 2º círculo quando disponíveis","Magia Natural e forma condicionadas","Controle de terreno com regras","Companheiro aprimorado se elegível","Magias do 3º círculo se habilitado","Defesa natural e resistência","Círculo selvagem sem invocações gratuitas"],
  Guerreiro:["Ataque Especial","Estilo de Combate (requisitos)","Durão e proteção contra danos","Golpe Pessoal se escolha e custo","Ataque Especial aprimorado","Ataque Extra se concedido, pagar PM","Foco em Arma se possível","Aumento de Força ou Destreza (opcional)","Ataque Especial em patamar avançado","Especialização em Arma após requisitos","Refinar Golpe Pessoal e seus custos","Golpe de conclusão sem turno adicional"],
  Inventor:["Engenhosidade e Protótipo","Engenhoqueiro ou Alquimista Iniciante (se escolha)","Ofício especializado e preparação","Maestria em Perícia se elegível","Aumento de Inteligência (opcional)","Construção de item superior por regra","Engenhocas de apoio com custo","Aprimorar Protótipo e ferramentas","Ofício avançado e tempo de fabricação","Equipamentos especializados sob carga","Alquimia de suporte (se poder escolhido)","Síntese de construção sem recursos grátis"],
  Ladino:["Ataque Furtivo e Especialista, se concedidos","Mobilidade de Ladino (poder opcional)","Evasão ou progressão equivalente (ver tabela)","Sombra e posicionamento furtivo","Ataque Furtivo aprimorado se concedido","Velocidade Ladina se escolha","Especialista e furtividade com perícia","Aumento de Destreza se poder escolhido","Ataque Furtivo em patamar avançado","Escapista e reação defensiva quando legal","Disfarce ou Ataque Furtivo em estágio alto","Fuga final sem teleporte grátis"],
  Lutador:["Briga e Golpe Relâmpago se classe básica","Braços Calejados (escolher)","Casca Grossa e poder de controle","Voadora ou Golpe Baixo (opção)","Briga aprimorada pela classe","Aumento de Força se escolher","Casca Grossa e resistência","Punhos de Adamante quando elegível","Briga avançada","Golpe especializado sujeito a poder","Casca Grossa reforçada","Golpe de conclusão sem derrota automática"],
  Nobre:["Autoconfiança e Espólio","Palavras Afiadas se poder escolhido","Comandar (poder geral, verificar)","Inspirar Confiança (se disponível)","Aumento de Carisma quando escolhido","Comando e estratégia da equipe","Técnica social com resistência","Fortuna/espólio apenas segundo a regra","Apoio tático e aliados","Língua de Prata, se adquirida","Defesa e influência por perícias","Presença decisiva sem controle mental grátis"],
  Paladino:["Abençoado e Golpe Divino","Poder defensivo (opção a validar)","Aura Sagrada se habilitada","Fulgor Divino se poder escolhido","Arma Sagrada ou poder (verificar)","Proteção e recuperação se adquirida","Aumento de Carisma opcional","Aura protetora e PM","Golpe Divino em patamar alto","Resistência sagrada e dever","Comando protetor se poder escolhido","Síntese paladinesca sem imunidade"]
 };
 const createLevels=seed=>Array.from({length:12},(_,i)=>{
  const plan=classPlans[seed.className]?.[i]||"Poder de classe a selecionar";
  const style=seed.styles[i%seed.styles.length];
  return plan+". Aplicação temática: "+style+" ("+seed.identity+").";
 });
 for(let i=0;i<allSeeds.length;i++){
  const seed=allSeeds[i];
  const selectedVariants={"dmc-dante":"Inovador","fate-emiya":"Inovador",
   "fate-gilles":"Necromante","fate-medusa--gorgon":"Necromante","fate-zealot":"Ventanista"};
  if(selectedVariants[seed.id]){
   seed.variant=selectedVariants[seed.id];
   if(seed.className==="Arcanista")seed.path=null;
  }
  seed.number=seed.isAlt?(indexed.get(seed.parentId)?.number||0):143+i;
  if(!seed.isAlt)indexed.set(seed.id,seed);
  seed.levels=seed.levels?.length===12?seed.levels.map((step,n)=>
   (classPlans[seed.className]?.[n]||"Escolha de classe sujeita a regra")+". "+step):createLevels(seed);
 }

 if(!data||!guide||!rules||!opts||!seeds||!base)return;
 const source={
  core:"https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf",
  threats:"https://jamboeditora.com.br/produto/ameacas-de-arton/",
  heroes:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/"
 };
 const races={...base.races,...(w.T20_CROSSOVERS?.races||{}),
  "Anão":{book:"core",page:"21",bonus:{CON:2,SAB:1,DES:-1},speed:6,
   tag:"Conhecimento das Rochas · Duro como Pedra · Tradição de Heredrimm",
   caveat:"Anão tem deslocamento 6 m e modificadores de Constituição e Destreza; não recebe bônus em equipamentos automaticamente."},
  "Hynne":{book:"core",page:"27",bonus:{DES:2,CAR:1,FOR:-1},speed:6,
   tag:"Arremessador · Pequeno e Rechonchudo · Sorte Salvadora",
   caveat:"Criatura Pequena com deslocamento 6 m. Sorte Salvadora só permite repetir teste de resistência ao gastar 1 PM; não oferece vantagem em todos os testes."},
  "Medusa":{book:"core",page:"28–29",bonus:{DES:2,CAR:1},speed:9,
   tag:"Cria de Megalokk · Natureza Venenosa · Olhar Atordoante",
   caveat:"Olhar Atordoante requer ação de movimento, 1 PM e Fortitude, uma vez por cena por alvo; envenenar arma exige ação de movimento e 1 PM."},
  "Osteon":{book:"core",page:"29",bonus:{FOR:1,DES:1,SAB:1,CON:-1},speed:9,
   tag:"Armadura Óssea · Memória Póstuma · Natureza Esquelética · Preço da Não Vida",
   caveat:"Morto-vivo com Constituição –1. Três +1 raciais diferentes (FOR, DES, SAB escolhidos); danos de trevas curam e curas de luz causam dano. Memória Póstuma pede escolha ainda pendente."},

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
 for(const s of allSeeds){
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
  const htmlEscape=v=>String(v??"").replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
  const color=/^#[0-9a-f]{6}$/i.test(s.color)?s.color:"#9ca5d1";
  const short=htmlEscape(s.name.length>27?s.name.slice(0,26)+"…":s.name);
  const big=htmlEscape(s.name.split(/[ -]/).filter(Boolean).slice(0,2).map(x=>x.charAt(0)).join("").toUpperCase()||"◆");
  const poster="<svg xmlns='http://www.w3.org/2000/svg' width='600' height='840' viewBox='0 0 600 840'>"+
   "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#101a2d'/><stop offset='1' stop-color='#070e18'/></linearGradient></defs>"+
   "<rect width='600' height='840' fill='url(#g)'/><circle cx='300' cy='330' r='218' fill='none' stroke='"+color+"' stroke-width='5' opacity='.55'/>"+
   "<circle cx='300' cy='330' r='183' fill='"+color+"' opacity='.09'/>"+
   "<path d='M-100 560L700 50 M-100 660L700 150 M-100 760L700 250' stroke='"+color+"' stroke-width='1' opacity='.16'/>"+
   "<text x='300' y='380' fill='"+color+"' text-anchor='middle' font-family='sans-serif' font-size='178' font-weight='900'>"+big+"</text>"+
   "<text x='300' y='660' fill='#f6f7ff' text-anchor='middle' font-family='sans-serif' font-size='32' font-weight='800'>"+short+"</text>"+
   "<text x='300' y='703' fill='"+color+"' text-anchor='middle' font-family='sans-serif' font-size='19'>O SISTEMA / T20</text>"+
   "<path d='M62 72H538 M62 775H538' stroke='"+color+"' stroke-width='2' opacity='.7'/></svg>";
  const localPoster="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(poster);
  const img=s.image||localPoster;
  const skillNames=[...new Set([...(cl.skill||[]),...(s.className==="Inventor"?["Ofício (engenhoqueiro)"]:[]),
   ...(s.className==="Caçador"?["Sobrevivência"]:[])])];
  const skills=skillNames.map(name=>[name,fmt(attrs0[skillAttr[name]||"INT"]+2),
   "Treinamento orientativo (depende das vagas e origem), bônus por nível ainda a somar"]);
  const c={
   id:s.id,number:String(s.number).padStart(2,"0"),name:s.name,universe:s.universe,
   label:s.identity,theme:s.id,catalogCategory:s.group,symbol:"✦",
   portrait:{url:img,fallback:localPoster,credit:s.imageCredit||"Insígnia editorial original",page:s.imageSource||s.source},
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
     image:img,source:s.imageSource||s.source,credit:s.imageCredit},
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
  c._variantSeed=!!s.isAlt;
  c._wave7={...c._crossover,arc:s.arc,fateClass:s.fateClass||"",parentId:s.parentId||null,
   key:s.key||"principal",formLabel:s.label||"Principal"};
  made.push(c);byId[c.id]=c;
 }
 if(made.length!==allSeeds.length||new Set(made.map(c=>c.id)).size!==allSeeds.length)throw Error("Fase VII incompleta");
 const primary=made.filter(c=>!c._variantSeed),alternatives=made.filter(c=>c._variantSeed);
 // Fontes alternativas e famílias de card separam o mesmo Espírito Heroico
 // sem misturar PV, PM, raça, progressão ou guia de uma versão em outra.

 data.characters.push(...primary);
 for(const c of primary){
  guide.people[c.id]=c._guide;
  if(w.T20_VISUAL){
   const palettes={jojo:"manga",fate:"astral",hsr:"astral","the-boys":"brutal",
    dmc:"brutal","one-punch-man":"heroic","blue-lock":"heroic","kamen-rider":"machine"};
   w.T20_VISUAL.profiles[c.id]=[c._crossover.styles[0].toUpperCase().slice(0,14),
    palettes[c.catalogCategory]==="fantasy"?"gothic":palettes[c.catalogCategory]||"manga",
    "prism","spine",seeds.find(s=>s.id===c.id).color,"#172331"];
   w.T20_VISUAL.finishes[c.id]=c.catalogCategory==="fate"?"gold":
    c.catalogCategory==="kamen-rider"?"circuitry":"ink";
  }
 }
 const variantMap={};
 for(const c of primary.filter(c=>c.catalogCategory==="fate"))variantMap[c.id]=[["principal",c._wave7.fateClass||"Base",c]];
 for(const alternate of alternatives){
  const parent=alternate._wave7.parentId;
  if(!variantMap[parent])throw Error("Forma sem card original: "+parent);
  const key=alternate._wave7.key,label=alternate._wave7.formLabel;
  alternate.id=parent; // A página é única; esta ficha é uma versão selecionável.
  variantMap[parent].push([key,label,alternate]);
  if(w.T20_VISUAL){
   const related=w.T20_VISUAL.profiles[parent]||["FATE","astral","prism","spine","#c9b38a","#172331"];
   w.T20_VISUAL.variations[parent+":"+key]=[label.toUpperCase(),"astral","prism","spine",
    altSpecs.find(x=>x.parentId===parent&&x.key===key)?.color||related[4],related[5]];
   w.T20_VISUAL.finishes[parent+":"+key]="gold";
  }
 }
 const ids=new Set(primary.map(c=>c.id));
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
    (allSeeds.find(s=>s.id===id)?.path||""):"",
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
 w.T20_WAVE7={count:primary.length,forms:alternatives.length,ids,characters:primary,
  seeds:allSeeds,alternatives,variantMap,races,classes,stats,skill,delta,draftById};
 w.T20_FATE_VARIANTS=variantMap;
})();
