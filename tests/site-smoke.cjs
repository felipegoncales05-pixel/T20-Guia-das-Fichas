const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const files=["index.html","styles.css","responsive.css","rentarou.css","data.js","guide.js","rentarou-guide.js","expansion.js","expansion-runtime.js","expansion.css","mega-data.js","mega-runtime.js","mega.css","catalog.css","catalog-media.js","app.js"];
for(const file of files){assert.ok(fs.existsSync(file),file+" ausente");assert.ok(fs.statSync(file).size>100,file+" vazio");}
const context={window:{}};
vm.runInNewContext(fs.readFileSync("data.js","utf8"),context,{filename:"data.js"});
vm.runInNewContext(fs.readFileSync("guide.js","utf8"),context,{filename:"guide.js"});
vm.runInNewContext(fs.readFileSync("rentarou-guide.js","utf8"),context,{filename:"rentarou-guide.js"});
vm.runInNewContext(fs.readFileSync("expansion.js","utf8"),context,{filename:"expansion.js"});
vm.runInNewContext(fs.readFileSync("expansion-runtime.js","utf8"),context,{filename:"expansion-runtime.js"});
vm.runInNewContext(fs.readFileSync("mega-data.js","utf8"),context,{filename:"mega-data.js"});
vm.runInNewContext(fs.readFileSync("mega-runtime.js","utf8"),context,{filename:"mega-runtime.js"});
vm.runInNewContext(fs.readFileSync("catalog-media.js","utf8"),context,{filename:"catalog-media.js"});
const project=context.window.T20_DATA;
assert.ok(project&&Array.isArray(project.characters));
assert.equal(project.characters.length,47);
assert.deepEqual(Array.from(project.characters,c=>c.id),["gyro","d","david","cipher","rentarou","yoru","diego","ado","cyrene","marin","makima","optimus","jojo-dio1","jojo-kars","jojo-dio3","jojo-kira","jojo-diavolo","jojo-pucci","jojo-valentine","jojo-tooru","yuta","goku","hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine","hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae","em-herta","em-acheron","em-phantylia","em-diamond","em-taravan","em-zandar","em-shuhu","em-zephyro","em-celenova","em-irontomb","em-archforger","em-asat","em-luxbane","elster"]);
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
 for(const obj of [char.portrait,...char.media])assert.ok(/^(https:\/\/|data:image\/svg\+xml;charset=utf-8,)/.test(obj.url||obj.image),char.id+" URL de mídia inválida");
 assert.ok(char.notes.attributes&&char.notes.progression,char.id+" notas ausentes");
}
assert.match(fs.readFileSync("index.html","utf8"),/id="app"/);
assert.match(fs.readFileSync("app.js","utf8"),/radar-svg/);
assert.doesNotMatch(fs.readFileSync("app.js","utf8"),/D\.\s+recomenda/i);
console.log("VALIDADO: 47 dossiers, 6 atributos, 10 pontos de compra, 12 níveis, fontes e scripts.");

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

for(const c of project.characters.filter(c=>context.window.T20_MEGA.ids.has(c.id))){assert.equal(c._guide.levels.length,12,c.id+" guiado");assert.ok(context.window.T20_MEGA.stats(c,12).pv>context.window.T20_MEGA.stats(c,1).pv,c.id+" PV sem evolução");}
assert.equal(Object.keys(context.window.T20_GOKU_VARIANTS).length,4);
console.log("Megacatálogo validado: 47 cards, quatro Gokus e manual de 12 níveis.");

assert.ok(context.window.T20_MEDIA_BACKUPS,"Fontes de recuperação de imagens ausentes");
for(const id of ["diego","marin","ado","elster"]){const c=project.characters.find(x=>x.id===id);assert.ok(c.portrait.url.startsWith("https://"),id+" sem retrato remoto");}
assert.match(fs.readFileSync("app.js","utf8"),/ORDEM ALFABÉTICA/);
