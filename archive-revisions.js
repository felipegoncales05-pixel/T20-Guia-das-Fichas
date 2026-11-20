/* O SISTEMA // FASE IV — reconstrução editorial de 69 dossiês e 828 passos.
 * Cada perfil foi analisado em relação à classe existente e às 14 variantes
 * publicadas em Heróis de Arton v1.1 (maio/2025).
 * O programa preserva títulos, identidades, números legados, ilustrações,
 * equipamento e notas, mas atualiza progressão, guias e trilhas para revisão.
 * Nenhuma recomendação autoriza uma regra não registrada ou a publicação. */
(()=>{
 "use strict";
 const w=window,data=w.T20_DATA,guide=w.T20_GUIDE,opts=w.T20_CLASS_OPTIONS,rules=w.T20_RULES;
 if(!data||!guide||!opts||!rules)return;
 const HEROES="Heróis de Arton, edição v1.1 (2025)";
 const CORE="Tormenta20 — Jogo do Ano, v1.3";
 // ID: [intenção central, risco/restrição que não pode ser convertido em bônus,
 //      variante selecionada (somente quando a mecânica conferida sustenta o conceito),
 //      alternativa pendente / motivo de manter a classe básica]
 const plans={
 gyro:["Dois arremessos de precisão e controle do Spin montado","Spin é reflavor de arremesso; não dá ataque, movimento ou dano grátis","","Inovador só se houver armas superiores e alternância real"],
 d:["Bruxaria de controle e sabotagem com foco técnico","Quickhacks não ignoram resistência; Bruxo continua dependente do foco","","Necromante vedaria encantamentos úteis à proposta"],
 david:["Mobilidade de Sandevistan com combate desarmado agressivo","Aceleração não cria ações extras além das realmente adquiridas","","Atleta removeria técnicas importantes de Lutador"],
 cipher:["Infiltração social, identidade falsa e truques ilusórios","Truques do Ofício são magias simuladas, não invisibilidade permanente","ventanista","Usar Carisma e cumprir as escolas das magias simuladas"],
 rentarou:["Diplomacia, influência e proteção coletiva","Relações sociais não conferem parceiros permanentes gratuitos","","Burguês foca recursos monetários, não o conceito do personagem"],
 yoru:["Construção de armas temáticas e preparação tática","Transformar coisas em armas exige inventos e itens legalizados","","Alquimista privilegia preparados, não engenharia de armas"],
 diego:["Metamorfose dinossauro e perseguição predatória","Scary Monsters não transforma automaticamente terceiros","","Ermitão perde Forma Selvagem e é incompatível"],
 ado:["Suporte por performance e controle de emoções","Canto não dispensa custo nem concentração das magias","","Magimarcialista exige combate marcial que não é o foco"],
 cyrene:["Suporte e controle feérico, gelo e proteção","Afetos e gelo não viram controle sem testes de resistência","","Necromante exclui Encantamento, núcleo desta versão"],
 marin:["Disfarce e expressão social sem compulsão mágica","Cosplay não concede magia ou perícia sem aquisição","","Magimarcialista teria foco bélico inadequado"],
 makima:["Manipulação, contratos e encantamentos com custo","Contrato narrativo não concede Dominação automática","","Necromante proíbe Encantamento; manter Feiticeira"],
 optimus:["Proteção de aliados e liderança sagrada","Transformação de veículo requer aprovação e ficha de item","","Santo pode ser estudado após regras de Paladino completas"],
 "jojo-dio1":["Força desarmada, brutalidade e resistência","Vampirismo e gelo não são poderes raciais gratuitos","","Atleta perde ofensiva representativa de Dio"],
 "jojo-kars":["Forma Selvagem para biologia e evolução do corpo","Ser Perfeito não concede imunidade ou Forma Selvagem suprema","","Ermitão bloqueia Forma Selvagem explicitamente"],
 "jojo-dio3":["Combinação de ataques e pressão pelo THE WORLD","Parar o tempo só pelo efeito oficial adquirido","","Inovador exigiria armas diferentes e superiores"],
 "jojo-kira":["Engenhocas explosivas, venenos e pressão discreta","Killer Queen não gera bombas sem custo ou CD","","Alquimista é candidata quando Inventor estiver no motor"],
 "jojo-diavolo":["Furtividade social, blefe e ilusões no momento do ataque","King Crimson não anula ações ou decisões inimigas","ventanista","Evasão e disfarce não equivalem a parada temporal"],
 "jojo-pucci":["Magias de controle e evolução ritual de Whitesnake","Made in Heaven não acelera o tempo literalmente","","Necromante prejudicaria controle não necromântico"],
 "jojo-valentine":["Magia de deslocamento e proteção por D4C","Troca dimensional não concede duplicatas gratuitas","","Nenhuma variante verificada melhora o núcleo"],
 "jojo-tooru":["Controle de campo e perigos de calamidade","Wonder of U não ativa dano sem gatilho e defesa","","Necromante não representa causalidade"],
 yuta:["Invocações e magia de suporte com Rika como tema","Rika não pode ser cadáver animado sem corpo apropriado","","Necromante não cria espírito original automaticamente"],
 goku:["Combate desarmado e patamares de energia do Ki","Transformações não multiplicam atributos sem poderes","","Atleta retira ataque múltiplo que define Goku"],
 "hsr-aglaea":["Combate e suporte de tecelagem dourada","Fios e duplicatas não substituem ações e parceiros","","Magimarcialista é candidata futura; Bardo ainda não catalogado"],
 "hsr-tribbie":["Suporte de equipe, passagem e deslocamento","Mensageiras não são três fichas de personagem grátis","","Magimarcialista mudaria o foco para ataque"],
 "hsr-mydei":["Ofensiva de alto risco e persistência","Ressurgimento narrativo não concede imunidade à morte","","Inovador pede arsenal superior variado não previsto"],
 "hsr-castorice":["Necromancia ritual, morte e manifestações de borboletas","A animação de cadáver usa cadáver real e um parceiro limitado","necromante","Excluir Encantamento e registrar metade da lista como Necromancia"],
 "hsr-anaxa":["Pesquisa de princípios e magia de utilidade","Conhecimento não permite conjurar magias não aprendidas","","Necromante limita escolas e não ajuda à filosofia"],
 "hsr-hyacine":["Proteção e cura associadas ao céu","Curas exigem PM, alcance e oportunidades previstos","","Usurpador exclui devoção e não equivale a médico"],
 "hsr-phainon":["Espadachim de chama e resistência","Worldbearing não fornece todos os bônus ao mesmo tempo","","Inovador não melhora arma principal única"],
 "hsr-hysilens":["Música marinha, controle e debuffs","Canções não afetam automaticamente toda a cena","","Magimarcialista troca performance por combate marcial"],
 "hsr-cerydra":["Autoridade, liderança e comando de equipe","Comandar outros não permite PV ou ações de aliados extras","","Burguês tem foco em recursos econômicos"],
 "hsr-evernight":["Sono, memória e magia do tempo","Não apagar ações do mestre ou da mesa sem regra","","Necromante não representa cronologia"],
 "hsr-terrae":["Resistência, proteção e presença dracônica","Transformações não adicionam armadura permanente grátis","","Santo privilegiaria cura em vez da defesa"],
 "em-herta":["Pesquisa erudita e magia de ampla área","Bonecos de Herta não são clones funcionais grátis","","Necromante não serve ao repertório erudito"],
 "em-acheron":["Lâmina singular, cortes concentrados e vazio","Samurai de Dragão Brasil nº 199 exige a versão da revista","","Preservar Samurai; não converter para Guerreiro/Inovador"],
 "em-phantylia":["Devastação e manipulação por ilusões","Destruição narrativa não implica dano sem magia","","Necromante restringiria escolas úteis"],
 "em-diamond":["Proteção rígida, força e defesa de aliados","Pedras angulares não fornecem invulnerabilidade","","Santo não substitui a defesa do Paladino sem checagem"],
 "em-taravan":["Engenharia, economia e preservação logística","Riqueza não gera itens sem custo nem tempo","","Alquimista não é construtor de infraestrutura"],
 "em-zandar":["Pesquisa arcana de Nous e efeitos mentais","Ser gênio não concede feitiço sem estudo","","Necromante restringe pesquisa geral"],
 "em-shuhu":["Vida imortal e recuperação de aliados","Abundância não impede morte automática","","Usurpador rejeita devoção; é antitético"],
 "em-zephyro":["Chamas destruidoras e concentração de dano","Área de fogo precisa alcance, CD e consumo de PM","","Necromante não aperfeiçoa evocações"],
 "em-celenova":["Ordens de batalha e comando de legiões","Exércitos não se tornam parceiros gratuitos","","Burguês focaria dinheiro em vez de liderança"],
 "em-irontomb":["Construções mecânicas e ameaças tecnológicas","Máquinas não se fabricam sem materiais e tempo","","Alquimista não equivale a engenheiro de guerra"],
 "em-archforger":["Forja, mecanismos e armaduras aprimoradas","Forjar não ignora T$, ofício e materiais","","Alquimista foca preparados em vez de forja"],
 "em-asat":["Magia destrutiva de grande escala e medo","Técnicas não ignoram concentração e limite de PM","","Necromante não representa todo o arsenal"],
 "em-luxbane":["Magia de aniquilação e sombra solar","Devorar o sol não é efeito de magia básico","","Necromante só com catálogo de necromancia específico"],
 elster:["Sobrevivência, precisão e furtividade operacional","Equipamento de Replika ainda exige custo e treino","","Ventanista tiraria agressividade e armas de fogo"],
 "jojo-jonathan":["Hamon, heroísmo e proteção com artes marciais","Hamon não dá dano de luz sem poder adquirido","","Santo ainda exige regras de Paladino completas"],
 "jojo-joseph":["Truques de distração, disfarces e vantagem tática","Blefe não transforma truques em feitiços sem custo","ventanista","Magias simuladas representam truques e blefes, não Hamon mágico"],
 "jojo-jotaro":["Combinações de golpes e pressão por Star Platinum","Tempo parado não surge automaticamente do nível","","Inovador não se aplica a ataque desarmado único"],
 "jojo-josuke4":["Proteção e recuperação expressa por Crazy Diamond","Curar e restaurar objetos exigem habilidades específicas","","Santo é candidato posterior; não alterar sem tabela de Paladino"],
 "jojo-giorno":["Criação de vida por magia natural e proteção","Gold Experience não reescreve biologia sem magia","","Ermitão perde Forma Selvagem; checar conceito antes"],
 "jojo-jolyne":["Fios para mobilidade, armadilhas e precisão furtiva","Stone Free não concede alcance ou laço sem equipamento","","Ventanista oferece ilusão, não poderes de corda"],
 "jojo-johnny":["Tiros do Tusk e controle pelo Spin","ACT 4 não é acerto inevitável nem infinito","","Inovador precisaria trocar armas superiores a cada sequência"],
 "jojo-gappy":["Bolhas, controle ambiental e ataques especiais","Go Beyond não ignora regras de defesa sem magia","","Necromante é inadequado à manipulação de bolhas"],
 denji:["Estilo ofensivo agressivo e sacrifício controlado","Regeneração do Chainsaw Devil tem custo e condição","","Inovador não é melhor para única arma característica"],
 "satoru-gojo":["Defesa mágica, teleporte e domínio de espaço","Infinito não equivale a imunidade ou Defesa infinita","","Necromante conflita com controle espacial"],
 shigaraki:["Decaimento por efeitos necromânticos e imposição de condições","Decay exige magia e resistência: jamais desintegra automaticamente","necromante","Magias de Encantamento ficam proibidas; custo vital obrigatório"],
 midoriya:["Golpes potentes, deslocamento e crescimento marcial","One For All não multiplica FOR automaticamente","","Atleta perderia ataque múltiplo de Lutador"],
 toji:["Arsenal adquirido, ataque surpresa e multiclasse marcial","Restrição celestial não fornece imunidade sem item","","Inovador exige equipamento superior e compromete o kit atual"],
 aizen:["Ilusão elaborada e leitura do campo como Mago","Kyōka Suigetsu não elimina testes de Vontade","","Necromante proíbe Encantamento, essencial à build"],
 vegitto:["Fusão Potara com golpes desarmados e pressão constante","Fusão não combina duas fichas simultâneas","","Atleta enfraqueceria a cadência de golpes"],
 gogeta:["Fusão Metamoru com mobilidade e finalizações","Fusão não concede ações extras de graça","","Atleta trocaria múltiplos golpes por atletismo"],
 "soul-of-cinder":["Troca de postura entre lâmina e chamas arcanas","Equipamentos e magias de postura têm custos separados","","Inovador exigiria várias armas superiores registradas"],
 isaac:["Sobrevivência, lágrimas retematizadas como magias","Objetos passivos não concedem magias extras","","Necromante exige foco em escola incompatível com parte do kit"],
 adao:["Resposta de combate desarmado e precisão por leitura","Cópia de técnica não concede automaticamente o poder copiado","","Atleta prejudicaria o foco em contra-ataque"],
 grimm:["Espada, maldições e magia de risco","Armas amaldiçoadas precisam ser itens explícitos","","Necromante exigiria refazer lista de magias e custos"],
 sekiro:["Esgrima, infiltração e equipamentos protéticos","Reviver é recurso de jogo externo e não T20 grátis","","Inovador só se a mesa aprovar arsenal superior variado"],
 kaneki:["Combate ágil de ghoul e resistência à dor","Kagune precisa de arma/ataque natural formal","","Atleta tiraria golpes relevantes do Lutador"]
 };
 const main=data.characters||[];
 const ids=main.map(c=>c.id),missing=ids.filter(id=>!plans[id]);
 if(main.length!==69||missing.length||Object.keys(plans).length!==69||new Set(ids).size!==69){
  w.T20_ARCHIVE_REVISIONS={error:"Manifestações incompletas ou IDs inesperados: "+missing.join(", ")};
  return;
 }
 const bookPages={arcanista:"36–39",barbaro:"40–43",bardo:"43–46",bucaneiro:"46–49",cacador:"49–52",cavaleiro:"52–55",
  clerigo:"55–58",druida:"61–64",guerreiro:"64–67",inventor:"67–71",ladino:"72–74",lutador:"75–77",nobre:"78–81",paladino:"82–85"};
 const classIds={arcanista:"arcanista",guerreiro:"guerreiro",lutador:"lutador",ladino:"ladino",
  "ladina":"ladino",druida:"druida",inventor:"inventor",inventora:"inventor",bardo:"bardo",barda:"bardo",
  nobre:"nobre",clerigo:"clerigo",paladino:"paladino",barbaro:"barbaro",cacador:"cacador",
  cavaleiro:"cavaleiro",samurai:"samurai"};
 const norm=v=>String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const deriveClass=c=>{
  const raw=norm(c.info?.className);
  const first=raw.split(/[^a-z]+/).find(Boolean);
  return classIds[first]||"";
 };
 const stages=["Estabelecimento do kit","Escolha de poder inicial","Consolidação defensiva","Aprimoramento tático",
 "Primeiro patamar intermediário","Nova janela de ação","Expansão estratégica","Ajuste e especialização",
 "Segundo patamar intermediário","Técnica avançada","Refinamento de recursos","Síntese da build"];
 const clone=x=>JSON.parse(JSON.stringify(x));
 const records={};
 const origById={};
 const abilityName=id=>rules.abilities?.[id]?.name||id.replace(/-/g," ");
 function rulesForLevel(variant,level){
  const row=variant?.levels?.[level];if(!row)return null;
  return {kept:(row.keep||[]).map(abilityName),gained:(row.add||[]).map(abilityName)};
 }
 for(const c of main){
  const [identity,caution,variantId,comparison]=plans[c.id];
  const classId=deriveClass(c);
  const variant=variantId?opts.variants[variantId]:null;
  if(variantId&&(!variant||variant.status!=="verificado"||variant.baseClassId!==classId))throw Error("Variante incompatível com "+c.id);
  const existing=c._guide||guide.people[c.id]||{levels:[],basics:[]};
  const originalProgress=clone(c.progression||[]),originalGuide=clone(existing);
  if(originalProgress.length!==12||existing.levels?.length!==12)throw Error("Original sem doze níveis: "+c.id);
  origById[c.id]={progression:originalProgress,guide:originalGuide,info:clone(c.info),notes:clone(c.notes)};
  const assigned=variant?variant.name:null;
  const refs=variant?[["heroes",variant.source.page,"Classe variante "+variant.name]]:[];
  const newLevels=[];
  const guideLevels=[];
  for(let idx=0;idx<12;idx++){
   const old=originalProgress[idx],oldGuide=existing.levels[idx]||{},lv=idx+1;
   const stage=stages[idx],step=rulesForLevel(variant,lv);
   const cleanGain=step?[...step.kept,...step.gained]:[];
   const powerSlot=variant&&lv>=2?"Poder de "+(classId==="ladino"?"Ladino":"Arcanista")+" (escolha compatível a revisar)":null;
   const title=variant?(variant.name+" "+lv+" · "+(cleanGain.join(" / ")||(powerSlot||"Poder de classe"))+(cleanGain.length&&powerSlot?" · "+powerSlot:"")):old[1];
   const priorDesc=String(old[2]||"");
   const priorWhy=String(oldGuide.why||"");
   const priorUse=String(oldGuide.use||"");
   // Não dar poderes da classe original por associação de palavras ou por narrativa.
   // Poderes selecionáveis antes existentes precisam passar nos pré-requisitos da variante.
   const why=(variant
    ?stage+": "+identity+". "+(cleanGain.length?"A tabela da variante concede "+cleanGain.join(", ")+". ":"A tabela da variante não concede habilidade automática adicional neste patamar. ")+"Escolhas de poderes de "+(c.info.className||classId)+" exigem revisão separada."
    :priorWhy+" Revisão de classe (Fase IV, nível "+lv+"): "+stage.toLowerCase()+" para "+identity.toLowerCase()+". A classe básica foi mantida porque "+comparison.toLowerCase()+".");
   const use=(variant
    ?"Na mesa, obtenha somente as habilidades listadas na tabela de "+assigned+" neste nível, observando custo em PM, ação, alvo e condições. "+caution+". "+(priorUse?"A proposta anterior fica como referência, não como poder extra: "+priorUse:"")
    :priorUse+" Diretriz da revisão: "+caution+". O passo "+lv+" não confere uma nova classe, variante ou poder por mera equivalência narrativa.");
   const rowDetail=(variant
    ?"TABELA "+assigned+" · "+stage+". "+(cleanGain.length?"Automáticas: "+cleanGain.join(", ")+". ":"Sem automáticas adicionais. ")+
     "Poderes de "+classId+" e outras escolhas anteriores só permanecem se legalmente selecionados e com pré-requisitos; "+caution+"."
    :priorDesc+" | FASE IV: "+stage+" — "+identity+". "+caution+".");
   const nextRef=[...refs,...(Array.isArray(oldGuide.ref)?oldGuide.ref:[])];
   const seen=new Set();
   const filteredRef=nextRef.filter(r=>{const key=r.join("|");if(seen.has(key))return false;seen.add(key);return true;});
   newLevels.push([old[0],title,rowDetail]);
   guideLevels.push({...oldGuide,why,use,ref:filteredRef,
    ...(variant?{automatic:cleanGain.join(" · ")||"Nenhuma habilidade automática nesta faixa"}:{})});
  }
  c.progression=newLevels;
  const newGuide={...existing,levels:guideLevels};
  c._guide=newGuide;
  guide.people[c.id]=newGuide;
  // Nunca alterar PV/PM/Defesa/velocidade legados sem cálculo integral de classe.
  // No entanto, marcar que não estão validados após troca de classe variante.
  const result={
   id:c.id,name:c.name,universe:c.universe,classId,originalClass:origById[c.id].info.className,
   currentClass:assigned?c.info.className+" → "+assigned:c.info.className,
   chosenVariant:variantId||null,variantStatus:variant?"mecânica 1–12 verificada":"classe preservada",
   source:variant?{book:HEROES,pages:variant.source.page,table:variant.source.section}:CORE,
   goal:identity,risk:caution,decision:variant?
    "Variante proposta a partir da tabela oficial; escolhas anteriores de poder e derivados exigem conferência individual.":
    "Classe já existente preservada; progressão e uso reanalisados sem forçar variante.",
   comparison,
   derivedNumbers:"LEGADOS — conferência pendente (PV/PM/Defesa/ataques/equipamento)",
   reviewStatus:"revisao-pendente",
   levels:newLevels.map((x,i)=>({level:i+1,title:x[1],reason:guideLevels[i].why,use:guideLevels[i].use,
    ref:guideLevels[i].ref,original:originalProgress[i][1]}))
  };
  records[c.id]=result;
  c._classRevision=result;
  c.notes.progression=(origById[c.id].notes.progression||"")+
   "\nFASE IV // CLASSE: "+(variant?"proposta de "+variant.name:"mantida: "+c.info.className)+
   ". Estratégia: "+identity+". Atenção: "+caution+
   ". PV, PM, Defesa, equipamento e poderes selecionáveis conservam valores legados até conferência mecânica; não declarar esta ficha aprovada.";
  if(variant){
   c.info.className=origById[c.id].info.className+" / "+variant.name+" (revisão)";
  }
 }
 function draftById(id,engine){
  const c=main.find(c=>c.id===id);if(!c||!engine)return null;
  // Para os dez dossiers com builds normalizadas, preservar o preset original
  // e complementar somente a justificativa editorial; não reordenar multiclasse.
  const preset=c._auto?.draft;
  let d;
  if(preset)d=engine.normalize(preset);
  else{
   d=engine.makeDraft({catalogId:id,name:c.name,work:c.universe,theme:c.catalogCategory});
   const rec=records[id],known=!!engine.rules.classes[rec.classId];
   d.levels=c.progression.map((p,i)=>({...engine.emptyLevel(),
    classId:known?rec.classId:"",
    variantId:i===0?(rec.chosenVariant||""):"",
    why:c._guide.levels[i].why.slice(0,600),
    usage:c._guide.levels[i].use.slice(0,600),
    sourceNote:rec.source?.pages?"Heróis de Arton v1.1, p. "+rec.source.pages:"Jogo do Ano v1.3; conferir poder descrito"
   }));
   if(rec.chosenVariant==="necromante")d.arcanePath="necromante";
   if(rec.chosenVariant)d.allowedBooks=["jda-1.3","herois"];
   if(norm(c.info.race)==="humano")d.raceId="humano";
   const origin=Object.entries(engine.rules.origins||{}).find(([,o])=>norm(o.name)===norm(c.info.origin));
   if(origin)d.originId=origin[0];
   d.description=(c.excerpt||c.summary||rec.goal||"").slice(0,1000);
   d.combat.style=rec.goal;
   d.combat.weaknesses=rec.risk;
   d.combat.evolution="Evolução 1–12 revisada; poderes selecionáveis, PV, PM e opções de suplemento pendentes de aprovação.";
  }
  d.catalogId=id;
  d.name=c.name;
  d.work=c.universe;
  const rec=records[id];
  d.narrativeSubclass=(rec.chosenVariant?opts.variants[rec.chosenVariant].name:rec.goal).slice(0,100);
  d.notes=("Fase IV • "+rec.decision+" "+rec.risk+" A reconstrução dos 69 dossiês não atribui efeitos não verificados.").slice(0,2000);
  return engine.normalize(d);
 }
 const seeds=main.map(c=>({id:c.id,name:c.name,universe:c.universe,catalogCategory:c.catalogCategory||"arquivo"}));
 const api={version:"fase-iv-69-revisadas",total:main.length,steps:main.length*12,records,
  seeds,originals:origById,allReviewed:Object.keys(records).length===69,
  selection:Object.values(records).filter(r=>r.chosenVariant).map(r=>({id:r.id,name:r.name,variant:r.chosenVariant})),
  draftById,
  exportManifest:()=>JSON.stringify(Object.values(records),null,2)};
 w.T20_ARCHIVE_REVISIONS=api;
})();
