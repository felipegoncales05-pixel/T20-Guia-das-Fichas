const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const files=["index.html","styles.css","responsive.css","rentarou.css","data.js","guide.js","rentarou-guide.js","expansion.js","expansion-runtime.js","expansion.css","mega-data.js","mega-runtime.js","mega.css","catalog.css","catalog-media.js","acheron-samurai.js","heroes-custom.js","d-salvage.js","user-gallery.js","local-media.js","character-art.js","character-art.css","card-worlds.js","card-worlds.css","visual-direction.js","visual-direction.css","signature-finish.css","planned-data.js","planned.css","assets/motifs/capri-hud.webp","assets/motifs/capri-source.json","review-data.js","review.css","character-fx.css","assets/portraits/d-salvage.avif","app.js"];
files.push("art-portraits.css","assets/planned-art/sources.json","build-concepts.js","build-presets.js");
files.push("rules-catalog.js","class-options.js","herois-variants.js","build-engine.js","build-lab.js","build-lab.css","docs/laboratorio.md","catalog-cover-art.js","assets/card-art/catalog-covers.json","automatic-dossiers.js","catalog-revision.js");
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
vm.runInNewContext(fs.readFileSync("local-media.js","utf8"),context,{filename:"local-media.js"});
vm.runInNewContext(fs.readFileSync("character-art.js","utf8"),context,{filename:"character-art.js"});
vm.runInNewContext(fs.readFileSync("catalog-cover-art.js","utf8"),context,{filename:"catalog-cover-art.js"});
vm.runInNewContext(fs.readFileSync("review-data.js","utf8"),context,{filename:"review-data.js"});
vm.runInNewContext(fs.readFileSync("visual-direction.js","utf8"),context,{filename:"visual-direction.js"});
vm.runInNewContext(fs.readFileSync("planned-data.js","utf8"),context,{filename:"planned-data.js"});
for(const n of ["rules-catalog.js","class-options.js","herois-variants.js","build-engine.js","build-concepts.js","build-presets.js","automatic-dossiers.js","catalog-revision.js"])vm.runInNewContext(fs.readFileSync(n,"utf8"),context,{filename:n});
const project=context.window.T20_DATA;
assert.ok(project&&Array.isArray(project.characters));
assert.equal(project.characters.length,69);
assert.equal(context.window.T20_CLASS_REVIEW.report.entries.length,73,"Auditoria incompleta: 69 dossiês e 4 variantes");
assert.equal(context.window.T20_CLASS_REVIEW.report.validation.uniqueIds,true);
assert.equal(context.window.T20_CLASS_REVIEW.report.validation.actualVariants,4);
assert.equal(context.window.T20_CLASS_REVIEW.report.validation.approvedCount,0,"Auditoria não pode aprovar regras sem fontes");
assert.equal(Object.keys(context.window.T20_VISUAL.profiles).length,69,"Cada entrada precisa de assinatura visual");
assert.equal(Object.keys(context.window.T20_VISUAL.variations).length,4,"Variantes visuais de Diego e Goku");
assert.equal(Object.keys(context.window.T20_VISUAL.finishes).length,73,"69 fichas e quatro variantes");
const validFinishes=new Set(["dust","circuitry","signal","glass","paper","ink","velvet","frost","fabric","alloy","stone","energy","ledger","foil","organic","eclipse"]);
for(const c of project.characters){const v=context.window.T20_VISUAL.forCharacter(c,"principal");assert.equal(v.id,c.id);assert.ok(v.motif&&v.family&&v.pattern&&v.layout&&v.accent&&v.dark,c.id+" sem identidade visual");assert.ok(validFinishes.has(v.finish),c.id+" sem material");assert.ok(["chrysos","emanator","ravager","other"].includes(v.lineage),c.id+" sem grupo editorial");}
for(const id of ["diego:alternative","goku:gt","goku:daima","goku:super"]){const [char,variant]=id.split(":");const c=project.characters.find(x=>x.id===char);assert.equal(context.window.T20_VISUAL.forCharacter(c,variant).finish,context.window.T20_VISUAL.finishes[id],id+" sem acabamento alternativo");}
const planned=context.window.T20_PLANNED,automatic=context.window.T20_AUTOMATIC;
assert.equal(planned.length,0,"Não deixar os dez novos personagens em planejamento");
assert.equal(automatic.ids.size,10,"Faltam as dez fichas automáticas");
assert.equal(new Set(project.characters.map(c=>c.id)).size,69,"IDs duplicados");
const plannedSources=JSON.parse(fs.readFileSync("assets/planned-art/sources.json","utf8"));
assert.equal(plannedSources.length,10,"Manter proveniência das dez artes");
for(const src of plannedSources){
 const c=project.characters.find(x=>x.id===src.id);
 assert.ok(c&&automatic.ids.has(src.id),src.id+" sem ficha automática");
 assert.equal(c.portrait.url,"./"+src.asset,src.id+" sem imagem local original");
 assert.equal(c.portrait.page,src.source_page,src.id+" sem proveniência");
 assert.ok(c._auto?.draft?.levels.length===12&&c._auto?.classPath,src.id+" sem multiclasse e níveis");
 assert.ok(c._guide.levels.every(l=>l.why&&l.use&&l.ref.length),src.id+" sem justificativas por nível");
 assert.equal(c.info.origin,context.window.T20_RULES.origins[c._auto.draft.originId].name);
 assert.ok(c.gear.length>=3&&c.techniques.length>=3,src.id+" sem inventário e técnicas");
 const file=fs.readFileSync(src.asset);
 assert.ok(file.length>10000,src.id+" arquivo de retrato pequeno");
 assert.ok(file.subarray(0,8).equals(Buffer.from("89504e470d0a1a0a","hex"))||file.toString("ascii",0,4)==="RIFF"||file.subarray(0,2).equals(Buffer.from("ffd8","hex")),src.id+" imagem inválida");
 for(const lvl of [1,5,9,12]){const metrics=automatic.stats(c,lvl);assert.ok(metrics.pv>0&&metrics.pm>0,src.id+" sem PV/PM");}
}
assert.deepEqual(Array.from(project.characters,c=>c.id),["gyro","d","david","cipher","rentarou","yoru","diego","ado","cyrene","marin","makima","optimus","jojo-dio1","jojo-kars","jojo-dio3","jojo-kira","jojo-diavolo","jojo-pucci","jojo-valentine","jojo-tooru","yuta","goku","hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine","hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae","em-herta","em-acheron","em-phantylia","em-diamond","em-taravan","em-zandar","em-shuhu","em-zephyro","em-celenova","em-irontomb","em-archforger","em-asat","em-luxbane","elster","jojo-jonathan","jojo-joseph","jojo-jotaro","jojo-josuke4","jojo-giorno","jojo-jolyne","jojo-johnny","jojo-gappy","denji","satoru-gojo","shigaraki","midoriya","toji","aizen","vegitto","gogeta","soul-of-cinder","isaac","adao","grimm","sekiro","kaneki"]);

