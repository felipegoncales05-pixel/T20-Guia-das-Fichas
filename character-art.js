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
