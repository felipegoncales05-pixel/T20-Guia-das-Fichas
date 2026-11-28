/* O Sistema // T20 — Atlas Multiversal (camada de navegação; não altera fichas). */
(function(){
"use strict";
const PAGE_SIZE=24;
const manhwaWorks=new Set(["the-greatest-estate-developer","swordmaster-s-youngest-son"]);
const highlights=["jojo-s-bizarre-adventure","cyberpunk","fate","honkai-star-rail","cavaleiros-do-zodiaco","uma-musume"];
const themes=window.T20_ATLAS_THEMES;
const art=window.T20_ATLAS_ART;
const state={continuity:"",search:"",universe:"",classType:"",race:"",sort:"name",page:1,compare:[]};
let cacheSource=null,cacheSize=-1,cache=[];
const {norm,groupFor}=themes;
const esc=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const slug=s=>norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"outros";
const sortBR=(a,b)=>String(a).localeCompare(String(b),"pt-BR",{sensitivity:"base",numeric:true});
function dossierMetadata(c){
  const className=String(c.info?.className||"Não informada");
  return {className,classType:className.split(/\s*[/+(]\s*/)[0].trim()||className,
    race:String(c.info?.race||"Não informada"),origin:String(c.info?.origin||"Não informada")};
}
function createIndex(characters){
  const records=Array.isArray(characters)?characters:[];
  const seen=new Set();
  return records.filter(c=>c&&c.id&&!seen.has(c.id)&&seen.add(c.id)).map(c=>{
    const universe=groupFor(c);
    const universeSlug=slug(universe);
    const theme=themes.forWork(universeSlug,norm(c.universe));
    const editions=Object.entries(c.id==="goku"?(window.T20_GOKU_VARIANTS||{}):{}).map(([key,form])=>
      ({key,theme:themes.forWork(universeSlug,norm(form.universe),key),work:form.universe,...dossierMetadata(form)}));
    const metadata=dossierMetadata(c);
    const {className,race,origin}=metadata;
    const searchParts=[c.name,c.id,c.universe,universe,c.label,c.excerpt,c.summary,className,race,origin,
      c.info?.role,c.info?.devotion,...(Array.isArray(c.initial)?c.initial:[]),
      ...(Array.isArray(c.techniques)?c.techniques.flatMap(t=>[t.name,t.mechanic]):[]),
      ...(Array.isArray(c.searchAliases)?c.searchAliases:[]),
      ...(Array.isArray(c.aliases)?c.aliases:[]),...editions.map(edition=>edition.work)];
    return {id:String(c.id),name:String(c.name||c.id),universe,universeSlug,theme,editions,
      work:String(c.universe||universe),...metadata,
      isPending:c.status==="pendente",search:norm(searchParts.filter(Boolean).join(" "))};
  });
}
function getIndex(){
  const source=window.T20_DATA?.characters||[];
  if(source!==cacheSource||source.length!==cacheSize){
    cache=createIndex(source);cacheSource=source;cacheSize=source.length;
  }
  return cache;
}
function groupIndex(items){
  const groups=new Map();
  for(const c of items){
    if(!groups.has(c.universeSlug))groups.set(c.universeSlug,{slug:c.universeSlug,name:c.universe,count:0,examples:[]});
    const group=groups.get(c.universeSlug);
    group.count++;
    if(group.examples.length<3)group.examples.push(c.name);
  }
  return Array.from(groups.values()).sort((a,b)=>b.count-a.count||sortBR(a.name,b.name));
}
function tokens(theme){
  return {"--atlas-bg":theme?.background,"--atlas-panel":theme?.panel,"--atlas-ink":theme?.ink,
    "--atlas-accent":theme?.accent,"--atlas-title":theme?.font,"--atlas-scheme":theme?.colorScheme,
    "--atlas-flare":theme?.flare};
}
function themeStyle(theme){
  return Object.entries(tokens(theme)).map(([name,value])=>name+":"+value).join(";");
}
function themeAttrs(theme){
  return ' data-atlas-theme="'+esc(theme.id)+'" data-atlas-layout="'+theme.layout+
    '" data-atlas-composition="'+theme.composition+'" style="'+esc(themeStyle(theme))+'"';
}
function applyChrome(theme,inAtlas){
  const header=document.getElementById("siteHeader");
  if(!header)return;
  if(inAtlas)header.dataset.atlasChrome=theme?.composition||"central";
  else delete header.dataset.atlasChrome;
  for(const [name,value] of Object.entries(tokens(theme))){
    if(value)header.style.setProperty(name,value);
    else header.style.removeProperty(name);
  }
}
function dossierLink(character,variant){
  const universe=groupFor(character);
  const universeSlug=slug(universe);
  const theme=themes.forWork(universeSlug,norm(character.universe),variant);
  return '<a class="atlas-dossier-link"'+themeAttrs(theme)+' href="#/atlas/'+encodeURIComponent(universeSlug)+
    '"><span aria-hidden="true">◇</span><span>Atlas · '+esc(universe)+'</span><span aria-hidden="true">↗</span></a>';
}
function option(value,label,selected){
  return '<option value="'+esc(value)+'"'+(value===selected?' selected':'')+'>'+esc(label)+'</option>';
}
function dossierHref(item){
  return "#/"+encodeURIComponent(item.id)+(item.key?"/"+encodeURIComponent(item.key):"")+"/overview";
}
function displayEntry(item){
  const themeId=state.continuity||item.theme.id;
  const edition=item.editions.find(e=>e.theme.id===themeId);
  return edition?{...item,...edition}:item;
}
function compareIndex(entry){
  return state.compare.findIndex(item=>item.id===entry.id&&item.key===entry.key);
}
function compareCard(item){
  if(!item)return '<article class="atlas-compare-slot"><span>Espaço disponível</span><p>Adicione um dossiê ou versão pelos resultados.</p></article>';
  return '<article class="atlas-compare-slot"><span>'+esc(item.key?item.work:item.universe)+'</span><h3>'+esc(item.name)+'</h3>'+
    '<dl><div><dt>Classe</dt><dd>'+esc(item.className)+'</dd></div><div><dt>Raça</dt><dd>'+esc(item.race)+'</dd></div>'+
    '<div><dt>Origem</dt><dd>'+esc(item.origin)+'</dd></div></dl>'+
    '<a href="'+dossierHref(item)+'">ABRIR DOSSIÊ ↗</a></article>';
}
function renderComparison(){
  const slot=document.getElementById("atlasComparison");if(!slot)return;
  const choices=state.compare;
  slot.innerHTML='<div class="atlas-section-head"><h2>Comparação rápida</h2>'+
    (choices.length?'<button class="sys-button" type="button" data-atlas-clear-compare>LIMPAR</button>':'')+'</div>'+
    '<div class="atlas-compare-grid">'+compareCard(choices[0])+compareCard(choices[1])+'</div>'+
    '<p class="atlas-disclaimer">Comparação editorial, não de poder ou equilíbrio. A progressão e as regras de cada adaptação continuam nos dossiês e no Laboratório.</p>';
}
function renderUniverses(items){
  const slot=document.getElementById("atlasUniverseList");if(!slot)return;
  const groups=groupIndex(items).filter(group=>matchesUniverse(group.slug));
  const featured=highlights.map(id=>groups.find(group=>group.slug===id)).filter(Boolean);
  const rest=groups.filter(group=>!highlights.includes(group.slug));
  slot.innerHTML=[...featured,...rest].map(group=>{
    const theme=themes.resolve(group.slug);
    return '<a class="atlas-universe"'+themeAttrs(theme)+(featured.includes(group)?' data-atlas-featured':'')+
      ' data-atlas-portal="'+esc(group.slug)+'" href="#/atlas/'+encodeURIComponent(group.slug)+'">'+
      '<div class="atlas-portal-visual">'+art.scene(theme)+'</div>'+
      '<span class="atlas-universe-count">'+group.count+' '+(group.count===1?'dossiê':'dossiês')+'</span>'+
      '<strong>'+esc(group.name)+'</strong><span class="atlas-universe-action" aria-hidden="true">↗</span></a>';
  }).join("");
}
function matchesUniverse(slug){
  if(state.universe==="manhwa")return manhwaWorks.has(slug);
  return !state.universe||slug===state.universe;
}
function matchesWorld(c){
  return matchesUniverse(c.universeSlug)&&
    (!state.continuity||c.theme.id===state.continuity||c.editions.some(e=>e.theme.id===state.continuity));
}
function filtered(items){
  const words=norm(state.search).split(" ").filter(Boolean);
  const result=items.filter(matchesWorld)
    .map(displayEntry).filter(c=>(!state.classType||c.classType===state.classType)&&(!state.race||c.race===state.race)&&
    words.every(word=>c.search.includes(word)));
  result.sort((a,b)=>{
    if(state.sort==="universe")return sortBR(a.universe,b.universe)||sortBR(a.name,b.name);
    if(state.sort==="class")return sortBR(a.className,b.className)||sortBR(a.name,b.name);
    return sortBR(a.name,b.name)||sortBR(a.universe,b.universe);
  });
  return result;
}
function updateResults(){
  const items=getIndex();
  const result=filtered(items);
  const pages=Math.max(1,Math.ceil(result.length/PAGE_SIZE));
  state.page=Math.max(1,Math.min(state.page,pages));
  const pageItems=result.slice((state.page-1)*PAGE_SIZE,state.page*PAGE_SIZE);
  const region=document.getElementById("atlasResults");
  if(!region)return;
  region.innerHTML=pageItems.length?pageItems.map(c=>{
    const selected=compareIndex(c)!==-1;
    const theme=c.theme;
    const href=dossierHref(c);
    const attributes=state.universe?themeAttrs(theme):"";
    return '<article class="atlas-result"'+attributes+'>'+
      (state.universe?'<div class="atlas-result-ornament" aria-hidden="true">'+art.emblem(theme)+'</div>':'')+
      '<div class="atlas-result-meta"><span>'+esc(state.universe&&theme.id.includes("/")?theme.label:c.universe)+'</span>'+
      '<h3><a href="'+href+'">'+esc(c.name)+'</a></h3>'+
      '<p>'+esc(c.work)+' · '+esc(c.race)+' · '+esc(c.className)+'</p></div>'+
      '<div class="atlas-result-actions"><a href="'+href+'" aria-label="Abrir ficha de '+esc(c.name)+'">VER FICHA ↗</a>'+
      '<button type="button" data-atlas-compare="'+esc(c.id)+'" aria-pressed="'+selected+'"'+
      (!selected&&state.compare.length>=2?' disabled title="Remova uma escolha para adicionar outro dossiê ou versão"':'')+'>'+
      (selected?'REMOVER':'COMPARAR')+'</button></div></article>';
  }).join(""):'<p class="atlas-empty">Nenhuma ficha encontrada. Tente outro termo ou limpe os filtros.</p>';
  const count=document.getElementById("atlasResultCount");
  if(count)count.textContent=result.length+' DE '+items.length+' DOSSIÊS · PÁGINA '+state.page+' / '+pages;
  const pager=document.getElementById("atlasPager");
  if(pager)pager.innerHTML='<button type="button" data-atlas-page="-1"'+(state.page===1?' disabled':'')+'>← ANTERIOR</button>'+
    '<span>'+state.page+' / '+pages+'</span>'+
    '<button type="button" data-atlas-page="1"'+(state.page===pages?' disabled':'')+'>PRÓXIMA →</button>';
  renderComparison();
}
function worldHero(name,theme,count){
  const label=state.continuity?name:theme.label;
  const title=state.continuity?theme.label:name;
  return '<header class="atlas-hero atlas-world-hero" data-world-name="'+esc(name)+'">'+
    '<div class="atlas-world-visual">'+art.scene(theme)+'</div>'+
    '<div class="atlas-world-copy"><span class="atlas-eyebrow">'+esc(label)+'</span>'+
    '<h1 tabindex="-1">'+esc(title)+'</h1><div class="atlas-world-actions">'+
    '<button type="button" class="atlas-cta" data-atlas-jump="atlasDirectoryTitle">'+count+' '+(count===1?'dossiê':'dossiês')+' <span aria-hidden="true">↓</span></button>'+
    '</div></div></header>';
}
function centralHero(count,universes,isManhwa){
  return '<header class="atlas-hero atlas-central-hero">'+
    '<div class="atlas-central-visual">'+art.starMap()+'</div>'+
    '<div class="atlas-central-copy"><span class="atlas-eyebrow">Arquivo de Tormenta20</span>'+
    '<h1 tabindex="-1">'+(isManhwa?'Manhwa':'Atlas <em>Multiversal</em>')+'</h1>'+
    '<p>'+(isManhwa?'Explore os dossiês por obra.':'Escolha um universo ou encontre uma ficha no acervo.')+'</p>'+
    '<div class="atlas-hero-actions"><button type="button" class="atlas-cta" data-atlas-jump="atlasUniverseTitle">Explorar universos <span aria-hidden="true">↓</span></button>'+
    '<button type="button" class="atlas-cta atlas-cta-secondary" data-atlas-jump="atlasDirectoryTitle">Buscar fichas</button></div></div>'+
    '<div class="atlas-stats"><span><strong>'+count+'</strong> dossiês</span><span><strong>'+universes+'</strong> universos</span></div></header>';
}
function updateContinuity(){
  const shell=document.querySelector(".atlas-shell[data-atlas-theme]");
  if(!shell)return;
  const theme=themes.resolve(state.continuity||state.universe);
  shell.dataset.atlasTheme=theme.id;
  shell.dataset.atlasLayout=theme.layout;
  shell.dataset.atlasComposition=theme.composition;
  shell.style.cssText=themeStyle(theme);
  const previous=shell.querySelector(".atlas-world-hero");
  previous.outerHTML=worldHero(previous.dataset.worldName,theme,getIndex().filter(matchesWorld).length);
  document.title=(state.continuity?theme.label:previous.dataset.worldName)+" // O Sistema · T20";
  applyChrome(theme,true);
}
function render(root,requestedSlug){
  const items=getIndex(),groups=groupIndex(items);
  const nextSlug=requestedSlug==="j-pop-cantora-japonesa"?"ado":String(requestedSlug||"");
  if(state.universe!==nextSlug)state.continuity="";
  state.universe=nextSlug==="manhwa"||groups.some(g=>g.slug===nextSlug)?nextSlug:"";
  state.page=1;
  document.body.removeAttribute("data-theme");
  document.body.removeAttribute("data-world");
  document.body.removeAttribute("data-art");
  document.body.removeAttribute("data-family");
  document.body.removeAttribute("data-pattern");
  document.body.removeAttribute("data-finish");
  document.body.removeAttribute("data-lineage");
  document.body.removeAttribute("data-variant");
  document.body.style.removeProperty("--char-color");
  document.body.style.removeProperty("--art-accent");
  document.body.style.removeProperty("--art-dark");
  const selected=groups.find(g=>g.slug===state.universe);
  const theme=selected?themes.resolve(selected.slug):null;
  const isManhwa=state.universe==="manhwa";
  const worldItems=items.filter(c=>matchesUniverse(c.universeSlug));
  const continuities=[...new Map((selected?worldItems:[])
    .flatMap(c=>[c.theme,...c.editions.map(e=>e.theme)])
    .filter(theme=>theme.id.includes("/")).map(theme=>[theme.id,theme])).values()];
  document.title=(selected?.name||(isManhwa?"Manhwa":"Atlas Multiversal"))+" // O Sistema · T20";
  applyChrome(theme,true);
  const classes=[...new Set(items.flatMap(c=>[c.classType,...c.editions.map(e=>e.classType)]))].sort(sortBR);
  const races=[...new Set(items.flatMap(c=>[c.race,...c.editions.map(e=>e.race)]))].sort(sortBR);
  const hero=selected?worldHero(selected.name,theme,selected.count):
    centralHero(worldItems.length,isManhwa?manhwaWorks.size:groups.length,isManhwa);
  root.innerHTML='<div class="atlas-shell"'+(theme?themeAttrs(theme):"")+'><div class="atlas-container">'+
    '<nav class="atlas-trail" aria-label="Navegação do Atlas"><a href="'+
    (state.universe?'#/atlas':'#/')+'" class="back-link">← '+(state.universe?'Voltar ao Atlas':'Guia das fichas')+'</a>'+
    '<div class="atlas-shortcuts"><a href="#/laboratorio">Laboratório</a><a href="#/arquivo">Fontes e revisões</a></div></nav>'+hero+
    (selected?'':'<section class="atlas-universe-section" aria-labelledby="atlasUniverseTitle">'+
      '<div class="atlas-section-head"><h2 id="atlasUniverseTitle" tabindex="-1">Universos</h2></div>'+
      '<div class="atlas-universe-grid" id="atlasUniverseList"></div></section>')+
    '<section class="atlas-directory" aria-labelledby="atlasDirectoryTitle"><div class="atlas-section-head">'+
    '<h2 id="atlasDirectoryTitle" tabindex="-1">Dossiês</h2></div>'+
    '<div class="atlas-dossier-index"><div class="atlas-controls"><label class="atlas-search">Buscar ficha'+
    '<input type="search" id="atlasSearch" autocomplete="off" placeholder="Nome, classe ou técnica" value="'+esc(state.search)+'"></label>'+
    '<label>Universo<select id="atlasUniverse">'+option("","Todos os universos",state.universe)+
       (isManhwa?option("manhwa","Manhwa · 2 obras",state.universe):"")+
       groups.map(g=>option(g.slug,g.name+" ("+g.count+")",state.universe)).join("")+'</select></label>'+
    (continuities.length?'<label>Continuidade<select id="atlasContinuity">'+
      option("","Todas as continuidades",state.continuity)+continuities.sort((a,b)=>sortBR(a.label,b.label))
        .map(part=>option(part.id,part.label,state.continuity)).join("")+'</select></label>':'')+
    '<label>Classe<select id="atlasClass">'+option("","Todas as classes",state.classType)+
       classes.map(c=>option(c,c,state.classType)).join("")+'</select></label>'+
    '<label>Raça<select id="atlasRace">'+option("","Todas as raças",state.race)+
       races.map(c=>option(c,c,state.race)).join("")+'</select></label>'+
    '<label>Ordenar<select id="atlasSort">'+option("name","Nome A–Z",state.sort)+
      option("universe","Universo",state.sort)+option("class","Classe",state.sort)+'</select></label></div>'+
    '<div class="atlas-records"><div class="atlas-results-head"><span id="atlasResultCount" role="status" aria-live="polite"></span>'+
    '<button type="button" data-atlas-reset>Limpar filtros</button></div>'+
    '<div class="atlas-results" id="atlasResults"></div><nav class="atlas-pager" id="atlasPager" aria-label="Paginação dos personagens"></nav></div></div></section>'+
    '<section class="atlas-compare" id="atlasComparison" aria-label="Comparação de personagens"></section>'+
    '</div></div>';
  if(state.continuity)updateContinuity();
  renderUniverses(items);
  updateResults();
}
document.addEventListener("input",event=>{
  if(event.target.id==="atlasSearch"){
    state.search=event.target.value;state.page=1;updateResults();
  }
});
document.addEventListener("change",event=>{
  const id=event.target.id;
  if(id==="atlasUniverse"){
    const chosen=event.target.value;
    const target="#/atlas"+(chosen?"/"+encodeURIComponent(chosen):"");
    if(location.hash===target){state.universe=chosen;state.page=1;renderUniverses(getIndex());updateResults()}
    else location.hash=target;
  }
  if(id==="atlasContinuity"||id==="atlasClass"||id==="atlasRace"||id==="atlasSort"){
    if(id==="atlasContinuity"){
      state.continuity=event.target.value;
      updateContinuity();
    }
    if(id==="atlasClass")state.classType=event.target.value;
    if(id==="atlasRace")state.race=event.target.value;
    if(id==="atlasSort")state.sort=event.target.value;
    state.page=1;updateResults();
  }
});
document.addEventListener("click",event=>{
  if(!location.hash.startsWith("#/atlas"))return;
  const target=event.target.closest("[data-atlas-compare],[data-atlas-clear-compare],[data-atlas-page],[data-atlas-reset],[data-atlas-jump]");
  if(!target)return;
  if(target.hasAttribute("data-atlas-jump")){
    const heading=document.getElementById(target.dataset.atlasJump);
    heading?.focus({preventScroll:true});
    heading?.scrollIntoView({block:"start"});
  }else if(target.hasAttribute("data-atlas-compare")){
    const id=target.getAttribute("data-atlas-compare");
    const item=getIndex().find(c=>c.id===id);
    if(!item)return;
    const entry=displayEntry(item);
    const index=compareIndex(entry);
    if(index!==-1)state.compare.splice(index,1);
    else if(state.compare.length<2)state.compare.push(entry);
    updateResults();
    [...document.querySelectorAll("[data-atlas-compare]")].find(button=>button.dataset.atlasCompare===id)?.focus();
  }else if(target.hasAttribute("data-atlas-clear-compare")){
    state.compare=[];updateResults();
    document.querySelector("[data-atlas-compare]")?.focus();
  }else if(target.hasAttribute("data-atlas-page")){
    state.page+=Number(target.getAttribute("data-atlas-page"));
    updateResults();
    const heading=document.getElementById("atlasDirectoryTitle");
    heading?.focus({preventScroll:true});
    heading?.scrollIntoView({block:"start"});
  }else if(target.hasAttribute("data-atlas-reset")){
    state.search="";state.classType="";state.race="";state.sort="name";state.page=1;
    state.continuity="";
    updateContinuity();
    ["atlasSearch","atlasContinuity","atlasClass","atlasRace","atlasSort"].forEach(id=>{
      const select=document.getElementById(id);if(select)select.value=id==="atlasSort"?"name":"";
    });
    updateResults();
  }
});
window.T20_ATLAS={render,createIndex,groupFor,groupIndex,dossierLink,leave:()=>applyChrome(null,false)};
})();
