/* Fase IV // regressões das tabelas de Heróis de Arton, v1.1.
   Os textos são sínteses autorais; não reproduzir o suplemento. */
const assert=require("node:assert/strict");
const engine=require("../build-engine.js");
const {rules,options}=engine;
const cases=[
 ["atleta","lutador","briga",["briga","atleta-facanha"],["briga","atleta-mobilidade"]],
 ["inovador","guerreiro","ataque-especial",["inovador-equipamento","inovador-sequencia"],["inovador-sequencia"]],
 ["necromante","arcanista","caminho-arcanista",["magias-arcanas","necro-caminho","necro-mortos"],["magias-circulo-2","necro-potencia"]],
 ["ventanista","ladino","ataque-furtivo",["ventanista-charme","ventanista-truques"],[]]
];
const make=(variantId,classId)=>{
 const d=engine.makeDraft();
 d.name="Verificação da variante "+variantId;
 d.work="Cenário de teste";
 d.raceId="humano";d.raceBonuses=["FOR","DES","CON"];
 d.attributes={FOR:2,DES:1,CON:2,INT:1,SAB:1,CAR:1};
 d.originId="soldado";d.originBenefits=["Fortitude","Guerra"];
 d.trainedSkills=["Luta","Percepção"];
 d.allowedBooks=["jda-1.3","herois"];
 d.levels=Array.from({length:12},(_,i)=>({
  ...engine.emptyLevel(),classId,variantId:i===0?variantId:"",
  why:"Adaptação fiel à obra e ao caminho da classe.",usage:"Usar habilidades na sequência permitida."
 }));
 if(variantId==="necromante")d.arcanePath="necromante";
 return d;
};
assert.equal(Object.keys(options.variants).length,14);
for(const [id,base,removedAtFirst,levelOne,levelFive] of cases){
 const spec=options.variants[id];
 assert.equal(spec.baseClassId,base);
 assert.equal(spec.status,"verificado");
 assert.equal(spec.grantPolicy,"lista-explicita");
 for(let i=1;i<=12;i++)assert.ok(spec.levels[i],id+" sem nível "+i);
 const draft=make(id,base),report=engine.evaluate(draft);
 assert.equal(report.rows.length,12,id+" nível ausente");
 assert.equal(report.rows[0].variantId,id);
 assert.deepEqual(report.rows[0].grants.map(g=>g.id),levelOne,id+" nível 1 incorreto");
 assert.ok(report.rows[0].removedGrants.includes(removedAtFirst),id+" habilidade básica não removida");
 assert.deepEqual(report.rows[4].grants.map(g=>g.id),levelFive,id+" nível 5 incorreto");
 assert.ok(report.rows.every(row=>row.grants.every(x=>x.ability?.source?.book)));
 assert.ok(report.basePV!==null&&report.basePM!==null,id+" subtotal de classe inválido");
 assert.equal(report.complete,false,"Não declarar ficha completa a partir de PV/PM");
 assert.equal(engine.importJSON(engine.exportJSON(draft)).levels[0].variantId,id);
 // A variante é uma escolha da primeira entrada na classe, inclusive em multiclasse.
 const other=make(id,base);other.levels[6].variantId="atleta"===id?"necromante":"atleta";
 assert.equal(engine.evaluate(other).basePV,null,id+" permitiu troca retroativa");
 const blocked=make(id,base);blocked.allowedBooks=["jda-1.3"];
 assert.equal(engine.evaluate(blocked).basePV,null,id+" permitiu suplemento não selecionado");
}
const atleta=engine.evaluate(make("atleta","lutador"));
assert.ok(atleta.rows[4].removedGrants.includes("golpe-cruel"));
assert.ok(atleta.rows[8].removedGrants.includes("golpe-violento"));
const inovador=engine.evaluate(make("inovador","guerreiro"));
assert.ok(inovador.rows[5].removedGrants.includes("ataque-extra"));
const ventDraft=make("ventanista","ladino");
assert.equal(engine.evaluate(ventDraft).basePM,12*4+2,"Charme precisa usar CAR final (+2)");
const necroDraft=make("necromante","arcanista");
assert.ok(!engine.evaluate(necroDraft).issues.some(msg=>msg.includes("exige caminho definido")));
necroDraft.arcanePath="mago";
assert.ok(engine.evaluate(necroDraft).issues.some(msg=>msg.includes("não acumule Bruxo, Mago")));
const magic=make("ventanista","ladino");
magic.spellbook=[{name:"Criar Ilusão",circle:1,classLevel:1,school:"ilusao",why:"Representa engano visual",how:"Usar como simulação",source:"Jogo do Ano"}];
assert.ok(!engine.evaluate(magic).issues.some(msg=>msg.includes("círculo não liberado")));
magic.spellbook[0].school="necromancia";
assert.ok(engine.evaluate(magic).issues.some(msg=>msg.includes("somente Encantamento ou Ilusão")));
const necroSpells=make("necromante","arcanista");
necroSpells.spellbook=[{name:"Sono",circle:1,classLevel:1,school:"encantamento",why:"Teste de restrição",how:"Lançar na cena",source:"JdA"}];
assert.ok(engine.evaluate(necroSpells).issues.some(msg=>msg.includes("não pode aprender magias de Encantamento")));
console.log("VALIDADO: 4 variantes oficiais, 48 patamares, substituições, livros, PM e escolas.");
