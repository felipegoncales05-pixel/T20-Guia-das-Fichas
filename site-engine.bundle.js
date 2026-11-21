
/* character-art.js */
/* Retratos hospedados no projeto, com proveniência em assets/character-art/sources.json.
   Imagens de outros titulares usadas somente para identificação visual dos personagens. */
(()=>{
  const data=window.T20_DATA;
  if(!data)return;
  const jojo=["jojo-kars","jojo-jonathan","jojo-joseph","jojo-jotaro","jojo-josuke4","jojo-giorno","jojo-jolyne","jojo-johnny","jojo-gappy"];
  const anime={
    denji:["webp","Chainsaw Man · arte oficial do anime","https://chainsawman.dog/tvseries/character/"],
    "satoru-gojo":["webp","Jujutsu Kaisen · arte oficial do anime","https://jujutsukaisen.jp/character/category6.php"],
    midoriya:["webp","My Hero Academia · arte oficial do anime","https://heroaca.com/character/chara_group01/01-01/"],
    shigaraki:["webp","My Hero Academia · arte oficial do anime","https://heroaca.com/character/chara_group06/06-01/"]
  };
  const emanators={
    "em-phantylia":["webp","Honkai: Star Rail · arte de HoYoverse, via Zerochan","https://www.zerochan.net/4688312"],
    "em-irontomb":["webp","Honkai: Star Rail · arte de HoYoverse, via Zerochan","https://www.zerochan.net/4688315"],
    "em-archforger":["webp","Honkai: Star Rail · imagem de trailer, via Zerochan","https://www.zerochan.net/4689072"],
    "em-celenova":["webp","Honkai: Star Rail · imagem de trailer, via Beebom","https://beebom.com/honkai-star-rail-lord-ravagers/"],
    "em-asat":["webp","Honkai: Star Rail · imagem de trailer, via Sportskeeda","https://www.sportskeeda.com/esports/honkai-star-rail-hsr-all-lord-ravagers-revealed-myriad-celestia-trailer-fables-about-stars-part-2"],
    "em-zephyro":["webp","Honkai: Star Rail · imagem de trailer, via Beebom","https://beebom.com/honkai-star-rail-lord-ravagers/"],
    "em-luxbane":["webp","Honkai: Star Rail · imagem de trailer, via Beebom","https://beebom.com/honkai-star-rail-lord-ravagers/"]
  };
  const records=Object.fromEntries(jojo.map(id=>[id,["webp","JoJo's Bizarre Adventure · arte de Hirohiko Araki, via JoJo Wiki",{
    "jojo-kars":"https://jojowiki.com/Kars",
    "jojo-jonathan":"https://jojowiki.com/Jonathan_Joestar",
    "jojo-joseph":"https://jojowiki.com/Joseph_Joestar",
    "jojo-jotaro":"https://jojowiki.com/Jotaro_Kujo",
    "jojo-josuke4":"https://jojowiki.com/Josuke_Higashikata",
    "jojo-giorno":"https://jojowiki.com/Giorno_Giovanna",
    "jojo-jolyne":"https://jojowiki.com/Jolyne_Cujoh",
    "jojo-johnny":"https://jojowiki.com/Johnny_Joestar",
    "jojo-gappy":"https://jojowiki.com/Josuke_Higashikata_(JoJolion)"
  }[id]]]));
  Object.assign(records,anime,emanators);
  for(const [id,[ext,credit,page]] of Object.entries(records)){
    const c=data.characters.find(character=>character.id===id);
    if(!c)continue;
    const old=c.portrait.url;
    const img=`./assets/character-art/${id}.${ext}`;
    c.portrait={...c.portrait,url:img,credit,page};
    for(const m of c.media||[])if(m.image===old){m.image=img;m.credit=credit;m.source=page}
    for(const g of c.gear||[])if(g.image===old){g.image=img;g.credit=credit;g.source=page}
  }
  window.T20_CHARACTER_ART_IDS=Object.keys(records);
})();


/* catalog-cover-art.js */
/* Fase III — imagens aplicadas apenas aos cards, sem alterar retratos de dossiês.
   Proveniência em assets/card-art/catalog-covers.json.
   Falha de carregamento recupera automaticamente o retrato original via app.js. */
(()=>{
  window.T20_CATALOG_COVERS=Object.freeze({
  "jojo-jonathan": {
    "series": "JoJo's Bizarre Adventure — Phantom Blood",
    "volume": "Volume 1",
    "image": "https://static.jojowiki.com/images/thumb/0/0e/latest/20230510204229/Volume_1.png/400px-Volume_1.png",
    "source": "https://jojowiki.com/PB_Volume_1",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-kira": {
    "series": "JoJo's Bizarre Adventure — Diamond is Unbreakable",
    "volume": "Volume 45",
    "image": "https://static.jojowiki.com/images/thumb/5/56/latest/20210526194957/Vol45_cover_art.png/640px-Vol45_cover_art.png",
    "source": "https://jojowiki.com/Volume_45",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-giorno": {
    "series": "JoJo's Bizarre Adventure — Vento Aureo",
    "volume": "Volume 47",
    "image": "https://cdn.aprendejaponeshoy.com/32157-big_default/jojo-no-kimyonaboken-vol-47-jojo-s-bizarre-adventure-golden-wind-vol-1.jpg",
    "source": "https://jojowiki.com/Volume_47",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-jolyne": {
    "series": "JoJo's Bizarre Adventure — Stone Ocean",
    "volume": "Volume 17 (Parte 6)",
    "image": "https://cdn11.bigcommerce.com/s-89ffd/images/stencil/1280x1280/products/152159/673084/shueisha-stone-ocean-vol.17-jojos-bizarre-adventure-part-6-jump-comics-manga-japanese-language__00648.1737727689.jpg",
    "source": "https://www.plazajapan.com/9784088734835/",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "gyro": {
    "series": "JoJo's Bizarre Adventure — Steel Ball Run",
    "volume": "Volume 5",
    "image": "https://cdn0.fahasa.com/media/catalog/product/9/7/9784088738451.jpg",
    "source": "https://jojowiki.com/SBR_Volume_5",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "diego": {
    "series": "JoJo's Bizarre Adventure — Steel Ball Run",
    "volume": "Bunkoban Volume 5",
    "image": "https://static.jojowiki.com/images/e/e1/latest/20220609001725/BunkoSBR_vol5.jpg",
    "source": "https://jojowiki.com/File:BunkoSBR_vol5.jpg",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-valentine": {
    "series": "JoJo's Bizarre Adventure — Steel Ball Run",
    "volume": "Volume 17",
    "image": "https://static.jojowiki.com/images/a/aa/latest/20230121002011/Volume_97.jpg",
    "source": "https://jojowiki.com/SBR_Volume_17",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-gappy": {
    "series": "JoJo's Bizarre Adventure — JoJolion",
    "volume": "Volume 25",
    "image": "https://www.japanzon.com/46975-product_large/jojo-s-bizarre-adventure-part-8-jojolion-vol25-jump-comics-japanese-version.jpg",
    "source": "https://jojowiki.com/JJL_Volume_25",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-tooru": {
    "series": "JoJo's Bizarre Adventure — JoJolion",
    "volume": "Volume 26",
    "image": "https://static.jojowiki.com/images/thumb/f/fe/latest/20210614112834/Volume_130.jpg/600px-Volume_130.jpg",
    "source": "https://jojowiki.com/JJL_Volume_26",
    "publisher": "Shueisha",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "midoriya": {
    "series": "My Hero Academia",
    "volume": "Volume 37",
    "publisher": "Shueisha",
    "image": "https://dosbg3xlm0x1t.cloudfront.net/images/items/08X10000000026579600/1200/08X10000000026579600.jpg",
    "source": "https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-883428-3",
    "credit": "Kohei Horikoshi · Shueisha",
    "type": "manga-cover"
  },
  "cyrene": {
    "series": "Honkai: Star Rail",
    "volume": "Arte promocional de Cyrene",
    "publisher": "HoYoverse / HoYoLAB",
    "image": "https://upload-os-bbs.hoyolab.com/upload/2025/09/09/447419471/e96044443ddaf27829c10066cf712833_5388388135137228030.webp",
    "source": "https://www.hoyolab.com/article/40967778",
    "credit": "Arte promocional de Honkai: Star Rail · via HoYoLAB",
    "type": "official-art"
  },
  "jojo-joseph": {
    "series": "JoJo's Bizarre Adventure — Battle Tendency",
    "volume": "Volume 11",
    "publisher": "Shueisha",
    "image": "https://cdn1.fahasa.com/media/catalog/product/9/7/9784088510675.jpg",
    "source": "https://www.fahasa.com/jojo-no-kimyouna-bouken-11.html",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-jotaro": {
    "series": "JoJo's Bizarre Adventure — Stardust Crusaders",
    "volume": "Volume 28",
    "publisher": "Shueisha",
    "image": "https://vignette.wikia.nocookie.net/jjba/images/e/e6/Volume_28.jpg/revision/latest?cb=20170623235902",
    "source": "https://jojo.fandom.com/wiki/Volume_28",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-dio3": {
    "series": "JoJo's Bizarre Adventure — Stardust Crusaders",
    "volume": "Volume 27",
    "publisher": "Shueisha",
    "image": "https://cdn11.bigcommerce.com/s-89ffd/images/stencil/1280x1280/products/154207/660836/shueisha-jojos-bizarre-adventure-vol.27-part-3-stardust-crusaders-jump-comics-manga-japanese-language__16672.1737708200.jpg",
    "source": "https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-851570-0",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-josuke4": {
    "series": "JoJo's Bizarre Adventure — Diamond is Unbreakable",
    "volume": "Volume 29",
    "publisher": "Shueisha",
    "image": "https://cdn11.bigcommerce.com/s-89ffd/images/stencil/1280x1280/products/152175/681134/shueisha-jojos-bizarre-adventure-vol.29-part-4-diamond-is-unbreakable-jump-comics-manga-japanese-language__82337.1737740600.jpg",
    "source": "https://www.plazajapan.com/9784088516356/",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-johnny": {
    "series": "JoJo's Bizarre Adventure — Steel Ball Run",
    "volume": "Volume 4",
    "publisher": "Shueisha",
    "image": "https://cdn1.fahasa.com/media/catalog/product/9/7/9784088736891.jpg",
    "source": "https://jojowiki.com/SBR_Volume_4",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-kars": {
    "series": "JoJo's Bizarre Adventure — Battle Tendency",
    "volume": "Volume 9",
    "publisher": "Shueisha",
    "image": "https://cdn0.fahasa.com/media/catalog/product/9/7/9784088510651.jpg",
    "source": "https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-851065-1",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "jojo-pucci": {
    "series": "JoJo's Bizarre Adventure — Stone Ocean",
    "volume": "Volume 11 (Parte 6)",
    "publisher": "Shueisha",
    "image": "https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088732503/1200/9784088732503.jpg",
    "source": "https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-873250-3",
    "credit": "Hirohiko Araki · Shueisha",
    "type": "manga-cover"
  },
  "shigaraki": {
    "series": "My Hero Academia",
    "volume": "Volume 25 — Tomura Shigaraki: Origin",
    "image": "https://dw9to29mmj727.cloudfront.net/products/1974717623.jpg",
    "source": "https://www.viz.com/manga-books/manga/my-hero-academia-volume-25/product/6429",
    "publisher": "VIZ Media / Shueisha",
    "credit": "Kohei Horikoshi · Shueisha / VIZ Media",
    "type": "manga-cover"
  }
});
})();


/* review-data.js */
/* Registro editorial local. Nenhuma decisão vem aprovada por padrão.
   O exportador permite transportar as anotações entre navegadores. */
(()=>{
  "use strict";
  const KEY="t20-guia-revisao-v1";
  const TYPES=["fonte","regra","decisão","pendência","correção"];
  const STATUSES=["pendente","aprovado"];
  let records=[];
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||"[]");
    if(Array.isArray(saved))records=saved.filter(valid).slice(0,2000);
  }catch{ /* Ambiente sem armazenamento: a sessão continua editável. */ }
  function valid(r){return r&&typeof r.id==="string"&&typeof r.title==="string"&&typeof r.body==="string"&&TYPES.includes(r.type)&&STATUSES.includes(r.status)&&typeof r.character==="string"&&typeof r.variant==="string"&&typeof r.url==="string"&&typeof r.page==="string"&&typeof r.createdAt==="string"}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(records))}catch{return false}return true}
  function add(input){
    const record={id:globalThis.crypto?.randomUUID?.()||String(Date.now())+Math.random().toString(36).slice(2),
      type:TYPES.includes(input.type)?input.type:"pendência",status:"pendente",
      title:String(input.title||"").trim().slice(0,160),body:String(input.body||"").trim().slice(0,2000),
      character:String(input.character||"geral").slice(0,80),variant:String(input.variant||"principal").slice(0,80),
      url:/^https:\/\//.test(input.url||"")?String(input.url).slice(0,1000):"",
      page:String(input.page||"").trim().slice(0,100),createdAt:new Date().toISOString()};
    if(!record.title||!record.body)throw Error("Título e descrição são obrigatórios.");
    records.unshift(record);save();return record;
  }
  function change(id,status){const item=records.find(r=>r.id===id);if(!item||!STATUSES.includes(status))return false;item.status=status;save();return true}
  function remove(id){const before=records.length;records=records.filter(r=>r.id!==id);if(before===records.length)return false;save();return true}
  function importRecords(json){const parsed=JSON.parse(json);if(!Array.isArray(parsed)||parsed.length>2000||!parsed.every(valid))throw Error("Arquivo de revisão inválido.");records=parsed;save();return records.length}
  window.T20_REVIEW={list:()=>records.slice(),add,change,remove,importRecords,exportRecords:()=>JSON.stringify(records,null,2),types:TYPES};
})();


/* visual-direction.js */
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


/* planned-data.js */
/* Entradas editoriais solicitadas. Retratos de referência e créditos estão em
   assets/planned-art/sources.json; não definem variantes, regras ou build T20. */
(()=>{
  const entries=[
    ["toji","Toji","Jujutsu Kaisen","jjk","png","https://jujutsukaisen.jp/character/index_2nd.php","Jujutsu Kaisen anime"],
    ["aizen","Aizen","Bleach","bleach","png","https://bleach-anime.com/en/character/?chara=80","BLEACH Thousand-Year Blood War"],
    ["vegitto","Vegitto","Dragon Ball","dragonball","jpg","https://en.dragon-ball-official.com/news/01_4032.html","Dragon Ball Official / Legends"],
    ["gogeta","Gogeta","Dragon Ball","dragonball","jpg","https://en.dragon-ball-official.com/news/01_4435.html","Dragon Ball Official / Gekishin Squadra"],
    ["soul-of-cinder","Soul of Cinder","Dark Souls III","dark-souls","jpg","https://www.cookandbecker.com/en/article/118/the-withered-beauty-of-dark-souls-iii.html","FromSoftware / Cook and Becker"],
    ["isaac","Isaac","The Binding of Isaac","binding-of-isaac","jpg","https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/","The Binding of Isaac: Rebirth / Steam"],
    ["adao","Adão","Shuumatsu no Valkyrie","shuumatsu","webp","https://ragnarok-official.com/1st/character/","Record of Ragnarok anime"],
    ["grimm","Grimm","Black Souls","black-souls","jpg","https://store.steampowered.com/app/3755860/BLACK_SOULS/","BLACK SOULS / Steam"],
    ["sekiro","Sekiro","Sekiro: Shadows Die Twice","sekiro","jpg","https://www.sekirothegame.com/gallery?filter=art","Sekiro / Activision"],
    ["kaneki","Kaneki","Tokyo Ghoul","tokyo-ghoul","png","https://www.marv.jp/special/tokyoghoul/first/chara.html","Tokyo Ghoul anime / Marvelous"]
  ];
  window.T20_PLANNED=entries.map(([id,name,universe,catalogCategory,format,sourcePage,artCredit],index)=>({
    id,name,universe,catalogCategory,portrait:"./assets/planned-art/"+id+"."+format,
    sourcePage,artCredit,
    number:"P"+String(index+1).padStart(2,"0"),status:"pendente",label:"ADAPTAÇÃO PENDENTE"
  }));
})();


