const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const scriptData=fs.readFileSync("data.js","utf8");
const scriptApp=fs.readFileSync("app.js","utf8");
const scriptGuide=fs.readFileSync("guide.js","utf8");
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
vm.runInNewContext(scriptApp,context,{filename:"app.js"});
assert.match(get("roster").innerHTML,/Gyro Zeppeli/);
assert.match(get("roster").innerHTML,/David Martinez/);
assert.match(get("roster").innerHTML,/Cipher/);
hooks["document:input"]({target:{id:"search",value:"David"}});
assert.match(get("roster").innerHTML,/David Martinez/);
assert.doesNotMatch(get("roster").innerHTML,/Gyro Zeppeli/);
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
console.log("VALIDADO: busca, quatro cards, sete abas por personagem, radar, equipamento e progressão.");
