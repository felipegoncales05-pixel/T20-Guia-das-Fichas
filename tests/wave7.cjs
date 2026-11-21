const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const scripts=["data.js","guide.js","rentarou-guide.js","expansion.js","expansion-runtime.js",
"mega-data.js","mega-runtime.js","catalog-media.js","acheron-samurai.js","heroes-custom.js","d-salvage.js",
"user-gallery.js","local-media.js","character-art.js","catalog-cover-art.js","review-data.js","visual-direction.js",
"planned-data.js","build-concepts.js","rules-catalog.js","class-options.js","herois-variants.js","build-engine.js",
"build-presets.js","automatic-dossiers.js","archive-revisions.js","catalog-revision.js",
"umamusume-data.js","umamusume-runtime.js","crossovers-data.js","crossovers-runtime.js",
"wave7-data.js","wave7-fate.js","wave7-forms.js","wave7-runtime.js"];
const ctx={window:{}};
for(const f of scripts)vm.runInNewContext(fs.readFileSync(f,"utf8"),ctx,{filename:f});
const w=ctx.window,v=w.T20_WAVE7,all=w.T20_DATA.characters;
assert.ok(v,"A Fase VII não carregou");
assert.equal(v.count,156,"58 acompanhantes e heróis + 98 Fate");
assert.equal(v.forms,50,"50 formas Fate com ficha própria");
assert.equal(all.length,298,"142 anteriores + 156 novas");
assert.equal(new Set(all.map(c=>c.id)).size,298,"ID duplicado");
assert.equal(w.T20_CROSSOVERS.count,16);
assert.equal(w.T20_UMA.count,57);
assert.equal(w.T20_CLASS_REVIEW.report.validation.actualMain,69);
assert.equal(v.characters.filter(c=>c.catalogCategory==="jojo").length,47);
assert.equal(v.characters.filter(c=>c.catalogCategory==="fate").length,98);
assert.equal(v.characters.filter(c=>c.catalogCategory==="the-boys").length,6);
assert.equal(v.characters.filter(c=>["blue-lock","one-punch-man","kamen-rider","dmc"].includes(c.catalogCategory)).length,5);
assert.equal(Object.values(v.variantMap).filter(x=>x.length>1).length,32);
assert.equal(Object.values(v.variantMap).reduce((n,x)=>n+x.length-1,0),50);
assert.equal(Object.keys(w.T20_VISUAL.profiles).length,298);
assert.equal(Object.keys(w.T20_VISUAL.finishes).length,348);
assert.equal(v.characters.filter(c=>c.info.race==="Humano").length,0);
assert.ok(new Set(v.characters.map(c=>c.info.race)).size>=15,"Diversidade racial insuficiente");
assert.equal(v.characters.find(c=>c.id==="dmc-dante").info.className.includes("Inovador"),true);
assert.equal(v.characters.find(c=>c.id==="opm-saitama").info.className.includes("Lutador"),true);
assert.equal(v.characters.find(c=>c.id==="kr-sento").info.className.includes("Inventor"),true);
assert.equal(v.variantMap["fate-artoria"].length,7);
assert.equal(v.variantMap["fate-gilgamesh"].length,3);
assert.equal(v.variantMap["fate-jeanne"].length,4);
assert.equal(v.variantMap["fate-nero"].length,4);
assert.equal(v.variantMap["fate-mash"].length,2);
assert.ok(!v.ids.has("gyro"),"Gyro já pertencia ao acervo anterior");
assert.ok(all.some(c=>c.id==="gyro"));
const additions=[...v.characters,...v.alternatives];
assert.equal(additions.length,206);
for(const c of additions){
 assert.equal(c.progression.length,12,c.id+" sem 12 níveis");
 assert.equal(c._guide.levels.length,12,c.id+" sem guia");
 assert.equal(c.attrs.length,6,c.id+" sem 6 atributos");
 assert.equal(c.techniques.length,4,c.id+" sem técnicas");
 assert.ok(c.gear.length>=4&&c.sources.length>=3,c.id+" faltam equipamentos/fontes");
 assert.ok(c.portrait.url,c.id+" sem arte/referência");
 assert.equal(c.attrs.reduce((n,a)=>n+(w.T20_RULES.pointBuy[String(a.buy)]||0),0),10,c.id+" distribuição fora de 10pt");
 const l1=v.stats(c,1),l12=v.stats(c,12);
 assert.equal(l1.pv,c.stats.pv,c.id+" PV inicial");
 assert.equal(l1.pm,c.stats.pm,c.id+" PM inicial");
 assert.ok(l12.pv>l1.pv&&l12.pm>l1.pm,c.id+" não progrediu");
 for(let i=0;i<12;i++){
  assert.equal(Number(c.progression[i][0]),i+1,c.id+" ordenação");
  assert.ok(c._guide.levels[i].why&&c._guide.levels[i].use&&c._guide.levels[i].ref?.length>=2,c.id+" faltam fontes nível "+(i+1));
 }
}
for(const id of ["fate-artoria","fate-jeanne","fate-nero","fate-cu-chulainn"]){
 const forms=v.variantMap[id],refId=all.find(x=>x.id===id);
 assert.equal(forms[0][0],"principal");assert.strictEqual(forms[0][2],refId);
 for(const [key,label,c]of forms.slice(1)){
  assert.ok(key&&label);assert.equal(c.id,id,"Forma deve compartilhar endereço principal");
  assert.notEqual(c._guide,refId._guide,"Guia de forma não pode ser o mesmo do original");
  const variantSeedId=id+"--"+key;
  const draft=v.draftById(variantSeedId,w.T20_BUILD_ENGINE);
  assert.equal(draft.catalogId,variantSeedId,"Rascunho exclusivo por forma");
  assert.equal(draft.levels.length,12);
 }
}
for(const c of v.characters){
 const d=v.draftById(c.id,w.T20_BUILD_ENGINE);
 assert.equal(d.catalogId,c.id);
 assert.equal(d.levels.length,12);
}
console.log("VALIDADO: 298 dossiês, 156 novos personagens, 50 formas extras, 2472 níveis novos (incluindo formas), 32 seletores Fate.");