/* build-concepts.js */
/* Propostas narrativas editáveis: nenhuma é ficha T20 aprovada.
   Distribuições existentes usam somente classes já parcialmente catalogadas. */
(()=>{
 "use strict";
 const proposals={
  toji:{focus:"Especialista em combate físico, mobilidade, leitura de campo e arsenal.",classFlow:[["guerreiro",8],["ladino",4]],idea:"Guerreiro e Ladino em caráter experimental. Nenhuma restrição celestial ou ferramenta amaldiçoada concede bônus grátis.",opening:"Avaliar terreno, furtividade, alcance e equipamento antes de se aproximar.",combos:"Combinar apenas ataques e condições realmente obtidos de Guerreiro/Ladino; conferir custo de PM e ação.",weakness:"Sem maldições gratuitas; equipamentos têm preço e proficiência.",ambiguous:"Restrição celestial e arsenal especial têm várias representações narrativas; definir as propriedades de cada arma com o mestre."},
  aizen:{focus:"Controle de percepção, manipulação estratégica e elevada competência arcana.",classFlow:[],idea:"Arcanista é hipótese; a classe e magias ainda não estão indexadas neste laboratório.",opening:"Definir qual efeito oficial representará a ilusão antes de iniciar a cena.",combos:"Verificar ações, duração, alcance e resistências de cada magia selecionada.",weakness:"Kyōka Suigetsu não concede controle automático nem ignora testes de resistência.",ambiguous:"Distinguir fases e poderes: hipnose, ilusões, Hōgyoku e evoluções não equivalem à mesma regra."},
  vegitto:{focus:"Combate desarmado de altíssimo impacto, técnica e energia estilizada.",classFlow:[["lutador",10],["guerreiro",2]],idea:"Lutador/Guerreiro é uma hipótese para representar fusão Potara, sem duplicar fichas originais.",opening:"Confirmar alcance e ações disponíveis antes das investidas.",combos:"Poderes de Lutador e Guerreiro só interagem nas condições oficiais verificadas.",weakness:"Fusão e transformações não alteram atributos automaticamente.",ambiguous:"Base, Super Saiyajin e Blue são versões distintas; a imagem não fixa qual usar."},
  gogeta:{focus:"Movimento rápido, técnica marcial e finalizações contundentes.",classFlow:[["lutador",9],["guerreiro",3]],idea:"Lutador/Guerreiro é hipótese para fusão Metamoru, sem transformação gratuita.",opening:"Aproximar-se legalmente e usar as ações e recursos disponíveis.",combos:"Não inventar efeitos para ataques de energia; utilizar poderes adquiridos.",weakness:"Duração da fusão e transformações dependem de regra narrativa da mesa.",ambiguous:"Aparições de diferentes obras e transformações exigem escolha editorial separada."},
  "soul-of-cinder":{focus:"Guerreiro mutável com diferentes estilos de armamento e chama.",classFlow:[["guerreiro",12]],idea:"Guerreiro é base experimental; conjuração e mudanças de postura dependem de opções verificadas.",opening:"Escolher arma e postura permitidas pelo inventário efetivamente adquirido.",combos:"Checar troca de armas, ações e efeitos de fogo sem conceder magias extras.",weakness:"A alternância de formas não fornece proficiências ou poderes não comprados.",ambiguous:"As fases, armas e estilos do chefe podem exigir builds ou técnicas alternativas."},
  isaac:{focus:"Sobrevivência, projéteis estilizados como lágrimas e itens imprevisíveis.",classFlow:[],idea:"Arcanista ou outra classe de ataques à distância é hipótese a revisar; não há classe indexada correspondente.",opening:"Definir qual ataque ou magia oficial será representado como lágrima.",combos:"Usar somente itens efetivamente adquiridos e suas condições.",weakness:"Itens aleatórios e transformações não fornecem efeitos sem validação.",ambiguous:"Rebirth, Afterbirth, Repentance e combinações de itens podem alterar o conceito narrativo."},
  adao:{focus:"Combate desarmado, reflexos e resposta ao estilo do adversário.",classFlow:[["lutador",8],["guerreiro",4]],idea:"Lutador/Guerreiro é hipótese; copiar técnicas de adversários não existe gratuitamente em T20.",opening:"Observar o adversário e utilizar golpes e recursos próprios da ficha.",combos:"Aplicar apenas habilidades defensivas e ataques realmente adquiridos.",weakness:"Espelhamento de técnicas exige acordo e mecânica própria verificada.",ambiguous:"Olhos do Senhor, velocidade e cópia de golpes devem ser representados separadamente."},
  grimm:{focus:"Espadachim de fantasia sombria com arsenal e narrativa variável.",classFlow:[],idea:"Guerreiro ou Arcanista são possibilidades; aparência, versão e ficha precisam de curadoria.",opening:"Definir qual manifestação de Grimm e o equipamento correspondente.",combos:"A arma e poderes dependem de classe, nível e livro escolhidos.",weakness:"Não atribuir efeitos de BLACK SOULS automaticamente.",ambiguous:"BLACK SOULS possui diferentes aparências e interpretações do protagonista; escolher uma antes de finalizar."},
  sekiro:{focus:"Precisão de espada, reposicionamento, postura e ferramentas protéticas.",classFlow:[["guerreiro",9],["ladino",3]],idea:"Guerreiro/Ladino é hipótese para shinobi e espadachim; próteses são equipamento sujeito às regras.",opening:"Escolher arma e terreno; avaliar furtividade e alcance.",combos:"Usar ataques e mobilidade adquiridos; ferramentas precisam de custo e proficiência.",weakness:"Ressurreição e quebra de postura não são efeitos automáticos de T20.",ambiguous:"Próteses, artes de combate e finais narrativos devem ser escolhidos e documentados."},
  kaneki:{focus:"Combate corporal agressivo, adaptação defensiva e mobilidade.",classFlow:[["lutador",10],["ladino",2]],idea:"Lutador/Ladino é hipótese; kagune é uma representação narrativa, não membro extra gratuito.",opening:"Definir alcance e modo de ataque disponível na ficha.",combos:"Conferir regras de ataques desarmados e recursos antes de combinar.",weakness:"Regeneração, kakugan e formas não concedem imunidades automáticas.",ambiguous:"Mudanças entre fases de Tokyo Ghoul e Tokyo Ghoul:re exigem versões narrativas distintas."}
 };
 const names=Object.keys(proposals);
 function fromPlanned(seed,engine){
  const p=proposals[seed.id];
  const draft=engine.makeDraft({catalogId:seed.id,name:seed.name,work:seed.universe,theme:seed.catalogCategory});
  if(!p)return draft;
  draft.description=p.focus+" PROPOSTA NÃO VALIDADA: "+p.idea;
  draft.notes="Origem visual: "+seed.sourcePage+"; "+p.ambiguous+" Nenhuma classe, atributo, poder, magia, item ou variante está automaticamente aprovada.";
  draft.combat={...draft.combat,style:p.focus,opening:p.opening,combos:p.combos,resources:"Controlar PM e itens pelo texto da edição e nível de classe realmente adquirido.",strengths:p.idea,weaknesses:p.weakness,evolution:"Roteiro de 12 níveis editável. Poderes de classe, perícias, origem e itens ainda exigem seleção e revisão."};
  const flow=p.classFlow.flatMap(([classId,n])=>Array(n).fill(classId));
  draft.levels=Array.from({length:12},(_,i)=>({...engine.emptyLevel(),classId:flow[i]||"",why:"Proposta editorial do nível "+(i+1)+": "+p.idea,usage:p.opening,synergy:p.combos,limits:p.weakness,sourceNote:p.ambiguous}));
  return draft;
 }
 const api={proposals,ids:names,fromPlanned};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 if(typeof window!=="undefined")window.T20_CONCEPTS=api;
})();


/* rules-catalog.js */
/* Índice pequeno e auditável. Só os campos abaixo foram conferidos na edição
   indicada; a presença de um livro não habilita suas opções automaticamente. */
