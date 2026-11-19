/* O SISTEMA // Ilustrações que o narrador enviou (2026-11-19).
   Ordem vinculada literalmente à lista fornecida: Dio, DIO, D., Valentine,
   Gyro, Pucci, Kira, Tooru, Diavolo, Zandar One Kuwabara.
   PNGs originais ficam no repositório, e o site usa WebPs locais otimizados. */
(()=>{
const data=window.T20_DATA;if(!data)return;
const ids=["jojo-dio1","jojo-dio3","d","jojo-valentine","gyro","jojo-pucci","jojo-kira","jojo-tooru","jojo-diavolo","em-zandar"];
const folder="https://github.com/felipegoncales05-pixel/T20-Guia-das-Fichas/tree/main/assets/art";
for(const id of ids){
 const c=data.characters.find(c=>c.id===id);if(!c)continue;
 const previous=c.portrait?.url;
 const image="./assets/art-optimized/"+id+".webp";
 const credit="Imagem fornecida pelo usuário para esta ficha; autoria original não identificada";
 c.portrait={url:image,credit,page:folder};
 c.media=[{name:c.name+" — arte escolhida pelo usuário",image,source:folder,credit},
   ...(c.media||[]).filter(m=>m.image!==image)];
 for(const gear of c.gear||[]){
  if(gear.image===previous&&id!=="d"){
   gear.image=image;gear.source=folder;gear.credit=credit;
  }
 }
 if(!c.sources.some(s=>s.url===folder))c.sources.push({name:"Ilustrações enviadas para O Sistema — acervo do site",url:folder});
}
window.T20_USER_ART_IDS=ids;
})();