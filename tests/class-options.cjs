const assert=require("node:assert/strict");
const rules=require("../rules-catalog.js");
const options=require("../class-options.js");
const engine=require("../build-engine.js");

const fresh=()=>{
 const d=engine.makeDraft();
 d.raceId="humano";d.raceBonuses=["FOR","DES","CON"];
 d.attributes={FOR:2,DES:1,CON:2,INT:1,SAB:1,CAR:0};
 d.originId="soldado";d.originBenefits=["Fortitude","Guerra"];
 d.trainedSkills=["Luta","Fortitude"];
 d.levels=[{...engine.emptyLevel(),classId:"guerreiro",why:"Guerreiro representa técnica.",usage:"Ataques com ações válidas."}];
 return d;
};
assert.equal(Object.keys(options.basics).length,15);
assert.equal(Object.keys(options.variants).length,3);
assert.equal(options.variants.alquimista.status,"pendente");
assert.equal(options.distinctions["cavaleiro-corvo"].status,"pendente");
const a=fresh(),baseline=engine.evaluate(a);
assert.equal(baseline.rows[0].grants[0].id,"ataque-especial");
assert.equal(baseline.basePV,23);

a.narrativeSubclass="Espadachim sobrenatural";
assert.equal(engine.evaluate(a).basePV,baseline.basePV);
assert.equal(engine.importJSON(engine.exportJSON(a)).narrativeSubclass,"Espadachim sobrenatural");

a.distinctions=[{id:"cavaleiro-corvo",admission:"admitida",approval:"Mestre aprovou a admissão",powerIds:["poder-inexistente"]}];
const pending=engine.evaluate(a);
assert.ok(pending.issues.some(x=>x.includes("nenhum benefício concedido")));
assert.deepEqual(pending.distinctions[0].granted,[]);
assert.equal(pending.basePV,baseline.basePV);

a.distinctions=[];
a.levels[0].variantId="necromante";
assert.equal(engine.evaluate(a).basePV,null);
assert.ok(engine.evaluate(a).issues.some(x=>x.includes("regra de substituição")));

const fixture="__variante-de-teste__";
const ability="__habilidade-de-teste__";
rules.abilities[ability]={name:"Poder unitário",kind:"automática",manual:{action:"passiva",cost:"0",effect:"teste",limit:"teste",example:"teste"}};
options.variants[fixture]={id:fixture,name:"Variante artificial de teste",baseClassId:"guerreiro",status:"verificado",
 source:{book:"jda-1.3",edition:"v1.3",page:"teste",url:"https://example.org"},
 stats:{initialPV:22,gainPV:6,gainPM:4},
 levels:{1:{remove:["ataque-especial"],add:[ability]},3:{remove:["durao"],add:[]}}};
try{
 const d=fresh();d.levels[0].variantId=fixture;
 d.levels.push({...engine.emptyLevel(),classId:"guerreiro",powerId:"impeto",why:"Treino",usage:"Mover-se"});
 d.levels.push({...engine.emptyLevel(),classId:"guerreiro",powerId:"valentao",why:"Combate",usage:"Contra alvos vulneráveis"});
 const result=engine.evaluate(d);
 assert.deepEqual(result.rows[0].grants.map(x=>x.id),[ability]);
 assert.equal(result.rows[0].removedGrants[0],"ataque-especial");
 assert.equal(result.rows[0].addedGrants[0],ability);
 assert.ok(!result.rows[0].grants.some(x=>x.id==="ataque-especial"));
 assert.equal(result.rows[2].grants.length,0);
 assert.equal(result.rows[2].removedGrants[0],"durao");
 assert.equal(result.basePV,22+3+2*(6+3));
 assert.equal(result.basePM,12);
 assert.equal(result.classVariants.guerreiro,fixture);
 assert.equal(engine.importJSON(engine.exportJSON(d)).levels[0].variantId,fixture);
 assert.equal(engine.recommend(d).status,"comparar");
 const changed=structuredClone(d);changed.levels[2].variantId="necromante";
 assert.ok(engine.evaluate(changed).issues.some(x=>x.includes("troca retroativa")));
 assert.equal(engine.evaluate(changed).basePV,null);
 const denied=options.resolveClassStep({classId:"ladino",classLevel:1,variantId:fixture,
  classRule:rules.classes.ladino,abilities:rules.abilities,allowedBooks:["jda-1.3"]});
 assert.equal(denied.calculable,false);
 const sourceDenied=options.resolveClassStep({classId:"guerreiro",classLevel:1,variantId:fixture,
  classRule:rules.classes.guerreiro,abilities:rules.abilities,allowedBooks:[]});
 assert.equal(sourceDenied.calculable,false);
 const broken=structuredClone(options.variants[fixture]);
 broken.levels[1]={remove:["poder-que-nao-existe"],add:[ability]};
 const noDup=options.resolveClassStep({classId:"guerreiro",classLevel:1,variantId:fixture,
  registry:{[fixture]:broken},classRule:rules.classes.guerreiro,abilities:rules.abilities,allowedBooks:["jda-1.3"]});
 assert.equal(noDup.calculable,false);
 console.log("VALIDADO: arquitetura de variantes, substituições, progressão, distinções e JSON.");
}finally{
 delete rules.abilities[ability];delete options.variants[fixture];
}