/* Fase III: Cyrene e Cipher pertencem a Chrysos, sem modificar builds. */
for(const id of ["cipher","cyrene"]){
 const c=project.characters.find(c=>c.id===id);
 assert.equal(c.catalogCategory,"chrysos",id+" fora de Chrysos");
 assert.equal(context.window.T20_VISUAL.forCharacter(c,"principal").lineage,"chrysos",id+" sem assinatura de Chrysos");
}
const catalogCoverRows=JSON.parse(fs.readFileSync("assets/card-art/catalog-covers.json","utf8"));
assert.equal(catalogCoverRows.length,Object.keys(context.window.T20_CATALOG_COVERS).length);
const coverIds=new Set();
for(const record of catalogCoverRows){
 assert.ok(!coverIds.has(record.id),"Capa duplicada "+record.id);coverIds.add(record.id);
 assert.ok(project.characters.some(c=>c.id===record.id),"Capa sem ficha "+record.id);
 assert.equal(context.window.T20_CATALOG_COVERS[record.id].image,record.image);
 assert.match(record.image,/^https:\/\//);assert.match(record.source,/^https:\/\//);
 assert.ok(record.volume&&record.publisher&&record.credit,record.id+" sem proveniência");
}
assert.ok(coverIds.has("shigaraki"),"Shigaraki precisa de capa do volume 25");
assert.match(context.window.T20_CATALOG_COVERS.shigaraki.volume,/Volume 25/);
assert.ok(!coverIds.has("jojo-dio1"),"Dio Brando deve usar o retrato antigo");
assert.ok(!coverIds.has("cipher"),"Cipher deve manter a arte");
assert.equal(context.window.T20_CATALOG_COVERS.midoriya.volume,"Volume 37");
for(const id of ["jojo-johnny","jojo-valentine","diego","gyro"])assert.ok(coverIds.has(id),"Capa SBR ausente "+id);
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
 for(const obj of [char.portrait,...char.media])assert.ok(/^(https:\/\/|data:image\/svg\+xml;charset=utf-8,|\.\/assets\/(portraits|art|art-optimized|card-art|character-art|planned-art)\/[a-z0-9-]+\.(svg|webp|avif|png|jpg))/.test(obj.url||obj.image),char.id+" URL de mídia inválida");
 assert.ok(char.notes.attributes&&char.notes.progression,char.id+" notas ausentes");
}
assert.match(fs.readFileSync("index.html","utf8"),/id="app"/);
assert.match(fs.readFileSync("app.js","utf8"),/radar-svg/);
assert.doesNotMatch(fs.readFileSync("app.js","utf8"),/D\.\s+recomenda/i);
console.log("VALIDADO: 69 dossiers, 6 atributos, 10 pontos de compra, 12 níveis, fontes e scripts.");

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
console.log("Megacatálogo validado: 69 cards, quatro Gokus e manual de 12 níveis.");

