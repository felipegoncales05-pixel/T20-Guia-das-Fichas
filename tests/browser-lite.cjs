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
vm.runInNewContext(scriptApp,context,{filename:"app.js"});
assert.equal((get("roster").innerHTML.match(/class="roster-card /g)||[]).length,47);
assert.match(get("app").innerHTML,/PESQUISAR FICHAS/);
assert.match(get("app").innerHTML,/<option value="jojo">JoJo<\/option>/);
const cardNames=[...get("roster").innerHTML.matchAll(/aria-label="Abrir ficha de ([^"]+)"/g)].map(x=>x[1]);
const compare=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:true});
assert.deepEqual(cardNames,[...cardNames].sort(compare.compare),"Catálogo fora de ordem alfabética");
assert.equal(get("resultsCount").textContent,"47 DE 47 FICHAS EXIBIDAS");
assert.match(get("roster").innerHTML,/Gyro Zeppeli/);
assert.match(get("roster").innerHTML,/David Martinez/);
assert.match(get("roster").innerHTML,/Cipher/);
assert.match(get("roster").innerHTML,/Rentarou Aijou/);
assert.match(get("roster").innerHTML,/Diego Brando/);
assert.match(get("roster").innerHTML,/Optimus Prime/);
hooks["document:input"]({target:{id:"search",value:"David"}});
assert.match(get("roster").innerHTML,/David Martinez/);
assert.doesNotMatch(get("roster").innerHTML,/Gyro Zeppeli/);
hooks["document:input"]({target:{id:"search",value:"MAKIMA"}});
assert.match(get("roster").innerHTML,/Makima/);
assert.equal(get("resultsCount").textContent,"01 DE 47 FICHAS EXIBIDAS");
hooks["document:input"]({target:{id:"search",value:"GOKU SUPER"}});
assert.match(get("roster").innerHTML,/Son Goku/);
hooks["document:input"]({target:{id:"search",value:""}});
assert.equal(get("resultsCount").textContent,"47 DE 47 FICHAS EXIBIDAS");
hooks["document:change"]({target:{id:"universe",value:"jojo"}});
assert.match(get("roster").innerHTML,/Dio Brando/);
assert.doesNotMatch(get("roster").innerHTML,/Makima/);
hooks["document:change"]({target:{id:"universe",value:"all"}});

for(const c of fakeWindow.T20_DATA.characters){
 for(const tab of ["overview","attributes","equipment","abilities","progression","techniques","sources"]){
  location.hash="#/"+c.id+"/"+tab;
  hooks["window:hashchange"]();
  assert.match(get("app").innerHTML,new RegExp(c.id==="d"?"D\\.":c.name.replace(/[.*+?^$()|[\]{}\\]/g,"\\$&").split(" ")[0]));
  assert.ok(get("app").innerHTML.includes("O SISTEMA // OBSERVAÇÃO"),c.id+" sem nota em "+tab);
  if(tab==="attributes")assert.match(get("app").innerHTML,/radar-svg/);
  if(tab==="equipment")assert.match(get("app").innerHTML,/gear-card/);
  if(tab==="progression"){assert.match(get("app").innerHTML,/level-grid/);hooks["document:input"]({target:{id:"levelSelect",value:"12"}});assert.equal(get("globalLevelText").textContent,"12");assert.match(get("progressStats").innerHTML,/PONTOS DE VIDA/);assert.match(get("levelReadout").innerHTML,/COMO USAR NA MESA/);}
  if(tab==="abilities"){assert.match(get("app").innerHTML,/COMO USAR NA MESA/);assert.match(get("app").innerHTML,/Habilidades desbloqueadas/);}
  if(tab==="sources")assert.match(get("app").innerHTML,/Página de cada poder/);
 }
}
console.log("VALIDADO: busca, doze cards, sete abas por personagem, radar, equipamento e progressão.");

location.hash="#/diego/overview";
hooks["window:hashchange"]();
assert.match(get("app").innerHTML,/Scary Monsters/i);
hooks["document:click"]({target:{closest(selector){return selector==="[data-diego-toggle]"?{}:null}}});
assert.match(get("app").innerHTML,/THE WORLD/);
assert.match(get("app").innerHTML,/SCARY MONSTERS/);
location.hash="#/diego/progression";
hooks["window:hashchange"]();
assert.match(get("app").innerHTML,/Coração Heroico/);
hooks["document:click"]({target:{closest(selector){return selector==="[data-diego-toggle]"?{}:null}}});
assert.match(get("app").innerHTML,/Forma Selvagem/);
console.log("Alternative validado: duas fichas independentes no mesmo card.");
