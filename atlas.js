/* O Sistema // T20 — Atlas Multiversal (camada de navegação; não altera fichas). */
(function(){
"use strict";
const PAGE_SIZE=24;
const manhwaWorks=new Set(["the-greatest-estate-developer","swordmaster-s-youngest-son"]);
const themes=window.T20_ATLAS_THEMES;
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
function themeStyle(theme){
  return '--atlas-bg:'+theme.background+';--atlas-panel:'+theme.panel+';--atlas-ink:'+theme.ink+
    ';--atlas-accent:'+theme.accent+';--atlas-title:'+theme.font+';--atlas-scheme:'+theme.colorScheme;
}
function themeAttrs(theme){
  return ' data-atlas-theme="'+esc(theme.id)+'" data-atlas-layout="'+theme.layout+'" style="'+esc(themeStyle(theme))+'"';
}
function ornament(theme){
  return '<svg class="atlas-ornament" aria-hidden="true" focusable="false" viewBox="0 0 120 100"><path d="'+theme.drawing+'"/></svg>';
}
function dossierLink(character,variant){
  const universe=groupFor(character);
  const universeSlug=slug(universe);
  const theme=themes.forWork(universeSlug,norm(character.universe),variant);
  return '<a class="atlas-dossier-link"'+themeAttrs(theme)+' href="#/atlas/'+encodeURIComponent(universeSlug)+
    '"><span aria-hidden="true">◇</span> Atlas · '+esc(universe)+'</a>';
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
  if(!item)return '<article class="atlas-compare-slot"><span>ESPAÇO DISPONÍVEL</span><p>Adicione outro personagem no catálogo.</p></article>';
  return '<article class="atlas-compare-slot"><span>'+esc(item.key?item.work:item.universe)+'</span><h3>'+esc(item.name)+'</h3>'+
    '<dl><div><dt>Classe</dt><dd>'+esc(item.className)+'</dd></div><div><dt>Raça</dt><dd>'+esc(item.race)+'</dd></div>'+
    '<div><dt>Origem</dt><dd>'+esc(item.origin)+'</dd></div></dl>'+
    '<a href="'+dossierHref(item)+'">ABRIR DOSSIÊ ↗</a></article>';
}
function renderComparison(){
  const slot=document.getElementById("atlasComparison");if(!slot)return;
  const choices=state.compare;
  slot.innerHTML='<div class="atlas-section-head"><div><span class="kicker">ANÁLISE CRUZADA // METADADOS</span><h2>Comparação rápida</h2></div>'+
    (choices.length?'<button class="sys-button" type="button" data-atlas-clear-compare>LIMPAR</button>':'')+'</div>'+
    '<div class="atlas-compare-grid">'+compareCard(choices[0])+compareCard(choices[1])+'</div>'+
    '<p class="atlas-disclaimer">Comparação editorial, não de poder ou equilíbrio. A progressão e as regras de cada adaptação continuam nos dossiês e no Laboratório.</p>';
}
function renderUniverses(items){
  const slot=document.getElementById("atlasUniverseList");if(!slot)return;
  slot.innerHTML=groupIndex(items).filter(group=>matchesUniverse(group.slug)).map(group=>{
    const theme=themes.resolve(group.slug);
    return '<a class="atlas-universe"'+themeAttrs(theme)+' href="#/atlas/'+encodeURIComponent(group.slug)+'">'+
      ornament(theme)+'<span class="atlas-universe-count">'+group.count+' '+(group.count===1?'dossiê':'dossiês')+'</span>'+
      '<strong>'+esc(group.name)+'</strong><small>'+esc(theme.label)+'</small>'+
      '<span class="atlas-universe-action" aria-hidden="true">↗</span></a>';
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
    const art=state.universe?themeAttrs(theme):"";
    return '<article class="atlas-result"'+art+'>'+
      (state.universe?'<div class="atlas-result-ornament" aria-hidden="true">'+ornament(theme)+'</div>':'')+
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
function updateContinuity(){
  const shell=document.querySelector(".atlas-shell[data-atlas-theme]");
  if(!shell)return;
  const theme=themes.resolve(state.continuity||state.universe);
  shell.dataset.atlasTheme=theme.id;
  shell.dataset.atlasLayout=theme.layout;
  shell.style.cssText=themeStyle(theme);
  shell.querySelector(".atlas-world-hero > .atlas-ornament").outerHTML=ornament(theme);
  const copy=shell.querySelector(".atlas-world-copy");
  const world=copy.dataset.worldName;
  copy.querySelector(".kicker").textContent=state.continuity?world:theme.label;
  copy.querySelector("h1").textContent=state.continuity?theme.label:world;
  copy.querySelector(".atlas-stats strong").textContent=getIndex().filter(matchesWorld).length;
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
  const classes=[...new Set(items.flatMap(c=>[c.classType,...c.editions.map(e=>e.classType)]))].sort(sortBR);
  const races=[...new Set(items.flatMap(c=>[c.race,...c.editions.map(e=>e.race)]))].sort(sortBR);
  const hero=selected?
    '<header class="atlas-hero atlas-world-hero">'+ornament(theme)+'<div class="atlas-world-copy" data-world-name="'+esc(selected.name)+'">'+
    '<span class="kicker">'+esc(theme.label)+'</span><h1>'+esc(selected.name)+'</h1>'+
    '<div class="atlas-stats"><div><strong>'+selected.count+'</strong><span>DOSSIÊS</span></div></div></div></header>':
    '<header class="atlas-hero"><span class="kicker">O SISTEMA // SETOR DE EXPLORAÇÃO</span>'+
    (isManhwa?'<h1>MANHWA</h1><p>Explore os dossiês por obra.</p>':
      '<h1>ATLAS <em>MULTIVERSAL.</em></h1><p>Explore universos, encontre personagens e compare seus dossiês de Tormenta20.</p>')+
    '<div class="atlas-stats"><div><strong>'+worldItems.length+'</strong><span>DOSSIÊS</span></div>'+
    '<div><strong>'+(isManhwa?manhwaWorks.size:groups.length)+'</strong><span>UNIVERSOS</span></div>'+
    '<div><strong>12</strong><span>NÍVEIS POR BUILD</span></div></div>'+
    '<div class="atlas-hero-actions"><a class="sys-button primary" href="#/laboratorio">ABRIR LABORATÓRIO ↗</a>'+
    '<a class="sys-button" href="#/arquivo">FONTES E REVISÕES ↗</a></div></header>';
  root.innerHTML='<div class="container atlas-shell"'+(theme?themeAttrs(theme):"")+'><a href="'+
    (state.universe?'#/atlas':'#/')+'" class="back-link">← '+(state.universe?'TODOS OS UNIVERSOS':'VOLTAR AO GUIA DAS FICHAS')+'</a>'+hero+
    (selected?'':'<section class="atlas-universe-section" aria-labelledby="atlasUniverseTitle">'+
      '<div class="atlas-section-head"><h2 id="atlasUniverseTitle">Universos do arquivo</h2></div>'+
      '<div class="atlas-universe-grid" id="atlasUniverseList"></div></section>')+
    '<section class="atlas-directory" aria-labelledby="atlasDirectoryTitle"><div class="atlas-section-head"><div><span class="kicker">BUSCA FACETADA // ÍNDICE LEVE</span>'+
    '<h2 id="atlasDirectoryTitle" tabindex="-1">Explorar personagens</h2></div></div>'+
    '<div class="atlas-controls"><label class="atlas-search">BUSCAR POR NOME, OBRA, TÉCNICA OU HABILIDADE'+
    '<input type="search" id="atlasSearch" autocomplete="off" placeholder="Ex.: Gyro, Samurai, Spin, Cyberpunk..." value="'+esc(state.search)+'"></label>'+
    '<label>UNIVERSO<select id="atlasUniverse">'+option("","Todos os universos",state.universe)+
       (isManhwa?option("manhwa","Manhwa · 2 obras",state.universe):"")+
       groups.map(g=>option(g.slug,g.name+" ("+g.count+")",state.universe)).join("")+'</select></label>'+
    (continuities.length?'<label>CONTINUIDADE<select id="atlasContinuity">'+
      option("","Todas as continuidades",state.continuity)+continuities.sort((a,b)=>sortBR(a.label,b.label))
        .map(part=>option(part.id,part.label,state.continuity)).join("")+'</select></label>':'')+
    '<label>CLASSE<select id="atlasClass">'+option("","Todas as classes",state.classType)+
       classes.map(c=>option(c,c,state.classType)).join("")+'</select></label>'+
    '<label>RAÇA<select id="atlasRace">'+option("","Todas as raças",state.race)+
       races.map(c=>option(c,c,state.race)).join("")+'</select></label>'+
    '<label>ORDENAR<select id="atlasSort">'+option("name","Nome A–Z",state.sort)+
      option("universe","Universo",state.sort)+option("class","Classe",state.sort)+'</select></label></div>'+
    '<div class="atlas-results-head"><span id="atlasResultCount" role="status" aria-live="polite"></span>'+
    '<button type="button" data-atlas-reset>REINICIAR FILTROS</button></div>'+
    '<div class="atlas-results" id="atlasResults"></div><nav class="atlas-pager" id="atlasPager" aria-label="Paginação dos personagens"></nav></section>'+
    '<section class="atlas-compare" id="atlasComparison" aria-label="Comparação de personagens"></section>'+
    '<div class="rule-note"><b>O SISTEMA //</b><span>Este atlas indexa dados já cadastrados e não aprova automaticamente regras ou fontes. Expansões futuras devem manter IDs únicos, progressão 1–12 e revisão editorial.</span></div></div>';
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
  const target=event.target.closest("[data-atlas-compare],[data-atlas-clear-compare],[data-atlas-page],[data-atlas-reset]");
  if(!target)return;
  if(target.hasAttribute("data-atlas-compare")){
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
window.T20_ATLAS={render,createIndex,groupFor,groupIndex,dossierLink};
})();
