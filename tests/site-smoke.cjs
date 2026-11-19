const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const files=["index.html","styles.css","responsive.css","rentarou.css","data.js","guide.js","rentarou-guide.js","expansion.js","expansion-runtime.js","expansion.css","mega-data.js","mega-runtime.js","mega.css","catalog.css","catalog-media.js","acheron-samurai.js","heroes-custom.js","d-salvage.js","user-gallery.js","character-fx.css","assets/portraits/d-salvage.avif","app.js"];
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
for(const n of ["acheron-samurai.js","heroes-custom.js","d-salvage.js","user-gallery.js"])vm.runInNewContext(fs.readFileSync(n,"utf8"),context,{filename:n});
const project=context.window.T20_DATA;
assert.ok(project&&Array.isArray(project.characters));
assert.equal(project.characters.length,59);
assert.deepEqual(Array.from(project.characters,c=>c.id),["gyro","d","david","cipher","rentarou","yoru","diego","ado","cyrene","marin","makima","optimus","jojo-dio1","jojo-kars","jojo-dio3","jojo-kira","jojo-diavolo","jojo-pucci","jojo-valentine","jojo-tooru","yuta","goku","hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine","hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae","em-herta","em-acheron","em-phantylia","em-diamond","em-taravan","em-zandar","em-shuhu","em-zephyro","em-celenova","em-irontomb","em-archforger","em-asat","em-luxbane","elster","jojo-jonathan","jojo-joseph","jojo-jotaro","jojo-josuke4","jojo-giorno","jojo-jolyne","jojo-johnny","jojo-gappy","denji","satoru-gojo","shigaraki","midoriya"]);
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
 for(const obj of [char.portrait,...char.media])assert.ok(/^(https:\/\/|data:image\/svg\+xml;charset=utf-8,|\.\/assets\/(portraits|art|art-optimized)\/[a-z0-9-]+\.(svg|webp|avif|png|jpg))/.test(obj.url||obj.image),char.id+" URL de mídia inválida");
 assert.ok(char.notes.attributes&&char.notes.progression,char.id+" notas ausentes");
}
assert.match(fs.readFileSync("index.html","utf8"),/id="app"/);
assert.match(fs.readFileSync("app.js","utf8"),/radar-svg/);
assert.doesNotMatch(fs.readFileSync("app.js","utf8"),/D\.\s+recomenda/i);
console.log("VALIDADO: 59 dossiers, 6 atributos, 10 pontos de compra, 12 níveis, fontes e scripts.");

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
console.log("Megacatálogo validado: 59 cards, quatro Gokus e manual de 12 níveis.");

assert.ok(context.window.T20_MEDIA_BACKUPS,"Fontes de recuperação de imagens ausentes");
for(const id of ["diego","marin","ado","elster"]){const c=project.characters.find(x=>x.id===id);assert.ok(c.portrait.url.startsWith("https://"),id+" sem retrato remoto");}
assert.match(fs.readFileSync("app.js","utf8"),/ORDEM ALFABÉTICA/);

const a=project.characters.find(c=>c.id==="em-acheron");
assert.equal(a.info.className,"Samurai (Dragão Brasil nº 199)");
assert.equal(a._mega.className,"Samurai");
assert.equal(a.stats.pv,22);
assert.equal(a.stats.pm,3);
assert.equal(a.progression[9][1].includes("Corte do Vácuo"),true);
assert.equal(context.window.T20_MEGA.stats(a,12).pm,36);
assert.equal(context.window.T20_GUIDE.people["em-acheron"].levels.length,12);
const d=project.characters.find(c=>c.id==="d");
assert.equal(d.portrait.url,"./assets/art-optimized/d.webp");
assert.ok(d.summary.includes("não é o cyberskeleton"));
assert.ok(fs.statSync("assets/portraits/d-salvage.avif").size>1000);
for(const c of project.characters){
 const poster="assets/portraits/"+c.id+".svg";
 assert.ok(fs.existsSync(poster),c.id+": cartaz offline ausente");
 assert.match(fs.readFileSync(poster,"utf8"),/<svg/);
}
const flag=fs.readFileSync("assets/motifs/valentine-44.svg","utf8");
assert.equal((flag.match(/fill="#fff4e3"/g)||[]).length,44,"Valentine precisa de 44 estrelas");
console.log("VALIDADO: 59 fichas, Samurai, mídia local, Scrapframe e bandeira 44 estrelas.");

const userArt=["jojo-dio1","jojo-dio3","d","jojo-valentine","gyro","jojo-pucci","jojo-kira","jojo-tooru","jojo-diavolo","em-zandar"];
assert.equal(context.window.T20_USER_ART_IDS.length,10,"10 artes não foram registradas");
for(const id of userArt){
 const char=project.characters.find(x=>x.id===id);
 const original="assets/art/"+id+".png";
 const optimized="assets/art-optimized/"+id+".webp";
 assert.ok(fs.existsSync(original),id+": PNG original ausente");
 assert.ok(fs.statSync(original).size>10000,id+": PNG suspeito");
 assert.ok(fs.existsSync(optimized),id+": WebP otimizado ausente");
 assert.ok(fs.statSync(optimized).size>3000,id+": WebP suspeito");
 assert.equal(char.portrait.url,"./"+optimized,id+": retrato não aponta para WebP local");
 assert.ok(char.media.some(m=>m.image==="./"+optimized),id+": galeria não mostra a arte enviada");
}
assert.equal(project.characters.find(c=>c.id==="d").info.className,"Arcanista — Bruxo","D. perdeu a build");
assert.match(project.characters.find(c=>c.id==="d").notes.equipment,/sucata local/i,"D. perdeu o traje de sucata");
