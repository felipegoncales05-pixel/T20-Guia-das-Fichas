const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const engine=require('../build-engine.js');
const rules=require('../rules-catalog.js');
const {makeDraft,emptyLevel,evaluate,exportJSON,importJSON}=engine;
const classes=(...ids)=>ids.map(id=>({...emptyLevel(),classId:id}));
function readyBase(d){d.name='Teste de progressão';d.raceId='humano';d.raceBonuses=['FOR','DES','CON'];d.attributes={FOR:2,DES:1,CON:2,INT:1,SAB:1,CAR:0};return d}
assert.equal(Object.values(readyBase(makeDraft()).attributes).reduce((sum,v)=>sum+rules.pointBuy[v],0),7);

// Classe única: inicial só uma vez; cada avanço posterior usa ganho de classe.
const single=readyBase(makeDraft());single.levels=classes(...Array(12).fill('guerreiro'));
const a=evaluate(single);
assert.equal(a.basePV,20+3+11*(5+3));assert.equal(a.basePM,36);
assert.equal(a.rows[11].classLevel,12);
assert.deepEqual(Object.keys(a.levelsByClass),['guerreiro']);
assert.ok(a.rows.every(row=>row.grants.every(grant=>grant.ability?.manual)),"Habilidade automática de guerreiro sem manual");

// Entrada em Ladino não concede os 12 PV iniciais nem reinicia a contagem global.
const multi=readyBase(makeDraft());multi.levels=classes(...Array(8).fill('guerreiro'),...Array(4).fill('ladino'));
const b=evaluate(multi);
assert.equal(b.rows[8].globalLevel,9);assert.equal(b.rows[8].classLevel,1);
assert.equal(b.rows[8].newClass,true);assert.equal(b.rows[8].hpDelta,3+3);
assert.equal(b.basePV,20+3+7*(5+3)+4*(3+3));assert.equal(b.basePM,8*3+4*4);
assert.deepEqual(b.levelsByClass,{guerreiro:8,ladino:4});
assert.ok(b.rows.every(row=>row.grants.every(grant=>grant.ability?.manual)),"Habilidade automática multiclasse sem manual");

// Três classes não são recalculadas pela classe do último nível.
const triple=readyBase(makeDraft());triple.levels=classes('guerreiro','guerreiro','ladino','ladino','lutador');
const c=evaluate(triple);
assert.equal(c.basePV,20+3+(5+3)+(3+3)+(3+3)+(5+3));
assert.equal(c.basePM,3+3+4+4+3);
assert.deepEqual(c.rows.map(x=>x.classLevel),[1,2,1,2,1]);
assert.ok(c.rows.every(row=>row.grants.every(grant=>grant.ability?.manual)),"Habilidade automática de três classes sem manual");
for(const classId of Object.keys(rules.classes))for(let level=1;level<=12;level++)for(const grant of rules.classes[classId].grants[level]||[]){
 assert.ok(rules.abilities[grant]?.manual?.example,`${classId} ${level}: manual ausente para ${grant}`);
 assert.ok(rules.abilities[grant].source.page,`${classId} ${level}: página ausente para ${grant}`);
}
assert.equal(rules.abilities['ataque-furtivo'].versions.at(-1).minClassLevel,11);
assert.equal(rules.abilities['casca-grossa'].versions.at(-1).minClassLevel,11);

// Requisitos de nível de classe e atributo são avaliados no avanço escolhido.
const early=readyBase(makeDraft());early.levels=classes(...Array(4).fill('ladino'));early.levels[3].powerId='assassinar';early.levels[3].why='Estudo do alvo';early.levels[3].usage='Analisar em alcance curto';
assert.ok(evaluate(early).issues.some(x=>x.includes('requer nível 5 de Ladino')));
early.levels.push({...emptyLevel(),classId:'ladino',powerId:'assassinar',why:'Estudo',usage:'Analisar'});
early.levels[3].powerId='';assert.ok(!evaluate(early).issues.some(x=>x.includes('requer nível 5 de Ladino')));
const dex=readyBase(makeDraft());dex.raceBonuses=['FOR','CON','SAB'];dex.attributes.DES=0;dex.levels=classes('guerreiro','guerreiro');dex.levels[1].powerId='ataque-reflexo';
assert.ok(evaluate(dex).issues.some(x=>x.includes('requer DES 1')));

// Fontes ausentes e combinações de variante não verificadas não passam em silêncio.
const forbidden=readyBase(makeDraft());forbidden.allowedBooks=['jda-1.3','herois'];forbidden.levels=classes('guerreiro','guerreiro');forbidden.levels[1].powerId='impeto';forbidden.levels[1].powerVersion='variante-nao-catalogada';
const f=evaluate(forbidden);
assert.ok(f.issues.some(x=>x.includes('opções mecânicas ainda não catalogadas')));
assert.ok(f.issues.some(x=>x.includes('versão indisponível')));
assert.equal(f.complete,false);
forbidden.allowedBooks=['jda-1.3','livro-inexistente'];assert.throws(()=>evaluate(forbidden),/Livro não cadastrado/);
const variant=readyBase(makeDraft());variant.levels=classes('guerreiro');variant.levels[0].variantId='variante-sem-compatibilidade';
assert.ok(evaluate(variant).issues.some(x=>x.includes('variante de classe sem regra')));
assert.equal(evaluate(variant).basePV,null,"Variante não verificada não pode mostrar total de classe básica");
const gap=readyBase(makeDraft());gap.levels=classes('','guerreiro');
assert.equal(evaluate(gap).rows[1].pv,null,"Nível posterior não pode mostrar subtotal após classe ausente");

