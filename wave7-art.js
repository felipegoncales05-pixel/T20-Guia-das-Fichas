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
