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
