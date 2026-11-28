/* Smoke test do Atlas: catálogo real, categorias e integridade sem DOM. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const {js}=require("../scripts/build-site.cjs");
const root=path.resolve(__dirname,"..");
const doc={addEventListener(){}};
const ctx={window:{},document:doc,location:{hash:"#/atlas"}};
for(const file of js.slice(0,js.indexOf("build-lab.js"))){
  vm.runInNewContext(fs.readFileSync(path.join(root,file),"utf8"),ctx,{filename:file});
}
const before=ctx.window.T20_DATA.characters.map(c=>[c.id,c.name,c.info?.className]);
vm.runInNewContext(fs.readFileSync(path.join(root,"atlas.js"),"utf8"),ctx,{filename:"atlas.js"});
const api=ctx.window.T20_ATLAS;
assert.ok(api?.render&&api?.createIndex&&api?.groupFor);
const items=api.createIndex(ctx.window.T20_DATA.characters);
assert.equal(items.length,421,"O Atlas deve encontrar os 421 dossiês existentes");
assert.equal(new Set(items.map(c=>c.id)).size,items.length,"Não indexar IDs repetidos");
assert.ok(items.every(c=>c.name&&c.universe&&c.className&&c.universeSlug),"Metadados incompletos");
const groups=api.groupIndex(items);
assert.ok(groups.length>=20,"Universos insuficientes");
assert.equal(groups.reduce((sum,group)=>sum+group.count,0),items.length);
assert.equal(items.filter(c=>c.universe==="Cavaleiros do Zodíaco").length,90);
assert.ok(items.some(c=>c.name==="Gyro Zeppeli"&&c.search.includes("spin")));
assert.ok(items.some(c=>c.name==="D."&&c.universe==="Cyberpunk"));
const duplicate=api.createIndex([{id:"x",name:"Primeiro",universe:"X",info:{className:"Guerreiro",race:"Humano"}},
                                  {id:"x",name:"Segundo",universe:"X",info:{className:"Bardo",race:"Humano"}}]);
assert.equal(duplicate.length,1,"Duplicatas devem ser removidas");
assert.deepEqual(ctx.window.T20_DATA.characters.map(c=>[c.id,c.name,c.info?.className]),before,
                 "Indexação não pode alterar as fichas");
const index=fs.readFileSync(path.join(root,"index.html"),"utf8");
assert.match(index,/atlas\.css/);
assert.match(index,/atlas\.js/);
assert.ok(index.indexOf("atlas.js")<index.indexOf("site-expansion.bundle.js"),
          "Atlas deve estar pronto antes do roteador chamar render");
assert.match(fs.readFileSync(path.join(root,"app.js"),"utf8"),/if\(id==="atlas"\)/);
assert.match(fs.readFileSync(path.join(root,"site-expansion.bundle.js"),"utf8"),/T20_ATLAS\.render/);
console.log("OK: Atlas indexa 421 fichas, grupos de universos, classes e raças sem alterar builds.");