(()=>{
 "use strict";
 const pdf="https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf";
 const books=[
  {id:"jda-1.3",name:"Tormenta20 — Edição Jogo do Ano",edition:"v1.3",url:pdf,status:"parcial",note:"Multiclasse, compra de atributos e parte de três classes conferidas. Erratas posteriores e demais opções pendentes."},
  {id:"herois",name:"Heróis de Arton",url:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/",status:"catalogar"},
  {id:"ameacas",name:"Ameaças de Arton",url:"https://jamboeditora.com.br/produto/ameacas-de-arton/",status:"catalogar"},
  {id:"atlas",name:"Atlas de Arton",url:"https://jamboeditora.com.br/produto/atlas-de-arton/",status:"catalogar"},
  {id:"deuses",name:"Deuses de Arton",url:"https://jamboeditora.com.br/produto/tormenta20-deuses-de-arton/",status:"catalogar"},
  {id:"dragao-brasil",name:"Dragão Brasil",url:"https://jamboeditora.com.br/",status:"mesa",note:"Cada número e opção precisam de fonte e autorização da mesa."}
 ];
 const ref=(page,section)=>({book:"jda-1.3",page,section,url:pdf});
 const classes={
  guerreiro:{name:"Guerreiro",initialPV:20,gainPV:5,gainPM:3,source:ref("64–67","O Guerreiro"),powerFrom:2,
   grants:{1:["ataque-especial"],3:["durao"],5:["ataque-especial"],6:["ataque-extra"],9:["ataque-especial"]}},
  ladino:{name:"Ladino",initialPV:12,gainPV:3,gainPM:4,source:ref("72–74","O Ladino"),powerFrom:2,
   grants:{1:["ataque-furtivo","especialista"],2:["evasao"],3:["ataque-furtivo"],4:["esquiva-sobrenatural"],5:["ataque-furtivo"],7:["ataque-furtivo"],8:["olhos-nas-costas"],9:["ataque-furtivo"],10:["evasao-aprimorada"],11:["ataque-furtivo"]}},
  lutador:{name:"Lutador",initialPV:20,gainPV:5,gainPM:3,source:ref("75–77","O Lutador"),powerFrom:2,
   grants:{1:["briga","golpe-relampago"],3:["casca-grossa"],5:["briga","golpe-cruel"],7:["casca-grossa"],9:["briga","golpe-violento"],11:["casca-grossa"]}}
 };
 const abilities={
  "ataque-especial":{name:"Ataque Especial",kind:"automática",classId:"guerreiro",source:ref("65","Ataque Especial"),
   versions:[{id:"base",minClassLevel:1,label:"Bônus +4, 1 PM"},{id:"nivel-5",minClassLevel:5,label:"Até +8, custo maior"},{id:"nivel-9",minClassLevel:9,label:"Até +12, custo maior"}],
   manual:{action:"Ao fazer um ataque",cost:"1 PM para +4; progressão por nível de guerreiro",effect:"Escolha bônus no teste de ataque ou no dano; a progressão permite aumentar o bônus com PM adicionais.",limit:"Não concede ataque nem ação extra. Use o patamar que o nível de guerreiro alcançou.",example:"Antes de resolver um ataque, gaste o PM e declare se o bônus irá ao acerto ou ao dano."}},
  "ataque-extra":{name:"Ataque Extra",kind:"automática",classId:"guerreiro",source:ref("67","Ataque Extra"),minClassLevel:6,
   manual:{action:"Ao usar a ação agredir",cost:"2 PM",effect:"Um ataque adicional.",limit:"Uma vez por rodada; não antecipa o 6º nível de guerreiro.",example:"Após agredir, pague 2 PM para acrescentar um ataque na mesma rodada."}},
  "durao":{name:"Durão",kind:"automática",classId:"guerreiro",source:ref("67","Durão"),minClassLevel:3,
   manual:{action:"Quando sofre dano",cost:"3 PM",effect:"Reduz esse dano à metade.",limit:"Depende de sofrer dano e do gasto de PM; não evita outros efeitos do ataque.",example:"Ao receber um golpe, pague 3 PM para reduzir o dano recebido pela metade."}},
  "briga":{name:"Briga",kind:"automática",classId:"lutador",source:ref("76","Briga"),
   versions:[{id:"base",minClassLevel:1,label:"1d6"},{id:"nivel-5",minClassLevel:5,label:"1d8"},{id:"nivel-9",minClassLevel:9,label:"1d10"}],
   manual:{action:"Ataque desarmado",cost:"Sem custo próprio",effect:"Dano base desarmado de acordo com o nível de lutador.",limit:"O dado depende do tamanho e do nível na classe; não adiciona ataques por si só.",example:"No 5º nível de lutador, um ataque desarmado usa o dado de Briga daquele patamar."}},
  "golpe-relampago":{name:"Golpe Relâmpago",kind:"automática",classId:"lutador",source:ref("76","Golpe Relâmpago"),
   manual:{action:"Quando usa agredir para um ataque desarmado",cost:"1 PM",effect:"Permite um ataque desarmado adicional.",limit:"A condição da ação e o gasto de PM continuam obrigatórios.",example:"Use agredir com um golpe desarmado; pague 1 PM para o ataque adicional."}},
  "ataque-furtivo":{name:"Ataque Furtivo",kind:"automática",classId:"ladino",source:ref("72–73","Ataque Furtivo"),
   versions:[1,3,5,7,9,11].map(n=>({id:"nivel-"+n,minClassLevel:n,label:"+"+((n+1)/2)+"d6"})),
   manual:{action:"Uma vez por rodada, ao acertar alvo desprevenido em corpo a corpo/alcance curto ou alvo que esteja flanqueando",cost:"Sem custo próprio",effect:"Dano extra que aumenta a cada dois níveis de ladino.",limit:"Alvo imune a crítico é imune a Ataque Furtivo; verifique alvo e alcance antes de somar dados.",example:"Contra alvo desprevenido em alcance curto, some os dados do seu nível de ladino em um ataque válido nesta rodada."}},
  "especialista":{name:"Especialista",kind:"automática",classId:"ladino",source:ref("73","Especialista"),
   manual:{action:"Ao testar uma das perícias treinadas escolhidas para Especialista",cost:"1 PM",effect:"Dobra o bônus de treinamento nessa perícia.",limit:"Escolha até Inteligência perícias treinadas (mínimo 1); não funciona em testes de ataque.",example:"Escolha uma perícia treinada na criação; quando for testá-la, pague 1 PM para dobrar o bônus de treinamento."}},
  "evasao":{name:"Evasão",kind:"automática",classId:"ladino",source:ref("73","Evasão"),
   manual:{action:"Ao passar em teste de Reflexos que reduziria dano à metade",cost:"Sem custo próprio",effect:"Não sofre esse dano.",limit:"Falha causa dano normal; não funciona com armadura pesada ou condição imóvel.",example:"Passe em Reflexos contra um efeito que permitiria meio dano e anule esse dano."}},
  "esquiva-sobrenatural":{name:"Esquiva Sobrenatural",kind:"automática",classId:"ladino",source:ref("74","Esquiva Sobrenatural"),
   manual:{action:"Passiva",cost:"Sem custo próprio",effect:"Você nunca fica surpreendido.",limit:"Não concede ação adicional nem impede outras condições.",example:"Em uma emboscada, aplique a regra de não ficar surpreendido."}},
  "olhos-nas-costas":{name:"Olhos nas Costas",kind:"automática",classId:"ladino",source:ref("74","Olhos nas Costas"),
   manual:{action:"Passiva",cost:"Sem custo próprio",effect:"Você não pode ser flanqueado.",limit:"Não impede outros modos de ficar desprevenido.",example:"Contra inimigos em lados opostos, não aplique a condição de flanqueado."}},
  "evasao-aprimorada":{name:"Evasão Aprimorada",kind:"automática",classId:"ladino",source:ref("74","Evasão Aprimorada"),
   manual:{action:"Ao fazer Reflexos contra efeito que permite reduzir dano à metade",cost:"Sem custo próprio",effect:"Se passar, não sofre dano; se falhar, sofre metade.",limit:"Não funciona com armadura pesada ou na condição imóvel.",example:"Numa falha em Reflexos contra o efeito adequado, receba metade do dano."}},
  "casca-grossa":{name:"Casca Grossa",kind:"automática",classId:"lutador",source:ref("77","Casca Grossa"),
   versions:[{id:"nivel-3",minClassLevel:3,label:"Con na Defesa"},{id:"nivel-7",minClassLevel:7,label:"Con +1 na Defesa"},{id:"nivel-11",minClassLevel:11,label:"Con +2 na Defesa"}],
   manual:{action:"Passiva a partir do nível 3 de lutador",cost:"Sem custo próprio",effect:"Soma Constituição à Defesa, limitada pelo nível; recebe +1 adicional nos níveis 7 e 11.",limit:"Não se aplica com armadura pesada; não concede redução de dano.",example:"No nível 7 de lutador, sem armadura pesada, confira o limite do nível ao somar Constituição e o bônus adicional."}},
  "golpe-cruel":{name:"Golpe Cruel",kind:"automática",classId:"lutador",source:ref("77","Golpe Cruel"),minClassLevel:5,
   manual:{action:"Passiva nos ataques desarmados",cost:"Sem custo próprio",effect:"Margem de ameaça aumenta em +1.",limit:"Não aumenta o multiplicador de crítico nem se aplica a ataques armados.",example:"Ao rolar o ataque desarmado, use a margem de ameaça ajustada."}},
  "golpe-violento":{name:"Golpe Violento",kind:"automática",classId:"lutador",source:ref("77","Golpe Violento"),minClassLevel:9,
   manual:{action:"Passiva nos ataques desarmados",cost:"Sem custo próprio",effect:"Multiplicador de crítico aumenta em +1.",limit:"Não altera a margem de ameaça nem se aplica a ataques armados.",example:"Quando houver crítico com ataque desarmado, aplique o multiplicador ajustado."}},
  "impeto":{name:"Ímpeto",kind:"poder",classId:"guerreiro",source:ref("66–67","Poder de Guerreiro — Ímpeto"),
   manual:{action:"Ao se deslocar",cost:"1 PM",effect:"Aumenta o deslocamento em 6 m por uma rodada.",limit:"Não concede outra ação de movimento.",example:"Pague 1 PM antes de se mover para alcançar uma posição mais distante nesta rodada."}},
  "ataque-reflexo":{name:"Ataque Reflexo",kind:"poder",classId:"guerreiro",source:ref("65","Poder de Guerreiro — Ataque Reflexo"),requires:{attributes:{DES:1}},
   manual:{action:"Quando alvo em alcance fica desprevenido ou sai voluntariamente do alcance",cost:"1 PM",effect:"Um ataque corpo a corpo contra esse alvo.",limit:"Uma vez por alvo a cada rodada; requer Des 1.",example:"Um inimigo sai voluntariamente do seu alcance: gaste 1 PM para atacá-lo dentro da condição indicada."}},
  "valentao":{name:"Valentão",kind:"poder",classId:"guerreiro",source:ref("67","Poder de Guerreiro — Valentão"),
   manual:{action:"Ao atacar alvo em uma das condições listadas",cost:"Sem custo próprio",effect:"Bônus de +2 em ataque e dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos.",limit:"Não causa essas condições por conta própria.",example:"Contra um alvo flanqueado, aplique o bônus somente enquanto a condição durar."}},
  "assassinar":{name:"Assassinar",kind:"poder",classId:"ladino",source:ref("73","Poder de Ladino — Assassinar"),requires:{classLevel:5},
   manual:{action:"Ação de movimento para analisar criatura em alcance curto",cost:"3 PM",effect:"O primeiro Ataque Furtivo que causar dano ao alvo dentro do prazo dobra seus dados extras.",limit:"Exige 5º nível de ladino; não dobra todos os danos do ataque.",example:"Analise um alvo, depois cumpra as condições de Ataque Furtivo até o fim do próximo turno."}},
  "ate-acertar":{name:"Até Acertar",kind:"poder",classId:"lutador",source:ref("76","Poder de Lutador — Até Acertar"),
   manual:{action:"Após errar ataque desarmado",cost:"Sem custo próprio",effect:"Bônus cumulativo de +2 em ataque e dano desarmado contra o mesmo oponente.",limit:"Termina ao acertar ou no fim da cena; não vale contra outro alvo.",example:"Após errar um alvo, aplique o bônus no próximo golpe desarmado contra ele."}},
  "bracos-calejados":{name:"Braços Calejados",kind:"poder",classId:"lutador",source:ref("76","Poder de Lutador — Braços Calejados"),
   manual:{action:"Passiva enquanto estiver sem armadura",cost:"Sem custo próprio",effect:"Soma Força à Defesa, limitada pelo nível.",limit:"Não funciona com armadura; verifique outros bônus de Defesa antes de acumular.",example:"Sem armadura, confira o limite do nível ao calcular a Defesa."}}
 };

 // Expansão fundamentada na Edição Jogo do Ano v1.3; todos os textos são sínteses.
 classes.arcanista={name:"Arcanista",initialPV:8,gainPV:2,gainPM:6,source:ref("36–43","O Arcanista"),powerFrom:2,
  grants:{1:["caminho-arcanista","magias-arcanas"],5:["magias-circulo-2"],9:["magias-circulo-3"]}};
 const automatic=(id,name,klass,page,action,cost,effect,limit,example)=>{abilities[id]={name,kind:"automática",classId:klass,source:ref(page,name),
  manual:{action,cost,effect,limit,example}}};
 automatic("caminho-arcanista","Caminho do Arcanista","arcanista","37","Ao adquirir seu primeiro nível de Arcanista","Sem gasto próprio","Escolha Bruxo, Mago ou Feiticeiro; cada caminho modifica a conjuração.","Caminho é escolha permanente; foco, grimório ou linhagem seguem o livro.","O registro de caminho define de onde o poder vem, sem criar magias grátis.");
 automatic("magias-arcanas","Magias Arcanas","arcanista","37–39","Conforme execução de cada magia","Conforme círculo e aprimoramentos","Aprende magias arcanas de círculos liberados por níveis de Arcanista.","Verifique ação, alcance, resistência e aprendizado do caminho; não use círculo maior antes da classe.","Escolha uma magia conhecida, pague o custo e resolva a resistência indicada.");
 automatic("magias-circulo-2","Segundo Círculo","arcanista","37–39","Na progressão de Arcanista 5","Conforme magia","Desbloqueia a possibilidade de aprender magias de 2º círculo.","Não é acesso no nível global 5 caso ainda não tenha cinco níveis de Arcanista.","Uma multiclasse Guerreiro 5/Arcanista 5 só recebe 2º círculo no décimo nível global.");
 automatic("magias-circulo-3","Terceiro Círculo","arcanista","37–39","Na progressão de Arcanista 9","Conforme magia","Desbloqueia a possibilidade de aprender magias de 3º círculo.","Requer nove níveis na classe, não apenas nove níveis totais.","Confira nível da classe e o grimório antes de escolher uma magia de 3º círculo.");
 const pow=(id,name,klass,page,action,cost,effect,limit,example,requires={},opts={})=>{
  abilities[id]={name,kind:"poder",classId:klass,source:ref(page,"Poder de "+klass),
   manual:{action,cost,effect,limit,example},requires,...opts};
 };
 // Guerreiro
 pow("bater-correr","Bater e Correr","guerreiro","65–67","Ao executar investida","2 PM apenas para efeito adicional","Permite seguir o deslocamento após o golpe da investida.","A investida ainda exige a ação e o movimento; não concede deslocamento infinito.","Avance, ataque e finalize o deslocamento restante.");
 pow("destruidor","Destruidor","guerreiro","65–67","Ataque corpo a corpo com arma de duas mãos","Passivo","Refaz resultados baixos do dado de dano da arma.","Requer Força 1 e arma de duas mãos; não afeta todos os dados de dano.", "Use após o ataque acertar e rolar dano da arma.",{attributes:{FOR:1}});
 pow("esgrimista","Esgrimista","guerreiro","65–67","Com arma leve ou ágil","Passivo","Soma Inteligência ao dano, dentro do limite do nível.","Requer Inteligência 1 e arma adequada.", "Acertando com uma arma ágil, confira o bônus de INT.",{attributes:{INT:1}});
 pow("especializacao-arma","Especialização em Arma","guerreiro","65–67","Ao atacar com a arma escolhida","Passivo","Aumenta o dano com a arma definida na aquisição.","A arma específica deve ser registrada; escolher não cria arma no inventário.","Anote katana ou espada longa como especialização definida.",{}, {repeatable:true});
 pow("golpe-raspao","Golpe de Raspão","guerreiro","65–67","Uma vez na rodada após errar ataque","2 PM","Permite causar parcela do dano apesar do erro.","Não aciona efeitos que exigem um ataque acertado.","Errou o golpe: decida gastar PM para causar dano parcial.");
 pow("golpe-pessoal","Golpe Pessoal","guerreiro","65–67","Quando faz um ataque com arma escolhida","Conforme efeitos selecionados","Cria técnica própria a partir dos efeitos legais do Golpe Pessoal.","Requer Guerreiro 5; efeitos exatos e custo precisam ser definidos com a mesa.","Uma técnica de espada reproduz uma finalização, respeitando a soma de PM e limite.",{classLevel:5});
 pow("romper-resistencias","Romper Resistências","guerreiro","65–67","Ao usar Ataque Especial","1 PM adicional","O golpe ignora parte da redução de dano do alvo.","Só acompanha Ataque Especial efetivamente usado.","Pague o extra antes de aplicar a redução de dano.");
 pow("solidez","Solidez","guerreiro","65–67","Enquanto usa escudo","Passivo","Concede proteção adicional em testes de resistência segundo o escudo.","Não funciona sem escudo; confere bônus ao equipamento de fato usado.","Proteja-se com escudo durante uma explosão.");
 pow("tornado-dor","Tornado de Dor","guerreiro","65–67","Ação padrão atingindo vários adjacentes","2 PM","Faz uma manobra de ataque giratório contra alvos no alcance.","Requer Guerreiro 6 e arma corpo a corpo; não é ataque à distância.","Gire a lâmina entre inimigos próximos, calculando o dano legal.",{classLevel:6});
 pow("ambidestria","Ambidestria","guerreiro","65–67","Ao agredir com duas armas","Passivo","Permite dois ataques respeitando penalidade.","Requer Destreza 2 e ao menos uma arma leve.","Use duas armas adequadas e aplique a penalidade ao ataque.",{attributes:{DES:2}});
 // Ladino
 pow("emboscar","Emboscar","ladino","72–74","Primeira rodada do combate","2 PM","Concede ação padrão adicional na abertura.","Exige treino em Furtividade e só funciona na primeira rodada.","Abra com uma ação decisiva; não repita nas rodadas posteriores.");
 pow("sombra","Sombra","ladino","72–74","Ao usar Furtividade","Passivo","Reduz penalidades de movimento e ações ruidosas ao ocultar-se.","Requer treino em Furtividade; não torna invisível.","Aproxime-se no deslocamento normal sem a penalidade usual.");
 pow("velocidade-ladina","Velocidade Ladina","ladino","72–74","Uma vez por rodada no próprio turno","2 PM","Concede ação de movimento adicional.","Exige Destreza 2 e treino em Iniciativa.","Reposicione-se e então use a ação principal.",{attributes:{DES:2}});
 pow("mente-criminosa","Mente Criminosa","ladino","72–74","Ao testar Furtividade ou Ladinagem","Passivo","Permite somar Inteligência nas perícias indicadas.","Requer INT 1; não substitui outros requisitos.", "Use conhecimento para infiltração.",{attributes:{INT:1}});
 pow("gatuno","Gatuno","ladino","72–74","Ao escalar ou testar Atletismo","Passivo","Melhora movimentação e escalada.","Não transforma a escalada em teleporte.", "Suba por uma fachada no ritmo permitido.");
 pow("escapista","Escapista","ladino","72–74","Em testes para escapar ou atravessar obstáculos","Passivo","Concede vantagem numérica em situações de fuga especificadas.","Aplica somente aos testes e condições relacionados.","Escape de uma imobilização ou atravesse uma passagem estreita.");
 pow("rolamento-defensivo","Rolamento Defensivo","ladino","72–74","Ao sofrer dano","2 PM","Reduz o dano recebido e deixa o personagem caído.","Requer treino em Reflexos; ficar caído é um custo tático.","Role para evitar parte do golpe e levante-se depois.");
 // Lutador
 pow("arma-improvisada","Arma Improvisada","lutador","75–77","Ao usar objeto improvisado","Passivo","Permite improvisar ataques com objetos como extensões dos golpes.","Objeto pode quebrar; não substitui itens mágicos nem proficiência geral.","Use um bastão improvisado e verifique sua integridade.");
 pow("cabecada","Cabeçada","lutador","75–77","Ao atacar desarmado","2 PM","Deixa o alvo desprevenido para o ataque.","Uma vez por cena por alvo; não controla alvo à distância.","Aproveite a abertura e acerte um golpe corporal.");
 pow("convencido","Convencido","lutador","75–77","Em resistência a medo e efeitos mentais","Passivo","Melhora resistências a medo e mental.","Não garante imunidade a todo controle ou dano psíquico.","Resista melhor a um efeito de intimidação.");
 pow("golpe-baixo","Golpe Baixo","lutador","75–77","Ao acertar ataque desarmado com declaração","2 PM","Pode atordoar caso o alvo falhe em Fortitude.","Limite de uso contra o mesmo alvo durante cena.","Declare antes do ataque e aguarde teste de Fortitude.");
 pow("golpe-imprudente","Golpe Imprudente","lutador","75–77","Ao usar Golpe Relâmpago","Conforme habilidade base","Amplia dano do ataque em troca de queda de Defesa.","Penalidade defensiva dura até o próximo turno.","Aposte na pressão ofensiva e aceite a exposição.");
 pow("lutador-chao","Lutador de Chão","lutador","75–77","Ao agarrar ou derrubar","1 PM para manobra extra","Melhora manobras e permite derrubar após agarrar.","Precisa do alvo no alcance e de agarrar legalmente.","Agarrar e derrubar uma criatura próxima.");
 pow("rasteira","Rasteira","lutador","75–77","Ao atacar desarmado criatura de tamanho válido","2 PM","Pode deixar alvo caído se o ataque acertar.","Limite de tamanho; não derruba qualquer inimigo automaticamente.","Acerte as pernas de um alvo de tamanho permitido.");
 pow("sarado","Sarado","lutador","75–77","Passivo","Sem gasto","Soma sua Força ao total de PV e aos testes de Fortitude.","Requer Força 3 e não anula outras condições.","A partir da aquisição, acrescente sua Força ao total de PV e aos testes de Fortitude; o subtotal básico de PV do laboratório não inclui esse bônus.",{attributes:{FOR:3}});
 pow("trocacao","Trocação","lutador","75–77","Depois de acertar golpe desarmado","PM crescentes por golpe extra","Permite continuar golpes contra o mesmo alvo até erro ou falta de PM.","Requer Lutador 6; PM do turno limitam a sequência.", "Após acertar o primeiro golpe, escolha investir mais PM.",{classLevel:6});
 pow("voadora","Voadora","lutador","75–77","Durante investida desarmada","2 PM","Aumenta dano conforme deslocamento e limite do nível.","Exige investida e espaço de movimento, não é voo livre.","Corra e chute ao final da investida.");
 pow("punhos-adamante","Punhos de Adamante","lutador","75–77","Ao atacar desarmado alvo com RD","Passivo","Ignora até parte da RD inimiga nas condições do poder.","Requer Lutador 8; não elimina qualquer imunidade.", "Aplique o ataque desarmado ignorando a RD permitida.",{classLevel:8});
 pow("confianca-ringues","Confiança dos Ringues","lutador","75–77","Quando inimigo erra corpo a corpo contra você","Passivo","Ganha PM temporários limitados pelo nível.","Requer Lutador 8; PM temporários expiram no fim da cena.", "Recupere ímpeto ao desviar de um soco inimigo.",{classLevel:8});
 // Arcanista
 pow("arcano-batalha","Arcano de Batalha","arcanista","39–42","Ao causar dano com uma magia","Passivo","Adiciona o atributo-chave ao dano mágico.","Não aumenta danos de armas comuns ou de magias sem dano.","Some atributo ao dano da magia ofensiva.");
 pow("conhecimento-magico","Conhecimento Mágico","arcanista","39–42","Ao selecionar o poder","Passivo","Aprende duas magias de círculos já disponíveis.","Não desbloqueia círculos novos nem magias exclusivas não permitidas.","Escolha duas magias válidas do grimório do mesmo nível.",{}, {repeatable:true});
 pow("envolto-misterio","Envolto em Mistério","arcanista","39–42","Em situações sociais apropriadas","Passivo","Melhora manipulação de pessoas supersticiosas ou inexperientes.","O mestre determina quem se enquadra; não é controle mental.","Use presença inquietante para apoiar Enganação.");
 pow("especialista-escola","Especialista em Escola","arcanista","39–42","Ao lançar magias de escola selecionada","Passivo","Aumenta CD de uma escola escolhida.","Requer caminho Bruxo ou Mago; escola precisa estar registrada.","Concentre-se em magias de Ilusão para dificultar resistências.");
 pow("fortalecimento-arcano","Fortalecimento Arcano","arcanista","39–42","Ao lançar magia que exige resistência","Passivo","Aumenta a CD de resistência às magias.","Requer cinco níveis de Arcanista; não acumula com cópias indevidas.","Aplique a CD revisada em encantamento.",{classLevel:5});
 pow("magia-pungente","Magia Pungente","arcanista","39–42","Ao lançar magia com resistência","1 PM adicional","Pode tornar mais difícil resistir à magia.","Exige pagar PM e ainda respeitar o limite de gasto.","Antes de lançar Hipnotismo, declare o aprimoramento do poder.");
 pow("poder-magico","Poder Mágico","arcanista","39–42","Passivo","Sem gasto","Amplia PM proporcionalmente aos níveis de Arcanista.","É um efeito adicional ao subtotal de classe; precisa integrar cálculo final.","Ao evoluir Arcanista, atualize PM do poder.");
 pow("raio-arcano","Raio Arcano","arcanista","39–42","Ação padrão contra alvo em alcance curto","Sem custo próprio","Canaliza dano de essência com resistência de Reflexos.","Não é ataque desarmado; não ganha benefícios de Lutador.","Descreva uma lágrima ou descarga arcana e faça o teste da magia.");
 pow("raio-elemental","Raio Elemental","arcanista","39–42","Ao usar Raio Arcano","1 PM","Altera o tipo de dano e pode impor condição conforme elemento.","Requer Raio Arcano; verificar resistência e tipo declarado.","Use um raio frio para reduzir a mobilidade do alvo.",{powers:["raio-arcano"]});
 pow("raio-poderoso","Raio Poderoso","arcanista","39–42","Ao usar Raio Arcano","Sem custo próprio","Aumenta dado de dano e alcance do raio.","Requer Raio Arcano e não concede novo ataque.","Atinja inimigo mais distante com o poder aprimorado.",{powers:["raio-arcano"]});
 pow("fluxo-mana","Fluxo de Mana","arcanista","39–42","Ao sustentar efeitos","Custo individual das magias","Permite sustentar simultaneamente dois efeitos com uma ação livre.","Requer Arcanista 10; cada magia mantém sua duração e custo.","Sustente dois efeitos compatíveis pagando todos os PM.",{classLevel:10});
 pow("familiar","Familiar","arcanista","39–42","Ao adquirir o poder","Ritual para substituir","Adquire parceiro mágico limitado às características de seu tipo.","Não possui ações de personagem adicionais gratuitas.","Escolha forma e benefício do familiar no livro.");
 pow("foco-vital","Foco Vital","arcanista","39–42","Ao sofrer dano que derrubaria PV a zero","Sem gasto próprio","Permite usar o foco como recurso de sobrevivência.","Exige Bruxo e foco empunhado.","O foco absorve o excedente do ataque fatal.");
 // Patrimônio de regras: estes campos foram verificados apenas no livro básico.
 const origins={
  soldado:{name:"Soldado",choices:["Fortitude","Guerra","Luta","Pontaria"],source:ref("87–95","Origem Soldado")},
  criminoso:{name:"Criminoso",choices:["Enganação","Furtividade","Ladinagem"],source:ref("87–95","Origem Criminoso")},
  estudioso:{name:"Estudioso",choices:["Conhecimento","Guerra","Misticismo"],source:ref("87–95","Origem Estudioso")},
  gladiador:{name:"Gladiador",choices:["Atuação","Luta"],source:ref("87–95","Origem Gladiador")},
  eremita:{name:"Eremita",choices:["Misticismo","Religião","Sobrevivência"],source:ref("87–95","Origem Eremita")},
  forasteiro:{name:"Forasteiro",choices:["Cavalgar","Pilotagem","Sobrevivência"],source:ref("87–95","Origem Forasteiro")},
  pivete:{name:"Pivete",choices:["Furtividade","Iniciativa","Ladinagem"],source:ref("87–95","Origem Pivete")}
 };

 const catalog={schema:1,books,classes,abilities,origins,races:{humano:{name:"Humano",source:ref("19","Humano"),bonus:"+1 em três atributos diferentes",note:"Versátil exige escolha de perícias ou poder geral, ainda não automatizada."}},pointBuy:{"-1":-1,"0":0,"1":1,"2":2,"3":4,"4":7},pointBudget:10,multiclass:ref("35","Subindo de nível / Multiclasse")};
 if(typeof module!=="undefined"&&module.exports)module.exports=catalog;
 if(typeof window!=="undefined")window.T20_RULES=catalog;
})();


/* class-options.js */
/* O SISTEMA // Fase IV. Metadados verificáveis e resolução conservadora.
   Identificar uma opção em um catálogo NÃO valida suas regras mecânicas. */
(()=>{
 "use strict";
 const herois="https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/";
 const jda="https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf";
 const baseNames={
  arcanista:"Arcanista",barbaro:"Bárbaro",bardo:"Bardo",bucaneiro:"Bucaneiro",
  cacador:"Caçador",cavaleiro:"Cavaleiro",clerigo:"Clérigo",druida:"Druida",
  guerreiro:"Guerreiro",inventor:"Inventor",ladino:"Ladino",lutador:"Lutador",
  nobre:"Nobre",paladino:"Paladino"
 };
 // Apenas quatro classes têm progressões codificadas no motor atual.
 const basics=Object.fromEntries(Object.entries(baseNames).map(([id,name])=>
  [id,{id,name,source:{book:"jda-1.3",edition:"v1.3",url:jda},
   status:["arcanista","guerreiro","ladino","lutador"].includes(id)?"parcial":"pendente",
   note:"Acesso a PV, PM, poderes, perícias e progressão depende de cadastro mecânico conferido."}]));
 basics.treinador={id:"treinador",name:"Treinador",source:{book:"herois",edition:"v1.1 — maio/2025",page:"16–21",url:herois},
  status:"pendente",note:"Classe básica de Heróis de Arton; mecânica não verificada."};
 // Tabela 1-2 de Heróis de Arton v1.1 (maio/2025), p. 22:
 // filiação de cada variante identificada diretamente no PDF fornecido.
 // Somente variantes com progressões/manuais estruturados tornam-se elegíveis.
 const variantRows=[
  ["necromante","Necromante","arcanista","34–35"],
  ["machado-de-pedra","Machado de Pedra","barbaro","32–33"],
  ["magimarcialista","Magimarcialista","bardo","33–34"],
  ["duelista","Duelista","bucaneiro","27–28"],
  ["seteiro","Seteiro","cacador","38–39"],
  ["vassalo","Vassalo","cavaleiro","41–43"],
  ["usurpador","Usurpador","clerigo","40–41"],
  ["ermitao","Ermitão","druida","29–30"],
  ["inovador","Inovador","guerreiro","30–31"],
  ["alquimista","Alquimista","inventor","22–24"],
  ["ventanista","Ventanista","ladino","44–45"],
  ["atleta","Atleta","lutador","24–25"],
  ["burgues","Burguês","nobre","25–27"],
  ["santo","Santo","paladino","37–38"]
 ];
 const variants=Object.fromEntries(variantRows.map(([id,name,baseClassId,page])=>[
  id,{id,name,baseClassId,source:{book:"herois",edition:"v1.1 — maio/2025",page,url:herois},
   status:"pendente",note:"Filiação e localização conferidas na Tabela 1-2; progressão e efeitos ainda não integrados ao motor."}
 ]));
 const paths={
  arcanista:{
   bruxo:{id:"bruxo",name:"Bruxo",source:{book:"jda-1.3",page:"37",url:jda},status:"parcial"},
   mago:{id:"mago",name:"Mago",source:{book:"jda-1.3",page:"37",url:jda},status:"parcial"},
   feiticeiro:{id:"feiticeiro",name:"Feiticeiro",source:{book:"jda-1.3",page:"37",url:jda},status:"parcial",
    note:"Linhagens e habilidades ainda não codificadas; impedir aprovação."}
  }
 };
 const distinctions={
  "cavaleiro-corvo":{id:"cavaleiro-corvo",name:"Cavaleiro do Corvo",source:{book:"herois",edition:"v1.1",page:"139–141",url:herois},status:"pendente"},
  "guerreiro-magico":{id:"guerreiro-magico",name:"Guerreiro Mágico",source:{book:"herois",edition:"v1.1",page:"169–171",url:herois},status:"pendente"},
  "medico-salistick":{id:"medico-salistick",name:"Médico de Salistick",source:{book:"herois",edition:"v1.1",page:"181–183",url:herois},status:"pendente"}
 };
 const ADMISSIONS=["pretendida","admissao-pendente","admitida","incompativel"];
 const distinctItem=(raw={})=>({
  id:String(raw.id||"").slice(0,80),
  admission:ADMISSIONS.includes(raw.admission)?raw.admission:"pretendida",
  approval:String(raw.approval||"").slice(0,240),
  notes:String(raw.notes||"").slice(0,600),
  powerIds:Array.isArray(raw.powerIds)?[...new Set(raw.powerIds.filter(x=>typeof x==="string").slice(0,30))]:[]
 });
 function evaluateDistinctions(entries){
  const issues=[],details=[];
  for(const item of entries){
   const spec=distinctions[item.id];
   const validated=spec?.status==="verificado"&&spec?.source?.page&&spec?.powers;
   if(!validated){issues.push("Distinção "+(spec?.name||item.id)+": regras de admissão e poderes não verificadas; nenhum benefício concedido.");}
   else if(item.admission!=="admitida"||!item.approval.trim())issues.push("Distinção "+spec.name+": aprovação narrativa da mesa pendente.");
   else for(const powerId of item.powerIds)if(!spec.powers[powerId])issues.push("Poder de distinção "+powerId+" não cadastrado.");
   details.push({id:item.id,name:spec?.name||item.id,status:!validated?"bloqueada":item.admission,granted:validated&&item.admission==="admitida"&&!!item.approval.trim()?item.powerIds.filter(p=>!!spec.powers[p]):[]});
  }
  return {issues,details};
 }
 /*
  Registro mecânico extensível:
  {id,baseClassId,status:"verificado",source:{book,edition,page,url},
   stats:{initialPV,gainPV,gainPM},levels:{1:{remove:[...],add:[...]},...}}
  Uma regra verificada deve informar substituições com IDs existentes. Nunca
  acumular um grant substituído ao seu sucessor por engano.
 */
 function resolveClassStep({classId,classLevel,variantId="",classRule,abilities={},allowedBooks=["jda-1.3"],registry=variants}){
  const normal=(classRule?.grants?.[classLevel]||[]).slice();
  const result={grants:normal,retained:normal.slice(),removed:[],added:[],issues:[],
   calculable:true,powerFrom:classRule?.powerFrom,exclusivePowers:[],removedPowers:[],stats:classRule?{initialPV:classRule.initialPV,gainPV:classRule.gainPV,gainPM:classRule.gainPM}:null,variant:null};
  if(!variantId)return result;
  const variant=registry[variantId];
  result.variant=variant||null;
  if(!variant||variant.status!=="verificado"||variant.baseClassId!==classId
   ||!variant.source?.book||!variant.source?.edition||!variant.source?.page
   ||!allowedBooks.includes(variant.source.book)){
   result.issues.push("Variante "+(variant?.name||variantId)+": regra de substituição, filiação, página ou fonte não verificada/permitida.");
   result.calculable=false;return result;
  }
  if(variant.powerFrom!==undefined){
   if(!Number.isInteger(variant.powerFrom)||variant.powerFrom<1||variant.powerFrom>12){
    result.issues.push("Patamar de poder inválido na variante "+variant.name);
    result.calculable=false;return result;
   }
   result.powerFrom=variant.powerFrom;
  }
  result.exclusivePowers=(variant.powers?.exclusive||[]).slice();
  result.removedPowers=(variant.powers?.remove||[]).slice();
  if(result.exclusivePowers.some(id=>abilities[id]?.kind!=="poder"||abilities[id]?.classId!==variant.id||!abilities[id]?.manual)
    ||result.removedPowers.some(id=>abilities[id]?.kind!=="poder"||abilities[id]?.classId!==classId)){
   result.issues.push("Lista de poderes exclusivos/removidos inválida na variante "+variant.name);
   result.calculable=false;return result;
  }
  // Uma variante é uma progressão própria. Sem política registrada, não
  // presumir herança automática das habilidades da classe original.
  if(!["lista-explicita","substituicoes-verificadas"].includes(variant.grantPolicy)){
   result.issues.push("Variante "+variant.name+": política de preservação ausente; não herdar habilidades implicitamente.");
   result.calculable=false;return result;
  }
  const target=variant.levels?.[classLevel];
  if(variant.grantPolicy==="lista-explicita"&&!target){
   result.issues.push("Variante "+variant.name+": tabela explícita ausente no nível de classe "+classLevel+".");
   result.calculable=false;return result;
  }
  const remove=target?.remove||[],add=target?.add||[];
  const keep=variant.grantPolicy==="lista-explicita"?(target?.keep||[]):normal.filter(id=>!remove.includes(id));
  if(remove.some(id=>!normal.includes(id))
   ||keep.some(id=>!normal.includes(id))
   ||new Set(keep).size!==keep.length
   ||add.some(id=>!abilities[id]?.manual)
   ||new Set(add).size!==add.length
   ||add.some(id=>keep.includes(id))
   ||(variant.grantPolicy==="lista-explicita"&&remove.some(id=>keep.includes(id)))){
   result.issues.push("Variante "+variant.name+": substituições inconsistentes no nível de classe "+classLevel+".");
   result.calculable=false;return result;
  }
  result.retained=keep.slice();
  result.removed=normal.filter(id=>!keep.includes(id));
  result.added=add.slice();result.grants=[...result.retained,...result.added];
  if(variant.stats)for(const key of ["initialPV","gainPV","gainPM"]){
   if(Object.prototype.hasOwnProperty.call(variant.stats,key)){
    if(!Number.isFinite(variant.stats[key])||variant.stats[key]<0){result.calculable=false;result.issues.push("PV/PM inválidos na variante "+variant.name+".")}
    else result.stats[key]=variant.stats[key];
   }
  }
  return result;
 }
 function recommend(sheet,rulebook){
  const first=sheet.levels?.find(x=>x.classId)?.classId||"";
  const compatible=Object.values(variants).filter(v=>v.status==="verificado"&&v.baseClassId===first&&sheet.allowedBooks?.includes(v.source?.book));
  const status=compatible.length?"comparar":"sem-variantes-verificadas";
  return {status,current:first,variants:compatible.map(v=>({id:v.id,name:v.name,source:v.source})),
   paths:first==="arcanista"?Object.values(paths.arcanista).map(x=>({id:x.id,name:x.name,status:x.status})):[],
   note:compatible.length?"Compare perdas, ganhos e pré-requisitos antes de decidir.":"Nenhuma variante mecanicamente verificada para esta classe. Não gerar otimização fictícia."};
 }
 const api={basics,variants,paths,distinctions,ADMISSIONS,distinctItem,evaluateDistinctions,resolveClassStep,recommend};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 if(typeof window!=="undefined")window.T20_CLASS_OPTIONS=api;
})();


/* herois-variants.js */
/* O SISTEMA // Fonte: Heróis de Arton, 1ª ed. v1.1 (maio/2025).
 * Somente sínteses de regras e estruturas mecânicas, sem transcrever o livro.
 * Quatro variantes usam classes básicas já parcialmente modeladas.
 * O estado "verificado" atesta APENAS a tabela de 1–12 e os resumos abaixo,
 * nunca o total da ficha (equipamentos, CD e magias podem permanecer parciais). */
(function(root){
 "use strict";
 function install(rules,options){
  if(!rules?.abilities||!options?.variants)return false;
  const url="https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/";
  const source=(page,section)=>({book:"herois",edition:"v1.1 — maio/2025",page,section,url});
  const define=(id,name,classId,page,action,cost,effect,limit,example,versions)=>{
   rules.abilities[id]={name,kind:"automática",classId,source:source(page,name),manual:{action,cost,effect,limit,example}};
   if(versions)rules.abilities[id].versions=versions.map(([minClassLevel,label])=>({id:"nivel-"+minClassLevel,minClassLevel,label}));
  };
  // Atleta, Heróis de Arton, pp. 24–25, Tabela 1-4.
  define("atleta-facanha","Façanha Atlética","atleta","24","Ao fazer teste de perícia","PM escolhidos, até o valor de Força","+2 no teste por PM gasto","Não aumenta ataques automaticamente; respeitar limite de gasto.","Em uma escalada, gaste PM antes de resolver Atletismo.");
  define("atleta-arremesso","Arremesso Atlético","atleta","24–25","Ataques com armas de arremesso","Passiva","Aumenta alcance em um passo; pode usar dado de Briga no lugar do dano da arma.","Somente armas de arremesso; a partir do 10º nível contam como ataques desarmados para habilidades.","Arremesse uma arma no alcance ampliado e escolha o dado de Briga.");
  define("atleta-poderio","Poderio Muscular","atleta","25","Lançar Primor Atlético somente em si","Custo/ação da magia simulada","Concede uma simulação não mágica de Primor Atlético.","Conferir ação, duração e custo da magia básica; não concede lançamentos sobre aliados.","Use antes de uma proeza física relevante.");
  define("atleta-mobilidade","Mais Alto e Mais Rápido","atleta","25","Passiva","Sem custo","+3 m ao deslocamento e deslocamentos de escalada/natação relativos ao deslocamento normal.","Natação não concede respiração aquática; os casos de deslocamento já existente têm regra própria.","Aumente deslocamento, atravesse terreno e conte turnos sem respirar.");
  define("atleta-disciplina","Disciplina Atlética","atleta","25","Após falhar em teste de resistência","2 PM","Rola novamente usando Atletismo em lugar da perícia de resistência.","Somente após falha; a nova rolagem substitui o teste dentro da condição.","Falhe em Reflexos e tente novamente com Atletismo.");
  // Inovador, pp. 30–31, Tabela 1-8.
  define("inovador-equipamento","Do Bom e do Melhor","inovador","30–31","Na criação e ao verificar proficiência","Equipamento inicial, sem PM","Começa com um item superior permitido dentro do limite de preço.","Armas, armaduras e escudos não superiores/não mágicos passam a ser tratados como não proficientes.","Registre o equipamento superior e confronte as proficiências.");
  define("inovador-sequencia","Sequência Especial","inovador","30–31","Ao alternar armas numa sequência","2 PM, podendo aumentar em patamares","Bônus acumulado de ataque e dano com armas diferentes na sequência.","Exige alternância real; termina ao fim da cena ou após uma rodada sem trocar ao menos uma arma.","Abra a sequência e varie a arma para acumular bônus.",
   [[1,"Até +2"],[5,"Até +4"],[9,"Até +6"]]);
  define("inovador-bombardeio","Bombardeio Sequencial","inovador","31","Ao usar preparados alquímicos ou poções","Conforme Sequência Especial","Permite aplicar a sequência também a esses itens.","O bônus acumulado ajusta a CD de resistência nas condições da regra; não concede uso gratuito.","Varie os itens dentro da sequência e acompanhe a CD.");
  define("inovador-acrobacia","Acrobacia Defensiva","inovador","31","Quando sofre dano","2 PM","Subtrai do dano o resultado de um teste de Acrobacia.","Requer o teste e o gasto de PM; não evita automaticamente outros efeitos.","Role Acrobacia e reduza o dano válido.");
  define("inovador-dominio","Domínio Excêntrico","inovador","31","Após uma semana usando equipamento específico","Passiva","Permite proficiência com arma exótica ou de fogo superior/mágica acompanhada por uma semana.","O prazo, o tipo e a qualidade do equipamento devem ser comprovados.","Registre a arma e a semana de familiarização.");
  define("inovador-tecnica","Técnica do Inovador","inovador","31","Ativação para armas empunhadas","2 PM","Permite tratar temporariamente a arma como tendo uma propriedade escolhida entre as previstas.","A tabela chama 'técnica excêntrica'; o texto explicativo chama 'técnica revolucionária'. Nome sujeito a errata; não combinar duas ativações.","Escolha uma propriedade e acompanhe o fim do efeito.");
  // Necromante, pp. 34–35, Tabela 1-11.
  define("necro-caminho","Caminho do Necromante","necromante","34–35","Antes de conjurar, ao conectar-se à morte","PV conforme círculo acessado","Permite magias divinas de necromancia como arcanas e usa Inteligência.","Não aprende Encantamento; ao menos metade das magias aprendidas deve ser Necromancia. Requer conexão custeada em PV.","Antes da cena, conecte-se ao círculo necessário e mantenha os limites.");
  define("necro-mortos","Falar com Mortos","necromante","35","Interação com morto-vivo; a partir do nível 3 com cadáver","1 PM para a opção de cadáver","Permite interação com mortos-vivos por Misticismo e diálogo condicionado com cadáver.","A opção de cadáver exige ação padrão, alcance curto e nível 3; não concede necromancia irrestrita.","Use Misticismo para dialogar; com cadáver, pague PM após alcançar nível 3.");
  define("necro-animar","Animar Cadáver","necromante","35","Ação completa com cadáver apropriado","3 PM inicial; patamares superiores custam mais","Cria parceiro cadáver temporário de categoria adequada.","Um parceiro cadáver por vez; não é personagem adicional, e sacrificar exige condição de dano.","Anime um cadáver em alcance curto como parceiro iniciante.");
  define("necro-necrologia","Necrologia","necromante","35","Passiva","Sem custo","Bônus em Cura, Fortitude e CD de magias de necromancia.","Não aumenta todas as CDs; só aplica a magias identificadas como Necromancia.",
   "Aplique o bônus à resistência de um alvo contra magia necromântica.",[[3,"+2"],[8,"+3"]]);
  define("necro-distorcao","Distorção Necrótica","necromante","35","Ao escolher magia conhecida do primeiro círculo","Sem custo próprio","Transforma escola de magia não necromântica escolhida em Necromancia.","Escolha específica e compatibilidade devem ser registradas; não concede uma magia nova.","Registre a magia escolhida e altere somente sua escola.");
  define("necro-potencia","Necropotência","necromante","35","Na conexão à morte e quando magia derruba inimigo vivo","PV adicionais de conexão","Pode receber PM temporários ao derrotar inimigos vivos com Necromancia.","Depende de dobrar PV da conexão; PM temporários têm limite por cena e expiram.","Conecte-se com custo extra e acompanhe ganhos temporários.");
  // Ventanista, pp. 44–45, Tabela 1-16.
  define("ventanista-charme","Charme","ventanista","44","Passiva no total de PM; testes não ofensivos com gasto","Até Carisma PM, +2 por PM","+Carisma no total de PM e melhora de perícias elegíveis mediante gasto.","Não se aplica a testes de ataque e não é bônus contínuo em perícia.","Gaste PM durante Ladinagem para aumentar um teste.");
  define("ventanista-truques","Truques do Ofício","ventanista","44–45","Simulação não mágica de magias restritas","Conforme magia simulada","Permite simular Encantamento e Ilusão, começando com duas opções e novas escolhas em níveis pares.","O círculo segue o nível do Ventanista; não recebe benefícios de itens e efeitos que exigem magia real.","Registre a simulação e gaste a ação e os PM aplicáveis.");
  define("ventanista-disfarce","Disfarce Elaborado","ventanista","45","Quando usa Enganação para criar disfarce","Penalidade em PM máximos durante o disfarce","Pode simular poderes condicionados a disfarce e pré-requisitos.","Não concede permanentemente poderes; exige cumprir requisitos e registrar a ficção escolhida.","Crie identidade adequada e registre o poder condicional.",[[3,"1 poder"],[9,"2 poderes"]]);
  define("ventanista-virar","Virar a Casaca","ventanista","45","Ao retirar disfarce","1 PM","Pode tentar esconder-se usando Enganação sem a cobertura habitual.","Necessita estar disfarçado e cumprir o gatilho da habilidade.","Tire o disfarce e use Enganação para ocultar-se.");
  define("ventanista-provocar","Provocação Ousada","ventanista","45","Primeiro turno de cena; recuperação no início de turnos","Ação completa","Recupera PM condicionais após provocar adversários e aumentar suas chances de perceber e resistir.","Só funciona se houver risco real validado pelo mestre; recuperação limitada por cena ao nível.","Anuncie a intenção sob risco e acompanhe PM a recuperar.");
  const lv=(keep=[],add=[])=>({keep,add});
  const defineVariant=(id,name,base,page,table,levels)=>{
   options.variants[id]={id,name,baseClassId:base,source:source(page,table),status:"verificado",
    validationScope:"habilidades automáticas e patamares até o nível 12; cálculos derivados permanecem parciais",
    grantPolicy:"lista-explicita",powerFrom:2,powers:{exclusive:[],remove:[]},levels};
  };
  defineVariant("atleta","Atleta","lutador","24–25","Tabela 1-4",{
   1:lv(["briga"],["atleta-facanha"]),
   2:lv([],["atleta-arremesso","atleta-poderio"]),
   3:lv(["casca-grossa"]),
   4:lv(),5:lv(["briga"],["atleta-mobilidade"]),6:lv(),7:lv(["casca-grossa"]),
   8:lv(),9:lv(["briga"],["atleta-disciplina"]),10:lv(),11:lv(["casca-grossa"]),12:lv()
  });
  defineVariant("inovador","Inovador","guerreiro","30–31","Tabela 1-8",{
   1:lv([],["inovador-equipamento","inovador-sequencia"]),
   2:lv([],["inovador-bombardeio"]),3:lv([],["inovador-acrobacia"]),
   4:lv([],["inovador-dominio"]),5:lv([],["inovador-sequencia"]),
   6:lv(),7:lv([],["inovador-tecnica"]),8:lv(),9:lv([],["inovador-sequencia"]),
   10:lv(),11:lv(),12:lv()
  });
  defineVariant("necromante","Necromante","arcanista","34–35","Tabela 1-11",{
   1:lv(["magias-arcanas"],["necro-caminho","necro-mortos"]),
   2:lv([],["necro-animar"]),3:lv([],["necro-necrologia"]),
   4:lv([],["necro-distorcao"]),5:lv(["magias-circulo-2"],["necro-potencia"]),
   6:lv(),7:lv(),8:lv([],["necro-necrologia"]),
   9:lv(["magias-circulo-3"]),10:lv(),11:lv(),12:lv()
  });
  defineVariant("ventanista","Ventanista","ladino","44–45","Tabela 1-16",{
   1:lv([],["ventanista-charme","ventanista-truques"]),
   2:lv(["evasao"]),3:lv([],["ventanista-disfarce"]),4:lv(["esquiva-sobrenatural"]),
   5:lv(),6:lv(),7:lv([],["ventanista-virar"]),8:lv(["olhos-nas-costas"]),
   9:lv([],["ventanista-disfarce"]),10:lv(["evasao-aprimorada"]),
   11:lv([],["ventanista-provocar"]),12:lv()
  });
  // Livro parcialmente indexado: selecionar o livro não habilita opções sem uma
  // declaração individual status=verificado, fonte e tabela completa.
  const book=rules.books.find(b=>b.id==="herois");
  if(book){book.status="parcial";book.edition="v1.1";book.note="Quatro variantes com progressões indexadas; as demais opções continuam pendentes."; }
  return true;
 }
 if(typeof module!=="undefined"&&module.exports)module.exports={install};
 if(root?.T20_RULES&&root?.T20_CLASS_OPTIONS)install(root.T20_RULES,root.T20_CLASS_OPTIONS);
})(typeof window!=="undefined"?window:null);


/* build-engine.js */
/* O Sistema // motor conservador do laboratório. Nunca usa a última classe
   para recalcular os níveis anteriores nem promove um rascunho a aprovado. */
(()=>{
 "use strict";
 const rules=typeof module!=="undefined"&&module.exports?require("./rules-catalog.js"):window.T20_RULES;
 const options=typeof module!=="undefined"&&module.exports?require("./class-options.js"):window.T20_CLASS_OPTIONS;
 if(typeof module!=="undefined"&&module.exports)require("./herois-variants.js").install(rules,options);
 const KEYS=["FOR","DES","CON","INT","SAB","CAR"],MAX_LEVEL=12,VERSION=1;
 const COMBAT=["style","opening","combos","resources","strengths","weaknesses","evolution"];
 const short=(v,n=500)=>String(v??"").slice(0,n);
 const emptyLevel=()=>({classId:"",variantId:"",powerId:"",powerVersion:"",why:"",usage:"",synergy:"",limits:"",sourceNote:"",
  customPowerName:"",customPowerBook:"",customPowerPage:"",customPowerEdition:"",customPowerPrereqs:"",customPowerEffect:"",customPowerVersions:"",customPowerAmbiguity:""});
 const makeDraft=(seed={})=>({schemaVersion:VERSION,id:seed.id&&/^local-[a-z0-9-]{8,70}$/.test(seed.id)?seed.id:"local-"+(globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2)),
  catalogId:short(seed.catalogId,60),name:short(seed.name||"Nova ficha",100),work:short(seed.work,100),description:"",theme:short(seed.theme||"arquivo",30),raceId:"",raceBonuses:[],purposePower:"",originId:"",originBenefits:[],trainedSkills:[],arcanePath:"",narrativeSubclass:"",distinctions:[],spellbook:[],allowedBooks:["jda-1.3"],attributes:Object.fromEntries(KEYS.map(k=>[k,0])),levels:[emptyLevel()],inventory:[],combat:Object.fromEntries(COMBAT.map(k=>[k,""])),notes:"",status:"rascunho",legacyFields:{},levelLegacy:[]});
 function normalize(raw){
  if(!raw||typeof raw!=="object"||raw.schemaVersion!==VERSION||!/^local-[a-z0-9-]{8,70}$/.test(raw.id||""))throw Error("Formato de ficha local inválido.");
  if(!Array.isArray(raw.levels)||!raw.levels.length||raw.levels.length>MAX_LEVEL||!Array.isArray(raw.allowedBooks)||!Array.isArray(raw.inventory))throw Error("Progressão ou livros inválidos.");
  if(raw.inventory.length>80)throw Error("Inventário excede o limite de 80 registros.");
  const clean=makeDraft({id:raw.id,catalogId:raw.catalogId,name:raw.name,work:raw.work,theme:raw.theme});
  clean.description=short(raw.description,1000);clean.notes=short(raw.notes,2000);
  clean.combat=Object.fromEntries(COMBAT.map(k=>[k,short(raw.combat?.[k],2000)]));
  clean.raceId=short(raw.raceId,40);clean.originId=short(raw.originId,40);
  clean.purposePower=short(raw.purposePower,60);
  clean.originBenefits=Array.isArray(raw.originBenefits)?raw.originBenefits.slice(0,2).map(x=>short(x,70)):[];
  clean.trainedSkills=Array.isArray(raw.trainedSkills)?[...new Set(raw.trainedSkills.slice(0,25).map(x=>short(x,70)))]:[];
  clean.arcanePath=["mago","bruxo","feiticeiro","necromante"].includes(raw.arcanePath)?raw.arcanePath:"";
  clean.narrativeSubclass=short(raw.narrativeSubclass,100);
  clean.distinctions=Array.isArray(raw.distinctions)?raw.distinctions.slice(0,8).map(options.distinctItem).filter(x=>x.id):[];
  clean.spellbook=Array.isArray(raw.spellbook)?raw.spellbook.slice(0,45).map(x=>({name:short(x?.name,80),circle:Number(x?.circle)||0,classLevel:Number(x?.classLevel)||0,why:short(x?.why,350),how:short(x?.how,400),school:short(x?.school,40).toLowerCase(),source:short(x?.source,120)})).filter(x=>x.name):[];
  clean.raceBonuses=Array.isArray(raw.raceBonuses)?raw.raceBonuses.filter(k=>KEYS.includes(k)).slice(0,6):[];
  clean.allowedBooks=[...new Set(raw.allowedBooks.map(x=>short(x,40)))];
  if(clean.allowedBooks.some(id=>!rules.books.some(b=>b.id===id)))throw Error("Livro não cadastrado na edição do laboratório.");
  for(const key of KEYS){const v=raw.attributes?.[key];clean.attributes[key]=Number.isInteger(v)&&v>=-1&&v<=4?v:0}
  clean.levels=raw.levels.map(row=>Object.fromEntries(Object.keys(emptyLevel()).map(key=>[key,short(row?.[key],["classId","variantId","powerId","powerVersion"].includes(key)?60:600)])));
  clean.inventory=raw.inventory.map(item=>({name:short(item?.name,100),note:short(item?.note,300),quantity:Math.min(99,Math.max(1,Number.parseInt(item?.quantity,10)||1))})).filter(x=>x.name);
  // Preservar campos desconhecidos em área de compatibilidade, nunca descartá-los.
  const legacy=(obj,known)=>{
   const extra={};
   for(const [key,val] of Object.entries(obj||{})){
    if(known.has(key)||key==="__proto__"||key==="constructor"||key==="prototype")continue;
    const data=JSON.stringify(val);
    if(!data||data.length>10000||Object.keys(extra).length>=40)throw Error('Campo desconhecido grande demais para migração segura: '+key);
    extra[key]=JSON.parse(data);
   }
   return extra;
  };
  const safeObject=x=>x&&typeof x==="object"&&!Array.isArray(x)?x:{};
  clean.legacyFields={...legacy(safeObject(raw.legacyFields),new Set()),
   ...legacy(raw,new Set([...Object.keys(clean),"legacyFields","levelLegacy"]))};
  clean.levelLegacy=clean.levels.map((_,i)=>({
   ...legacy(safeObject(raw.levelLegacy?.[i]),new Set()),
   ...legacy(safeObject(raw.levels[i]),new Set(Object.keys(emptyLevel())))
  }));
  return clean;
 }
 function evaluate(raw){
  const sheet=normalize(raw),issues=[],rows=[],counts={},selected=new Set(),classVariants={};
  const distinct=options.evaluateDistinctions(sheet.distinctions);
  issues.push(...distinct.issues);
  const allowed=new Set(sheet.allowedBooks);
  const arcaneSpells=new Set([
    ["Criar Ilusão",1],["Hipnotismo",1],["Sono",1],["Enfeitiçar",1],["Disfarce Ilusório",1],["Imagem Espelhada",1],["Adaga Mental",1],
    ["Armadura Arcana",1],["Seta Infalível de Talude",1],["Teia",1],["Amedrontar",1],["Leque Cromático",1],["Explosão de Chamas",1],["Conjurar Monstro",1],
    ["Invisibilidade",2],["Sussurros Insanos",2],["Campo de Força",2],["Camuflagem Ilusória",2],["Aparência Perfeita",2],
    ["Bola de Fogo",2],["Velocidade",2],["Metamorfose",2],["Dissipar Magia",2],["Toque Vampírico",2],["Desespero Esmagador",2],
    ["Ilusão Lacerante",3],["Miragem",3],["Imobilizar",3],["Raio do Enfraquecimento",1]
   ].map(([name,circle])=>name+"|"+circle));
  if(!allowed.has("jda-1.3"))issues.push("A edição básica verificada precisa estar permitida para usar estas classes.");
  for(const id of allowed){const book=rules.books.find(b=>b.id===id);if(book?.status!=="parcial")issues.push(book.name+": opções mecânicas ainda não catalogadas; a autorização da mesa não as verifica.")}
  let cost=0;for(const k of KEYS)cost+=rules.pointBuy[sheet.attributes[k]];
  if(cost>rules.pointBudget)issues.push("Compra de atributos excede 10 pontos ("+cost+").");
  if(cost<rules.pointBudget)issues.push("Compra de atributos incompleta: "+cost+" de 10 pontos usados.");
  const race=Object.hasOwn(rules.races,sheet.raceId)?rules.races[sheet.raceId]:null;
  if(sheet.raceId&&!race)issues.push("Raça sem regras cadastradas neste catálogo.");
  if(race&&!allowed.has(race.source.book))issues.push("Livro de "+race.name+" não permitido.");
  if(!sheet.raceId)issues.push("Raça ainda não escolhida.");
  if(sheet.raceId==="humano"&&(sheet.raceBonuses.length!==3||new Set(sheet.raceBonuses).size!==3))issues.push("Humano exige três atributos diferentes para o bônus racial.");
  const origin=Object.hasOwn(rules.origins||{},sheet.originId)?rules.origins[sheet.originId]:null;
  if(race?.noOrigin){
   if(sheet.originId||sheet.originBenefits.length)issues.push("Golem escolhe Propósito de Criação em vez de origem.");
  }else if(!origin)issues.push("Origem não cadastrada ou pendente.");
  else if(new Set(sheet.originBenefits).size!==2||sheet.originBenefits.some(x=>!origin.choices.includes(x)))issues.push("Escolha exatamente dois benefícios válidos da origem "+origin.name+".");
  const arcanistLevels=sheet.levels.filter(x=>x.classId==="arcanista").length;
  const ladinoLevels=sheet.levels.filter(x=>x.classId==="ladino").length;
  const arcaneVariant=sheet.levels.find(x=>x.classId==="arcanista")?.variantId||"";
  const rogueVariant=sheet.levels.find(x=>x.classId==="ladino")?.variantId||"";
  const necromante=arcaneVariant==="necromante";
  const ventanista=rogueVariant==="ventanista";
  if(arcanistLevels&&!necromante&&!sheet.arcanePath)issues.push("Arcanista exige caminho definido: Bruxo, Mago ou Feiticeiro.");
  if(necromante&&sheet.arcanePath&&sheet.arcanePath!=="necromante")
   issues.push("Necromante usa Caminho do Necromante; não acumule Bruxo, Mago ou Feiticeiro.");
  if(sheet.arcanePath==="necromante"&&!necromante)issues.push("Caminho do Necromante só existe com a variante correspondente.");
  if(sheet.arcanePath==="feiticeiro"&&arcanistLevels)issues.push("Feiticeiro: linhagem e habilidades próprias ainda não cadastradas.");
  let necroKnown=0;
  for(const spell of sheet.spellbook){
   if(!arcaneSpells.has(spell.name+"|"+spell.circle)&&!Object.values(rules.cosmosSpells||{}).some(x=>x.name===spell.name&&x.circle===spell.circle))issues.push("Magia "+spell.name+": círculo/nome não indexado neste laboratório.");
   const asVentanista=ventanista&&!arcanistLevels;
   const casterLevel=asVentanista?ladinoLevels:arcanistLevels;
   const minLevel=asVentanista?(spell.circle===1?1:2+4*(spell.circle-1)):1+4*(spell.circle-1);
   if(!spell.classLevel||spell.classLevel>casterLevel||spell.classLevel<minLevel)
    issues.push("Magia "+spell.name+": círculo não liberado no nível da classe "+(asVentanista?"Ventanista":"Arcanista")+".");
   if(!spell.why.trim()||!spell.how.trim())issues.push("Magia "+spell.name+": explique escolha e uso.");
   if(necromante||asVentanista){
    if(!spell.school)issues.push("Magia "+spell.name+": escola obrigatória para conferir restrições de "+(necromante?"Necromante":"Ventanista")+".");
    if(necromante){
     if(spell.school==="encantamento")issues.push("Necromante não pode aprender magias de Encantamento.");
     if(spell.school==="necromancia")necroKnown++;
    }
    if(asVentanista&&!["encantamento","ilusao"].includes(spell.school))
     issues.push("Ventanista: magias simuladas devem ser de Encantamento ou Ilusão.");
   }
  }
  if(necromante&&sheet.spellbook.length&&necroKnown<Math.ceil(sheet.spellbook.length/2))
   issues.push("Necromante exige pelo menos metade das magias aprendidas de Necromancia.");
  if(ventanista&&arcanistLevels&&sheet.spellbook.length)
   issues.push("Multiclasse Ventanista/Arcanista: a ficha deve identificar de qual classe veio cada magia; seleção ainda não atribuída.");
  if(ventanista&&!arcanistLevels){
   for(let level=1;level<=ladinoLevels;level++){
    const chosen=sheet.spellbook.filter(sp=>sp.classLevel<=level).length;
    const max=2+Math.floor(level/2);
    if(chosen>max){
     issues.push("Ventanista nível "+level+": "+chosen+" magias registradas, limite "+max+" pela progressão de Truques do Ofício.");
     break;
    }
   }
  }
  const attrs=Object.fromEntries(KEYS.map(k=>[k,sheet.attributes[k]+(race?.modifiers?.[k]||0)+(sheet.raceId==="humano"&&sheet.raceBonuses.includes(k)?1:0)]));
  const purpose=rules.abilities[sheet.purposePower];
  if(race?.noOrigin){
   if(purpose?.classId!=="geral"||!allowed.has(purpose.source.book)||purpose.requires?.powers?.length||purpose.requires?.caster)
    issues.push("Golem: escolha um poder geral disponível no 1º nível para Propósito de Criação.");
   else{
    for(const [key,min] of Object.entries(purpose.requires?.attributes||{}))if(attrs[key]<min)issues.push("Propósito: "+purpose.name+" exige "+key+" "+min+".");
    for(const skill of purpose.requires?.skills||[])if(!sheet.trainedSkills.includes(skill))issues.push("Propósito: "+purpose.name+" exige treino em "+skill+".");
    selected.add(sheet.purposePower);
   }
  }else if(sheet.purposePower)issues.push("Propósito de Criação exige Golem.");
  const vital=sheet.purposePower==="vitalidade"&&race?.noOrigin||sheet.originBenefits.includes("Vitalidade")&&!race?.noOrigin;
  if(vital&&attrs.CON<1)issues.push("Vitalidade exige CON 1.");
  let pv=0,pm=0,canCalculate=true;
  for(let i=0;i<sheet.levels.length;i++){
   const row=sheet.levels[i],cls=rules.classes[row.classId];
   if(row.customPowerName){
    const book=rules.books.find(b=>b.id===row.customPowerBook);
    if(!book||!allowed.has(book.id))issues.push("Nível "+(i+1)+": suplemento da opção "+row.customPowerName+" não selecionado ou não cadastrado.");
    if(!row.customPowerPage.trim()||!row.customPowerEdition.trim()||!row.customPowerPrereqs.trim()||!row.customPowerEffect.trim())
     issues.push("Nível "+(i+1)+": opção de suplemento exige página, edição, pré-requisitos e efeito conferidos.");
    if(!row.why.trim()||!row.usage.trim())issues.push("Nível "+(i+1)+": descreva por que escolheu e como usaria a opção do suplemento.");
    if(row.customPowerVersions.trim()&&!row.customPowerAmbiguity.trim())issues.push("Nível "+(i+1)+": registre quais versões divergem e a interpretação adotada.");
    issues.push("Nível "+(i+1)+": opção de suplemento em revisão editorial, sem efeito automático no cálculo: "+row.customPowerName+".");
   }
   // Uma variante passa pelo resolvedor após contar o nível real da classe.
   if(!cls||!allowed.has(cls?.source.book)){
    issues.push("Nível "+(i+1)+": classe ausente ou livro não permitido.");
    canCalculate=false;rows.push({globalLevel:i+1,classId:row.classId,classLevel:null,pv:null,pm:null,grants:[],choice:null,firstClass:false});continue;
   }
   counts[row.classId]=(counts[row.classId]||0)+1;
   const classLevel=counts[row.classId],firstClass=i===0;
   if(classLevel===1)classVariants[row.classId]=row.variantId||"";
   else if(row.variantId&&row.variantId!==classVariants[row.classId])
    issues.push("Nível "+(i+1)+": troca retroativa de variante incompatível na classe "+cls.name+".");
   const activeVariant=classVariants[row.classId]||"";
   const resolved=options.resolveClassStep({classId:row.classId,classLevel,variantId:activeVariant,classRule:cls,
    abilities:rules.abilities,allowedBooks:sheet.allowedBooks});
   if(resolved.issues.length){issues.push(...resolved.issues.map(msg=>"Nível "+(i+1)+": "+msg));canCalculate=false}
   if(row.variantId&&classLevel>1&&row.variantId!==activeVariant)canCalculate=false;
   // Multiclasse não reinicia PV iniciais; as variantes usam o próprio perfil verificado.
   const stats=resolved.stats||cls;
   const hpDelta=(firstClass?stats.initialPV+attrs.CON:Math.max(1,stats.gainPV+attrs.CON))+
    (firstClass?(race?.pvAtFirst||0):(race?.pvPerLaterLevel||0))+(vital&&attrs.CON>=1?1:0);
   const pmDelta=stats.gainPM+(race?.pmPerLevel||0);
   pv+=hpDelta;pm+=pmDelta;
   if(row.classId==="arcanista"&&classLevel===1)pm+=(sheet.arcanePath==="feiticeiro"&&!activeVariant?attrs.CAR:attrs.INT);
   if(row.classId==="ladino"&&classLevel===1&&activeVariant==="ventanista")pm+=attrs.CAR;
   const grants=resolved.grants.map(id=>({id,ability:rules.abilities[id]||null}));
   if(classLevel===1&&activeVariant)
    issues.push("Classe variante "+(resolved.variant?.name||activeVariant)+": perícias/proficiências, equipamentos e bônus condicionais exigem conferência na ficha final.");
   for(const grant of grants)if(!grant.ability?.manual)issues.push("Nível "+(i+1)+": manual de "+grant.id+" ainda não integrado.");
   if(grants.length&&(!row.why.trim()||!row.usage.trim()))issues.push("Nível "+(i+1)+": registre por que e como usa os ganhos automáticos desta classe.");
   if(classLevel>=resolved.powerFrom){
    if(!row.powerId)issues.push("Nível "+(i+1)+": escolha de poder de "+cls.name+" pendente.");
   }else if(row.powerId)issues.push("Nível "+(i+1)+": não há escolha de poder nesta entrada de classe.");
   const ability=rules.abilities[row.powerId];
   if(row.powerId){
    if(!ability||ability.kind!=="poder"||!allowed.has(ability.source.book)
      || !(ability.classId==="geral"||ability.classId===row.classId&&!resolved.removedPowers.includes(row.powerId)
       || ability.classId===activeVariant&&resolved.exclusivePowers.includes(row.powerId)))
      issues.push("Nível "+(i+1)+": poder inexistente ou incompatível com a classe/variante/livro.");
    else{
     if(selected.has(row.powerId)&&!ability.repeatable)issues.push("Nível "+(i+1)+": poder repetido sem regra que permita repetição.");
     for(const requiredPower of ability.requires?.powers||[])if(!selected.has(requiredPower))issues.push("Nível "+(i+1)+": "+ability.name+" requer o poder "+(rules.abilities[requiredPower]?.name||requiredPower)+".");
     selected.add(row.powerId);
     if(ability.requires?.classLevel>classLevel)issues.push("Nível "+(i+1)+": "+ability.name+" requer nível "+ability.requires.classLevel+" de "+cls.name+".");
     for(const [key,min] of Object.entries(ability.requires?.attributes||{}))if(attrs[key]<min)issues.push("Nível "+(i+1)+": "+ability.name+" requer "+key+" "+min+".");
     for(const skill of ability.requires?.skills||[])if(!sheet.trainedSkills.includes(skill))issues.push("Nível "+(i+1)+": "+ability.name+" requer treino em "+skill+".");
     if(ability.requires?.path&&sheet.arcanePath!==ability.requires.path)issues.push("Nível "+(i+1)+": "+ability.name+" requer caminho "+ability.requires.path+".");
     if(ability.requires?.spell&&!sheet.spellbook.some(x=>x.name===ability.requires.spell&&x.classLevel<=classLevel))issues.push("Nível "+(i+1)+": "+ability.name+" requer conhecer "+ability.requires.spell+".");
     if(ability.requires?.caster&&!counts.arcanista&&!race?.racialSpell)issues.push("Nível "+(i+1)+": "+ability.name+" exige lançar magias.");
     if(ability.requires?.shield&&!sheet.levels.slice(0,i+1).some(x=>x.classId==="guerreiro"))issues.push("Nível "+(i+1)+": "+ability.name+" requer proficiência com escudos.");
     if(!row.why.trim()||!row.usage.trim())issues.push("Nível "+(i+1)+": justifique a escolha e descreva o uso de "+ability.name+".");
     if(row.powerVersion){const version=ability.versions?.find(v=>v.id===row.powerVersion);if(!version||classLevel<version.minClassLevel)issues.push("Nível "+(i+1)+": versão indisponível de "+ability.name+".")}
    }
   }
   rows.push({globalLevel:i+1,classId:row.classId,classLevel,variantId:activeVariant,variant:resolved.variant,removedGrants:resolved.removed,addedGrants:resolved.added,removedPowers:resolved.removedPowers,exclusivePowers:resolved.exclusivePowers,powerFrom:resolved.powerFrom,firstClass,pv:canCalculate?pv:null,pm:canCalculate?pm:null,hpDelta,pmDelta,grants,choice:ability||null,
    newClass:classLevel===1&&!firstClass,source:resolved.variant?.source||cls.source,reason:row.why,usage:row.usage});
  }
  if(!sheet.name.trim())issues.push("Nome obrigatório.");
  if(sheet.raceId==="humano"&&!sheet.trainedSkills.length)issues.push("Humano: identifique perícias treinadas e o benefício Versátil escolhido.");
  // Poderes, magias e opções de origem não alteram automaticamente os subtotais acima.
  // O subtotal não inclui efeitos condicionais, origens, magias, distinções ou erratas.
  return {sheet,attributes:attrs,attributeCost:cost,rows,levelsByClass:counts,basePV:canCalculate?pv:null,basePM:canCalculate?pm:null,
   issues:[...new Set(issues)],distinctions:distinct.details,classVariants,complete:false,summary:"Subtotal de PV/PM por níveis de classe, Constituição e atributo-chave de Arcanista; poderes, itens, origem e ajustes situacionais não incluídos."};
 }
 function importJSON(json){if(typeof json!=="string"||json.length>250000)throw Error("Arquivo muito grande.");return normalize(JSON.parse(json))}
 function exportJSON(sheet){return JSON.stringify(normalize(sheet),null,2)}
 const api={VERSION,KEYS,MAX_LEVEL,makeDraft,emptyLevel,normalize,evaluate,importJSON,exportJSON,rules,options,recommend:(sheet)=>options.recommend(normalize(sheet),rules)};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 if(typeof window!=="undefined")window.T20_BUILD_ENGINE=api;
})();


