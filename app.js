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
const normalizeSearch=(v)=>String(v??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR").replace(/[^a-z0-9]+/g," ").trim();
const archiveCategory=(c)=>c.catalogCategory||(["gyro","diego"].includes(c.id)?"jojo":["cipher","cyrene"].includes(c.id)?"chrysos":["rentarou","marin"].includes(c.id)?"romcom":["yoru","makima"].includes(c.id)?"chainsaw":c.id==="ado"?"music":c.id==="optimus"?"transformers":"cyberpunk");
const archiveTerms=(c)=>normalizeSearch([c.name,c.universe,c.label,c.info?.className,c.info?.origin,c.info?.race,c.info?.role,c._mega?.identity,c.id==="goku"?"Dragon Ball Z GT Daima Super":"",window.T20_FATE_VARIANTS?.[c.id]?.map(x=>[x[1],x[2].name,x[2].info?.className,x[2]._wave7?.fateClass].join(" ")).join(" ")||""].filter(Boolean).join(" "));
const plannedById=(id)=>planned.find(c=>c.id===id);

const charById=(id)=>id==="goku"&&window.T20_GOKU_VARIANTS?.[gokuMode]?window.T20_GOKU_VARIANTS[gokuMode]:
 id==="diego"&&diegoMode==="alternative"&&window.T20_ALTERNATES?.diego?.alternative?window.T20_ALTERNATES.diego.alternative:
 window.T20_FATE_VARIANTS?.[id]?variantByKey(id,catalogModes[id]||"principal"):
 data.characters.find(c=>c.id===id);
function image(src,alt,css="",attrs=""){return '<img class="'+e(css)+'" '+attrs+' loading="lazy" decoding="async" referrerpolicy="no-referrer" src="'+imageUrl(src)+'" alt="'+e(alt)+'">'}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3200)}
function note(text){return '<aside class="system-note"><span class="who">O SISTEMA // OBSERVAÇÃO</span><p>'+e(text)+'</p></aside>'}

const guides=window.T20_GUIDE||{books:{},people:{}};
const guideFor=(c)=>c._guide||(c.id==="diego"&&c.theme==="diego-alt"&&window.T20_ALTERNATE_GUIDES?.diego?window.T20_ALTERNATE_GUIDES.diego:guides.people[c.id]||{levels:[],basics:[]});
const variants=(id)=>id==="diego"?[["normal","Scary Monsters",data.characters.find(c=>c.id==="diego")],["alternative","THE WORLD",window.T20_ALTERNATES?.diego?.alternative]].filter(x=>x[2]):id==="goku"?[["z","DBZ",window.T20_GOKU_VARIANTS?.z],["gt","GT",window.T20_GOKU_VARIANTS?.gt],["daima","Daima",window.T20_GOKU_VARIANTS?.daima],["super","Super",window.T20_GOKU_VARIANTS?.super]].filter(x=>x[2]):window.T20_FATE_VARIANTS?.[id]||[["principal",plannedById(id)?"Pendente":"Principal",data.characters.find(c=>c.id===id)||plannedById(id)]];
const activeVariant=(id)=>id==="diego"?diegoMode:id==="goku"?gokuMode:window.T20_FATE_VARIANTS?.[id]?(catalogModes[id]||"principal"):"principal";
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

