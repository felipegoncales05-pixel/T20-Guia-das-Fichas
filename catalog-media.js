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
})();
