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
a.modExtra={enabled:true,version:1};
a.levels[0].opcaoExtra="conservar";
const migrated=engine.importJSON(engine.exportJSON(a));
assert.equal(migrated.legacyFields.modExtra.enabled,true);
assert.equal(migrated.levelLegacy[0].opcaoExtra,"conservar");


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
const explicitFixture="__variante-lista-explicita__";
const ability="__habilidade-de-teste__",powerFixture="__poder-variante-de-teste__";
rules.abilities[ability]={name:"Poder unitário",kind:"automática",manual:{action:"passiva",cost:"0",effect:"teste",limit:"teste",example:"teste"}};
rules.abilities[powerFixture]={name:"Poder exclusivo de teste",kind:"poder",classId:fixture,source:{book:"jda-1.3",page:"teste"},manual:{action:"padrão",cost:"1",effect:"teste",limit:"teste",example:"teste"}};
options.variants[fixture]={id:fixture,name:"Variante artificial de teste",baseClassId:"guerreiro",status:"verificado",
 source:{book:"jda-1.3",edition:"v1.3",page:"teste",url:"https://example.org"},
 grantPolicy:"substituicoes-verificadas",
 stats:{initialPV:22,gainPV:6,gainPM:4},powerFrom:2,powers:{exclusive:[powerFixture],remove:["impeto"]},
 levels:{1:{remove:["ataque-especial"],add:[ability]},3:{remove:["durao"],add:[]}}};
try{
 const d=fresh();d.levels[0].variantId=fixture;
 d.levels.push({...engine.emptyLevel(),classId:"guerreiro",powerId:powerFixture,why:"Treino",usage:"Mover-se"});
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
 assert.equal(result.rows[1].choice.name,"Poder exclusivo de teste");
 assert.deepEqual(result.rows[1].removedPowers,["impeto"]);
 const prohibited=structuredClone(d);prohibited.levels[1].powerId="impeto";
 assert.ok(engine.evaluate(prohibited).issues.some(x=>x.includes("incompatível com a classe/variante")));
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
 const explicit={...options.variants[fixture],id:explicitFixture,name:"Teste de herança explícita",
  grantPolicy:"lista-explicita",levels:{1:{keep:[],add:[ability]},2:{keep:[],add:[]},3:{keep:[],add:[]}}};
 const withoutInheritance=options.resolveClassStep({classId:"guerreiro",classLevel:1,variantId:explicitFixture,
  registry:{[explicitFixture]:explicit},classRule:rules.classes.guerreiro,abilities:rules.abilities,allowedBooks:["jda-1.3"]});
 assert.deepEqual(withoutInheritance.grants,[ability]);
 assert.deepEqual(withoutInheritance.removed,["ataque-especial"]);
 const missingLevel=options.resolveClassStep({classId:"guerreiro",classLevel:4,variantId:explicitFixture,
  registry:{[explicitFixture]:explicit},classRule:rules.classes.guerreiro,abilities:rules.abilities,allowedBooks:["jda-1.3"]});
 assert.equal(missingLevel.calculable,false);
 const undocumented={...options.variants[fixture],grantPolicy:undefined};
 const blocked=options.resolveClassStep({classId:"guerreiro",classLevel:1,variantId:fixture,
  registry:{[fixture]:undocumented},classRule:rules.classes.guerreiro,abilities:rules.abilities,allowedBooks:["jda-1.3"]});
 assert.equal(blocked.calculable,false);
  const broken=structuredClone(options.variants[fixture]);
 broken.levels[1]={remove:["poder-que-nao-existe"],add:[ability]};
 const noDup=options.resolveClassStep({classId:"guerreiro",classLevel:1,variantId:fixture,
  registry:{[fixture]:broken},classRule:rules.classes.guerreiro,abilities:rules.abilities,allowedBooks:["jda-1.3"]});
 assert.equal(noDup.calculable,false);
 console.log("VALIDADO: arquitetura de variantes, substituições, progressão, distinções e JSON.");
}finally{
 delete rules.abilities[ability];delete rules.abilities[powerFixture];delete options.variants[fixture];
}