function getRoute(){const parts=decodeURIComponent(location.hash.replace(/^#\/?/,"")).split("/").filter(Boolean);if(parts[0]==="laboratorio")return{character:null,board:false,lab:true,seedId:parts[1]||"",tab:"overview"};if(parts[0]==="arquivo")return{character:null,board:true,tab:"review"};const pending=plannedById(parts[0]);if(pending)return{character:null,planned:pending,board:false,tab:tabs.some(t=>t[0]===parts[1])?parts[1]:"overview"};if(!data.characters.some(c=>c.id===parts[0]))return{character:null,board:false,tab:"overview"};let tab=parts[1];if(parts[0]==="diego"){diegoMode=["normal","alternative"].includes(parts[1])?parts[1]:"normal";if(tab===diegoMode)tab=parts[2]}if(parts[0]==="goku"){gokuMode=["z","gt","daima","super"].includes(parts[1])?parts[1]:"z";if(tab===gokuMode)tab=parts[2]}if(window.T20_FATE_VARIANTS?.[parts[0]]){const options=variants(parts[0]).map(v=>v[0]);const next=options.includes(parts[1])?parts[1]:(catalogModes[parts[0]]||"principal");catalogModes[parts[0]]=next;if(tab===next)tab=parts[2]}return{character:charById(parts[0]),board:false,tab:tabs.some(t=>t[0]===tab)?tab:"overview"}}
function linkFor(c,tab="overview"){return "#/"+encodeURIComponent(c.id)+"/"+(c.id==="diego"||c.id==="goku"||window.T20_FATE_VARIANTS?.[c.id]?.length>1?activeVariant(c.id)+"/":"")+tab}
function shell(title,number,content,comment){const c=getRoute().character,v=visualFor(c,activeVariant(c.id));return '<header class="section-head section-cover"><div><div class="kicker">O SISTEMA // DOSSIÊ ATIVO</div><h2>'+e(title)+'</h2><span class="section-context">'+e(v.series)+' / '+e(v.motif)+'</span></div><span class="number">'+e(number)+'</span></header>'+content+(comment?note(comment):"")}
function sourceLink(entry,category){return '<a class="source-link" href="'+url(entry.url)+'" target="_blank" rel="noopener noreferrer"><span><b>'+e(entry.name)+'</b><small>'+e(category||entry.detail||"Referência externa")+'</small></span><i aria-hidden="true">↗</i></a>'}
const worldMarks={zenless:"NEW ERIDU",manhwa:"MANHWA",marvel:"MARVEL / MCU",fate:"FATE / SPIRIT ORIGIN","the-boys":"THE BOYS","one-punch-man":"ONE PUNCH","blue-lock":"BLUE LOCK","kamen-rider":"KAMEN RIDER",konosuba:"KONOSUBA",mushoku:"MUSHOKU TENSEI",wuwa:"WUTHERING WAVES",dmc:"DEVIL MAY CRY",fma:"FULLMETAL",genshin:"GENSHIN IMPACT",witcher:"THE WITCHER",overwatch:"OVERWATCH",umamusume:"TRACEN // UMA",jojo:"JOJO ★",cyberpunk:"NIGHT CITY",hsr:"STAR RAIL",chrysos:"AMPHOREUS",emanator:"STAR RAIL",romcom:"ROMANCE",chainsaw:"CHAINSAW",music:"VOZ // ADO",transformers:"AUTOBOT",jjk:"JUJUTSU",dragonball:"DRAGON BALL",signalis:"SIGNALIS",mha:"HERO ACADEMIA",bleach:"BLEACH","dark-souls":"DARK SOULS III","binding-of-isaac":"ISAAC",shuumatsu:"SHUUMATSU","black-souls":"BLACK SOULS",sekiro:"SEKIRO","tokyo-ghoul":"TOKYO GHOUL"};
const visualFor=(c,key)=>window.T20_VISUAL.forCharacter(c,key);
function visualStyle(v){return '--char-color:'+e(v.accent)+';--art-accent:'+e(v.accent)+';--art-dark:'+e(v.dark)}
function visualAttrs(v){return ' data-art="'+e(v.id)+'" data-layout="'+e(v.layout)+'" data-pattern="'+e(v.pattern)+'" data-family="'+e(v.family)+'" data-finish="'+e(v.finish)+'" data-lineage="'+e(v.lineage)+'" data-variant="'+e(v.variant)+'"'}
function cardEffect(id){return "";
/* Efeitos removidos dos cards para reduzir camadas animadas e liberar espaço para retratos. */

 if(id==="d")return '<div class="capri-hud" aria-hidden="true"><span class="capri-signal">CAPRI // LINK ATIVO</span><span class="capri-screen"><img src="./assets/motifs/capri-hud.webp" alt="" loading="lazy" decoding="async"><img class="capri-gaze" src="./assets/motifs/capri-hud.webp" alt="" loading="lazy" decoding="async"><img class="capri-mouth" src="./assets/motifs/capri-hud.webp" alt="" loading="lazy" decoding="async"></span><span class="capri-laugh">hahaha</span><span class="capri-caption">OLHOS EM VOCÊ</span></div>';
 if(id==="david")return '<div class="psycho-hud" aria-hidden="true"><span class="psycho-echo"></span><span class="psycho-status">NEURAL LINK // INSTÁVEL</span><span class="psycho-error">ERRO DE SINAL</span></div>';
 return "";
}
function card(c){
 const nForms=window.T20_FATE_VARIANTS?.[c.id]?.length||0;
 const alternate=c.id==="diego"?"2 VERSÕES · SCARY MONSTERS / THE WORLD":c.id==="goku"?"4 VERSÕES · DBZ / GT / DAIMA / SUPER":nForms>1?nForms+" VERSÕES · "+window.T20_FATE_VARIANTS[c.id].map(x=>x[1]).join(" / "):"";
 const mode=catalogModes[c.id]||"principal";
 const shown=mode==="principal"?c:variantByKey(c.id,mode);
 const visual=visualFor(shown,mode);
 const symbolic=shown.portrait.url.startsWith("data:image/")||shown.portrait.url.endsWith(".svg");
 const cover=!(c.id==="diego"&&mode==="alternative")?window.T20_CATALOG_COVERS?.[c.id]:null;
 const featuredImage=cover?.image||shown.portrait.url;
 const featuredAttrs=cover?' data-card-fallback="'+imageUrl(shown.portrait.url)+'" data-cover-volume="'+e(cover.volume||"")+'"':"";
 const world=archiveCategory(c);
 const button='<button type="button" class="roster-card '+e(c.theme)+'" style="'+visualStyle(visual)+'" data-world="'+e(world)+'"'+visualAttrs(visual)+' data-open="'+e(c.id)+'" aria-label="Abrir ficha de '+e(c.name)+(alternate?' · versão '+mode:'')+'">'+
  '<div class="photo">'+(["umamusume","konosuba","mushoku","wuwa","dmc","fma","genshin","witcher","overwatch","fate","the-boys","blue-lock","one-punch-man","kamen-rider"].includes(world)||c.id.startsWith("cx-")||c.id.startsWith("jb-")||window.T20_WAVE7?.ids.has(c.id)?"":'<img class="portrait-underlay" src="./assets/portraits/'+e(c.id)+'.svg" alt="" aria-hidden="true" loading="lazy" decoding="async">')+image(featuredImage,(cover?"Capa editorial de ":"Retrato ilustrativo de ")+shown.name,"",featuredAttrs)+'</div>'+
  '<div class="art-insignia" aria-hidden="true"><span>'+e(visual.motif)+'</span><i></i></div><span class="art-series" aria-hidden="true">'+e(visual.series)+'</span>'+
  ''+
  '<span class="card-no">DOSSIÊ // '+e(c.number)+'</span><span class="world-mark" aria-hidden="true">'+e(worldMarks[world]||"O SISTEMA")+'</span><span class="card-topline" aria-hidden="true"></span>'+
  '<div class="card-body"><span class="card-overline">'+e(shown.label)+'</span><h3>'+e(c.name)+'</h3>'+
  (alternate?'<span class="card-versions">'+alternate+'</span>':'')+(symbolic?'<span class="card-versions symbolic">RETRATO PENDENTE · ARTE SIMBÓLICA</span>':'')+
  '<p>'+e(shown.info.race)+' · '+e(shown.info.className)+'<br>'+e(shown.universe)+'</p><div class="card-action"><span>ACESSAR FICHA</span><b aria-hidden="true">↗</b></div></div></button>';
 if(!alternate)return button;
 const options=c.id==="diego"?[["normal","SM"],["alternative","TW"]]:c.id==="goku"?[["z","DBZ"],["gt","GT"],["daima","DAIMA"],["super","SUPER"]]:variants(c.id).map(([key,label])=>[key,label]);
 return '<div class="roster-entry'+(world==="fate"?" fate-entry":"")+'">'+button+'<div class="card-variant-switch" role="group" aria-label="Versões de '+e(c.name)+'">'+options.map(([key,label])=>'<button type="button" data-card-switch="'+e(c.id)+'" data-card-mode="'+e(key)+'" aria-pressed="'+(mode===key)+'" aria-label="Visualizar '+e(c.name)+' · '+e(c.id==="diego"?(key==="normal"?"Scary Monsters":"The World"):label)+'">'+e(label)+'</button>').join("")+'</div></div>';
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
'<section aria-labelledby="roster-title" id="catalogo"><div class="list-toolbar"><div><div class="corner-label">SISTEMA DE IDENTIFICAÇÃO // SELEÇÃO</div><h2 id="roster-title">ARQUIVO DE PERSONAGENS</h2></div><div class="filters"><div class="search-field"><label class="filter-label" for="search">PESQUISAR FICHAS</label><div class="search-field-inner"><span class="search-magnifier" aria-hidden="true">⌕</span><input class="search-input" id="search" type="search" placeholder="Nome, personagem, classe ou universo..." autocomplete="off" enterkeyhint="search" value="'+e(search)+'"><button type="button" class="clear-search" data-clear-search aria-label="Limpar pesquisa" title="Limpar pesquisa">LIMPAR ×</button></div></div><div class="filter-field"><label class="filter-label" for="universe">FILTRAR POR UNIVERSO</label><select class="filter-select" id="universe"><option value="all">Todos os universos</option><option value="fate">Fate · Servos</option><option value="the-boys">The Boys</option><option value="one-punch-man">One Punch Man</option><option value="blue-lock">Blue Lock</option><option value="kamen-rider">Kamen Rider</option><option value="konosuba">KonoSuba</option><option value="mushoku">Mushoku Tensei</option><option value="wuwa">Wuthering Waves</option><option value="dmc">Devil May Cry</option><option value="fma">Fullmetal Alchemist</option><option value="genshin">Genshin Impact</option><option value="witcher">The Witcher</option><option value="overwatch">Overwatch</option><option value="umamusume">Umamusume · Pretty Derby</option><option value="manhwa">Manhwa · Fantasia</option><option value="zenless">Zenless Zone Zero</option><option value="marvel">Marvel / MCU</option><option value="jojo">JoJo</option><option value="cyberpunk">Cyberpunk</option><option value="hsr">Honkai: Star Rail</option><option value="romcom">Romance & Cosplay</option><option value="chainsaw">Chainsaw Man</option><option value="music">Música / Ado</option><option value="transformers">Transformers</option><option value="jjk">Jujutsu Kaisen</option><option value="dragonball">Dragon Ball</option><option value="chrysos">Herdeiros de Chrysos</option><option value="emanator">Emanadores</option><option value="signalis">SIGNALIS</option><option value="mha">My Hero Academia</option><option value="bleach">Bleach</option><option value="dark-souls">Dark Souls III</option><option value="binding-of-isaac">The Binding of Isaac</option><option value="shuumatsu">Shuumatsu no Valkyrie</option><option value="black-souls">Black Souls</option><option value="sekiro">Sekiro</option><option value="tokyo-ghoul">Tokyo Ghoul</option></select></div></div></div><div class="catalog-meta"><span id="resultsCount" role="status" aria-live="polite"></span><span class="catalog-sort-label">⇅ ORDEM ALFABÉTICA · A–Z</span></div><div class="roster-grid" id="roster" aria-live="polite"></div><div class="archive-pagination" id="archivePagination"></div></section>'+
'<div class="rule-note"><b>O SISTEMA //</b><span>O acervo reúne os JoBros, o núcleo de The Boys e 98 Servos principais de Fate com 50 formas alternativas, além de 16 crossovers, 57 Umas e 69 fichas históricas. Dez builds geradas automaticamente a partir de presets auditáveis, inclusive multiclasses. PV/PM são subtotais das regras cadastradas; equipamentos, magias e decisões da mesa devem ser conferidos.</span></div></div>';
root.querySelector?.(".hero-ctas")?.insertAdjacentHTML("beforeend",'<a class="hero-review" href="#/laboratorio">LABORATÓRIO DE BUILDS</a>');
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
 const html=next.map(c=>c.status==="pendente"?plannedCard(c):card(c)).join("");
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
 slot.innerHTML=matches.length?matches.slice(0,visibleCount).map(c=>c.status==="pendente"?plannedCard(c):card(c)).join(""):'<div class="empty-state">NENHUM DOSSIÊ ENCONTRADO // Experimente outro nome ou selecione Todos os universos.</div>';
 const count=document.getElementById("resultsCount");
 if(count)count.textContent=String(matches.length).padStart(2,"0")+" DE "+String(catalog.length).padStart(2,"0")+" DOSSIÊS EXIBIDOS";
 const clear=document.querySelector?.("[data-clear-search]");
 if(clear){clear.disabled=!search;clear.setAttribute("aria-hidden",search?"false":"true")}
 pagination();
}

function cover(c){const v=visualFor(c,activeVariant(c.id));return '<section class="detail-hero" aria-labelledby="character-title"><div class="hero-watermark" aria-hidden="true">'+icon(c.symbol)+'</div><div class="dossier-ornament" aria-hidden="true">'+e(v.motif)+'</div><div class="hero-copy"><div class="kicker">DOSSIÊ '+e(c.number)+' // '+e(c.label)+'</div><span class="dossier-series">'+e(v.series)+' <b>◆</b> '+e(c.universe)+'</span><h1 id="character-title">'+e(c.name)+'</h1><p>'+e(c.excerpt)+'</p><div class="hero-chips"><span class="chip strong">NÍVEL INICIAL 01</span><span class="chip">'+e(c.info.race)+'</span><span class="chip">'+e(c.info.className)+'</span></div></div><div class="hero-portrait">'+(window.T20_WAVE7?.ids.has(c.id)?"":'<img class="portrait-underlay" src="./assets/portraits/'+e(c.id)+'.svg" alt="" aria-hidden="true">')+image(c.portrait.url,"Referência de "+c.name)+'</div><div class="dossier-foot" aria-hidden="true"><span>O SISTEMA / '+e(c.number)+'</span><span>'+e(v.motif)+' // '+e(activeVariant(c.id).toUpperCase())+'</span></div></section>'}
function quickStats(c){
 const v=statFor(c,selectedLevel);
 return '<div class="detail-meta" aria-label="Estatísticas do nível selecionado">'+[
 ["PV",v.pv],["PM",v.pm],["DEFESA",v.defense],["MOVIMENTO",v.move]
 ].map(([k,n])=>'<div class="meta-tile"><small>'+e(k)+' // NÍVEL <span data-stat-level>'+String(selectedLevel).padStart(2,"0")+'</span></small><b data-stat="'+e(k)+'">'+e(n)+'</b></div>').join("")+'</div>';
}
function mediaGallery(c){return '<div class="media-grid">'+c.media.map(m=>'<article class="media-card"><div class="media-photo">'+image(m.image,m.name)+'</div><div class="media-caption"><strong>'+e(m.name)+'</strong><small>'+e(m.credit)+'</small><a href="'+url(m.source)+'" target="_blank" rel="noopener noreferrer">VER ORIGEM DA IMAGEM ↗</a></div></article>').join("")+'</div>'}
function overview(c){const info=[["Raça",c.info.race],["Classe",c.info.className],["Origem",c.info.origin],["Divindade",c.info.devotion],["Função",c.info.role],["Companheiro",c.info.partner]];return shell("Identidade e história","01 / DOSSIÊ",'<div class="section-grid"><article class="panel prose"><div class="panel-title">REGISTRO DE PERSONAGEM</div><h3>'+e(c.name)+'</h3>'+c.history.map(p=>"<p>"+e(p)+"</p>").join("")+'<div class="panel-title" style="margin-top:23px">PROPOSTA DE ADAPTAÇÃO</div><p>'+e(c.summary)+'</p></article><aside class="panel"><div class="panel-title">IDENTIFICAÇÃO DE SISTEMA</div><div class="bio-grid">'+info.map(([k,v])=>'<div class="bio-item"><small>'+e(k.toUpperCase())+'</small><strong>'+e(v)+'</strong></div>').join("")+'</div></aside></div><div class="section-head"><div><div class="kicker">ARQUIVO FOTOGRÁFICO</div><h2>Referências visuais</h2></div></div>'+mediaGallery(c),c.notes.overview)}
function radar(c){const cx=180,cy=165,maxR=112,keys=c.attrs.map(a=>({...a,value:a.value+attrDelta(c,selectedLevel,a.key)}));const pos=(i,r)=>{const theta=(-90+i*60)*Math.PI/180;return [cx+Math.cos(theta)*r,cy+Math.sin(theta)*r]};const pts=(r)=>keys.map((a,i)=>pos(i,r)).map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ");const grid=[1,2,3,4,5].map(n=>'<polygon class="radar-grid" points="'+pts(n*maxR/5)+'"/>').join("");const axes=keys.map((a,i)=>{const [x,y]=pos(i,maxR);return '<line class="radar-axis" x1="'+cx+'" y1="'+cy+'" x2="'+x+'" y2="'+y+'"/>'}).join("");const dataPoints=keys.map((a,i)=>pos(i,Math.min(5,Math.max(0,a.value))*maxR/5));const poly=dataPoints.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ");const dots=dataPoints.map(p=>'<circle class="radar-node" cx="'+p[0]+'" cy="'+p[1]+'" r="4"/>').join("");const labels=keys.map((a,i)=>{const [x,y]=pos(i,141);return '<text class="radar-label" x="'+x+'" y="'+(y-4)+'" text-anchor="middle">'+e(a.key)+'</text><text class="radar-value" x="'+x+'" y="'+(y+13)+'" text-anchor="middle">+'+a.value+'</text>'}).join("");return '<svg class="radar-svg" viewBox="0 0 360 335" role="img" aria-label="Radar de atributos CON, CAR, SAB, INT, FOR e DEX"><g>'+grid+axes+'<polygon class="radar-data" points="'+poly+'"/>'+dots+labels+'</g></svg>'}
function attributes(c){const total=c.attrs.reduce((sum,a)=>sum+(a.buy===3?4:a.buy===2?2:a.buy===1?1:a.buy===0?0:0),0);return shell("Atributos iniciais","02 / CONFIGURAÇÃO",'<div class="section-grid"><div class="panel"><div class="panel-title">ANÁLISE HEXAGONAL // '+e(visualFor(c,activeVariant(c.id)).motif)+'</div><div class="radar-zone"><div id="attrRadar">'+radar(c)+'</div><div class="attr-list">'+c.attrs.map(a=>'<div class="attr-row"><strong>'+e(a.key)+'</strong><span>'+e(a.why)+'</span><b data-current-attr="'+e(a.key)+'">+'+(a.value+attrDelta(c,selectedLevel,a.key))+'</b></div>').join("")+'</div></div><p style="font-size:12px;color:var(--faint);margin:4px 0 0">Gráfico ilustrativo de modificadores, escala de 0 a +5; não representa uma nova regra de Tormenta20.</p></div><div class="panel"><div class="panel-title">COMPRA DE ATRIBUTOS // NÍVEL 01</div><table class="attr-breakdown"><thead><tr><th>ATR.</th><th>COMPRA</th><th>RAÇA</th><th>FINAL</th></tr></thead><tbody>'+c.attrs.map(a=>'<tr><td>'+e(a.key)+'</td><td>+'+a.buy+'</td><td>'+(a.race?'+'+a.race:'—')+'</td><td class="highlight">+'+a.value+'</td></tr>').join("")+'</tbody></table><p style="font:12px var(--mono);color:var(--muted);margin:14px 0">Pontos investidos na compra: '+total+'/10. Bônus raciais já incorporados.</p><div class="panel-title" style="margin-top:17px">ATRIBUTOS DERIVADOS // INÍCIO</div><div class="stat-tiles">'+[["PV",c.stats.pv],["PM",c.stats.pm],["DEF",c.stats.defense],["MOV",c.stats.speed]].map(([k,v])=>'<div class="stat-panel"><small>'+k+'</small><b>'+e(v)+'</b></div>').join("")+'</div></div></div>',c.notes.attributes)}
function equipment(c){return shell("Equipamentos","03 / INVENTÁRIO",'<div class="gear-grid">'+c.gear.map((g,i)=>'<details class="gear-card" '+(i===0?"open":"")+'><summary><div class="gear-thumb">'+(g.image?image(g.image,g.name):e(String(i+1).padStart(2,"0")))+'</div><div class="gear-title"><strong>'+e(g.name)+'</strong><small>'+e(g.rule)+'</small></div><span class="gear-chevron" aria-hidden="true">›</span></summary><div class="gear-details"><span class="gear-quantity">QTD // '+e(g.qty)+'</span><p>'+e(g.detail)+'</p>'+(g.source?'<a href="'+url(g.source)+'" target="_blank" rel="noopener noreferrer">REFERÊNCIA VISUAL: '+e(g.credit||g.source)+' ↗</a>':"")+'</div></details>').join("")+'</div><div class="section-head"><div><div class="kicker">ARMAMENTO</div><h2>Ataques iniciais</h2></div></div><div class="attack-grid">'+c.attacks.map(a=>'<article class="attack-card"><h3>'+e(a.name)+'</h3><div class="attack-numbers"><div><small>ATAQUE / TESTE</small><b>'+e(a.test)+'</b></div><div><small>DANO</small><b>'+e(a.damage)+'</b></div><div><small>GASTO</small><b>'+e(a.cost)+'</b></div></div><p>'+e(a.detail)+'</p></article>').join("")+'</div>',c.notes.equipment)}
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
 if(window.T20_FATE_VARIANTS?.[c.id]?.length>1){
  const forms=window.T20_FATE_VARIANTS[c.id],current=activeVariant(c.id);
  return '<nav class="goku-switch fate-switch" aria-label="Selecionar forma de '+e(c.name)+'"><span>FATE // CLASSE DO SERVO · FORMA ATIVA</span><div>'+forms.map(([key,label])=>'<button type="button" data-fate-mode="'+e(key)+'" data-fate-character="'+e(c.id)+'" aria-pressed="'+(current===key)+'">'+e(label)+'</button>').join("")+'</div></nav>';
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
 if(c._auto)root.querySelector?.(".actions-row")?.insertAdjacentHTML("beforeend",'<a class="sys-button" href="#/laboratorio/'+encodeURIComponent(c.id)+'">ABRIR CÓPIA NO LABORATÓRIO</a>');
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

function render(){const route=getRoute();const selected=route.character||route.planned;const key=route.lab?"lab/"+route.seedId:route.board?"board":selected?selected.id+"/"+activeVariant(selected.id)+"/"+route.tab:"library";if(key===lastRoute)return;if(!route.planned)document.body.removeAttribute("data-pending");if(!route.lab)document.body.removeAttribute("data-lab");const previous=lastRoute;const sameCharacter=!!selected&&previous.startsWith(selected.id+"/");if(route.lab){window.T20_LAB?.render(root,route.seedId);lastRoute=key}else if(route.board)reviewBoard();else if(route.planned)plannedDetail(route.planned,route.tab);else if(route.character)detail(route.character,route.tab);else listView();if(sameCharacter){const nav=document.querySelector?.(".detail-tabs");if(nav?.scrollIntoView)nav.scrollIntoView({block:"start",behavior:"instant"});else window.scrollTo({top:0,behavior:"instant"});const active=document.getElementById("tab-"+route.tab);active?.focus?.({preventScroll:true})}else window.scrollTo({top:0,behavior:"instant"})}
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
 const chosenFate=evt.target.closest("[data-fate-mode]");
 if(chosenFate){
  const id=chosenFate.dataset.fateCharacter,key=chosenFate.dataset.fateMode;
  if(!variants(id).some(v=>v[0]===key))return;
  const tab=getRoute().tab;catalogModes[id]=key;
  location.hash=linkFor(variantByKey(id,key),tab);
  render();toast("FATE // "+key.toUpperCase());return;
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
 // Elementos decorativos não devem substituir a ilustração principal por um bloco de erro.
 if(im.classList.contains("portrait-underlay")||im.closest(".capri-hud")){im.remove();return}
 const original=im.getAttribute("src")||"";
 // Recuperação: fontes alternativas, proxy de imagens e pôster do personagem.
 const proxy=/^https:\/\/(?!wsrv\.nl\/)/i.test(original)?
  "https://wsrv.nl/?url="+encodeURIComponent(original)+"&output=webp&w=1000":null;
 const backups=[...(window.T20_MEDIA_BACKUPS?.[original]||[]),
  im.dataset.cardFallback,proxy,im.dataset.posterFallback,
  window.T20_MEDIA_POSTERS?.[original],
  data.characters.find(x=>x.id===(im.closest(".roster-card")?.dataset.open||getRoute().character?.id))?.portrait?.fallback].filter(Boolean);
 const tried=(im.dataset.triedSources||"").split("|").filter(Boolean);
 if(!tried.includes(original))tried.push(original);
 const local=im.closest(".roster-card")?.dataset.open||getRoute().character?.id;
 const dynamic=window.T20_WAVE7?.ids.has(local)||window.T20_CROSSOVERS?.ids.has(local)||window.T20_UMA?.ids.has(local);
 const localPath=local&&!dynamic?"./assets/portraits/"+local+".svg":null;
 const next=backups.find(candidate=>candidate&&!tried.includes(candidate))||(localPath&&!tried.includes(localPath)?localPath:null);
 if(next){
  im.dataset.triedSources=tried.join("|");
  im.src=next;
  return;
 }
 const container=im.closest(".roster-card");
 const c=container?data.characters.find(x=>x.id===container.dataset.open):getRoute().character;
 const label=(container?.querySelector("h3")?.textContent||c?.name||im.alt.replace(/^(Retrato ilustrativo de|Imagem ilustrativa de)\s+/i,"")).trim();
 const marker=c?.symbol||c?._mega?.identity?.charAt(0)||"◈";
 const replacement=document.createElement("div");
 replacement.className="img-fallback art-recovery";
 replacement.setAttribute("role","img");
 replacement.setAttribute("aria-label","Ilustração alternativa de "+label);
 if(c?._mega?.color)replacement.style.color=c._mega.color;
 const symbol=document.createElement("span");symbol.className="fallback-mark";symbol.textContent=marker;
 const title=document.createElement("strong");title.className="fallback-title";title.textContent=label;
 const caption=document.createElement("span");caption.className="fallback-caption";caption.textContent="ARQUIVO DE PERSONAGEM // O SISTEMA";
 replacement.append(symbol,title,caption);
 im.replaceWith(replacement);
},true);
document.addEventListener("load",evt=>{
 const im=evt.target;
 if(typeof HTMLImageElement!=="undefined"&&im instanceof HTMLImageElement&&!im.classList.contains("portrait-underlay")){
  im.closest(".hero-portrait")?.classList.add("portrait-ready");
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
