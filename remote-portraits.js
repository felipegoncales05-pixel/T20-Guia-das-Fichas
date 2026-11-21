/* Recuperação gradual de retratos ainda simbólicos (Fate/JoJo).
   Somente substitui um pôster quando nome e franquia/classe correspondem.
   Sem imagens genéricas ou associações por similaridade ambígua. */
(()=>{"use strict";
const root=document.getElementById("app"),characters=window.T20_DATA?.characters||[];
if(!root)return;
const pending=new Map(),posters=window.T20_MEDIA_POSTERS||(window.T20_MEDIA_POSTERS={});
const cacheKey="t20-verified-portrait-cache-v1";
let cache={};
try{cache=JSON.parse(localStorage.getItem(cacheKey)||"{}")||{}}catch{cache={}}
const saveArt=(key,art)=>{if(!art)return art;cache[key]={...art,stored:Date.now()};try{localStorage.setItem(cacheKey,JSON.stringify(cache))}catch{}return art};
const normalize=value=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
 .replace(/[’']/g,"").replace(/\(fate\)|\(strange fake\)/g,"").replace(/[^a-z0-9]+/g," ").trim();
const sameTokens=(a,b)=>normalize(a).split(" ").filter(Boolean).sort().join(" ")===normalize(b).split(" ").filter(Boolean).sort().join(" ");
const aliases={
 "fate-artoria":["Altria Pendragon"],
 "fate-cu-chulainn":["Cu Chulainn"],
 "fate-sasakikojirou":["Sasaki Kojirou","Sasaki Kojiro"],
 "fate-hassan-hundred":["Hassan of the Hundred Faces"],
 "fate-jeanne":["Jeanne d'Arc"],
 "fate-amakusa":["Amakusa Shirou Tokisada"],
 "fate-king-hassan":["King Hassan"],
 "fate-quatz":["Quetzalcoatl"],
 "fate-scathach":["Scathach"],
 "fate-skadi":["Scathach-Skadi"],
 "fate-koyanskaya":["Koyanskaya of Light"],
 "fate-arthur-proto":["Arthur Pendragon (Prototype)"],
 "fate-ivan":["Ivan the Terrible"],
 "fate-holmes":["Sherlock Holmes"],
 "fate-yamato":["Yamato Takeru"]
};
function safeImage(v){return typeof v==="string"&&/^https:\/\/[^\s<>"']+\.(?:png|jpe?g|webp)(?:\?.*)?$/i.test(v)?v:null}
let servantList;
async function servants(){
 if(!servantList)servantList=fetch("https://api.atlasacademy.io/export/JP/basic_servant_lang_en.json",{mode:"cors"})
  .then(r=>{if(!r.ok)throw Error("Atlas indisponível");return r.json()})
  .then(data=>Array.isArray(data)?data:[]).catch(()=>[]);
 return servantList;
}
async function fatePortrait(c){
 const all=await servants();
 const names=[c.name,...(aliases[c.id]||[])];
 const possible=all.filter(s=>names.some(name=>sameTokens(s.name,name)));
 if(!possible.length)return null;
 const role=normalize(c._wave7?.fateClass||"");
 const matching=role?possible.filter(s=>!s.className||normalize(s.className)===role):possible;
 if(!matching.length)return null;
 const selected=matching[0];
 if(!Number.isInteger(selected.id)||selected.id<=0)return null;
 const response=await fetch("https://api.atlasacademy.io/nice/JP/servant/"+selected.id,{mode:"cors"});
 if(!response.ok)return null;
 const detail=await response.json();
 const images=detail.extraAssets?.narrowFigure?.ascension||detail.extraAssets?.charaGraph?.ascension||{};
 const image=safeImage(images["0"]||images["1"]||Object.values(images)[0]);
 return image?{url:image,credit:"Fate/Grand Order · TYPE-MOON / Lasengle (via Atlas Academy)",source:image}:null;
}
const jojoQuery="query ($search: String) { Page(perPage: 8) { characters(search: $search) { id name { full alternative } image { large } media(perPage: 10) { nodes { title { romaji english } } } } } }";
async function jojoPortrait(c){
 const response=await fetch("https://graphql.anilist.co",{method:"POST",mode:"cors",
  headers:{"Content-Type":"application/json","Accept":"application/json"},
  body:JSON.stringify({query:jojoQuery,variables:{search:c.name}})});
 if(!response.ok)return null;
 const json=await response.json();
 const candidates=json.data?.Page?.characters||[];
 const matched=candidates.find(x=>
  [x.name?.full,...(x.name?.alternative||[])].some(name=>sameTokens(name,c.name))&&
  (x.media?.nodes||[]).some(m=>/jojo/i.test(m.title?.romaji||"")||/jojo/i.test(m.title?.english||"")));
 const image=safeImage(matched?.image?.large);
 return image?{url:image,credit:"JoJo's Bizarre Adventure · retrato de referência via AniList",source:"https://anilist.co/character/"+matched.id}:null;
}
function getCurrent(card){
 const id=card.dataset.open;
 const base=characters.find(c=>c.id===id);
 if(!base)return null;
 const key=Array.from(card.parentElement?.querySelectorAll("[data-card-switch]")||[])
  .find(button=>button.dataset.cardSwitch===id&&button.getAttribute("aria-pressed")==="true")?.dataset.cardMode;
 return window.T20_FATE_VARIANTS?.[id]?.find(entry=>entry[0]===key)?.[2]||base;
}
function apply(c,art,original){
 if(!art||!c?.portrait||!original.startsWith("data:image/svg+xml"))return;
 posters[art.url]=original;
 c.portrait={...c.portrait,url:art.url,credit:art.credit,page:art.source};
 for(const m of c.media||[])if(m.image===original){m.image=art.url;m.credit=art.credit;m.source=art.source}
 for(const g of c.gear||[])if(g.image===original){g.image=art.url;g.credit=art.credit;g.source=art.source}
 for(const img of root.querySelectorAll(".photo img, .hero-portrait img, .media-photo img, .gear-thumb img")){
  if(img.classList.contains("portrait-underlay")||img.getAttribute("src")!==original)continue;
  img.dataset.posterFallback=original;
  img.src=art.url;
 }
}
async function enrich(card){
 const c=getCurrent(card);
 if(!c||!String(c.portrait?.url||"").startsWith("data:image/svg+xml"))return;
 const original=c.portrait.url,key=c.id+"|"+normalize(c.name)+"|"+normalize(c._wave7?.fateClass||"");
 if(!pending.has(key)){
  const hit=cache[key],fresh=hit&&Date.now()-hit.stored<30*24*60*60*1000&&safeImage(hit.url);
  pending.set(key,fresh?Promise.resolve(hit):
   (c.id.startsWith("fate-")?fatePortrait(c):jojoPortrait(c)).then(art=>saveArt(key,art)).catch(()=>null));
 }
 const art=await pending.get(key);
 if(art&&c.portrait.url===original)apply(c,art,original);
}
const observer=typeof IntersectionObserver==="function"?new IntersectionObserver(entries=>{
 for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);enrich(entry.target)}
},{rootMargin:"360px"}):null;
function scan(){
 for(const card of root.querySelectorAll(".roster-card[data-open]")){
  const id=card.dataset.open;
  if(!/^(fate-|jb-)/.test(id)||card.dataset.portraitLookup)return;
  card.dataset.portraitLookup="1";
  if(observer)observer.observe(card);else enrich(card);
 }
}
if(typeof MutationObserver==="function")new MutationObserver(scan).observe(root,{childList:true,subtree:true});
scan();
})();
