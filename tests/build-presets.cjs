const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const engine=require('../build-engine.js');
const rules=require('../rules-catalog.js');
const context={window:{}};
vm.runInNewContext(fs.readFileSync('rules-catalog.js','utf8'),context,{filename:'rules-catalog.js'});
vm.runInNewContext(fs.readFileSync('build-concepts.js','utf8'),context,{filename:'build-concepts.js'});
vm.runInNewContext(fs.readFileSync('build-presets.js','utf8'),context,{filename:'build-presets.js'});
const {ids,fromPlanned,specs}=context.window.T20_BUILD_PRESETS;
const idsExpected=['toji','aizen','vegitto','gogeta','soul-of-cinder','isaac','adao','grimm','sekiro','kaneki'];
assert.deepEqual([...ids].sort(),idsExpected.sort());
const COST=rules.pointBuy;
for(const id of idsExpected){
 const draft=fromPlanned({id,name:id,universe:'Origem',catalogCategory:'arquivo',sourcePage:'https://example.org'},engine);
 assert.equal(draft.catalogId,id);
 assert.equal(draft.status,'rascunho');
 assert.equal(draft.levels.length,12,id+': faltam níveis');
 assert.equal(Object.values(draft.attributes).reduce((n,v)=>n+COST[v],0),10,id+': compra incorreta');
 assert.equal(draft.raceBonuses.length,3,id+': bônus humano ausentes');
 assert.equal(draft.originBenefits.length,2,id+': origem incompleta');
 assert.equal(draft.trainedSkills.length>3,true,id+': perícias sem proposta');
 assert.equal(draft.levels.some(x=>x.classId===''),false,id+': nível de classe não preenchido');
 const report=engine.evaluate(draft);
 assert.ok(report.basePV!==null&&report.basePM!==null,id+': subtotal de classe inválido');
 assert.equal(report.rows.length,12,id+': relatório não mostra níveis');
 assert.ok(draft.levels.every(x=>x.why.length>20&&x.usage.length>20&&x.sourceNote.includes('v1.3')),id+': instrução por nível ausente');
 for(const row of report.rows){
  const chosen=draft.levels[row.globalLevel-1].powerId;
  if(row.classLevel>=2)assert.ok(chosen,id+': poder não escolhido no nível de classe '+row.classLevel);
  if(chosen)assert.equal(rules.abilities[chosen]?.classId,row.classId,id+': classe de poder errada');
 }
 for(const msg of report.issues)assert.ok(!/excede 10 pontos|incompleta:|repetido|requer nível|requer FOR|requer DES|requer INT|poder inexistente|classe ausente|origem não cadastrada|Magia .*não indexado|Magia .*círculo não liberado/.test(msg),id+': '+msg);
 assert.equal(engine.importJSON(engine.exportJSON(draft)).levels.length,12,id+': perda ao exportar');
 assert.equal(engine.importJSON(engine.exportJSON(draft)).spellbook.length,draft.spellbook.length,id+': magias não persistem');
 assert.ok(specs[id].ambiguity.length>30,id+': ambiguidade não documentada');
}
assert.equal(specs.aizen.spells.length,17);
assert.equal(specs.isaac.spells.length,14);
console.log('VALIDADO: dez propostas preenchidas com 12 níveis, poderes, atributos, origens, magias e JSON.');
