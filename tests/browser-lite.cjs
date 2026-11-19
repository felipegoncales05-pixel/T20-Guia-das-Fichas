const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const scriptData=fs.readFileSync("data.js","utf8");
const scriptApp=fs.readFileSync("app.js","utf8");
const scriptGuide=fs.readFileSync("guide.js","utf8");
const scriptRentarou=fs.readFileSync("rentarou-guide.js","utf8");
const scriptExpansion=fs.readFileSync("expansion.js","utf8");
const scriptRuntime=fs.readFileSync("expansion-runtime.js","utf8");
const scriptMega=fs.readFileSync("mega-data.js","utf8");
const scriptMegaRuntime=fs.readFileSync("mega-runtime.js","utf8");
const scriptCatalogMedia=fs.readFileSync("catalog-media.js","utf8");
const addons=["acheron-samurai.js","heroes-custom.js","d-salvage.js","user-gallery.js","local-media.js","character-art.js","review-data.js","visual-direction.js","planned-data.js"].map(name=>[name,fs.readFileSync(name,"utf8")]);
const hooks={};
const elements=new Map();
function get(id){if(!elements.has(id))elements.set(id,{id,innerHTML:"",value:"",classList:{add(){},remove(){}},textContent:""});return elements.get(id);}
const fakeWindow={
 addEventListener(type,fn){hooks["window:"+type]=fn},
 scrollTo(){},
};
const fakeDocument={
 body:{dataset:{},removeAttribute(){}},
 getElementById:get,
 querySelectorAll(){return[]},
 addEventListener(type,fn){hooks["document:"+type]=fn}
};
const location={hash:"#/"};
const context={window:fakeWindow,document:fakeDocument,location,navigator:{},clearTimeout,setTimeout};
vm.runInNewContext(scriptData,context,{filename:"data.js"});
vm.runInNewContext(scriptGuide,context,{filename:"guide.js"});
vm.runInNewContext(scriptRentarou,context,{filename:"rentarou-guide.js"});
vm.runInNewContext(scriptExpansion,context,{filename:"expansion.js"});
vm.runInNewContext(scriptRuntime,context,{filename:"expansion-runtime.js"});
vm.runInNewContext(scriptMega,context,{filename:"mega-data.js"});
vm.runInNewContext(scriptMegaRuntime,context,{filename:"mega-runtime.js"});
vm.runInNewContext(scriptCatalogMedia,context,{filename:"catalog-media.js"});
for(const [name,src] of addons)vm.runInNewContext(src,context,{filename:name});
vm.runInNewContext(scriptApp,context,{filename:"app.js"});
assert.equal((get("roster").innerHTML.match(/class="roster-card /g)||[]).length,69);
assert.match(get("app").innerHTML,/PESQUISAR FICHAS/);
assert.match(get("app").innerHTML,/PAINEL DE REVISÃO/);
assert.match(get("app").innerHTML,/<option value="jojo">JoJo<\/option>/);
const cardNames=[...get("roster").innerHTML.matchAll(/<h3>([^<]+)<\/h3>/g)].map(x=>x[1]);
const compare=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:true});
assert.deepEqual(cardNames,[...cardNames].sort(compare.compare),"Catálogo fora de ordem alfabética");
assert.equal(get("resultsCount").textContent,"69 DE 69 DOSSIÊS EXIBIDOS");
assert.match(get("roster").innerHTML,/Gyro Zeppeli/);
assert.match(get("roster").innerHTML,/David Martinez/);
assert.match(get("roster").innerHTML,/Cipher/);
assert.match(get("roster").innerHTML,/Rentarou Aijou/);
assert.match(get("roster").innerHTML,/Diego Brando/);
assert.match(get("roster").innerHTML,/Optimus Prime/);
for(const name of ["Jonathan Joestar","Johnny Joestar","Jolyne Cujoh","Denji","Satoru Gojo","Tomura Shigaraki","Izuku Midoriya"])assert.ok(get("roster").innerHTML.includes(name),name+" faltando no catálogo");
assert.match(get("roster").innerHTML,/character-fx/);
assert.match(get("roster").innerHTML,/data-world="jojo"/);
assert.match(get("roster").innerHTML,/class="capri-hud"/);
assert.match(get("roster").innerHTML,/class="capri-gaze"/);
assert.doesNotMatch(get("roster").innerHTML,/class="capri-eye"/);
assert.match(get("roster").innerHTML,/data-finish="signal"/);
assert.match(get("roster").innerHTML,/data-lineage="ravager"/);
assert.match(get("roster").innerHTML,/class="art-insignia"/);
assert.match(get("roster").innerHTML,/data-card-switch="goku"/);
assert.match(get("roster").innerHTML,/data-card-switch="diego"/);
assert.match(get("roster").innerHTML,/assets\/motifs\/capri-hud\.webp/);
assert.match(get("roster").innerHTML,/class="psycho-hud"/);
const frames=[];
context.requestAnimationFrame=callback=>{frames.push(callback);return frames.length};
vm.runInNewContext(fs.readFileSync("card-worlds.js","utf8"),context,{filename:"card-worlds.js"});
const props=new Map();
const capriCard={isConnected:true,style:{setProperty(k,v){props.set(k,v)},removeProperty(k){props.delete(k)}},getBoundingClientRect(){return{left:0,top:0,width:200,height:400}},contains(){return false}};
const target={closest(){return capriCard}};
hooks["document:pointermove"]({target,pointerType:"mouse",clientX:200,clientY:0});
assert.equal(frames.length,1,"HUD não reagiu ao ponteiro");
frames.shift()();
assert.equal(props.get("--capri-x"),"2px");
assert.equal(props.get("--capri-y"),"-1px");
hooks["document:pointerout"]({target,relatedTarget:null});
assert.equal(props.has("--capri-x"),false,"HUD não voltou ao centro");
for(const id of fakeWindow.T20_USER_ART_IDS){
 const char=fakeWindow.T20_DATA.characters.find(c=>c.id===id);
 assert.equal(char.portrait.url,"./assets/art-optimized/"+id+".webp",id+": arte do usuário não carregada");
 assert.match(get("roster").innerHTML,new RegExp("assets/art-optimized/"+id+"\\.webp"),id+": imagem fora dos cards");
}

hooks["document:input"]({target:{id:"search",value:"David"}});
assert.match(get("roster").innerHTML,/David Martinez/);
assert.doesNotMatch(get("roster").innerHTML,/Gyro Zeppeli/);
hooks["document:input"]({target:{id:"search",value:"MAKIMA"}});
assert.match(get("roster").innerHTML,/Makima/);
assert.equal(get("resultsCount").textContent,"01 DE 69 DOSSIÊS EXIBIDOS");
hooks["document:input"]({target:{id:"search",value:"GOKU SUPER"}});
assert.match(get("roster").innerHTML,/Son Goku/);
hooks["document:input"]({target:{id:"search",value:""}});
assert.equal(get("resultsCount").textContent,"69 DE 69 DOSSIÊS EXIBIDOS");
hooks["document:change"]({target:{id:"universe",value:"jojo"}});
assert.match(get("roster").innerHTML,/Dio Brando/);
assert.doesNotMatch(get("roster").innerHTML,/Makima/);
hooks["document:change"]({target:{id:"universe",value:"all"}});
hooks["document:input"]({target:{id:"search",value:"Soul of Cinder"}});
assert.match(get("roster").innerHTML,/DARK SOULS III/);
assert.equal(get("resultsCount").textContent,"01 DE 69 DOSSIÊS EXIBIDOS");
hooks["document:input"]({target:{id:"search",value:""}});
hooks["document:change"]({target:{id:"universe",value:"bleach"}});
assert.match(get("roster").innerHTML,/Aizen/);
assert.doesNotMatch(get("roster").innerHTML,/Vegitto/);
hooks["document:change"]({target:{id:"universe",value:"all"}});

for(const c of fakeWindow.T20_DATA.characters){
 for(const tab of ["overview","attributes","equipment","abilities","progression","techniques","sources","compare","review"]){
  location.hash="#/"+c.id+"/"+tab;
  hooks["window:hashchange"]();
  assert.match(get("app").innerHTML,new RegExp(c.id==="d"?"D\\.":c.name.replace(/[.*+?^$()|[\]{}\\]/g,"\\$&").split(" ")[0]));
  assert.ok(get("app").innerHTML.includes("O SISTEMA // OBSERVAÇÃO"),c.id+" sem nota em "+tab);
  assert.match(get("app").innerHTML,/class="section-context"/,c.id+" / "+tab+" sem cabeçalho contextual");
  if(tab==="attributes")assert.match(get("app").innerHTML,/radar-svg/);
  if(tab==="equipment")assert.match(get("app").innerHTML,/gear-card/);
  if(tab==="progression"){assert.match(get("app").innerHTML,/level-grid/);hooks["document:input"]({target:{id:"levelSelect",value:"12"}});assert.equal(get("globalLevelText").textContent,"12");assert.match(get("progressStats").innerHTML,/PONTOS DE VIDA/);assert.match(get("levelReadout").innerHTML,/COMO USAR NA MESA/);}
  if(tab==="abilities"){assert.match(get("app").innerHTML,/COMO USAR NA MESA/);assert.match(get("app").innerHTML,/Habilidades desbloqueadas/);}
  if(tab==="sources")assert.match(get("app").innerHTML,/Página de cada poder/);
  if(tab==="compare")assert.match(get("app").innerHTML,/compare-table/);
  if(tab==="review")assert.match(get("app").innerHTML,/Conferência pendente/);
 }
}
console.log("VALIDADO: busca, 59 cards, nove abas por personagem, radar, equipamento e progressão.");

for(const c of fakeWindow.T20_PLANNED){
 for(const tab of ["overview","attributes","equipment","abilities","progression","techniques","sources","compare","review"]){
  location.hash="#/"+c.id+"/"+tab;
  hooks["window:hashchange"]();
  assert.match(get("app").innerHTML,/class="detail-hero planned-hero"/,c.id+" / "+tab+" sem capa pendente");
  assert.match(get("app").innerHTML,/class="section-context"/,c.id+" / "+tab+" sem contexto");
  assert.doesNotMatch(get("app").innerHTML,/global-level-picker|data-stat="PV"|radar-svg/,c.id+" gerou estatísticas inexistentes");
  if(tab==="progression")assert.equal((get("app").innerHTML.match(/Escolha pendente/g)||[]).length,12,c.id+" / posições vazias");
  if(tab==="sources")assert.match(get("app").innerHTML,/Nenhuma página de livro ou suplemento/);
  if(tab==="review")assert.match(get("app").innerHTML,/name="character"|id="reviewCharacter"/);
 }
}
console.log("VALIDADO: dez planejamentos sem mecânicas presumidas, nove abas e revisão local.");

location.hash="#/diego/overview";
hooks["window:hashchange"]();
assert.match(get("app").innerHTML,/Scary Monsters/i);
hooks["document:click"]({target:{closest(selector){return selector==="[data-diego-toggle]"?{}:null}}});
assert.match(get("app").innerHTML,/THE WORLD/);
assert.match(get("app").innerHTML,/SCARY MONSTERS/);
location.hash="#/diego/alternative/progression";
hooks["window:hashchange"]();
assert.match(get("app").innerHTML,/Coração Heroico/);
hooks["document:click"]({target:{closest(selector){return selector==="[data-diego-toggle]"?{}:null}}});
assert.match(get("app").innerHTML,/Forma Selvagem/);
console.log("Alternative validado: duas fichas independentes no mesmo card.");
location.hash="#/diego/alternative/compare";hooks["window:hashchange"]();
assert.match(get("app").innerHTML,/THE WORLD/);
assert.match(get("app").innerHTML,/Scary Monsters/);
location.hash="#/goku/gt/progression";hooks["window:hashchange"]();
assert.match(get("app").innerHTML,/GT|SUPER SAIYAJIN 4/i);
location.hash="#/arquivo";hooks["window:hashchange"]();
assert.match(get("app").innerHTML,/ARQUIVO DE REVISÃO/);
assert.match(get("app").innerHTML,/59|Son Goku/);
console.log("Comparação, URLs de variantes e painel editorial validados.");
