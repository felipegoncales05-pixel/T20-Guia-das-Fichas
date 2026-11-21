const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const {js}=require("../scripts/build-site.cjs");
const root=path.resolve(__dirname,".."),context={window:{}};
for(const file of js.slice(0,js.indexOf("build-lab.js"))){
 vm.runInNewContext(fs.readFileSync(path.join(root,file),"utf8"),context,{filename:file});
}
const w=context.window,phase=w.T20_COSMOS_DATA,dossiers=w.T20_DATA.characters;
const cds=phase.seeds.filter(seed=>seed.group==="cdz");
assert.equal(phase.seeds.length,102);
assert.equal(cds.length,90);
assert.equal(dossiers.length,421);
assert.equal(new Set(dossiers.map(c=>c.id)).size,dossiers.length);
const sources={
 classico:13,nd:14,mitico:1,tlc:17,antigos:13,futuro:2,omega:14,dark:12,ga:4
};
for(const [era,count] of Object.entries(sources)){
 assert.equal(cds.filter(s=>s.id.startsWith("cdz-"+era+"-")).length,count,era+" incompleto");
}
const classics=["mu","aldebaran","saga","deathmask","aiolia","shaka","dohko","milo","aiolos","shura","camus","aphrodite"];
for(const key of classics){
 assert.ok(w.T20_DOSSIER_VARIANTS["cdz-classico-"+key].some(([id])=>id==="alma-de-ouro"),key+" sem Alma de Ouro");
}
const expected=[
 ["senshi","Anão","Guerreiro"],["lucy","Kliren","Ventanista"],["weak","Minotauro","Guerreiro"],
 ["adam-smasher","Golem de Ferro","Guerreiro"],["talia","Lefou","Lutador"],["roman","Humano","Ladino"],
 ["caine","Golem de Espelhos","Arcanista"],["md-v","Golem de Bronze (FOR/DES)","Lutador"],
 ["md-n","Golem de Bronze (FOR/CON)","Guerreiro"],["md-uzi","Golem de Bronze (Pequeno)","Arcanista"],
 ["vegeta","Moreau do Leão","Lutador"],["sans","Osteon","Arcanista"]
];
for(const [id,race,klass] of expected){
 const c=dossiers.find(x=>x.id===id);
 assert.ok(c,id+" ausente");
 assert.ok(c.info.race.startsWith(race),id+" raça incorreta");
 assert.ok(c.info.className.includes(klass),id+" classe incorreta");
}
assert.deepEqual(Array.from(w.T20_DOSSIER_VARIANTS.vegeta,x=>x[0]),["z","gt","daima","super"]);
assert.deepEqual(Array.from(w.T20_DOSSIER_VARIANTS.vegeta,x=>x[1]),["DBZ","GT","Daima","Super"]);
assert.match(w.T20_DOSSIER_VARIANTS.vegeta[1][2].info.className,/Lutador 6.*Arcanista.*6/);
assert.match(w.T20_DOSSIER_VARIANTS.vegeta[3][2].info.className,/Lutador 8.*Arcanista.*4/);
for(const [,label,c] of w.T20_DOSSIER_VARIANTS.vegeta){
 assert.ok(c.initial.every(row=>!row.includes("Seta Infalível")),label+" ganha magia antes da entrada na classe");
}
assert.equal(Object.values(w.T20_FATE_VARIANTS).reduce((n,forms)=>n+forms.length-1,0),50);
const builds=[...w.T20_WAVE7.characters,...w.T20_WAVE7.alternatives].filter(c=>c._cosmos);
assert.equal(builds.length,phase.seeds.length+phase.forms.length);
for(const c of builds){
 const id=c._wave7.parentId?c.id+"--"+c._wave7.key:c.id;
 const draft=w.T20_WAVE7.draftById(id,w.T20_BUILD_ENGINE),report=w.T20_BUILD_ENGINE.evaluate(draft);
 assert.equal(draft.catalogId,id);
 assert.equal(report.attributeCost,10,id+" fora da compra de atributos");
 const errors=report.issues.filter(x=>!x.startsWith("Classe variante Ventanista:"));
 assert.deepEqual(Array.from(errors),[],id+" seleção ou requisito não preenchido");
 assert.equal(c.progression.length,12,id+" sem 12 níveis");
 assert.equal(c._guide.levels.length,12,id+" sem manual");
 assert.ok(report.rows.slice(1).every((row,i)=>row.firstClass||row.choice||row.classLevel===1),id+" avanço em branco");
 assert.ok(c._guide.levels.every(row=>row.ref.length>=2),id+" sem fonte");
 assert.ok(c.portrait.fallback.startsWith("data:image/svg+xml"),id+" sem pôster de reserva");
 assert.ok(c.sources.some(source=>source.url.startsWith("https://")),id+" sem fonte de personagem");
 for(const [index,row] of report.rows.entries()){
  const stats=w.T20_WAVE7.stats(c,index+1);
  assert.equal(stats.pv,row.pv,id+" PV diferente no dossiê");
  assert.equal(stats.pm,row.pm,id+" PM diferente no dossiê");
  assert.equal(c.progression[index][0],String(index+1));
 }
 assert.ok(report.basePV>report.rows[0].pv&&report.basePM>report.rows[0].pm,id+" não evoluiu");
 if(w.T20_RULES.races[draft.raceId].noOrigin){
  assert.equal(draft.originId,"",id+" construto com origem");
  assert.ok(draft.purposePower,id+" não tem Propósito de Criação");
 }
 assert.equal(w.T20_BUILD_ENGINE.importJSON(w.T20_BUILD_ENGINE.exportJSON(draft)).raceId,draft.raceId);
}
const senshi=dossiers.find(c=>c.id==="senshi");
assert.ok(senshi.initial.some(text=>text.includes("Gororoba")));
assert.equal(senshi.stats.pv,27,"Senshi deve ter 20 PV de Guerreiro, 4 de CON e 3 de Anão");
const bronzes=builds.filter(c=>["md-v","md-n","md-uzi"].includes(c.id));
assert.equal(new Set(bronzes.map(c=>c.info.race)).size,3);
console.log("OK: "+phase.seeds.length+" novos dossiês, "+phase.forms.length+" variantes, "+builds.length*12+" avanços e cópias do Laboratório.");