// Um JSON importado continua rascunho local, sem alterar o catálogo.
const imported=importJSON(exportJSON(multi));
assert.equal(imported.schemaVersion,1);assert.equal(imported.status,'rascunho');
assert.equal(evaluate(imported).basePV,b.basePV);
imported.combat.opening='Ação a conferir';
assert.equal(importJSON(exportJSON(imported)).combat.opening,'Ação a conferir');
assert.throws(()=>importJSON('{"schemaVersion":1}'),/Formato|Progressão/);
assert.throws(()=>importJSON('x'.repeat(250001)),/muito grande/);
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'t20-lab-'));
const exportedPath=path.join(temporary,'export.json');
const reviewPath=path.resolve(__dirname,'..','review-drafts',imported.id+'.json');
try{
 fs.writeFileSync(exportedPath,exportJSON(imported));
 const output=execFileSync(process.execPath,[path.resolve(__dirname,'..','tools/import-lab-draft.cjs'),exportedPath],{encoding:'utf8'});
 assert.match(output,/revisão obrigatória/);
 assert.equal(JSON.parse(fs.readFileSync(reviewPath,'utf8')).id,imported.id);
 assert.throws(()=>execFileSync(process.execPath,[path.resolve(__dirname,'..','tools/import-lab-draft.cjs'),exportedPath],{encoding:'utf8',stdio:'pipe'}),/Command failed/,'Não pode sobrescrever a cópia em revisão');
}finally{
 fs.rmSync(temporary,{recursive:true,force:true});
 fs.rmSync(reviewPath,{force:true});
 try{fs.rmdirSync(path.dirname(reviewPath))}catch{}
}
console.log('VALIDADO: multiclasse 1/2/3 classes, PV/PM por avanço, pré-requisitos, fontes, JSON e pendências.');

// Dez conceitos são rascunhos de 12 níveis e não concedem poderes gratuitos.
const concepts=require('../build-concepts.js');
const expected=['toji','aizen','vegitto','gogeta','soul-of-cinder','isaac','adao','grimm','sekiro','kaneki'];
assert.deepEqual(concepts.ids.sort(),expected.sort());
for(const id of expected){
 const d=concepts.fromPlanned({id,name:id,universe:'Obra de origem',catalogCategory:'arquivo',sourcePage:'https://example.org'},engine);
 assert.equal(d.status,'rascunho');
 assert.equal(d.catalogId,id);
 assert.equal(d.levels.length,12);
 assert.equal(d.levels.every(x=>x.powerId===''),true,'Não conceder poderes sem conferência');
 assert.ok(d.notes.includes('Nenhuma classe'));
 assert.ok(evaluate(d).issues.length>0,'Conceito não pode ser aprovado');
}
const sampleToji=concepts.fromPlanned({id:'toji',name:'Toji',universe:'JJK'},engine);
assert.deepEqual(sampleToji.levels.map(x=>x.classId).reduce((o,x)=>(o[x]=(o[x]||0)+1,o),{}),{guerreiro:8,ladino:4});
console.log('VALIDADO: dez propostas de 12 níveis, multiclasse editável e pendências explícitas.');

// Suplementos podem ser documentados sem se converter em efeitos de jogo automáticos.
const supplemental=readyBase(makeDraft());
supplemental.allowedBooks=['jda-1.3','herois'];
supplemental.levels=classes('guerreiro');
supplemental.levels[0].customPowerName='Poder de Heróis (exemplo não verificado)';
supplemental.levels[0].customPowerBook='herois';
let sup=evaluate(supplemental);
assert.ok(sup.issues.some(x=>x.includes('página, edição, pré-requisitos')));
assert.ok(sup.issues.some(x=>x.includes('sem efeito automático')));
assert.equal(sup.basePV,23,'Suplemento não pode alterar PV sem regra programada');
supplemental.levels[0].customPowerEdition='edição a confirmar';
supplemental.levels[0].customPowerPage='página a conferir';
supplemental.levels[0].customPowerPrereqs='requisitos a confirmar';
supplemental.levels[0].customPowerEffect='efeito a validar';
supplemental.levels[0].customPowerVersions='variante A e B a conferir';
sup=evaluate(supplemental);
assert.ok(sup.issues.some(x=>x.includes('quais versões divergem')));
assert.equal(importJSON(exportJSON(supplemental)).levels[0].customPowerName,supplemental.levels[0].customPowerName);
console.log('VALIDADO: documentação de suplementos, edição, versões e bloqueio de efeitos não verificados.');