assert.ok(context.window.T20_MEDIA_BACKUPS,"Fontes de recuperação de imagens ausentes");
for(const id of ["diego","marin","ado","elster"]){const c=project.characters.find(x=>x.id===id);assert.ok(c.portrait.url.startsWith("./assets/card-art/"),id+" sem retrato local");}
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
console.log("VALIDADO: 69 fichas, Samurai, mídia local, Scrapframe e bandeira 44 estrelas.");

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
const mediaSources=JSON.parse(fs.readFileSync("assets/card-art/sources.json","utf8"));
assert.equal(mediaSources.length,30,"Total de retratos recuperados");
for(const entry of mediaSources){const body=fs.readFileSync(entry.asset);assert.ok(body.length>2000,entry.id+" sem arte local");assert.equal(body.toString("ascii",0,4),"RIFF",entry.id+" WebP inválido");assert.ok(entry.source_page.startsWith("https://"),entry.id+" sem fonte da arte");}
assert.equal(context.window.T20_ALTERNATES.diego.alternative.portrait.url,"./assets/card-art/diego-alternative.webp");
for(const form of ["gt","daima","super"])assert.equal(context.window.T20_GOKU_VARIANTS[form].portrait.url,"./assets/card-art/goku-"+form+".webp");
const characterArt=JSON.parse(fs.readFileSync("assets/character-art/sources.json","utf8"));
assert.equal(characterArt.length,20,"20 novas imagens correspondentes");
assert.equal(context.window.T20_CHARACTER_ART_IDS.length,characterArt.length);
for(const entry of characterArt){
 const c=project.characters.find(x=>x.id===entry.id);
 const body=fs.readFileSync(entry.asset);
 const format=entry.asset.split(".").at(-1);
 assert.ok(body.length>10000,entry.id+" imagem incompleta");
 assert.ok(format==="png"?body.subarray(0,8).equals(Buffer.from("89504e470d0a1a0a","hex")):format==="webp"?body.toString("ascii",0,4)==="RIFF":body.subarray(0,2).equals(Buffer.from("ffd8","hex")),entry.id+" formato incorreto");
 assert.equal(c.portrait.url,"./"+entry.asset,entry.id+" sem retrato associado");
 assert.ok(c.media.some(m=>m.image===c.portrait.url&&m.source===entry.source_page),entry.id+" sem imagem e fonte na galeria");
 assert.ok(entry.source_url.startsWith("https://")&&entry.credit,entry.id+" sem proveniência");
}
for(const id of ["em-diamond","em-taravan","em-shuhu"]){
 const c=project.characters.find(x=>x.id===id);
 assert.ok(c.portrait.url.endsWith(".svg")||c.portrait.url.startsWith("data:image/svg+xml"),id+" requer visual pendente");
}
assert.match(fs.readFileSync("index.html","utf8"),/local-media\.js"><\/script>\s*<script defer src="\.\/character-art\.js"/);
const capriSource=JSON.parse(fs.readFileSync("assets/motifs/capri-source.json","utf8"));
assert.equal(capriSource.asset,"assets/motifs/capri-hud.webp");
assert.ok(capriSource.source_page.startsWith("https://www.cyberpunk.net/"));
assert.equal(fs.readFileSync(capriSource.asset).toString("ascii",0,4),"RIFF","Imagem de Capri inválida");
assert.match(fs.readFileSync("index.html","utf8"),/card-worlds\.css/);
assert.match(fs.readFileSync("index.html","utf8"),/card-worlds\.js/);
assert.equal(context.window.T20_REVIEW.list().length,0,"Uma decisão não pode vir aprovada de fábrica");
const review=context.window.T20_REVIEW;
const sample=review.add({type:"regra",character:"diego",variant:"alternative",title:"Conferir custo",body:"Verificar livro antes de aprovar",page:""});
assert.equal(sample.status,"pendente");
assert.ok(review.change(sample.id,"aprovado"));
const exported=review.exportRecords();
assert.equal(JSON.parse(exported)[0].status,"aprovado");
assert.throws(()=>review.importRecords('{"invalido":true}'));
assert.equal(review.list().length,1,"Importação inválida alterou registros");
assert.ok(review.remove(sample.id));
