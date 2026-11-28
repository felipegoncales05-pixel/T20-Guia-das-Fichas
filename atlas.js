/* O Sistema // T20 — Atlas Multiversal (camada de navegação; não altera fichas). */
(function(){
"use strict";
const PAGE_SIZE=24;
const state={search:"",universe:"",classType:"",race:"",sort:"name",page:1,compare:[]};
let cacheSource=null,cacheSize=-1,cache=[];
const labelByGroup={
  jojo:"JoJo's Bizarre Adventure",cdz:"Cavaleiros do Zodíaco",fate:"Fate",
  cyberpunk:"Cyberpunk",hsr:"Honkai: Star Rail",chrysos:"Honkai: Star Rail",emanator:"Honkai: Star Rail",
  dragonball:"Dragon Ball",umamusume:"Uma Musume",jjk:"Jujutsu Kaisen",mha:"My Hero Academia",
  dmc:"Devil May Cry",wuwa:"Wuthering Waves",bleach:"Bleach",konosuba:"KonoSuba",
  "mushoku-tensei":"Mushoku Tensei",genshin:"Genshin Impact",marvel:"Marvel",
  "the-boys":"The Boys","blue-lock":"Blue Lock",signalis:"SIGNALIS",chainsaw:"Chainsaw Man",
  "one-punch-man":"One Punch Man",transformers:"Transformers",romcom:"Romance e comédia",
  "kamen-rider":"Kamen Rider",music:"Música",overwatch:"Overwatch",fma:"Fullmetal Alchemist",
  "tokyo-ghoul":"Tokyo Ghoul","dark-souls":"Dark Souls","digital-circus":"The Amazing Digital Circus",
  "murder-drones":"Murder Drones",undertale:"Undertale","dungeon-meshi":"Dungeon Meshi",
  shuumatsu:"Record of Ragnarok",sekiro:"Sekiro","black-souls":"Black Souls",
  "binding-of-isaac":"The Binding of Isaac",witcher:"The Witcher",manhwa:"Manhwa",
  zenless:"Zenless Zone Zero"
};
const norm=s=>String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();
const esc=s=>String(s??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const slug=s=>norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"outros";
const sortBR=(a,b)=>String(a).localeCompare(String(b),"pt-BR",{sensitivity:"base",numeric:true});
function groupFor(c){
  const g=String(c.catalogCategory||"").toLowerCase();
  const raw=norm(c.universe);
  if(["chrysos","emanator","hsr"].includes(g)||raw.includes("honkai"))return "Honkai: Star Rail";
  if(raw.includes("saint seiya")||raw.includes("cavaleiros do zod")||g==="cdz")return "Cavaleiros do Zodíaco";
  if(raw.includes("jojo")||g==="jojo")return "JoJo's Bizarre Adventure";
  if(raw.includes("cyberpunk")||g==="cyberpunk")return "Cyberpunk";
  if(raw.includes("dragon ball")||g==="dragonball")return "Dragon Ball";
  if(raw.includes("fate")||g==="fate")return "Fate";
  if(raw.includes("uma musume")||raw.includes("umamusume")||g==="umamusume")return "Uma Musume";
  if(labelByGroup[g])return labelByGroup[g];
  const name=String(c.universe||"Universo não classificado").split(/\s+[—–]\s+/)[0].trim();
  return name||"Universo não classificado";
}
function createIndex(characters){
  const records=Array.isArray(characters)?characters:[];
  const seen=new Set();
  return records.filter(c=>c&&c.id&&!seen.has(c.id)&&seen.add(c.id)).map(c=>{
    const universe=groupFor(c);
    const className=String(c.info?.className||"Não informada");
    const race=String(c.info?.race||"Não informada");
    const origin=String(c.info?.origin||"Não informada");
    const classType=className.split(/\s*[/+(]\s*/)[0].trim()||className;
    const searchParts=[c.name,c.id,c.universe,universe,c.label,c.excerpt,c.summary,className,race,origin,
      c.info?.role,c.info?.devotion,...(Array.isArray(c.initial)?c.initial:[]),
      ...(Array.isArray(c.techniques)?c.techniques.flatMap(t=>[t.name,t.mechanic]):[]),
      ...(Array.isArray(c.searchAliases)?c.searchAliases:[]),
      ...(Array.isArray(c.aliases)?c.aliases:[])];
    return {id:String(c.id),name:String(c.name||c.id),universe,universeSlug:slug(universe),
      work:String(c.universe||universe),className,classType,race,origin,
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
function option(value,label,selected){
  return '<option value="'+esc(value)+'"'+(value===selected?' selected':'')+'>'+esc(label)+'</option>';
}
function compareCard(item){
  if(!item)return '<article class="atlas-compare-slot"><span>ESPAÇO DISPONÍVEL</span><p>Adicione outro personagem no catálogo.</p></article>';
  return '<article class="atlas-compare-slot"><span>'+esc(item.universe)+'</span><h3>'+esc(item.name)+'</h3>'+
    '<dl><div><dt>Classe</dt><dd>'+esc(item.className)+'</dd></div><div><dt>Raça</dt><dd>'+esc(item.race)+'</dd></div>'+
    '<div><dt>Origem</dt><dd>'+esc(item.origin)+'</dd></div></dl>'+
    '<a href="#/'+encodeURIComponent(item.id)+'/overview">ABRIR DOSSIÊ ↗</a></article>';
}
function renderComparison(items){
  const slot=document.getElementById("atlasComparison");if(!slot)return;
  const choices=state.compare.map(id=>items.find(c=>c.id===id)).filter(Boolean);
  slot.innerHTML='<div class="atlas-section-head"><div><span class="kicker">ANÁLISE CRUZADA // METADADOS</span><h2>Comparação rápida</h2></div>'+
    (choices.length?'<button class="sys-button" type="button" data-atlas-clear-compare>LIMPAR</button>':'')+'</div>'+
    '<div class="atlas-compare-grid">'+compareCard(choices[0])+compareCard(choices[1])+'</div>'+
    '<p class="atlas-disclaimer">Comparação editorial, não de poder ou equilíbrio. A progressão e as regras de cada adaptação continuam nos dossiês e no Laboratório.</p>';
}
function renderUniverses(items){
  const slot=document.getElementById("atlasUniverseList");if(!slot)return;
  const groups=groupIndex(items).filter(g=>!state.universe||g.slug===state.universe);
  slot.innerHTML=groups.map(g=>'<a class="atlas-universe" href="#/atlas/'+encodeURIComponent(g.slug)+'">'+
    '<span class="atlas-universe-count">'+g.count+' DOSSIÊ'+(g.count===1?'':'S')+'</span>'+
    '<strong>'+esc(g.name)+'</strong><small>'+esc(g.examples.join(" · "))+'</small><span class="atlas-universe-action">EXPLORAR UNIVERSO ↗</span></a>').join("");
}
function filtered(items){
  const words=norm(state.search).split(" ").filter(Boolean);
  const result=items.filter(c=>(!state.universe||c.universeSlug===state.universe)&&
    (!state.classType||c.classType===state.classType)&&(!state.race||c.race===state.race)&&
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
    const selected=state.compare.includes(c.id);
    return '<article class="atlas-result"><div class="atlas-result-meta"><span>'+esc(c.universe)+'</span>'+
      '<h3><a href="#/'+encodeURIComponent(c.id)+'/overview">'+esc(c.name)+'</a></h3>'+
      '<p>'+esc(c.work)+' · '+esc(c.race)+' · '+esc(c.className)+'</p></div>'+
      '<div class="atlas-result-actions"><a href="#/'+encodeURIComponent(c.id)+'/overview" aria-label="Abrir ficha de '+esc(c.name)+'">VER FICHA ↗</a>'+
      '<button type="button" data-atlas-compare="'+esc(c.id)+'" aria-pressed="'+selected+'"'+
      (!selected&&state.compare.length>=2?' disabled title="Remova uma escolha para comparar outro personagem"':'')+'>'+
      (selected?'REMOVER':'COMPARAR')+'</button></div></article>';
  }).join(""):'<p class="atlas-empty">Nenhuma ficha encontrada. Tente outro termo ou limpe os filtros.</p>';
  const count=document.getElementById("atlasResultCount");
  if(count)count.textContent=result.length+' DE '+items.length+' DOSSIÊS · PÁGINA '+state.page+' / '+pages;
  const pager=document.getElementById("atlasPager");
  if(pager)pager.innerHTML='<button type="button" data-atlas-page="-1"'+(state.page===1?' disabled':'')+'>← ANTERIOR</button>'+
    '<span>'+state.page+' / '+pages+'</span>'+
    '<button type="button" data-atlas-page="1"'+(state.page===pages?' disabled':'')+'>PRÓXIMA →</button>';
  renderComparison(items);
}
function render(root,requestedSlug){
  const items=getIndex(),groups=groupIndex(items);
  const nextSlug=String(requestedSlug||"");
  state.universe=groups.some(g=>g.slug===nextSlug)?nextSlug:"";
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
  document.title="Atlas Multiversal // O Sistema · T20";
  const selected=groups.find(g=>g.slug===state.universe);
  const classes=[...new Set(items.map(c=>c.classType))].sort(sortBR);
  const races=[...new Set(items.map(c=>c.race))].sort(sortBR);
  root.innerHTML='<div class="container atlas-shell"><a href="#/" class="back-link">← VOLTAR AO GUIA DAS FICHAS</a>'+
    '<section class="atlas-hero"><span class="kicker">O SISTEMA // SETOR DE EXPLORAÇÃO</span>'+
    '<h1>ATLAS <em>MULTIVERSAL.</em></h1><p>Um índice pesquisável de adaptações para Tormenta20. Navegue por universos, encontre classes e raças ou compare conceitos, preservando os dossiês e as fontes originais.</p>'+
    '<div class="atlas-stats"><div><strong>'+items.length+'</strong><span>DOSSIÊS</span></div>'+
    '<div><strong>'+groups.length+'</strong><span>UNIVERSOS</span></div>'+
    '<div><strong>12</strong><span>NÍVEIS POR BUILD</span></div></div>'+
    '<div class="atlas-hero-actions"><a class="sys-button primary" href="#/laboratorio">ABRIR LABORATÓRIO ↗</a>'+
    '<a class="sys-button" href="#/arquivo">FONTES E REVISÕES ↗</a></div></section>'+
    '<section class="atlas-universe-section" aria-labelledby="atlasUniverseTitle"><div class="atlas-section-head"><div><span class="kicker">MAPA DE CONTINUIDADES</span><h2 id="atlasUniverseTitle">'+(selected?esc(selected.name):'Universos do arquivo')+'</h2></div>'+
    (selected?'<a class="sys-button" href="#/atlas">VER TODOS OS UNIVERSOS</a>':'')+'</div>'+
    '<div class="atlas-universe-grid" id="atlasUniverseList"></div></section>'+
    '<section class="atlas-directory" aria-labelledby="atlasDirectoryTitle"><div class="atlas-section-head"><div><span class="kicker">BUSCA FACETADA // ÍNDICE LEVE</span>'+
    '<h2 id="atlasDirectoryTitle">Explorar personagens</h2></div></div>'+
    '<div class="atlas-controls"><label class="atlas-search">BUSCAR POR NOME, OBRA, TÉCNICA OU HABILIDADE'+
    '<input type="search" id="atlasSearch" autocomplete="off" placeholder="Ex.: Gyro, Samurai, Spin, Cyberpunk..." value="'+esc(state.search)+'"></label>'+
    '<label>UNIVERSO<select id="atlasUniverse">'+option("","Todos os universos",state.universe)+
       groups.map(g=>option(g.slug,g.name+" ("+g.count+")",state.universe)).join("")+'</select></label>'+
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
  if(id==="atlasClass"||id==="atlasRace"||id==="atlasSort"){
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
    if(state.compare.includes(id))state.compare=state.compare.filter(x=>x!==id);
    else if(state.compare.length<2)state.compare.push(id);
    updateResults();
  }else if(target.hasAttribute("data-atlas-clear-compare")){
    state.compare=[];updateResults();
  }else if(target.hasAttribute("data-atlas-page")){
    state.page+=Number(target.getAttribute("data-atlas-page"));
    updateResults();
    document.getElementById("atlasDirectoryTitle")?.scrollIntoView({block:"start"});
  }else if(target.hasAttribute("data-atlas-reset")){
    state.search="";state.classType="";state.race="";state.sort="name";state.page=1;
    if(state.universe){location.hash="#/atlas";return}
    ["atlasSearch","atlasClass","atlasRace","atlasSort"].forEach(id=>{
      const select=document.getElementById(id);if(select)select.value=id==="atlasSort"?"name":"";
    });
    updateResults();
  }
});
window.T20_ATLAS={render,createIndex,groupFor,groupIndex};
})();