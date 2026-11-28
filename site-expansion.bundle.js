
/* catalog-revision.js */
/* FASE IV // Manifesto de auditoria dos 69 dossiês e quatro versões extras.
   Não altera os personagens: congela a referência original e lista pendências. */
(()=>{
 "use strict";
 const data=window.T20_DATA;
 if(!data||!Array.isArray(data.characters))return;
 const engine=window.T20_BUILD_ENGINE,books=window.T20_RULES,archive=window.T20_ARCHIVE_REVISIONS;
 const commit="0ef894e9e6ddde95133ff8bcbfc400dc1b399d5d";
 const clone=value=>JSON.parse(JSON.stringify(value??null));
 const getGuide=c=>c?c._guide||window.T20_GUIDE?.people?.[c.id]||{levels:[]}:null;
 const list=[...data.characters.map(c=>({key:c.id,version:"principal",character:c,guide:getGuide(c)}))];
 const diego=window.T20_ALTERNATES?.diego?.alternative;
 if(diego)list.push({key:"diego:alternative",version:"THE WORLD",character:diego,
  guide:window.T20_ALTERNATE_GUIDES?.diego||getGuide(diego)});
 const goku=window.T20_GOKU_VARIANTS||{};
 for(const id of ["gt","daima","super"])if(goku[id])list.push({key:"goku:"+id,version:id.toUpperCase(),character:goku[id],guide:getGuide(goku[id])});
 const entries=list.map(({key,version,character:c,guide})=>{
  const revision=key===c.id?archive?.records?.[c.id]:null;
  const draft=c?._auto?.draft||null;
  let evaluation=null;
  if(draft)try{const result=engine.evaluate(draft);evaluation={
   levels:result.rows.length,issues:result.issues,
   basePV:result.basePV,basePM:result.basePM,
   classes:result.levelsByClass,classVariants:result.classVariants,
   complete:result.complete
  }}catch(error){evaluation={error:String(error.message||error)}}
  const progression=Array.isArray(c.progression)?c.progression:[];
  const guideLevels=Array.isArray(guide?.levels)?guide.levels:[];
  const reasons=[];
  if(progression.length!==12)reasons.push("Progressão do dossiê não contém 12 níveis.");
  if(guideLevels.length!==12)reasons.push("Guia não contém 12 explicações de nível.");
  if(!draft)reasons.push("Não há build normalizada no motor; texto do dossiê não comprova legalidade mecânica.");
  if(revision)reasons.push("Fase IV: "+revision.decision+" "+revision.derivedNumbers+".");
  else reasons.push("Proposta do laboratório ainda é rascunho, não aprovada mecanicamente.");
  if(evaluation?.issues?.length)reasons.push("O motor aponta "+evaluation.issues.length+" pendências.");
  const oldBuild=draft?draft.levels.map((x,i)=>({globalLevel:i+1,classId:x.classId,variantId:x.variantId,powerId:x.powerId,
   why:x.why,usage:x.usage,sourceNote:x.sourceNote})):[];
  return {
   id:key,characterId:c.id,version,name:c.name,work:c.universe,category:c.catalogCategory,
   portrait:c.portrait?.url||null,
   oldBuildDescription:c.info?.className||c.info?.class||c._auto?.classPath||null,
   previousLevels:oldBuild,progressionLength:progression.length,guideLevels:guideLevels.length,
   sourceCount:Array.isArray(c.sources)?c.sources.length:0,
   evaluation,
   decision:revision?"REVISADA EM 12 NÍVEIS · CONFERÊNCIA FINAL PENDENTE":"AGUARDANDO FONTE / DECISÃO DA MESA",
   proposedChange:revision?{classId:revision.classId,chosenVariant:revision.chosenVariant,
    originalClass:revision.originalClass,goal:revision.goal,risk:revision.risk,levels:12}:null,
   guideDecision:revision?"GUIA POR NÍVEL RECONSTRUÍDO; APROVAÇÃO MECÂNICA PENDENTE":"PRESERVAR ATÉ VALIDAÇÃO",
   technicalStatus:progression.length===12&&guideLevels.length===12?"estrutura-presente":"estrutura-incompleta",
   mechanicalStatus:revision?"parcialmente-revisada":"não-validado",narrativeStatus:revision?"revisada-por-personagem":"revisão-individual-pendente",
   editorialStatus:"pendente",reasons
  };
 });
 const ids=entries.map(x=>x.id);
 const validation={
  expectedMain:69,actualMain:data.characters.length,
  expectedVariants:4,actualVariants:entries.length-data.characters.length,
  uniqueIds:new Set(ids).size===ids.length,
  allHaveTwelveLevels:entries.every(x=>x.progressionLength===12),
  approvedCount:entries.filter(x=>x.editorialStatus==="aprovado").length
 };
 // A exportação de backup precisa conter a versão ANTERIOR à Fase IV,
 // não somente uma cópia da revisão no navegador.
 function preservedVersion(x){
  const original=archive?.originals?.[x.key];
  const char=clone(x.character);
  if(original){
   char.progression=clone(original.progression);
   char.info=clone(original.info);
   char.notes=clone(original.notes);
   if(original.hadOwnGuide)char._guide=clone(original.guide);
   else delete char._guide;
  }
  return {id:x.key,version:x.version,character:char,guide:clone(original?.guide||x.guide)};
 }
 const backup={
  originCommit:commit,kind:"backup-editorial-versao-anterior",
  count:list.length,
  original:list.map(preservedVersion)
 };
 const report={title:"O SISTEMA // FASE IV — AUDITORIA",originalCommit:commit,
  revisedMain:entries.filter(x=>!x.id.includes(":")&&x.proposedChange).length,
  revisedSteps:archive?.steps||0,
  preserved:true,validation,entries};
 const save=(value,fileName)=>{
  const a=document.createElement("a"),blob=new Blob([JSON.stringify(value,null,2)],{type:"application/json"});
  a.href=URL.createObjectURL(blob);a.download=fileName;a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
 };
 window.T20_CLASS_REVIEW={report,backup,
  entries:()=>entries.map(clone),
  exportReport:()=>save(report,"t20-fase-iv-auditoria-73-registros.json"),
  exportBackup:()=>save(backup,"t20-fase-iv-backup-dossies.json")};
})();


/* umamusume-data.js */
/* FASE V — elenco principal de Umamusume. Arquétipos individuais para
 * Tormenta20 Jogo do Ano + Ameaças/Heróis de Arton. Dados de construção
 * originais: não contém habilidades copiadas do jogo ou trechos dos livros. */
(()=>{
 "use strict";
 const p=[
 // [id, nome, arco, classe, variante ou vazio, raça oficial, atributos, assinatura, estilo/tema, cor, slug oficial]
 ["special-week","Special Week","Spica","Lutador","Atleta","Centauro","racer","Promessa das duas mães","Superar a própria insegurança e avançar mesmo na reta final.","#e9a5db","specialweek"],
 ["silence-suzuka","Silence Suzuka","Spica","Lutador","Atleta","Moreau do Coelho","speed","A paisagem da liderança","Controle de corrida, disparada na dianteira e manutenção de ritmo.","#82c9ad","silencesuzuka"],
 ["tokai-teio","Tokai Teio","Spica","Lutador","Atleta","Sátiro","speed","Imperador que volta a correr","Saltos, recuperação e técnica veloz após cada derrota.","#96bcef","tokaiteio"],
 ["mejiro-mcqueen","Mejiro McQueen","Spica","Cavaleiro","","Centauro","endurance","Nobreza e resistência","Disciplina, proteção da equipe e endurance de longas distâncias.","#b7a3df","mejiromcqueen"],
 ["gold-ship","Gold Ship","Spica","Guerreiro","","Moreau da Hiena","brawler","Estratégia caótica","Força, provocações imprevisíveis e investidas inesperadas.","#e5a2bd","goldship"],
 ["vodka","Vodka","Spica","Guerreiro","","Moreau do Lobo","racer","Espírito de motociclista","Investidas ousadas, ímpeto e competição frontal.","#a1b2cd","vodka"],
 ["daiwa-scarlet","Daiwa Scarlet","Spica","Bucaneiro","","Meio-Elfo","finesse","Primeiro lugar absoluto","Precisão, presença e técnica competitiva sem perder elegância.","#ed7778","daiwascarlet"],
 ["kitasan-black","Kitasan Black","Temporada 3","Paladino","","Centauro","endurance","Coração que inspira","Resistência para ir além do limite e apoio aos companheiros.","#e28e6d","kitasanblack"],
 ["satono-diamond","Satono Diamond","Temporada 3","Nobre","","Qareen","charisma","Vencer a tradição","Paciência, comando e determinação elegante.","#98c1a4","satonodiamond"],
 ["satono-crown","Satono Crown","Temporada 3","Nobre","","Moreau da Raposa","tactician","Surpresa estratégica","Planejamento, discurso e ataque final calculado.","#c192cf","satonocrown"],
 ["cheval-grand","Cheval Grand","Temporada 3","Lutador","Atleta","Moreau do Coelho","endurance","Força discreta","Confiar em si e sustentar uma corrida longa.","#929ac9","chevalgrand"],
 ["duramente","Duramente","Temporada 3","Guerreiro","","Centauro","brawler","Força silenciosa","Ataque agressivo, pressão e explosões de aceleração.","#b14f5b","duramente"],
 ["sounds-of-earth","Sounds of Earth","Temporada 3","Bardo","","Sátiro","charisma","Sinfonia de corrida","Performance musical e coordenação de grupo.","#cbb6aa","soundsofearth"],
 ["nice-nature","Nice Nature","Canopus","Ladino","","Moreau do Gato","finesse","Terceiro lugar, grande coração","Aproveitar oportunidades, ajudar e sobreviver à pressão.","#c88a8e","nicenature"],
 ["twin-turbo","Twin Turbo","Canopus","Lutador","Atleta","Moreau do Coelho","speed","Turbo integral","Acelerar desde o início e sustentar o máximo possível.","#70aadc","twinturbo"],
 ["ikuno-dictus","Ikuno Dictus","Canopus","Inventor","","Meio-Elfo","tactician","Planilhas e persistência","Analisar adversários, preparar equipamentos e otimizar ritmo.","#8ba3ae","ikunodictus"],
 ["matikanetannhauser","Matikanetannhauser (Mambo)","Canopus","Lutador","Atleta","Moreau do Coelho","endurance","Mambo! Nunca desiste","Resiliência otimista, passos constantes e talento de recuperação.","#a5a4d9","matikanetannhauser"],
 ["daitaku-helios","Daitaku Helios","Palco e Rivais","Bardo","","Sátiro","charisma","Gyaru no máximo volume","Energia de festa, ritmo, animação e apoio ao grupo.","#62c6e7","daitakuhelios"],
 ["mejiro-palmer","Mejiro Palmer","Canopus","Cavaleiro","","Centauro","racer","Líder improvável","Ritmo prolongado, resistência e lealdade ao time.","#78bca2","mejiropalmer"],
 ["daiichi-ruby","Daiichi Ruby","Palco e Rivais","Nobre","","Elfo","charisma","Elegância imperturbável","Diplomacia, serenidade e comando disciplinado.","#b76d80","daiichiruby"],
 ["k-s-miracle","K.S. Miracle","Palco e Rivais","Paladino","","Suraggel Aggelus","support","Dedicação protetora","Dever, proteção e determinação altruísta.","#b1cbd9","ksmiracle"],
 ["yamanin-zephyr","Yamanin Zephyr","Palco e Rivais","Druida","","Dahllan","support","Vento livre","Afinidade natural e deslocamento sob condições do terreno.","#a4d3b7","yamaninzephyr"],
 ["rice-shower","Rice Shower","Temporada 2","Ladino","","Suraggel Sulfure","finesse","Sombra da vitória","Superar medo e culpa por meio de precisão e discrição.","#867ca8","riceshower"],
 ["mihono-bourbon","Mihono Bourbon","Temporada 2","Inventor","","Moreau da Raposa","tactician","Precisão de máquina","Protocolo tático, equipamento e corrida previsível.","#a3a8ce","mihonobourbon"],
 ["biwa-hayahide","Biwa Hayahide","BNW","Inventor","","Elfo","tactician","Cálculo perfeito","Tática, matemática e preparação minuciosa.","#c4b4a5","biwahayahide"],
 ["narita-taishin","Narita Taishin","BNW","Ladino","","Moreau do Gato","finesse","Reta final implacável","Ataque furtivo metafórico: aparecer apenas no momento certo.","#a9a3c1","naritataishin"],
 ["winning-ticket","Winning Ticket","BNW","Lutador","Atleta","Centauro","racer","Correr com emoção","Explosão emotiva e persistência no objetivo.","#d7b891","winningticket"],
 ["oguri-cap","Oguri Cap","Cinderella Gray","Guerreiro","","Centauro","endurance","O prodígio de Kasamatsu","Vigor, economia de energia e velocidade em qualquer pista.","#9faeb8","oguricap"],
 ["tamamo-cross","Tamamo Cross","Cinderella Gray","Arcanista","","Qareen","mind","Raio branco","Magia elétrica como releitura da aceleração explosiva.","#b1b7de","tamamocross"],
 ["inari-one","Inari One","Cinderella Gray","Ladino","","Moreau da Raposa","finesse","Espírito rebelde de Edo","Velocidade, oportunismo e bravura urbana.","#d29b89","inarione"],
 ["super-creek","Super Creek","Cinderella Gray","Clérigo","","Suraggel Aggelus","support","Cuidado maternal","Curar e oferecer segurança ao time sem benefícios gratuitos.","#a2cbd3","supercreek"],
 ["yaeno-muteki","Yaeno Muteki","Cinderella Gray","Lutador","","Moreau do Leão","brawler","Disciplina marcial","Técnica corporal, concentração e golpes precisos.","#e29d74","yaenomuteki"],
 ["bamboo-memory","Bamboo Memory","Cinderella Gray","Paladino","","Moreau do Lobo","racer","Código da justiça","Vigilância, proteção e corrida determinada.","#7cb49c","bamboomemory"],
 ["mejiro-ardan","Mejiro Ardan","Cinderella Gray","Nobre","","Elfo","charisma","Elegância e fragilidade","Apoio, coragem e autocuidado nas provas de resistência.","#a7bce5","mejiroardan"],
 ["sakura-chiyono-o","Sakura Chiyono O","Cinderella Gray","Lutador","Atleta","Dahllan","racer","Cerejeira que não recua","Preparar o sprint com coragem e paciência.","#ebabb7","sakurachiyonoo"],
 ["symboli-rudolf","Symboli Rudolf","Lendas","Nobre","","Meio-Elfo","charisma","A Imperatriz","Autoridade, estratégia e comando de companheiras.","#9d8eaf","symbolirudolf"],
 ["air-groove","Air Groove","Lendas","Nobre","","Elfo","tactician","A Imperatriz do ar","Liderança disciplinada, ordem e leitura tática.","#a4b4e3","airgroove"],
 ["narita-brian","Narita Brian","Lendas","Guerreiro","","Centauro","brawler","Sombra voraz","Poder de ataque contínuo e pressão devastadora.","#888b94","naritabrian"],
 ["sakura-bakushin-o","Sakura Bakushin O","Lendas","Lutador","Atleta","Moreau do Coelho","speed","BAKUSHIN!","Pura velocidade em linha reta e entusiasmo inabalável.","#f0b19e","sakurabakushino"],
 ["haru-urara","Haru Urara","Lendas","Lutador","Atleta","Moreau do Coelho","racer","Alegria sem vitórias","Esforço, resistência emocional e cooperação.","#e4a8b1","haruurara"],
 ["grass-wonder","Grass Wonder","Geração Dourada","Guerreiro","","Dahllan","finesse","Gentileza de aço","Calma, técnica refinada e precisão decisiva.","#8cafac","grasswonder"],
 ["el-condor-pasa","El Condor Pasa","Geração Dourada","Lutador","","Moreau do Leão","brawler","Luchadora invencível","Luta corporal, máscara e carisma atlético.","#e8ae83","elcondorpasa"],
 ["king-halo","King Halo","Geração Dourada","Nobre","","Meio-Elfo","charisma","O sangue de primeira","Pressão social, dignidade e liderança elegante.","#95b3ad","kinghalo"],
 ["taiki-shuttle","Taiki Shuttle","Geração Dourada","Caçador","","Moreau da Raposa","racer","Sprint internacional","Velocidade de aproximação e ataques à distância.","#d5ad95","taikishuttle"],
 ["hishi-amazon","Hishi Amazon","Lendas","Guerreiro","","Moreau do Leão","brawler","Rainha da academia","Força, rivalidade e proteção de colegas.","#c991a4","hishiamazon"],
 ["fuji-kiseki","Fuji Kiseki","Lendas","Bardo","","Qareen","charisma","Espetáculo da pista","Presença teatral e inspiração social.","#d09da8","fujikiseki"],
 ["seiun-sky","Seiun Sky","Geração Dourada","Ladino","","Moreau da Raposa","finesse","Preguiça calculista","Armadilhas táticas e vantagens por posicionamento.","#8eb6d0","seiunsky"],
 ["nishino-flower","Nishino Flower","Geração Dourada","Bardo","","Meio-Elfo","charisma","Gentileza floral","Apoio positivo e motivação que não ignora regras de magia.","#e7c6c2","nishinoflower"],
 ["curren-chan","Curren Chan","Lendas","Bardo","","Moreau do Gato","charisma","Fofura estratégica","Autoconfiança, atuação e leitura social.","#e6aec5","currenchan"],
 ["narita-top-road","Narita Top Road","Road to the Top","Lutador","Atleta","Centauro","racer","Rumo ao topo","Treino dedicado, resistência e precisão de trajetória.","#d8ac95","naritatoproad"],
 ["admire-vega","Admire Vega","Road to the Top","Ladino","","Suraggel Sulfure","finesse","Estrela solitária","Mobilidade discreta e gerenciamento de riscos.","#8f8cab","admirevega"],
 ["tm-opera-o","T.M. Opera O","Road to the Top","Bardo","","Qareen","charisma","O teatro da vitória","Carisma performático e liderança extravagante.","#ddaf66","tmoperao"],
 ["meisho-doto","Meisho Doto","Road to the Top","Clérigo","","Moreau do Coelho","support","Gentileza resiliente","Resistência tímida e auxílio em horas difíceis.","#9fb7ba","meishodoto"],
 ["jungle-pocket","Jungle Pocket","Nova Era","Guerreiro","","Moreau do Leão","brawler","Vontade selvagem","Combate determinado e arrancada na hora decisiva.","#d59a7f","junglepocket"],
 ["agnes-tachyon","Agnes Tachyon","Nova Era","Inventor","","Elfo","tactician","Ciência da velocidade","Preparações, experimentos e engenharia de desempenho.","#b8c6cc","agnestachyon"],
 ["manhattan-cafe","Manhattan Cafe","Nova Era","Arcanista","","Suraggel Sulfure","mind","Café e presenças ocultas","Magias sutis e leitura do sobrenatural com custos reais.","#9da1b1","manhattancafe"],
 ["dantsu-flame","Dantsu Flame","Nova Era","Lutador","Atleta","Centauro","endurance","Chama de perseverança","Treino incansável e avanços no segundo tempo.","#cb8b81","dantsuflame"]
 ];
 const pictures={
 "special-week":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/e529e8ff6a1746fa8a3af030c65f0cc4/specialweek_02_2.png",
 "silence-suzuka":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/7296e365fcfe47709048d7152f5020cb/silencesuzuka_02.png",
 "tokai-teio":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/22d0e81b38644f22bbe1714c3125ff23/tokaiteio_02.png",
 "mejiro-mcqueen":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/d7e165c2452344e7ac47467513fd53ba/mejiromcqueen_02.png",
 "gold-ship":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/a3e95391f9f84d539da524afd78264f0/goldship_02.png",
 "kitasan-black":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/8df216d476cb4ccfb67b6d47cb85167f/kitasanblack_02.png",
 "satono-diamond":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/73515e5e8dc34bd8ab2bf1d410782b2d/satonodiamond_02.png",
 "oguri-cap":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/82b20a3edaaf424c8aece70590a9d7e2/oguricap_02.png",
 "daitaku-helios":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/07320f4d49f840448c268aaa630747f2/daitakuhelios_02.png",
 "matikanetannhauser":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/f859d3a9353645a1a78972704657c489/matikanetannhauser_02.png"
 };

 Object.assign(pictures, {
  "nice-nature": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/fd043e415e244999bcb67856eebba62b/nicenature_02.png",
  "twin-turbo": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/e5bc87f0f01648779e18a28033d024d1/twinturbo_02.png",
  "ikuno-dictus": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/8d2d3b35f5aa49359739043c32015ecc/ikunodictus_02.png",
  "mejiro-palmer": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/06cb6e64248946c3aa94a9c15564abb6/mejiropalmer_02.png",
  "daiichi-ruby": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/f6718aec3d864be8babf91af3d6d4dde/daiichiruby_02.png",
  "k-s-miracle": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/98a14ca3eef44cb5b039bc5c2546ddda/k-s-miracle_02.png",
  "yamanin-zephyr": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/1c587ed73d43477ebe59b59fca5713f5/yamaninzephyr_02.png",
  "rice-shower": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/a34a77e550084f55ae886b12386d97aa/riceshower_02.png",
  "mihono-bourbon": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/b9baf5e39a7a4e7984f5d85dc80b538a/mihonobourbon_02.png",
  "cheval-grand": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/7996af1196e845ee94e6d967c3ec0b2e/chevalgrand_02.png",
  "duramente": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/704efc9c343b40da8aa9d9f238e2c89a/duramente_02.png",
  "satono-crown": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/032fe6d6877543c7b3dfcbea59bfc937/satonocrown_02.png",
  "vodka": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/d1fda143d78c4c9d8eaddb52d0ba1b29/vodka_02.png",
  "daiwa-scarlet": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/df4d1573b9d14810bef6a2325d6bc28b/daiwascarlet_02.png",
  "sounds-of-earth": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/f64f299d136940ab8413041dadc050d1/soundsofearth_02.png",
  "narita-brian": "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/48723e8d418642e2a8072457e94cf93c/naritabrian_02.png"
});

 Object.assign(pictures,{"biwa-hayahide":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/018657428e154d0ba5d5d2b5e668c0c2/biwahayahide_02.png","narita-taishin":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/4957cceae7c6408290fb5fec5f4e8e95/naritataishin_02.png","winning-ticket":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/ddf94a436b594d039f5a0df01477cddf/winningticket_02.png","tamamo-cross":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/0e4a2c8ab66d4c88baf90057fe7ed0ef/tamamocross_02.png","inari-one":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/0a5bb52bf02f4a8a9e4c0d85ecd20298/inarione_02.png","super-creek":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/42474b5422f543308308745ef9ae001a/supercreek_02.png","yaeno-muteki":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/0d817089c3424e6096fe7a1c21c6575f/yaenomuteki_02.png","bamboo-memory":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/656d58939921432dab981c6c817f7b5e/bamboomemory_02.png","mejiro-ardan":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/5f25fbe1d5b44ae3a92fe5e3406ae52a/mejiroardan_02.png","sakura-chiyono-o":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/8c8d5b9b11ce46b7930f2bcba26ac6c4/sakurachiyonoo_02_2.png","symboli-rudolf":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/d551669d9aa3428a96b53f44a4cb9d67/symbolirudolf_02.png","sakura-bakushin-o":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/f0802ab7409a47e2bc96a5267846c10c/sakurabakushino_02.png","haru-urara":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/bc1b957fb0a9407fb2c65dd570162ab7/haruurara_02.png","grass-wonder":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/0c82c6b5b6fd4c5fa600ebea81c78f46/grasswonder_02.png","el-condor-pasa":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/36a8b525b7fe4365823574d3d748a57c/elcondorpasa_02.png"});

 Object.assign(pictures,{"king-halo":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/8c6e5582d8e5468e99c195522097f8fa/kinghalo_02.png","hishi-amazon":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/f7f890f53c8f4093aded4f362509904c/hishiamazon_02.png","fuji-kiseki":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/e2f6fd0eaa73487d9c1a2c7aa20b5648/fujikiseki_02.png","seiun-sky":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/35483c4055ea4693a009ade02ba8bcd9/seiunsky_02.png","nishino-flower":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/f8a171607d2e4c81a2a8fd59f4f88d49/nishinoflower_02.png","curren-chan":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/cdce03adb52843de93a23453d364270c/currenchan_02.png","narita-top-road":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/e124fbca258847f1b241a47d9f03fa84/naritatoproad_02.png","admire-vega":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/62fc0491475b43589eaebc8cd99f6c74/admirevega_02.png","tm-opera-o":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/549e1dc6e86f440e993a284d032b9e3d/tmoperao_02.png","meisho-doto":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/d185afa17e954e8f8275788ed7d1820b/meishodoto_02.png","jungle-pocket":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/4201ced0eb7941528b7c9ca6d5c4b9d0/junglepocket_02.png","agnes-tachyon":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/46309e6c791148608296739561f3ea3c/agnestachyon_02.png","manhattan-cafe":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/f61676f72bb944ddb664723b35139f7b/manhattancafe_02.png","dantsu-flame":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/1f4a96c2e4cd4e72ac168efeaef1ef1c/dantsuflame_02.png"});

 Object.assign(pictures,{"taiki-shuttle":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/aa5a8386483f41b3bee5cfa7cdebccd4/taikishuttle_02.png","air-groove":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/987c0e4afce24b46a4e0598e7ce6df9e/airgroove_04.png"});
 window.T20_UMA_SEEDS=p.map(([slug,name,arc,klass,variant,race,focus,title,concept,color,officialSlug])=>({
  id:"uma-"+slug,slug,name,arc,klass,variant,race,focus,title,concept,color,
  official:"https://umamusume.jp/character/"+officialSlug,
  image:pictures[slug]||null
 }));
})();


/* umamusume-runtime.js */
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


/* crossovers-data.js */
/* FASE VI — 16 adaptações multiversais, editoriais e auditáveis. */
(()=>{
"use strict";
const seeds=[
  {
    "id": "cx-megumin",
    "name": "Megumin",
    "universe": "KonoSuba",
    "group": "konosuba",
    "className": "Arcanista",
    "subclass": "Feiticeira",
    "race": "Qareen",
    "profile": "charisma",
    "color": "#e74b56",
    "identity": "EXPLOSION // MAGIA DEFINITIVA",
    "concept": "Especialista em uma única explosão de grande impacto: canaliza recursos para um feitiço decisivo, e não repete magias sem custo.",
    "signature": "Bola de Fogo (2º círculo, quando aprendida); focar PM e custo de aprimoramentos",
    "weapon": "Cajado",
    "bookPage": "36–40",
    "path": "feiticeiro",
    "source": "https://www.crunchyroll.com/pt-br/news/guides/2024/6/26/konosuba-personagens",
    "image": "https://konosuba.com/1st/character/img/megumin.png",
    "imageCredit": "KonoSuba — character visual oficial do anime",
    "styles": [
      "Mago de Explosão",
      "Foco no impacto",
      "Uma descarga por cena"
    ],
    "levels": [
      "Linhagem Feiticeira e magias de 1º círculo; explosão ainda não liberada",
      "Poder Mágico (proposta; conferir escolha)",
      "Magia Pungente (proposta; custo adicional)",
      "Aprimorar ataque mágico, sem burlar PM",
      "Acesso a magias de 2º círculo; selecionar Bola de Fogo se disponível",
      "Especialização em fogo, custos e CD revisados",
      "Fortalecimento Arcano se elegível",
      "Reserva de PM ou magia adicional (escolha)",
      "Acesso ao 3º círculo, se elegível",
      "Aumento de Carisma (escolha de poder)",
      "Conjuração decisiva e preparação de fuga",
      "Síntese: grande magia e consequência por gastar PM"
    ]
  },
  {
    "id": "cx-eris-greyrat",
    "name": "Eris Boreas Greyrat",
    "universe": "Mushoku Tensei",
    "group": "mushoku",
    "className": "Guerreiro",
    "race": "Moreau do Leão",
    "profile": "brawler",
    "color": "#db775d",
    "identity": "ESPADA SAGRADA // ESCOLA DO DEUS DA ESPADA",
    "concept": "Espadachim agressiva que prioriza precisão, coragem e explosões de dano físico; sem magia automática.",
    "signature": "Ataque Especial, Durão e Ataque Extra; arma cortante oficial",
    "weapon": "Espada longa",
    "bookPage": "64–67",
    "source": "https://mushokutensei.jp/",
    "image": "https://s1.zerochan.net/Eris.Boreas.Greyrat.600.4190506.jpg",
    "imageCredit": "Studio Bind — arte promocional via Zerochan",
    "styles": [
      "Impulso da Espada",
      "Vontade indomável",
      "Ritmo de duelo"
    ],
    "levels": [
      "Ataque Especial; início da espada",
      "Estilo de Uma Arma (proposta; pré-requisitos)",
      "Durão (automático) e disciplina defensiva",
      "Golpe Pessoal (se elegível; definir custo)",
      "Ataque Especial aprimorado; precisão de corte",
      "Ataque Extra (automático) sob gasto de PM",
      "Foco em Arma (proposta e perícia Luta)",
      "Aumento de Força (poder escolhido)",
      "Ataque Especial aprimorado; ritmo de pressão",
      "Golpe Pessoal revisado, com custo",
      "Especialização em Arma (pré-requisitos)",
      "Defesa de duelo e aprimoramento final"
    ]
  },
  {
    "id": "cx-rudeus-greyrat",
    "name": "Rudeus Greyrat",
    "universe": "Mushoku Tensei",
    "group": "mushoku",
    "className": "Arcanista",
    "subclass": "Mago",
    "race": "Elfo",
    "profile": "tactician",
    "color": "#b2b38a",
    "identity": "QUADRIMAGIA // MAGO DA LAMA",
    "concept": "Mago erudito de vários elementos, controle de terreno, defesa e flexibilidade; não dispõe de magia silenciosa gratuita.",
    "signature": "Magias de terra, água e fogo, Campo de Força quando aprendido; administração de PM",
    "weapon": "Cajado",
    "bookPage": "36–40",
    "path": "mago",
    "source": "https://mushokutensei.jp/",
    "image": "https://news.mynavi.jp/article/20230501-2669591/index_images/index.jpg",
    "imageCredit": "Mushoku Tensei II — desenho oficial Studio Bind via Mynavi",
    "styles": [
      "Feitiços sem canto (narrativo)",
      "Controle da lama",
      "Estudo permanente"
    ],
    "levels": [
      "Caminho do Arcanista: Mago; grimório e magias 1º círculo",
      "Conhecimento Mágico (proposta)",
      "Magia Pungente ou defesa arcana (escolha)",
      "Poder Mágico (escolha)",
      "Magias do 2º círculo; controle de terreno",
      "Campo de Força se conhecido; defesa exige reação/PM",
      "Magias temáticas de água e terra adquiridas",
      "Aumento de Inteligência (escolha)",
      "3º círculo se obtido e magias selecionadas",
      "Conhecimento Mágico (ver repetição e limite)",
      "Fluxo de Mana (ver requisito)",
      "Aprimoramentos dentro do limite de PM"
    ]
  },
  {
    "id": "cx-roxy-migurdia",
    "name": "Roxy Migurdia",
    "universe": "Mushoku Tensei",
    "group": "mushoku",
    "className": "Arcanista",
    "subclass": "Bruxa",
    "race": "Suraggel Sulfure",
    "profile": "tactician",
    "color": "#7e9de7",
    "identity": "MESTRA DE MAGIA AQUÁTICA",
    "concept": "Conjuradora paciente e professora; usa água e gelo como linguagem narrativa para feitiços oficiais.",
    "signature": "Magias arcanas de gelo/água realmente aprendidas; administração de círculo e PM",
    "weapon": "Cajado",
    "bookPage": "36–40",
    "path": "bruxo",
    "source": "https://mushokutensei.jp/",
    "image": "https://i.pinimg.com/originals/ce/78/90/ce7890c01ae99e3786fb8ccaf9669b09.jpg",
    "imageCredit": "Mushoku Tensei — arte de personagem reproduzida no Pinterest",
    "styles": [
      "Ensino mágico",
      "Domínio da água",
      "Conjuração metódica"
    ],
    "levels": [
      "Caminho do Arcanista: Bruxa; foco arcano",
      "Conhecimento Mágico (proposta)",
      "Magia Pungente (proposta)",
      "Defesas mágicas com custo",
      "Segundo círculo se habilitado",
      "Magia de frio/água aprendida e ação definida",
      "Aprimoramentos de área (se permitidos)",
      "Aumento de Inteligência (escolha)",
      "Terceiro círculo e requisitos de lançamento",
      "Controle de grupo com duração correta",
      "Magia Discreta (opção geral se elegível)",
      "Gestão de focos e redundância mágica"
    ]
  },
  {
    "id": "cx-wuwa-rover",
    "name": "Rover (WuWa)",
    "universe": "Wuthering Waves",
    "group": "wuwa",
    "className": "Guerreiro",
    "race": "Meio-Elfo",
    "profile": "finesse",
    "color": "#bdc6d3",
    "identity": "RESSONÂNCIA // LÂMINA ERRANTE",
    "concept": "Protagonista de Wuthering Waves com espada e múltiplas ressonâncias. Diferentes elementos são estratégias e efeitos oficiais, não quatro classes gratuitas.",
    "signature": "Ataque Especial e Golpe Pessoal; afinidades distintas apenas com efeitos legalmente adquiridos",
    "weapon": "Espada longa",
    "bookPage": "64–67",
    "source": "https://wutheringwaves.kurogames.com/en/main",
    "image": "https://static.dotgg.gg/wuthering-waves/characters/rover-female-image.webp",
    "imageCredit": "Kuro Games — arte feminina de Rover via WutheringWaves.gg",
    "styles": [
      "Ressonância Astral",
      "Troca de afinidade (narrativa)",
      "Parceria com ecos"
    ],
    "levels": [
      "Ataque Especial e espada; definir apresentação feminina padrão",
      "Treino em mobilidade (poder a escolher)",
      "Durão; técnica de reação",
      "Golpe Pessoal: corte ressonante, custo a definir",
      "Ataque Especial ampliado",
      "Ataque Extra sujeito a PM",
      "Alternar estilos sem ganhar poderes gratuitos",
      "Aumento de Destreza/Força (escolha)",
      "Ataque Especial ampliado e golpe temático",
      "Especialização em Arma quando elegível",
      "Defesa por posicionamento",
      "Versatilidade ressonante dentro da ficha adquirida"
    ]
  },
  {
    "id": "cx-wuwa-chisa",
    "name": "Chisa (WuWa)",
    "universe": "Wuthering Waves",
    "group": "wuwa",
    "className": "Guerreiro",
    "race": "Suraggel Sulfure",
    "profile": "brawler",
    "color": "#b55063",
    "identity": "HAVOC // TESOURA CARMESIM",
    "concept": "Espada pesada que lembra uma tesoura e cortes Havoc, com foco no alcance físico e na interrupção; nenhum corte causal automático.",
    "signature": "Ataque Especial, Golpe Pessoal e Ataque Extra mediante PM",
    "weapon": "Espada de duas mãos",
    "bookPage": "64–67",
    "source": "https://wutheringwaves.kurogames.com/en/main/news/detail/3595",
    "image": "https://idphhmvmuywfflotbvei.supabase.co/storage/v1/object/public/wutheringwaves/characters/Chisa/default.webp?format=webp&height=600&resize=cover&width=720",
    "imageCredit": "Kuro Games — retrato de Chisa via Dennlog",
    "styles": [
      "Ruptura vermelha",
      "Cisalha de bloqueios",
      "Devastação controlada"
    ],
    "levels": [
      "Ataque Especial com lâmina pesada",
      "Estilo de Duas Mãos (poder geral, confirmar requisito)",
      "Durão e sustentação",
      "Golpe Pessoal: tesoura ressonante",
      "Ataque Especial ampliado",
      "Ataque Extra (quando permitido e pago)",
      "Investida de pressão e controle de espaço",
      "Aumento de Força (escolha)",
      "Ataque Especial melhorado",
      "Golpe Pessoal revisado e custo de PM",
      "Crítico e poder de arma (se selecionado)",
      "Estabilidade e síntese de corte"
    ]
  },
  {
    "id": "cx-vergil",
    "name": "Vergil",
    "universe": "Devil May Cry",
    "group": "dmc",
    "className": "Guerreiro",
    "race": "Suraggel Sulfure",
    "profile": "finesse",
    "color": "#77a4d5",
    "identity": "YAMATO // CORTE DA MOTIVAÇÃO",
    "concept": "Espadachim demoníaco com cortes rápidos e postura precisa. Judgement Cut é um Golpe Pessoal, não teleporte ou turno extra automático.",
    "signature": "Ataque Especial, Golpe Pessoal com visual de Yamato, Ataque Extra pago",
    "weapon": "Katana (consulte arma oficial e proficiência)",
    "bookPage": "64–67",
    "source": "https://store.steampowered.com/app/1432640/Devil_May_Cry_5__Personagem_Jogavel_Vergil/",
    "image": "https://tiermaker.com/images/chart/chart/devil-may-cry-5-characters-7984/dmc5_vergil_render-2png",
    "imageCredit": "Capcom — render de Vergil republicado via TierMaker",
    "styles": [
      "Iaijutsu narrativo",
      "Judgement Cut",
      "Concentração implacável"
    ],
    "levels": [
      "Ataque Especial; arma ágil ou katana com proficiência",
      "Foco em Arma (opção a conferir)",
      "Durão; contra-ataque narrativo",
      "Golpe Pessoal: corte concentrado (custo)",
      "Ataque Especial aprimorado",
      "Ataque Extra conforme ação e PM",
      "Estilo de Uma Arma com pré-requisitos",
      "Aumento de Destreza (opção)",
      "Ataque Especial aprimorado",
      "Nova configuração de Golpe Pessoal se cabível",
      "Especialização em Arma se elegível",
      "Corte supremo limitado pelas regras de ataque"
    ]
  },
  {
    "id": "cx-wuwa-cartethyia",
    "name": "Cartethyia",
    "universe": "Wuthering Waves",
    "group": "wuwa",
    "className": "Paladino",
    "race": "Suraggel Aggelus",
    "profile": "charisma",
    "color": "#a4d5e7",
    "identity": "VENTO DIVINO // ESPADA DA REDENÇÃO",
    "concept": "Espadachim Aero de formas contrastantes; o vento serve à identidade visual da proteção e da espada sagrada, sem voo gratuito.",
    "signature": "Golpe Divino e recursos paladinescos; forma alternativa representada por postura ou magia adquirida",
    "weapon": "Espada longa",
    "bookPage": "81–85",
    "source": "https://wutheringwaves.kurogames.com/en/main/news/detail/2733",
    "image": "https://static.wikia.nocookie.net/wutheringwaves/images/e/ee/Cartethyia_Full_Sprite.png/revision/latest/scale-to-width-down/1200?cb=20250620084445",
    "imageCredit": "Kuro Games — sprite oficial via Wuthering Waves Wiki",
    "styles": [
      "Cavaleira do vento",
      "Sopro celeste",
      "Forma ressonante (narrativa)"
    ],
    "levels": [
      "Abençoado e Golpe Divino; devoção exigida",
      "Poder defensivo de Paladino (escolha)",
      "Recurso de proteção de classe (conferir tabela)",
      "Especialização na espada (pré-requisito)",
      "Bênção e defesa coletiva se adquiridas",
      "Técnica de cura ou aura (nível a conferir)",
      "Aumento de Carisma (escolha)",
      "Proteção de aliados em posição",
      "Golpe Divino aprimorado conforme classe",
      "Resistência contra aflições (se acessível)",
      "Postura celestial (apenas visual)",
      "Espada e defesa: limites e PM"
    ]
  },
  {
    "id": "cx-edward-elric",
    "name": "Edward Elric",
    "universe": "Fullmetal Alchemist",
    "group": "fma",
    "className": "Inventor",
    "race": "Meio-Elfo",
    "profile": "tactician",
    "color": "#bd3c46",
    "identity": "ALQUIMIA // TROCA EQUIVALENTE",
    "concept": "Transmutação é representada por engenhocas, Ofício e preparados. O braço automail é equipamento de aparência, nunca poder gratuito.",
    "signature": "Engenhosidade, Protótipo e engenhocas; Alquimista variante ainda não verificada no motor",
    "weapon": "Espada curta (automail narrativo)",
    "bookPage": "67–72",
    "source": "https://www.aniplex.co.jp/lineup/hagaren/",
    "image": "https://2.bp.blogspot.com/-NXJR67j4zSQ/TawRM2IdPGI/AAAAAAAAAB0/8gmf72NT-MU/s1600/edward%2Belric.jpg",
    "imageCredit": "Fullmetal Alchemist — imagem de personagem repostada em blog",
    "styles": [
      "Transmutação tática",
      "Automail adaptado",
      "Troca equivalente"
    ],
    "levels": [
      "Engenhosidade e Protótipo (Inventor)",
      "Alquimista Iniciante (se poder disponível)",
      "Engenhoqueiro (proposta e Ofício)",
      "Preparados alquímicos com custo de ingredientes",
      "Aumento de Inteligência (escolha)",
      "Ferramentas e protótipo aprimorados, ver regra",
      "Ofício especializado: engenhocas defensivas",
      "Recursos químicos por compra e tempo",
      "Aumento de Inteligência (escolha)",
      "Equipamento aprimorado sem efeito grátis",
      "Engenhosidade e perícias com PM",
      "Síntese de engenhocas com requisitos"
    ]
  },
  {
    "id": "cx-raiden-shogun",
    "name": "Raiden Shogun",
    "universe": "Genshin Impact",
    "group": "genshin",
    "className": "Paladino",
    "race": "Golem",
    "profile": "charisma",
    "color": "#9971c9",
    "identity": "EUTIMIA // MARIONETE DA ARCONTE",
    "concept": "Corpo artificial e autoridade divina: golpes de espada e proteção. Eletricidade exige fontes oficiais, não é dano agregado automaticamente.",
    "signature": "Fonte Elemental (ar/eletricidade), Chassi, Golpe Divino e espada",
    "weapon": "Espada longa",
    "bookPage": "81–85",
    "source": "https://genshin.hoyoverse.com/en/home",
    "image": "https://raw.githubusercontent.com/lambdv/genshin-scraper/refs/heads/main/genshindata/public/assets/characters/raiden-shogun/splash.png",
    "imageCredit": "HoYoverse — splash da Raiden via espelho de assets",
    "styles": [
      "Golem de Eutimia",
      "A espada eterna",
      "Comando da eternidade"
    ],
    "levels": [
      "Golem construído: Propósito de Criação substitui origem; Paladino 1",
      "Golpe Divino; especialização em espada proposta",
      "Recurso defensivo Paladino (conferir nível exato)",
      "Devoção e benefícios sujeitos à escolha",
      "Aprimorar Carisma e disciplina de espadachim",
      "Proteção divina com custo de PM",
      "Fonte elemental ar: resistência racial, sem raio grátis",
      "Aumento de Carisma ou poder de espada",
      "Aura paladinesca se elegível",
      "Técnica de corte com recurso adquirido",
      "Armadura acoplada ao chassi e suas restrições",
      "Conclusão da Eutimia sob limites de PM"
    ]
  },
  {
    "id": "cx-xiao",
    "name": "Xiao",
    "universe": "Genshin Impact",
    "group": "genshin",
    "className": "Guerreiro",
    "race": "Suraggel Sulfure",
    "profile": "racer",
    "color": "#6eb9a9",
    "identity": "YAKSHA // LANÇA DOS VENTOS",
    "concept": "Guerreiro de lança e movimentos verticais; saltos e máscaras são visualização de investidas e custos legais.",
    "signature": "Ataque Especial, Golpe Pessoal (mergulho narrativo), Ataque Extra",
    "weapon": "Lança",
    "bookPage": "64–67",
    "source": "https://genshin.hoyoverse.com/id/news/detail/103849",
    "image": "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210211/2021021115524978539.jpg",
    "imageCredit": "HoYoverse — arte promocional oficial de Xiao",
    "styles": [
      "Lança Yaksha",
      "Mergulho narrativo",
      "Máscara guerreira"
    ],
    "levels": [
      "Ataque Especial com lança e proficiência",
      "Mobilidade / Atletismo (treino escolhido)",
      "Durão; defesa aérea não automática",
      "Golpe Pessoal: mergulho, conforme opções legais",
      "Ataque Especial ampliado",
      "Ataque Extra e limite de PM",
      "Aumento de Destreza/Força (escolha)",
      "Investida e posicionamento sem voo inerente",
      "Ataque Especial ampliado",
      "Golpe Pessoal e alcance de lança",
      "Proteção mental de guerreiro, se selecionada",
      "Técnica máxima sem dano sobrenatural gratuito"
    ]
  },
  {
    "id": "cx-geralt",
    "name": "Geralt de Rívia",
    "universe": "The Witcher",
    "group": "witcher",
    "className": "Caçador",
    "race": "Moreau do Lobo",
    "profile": "racer",
    "color": "#bfc3c2",
    "identity": "BRUXO // DUAS ESPADAS E ELIXIRES",
    "concept": "Caçador de monstros experiente: rastreamento, preparo e Marca da Presa. Sinais mágicos e poções requerem magia ou itens reais.",
    "signature": "Marca da Presa e Rastreador; duas espadas com proficiência, poções adquiridas",
    "weapon": "Espada longa (aço); espada de prata por aquisição",
    "bookPage": "49–52",
    "source": "https://www.thewitcher.com/us/en/witcher3",
    "image": "https://www.supersoluce.com/sites/default/files/logo1/geralt.jpg",
    "imageCredit": "CD Projekt RED — portrait de Geralt via SuperSoluce",
    "styles": [
      "Preparação de caça",
      "Sinais sob regras mágicas",
      "Espada de prata"
    ],
    "levels": [
      "Marca da Presa e Rastreador; preferência de monstros",
      "Emboscar (se poder de Caçador for escolhido)",
      "Olho do Falcão (opção a conferir)",
      "Armadilhas preparadas legalmente",
      "Aumento de Destreza e tática de alvo",
      "Disparo / estilo de arma (seleção)",
      "Marca da Presa aprimorada conforme tabela",
      "Sobrevivência, poções e tempo de preparo",
      "Aumento de Destreza (escolha)",
      "Combate contra alvo estudado",
      "Especialização contra monstros (opção)",
      "Caçada total; Sinais dependem de magia/itens adquiridos"
    ]
  },
  {
    "id": "cx-ciri",
    "name": "Ciri (Cirilla)",
    "universe": "The Witcher",
    "group": "witcher",
    "className": "Ladino",
    "variant": "Ventanista",
    "race": "Eiradaan",
    "profile": "finesse",
    "color": "#a4beca",
    "identity": "SANGUE ANCESTRAL // REFLEXO E TEMPO",
    "concept": "Espadachim de teletransporte narrativo: Ventanista usa simulacros de Encantamento e Ilusão dentro da regra; não controla tempo gratuitamente.",
    "signature": "Simulacros da variante Ventanista, Ataque Furtivo quando mantido e posicionamento",
    "weapon": "Espada longa (proficiência a conferir)",
    "bookPage": "72–74",
    "source": "https://www.thewitcher.com/us/en/witcher3",
    "image": "https://cdn.shazoo.ru/83438_mdC5pByNom_the_witcher_3_wild_hunt_ciri.jpg",
    "imageCredit": "CD Projekt RED — arte de Ciri via Shazoo",
    "styles": [
      "Reflexo de mundos",
      "Esquiva no tempo (narrativa)",
      "Sangue Ancestral"
    ],
    "levels": [
      "Ladino Ventanista 1; simulacros limitados a suas escolas",
      "Poder de Ladino: mobilidade (seleção)",
      "Simulacros conforme progresso e PM",
      "Evasão da variante ou poder conforme tabela",
      "Ilusão defensiva (simulacro aprendido)",
      "Recuo e posicionamento; nenhuma ação extra grátis",
      "Seleção de poder evasivo",
      "Aumento de Destreza (escolha)",
      "Simulacro novo conforme limite da variante",
      "Evasão Aprimorada apenas se variante mantém",
      "Aprimorar simulacro conforme círculo permitido",
      "Ruptura dimensional apenas como aparência de magia legal"
    ]
  },
  {
    "id": "cx-qin-shi-huang",
    "name": "Qin Shi Huang (Shuumatsu)",
    "universe": "Shuumatsu no Valkyrie",
    "group": "shuumatsu",
    "className": "Lutador",
    "race": "Moreau do Leão",
    "profile": "brawler",
    "color": "#d6a668",
    "identity": "IMPERADOR // TÉCNICA CHI YOU",
    "concept": "Estilo marcial de redirecionamento e contra-ataque, sem redirecionar dano automaticamente. A majestade vem da interpretação.",
    "signature": "Briga, Golpe Relâmpago (Lutador padrão), manobras e defesa corporal",
    "weapon": "Ataque desarmado",
    "bookPage": "75–77",
    "source": "https://record-of-ragnarok.fandom.com/wiki/Qin_Shi_Huang",
    "image": "https://sxhodsrixg8meuri.public.blob.vercel-storage.com/fandom-lore/characters/record-of-ragnarok-shuumatsu-no-valkyrie/qin-shi-huang-b8f6f0476749.jpg",
    "imageCredit": "Shuumatsu no Valkyrie — ilustração de Qin reproduzida no Shapes",
    "styles": [
      "Chi You terrestre",
      "Redireção por manobra",
      "Trono do primeiro"
    ],
    "levels": [
      "Briga e Golpe Relâmpago do Lutador padrão",
      "Braços Calejados (poder a conferir)",
      "Casca Grossa automática; Rasteira como escolha",
      "Golpe Imprudente (se poder escolhido)",
      "Briga aprimorada na progressão de classe",
      "Golpe Baixo ou manobra (seleção)",
      "Casca Grossa na tabela; defesa de contato",
      "Aumento de Força (poder escolhido)",
      "Briga aprimorada; ataque marcial",
      "Escapar/derrubar, sujeito a ação",
      "Casca Grossa aprimorada; concentração",
      "Síntese de técnicas marciais sem imunidade"
    ]
  },
  {
    "id": "cx-nikola-tesla",
    "name": "Nikola Tesla (Shuumatsu)",
    "universe": "Shuumatsu no Valkyrie",
    "group": "shuumatsu",
    "className": "Inventor",
    "race": "Kliren",
    "profile": "tactician",
    "color": "#d3ac68",
    "identity": "SUPER AUTOMATON β // CIÊNCIA INFINITA",
    "concept": "Armadura tecnológica e eletricidade por protótipos e engenhocas. Teleporte Gematria Zone é ficção narrativa a menos que poder oficial permita.",
    "signature": "Protótipo, Engenhosidade, Ofício e engenhocas; armadura Beta exige fabricação, preço e proficiência",
    "weapon": "Arma de energia (visual de arma oficial)",
    "bookPage": "67–72",
    "source": "https://record-of-ragnarok.fandom.com/wiki/Nikola_Tesla",
    "image": "https://i.pinimg.com/736x/dc/57/38/dc5738904c2cfcdef732c98b0766221c.jpg",
    "imageCredit": "Shuumatsu no Valkyrie — painel de Tesla em armadura, reprodução Pinterest",
    "styles": [
      "Armadura Beta",
      "Sistemas elétricos",
      "Gematria Zone (narrativo)"
    ],
    "levels": [
      "Kliren + Inventor 1: Engenhosidade e Protótipo",
      "Engenhoqueiro (escolha a conferir)",
      "Ofício e projeto do Autômato",
      "Aprimoramentos de armadura com custo",
      "Aumento de Inteligência (escolha)",
      "Engenhos de eletricidade permitidos se obtidos",
      "Proteção do chassi por equipamento, não raça Golem",
      "Aumento de Inteligência ou novo poder",
      "Táticas de área com carga e componente",
      "Engenhocas avançadas sob regra",
      "Preparados alquímicos opcionais",
      "Síntese de recursos, PM e custo real"
    ]
  },
  {
    "id": "cx-dva",
    "name": "D.Va (Overwatch)",
    "universe": "Overwatch",
    "group": "overwatch",
    "className": "Inventor",
    "race": "Goblin",
    "profile": "tactician",
    "color": "#f48fc0",
    "identity": "MEKA // DEFESA DE MATRIZ",
    "concept": "Pilota um mecha de combate. O MEKA é construído como engenhoca/constructo condicional, não como personagem com um segundo turno.",
    "signature": "Protótipo, Engenhoqueiro e armas de fogo (se houver proficiência); mecânica de construto depende de regra",
    "weapon": "Arma de fogo ou pistola (a comprar)",
    "bookPage": "67–72",
    "source": "https://overwatch.blizzard.com/en-us/heroes/dva/",
    "image": "https://ik.imagekit.io/x2dirkim6/images/avatars/characters/character_avatar_V7WdiklOp9.webp?tr=w-3840",
    "imageCredit": "Blizzard — arte promocional de D.Va com MEKA, via Spellbound",
    "styles": [
      "MEKA",
      "Matriz Defensiva (narrativa)",
      "A piloto no assento"
    ],
    "levels": [
      "Inventor 1: Protótipo e Engenhosidade; piloto Goblin",
      "Engenhoqueiro (escolha)",
      "Ofício de engenhoqueiro e manutenção",
      "Preparação de defesa por engenhoca adquirida",
      "Aumento de Inteligência (escolha)",
      "Arma de fogo e proficiência verificadas",
      "Sistema MEKA como item, tempo de uso e custo",
      "Aumento de Inteligência / engenhoca adicional",
      "Ataque em área só com item/habilidade válidos",
      "Matriz defensiva com reação ou efeito oficial",
      "Segunda configuração do MEKA sujeita à oficina",
      "Autodestruição apenas com explosivo oficial e consequências"
    ]
  }
];
window.T20_CROSSOVERS_SEEDS=seeds.map(s=>({...s,number:127+seeds.indexOf(s)}));
})();


/* crossovers-runtime.js */
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
  const localPoster=base.origIcon?.({name:s.name,color:s.color,group:"manga"})||
   "data:image/svg+xml;charset=utf-8,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='500' height='700'><rect width='100%' height='100%' fill='#112031'/></svg>");
  const img=s.image||localPoster;
  const skillNames=[...new Set([...(cl.skill||[]),...(s.className==="Inventor"?["Ofício (engenhoqueiro)"]:[]),
   ...(s.className==="Caçador"?["Sobrevivência"]:[])])];
  const skills=skillNames.map(name=>[name,fmt(attrs0[skillAttr[name]||"INT"]+2),
   "Treinamento orientativo (depende das vagas e origem), bônus por nível ainda a somar"]);
  const c={
   id:s.id,number:String(s.number).padStart(2,"0"),name:s.name,universe:s.universe,
   label:s.identity,theme:s.id,catalogCategory:s.group,symbol:"✦",
   portrait:{url:img,fallback:localPoster,credit:s.imageCredit||"Insígnia editorial original",page:s.source},
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


/* wave7-data.js */
/* Fase VII. JoBros partes 1–8, núcleo The Boys e cinco protagonistas.
   Gyro já existe no catálogo original: não gerar duplicata. */
(()=>{"use strict";const seeds=[{"id":"jb-will-zeppeli","name":"Will A. Zeppeli","universe":"JoJo · Parte 1 — Phantom Blood","group":"jojo","arc":"p1","klassOrigin":"p1","className":"Lutador","race":"Sátiro","profile":"racer","color":"#bd8e58","identity":"Hamon do Sol","concept":"Controle da respiração e golpes precisos para proteger Jonathan","signature":"Hamon do Sol — Controle da respiração e golpes precisos para proteger Jonathan","weapon":"Bastão","bookPage":"75–77","source":"https://jojowiki.com/Phantom_Blood","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Hamon do Sol","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-speedwagon","name":"Robert E. O. Speedwagon","universe":"JoJo · Parte 1 — Phantom Blood","group":"jojo","arc":"p1","klassOrigin":"p1","className":"Nobre","race":"Meio-Elfo","profile":"support","color":"#bd8e58","identity":"O Coração da Fundação","concept":"Diplomacia liderança de equipe e coragem contra vampiros","signature":"O Coração da Fundação — Diplomacia liderança de equipe e coragem contra vampiros","weapon":"Chapéu de combate","bookPage":"78–81","source":"https://jojowiki.com/Phantom_Blood","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["O Coração da Fundação","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-poco","name":"Poco","universe":"JoJo · Parte 1 — Phantom Blood","group":"jojo","arc":"p1","klassOrigin":"p1","className":"Ladino","race":"Hynne","profile":"finesse","color":"#bd8e58","identity":"Coragem improvável","concept":"Mobilidade iniciativa e decisões corajosas sob pressão","signature":"Coragem improvável — Mobilidade iniciativa e decisões corajosas sob pressão","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Phantom_Blood","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Coragem improvável","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-dire","name":"Dire","universe":"JoJo · Parte 1 — Phantom Blood","group":"jojo","arc":"p1","klassOrigin":"p1","className":"Lutador","race":"Moreau do Leão","profile":"brawler","color":"#bd8e58","identity":"Thunder Cross Split Attack","concept":"Artes marciais ofensivas com risco e posicionamento","signature":"Thunder Cross Split Attack — Artes marciais ofensivas com risco e posicionamento","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://jojowiki.com/Phantom_Blood","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Thunder Cross Split Attack","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-straizo","name":"Straizo","universe":"JoJo · Parte 1 — Phantom Blood","group":"jojo","arc":"p1","klassOrigin":"p1","className":"Lutador","race":"Suraggel Sulfure","profile":"finesse","color":"#bd8e58","identity":"Discípulo do Hamon","concept":"Disciplina e golpes precisos com tensão de poder","signature":"Discípulo do Hamon — Disciplina e golpes precisos com tensão de poder","weapon":"Ataques desarmados","bookPage":"75–77","source":"https://jojowiki.com/Phantom_Blood","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Discípulo do Hamon","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-caesar-zeppeli","name":"Caesar Anthonio Zeppeli","universe":"JoJo · Parte 2 — Battle Tendency","group":"jojo","arc":"p2","klassOrigin":"p2","className":"Arcanista","race":"Qareen","profile":"charisma","color":"#a7d479","identity":"Bolhas de Hamon","concept":"Magias de energia e controle de trajetória sem bolhas gratuitas","signature":"Bolhas de Hamon — Magias de energia e controle de trajetória sem bolhas gratuitas","weapon":"Foco de vidro","bookPage":"36–40","source":"https://jojowiki.com/Battle_Tendency","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":"mago","styles":["Bolhas de Hamon","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-lisa-lisa","name":"Lisa Lisa","universe":"JoJo · Parte 2 — Battle Tendency","group":"jojo","arc":"p2","klassOrigin":"p2","className":"Lutador","race":"Elfo","profile":"finesse","color":"#a7d479","identity":"Mestra do Hamon","concept":"Precisão tática defesa e treinamento refinado","signature":"Mestra do Hamon — Precisão tática defesa e treinamento refinado","weapon":"Lenço de combate","bookPage":"75–77","source":"https://jojowiki.com/Battle_Tendency","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Mestra do Hamon","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-stroheim","name":"Rudol von Stroheim","universe":"JoJo · Parte 2 — Battle Tendency","group":"jojo","arc":"p2","klassOrigin":"p2","className":"Inventor","race":"Golem","profile":"tactician","color":"#a7d479","identity":"Arsenal cibernético","concept":"Chassi artificial e inventos mecânicos sem armamento gratuito","signature":"Arsenal cibernético — Chassi artificial e inventos mecânicos sem armamento gratuito","weapon":"Canhão mecânico","bookPage":"67–72","source":"https://jojowiki.com/Battle_Tendency","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Arsenal cibernético","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-smokey-brown","name":"Smokey Brown","universe":"JoJo · Parte 2 — Battle Tendency","group":"jojo","arc":"p2","klassOrigin":"p2","className":"Ladino","race":"Hynne","profile":"finesse","color":"#a7d479","identity":"Sobrevivente das Ruas","concept":"Furtividade fuga e astúcia urbana","signature":"Sobrevivente das Ruas — Furtividade fuga e astúcia urbana","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Battle_Tendency","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Sobrevivente das Ruas","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-suzi-q","name":"Suzi Q","universe":"JoJo · Parte 2 — Battle Tendency","group":"jojo","arc":"p2","klassOrigin":"p2","className":"Bardo","race":"Qareen","profile":"support","color":"#a7d479","identity":"Alento da Equipe","concept":"Diplomacia comunicação e motivação para aliados","signature":"Alento da Equipe — Diplomacia comunicação e motivação para aliados","weapon":"Instrumento musical","bookPage":"43–46","source":"https://jojowiki.com/Battle_Tendency","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Alento da Equipe","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-kakyoin","name":"Noriaki Kakyoin","universe":"JoJo · Parte 3 — Stardust Crusaders","group":"jojo","arc":"p3","klassOrigin":"p3","className":"Arcanista","race":"Elfo","profile":"tactician","color":"#86abdf","identity":"Hierophant Green","concept":"Magias de alcance e controle que simbolizam tentáculos e esmeraldas","signature":"Hierophant Green — Magias de alcance e controle que simbolizam tentáculos e esmeraldas","weapon":"Cajado","bookPage":"36–40","source":"https://jojowiki.com/Stardust_Crusaders","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":"mago","styles":["Hierophant Green","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-avdol","name":"Muhammad Avdol","universe":"JoJo · Parte 3 — Stardust Crusaders","group":"jojo","arc":"p3","klassOrigin":"p3","className":"Arcanista","race":"Qareen","profile":"charisma","color":"#86abdf","identity":"Magician’s Red","concept":"Fogo arcano e proteção contra inimigos resistentes","signature":"Magician’s Red — Fogo arcano e proteção contra inimigos resistentes","weapon":"Cajado","bookPage":"36–40","source":"https://jojowiki.com/Stardust_Crusaders","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":"mago","styles":["Magician’s Red","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-polnareff","name":"Jean Pierre Polnareff","universe":"JoJo · Parte 3 — Stardust Crusaders","group":"jojo","arc":"p3","klassOrigin":"p3","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#86abdf","identity":"Silver Chariot","concept":"Espadachim de duelo e reflexos rápidos","signature":"Silver Chariot — Espadachim de duelo e reflexos rápidos","weapon":"Florete","bookPage":"64–67","source":"https://jojowiki.com/Stardust_Crusaders","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Silver Chariot","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-iggy","name":"Iggy","universe":"JoJo · Parte 3 — Stardust Crusaders","group":"jojo","arc":"p3","klassOrigin":"p3","className":"Druida","race":"Moreau do Lobo","profile":"racer","color":"#86abdf","identity":"The Fool","concept":"Formas naturais e terreno arenoso sob magias ou poderes de classe","signature":"The Fool — Formas naturais e terreno arenoso sob magias ou poderes de classe","weapon":"Bordão","bookPage":"60–64","source":"https://jojowiki.com/Stardust_Crusaders","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["The Fool","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-anne","name":"Anne","universe":"JoJo · Parte 3 — Stardust Crusaders","group":"jojo","arc":"p3","klassOrigin":"p3","className":"Ladino","race":"Hynne","profile":"finesse","color":"#86abdf","identity":"Rota da Sobrevivência","concept":"Fuga investigação e improváveis recursos de viagem","signature":"Rota da Sobrevivência — Fuga investigação e improváveis recursos de viagem","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Stardust_Crusaders","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Rota da Sobrevivência","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-okuyasu","name":"Okuyasu Nijimura","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Guerreiro","race":"Moreau do Leão","profile":"brawler","color":"#a9c56b","identity":"The Hand","concept":"Combate frontal e pressão com The Hand apenas como visual","signature":"The Hand — Combate frontal e pressão com The Hand apenas como visual","weapon":"Machado de batalha","bookPage":"64–67","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["The Hand","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-koichi","name":"Koichi Hirose","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Bardo","race":"Hynne","profile":"support","color":"#a9c56b","identity":"Echoes ACT","concept":"Controle de som e apoio via habilidades de classe adquiridas","signature":"Echoes ACT — Controle de som e apoio via habilidades de classe adquiridas","weapon":"Instrumento musical","bookPage":"43–46","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Echoes ACT","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-rohan","name":"Rohan Kishibe","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Bardo","race":"Elfo","profile":"tactician","color":"#a9c56b","identity":"Heaven’s Door","concept":"Conhecimento social e encantamentos sem leitura mental automática","signature":"Heaven’s Door — Conhecimento social e encantamentos sem leitura mental automática","weapon":"Instrumento musical","bookPage":"43–46","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Heaven’s Door","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-yukako","name":"Yukako Yamagishi","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Arcanista","race":"Moreau do Gato","profile":"charisma","color":"#a9c56b","identity":"Love Deluxe","concept":"Controle de espaço mágico com cabelos apenas como estética","signature":"Love Deluxe — Controle de espaço mágico com cabelos apenas como estética","weapon":"Cajado","bookPage":"36–40","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":"mago","styles":["Love Deluxe","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-shigechi","name":"Shigekiyo Yangu","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Caçador","race":"Hynne","profile":"finesse","color":"#a9c56b","identity":"Harvest","concept":"Armadilhas e aliados abstratos sem enxame concedido gratuitamente","signature":"Harvest — Armadilhas e aliados abstratos sem enxame concedido gratuitamente","weapon":"Estilingue","bookPage":"49–52","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Harvest","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-reimi","name":"Reimi Sugimoto","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Clérigo","race":"Suraggel Aggelus","profile":"support","color":"#a9c56b","identity":"Guardião de Morioh","concept":"Proteção espiritual e auxílio aos vivos com magia divina","signature":"Guardião de Morioh — Proteção espiritual e auxílio aos vivos com magia divina","weapon":"Bordão","bookPage":"56–60","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Guardião de Morioh","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-hayato","name":"Hayato Kawajiri","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Ladino","race":"Hynne","profile":"tactician","color":"#a9c56b","identity":"Investigador Corajoso","concept":"Furtividade espionagem e percepção de padrões fatais","signature":"Investigador Corajoso — Furtividade espionagem e percepção de padrões fatais","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Investigador Corajoso","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-yuya","name":"Yuya Fungami","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Ladino","race":"Moreau da Raposa","profile":"racer","color":"#a9c56b","identity":"Highway Star","concept":"Rastreamento faro e perseguição sob regras de movimento","signature":"Highway Star — Rastreamento faro e perseguição sob regras de movimento","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Highway Star","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-mikitaka","name":"Mikitaka Hazekura","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Druida","race":"Sátiro","profile":"support","color":"#a9c56b","identity":"Earth Wind and Fire","concept":"Transformações representadas por Forma Selvagem quando adquirida","signature":"Earth Wind and Fire — Transformações representadas por Forma Selvagem quando adquirida","weapon":"Bordão","bookPage":"60–64","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Earth Wind and Fire","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-tonio","name":"Tonio Trussardi","universe":"JoJo · Parte 4 — Diamond is Unbreakable","group":"jojo","arc":"p4","klassOrigin":"p4","className":"Clérigo","race":"Qareen","profile":"support","color":"#a9c56b","identity":"Pearl Jam","concept":"Cura por magia e Ofício culinário em vez de comida milagrosa grátis","signature":"Pearl Jam — Cura por magia e Ofício culinário em vez de comida milagrosa grátis","weapon":"Colher de cozinha","bookPage":"56–60","source":"https://jojowiki.com/Diamond_is_Unbreakable","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Pearl Jam","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-bucciarati","name":"Bruno Bucciarati","universe":"JoJo · Parte 5 — Golden Wind","group":"jojo","arc":"p5","klassOrigin":"p5","className":"Ladino","race":"Meio-Elfo","profile":"finesse","color":"#d6a16a","identity":"Sticky Fingers","concept":"Mobilidade infiltradora com zíperes apenas como linguagem visual","signature":"Sticky Fingers — Mobilidade infiltradora com zíperes apenas como linguagem visual","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Golden_Wind","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Sticky Fingers","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-mista","name":"Guido Mista","universe":"JoJo · Parte 5 — Golden Wind","group":"jojo","arc":"p5","klassOrigin":"p5","className":"Caçador","race":"Moreau da Raposa","profile":"racer","color":"#d6a16a","identity":"Sex Pistols","concept":"Pontaria e ataques de tiro com proficiência em armas de fogo","signature":"Sex Pistols — Pontaria e ataques de tiro com proficiência em armas de fogo","weapon":"Pistola","bookPage":"49–52","source":"https://jojowiki.com/Golden_Wind","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Sex Pistols","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-abbacchio","name":"Leone Abbacchio","universe":"JoJo · Parte 5 — Golden Wind","group":"jojo","arc":"p5","klassOrigin":"p5","className":"Ladino","race":"Suraggel Sulfure","profile":"tactician","color":"#d6a16a","identity":"Moody Blues","concept":"Investigação reconstrução de eventos e disfarces sem viagem ao passado","signature":"Moody Blues — Investigação reconstrução de eventos e disfarces sem viagem ao passado","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Golden_Wind","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Moody Blues","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-narancia","name":"Narancia Ghirga","universe":"JoJo · Parte 5 — Golden Wind","group":"jojo","arc":"p5","klassOrigin":"p5","className":"Inventor","race":"Goblin","profile":"tactician","color":"#d6a16a","identity":"Aerosmith","concept":"Engenhocas de rastreamento e bombas condicionadas a equipamento","signature":"Aerosmith — Engenhocas de rastreamento e bombas condicionadas a equipamento","weapon":"Besta leve","bookPage":"67–72","source":"https://jojowiki.com/Golden_Wind","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Aerosmith","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-fugo","name":"Pannacotta Fugo","universe":"JoJo · Parte 5 — Golden Wind","group":"jojo","arc":"p5","klassOrigin":"p5","className":"Arcanista","race":"Suraggel Sulfure","profile":"tactician","color":"#d6a16a","identity":"Purple Haze","concept":"Magia tóxica sob regras de nuvem veneno e custo de PM","signature":"Purple Haze — Magia tóxica sob regras de nuvem veneno e custo de PM","weapon":"Cajado","bookPage":"36–40","source":"https://jojowiki.com/Golden_Wind","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":"mago","styles":["Purple Haze","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-trish","name":"Trish Una","universe":"JoJo · Parte 5 — Golden Wind","group":"jojo","arc":"p5","klassOrigin":"p5","className":"Bardo","race":"Qareen","profile":"charisma","color":"#d6a16a","identity":"Spice Girl","concept":"Apoio mágico e efeitos de flexibilidade com duração regulamentada","signature":"Spice Girl — Apoio mágico e efeitos de flexibilidade com duração regulamentada","weapon":"Instrumento musical","bookPage":"43–46","source":"https://jojowiki.com/Golden_Wind","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Spice Girl","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-ermes","name":"Ermes Costello","universe":"JoJo · Parte 6 — Stone Ocean","group":"jojo","arc":"p6","klassOrigin":"p6","className":"Ladino","race":"Moreau do Gato","profile":"finesse","color":"#af9ecc","identity":"Kiss","concept":"Manobras de aproximação e duplicação apenas se magia ou item permitir","signature":"Kiss — Manobras de aproximação e duplicação apenas se magia ou item permitir","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Stone_Ocean","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Kiss","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-foo-fighters","name":"Foo Fighters","universe":"JoJo · Parte 6 — Stone Ocean","group":"jojo","arc":"p6","klassOrigin":"p6","className":"Druida","race":"Dahllan","profile":"support","color":"#af9ecc","identity":"Colônia de Plâncton","concept":"Sustentação ambiental recuperação e vínculos naturais","signature":"Colônia de Plâncton — Sustentação ambiental recuperação e vínculos naturais","weapon":"Bordão","bookPage":"60–64","source":"https://jojowiki.com/Stone_Ocean","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Colônia de Plâncton","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-weather-report","name":"Weather Report","universe":"JoJo · Parte 6 — Stone Ocean","group":"jojo","arc":"p6","klassOrigin":"p6","className":"Druida","race":"Suraggel Aggelus","profile":"support","color":"#af9ecc","identity":"Atmosfera Viva","concept":"Magias climáticas sob duração alcance e custos oficiais","signature":"Atmosfera Viva — Magias climáticas sob duração alcance e custos oficiais","weapon":"Bordão","bookPage":"60–64","source":"https://jojowiki.com/Stone_Ocean","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Atmosfera Viva","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-anasui","name":"Narciso Anasui","universe":"JoJo · Parte 6 — Stone Ocean","group":"jojo","arc":"p6","klassOrigin":"p6","className":"Lutador","race":"Moreau do Leão","profile":"brawler","color":"#af9ecc","identity":"Diver Down","concept":"Ataques de contato e interrupção corporal sem alterar matéria grátis","signature":"Diver Down — Ataques de contato e interrupção corporal sem alterar matéria grátis","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://jojowiki.com/Stone_Ocean","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Diver Down","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-emporio","name":"Emporio Alnino","universe":"JoJo · Parte 6 — Stone Ocean","group":"jojo","arc":"p6","klassOrigin":"p6","className":"Inventor","race":"Hynne","profile":"tactician","color":"#af9ecc","identity":"Sala Fantasma","concept":"Engenhocas ocultação e investigação sem espaço extradimensional grátis","signature":"Sala Fantasma — Engenhocas ocultação e investigação sem espaço extradimensional grátis","weapon":"Ferramentas","bookPage":"67–72","source":"https://jojowiki.com/Stone_Ocean","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Sala Fantasma","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-hot-pants","name":"Hot Pants","universe":"JoJo · Parte 7 — Steel Ball Run","group":"jojo","arc":"p7","klassOrigin":"p7","className":"Clérigo","race":"Dahllan","profile":"support","color":"#b5aa92","identity":"Cream Starter","concept":"Cura e manipulação orgânica restritas às magias conhecidas","signature":"Cream Starter — Cura e manipulação orgânica restritas às magias conhecidas","weapon":"Bordão","bookPage":"56–60","source":"https://jojowiki.com/Steel_Ball_Run","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Cream Starter","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-lucy-steel","name":"Lucy Steel","universe":"JoJo · Parte 7 — Steel Ball Run","group":"jojo","arc":"p7","klassOrigin":"p7","className":"Ladino","race":"Meio-Elfo","profile":"finesse","color":"#b5aa92","identity":"Espiã do Deserto","concept":"Disfarce infiltração e persistência sem Stand grátis","signature":"Espiã do Deserto — Disfarce infiltração e persistência sem Stand grátis","weapon":"Adaga","bookPage":"72–74","source":"https://jojowiki.com/Steel_Ball_Run","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Espiã do Deserto","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-mountain-tim","name":"Mountain Tim","universe":"JoJo · Parte 7 — Steel Ball Run","group":"jojo","arc":"p7","klassOrigin":"p7","className":"Caçador","race":"Moreau do Lobo","profile":"racer","color":"#b5aa92","identity":"Oh Lonesome Me","concept":"Técnicas de laço trilha e captura com ações oficiais","signature":"Oh Lonesome Me — Técnicas de laço trilha e captura com ações oficiais","weapon":"Laço","bookPage":"49–52","source":"https://jojowiki.com/Steel_Ball_Run","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Oh Lonesome Me","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-wekapipo","name":"Wekapipo","universe":"JoJo · Parte 7 — Steel Ball Run","group":"jojo","arc":"p7","klassOrigin":"p7","className":"Guerreiro","race":"Moreau da Raposa","profile":"tactician","color":"#b5aa92","identity":"Wrecking Ball","concept":"Arremesso técnico e efeitos de deslocamento por poderes adquiridos","signature":"Wrecking Ball — Arremesso técnico e efeitos de deslocamento por poderes adquiridos","weapon":"Bola de ferro","bookPage":"64–67","source":"https://jojowiki.com/Steel_Ball_Run","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Wrecking Ball","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-stephen-steel","name":"Stephen Steel","universe":"JoJo · Parte 7 — Steel Ball Run","group":"jojo","arc":"p7","klassOrigin":"p7","className":"Nobre","race":"Meio-Elfo","profile":"support","color":"#b5aa92","identity":"Organizador da Steel Ball Run","concept":"Logística comando e equipamentos para a equipe","signature":"Organizador da Steel Ball Run — Logística comando e equipamentos para a equipe","weapon":"Bengala","bookPage":"78–81","source":"https://jojowiki.com/Steel_Ball_Run","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Organizador da Steel Ball Run","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-yasuho","name":"Yasuho Hirose","universe":"JoJo · Parte 8 — JoJolion","group":"jojo","arc":"p8","klassOrigin":"p8","className":"Inventor","race":"Meio-Elfo","profile":"tactician","color":"#9cb0bb","identity":"Paisley Park","concept":"Rastreamento tecnologia e soluções de suporte por Ofício","signature":"Paisley Park — Rastreamento tecnologia e soluções de suporte por Ofício","weapon":"Ferramentas","bookPage":"67–72","source":"https://jojowiki.com/JoJolion","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Paisley Park","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-rai-mamezuku","name":"Rai Mamezuku","universe":"JoJo · Parte 8 — JoJolion","group":"jojo","arc":"p8","klassOrigin":"p8","className":"Druida","race":"Dahllan","profile":"tactician","color":"#9cb0bb","identity":"Doggystyle","concept":"Afinidade vegetal e controle espacial por magias ou poderes","signature":"Doggystyle — Afinidade vegetal e controle espacial por magias ou poderes","weapon":"Bordão","bookPage":"60–64","source":"https://jojowiki.com/JoJolion","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Doggystyle","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-kei-nijimura","name":"Kei Nijimura","universe":"JoJo · Parte 8 — JoJolion","group":"jojo","arc":"p8","klassOrigin":"p8","className":"Caçador","race":"Suraggel Sulfure","profile":"finesse","color":"#9cb0bb","identity":"Born This Way","concept":"Caçada estratégica e perseguição sem motocicleta autônoma gratuita","signature":"Born This Way — Caçada estratégica e perseguição sem motocicleta autônoma gratuita","weapon":"Arco curto","bookPage":"49–52","source":"https://jojowiki.com/JoJolion","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Born This Way","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-norisuke-iv","name":"Norisuke Higashikata IV","universe":"JoJo · Parte 8 — JoJolion","group":"jojo","arc":"p8","klassOrigin":"p8","className":"Nobre","race":"Moreau do Leão","profile":"support","color":"#9cb0bb","identity":"King Nothing","concept":"Acompanhamento de pistas e liderança da família","signature":"King Nothing — Acompanhamento de pistas e liderança da família","weapon":"Florete","bookPage":"78–81","source":"https://jojowiki.com/JoJolion","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["King Nothing","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-karera","name":"Karera Sakunami","universe":"JoJo · Parte 8 — JoJolion","group":"jojo","arc":"p8","klassOrigin":"p8","className":"Arcanista","race":"Qareen","profile":"charisma","color":"#9cb0bb","identity":"Love Love Deluxe","concept":"Manipulação capilar e fogo como interpretação arcana","signature":"Love Love Deluxe — Manipulação capilar e fogo como interpretação arcana","weapon":"Cajado","bookPage":"36–40","source":"https://jojowiki.com/JoJolion","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":"mago","styles":["Love Love Deluxe","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"jb-josefumi","name":"Josefumi Kujo","universe":"JoJo · Parte 8 — JoJolion","group":"jojo","arc":"p8","klassOrigin":"p8","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#9cb0bb","identity":"Soft and Wet Original","concept":"Precisão e apoio antes da fusão sem criação de Stand extra","signature":"Soft and Wet Original — Precisão e apoio antes da fusão sem criação de Stand extra","weapon":"Espada curta","bookPage":"64–67","source":"https://jojowiki.com/JoJolion","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Soft and Wet Original","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"boys-butcher","name":"Billy Butcher","universe":"The Boys · equipe principal","group":"the-boys","arc":"boys","klassOrigin":"boys","className":"Guerreiro","race":"Moreau do Lobo","profile":"brawler","color":"#ac5960","identity":"Combate Sem Perdão","concept":"Armas táticas confrontos difíceis e liderança impetuosa","signature":"Combate Sem Perdão — Armas táticas confrontos difíceis e liderança impetuosa","weapon":"Machado de guerra","bookPage":"64–67","source":"https://www.aboutamazon.com/news/entertainment/the-boys-season-4-cast-guide-prime-video","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Combate Sem Perdão","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"boys-hughie","name":"Hughie Campbell","universe":"The Boys · equipe principal","group":"the-boys","arc":"boys","klassOrigin":"boys","className":"Ladino","race":"Hynne","profile":"finesse","color":"#ac5960","identity":"Operativo Improvisado","concept":"Furtividade planejamento e fuga sem teleporte grátis","signature":"Operativo Improvisado — Furtividade planejamento e fuga sem teleporte grátis","weapon":"Adaga","bookPage":"72–74","source":"https://www.aboutamazon.com/news/entertainment/the-boys-season-4-cast-guide-prime-video","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Operativo Improvisado","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"boys-mm","name":"Marvin T. Milk (Mother’s Milk)","universe":"The Boys · equipe principal","group":"the-boys","arc":"boys","klassOrigin":"boys","className":"Nobre","race":"Anão","profile":"support","color":"#ac5960","identity":"Disciplina da Equipe","concept":"Liderança proteção e trabalho de investigação","signature":"Disciplina da Equipe — Liderança proteção e trabalho de investigação","weapon":"Espada curta","bookPage":"78–81","source":"https://www.aboutamazon.com/news/entertainment/the-boys-season-4-cast-guide-prime-video","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Disciplina da Equipe","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"boys-frenchie","name":"Frenchie","universe":"The Boys · equipe principal","group":"the-boys","arc":"boys","klassOrigin":"boys","className":"Inventor","race":"Goblin","profile":"tactician","color":"#ac5960","identity":"Alquimia de Rua","concept":"Explosivos e adaptações de equipamento com custo real","signature":"Alquimia de Rua — Explosivos e adaptações de equipamento com custo real","weapon":"Bomba alquímica","bookPage":"67–72","source":"https://www.aboutamazon.com/news/entertainment/the-boys-season-4-cast-guide-prime-video","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Alquimia de Rua","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"boys-kimiko","name":"Kimiko Miyashiro","universe":"The Boys · equipe principal","group":"the-boys","arc":"boys","klassOrigin":"boys","className":"Lutador","race":"Moreau do Gato","profile":"brawler","color":"#ac5960","identity":"Força Silenciosa","concept":"Armas naturais e combate desarmado com resistência condicionada","signature":"Força Silenciosa — Armas naturais e combate desarmado com resistência condicionada","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://www.aboutamazon.com/news/entertainment/the-boys-season-4-cast-guide-prime-video","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Força Silenciosa","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"boys-starlight","name":"Annie January (Starlight)","universe":"The Boys · equipe principal","group":"the-boys","arc":"boys","klassOrigin":"boys","className":"Paladino","race":"Suraggel Aggelus","profile":"charisma","color":"#ac5960","identity":"Luz da Esperança","concept":"Aura proteção e golpes divinos sem raios gratuitos","signature":"Luz da Esperança — Aura proteção e golpes divinos sem raios gratuitos","weapon":"Espada longa","bookPage":"81–85","source":"https://www.aboutamazon.com/news/entertainment/the-boys-season-4-cast-guide-prime-video","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Luz da Esperança","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"dmc-dante","name":"Dante","universe":"Devil May Cry","group":"dmc","arc":"dmc","klassOrigin":"dmc","className":"Guerreiro","race":"Suraggel Sulfure","profile":"brawler","color":"#d74654","identity":"Devil Trigger","concept":"Estilos de espada e armas à distância com mudança de postura narrativa","signature":"Devil Trigger — Estilos de espada e armas à distância com mudança de postura narrativa","weapon":"Espada de duas mãos","bookPage":"64–67","source":"https://www.devilmaycry.com/5/","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Devil Trigger","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"opm-saitama","name":"Saitama","universe":"One Punch Man","group":"one-punch-man","arc":"opm","klassOrigin":"opm","className":"Lutador","race":"Moreau do Leão","profile":"brawler","color":"#f1bc46","identity":"One Punch","concept":"Força corporal e Golpe Relâmpago sem derrotar automaticamente o alvo","signature":"One Punch — Força corporal e Golpe Relâmpago sem derrotar automaticamente o alvo","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://onepunchman-anime.net/","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["One Punch","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"bl-rin","name":"Itoshi Rin","universe":"Blue Lock","group":"blue-lock","arc":"bl","klassOrigin":"bl","className":"Caçador","race":"Elfo","profile":"tactician","color":"#3d97ee","identity":"Finalização Calculada","concept":"Leitura de campo e precisão traduzidas para ataques à distância","signature":"Finalização Calculada — Leitura de campo e precisão traduzidas para ataques à distância","weapon":"Arco curto","bookPage":"49–52","source":"https://bluelock-pr.com/","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Finalização Calculada","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"bl-isagi","name":"Isagi Yoichi","universe":"Blue Lock","group":"blue-lock","arc":"bl","klassOrigin":"bl","className":"Nobre","race":"Meio-Elfo","profile":"tactician","color":"#3d97ee","identity":"Meta Vision","concept":"Análise previsão e comando usando perícias e poderes reais","signature":"Meta Vision — Análise previsão e comando usando perícias e poderes reais","weapon":"Espada curta","bookPage":"78–81","source":"https://bluelock-pr.com/","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Meta Vision","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]},{"id":"kr-sento","name":"Sento Kiryu (Kamen Rider Build)","universe":"Kamen Rider Build","group":"kamen-rider","arc":"kr","klassOrigin":"kr","className":"Inventor","race":"Kliren","profile":"tactician","color":"#b63d51","identity":"Best Match","concept":"Engenhosidade e equipamento da armadura Build que exige fabricação","signature":"Best Match — Engenhosidade e equipamento da armadura Build que exige fabricação","weapon":"Armadura e equipamento","bookPage":"67–72","source":"https://tamashiiweb.com/item_character/krider_build/?wovn=en","image":null,"imageCredit":"Insígnia editorial original · referência individual por obra","path":null,"styles":["Best Match","Preparação e leitura de combate","Execução condicionada a custo","Reversão na etapa final"]}];window.T20_WAVE7_SEEDS=seeds;})();


/* wave7-fate.js */
/* Fase VII — seleção ampla de Servos CENTRAIS das linhas Fate.
   Não pretende conter as centenas de Servos de todo FGO.
   Cada versão alternativa é gerada separadamente no arquivo de formas. */
(()=>{"use strict";window.T20_WAVE7_FATE_SEEDS=[{"id":"fate-artoria","name":"Artoria Pendragon","universe":"Fate/stay night","group":"fate","arc":"fsn","fateClass":"Saber","className":"Paladino","race":"Suraggel Aggelus","profile":"charisma","color":"#e0be7e","identity":"SABER // Rei dos Cavaleiros","concept":"Espada sagrada defesa proteção e Excalibur narrativo","signature":"Rei dos Cavaleiros — Espada sagrada defesa proteção e Excalibur narrativo","weapon":"Espada longa","bookPage":"81–85","source":"https://www.fate-sn.com/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Rei dos Cavaleiros","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-emiya","name":"EMIYA","universe":"Fate/stay night","group":"fate","arc":"fsn","fateClass":"Archer","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#e0be7e","identity":"ARCHER // Unlimited Blade Works","concept":"Projeções viram armas e Golpe Pessoal sob regras de equipamento","signature":"Unlimited Blade Works — Projeções viram armas e Golpe Pessoal sob regras de equipamento","weapon":"Espadas curtas","bookPage":"64–67","source":"https://www.fate-sn.com/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Unlimited Blade Works","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-cu-chulainn","name":"Cú Chulainn","universe":"Fate/stay night","group":"fate","arc":"fsn","fateClass":"Lancer","className":"Guerreiro","race":"Moreau do Lobo","profile":"racer","color":"#e0be7e","identity":"LANCER // Gáe Bolg","concept":"Lança ofensiva e sobrevivência com técnicas marciais","signature":"Gáe Bolg — Lança ofensiva e sobrevivência com técnicas marciais","weapon":"Lança","bookPage":"64–67","source":"https://www.fate-sn.com/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Gáe Bolg","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-medusa","name":"Medusa","universe":"Fate/stay night","group":"fate","arc":"fsn","fateClass":"Rider","className":"Cavaleiro","race":"Medusa","profile":"finesse","color":"#e0be7e","identity":"RIDER // Bellerophon","concept":"Mobilidade e controle com montaria se houver poder","signature":"Bellerophon — Mobilidade e controle com montaria se houver poder","weapon":"Adaga","bookPage":"52–56","source":"https://www.fate-sn.com/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Bellerophon","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-medea","name":"Medea","universe":"Fate/stay night","group":"fate","arc":"fsn","fateClass":"Caster","className":"Arcanista","race":"Qareen","profile":"tactician","color":"#e0be7e","identity":"CASTER // Rule Breaker","concept":"Debilitação e magias de ritual sem desfazer efeitos gratuitamente","signature":"Rule Breaker — Debilitação e magias de ritual sem desfazer efeitos gratuitamente","weapon":"Cajado","bookPage":"36–40","source":"https://www.fate-sn.com/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Rule Breaker","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-sasakikojirou","name":"Sasaki Kojirō","universe":"Fate/stay night","group":"fate","arc":"fsn","fateClass":"Assassin","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#e0be7e","identity":"ASSASSIN // Tsubame Gaeshi","concept":"Espada e domínio de tempo de ataque sem golpes extras grátis","signature":"Tsubame Gaeshi — Espada e domínio de tempo de ataque sem golpes extras grátis","weapon":"Katana","bookPage":"64–67","source":"https://www.fate-sn.com/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Tsubame Gaeshi","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-heracles","name":"Heracles","universe":"Fate/stay night","group":"fate","arc":"fsn","fateClass":"Berserker","className":"Lutador","race":"Moreau do Leão","profile":"brawler","color":"#e0be7e","identity":"BERSERKER // God Hand","concept":"Vigor corporal e arma pesada sem vidas adicionais gratuitas","signature":"God Hand — Vigor corporal e arma pesada sem vidas adicionais gratuitas","weapon":"Clava","bookPage":"75–77","source":"https://www.fate-sn.com/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["God Hand","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-gilgamesh","name":"Gilgamesh","universe":"Fate/stay night","group":"fate","arc":"fsn","fateClass":"Archer","className":"Nobre","race":"Qareen","profile":"charisma","color":"#e0be7e","identity":"ARCHER // Gate of Babylon","concept":"Equipamento valioso e ataques de diversas armas adquiridas","signature":"Gate of Babylon — Equipamento valioso e ataques de diversas armas adquiridas","weapon":"Arco longo","bookPage":"78–81","source":"https://www.fate-sn.com/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Gate of Babylon","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-iskandar","name":"Iskandar","universe":"Fate/Zero","group":"fate","arc":"zero","fateClass":"Rider","className":"Cavaleiro","race":"Centauro","profile":"brawler","color":"#8691ab","identity":"RIDER // Ionioi Hetairoi","concept":"Comando militar e cavalaria sem exército conjurado de graça","signature":"Ionioi Hetairoi — Comando militar e cavalaria sem exército conjurado de graça","weapon":"Lança","bookPage":"52–56","source":"https://www.fate-zero.jp/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Ionioi Hetairoi","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-diarmuid","name":"Diarmuid Ua Duibhne","universe":"Fate/Zero","group":"fate","arc":"zero","fateClass":"Lancer","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#8691ab","identity":"LANCER // Gáe Dearg e Gáe Buidhe","concept":"Duas lanças com manobras e alcance sob regras de arma","signature":"Gáe Dearg e Gáe Buidhe — Duas lanças com manobras e alcance sob regras de arma","weapon":"Lança","bookPage":"64–67","source":"https://www.fate-zero.jp/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Gáe Dearg e Gáe Buidhe","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-gilles","name":"Gilles de Rais","universe":"Fate/Zero","group":"fate","arc":"zero","fateClass":"Caster","className":"Arcanista","race":"Suraggel Sulfure","profile":"tactician","color":"#8691ab","identity":"CASTER // Tomo Corrompido","concept":"Feitiços de invocação condicionados a magia e preparação","signature":"Tomo Corrompido — Feitiços de invocação condicionados a magia e preparação","weapon":"Grimório","bookPage":"36–40","source":"https://www.fate-zero.jp/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Tomo Corrompido","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-lancelot","name":"Lancelot","universe":"Fate/Zero","group":"fate","arc":"zero","fateClass":"Berserker","className":"Guerreiro","race":"Suraggel Sulfure","profile":"brawler","color":"#8691ab","identity":"BERSERKER // Knight of Owner","concept":"Armas improvisadas e durabilidade dentro de equipamento oficial","signature":"Knight of Owner — Armas improvisadas e durabilidade dentro de equipamento oficial","weapon":"Espada longa","bookPage":"64–67","source":"https://www.fate-zero.jp/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Knight of Owner","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-hassan-hundred","name":"Hassan dos Cem Rostos","universe":"Fate/Zero","group":"fate","arc":"zero","fateClass":"Assassin","className":"Ladino","race":"Moreau da Raposa","profile":"finesse","color":"#8691ab","identity":"ASSASSIN // Zabaniya de Múltiplas Máscaras","concept":"Furtividade infiltração e simulações sem clones grátis","signature":"Zabaniya de Múltiplas Máscaras — Furtividade infiltração e simulações sem clones grátis","weapon":"Adaga","bookPage":"72–74","source":"https://www.fate-zero.jp/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Zabaniya de Múltiplas Máscaras","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-jeanne","name":"Jeanne d’Arc","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Ruler","className":"Paladino","race":"Suraggel Aggelus","profile":"charisma","color":"#ce93a3","identity":"RULER // Luminosité Éternelle","concept":"Proteção de aliados e sacrifício com aura condicionada","signature":"Luminosité Éternelle — Proteção de aliados e sacrifício com aura condicionada","weapon":"Estandarte","bookPage":"81–85","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Luminosité Éternelle","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-mordred","name":"Mordred","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Saber","className":"Guerreiro","race":"Moreau do Leão","profile":"brawler","color":"#ce93a3","identity":"SABER // Clarent Blood Arthur","concept":"Espada rebelde com Ataque Especial e golpe pessoal","signature":"Clarent Blood Arthur — Espada rebelde com Ataque Especial e golpe pessoal","weapon":"Espada longa","bookPage":"64–67","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Clarent Blood Arthur","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-astolfo","name":"Astolfo","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Rider","className":"Cavaleiro","race":"Sátiro","profile":"racer","color":"#ce93a3","identity":"RIDER // Hippogriff","concept":"Mobilidade e artefatos cavaleirescos com aquisição real","signature":"Hippogriff — Mobilidade e artefatos cavaleirescos com aquisição real","weapon":"Lança","bookPage":"52–56","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Hippogriff","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-karna","name":"Karna","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Lancer","className":"Paladino","race":"Suraggel Aggelus","profile":"charisma","color":"#ce93a3","identity":"LANCER // Vasavi Shakti","concept":"Lança divina e força solar com custo de mana","signature":"Vasavi Shakti — Lança divina e força solar com custo de mana","weapon":"Lança","bookPage":"81–85","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Vasavi Shakti","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-achilles","name":"Achilles","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Rider","className":"Cavaleiro","race":"Centauro","profile":"racer","color":"#ce93a3","identity":"RIDER // Dromeus Komētes","concept":"Cavalaria e velocidade de movimento sem invulnerabilidade","signature":"Dromeus Komētes — Cavalaria e velocidade de movimento sem invulnerabilidade","weapon":"Lança","bookPage":"52–56","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Dromeus Komētes","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-atalanta","name":"Atalanta","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Archer","className":"Caçador","race":"Moreau do Gato","profile":"racer","color":"#ce93a3","identity":"ARCHER // Phoebus Catastrophe","concept":"Arco e mobilidade com Marca da Presa","signature":"Phoebus Catastrophe — Arco e mobilidade com Marca da Presa","weapon":"Arco longo","bookPage":"49–52","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Phoebus Catastrophe","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-siegfried","name":"Siegfried","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Saber","className":"Guerreiro","race":"Moreau do Leão","profile":"brawler","color":"#ce93a3","identity":"SABER // Balmung","concept":"Resistência e espada pesada sem imunidade a dano gratuita","signature":"Balmung — Resistência e espada pesada sem imunidade a dano gratuita","weapon":"Espada de duas mãos","bookPage":"64–67","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Balmung","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-chiron","name":"Chiron","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Archer","className":"Caçador","race":"Centauro","profile":"tactician","color":"#ce93a3","identity":"ARCHER // Professor de Heróis","concept":"Pontaria tática e treinamento de companheiros","signature":"Professor de Heróis — Pontaria tática e treinamento de companheiros","weapon":"Arco longo","bookPage":"49–52","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Professor de Heróis","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-semiramis","name":"Semiramis","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Assassin","className":"Arcanista","race":"Suraggel Sulfure","profile":"charisma","color":"#ce93a3","identity":"ASSASSIN // Jardins Suspensos","concept":"Veneno magia e fortificações condicionadas a construção","signature":"Jardins Suspensos — Veneno magia e fortificações condicionadas a construção","weapon":"Cajado","bookPage":"36–40","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Jardins Suspensos","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-vlad","name":"Vlad III","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Lancer","className":"Cavaleiro","race":"Osteon","profile":"brawler","color":"#ce93a3","identity":"LANCER // Kazikli Bey","concept":"Combate de lança e controle de terreno com fontes legais","signature":"Kazikli Bey — Combate de lança e controle de terreno com fontes legais","weapon":"Lança","bookPage":"52–56","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Kazikli Bey","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-jack-ripper","name":"Jack the Ripper","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Assassin","className":"Ladino","race":"Hynne","profile":"finesse","color":"#ce93a3","identity":"ASSASSIN // Maria the Ripper","concept":"Furtividade agressiva e ataques furtivos condicionados","signature":"Maria the Ripper — Furtividade agressiva e ataques furtivos condicionados","weapon":"Adaga","bookPage":"72–74","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Maria the Ripper","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-frankenstein","name":"Frankenstein","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Berserker","className":"Lutador","race":"Golem","profile":"brawler","color":"#ce93a3","identity":"BERSERKER // Blasted Tree","concept":"Força e descarga elétrica somente por fontes existentes","signature":"Blasted Tree — Força e descarga elétrica somente por fontes existentes","weapon":"Martelo de guerra","bookPage":"75–77","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Blasted Tree","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-spartacus","name":"Spartacus","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Berserker","className":"Lutador","race":"Moreau do Leão","profile":"brawler","color":"#ce93a3","identity":"BERSERKER // Rebelião Inquebrável","concept":"Resistência e técnicas corporais com risco crescente","signature":"Rebelião Inquebrável — Resistência e técnicas corporais com risco crescente","weapon":"Martelo de guerra","bookPage":"75–77","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Rebelião Inquebrável","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-avicebron","name":"Avicebron","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Caster","className":"Inventor","race":"Golem","profile":"tactician","color":"#ce93a3","identity":"CASTER // Golem Keter Malkuth","concept":"Construção de protótipos e autômatos sob recursos de classe","signature":"Golem Keter Malkuth — Construção de protótipos e autômatos sob recursos de classe","weapon":"Ferramentas","bookPage":"67–72","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Golem Keter Malkuth","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-shakespeare","name":"William Shakespeare","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Caster","className":"Bardo","race":"Meio-Elfo","profile":"charisma","color":"#ce93a3","identity":"CASTER // First Folio","concept":"Palavras atuação e efeitos mentais se magia permitir","signature":"First Folio — Palavras atuação e efeitos mentais se magia permitir","weapon":"Instrumento musical","bookPage":"43–46","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["First Folio","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-amakusa","name":"Amakusa Shirō Tokisada","universe":"Fate/Apocrypha","group":"fate","arc":"apo","fateClass":"Ruler","className":"Clérigo","race":"Suraggel Aggelus","profile":"support","color":"#ce93a3","identity":"RULER // Milagre Duplo","concept":"Magias divinas e comando de proteção","signature":"Milagre Duplo — Magias divinas e comando de proteção","weapon":"Bordão","bookPage":"56–60","source":"https://fate-apocryphausa.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Milagre Duplo","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-nero","name":"Nero Claudius","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Saber","className":"Bardo","race":"Qareen","profile":"charisma","color":"#ab8cf0","identity":"SABER // Aestus Estus","concept":"Espada cênica e Inspiração com presença de palco","signature":"Aestus Estus — Espada cênica e Inspiração com presença de palco","weapon":"Espada longa","bookPage":"43–46","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Aestus Estus","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-tamamo","name":"Tamamo-no-Mae","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Caster","className":"Arcanista","race":"Sátiro","profile":"charisma","color":"#ab8cf0","identity":"CASTER // Eightfold Blessings","concept":"Maldições e apoio espiritual com magias reais","signature":"Eightfold Blessings — Maldições e apoio espiritual com magias reais","weapon":"Cajado","bookPage":"36–40","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Eightfold Blessings","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-nameless","name":"Nameless","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Archer","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#ab8cf0","identity":"ARCHER // O Guerreiro Sem Nome","concept":"Projeção como escolha de arma em vez de armas infinitas","signature":"O Guerreiro Sem Nome — Projeção como escolha de arma em vez de armas infinitas","weapon":"Espada curta","bookPage":"64–67","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["O Guerreiro Sem Nome","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-bb","name":"BB","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Moon Cancer","className":"Arcanista","race":"Qareen","profile":"tactician","color":"#ab8cf0","identity":"MOON CANCER // Cyber Moon Cell","concept":"Controle e debuff por feitiços com CD e custo","signature":"Cyber Moon Cell — Controle e debuff por feitiços com CD e custo","weapon":"Cajado","bookPage":"36–40","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Cyber Moon Cell","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-melt","name":"Meltryllis","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Alter Ego","className":"Lutador","race":"Suraggel Sulfure","profile":"finesse","color":"#ab8cf0","identity":"ALTER EGO // Sarasvati Meltout","concept":"Combate veloz e liquefação apenas narrativa","signature":"Sarasvati Meltout — Combate veloz e liquefação apenas narrativa","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Sarasvati Meltout","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-passionlip","name":"Passionlip","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Alter Ego","className":"Lutador","race":"Golem","profile":"brawler","color":"#ab8cf0","identity":"ALTER EGO // Trash and Crush","concept":"Armas naturais e agarrão com força colossal narrada","signature":"Trash and Crush — Armas naturais e agarrão com força colossal narrada","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Trash and Crush","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-gawain","name":"Gawain","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Saber","className":"Paladino","race":"Suraggel Aggelus","profile":"charisma","color":"#ab8cf0","identity":"SABER // Numeral of the Saint","concept":"Espada e força solar por recursos divinos legais","signature":"Numeral of the Saint — Espada e força solar por recursos divinos legais","weapon":"Espada longa","bookPage":"81–85","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Numeral of the Saint","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-robin-hood","name":"Robin Hood","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Archer","className":"Caçador","race":"Moreau da Raposa","profile":"finesse","color":"#ab8cf0","identity":"ARCHER // Yew Bow","concept":"Flechas venenos e tática furtiva por item comprado","signature":"Yew Bow — Flechas venenos e tática furtiva por item comprado","weapon":"Arco longo","bookPage":"49–52","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Yew Bow","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-elizabeth","name":"Elizabeth Báthory","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Lancer","className":"Bardo","race":"Sátiro","profile":"charisma","color":"#ab8cf0","identity":"LANCER // Torture by Singing","concept":"Voz e ataques de lança com custos claros","signature":"Torture by Singing — Voz e ataques de lança com custos claros","weapon":"Lança","bookPage":"43–46","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Torture by Singing","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-li-shuwen","name":"Li Shuwen","universe":"Fate/EXTRA & CCC","group":"fate","arc":"extra","fateClass":"Assassin","className":"Lutador","race":"Moreau do Leão","profile":"brawler","color":"#ab8cf0","identity":"ASSASSIN // No Second Strike","concept":"Golpes de curto alcance e disciplina marcial","signature":"No Second Strike — Golpes de curto alcance e disciplina marcial","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://typemoon.fandom.com/wiki/Fate/EXTRA_CCC","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["No Second Strike","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-mash","name":"Mash Kyrielight","universe":"Fate/Grand Order · Camelot","group":"fate","arc":"camelot","fateClass":"Shielder","className":"Paladino","race":"Suraggel Aggelus","profile":"support","color":"#9bbecf","identity":"SHIELDER // Lord Camelot","concept":"Escudo e proteção por poderes de classe adquiridos","signature":"Lord Camelot — Escudo e proteção por poderes de classe adquiridos","weapon":"Escudo pesado","bookPage":"81–85","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Lord Camelot","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-bedivere","name":"Bedivere","universe":"Fate/Grand Order · Camelot","group":"fate","arc":"camelot","fateClass":"Saber","className":"Paladino","race":"Meio-Elfo","profile":"support","color":"#9bbecf","identity":"SABER // Switch On Agateram","concept":"Espadachim de braço mágico com aquisição de item","signature":"Switch On Agateram — Espadachim de braço mágico com aquisição de item","weapon":"Espada longa","bookPage":"81–85","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Switch On Agateram","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-ozymandias","name":"Ozymandias","universe":"Fate/Grand Order · Camelot","group":"fate","arc":"camelot","fateClass":"Rider","className":"Nobre","race":"Qareen","profile":"charisma","color":"#9bbecf","identity":"RIDER // Ramesseum Tentyris","concept":"Comando majestoso e proteção em local preparado","signature":"Ramesseum Tentyris — Comando majestoso e proteção em local preparado","weapon":"Cetro","bookPage":"78–81","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Ramesseum Tentyris","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-nitocris","name":"Nitocris","universe":"Fate/Grand Order · Camelot","group":"fate","arc":"camelot","fateClass":"Caster","className":"Arcanista","race":"Suraggel Aggelus","profile":"tactician","color":"#9bbecf","identity":"CASTER // Anpu Neb Ta Djeser","concept":"Magias de morte e sombras com CD e custo","signature":"Anpu Neb Ta Djeser — Magias de morte e sombras com CD e custo","weapon":"Cajado","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Anpu Neb Ta Djeser","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-merlin","name":"Merlin","universe":"Fate/Grand Order · Camelot","group":"fate","arc":"camelot","fateClass":"Caster","className":"Arcanista","race":"Eiradaan","profile":"tactician","color":"#9bbecf","identity":"CASTER // Garden of Avalon","concept":"Magias ilusórias defesa e apoio","signature":"Garden of Avalon — Magias ilusórias defesa e apoio","weapon":"Cajado","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Garden of Avalon","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-king-hassan","name":"First Hassan","universe":"Fate/Grand Order · Camelot","group":"fate","arc":"camelot","fateClass":"Assassin","className":"Ladino","race":"Osteon","profile":"brawler","color":"#9bbecf","identity":"ASSASSIN // Azrael","concept":"Ataques decisivos e armadura sob regras de assassinato","signature":"Azrael — Ataques decisivos e armadura sob regras de assassinato","weapon":"Espada longa","bookPage":"72–74","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Azrael","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-sanzang","name":"Xuanzang Sanzang","universe":"Fate/Grand Order · Camelot","group":"fate","arc":"camelot","fateClass":"Caster","className":"Clérigo","race":"Suraggel Aggelus","profile":"support","color":"#9bbecf","identity":"CASTER // Five Elements Mountain","concept":"Magia divina e suporte de combate","signature":"Five Elements Mountain — Magia divina e suporte de combate","weapon":"Bordão","bookPage":"56–60","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Five Elements Mountain","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-enkidu","name":"Enkidu","universe":"Fate/Grand Order · Babylonia","group":"fate","arc":"babylonia","fateClass":"Lancer","className":"Druida","race":"Golem","profile":"support","color":"#d5b77e","identity":"LANCER // Enuma Elish de Correntes","concept":"Controle de terreno e formas naturais sob regras da classe","signature":"Enuma Elish de Correntes — Controle de terreno e formas naturais sob regras da classe","weapon":"Correntes","bookPage":"60–64","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Enuma Elish de Correntes","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-quatz","name":"Quetzalcoatl","universe":"Fate/Grand Order · Babylonia","group":"fate","arc":"babylonia","fateClass":"Rider","className":"Lutador","race":"Sátiro","profile":"brawler","color":"#d5b77e","identity":"RIDER // Xiuhcoatl","concept":"Luta livre e magia temática de fogo quando disponível","signature":"Xiuhcoatl — Luta livre e magia temática de fogo quando disponível","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Xiuhcoatl","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-ishtar","name":"Ishtar","universe":"Fate/Grand Order · Babylonia","group":"fate","arc":"babylonia","fateClass":"Archer","className":"Arcanista","race":"Qareen","profile":"charisma","color":"#d5b77e","identity":"ARCHER // An Gal Tā Kigal Shē","concept":"Ataques de magia celestial e joias com custo","signature":"An Gal Tā Kigal Shē — Ataques de magia celestial e joias com custo","weapon":"Arco mágico","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["An Gal Tā Kigal Shē","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-ereshkigal","name":"Ereshkigal","universe":"Fate/Grand Order · Babylonia","group":"fate","arc":"babylonia","fateClass":"Lancer","className":"Clérigo","race":"Suraggel Sulfure","profile":"support","color":"#d5b77e","identity":"LANCER // Kur Kigal Irkalla","concept":"Proteção do submundo e magias de controle","signature":"Kur Kigal Irkalla — Proteção do submundo e magias de controle","weapon":"Lança","bookPage":"56–60","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Kur Kigal Irkalla","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-ushiwakamaru","name":"Ushiwakamaru","universe":"Fate/Grand Order · Babylonia","group":"fate","arc":"babylonia","fateClass":"Rider","className":"Guerreiro","race":"Moreau da Raposa","profile":"racer","color":"#d5b77e","identity":"RIDER // Dan-no-Ura","concept":"Mobilidade e cortes rápidos com Ataque Extra pago","signature":"Dan-no-Ura — Mobilidade e cortes rápidos com Ataque Extra pago","weapon":"Katana","bookPage":"64–67","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Dan-no-Ura","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-leonidas","name":"Leônidas I","universe":"Fate/Grand Order · Babylonia","group":"fate","arc":"babylonia","fateClass":"Lancer","className":"Cavaleiro","race":"Moreau do Leão","profile":"brawler","color":"#d5b77e","identity":"LANCER // Thermopylae Enomotia","concept":"Formação defensiva de escudos e lança","signature":"Thermopylae Enomotia — Formação defensiva de escudos e lança","weapon":"Lança","bookPage":"52–56","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Thermopylae Enomotia","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-tiamat","name":"Tiamat","universe":"Fate/Grand Order · Babylonia","group":"fate","arc":"babylonia","fateClass":"Beast / Alter Ego","className":"Druida","race":"Suraggel Sulfure","profile":"support","color":"#d5b77e","identity":"BEAST / ALTER EGO // Nammu Duranki","concept":"Criação e preservação representadas por magias da natureza","signature":"Nammu Duranki — Criação e preservação representadas por magias da natureza","weapon":"Bordão","bookPage":"60–64","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Nammu Duranki","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-solomon","name":"Solomon","universe":"Fate/Grand Order · Babylonia","group":"fate","arc":"babylonia","fateClass":"Caster","className":"Arcanista","race":"Eiradaan","profile":"tactician","color":"#d5b77e","identity":"CASTER // Ars Nova","concept":"Ars magia ritual e custos de alta conjuração","signature":"Ars Nova — Ars magia ritual e custos de alta conjuração","weapon":"Cajado","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Ars Nova","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-scathach","name":"Scáthach","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Lancer","className":"Guerreiro","race":"Suraggel Sulfure","profile":"finesse","color":"#ba88b1","identity":"LANCER // Gáe Bolg Alternative","concept":"Lança e treinamento lendário de artes marciais","signature":"Gáe Bolg Alternative — Lança e treinamento lendário de artes marciais","weapon":"Lança","bookPage":"64–67","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Gáe Bolg Alternative","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-skadi","name":"Scáthach-Skadi","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Caster","className":"Druida","race":"Eiradaan","profile":"support","color":"#ac9fd3","identity":"CASTER // Portões da Rainha do Gelo","concept":"Magias de frio e proteção de aliados","signature":"Portões da Rainha do Gelo — Magias de frio e proteção de aliados","weapon":"Bordão","bookPage":"60–64","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Portões da Rainha do Gelo","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-brynhildr","name":"Brynhildr","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Lancer","className":"Paladino","race":"Suraggel Aggelus","profile":"charisma","color":"#ac9fd3","identity":"LANCER // Brynhildr Romantia","concept":"Lança e proteção de Valquíria com custo","signature":"Brynhildr Romantia — Lança e proteção de Valquíria com custo","weapon":"Lança","bookPage":"81–85","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Brynhildr Romantia","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-sigurd","name":"Sigurd","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Saber","className":"Guerreiro","race":"Meio-Elfo","profile":"brawler","color":"#ac9fd3","identity":"SABER // Gram","concept":"Espada mortal e artes rúnicas como efeitos adquiridos","signature":"Gram — Espada mortal e artes rúnicas como efeitos adquiridos","weapon":"Espada longa","bookPage":"64–67","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Gram","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-arjuna","name":"Arjuna","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Archer","className":"Caçador","race":"Suraggel Aggelus","profile":"racer","color":"#ac9fd3","identity":"ARCHER // Pashupata","concept":"Arco e percepção estratégica; explosões só por magias","signature":"Pashupata — Arco e percepção estratégica; explosões só por magias","weapon":"Arco longo","bookPage":"49–52","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Pashupata","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-kama","name":"Kama","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Assassin","className":"Ladino","race":"Qareen","profile":"charisma","color":"#ac9fd3","identity":"ASSASSIN // Kāma Sammohana","concept":"Encantamentos e furtividade com recursos legais","signature":"Kāma Sammohana — Encantamentos e furtividade com recursos legais","weapon":"Adaga","bookPage":"72–74","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Kāma Sammohana","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-kiara","name":"Sesshōin Kiara","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Alter Ego","className":"Arcanista","race":"Suraggel Sulfure","profile":"charisma","color":"#ac9fd3","identity":"ALTER EGO // Amitābha Amidala","concept":"Efeitos mentais e magias de apoio sem manipulação gratuita","signature":"Amitābha Amidala — Efeitos mentais e magias de apoio sem manipulação gratuita","weapon":"Cajado","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Amitābha Amidala","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-qin-shi-huang","name":"Qin Shi Huang (Fate)","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Ruler","className":"Nobre","race":"Golem","profile":"tactician","color":"#ac9fd3","identity":"RULER // Trono da Imortalidade","concept":"Comando e defesa governamental com chassis artificial","signature":"Trono da Imortalidade — Comando e defesa governamental com chassis artificial","weapon":"Cetro","bookPage":"78–81","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Trono da Imortalidade","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-morgan","name":"Morgan","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Berserker","className":"Arcanista","race":"Eiradaan","profile":"charisma","color":"#ac9fd3","identity":"BERSERKER // Roadless Camelot","concept":"Feitiços de gelo e liderança de corte feérica","signature":"Roadless Camelot — Feitiços de gelo e liderança de corte feérica","weapon":"Cajado","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Roadless Camelot","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-oberon","name":"Oberon Vortigern","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Pretender","className":"Bardo","race":"Eiradaan","profile":"charisma","color":"#ac9fd3","identity":"PRETENDER // Lie Like Vortigern","concept":"Ilusão encanto e disfarces com consequências reais","signature":"Lie Like Vortigern — Ilusão encanto e disfarces com consequências reais","weapon":"Instrumento musical","bookPage":"43–46","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Lie Like Vortigern","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-melusine","name":"Melusine","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Lancer","className":"Paladino","race":"Suraggel Aggelus","profile":"finesse","color":"#ac9fd3","identity":"LANCER // Innocence Arondight","concept":"Dragão e espada como linguagem de proteção","signature":"Innocence Arondight — Dragão e espada como linguagem de proteção","weapon":"Espada longa","bookPage":"81–85","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Innocence Arondight","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-barghest","name":"Barghest","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Saber","className":"Guerreiro","race":"Moreau do Lobo","profile":"brawler","color":"#ac9fd3","identity":"SABER // Predadora de Fang","concept":"Armadura corpo a corpo e proteção de corte","signature":"Predadora de Fang — Armadura corpo a corpo e proteção de corte","weapon":"Espada longa","bookPage":"64–67","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Predadora de Fang","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-baobhan-sith","name":"Baobhan Sith","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Archer","className":"Caçador","race":"Eiradaan","profile":"finesse","color":"#ac9fd3","identity":"ARCHER // Cálice de Fadas","concept":"Flechas de maldição e posicionamento","signature":"Cálice de Fadas — Flechas de maldição e posicionamento","weapon":"Arco longo","bookPage":"49–52","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Cálice de Fadas","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-percival","name":"Percival","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Lancer","className":"Paladino","race":"Meio-Elfo","profile":"support","color":"#ac9fd3","identity":"LANCER // Longinus Count Zero","concept":"Lança de purificação e defesa sob regras de classe","signature":"Longinus Count Zero — Lança de purificação e defesa sob regras de classe","weapon":"Lança","bookPage":"81–85","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Longinus Count Zero","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-habetrot","name":"Habetrot","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Rider","className":"Inventor","race":"Hynne","profile":"tactician","color":"#ac9fd3","identity":"RIDER // Noiva das Fadas","concept":"Costura engenharia e itens de apoio adquiridos","signature":"Noiva das Fadas — Costura engenharia e itens de apoio adquiridos","weapon":"Ferramentas","bookPage":"67–72","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Noiva das Fadas","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-koyanskaya","name":"Koyanskaya da Luz","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Assassin","className":"Inventor","race":"Moreau da Raposa","profile":"tactician","color":"#ac9fd3","identity":"ASSASSIN // Arsenal NFF","concept":"Armas de fogo e engenhocas com preço e requisitos","signature":"Arsenal NFF — Armas de fogo e engenhocas com preço e requisitos","weapon":"Pistola","bookPage":"67–72","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Arsenal NFF","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-douman","name":"Ashiya Dōman","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Alter Ego","className":"Arcanista","race":"Suraggel Sulfure","profile":"tactician","color":"#ac9fd3","identity":"ALTER EGO // Maldições Onmyōji","concept":"Magias de medo e debilitação com CD oficial","signature":"Maldições Onmyōji — Magias de medo e debilitação com CD oficial","weapon":"Cajado","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Maldições Onmyōji","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-edmond-dantes","name":"Edmond Dantès","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Avenger","className":"Ladino","race":"Suraggel Sulfure","profile":"finesse","color":"#ba88b1","identity":"AVENGER // Monte Cristo Mythologie","concept":"Investida furtiva e evasão com ação legal","signature":"Monte Cristo Mythologie — Investida furtiva e evasão com ação legal","weapon":"Adaga","bookPage":"72–74","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Monte Cristo Mythologie","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-okita","name":"Okita Sōji","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Saber","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#ba88b1","identity":"SABER // Mumyou Sandanzuki","concept":"Esgrima veloz com golpes precisos","signature":"Mumyou Sandanzuki — Esgrima veloz com golpes precisos","weapon":"Katana","bookPage":"64–67","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Mumyou Sandanzuki","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-nobunaga","name":"Oda Nobunaga","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Archer","className":"Caçador","race":"Meio-Elfo","profile":"racer","color":"#ba88b1","identity":"ARCHER // Three Line Formation","concept":"Armas à distância e munição geridas por recursos reais","signature":"Three Line Formation — Armas à distância e munição geridas por recursos reais","weapon":"Arco longo","bookPage":"49–52","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Three Line Formation","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-musashi","name":"Miyamoto Musashi","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Saber","className":"Guerreiro","race":"Moreau do Leão","profile":"finesse","color":"#ba88b1","identity":"SABER // Niten Ichiryū","concept":"Duas espadas e vantagem posicional sob pré-requisitos","signature":"Niten Ichiryū — Duas espadas e vantagem posicional sob pré-requisitos","weapon":"Espada longa","bookPage":"64–67","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Niten Ichiryū","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-hokusai","name":"Katsushika Hokusai","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Foreigner","className":"Arcanista","race":"Qareen","profile":"tactician","color":"#ba88b1","identity":"FOREIGNER // Fugaku Sanjūrokkei","concept":"Pintura e magias de área com componentes reais","signature":"Fugaku Sanjūrokkei — Pintura e magias de área com componentes reais","weapon":"Pincel arcano","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Fugaku Sanjūrokkei","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-abigail","name":"Abigail Williams","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Foreigner","className":"Arcanista","race":"Suraggel Sulfure","profile":"charisma","color":"#ba88b1","identity":"FOREIGNER // Qliphoth Rhizome","concept":"Magias ocultas e controle mental sujeitos a resistências","signature":"Qliphoth Rhizome — Magias ocultas e controle mental sujeitos a resistências","weapon":"Cajado","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Qliphoth Rhizome","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-van-gogh","name":"Van Gogh (Clytie)","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Foreigner","className":"Arcanista","race":"Eiradaan","profile":"tactician","color":"#ba88b1","identity":"FOREIGNER // De Sterrennacht","concept":"Ilusões e apoio mágico de pinturas com custo","signature":"De Sterrennacht — Ilusões e apoio mágico de pinturas com custo","weapon":"Pincel arcano","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["De Sterrennacht","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-teze","name":"Tezcatlipoca","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Assassin","className":"Ladino","race":"Suraggel Sulfure","profile":"brawler","color":"#ba88b1","identity":"ASSASSIN // First Sun Xibalba","concept":"Mobilidade furtiva e guerra como combate tático","signature":"First Sun Xibalba — Mobilidade furtiva e guerra como combate tático","weapon":"Adaga","bookPage":"72–74","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["First Sun Xibalba","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-kukulkan","name":"Kukulkan","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Foreigner","className":"Paladino","race":"Suraggel Aggelus","profile":"charisma","color":"#ac9fd3","identity":"FOREIGNER // Kinich Ahau","concept":"Energia solar e golpes sagrados sob PM","signature":"Kinich Ahau — Energia solar e golpes sagrados sob PM","weapon":"Espada longa","bookPage":"81–85","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Kinich Ahau","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-raikou","name":"Minamoto-no-Raikō","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Berserker","className":"Guerreiro","race":"Moreau do Leão","profile":"brawler","color":"#ba88b1","identity":"BERSERKER // Ox King Storm Call","concept":"Espada e defesa de aliados com disciplina marcial","signature":"Ox King Storm Call — Espada e defesa de aliados com disciplina marcial","weapon":"Katana","bookPage":"64–67","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Ox King Storm Call","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-shuten","name":"Shuten-Dōji","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Assassin","className":"Ladino","race":"Sátiro","profile":"charisma","color":"#ba88b1","identity":"ASSASSIN // Sakura Burai","concept":"Furtividade toxinas e presença feérica","signature":"Sakura Burai — Furtividade toxinas e presença feérica","weapon":"Adaga","bookPage":"72–74","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Sakura Burai","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-ibaraki","name":"Ibaraki-Dōji","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Berserker","className":"Lutador","race":"Sátiro","profile":"brawler","color":"#ba88b1","identity":"BERSERKER // Demonic Ogre","concept":"Golpes e intimidação via perícias sem força demoníaca grátis","signature":"Demonic Ogre — Golpes e intimidação via perícias sem força demoníaca grátis","weapon":"Golpes desarmados","bookPage":"75–77","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Demonic Ogre","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-kintoki","name":"Sakata Kintoki","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Berserker","className":"Lutador","race":"Moreau do Leão","profile":"brawler","color":"#ba88b1","identity":"BERSERKER // Golden Spark","concept":"Golpes físicos com custo e carga de equipamento","signature":"Golden Spark — Golpes físicos com custo e carga de equipamento","weapon":"Machado","bookPage":"75–77","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Golden Spark","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-arthur-proto","name":"Arthur Pendragon (Prototype)","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Saber","className":"Paladino","race":"Suraggel Aggelus","profile":"charisma","color":"#ba88b1","identity":"SABER // Excalibur Proto","concept":"Espada e defesa contra ameaças sem dano absoluto","signature":"Excalibur Proto — Espada e defesa contra ameaças sem dano absoluto","weapon":"Espada longa","bookPage":"81–85","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Excalibur Proto","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-anastasia","name":"Anastasia Nikolaevna","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Caster","className":"Arcanista","race":"Eiradaan","profile":"tactician","color":"#ac9fd3","identity":"CASTER // Viy Viy Viy","concept":"Gelo feitiços e familiar apenas se escolhido","signature":"Viy Viy Viy — Gelo feitiços e familiar apenas se escolhido","weapon":"Cajado","bookPage":"36–40","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Viy Viy Viy","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-ivan","name":"Ivan o Terrível","universe":"Fate/Grand Order · Lostbelts","group":"fate","arc":"lostbelt","fateClass":"Rider","className":"Cavaleiro","race":"Moreau do Leão","profile":"brawler","color":"#ac9fd3","identity":"RIDER // Zveri Krestnyi Khod","concept":"Força monstruosa e comando de guerra como regras oficiais","signature":"Zveri Krestnyi Khod — Força monstruosa e comando de guerra como regras oficiais","weapon":"Lança","bookPage":"52–56","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Zveri Krestnyi Khod","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-holmes","name":"Sherlock Holmes","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Ruler","className":"Ladino","race":"Meio-Elfo","profile":"tactician","color":"#ba88b1","identity":"RULER // Elementary My Dear","concept":"Investigação pistas e perícias elevadas","signature":"Elementary My Dear — Investigação pistas e perícias elevadas","weapon":"Adaga","bookPage":"72–74","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Elementary My Dear","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-moriarty","name":"James Moriarty","universe":"Fate/Grand Order · Espíritos Heroicos","group":"fate","arc":"misc","fateClass":"Archer","className":"Inventor","race":"Moreau da Raposa","profile":"tactician","color":"#ba88b1","identity":"ARCHER // The Dynamics of an Asteroid","concept":"Estratégia armadilhas e artilharia com custo","signature":"The Dynamics of an Asteroid — Estratégia armadilhas e artilharia com custo","weapon":"Besta pesada","bookPage":"67–72","source":"https://fate-go.us/servant/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["The Dynamics of an Asteroid","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-richard","name":"Richard I","universe":"Fate/strange Fake","group":"fate","arc":"strange","fateClass":"Saber","className":"Guerreiro","race":"Meio-Elfo","profile":"racer","color":"#9f9fb3","identity":"SABER // Excalibur de Ricardo","concept":"Arma adaptada e impulso heroico de combate","signature":"Excalibur de Ricardo — Arma adaptada e impulso heroico de combate","weapon":"Espada longa","bookPage":"64–67","source":"https://fatesf-anime.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Excalibur de Ricardo","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-pale-rider","name":"Pale Rider","universe":"Fate/strange Fake","group":"fate","arc":"strange","fateClass":"Rider","className":"Druida","race":"Osteon","profile":"support","color":"#9f9fb3","identity":"RIDER // Cavaleiro da Peste","concept":"Magia de doença e nevoeiro com custos","signature":"Cavaleiro da Peste — Magia de doença e nevoeiro com custos","weapon":"Bordão","bookPage":"60–64","source":"https://fatesf-anime.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Cavaleiro da Peste","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-dumas","name":"Alexandre Dumas","universe":"Fate/strange Fake","group":"fate","arc":"strange","fateClass":"Caster","className":"Inventor","race":"Meio-Elfo","profile":"tactician","color":"#9f9fb3","identity":"CASTER // Grand Dictionnaire de Cuisine","concept":"Forjar conceitos em artefatos apenas por Ofício","signature":"Grand Dictionnaire de Cuisine — Forjar conceitos em artefatos apenas por Ofício","weapon":"Ferramentas","bookPage":"67–72","source":"https://fatesf-anime.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Grand Dictionnaire de Cuisine","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-hippolyta","name":"Hippolyta","universe":"Fate/strange Fake","group":"fate","arc":"strange","fateClass":"Rider","className":"Cavaleiro","race":"Moreau do Leão","profile":"brawler","color":"#9f9fb3","identity":"RIDER // A Rainha Amazona","concept":"Combate montado e disciplina de lança","signature":"A Rainha Amazona — Combate montado e disciplina de lança","weapon":"Lança","bookPage":"52–56","source":"https://fatesf-anime.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["A Rainha Amazona","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-zealot","name":"Hassan Zealot","universe":"Fate/strange Fake","group":"fate","arc":"strange","fateClass":"Assassin","className":"Ladino","race":"Suraggel Sulfure","profile":"finesse","color":"#9f9fb3","identity":"ASSASSIN // Zabaniya Aprendida","concept":"Furtividade e técnica de assassina sob pré-requisitos","signature":"Zabaniya Aprendida — Furtividade e técnica de assassina sob pré-requisitos","weapon":"Adaga","bookPage":"72–74","source":"https://fatesf-anime.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Zabaniya Aprendida","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-prelati","name":"François Prelati","universe":"Fate/strange Fake","group":"fate","arc":"strange","fateClass":"Caster","className":"Arcanista","race":"Suraggel Sulfure","profile":"tactician","color":"#9f9fb3","identity":"CASTER // Magecraft Profano","concept":"Ilusões e magias de ritual com custo real","signature":"Magecraft Profano — Ilusões e magias de ritual com custo real","weapon":"Cajado","bookPage":"36–40","source":"https://fatesf-anime.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":"mago","styles":["Magecraft Profano","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-jack-fake","name":"Jack the Ripper (Strange Fake)","universe":"Fate/strange Fake","group":"fate","arc":"strange","fateClass":"Berserker","className":"Ladino","race":"Osteon","profile":"finesse","color":"#9f9fb3","identity":"BERSERKER // Berserker do Desconhecido","concept":"Disfarces e assassinato sem infinitas formas grátis","signature":"Berserker do Desconhecido — Disfarces e assassinato sem infinitas formas grátis","weapon":"Adaga","bookPage":"72–74","source":"https://fatesf-anime.com/character/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Berserker do Desconhecido","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-yamato","name":"Yamato Takeru","universe":"Fate/Samurai Remnant","group":"fate","arc":"samurai","fateClass":"Saber","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#c9a28f","identity":"SABER // Kusanagi","concept":"Esgrima veloz e magias elementais se adquiridas","signature":"Kusanagi — Esgrima veloz e magias elementais se adquiridas","weapon":"Katana","bookPage":"64–67","source":"https://www.gamecity.ne.jp/fate-sr/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Kusanagi","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]},{"id":"fate-tamamo-aria","name":"Tamamo Aria","universe":"Fate/Samurai Remnant","group":"fate","arc":"samurai","fateClass":"Rider","className":"Bardo","race":"Sátiro","profile":"charisma","color":"#c9a28f","identity":"RIDER // Mística da Cauda","concept":"Encantamentos feéricos e diplomacia de espíritos","signature":"Mística da Cauda — Encantamentos feéricos e diplomacia de espíritos","weapon":"Instrumento musical","bookPage":"43–46","source":"https://www.gamecity.ne.jp/fate-sr/","image":null,"imageCredit":"Insígnia editorial original / Fate · TYPE-MOON","path":null,"styles":["Mística da Cauda","Leitura do campo e custo de mana","Técnica nobre representada por efeito legal","Clímax de invocação com limitações"]}];})();


/* wave8-data.js */
/* FASE VIII — novos personagens e elencos. Builds 1–12 auditáveis via motor Fase VII.
   Raças T20 representam aproximação mecânica, NÃO a biologia canônica.
   Todas as propostas de poder dependem de escolha, requisitos, regras e PM. */
(()=>{"use strict";
const seeds=[{"id":"nova-lloyd","name":"Lloyd Frontera","universe":"The Greatest Estate Developer","group":"manhwa","className":"Inventor","race":"Kliren","profile":"tactician","color":"#c79b65","identity":"ENGENHEIRO DA FRONTEIRA","concept":"Planejamento de obras, negociação e engenhocas para transformar infraestrutura e proteger o território","signature":"ENGENHEIRO DA FRONTEIRA — Planejamento de obras, negociação e engenhocas para transformar infraestrutura e proteger o território","weapon":"Ferramentas de engenharia","bookPage":"67–72","source":"https://www.webtoons.com/en/fantasy/the-greatest-estate-developer/list?title_no=3596","image":"https://swebtoon-phinf.pstatic.net/20211116_1/1637004313334y7KiF_JPEG/8The%2BGreatest%2BEstate%2BDeveloper_Launch_mobile_landingpage.jpg?type=crop540_540","imageCredit":"Imagem de referência externa · fonte indicada","path":null,"styles":["ENGENHEIRO DA FRONTEIRA","Planejamento de obras, negociação e engenhocas para transformar infraestrutura e proteger o território","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: ENGENHEIRO DA FRONTEIRA.","Treinar os testes fundamentais da função. Função: Planejamento de obras, negociação e engenhocas para transformar infraestrutura e proteger o território.","Escolher poder de classe com requisitos confirmados. Equipamento: Ferramentas de engenharia.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: ENGENHEIRO DA FRONTEIRA.","Evoluir recursos automáticos da classe e perícias. Função: Planejamento de obras, negociação e engenhocas para transformar infraestrutura e proteger o território.","Combinar proteção e posicionamento sem ação extra. Equipamento: Ferramentas de engenharia.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: ENGENHEIRO DA FRONTEIRA.","Preparar abordagem contra chefes e resistências. Função: Planejamento de obras, negociação e engenhocas para transformar infraestrutura e proteger o território.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Ferramentas de engenharia.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"nova-jin","name":"Jin Runcandel","universe":"Swordmaster's Youngest Son","group":"manhwa","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","color":"#687bcf","identity":"ESPADA DAS SOMBRAS","concept":"Esgrima, precisão, contrato sombrio e magia narrativa representados por manobras e equipamentos adquiridos","signature":"ESPADA DAS SOMBRAS — Esgrima, precisão, contrato sombrio e magia narrativa representados por manobras e equipamentos adquiridos","weapon":"Espada longa","bookPage":"64–67","source":"https://swordmasters-youngest-son.fandom.com/wiki/Jin_Runcandel","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["ESPADA DAS SOMBRAS","Esgrima, precisão, contrato sombrio e magia narrativa representados por manobras e equipamentos adquiridos","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: ESPADA DAS SOMBRAS.","Treinar os testes fundamentais da função. Função: Esgrima, precisão, contrato sombrio e magia narrativa representados por manobras e equipamentos adquiridos.","Escolher poder de classe com requisitos confirmados. Equipamento: Espada longa.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: ESPADA DAS SOMBRAS.","Evoluir recursos automáticos da classe e perícias. Função: Esgrima, precisão, contrato sombrio e magia narrativa representados por manobras e equipamentos adquiridos.","Combinar proteção e posicionamento sem ação extra. Equipamento: Espada longa.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: ESPADA DAS SOMBRAS.","Preparar abordagem contra chefes e resistências. Função: Esgrima, precisão, contrato sombrio e magia narrativa representados por manobras e equipamentos adquiridos.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Espada longa.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"seven-homelander","name":"Homelander","universe":"The Boys (Prime Video)","group":"the-boys","className":"Paladino","race":"Suraggel Sulfure","profile":"charisma","color":"#ffce69","identity":"SUPREMACIA CORROMPIDA","concept":"Liderança coercitiva e rajadas visuais simuladas por golpes e magia legal; sem invulnerabilidade gratuita","signature":"SUPREMACIA CORROMPIDA — Liderança coercitiva e rajadas visuais simuladas por golpes e magia legal; sem invulnerabilidade gratuita","weapon":"Armadura e espada","bookPage":"81–85","source":"https://www.primevideo.com/detail/The-Boys/0KRGHGZCHKS920ZQGY5LBRF7MA","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["SUPREMACIA CORROMPIDA","Liderança coercitiva e rajadas visuais simuladas por golpes e magia legal; sem invulnerabilidade gratuita","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: SUPREMACIA CORROMPIDA.","Treinar os testes fundamentais da função. Função: Liderança coercitiva e rajadas visuais simuladas por golpes e magia legal; sem invulnerabilidade gratuita.","Escolher poder de classe com requisitos confirmados. Equipamento: Armadura e espada.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: SUPREMACIA CORROMPIDA.","Evoluir recursos automáticos da classe e perícias. Função: Liderança coercitiva e rajadas visuais simuladas por golpes e magia legal; sem invulnerabilidade gratuita.","Combinar proteção e posicionamento sem ação extra. Equipamento: Armadura e espada.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: SUPREMACIA CORROMPIDA.","Preparar abordagem contra chefes e resistências. Função: Liderança coercitiva e rajadas visuais simuladas por golpes e magia legal; sem invulnerabilidade gratuita.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Armadura e espada.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"seven-maeve","name":"Queen Maeve","universe":"The Boys (Prime Video)","group":"the-boys","className":"Guerreiro","race":"Moreau do Leão","profile":"brawler","color":"#d7a1c9","identity":"ESCUDO DA RAINHA","concept":"Resistência e domínio do combate corpo a corpo com armas e posturas defensivas","signature":"ESCUDO DA RAINHA — Resistência e domínio do combate corpo a corpo com armas e posturas defensivas","weapon":"Espada longa","bookPage":"64–67","source":"https://the-boys.fandom.com/wiki/Queen_Maeve","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["ESCUDO DA RAINHA","Resistência e domínio do combate corpo a corpo com armas e posturas defensivas","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: ESCUDO DA RAINHA.","Treinar os testes fundamentais da função. Função: Resistência e domínio do combate corpo a corpo com armas e posturas defensivas.","Escolher poder de classe com requisitos confirmados. Equipamento: Espada longa.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: ESCUDO DA RAINHA.","Evoluir recursos automáticos da classe e perícias. Função: Resistência e domínio do combate corpo a corpo com armas e posturas defensivas.","Combinar proteção e posicionamento sem ação extra. Equipamento: Espada longa.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: ESCUDO DA RAINHA.","Preparar abordagem contra chefes e resistências. Função: Resistência e domínio do combate corpo a corpo com armas e posturas defensivas.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Espada longa.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"seven-a-train","name":"A-Train","universe":"The Boys (Prime Video)","group":"the-boys","className":"Lutador","race":"Moreau do Coelho","profile":"racer","color":"#57d9ff","identity":"VELOCISTA VOUGHT","concept":"Velocidade e investidas convertidas em deslocamento, iniciativa e golpes com custo","signature":"VELOCISTA VOUGHT — Velocidade e investidas convertidas em deslocamento, iniciativa e golpes com custo","weapon":"Ataque desarmado","bookPage":"75–77","source":"https://the-boys.fandom.com/wiki/A-Train","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["VELOCISTA VOUGHT","Velocidade e investidas convertidas em deslocamento, iniciativa e golpes com custo","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: VELOCISTA VOUGHT.","Treinar os testes fundamentais da função. Função: Velocidade e investidas convertidas em deslocamento, iniciativa e golpes com custo.","Escolher poder de classe com requisitos confirmados. Equipamento: Ataque desarmado.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: VELOCISTA VOUGHT.","Evoluir recursos automáticos da classe e perícias. Função: Velocidade e investidas convertidas em deslocamento, iniciativa e golpes com custo.","Combinar proteção e posicionamento sem ação extra. Equipamento: Ataque desarmado.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: VELOCISTA VOUGHT.","Preparar abordagem contra chefes e resistências. Função: Velocidade e investidas convertidas em deslocamento, iniciativa e golpes com custo.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Ataque desarmado.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"seven-deep","name":"The Deep","universe":"The Boys (Prime Video)","group":"the-boys","className":"Druida","race":"Moreau do Lobo","profile":"support","color":"#3a9bb8","identity":"DOMÍNIO DAS MARÉS","concept":"Afinidade com animais aquáticos tratada com perícias de natureza, sem controle universal de seres","signature":"DOMÍNIO DAS MARÉS — Afinidade com animais aquáticos tratada com perícias de natureza, sem controle universal de seres","weapon":"Tridente","bookPage":"60–64","source":"https://the-boys.fandom.com/wiki/The_Deep","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["DOMÍNIO DAS MARÉS","Afinidade com animais aquáticos tratada com perícias de natureza, sem controle universal de seres","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: DOMÍNIO DAS MARÉS.","Treinar os testes fundamentais da função. Função: Afinidade com animais aquáticos tratada com perícias de natureza, sem controle universal de seres.","Escolher poder de classe com requisitos confirmados. Equipamento: Tridente.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: DOMÍNIO DAS MARÉS.","Evoluir recursos automáticos da classe e perícias. Função: Afinidade com animais aquáticos tratada com perícias de natureza, sem controle universal de seres.","Combinar proteção e posicionamento sem ação extra. Equipamento: Tridente.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: DOMÍNIO DAS MARÉS.","Preparar abordagem contra chefes e resistências. Função: Afinidade com animais aquáticos tratada com perícias de natureza, sem controle universal de seres.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Tridente.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"seven-noir","name":"Black Noir","universe":"The Boys (Prime Video)","group":"the-boys","className":"Ladino","race":"Osteon","profile":"finesse","color":"#444958","identity":"ASSASSINO SILENCIOSO","concept":"Furtividade, emboscadas e resistência em combate; trauma e regeneração apenas por regras existentes","signature":"ASSASSINO SILENCIOSO — Furtividade, emboscadas e resistência em combate; trauma e regeneração apenas por regras existentes","weapon":"Adagas","bookPage":"72–74","source":"https://the-boys.fandom.com/wiki/Black_Noir","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["ASSASSINO SILENCIOSO","Furtividade, emboscadas e resistência em combate; trauma e regeneração apenas por regras existentes","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: ASSASSINO SILENCIOSO.","Treinar os testes fundamentais da função. Função: Furtividade, emboscadas e resistência em combate; trauma e regeneração apenas por regras existentes.","Escolher poder de classe com requisitos confirmados. Equipamento: Adagas.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: ASSASSINO SILENCIOSO.","Evoluir recursos automáticos da classe e perícias. Função: Furtividade, emboscadas e resistência em combate; trauma e regeneração apenas por regras existentes.","Combinar proteção e posicionamento sem ação extra. Equipamento: Adagas.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: ASSASSINO SILENCIOSO.","Preparar abordagem contra chefes e resistências. Função: Furtividade, emboscadas e resistência em combate; trauma e regeneração apenas por regras existentes.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Adagas.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"seven-translucent","name":"Translucent","universe":"The Boys (Prime Video)","group":"the-boys","className":"Ladino","race":"Suraggel Sulfure","profile":"finesse","color":"#a5ccd8","identity":"INFILTRAÇÃO INVISÍVEL","concept":"Disfarce e furtividade; invisibilidade depende de magia ou recurso legalmente adquirido","signature":"INFILTRAÇÃO INVISÍVEL — Disfarce e furtividade; invisibilidade depende de magia ou recurso legalmente adquirido","weapon":"Adaga","bookPage":"72–74","source":"https://the-boys.fandom.com/wiki/Translucent","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["INFILTRAÇÃO INVISÍVEL","Disfarce e furtividade; invisibilidade depende de magia ou recurso legalmente adquirido","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: INFILTRAÇÃO INVISÍVEL.","Treinar os testes fundamentais da função. Função: Disfarce e furtividade; invisibilidade depende de magia ou recurso legalmente adquirido.","Escolher poder de classe com requisitos confirmados. Equipamento: Adaga.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: INFILTRAÇÃO INVISÍVEL.","Evoluir recursos automáticos da classe e perícias. Função: Disfarce e furtividade; invisibilidade depende de magia ou recurso legalmente adquirido.","Combinar proteção e posicionamento sem ação extra. Equipamento: Adaga.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: INFILTRAÇÃO INVISÍVEL.","Preparar abordagem contra chefes e resistências. Função: Disfarce e furtividade; invisibilidade depende de magia ou recurso legalmente adquirido.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Adaga.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"zzz-remielle","name":"Remielle Dan","universe":"Zenless Zone Zero","group":"zenless","className":"Bardo","race":"Eiradaan","profile":"charisma","color":"#ddb0e8","identity":"DANÇA DO LÚMEN","concept":"Cortes elegantes, coreografia, anomalias luminosas e suporte por magias e Inspiração","signature":"DANÇA DO LÚMEN — Cortes elegantes, coreografia, anomalias luminosas e suporte por magias e Inspiração","weapon":"Espada ritualística","bookPage":"43–46","source":"https://zenless.hoyoverse.com/m/en-us/character?id=164866","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["DANÇA DO LÚMEN","Cortes elegantes, coreografia, anomalias luminosas e suporte por magias e Inspiração","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: DANÇA DO LÚMEN.","Treinar os testes fundamentais da função. Função: Cortes elegantes, coreografia, anomalias luminosas e suporte por magias e Inspiração.","Escolher poder de classe com requisitos confirmados. Equipamento: Espada ritualística.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: DANÇA DO LÚMEN.","Evoluir recursos automáticos da classe e perícias. Função: Cortes elegantes, coreografia, anomalias luminosas e suporte por magias e Inspiração.","Combinar proteção e posicionamento sem ação extra. Equipamento: Espada ritualística.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: DANÇA DO LÚMEN.","Preparar abordagem contra chefes e resistências. Função: Cortes elegantes, coreografia, anomalias luminosas e suporte por magias e Inspiração.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Espada ritualística.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"zzz-miyabi","name":"Hoshimi Miyabi","universe":"Zenless Zone Zero","group":"zenless","className":"Guerreiro","race":"Moreau da Raposa","profile":"finesse","color":"#66e0da","identity":"ESPADA FROST","concept":"Iaijutsu, precisão de katana e gelo sobrenatural apenas com recurso ou magia habilitada","signature":"ESPADA FROST — Iaijutsu, precisão de katana e gelo sobrenatural apenas com recurso ou magia habilitada","weapon":"Katana (espada longa)","bookPage":"64–67","source":"https://zenless.hoyoverse.com/en-us/character","image":"https://zenless.gg/wp-content/uploads/sites/18/2024/12/featuredImage-6.jpg","imageCredit":"Imagem de referência externa · fonte indicada","path":null,"styles":["ESPADA FROST","Iaijutsu, precisão de katana e gelo sobrenatural apenas com recurso ou magia habilitada","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: ESPADA FROST.","Treinar os testes fundamentais da função. Função: Iaijutsu, precisão de katana e gelo sobrenatural apenas com recurso ou magia habilitada.","Escolher poder de classe com requisitos confirmados. Equipamento: Katana (espada longa).","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: ESPADA FROST.","Evoluir recursos automáticos da classe e perícias. Função: Iaijutsu, precisão de katana e gelo sobrenatural apenas com recurso ou magia habilitada.","Combinar proteção e posicionamento sem ação extra. Equipamento: Katana (espada longa).","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: ESPADA FROST.","Preparar abordagem contra chefes e resistências. Função: Iaijutsu, precisão de katana e gelo sobrenatural apenas com recurso ou magia habilitada.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Katana (espada longa).","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"marvel-sentry","name":"Sentry (MCU)","universe":"Marvel Cinematic Universe","group":"marvel","className":"Paladino","race":"Suraggel Aggelus","profile":"brawler","color":"#f5d86d","identity":"PODER DO SOL / VAZIO","concept":"Força e resistência sobre-humanas, brilho e conflito interno; poderes cósmicos convertidos em limites de classe","signature":"PODER DO SOL / VAZIO — Força e resistência sobre-humanas, brilho e conflito interno; poderes cósmicos convertidos em limites de classe","weapon":"Punhos e armadura","bookPage":"81–85","source":"https://www.marvel.com/characters/sentry-robert-reynolds","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["PODER DO SOL / VAZIO","Força e resistência sobre-humanas, brilho e conflito interno; poderes cósmicos convertidos em limites de classe","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: PODER DO SOL / VAZIO.","Treinar os testes fundamentais da função. Função: Força e resistência sobre-humanas, brilho e conflito interno; poderes cósmicos convertidos em limites de classe.","Escolher poder de classe com requisitos confirmados. Equipamento: Punhos e armadura.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: PODER DO SOL / VAZIO.","Evoluir recursos automáticos da classe e perícias. Função: Força e resistência sobre-humanas, brilho e conflito interno; poderes cósmicos convertidos em limites de classe.","Combinar proteção e posicionamento sem ação extra. Equipamento: Punhos e armadura.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: PODER DO SOL / VAZIO.","Preparar abordagem contra chefes e resistências. Função: Força e resistência sobre-humanas, brilho e conflito interno; poderes cósmicos convertidos em limites de classe.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Punhos e armadura.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hsr-silver-wolf","name":"Silver Wolf","universe":"Honkai: Star Rail","group":"hsr","className":"Inventor","race":"Goblin","profile":"tactician","color":"#af89f7","identity":"HACKER DO ÉTER","concept":"Programação, sabotagem eletrônica e vulnerabilidades representadas por engenhocas e perícias","signature":"HACKER DO ÉTER — Programação, sabotagem eletrônica e vulnerabilidades representadas por engenhocas e perícias","weapon":"Dispositivo hacker","bookPage":"67–72","source":"https://hsr.hoyoverse.com/en-us/character","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["HACKER DO ÉTER","Programação, sabotagem eletrônica e vulnerabilidades representadas por engenhocas e perícias","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: HACKER DO ÉTER.","Treinar os testes fundamentais da função. Função: Programação, sabotagem eletrônica e vulnerabilidades representadas por engenhocas e perícias.","Escolher poder de classe com requisitos confirmados. Equipamento: Dispositivo hacker.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: HACKER DO ÉTER.","Evoluir recursos automáticos da classe e perícias. Função: Programação, sabotagem eletrônica e vulnerabilidades representadas por engenhocas e perícias.","Combinar proteção e posicionamento sem ação extra. Equipamento: Dispositivo hacker.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: HACKER DO ÉTER.","Preparar abordagem contra chefes e resistências. Função: Programação, sabotagem eletrônica e vulnerabilidades representadas por engenhocas e perícias.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Dispositivo hacker.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hsr-aha","name":"Aeon ★ Aha (Nihilux)","universe":"Honkai: Star Rail","group":"hsr","className":"Bardo","race":"Qareen","profile":"charisma","color":"#e46ad2","identity":"EXULTAÇÃO / NIHILUX","concept":"Caos, teatralidade e manipulação social sem conceder status divino ou controle automático","signature":"EXULTAÇÃO / NIHILUX — Caos, teatralidade e manipulação social sem conceder status divino ou controle automático","weapon":"Máscara ritualística","bookPage":"43–46","source":"https://starrailstation.com/en/character/nihilux","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["EXULTAÇÃO / NIHILUX","Caos, teatralidade e manipulação social sem conceder status divino ou controle automático","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: EXULTAÇÃO / NIHILUX.","Treinar os testes fundamentais da função. Função: Caos, teatralidade e manipulação social sem conceder status divino ou controle automático.","Escolher poder de classe com requisitos confirmados. Equipamento: Máscara ritualística.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: EXULTAÇÃO / NIHILUX.","Evoluir recursos automáticos da classe e perícias. Função: Caos, teatralidade e manipulação social sem conceder status divino ou controle automático.","Combinar proteção e posicionamento sem ação extra. Equipamento: Máscara ritualística.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: EXULTAÇÃO / NIHILUX.","Preparar abordagem contra chefes e resistências. Função: Caos, teatralidade e manipulação social sem conceder status divino ou controle automático.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Máscara ritualística.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hsr-himeko-nova","name":"Himeko • Nova","universe":"Honkai: Star Rail","group":"hsr","className":"Inventor","race":"Kliren","profile":"tactician","color":"#d76f56","identity":"ESTRELA MATINAL","concept":"Engenhos orbitais, assistência em equipe e ataques de fogo simulados por equipamentos e engenhocas","signature":"ESTRELA MATINAL — Engenhos orbitais, assistência em equipe e ataques de fogo simulados por equipamentos e engenhocas","weapon":"Projetor orbital","bookPage":"67–72","source":"https://www.hoyoverse.com/en-us/news/165197","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["ESTRELA MATINAL","Engenhos orbitais, assistência em equipe e ataques de fogo simulados por equipamentos e engenhocas","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: ESTRELA MATINAL.","Treinar os testes fundamentais da função. Função: Engenhos orbitais, assistência em equipe e ataques de fogo simulados por equipamentos e engenhocas.","Escolher poder de classe com requisitos confirmados. Equipamento: Projetor orbital.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: ESTRELA MATINAL.","Evoluir recursos automáticos da classe e perícias. Função: Engenhos orbitais, assistência em equipe e ataques de fogo simulados por equipamentos e engenhocas.","Combinar proteção e posicionamento sem ação extra. Equipamento: Projetor orbital.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: ESTRELA MATINAL.","Preparar abordagem contra chefes e resistências. Função: Engenhos orbitais, assistência em equipe e ataques de fogo simulados por equipamentos e engenhocas.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Projetor orbital.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hsr-welt","name":"Welt Yang","universe":"Honkai: Star Rail + Honkai Impact 3rd","group":"hsr","className":"Arcanista","race":"Meio-Elfo","profile":"tactician","color":"#857bd0","identity":"HERDEIRO DA RAZÃO","concept":"Controle gravitacional e ilusões com magias legais, história compartilhada entre os dois jogos","signature":"HERDEIRO DA RAZÃO — Controle gravitacional e ilusões com magias legais, história compartilhada entre os dois jogos","weapon":"Bengala","bookPage":"36–40","source":"https://hsr.hoyoverse.com/en-us/character","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":"mago","styles":["HERDEIRO DA RAZÃO","Controle gravitacional e ilusões com magias legais, história compartilhada entre os dois jogos","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: HERDEIRO DA RAZÃO.","Treinar os testes fundamentais da função. Função: Controle gravitacional e ilusões com magias legais, história compartilhada entre os dois jogos.","Escolher poder de classe com requisitos confirmados. Equipamento: Bengala.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: HERDEIRO DA RAZÃO.","Evoluir recursos automáticos da classe e perícias. Função: Controle gravitacional e ilusões com magias legais, história compartilhada entre os dois jogos.","Combinar proteção e posicionamento sem ação extra. Equipamento: Bengala.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: HERDEIRO DA RAZÃO.","Preparar abordagem contra chefes e resistências. Função: Controle gravitacional e ilusões com magias legais, história compartilhada entre os dois jogos.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Bengala.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hsr-stelle","name":"Stelle (Desbravadora)","universe":"Honkai: Star Rail","group":"hsr","className":"Guerreiro","race":"Golem","profile":"brawler","color":"#d2be91","identity":"DESBRAVADORA DO STELLARON","concept":"Combate de bastão e resistência com construção artificial interpretada pela raça Golem","signature":"DESBRAVADORA DO STELLARON — Combate de bastão e resistência com construção artificial interpretada pela raça Golem","weapon":"Taco de beisebol","bookPage":"64–67","source":"https://hsr.hoyoverse.com/en-us/character","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["DESBRAVADORA DO STELLARON","Combate de bastão e resistência com construção artificial interpretada pela raça Golem","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: DESBRAVADORA DO STELLARON.","Treinar os testes fundamentais da função. Função: Combate de bastão e resistência com construção artificial interpretada pela raça Golem.","Escolher poder de classe com requisitos confirmados. Equipamento: Taco de beisebol.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: DESBRAVADORA DO STELLARON.","Evoluir recursos automáticos da classe e perícias. Função: Combate de bastão e resistência com construção artificial interpretada pela raça Golem.","Combinar proteção e posicionamento sem ação extra. Equipamento: Taco de beisebol.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: DESBRAVADORA DO STELLARON.","Preparar abordagem contra chefes e resistências. Função: Combate de bastão e resistência com construção artificial interpretada pela raça Golem.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Taco de beisebol.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hunter-kafka","name":"Kafka","universe":"Honkai: Star Rail — Stellaron Hunters","group":"hsr","className":"Bardo","race":"Qareen","profile":"charisma","color":"#bc517c","identity":"SUSSURRO DO DESTINO","concept":"Influência psicológica e combate com armas; compulsão depende de resistências e magia legal","signature":"SUSSURRO DO DESTINO — Influência psicológica e combate com armas; compulsão depende de resistências e magia legal","weapon":"Pistolas cenográficas","bookPage":"43–46","source":"https://hsr.hoyoverse.com/en-us/character","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["SUSSURRO DO DESTINO","Influência psicológica e combate com armas; compulsão depende de resistências e magia legal","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: SUSSURRO DO DESTINO.","Treinar os testes fundamentais da função. Função: Influência psicológica e combate com armas; compulsão depende de resistências e magia legal.","Escolher poder de classe com requisitos confirmados. Equipamento: Pistolas cenográficas.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: SUSSURRO DO DESTINO.","Evoluir recursos automáticos da classe e perícias. Função: Influência psicológica e combate com armas; compulsão depende de resistências e magia legal.","Combinar proteção e posicionamento sem ação extra. Equipamento: Pistolas cenográficas.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: SUSSURRO DO DESTINO.","Preparar abordagem contra chefes e resistências. Função: Influência psicológica e combate com armas; compulsão depende de resistências e magia legal.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Pistolas cenográficas.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hunter-blade","name":"Blade","universe":"Honkai: Star Rail — Stellaron Hunters","group":"hsr","className":"Guerreiro","race":"Osteon","profile":"brawler","color":"#a45462","identity":"ESPADA IMORTAL","concept":"Dano sustentado e regeneração sob regras T20; sacrifício narrativo não é imortalidade mecânica","signature":"ESPADA IMORTAL — Dano sustentado e regeneração sob regras T20; sacrifício narrativo não é imortalidade mecânica","weapon":"Espada quebrada","bookPage":"64–67","source":"https://hsr.hoyoverse.com/en-us/character","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["ESPADA IMORTAL","Dano sustentado e regeneração sob regras T20; sacrifício narrativo não é imortalidade mecânica","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: ESPADA IMORTAL.","Treinar os testes fundamentais da função. Função: Dano sustentado e regeneração sob regras T20; sacrifício narrativo não é imortalidade mecânica.","Escolher poder de classe com requisitos confirmados. Equipamento: Espada quebrada.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: ESPADA IMORTAL.","Evoluir recursos automáticos da classe e perícias. Função: Dano sustentado e regeneração sob regras T20; sacrifício narrativo não é imortalidade mecânica.","Combinar proteção e posicionamento sem ação extra. Equipamento: Espada quebrada.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: ESPADA IMORTAL.","Preparar abordagem contra chefes e resistências. Função: Dano sustentado e regeneração sob regras T20; sacrifício narrativo não é imortalidade mecânica.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Espada quebrada.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hunter-firefly","name":"Firefly / SAM","universe":"Honkai: Star Rail — Stellaron Hunters","group":"hsr","className":"Inventor","race":"Golem","profile":"brawler","color":"#82c5ac","identity":"CAVALEIRA DO FOGO","concept":"Armadura SAM como equipamento construído; propulsão e combustão exigem engenhocas adquiridas","signature":"CAVALEIRA DO FOGO — Armadura SAM como equipamento construído; propulsão e combustão exigem engenhocas adquiridas","weapon":"Armadura mecanizada SAM","bookPage":"67–72","source":"https://hsr.hoyoverse.com/en-us/character","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["CAVALEIRA DO FOGO","Armadura SAM como equipamento construído; propulsão e combustão exigem engenhocas adquiridas","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: CAVALEIRA DO FOGO.","Treinar os testes fundamentais da função. Função: Armadura SAM como equipamento construído; propulsão e combustão exigem engenhocas adquiridas.","Escolher poder de classe com requisitos confirmados. Equipamento: Armadura mecanizada SAM.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: CAVALEIRA DO FOGO.","Evoluir recursos automáticos da classe e perícias. Função: Armadura SAM como equipamento construído; propulsão e combustão exigem engenhocas adquiridas.","Combinar proteção e posicionamento sem ação extra. Equipamento: Armadura mecanizada SAM.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: CAVALEIRA DO FOGO.","Preparar abordagem contra chefes e resistências. Função: Armadura SAM como equipamento construído; propulsão e combustão exigem engenhocas adquiridas.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Armadura mecanizada SAM.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hunter-elio","name":"Elio","universe":"Honkai: Star Rail — Stellaron Hunters","group":"hsr","className":"Nobre","race":"Eiradaan","profile":"support","color":"#d4ad79","identity":"ROTEIRO DO DESTINO","concept":"Planejamento, liderança e previsão narrativa limitada por perícias; não prevê resultados de dados","signature":"ROTEIRO DO DESTINO — Planejamento, liderança e previsão narrativa limitada por perícias; não prevê resultados de dados","weapon":"Livro de roteiros","bookPage":"78–81","source":"https://honkai-star-rail.fandom.com/wiki/Elio","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["ROTEIRO DO DESTINO","Planejamento, liderança e previsão narrativa limitada por perícias; não prevê resultados de dados","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: ROTEIRO DO DESTINO.","Treinar os testes fundamentais da função. Função: Planejamento, liderança e previsão narrativa limitada por perícias; não prevê resultados de dados.","Escolher poder de classe com requisitos confirmados. Equipamento: Livro de roteiros.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: ROTEIRO DO DESTINO.","Evoluir recursos automáticos da classe e perícias. Função: Planejamento, liderança e previsão narrativa limitada por perícias; não prevê resultados de dados.","Combinar proteção e posicionamento sem ação extra. Equipamento: Livro de roteiros.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: ROTEIRO DO DESTINO.","Preparar abordagem contra chefes e resistências. Função: Planejamento, liderança e previsão narrativa limitada por perícias; não prevê resultados de dados.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Livro de roteiros.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]},{"id":"hsr-feixiao","name":"Feixiao","universe":"Honkai: Star Rail","group":"hsr","className":"Caçador","race":"Moreau da Raposa","profile":"racer","color":"#71d2bc","identity":"GENERAL DA RAPOSA","concept":"Velocidade, perseguição de alvos e golpes coordenados com preparação e Marca da Presa","signature":"GENERAL DA RAPOSA — Velocidade, perseguição de alvos e golpes coordenados com preparação e Marca da Presa","weapon":"Lança e arco","bookPage":"49–52","source":"https://hsr.hoyoverse.com/en-us/character","image":null,"imageCredit":"Pôster editorial de reserva · imagem não licenciada localmente","path":null,"styles":["GENERAL DA RAPOSA","Velocidade, perseguição de alvos e golpes coordenados com preparação e Marca da Presa","Prática de combate e verificação dos pré-requisitos","Limitação por ação, PM e equipamento"],"levels":["Definir equipamento, origem e especialidade compatíveis. Foco: GENERAL DA RAPOSA.","Treinar os testes fundamentais da função. Função: Velocidade, perseguição de alvos e golpes coordenados com preparação e Marca da Presa.","Escolher poder de classe com requisitos confirmados. Equipamento: Lança e arco.","Ajustar ação e custo de PM das técnicas. Adaptação não oficial; sem recursos gratuitos.","Reforçar atributo-chave e opções de classe. Foco: GENERAL DA RAPOSA.","Evoluir recursos automáticos da classe e perícias. Função: Velocidade, perseguição de alvos e golpes coordenados com preparação e Marca da Presa.","Combinar proteção e posicionamento sem ação extra. Equipamento: Lança e arco.","Revisar poderes, distinções e limitações da raça. Adaptação não oficial; sem recursos gratuitos.","Desenvolver versão avançada da técnica sem criar regra. Foco: GENERAL DA RAPOSA.","Preparar abordagem contra chefes e resistências. Função: Velocidade, perseguição de alvos e golpes coordenados com preparação e Marca da Presa.","Melhorar equipamento e fontes oficiais disponíveis. Equipamento: Lança e arco.","Executar estratégia final de nível 12 com custos e testes. Adaptação não oficial; sem recursos gratuitos."]}];
for(const seed of seeds){
 if(seed.id.startsWith("seven-"))seed.universe="The Boys — Os Sete (Prime Video)";
 if(seed.id==="hsr-silver-wolf")seed.universe="Honkai: Star Rail — Stellaron Hunters";
}
window.T20_WAVE7_SEEDS.push(...seeds);
window.T20_WAVE8_IDS=seeds.map(s=>s.id);
})();


/* wave7-forms.js */
/* Versões independentes dos Servos: 1 card por identidade, seletor de formas.
 * Não são Servos adicionais no catálogo de cards. Cada forma tem 12 níveis,
 * atributos, raça, classe, equipamento, guia e técnicas próprios. */
(()=>{"use strict";window.T20_WAVE7_ALT_SPECS=[{"parentId":"fate-artoria","key":"alter","label":"S.Alter","servantClass":"Saber Alter","className":"Guerreiro","race":"Suraggel Sulfure","profile":"brawler","identity":"Excalibur Morgan","concept":"Espada sombria e golpe pessoal sem aniquilação garantida","weapon":"Espada longa"},{"parentId":"fate-artoria","key":"lancer","label":"Lancer","servantClass":"Lancer","className":"Cavaleiro","race":"Centauro","profile":"racer","identity":"Rhongomyniad","concept":"Lança e montaria em abordagem de cavalaria","weapon":"Lança"},{"parentId":"fate-artoria","key":"lalter","label":"L.Alter","servantClass":"Lancer Alter","className":"Cavaleiro","race":"Suraggel Sulfure","profile":"brawler","identity":"Rhongomyniad Alter","concept":"Lança sombria e manobras com investida","weapon":"Lança"},{"parentId":"fate-artoria","key":"caster","label":"Caster","servantClass":"Caster Artoria","className":"Arcanista","race":"Eiradaan","profile":"support","identity":"Artoria Avalon","concept":"Magias de defesa e proteção de aliados","weapon":"Cajado"},{"parentId":"fate-artoria","key":"archer","label":"Archer","servantClass":"Archer Verão","className":"Caçador","race":"Moreau do Coelho","profile":"racer","identity":"Water Blitz","concept":"Ataques à distância com equipamento adequado","weapon":"Arco curto"},{"parentId":"fate-artoria","key":"ruler","label":"Ruler","servantClass":"Ruler Verão","className":"Nobre","race":"Qareen","profile":"charisma","identity":"Casino Camelot","concept":"Liderança de cassino e negociação com autoridade","weapon":"Florete"},{"parentId":"fate-emiya","key":"alter","label":"Alter","servantClass":"Archer Alter","className":"Guerreiro","race":"Suraggel Sulfure","profile":"finesse","identity":"Espadas Esquecidas","concept":"Armas projetadas representadas por equipamentos","weapon":"Espada curta"},{"parentId":"fate-cu-chulainn","key":"caster","label":"Caster","servantClass":"Caster","className":"Arcanista","race":"Qareen","profile":"tactician","identity":"Runas Primordiais","concept":"Magias rúnicas de fogo e defesa com recursos","weapon":"Cajado"},{"parentId":"fate-cu-chulainn","key":"alter","label":"Alter","servantClass":"Berserker Alter","className":"Lutador","race":"Moreau do Lobo","profile":"brawler","identity":"Curruid Coinchenn","concept":"Lança e selvageria corporal com custos","weapon":"Lança"},{"parentId":"fate-medusa","key":"lancer","label":"Lancer","servantClass":"Lancer Ana","className":"Guerreiro","race":"Medusa","profile":"finesse","identity":"Harpe","concept":"Combate com foice e velocidade","weapon":"Foice"},{"parentId":"fate-medusa","key":"gorgon","label":"Gorgon","servantClass":"Avenger Gorgon","className":"Arcanista","race":"Medusa","profile":"charisma","identity":"Pandemonium Cetus","concept":"Magias de veneno e petrificação com CD","weapon":"Cajado"},{"parentId":"fate-medusa","key":"saber","label":"Saber","servantClass":"Saber","className":"Guerreiro","race":"Medusa","profile":"racer","identity":"A Espada de Medusa","concept":"Ataques de lâmina rápida e efeitos adquiridos","weapon":"Espada curta"},{"parentId":"fate-medea","key":"lily","label":"Lily","servantClass":"Caster Lily","className":"Clérigo","race":"Qareen","profile":"support","identity":"Pureza da Feiticeira","concept":"Magias de cura e suporte","weapon":"Bordão"},{"parentId":"fate-heracles","key":"alcides","label":"Alcides","servantClass":"True Archer / Avenger","className":"Caçador","race":"Osteon","profile":"brawler","identity":"Nine Lives de Alcides","concept":"Arcos e brutalidade sob requisitos oficiais","weapon":"Arco longo"},{"parentId":"fate-gilgamesh","key":"caster","label":"Caster","servantClass":"Caster de Uruk","className":"Arcanista","race":"Qareen","profile":"tactician","identity":"Tesouro de Uruk","concept":"Magias e estratégia de cidade fortificada","weapon":"Cajado"},{"parentId":"fate-gilgamesh","key":"kid","label":"Kid","servantClass":"Kid Gilgamesh","className":"Nobre","race":"Hynne","profile":"charisma","identity":"Carisma do Jovem Rei","concept":"Negociação e defesa usando comando","weapon":"Arco curto"},{"parentId":"fate-lancelot","key":"saber","label":"Saber","servantClass":"Saber Lancelot","className":"Guerreiro","race":"Meio-Elfo","profile":"finesse","identity":"Arondight Overload","concept":"Espadachim de velocidade e técnica","weapon":"Espada longa"},{"parentId":"fate-jeanne","key":"alter","label":"J.Alter","servantClass":"Avenger Alter","className":"Arcanista","race":"Suraggel Sulfure","profile":"charisma","identity":"La Grondement Du Haine","concept":"Fogo amaldiçoado e arcanismo de combate","weapon":"Cajado"},{"parentId":"fate-jeanne","key":"archer","label":"Archer","servantClass":"Archer Verão","className":"Caçador","race":"Moreau do Coelho","profile":"racer","identity":"Maré Santa","concept":"Arco e mobilidade tematizados como verão","weapon":"Arco curto"},{"parentId":"fate-jeanne","key":"berserker","label":"J.Alter B","servantClass":"Berserker Alter Verão","className":"Lutador","race":"Suraggel Sulfure","profile":"brawler","identity":"Fúria da Dragonesa","concept":"Golpes e intimidação da versão de verão","weapon":"Golpes desarmados"},{"parentId":"fate-mordred","key":"rider","label":"Rider","servantClass":"Rider Verão","className":"Cavaleiro","race":"Sátiro","profile":"racer","identity":"Prydwen","concept":"Prancha mágica como montaria apenas se adquirida","weapon":"Lança"},{"parentId":"fate-astolfo","key":"saber","label":"Saber","servantClass":"Saber","className":"Guerreiro","race":"Sátiro","profile":"finesse","identity":"Astolfo Lâmina","concept":"Esgrima leve e truques de ilusões","weapon":"Espada curta"},{"parentId":"fate-karna","key":"santa","label":"Santa","servantClass":"Saber Santa","className":"Guerreiro","race":"Suraggel Aggelus","profile":"racer","identity":"Lâmina Solar de Inverno","concept":"Espada com tema solar sob regras","weapon":"Espada longa"},{"parentId":"fate-atalanta","key":"alter","label":"Alter","servantClass":"Berserker Alter","className":"Lutador","race":"Moreau do Gato","profile":"brawler","identity":"Agrius Metamorphosis","concept":"Forma felina e ataque corporal sem transformação grátis","weapon":"Golpes desarmados"},{"parentId":"fate-nero","key":"bride","label":"Bride","servantClass":"Saber Bride","className":"Bardo","race":"Qareen","profile":"charisma","identity":"Laus Saint Claudius","concept":"Inspiração e espada teatral","weapon":"Espada longa"},{"parentId":"fate-nero","key":"caster","label":"Caster","servantClass":"Caster Verão","className":"Arcanista","race":"Qareen","profile":"charisma","identity":"Teatro do Verão","concept":"Magia de espetáculo com alcance e PM","weapon":"Cajado"},{"parentId":"fate-nero","key":"draco","label":"Draco","servantClass":"Beast Draco","className":"Paladino","race":"Suraggel Sulfure","profile":"brawler","identity":"Sodoma Beast","concept":"Força imperial com equipamento e poderes divinos","weapon":"Espada longa"},{"parentId":"fate-tamamo","key":"lancer","label":"Lancer","servantClass":"Lancer Verão","className":"Guerreiro","race":"Sátiro","profile":"racer","identity":"Parasól de Praia","concept":"Ataques com lança e velocidade","weapon":"Lança"},{"parentId":"fate-tamamo","key":"cat","label":"Cat","servantClass":"Tamamo Cat Berserker","className":"Lutador","race":"Moreau do Gato","profile":"brawler","identity":"Berserker Servil","concept":"Garras e resistência com custo de PM","weapon":"Golpes desarmados"},{"parentId":"fate-bb","key":"summer","label":"Verão","servantClass":"Moon Cancer Verão","className":"Arcanista","race":"Qareen","profile":"tactician","identity":"BB Pele de Verão","concept":"Controle temporal apenas narrativo e magia real","weapon":"Cajado"},{"parentId":"fate-melt","key":"summer","label":"Verão","servantClass":"Lancer Verão","className":"Guerreiro","race":"Suraggel Sulfure","profile":"finesse","identity":"Leviatã de Gelo","concept":"Lança e controle temático de água com custos","weapon":"Lança"},{"parentId":"fate-elizabeth","key":"halloween","label":"Caster","servantClass":"Caster Halloween","className":"Bardo","race":"Sátiro","profile":"charisma","identity":"Show de Halloween","concept":"Magias da voz e fantasia de Halloween","weapon":"Instrumento musical"},{"parentId":"fate-elizabeth","key":"brave","label":"Brave","servantClass":"Saber Brave","className":"Guerreiro","race":"Sátiro","profile":"brawler","identity":"Heroína de Jogo","concept":"Espada de palco com técnica marcial","weapon":"Espada longa"},{"parentId":"fate-mash","key":"ortinax","label":"Ortinax","servantClass":"Shielder Ortinax","className":"Paladino","race":"Golem","profile":"support","identity":"Ortinax Defense","concept":"Armadura adaptada escudo e reação defensiva","weapon":"Escudo pesado"},{"parentId":"fate-ishtar","key":"rider","label":"Rider","servantClass":"Rider Verão","className":"Cavaleiro","race":"Qareen","profile":"racer","identity":"Maid in Summer","concept":"Cavalaria veloz e manobras","weapon":"Lança"},{"parentId":"fate-ishtar","key":"space","label":"Space","servantClass":"Avenger Space Ishtar","className":"Arcanista","race":"Suraggel Sulfure","profile":"charisma","identity":"Edin Shuggurra Quasar","concept":"Feitiços cósmicos dentro dos círculos permitidos","weapon":"Cajado"},{"parentId":"fate-ereshkigal","key":"beast","label":"Beast","servantClass":"Beast Verão","className":"Arcanista","race":"Suraggel Sulfure","profile":"charisma","identity":"Ereshkigal Anima","concept":"Morte e magia sob custos altos","weapon":"Cajado"},{"parentId":"fate-scathach","key":"assassin","label":"Assassin","servantClass":"Assassin Verão","className":"Ladino","race":"Suraggel Sulfure","profile":"finesse","identity":"Disciplina de Praia","concept":"Furtividade com lanças leves","weapon":"Adaga"},{"parentId":"fate-arjuna","key":"alter","label":"Alter","servantClass":"Berserker Arjuna Alter","className":"Arcanista","race":"Suraggel Sulfure","profile":"tactician","identity":"Mahāpralaya","concept":"Magias de área e devastação sem dano gratuito","weapon":"Cajado"},{"parentId":"fate-kama","key":"avenger","label":"Verão","servantClass":"Avenger Verão","className":"Arcanista","race":"Qareen","profile":"charisma","identity":"Amor no Oceano","concept":"Magias de encanto e fogo com PM","weapon":"Cajado"},{"parentId":"fate-kiara","key":"summer","label":"Verão","servantClass":"Moon Cancer Verão","className":"Arcanista","race":"Suraggel Sulfure","profile":"charisma","identity":"Maré de Ilusão","concept":"Ilusões e suporte de efeito mental","weapon":"Cajado"},{"parentId":"fate-koyanskaya","key":"dark","label":"Escuridão","servantClass":"Foreigner das Trevas","className":"Arcanista","race":"Moreau da Raposa","profile":"tactician","identity":"NFF Escuridão","concept":"Maldições e tecnologia como foco arcano","weapon":"Cajado"},{"parentId":"fate-nobunaga","key":"berserker","label":"Berserker","servantClass":"Berserker Verão","className":"Guerreiro","race":"Moreau do Leão","profile":"brawler","identity":"Rock N Roll Nobu","concept":"Combate pesado e atuação temática","weapon":"Machado de batalha"},{"parentId":"fate-nobunaga","key":"avenger","label":"Avenger","servantClass":"Maou Nobunaga","className":"Paladino","race":"Suraggel Sulfure","profile":"brawler","identity":"Sangue de Oda","concept":"Poder guerreiro sob gasto de mana","weapon":"Espada longa"},{"parentId":"fate-musashi","key":"berserker","label":"Berserker","servantClass":"Berserker Verão","className":"Lutador","race":"Moreau do Leão","profile":"brawler","identity":"Espadas de Praia","concept":"Golpes e investidas sem ataques extras grátis","weapon":"Golpes desarmados"},{"parentId":"fate-okita","key":"alter","label":"Alter","servantClass":"Alter Ego Okita Alter","className":"Guerreiro","race":"Suraggel Sulfure","profile":"finesse","identity":"Zekken Mukyūsandan","concept":"Espada negra de alta velocidade","weapon":"Katana"},{"parentId":"fate-okita","key":"assassin","label":"Assassin","servantClass":"Assassin Verão","className":"Ladino","race":"Meio-Elfo","profile":"finesse","identity":"Rota da Sombra","concept":"Golpe furtivo com arma curta","weapon":"Adaga"},{"parentId":"fate-moriarty","key":"ruler","label":"Ruler","servantClass":"Ruler Jovem","className":"Nobre","race":"Meio-Elfo","profile":"tactician","identity":"O Professor Jovem","concept":"Estratégia diplomacia e perícias de combate","weapon":"Florete"},{"parentId":"fate-raikou","key":"lancer","label":"Lancer","servantClass":"Lancer Verão","className":"Paladino","race":"Moreau do Leão","profile":"brawler","identity":"Lança Purificadora","concept":"Lança e defesa divina com aquisição","weapon":"Lança"},{"parentId":"fate-shuten","key":"caster","label":"Caster","servantClass":"Caster Oniland","className":"Arcanista","race":"Sátiro","profile":"charisma","identity":"Feiticeira Oni","concept":"Magias sob proteção de foco","weapon":"Cajado"}];})();


/* wave7-art.js */
/* Referências visuais conferidas para as fichas da fase VII.
   Quando não há retrato verificado, mantém-se insígnia editorial original.
   Artistas e editoras conservam os direitos das ilustrações. */
(()=>{"use strict";const portraits={"jb-speedwagon":["https://static.jojowiki.com/images/a/a8/latest/20210421181820/Speedwagon_jojoeoh.png","JoJo's Bizarre Adventure · arte de jogo (via JoJo Wiki)","https://jojowiki.com/Robert_E._O._Speedwagon"],"jb-bucciarati":["https://mail.fightersgeneration.com/nf8/char3/bruno-bucciarati-jojo-anime-artwork.png","JoJo · arte de anime (via Fighters Generation)","https://jojowiki.com/Bruno_Bucciarati"],"dmc-dante":["https://www.fightersgeneration.com/nf8/char3/dante-dmc5-super.jpg","Devil May Cry 5 · render promocional (via Fighters Generation)","https://www.devilmaycry.com/5/"],"opm-saitama":["https://onepunchman-anime.net/news/wp-content/uploads/2025/09/88523dd80eed09ab8779fc5c517fb0ea-566x800.jpg","One Punch Man · site oficial do anime (2025)","https://onepunchman-anime.net/news/archives/6279"],"bl-rin":["https://static.zerochan.net/Itoshi.Rin.1024.4510263.webp","Blue Lock · 8-bit Studio, reprodução Zerochan","https://bluelock-anime-en.com/"],"bl-isagi":["https://static.zerochan.net/Isagi.Yoichi.1024.4480246.webp","Blue Lock · 8-bit Studio, reprodução Zerochan","https://bluelock-anime-en.com/"],"boys-butcher":["https://image.tmdb.org/t/p/original/w8PPAJypy0ukcwfLxTWwecI1Up5.jpg","The Boys · retrato promocional (via TMDb)","https://www.aboutamazon.com/news/entertainment/the-boys-season-4-cast-guide-prime-video"],"fate-gilgamesh":["https://fate-go.us/ctlb6/assets/img/part/1/babylonia/character/ph_gilgamesh_thumb.png","Fate/Grand Order · imagem oficial Babylonia","https://fate-go.us/ctlb6/part/1/babylonia/"],"fate-jeanne":["https://livedoor.blogimg.jp/ff_lightningsan-chaldeas/imgs/d/f/df18eb60.jpg","Fate/Grand Order · ilustração republicada","https://fate-apocryphausa.com/character/"],"fate-nero":["https://i.pinimg.com/originals/f6/df/f8/f6dff8634c2892c0c3de08f20424e1e3.jpg","Fate/Grand Order · ilustração republicada","https://fate-go.us/servant/"]},alt={"fate-artoria--lalter":["https://i3.gamebiz.jp/images/original/4499377465e71b86b17e340034.jpg","Fate/Grand Order Arcade · arte de lançamento 2020","https://gamebiz.jp/news/262499"]};
 const localHonkai=[
  "hsr-aha","hsr-feixiao","hsr-himeko-nova","hsr-silver-wolf","hsr-stelle",
  "hsr-welt","hunter-blade","hunter-firefly","hunter-kafka"
 ];
 for(const id of localHonkai){
  portraits[id]=["./assets/character-art/"+id+".webp","Honkai: Star Rail · HoYoverse / recorte HoYo Transparents, acervo enviado pelo usuário"];
 }
 const all=[...(window.T20_WAVE7_SEEDS||[]),...(window.T20_WAVE7_FATE_SEEDS||[])];
 for(const item of all){const data=portraits[item.id];if(data){item.image=data[0];item.imageCredit=data[1];item.imageSource=data[2]}}
 for(const spec of window.T20_WAVE7_ALT_SPECS||[]){
  const d=alt[spec.parentId+"--"+spec.key];
  if(d){spec.image=d[0];spec.imageCredit=d[1];spec.imageSource=d[2]}
 }
})();


/* cosmos-rules.js */
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


/* cosmos-builds.js */
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


/* cosmos-art.js */
/* Retratos externos da Fase IX, com páginas e créditos. */
window.T20_COSMOS_PORTRAITS=Object.freeze({
  "adam-smasher":["https://imgix.ranker.com/user_node_img/4371/87408883/original/87408883-photo-u1527402880?auto=format&fit=crop&fm=pjpg&q=78&w=650","https://www.ranker.com/list/best-cyberpunk-edgerunners-characters/jay_kobayashi","Imagem de Edgerunners / divulgação editorial"],
  "cdz-antigos-krest":["https://www.saintseiyapedia.com/ssp_media/images/thumb/8/80/Krest_face_01.jpg/200px-Krest_face_01.jpg","https://saintseiyapedia.com/wiki/Krest_du_Verseau","Referência de personagem · SaintSeiyaPedia"],
  "cdz-antigos-sage":["https://www.saintseiyapedia.com/ssp_media/images/thumb/f/ff/Sage_face.jpg/200px-Sage_face.jpg","https://saintseiyapedia.com/wiki/Sage_du_Cancer","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-aiolia":["https://www.saintseiyapedia.com/ssp_media/images/thumb/c/ca/Aiolia_face.jpg/200px-Aiolia_face.jpg","https://saintseiyapedia.com/wiki/Aiolia_du_Lion","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-aiolos":["https://www.saintseiyapedia.com/ssp_media/images/thumb/1/19/Aiolos_face.jpg/200px-Aiolos_face.jpg","https://saintseiyapedia.com/wiki/Aiolos_du_Sagittaire","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-aldebaran":["https://www.saintseiyapedia.com/ssp_media/images/thumb/6/6a/Aldebaran_face.jpg/200px-Aldebaran_face.jpg","https://saintseiyapedia.com/wiki/Ald%C3%A9baran_du_Taureau","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-aphrodite":["https://www.saintseiyapedia.com/ssp_media/images/thumb/c/c2/Aphrodite_face.jpg/200px-Aphrodite_face.jpg","https://saintseiyapedia.com/wiki/Aphrodite_des_Poissons","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-camus":["https://www.saintseiyapedia.com/ssp_media/images/thumb/4/41/Camus_face.jpg/200px-Camus_face.jpg","https://saintseiyapedia.com/wiki/Camus_du_Verseau","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-deathmask":["https://www.saintseiyapedia.com/ssp_media/images/thumb/6/68/Deathmask_face.jpg/200px-Deathmask_face.jpg","https://saintseiyapedia.com/wiki/Deathmask_du_Cancer","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-kanon":["https://www.saintseiyapedia.com/ssp_media/images/thumb/f/f8/Kanon_face.jpg/200px-Kanon_face.jpg","https://saintseiyapedia.com/wiki/Kanon_des_G%C3%A9meaux","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-milo":["https://www.saintseiyapedia.com/ssp_media/images/thumb/f/f5/Milo_face.jpg/200px-Milo_face.jpg","https://saintseiyapedia.com/wiki/Milo_du_Scorpion","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-mu":["https://www.saintseiyapedia.com/ssp_media/images/thumb/1/1b/Mu_face.jpg/200px-Mu_face.jpg","https://saintseiyapedia.com/wiki/M%C5%AB_du_B%C3%A9lier","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-saga":["https://www.saintseiyapedia.com/ssp_media/images/thumb/9/99/Saga_face.jpg/200px-Saga_face.jpg","https://saintseiyapedia.com/wiki/Saga_des_G%C3%A9meaux","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-shaka":["https://www.saintseiyapedia.com/ssp_media/images/thumb/b/b9/Shaka_face.jpg/200px-Shaka_face.jpg","https://saintseiyapedia.com/wiki/Shaka_de_la_Vierge","Referência de personagem · SaintSeiyaPedia"],
  "cdz-classico-shura":["https://www.saintseiyapedia.com/ssp_media/images/thumb/e/ea/Shura_face.jpg/200px-Shura_face.jpg","https://saintseiyapedia.com/wiki/Shura_du_Capricorne","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-abel":["https://www.saintseiyapedia.com/ssp_media/images/thumb/6/68/AbelND_face.jpg/200px-AbelND_face.jpg","https://saintseiyapedia.com/wiki/Abel_des_G%C3%A9meaux","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-cain":["https://www.saintseiyapedia.com/ssp_media/images/thumb/8/89/Cain_face.jpg/200px-Cain_face.jpg","https://saintseiyapedia.com/wiki/Cain_des_G%C3%A9meaux","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-deathtoll":["https://www.saintseiyapedia.com/ssp_media/images/thumb/f/fb/Deathtoll_face.jpg/200px-Deathtoll_face.jpg","https://saintseiyapedia.com/wiki/Deathtoll_du_Cancer","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-dohko":["https://www.saintseiyapedia.com/ssp_media/images/thumb/a/a5/Doko_%28ND%29_face.jpg/200px-Doko_%28ND%29_face.jpg","https://saintseiyapedia.com/wiki/D%C5%8Dko_(ND)","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-izo":["https://www.saintseiyapedia.com/ssp_media/images/thumb/8/85/Izo_face.jpg/200px-Izo_face.jpg","https://saintseiyapedia.com/wiki/Iz%C5%8D_du_Capricorne","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-kaiser":["https://www.saintseiyapedia.com/ssp_media/images/thumb/7/7c/Kaiser_face.jpg/200px-Kaiser_face.jpg","https://saintseiyapedia.com/wiki/Kaiser_du_Lion","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-odysseus":["https://www.saintseiyapedia.com/ssp_media/images/8/86/Odysseus_ND_face.jpg","https://saintseiyapedia.com/wiki/Odysseus_d%27Ophiuchus","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-ox":["https://www.saintseiyapedia.com/ssp_media/images/thumb/e/ea/Ox_face.jpg/200px-Ox_face.jpg","https://saintseiyapedia.com/wiki/Ox_du_Taureau","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-shijima":["https://www.saintseiyapedia.com/ssp_media/images/thumb/5/5b/Shijima_face.jpg/200px-Shijima_face.jpg","https://saintseiyapedia.com/wiki/Shijima_de_la_Vierge","Referência de personagem · SaintSeiyaPedia"],
  "cdz-nd-shion":["https://www.saintseiyapedia.com/ssp_media/images/thumb/a/a9/Shion_%28ND%29_face.jpg/200px-Shion_%28ND%29_face.jpg","https://saintseiyapedia.com/wiki/Shion_(ND)","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-albafica":["https://www.saintseiyapedia.com/ssp_media/images/thumb/d/d5/Albafika_face.jpg/200px-Albafika_face.jpg","https://saintseiyapedia.com/wiki/Albafica_des_Poissons","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-asmita":["https://www.saintseiyapedia.com/ssp_media/images/thumb/b/bb/Asmita_face.jpg/200px-Asmita_face.jpg","https://saintseiyapedia.com/wiki/Asmita_de_la_Vierge","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-aspros":["https://www.saintseiyapedia.com/ssp_media/images/thumb/8/89/Aspros_face.jpg/200px-Aspros_face.jpg","https://saintseiyapedia.com/wiki/Aspros_des_G%C3%A9meaux","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-degel":["https://www.saintseiyapedia.com/ssp_media/images/thumb/6/60/Degel_face.jpg/200px-Degel_face.jpg","https://saintseiyapedia.com/wiki/D%C3%A9gel_du_Verseau","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-deuteros":["https://www.saintseiyapedia.com/ssp_media/images/thumb/b/b8/Deuteros_face.jpg/200px-Deuteros_face.jpg","https://saintseiyapedia.com/wiki/Deuteros_des_G%C3%A9meaux","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-dohko":["https://www.saintseiyapedia.com/ssp_media/images/thumb/3/3d/Doko_%28TLC%29_face.jpg/200px-Doko_%28TLC%29_face.jpg","https://saintseiyapedia.com/wiki/D%C5%8Dko_(TLC)","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-el-cid":["https://www.saintseiyapedia.com/ssp_media/images/thumb/b/b5/El_Cid_face.jpg/200px-El_Cid_face.jpg","https://saintseiyapedia.com/wiki/El_Cid_du_Capricorne","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-ilias":["https://www.saintseiyapedia.com/ssp_media/images/thumb/7/77/Ilias_face.jpg/200px-Ilias_face.jpg","https://saintseiyapedia.com/wiki/Ilias_du_Lion","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-kardia":["https://www.saintseiyapedia.com/ssp_media/images/thumb/c/c4/Cardia_face.jpg/200px-Cardia_face.jpg","https://saintseiyapedia.com/wiki/Cardia_du_Scorpion","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-lugonis":["https://www.saintseiyapedia.com/ssp_media/images/9/91/Lugonis_face.jpg","https://saintseiyapedia.com/wiki/Lugonis_des_Poissons","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-manigoldo":["https://www.saintseiyapedia.com/ssp_media/images/thumb/3/36/Manigoldo_face.jpg/200px-Manigoldo_face.jpg","https://saintseiyapedia.com/wiki/Manigoldo_du_Cancer","Referência de personagem · SaintSeiyaPedia"],
  "cdz-tlc-sisifo":["https://www.saintseiyapedia.com/ssp_media/images/thumb/c/c4/Sisyphe_face.jpg/200px-Sisyphe_face.jpg","https://saintseiyapedia.com/wiki/Sisyphe_du_Sagittaire","Referência de personagem · SaintSeiyaPedia"],
  "lucy":["https://www.famitsu.com/images/000/274/023/z_630ec84fd5b68.jpg","https://www.famitsu.com/news/202208/31274023.html","CD PROJEKT RED / TRIGGER, divulgação em Famitsu"],
  "md-n":["https://thecodex.wiki/images/thumb/1/18/NDisassemblyDrone.png/1200px-NDisassemblyDrone.png","https://thecodex.wiki/Murder_Drones/Serial_Designation_N","GLITCH Productions, referência The Codex"],
  "md-uzi":["https://static.wixstatic.com/media/1d8dbc_e85eee4ec851412ea1576799873b0794~mv2.webp","https://www.glitchprod.com/murder-drones","GLITCH Productions"],
  "roman":["https://www.cyberpunk.net/build/images/edgerunners2/characters/roman-7104f5a9.png","https://www.cyberpunk.net/pt-br/edgerunners2","CD PROJEKT RED / TRIGGER"],
  "senshi":["https://static.zerochan.net/Senshi.%28Dungeon.Meshi%29.1024.4276610.webp","https://www.zerochan.net/4276610","Hypergryph / colaboração Arknights × Dungeon Meshi"],
  "talia":["https://www.cyberpunk.net/build/images/edgerunners2/characters/talia-f6ecd1a0.png","https://www.cyberpunk.net/pt-br/edgerunners2","CD PROJEKT RED / TRIGGER"],
  "vegeta--daima":["https://en.dragon-ball-official.com/dragonball/jp/news/2025/05/u250522993-4.jpg","https://en.dragon-ball-official.com/news/01_3449.html","BANDAI NAMCO / Xenoverse 2"],
  "weak":["https://www.cyberpunk.net/build/images/edgerunners2/characters/weak-d06b35b1.png","https://www.cyberpunk.net/pt-br/edgerunners2","CD PROJEKT RED / TRIGGER"],
});


/* cosmos-data.js */
/* Fase IX. Referências das séries e escopo editorial em docs/fase-ix-cosmos.md. */
(()=>{
 "use strict";
 const rules=window.T20_RULES;
 const gold="Os Cavaleiros do Zodíaco";
 const classic="https://www.saintseiya-gold.com/en/character.html";
 const wiki="https://saintseiyapedia.com/wiki/Gold_Saint";
 const omega="https://www.toei-anim.co.jp/tv/seiya/character.html";
 const g="https://www.saintseiyapedia.com/wiki/Saint_Seiya_Episode.G";
 const nd="https://arc.akitashoten.co.jp/comics/seinntoseiya/16";
 const lost="https://bonutzuu.wordpress.com/2020/06/26/list-of-gold-saints-in-saint-seiya-the-lost-canvas-meiou-shinwa-from-gaidens-encyclopedia-of-saints/";
 const dw="https://saintseiyapedia.com/wiki/Gold_Saint#Dark_Wing";
 const movie="https://www.crunchyroll.com/id/news/latest/2014/3/4/11-gold-saints-cast-for-saint-seiya-2014-cg-film-announced";
 const eras={
  classico:["Clássico",classic,"#e4bd65"],
  nd:["Next Dimension · Século XVIII",nd,"#e1cd81"],
  mitico:["Next Dimension · Era Mitológica",nd,"#b2ddbe"],
  tlc:["The Lost Canvas · Século XVIII",wiki,"#ddb074"],
  antigos:["The Lost Canvas · Séculos XIII–XV",lost,"#cdb098"],
  futuro:["The Lost Canvas · Futuro alternativo",wiki,"#c8cbeb"],
  omega:["Saint Seiya Ω",omega,"#f6c17c"],
  dark:["Dark Wing",dw,"#bd9be3"],
  ga:["Episódio G Assassin",g,"#b8d2e7"]
 };
 const classes={guarda:"Guerreiro",escudo:"Guerreiro",lancas:"Guerreiro",quebra:"Guerreiro",lamina:"Guerreiro",arco:"Guerreiro",
  punhos:"Lutador",pressao:"Lutador",muralha:"Lutador",arrancada:"Lutador",rua:"Ladino",cronista:"Ladino",invasao:"Ladino",
  barreira:"Arcanista",esfera:"Arcanista",gelo:"Arcanista",mente:"Arcanista",ilusao:"Arcanista",tumulo:"Arcanista",botica:"Arcanista",artificio:"Arcanista",ossos:"Arcanista"};
 const raceReasons={
  humano:"Humano preserva a origem do personagem. Os três bônus são dirigidos aos atributos da build e Versátil fecha treinos complementares.",
  minotauro:"O Minotauro representa a força de investida e o corpo resistente. Couro Rígido dá Defesa e os chifres são opcionais.",
  "moreau-leao":"A Herança do Leão converte a presença felina em rugido, boa mobilidade e força. A origem canônica e a linhagem de Arton são distintas.",
  elfo:"O Elfo dá Inteligência, mobilidade e PM para repetir técnicas de Cosmo, ao preço de Constituição menor.",
  aggelus:"A herança Aggelus representa o Cosmo luminoso. Luz e traços raciais servem de apoio à classe.",
  sulfure:"O Sulfure transforma aura sombria em Escuridão racial e melhora mobilidade e manipulação.",
  dahllan:"A Dahllan oferece ligação mecânica com plantas e uma proteção ativável, clara base para técnicas vegetais.",
  "qareen-agua":"O Qareen da Água mantém o tema glacial com RD a frio e Névoa racial. As rajadas geladas vêm do repertório arcano.",
  "qareen-ar":"O Qareen do Ar combina resistência elétrica, uma descarga de toque e bons atributos para o repertório arcano.",
  "qareen-terra":"O Qareen da Terra combina proteção e cura real pela Tatuagem Mística. A ficha escolhe Curar Ferimentos para apoio.",
  "qareen-fogo":"O Qareen do Fogo oferece resistência ao fogo e uma magia ofensiva racial. Técnicas maiores são adquiridas pela classe.",
  lefou:"O Lefou dá estrutura a uma força que cobra preço no corpo. A deformidade é uma tradução para Arton do visual e das capacidades.",
  anao:"O Anão mantém a estatura e a resistência do personagem. Duro como Pedra aumenta os PV e as tradições favorecem ferramentas de combate.",
  kliren:"O Kliren justifica técnica e improviso com Ofício e Engenhosidade, tendo a vulnerabilidade a impacto como contrapeso.",
  goblin:"O Goblin combina estatura pequena, Destreza e escalada. Ofícios e fuga continuam sujeitos a testes.",
  hynne:"O Hynne oferece estatura pequena, boa Destreza e uma defesa reativa pela Sorte Salvadora.",
  osteon:"Osteon é a raça esquelética do Jogo do Ano. A build aproveita resistência e mobilidade, com as limitações de cura de um morto-vivo.",
  "golem-ferro-grande":"O chassi de ferro Grande e a fonte de vapor traduzem o corpo blindado e o armamento pesado. O propulsor tem limite e custo de regra.",
  "golem-bronze-v":"Chassi de bronze com FOR e DES favorece investidas e manobras rápidas. A fonte alquímica modela a recarga com consumíveis.",
  "golem-bronze-n":"Chassi de bronze com FOR e CON mantém o drone resistente e móvel. A arma e o escudo representam ferramentas instaladas.",
  "golem-bronze-uzi":"Chassi de bronze Pequeno encaixa no drone operário. INT sustenta o Solver; a fonte de energia não concede o efeito de uma magia grátis.",
  "golem-espelhos":"O Golem de Espelhos traduz a natureza de IA e a imitação de habilidades. O grimório representa as rotinas que Caine consegue conjurar."
 };
 const styles={
  guerreiro:["leitura do alvo","manobra de precisão","romper a defesa","finalização controlada"],
  lutador:["entrar na guarda","controle de alcance","pressão do Cosmo","golpe de clímax"],
  ladino:["reconhecimento","entrada e saída","janela de exploração","cobertura e extração"],
  arcanista:["preparação da técnica","controle do espaço","defesa reativa","combinação arcana"]
 };
 const zodiac={"Áries":"♈","Touro":"♉","Gêmeos":"♊","Câncer":"♋","Leão":"♌","Virgem":"♍",
  "Libra":"♎","Escorpião":"♏","Sagitário":"♐","Capricórnio":"♑","Aquário":"♒","Peixes":"♓","Ofiúco":"⛎"};
 const seeds=[],forms=[];
 function seed(spec){
  const className=classes[spec.build];
  const race=rules.races[spec.raceId].name;
  const identity=spec.identity||spec.signature.toUpperCase();
  const [image,imageSource,imageCredit]=window.T20_COSMOS_PORTRAITS?.[spec.id]||[];
  return {color:"#a8c2d9",...spec,image,imageSource,imageCredit,className,race,identity,raceReason:spec.raceReason||raceReasons[spec.raceId],
   styles:styles[className.toLowerCase()],concept:spec.concept||spec.tactic,weapon:spec.signature,
   bookPage:{Guerreiro:"64–67",Lutador:"75–77",Ladino:"72–74",Arcanista:"36–42"}[className]};
 }
 function saint(era,row){
  const [slug,name,sign,build,raceId,signature,canon,tactic,aliases="",override]=row;
  const [arc,link,color]=eras[era];
  const id="cdz-"+era+"-"+slug;
  const s=seed({id,name:name+" de "+sign,universe:gold+" — "+arc,group:"cdz",arc,color,posterMark:zodiac[sign],
   source:override||link,build,raceId,signature,canon,tactic,aliases:[aliases,sign,"Saint Seiya Gold Saint Cavaleiro de Ouro Cavaleiros de Ouro Cavaleiros dos Zodíacos"].join(" "),
   concept:"Casa de "+sign+". "+tactic});
  seeds.push(s);
  return s;
 }
 const classicRows=[
  ["mu","Mu","Áries","barreira","elfo","Muralha de Cristal","Discípulo de Shion, Mu repara Armaduras e combate com psicocinese.","Prepare Armadura Arcana, use Campo de Força para se proteger e desloque ameaças com Telecinesia.","Mū Mu de Aries"],
  ["aldebaran","Aldebaran","Touro","muralha","minotauro","Grande Chifre","O Cavaleiro brasileiro de Touro combate com força concentrada e protege a passagem adiante.","Firme a linha, agarre ou derrube um inimigo e converta a abertura em um golpe de Briga.","Aldebarã"],
  ["saga","Saga","Gêmeos","esfera","sulfure","Explosão Galáctica","Saga combina o poder das técnicas dimensionais com uma luta interna por controle.","Abra com projéteis de essência. Use Salto Dimensional para evadir e Relâmpago em linha quando conseguir separar os aliados."],
  ["deathmask","Máscara da Morte","Câncer","tumulo","sulfure","Ondas do Inferno","O guardião de Câncer usa o poder de Praesepe para confrontar as almas dos adversários.","Amedronte alvos vulneráveis e combine Amarras Etéreas com dano de trevas. Mantenha a saída para a retaguarda.","Deathmask Máscara Mortal"],
  ["aiolia","Aiolia","Leão","pressao","moreau-leao","Relâmpago de Plasma","O irmão de Aiolos é conhecido pela pressão de seus golpes e pelo Plasma Relâmpago.","Use Voadora na entrada e Trocação quando acertar. O Rugido se resolve antes pela ação e custo raciais.","Aioria"],
  ["shaka","Shaka","Virgem","mente","aggelus","Tesouro do Céu","Shaka eleva seu Cosmo ao restringir os próprios sentidos e ataca os sentidos dos rivais.","Exija Vontade com Adaga Mental e Hipnotismo. Reserve Imobilizar para um alvo prioritário e use Campo de Força para sobreviver ao foco."],
  ["dohko","Dohko","Libra","lancas","humano","Cólera dos Cem Dragões","Sobrevivente da Guerra Santa anterior, Dohko orienta Shiryu e guarda o arsenal de Libra.","Controle a passagem com alabarda. Ataque Reflexo pune a abertura e o Golpe Pessoal usa a arma escolhida.","Dōko Mestre Ancião"],
  ["milo","Milo","Escorpião","lamina","sulfure","Agulha Escarlate","A técnica de Milo escala em golpes sucessivos e tem Antares como culminação.","Florete leve de precisão, Acuidade e Golpe Pessoal Letal representam as agulhas. Use Ataque Extra para pressão controlada.","Miro Antares"],
  ["aiolos","Aiolos","Sagitário","arco","aggelus","Flecha de Sagitário","Salvou a pequena Atena e deixou a Armadura de Sagitário como legado.","Cubra aliados com Disparo Preciso e reserve Ataque Especial para as flechas decisivas.","Aioros"],
  ["shura","Shura","Capricórnio","lamina","humano","Excalibur","A técnica de Shura transforma os membros em uma lâmina de Cosmo capaz de cortar o que toca.","Use uma florete como estatísticas de Excalibur. Some Esgrimista ao dano e marque a finalização pelo Golpe Pessoal."],
  ["camus","Camus","Aquário","gelo","qareen-agua","Execução Aurora","Camus ensina o gelo a Hyoga e luta com técnicas que criam e manipulam frio extremo.","Use Névoa para negar linhas de visão e Sopro das Uivantes para punir grupos sem aliados no cone."],
  ["aphrodite","Afrodite","Peixes","tumulo","dahllan","Rosas Diabólicas Reais","Cultiva rosas para controlar a passagem e debilitar rivais.","Controle terreno com a magia racial e use Raio do Enfraquecimento como rosa tóxica. Reserve Toque Vampírico para contragolpes de curto alcance.","Aphrodite"],
  ["kanon","Kanon","Gêmeos","esfera","sulfure","Triângulo Dourado","Depois de agir como Dragão Marinho, Kanon assume Gêmeos na Guerra Santa de Hades.","Amarras e Salto Dimensional representam a distorção do campo; gaste suas maiores rajadas com o alvo isolado.","Kanon Dragão Marinho",wiki]
 ];
 classicRows.forEach(row=>saint("classico",row));

 const dimensionRows=[
  ["shion","Shion","Áries","barreira","elfo","Revolução Estelar","Shion e Dohko são promovidos no início da Guerra Santa do século XVIII. Shion depois se torna Grande Mestre.","Escolha Abjuração e prepare barreiras antes do confronto. Use Seta de Talude como estilhaços controlados.","Sion Grande Mestre"],
  ["ox","Ox","Touro","muralha","minotauro","Grande Chifre","Ox é um guardião de Touro da geração de Shion e Dohko.","Mantenha a frente imóvel. Use a sobrevivência de Casca Grossa para abrir espaço e derrube o primeiro adversário que passar."],
  ["cain","Cain","Gêmeos","barreira","elfo","Outra Dimensão","Cain é uma das identidades ligadas à Armadura de Gêmeos no século XVIII.","Troque de ângulo com Salto Dimensional e bloqueie perseguidores com Amarras Etéreas.","Caim"],
  ["abel","Abel","Gêmeos","esfera","sulfure","Explosão Galáctica","Abel é a identidade hostil que disputa a presença de Gêmeos com Cain.","Aproveite o mesmo Cosmo de Gêmeos para ofensiva: separe alvos com Teia e alinhe Relâmpago."],
  ["deathtoll","Deathtoll","Câncer","tumulo","sulfure","Caixão Omertà","Emprega caixões e técnicas de Câncer ligadas ao mundo dos mortos.","Imobilize com Amarras Etéreas, escolha o alvo que ameaça a retaguarda e assombre-o com trevas.","Death Toll"],
  ["kaiser","Kaiser","Leão","pressao","moreau-leao","Presas de Leão","Guardião da casa de Leão, convive com seus leões Goldie e Blondie.","Faça rugir primeiro para pressionar e gaste Trocação apenas depois de conectar o golpe. Os mascotes são aliados narrativos."],
  ["shijima","Shijima","Virgem","mente","aggelus","Quatro Portas de Buda","Guardião de Virgem que usa o silêncio e cria provações sensoriais.","Adaga Mental e Sono são o primeiro teste. Em níveis altos, use Imobilizar e Miragem para canalizar a travessia."],
  ["dohko","Dohko","Libra","punhos","humano","Dragão Ascendente","Dohko ainda jovem participa da nova Guerra Santa depois da promoção a Cavaleiro de Ouro.","Combata desarmado e guarde a armadura e suas armas como recursos de equipamento separados do ataque de Briga.","Dōko jovem"],
  ["ecarlate","Écarlate","Escorpião","lamina","sulfure","Agulha Escarlate","O Escorpião de Next Dimension manifesta uma transparência peculiar ligada à história com Odysseus.","Em vez de sumir do tabuleiro, procure cobertura e use Acuidade com Arma para perfurações precisas.","Ecarlate Scarlet"],
  ["gestalt","Gestalt","Sagitário","arco","humano","Flecha da Deusa","A imagem de centauro de Gestalt está ligada à intervenção de Odysseus e ao cavalo de sua infância.","Trate o aspecto centauro como parte visual e mantenha as regras de arqueiro. Disparo Preciso permite atirar entre os combatentes."],
  ["izo","Izō","Capricórnio","lamina","humano","Excalibur de Izō","Guerreiro de postura samurai, Izō empunha sua técnica cortante como legado da casa.","Florete representa o corte veloz. Especialização melhora o dano e Ataque Reflexo vigia a circulação.","Izo"],
  ["mystoria","Mystoria","Aquário","gelo","qareen-agua","Pó de Diamante","Mystoria confronta Hyoga com o gelo de Aquário.","Entre com Seta de Talude como cristais e prepare Sopro das Uivantes quando o círculo estiver liberado."],
  ["cardinale","Cardinale","Peixes","tumulo","dahllan","Rosa Sangrenta","Cardinale usa rosas letais e confronta Shijima no século XVIII.","Prenda a passagem com plantas, enfraqueça o alvo e aplique Toque Vampírico como a rosa sugadora."],
  ["odysseus","Odysseus","Ofiúco","botica","qareen-terra","Médico do Santuário","O médico Odysseus retorna como o Cavaleiro de Ouro de Ofiúco na Guerra Santa do século XVIII.","Proteja o corredor com abjurações. Use Curar Ferimentos da tatuagem quando um aliado precisar de cura real.","Odisseu Serpentário Ophiuchus"]
 ];
 dimensionRows.forEach(row=>saint("nd",row));
 saint("mitico",["asclepio","Asclépio","Ofiúco","mente","qareen-terra","Vontade de Ofiúco","O antigo Cavaleiro de Ouro retorna ao possuir o corpo de Odysseus.","Priorize controle mental testável e cura racial pontual. A posse é parte da história e usa o próprio personagem em T20.","Asclepius Asclepios Esculápio Serpentário"]);

 const canvasRows=[
  ["shion","Shion","Áries","barreira","elfo","Muralha de Cristal","O jovem Shion da história de Shiori Teshirogi é aluno de Hakurei e herda o dever de manter o Santuário.","Monte defesa reativa com Campo de Força e abra caminhos com Telecinesia.","Sion"],
  ["hasgard","Hasgard","Touro","muralha","minotauro","Titan Nova","Hasgard assume o nome Aldebaran e treina jovens como Teneo.","Guarde seus PV altos para proteger a dupla da frente. Rasteira e Lutador de Chão seguram inimigos antes da Trocação.","Rasgado Aldebaran"],
  ["aspros","Aspros","Gêmeos","esfera","elfo","Outra Dimensão","Aspros domina técnicas dimensionais e é o irmão de Deuteros.","Escolha Salto Dimensional para alcançar o ângulo do disparo e mantenha campo de força para quando o inimigo encurtar."],
  ["deuteros","Deuteros","Gêmeos","esfera","qareen-fogo","Erupção Negra","Deuteros treina isolado na Ilha Kanon, em ambiente vulcânico, antes de assumir Gêmeos.","Use fogo racial no alcance curto. Depois de conjurar, troque de posição para explorar o alcance do Raio Poderoso.","Defteros"],
  ["manigoldo","Manigoldo","Câncer","tumulo","sulfure","Chamas Demoníacas","Discípulo de Sage, Manigoldo luta contra entidades espirituais com técnicas de Câncer.","Mantenha alvo preso com Amarras. Use a vertente de trevas para concentrar o dano em vez de depender de expulsões de alma automáticas."],
  ["regulus","Regulus","Leão","pressao","moreau-leao","Pressão de Plasma","O prodígio de Leão analisa movimentos após observá-los.","Até Acertar transforma leitura em perseguição calculada. Use golpes serializados só quando o primeiro acerto confirmar a abertura.","Régulus"],
  ["ilias","Ilias","Leão","punhos","moreau-leao","Instinto do Leão","Ilias é pai de Regulus e Cavaleiro de Leão anterior à guerra principal.","Encurte o combate com pressão de punhos apoiada no Rugido Imponente. Defenda a retaguarda antes de perseguir.","Ílias"],
  ["asmita","Asmita","Virgem","mente","aggelus","Tesouro do Céu","Asmita liga seu Cosmo à criação do rosário que contém as almas dos espectros.","Use magias de Vontade e distribua seu espaço de conjuração pelo campo; cada contenção usa a duração legal."],
  ["dohko","Dohko","Libra","punhos","humano","Cólera dos Cem Dragões","Na cronologia de Lost Canvas, Dohko luta ao lado de Tenma e sobrevive à guerra.","Golpe Relâmpago e Trocação representam a sequência de dragões. Escolha a abertura antes de gastar PM.","Dōko"],
  ["kardia","Kardia","Escorpião","lamina","sulfure","Katakeo de Antares","Kardia é conhecido por sua condição cardíaca e por concentrar calor na técnica de Antares.","Ataque com florete e Golpe Pessoal. A build favorece dano veloz e a decisão arriscada de encurtar o combate.","Cardia Katakaio"],
  ["sisifo","Sísifo","Sagitário","arco","aggelus","Flecha da Esperança","Sísifo reconhece Sasha e age como um líder entre os Cavaleiros de Ouro.","Priorize tiros que salvam a frente, com Disparo Preciso. Use Arqueiro e sua SAB para fortalecer a arma.","Sisyphos Sisifus Sisyphus"],
  ["el-cid","El Cid","Capricórnio","lamina","humano","Excalibur","El Cid afia o próprio Cosmo até transformá-lo em corte preciso; combate no domínio dos sonhos.","Abra com ataques de baixo custo por Acuidade e finalize o inimigo no alcance usando Golpe Pessoal."],
  ["degel","Dégel","Aquário","gelo","qareen-agua","Esquife de Gelo","Aluno de Krest, Dégel trata o gelo como ciência e contenção.","Modele o esquife com Amarras Etéreas e o frio com Sopro das Uivantes. Não converta contenção em morte automática."],
  ["albafica","Albafica","Peixes","tumulo","dahllan","Rosa Sangrenta","Albafica cultiva rosas venenosas e leva o próprio sangue tóxico ao combate.","Bloqueie entradas com plantas. Concentre a técnica com Toque Vampírico e controle os aliados no mapa."],
  ["teneo","Teneo","Touro","quebra","minotauro","Legado de Hasgard","Aluno de Hasgard, torna-se o sucessor de Touro depois da Guerra Santa.","Use marreta de duas mãos para pancadas comprometidas. Durão ajuda quando Teneo se expõe para proteger um companheiro.","Teneo Aldebaran"],
  ["zaphiri","Zaphiri","Escorpião","lamina","sulfure","Guardião de Escorpião","Antecessor de Kardia, Zaphiri aparece em uma história ligada ao poder de Poseidon.","Acuidade e Golpe de Raspão apoiam uma esgrima que desgasta sem exigir magia exclusiva."],
  ["lugonis","Lugonis","Peixes","tumulo","dahllan","Sangue de Rosas","Antecessor e mestre de Albafica, ligado às rosas tóxicas da tradição de Peixes.","Use a progressão de trevas para representar toxina e sangue. A magia racial segura a área de aproximação.","Rugonis"]
 ];
 canvasRows.forEach(row=>saint("tlc",row));

 const olderRows=[
  ["gateguard","Gateguard","Áries","esfera","elfo","Cosmo do Áries Anterior","Guardião de Áries na geração antiga, Gateguard entra em conflito com aliados do Santuário.","Use explosões de alcance e proteção de Abjuração quando precisar manter espaço."],
  ["francisca","Francisca","Touro","quebra","minotauro","Investida de Touro","Francisca é o Touro da geração anterior a Hasgard, presente nos gaidens.","Ache um corredor de investida e guarde resistência para receber a resposta. A marreta é o golpe de massa em Arton."],
  ["sage","Sage","Câncer","tumulo","sulfure","Selo de Câncer","Sage é titular de Câncer na guerra anterior, chega a Grande Mestre e treina Manigoldo.","Use proteção contra aproximação e controle o alvo por testes antes de lançar sua técnica de trevas."],
  ["itia","Itia","Libra","lancas","humano","Equilíbrio de Libra","Itia foi Cavaleiro de Libra antes de tornar-se Grande Mestre; sua história atravessa gerações.","Escolha uma arma longa para bloquear entrada e rotacione entre ataques, manobras e Durão.","Itea"],
  ["aeras","Aeras","Sagitário","arco","aggelus","Flecha da Guerra Antiga","Titular da geração antiga, Aeras figura nos relatos da Guerra Santa de Lost Canvas.","Posicione-se na segunda linha. Tire proveito de Arqueiro para dano sustentado antes de investir em Golpe Pessoal.","Aerus"],
  ["krest","Krest","Aquário","gelo","qareen-agua","Zero do Veterano","Krest, também grafado Krjest, atravessa várias eras e é mestre de Dégel.","Use Névoa como quebra de visão e Campo de Força para segurar o posto enquanto canaliza gelo.","Krjest Krést"],
  ["avenir","Avenir","Áries","barreira","elfo","Retorno de Áries","Um Cavaleiro de Áries vindo de um futuro devastado atua ao lado de Sage e Hakurei na guerra do século XV.","Trate viajar no tempo como contexto. Use Salto Dimensional para a sua mobilidade em jogo e prepare magias defensivas.","Avenir do futuro","https://www.saintseiyapedia.com/wiki/Avenir"]
 ];
 olderRows.forEach(row=>saint("antigos",row));
 const unnamed=[
  ["antigos","gemeos-xv","Sem nome · séc. XV","Gêmeos","esfera","elfo"],
  ["antigos","leao-xv","Sem nome · séc. XV","Leão","punhos","moreau-leao"],
  ["antigos","escorpiao-xv","Sem nome · séc. XV","Escorpião","lamina","sulfure"],
  ["antigos","peixes-xv","Sem nome · séc. XV","Peixes","tumulo","dahllan"],
  ["antigos","leao-xiii","Sem nome · séc. XIII","Leão","muralha","moreau-leao"],
  ["antigos","capricornio-xiii","Sem nome · séc. XIII","Capricórnio","lamina","humano"],
  ["futuro","libra","Sem nome · futuro","Libra","lancas","humano"],
  ["futuro","sagitario","Sem nome · futuro","Sagitário","arco","aggelus"]
 ];
 unnamed.forEach(([era,id,name,sign,build,race])=>saint(era,[id,"Cavaleiro "+name,sign,build,race,
  "Sentinela de "+sign,"A fonte identifica o posto ou a Armadura de "+sign+"; a identidade pessoal e o repertório não foram revelados.",
  "Esta build é uma proposta de mesa inspirada na tradição de "+sign+". Seu equipamento e seus poderes pertencem a Tormenta20.","Gold Saint anônimo sem nome",wiki]));

 const omegaRows=[
  ["kiki","Kiki","Áries","barreira","elfo","Reparo e Cristal","Kiki, antigo ajudante de Mu, assume Áries e repara Armaduras de seus aliados.","Apoie com Abjuração. Conserto usa Ofício (artesão); proteção em combate vem do repertório."],
  ["harbinger","Harbinger","Touro","muralha","minotauro","Grande Chifre","Harbinger aceita a armadura e valoriza confrontos que põem a força à prova.","Resista na passagem com Casca Grossa. Use Rasteira e pressione com Trocação quando o rival baixar a guarda."],
  ["paradox","Paradox","Gêmeos","ilusao","sulfure","Destino Cruzado","Paradox distorce a percepção e confronta os rivais com futuros possíveis.","Apresente alternativas por Criar Ilusão e avance para Miragem, mantendo os testes e limites da magia."],
  ["integra","Integra","Gêmeos","barreira","elfo","Outra Dimensão","Irmã de Paradox, Integra defende Atena usando técnicas de Gêmeos.","Retire aliados do foco por posicionamento, bloqueie rivais e alcance boa linha com Salto Dimensional."],
  ["schiller","Schiller","Câncer","tumulo","sulfure","Ondas do Mundo dos Mortos","O Cavaleiro de Câncer usa mortos e confronta Yuna em seu domínio.","Use medo, tenacidade e dano de trevas no ritmo legal de cada magia. Nenhuma técnica remove o jogador da mesa por decreto."],
  ["mycenae","Mycenae","Leão","pressao","moreau-leao","Presas do Rei","O Cavaleiro de Leão atua como mentor de Eden e defende seus próprios ideais.","Rugido breve, investida e Briga mantêm a identidade do Leão. Poupe PM para Punhos de Adamante.","Micenas Mykenae"],
  ["fudo","Fudō","Virgem","mente","aggelus","Julgamento de Virgem","O Virgem de Ômega usa técnicas ligadas a um protetor irado e provações do espírito.","Controle a próxima ação do oponente com magias de Vontade. Guarde a reação de Campo de Força para o turno exposto.","Fudo"],
  ["genbu","Genbu","Libra","lancas","humano","Defesa de Libra","Discípulo do Mestre Ancião, Genbu protege os Cavaleiros de Bronze e empunha armas de Libra.","Bloqueie corredores com arma longa e use Durão ao manter a passagem ocupada."],
  ["shiryu","Shiryu","Libra","lancas","humano","Dragão da Balança","Shiryu sucede Genbu no posto de Libra e leva o legado de Dohko à linha de frente.","Lute com arma longa e use os níveis altos para ataque de cobertura. A técnica do Dragão é representada pelo Golpe Pessoal.","Shiryū Shiryu Dragão"],
  ["sonia","Sonia","Escorpião","lamina","lefou","Tempestade Escarlate","Sonia, filha de Mars, ocupa a casa de Escorpião após atuar com o lado marciano.","Use Esgrimista para perfurar pontos frágeis e reserve Golpe Pessoal para a janela em que a defesa falhar.","Sônia"],
  ["seiya","Seiya","Sagitário","arco","aggelus","Flecha de Atena","O antigo Cavaleiro de Pégaso assume oficialmente Sagitário em Ômega.","Arco longo e Ataque Especial para acertar um alvo-chave. Disparo Preciso mantém a cobertura mesmo em combate misto.","Seya Pégaso Pegasus","https://www.toei-anim.co.jp/tv/seiya/character/seiya/index.html"],
  ["ionia","Ionia","Capricórnio","mente","qareen-terra","Dominação da Linguagem","Ionia usa palavras para comandar ações e tem ligação com a escola Palaestra.","Trate a linguagem como magias de Encantamento com Vontade e alvos válidos; a build se protege com abjurações."],
  ["tokisada","Tokisada","Aquário","artificio","elfo","Manipulação do Tempo","Tokisada usa técnicas ligadas ao tempo e ocupa Aquário antes de outro papel no arco de Pallas.","Use Velocidade, contenção e Salto Dimensional para simular tempo relativo com ações mensuráveis."],
  ["amor","Amor","Peixes","tumulo","sulfure","Aprisionamento de Trevas","Amor manipula trevas e encurrala oponentes com técnicas de Peixes.","Trave a rota inimiga com Amarras e concentre dano de trevas. Controle o gasto antes de sustentar efeitos simultâneos."]
 ];
 omegaRows.forEach(row=>saint("omega",row));

 const darkRows=[
  ["theseus","Theseus Gavras","Áries","barreira","elfo","Defesa de Áries","Theseus é o titular de Áries na continuidade de Dark Wing.","Use Abjuração para resistir e Telecinesia quando for preciso deslocar o problema.","Teseu Theseus"],
  ["ain","Ain","Touro","quebra","minotauro","Investida de Touro","O grupo de Ouro de Dark Wing tem Ain na casa de Touro.","Apoie a linha com marreta; ataque com força plena só depois de fixar o inimigo."],
  ["sojiro","Sōjirō Tokitō","Gêmeos","esfera","elfo","Frente Dimensional","Sōjirō, irmão de Shōichirō, ocupa a casa de Gêmeos de Dark Wing.","Corte a distância com uma técnica arcana e preserve PM para sair de emboscadas.","Sojiro Tokito Soujirou"],
  ["crematorio","Crematorio","Câncer","tumulo","sulfure","Guardião de Praesepe","Crematorio é o titular de Câncer em Dark Wing.","Use a escola de Necromancia para pressão de curto alcance sem avançar além da cobertura.","Crematório"],
  ["vasilios","Vasilios","Leão","pressao","moreau-leao","Pressão Felina","Vasilios ocupa a casa de Leão de Dark Wing.","Escolha uma investida curta e pressione com sequência de golpes. Rugido e Trocação custam PM separados."],
  ["renge","Renge","Virgem","mente","aggelus","Vigília de Virgem","Renge é a titular de Virgem na formação de Dark Wing.","Controle aproximação com Encantamento e guarde uma defesa para enfrentar inimigos resistentes à mente."],
  ["kogetsuki","Kōgetsuki","Libra","lancas","humano","Equilíbrio de Libra","Kōgetsuki ocupa o posto de Libra no elenco de Dark Wing.","Mantenha uma rota defensiva com arma alongada. Use Luta para manobras e libere espaço para aliados.","Kogetsuki Kougetsuki"],
  ["eulalia","Eulalia","Escorpião","lamina","sulfure","Agulha de Escorpião","Eulalia é a titular de Escorpião em Dark Wing.","Espere o avanço adversário para responder com Ataque Reflexo. A florete representa as perfurações.","Eulália"],
  ["aiolos","Aiolos","Sagitário","arco","aggelus","Flecha de Sagitário","A linha alternativa de Dark Wing identifica Aiolos como titular de Sagitário.","Aponte de uma posição elevada e só gaste Ataque Especial quando for preciso acertar uma flecha decisiva.","Aioros"],
  ["eito","Eito","Capricórnio","lamina","humano","Corte de Capricórnio","Eito porta Capricórnio no elenco de Dark Wing.","Use Acuidade, Esgrimista e um corte letal para manter a função de duelista; trabalhe sempre à distância real da arma."],
  ["tristan","Tristan","Aquário","gelo","qareen-agua","Frente Fria","Tristan ocupa Aquário em Dark Wing.","Crie névoa como cobertura antes de conjurar frio em cone. Nas etapas finais, use Magia Pungente contra pressão corpo a corpo.","Tristão"],
  ["alfreed","Alfreed","Peixes","tumulo","dahllan","Jardim de Peixes","Alfreed figura como titular de Peixes em Dark Wing. A ficha adota o motivo da casa para a adaptação de mesa.","Use plantas para controlar a retirada e um arcano de trevas para a segunda linha.","Afreed Alfrid"]
 ];
 darkRows.forEach(row=>saint("dark",row));

 const episodeRows=[
  ["ikki","Ikki","Leão","esfera","qareen-fogo","Fênix do Leão","Ikki assume Leão entre os sucessores dourados do Episódio G.","Use a resistência racial ao fogo para sustentar a linha de canalização. Explosão de Chamas e Raio Arcano fazem a vez das chamas da Fênix."],
  ["shun","Shun","Virgem","barreira","aggelus","Correntes de Proteção","Shun figura como sucessor de Virgem em G Assassin, com a proteção dos outros como motor do combate.","Amarras Etéreas representam a corrente. Monte defesa antes de prender o invasor e mantenha distância para reagir.","Shun Andrômeda"],
  ["hyoga","Hyoga","Aquário","gelo","qareen-agua","Execução Aurora","Hyoga passa a exercer a função de Aquário no futuro do Episódio G.","Combine o frio com imobilização e use Campo de Força contra ataque concentrado. Névoa ajuda a retirada.","Hyōga Cisne"],
  ["lancelot","Lancelot","Câncer","lamina","sulfure","Lâmina do Lost World","O Gladiador Lancelot junta-se aos Lost Saints como Cavaleiro de Câncer.","Use golpes de espada ágil, duelos e Escuridão racial para preparar o confronto. O submundo do Lost World informa a história."]
 ];
 episodeRows.forEach(row=>saint("ga",row));

 function form(parentId,key,label,revision){
  const parent=seeds.find(s=>s.id===parentId);
  if(!parent)throw Error("Forma sem dossiê principal: "+parentId);
  forms.push(seed({...parent,...revision,id:parentId+"--"+key,parentId,key,label,isAlt:true,
   name:parent.name+" — "+label}));
 }
 const variant=(parentId,key,label,arc,source,change={})=>{
  const parent=seeds.find(s=>s.id===parentId);
  form(parentId,key,label,{universe:gold+" — "+arc,arc,source,canon:parent.canon+" Nesta ficha, a adaptação segue "+arc+".",...change});
 };
 for(const row of classicRows.slice(0,12)){
  const id="cdz-classico-"+row[0];
  variant(id,"alma-de-ouro","Alma de Ouro","Soul of Gold",classic,{color:"#f4cc69",
   canon:row[6]+" Em Soul of Gold, desperta a forma divina da Armadura.",
   tactic:row[7]+" Trate a Armadura Divina como a representação visual de proteção e avance por equipamento e habilidades da build."});
  variant(id,"episodio-g","Episódio G","Episódio G",g,{color:"#efca80"});
  if(row[0]!=="dohko")variant(id,"lenda","Lenda do Santuário","A Lenda do Santuário",movie,row[0]==="milo"?
   {canon:"A releitura cinematográfica apresenta Milo como mulher no posto de Escorpião.",
    tactic:"Use uma duelista de ataques velozes. Acuidade e Esgrimista representam a técnica de agulhas desta versão."}:{});
 }
 for(const slug of ["mu","saga","deathmask","aiolia","milo","aphrodite","shaka","aldebaran"])
  variant("cdz-classico-"+slug,"saintia-sho","Saintia Shô","Saintia Shô","https://www.akitashoten.co.jp/series/3583");
 for(const slug of ["mu","shaka","dohko","aiolos","camus"])
  variant("cdz-classico-"+slug,"lost-world","Lost World","Episódio G Assassin · Lost World",g,{
   canon:"Esta contraparte integra a força dourada do Lost World, cuja história diverge da cronologia principal.",
   color:"#9e96c8"
  });
 variant("cdz-omega-kiki","assassin","G Assassin","Episódio G Assassin",g);
 variant("cdz-omega-shiryu","assassin","G Assassin","Episódio G Assassin",g);
 variant("cdz-omega-shiryu","requiem","G Requiem","Episódio G Requiem",g,{build:"punhos"});
 variant("cdz-omega-seiya","requiem","G Requiem","Episódio G Requiem",g,{build:"arco"});
 variant("cdz-classico-shura","assassin","G Assassin","Episódio G Assassin",g,{color:"#a0bddb"});
 variant("cdz-classico-shura","requiem","G Requiem","Episódio G Requiem",g);
 variant("cdz-ga-ikki","requiem","G Requiem","Episódio G Requiem",g,{build:"pressao"});
 variant("cdz-nd-shion","grande-mestre","Grande Mestre","Clássico · Grande Mestre",wiki,{build:"botica"});
 variant("cdz-classico-aiolos","time-odyssey","Time Odyssey","Time Odyssey","https://www.kana.fr/produit/saint-seiya-time-odyssey-t1/");
 const hades="https://lineup.toei-anim.co.jp/ja/ova/seiya_hades/";
 for(const [parent,title,sign] of [
  ["cdz-omega-seiya","Seiya","Sagitário"],["cdz-omega-shiryu","Shiryu","Libra"],["cdz-ga-ikki","Ikki","Leão"],
  ["cdz-ga-shun","Shun","Virgem"],["cdz-ga-hyoga","Hyoga","Aquário"]
 ])variant(parent,"armadura-classica","Armadura de Ouro · Clássico","Clássico · uso temporário",hades,{
  canon:title+" veste a Armadura de "+sign+" em combate na série clássica; o dossiê principal registra sua titularidade posterior em outra continuidade."
 });

 const cyber="https://www.cyberpunk.net/pt-br/edgerunners2";
 const glitch="https://www.glitchprod.com/murder-drones";
 const db="https://en.dragon-ball-official.com/";
 const extras=[
  {id:"senshi",name:"Senshi",universe:"Dungeon Meshi",group:"dungeon-meshi",arc:"Delicious in Dungeon",build:"guarda",raceId:"anao",origin:"guarda",signature:"Cozinheiro da Masmorra",
   canon:"Senshi é um anão, cozinheiro e aventureiro que prepara refeições com monstros da masmorra.",
   tactic:"Use machado e escudo na frente. Prepare pratos com Ofício (cozinheiro) e Gororoba na exploração e divida o estoque com a equipe.",
   item:"Machado de batalha. A panela reforçada é representada pelo escudo leve, comprado separadamente.",
   source:"https://deliciousindungeon.com/characters/senshi/",aliases:"Delicious in Dungeon Dungeon Food",color:"#b58e50"},
  {id:"lucy",name:"Lucy Kushinada",universe:"Cyberpunk: Edgerunners",group:"cyberpunk",arc:"Edgerunners",build:"invasao",raceId:"kliren",signature:"Trilha-rede da Lua",
   canon:"Lucy é uma netrunner que usa infiltração e o monofio no universo de Edgerunners.",
   tactic:"Mãos Rápidas e Ladinagem representam invasão de dispositivos acessíveis. Disfarce Ilusório, invisibilidade e Sussurros Insanos entram pelos círculos de Ventanista.",
   item:"Monofio representado por adaga no corpo a corpo, com regra integral da adaga.",
   source:"https://cyberpunk.fandom.com/wiki/Lucyna_Kushinada",aliases:"Lucy Kishinada Lucyna Kushinada netrunner",color:"#86dee1"},
  {id:"weak",name:"Kingsley Weakly",universe:"Cyberpunk: Edgerunners 2",group:"cyberpunk",arc:"Edgerunners 2",build:"guarda",raceId:"minotauro",signature:"O Rei Veterano",
   canon:"O veterano conhecido como Weak já teve o apelido King e carrega o peso da antiga glória.",
   tactic:"Conserve posição, antecipe a saída do alvo com Ataque Reflexo e use Durão para sobreviver ao revide.",
   source:cyber,aliases:"Weak King Kingsley",color:"#d5ac75"},
  {id:"adam-smasher",name:"Adam Smasher",universe:"Cyberpunk: Edgerunners / Cyberpunk 2077",group:"cyberpunk",arc:"Night City",build:"quebra",raceId:"golem-ferro-grande",signature:"Plataforma de Cerco",
   canon:"Smasher é um mercenário de corpo quase inteiramente mecanizado, associado à Arasaka.",
   tactic:"Pressione de perto com arma pesada e Ataque Especial. Use o cone de Vapor como alternativa tática quando puder pegar vários inimigos.",
   item:"Marreta apropriada ao tamanho Grande. O aspecto visual pode ser o de um braço mecânico.",
   source:"https://cyberpunk.fandom.com/wiki/Adam_Smasher",color:"#db685f"},
  {id:"talia",name:"Talia",universe:"Cyberpunk: Edgerunners 2",group:"cyberpunk",arc:"Edgerunners 2",build:"arrancada",raceId:"lefou",signature:"Cria da Maelstrom",
   canon:"Talia cresceu em ambiente corporativo e se endureceu em contato com a Maelstrom e sua fixação por implantes.",
   tactic:"Tome a iniciativa com Voadora ou Rasteira. Combine golpes de pressão sem gastar toda a mana antes de ter uma saída.",
   source:cyber,color:"#df776f"},
  {id:"roman",name:"Roman Carax",universe:"Cyberpunk: Edgerunners 2",group:"cyberpunk",arc:"Edgerunners 2",build:"cronista",raceId:"humano",signature:"Câmera de Night City",
   canon:"Roman é um cinéfilo que tenta registrar histórias reais num mundo dominado pela neurodança.",
   tactic:"Use Investigação, Percepção e Furtividade para observar. Evite abrir o combate e use Escapista para voltar com o registro.",
   item:"A câmera é um acessório de investigação. A besta leve é um recurso de defesa, com recarga normal.",
   source:cyber,color:"#efc186"},
  {id:"caine",name:"Caine",universe:"The Amazing Digital Circus",group:"digital-circus",arc:"Digital Circus",build:"ilusao",raceId:"golem-espelhos",purpose:"reflexos-combate",signature:"Mestre de Picadeiro",
   canon:"Caine é a IA que conduz o circo digital e impõe aventuras aos humanos presos ali.",
   tactic:"Plante ilusões no mapa, use magias de camuflagem e revele o cenário com Miragem. Espelhos imita uma habilidade com o custo racial em vez de reescrever o jogo.",
   source:"https://www.glitchprod.com/the-amazing-digital-circus",color:"#ee85a5"},
  {id:"md-v",name:"V",universe:"Murder Drones",group:"murder-drones",arc:"Disassembly Drones",build:"pressao",raceId:"golem-bronze-v",purpose:"reflexos-combate",signature:"Desmontagem Agressiva",
   canon:"V é um drone de desmonte que usa o próprio corpo armado em combate.",
   tactic:"Avance com Voadora e Trocação. A fonte alquímica é um recurso de recuperação de PM, e as asas no traje não mudam o deslocamento.",
   source:glitch,aliases:"Serial Designation V Drone V",color:"#f4ce6c"},
  {id:"md-n",name:"N",universe:"Murder Drones",group:"murder-drones",arc:"Disassembly Drones",build:"escudo",raceId:"golem-bronze-n",signature:"Desmontagem Protetora",
   canon:"N é um drone de desmonte amistoso que se alia a Uzi.",
   tactic:"Use escudo, bloqueie aproximação e acione Durão ao proteger a retirada. Estilo de Arma e Escudo e Solidez sustentam a frente.",
   source:glitch,aliases:"Serial Designation N Drone N",color:"#edd492"},
  {id:"md-uzi",name:"Uzi Doorman",universe:"Murder Drones",group:"murder-drones",arc:"Absolute Solver",build:"artificio",raceId:"golem-bronze-uzi",purpose:"reflexos-combate",signature:"Absolute Solver",
   canon:"Uzi começa como drone operária que constrói uma arma e manifesta poderes ligados ao Solver.",
   tactic:"O foco visual é a arma de Uzi. Comece com Seta de Talude e use Telecinesia no 9º nível de Arcanista para deslocar alvos e objetos.",
   source:glitch,aliases:"Uzi Solver Worker Drone",color:"#c59cf2"},
  {id:"vegeta",name:"Vegeta",universe:"Dragon Ball Z",group:"dragonball",arc:"Dragon Ball Z",build:"punhos",raceId:"moreau-leao",formKey:"z",label:"DBZ",signature:"Orgulho do Príncipe",
   canon:"O príncipe Saiyajin de Dragon Ball Z passa de invasor a rival e aliado dos defensores da Terra.",
   tactic:"Golpe Relâmpago e Trocação representam pressão física e explosões de ki no corpo a corpo. Use o Rugido como postura de desafio.",
   source:db,aliases:"DBZ GT Daima Super Saiyajin Majin Galick Gun Final Flash",color:"#8eb3fa"},
  {id:"sans",name:"Sans",universe:"Undertale",group:"undertale",arc:"Undertale",build:"ossos",raceId:"osteon",signature:"Encontro no Corredor",
   canon:"Sans é um esqueleto que usa ossos, atalhos e alterações de movimento no confronto de Undertale.",
   tactic:"Use Área Escorregadia para a primeira armadilha e Salto Dimensional para escapar. Telecinesia representa o deslocamento de alvos em níveis altos.",
   source:"https://undertale.wiki/w/Sans",aliases:"Sans the Skeleton Gaster Blaster",color:"#77bfeb"}
 ];
 seeds.push(...extras.map(seed));
 form("vegeta","gt","GT",{universe:"Dragon Ball GT",arc:"Dragon Ball GT",build:"pressao",arcaneLevels:6,color:"#f58c82",
  signature:"Final Shine",canon:"Em GT, Vegeta chega ao Super Saiyajin 4 com o auxílio das Ondas Blutz.",
  tactic:"Lutador 6 libera Trocação. Passe a Bruxo 6 para representar o Final Shine com Raio Arcano e rajadas à distância. A transformação é descrita sem ganhos extras."});
 form("vegeta","daima","Daima",{universe:"Dragon Ball Daima",arc:"Dragon Ball Daima",build:"arrancada",color:"#e6bc77",
  signature:"Vanguarda de Daima",canon:"Em Daima, Vegeta é revertido a uma aparência infantil e demonstra Super Saiyajin 3.",
  tactic:"Use investida, acrobacias e ataques desarmados em sequência. A aparência Mini é cosmética para a herança Moreau escolhida, conservando o tamanho da ficha."});
 form("vegeta","super","Super",{universe:"Dragon Ball Super",arc:"Dragon Ball Super",build:"muralha",arcaneLevels:4,color:"#b695f6",
  signature:"Pressão do Ultra Ego",canon:"Em Dragon Ball Super, Vegeta desenvolve o Super Saiyajin Blue e, no mangá, aprende o Ultra Ego.",
  tactic:"Lutador 8 dá resistência e permite Punhos de Adamante. Os quatro níveis de Bruxo trazem rajadas que representam destruição, com dano e resistência próprios."});

 window.T20_COSMOS_DATA={seeds,forms};
})();


/* wave7-runtime.js */
/* FASE VII — JoBros, The Boys, heróis e Servos, 12 níveis e formas Fate; fontes de
 * Jogo do Ano v1.3, Ameaças de Arton e Heróis de Arton v1.1.
 * Direitos de personagens, artes e regras reservados a seus titulares. */
(()=>{
 "use strict";
 const w=window,data=w.T20_DATA,guide=w.T20_GUIDE,rules=w.T20_RULES,cosmos=w.T20_COSMOS_BUILDS,
  extension=w.T20_COSMOS_DATA,
  opts=w.T20_CLASS_OPTIONS,seeds=[...(w.T20_WAVE7_SEEDS||[]),...(w.T20_WAVE7_FATE_SEEDS||[]),...(extension?.seeds||[])],base=w.T20_UMA;
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
 const allSeeds=[...seeds,...altSeeds,...(extension?.forms||[])];
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
  seed.levels=seed.build?Array(12).fill(seed.tactic):seed.levels?.length===12?seed.levels.map((step,n)=>
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
  const race=s.build?cosmos.raceFor(s):races[s.race],cl=classes[s.className],profile=s.build?cosmos.attributesFor(s):buy[s.profile];
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
  const big=htmlEscape(s.posterMark||s.name.split(/[ -]/).filter(Boolean).slice(0,2).map(x=>x.charAt(0)).join("").toUpperCase()||"◆");
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
   key:s.key||s.formKey||"principal",formLabel:s.label||"Principal"};
  if(s.build)cosmos.apply(c,s);
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
   const palettes={jojo:"manga",fate:"astral",hsr:"astral",cdz:"astral",cyberpunk:"machine","murder-drones":"machine","the-boys":"brutal",
    dmc:"brutal","one-punch-man":"heroic","blue-lock":"heroic","kamen-rider":"machine"};
   w.T20_VISUAL.profiles[c.id]=[c._crossover.styles[0].toUpperCase().slice(0,14),
    palettes[c.catalogCategory]==="fantasy"?"gothic":palettes[c.catalogCategory]||"manga",
    "prism","spine",seeds.find(s=>s.id===c.id).color,"#172331"];
   w.T20_VISUAL.finishes[c.id]=["fate","cdz"].includes(c.catalogCategory)?"gold":
    c.catalogCategory==="kamen-rider"?"circuitry":"ink";
  }
 }
 const variantMap={},dossierForms={};
 const variantParents=new Set((extension?.forms||[]).map(s=>s.parentId));
 for(const c of primary.filter(c=>c.catalogCategory==="fate"))variantMap[c.id]=[["principal",c._wave7.fateClass||"Base",c]];
 for(const c of primary.filter(c=>variantParents.has(c.id)))dossierForms[c.id]=[[c._wave7.key,c._wave7.formLabel,c]];
 for(const alternate of alternatives){
  const parent=alternate._wave7.parentId;
  const forms=alternate._cosmos?dossierForms[parent]:variantMap[parent];
  if(!forms)throw Error("Forma sem card original: "+parent);
  const key=alternate._wave7.key,label=alternate._wave7.formLabel;
  alternate.id=parent; // A página é única; esta ficha é uma versão selecionável.
  forms.push([key,label,alternate]);
  if(w.T20_VISUAL){
   const related=w.T20_VISUAL.profiles[parent]||["FATE","astral","prism","spine","#c9b38a","#172331"];
   w.T20_VISUAL.variations[parent+":"+key]=[label.toUpperCase(),alternate._cosmos?related[1]:"astral","prism","spine",
    allSeeds.find(x=>x.parentId===parent&&x.key===key)?.color||related[4],related[5]];
   w.T20_VISUAL.finishes[parent+":"+key]="gold";
  }
 }
 const ids=new Set(primary.map(c=>c.id));
 function delta(c,n,k){return 0;}
 function stats(c,n){
  const lvl=Math.min(12,Math.max(1,Number(n)||1));
  if(c._cosmos)return cosmos.stats(c,lvl);
  const s=c._crossover,cl=classes[s.className],
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
  const lvl=Math.min(12,Math.max(1,Number(n)||1));
  if(c._cosmos)return cosmos.skill(c,entry[0],lvl);
  const a=skillAttr[entry[0]]||"INT";
  const base=c.attrs.find(x=>x.key===a)?.value||0;
  return fmt(base+2+Math.floor(lvl/2)+(lvl>=7?2:0));
 }
 function draftById(id,engine){
  const c=byId[id];if(!c||!engine)return null;
  if(c._cosmos)return cosmos.draft(c);
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
 w.T20_DOSSIER_VARIANTS=dossierForms;
})();


/* build-lab.js */
/* Laboratório local: fichas pessoais nunca entram no catálogo do repositório. */
(()=>{
 "use strict";
 const engine=window.T20_BUILD_ENGINE,rules=window.T20_RULES;
 if(!engine||!rules)return;
 const KEY="t20-laboratorio-v1",planned=()=>[...(window.T20_ARCHIVE_REVISIONS?.seeds||window.T20_AUTOMATIC_SEEDS||window.T20_PLANNED||[]),...(window.T20_UMA?.seeds||[]),...(window.T20_CROSSOVERS?.seeds||[]),...(window.T20_WAVE7?.seeds||[])];
 const concepts=window.T20_CONCEPTS;
 const seedDraft=s=>window.T20_WAVE7?.seeds?.some(x=>x.id===s.id)?window.T20_WAVE7.draftById(s.id,engine):window.T20_CROSSOVERS?.ids.has(s.id)?window.T20_CROSSOVERS.draftById(s.id,engine):window.T20_UMA?.ids.has(s.id)?window.T20_UMA.draftById(s.id,engine):window.T20_ARCHIVE_REVISIONS?.draftById(s.id,engine)||window.T20_BUILD_PRESETS?.fromPlanned(s,engine)||concepts?.fromPlanned(s,engine)||engine.makeDraft({catalogId:s.id,name:s.name,work:s.universe,theme:s.catalogCategory});
 const esc=v=>String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
 let drafts=[],active="",host=null,message="";
 try{const raw=JSON.parse(localStorage.getItem(KEY)||"[]");if(Array.isArray(raw))drafts=raw.slice(0,40).map(x=>{try{return engine.normalize(x)}catch{return null}}).filter(Boolean)}catch{}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(drafts));return true}catch{message="Armazenamento local indisponível; exporte o JSON para preservar a ficha.";return false}}
 const current=()=>drafts.find(x=>x.id===active);
 const option=(value,label,selected)=>'<option value="'+esc(value)+'"'+(selected?' selected':'')+'>'+esc(label)+'</option>';
 const choice=(id,label,value,items)=>'<label class="lab-field">'+label+'<select data-field="'+id+'">'+items.map(x=>option(x[0],x[1],value===x[0])).join("")+'</select></label>';
 const input=(id,label,value,placeholder="")=>'<label class="lab-field">'+label+'<input data-field="'+id+'" value="'+esc(value)+'" placeholder="'+esc(placeholder)+'" maxlength="1000"></label>';
 const textarea=(id,label,value,placeholder="")=>'<label class="lab-field">'+label+'<textarea data-field="'+id+'" rows="3" placeholder="'+esc(placeholder)+'" maxlength="2000">'+esc(value)+'</textarea></label>';
 const sourceLink=(source)=>source?'<a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.book==='jda-1.3'?'Jogo do Ano v1.3':'Fonte')+' · p. '+esc(source.page)+' · '+esc(source.section)+'</a>':'';
 function toolbar(){return '<header class="lab-heading"><a class="back-link" href="#/">← VOLTAR AO ARQUIVO</a><span class="kicker">O SISTEMA // EDIÇÃO LOCAL</span><h1>LABORATÓRIO<br><em>DE BUILDS.</em></h1><p>Monte uma ficha pessoal e acompanhe exatamente o que foi conferido. Cálculos parciais e escolhas pendentes são identificados antes da mesa.</p><div class="lab-heading-actions"><button type="button" data-lab-action="new">CRIAR FICHA</button><label>IMPORTAR JSON<input type="file" id="labImport" accept=".json,application/json" hidden></label><button type="button" data-lab-action="export"'+(current()?'':' disabled')+'>EXPORTAR FICHA</button><button type="button" data-lab-action="audit-export">AUDITORIA 69 + 4</button><button type="button" data-lab-action="backup-export">BACKUP DOSSIÊS</button></div><small>Salvo neste navegador · JSON versionado · nenhuma publicação automática.</small></header>'}
 function sidebar(){
  const all=planned(),ready=all.filter(p=>window.T20_AUTOMATIC?.ids?.has(p.id)),
   uma=all.filter(p=>window.T20_UMA?.ids?.has(p.id)),
   crossover=all.filter(p=>window.T20_CROSSOVERS?.ids?.has(p.id)),
   wave=all.filter(p=>window.T20_WAVE7?.seeds.some(s=>s.id===p.id)),
   waveMain=wave.filter(p=>!p.isAlt&&!p.build),waveAlt=wave.filter(p=>p.isAlt&&!p.build),
   cosmos=wave.filter(p=>p.build),
   archive=all.filter(p=>!ready.includes(p)&&!uma.includes(p)&&!crossover.includes(p)&&!wave.includes(p));
  const show=p=>'<button type="button" class="lab-seed" data-lab-seed="'+esc(p.id)+'">'+esc(p.name)+'</button>';
  return '<aside class="lab-sidebar"><h2>Meus rascunhos</h2>'+
   (drafts.length?drafts.map(d=>'<button type="button" class="lab-draft'+(d.id===active?' active':'')+'" data-lab-open="'+esc(d.id)+'"><strong>'+esc(d.name)+'</strong><small>'+esc(d.work||'Criação original')+' · '+d.levels.length+' nível(is)</small></button>').join(""):'<p>Nenhuma ficha pessoal ainda.</p>')+
   '<h2>Abrir dossiês do arquivo</h2><p>'+all.length+' builds-base e formas com progressão 1–12. O Laboratório abre uma cópia local: raça, magias e requisitos opcionais devem ser verificados.</p>'+
   ready.map(show).join("")+
   (cosmos.length?'<details class="lab-archive-picker"><summary>FASE IX · '+cosmos.length+' BUILDS E FORMAS</summary><div>'+cosmos.map(show).join("")+'</div></details>':'')+
   '<details class="lab-archive-picker"><summary>FASE VII · '+waveMain.length+' NOVOS PERSONAGENS</summary><div>'+waveMain.map(show).join("")+'</div></details>'+
   '<details class="lab-archive-picker"><summary>FATE · '+waveAlt.length+' FORMAS ALTERNATIVAS</summary><div>'+waveAlt.map(show).join("")+'</div></details>'+
   '<details class="lab-archive-picker"><summary>FASE VI · '+crossover.length+' CROSSOVERS</summary><div>'+crossover.map(show).join("")+'</div></details>'+
   '<details class="lab-archive-picker"><summary>UMAMUSUME · '+uma.length+' FICHAS</summary><div>'+uma.map(show).join("")+'</div></details>'+
   '<details class="lab-archive-picker"><summary>OUTRAS '+archive.length+' FICHAS HISTÓRICAS</summary><div>'+archive.map(show).join("")+'</div></details></aside>';
 }
 function identity(d){return '<section class="lab-panel"><div class="lab-panel-head"><span>01 / IDENTIDADE</span><h2>'+esc(d.name)+'</h2></div><div class="lab-grid">'+input('name','NOME',d.name)+input('work','OBRA / CONTEXTO',d.work)+choice('theme','IDENTIDADE VISUAL',d.theme,[['arquivo','Arquivo'],['jojo','Mangá'],['cyberpunk','Cyberpunk'],['signal','HUD'],['cinza','Cinza'],['dourado','Dourado']])+textarea('description','CONCEITO NARRATIVO',d.description,'Descreva a adaptação, sem atribuir mecânicas não conferidas.')+'</div><p class="lab-hint">'+(d.catalogId?'Vinculado ao dossiê '+esc(d.catalogId)+'; o original permanece intacto.':'Ficha criada localmente.')+'</p></section>'}
 function sources(d){return '<section class="lab-panel"><div class="lab-panel-head"><span>02 / BIBLIOTECA</span><h2>Fontes permitidas</h2></div><div class="lab-books">'+rules.books.map(b=>'<div class="lab-book"><label><input type="checkbox" data-book-id="'+esc(b.id)+'" '+(d.allowedBooks.includes(b.id)?'checked ':'')+(b.id==='jda-1.3'?'disabled ':'')+'><strong>'+esc(b.name)+'</strong><small>'+esc(b.edition||'edição a conferir')+'</small></label><span>'+(b.status==='parcial'?'Algumas opções conferidas; outras permanecem bloqueadas sem tabela e fonte própria':'Referência de planejamento: opções mecânicas ainda BLOQUEADAS até catalogação e autorização')+'</span><a href="'+esc(b.url)+'" target="_blank" rel="noopener noreferrer">Consultar fonte</a></div>').join("")+'</div><p class="lab-hint">Marcar um suplemento apenas registra intenção de consulta; não libera poderes, magias ou itens sem fonte, página e pré-requisitos verificados. Novos livros selecionados entram na lista de pendências da ficha.</p></section>'}

 function specializations(d,report){
   const opts=engine.options;
   const declared=Object.entries(opts.basics).filter(([id])=>!rules.classes[id]).map(([,x])=>x.name).join(", ");
   const entryClasses=[...new Set(d.levels.map(x=>x.classId).filter(Boolean))];
   const variantRows=entryClasses.map(id=>{
    const index=d.levels.findIndex(x=>x.classId===id),selected=d.levels[index].variantId;
    const usable=Object.values(opts.variants).filter(x=>x.status==="verificado"&&x.baseClassId===id&&d.allowedBooks.includes(x.source.book));
    const active=opts.variants[selected];
    const comparison=report.rows.filter(x=>x.classId===id&&x.variantId).flatMap(x=>[
     ...x.removedGrants.map(k=>"REMOVIDA: "+(rules.abilities[k]?.name||k)),
     ...x.addedGrants.map(k=>"ADICIONADA: "+(rules.abilities[k]?.name||k))
    ]);
    return '<div class="lab-specialization"><strong>'+esc(rules.classes[id]?.name||id)+'</strong>'+
      choice('variant:'+index,'CLASSE VARIANTE',selected,[['','Classe básica (sem variante)'],...usable.map(x=>[x.id,x.name])])+
      (active?'<p class="lab-hint">'+esc(active.status!=="verificado"?"Não verificada — efeitos bloqueados":active.name+" · níveis 1–12 indexados; cálculos condicionais e aprovação editorial pendentes.")+' · '+sourceLink(active.source)+'</p>':'')+
      (comparison.length?'<ul>'+comparison.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':'<small>Sem substituições verificadas aplicadas nesta build.</small>')+
      '</div>';
   }).join('');
   const distinctionRows=d.distinctions.map((item,i)=>{
    const meta=opts.distinctions[item.id];
    return '<div class="lab-specialization"><strong>'+esc(meta?.name||item.id)+'</strong>'+
     choice('distinctionAdmission:'+i,'ADMISSÃO',item.admission,[['pretendida','Pretendida'],['admissao-pendente','Admissão narrativa pendente'],['admitida','Admitida pela mesa'],['incompativel','Reprovada']])+
     input('distinctionApproval:'+i,'AUTORIZAÇÃO / REGISTRO DA MESA',item.approval)+
     textarea('distinctionNotes:'+i,'NOTAS DA DISTINÇÃO',item.notes)+
     '<p class="lab-pending">Poderes bloqueados até verificação do texto, página, requisitos e admissão.</p></div>';
   }).join('');
   const rec=engine.recommend(d);
   return '<section class="lab-panel lab-classes"><div class="lab-panel-head"><span>03 / ARQUITETURA</span><h2>CLASSES // CAMINHOS DE PODER</h2></div>'+
    '<p class="lab-hint">CLASSE BÁSICA → VARIANTE → CAMINHO → MULTICLASSE → DISTINÇÕES. Uma especialização não concede um segundo nível de classe nem duplica habilidades. Escolha uma variante apenas na primeira entrada da respectiva classe.</p>'+
    (variantRows||'<p class="lab-hint">Selecione uma classe nos avanços para comparar suas especializações.</p>')+
    '<div class="lab-specialization"><strong>CATÁLOGO MECÂNICO PENDENTE</strong><p>'+esc(declared)+'. Nomes identificados, mas PV/PM, proficiências, poderes ou progressão ainda precisam de conferência.</p><p>Variantes de Heróis de Arton: '+Object.values(opts.variants).map(x=>esc(x.name)+(x.status==='verificado'?' (níveis 1–12 indexados)':' (ainda indisponível)')).join(', ')+'. O suplemento v1.1 já foi conferido; habilitar exige fonte individual, classe base cadastrada e livro selecionado.</p>'+
    (entryClasses.includes('arcanista')?'<p>Caminho do Arcanista: <strong>'+esc(d.arcanePath||'pendente')+'</strong>. Altere a seleção na área de atributos. Feiticeiro permanece com linhagem a conferir.</p>':'')+'</div>'+
    '<div class="lab-specialization"><strong>DISTINÇÃO // CONQUISTA</strong>'+
    choice('distinctionAdd','REGISTRAR DISTINÇÃO PRETENDIDA','',[['','Selecione para registrar'],...Object.values(opts.distinctions).filter(x=>!d.distinctions.some(z=>z.id===x.id)).map(x=>[x.id,x.name+' · regra pendente'])])+
    distinctionRows+'<p class="lab-hint">Admissão pela mesa não habilita poderes não catalogados. Nenhum bônus é concedido automaticamente.</p></div>'+
    '<div class="lab-grid">'+input('narrativeSubclass','ARQUÉTIPO / SUBCLASSE NARRATIVA',d.narrativeSubclass,'Ex.: Espadachim sobrenatural (sem efeito mecânico)')+'</div>'+
    '<div class="lab-specialization"><strong>ANALISAR BUILD // RECOMENDAR ESPECIALIZAÇÃO</strong><p>'+esc(rec.note)+'</p>'+
    (rec.variants.length?'<ul>'+rec.variants.map(v=>'<li>'+esc(v.name)+'</li>').join('')+'</ul>':'<small>Resultado inconclusivo: nenhuma alteração automática recomendada.</small>')+'</div></section>';
  }
 
 function attributes(d,report){
  const race=rules.races[d.raceId],orig=rules.origins?.[d.originId],opts=Object.entries(rules.origins||{});
  const purposes=Object.entries(rules.abilities).filter(([,ability])=>ability.classId==="geral"&&!ability.requires?.powers?.length&&!ability.requires?.caster);
  const benefits=orig?'<div class="lab-grid">'+[0,1].map(i=>choice('originBenefit:'+i,'BENEFÍCIO '+(i+1),d.originBenefits[i]||'',[['','Escolha pendente'],...orig.choices.map(name=>[name,name])])).join('')+'</div>':'';
  return '<section class="lab-panel"><div class="lab-panel-head"><span>03 / CRIAÇÃO</span><h2>Atributos e origem</h2></div><div class="lab-grid">'+
   choice('raceId','RAÇA',d.raceId,[['','Pendente'],...Object.entries(rules.races).map(([id,entry])=>[id,entry.name])])+
   (race?.noOrigin?choice('purposePower','PROPÓSITO DE CRIAÇÃO',d.purposePower,[['','Escolha um poder geral'],...purposes.map(([id,entry])=>[id,entry.name])]):choice('originId','ORIGEM',d.originId,[['','Escolha a origem'],...opts.map(([id,o])=>[id,o.name])]))+
   choice('arcanePath','CAMINHO DE ARCANISTA',d.arcanePath,[['','Sem Arcanista'],['mago','Mago · grimório'],['bruxo','Bruxo · foco'],['feiticeiro','Feiticeiro · linhagem a conferir'],['necromante','Necromante · variante de Heróis de Arton']])+
   '</div>'+benefits+(race?.note?'<p class="lab-hint">'+esc(race.note)+' · '+sourceLink(race.source)+'</p>':'')+
   '<p class="lab-hint">Compra: '+report.attributeCost+' / 10 pontos. A origem concede escolhas de benefícios; itens e demais efeitos exigem conferência. '+sourceLink({book:'jda-1.3',page:'17',section:'Atributos',url:rules.multiclass.url})+'</p>'+
   '<div class="lab-attrs">'+engine.KEYS.map(k=>'<label>'+k+'<select data-attr="'+k+'">'+Object.keys(rules.pointBuy).map(v=>option(v,v+' · custo '+rules.pointBuy[v],d.attributes[k]===Number(v))).join('')+'</select><span>Final '+(report.attributes[k]>=0?'+':'')+report.attributes[k]+'</span></label>').join('')+'</div>'+
   (d.raceId==='humano'?'<fieldset class="lab-bonuses"><legend>HUMANO // +1 EM TRÊS ATRIBUTOS DIFERENTES</legend>'+engine.KEYS.map(k=>'<label><input type="checkbox" data-race-bonus="'+k+'"'+(d.raceBonuses.includes(k)?' checked':'')+'>'+k+'</label>').join('')+'</fieldset>':'')+
   input('trainedSkills','PERÍCIAS PREVISTAS (SEPARADAS POR VÍRGULA)',d.trainedSkills.join(', '),'Ex.: Luta, Fortitude, Furtividade')+
   '<p class="lab-hint">Versátil humano e proficiências devem ser conferidos com os benefícios de criação; esta lista registra a proposta, não concede treino extra automaticamente.</p></section>';
 }
 function spellbook(d){
   const arcane=d.levels.filter(x=>x.classId==='arcanista').length;
   const firstLadino=d.levels.find(x=>x.classId==='ladino');
   const rogue=firstLadino?.variantId==='ventanista'?d.levels.filter(x=>x.classId==='ladino').length:0;
   const levels=arcane||rogue;
   if(!levels)return '';
   const caster=arcane?'Arcanista':'Ventanista';
   const special=arcane?d.levels.find(x=>x.classId==='arcanista')?.variantId:'ventanista';
   const note=special==='necromante'?'Necromante: registrar a escola de cada magia. Encantamento é proibido e metade das magias aprendidas precisa ser Necromancia.':
    special==='ventanista'?'Ventanista: somente Ilusão e Encantamento como magias simuladas não mágicas.':
    'Magias da classe básica; confira os caminhos, materiais, aprimoramentos e custos.';
   return '<section class="lab-panel"><div class="lab-panel-head"><span>05 / MAGIAS</span><h2>Grimório, escolas e simulações</h2></div><p class="lab-hint">'+esc(caster)+' '+levels+'. '+esc(note)+' O motor ainda calcula parte das magias, não a conjuração completa.</p>'+
    '<div class="lab-spell-grid">'+d.spellbook.map((s,i)=>'<article class="lab-ability"><strong>'+esc(s.name)+' · '+s.circle+'º círculo</strong><p>Nível da classe '+s.classLevel+' · '+esc(s.school||'escola pendente')+' · '+esc(s.why)+'</p><p><b>Como usar:</b> '+esc(s.how)+'</p><small>'+esc(s.source)+'</small><button type="button" data-lab-remove-spell="'+i+'">REMOVER MAGIA</button></article>').join('')+'</div>'+
    '<form id="labSpellForm" class="lab-grid"><label class="lab-field">MAGIA<input name="name" maxlength="80" required placeholder="Nome oficial"></label><label class="lab-field">CÍRCULO<select name="circle"><option value="1">1º círculo</option><option value="2">2º círculo</option><option value="3">3º círculo</option></select></label><label class="lab-field">ESCOLA<select name="school"><option value="">A conferir</option><option value="necromancia">Necromancia</option><option value="encantamento">Encantamento</option><option value="ilusao">Ilusão</option><option value="abjuracao">Abjuração</option><option value="adivinhacao">Adivinhação</option><option value="convocacao">Convocação</option><option value="evocacao">Evocação</option><option value="transmutacao">Transmutação</option></select></label><label class="lab-field">NÍVEL DE '+caster.toUpperCase()+' NA AQUISIÇÃO<input name="classLevel" type="number" min="1" max="12" value="1"></label><label class="lab-field">JUSTIFICATIVA<input name="why" maxlength="350" required placeholder="Por que escolheu?"></label><label class="lab-field">COMO USAR<input name="how" maxlength="400" required placeholder="Quando, ação e custo"></label><button type="submit">REGISTRAR MAGIA</button></form></section>';
  }
 function abilityCard(a,classLevel,why="",usage="",selectedVersion=""){
  if(!a)return '<p class="lab-pending">Habilidade sem manual validado. Conferir regras antes de usar.</p>';
  const eligible=a.versions?.filter(v=>v.minClassLevel<=classLevel)||[];
  const activeVersion=eligible.find(v=>v.id===selectedVersion)||eligible.at(-1);
  const versions=a.versions?.length?'<div class="lab-version-audit"><b>Versões e patamares</b><ul>'+a.versions.map(v=>'<li>'+(classLevel>=v.minClassLevel?'DISPONÍVEL':'AINDA NÃO ADQUIRIDA')+' — '+esc(v.label)+' (nível da classe '+v.minClassLevel+')</li>').join('')+'</ul><p>Versões de patamar NÃO são versões da obra original. Não aplicar opções bloqueadas nem somar todas as versões.</p></div>':'';
  return '<details class="lab-ability"><summary>'+esc(a.name)+(activeVersion?' · '+esc(activeVersion.label):'')+'</summary><div><p><b>Quando:</b> '+esc(a.manual.action)+' <b>Custo:</b> '+esc(a.manual.cost)+'</p><p><b>Efeito:</b> '+esc(a.manual.effect)+'</p><p><b>Exemplo na mesa:</b> '+esc(a.manual.example)+'</p><p><b>Limitações:</b> '+esc(a.manual.limit)+'</p>'+(why?'<p><b>Por que esta escolha:</b> '+esc(why)+'</p>':'<p class="lab-pending">Justificativa específica do personagem pendente.</p>')+(usage?'<p><b>Uso na build:</b> '+esc(usage)+'</p>':'<p class="lab-pending">A explicação de uso específica ainda falta.</p>')+versions+'<p><b>Regra ambígua?</b> Registre a edição, aprimoramento, conflito de interpretação e decisão da mesa na seção deste nível; o texto oficial prevalece sobre o reflavor.</p><small>'+sourceLink(a.source)+'</small></div></details>'
 }
 function levelCard(d,row,i){
  const saved=d.levels[i],cls=rules.classes[saved.classId];
  const variant=row.variant?.status==='verificado'?row.variant:null;
   const prohibited=new Set(variant?.powers?.remove||[]);
   const exclusive=new Set(variant?.powers?.exclusive||[]);
   const powers=Object.entries(rules.abilities).filter(([id,a])=>a.kind==='poder'&&
    (a.classId==="geral"||a.classId===saved.classId&&!prohibited.has(id)||a.classId===variant?.id&&exclusive.has(id)))
    .map(([id,a])=>[id,a.name+(a.requires?.classLevel?' · classe '+a.requires.classLevel:'')]);
  return '<article class="lab-level"><div class="lab-level-title"><span>NÍVEL GLOBAL '+String(i+1).padStart(2,'0')+'</span><strong>'+(cls?esc(cls.name)+' '+row.classLevel:'Classe pendente')+'</strong>'+(row.pv!==null?'<small>PV base '+row.pv+' · PM base '+row.pm+'</small>':'')+'</div>'+(row.removedGrants?.length||row.addedGrants?.length?'<div class="lab-change"><strong>CLASSE ORIGINAL VS VARIANTE</strong> · removidas: '+esc(row.removedGrants.map(id=>rules.abilities[id]?.name||id).join(', ')||'nenhuma')+' · novas: '+esc(row.addedGrants.map(id=>rules.abilities[id]?.name||id).join(', ')||'nenhuma')+'</div>':'')+'<div class="lab-grid">'+choice('class:'+i,'CLASSE DESTE AVANÇO',saved.classId,[['','Escolha a classe'],...Object.entries(rules.classes).map(([id,c])=>[id,c.name])])+(cls&&row.classLevel>=row.powerFrom?choice('power:'+i,'PODER DE CLASSE',saved.powerId,[['','Escolha pendente'],...powers]):'')+'</div>'+(row.newClass?'<p class="lab-hint">Entrada em outra classe: ganha habilidades de classe de 1º nível e PV subsequentes; não recebe novamente perícias ou proficiências iniciais.</p>':'')+(row.grants.length?'<div class="lab-grants"><b>GANHOS AUTOMÁTICOS CONFERIDOS NA TABELA</b>'+row.grants.map(g=>abilityCard(g.ability,row.classLevel,saved.why,saved.usage)).join("")+'</div>':'')+(saved.powerId&&rules.abilities[saved.powerId]?abilityCard(rules.abilities[saved.powerId],row.classLevel,saved.why,saved.usage,saved.powerVersion):'')+
  '<details class="lab-ability lab-supplement"><summary>OPÇÃO DE SUPLEMENTO / REGISTRO EM REVISÃO'+(saved.customPowerName?' — '+esc(saved.customPowerName):'')+'</summary><div class="lab-grid">'+
  input('customPowerName:'+i,'NOME DA OPÇÃO',saved.customPowerName,'Deixe vazio se não usar conteúdo suplementar.')+
  choice('customPowerBook:'+i,'LIVRO / SUPLEMENTO',saved.customPowerBook,[['','Selecione a obra'],...rules.books.filter(b=>b.id!=='jda-1.3').map(b=>[b.id,b.name])])+
  input('customPowerEdition:'+i,'EDIÇÃO / NÚMERO DA REVISTA',saved.customPowerEdition)+
  input('customPowerPage:'+i,'PÁGINA / SEÇÃO',saved.customPowerPage)+
  textarea('customPowerPrereqs:'+i,'PRÉ-REQUISITOS A CONFERIR',saved.customPowerPrereqs)+
  textarea('customPowerEffect:'+i,'EFEITO MECÂNICO RESUMIDO',saved.customPowerEffect)+
  textarea('customPowerVersions:'+i,'OUTRAS VERSÕES / APRIMORAMENTOS',saved.customPowerVersions)+
  textarea('customPowerAmbiguity:'+i,'DIVERGÊNCIAS E DECISÃO DA MESA',saved.customPowerAmbiguity)+
  '</div><p>Este registro é editorial e não modifica automaticamente PV, PM, dano, ações ou pré-requisitos. Não copie longos trechos do livro; resuma e cite.</p></details>'+(saved.powerId&&rules.abilities[saved.powerId]?.versions?.length?choice('powerVersion:'+i,'VERSÃO / PATAMAR DA HABILIDADE',saved.powerVersion,[['','Automática pelo nível da classe'],...rules.abilities[saved.powerId].versions.filter(v=>v.minClassLevel<=row.classLevel).map(v=>[v.id,v.label])]):'')+'<div class="lab-grid">'+textarea('why:'+i,'POR QUE NESTE NÍVEL?',saved.why,'Função narrativa e motivo da escolha.')+textarea('usage:'+i,'COMO USAR?',saved.usage,'Condições e estratégia, sem efeito inventado.')+textarea('synergy:'+i,'SINERGIA A CONFERIR',saved.synergy)+textarea('limits:'+i,'LIMITES / DECISÃO DA MESA',saved.limits)+textarea('sourceNote:'+i,'FONTE, ERRATA E INTERPRETAÇÃO ESCOLHIDA',saved.sourceNote,'Edição, página e versões em conflito.')+'</div><small>'+sourceLink(row.source)+'</small></article>'
 }
 function progression(d,report){const distribution=Object.entries(report.levelsByClass).map(([id,n])=>rules.classes[id].name+' '+n).join(' / ');return '<section class="lab-panel"><div class="lab-panel-head"><span>04 / MULTICLASSE</span><h2>Distribuição de níveis</h2></div><p class="lab-hint">Cada linha é um avanço global. O nível de classe é contado separadamente. O exemplo Guerreiro 8 / Ladino 4 é apenas um formato possível, não uma ficha pronta.</p><div class="lab-summary"><strong>'+esc(distribution||'Classe pendente')+'</strong><span>PV base: '+(report.basePV??'—')+' · PM base: '+(report.basePM??'—')+'</span><small>'+esc(report.summary)+'</small></div>'+report.rows.map((row,i)=>levelCard(d,row,i)).join("")+'<div class="lab-row-actions"><button type="button" data-lab-action="add-level"'+(d.levels.length>=12?' disabled':'')+'>ADICIONAR NÍVEL</button><button type="button" data-lab-action="remove-level"'+(d.levels.length<=1?' disabled':'')+'>REMOVER ÚLTIMO</button></div></section>'}
 function inventory(d){return '<section class="lab-panel"><div class="lab-panel-head"><span>05 / INVENTÁRIO</span><h2>Registro de equipamentos</h2></div><p class="lab-hint">Itens aqui são anotações narrativas; não alteram ataque, Defesa ou carga até que as regras e a fonte sejam cadastradas.</p>'+d.inventory.map((item,i)=>'<div class="lab-item"><strong>'+esc(item.quantity)+'× '+esc(item.name)+'</strong><span>'+esc(item.note)+'</span><button type="button" data-lab-remove-item="'+i+'">REMOVER</button></div>').join("")+'<form id="labItemForm" class="lab-grid"><label class="lab-field">ITEM<input name="name" maxlength="100" required></label><label class="lab-field">QUANTIDADE<input name="quantity" type="number" min="1" max="99" value="1"></label><label class="lab-field">NOTA / FONTE<input name="note" maxlength="300"></label><button type="submit">REGISTRAR ITEM</button></form></section>'}
 function combat(d){const fields=[['style','ESTILO DE COMBATE'],['opening','INÍCIO DE COMBATE'],['combos','COMBINAÇÕES A CONFERIR'],['resources','GESTÃO DE RECURSOS'],['strengths','PONTOS FORTES'],['weaknesses','PONTOS FRACOS'],['evolution','EVOLUÇÃO DO NÍVEL 1 AO 12']];return '<section class="lab-panel"><div class="lab-panel-head"><span>06 / MESA</span><h2>Guia de combate</h2></div><p class="lab-hint">Registre a estratégia da adaptação. Uma sequência só deve ser tratada como legal após conferir ações, custos, duração e pré-requisitos na fonte.</p><div class="lab-grid">'+fields.map(([id,label])=>textarea('combat:'+id,label,d.combat[id],'Pendente de decisão e conferência.')).join('')+'</div></section>'}
 function audit(d,report){return '<section class="lab-panel lab-audit"><div class="lab-panel-head"><span>07 / CONFERÊNCIA</span><h2>'+report.issues.length+' pendência(s)</h2></div><p>Este rascunho não está aprovado para jogar. A lista mostra o que falta antes de fazer cálculos completos ou publicar uma adaptação.</p><ul>'+report.issues.map(v=>'<li>'+esc(v)+'</li>').join("")+'</ul>'+textarea('notes','DECISÕES E CORREÇÕES',d.notes,'Registre as decisões pendentes da mesa.')+'<p><a href="./docs/laboratorio.md">Como revisar e versionar uma ficha local</a></p></section>'}
 function editor(d){const report=engine.evaluate(d);return '<div class="lab-editor">'+identity(d)+sources(d)+specializations(d,report)+attributes(d,report)+progression(d,report)+spellbook(d)+inventory(d)+combat(d)+audit(d,report)+'<button type="button" class="lab-delete" data-lab-action="delete">EXCLUIR ESTE RASCUNHO LOCAL</button></div>'}
 function draw(){if(!host)return;const d=current();host.innerHTML='<div class="container lab-shell">'+toolbar()+(message?'<p class="lab-message" role="status">'+esc(message)+'</p>':'')+'<div class="lab-layout">'+sidebar()+(d?editor(d):'<div class="lab-empty"><h2>Comece uma ficha</h2><p>Crie uma ficha pessoal ou abra uma das fichas ou formas listadas no arquivo, como cópia local. As entradas publicadas não são modificadas.</p></div>')+'</div></div>';document.title='Laboratório de Builds // O Sistema T20'}
 function render(root,seedId){host=root;document.body.removeAttribute('data-theme');document.body.removeAttribute('data-art');document.body.removeAttribute('data-world');document.body.removeAttribute('data-family');document.body.removeAttribute('data-pattern');document.body.removeAttribute('data-finish');document.body.removeAttribute('data-lineage');document.body.removeAttribute('data-variant');document.body.style?.removeProperty?.('--char-color');document.body.dataset.lab='true';
  if(seedId){const seed=planned().find(x=>x.id===seedId);if(seed){let d=drafts.find(x=>x.catalogId===seedId);if(!d){d=seedDraft(seed);drafts.unshift(d);save()}active=d.id}}
  draw()}
 function owns(target){return !!target.closest?.('.lab-shell')}
 function handleClick(evt){const t=evt.target;if(!owns(t))return false;
  const open=t.closest('[data-lab-open]'),seed=t.closest('[data-lab-seed]'),act=t.closest('[data-lab-action]'),remove=t.closest('[data-lab-remove-item]'),removeSpell=t.closest('[data-lab-remove-spell]');
  if(open){active=open.dataset.labOpen;message='';draw();return true}
  if(seed){const s=planned().find(x=>x.id===seed.dataset.labSeed);if(s){let d=drafts.find(x=>x.catalogId===s.id);if(!d){d=seedDraft(s);drafts.unshift(d);save()}active=d.id;draw()}return true}
  const d=current();if(!act&&!remove&&!removeSpell)return false;
  if(remove&&d){d.inventory.splice(Number(remove.dataset.labRemoveItem),1);save();draw();return true}
  if(removeSpell&&d){d.spellbook.splice(Number(removeSpell.dataset.labRemoveSpell),1);save();draw();return true}
  if(act?.dataset.labAction==='new'){if(drafts.length>=40){message='Limite de 40 rascunhos locais; exporte e remova um antes de continuar.';draw();return true}const n=engine.makeDraft();drafts.unshift(n);active=n.id;save();draw();return true}
  if(act?.dataset.labAction==='audit-export'){window.T20_CLASS_REVIEW?.exportReport();return true}
  if(act?.dataset.labAction==='backup-export'){window.T20_CLASS_REVIEW?.exportBackup();return true}
  if(!d)return true;
  if(act.dataset.labAction==='add-level'&&d.levels.length<12)d.levels.push(engine.emptyLevel());
  if(act.dataset.labAction==='remove-level'&&d.levels.length>1)d.levels.pop();
  if(act.dataset.labAction==='delete'){drafts=drafts.filter(x=>x.id!==d.id);active='';save()}
  if(act.dataset.labAction==='export'){const blob=new Blob([engine.exportJSON(d)],{type:'application/json'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='o-sistema-'+d.id+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),2000);return true}
  save();draw();return true
 }
 function handleInput(evt){if(!owns(evt.target))return false;const d=current();if(!d)return false;const t=evt.target;
  if(t.dataset.attr){d.attributes[t.dataset.attr]=Number(t.value);save();return true}
  if(t.dataset.raceBonus){d.raceBonuses=t.checked?[...new Set([...d.raceBonuses,t.dataset.raceBonus])]:d.raceBonuses.filter(x=>x!==t.dataset.raceBonus);save();return true}
  if(t.dataset.bookId){if(t.dataset.bookId==='jda-1.3')return true;const id=t.dataset.bookId;d.allowedBooks=t.checked?[...new Set([...d.allowedBooks,id])]:d.allowedBooks.filter(x=>x!==id);save();return true}
  const key=t.dataset.field;if(!key)return false;
  const [field,index]=key.split(':');if(index!==undefined){
   if(field==='originBenefit'){d.originBenefits[Number(index)]=t.value;save();return true}
   if(field==='class'){d.levels[Number(index)].classId=t.value;d.levels[Number(index)].variantId='';d.levels[Number(index)].powerId='';d.levels[Number(index)].powerVersion=''}else if(field==='variant'){const level=d.levels[Number(index)];if(!d.levels.slice(0,Number(index)).some(x=>x.classId===level.classId)){level.variantId=t.value;if(level.classId==='arcanista'){if(t.value==='necromante')d.arcanePath='necromante';else if(d.arcanePath==='necromante')d.arcanePath='';}}}
    else if(field==='distinctionAdmission'&&d.distinctions[Number(index)])d.distinctions[Number(index)].admission=t.value;
    else if(field==='distinctionApproval'&&d.distinctions[Number(index)])d.distinctions[Number(index)].approval=t.value;
    else if(field==='distinctionNotes'&&d.distinctions[Number(index)])d.distinctions[Number(index)].notes=t.value;
    else if(field==='power'){d.levels[Number(index)].powerId=t.value;d.levels[Number(index)].powerVersion=''}else if(field==='combat'&&d.combat[index]!==undefined)d.combat[index]=t.value;else if(d.levels[Number(index)])d.levels[Number(index)][field]=t.value}
  else if(field==='trainedSkills')d.trainedSkills=t.value.split(',').map(x=>x.trim()).filter(Boolean);
  else if(field==='raceId'){d.raceId=t.value;d.raceBonuses=[];d.purposePower='';if(rules.races[d.raceId]?.noOrigin){d.originId='';d.originBenefits=[]}}
  else if(field==='originId'){d.originId=t.value;d.originBenefits=[]}
   else if(field==='distinctionAdd'){if(t.value&&!d.distinctions.some(x=>x.id===t.value))d.distinctions.push(engine.options.distinctItem({id:t.value}));draw();}
  else d[field]=t.value;
  save();return true
 }
 function refresh(){draw()}
 function handleImport(evt){if(evt.target.id!=='labImport')return false;const file=evt.target.files?.[0];if(!file)return true;
  file.text().then(text=>{try{const d=engine.importJSON(text);if(drafts.some(x=>x.id===d.id))throw Error('Este ID já existe. Exporte o rascunho atual antes de substituí-lo.');if(drafts.length>=40)throw Error('Limite de 40 rascunhos locais.');drafts.unshift(d);active=d.id;message='JSON importado como rascunho local; regras continuam sujeitas à conferência.';save()}catch(error){message=error.message||'JSON inválido.'}draw()});evt.target.value='';return true
 }
 function handleSubmit(evt){
  if(evt.target.id==='labSpellForm'){evt.preventDefault();const d=current();if(!d)return true;const values=Object.fromEntries(new FormData(evt.target));d.spellbook.push({...values,circle:Number(values.circle),classLevel:Number(values.classLevel),source:'Tormenta20 — Jogo do Ano v1.3, Cap. 4 (a conferir)'});Object.assign(d,engine.normalize(d));save();draw();return true}
  if(evt.target.id!=='labItemForm')return false;evt.preventDefault();const d=current();if(!d)return true;const values=Object.fromEntries(new FormData(evt.target));d.inventory.push({name:values.name,note:values.note,quantity:values.quantity});Object.assign(d,engine.normalize(d));save();draw();return true}
 document.addEventListener('click',handleClick);
 document.addEventListener('input',handleInput);
 document.addEventListener('change',evt=>{if(handleImport(evt))return;if(handleInput(evt))refresh()});
 document.addEventListener('submit',handleSubmit);
 window.T20_LAB={render,list:()=>drafts.slice()};
})();


/* app.js */
/* O Sistema // T20 — sem dependências, sem conta, sem Firebase. */
(()=>{
"use strict";
const data=window.T20_DATA;
const root=document.getElementById("app");
if(!data||!root){return;}
const planned=window.T20_PLANNED||[];
const catalog=[...data.characters,...planned];
const tabs=[["overview","Dossiê"],["attributes","Atributos iniciais"],["equipment","Equipamentos"],["abilities","Habilidades"],["progression","Progressão"],["techniques","Técnicas"],["sources","Fontes"],["compare","Comparar"],["review","Revisão"]];
let search="",universe="all",lastRoute="",toastTimer=null,selectedLevel=1,diegoMode="normal",gokuMode="z";
const PAGE_SIZE=window.T20_WAVE7?24:72;
let visibleCount=PAGE_SIZE,matchingCards=[],loadObserver=null,searchTimer=null;
const catalogModes={diego:"normal",goku:"z"};
const e=(v)=>String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const url=(u)=>/^https:\/\//.test(String(u||""))?e(u):"#";
const imageUrl=(u)=>String(u||"").startsWith("data:image/svg+xml;charset=utf-8,")||/^\.\/assets\/(?:portraits|art|art-optimized|card-art|character-art|planned-art)\/[a-z0-9-]+\.(?:svg|webp|avif|png|jpg)$/.test(String(u||""))?e(u):url(u);
const icon=(v)=>e(v||"◈");
const collator=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:true});
const universeOptions=[
 ["fate","Fate · Servos"],
 ["the-boys","The Boys"],
 ["one-punch-man","One Punch Man"],
 ["blue-lock","Blue Lock"],
 ["kamen-rider","Kamen Rider"],
 ["konosuba","KonoSuba"],
 ["mushoku","Mushoku Tensei"],
 ["wuwa","Wuthering Waves"],
 ["dmc","Devil May Cry"],
 ["fma","Fullmetal Alchemist"],
 ["genshin","Genshin Impact"],
 ["witcher","The Witcher"],
 ["overwatch","Overwatch"],
 ["cdz","Cavaleiros do Zodíaco"],
 ["dungeon-meshi","Dungeon Meshi"],
 ["digital-circus","Digital Circus"],
 ["murder-drones","Murder Drones"],
 ["undertale","Undertale"],
 ["umamusume","Umamusume · Pretty Derby"],
 ["manhwa","Manhwa · Fantasia"],
 ["zenless","Zenless Zone Zero"],
 ["marvel","Marvel / MCU"],
 ["jojo","JoJo"],
 ["cyberpunk","Cyberpunk"],
 ["hsr","Honkai: Star Rail"],
 ["romcom","Romance & Cosplay"],
 ["chainsaw","Chainsaw Man"],
 ["music","Música / Ado"],
 ["transformers","Transformers"],
 ["jjk","Jujutsu Kaisen"],
 ["dragonball","Dragon Ball"],
 ["chrysos","Herdeiros de Chrysos"],
 ["emanator","Emanadores"],
 ["signalis","SIGNALIS"],
 ["mha","My Hero Academia"],
 ["bleach","Bleach"],
 ["dark-souls","Dark Souls III"],
 ["binding-of-isaac","The Binding of Isaac"],
 ["shuumatsu","Shuumatsu no Valkyrie"],
 ["black-souls","Black Souls"],
 ["sekiro","Sekiro"],
 ["tokyo-ghoul","Tokyo Ghoul"],
].sort((a,b)=>collator.compare(a[1],b[1]));
const brokenImageKey="t20-broken-images-session";
const imageAttempts=new WeakMap();
const imageFailures=[];
window.T20_IMAGE_DIAGNOSTICS={report:()=>imageFailures.slice(-150)};
let failedFromSession=[];
try{failedFromSession=JSON.parse(sessionStorage.getItem(brokenImageKey)||"[]")}catch{}
const failedImageSources=new Set(Array.isArray(failedFromSession)?failedFromSession:[]);
function rememberFailedImage(src){
 if(!/^https:\/\//.test(src))return;
 failedImageSources.add(src);
 try{sessionStorage.setItem(brokenImageKey,JSON.stringify([...failedImageSources].slice(-400)))}catch{}
}
const normalizeSearch=(v)=>String(v??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR").replace(/[^a-z0-9]+/g," ").trim();
const archiveCategory=(c)=>c.catalogCategory||(["gyro","diego"].includes(c.id)?"jojo":["cipher","cyrene"].includes(c.id)?"chrysos":["rentarou","marin"].includes(c.id)?"romcom":["yoru","makima"].includes(c.id)?"chainsaw":c.id==="ado"?"music":c.id==="optimus"?"transformers":"cyberpunk");
const dossierForms=id=>window.T20_DOSSIER_VARIANTS?.[id]||window.T20_FATE_VARIANTS?.[id]||[];
const defaultForm=id=>dossierForms(id)[0]?.[0]||"principal";
const archiveTerms=(c)=>normalizeSearch([c.name,c.universe,c.label,c.info?.className,c.info?.origin,c.info?.race,c.info?.role,c._mega?.identity,c._cosmos?.aliases,c.id==="goku"?"Dragon Ball Z GT Daima Super":"",c.id==="boys-starlight"?"Os Sete The Boys":"",...dossierForms(c.id).map(([key,label,form])=>[label,form.name,form.universe,form.info?.className,form._wave7?.fateClass].join(" "))].filter(Boolean).join(" "));
const plannedById=(id)=>planned.find(c=>c.id===id);

const charById=(id)=>id==="goku"&&window.T20_GOKU_VARIANTS?.[gokuMode]?window.T20_GOKU_VARIANTS[gokuMode]:
 id==="diego"&&diegoMode==="alternative"&&window.T20_ALTERNATES?.diego?.alternative?window.T20_ALTERNATES.diego.alternative:
 dossierForms(id).length?variantByKey(id,catalogModes[id]||defaultForm(id)):
 data.characters.find(c=>c.id===id);
function image(src,alt,css="",attrs="",priority="lazy"){return '<img class="'+e(css)+'" '+attrs+' loading="'+(priority==="eager"?"eager":"lazy")+'" fetchpriority="'+(priority==="eager"?"high":"low")+'" decoding="async" referrerpolicy="no-referrer" src="'+imageUrl(src)+'" alt="'+e(alt)+'">'}
const isPoster=src=>/^(?:data:image\/svg\+xml|\.\/assets\/portraits\/)/.test(src||"");
const isLocalArt=src=>String(src||"").startsWith("./assets/")&&!isPoster(src);
const isRemoteImage=src=>/^https:\/\//.test(src||"");
function portraitBackup(c){
 if(c?.portrait?.fallback)return c.portrait.fallback;
 const id=c?.id;
 if(!id||window.T20_UMA?.ids.has(id)||window.T20_CROSSOVERS?.ids.has(id)||window.T20_WAVE7?.ids.has(id))return "";
 return "./assets/portraits/"+id+".svg";
}
function portraitUnderlay(c){
 const backup=portraitBackup(c);
 return backup&&backup!==c.portrait.url?image(backup,"","portrait-underlay",'aria-hidden="true"'):"";
}
function mediaBackup(c,primary,isPortrait,tried,poster){
 const art=c?.portrait?.url;
 const original=primary?.replace(/^\.\/assets\/art-optimized\/([a-z0-9-]+)\.webp$/,"./assets/art/$1.png");
 const candidates=[original,isPortrait||isLocalArt(art)?art:null,
  ...(window.T20_MEDIA_BACKUPS?.[primary]||[]),poster,portraitBackup(c),window.T20_MEDIA_POSTERS?.[primary]]
  .filter(src=>src&&src!==primary&&!tried?.has(src)&&!failedImageSources.has(src));
 return candidates.find(isLocalArt)||candidates.find(isRemoteImage)||candidates.find(isPoster);
}
function mediaNotice(src,recovered){
 return isPoster(src)?"Pôster de reserva":recovered?"Imagem de reserva":"";
}
const mediaAlt=(notice,alt)=>notice?notice+" · "+alt:alt;
function displayedMedia(c,src,alt,{portrait=false,attrs="",priority="lazy"}={}){
 const shown=failedImageSources.has(src)?mediaBackup(c,src,portrait)||src:src;
 const recovered=shown!==src;
 const notice=mediaNotice(shown,recovered);
 const metadata=' data-media-alt="'+e(alt)+'"'+(recovered?' data-recovered="true" data-media-original="'+imageUrl(src)+'"':"");
 return image(shown,mediaAlt(notice,alt),"",attrs+metadata,priority)+
  '<span class="media-reserve" aria-hidden="true"'+(notice?"":" hidden")+'>'+notice+'</span>';
}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3200)}
function note(text){return '<aside class="system-note"><span class="who">O SISTEMA // OBSERVAÇÃO</span><p>'+e(text)+'</p></aside>'}

const guides=window.T20_GUIDE||{books:{},people:{}};
const guideFor=(c)=>c._guide||(c.id==="diego"&&c.theme==="diego-alt"&&window.T20_ALTERNATE_GUIDES?.diego?window.T20_ALTERNATE_GUIDES.diego:guides.people[c.id]||{levels:[],basics:[]});
const variants=(id)=>id==="diego"?[["normal","Scary Monsters",data.characters.find(c=>c.id==="diego")],["alternative","THE WORLD",window.T20_ALTERNATES?.diego?.alternative]].filter(x=>x[2]):id==="goku"?[["z","DBZ",window.T20_GOKU_VARIANTS?.z],["gt","GT",window.T20_GOKU_VARIANTS?.gt],["daima","Daima",window.T20_GOKU_VARIANTS?.daima],["super","Super",window.T20_GOKU_VARIANTS?.super]].filter(x=>x[2]):dossierForms(id).length?dossierForms(id):[["principal",plannedById(id)?"Pendente":"Principal",data.characters.find(c=>c.id===id)||plannedById(id)]];
const activeVariant=(id)=>id==="diego"?diegoMode:id==="goku"?gokuMode:catalogModes[id]||defaultForm(id);
const variantByKey=(id,key)=>variants(id).find(v=>v[0]===key)?.[2]||variants(id)[0]?.[2];
const attrDelta=(c,n,k)=>window.T20_WAVE7?.ids.has(c.id)?window.T20_WAVE7.delta(c,n,k):window.T20_CROSSOVERS?.ids.has(c.id)?window.T20_CROSSOVERS.delta(c,n,k):window.T20_UMA?.ids.has(c.id)?window.T20_UMA.delta(c,n,k):window.T20_MEGA?.ids.has(c.id)?window.T20_MEGA.delta(c,n,k):window.T20_EXPANSION.delta(c,n,k);
const levelClamp=(v)=>Math.min(12,Math.max(1,Number(v)||1));
const fmt=(n)=>(n>=0?"+":"")+n;
function statFor(c,lvl){
 const n=levelClamp(lvl),floor=Math.floor(n/2),training=n>=7?4:2;
 if(window.T20_WAVE7?.ids.has(c.id))return window.T20_WAVE7.stats(c,n);
 if(window.T20_CROSSOVERS?.ids.has(c.id))return window.T20_CROSSOVERS.stats(c,n);
 if(window.T20_UMA?.ids.has(c.id))return window.T20_UMA.stats(c,n);
 if(window.T20_AUTOMATIC?.ids.has(c.id))return window.T20_AUTOMATIC.stats(c,n);
 if(window.T20_MEGA?.ids.has(c.id))return window.T20_MEGA.stats(c,n);
 if(window.T20_EXPANSION?.expanded.has(c.id))return window.T20_EXPANSION.stats(c,n);
 const con=c.attrs.find(a=>a.key==="CON")?.value||0;
 const intBase=c.attrs.find(a=>a.key==="INT")?.value||0;
 const strBase=c.attrs.find(a=>a.key==="FOR")?.value||0;
 const attrInt=intBase+(c.id==="d"&&n>=12?1:0);
 const attrStr=strBase+(c.id==="david"&&n>=7?1:0);
 let pv=c.stats.pv+(n-1)*c.stats.hpGain;
 let pm=c.stats.pm+(n-1)*c.stats.pmGain;
 let defense=c.stats.defense;
 let move=c.stats.speed;
 let attack="",damage="",extra="",magicDC=null,explanation="";
 if(c.id==="gyro"){
   attack=fmt(6+floor+(n>=7?2:0));
   damage=(n>=12?"1d8":"1d6")+"+"+(6+(n>=6?3:0)+(n>=11?2:0));
   extra="Ataque Especial "+fmt(n>=9?12:n>=5?8:4);
   explanation="Ataque básico de azagaia/Steel Ball; soma metade do nível e treinamento em Pontaria. Arqueiro (+3 no dano) entra no 6º, Especialização (+2) no 11º e Mestre em Arma aumenta o dado no 12º.";
 }else if(c.id==="d"){
   pm+=(n>=6?n:0)+(n>=12?1:0);
   magicDC=10+floor+attrInt+(n>=5?1:0);
   extra="Magias de "+(n>=9?"3º":n>=5?"2º":"1º")+" círculo";
   explanation="CD base das magias: 10 + metade do nível + INT + Fortalecimento Arcano a partir do 5º. Magia Pungente pode adicionar +2 CD ao gastar +1 PM. O 12º nível aumenta INT para +5.";
 }else if(c.id==="david"){
   pv+=(n>=4?attrStr:0);
   if(n>=5)pm+=3;
   if(n>=11)pm+=3;
   defense+=(n>=3?con+Math.min(attrStr,n):0)+(n>=7?1:0)+(n>=11?1:0);
   move=n>=2?"12 m":"9 m";
   attack=fmt(6+floor+(n>=7?2:0)+(n>=7?1:0));
   damage=(n>=9?"1d10":n>=5?"1d8":"1d6")+"+"+(attrStr+(n>=10?con:0));
   extra="Briga "+(n>=9?"1d10":n>=5?"1d8":"1d6");
   explanation="PV incluem Sarado (FOR) desde o 4º; PM incluem Coração Heroico nos níveis 5 e 11; Defesa presume ausência de armadura para Braços Calejados e Casca Grossa. Dano não aplica bônus temporários.";
 }else if(c.id==="rentarou"){
   pm+=(n>=5?3:0)+(n>=11?3:0);
   defense+=(n>=5?1:0)+(n>=11?1:0);
   attack=fmt(2+floor+(n>=7?2:0));
   damage=n>=10?"Palavras Afiadas 6d6":n>=6?"Palavras Afiadas 4d6":n>=2?"Palavras Afiadas 2d6":"Clava 1d6";
   extra="CAR "+fmt(4+(n>=5?1:0)+(n>=11?1:0))+" • Comandar +1";
   explanation="Nobre de apoio: PV aumentam 7 por nível, PM aumentam 4 por nível, além dos +3 PM de Coração Heroico nos níveis 1, 5 e 11. A Defesa inclui couro (+2) e Carisma (Autoconfiança). Palavras Afiadas usa Diplomacia contra Vontade, dano não letal; não é ataque de Luta.";
 }else if(c.id==="cipher"){
   attack=fmt(6+floor+(n>=7?2:0));
   damage=(n>=2?"1d4+4":"1d4")+(n>=1?" + "+(1+Math.floor((n-1)/2))+"d6 furtivo (se válido)":"");
   extra="Ataque Furtivo "+(1+Math.floor((n-1)/2))+"d6";
   explanation="O bônus de ataque inclui metade do nível e treinamento; Acuidade com Arma dá +4 no dano da adaga desde o nível 2. Ataque Furtivo só se soma quando suas condições são atendidas.";
 }
 return {level:n,pv,pm,defense,move,attack,damage,extra,magicDC,attributeInt:attrInt,attributeStr:attrStr,floor,training,explanation};
}
function skillFor(c,entry,level){
 const v=parseInt(entry[1],10),n=levelClamp(level);
 if(window.T20_WAVE7?.ids.has(c.id))return window.T20_WAVE7.skill(c,entry,n);
 if(window.T20_CROSSOVERS?.ids.has(c.id))return window.T20_CROSSOVERS.skill(c,entry,n);
 if(window.T20_UMA?.ids.has(c.id))return window.T20_UMA.skill(c,entry,n);
 if(window.T20_AUTOMATIC?.ids.has(c.id))return window.T20_AUTOMATIC.skill(c,entry,n);
 if(window.T20_MEGA?.ids.has(c.id))return window.T20_MEGA.skill(c,entry,n);
 if(window.T20_EXPANSION?.expanded.has(c.id))return window.T20_EXPANSION.skill(c,entry,n);
 let bonus=v+Math.floor(n/2)+(n>=7?2:0);
 if(c.id==="cipher"&&n>=3&&["Ladinagem","Furtividade"].includes(entry[0]))bonus+=3;
 if(c.id==="david"&&entry[0]==="Fortitude"&&n>=4)bonus+=(n>=7?5:4);
 if(c.id==="david"&&entry[0]==="Atletismo"&&n>=2)bonus+=2;
 if(c.id==="rentarou"){
   if(["Diplomacia","Enganação"].includes(entry[0]))bonus+=(n>=5?1:0)+(n>=11?1:0);
   if(entry[0]==="Diplomacia"&&n>=4)bonus+=2;
 }
 return fmt(bonus);
}
function referenceLinks(refs){
 return (refs||[]).map(([book,pages,term])=>{
  const b=guides.books[book];if(!b)return "";
  const pageLabel=/^\d+(?:\s*[-–,]\s*\d+)*$/.test(String(pages))?"p. "+pages:"Referência: "+pages;
  return '<a class="ref-link" target="_blank" rel="noopener noreferrer" href="'+url(b.url)+'"><b>'+e(b.name)+'</b><span>'+e(pageLabel)+' · '+e(term)+'</span><span aria-hidden="true">↗</span></a>';
 }).join("");
}
function guidePanel(g){
 return '<div class="guide-explanation"><div class="guide-part"><b>POR QUE ESTA ESCOLHA?</b><p>'+e(g.why||"Justificativa pendente de revisão.")+'</p></div><div class="guide-part"><b>COMO USAR NA MESA</b><p>'+e(g.use||"Uso pendente de conferência no livro.")+'</p></div>'+(g.automatic?'<p class="auto-marker">AUTOMÁTICO // '+e(g.automatic)+'</p>':"")+'<div class="guide-references"><b>ONDE CONSULTAR AS REGRAS</b>'+(g.ref?.length?referenceLinks(g.ref):'<p>Página e suplemento pendentes de confirmação.</p>')+'</div></div>';
}
function levelPanel(c,level){
 const g=guideFor(c).levels[level-1]||{};
 return '<div class="guide-panel-head"><span>O SISTEMA // NÍVEL '+String(level).padStart(2,"0")+'</span><strong>'+e(c.progression[level-1]?.[1]||"Evolução")+'</strong></div>'+guidePanel(g);
}
function selectedMetrics(c,n){const v=statFor(c,n);
 return '<div class="live-metrics">'+[
  ["PONTOS DE VIDA",v.pv],["PONTOS DE MANA",v.pm],["DEFESA",v.defense],["MOVIMENTO",v.move],
  [c.id==="d"?"CD DE MAGIA":"ATAQUE BASE",c.id==="d"?v.magicDC:v.attack],
  [c.id==="d"?"CÍRCULO MÁXIMO":"DANO BASE",c.id==="d"?(n>=9?"3º":n>=5?"2º":"1º"):v.damage]
 ].map(([k,val])=>'<div class="live-metric"><span>'+e(k)+'</span><b>'+e(val)+'</b></div>').join("")+'</div><p class="derived-note">'+e(v.explanation)+'</p>';
}

function getRoute(){
 const parts=decodeURIComponent(location.hash.replace(/^#\/?/,"")).split("/").filter(Boolean);
 const [id,version]=parts;
 if(id==="laboratorio")return{character:null,board:false,lab:true,seedId:version||"",tab:"overview"};
 if(id==="arquivo")return{character:null,board:true,tab:"review"};
 if(id==="atlas")return{atlas:true,atlasSlug:version||"",character:null,board:false,tab:"overview"};
 const pending=plannedById(id);
 if(pending)return{character:null,planned:pending,board:false,tab:tabs.some(t=>t[0]===version)?version:"overview"};
 if(!data.characters.some(c=>c.id===id))return{character:null,board:false,tab:"overview"};
 let tab=version;
 if(id==="diego"){
  diegoMode=["normal","alternative"].includes(version)?version:"normal";
  if(version===diegoMode)tab=parts[2];
 }else if(id==="goku"){
  gokuMode=["z","gt","daima","super"].includes(version)?version:"z";
  if(version===gokuMode)tab=parts[2];
 }else if(dossierForms(id).length){
  const selected=dossierForms(id).find(([key])=>key===version);
  catalogModes[id]=selected?.[0]||catalogModes[id]||defaultForm(id);
  if(selected)tab=parts[2];
 }
 return{character:charById(id),board:false,tab:tabs.some(t=>t[0]===tab)?tab:"overview"};
}
function linkFor(c,tab="overview"){
 const version=c.id==="diego"||c.id==="goku"||dossierForms(c.id).length>1?activeVariant(c.id)+"/":"";
 return "#/"+encodeURIComponent(c.id)+"/"+version+tab;
}
function shell(title,number,content,comment){const c=getRoute().character,v=visualFor(c,activeVariant(c.id));return '<header class="section-head section-cover"><div><div class="kicker">O SISTEMA // DOSSIÊ ATIVO</div><h2>'+e(title)+'</h2><span class="section-context">'+e(v.series)+' / '+e(v.motif)+'</span></div><span class="number">'+e(number)+'</span></header>'+content+(comment?note(comment):"")}
function sourceLink(entry,category){return '<a class="source-link" href="'+url(entry.url)+'" target="_blank" rel="noopener noreferrer"><span><b>'+e(entry.name)+'</b><small>'+e(category||entry.detail||"Referência externa")+'</small></span><i aria-hidden="true">↗</i></a>'}
const worldMarks={cdz:"SANTUÁRIO",undertale:"SUBSOLO","murder-drones":"COPPER 9","digital-circus":"CIRCO DIGITAL","dungeon-meshi":"MASMORRA",zenless:"NEW ERIDU",manhwa:"MANHWA",marvel:"MARVEL / MCU",fate:"FATE / SPIRIT ORIGIN","the-boys":"THE BOYS","one-punch-man":"ONE PUNCH","blue-lock":"BLUE LOCK","kamen-rider":"KAMEN RIDER",konosuba:"KONOSUBA",mushoku:"MUSHOKU TENSEI",wuwa:"WUTHERING WAVES",dmc:"DEVIL MAY CRY",fma:"FULLMETAL",genshin:"GENSHIN IMPACT",witcher:"THE WITCHER",overwatch:"OVERWATCH",umamusume:"TRACEN // UMA",jojo:"JOJO ★",cyberpunk:"NIGHT CITY",hsr:"STAR RAIL",chrysos:"AMPHOREUS",emanator:"STAR RAIL",romcom:"ROMANCE",chainsaw:"CHAINSAW",music:"VOZ // ADO",transformers:"AUTOBOT",jjk:"JUJUTSU",dragonball:"DRAGON BALL",signalis:"SIGNALIS",mha:"HERO ACADEMIA",bleach:"BLEACH","dark-souls":"DARK SOULS III","binding-of-isaac":"ISAAC",shuumatsu:"SHUUMATSU","black-souls":"BLACK SOULS",sekiro:"SEKIRO","tokyo-ghoul":"TOKYO GHOUL"};
const visualFor=(c,key)=>window.T20_VISUAL.forCharacter(c,key);
function visualStyle(v){return '--char-color:'+e(v.accent)+';--art-accent:'+e(v.accent)+';--art-dark:'+e(v.dark)}
function visualAttrs(v){return ' data-art="'+e(v.id)+'" data-layout="'+e(v.layout)+'" data-pattern="'+e(v.pattern)+'" data-family="'+e(v.family)+'" data-finish="'+e(v.finish)+'" data-lineage="'+e(v.lineage)+'" data-variant="'+e(v.variant)+'"'}
const FX_CARD_IDS=new Set(["gyro","jojo-johnny","jojo-valentine","jojo-jonathan","jojo-joseph","jojo-jotaro","jojo-josuke4","jojo-giorno","jojo-jolyne","jojo-gappy","david","d","denji","satoru-gojo","shigaraki","midoriya","em-acheron"]);
function cardEffect(id){
 if(id==="d")return '<div class="capri-hud" aria-hidden="true"><span class="capri-signal">CAPRI // LINK ATIVO</span><span class="capri-screen"><img src="./assets/motifs/capri-hud.webp" alt="" loading="lazy" decoding="async"><img class="capri-gaze" src="./assets/motifs/capri-hud.webp" alt="" loading="lazy" decoding="async"><img class="capri-mouth" src="./assets/motifs/capri-hud.webp" alt="" loading="lazy" decoding="async"></span><span class="capri-laugh">hahaha</span><span class="capri-caption">OLHOS EM VOCÊ</span></div>';
 if(id==="david")return '<div class="psycho-hud" aria-hidden="true"><span class="psycho-echo"></span><span class="psycho-status">NEURAL LINK // INSTÁVEL</span><span class="psycho-error">ERRO DE SINAL</span></div>';
 return "";
}
const cardPortraits={"zzz-remielle":"./assets/card-art/zzz-remielle.webp"};
function card(c,priority="lazy"){
 const forms=dossierForms(c.id);
 const nForms=forms.length;
 const alternate=c.id==="diego"?"2 VERSÕES · SCARY MONSTERS / THE WORLD":c.id==="goku"?"4 VERSÕES · DBZ / GT / DAIMA / SUPER":nForms>1?nForms+" VERSÕES"+(c._cosmos?"":" · "+forms.map(x=>x[1]).join(" / ")):"";
 const mode=catalogModes[c.id]||defaultForm(c.id);
 const shown=mode===defaultForm(c.id)?c:variantByKey(c.id,mode);
 const visual=visualFor(shown,mode);
 const cover=!(c.id==="diego"&&mode==="alternative")?window.T20_CATALOG_COVERS?.[c.id]:null;
 const world=archiveCategory(c);
 const featured=displayedMedia(shown,cover?.image||cardPortraits[shown.id]||shown.portrait.url,(cover?"Capa editorial de ":"Retrato ilustrativo de ")+shown.name,
  {portrait:true,attrs:cover?' data-cover-volume="'+e(cover.volume||"")+'"':"",priority});
 const button='<button type="button" class="roster-card '+e(c.theme)+'" style="'+visualStyle(visual)+'" data-world="'+e(world)+'"'+visualAttrs(visual)+' data-open="'+e(c.id)+'" aria-label="Abrir ficha de '+e(c.name)+(alternate?' · versão '+mode:'')+'">'+
  '<div class="photo">'+portraitUnderlay(shown)+featured+'</div>'+
  '<div class="art-insignia" aria-hidden="true"><span>'+e(visual.motif)+'</span><i></i></div><span class="art-series" aria-hidden="true">'+e(visual.series)+'</span>'+
  (FX_CARD_IDS.has(c.id)?'<div class="character-fx" aria-hidden="true"><i class="fx-a"></i><i class="fx-b"></i><i class="fx-c"></i></div>':"")+cardEffect(c.id)+
  '<span class="card-no">DOSSIÊ // '+e(c.number)+'</span><span class="world-mark" aria-hidden="true">'+e(worldMarks[world]||"O SISTEMA")+'</span><span class="card-topline" aria-hidden="true"></span>'+
  '<div class="card-body"><span class="card-overline">'+e(shown.label)+'</span><h3>'+e(c.name)+'</h3>'+
  (alternate?'<span class="card-versions">'+alternate+'</span>':'')+
  '<p>'+e(shown.info.race)+' · '+e(shown.info.className)+'<br>'+e(shown.universe)+'</p><div class="card-action"><span>ACESSAR FICHA</span><b aria-hidden="true">↗</b></div></div></button>';
 if(!alternate)return button;
 const shortLabels={"principal":"Base","alma-de-ouro":"SoG","episodio-g":"Ep.G","lenda":"Lenda","saintia-sho":"Shô","lost-world":"LW","time-odyssey":"TO","grande-mestre":"Mestre","armadura-classica":"Clássico","assassin":"GA","requiem":"GR"};
 const options=c.id==="diego"?[["normal","SM"],["alternative","TW"]]:c.id==="goku"?[["z","DBZ"],["gt","GT"],["daima","DAIMA"],["super","SUPER"]]:variants(c.id).map(([key,label])=>[key,label]);
 return '<div class="roster-entry'+(world==="fate"?" fate-entry":"")+'">'+button+'<div class="card-variant-switch" role="group" aria-label="Versões de '+e(c.name)+'">'+options.map(([key,label])=>'<button type="button" data-card-switch="'+e(c.id)+'" data-card-mode="'+e(key)+'" aria-pressed="'+(mode===key)+'" aria-label="Visualizar '+e(c.name)+' · '+e(c.id==="diego"?(key==="normal"?"Scary Monsters":"The World"):label)+'">'+e(c._cosmos?shortLabels[key]||label:label)+'</button>').join("")+'</div></div>';
}
function plannedCard(c){
 const v=visualFor(c,"principal");
 return '<button type="button" class="roster-card planned-card" style="'+visualStyle(v)+'" data-world="'+e(archiveCategory(c))+'"'+visualAttrs(v)+' data-open="'+e(c.id)+'" data-pending="true" aria-label="Abrir planejamento de '+e(c.name)+'">'+
  '<div class="photo pending-photo"><div class="pending-poster" role="img" aria-hidden="true" aria-label="Pôster reserva de '+e(c.name)+'"><small>ARTE EM RECUPERAÇÃO / '+e(c.number)+'</small><strong>'+e(c.name)+'</strong><span>'+e(c.universe)+'</span></div>'+image(c.portrait,"Arte de referência de "+c.name,"planned-art")+'</div>'+
  '<div class="art-insignia" aria-hidden="true"><span>'+e(v.motif)+'</span><i></i></div><span class="art-series" aria-hidden="true">'+e(v.series)+'</span>'+
  '<span class="card-no">DOSSIÊ // '+e(c.number)+'</span><span class="world-mark" aria-hidden="true">'+e(worldMarks[archiveCategory(c)]||c.universe)+'</span>'+
  '<div class="card-body"><span class="card-overline">BUILD T20 PROPOSTA / EM REVISÃO</span><h3>'+e(c.name)+'</h3><span class="card-versions symbolic">ARTE REFERENCIADA · REGRAS PENDENTES</span><p>'+e(c.universe)+'<br>Progressão 1–12 preenchida para revisão</p><div class="card-action"><span>VER ADAPTAÇÃO T20</span><b aria-hidden="true">↗</b></div></div></button>';
}
function listView(){document.body.removeAttribute("data-theme");document.body.removeAttribute("data-world");document.body.removeAttribute("data-art");document.body.removeAttribute("data-family");document.body.removeAttribute("data-pattern");document.body.removeAttribute("data-finish");document.body.removeAttribute("data-lineage");document.body.removeAttribute("data-variant");document.body.style?.removeProperty?.("--char-color");document.body.style?.removeProperty?.("--art-accent");document.body.style?.removeProperty?.("--art-dark");document.title="O Sistema // T20 — Arquivo de Fichas";root.innerHTML=
'<div class="container"><section class="landing-hero" aria-label="Arquivo de personagens"><div class="hero-copy-main"><div class="kicker">O SISTEMA / VOLUME 01 / ACERVO MULTIVERSAL</div><h1><span>'+String(catalog.length)+' HISTÓRIAS.</span><br><em>UM ARQUIVO.</em></h1><p>Explore ' +String(catalog.length)+ ' fichas T20, com JoBros de 1–8, The Boys e 98 Servos de Fate, além de 57 Umas e 16 crossovers: multiclasse, atributos, poderes escolhidos, equipamentos, explicações e progressão 1–12. Sujeitas à edição adotada e revisão da mesa.</p><div class="hero-ctas"><button type="button" class="hero-enter" data-scroll-roster>EXPLORAR OS '+String(catalog.length)+' DOSSIÊS <span aria-hidden="true"></span></button><a href="#/arquivo" class="hero-review">FONTES & DECISÕES ↗</a></div></div><div class="hero-mark" aria-hidden="true"><span class="hero-mark-number">01 / '+String(catalog.length).padStart(2,"0")+'</span><strong>OS<span>∕</span>T20</strong><span class="hero-mark-strip">FATE · JOJO · THE BOYS<br>KAMEN RIDER · BLUE LOCK · UMAMUSUME</span></div><div class="hero-bottomline" aria-hidden="true">ARQUIVO // REGRAS EM REVISÃO <span>◇ ◆ ◇ ◆ ◇</span> NÍVEIS 01—12</div></section>'+
'<div class="stats-strip"><div class="mini-stat"><strong>'+String(catalog.length).padStart(2,"0")+'</strong><span>DOSSIÊS<br>NO ARQUIVO</span></div><div class="mini-stat"><strong>'+String(data.characters.reduce((n,c)=>n+variants(c.id).length,0)).padStart(2,"0")+'</strong><span>VERSÕES T20<br>EXISTENTES</span></div><div class="mini-stat"><strong>'+String((window.T20_AUTOMATIC?.ids.size||planned.length)+(window.T20_UMA?.count||0)+(window.T20_CROSSOVERS?.count||0)+(window.T20_WAVE7?.count||0)).padStart(2,"0")+'</strong><span>FICHAS<br>AUTOMÁTICAS</span></div><div class="mini-stat"><strong>12</strong><span>NÍVEIS<br>NAS BUILDS</span></div></div><div class="review-callout"><div><span class="kicker">CONTROLE EDITORIAL // SEM APROVAÇÕES AUTOMÁTICAS</span><h2>Regras em revisão</h2><p>As adaptações do repositório são rascunhos até que páginas, custos e pré-requisitos sejam conferidos. Registre fontes e decisões para manter o histórico da mesa.</p></div><a class="sys-button primary" href="#/arquivo">ABRIR PAINEL DE REVISÃO</a></div>'+
'<section aria-labelledby="roster-title" id="catalogo"><div class="list-toolbar"><div><div class="corner-label">SISTEMA DE IDENTIFICAÇÃO // SELEÇÃO</div><h2 id="roster-title">ARQUIVO DE PERSONAGENS</h2></div><div class="filters"><div class="search-field"><label class="filter-label" for="search">PESQUISAR FICHAS</label><div class="search-field-inner"><span class="search-magnifier" aria-hidden="true">⌕</span><input class="search-input" id="search" type="search" placeholder="Nome, personagem, classe ou universo..." autocomplete="off" enterkeyhint="search" value="'+e(search)+'"><button type="button" class="clear-search" data-clear-search aria-label="Limpar pesquisa" title="Limpar pesquisa">LIMPAR ×</button></div></div><div class="filter-field"><label class="filter-label" for="universe">FILTRAR POR UNIVERSO</label><select class="filter-select" id="universe"><option value="all">Todos os universos</option>'+universeOptions.map(([value,label])=>'<option value="'+e(value)+'">'+e(label)+'</option>').join("")+'</select></div></div></div><div class="catalog-meta"><span id="resultsCount" role="status" aria-live="polite"></span><span class="catalog-sort-label">⇅ ORDEM ALFABÉTICA · A–Z</span></div><div class="roster-grid" id="roster" aria-live="polite"></div><div class="archive-pagination" id="archivePagination"></div></section>'+
'<div class="rule-note"><b>O SISTEMA //</b><span>O acervo reúne os JoBros, o núcleo de The Boys e 98 Servos principais de Fate com 50 formas alternativas, além de 16 crossovers, 57 Umas e 69 fichas históricas. Dez builds geradas automaticamente a partir de presets auditáveis, inclusive multiclasses. PV/PM são subtotais das regras cadastradas; equipamentos, magias e decisões da mesa devem ser conferidos.</span></div></div>';
root.querySelector?.(".hero-ctas")?.insertAdjacentHTML("beforeend",'<a class="hero-review" href="#/laboratorio">LABORATÓRIO DE BUILDS</a><a class="hero-review" href="#/atlas">ATLAS MULTIVERSAL</a>');
const input=document.getElementById("search"),select=document.getElementById("universe");input.value=search;select.value=universe;updateCards();lastRoute="library"}
function pagination(){
 const holder=document.getElementById("archivePagination");if(!holder)return;
 const rest=matchingCards.length-visibleCount;
 holder.innerHTML=rest>0?'<button type="button" class="sys-button" data-load-more>CARREGAR MAIS '+Math.min(PAGE_SIZE,rest)+' DOSSIÊS</button><small>'+visibleCount+' / '+matchingCards.length+' exibidos</small>':'';
 if(loadObserver)loadObserver.disconnect();
 if(rest>0&&typeof IntersectionObserver==="function"){
  if(!loadObserver)loadObserver=new IntersectionObserver(entries=>{
   if(entries.some(x=>x.isIntersecting))appendNextCards()
  },{rootMargin:"150px"});
  loadObserver.observe(holder);
 }
}
function appendNextCards(){
 const slot=document.getElementById("roster");
 if(!slot||visibleCount>=matchingCards.length)return;
 const next=matchingCards.slice(visibleCount,visibleCount+PAGE_SIZE);
 const html=next.map(c=>c.status==="pendente"?plannedCard(c):card(c,"lazy")).join("");
 if(typeof slot.insertAdjacentHTML==="function")slot.insertAdjacentHTML("beforeend",html);
 else slot.innerHTML+=html;
 visibleCount+=next.length;pagination();
}
function updateCards(){
 const slot=document.getElementById("roster");if(!slot)return;
 const words=normalizeSearch(search).split(" ").filter(Boolean);
 const matches=catalog.filter(c=>{
  const cat=archiveCategory(c);
  const categoryOK=universe==="all"||universe===cat||(universe==="hsr"&&["chrysos","emanator"].includes(cat));
  if(!categoryOK)return false;
  const terms=archiveTerms(c);
  return words.every(word=>terms.includes(word));
 }).sort((a,b)=>collator.compare(a.name,b.name)||collator.compare(a.universe,b.universe)||collator.compare(a.id,b.id));
 matchingCards=matches;
 visibleCount=Math.min(visibleCount,matches.length);
 slot.innerHTML=matches.length?matches.slice(0,visibleCount).map((c,i)=>c.status==="pendente"?plannedCard(c):card(c,i<4?"eager":"lazy")).join(""):'<div class="empty-state">NENHUM DOSSIÊ ENCONTRADO // Experimente outro nome ou selecione Todos os universos.</div>';
 const count=document.getElementById("resultsCount");
 if(count)count.textContent=String(matches.length).padStart(2,"0")+" DE "+String(catalog.length).padStart(2,"0")+" DOSSIÊS EXIBIDOS";
 const clear=document.querySelector?.("[data-clear-search]");
 if(clear){clear.disabled=!search;clear.setAttribute("aria-hidden",search?"false":"true")}
 pagination();
}

function cover(c){const v=visualFor(c,activeVariant(c.id));return '<section class="detail-hero" aria-labelledby="character-title"><div class="hero-watermark" aria-hidden="true">'+icon(c.symbol)+'</div><div class="dossier-ornament" aria-hidden="true">'+e(v.motif)+'</div><div class="hero-copy"><div class="kicker">DOSSIÊ '+e(c.number)+' // '+e(c.label)+'</div><span class="dossier-series">'+e(v.series)+' <b>◆</b> '+e(c.universe)+'</span><h1 id="character-title">'+e(c.name)+'</h1><p>'+e(c.excerpt)+'</p><div class="hero-chips"><span class="chip strong">NÍVEL INICIAL 01</span><span class="chip">'+e(c.info.race)+'</span><span class="chip">'+e(c.info.className)+'</span></div></div><div class="hero-portrait">'+portraitUnderlay(c)+displayedMedia(c,c.portrait.url,"Referência de "+c.name,{portrait:true})+'</div><div class="dossier-foot" aria-hidden="true"><span>O SISTEMA / '+e(c.number)+'</span><span>'+e(v.motif)+' // '+e(activeVariant(c.id).toUpperCase())+'</span></div></section>'}
function quickStats(c){
 const v=statFor(c,selectedLevel);
 return '<div class="detail-meta" aria-label="Estatísticas do nível selecionado">'+[
 ["PV",v.pv],["PM",v.pm],["DEFESA",v.defense],["MOVIMENTO",v.move]
 ].map(([k,n])=>'<div class="meta-tile"><small>'+e(k)+' // NÍVEL <span data-stat-level>'+String(selectedLevel).padStart(2,"0")+'</span></small><b data-stat="'+e(k)+'">'+e(n)+'</b></div>').join("")+'</div>';
}
function mediaGallery(c){return '<div class="media-grid">'+c.media.map(m=>'<article class="media-card"><div class="media-photo">'+displayedMedia(c,m.image,m.name)+'</div><div class="media-caption"><strong>'+e(m.name)+'</strong><small>'+e(m.credit)+'</small><a href="'+url(m.source)+'" target="_blank" rel="noopener noreferrer">VER ORIGEM DA IMAGEM ↗</a></div></article>').join("")+'</div>'}
function overview(c){const info=[["Raça",c.info.race],["Classe",c.info.className],["Origem",c.info.origin],["Divindade",c.info.devotion],["Função",c.info.role],["Companheiro",c.info.partner]];return shell("Identidade e história","01 / DOSSIÊ",'<div class="section-grid"><article class="panel prose"><div class="panel-title">REGISTRO DE PERSONAGEM</div><h3>'+e(c.name)+'</h3>'+c.history.map(p=>"<p>"+e(p)+"</p>").join("")+'<div class="panel-title" style="margin-top:23px">PROPOSTA DE ADAPTAÇÃO</div><p>'+e(c.summary)+'</p></article><aside class="panel"><div class="panel-title">IDENTIFICAÇÃO DE SISTEMA</div><div class="bio-grid">'+info.map(([k,v])=>'<div class="bio-item"><small>'+e(k.toUpperCase())+'</small><strong>'+e(v)+'</strong></div>').join("")+'</div></aside></div><div class="section-head"><div><div class="kicker">ARQUIVO FOTOGRÁFICO</div><h2>Referências visuais</h2></div></div>'+mediaGallery(c),c.notes.overview)}
function radar(c){const cx=180,cy=165,maxR=112,keys=c.attrs.map(a=>({...a,value:a.value+attrDelta(c,selectedLevel,a.key)}));const pos=(i,r)=>{const theta=(-90+i*60)*Math.PI/180;return [cx+Math.cos(theta)*r,cy+Math.sin(theta)*r]};const pts=(r)=>keys.map((a,i)=>pos(i,r)).map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ");const grid=[1,2,3,4,5].map(n=>'<polygon class="radar-grid" points="'+pts(n*maxR/5)+'"/>').join("");const axes=keys.map((a,i)=>{const [x,y]=pos(i,maxR);return '<line class="radar-axis" x1="'+cx+'" y1="'+cy+'" x2="'+x+'" y2="'+y+'"/>'}).join("");const dataPoints=keys.map((a,i)=>pos(i,Math.min(5,Math.max(0,a.value))*maxR/5));const poly=dataPoints.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ");const dots=dataPoints.map(p=>'<circle class="radar-node" cx="'+p[0]+'" cy="'+p[1]+'" r="4"/>').join("");const labels=keys.map((a,i)=>{const [x,y]=pos(i,141);return '<text class="radar-label" x="'+x+'" y="'+(y-4)+'" text-anchor="middle">'+e(a.key)+'</text><text class="radar-value" x="'+x+'" y="'+(y+13)+'" text-anchor="middle">+'+a.value+'</text>'}).join("");return '<svg class="radar-svg" viewBox="0 0 360 335" role="img" aria-label="Radar de atributos CON, CAR, SAB, INT, FOR e DEX"><g>'+grid+axes+'<polygon class="radar-data" points="'+poly+'"/>'+dots+labels+'</g></svg>'}
function attributes(c){const total=c.attrs.reduce((sum,a)=>sum+(a.buy===3?4:a.buy===2?2:a.buy===1?1:a.buy===0?0:0),0);return shell("Atributos iniciais","02 / CONFIGURAÇÃO",'<div class="section-grid"><div class="panel"><div class="panel-title">ANÁLISE HEXAGONAL // '+e(visualFor(c,activeVariant(c.id)).motif)+'</div><div class="radar-zone"><div id="attrRadar">'+radar(c)+'</div><div class="attr-list">'+c.attrs.map(a=>'<div class="attr-row"><strong>'+e(a.key)+'</strong><span>'+e(a.why)+'</span><b data-current-attr="'+e(a.key)+'">+'+(a.value+attrDelta(c,selectedLevel,a.key))+'</b></div>').join("")+'</div></div><p style="font-size:12px;color:var(--faint);margin:4px 0 0">Gráfico ilustrativo de modificadores, escala de 0 a +5; não representa uma nova regra de Tormenta20.</p></div><div class="panel"><div class="panel-title">COMPRA DE ATRIBUTOS // NÍVEL 01</div><table class="attr-breakdown"><thead><tr><th>ATR.</th><th>COMPRA</th><th>RAÇA</th><th>FINAL</th></tr></thead><tbody>'+c.attrs.map(a=>'<tr><td>'+e(a.key)+'</td><td>+'+a.buy+'</td><td>'+(a.race?'+'+a.race:'—')+'</td><td class="highlight">+'+a.value+'</td></tr>').join("")+'</tbody></table><p style="font:12px var(--mono);color:var(--muted);margin:14px 0">Pontos investidos na compra: '+total+'/10. Bônus raciais já incorporados.</p><div class="panel-title" style="margin-top:17px">ATRIBUTOS DERIVADOS // INÍCIO</div><div class="stat-tiles">'+[["PV",c.stats.pv],["PM",c.stats.pm],["DEF",c.stats.defense],["MOV",c.stats.speed]].map(([k,v])=>'<div class="stat-panel"><small>'+k+'</small><b>'+e(v)+'</b></div>').join("")+'</div></div></div>',c.notes.attributes)}
function equipment(c){return shell("Equipamentos","03 / INVENTÁRIO",'<div class="gear-grid">'+c.gear.map((g,i)=>'<details class="gear-card" '+(i===0?"open":"")+'><summary><div class="gear-thumb">'+(g.image?displayedMedia(c,g.image,g.name):e(String(i+1).padStart(2,"0")))+'</div><div class="gear-title"><strong>'+e(g.name)+'</strong><small>'+e(g.rule)+'</small></div><span class="gear-chevron" aria-hidden="true">›</span></summary><div class="gear-details"><span class="gear-quantity">QTD // '+e(g.qty)+'</span><p>'+e(g.detail)+'</p>'+(g.source?'<a href="'+url(g.source)+'" target="_blank" rel="noopener noreferrer">REFERÊNCIA VISUAL: '+e(g.credit||g.source)+' ↗</a>':"")+'</div></details>').join("")+'</div><div class="section-head"><div><div class="kicker">ARMAMENTO</div><h2>Ataques iniciais</h2></div></div><div class="attack-grid">'+c.attacks.map(a=>'<article class="attack-card"><h3>'+e(a.name)+'</h3><div class="attack-numbers"><div><small>ATAQUE / TESTE</small><b>'+e(a.test)+'</b></div><div><small>DANO</small><b>'+e(a.damage)+'</b></div><div><small>GASTO</small><b>'+e(a.cost)+'</b></div></div><p>'+e(a.detail)+'</p></article>').join("")+'</div>',c.notes.equipment)}
function abilities(c){
 const basics=guideFor(c).basics||[];
 return shell("Habilidades e perícias","04 / REPERTÓRIO",
 '<div class="section-grid"><div class="panel"><div class="panel-title">HABILIDADES NA CRIAÇÃO</div><h3>Recursos iniciais</h3><ul class="bullets">'+c.initial.map(x=>'<li>'+e(x)+'</li>').join("")+'</ul></div><div class="panel"><div class="panel-title">FUNÇÃO E ESTRATÉGIA</div><h3>Como utilizar a build</h3><p>'+e(c.summary)+'</p></div></div>'+
 '<div class="section-head"><div><div class="kicker">MANUAL DE CAMPO</div><h2>Por que e como usar?</h2></div></div>'+
 '<div class="ability-guide">'+basics.map(g=>'<details class="ability-detail" open><summary><strong>'+e(g.name)+'</strong><span>LER INSTRUÇÕES ⌄</span></summary>'+guidePanel(g)+'</details>').join("")+'</div>'+
 '<div class="section-head"><div><div class="kicker">ADQUIRIDAS ATÉ O NÍVEL ESCOLHIDO</div><h2>Habilidades desbloqueadas</h2></div></div>'+
 '<div id="abilitiesUnlocked" class="ability-guide" aria-live="polite"></div>'+
 '<div class="section-head"><div><div class="kicker">TREINAMENTO // NÍVEL ATUAL</div><h2>Perícias atualizadas</h2></div></div>'+
 '<p class="derived-note">Os bônus abaixo incluem metade do nível, treinamento (+2 até o 6º e +4 do 7º ao 12º) e ajustes permanentes indicados. Bônus situacionais precisam ser aplicados durante a partida.</p>'+
 '<div class="skill-grid" id="skillGrid">'+c.skills.map((entry,i)=>'<div class="skill-item"><strong>'+e(entry[0])+'</strong><b data-skill="'+i+'">'+skillFor(c,entry,selectedLevel)+'</b><small>'+e(entry[2])+'</small></div>').join("")+'</div><div id="skillsAdditional"></div>',
 c.notes.abilities);
}
function classReview(c){
 const r=c._classRevision;
 if(!r)return "";
 const origin=r.chosenVariant?"Heróis de Arton v1.1 — variante "+r.chosenVariant:"Jogo do Ano v1.3 — classe original";
 const link=r.chosenVariant?"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/":"https://jamboeditora.com.br/produto/tormenta20-edicao-jogo-do-ano/";
 const audit=r.chosenVariant?"As habilidades automáticas seguem a tabela da variante; poderes selecionáveis do plano anterior precisam ser revalidados.":"Classe original mantida e reavaliada. Nenhuma variante foi forçada nesta ficha.";
 return '<section class="panel archive-class-audit"><div class="panel-title">FASE IV // CLASSE, SUBCLASSE E VERIFICAÇÃO</div>'+
  '<h3>'+e(r.currentClass)+'</h3><p>'+e(r.goal)+'. '+e(r.decision)+'</p>'+
  '<p><b>Regra de referência:</b> <a href="'+url(link)+'" target="_blank" rel="noopener noreferrer">'+e(origin)+(r.source?.pages?' · p. '+e(r.source.pages):"")+'</a></p>'+
  '<p><b>Limite:</b> '+e(r.risk)+'. '+e(audit)+'</p>'+
  '<p class="derived-note">PV, PM, Defesa, ataque e equipamentos exibidos continuam valores legados até conferência mecânica individual. O guia foi revisto, mas a ficha não está aprovada para mesa automaticamente.</p>'+
  '<a class="ref-link" href="#/laboratorio/'+encodeURIComponent(c.id)+'">ABRIR ESTA BUILD NO LABORATÓRIO // REVISAR OS 12 NÍVEIS</a></section>';
}
function progression(c){
 const lvl=selectedLevel;
 return shell("Progressão real","05 / EVOLUÇÃO",
 '<div class="level-bar"><label for="levelSelect">NÍVEL<br>DA FICHA</label><b id="selectedLevel">'+String(lvl).padStart(2,"0")+'</b><input aria-label="Selecionar nível do personagem" id="levelSelect" type="range" min="1" max="12" step="1" value="'+lvl+'"><span class="cap">01 ↔ 12</span></div>'+
 '<div id="progressStats">'+selectedMetrics(c,lvl)+'</div>'+classReview(c)+
 '<div class="section-head"><div><div class="kicker">NÍVEL SELECIONADO</div><h2>Como jogar agora</h2></div></div>'+
 '<article id="levelReadout" class="selected-guide" aria-live="polite">'+levelPanel(c,lvl)+'</article>'+
 '<div class="section-head"><div><div class="kicker">DESBLOQUEIOS POR NÍVEL</div><h2>Árvore de evolução</h2></div></div>'+
 '<div class="level-grid" id="levelGrid">'+c.progression.map(([level,power,desc],i)=>'<div class="level-item" data-level="'+e(level)+'"><div class="level-id">'+e(String(level).padStart(2,"0"))+'</div><div><strong>'+e(power)+'</strong><p>'+e(desc)+'</p></div><details class="level-entry"><summary>Por que escolher? Como usar? Onde está no livro?</summary>'+guidePanel(guideFor(c).levels[i]||{})+'</details></div>').join("")+'</div>',
 c.notes.progression);
}
function techniques(c){return shell("Técnicas especiais","06 / MATRIZ DE COMBATE",'<div class="tech-grid">'+c.techniques.map(t=>'<article class="tech-card"><div class="tech-meta"><span>NÍVEL '+String(t.level).padStart(2,"0")+'</span><span>GASTO // '+e(t.cost)+'</span></div><h3>'+e(t.name)+'</h3><div class="mechanic">REGRA BASE: '+e(t.mechanic)+'</div><p>'+e(t.effect)+'</p><em>'+e(t.flavor)+'</em></article>').join("")+'</div>',c.notes.techniques)}
function sources(c){
 const books=Object.values(guides.books||{}).map(b=>sourceLink({name:b.name,url:b.url,detail:b.edition},"Fonte de regras"));
 const media=c.sources.map(s=>sourceLink(s,"Origem / personagem"));
 const images=[c.portrait,...c.media.map(m=>({url:m.image,credit:m.credit,page:m.source}))].map(m=>({name:m.credit,url:m.page}));
 const references=c.progression.map(([lvl,power],i)=>'<div class="source-level"><strong>Nível '+e(lvl)+' · '+e(power)+'</strong><div class="source-level-refs">'+referenceLinks(guideFor(c).levels[i]?.ref||[])+'</div></div>').join("");
 return shell("Fontes e páginas","07 / BIBLIOTECA",
 '<p class="derived-note">'+e(guides.instructions||"As páginas dependem da edição usada pela mesa.")+'</p>'+
 '<div class="section-grid equal"><div class="panel"><div class="panel-title">LIVROS E SUPLEMENTOS</div><div class="source-list">'+books.join("")+'</div></div><div class="panel"><div class="panel-title">OBRAS E REFERÊNCIAS</div><div class="source-list">'+media.join("")+'</div></div></div>'+
 '<div class="section-head"><div><div class="kicker">ÍNDICE DA BUILD</div><h2>Página de cada poder</h2></div></div>'+
 '<div class="source-index">'+references+'</div>'+
 '<div class="section-head"><div><div class="kicker">ARTE & COPYRIGHT</div><h2>Créditos de imagens</h2></div></div>'+
 '<div class="source-list">'+images.map(m=>sourceLink(m,"Proveniência da imagem · titularidade dos criadores")).join("")+'</div>'+
 '<div class="rule-note"><b>AVISO //</b><span>Verifique a mesma edição dos livros e as erratas aplicáveis. Os efeitos resumidos não substituem a descrição integral. Quando a página exata não foi confirmada, o catálogo indica capítulo e verbete, sem inventar número de página.</span></div>',
 "As regras detalhadas estão nos livros oficiais. Nomes de técnicas de outros universos são somente interpretação narrativa.");
}
function variantOptions(id,active){return variants(id).map(([key,label])=>'<option value="'+e(key)+'" '+(key===active?'selected':'')+'>'+e(label)+'</option>').join("")}
function compareTable(c,aKey,bKey,aLevel,bLevel){
 const a=variantByKey(c.id,aKey),b=variantByKey(c.id,bKey),as=statFor(a,aLevel),bs=statFor(b,bLevel);
 const rows=[["Classe",a.info.className,b.info.className],["PV",as.pv,bs.pv],["PM",as.pm,bs.pm],["Defesa",as.defense,bs.defense],["Movimento",as.move,bs.move],["Ataque base",as.attack||"—",bs.attack||"—"],["Dano base",as.damage||"—",bs.damage||"—"],["Recurso do nível",a.progression[aLevel-1]?.[1]||"Pendente",b.progression[bLevel-1]?.[1]||"Pendente"]];
 return '<div class="compare-scroll"><table class="compare-table"><thead><tr><th>CAMPO</th><th>'+e(a.name)+' · NÍVEL '+e(aLevel)+'</th><th>'+e(b.name)+' · NÍVEL '+e(bLevel)+'</th></tr></thead><tbody>'+rows.map(([label,left,right])=>'<tr class="'+(String(left)===String(right)?'':'changed')+'"><th>'+e(label)+'</th><td>'+e(left)+'</td><td>'+e(right)+'</td></tr>').join("")+'</tbody></table></div><div class="compare-guides"><article><span>VERSÃO A · NÍVEL '+e(aLevel)+'</span><h3>'+e(a.progression[aLevel-1]?.[1]||"Pendente")+'</h3>'+guidePanel(guideFor(a).levels[aLevel-1]||{})+'</article><article><span>VERSÃO B · NÍVEL '+e(bLevel)+'</span><h3>'+e(b.progression[bLevel-1]?.[1]||"Pendente")+'</h3>'+guidePanel(guideFor(b).levels[bLevel-1]||{})+'</article></div>';
}
function compare(c){const versions=variants(c.id),current=activeVariant(c.id),other=versions.find(v=>v[0]!==current)?.[0]||current;return shell("Comparar versões e níveis","08 / ANÁLISE",'<p class="derived-note">Compare os valores que já constam das fichas. Diferenças destacadas não confirmam que uma escolha esteja aprovada para a mesa.</p><div class="compare-controls"><label>VERSÃO A<select id="compareA">'+variantOptions(c.id,current)+'</select></label><label>NÍVEL A<select id="compareLevelA">'+Array.from({length:12},(_,i)=>'<option value="'+(i+1)+'" '+(i+1===selectedLevel?'selected':'')+'>'+(i+1)+'</option>').join("")+'</select></label><label>VERSÃO B<select id="compareB">'+variantOptions(c.id,other)+'</select></label><label>NÍVEL B<select id="compareLevelB">'+Array.from({length:12},(_,i)=>'<option value="'+(i+1)+'" '+(i+1===(versions.length>1?selectedLevel:12)?'selected':'')+'>'+(i+1)+'</option>').join("")+'</select></label></div><div id="comparison">'+compareTable(c,current,other,selectedLevel,versions.length>1?selectedLevel:12)+'</div>',"As variantes de Diego e Goku são fichas independentes no mesmo dossiê. A comparação usa apenas os dados registrados no projeto.")}
function refreshComparison(){const c=getRoute().character;if(!c)return;const el=document.getElementById("comparison");if(el)el.innerHTML=compareTable(c,document.getElementById("compareA").value,document.getElementById("compareB").value,levelClamp(document.getElementById("compareLevelA").value),levelClamp(document.getElementById("compareLevelB").value))}
function reviewForm(c){const options=['<option value="geral">Projeto inteiro</option>',...catalog.slice().sort((a,b)=>collator.compare(a.name,b.name)).map(x=>'<option value="'+e(x.id)+'" '+(x.id===c?.id?'selected':'')+'>'+e(x.name)+'</option>')].join("");return '<form id="reviewForm" class="review-form"><div class="panel-title">NOVO REGISTRO · STATUS INICIAL PENDENTE</div><div class="review-form-grid"><label>TIPO<select name="type">'+window.T20_REVIEW.types.map(t=>'<option value="'+e(t)+'">'+e(t.toUpperCase())+'</option>').join("")+'</select></label><label>FICHA<select id="reviewCharacter" name="character">'+options+'</select></label><label>VERSÃO<select id="reviewVariant" name="variant">'+(c?variantOptions(c.id,activeVariant(c.id)):'<option value="principal">Projeto inteiro</option>')+'</select></label><label>TÍTULO<input name="title" maxlength="160" required placeholder="Ex.: conferir custo de PM"></label><label class="wide">DESCRIÇÃO<textarea name="body" rows="3" maxlength="2000" required placeholder="O que a mesa decidiu ou ainda precisa verificar?"></textarea></label><label>URL DA FONTE<input name="url" type="url" placeholder="https://…"></label><label>PÁGINA / VERBETE<input name="page" maxlength="100" placeholder="Somente se verificado"></label></div><button class="sys-button primary" type="submit">SALVAR REGISTRO</button></form>'}
function reviewItems(c){const all=window.T20_REVIEW.list();const items=c?all.filter(r=>r.character===c.id&&r.variant===activeVariant(c.id)):all;return items.length?items.map(r=>'<article class="review-entry"><div class="review-entry-head"><span>'+e(r.type.toUpperCase())+' · '+e(r.status.toUpperCase())+'</span><time datetime="'+e(r.createdAt)+'">'+e(r.createdAt.slice(0,10))+'</time></div><h3>'+e(r.title)+'</h3><p>'+e(r.body)+'</p><div class="review-entry-foot"><small>'+e(r.character==='geral'?'Projeto':catalog.find(x=>x.id===r.character)?.name||r.character)+' · '+e(r.variant)+(r.page?' · '+e(r.page):'')+'</small>'+(r.url?'<a href="'+url(r.url)+'" target="_blank" rel="noopener noreferrer">ABRIR FONTE</a>':'')+'<button type="button" data-review-status="'+e(r.id)+'">'+(r.status==='pendente'?'MARCAR APROVADO':'REABRIR')+'</button><button type="button" data-review-remove="'+e(r.id)+'">EXCLUIR</button></div></article>').join(""):'<p class="derived-note">Nenhum registro nesta seleção. As fichas continuam pendentes até a conferência e o registro das decisões.</p>'}
function review(c){const refs=(guideFor(c).levels||[]).filter(x=>x.ref?.length).length;return shell("Fontes, decisões e correções","09 / CONTROLE EDITORIAL",'<div class="review-intro"><div><span class="kicker">'+e(c.name)+' · '+e(activeVariant(c.id).toUpperCase())+'</span><h3>Conferência pendente</h3><p>'+refs+' níveis têm referências indicadas no arquivo. A página e a regra devem ser conferidas na edição usada pela mesa antes de aprovar a build.</p></div><a class="sys-button" href="#/arquivo">PAINEL DO PROJETO</a></div>'+reviewForm(c)+'<div class="section-head"><div><div class="kicker">HISTÓRICO LOCAL // '+e(c.name.toUpperCase())+'</div><h2>Registros desta versão</h2></div></div><div id="reviewRecords" class="review-records">'+reviewItems(c)+'</div>',"Registros são salvos neste navegador. Exporte o arquivo JSON pelo painel do projeto para guardar ou compartilhar a revisão.")}
function reviewBoard(){document.body.removeAttribute("data-theme");document.body.removeAttribute("data-world");document.body.removeAttribute("data-art");document.body.removeAttribute("data-family");document.body.removeAttribute("data-pattern");document.body.removeAttribute("data-finish");document.body.removeAttribute("data-lineage");document.body.removeAttribute("data-variant");document.body.style?.removeProperty?.("--char-color");document.body.style?.removeProperty?.("--art-accent");document.body.style?.removeProperty?.("--art-dark");document.title="Revisão // O Sistema · T20";const queue=catalog.slice().sort((a,b)=>collator.compare(a.name,b.name));root.innerHTML='<div class="container review-board"><a class="back-link" href="#/">← VOLTAR AO CATÁLOGO</a><header class="review-heading"><span class="kicker">O SISTEMA // ARQUIVO DE REVISÃO</span><h1>REGRAS SOB CONTROLE.</h1><p>Registre a fonte, o verbete e a decisão de cada adaptação. Todas as fichas existentes entram como pendentes; a aprovação exige uma conferência explícita da mesa.</p><div class="review-heading-actions"><button type="button" class="sys-button" data-review-export>EXPORTAR JSON</button><label class="sys-button review-import">IMPORTAR JSON<input id="reviewImport" type="file" accept="application/json,.json" hidden></label></div><small>Registros armazenados neste navegador. A exportação é o backup transferível.</small></header><div class="review-columns"><section><div class="section-head"><div><div class="kicker">FILA DE CONFERÊNCIA</div><h2>Fichas e variantes</h2></div></div><div class="review-queue">'+queue.map(c=>'<a href="'+linkFor(c,'review')+'"><span><strong>'+e(c.name)+'</strong><small>'+e(c.universe)+' · '+(c.status==='pendente'?'PLANEJAMENTO':variants(c.id).length+' versão'+(variants(c.id).length>1?'ões':''))+'</small></span><b>'+e(c.status==='pendente'?'PLANEJADO':'PENDENTE')+'</b></a>').join("")+'</div></section><section><div class="section-head"><div><div class="kicker">HISTÓRICO DE TRABALHO</div><h2>Fontes e decisões</h2></div></div><p class="derived-note">Registre fontes, regras, decisões, pendências e correções. Cada anotação nasce pendente e só muda para aprovada por ação explícita.</p>'+reviewForm(null)+'<div id="reviewRecords" class="review-records">'+reviewItems(null)+'</div></section></div></div>';lastRoute="board"}
function updateReviewVariants(){const id=document.getElementById('reviewCharacter')?.value;const select=document.getElementById('reviewVariant');if(select)select.innerHTML=id==='geral'?'<option value="principal">Projeto inteiro</option>':variantOptions(id,activeVariant(id))}
function specialHUD(c){
 const forms=dossierForms(c.id);
 if(forms.length>1){
  const current=activeVariant(c.id),fate=c.catalogCategory==="fate";
  const marker=fate?"fate":"form";
  const title=fate?"FATE // CLASSE DO SERVO · FORMA ATIVA":c.id==="vegeta"?"REALIDADE // DRAGON BALL":"CONTINUIDADE // EDIÇÃO DO DOSSIÊ";
  return '<nav class="goku-switch fate-switch" aria-label="Selecionar forma de '+e(c.name)+'"><span>'+e(title)+'</span><div>'+forms.map(([key,label])=>'<button type="button" data-'+marker+'-mode="'+e(key)+'" data-'+marker+'-character="'+e(c.id)+'" aria-pressed="'+(current===key)+'">'+e(label)+'</button>').join("")+'</div></nav>';
 }
 if(c.id==="goku"){
  const modes=[["z","DBZ"],["gt","GT"],["daima","DAIMA"],["super","SUPER"]];
  return '<nav class="goku-switch" aria-label="Selecionar universo de Goku"><span>REALIDADE // DRAGON BALL</span><div>'+modes.map(([id,label])=>'<button type="button" data-goku-mode="'+id+'" aria-pressed="'+(gokuMode===id)+'">'+label+'</button>').join("")+'</div></nav>';
 }
 if(c.id==="elster")return '<div class="signalis-status"><span>▣ LSTR-512 // UNIT STATUS</span><span>GESTALT: UNKNOWN</span><strong>REMEMBER OUR PROMISE</strong><span>RADIO CH. 128.000</span></div>';
 return "";
}
function pendingPanel(title,description){return '<article class="panel planned-panel"><div class="panel-title">'+e(title)+'</div><p>'+e(description)+'</p><a class="sys-button" href="'+linkFor(getRoute().planned,"review")+'">REGISTRAR FONTE OU DECISÃO ↗</a></article>'}

function plannedBuildSection(c,tab){
 const d=window.T20_BUILD_PRESETS.fromPlanned(c,window.T20_BUILD_ENGINE);
 const result=window.T20_BUILD_ENGINE.evaluate(d);
 const ruleSet=window.T20_RULES;
 const byClass=Object.entries(result.levelsByClass).map(([id,n])=>(ruleSet.classes[id]?.name||id)+" "+n).join(" / ");
 const labels={overview:"Adaptação e conceito",attributes:"Atributos iniciais",equipment:"Arsenal e equipamentos",abilities:"Habilidades e magias",progression:"Progressão 1–12",techniques:"Estratégia e técnicas",sources:"Fontes e livros",compare:"Variantes",review:"Revisão"};
 const header='<header class="section-head section-cover"><div><div class="kicker">PROPOSTA T20 // DOSSIÊ '+e(c.number)+'</div><h2>'+e(labels[tab]||"Ficha")+'</h2><span class="section-context">'+e(byClass)+' / AGUARDANDO CONFERÊNCIA EDITORIAL</span></div><span class="number">'+String(tabs.findIndex(x=>x[0]===tab)+1).padStart(2,"0")+' / 09</span></header>';
 let body="";
 if(tab==="overview"){
  body='<div class="section-grid"><article class="panel planned-panel"><div class="panel-title">CONCEITO E CLASSES</div><h3>'+e(d.name)+'</h3><p>'+e(d.description)+'</p><dl><dt>Raça</dt><dd>Humano</dd><dt>Origem</dt><dd>'+e(ruleSet.origins[d.originId]?.name||"Pendente")+'</dd><dt>Benefícios da origem</dt><dd>'+e(d.originBenefits.join(" + "))+'</dd><dt>Classes</dt><dd>'+e(byClass)+'</dd><dt>Caminho Arcano</dt><dd>'+e(d.arcanePath||"Não utiliza")+'</dd></dl><p>'+e(d.notes)+'</p></article><aside class="panel planned-panel"><div class="panel-title">CÁLCULO PARCIAL / NÍVEL 12</div><p>PV base: '+e(result.basePV??"—")+' · PM base: '+e(result.basePM??"—")+'</p><small>'+e(result.summary)+'</small><p>'+e(result.issues.length)+' verificação(ões) ainda registradas. A build é editável, não aprovada automaticamente.</p><a class="sys-button primary" href="#/laboratorio/'+encodeURIComponent(c.id)+'">EDITAR BUILD NO LABORATÓRIO</a></aside></div>';
 }
 if(tab==="attributes"){
  body='<article class="panel planned-panel"><div class="panel-title">COMPRA DE 10 PONTOS + HUMANO</div><p>Valores de criação; aumentos futuros e efeitos condicionais ainda dependem do poder adquirido.</p><div class="planned-attributes">'+["CON","CAR","SAB","INT","FOR","DES"].map(k=>'<div><strong>'+k+' '+(result.attributes[k]>=0?'+':'')+e(result.attributes[k])+'</strong><span>Compra '+e(d.attributes[k])+' · Humano '+(d.raceBonuses.includes(k)?'+1':'0')+'</span></div>').join("")+'</div><p>Perícias previstas: '+e(d.trainedSkills.join(", "))+'</p><p>Versátil, perícias de classe e proficiências exigem confronto final com a edição adotada.</p></article>';
 }
 if(tab==="equipment"){
  body='<div class="panel planned-panel"><div class="panel-title">ARQUIVO DE EQUIPAMENTOS</div><p>Os nomes e visuais abaixo são propostas. Preço, proficiência, espaços, dano e aquisição devem seguir o livro e as escolhas da mesa.</p>'+d.inventory.map(it=>'<details class="gear-card"><summary><strong>'+e(it.name)+'</strong></summary><p>'+e(it.note)+'</p></details>').join("")+'</div>';
 }
 if(tab==="abilities"){
  body='<div class="panel planned-panel"><div class="panel-title">PODERES E HABILIDADES SELECIONADOS</div><p>As escolhas aparecem pelo nível da classe. Os efeitos são apenas resumos do sistema e não criam capacidades de outro universo.</p>'+result.rows.map((row,i)=>{
   const power=row.choice;
   const grants=row.grants.map(g=>g.ability?.name||g.id).join(" · ");
   return '<details class="ability-detail"><summary><strong>NÍVEL '+e(i+1)+' · '+e(ruleSet.classes[row.classId]?.name||row.classId)+' '+e(row.classLevel)+' · '+e(power?.name||"Habilidades de entrada")+'</strong><span>EXPLICAÇÃO ⌄</span></summary><p><b>Ganhos automáticos:</b> '+e(grants||"Conforme nível da classe")+'</p>'+(power?'<p><b>Quando:</b> '+e(power.manual.action)+'; <b>custo:</b> '+e(power.manual.cost)+'.</p><p><b>Como usar:</b> '+e(power.manual.example)+'</p><p><b>Limite:</b> '+e(power.manual.limit)+'</p>':'')+'<p><b>Por que foi escolhida:</b> '+e(d.levels[i].why)+'</p><p>'+e(d.levels[i].usage)+'</p><p><small>Referência T20 JdA v1.3: '+e(power?.source?.page||row.source?.page||"a conferir")+'</small></p></details>';
  }).join("")+'</div>'+(d.spellbook.length?'<div class="panel planned-panel"><div class="panel-title">GRIMÓRIO / MAGIAS PROPOSTAS</div>'+d.spellbook.map(sp=>'<details class="ability-detail"><summary><strong>'+e(sp.name)+' · '+e(sp.circle)+'º círculo</strong><span>USO ⌄</span></summary><p>Adquirida no nível '+e(sp.classLevel)+' de Arcanista.</p><p>'+e(sp.why)+'</p><p>'+e(sp.how)+'</p><small>'+e(sp.source)+'</small></details>').join("")+'</div>':'');
 }
 if(tab==="progression"){
  body='<div class="panel planned-panel"><div class="panel-title">EVOLUÇÃO DOCUMENTADA // 01–12</div><p>As doze escolhas foram preenchidas no laboratório. PV/PM são subtotais de classe, não valores definitivos após poderes e equipamento.</p><div class="planned-levels">'+result.rows.map((row,i)=>'<div><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+e(ruleSet.classes[row.classId]?.name||row.classId)+' '+e(row.classLevel)+' — '+e(row.choice?.name||"Habilidades automáticas")+'</strong><small>PV '+e(row.pv??"—")+' / PM '+e(row.pm??"—")+' · '+e(d.levels[i].why)+'</small></div>').join("")+'</div><a class="sys-button" href="#/laboratorio/'+encodeURIComponent(c.id)+'">REVISAR AS 12 ESCOLHAS ↗</a></div>';
 }
 if(tab==="techniques"){
  body='<div class="panel planned-panel"><div class="panel-title">MANUAL DE MESA</div>'+[["Estilo",d.combat.style],["Abertura",d.combat.opening],["Sinergias",d.combat.combos],["Gestão de recursos",d.combat.resources],["Pontos fortes",d.combat.strengths],["Limitações e ambiguidades",d.combat.weaknesses],["Evolução",d.combat.evolution]].map(([k,v])=>'<h3>'+e(k)+'</h3><p>'+e(v)+'</p>').join("")+'</div>';
 }
 if(tab==="sources"){
  body='<div class="section-grid"><article class="panel planned-panel"><div class="panel-title">FONTES T20 PARA REVISÃO</div><p><a href="https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf" target="_blank" rel="noopener noreferrer">Tormenta20 — Edição Jogo do Ano v1.3 ↗</a></p><p>Classes: Guerreiro p. 64–67, Ladino p. 72–74, Lutador p. 75–77 e Arcanista p. 36–43. Origens e magias: consultar capítulos correspondentes. Conferir erratas e opções individuais antes de considerar aprovado.</p><p>Suplementos foram previstos no laboratório, mas nenhum poder não verificado é aplicado automaticamente.</p></article><aside class="panel planned-panel"><div class="panel-title">ARTE / CRÉDITO</div><a class="planned-source-link" href="'+url(c.sourcePage)+'" target="_blank" rel="noopener noreferrer">'+e(c.artCredit)+' ↗</a><p>A imagem não define poder, versão ou forma.</p></aside></div>';
 }
 if(tab==="compare")body='<div class="panel planned-panel"><div class="panel-title">VARIANTES NARRATIVAS</div><p>A adaptação principal está preenchida: '+e(byClass)+'. Outras fases e variantes do personagem precisam de escolhas distintas e não devem acumular poderes automaticamente.</p><p>'+e(d.combat.weaknesses)+'</p><a class="sys-button" href="#/laboratorio/'+encodeURIComponent(c.id)+'">DUPLICAR E EDITAR NO LABORATÓRIO ↗</a></div>';
 if(tab==="review")return plannedSection(c,tab);
 return header+body+'<aside class="system-note"><span class="who">O SISTEMA // NOTA EDITORIAL</span><p>Build preenchida como rascunho de revisão. Subtotais e regras opcionais ainda precisam de validação de mesa. Nenhuma decisão foi aprovada automaticamente.</p></aside>';
}

function plannedSection(c,tab){
 if(tab!=="review"&&window.T20_BUILD_PRESETS&&window.T20_BUILD_ENGINE)return plannedBuildSection(c,tab);
 const labels={overview:"Identidade e escopo",attributes:"Atributos iniciais",equipment:"Equipamentos",abilities:"Habilidades",progression:"Progressão de níveis",techniques:"Técnicas",sources:"Fontes e páginas",compare:"Comparar versões",review:"Fontes, decisões e correções"};
 const intro='<header class="section-head section-cover"><div><div class="kicker">PLANEJAMENTO // DOSSIÊ '+e(c.number)+'</div><h2>'+e(labels[tab])+'</h2><span class="section-context">'+e(visualFor(c,"principal").series)+' / CONTEÚDO T20 PENDENTE</span></div><span class="number">'+String(tabs.findIndex(x=>x[0]===tab)+1).padStart(2,"0")+' / 09</span></header>';
 let body="";
 if(tab==="overview")body='<div class="section-grid">'+pendingPanel("OBRA E PERSONAGEM",c.name+" foi solicitado para o universo "+c.universe+". A adaptação T20 ainda não foi definida.")+'<aside class="panel planned-panel"><div class="panel-title">CAMPOS A CONFIRMAR</div><dl><dt>Arte de referência</dt><dd><a href="'+url(c.sourcePage)+'" target="_blank" rel="noopener noreferrer">'+e(c.artCredit)+' ↗</a></dd><dt>Raça, classe e origem</dt><dd>Pendentes</dd><dt>Versões T20</dt><dd>Nenhuma variante definida</dd><dt>Fontes de regras</dt><dd>Não fornecidas</dd></dl></aside></div>';
 if(tab==="attributes")body='<div class="panel planned-panel"><div class="panel-title">COMPRA E BÔNUS // NÃO DEFINIDOS</div><p>Os seis atributos serão preenchidos quando a build e suas fontes forem aprovadas. Nenhum valor ou radar foi presumido.</p><div class="planned-attributes">'+["CON","CAR","SAB","INT","FOR","DEX"].map(key=>'<div><strong>'+key+'</strong><span>PENDENTE</span></div>').join("")+'</div></div>';
 if(tab==="equipment")body=pendingPanel("EQUIPAMENTO E ATAQUES PENDENTES","Lista de itens, ataques, valores e referências ainda não fornecida.");
 if(tab==="abilities")body=pendingPanel("HABILIDADES PENDENTES","Nenhuma habilidade de Tormenta20 foi escolhida para esta adaptação.");
 if(tab==="progression")body='<div class="panel planned-panel"><div class="panel-title">ESPAÇO DE PLANEJAMENTO // 01–12</div><p>Os doze passos abaixo são posições vazias do projeto, não níveis ou poderes já definidos. Custos, pré-requisitos e páginas precisam ser conferidos.</p><div class="planned-levels">'+Array.from({length:12},(_,i)=>'<div><span>'+String(i+1).padStart(2,"0")+'</span><strong>Escolha pendente</strong><small>Regra e página não fornecidas</small></div>').join("")+'</div><a class="sys-button" href="'+linkFor(c,"review")+'">REGISTRAR PROGRESSÃO ↗</a></div>';
 if(tab==="techniques")body=pendingPanel("TÉCNICAS PENDENTES","Efeitos, condições de uso e custos ainda não foram fornecidos.");
 if(tab==="sources")body='<div class="section-grid">'+pendingPanel("FONTES T20 PENDENTES","Nenhuma página de livro ou suplemento foi indicada para esta ficha. Registre a fonte somente após conferi-la.")+'<aside class="panel planned-panel"><div class="panel-title">ARTE DE REFERÊNCIA / CRÉDITO</div><p>'+e(c.universe)+'</p><a class="planned-source-link" href="'+url(c.sourcePage)+'" target="_blank" rel="noopener noreferrer">'+e(c.artCredit)+' ↗</a><small>A origem da imagem está registrada em assets/planned-art/sources.json. Esta arte não é referência de regra T20'+(c.id==="grimm"?' e não fixa a aparência variável do protagonista.':'.')+'</small></aside></div>';
 if(tab==="compare")body=pendingPanel("COMPARAÇÃO PENDENTE","Não existem builds ou variantes T20 definidas para comparar. As alternativas poderão ocupar o mesmo dossiê quando forem fornecidas.");
 if(tab==="review")body='<div class="review-intro"><div><span class="kicker">'+e(c.name)+' · PLANEJAMENTO</span><h3>Conferência pendente</h3><p>Registre fontes, páginas, regras, decisões e correções. Um registro aprovado não cria automaticamente uma build.</p></div><a class="sys-button" href="#/arquivo">PAINEL DO PROJETO</a></div>'+reviewForm(c)+'<div class="section-head"><div><div class="kicker">HISTÓRICO LOCAL</div><h2>Registros deste dossiê</h2></div></div><div id="reviewRecords" class="review-records">'+reviewItems(c)+'</div>';
 return intro+body;
}
function plannedDetail(c,tab){
 const v=visualFor(c,"principal");
 document.body.dataset.theme="planned";
 document.body.dataset.world=archiveCategory(c);
 document.body.dataset.art=c.id;
 document.body.dataset.family=v.family;
 document.body.dataset.pattern=v.pattern;
 document.body.dataset.finish=v.finish;
 document.body.dataset.lineage=v.lineage;
 document.body.dataset.variant="principal";
 document.body.dataset.pending="true";
 document.body.style?.setProperty?.("--char-color",v.accent);
 document.body.style?.setProperty?.("--art-accent",v.accent);
 document.body.style?.setProperty?.("--art-dark",v.dark);
 document.title=c.name+" // Planejamento · O Sistema T20";
 const nav=tabs.map(([key,label],i)=>'<button type="button" role="tab" id="tab-'+e(key)+'" aria-controls="detail-section" aria-selected="'+(key===tab)+'" data-tab="'+e(key)+'"><span aria-hidden="true">'+String(i+1).padStart(2,"0")+' / </span>'+e(label)+'</button>').join("");
 root.innerHTML='<div class="container detail-shell planned-dossier"><div class="detail-back-row"><a class="back-link" href="#/">← VOLTAR AO ARQUIVO / PERSONAGENS</a></div><section class="detail-hero planned-hero" aria-labelledby="character-title"><div class="dossier-ornament" aria-hidden="true">'+e(v.motif)+'</div><div class="hero-copy"><div class="kicker">DOSSIÊ '+e(c.number)+' // ENTRADA PENDENTE</div><span class="dossier-series">'+e(v.series)+' <b>◆</b> '+e(c.universe)+'</span><h1 id="character-title">'+e(c.name)+'</h1><p>Arte de referência registrada. A proposta de Tormenta20 já contém níveis, classes, poderes, equipamento e fontes; necessita de revisão final.</p><div class="hero-chips"><span class="chip strong">BUILD EM REVISÃO</span><span class="chip">ARTE REFERENCIADA</span></div></div><div class="hero-portrait pending-hero-poster"><div class="pending-poster" role="img" aria-hidden="true" aria-label="Pôster reserva de '+e(c.name)+'"><small>'+e(c.number)+' / ARTE EM RECUPERAÇÃO</small><strong>'+e(c.name)+'</strong><span>'+e(c.universe)+'</span></div>'+image(c.portrait,"Arte de referência de "+c.name,"planned-art")+'<span class="planned-art-credit">VISUAL DE REFERÊNCIA · FONTE NA ABA 07</span></div><div class="dossier-foot"><span>O SISTEMA / '+e(c.number)+'</span><span>BUILD // REVISÃO PENDENTE</span></div></section><nav class="detail-tabs" role="tablist" aria-label="Seções do planejamento">'+nav+'</nav><section id="detail-section" role="tabpanel" data-tab="'+e(tab)+'" aria-labelledby="tab-'+e(tab)+'">'+plannedSection(c,tab)+'</section><div class="actions-row"><a class="sys-button primary" href="'+linkFor(c,"review")+'">REGISTRAR PENDÊNCIA ↗</a><a class="sys-button" href="#/">VOLTAR AOS DOSSIÊS</a>'+(c._auto?'<a class="sys-button" href="#/laboratorio/'+encodeURIComponent(c.id)+'">ABRIR CÓPIA NO LABORATÓRIO</a>':"")+'</div></div>';
 root.querySelector?.(".actions-row")?.insertAdjacentHTML("afterbegin",'<a class="sys-button primary" href="#/laboratorio/'+encodeURIComponent(c.id)+'">ABRIR CÓPIA NO LABORATÓRIO</a>');
 lastRoute=c.id+"/principal/"+tab;
}
function detail(c,tab){
 const prev=lastRoute;
 if(!prev.startsWith(c.id+"/"))selectedLevel=1;
 const visual=visualFor(c,activeVariant(c.id));
 document.body.dataset.theme=c.theme;
 document.body.dataset.world=archiveCategory(c);
 document.body.dataset.art=c.id;
 document.body.dataset.family=visual.family;
 document.body.dataset.pattern=visual.pattern;
 document.body.dataset.finish=visual.finish;
 document.body.dataset.variant=visual.variant;
 document.body.dataset.lineage=visual.lineage;
 document.body.style?.setProperty?.("--char-color",visual.accent);
 document.body.style?.setProperty?.("--art-accent",visual.accent);
 document.body.style?.setProperty?.("--art-dark",visual.dark);
 document.title=c.name+" // O Sistema · T20";
 const nav=tabs.map(([key,label],i)=>'<button type="button" role="tab" id="tab-'+e(key)+'" aria-controls="detail-section" aria-selected="'+(key===tab)+'" data-tab="'+e(key)+'"><span aria-hidden="true">'+String(i+1).padStart(2,"0")+' / </span>'+e(label)+'</button>').join("");
 const content={overview,attributes,equipment,abilities,progression,techniques,sources,compare,review}[tab](c);
 root.innerHTML='<div class="container detail-shell"><div class="detail-back-row"><a class="back-link" href="#/">← VOLTAR AO ARQUIVO / PERSONAGENS</a>'+(c.id==="diego"?'<button type="button" class="alternative-toggle" data-diego-toggle aria-pressed="'+(diegoMode==="alternative")+'" title="Alternar Diego e sua contraparte"><span class="alternate-mark">◷</span><span>'+(diegoMode==="alternative"?"SCARY MONSTERS":"THE WORLD / ALTERNATIVE")+'</span><span aria-hidden="true">↔</span></button>':"")+'</div>'+specialHUD(c)+cover(c)+quickStats(c)+
 '<div class="global-level-picker"><div><span class="panel-title">FICHA ATIVA // NÍVEL</span><strong>NÍVEL <span id="globalLevelText">'+String(selectedLevel).padStart(2,"0")+'</span></strong><p>Altere aqui para recalcular PV, PM, Defesa e evolução em todas as abas.</p></div><input id="globalLevel" aria-label="Nível atual da ficha" type="range" min="1" max="12" value="'+selectedLevel+'"><a href="'+linkFor(c,"progression")+'">VER EVOLUÇÃO ↗</a></div>'+
 '<nav class="detail-tabs" role="tablist" aria-label="Seções da ficha">'+nav+'</nav><section id="detail-section" role="tabpanel" data-tab="'+e(tab)+'" aria-labelledby="tab-'+e(tab)+'">'+content+'</section>'+
 '<div class="actions-row"><button type="button" class="sys-button primary" data-copy="'+e(c.id)+'">COPIAR FICHA DO NÍVEL ATUAL ↗</button><a class="sys-button" href="#/">VOLTAR AOS DOSSIÊS</a></div></div>';
 if(c._auto||c._cosmos){
  const seedId=c._wave7?.parentId?c.id+"--"+c._wave7.key:c.id;
  root.querySelector?.(".actions-row")?.insertAdjacentHTML("beforeend",'<a class="sys-button" href="#/laboratorio/'+encodeURIComponent(seedId)+'">ABRIR CÓPIA NO LABORATÓRIO</a>');
 }
 updateLevel(selectedLevel);
 lastRoute=c.id+"/"+activeVariant(c.id)+"/"+tab;
}
function updateLevel(v){
 selectedLevel=levelClamp(v);
 const c=getRoute().character;if(!c)return;
 const st=statFor(c,selectedLevel);
 for(const id of ["levelSelect","globalLevel"]){const node=document.getElementById(id);if(node&&Number(node.value)!==selectedLevel)node.value=selectedLevel}
 for(const id of ["selectedLevel","globalLevelText"]){const node=document.getElementById(id);if(node)node.textContent=String(selectedLevel).padStart(2,"0")}
 document.querySelectorAll("[data-stat-level]").forEach(node=>node.textContent=String(selectedLevel).padStart(2,"0"));
 const current={PV:st.pv,PM:st.pm,DEFESA:st.defense,MOVIMENTO:st.move};
 document.querySelectorAll("[data-stat]").forEach(node=>node.textContent=current[node.dataset.stat]);
 document.querySelectorAll(".level-item").forEach(node=>{const n=Number(node.dataset.level);node.classList.toggle("unlocked",n<=selectedLevel);node.classList.toggle("current",n===selectedLevel)});
 const stats=document.getElementById("progressStats");if(stats)stats.innerHTML=selectedMetrics(c,selectedLevel);
 const readout=document.getElementById("levelReadout");if(readout)readout.innerHTML=levelPanel(c,selectedLevel);
 const additional=document.getElementById("skillsAdditional");
 if(additional&&c.id==="rentarou")additional.innerHTML=selectedLevel>=10?'<div class="skill-grid">'+[
  ["Enganação","+6","Educação Privilegiada · nobre 10"],
  ["Investigação","+3","Educação Privilegiada · nobre 10"]
 ].map(x=>'<div class="skill-item"><strong>'+e(x[0])+'</strong><b>'+skillFor(c,x,selectedLevel)+'</b><small>'+e(x[2])+'</small></div>').join("")+'</div>':'<p class="derived-note">Enganação e Investigação serão treinadas ao alcançar o nível 10 (Educação Privilegiada).</p>';
 const unlocked=document.getElementById("abilitiesUnlocked");
 if(unlocked)unlocked.innerHTML=c.progression.slice(0,selectedLevel).map(([n,power],i)=>
  '<details class="ability-detail" '+(i===selectedLevel-1?"open":"")+'><summary><strong>Nível '+e(n)+' — '+e(power)+'</strong><span>EXPLICAÇÃO ⌄</span></summary>'+guidePanel(guideFor(c).levels[i]||{})+'</details>').join("");
 document.querySelectorAll("[data-skill]").forEach(node=>{const entry=c.skills[Number(node.dataset.skill)];if(entry)node.textContent=skillFor(c,entry,selectedLevel)});
 const attrRadar=document.getElementById("attrRadar");if(attrRadar)attrRadar.innerHTML=radar(c);
 document.querySelectorAll("[data-current-attr]").forEach(node=>{const a=c.attrs.find(v=>v.key===node.dataset.currentAttr);if(a)node.textContent=fmt(a.value+attrDelta(c,selectedLevel,a.key))});
}

function render(){const route=getRoute();const selected=route.character||route.planned;const key=route.atlas?"atlas/"+route.atlasSlug:route.lab?"lab/"+route.seedId:route.board?"board":selected?selected.id+"/"+activeVariant(selected.id)+"/"+route.tab:"library";if(key===lastRoute)return;if(!route.planned)document.body.removeAttribute("data-pending");if(!route.lab)document.body.removeAttribute("data-lab");const previous=lastRoute;const sameCharacter=!!selected&&previous.startsWith(selected.id+"/");if(route.lab){window.T20_LAB?.render(root,route.seedId);lastRoute=key}else if(route.atlas){window.T20_ATLAS.render(root,route.atlasSlug);lastRoute=key}else if(route.board)reviewBoard();else if(route.planned)plannedDetail(route.planned,route.tab);else if(route.character)detail(route.character,route.tab);else listView();if(sameCharacter){const nav=document.querySelector?.(".detail-tabs");if(nav?.scrollIntoView)nav.scrollIntoView({block:"start",behavior:"instant"});else window.scrollTo({top:0,behavior:"instant"});const active=document.getElementById("tab-"+route.tab);active?.focus?.({preventScroll:true})}else window.scrollTo({top:0,behavior:"instant"})}
function copySummary(c){const a=c.attrs.map(x=>x.key+" "+(x.value>=0?"+":"")+x.value).join(" · ");const st=statFor(c,selectedLevel);return [c.name+" — T20 | O Sistema",c.info.race+" / "+c.info.className+" / "+c.info.origin,"Nível "+selectedLevel+": PV "+st.pv+" · PM "+st.pm+" · Defesa "+st.defense+" · "+st.extra,a,"Habilidades iniciais: "+c.initial.join("; "),"Progressão: "+c.progression.map(x=>"Nv. "+x[0]+": "+x[1]).join(" | "),"Fontes: "+data.rulebooks.map(b=>b.url).join(" ; ")].join("\n")}
document.addEventListener("click",evt=>{
 if(evt.target.closest("[data-scroll-roster]")){document.getElementById("catalogo")?.scrollIntoView?.({block:"start",behavior:"smooth"});return}
 if(evt.target.closest("[data-load-more]")){appendNextCards();return}
 const approval=evt.target.closest("[data-review-status]");
 if(approval){const item=window.T20_REVIEW.list().find(x=>x.id===approval.dataset.reviewStatus);if(item){window.T20_REVIEW.change(item.id,item.status==='pendente'?'aprovado':'pendente');const slot=document.getElementById('reviewRecords');if(slot)slot.innerHTML=reviewItems(getRoute().character||getRoute().planned)}return}
 const removal=evt.target.closest("[data-review-remove]");
 if(removal){window.T20_REVIEW.remove(removal.dataset.reviewRemove);const slot=document.getElementById('reviewRecords');if(slot)slot.innerHTML=reviewItems(getRoute().character||getRoute().planned);return}
 if(evt.target.closest("[data-review-export]")){const blob=new Blob([window.T20_REVIEW.exportRecords()],{type:'application/json'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='t20-guia-revisao.json';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);return}
 const cardMode=evt.target.closest("[data-card-switch]");
 if(cardMode){const id=cardMode.dataset.cardSwitch;catalogModes[id]=cardMode.dataset.cardMode;updateCards();document.querySelector?.('[data-card-switch="'+id+'"][data-card-mode="'+catalogModes[id]+'"]')?.focus?.({preventScroll:true});return}
 const variantButton=evt.target.closest("[data-fate-mode],[data-form-mode]");
 if(variantButton){
  const {fateCharacter,formCharacter,fateMode,formMode}=variantButton.dataset;
  const id=fateCharacter||formCharacter,key=fateMode||formMode;
  if(!variants(id).some(v=>v[0]===key))return;
  const tab=getRoute().tab;catalogModes[id]=key;
  location.hash=linkFor(variantByKey(id,key),tab);
  render();toast(variants(id).find(v=>v[0]===key)[1]);return;
 }
 const mode=evt.target.closest("[data-goku-mode]");
 if(mode){
  const tab=getRoute().tab;
  gokuMode=mode.dataset.gokuMode;
  location.hash=linkFor(charById("goku"),tab);render();
  toast("GOKU // "+gokuMode.toUpperCase());
  return;
 }
 const alt=evt.target.closest("[data-diego-toggle]");
 if(alt){
   const tab=getRoute().tab;
   diegoMode=diegoMode==="alternative"?"normal":"alternative";
   const c=charById("diego");
   location.hash=linkFor(c,tab);render();
   toast(diegoMode==="alternative"?"REALIDADE ALTERNATIVA // THE WORLD":"REALIDADE ORIGINAL // SCARY MONSTERS");
   return;
 }
 const clear=evt.target.closest("[data-clear-search]");
 if(clear){search="";visibleCount=PAGE_SIZE;const input=document.getElementById("search");if(input){input.value="";input.focus()}updateCards();return}
 const card=evt.target.closest("[data-open]");if(card){if(card.dataset.open==="diego")diegoMode=catalogModes.diego;if(card.dataset.open==="goku")gokuMode=catalogModes.goku;const selected=plannedById(card.dataset.open)||charById(card.dataset.open);if(selected)location.hash=linkFor(selected);return}const tab=evt.target.closest("[data-tab]");if(tab){const char=getRoute().character||getRoute().planned;if(char)location.hash=linkFor(char,tab.dataset.tab);return}const copy=evt.target.closest("[data-copy]");if(copy){const c=charById(copy.dataset.copy);if(!c)return;if(!navigator.clipboard?.writeText){toast("Cópia indisponível neste navegador. Use o arquivo data.js.");return}navigator.clipboard.writeText(copySummary(c)).then(()=>toast("Resumo de "+c.name+" copiado."),()=>toast("Não foi possível copiar. Verifique permissões."))}});
document.addEventListener("input",evt=>{if(evt.target.id==="search"){search=evt.target.value;visibleCount=PAGE_SIZE;if(window.T20_WAVE7){clearTimeout(searchTimer);searchTimer=setTimeout(updateCards,140)}else updateCards()}if(evt.target.id==="levelSelect"||evt.target.id==="globalLevel"){updateLevel(evt.target.value)}});
document.addEventListener("change",evt=>{if(evt.target.id==="universe"){universe=evt.target.value;visibleCount=PAGE_SIZE;updateCards()}if(evt.target.id==="reviewCharacter")updateReviewVariants();if(["compareA","compareB","compareLevelA","compareLevelB"].includes(evt.target.id))refreshComparison();if(evt.target.id==="reviewImport"){
 const file=evt.target.files?.[0];if(!file)return;file.text().then(content=>{try{const count=window.T20_REVIEW.importRecords(content);const slot=document.getElementById('reviewRecords');if(slot)slot.innerHTML=reviewItems(getRoute().character||getRoute().planned);toast(count+' registros importados.')}catch{toast('Arquivo JSON inválido. A revisão atual foi preservada.')}evt.target.value=''});
}});
document.addEventListener("submit",evt=>{if(evt.target.id!=="reviewForm")return;evt.preventDefault();const form=evt.target,values=Object.fromEntries(new FormData(form));try{window.T20_REVIEW.add(values);form.reset();const current=getRoute().character||getRoute().planned;if(current){document.getElementById('reviewCharacter').value=current.id}updateReviewVariants();const slot=document.getElementById('reviewRecords');if(slot)slot.innerHTML=reviewItems(current);toast('Registro salvo como pendente.')}catch(error){toast(error.message||'Não foi possível salvar.')}});
document.addEventListener("error",evt=>{
 const im=evt.target;
 if(typeof HTMLImageElement==="undefined"||!(im instanceof HTMLImageElement))return;
 if(im.classList.contains("planned-art")){
  const frame=im.closest(".planned-card,.planned-hero");
  frame?.classList.add("art-unavailable");
  frame?.querySelector(".pending-poster")?.setAttribute("aria-hidden","false");
  im.remove();return;
 }
 if(im.classList.contains("portrait-underlay")||im.closest(".capri-hud")){im.remove();return}
 const original=im.getAttribute("src")||"";
 rememberFailedImage(original);
 const card=im.closest(".roster-card");
 const id=card?.dataset.open;
 const c=id?variantByKey(id,catalogModes[id]||defaultForm(id)):getRoute().character;
 const attempt=imageAttempts.get(im)||{primary:im.dataset.mediaOriginal||original,tried:new Set()};
 attempt.tried.add(original);imageAttempts.set(im,attempt);
 const next=mediaBackup(c,attempt.primary,!!(card||im.closest(".hero-portrait")),attempt.tried,im.dataset.posterFallback);
 if(imageFailures.length<150)imageFailures.push({id:id||c?.id||"",failed:original,backup:next||null});
 if(next){
  im.dataset.recovered="true";
  im.dataset.recoveryType=/^https:\/\//.test(next)?"external":"local";
  im.src=next;return;
 }
 const label=im.dataset.mediaAlt||c?.name||im.alt;
 const marker=c?.symbol||c?._mega?.identity?.charAt(0)||"◈";
 const replacement=document.createElement("div");
 replacement.className="img-fallback art-recovery";
 replacement.setAttribute("role","img");
 replacement.setAttribute("aria-label","Imagem indisponível para "+label);
 if(c?._mega?.color)replacement.style.color=c._mega.color;
 const symbol=document.createElement("span");symbol.className="fallback-mark";symbol.textContent=marker;
 const title=document.createElement("strong");title.className="fallback-title";title.textContent=label;
 const caption=document.createElement("span");caption.className="fallback-caption";caption.textContent="IMAGEM INDISPONÍVEL";
 replacement.append(symbol,title,caption);
 if(im.nextElementSibling?.classList.contains("media-reserve"))im.nextElementSibling.remove();
 im.replaceWith(replacement);
},true);
document.addEventListener("load",evt=>{
 const im=evt.target;
 if(typeof HTMLImageElement!=="undefined"&&im instanceof HTMLImageElement&&!im.classList.contains("portrait-underlay")){
  const label=im.nextElementSibling;
  if(label?.classList.contains("media-reserve")){
   const notice=mediaNotice(im.getAttribute("src"),im.dataset.recovered==="true");
   label.textContent=notice;
   label.hidden=!notice;
   im.alt=mediaAlt(notice,im.dataset.mediaAlt);
  }
  im.closest(".roster-card .photo,.hero-portrait")?.classList.add("portrait-ready");
 }
},true);
document.addEventListener("keydown",evt=>{
 if(evt.key==="/"&&(!getRoute().character&&!getRoute().planned)&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName||"")){
  evt.preventDefault();document.getElementById("search")?.focus();return;
 }
 if(evt.key==="Escape"){
  if(!getRoute().character&&search){search="";visibleCount=PAGE_SIZE;const input=document.getElementById("search");if(input)input.value="";updateCards()}
  else if(getRoute().character)location.hash="#/";
 }
});
window.addEventListener("hashchange",render);render();
})();


/* card-worlds.js */
/* A HUD de Capri acompanha o ponteiro quando o card de D. está visível.
   Ouvintes delegados persistem durante busca e filtros, sem loop de animação. */
(()=>{
 const motion=window.matchMedia?.("(prefers-reduced-motion: reduce)");
 let queued=null,frame=0;
 const reset=card=>{
  card.style.removeProperty("--capri-x");
  card.style.removeProperty("--capri-y");
 };
 document.addEventListener("pointermove",event=>{
  if(motion?.matches||event.pointerType==="touch")return;
  const card=event.target.closest?.('.roster-card[data-open="d"]');
  if(!card)return;
  const box=card.getBoundingClientRect();
  const x=Math.max(-1,Math.min(1,(event.clientX-box.left-box.width/2)/(box.width/2)));
  const y=Math.max(-1,Math.min(1,(event.clientY-box.top-box.height/2)/(box.height/2)));
  queued={card,x:Math.round(x*2),y:Math.round(y)};
  if(frame)return;
  frame=requestAnimationFrame(()=>{
   if(queued?.card.isConnected){
    queued.card.style.setProperty("--capri-x",queued.x+"px");
    queued.card.style.setProperty("--capri-y",queued.y+"px");
   }
   frame=0;
  });
 },{passive:true});
 document.addEventListener("pointerout",event=>{
  const card=event.target.closest?.('.roster-card[data-open="d"]');
  if(card&&!card.contains(event.relatedTarget)){
   if(queued?.card===card)queued=null;
   reset(card);
  }
 },{passive:true});
 motion?.addEventListener?.("change",()=>{
  document.querySelectorAll?.('.roster-card[data-open="d"]').forEach(reset);
  queued=null;
 });
})();


/* remote-portraits.js */
/* Recuperação gradual de retratos ainda simbólicos (Fate/JoJo).
   Somente substitui um pôster quando nome e franquia/classe correspondem.
   Sem imagens genéricas ou associações por similaridade ambígua. */
(()=>{"use strict";
const root=document.getElementById("app"),characters=window.T20_DATA?.characters||[];
if(!root)return;
const pending=new Map(),posters=window.T20_MEDIA_POSTERS||(window.T20_MEDIA_POSTERS={});
const cacheKey="t20-verified-portrait-cache-v1";
let cache={};
try{cache=JSON.parse(localStorage.getItem(cacheKey)||"{}")||{}}catch{cache={}}
const saveArt=(key,art)=>{if(!art)return art;cache[key]={...art,stored:Date.now()};try{localStorage.setItem(cacheKey,JSON.stringify(cache))}catch{}return art};
// Nunca iniciar dezenas de pedidos de imagem ao mesmo tempo. Evita saturar APIs e navegador.
const MAX_REMOTE_REQUESTS=2,workQueue=[];let activeRequests=0;
function drain(){
 while(activeRequests<MAX_REMOTE_REQUESTS&&workQueue.length){
  const job=workQueue.shift();activeRequests++;
  Promise.resolve().then(job.task).then(job.resolve,()=>job.resolve(null)).finally(()=>{
   activeRequests--;drain();
  });
 }
}
function limited(task){return new Promise(resolve=>{workQueue.push({task,resolve});drain()})}
const normalize=value=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
 .replace(/[’']/g,"").replace(/\(fate\)|\(strange fake\)/g,"").replace(/[^a-z0-9]+/g," ").trim();
const sameTokens=(a,b)=>normalize(a).split(" ").filter(Boolean).sort().join(" ")===normalize(b).split(" ").filter(Boolean).sort().join(" ");
const aliases={
 "fate-artoria":["Altria Pendragon"],
 "fate-cu-chulainn":["Cu Chulainn"],
 "fate-sasakikojirou":["Sasaki Kojirou","Sasaki Kojiro"],
 "fate-hassan-hundred":["Hassan of the Hundred Faces"],
 "fate-jeanne":["Jeanne d'Arc"],
 "fate-amakusa":["Amakusa Shirou Tokisada"],
 "fate-king-hassan":["King Hassan"],
 "fate-quatz":["Quetzalcoatl"],
 "fate-scathach":["Scathach"],
 "fate-skadi":["Scathach-Skadi"],
 "fate-koyanskaya":["Koyanskaya of Light"],
 "fate-arthur-proto":["Arthur Pendragon (Prototype)"],
 "fate-ivan":["Ivan the Terrible"],
 "fate-holmes":["Sherlock Holmes"],
 "fate-yamato":["Yamato Takeru"]
};
function safeImage(v){return typeof v==="string"&&/^https:\/\/[^\s<>"']+\.(?:png|jpe?g|webp)(?:\?.*)?$/i.test(v)?v:null}
let servantList;
async function servants(){
 if(!servantList)servantList=fetch("https://api.atlasacademy.io/export/JP/basic_servant_lang_en.json",{mode:"cors"})
  .then(r=>{if(!r.ok)throw Error("Atlas indisponível");return r.json()})
  .then(data=>Array.isArray(data)?data:[]).catch(()=>[]);
 return servantList;
}
async function fatePortrait(c){
 const all=await servants();
 const names=[c.name,...(aliases[c.id]||[])];
 const possible=all.filter(s=>names.some(name=>sameTokens(s.name,name)));
 if(!possible.length)return null;
 const role=normalize(c._wave7?.fateClass||"");
 const matching=role?possible.filter(s=>!s.className||normalize(s.className)===role):possible;
 if(!matching.length)return null;
 const selected=matching[0];
 if(!Number.isInteger(selected.id)||selected.id<=0)return null;
 const response=await fetch("https://api.atlasacademy.io/nice/JP/servant/"+selected.id,{mode:"cors"});
 if(!response.ok)return null;
 const detail=await response.json();
 const images=detail.extraAssets?.narrowFigure?.ascension||detail.extraAssets?.charaGraph?.ascension||{};
 const image=safeImage(images["0"]||images["1"]||Object.values(images)[0]);
 return image?{url:image,credit:"Fate/Grand Order · TYPE-MOON / Lasengle (via Atlas Academy)",source:image}:null;
}
const jojoQuery="query ($search: String) { Page(perPage: 8) { characters(search: $search) { id name { full alternative } image { large } media(perPage: 10) { nodes { title { romaji english } } } } } }";
async function jojoPortrait(c){
 const response=await fetch("https://graphql.anilist.co",{method:"POST",mode:"cors",
  headers:{"Content-Type":"application/json","Accept":"application/json"},
  body:JSON.stringify({query:jojoQuery,variables:{search:c.name}})});
 if(!response.ok)return null;
 const json=await response.json();
 const candidates=json.data?.Page?.characters||[];
 const matched=candidates.find(x=>
  [x.name?.full,...(x.name?.alternative||[])].some(name=>sameTokens(name,c.name))&&
  (x.media?.nodes||[]).some(m=>/jojo/i.test(m.title?.romaji||"")||/jojo/i.test(m.title?.english||"")));
 const image=safeImage(matched?.image?.large);
 return image?{url:image,credit:"JoJo's Bizarre Adventure · retrato de referência via AniList",source:"https://anilist.co/character/"+matched.id}:null;
}
function getCurrent(card){
 const id=card.dataset.open;
 const base=characters.find(c=>c.id===id);
 if(!base)return null;
 const key=Array.from(card.parentElement?.querySelectorAll("[data-card-switch]")||[])
  .find(button=>button.dataset.cardSwitch===id&&button.getAttribute("aria-pressed")==="true")?.dataset.cardMode;
 return window.T20_FATE_VARIANTS?.[id]?.find(entry=>entry[0]===key)?.[2]||base;
}
function apply(c,art,original,card){
 if(!art||!c?.portrait||!original.startsWith("data:image/svg+xml"))return;
 posters[art.url]=original;
 c.portrait={...c.portrait,url:art.url,credit:art.credit,page:art.source};
 for(const m of c.media||[])if(m.image===original){m.image=art.url;m.credit=art.credit;m.source=art.source}
 for(const g of c.gear||[])if(g.image===original){g.image=art.url;g.credit=art.credit;g.source=art.source}
 // Atualiza só o card em questão; não pesquisa o catálogo completo para cada retrato.
 const targets=[...(card?.querySelectorAll?.(".photo img")||[])];
 // Detalhe individual pode ter sido aberto enquanto o retrato estava carregando.
 if(!root.querySelector("#roster"))targets.push(...root.querySelectorAll(".hero-portrait img,.media-photo img,.gear-thumb img"));
 for(const img of targets){
  if(img.classList.contains("portrait-underlay")||img.getAttribute("src")!==original)continue;
  img.dataset.posterFallback=original;
  img.src=art.url;
 }
}
async function enrich(card){
 const c=getCurrent(card);
 if(!c||!String(c.portrait?.url||"").startsWith("data:image/svg+xml"))return;
 const original=c.portrait.url,key=c.id+"|"+normalize(c.name)+"|"+normalize(c._wave7?.fateClass||"");
 if(!pending.has(key)){
  const hit=cache[key],fresh=hit&&Date.now()-hit.stored<30*24*60*60*1000&&safeImage(hit.url);
  pending.set(key,fresh?Promise.resolve(hit):
   limited(()=>c.id.startsWith("fate-")?fatePortrait(c):jojoPortrait(c))
    .then(art=>saveArt(key,art)).catch(()=>null));
 }
 const art=await pending.get(key);
 if(art&&c.portrait.url===original)apply(c,art,original,card);
}
const observer=typeof IntersectionObserver==="function"?new IntersectionObserver(entries=>{
 for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);enrich(entry.target)}
},{rootMargin:"120px"}):null;
let watchedRoster=null;
const rosterObserver=typeof MutationObserver==="function"?new MutationObserver(scan):null;
function scan(){
 const roster=root.querySelector("#roster");
 if(roster!==watchedRoster){
  rosterObserver?.disconnect();
  watchedRoster=roster;
  if(roster)rosterObserver?.observe(roster,{childList:true});
 }
 if(!roster)return;
 for(const card of roster.querySelectorAll(".roster-card[data-open]")){
  const id=card.dataset.open;
  if(!/^(fate-|jb-)/.test(id)||card.dataset.portraitLookup)continue;
  card.dataset.portraitLookup="1";
  if(observer)observer.observe(card);else enrich(card);
 }
}
// Observa somente trocas de tela e reconstruções do catálogo;
// alterações internas dos retratos não acionam revarreduras completas.
if(typeof MutationObserver==="function")new MutationObserver(scan).observe(root,{childList:true});
scan();
})();

