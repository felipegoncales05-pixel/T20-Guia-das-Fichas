/* Direção de arte, sem regras de jogo: uma assinatura por personagem e variante.
   motif é uma palavra de composição, nunca um poder ou dado mecânico novo.
   pattern/layout são receitas reutilizáveis para futuros dossiês. */
(()=>{
 const profiles={
  gyro:["SPIN","western","orbit","spine","#d5df9a","#2b382b"],
  d:["SCRAP","cyber","circuit","splice","#6ae6d8","#102a3b"],
  david:["SANDY","cyber","signal","splice","#f3e457","#27291c"],
  cipher:["FANTASMA","astral","prism","offset","#d8b3f3","#2d2240"],
  rentarou:["AFETO","romance","hearts","soft","#f1a1bf","#502c4c"],
  yoru:["GUERRA","brutal","slash","splice","#f18178","#311a20"],
  diego:["SCARY","western","claw","diagonal","#c9e888","#26372b"],
  ado:["VOZ","stage","wave","offset","#79c4f8","#152b51"],
  cyrene:["MEMÓRIA","astral","crystal","soft","#ebc3e8","#3b3353"],
  marin:["ATELIÊ","romance","seam","soft","#ffc6dc","#613852"],
  makima:["CONTROLE","brutal","watch","spine","#e9a48e","#3d272c"],
  optimus:["AUTOBOT","machine","chassis","spine","#8bcef1","#213958"],
  "jojo-dio1":["MÁSCARA","gothic","stone","spine","#e4b77b","#36222e"],
  "jojo-kars":["FORMA","gothic","organic","diagonal","#d7a5dd","#362645"],
  "jojo-dio3":["THE WORLD","manga","clock","diagonal","#ebc773","#2c253b"],
  "jojo-kira":["KILLER","manga","watch","spine","#e6aad7","#493149"],
  "jojo-diavolo":["EPITAPH","manga","fracture","splice","#f397b5","#4a203b"],
  "jojo-pucci":["HEAVEN","manga","orbit","spine","#e6dbe0","#2e3140"],
  "jojo-valentine":["D4C","western","portal","offset","#eeb5d1","#3c2e57"],
  "jojo-tooru":["CALAMIDADE","manga","ripple","soft","#cfb0da","#352c48"],
  yuta:["RIKA","curse","slash","spine","#aed7e7","#26334c"],
  goku:["KI","ki","rays","diagonal","#ffbb68","#4d302a"],
  "hsr-aglaea":["TEAR","astral","weave","spine","#f4d597","#48403b"],
  "hsr-tribbie":["PASSAGEM","astral","trail","soft","#ecc2ae","#44354b"],
  "hsr-mydei":["CONFLITO","astral","insignia","diagonal","#f09980","#492d38"],
  "hsr-castorice":["BORBOLETAS","astral","wing","soft","#c9a2dd","#302a50"],
  "hsr-anaxa":["RAZÃO","astral","diagram","spine","#9dd8b3","#263c43"],
  "hsr-hyacine":["CÉU","astral","sky","soft","#b6e3e9","#33536a"],
  "hsr-phainon":["CHAMA","astral","rays","diagonal","#f4cd9b","#554039"],
  "hsr-hysilens":["OCEANO","astral","wave","soft","#8cc5db","#243d57"],
  "hsr-cerydra":["SOBERANA","astral","insignia","spine","#e9adca","#47344e"],
  "hsr-evernight":["NOITE","astral","stars","offset","#a4aedc","#2a314f"],
  "hsr-terrae":["TERRAE","astral","stone","spine","#a8d7c2","#2b4848"],
  "em-herta":["OBSERVATÓRIO","cosmic","diagram","offset","#baa5ed","#313455"],
  "em-acheron":["NIHILITY","cosmic","slash","splice","#d39bca","#352644"],
  "em-phantylia":["FLORES","cosmic","bloom","soft","#d8adcf","#40314e"],
  "em-diamond":["PEDRA ANGULAR","cosmic","prism","spine","#a9d8e8","#263a52"],
  "em-taravan":["LOGÍSTICA","cosmic","grid","offset","#c2d0df","#2c3f52"],
  "em-zandar":["NOUS","cosmic","diagram","spine","#b5d5ef","#2d3e5a"],
  "em-shuhu":["ABUNDÂNCIA","cosmic","organic","soft","#a5dbaf","#2d493e"],
  "em-zephyro":["DESTRUIÇÃO","cosmic","rays","splice","#f09a83","#56353c"],
  "em-celenova":["LEGIÕES","cosmic","insignia","spine","#d8adbb","#413449"],
  "em-irontomb":["MÁQUINA","cosmic","circuit","splice","#adc1c7","#293c45"],
  "em-archforger":["FORJA","cosmic","chassis","diagonal","#edb080","#513b38"],
  "em-asat":["SILÊNCIO","cosmic","fracture","offset","#c6aee0","#3b3152"],
  "em-luxbane":["ECLIPSE","cosmic","eclipse","diagonal","#e69d87","#483442"],
  elster:["LSTR-512","terminal","grid","spine","#eb684e","#222723"],
  "jojo-jonathan":["HAMON","gothic","rays","spine","#e5c984","#273a58"],
  "jojo-joseph":["CLACKERS","manga","orbit","offset","#e2aed2","#49365b"],
  "jojo-jotaro":["ORA","manga","clock","diagonal","#b7b4e9","#2e2e59"],
  "jojo-josuke4":["RESTAURAR","manga","hearts","soft","#f4a2c7","#304c4e"],
  "jojo-giorno":["VIDA","manga","bloom","offset","#f0cf78","#4a394c"],
  "jojo-jolyne":["STONE FREE","manga","weave","splice","#99dfbb","#244654"],
  "jojo-johnny":["TUSK","western","orbit","diagonal","#abd6f4","#30465a"],
  "jojo-gappy":["SOFT & WET","manga","ripple","soft","#a9ddeb","#355063"],
  denji:["MOTOSSERRA","brutal","chassis","splice","#f2a35c","#49302b"],
  "satoru-gojo":["INFINITO","curse","orbit","offset","#a6ddf2","#29364e"],
  shigaraki:["DECAIR","heroic","fracture","splice","#bfb7d1","#393948"],
  midoriya:["FULL COWL","heroic","rays","diagonal","#9ee2ac","#28463e"],
  toji:["TOJI","curse","slash","splice","#a9c6b2","#1c2829"],
  aizen:["AIZEN","bleach","prism","spine","#bdd4e7","#222c42"],
  vegitto:["VEGITTO","ki","orbit","offset","#f4bb74","#3d2e51"],
  gogeta:["GOGETA","ki","rays","diagonal","#ed8e73","#392c4e"],
  "soul-of-cinder":["CINZAS","souls","fracture","spine","#e2a478","#312824"],
  isaac:["ISAAC","dungeon","ripple","soft","#dfbeae","#3b3036"],
  adao:["ADÃO","arena","diagram","offset","#dfcda7","#3b3740"],
  grimm:["GRIMM","folklore","organic","spine","#bf9ab1","#302537"],
  sekiro:["SEKIRO","shinobi","slash","diagonal","#c7ad88","#34342f"],
  kaneki:["KANEKI","horror","fracture","splice","#d9b1b2","#30262d"]
 };
 const variations={
  "diego:alternative":["THE WORLD","western","clock","diagonal","#e9cb83","#3a304b"],
  "goku:gt":["SSJ4","ki","claw","splice","#ee806a","#503037"],
  "goku:daima":["DAIMA","ki","trail","soft","#c9a4e9","#463b5c"],
  "goku:super":["KI DIVINO","ki","orbit","offset","#a6dff1","#344a66"]
 };
 // Superfícies escolhidas pelo contexto de cada ficha; combinam com o motivo
 // geométrico do perfil, sem introduzir iconografia ou poderes novos.
 const finishes={
  gyro:"dust",d:"circuitry",david:"signal",cipher:"glass",rentarou:"paper",yoru:"ink",
  diego:"dust",ado:"velvet",cyrene:"frost",marin:"fabric",makima:"ink",optimus:"alloy",
  "jojo-dio1":"stone","jojo-kars":"stone","jojo-dio3":"ink","jojo-kira":"paper",
  "jojo-diavolo":"ink","jojo-pucci":"paper","jojo-valentine":"paper","jojo-tooru":"glass",
  yuta:"ink",goku:"energy",
  "hsr-aglaea":"fabric","hsr-tribbie":"paper","hsr-mydei":"stone","hsr-castorice":"velvet",
  "hsr-anaxa":"ledger","hsr-hyacine":"glass","hsr-phainon":"energy","hsr-hysilens":"glass",
  "hsr-cerydra":"foil","hsr-evernight":"velvet","hsr-terrae":"stone",
  "em-herta":"ledger","em-acheron":"ink","em-phantylia":"velvet","em-diamond":"stone",
  "em-taravan":"ledger","em-zandar":"ledger","em-shuhu":"organic","em-zephyro":"energy",
  "em-celenova":"foil","em-irontomb":"circuitry","em-archforger":"alloy",
  "em-asat":"ink","em-luxbane":"eclipse",elster:"signal",
  "jojo-jonathan":"energy","jojo-joseph":"paper","jojo-jotaro":"ink",
  "jojo-josuke4":"glass","jojo-giorno":"organic","jojo-jolyne":"fabric",
  "jojo-johnny":"dust","jojo-gappy":"glass",denji:"alloy",
  "satoru-gojo":"glass",shigaraki:"stone",midoriya:"energy",
  "diego:alternative":"foil","goku:gt":"organic","goku:daima":"paper","goku:super":"glass",
  toji:"ink",aizen:"glass",vegitto:"energy",gogeta:"foil","soul-of-cinder":"stone",
  isaac:"paper",adao:"foil",grimm:"ink",sekiro:"paper",kaneki:"ink"
 };
 const families={western:"CORRIDA / MANGÁ",cyber:"NIGHT CITY",astral:"AMPHOREUS / ESTRELAS",romance:"PÁGINA / AFETO",brutal:"TINTA / TENSÃO",stage:"PALCO / VOZ",machine:"CHASSI / ENGENHARIA",gothic:"MANGÁ / CLÁSSICO",manga:"MANGÁ / IMPRESSÃO",curse:"ENERGIA / SOMBRA",ki:"DRAGON BALL",cosmic:"ARQUIVO / CÓSMICO",terminal:"LSTR / ARQUIVO",heroic:"QUADRO / HERÓI",bleach:"BLEACH / ARQUIVO",souls:"SOULS / BRASA",dungeon:"ISAAC / PORÃO",arena:"SHUUMATSU / ARENA",folklore:"BLACK SOULS / CONTOS",shinobi:"SEKIRO / PERGAMINHO",horror:"TOKYO GHOUL / CONTRASTE"};
 function forCharacter(c,key){
  const [motif,family,pattern,layout,accent,dark]=variations[c.id+":"+key]||profiles[c.id]||["ARQUIVO","cosmic","grid","spine","#9bd9d5","#253546"];
  const finish=finishes[c.id+":"+key]||finishes[c.id]||"paper";
  const lineage=c.universe.includes("Lord Ravager")?"ravager":c.universe.includes("Emanador")?"emanator":c.catalogCategory==="chrysos"||c.universe.includes("Chrysos")?"chrysos":"other";
  const series={ravager:"LORD RAVAGER",emanator:"EMANADORES",chrysos:"HERDEIROS / CHRYSOS"}[lineage]||families[family];
  return {motif,family,pattern,layout,accent,dark,finish,lineage,series,id:c.id,variant:key||"principal"};
 }
 window.T20_VISUAL={profiles,variations,finishes,forCharacter};
})();
