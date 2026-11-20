const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
// Inclui toda a montagem antes da expansão de Umamusume para verificar que as
// 69 fichas do acervo e suas quatro variantes NÃO são modificadas.
const scripts=["data.js","guide.js","rentarou-guide.js","expansion.js","expansion-runtime.js",
 "mega-data.js","mega-runtime.js","catalog-media.js","acheron-samurai.js",
 "heroes-custom.js","d-salvage.js","user-gallery.js","local-media.js",
 "character-art.js","catalog-cover-art.js","review-data.js","visual-direction.js",
 "planned-data.js","build-concepts.js","rules-catalog.js","class-options.js",
 "herois-variants.js","build-engine.js","build-presets.js","automatic-dossiers.js",
 "archive-revisions.js","catalog-revision.js","umamusume-data.js","umamusume-runtime.js"];
const context={window:{}};
for(const file of scripts)vm.runInNewContext(fs.readFileSync(file,"utf8"),context,{filename:file});
const w=context.window,uma=w.T20_UMA,chars=w.T20_DATA.characters;
assert.ok(uma,"A integração das Umas falhou");
assert.equal(uma.count,57,"Elenco Umamusume incompleto");
assert.equal(chars.length,126,"Fichas antigas não preservadas ou Umas faltantes");
assert.equal(new Set(chars.map(c=>c.id)).size,126,"IDs duplicados");
assert.equal(w.T20_CLASS_REVIEW.report.entries.length,73,"Auditoria antiga deve manter 69+4");
assert.equal(w.T20_CLASS_REVIEW.report.validation.actualMain,69);
assert.equal(Object.keys(w.T20_VISUAL.profiles).length,126);
assert.equal(Object.keys(w.T20_VISUAL.finishes).length,130);
assert.equal(uma.ids.size,57);
assert.equal(chars.filter(c=>c.catalogCategory==="umamusume").length,57);
assert.equal(uma.characters.filter(c=>c.portrait.url.startsWith("https://")).length,10,"Retratos oficiais ausentes");
assert.equal(uma.characters.find(x=>x.id==="uma-daitaku-helios").info.className,"Bardo");
assert.equal(uma.characters.find(x=>x.id==="uma-matikanetannhauser").info.className,"Lutador — variante Atleta");
assert.equal(uma.characters.find(x=>x.id==="uma-matikanetannhauser").info.race,"Moreau do Coelho");
assert.equal(uma.characters.find(x=>x.id==="uma-special-week").info.race,"Centauro");
assert.equal(uma.characters.every(c=>c.info.race!=="Humano"),true);
const distribution=new Set(uma.characters.map(c=>c.info.race));
assert.ok(distribution.size>=12,"Faltam variedades de raças oficiais");
assert.equal(uma.characters.map(c=>c._uma.className).filter(x=>x==="Lutador").length>0,true);
for(const c of uma.characters){
 assert.equal(c.progression.length,12,c.id+" incompleta");
 assert.equal(c._guide.levels.length,12,c.id+" sem guia");
 assert.equal(c.techniques.length,4,c.id+" sem técnicas");
 assert.equal(c.attrs.length,6,c.id+" sem atributos");
 assert.equal(c.attrs.reduce((total,a)=>total+(w.T20_RULES.pointBuy[String(a.buy)]||0),0),10,c.id+" erro na compra");
 assert.ok(c.gear.length>=3&&c.attacks.length>=1&&c.skills.length>=5,c.id+" sem ficha base");
 assert.ok(c.portrait.url&&c.media[0].image&&c.sources.length>=3,c.id+" sem referência visual");
 for(const level of c._guide.levels){
  assert.ok(level.why&&level.use&&level.ref.length>=2,c.id+" nível sem fonte/guia");
 }
 const st1=uma.stats(c,1),st12=uma.stats(c,12);
 assert.equal(st1.pv,c.stats.pv,c.id+" PV nível1 diferente");
 assert.equal(st1.pm,c.stats.pm,c.id+" PM nível1 diferente");
 assert.ok(st12.pv>st1.pv,c.id+" PV não evolui");
 assert.ok(st12.pm>st1.pm,c.id+" PM não evolui");
 assert.ok(st12.move,c.id+" sem deslocamento");
 assert.ok(uma.skill(c,c.skills[0],12),c.id+" sem perícia");
 const draft=uma.draftById(c.id,w.T20_BUILD_ENGINE);
 assert.equal(draft.catalogId,c.id,c.id+" sem vinculação no laboratório");
 assert.equal(draft.levels.length,12,c.id+" sem 12 níveis no laboratório");
 if(c._uma.variant==="Atleta"){
  assert.equal(c._uma.className,"Lutador");
  assert.ok(c.progression[0][1].includes("Façanha Atlética"),c.id+" Atleta ausente");
  assert.doesNotMatch(c.progression[0][1],/Golpe Relâmpago/,c.id+" habilidade substituída erroneamente");
  assert.equal(Number(uma.stats(c,5).move.split(" ")[0]),Number(uma.stats(c,4).move.split(" ")[0])+3,
   c.id+" deslocamento Atleta incorreto");
 }
}
console.log("VALIDADO: 69 antigas + 57 Umamusume = 126 fichas, 1524 níveis e 57 guias; Helios e Mambo presentes.");
