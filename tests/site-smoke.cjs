const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const files=["index.html","styles.css","responsive.css","rentarou.css","data.js","guide.js","rentarou-guide.js","expansion.js","expansion-runtime.js","expansion.css","app.js"];
for(const file of files){assert.ok(fs.existsSync(file),file+" ausente");assert.ok(fs.statSync(file).size>100,file+" vazio");}
const context={window:{}};
vm.runInNewContext(fs.readFileSync("data.js","utf8"),context,{filename:"data.js"});
vm.runInNewContext(fs.readFileSync("guide.js","utf8"),context,{filename:"guide.js"});
vm.runInNewContext(fs.readFileSync("rentarou-guide.js","utf8"),context,{filename:"rentarou-guide.js"});
vm.runInNewContext(fs.readFileSync("expansion.js","utf8"),context,{filename:"expansion.js"});
vm.runInNewContext(fs.readFileSync("expansion-runtime.js","utf8"),context,{filename:"expansion-runtime.js"});
const project=context.window.T20_DATA;
assert.ok(project&&Array.isArray(project.characters));
assert.equal(project.characters.length,12);
assert.deepEqual(Array.from(project.characters,c=>c.id),["gyro","d","david","cipher","rentarou","yoru","diego","ado","cyrene","marin","makima","optimus"]);
const price={0:0,1:1,2:2,3:4,4:7};
for(const char of project.characters){
 assert.equal(char.attrs.length,6,char.id+" sem 6 atributos");
 assert.deepEqual(Array.from(char.attrs,a=>a.key),["CON","CAR","SAB","INT","FOR","DEX"],char.id+" ordem do radar");
 assert.equal(char.attrs.reduce((n,a)=>n+price[a.buy],0),10,char.id+" compra de atributos inválida");
 for(const a of char.attrs)assert.equal(a.value,a.buy+a.race,char.id+" bônus racial inconsistente");
 assert.equal(char.progression.length,12,char.id+" progressão incompleta");
 assert.deepEqual(Array.from(char.progression,p=>Number(p[0])),Array.from({length:12},(_,i)=>i+1),char.id+" níveis");
 assert.ok(char.skills.length>4&&char.gear.length>2&&char.techniques.length>2,char.id+" ficha incompleta");
 assert.ok(char.sources.length&&char.media.length,char.id+" fontes e mídia");
 for(const obj of [char.portrait,...char.media])assert.ok(/^https:\/\//.test(obj.url||obj.image),char.id+" URL de mídia inválida");
 assert.ok(char.notes.attributes&&char.notes.progression,char.id+" notas ausentes");
}
assert.match(fs.readFileSync("index.html","utf8"),/id="app"/);
assert.match(fs.readFileSync("app.js","utf8"),/radar-svg/);
assert.doesNotMatch(fs.readFileSync("app.js","utf8"),/D\.\s+recomenda/i);
console.log("VALIDADO: 12 dossiers, 6 atributos, 10 pontos de compra, 12 níveis, fontes e scripts.");

assert.ok(context.window.T20_ALTERNATES?.diego?.alternative,"Diego alternativo inexistente");
assert.ok(context.window.T20_ALTERNATE_GUIDES?.diego?.levels.length===12,"guia do THE WORLD incompleto");
for(const id of ["yoru","diego","ado","cyrene","marin","makima","optimus"]){
 const c=project.characters.find(x=>x.id===id);
 const g=context.window.T20_GUIDE.people[id];
 assert.equal(g.levels.length,12,id+": guia de nível incompleto");
 assert.ok(g.basics.length>=3,id+": manual inicial incompleto");
 const values=[1,2,5,9,12].map(lvl=>context.window.T20_EXPANSION.stats(c,lvl));
 for(let i=1;i<values.length;i++)assert.ok(values[i].pv>=values[i-1].pv&&values[i].pm>=values[i-1].pm,id+": progressão de PV/PM inválida");
}
console.log("Expansão validada: 7 novos cards, 8 builds e troca Alternative.");
