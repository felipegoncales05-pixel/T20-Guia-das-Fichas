/* A integridade da expansão VIII e da produção compactada. */
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const assert=require("node:assert/strict");
const {js}=require("../scripts/build-site.cjs");
const root=path.resolve(__dirname,".."),context={window:{}};
for(const file of js){
 if(["build-lab.js","app.js","remote-portraits.js"].includes(file))break;
 vm.runInNewContext(fs.readFileSync(path.join(root,file),"utf8"),context,{filename:file});
}
const w=context.window,all=w.T20_DATA.characters,ids=w.T20_WAVE8_IDS;
assert.equal(ids.length,21,"A expansão deve ter 21 entradas próprias");
assert.equal(new Set(ids).size,21,"IDs repetidos na expansão");
const recent=ids.map(id=>all.find(c=>c.id===id));
for(let i=0;i<recent.length;i++){
 const c=recent[i];
 assert.ok(c,ids[i]+" não aparece no catálogo");
 assert.equal(c.progression?.length,12,ids[i]+" sem progressão completa");
 assert.equal(c._guide?.levels?.length,12,ids[i]+" sem guia completo");
 assert.ok(c.portrait.fallback?.startsWith("data:image/svg+xml"),ids[i]+" sem fallback offline");
 assert.ok(c.skills?.length>=3,ids[i]+" sem perícias");
 assert.ok(c.info?.race&&c.info?.className,ids[i]+" sem raça ou classe");
 assert.ok(c.media?.length>=1,ids[i]+" sem referência de imagem");
}
assert.ok(new Set(recent.map(c=>c.info.race)).size>=12,"Diversidade racial insuficiente");
assert.ok(new Set(recent.map(c=>c.info.className)).size>=9,"Diversidade de classes insuficiente");
assert.ok(all.some(c=>c.id==="boys-starlight"),"A Starlight já existente deve permanecer");
for(const file of ["index.html","site.min.css","site-core.bundle.js","site-engine.bundle.js","site-expansion.bundle.js"]){
 assert.ok(fs.statSync(path.join(root,file)).size>2000,file+" não gerado");
}
const index=fs.readFileSync(path.join(root,"index.html"),"utf8");
assert.match(index,/site-expansion\.bundle\.js/);
assert.doesNotMatch(index,/card-worlds\.js/);
assert.doesNotMatch(index,/character-fx\.css/);
console.log("OK: 21 novas fichas, diversidade mecânica, imagens-reserva, bundles e remoção dos efeitos.");