/* build-presets.js */
/* O SISTEMA // propostas preenchidas e editáveis.
   Base: Tormenta20 Jogo do Ano v1.3. Nada aprovado automaticamente.
   Não atribuir ao personagem mecânicas da franquia sem poder, item ou magia. */
(()=>{
 "use strict";
 const rules=window.T20_RULES,concepts=window.T20_CONCEPTS;
 if(!rules||!concepts)return;
 const specs={
  toji:{
   title:"Caçador sem Energia Amaldiçoada",origin:"soldado",benefits:["Guerra","Pontaria"],
   buy:{FOR:2,DES:3,CON:2,INT:1,SAB:1,CAR:0},bonuses:["FOR","DES","CON"],
   skills:["Luta","Fortitude","Furtividade","Iniciativa","Percepção","Guerra","Pontaria"],
   flow:[["guerreiro",8],["ladino",4]],
   powers:{guerreiro:["bater-correr","ataque-reflexo","especializacao-arma","golpe-pessoal","impeto","romper-resistencias","golpe-raspao"],ladino:["emboscar","sombra","velocidade-ladina"]},
   gear:["Espada longa — lâmina comum reinterpretada","Adagas — estoque limitado e contado","Traje de viajante","Corda e kit de viagem"],
   ambiguity:"Restrição celestial não concede imunidade a magia; Inverted Spear of Heaven, Playful Cloud e inventário espiritual exigem itens e acordo específicos. Fonte visual não prova efeitos.",
   tactic:"Abrir com posicionamento e iniciativa; Ataque Especial para acerto/dano, depois Emboscar e furtividade quando obtidos. Não gastar PM acima do limite."},
  aizen:{
   title:"Ilusionista e estrategista",origin:"estudioso",benefits:["Conhecimento","Guerra"],
   buy:{FOR:0,DES:2,CON:1,INT:3,SAB:2,CAR:1},bonuses:["INT","SAB","CAR"],
   skills:["Misticismo","Vontade","Conhecimento","Guerra","Enganação","Intuição"],arcanePath:"mago",
   flow:[["arcanista",12]],
   powers:{arcanista:["envolto-misterio","magia-pungente","especialista-escola","fortalecimento-arcano","poder-magico","familiar","arcano-batalha","raio-arcano","fluxo-mana","raio-elemental","raio-poderoso"]},
   gear:["Grimório — exigência do caminho Mago","Espada longa — sem proficiência inicial concedida","Traje formal","Componentes e tinta de escrita"],
   ambiguity:"Kyōka Suigetsu é estética de Criar Ilusão e encantamentos, nunca hipnose inevitável. Hōgyoku e transformações são versões alternativas não atribuídas nesta build.",
   tactic:"Controlar o campo com Criar Ilusão e Hipnotismo; estudar e memorizar as magias segundo regras de Mago, mantendo testes de resistência.",
   spells:[
    ["Criar Ilusão",1,1],["Hipnotismo",1,1],["Sono",1,1],["Enfeitiçar",1,1],
    ["Disfarce Ilusório",1,2],["Imagem Espelhada",1,3],["Adaga Mental",1,4],
    ["Invisibilidade",2,5],["Sussurros Insanos",2,5],["Campo de Força",2,6],
    ["Camuflagem Ilusória",2,7],["Aparência Perfeita",2,8],
    ["Ilusão Lacerante",3,9],["Imobilizar",3,9],["Miragem",3,10],
    ["Teia",1,11],["Dissipar Magia",2,12]
   ]},
  vegitto:{
   title:"Fusão Potara — combate desarmado",origin:"gladiador",benefits:["Atuação","Luta"],
   buy:{FOR:3,DES:2,CON:2,INT:0,SAB:1,CAR:1},bonuses:["FOR","DES","CON"],
   skills:["Fortitude","Luta","Atletismo","Iniciativa","Reflexos","Atuação"],
   flow:[["lutador",9],["guerreiro",3]],
   powers:{lutador:["ate-acertar","bracos-calejados","cabecada","golpe-baixo","golpe-imprudente","trocacao","punhos-adamante","rasteira"],guerreiro:["impeto","valentao"]},
   gear:["Traje e brincos Potara — elementos narrativos","Kit de viagem","Faixas de combate"],
   ambiguity:"Base, SSJ e Blue não são acumuláveis como bônus. Potara não duplica turnos ou fichas; ki é interpretação de PM e técnicas válidas.",
   tactic:"Usar Golpe Relâmpago com planejamento de PM; Trocação somente após Lutador 6 e quando acertar."},
  gogeta:{
   title:"Fusão Metamoru — precisão e investidas",origin:"gladiador",benefits:["Atuação","Luta"],
   buy:{FOR:3,DES:2,CON:2,INT:0,SAB:1,CAR:1},bonuses:["FOR","DES","CON"],
   skills:["Fortitude","Luta","Atletismo","Iniciativa","Reflexos","Atuação"],
   flow:[["lutador",9],["guerreiro",3]],
   powers:{lutador:["voadora","lutador-chao","cabecada","golpe-imprudente","golpe-baixo","trocacao","punhos-adamante","rasteira"],guerreiro:["bater-correr","ataque-reflexo"]},
   gear:["Colete e faixa da fusão — traje mundano","Faixas de combate","Kit de viagem"],
   ambiguity:"SSJ, Blue, SSJ4 e outras aparições são versões distintas; fusão não cria PM extra, voo ou ações livres.",
   tactic:"Combinar investida e Voadora, depois Trocação com PM contados; armas e golpes de energia não são concedidos."},
  "soul-of-cinder":{
   title:"Guardião das cinzas — lâmina e chama",origin:"soldado",benefits:["Guerra","Pontaria"],
   buy:{FOR:3,DES:2,CON:2,INT:1,SAB:1,CAR:0},bonuses:["FOR","CON","INT"],
   skills:["Luta","Fortitude","Guerra","Pontaria","Misticismo","Vontade"],arcanePath:"bruxo",
   flow:[["guerreiro",8],["arcanista",4]],
   powers:{guerreiro:["valentao","bater-correr","especializacao-arma","golpe-pessoal","impeto","romper-resistencias","golpe-raspao"],arcanista:["raio-arcano","arcano-batalha","foco-vital"]},
   gear:["Espada longa — espada do chefe como aparência","Foco arcano — brasa simbólica","Traje cerimonial, sem armadura grátis","Escudo comum, sujeito a proficiência"],
   ambiguity:"Diferentes posturas e segunda fase são mudanças narrativas; armas, efeitos elementais e alternância de classes precisam de ações e equipamentos reais.",
   tactic:"Combater com espada e Ataque Especial; após adquirir Arcanista, usar magias de 1º círculo somente com foco e custos.",
   spells:[["Armadura Arcana",1,1],["Explosão de Chamas",1,1],["Imagem Espelhada",1,1],["Raio do Enfraquecimento",1,2],["Seta Infalível de Talude",1,3],["Criar Ilusão",1,4]]},
  isaac:{
   title:"Lágrimas arcanas — sobrevivência",origin:"eremita",benefits:["Misticismo","Sobrevivência"],
   buy:{FOR:0,DES:2,CON:1,INT:3,SAB:2,CAR:1},bonuses:["INT","DES","CON"],
   skills:["Misticismo","Vontade","Sobrevivência","Conhecimento","Reflexos","Percepção"],arcanePath:"bruxo",
   flow:[["arcanista",12]],
   powers:{arcanista:["raio-arcano","arcano-batalha","familiar","raio-elemental","fortalecimento-arcano","magia-pungente","poder-magico","raio-poderoso","fluxo-mana","envolto-misterio","foco-vital"]},
   gear:["Objeto de estimação — foco de bruxo declarado","Traje simples","Frasco vazio — sem propriedades de item mágico"],
   ambiguity:"Itens de The Binding of Isaac são numerosos e aleatórios. Esta build fixa uma seleção temática; não sorteia relíquias nem concede transformações ilimitadas.",
   tactic:"Representar lágrimas com Raio Arcano, usar Campo de Força para defesa e controlar o posicionamento; foco exigido.",
   spells:[["Armadura Arcana",1,1],["Imagem Espelhada",1,1],["Seta Infalível de Talude",1,1],
    ["Conjurar Monstro",1,2],["Explosão de Chamas",1,3],["Teia",1,4],
    ["Campo de Força",2,5],["Bola de Fogo",2,6],["Invisibilidade",2,7],["Velocidade",2,8],
    ["Ilusão Lacerante",3,9],["Imobilizar",3,10],["Miragem",3,11],["Dissipar Magia",2,12]]},
  adao:{
   title:"Pai da humanidade — resposta marcial",origin:"gladiador",benefits:["Atuação","Luta"],
   buy:{FOR:2,DES:3,CON:2,INT:1,SAB:1,CAR:0},bonuses:["FOR","DES","CON"],
   skills:["Fortitude","Luta","Atletismo","Iniciativa","Reflexos","Atuação"],
   flow:[["lutador",8],["guerreiro",4]],
   powers:{lutador:["ate-acertar","bracos-calejados","convencido","golpe-baixo","golpe-imprudente","trocacao","punhos-adamante"],guerreiro:["valentao","ataque-reflexo","impeto"]},
   gear:["Soco desarmado — sem arma adicional","Traje simples","Kit de viagem"],
   ambiguity:"Olhos do Senhor não copiam automaticamente poderes de inimigos ou deuses. Adaptar reflexos e reação com poderes adquiridos.",
   tactic:"Reagir a deslocamento, usar defesa de Lutador e administrar pressão com Golpe Relâmpago; prever limite de PM."},
  grimm:{
   title:"Espadachim amaldiçoado — jornada sombria",origin:"forasteiro",benefits:["Cavalgar","Sobrevivência"],
   buy:{FOR:2,DES:2,CON:2,INT:3,SAB:0,CAR:0},bonuses:["FOR","INT","CON"],
   skills:["Luta","Fortitude","Sobrevivência","Cavalgar","Misticismo","Vontade"],arcanePath:"bruxo",
   flow:[["guerreiro",8],["arcanista",4]],
   powers:{guerreiro:["esgrimista","bater-correr","especializacao-arma","golpe-pessoal","impeto","romper-resistencias","golpe-raspao"],arcanista:["magia-pungente","raio-arcano","foco-vital"]},
   gear:["Espada longa — substituir conforme versão escolhida","Foco arcano — símbolo do pacto","Traje de viajante","Kit de exploração"],
   ambiguity:"Grimm de BLACK SOULS não é Grimm de Hollow Knight. Aparência, finais e variantes precisam de seleção explícita; magia e maldição não são automáticas.",
   tactic:"Abrir de espada e usar poderes marciais; magia de 1º círculo somente após entrada em Arcanista.",
   spells:[["Criar Ilusão",1,1],["Amedrontar",1,1],["Armadura Arcana",1,1],["Imagem Espelhada",1,2],["Disfarce Ilusório",1,3],["Adaga Mental",1,4]]},
  sekiro:{
   title:"Lobo de um braço — espada e infiltração",origin:"criminoso",benefits:["Furtividade","Ladinagem"],
   buy:{FOR:2,DES:3,CON:2,INT:1,SAB:1,CAR:0},bonuses:["DES","CON","INT"],
   skills:["Luta","Fortitude","Furtividade","Iniciativa","Ladinagem","Reflexos","Percepção"],
   flow:[["guerreiro",8],["ladino",4]],
   powers:{guerreiro:["esgrimista","bater-correr","especializacao-arma","golpe-pessoal","impeto","romper-resistencias","golpe-raspao"],ladino:["sombra","velocidade-ladina","emboscar"]},
   gear:["Katana como espada ou arma permitida pela mesa","Ferramenta protética — sem efeito mecânico gratuito","Traje de shinobi","Kit de escalada mundano"],
   ambiguity:"Ressurreição e postura de Sekiro não equivalem a efeitos automáticos. Cada ferramenta protética necessita de item ou magia oficial correspondente.",
   tactic:"Movimente-se, cubra flancos, ataque com espada. Use Sombra e Velocidade Ladina apenas após adquirir os níveis de Ladino."},
  kaneki:{
   title:"Ghoul — agressão e resiliência",origin:"pivete",benefits:["Furtividade","Iniciativa"],
   buy:{FOR:3,DES:2,CON:3,INT:0,SAB:0,CAR:0},bonuses:["FOR","CON","DES"],
   skills:["Fortitude","Luta","Furtividade","Iniciativa","Atletismo","Reflexos"],
   flow:[["lutador",9],["ladino",3]],
   powers:{lutador:["sarado","bracos-calejados","golpe-imprudente","golpe-baixo","rasteira","trocacao","punhos-adamante","convencido"],ladino:["emboscar","sombra"]},
   gear:["Kagune — aparência dos ataques desarmados","Máscara do Ghoul — traje","Faixas de combate"],
   ambiguity:"Rinkaku/kakuja e fases posteriores não concedem regeneração, membros extra ou resistência gratuita. Separar pré e pós-Tokyo Ghoul:re.",
   tactic:"Trocar defesa por pressão quando vantajoso; Golpe Imprudente exige risco real. Furtividade ajuda a escolher emboscadas."}
 };
 const makeSpell=([name,circle,classLevel],topic)=>({name,circle,classLevel,
  why:"Representar "+topic+" usando uma magia efetivamente aprendida, sem reproduzir poderes absolutos do universo original.",
  how:"Consultar a descrição oficial de "+name+", pagar PM e cumprir execução, alcance, alvo, duração e resistência da edição adotada.",
  source:"Tormenta20 — Jogo do Ano v1.3, Capítulo 4 (Magias)"});
 function fromPlanned(seed,engine){
  const spec=specs[seed.id];
  const draft=concepts.fromPlanned(seed,engine);
  if(!spec)return draft;
  draft.description=spec.title+". "+draft.description;
  draft.raceId="humano";
  draft.originId=spec.origin;draft.originBenefits=spec.benefits;
  draft.attributes=spec.buy;draft.raceBonuses=spec.bonuses;
  draft.trainedSkills=spec.skills;
  draft.arcanePath=spec.arcanePath||"";
  draft.allowedBooks=["jda-1.3"];
  draft.levels=[];
  const occurrences={},whyText=spec.title.toLowerCase();
  for(const [classId,count] of spec.flow)for(let n=0;n<count;n++){
   const level=engine.emptyLevel();
   occurrences[classId]=(occurrences[classId]||0)+1;
   const classLevel=occurrences[classId];
   const powerId=classLevel>=2?spec.powers[classId]?.[classLevel-2]||"":"";
   const power=rules.abilities[powerId];
   level.classId=classId;level.powerId=powerId;
   level.why=power?"Escolhi "+power.name+" para "+whyText+". "+power.manual.effect:
      "Entrada em "+rules.classes[classId].name+" para "+whyText+". "+spec.tactic;
   level.usage=power?"Em mesa: "+power.manual.example+" Condição: "+power.manual.action+". Custo: "+power.manual.cost+".":
      "Adquirir benefícios automáticos do primeiro nível da classe; seguir condições e custos dos poderes listados.";
   level.synergy=spec.tactic;
   level.limits=power?power.manual.limit+" "+spec.ambiguity:spec.ambiguity;
   level.sourceNote="Tormenta20 — Edição Jogo do Ano v1.3; "+(power?power.source.page:rules.classes[classId].source.page)+". Conferir erratas e decisões da mesa.";
   draft.levels.push(level);
  }
  draft.inventory=spec.gear.map(name=>({name,note:"Aquisição e preço sujeitos à criação e regras oficiais; aspecto da obra não oferece bônus gratuito.",quantity:1}));
  draft.spellbook=(spec.spells||[]).map(x=>makeSpell(x,spec.title));
  draft.notes="VERSÃO ADAPTADA: "+spec.title+". "+spec.ambiguity+" Origem: "+seed.sourcePage+". Fontes oficiais de regras: Tormenta20 Edição Jogo do Ano v1.3, capítulos 1, 3 e 4. Suplementos não necessários nesta proposta; se selecionados, exigem catalogação.";
  draft.combat={...draft.combat,
   style:spec.title+". "+spec.tactic,
   opening:spec.tactic,
   combos:"Conferir custo, ação, alcance e interação por nível de classe. Não somar bônus por estética ficcional.",
   resources:"Usar a reserva de PM por nível calculada pelo motor; poderes, magias e itens exigem revisão dos valores finais.",
   strengths:spec.title+". Sinergia de habilidades condicionada aos pré-requisitos efetivamente adquiridos.",
   weaknesses:spec.ambiguity,
   evolution:"Do nível global 1 ao 12, alternar as classes na ordem apresentada. Círculos mágicos são liberados pelo nível de Arcanista, e poderes de ataque pelo nível da respectiva classe."};
  return draft;
 }
 const api={specs,ids:Object.keys(specs),fromPlanned};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 window.T20_BUILD_PRESETS=api;
})();


