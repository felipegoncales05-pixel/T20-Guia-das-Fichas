/* Retratos recuperados e otimizados para carregamento local.
   Proveniência, URL original e créditos: assets/card-art/sources.json. */
(()=>{
  const data=window.T20_DATA;if(!data)return;
  const ids=["david","cipher","rentarou","yoru","diego","ado","cyrene","marin","makima","optimus","yuta","goku",
    "hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine","hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae",
    "em-herta","em-acheron","elster"];
  const overrides={
    optimus:{credit:"Render de Optimus Prime Beast Hunters por Barricade24 · DeviantArt",page:"https://www.deviantart.com/barricade24/art/Optimus-Prime-Prime-Beast-Hunters-Promo-655061791"},
    "diego-alternative":{credit:"Diego paralelo e THE WORLD · All-Star Battle R, via JoJo Wiki",page:"https://jojowiki.com/File:Alternate_World_Diego_ASBR.png"}
  };
  function use(c,key){
    if(!c)return;
    const old=c.portrait?.url;
    const img="./assets/card-art/"+key+".webp";
    const extra=overrides[key]||{};
    c.portrait={...c.portrait,url:img,credit:extra.credit||c.portrait.credit,page:extra.page||c.portrait.page};
    for(const m of c.media||[])if(m.image===old){m.image=img;if(extra.credit)m.credit=extra.credit;if(extra.page)m.source=extra.page}
    for(const g of c.gear||[])if(g.image===old){g.image=img;if(extra.credit)g.credit=extra.credit;if(extra.page)g.source=extra.page}
  }
  for(const id of ids)use(data.characters.find(c=>c.id===id),id);
  use(window.T20_ALTERNATES?.diego?.alternative,"diego-alternative");
  for(const id of ["gt","daima","super"])use(window.T20_GOKU_VARIANTS?.[id],"goku-"+id);
  window.T20_LOCAL_MEDIA_IDS=[...ids,"diego-alternative","goku-gt","goku-daima","goku-super"];
})();
