const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const files=["data.js","guide.js","rentarou-guide.js","expansion.js","expansion-runtime.js","mega-data.js","mega-runtime.js","catalog-media.js","acheron-samurai.js","heroes-custom.js","d-salvage.js","user-gallery.js","local-media.js","character-art.js","catalog-cover-art.js","review-data.js","visual-direction.js","planned-data.js","build-concepts.js","rules-catalog.js","class-options.js","herois-variants.js","build-engine.js","build-presets.js","automatic-dossiers.js","archive-revisions.js","catalog-revision.js","umamusume-data.js","umamusume-runtime.js","crossovers-data.js","crossovers-runtime.js"];
const ctx={window:{}};for(const file of files)vm.runInNewContext(fs.readFileSync(file,"utf8"),ctx,{filename:file});
const w=ctx.window,cx=w.T20_CROSSOVERS,all=w.T20_DATA.characters;
assert.ok(cx,"Runtime da fase VI não iniciou");assert.equal(cx.count,16);
assert.equal(all.length,142,"69 antigas + 57 Umas + 16 crossovers");
assert.equal(new Set(all.map(c=>c.id)).size,142,"ID duplicado");
assert.equal(w.T20_UMA.count,57);
assert.equal(w.T20_CLASS_REVIEW.report.validation.actualMain,69,"Auditoria original deve ser preservada");
assert.equal(Object.keys(w.T20_VISUAL.profiles).length,142);
assert.equal(Object.keys(w.T20_VISUAL.finishes).length,146);
const types=new Set(cx.characters.map(c=>c.info.race));assert.ok(types.size>=9);
assert.equal(cx.characters.filter(c=>c.info.race==="Humano").length,0);
assert.equal(cx.characters.find(c=>c.id==="cx-megumin").info.className.includes("Arcanista"),true);
assert.equal(cx.characters.find(c=>c.id==="cx-ciri").info.className.includes("Ventanista"),true);
assert.equal(cx.characters.find(c=>c.id==="cx-dva").info.className.includes("Inventor"),true);
assert.equal(cx.characters.find(c=>c.id==="cx-wuwa-chisa").info.className.includes("Guerreiro"),true);
assert.equal(cx.characters.find(c=>c.id==="cx-wuwa-cartethyia").info.className.includes("Paladino"),true);
for(const c of cx.characters){
 assert.equal(c.progression.length,12,c.id+" sem progressão");
 assert.equal(c._guide.levels.length,12,c.id+" sem guia completo");
 assert.equal(c.attrs.length,6);
 assert.equal(c.attrs.reduce((n,a)=>n+(w.T20_RULES.pointBuy[String(a.buy)]||0),0),10,c.id+" compra de atributos");
 assert.equal(c.techniques.length,3,c.id+" técnicas ausentes");
 assert.ok(c.gear.length>=3&&c.sources.length>=3,c.id+" ficha sem elementos");
 assert.ok(c.portrait.url&&c.media[0].image);
 for(let j=0;j<12;j++){const row=c.progression[j],guide=c._guide.levels[j];assert.equal(Number(row[0]),j+1);assert.ok(guide.why&&guide.use&&guide.ref?.length>=2,c.id+" nível "+(j+1));}
 const s1=cx.stats(c,1),s12=cx.stats(c,12);
 assert.equal(s1.pv,c.stats.pv);assert.equal(s1.pm,c.stats.pm);
 assert.ok(s12.pv>s1.pv&&s12.pm>s1.pm,c.id+" stats evoluem");
 const d=cx.draftById(c.id,w.T20_BUILD_ENGINE);
 assert.equal(d.catalogId,c.id);assert.equal(d.levels.length,12);
}
console.log("Fase VI: 16 fichas e 192 níveis válidos, 142 no catálogo, 69+57 anteriores intactas.");