/* automatic-dossiers.js */
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


/* archive-revisions.js */
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
 const selectedPowers={
  // Índices 1–12. Somente poderes já cadastrados e com nível compatível.
  cipher:["","mente-criminosa","gatuno","sombra","assassinar","escapista","emboscar","rolamento-defensivo","velocidade-ladina","","",""],
  "jojo-diavolo":["","mente-criminosa","sombra","emboscar","assassinar","escapista","gatuno","rolamento-defensivo","velocidade-ladina","","",""],
  "jojo-joseph":["","mente-criminosa","gatuno","emboscar","escapista","sombra","velocidade-ladina","rolamento-defensivo","","","",""],
  "hsr-castorice":["","poder-magico","magia-pungente","conhecimento-magico","fortalecimento-arcano","familiar","arcano-batalha","raio-arcano","conhecimento-magico","fluxo-mana","raio-elemental","raio-poderoso"],
  shigaraki:["","arcano-batalha","magia-pungente","raio-arcano","fortalecimento-arcano","poder-magico","raio-elemental","raio-poderoso","conhecimento-magico","fluxo-mana","familiar","conhecimento-magico"]
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
  origById[c.id]={progression:originalProgress,guide:originalGuide,info:clone(c.info),notes:clone(c.notes),hadOwnGuide:!!c._guide};
  const assigned=variant?variant.name:null;
  const refs=variant?[["heroes",variant.source.page,"Classe variante "+variant.name]]:[];
  const newLevels=[];
  const guideLevels=[];
  const selectedByLevel=[];
  for(let idx=0;idx<12;idx++){
   const old=originalProgress[idx],oldGuide=existing.levels[idx]||{},lv=idx+1;
   const stage=stages[idx],step=rulesForLevel(variant,lv);
   const cleanGain=step?[...step.kept,...step.gained]:[];
   const selectedPowerId=selectedPowers[c.id]?.[idx]||"";
   const selectedPower=selectedPowerId?rules.abilities[selectedPowerId]:null;
   if(selectedPowerId&&(selectedPower?.classId!==classId||selectedPower?.kind!=="poder"||selectedPower?.requires?.classLevel>lv))
    throw Error("Poder de classe incompatível: "+c.id+"/"+lv+"/"+selectedPowerId);
   selectedByLevel.push(selectedPowerId);
   const powerSlot=variant&&lv>=2?(selectedPower?"Poder de "+(classId==="ladino"?"Ladino":"Arcanista")+": "+selectedPower.name:
    "Poder de "+(classId==="ladino"?"Ladino":"Arcanista")+" (seleção editorial pendente)"):null;
   const title=variant?(variant.name+" "+lv+" · "+(cleanGain.join(" / ")||(powerSlot||"Poder de classe"))+(cleanGain.length&&powerSlot?" · "+powerSlot:"")):old[1];
   const priorDesc=String(old[2]||"");
   const priorWhy=String(oldGuide.why||"");
   const priorUse=String(oldGuide.use||"");
   // Não dar poderes da classe original por associação de palavras ou por narrativa.
   // Poderes selecionáveis antes existentes precisam passar nos pré-requisitos da variante.
   const why=(variant
    ?stage+": "+identity+". "+(cleanGain.length?"A tabela da variante concede "+cleanGain.join(", ")+". ":"A tabela da variante não concede habilidade automática adicional neste patamar. ")+"Seleção de poder no nível "+lv+": "+(selectedPower?selectedPower.name+" (requisito e edição conferidos no catálogo).":"pendente de conferência, sem bônus automático.")
    :priorWhy+" Revisão de classe (Fase IV, nível "+lv+"): "+stage.toLowerCase()+" para "+identity.toLowerCase()+". A classe básica foi mantida porque "+comparison.toLowerCase()+".");
   const use=(variant
    ?"Na mesa, obtenha somente as habilidades listadas na tabela de "+assigned+" neste nível, observando custo em PM, ação, alvo e condições. "+caution+". "+(priorUse?"A proposta anterior fica como referência, não como poder extra: "+priorUse:"")
    :priorUse+" Diretriz da revisão: "+caution+". O passo "+lv+" não confere uma nova classe, variante ou poder por mera equivalência narrativa.");
   const rowDetail=(variant
    ?"TABELA "+assigned+" · "+stage+". "+(cleanGain.length?"Automáticas: "+cleanGain.join(", ")+". ":"Sem automáticas adicionais. ")+
     "Poderes de "+classId+" e outras escolhas anteriores só permanecem se legalmente selecionados e com pré-requisitos; "+caution+"."
    :priorDesc+" | FASE IV: "+stage+" — "+identity+". "+caution+".");
   const nextRef=[...refs,...(selectedPower?[["core",selectedPower.source?.page||"cap. 1",selectedPower.name]]:[]),...(Array.isArray(oldGuide.ref)?oldGuide.ref:[])];
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
   reviewStatus:"revisao-pendente",selectedPowers:selectedByLevel,
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
    powerId:rec.selectedPowers?.[i]||"",
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

