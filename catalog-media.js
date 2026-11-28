/* O SISTEMA // Catálogo de fontes de imagem resiliente.
   URLs oficiais/referências verificadas; mantém alternativas caso o servidor recuse hotlink. */
(()=>{
 const data=window.T20_DATA,alternate=window.T20_ALTERNATES?.diego?.alternative;
 if(!data)return;
 const upgrades=[
  {
   id:"diego",
   url:"https://jojo-portal-anime.com/sbr/assets/images/pc/character/img_character-visual-03.png",
   credit:"Arte oficial de Diego Brando · anime Steel Ball Run",
   page:"https://jojo-portal-anime.com/sbr/character/03/"
  },
  {
   id:"marin",
   url:"https://static.zerochan.net/Kitagawa.Marin.full.3561466.jpg",
   credit:"Design de Marin Kitagawa por Ishida Kazumasa · reprodução em Zerochan",
   page:"https://www.zerochan.net/3561466"
  },
  {
   id:"ado",
   url:"https://rockinon.com/images/entry/default/207107/1",
   credit:"Persona ilustrada de Ado · divulgação em rockin'on",
   page:"https://rockinon.com/news/detail/207107"
  },
  {
   id:"elster",
   url:"https://images.nintendolife.com/d03911fb9b35c/signalis-cover.cover_large.jpg",
   credit:"Arte de capa de SIGNALIS · Nintendo Life / rose-engine",
   page:"https://www.nintendolife.com/reviews/switch-eshop/signalis"
  }
 ];
 const fallbackURLs={};
 for(const u of upgrades){
  const c=data.characters.find(c=>c.id===u.id);
  if(!c)continue;
  const previous=c.portrait?.url;
  if(!previous||previous===u.url)continue;
  fallbackURLs[u.url]=[previous];
  fallbackURLs[previous]=[u.url];
  c.portrait.url=u.url;c.portrait.credit=u.credit;c.portrait.page=u.page;
  const media=c.media?.find(m=>m.image===previous);
  if(media){media.image=u.url;media.credit=u.credit;media.source=u.page}
  for(const g of c.gear||[]){
   if(g.image===previous){g.image=u.url;g.source=u.page;g.credit=u.credit}
  }
 }
 // Outros servidores conhecidos por impedir carregamento entre domínios.
 // Nunca repetir uma URL já tentada; o tratamento final usa a arte tipográfica local.
 window.T20_MEDIA_BACKUPS=fallbackURLs;

 // Dimensões dos retratos conferidos no Atlas. Uma posição permite recortar a
 // arte sem perder o rosto, enquanto as imagens sem posição aparecem inteiras.
 const frames={
  d:[720,959,"50% 45%"],
  david:[600,300,"50% 38%"],
  cipher:[600,598],
  cyrene:[600,562],
  "em-phantylia":[1024,1024],
  "em-zandar":[720,908,"50% 30%"],
  "em-zephyro":[1250,704,"23% 50%"],
  "em-celenova":[1250,750,"57% 50%"],
  "em-irontomb":[1024,1024],
  "em-archforger":[1920,1080,"54% 50%"],
  "em-asat":[1920,1080,"50% 50%"],
  "em-luxbane":[1250,739,"19% 50%"],
  "hsr-silver-wolf":[980,803],
  "hsr-aha":[980,769],
  "hsr-himeko-nova":[980,572,"72% 35%"],
  "hsr-welt":[980,724],
  "hsr-stelle":[816,1080],
  "hunter-kafka":[980,796],
  "hunter-blade":[980,673,"59% 36%"],
  "hunter-firefly":[980,926],
  "hsr-feixiao":[980,771],
  lucy:[1500,844,"50% 38%"],
  weak:[250,410],
  "adam-smasher":[650,650,"50% 50%"],
  talia:[250,410],
  roman:[250,410]
 };
 for(const id of ["hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine",
  "hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae","em-herta","em-acheron"]){
  frames[id]=[376,512,"50% 0%"];
 }
 window.T20_PORTRAIT_FRAMES=frames;
})();
