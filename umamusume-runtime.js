/* FASE V // 57 dossiês Umamusume: fichas 1–12 com guias, raças e
 * progresso conservador. Fonte T20: Jogo do Ano v1.3, Ameaças de Arton e
 * Heróis de Arton v1.1. Não copiar textos dos manuais ou liberar poderes
 * sem pré-requisitos. As personalidades não concedem bônus mágicos. */
(()=>{
 "use strict";
 const w=window,data=w.T20_DATA,guide=w.T20_GUIDE,seed=w.T20_UMA_SEEDS,rules=w.T20_RULES,options=w.T20_CLASS_OPTIONS;
 if(!data||!guide||!seed||!rules||!options)return;
 const source={
  core:"https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf",
  threats:"https://jamboeditora.com.br/produto/ameacas-de-arton/",
  heroes:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/"
 };
 // Somente raças e ajustes efetivamente citados nos três livros.
 // Moreau: +1 fixo e +1 em outros dois atributos diferentes (escolha documentada).
 const races={
  "Centauro":{book:"threats",page:"105",bonus:{SAB:2,FOR:1,INT:-1},speed:12,tag:"Avantajado · cascos · Ginete Natural",caveat:"Tamanho Grande e corpo quadrúpede são distintos da silhueta canônica de Uma; o visual é uma adaptação de fantasia. Medo de altura se aplica."},
  "Moreau do Coelho":{book:"threats",page:"303–305",bonus:{DES:1,CON:1,SAB:1},speed:12,tag:"Patas Ligeiras · Pé de Coelho · Senso de Preservação",caveat:"Herança do Coelho: orelhas e cauda equinas no figurino não substituem os traços oficiais de coelho. Não ignora os testes de Atletismo."},
  "Moreau da Raposa":{book:"threats",page:"303–305",bonus:{INT:1,DES:1,CAR:1},speed:12,tag:"Agarra-me Se Puderes · Esperteza Vulpina · Faro",caveat:"Aparência de Uma não cria traços equinos adicionais; habilidades oficiais são da raposa."},
  "Moreau do Gato":{book:"threats",page:"303–305",bonus:{CAR:1,DES:1,CON:1},speed:9,tag:"Sentidos Felinos · Garras · Muitas Vidas",caveat:"Garras só podem ser usadas com a ação, mãos livres e PM previstos; a personagem não ganha múltiplos ataques automaticamente."},
  "Moreau da Hiena":{book:"threats",page:"303–305",bonus:{SAB:1,FOR:1,CON:1},speed:9,tag:"Destemor · Faro · Mordida",caveat:"Mordida é arma natural da herança e exige gasto e condição; comportamento cômico não altera rolagens."},
  "Moreau do Leão":{book:"threats",page:"303–305",bonus:{FOR:1,CON:1,DES:1},speed:9,tag:"Mordida · Rugido Imponente · Sentidos da Realeza",caveat:"O rugido depende de uma ação de movimento e 1 PM, não altera automaticamente a moral dos inimigos."},
  "Moreau do Lobo":{book:"threats",page:"303–305",bonus:{CAR:1,FOR:1,CON:1},speed:9,tag:"Faro · Mordida · Táticas de Matilha",caveat:"Táticas de Matilha exige flanqueamento real; não basta dizer que a equipe está junta."},
  "Sátiro":{book:"heroes",page:"15",bonus:{CAR:2,DES:1,SAB:-1},speed:12,tag:"Pernas Caprinas · Instrumentista Mágico · Marrada",caveat:"Sátiro é uma criatura de corpo parcialmente caprino. A apresentação equina é apenas visual; magias do instrumento não são bônus permanentes."},
  "Meio-Elfo":{book:"heroes",page:"14",bonus:{INT:1,DES:1,CAR:1},speed:9,tag:"Ambição Herdada · Entre Dois Mundos · Sangue Élfico",caveat:"+1 PM adicional nos níveis ímpares; Ambição Herdada exige escolha explícita de poder, não foi concedido automaticamente.",extraPMOdd:true},
  "Elfo":{book:"core",page:"22",bonus:{INT:2,DES:1,CON:-1},speed:9,tag:"Sentidos Élficos · Sangue Mágico · Graça de Glórienn",caveat:"Os +1 PM por nível de Sangue Mágico entram no cálculo; os outros benefícios exigem regra e condições.",extraPMPerLevel:true},
  "Qareen":{book:"core",page:"26",bonus:{CAR:2,INT:1,SAB:-1},speed:9,tag:"Desejos · Resistência Elemental · Tatuagem Mística",caveat:"A magia da tatuagem deve ser nomeada e escolhida; não é uma aceleração gratuita."},
  "Dahllan":{book:"core",page:"21",bonus:{SAB:2,DES:1,INT:-1},speed:9,tag:"Armadura de Allihanna · Amiga das Plantas · Empatia Selvagem",caveat:"Afinidade com plantas não equivale a bônus de corrida; a armadura só funciona se ativada."},
  "Suraggel Sulfure":{book:"core",page:"30–31",bonus:{DES:2,INT:1},speed:9,tag:"Herança Divina · Visão no Escuro · Sangue Celestial/Abissal",caveat:"Versão sulfure/abissal: características sobrenaturais são oficiais, mas não incluem sombras que atacam sozinhas."},
  "Suraggel Aggelus":{book:"core",page:"30–31",bonus:{SAB:2,CAR:1},speed:9,tag:"Herança Divina · Aspecto Celestial",caveat:"Proteção e cura exigem poderes ou magias adquiridas; a ascendência não cria imunidade."}
 };
 const cost={"-1":-1,"0":0,"1":1,"2":2,"3":4,"4":7};
 const buys={
  racer:{FOR:1,DES:3,CON:2,INT:1,SAB:1,CAR:1},
  speed:{FOR:0,DES:4,CON:2,INT:0,SAB:1,CAR:0},
  endurance:{FOR:2,DES:2,CON:3,INT:0,SAB:1,CAR:1},
  brawler:{FOR:3,DES:2,CON:2,INT:0,SAB:1,CAR:1},
  finesse:{FOR:1,DES:3,CON:1,INT:2,SAB:1,CAR:1},
  tactician:{FOR:0,DES:2,CON:1,INT:3,SAB:2,CAR:1},
  charisma:{FOR:0,DES:2,CON:2,INT:1,SAB:1,CAR:3},
  support:{FOR:0,DES:2,CON:2,INT:2,SAB:2,CAR:2},
  mind:{FOR:0,DES:2,CON:1,INT:3,SAB:2,CAR:1}
 };
 const C={
  "Lutador":{pv:20,gain:5,pm:3,key:"FOR",page:"75–77",weapon:"Ataque desarmado",die:"1d6",skill:["Luta","Atletismo","Fortitude","Iniciativa","Reflexos","Vontade"]},
  "Guerreiro":{pv:20,gain:5,pm:3,key:"FOR",page:"64–67",weapon:"Espada longa",die:"1d8",skill:["Luta","Fortitude","Iniciativa","Reflexos","Atletismo","Percepção"]},
  "Cavaleiro":{pv:20,gain:5,pm:3,key:"FOR",page:"52–56",weapon:"Lança",die:"1d6",skill:["Luta","Cavalgar","Fortitude","Iniciativa","Guerra","Vontade"]},
  "Paladino":{pv:20,gain:5,pm:3,key:"CAR",pmAttr:true,page:"81–85",weapon:"Espada longa",die:"1d8",skill:["Luta","Diplomacia","Fortitude","Religião","Vontade","Percepção"]},
  "Ladino":{pv:12,gain:3,pm:4,key:"DES",page:"72–74",weapon:"Adaga",die:"1d4",skill:["Furtividade","Ladinagem","Iniciativa","Reflexos","Percepção","Enganação"]},
  "Nobre":{pv:16,gain:4,pm:4,key:"CAR",pmAttr:true,page:"78–81",weapon:"Florete",die:"1d6",skill:["Diplomacia","Intuição","Nobreza","Vontade","Guerra","Percepção"]},
  "Bardo":{pv:12,gain:3,pm:4,key:"CAR",pmAttr:true,page:"43–46",weapon:"Adaga",die:"1d4",skill:["Atuação","Diplomacia","Enganação","Vontade","Reflexos","Misticismo"]},
  "Clérigo":{pv:16,gain:4,pm:5,key:"SAB",pmAttr:true,page:"56–60",weapon:"Bordão",die:"1d6",skill:["Cura","Religião","Vontade","Percepção","Fortitude","Misticismo"]},
  "Druida":{pv:16,gain:4,pm:4,key:"SAB",pmAttr:true,page:"60–64",weapon:"Bordão",die:"1d6",skill:["Sobrevivência","Vontade","Adestramento","Percepção","Luta","Iniciativa"]},
  "Inventor":{pv:12,gain:3,pm:4,key:"INT",page:"67–72",weapon:"Espada curta",die:"1d6",skill:["Ofício (armeiro)","Ofício (engenhoqueiro)","Misticismo","Iniciativa","Percepção","Fortitude"]},
  "Arcanista":{pv:8,gain:2,pm:6,key:"INT",pmAttr:true,page:"36–40",weapon:"Cajado",die:"1d6",skill:["Misticismo","Vontade","Conhecimento","Iniciativa","Percepção","Reflexos"]},
  "Bucaneiro":{pv:16,gain:4,pm:3,key:"DES",page:"46–49",weapon:"Florete",die:"1d6",skill:["Luta","Acrobacia","Enganação","Iniciativa","Reflexos","Intimidação"]},
  "Caçador":{pv:16,gain:4,pm:4,key:"DES",page:"49–52",weapon:"Arco curto",die:"1d6",skill:["Pontaria","Sobrevivência","Percepção","Reflexos","Iniciativa","Atletismo"]}
 };
 const assoc={Luta:"FOR",Pontaria:"DES",Fortitude:"CON",Reflexos:"DES",Vontade:"SAB",Iniciativa:"DES",Furtividade:"DES",
  Ladinagem:"DES",Acrobacia:"DES",Atletismo:"FOR",Cavalgar:"DES",Guerra:"INT",Misticismo:"INT",Conhecimento:"INT",
  Percepção:"SAB",Intuição:"SAB",Sobrevivência:"SAB",Adestramento:"CAR",Enganação:"CAR",
  Diplomacia:"CAR",Atuação:"CAR",Nobreza:"INT",Religião:"SAB",Cura:"SAB",Intimidação:"CAR",
  "Ofício (armeiro)":"INT","Ofício (engenhoqueiro)":"INT"};
 // Uma única escolha de classe por personagem. Itens de nível 2+ são opções
 // editoriais — só passam a ser mecânicos depois de conferir requisitos.
 const POWER={
  Lutador:["Briga e Golpe Relâmpago","Braços Calejados","Casca Grossa; Rasteira","Voadora","Briga aprimorada; Arma Improvisada","Golpe Baixo","Casca Grossa aprimorada; Convencido","Punhos de Adamante","Briga aprimorada; Golpe Imprudente","Lutador de Chão","Casca Grossa aprimorada; Cabeçada","Aumento de Atributo (FOR)"],
  Guerreiro:["Ataque Especial +4","Bater e Correr","Durão; Ataque Reflexo","Ímpeto","Ataque Especial +8; Golpe Pessoal (a definir)","Ataque Extra; Especialização em Arma","Romper Resistências","Solidez","Ataque Especial +12; Valentão","Tornado de Dor","Aumento de Atributo (FOR)","Golpe de Raspão"],
  Cavaleiro:["Baluarte; Código de Honra","Postura de Combate (a definir)","Montaria ou guarda tática (escolha pendente)","Solidez (verificar lista de poderes)","Aumento de Atributo (FOR)","Ataque de oportunidade (verificar opção)","Especialização defensiva (escolha pendente)","Tática de formação (escolha pendente)","Baluarte avançado (ver tabela)","Comando de proteção (escolha pendente)","Aumento de Atributo (CON)","Resistência de linha de frente (escolha pendente)"],
  Paladino:["Abençoado; Golpe Divino","Encouraçado (requisitos a conferir)","Aura Sagrada (ver nível exato)","Fulgor Divino (verificar poder)","Arma Sagrada (a conferir)","Aura de Cura (verificar poder)","Aumento de Atributo (CAR)","Comando (poder geral; avaliar)","Proteção coletiva (poder a conferir)","Resistência sagrada (a conferir)","Aumento de Atributo (CAR)","Aprimorar bênção (ver tabela)"],
  Ladino:["Ataque Furtivo; Especialista","Evasão; Emboscar","Ataque Furtivo aprimorado; Sombra","Esquiva Sobrenatural; Mente Criminosa","Ataque Furtivo aprimorado; Assassinar","Escapista","Ataque Furtivo aprimorado; Gatuno","Olhos nas Costas; Rolamento Defensivo","Ataque Furtivo aprimorado; Velocidade Ladina","Evasão Aprimorada; Aumento de Atributo (DES)","Ataque Furtivo aprimorado; Sombra (conferir repetição)","Aumento de Atributo (DES)"],
  Nobre:["Autoconfiança; Espólio","Palavras Afiadas (escolha a conferir)","Comandar (poder geral; a conferir)","Inspirar Confiança (opção a conferir)","Aumento de Atributo (CAR)","Língua de Prata (ver poder)","Estratégia (escolha a conferir)","Prestígio (escolha a conferir)","Aumento de Atributo (CAR)","Comando aprimorado (ver poder)","Proteção social (escolha a conferir)","Síntese de liderança (a conferir)"],
  Bardo:["Inspiração; Magias","Fascinar (poder a conferir)","Melodia Curativa (escolha)","Magia Discreta (poder geral; verificar)","Inspiração aprimorada; segundo círculo","Aumento de Atributo (CAR)","Magia Pungente (verificar acesso)","Performance mágica (escolha a conferir)","Inspiração aprimorada; terceiro círculo","Controle de palco (escolha a conferir)","Melodia defensiva (a conferir)","Aumento de Atributo (CAR)"],
  Clérigo:["Devoto Fiel; Magias","Canalizar Energia (poder a conferir)","Aumento de Atributo (SAB)","Curandeiro (pré-requisito a conferir)","Segundo círculo de magias","Liturgia Mágica (opção)","Proteção em grupo (magia a escolher)","Aumento de Atributo (SAB)","Terceiro círculo de magias","Cura aprimorada (poder a escolher)","Bênção sustentada (magia a escolher)","Aumento de Atributo (SAB)"],
  Druida:["Devoto Fiel; Empatia Selvagem; Magias","Forma Selvagem","Companheiro Animal (poder a conferir)","Sentidos Aguçados (poder a conferir)","Aumento de Atributo (SAB)","Forma Selvagem Aprimorada; segundo círculo","Magia Natural (a conferir)","Caminho dos Ermos (ver tabela)","Companheiro Animal Aprimorado (a conferir)","Terceiro círculo de magias","Aumento de Atributo (SAB)","Forma Selvagem Superior (a conferir)"],
  Inventor:["Engenhosidade; Protótipo","Inventário Organizado (poder a conferir)","Engenhoqueiro (opção)","Maestria em Perícia (opção)","Aumento de Atributo (INT)","Ferramentas aprimoradas (poder a conferir)","Aumento de capacidade (poder a conferir)","Aumento de Atributo (INT)","Engenhos de patamar elevado (se houver)","Aprimoramento de protótipo (ver regras)","Aumento de Atributo (INT)","Otimização de equipamento (a conferir)"],
  Arcanista:["Caminho do Arcanista (Mago); Magias Arcanas","Poder Mágico (escolha)","Magia Pungente (escolha)","Conhecimento Mágico (escolha)","Segundo círculo; Fortalecimento Arcano","Envolto em Mistério (escolha)","Arcano de Batalha (escolha)","Aumento de Atributo (INT)","Terceiro círculo; Conhecimento Mágico","Magia Discreta (poder geral a conferir)","Fluxo de Mana (a conferir)","Magia Ilimitada (poder geral a conferir)"],
  Bucaneiro:["Audácia; Insolência","Esgrimista (opção a conferir)","Ataque Acrobático (opção a conferir)","Aumento de Atributo (DES)","Golpe de Sorte (ver poder)","Ousadia defensiva (escolha a conferir)","Aumento de Atributo (CAR)","Ataque preciso (escolha a conferir)","Proteção pela bravata (a conferir)","Golpe de Sorte aprimorado (ver tabela)","Aumento de Atributo (DES)","Técnica de duelo (escolha a conferir)"],
  Caçador:["Marca da Presa; Rastreador","Emboscar (ver opção de Caçador)","Armadilha (opção a conferir)","Olho do Falcão (poder a conferir)","Aumento de Atributo (DES)","Disparo Rápido (poder a conferir)","Rastreador aprimorado (ver tabela)","Escaramuça (a conferir)","Aumento de Atributo (DES)","Chuva de Flechas (a conferir)","Marca da Presa aprimorada (ver tabela)","Especialização do caçador (a conferir)"]
 };
 const sgn=n=>(n>=0?"+":"")+n;
 const ability=id=>rules.abilities[id]?.name||id.replace(/-/g," ");
 const auto=(s,n)=>{
  const row=s.variant==="Atleta"?options.variants.atleta?.levels?.[n]:null;
  if(row)return [...(row.keep||[]),...(row.add||[])].map(ability);
  const map={lutador:"lutador",guerreiro:"guerreiro",ladino:"ladino",arcanista:"arcanista"};
  const id=map[s.klass.toLowerCase()];
  return (rules.classes[id]?.grants?.[n]||[]).map(ability);
 };
 const originalIcon=(s)=>w.T20_MEGA.origIcon({id:s.id,name:s.name,color:s.color,group:"umamusume"});
 const originals=new Set(data.characters.map(c=>c.id));
 const made=[],drafts={};
 for(let idx=0;idx<seed.length;idx++){
  const s=seed[idx],race=races[s.race],C0=C[s.klass],buy=buys[s.focus];
  if(!race||!C0||!buy||originals.has(s.id))throw Error("Uma inválida: "+s.id);
  if(Object.values(buy).reduce((n,v)=>n+cost[String(v)],0)!==10)throw Error("Compra de atributos de "+s.id);
  const att=Object.fromEntries(["FOR","DES","CON","INT","SAB","CAR"].map(k=>[k,buy[k]+(race.bonus[k]||0)]));
  const attrs=["CON","CAR","SAB","INT","FOR","DES"].map(k=>({key:k,buy:buy[k],race:race.bonus[k]||0,value:att[k],
   why:k===C0.key?"Atributo da especialidade e do estilo "+s.title+".":k==="CON"?"Vigor de provas longas e PV.":k==="DES"?"Iniciativa, deslocamento tático e Reflexos.":"Valor real: compra + bônus ou penalidade racial oficial."}));
  const localPoster=originalIcon(s);
  const pic=s.image||localPoster,pm0=C0.pm+(C0.pmAttr?att[C0.key]:0)+(race.extraPMPerLevel||race.extraPMOdd?1:0);
  const note="Conversão independente. "+s.race+" reproduz a proposta em Arton e não altera a identidade canônica da Uma. "+race.caveat;
  const mainClass=s.klass+(s.variant?" — variante "+s.variant:"");
  const label=s.title.toUpperCase();
  const levelGuide=[],progression=[];
  for(let i=0;i<12;i++){
   const n=i+1,automatics=auto(s,n),srcPower=(s.variant?"heroes":"core");
   const proposal=s.variant?"Poder de Lutador — opção a escolher e validar":POWER[s.klass][i];
   // Variantes substituem a tabela de automáticas; não mostrar Golpe
   // Relâmpago de Lutador como poder adquirido por uma Atleta.
   const title=s.variant?"Atleta "+n+": "+(automatics.join(" / ")||"Evolução da classe")+
    (n>=2?" · poder opcional de Lutador a confirmar":""):
    proposal+(automatics.length?" · "+automatics.join(" / "):"");
   const growth=["fundamentos","consistência","defesa","especialização","primeiro salto","adaptação","maturidade","controle técnico","segundo salto","combinação","refinamento","síntese"][i];
   const why="Nível "+n+": "+growth+" de "+s.title.toLowerCase()+". "+s.concept+
    (automatics.length?" Habilidades concedidas pela tabela: "+automatics.join(", ")+".":" Sem habilidade adicional gratuita neste passo.");
   const use=(s.variant?"Na variante Atleta, aplique apenas a progressão de Heróis de Arton, pp. 24–25. A classe mantém o nível de Lutador para pré-requisitos. ":
    "Na classe "+s.klass+", confirme quais itens da proposta são automáticos e quais consomem a escolha do nível. ")+
    "Para encenar "+s.title+", use Atletismo, deslocamentos, perícias e opções de classe realmente adquiridas. "+
    "O movimento no circuito não é investida automática, nem garante ataque adicional. "+
    (automatics.length?"Automáticas nesta etapa: "+automatics.join(" / ")+". ":"")+
    "Raça "+s.race+": "+race.tag+". "+race.caveat;
   const refs=[["core",C0.page,"Classe "+s.klass+" / "+proposal], [race.book,race.page,"Raça "+s.race]];
   if(s.variant)refs.unshift([srcPower,"24–25","Tabela 1-4 — variante Atleta / nível "+n]);
   progression.push([String(n),title,s.concept+" · "+growth+". "+(automatics.length?"Automáticas: "+automatics.join(" / ")+". ":"")+
    "Escolhas não automáticas dependem de pré-requisito e aprovação da mesa. "+race.caveat]);
   levelGuide.push({why,use,automatic:automatics.join(" · "),ref:refs});
  }
  const skills=C0.skill.map(k=>[k,sgn(att[assoc[k]||"INT"]+2), "Treino proposto · confirmar perícias obrigatórias e vagas da classe"]);
  if(!C0.skill.includes("Atletismo"))skills.unshift(["Atletismo",sgn(att.FOR+2),"Treino temático para corridas; origem ou classe devem fornecer a vaga"]);
  const hp0=C0.pv+att.CON;
  const equip=[
   {name:"Traje de corrida — "+s.title,rule:"Traje de viajante (visual)",qty:"1",detail:"Cores da Uma como vestimenta. Sem bônus em Defesa ou deslocamento.",image:pic,source:s.official,credit:s.image?"Arte oficial © Cygames":"Selo original de O Sistema"},
   {name:C0.weapon,rule:"Arma oficial de "+s.klass,qty:"1",detail:"Arma sugerida para encontros de aventura; verificar proficiência, preço e inventário inicial."},
   {name:"Calçados de treinamento",rule:"Equipamento mundano (sem magia)",qty:"1",detail:"Botas normais; não concedem +3 m nem bônus de Atletismo."},
   {name:s.klass==="Bardo"?"Instrumento musical":s.klass==="Inventor"?"Ferramentas de Ofício":"Kit de viagem",rule:"Item a adquirir",qty:"1",detail:"Verificar custo e benefícios com mestre; não herdar propriedades do jogo digital."}
  ];
  const atks=[{name:C0.weapon,test:sgn((C0.weapon==="Arco curto"?att.DES:att.FOR)+2),
    damage:C0.die+sgn(att.FOR),cost:"0 PM",
    detail:"Ataque ilustrativo treinado de nível 1, antes de vantagens de armaduras/armas; proficiência e perícia devem ser confirmadas na classe."}];
  const c={
   id:s.id,number:String(70+idx).padStart(2,"0"),name:s.name,universe:"Umamusume: Pretty Derby · "+s.arc,
   label,symbol:"♞",theme:"uma-"+s.slug,catalogCategory:"umamusume",
   portrait:{url:pic,fallback:localPoster,credit:s.image?"Cygames — arte oficial (site Umamusume)":"Símbolo tipográfico original O Sistema",page:s.official},
   excerpt:s.concept,
   info:{race:s.race,className:mainClass,origin:"Atleta (origem temática; benefícios a definir)",devotion:"Livre — sem benefício automático",role:s.title,partner:"Equipe e treinadora são vínculos narrativos; nenhum aliado adicional gratuito"},
   stats:{pv:hp0,pm:pm0,defense:10+att.DES,speed:race.speed+" m",hpGain:C0.gain+att.CON,pmGain:C0.pm},
   attrs,summary:"Adaptação individual de "+s.name+" para Arton. "+s.concept+" Conceito: "+s.title+
    ". Classe escolhida: "+mainClass+"; raça reinterpretada: "+s.race+". A identidade de corredora não concede bônus mecânicos extras sem regra.",
   history:[
    s.name+" integra o universo Umamusume, no arco "+s.arc+". Sua identidade de pista é marcada por "+s.title.toLowerCase()+".",
    "A releitura para Tormenta20 usa "+mainClass+" e "+s.race+" para destacar "+s.concept.toLowerCase(),
    "A forma equina original é preservada no retrato, enquanto a ficha traduz a personagem a uma espécie oficial de Arton. "+
    "Isso é uma versão alternativa de RPG, não a espécie ou o passado canônico."
   ],
   skills,initial:[...auto(s,1),race.tag,"Raça escolhida: "+s.race+"; bônus aplicados aos atributos; origem e itens gratuitos pendentes"],
   gear:equip,attacks:atks,progression,
   techniques:[
    {level:1,name:s.title,mechanic:progression[0][1],cost:"Conforme habilidade",effect:s.concept+" Interpretação narrativa de perícias e habilidades oficiais; não adiciona bônus próprio.",flavor:"ASSINATURA // "+s.arc},
    {level:3,name:"Ritmo de corrida",mechanic:progression[2][1],cost:"Ação e PM conforme regra",effect:"Use as habilidades já obtidas para posicionamento, exploração e proteção; não há disputa automática de corrida por combate.",flavor:"ADAPTAÇÃO // "+s.title},
    {level:5,name:"Arrancada decisiva",mechanic:progression[4][1],cost:"Conforme classe",effect:s.variant?"Mais Alto e Mais Rápido só após aquisição na variante; some +3 m à velocidade racial.":"Considere deslocamento da raça e poderes efetivamente disponíveis. Não some vantagem narrativa como ação adicional.",flavor:"NO MEIO DA PISTA"},
    {level:9,name:"A última curva",mechanic:progression[8][1],cost:"Conforme classe",effect:"A evolução dos níveis 9–12 depende de escolher as opções e cumprir requisitos. Nenhum efeito é garantido pelo nome do golpe.",flavor:"FASE FINAL // "+s.title}
   ],
   notes:{
    overview:note,
    attributes:"Compra de atributos: 10/10 pontos (JdA, p. 17). Bônus raciais: "+Object.entries(race.bonus).map(([k,v])=>k+" "+sgn(v)).join(" · ")+". "+
      "Raça de "+(race.book==="core"?"Jogo do Ano":race.book==="heroes"?"Heróis de Arton":"Ameaças de Arton")+
      ", p. "+race.page+". Valores de PV, PM e Defesa são subtotais sem magia, item ou bônus situacional. "+
      "Origem está indicada apenas como conceito e NÃO fornece bônus ainda.",
    equipment:"Arsenal ilustrativo; item de cosplay não equivale a item mágico. Preços e posse inicial dependem da origem e do mestre.",
    abilities:"A ficha separa habilidades automáticas comprovadas de propostas de poderes. "+
      (s.variant?"Atleta, variante de Lutador, substitui as habilidades automáticas incompatíveis de Lutador (Heróis, pp. 24–25).":
       "A seleção futura de poderes de "+s.klass+" exige conferir as tabelas da classe."),
    progression:"12 níveis organizados. PV aumentam "+C0.gain+" + CON por nível depois do primeiro; PM sobem "+C0.pm+
      " por nível, com bônus raciais explicitados quando houver. Poderes opcionais não foram dados gratuitamente.",
    techniques:"Técnicas são nomes temáticos: os custos, ações, condições e efeitos são os de T20, nunca de Umamusume."
   },
   media:[{name:s.name+" — "+(s.image?"arte oficial":"insígnia do dossiê"),image:pic,source:s.official,
    credit:s.image?"© Cygames, arte oficial; direitos reservados":"Arte tipográfica original"}],
   sources:[
    {name:"Umamusume — ficha oficial da personagem",url:s.official},
    {name:"T20 — Jogo do Ano v1.3, classe e compra de atributos",url:source.core},
    {name:"T20 — raça "+s.race,url:source[race.book]},
    ...(s.variant?[{name:"Heróis de Arton v1.1 — Atleta, pp. 24–25",url:source.heroes}]:[])
   ],
   _uma:{arc:s.arc,className:s.klass,variant:s.variant,race:s.race,raceData:race,mainAttr:C0.key,
    book:C0.page,concept:s.concept,source:s.official,reviewStatus:"proposta-a-validar"},
   _guide:{levels:levelGuide,basics:[
    {name:s.race+" — "+race.tag,why:"Transpor a mobilidade e personalidade de "+s.name+" sem criar uma espécie homebrew.",use:race.caveat,ref:[[race.book,race.page,"Habilidades de raça: "+s.race]]},
    {name:mainClass,why:"Representar "+s.title+" preservando regras de classe.",
     use:"O nome da técnica de corrida nunca substitui aquisição de poder. "+s.concept,
     ref:[[s.variant?"heroes":"core",s.variant?"24–25":C0.page,mainClass]]},
    {name:"Plano de 12 níveis",why:"Separar velocidade real, habilidade de raça, nível de classe e escolhas de poderes.",
     use:"PV/PM são subtotais, origem e equipamentos pendentes. O ataque básico é demonstrativo.",
     ref:[["core","17 e 106","Atributos e características derivadas"]]}
   ]}
  };
  made.push(c);
  const prior=originals.has(c.id);
  if(prior)throw Error("ID duplicado na coleção: "+c.id);
 }
 if(made.length!==seed.length||new Set(made.map(x=>x.id)).size!==seed.length)throw Error("Elenco Umamusume divergente");
 data.characters.push(...made);
 for(const c of made){
  guide.people[c.id]=c._guide;
  // Harmonizar assinatura com as famílias e acabamentos já suportados pelo site,
  // sem mexer nas 69 assinaturas existentes.
  if(w.T20_VISUAL){
   w.T20_VISUAL.profiles[c.id]=["TRACEN","western","orbit","spine",
    seed.find(x=>x.id===c.id).color,"#1e2331"];
   w.T20_VISUAL.finishes[c.id]=c._uma.arc==="Palco e Rivais"?"velvet":"fabric";
  }
 }
 const ids=new Set(made.map(x=>x.id));
 function delta(c,n,k){return 0;}
 function stats(c,n){
  n=Math.max(1,Math.min(12,Number(n)||1));
  const cl=C[c._uma.className],rac=c._uma.raceData;
  const att=Object.fromEntries(c.attrs.map(a=>[a.key,a.value]));
  const racialPM=(rac.extraPMPerLevel?n:(rac.extraPMOdd?Math.ceil(n/2):0));
  const initialBase=c.stats.pm-(rac.extraPMPerLevel||rac.extraPMOdd?1:0);
  const pm=initialBase+(n-1)*cl.pm+racialPM;
  const pv=c.stats.pv+(n-1)*c.stats.hpGain;
  const addedSpeed=c._uma.variant==="Atleta"&&n>=5?3:0;
  const isSpell=["Arcanista","Bardo","Druida","Clérigo"].includes(c._uma.className);
  const atkAtt=c._uma.className==="Caçador"?att.DES:att.FOR;
  return {
   level:n,pv,pm,defense:c.stats.defense,move:(rac.speed+addedSpeed)+" m",
   attack:sgn(atkAtt+2+Math.floor(n/2)+(n>=7?2:0)),
   damage:isSpell?"Conforme magia aprendida":cl.die+sgn(att.FOR),
   extra:c._uma.variant==="Atleta"?(n>=9?"Disciplina Atlética (ver 2 PM)":n>=5?"Mais Alto e Mais Rápido (+3 m)":"Façanha Atlética (PM e Atletismo)"):"Talentos de "+c._uma.className+" (confirmar aquisição)",
   magicDC:isSpell?10+Math.floor(n/2)+att[cl.key]:null,
   attributeInt:att.INT,attributeStr:att.FOR,floor:Math.floor(n/2),training:n>=7?4:2,
   explanation:"SUBTOTAL: PV/PM de "+c._uma.className+" com modificador de CON e bônus raciais de PM quando houver. "+
     "Sem poderes selecionáveis, Defesa de armadura, magias ou itens. "+
     "Movimento "+(rac.speed+addedSpeed)+" m segue "+c.info.race+(addedSpeed?" + habilidade de Atleta no 5º nível.":".")+
     " Todas as escolhas não automáticas exigem confirmação."
  };
 }
 function skill(c,entry,n){
  n=Math.max(1,Math.min(12,Number(n)||1));
  const name=entry[0],k=assoc[name]||"INT",att=c.attrs.find(a=>a.key===k)?.value||0;
  return sgn(att+2+Math.floor(n/2)+(n>=7?2:0));
 }
 function draftById(id,engine){
  const c=made.find(x=>x.id===id);if(!c||!engine)return null;
  const d=engine.makeDraft({catalogId:id,name:c.name,work:c.universe,theme:"umamusume"});
  d.attributes=Object.fromEntries(c.attrs.map(a=>[a.key,a.buy]));
  d.levels=c.progression.map((x,i)=>({...engine.emptyLevel(),
   classId:engine.rules.classes[c._uma.className.toLowerCase()]?c._uma.className.toLowerCase():"",
   variantId:i===0&&c._uma.variant==="Atleta"?"atleta":"",
   why:c._guide.levels[i].why.slice(0,500),usage:c._guide.levels[i].use.slice(0,500),
   sourceNote:c._uma.variant==="Atleta"?"Heróis de Arton v1.1 pp.24–25":"Jogo do Ano v1.3 p."+c._uma.book}));
  d.allowedBooks=["jda-1.3",...(c._uma.variant==="Atleta"?["herois"]:[])];
  d.description=c.summary.slice(0,500);
  d.narrativeSubclass=c._uma.variant||c._uma.concept.slice(0,80);
  d.notes="Raça "+c._uma.race+" (não automatizada pelo motor). "+c.notes.attributes+" Opções de classe adicionais pendentes.";
  return engine.normalize(d);
 }
 w.T20_UMA={ids,seeds:seed,races,classes:C,draftById,stats,skill,delta,
  count:made.length,characters:made};
})();
