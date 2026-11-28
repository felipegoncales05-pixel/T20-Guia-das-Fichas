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
for(const file of ["atlas-themes.js","atlas.js"]){
  vm.runInNewContext(fs.readFileSync(path.join(root,file),"utf8"),ctx,{filename:file});
}
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
const themes=ctx.window.T20_ATLAS_THEMES;
assert.equal(groups.length,42,"Cada obra identificada tem sua própria entrada");
assert.equal(new Set(groups.map(group=>themes.resolve(group.slug).drawing)).size,groups.length,
  "Cada universo tem um ornamento original próprio");
assert.equal(new Set(groups.map(group=>themes.resolve(group.slug).layout)).size,groups.length,
  "Cada universo possui uma composição de capa própria");
for(const group of groups){
  const theme=themes.resolve(group.slug);
  assert.equal(theme.id,group.slug,"Tema próprio ausente em "+group.name);
  assert.match(theme.reference,/^https:\/\//);
}
assert.equal(themes.resolve("origem-desconhecida").id,"arquivo");
assert.equal(api.createIndex([{id:"x",name:"Nova ficha",universe:"Obra não identificada"}])[0].theme.id,"arquivo");
assert.equal(api.createIndex([{id:"novo-lloyd",catalogCategory:"manhwa",universe:"The Greatest Estate Developer"}])[0].theme.id,
  "the-greatest-estate-developer");
assert.equal(api.createIndex([{id:"novo-jojo",universe:"JoJo · Parte 7"}])[0].theme.layout,"western");
assert.equal(items.find(c=>c.id==="goku").editions.length,4);
assert.equal(items.find(c=>c.id==="goku").editions.find(e=>e.key==="gt").theme.id,"dragon-ball/gt");
assert.ok(index.indexOf("atlas-themes.js")<index.indexOf("atlas.js"));

function luminance(hex){
  const rgb=hex.slice(1).match(/../g).map(ch=>parseInt(ch,16)/255)
    .map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
}
function contrast(left,right){
  const levels=[luminance(left),luminance(right)].sort((a,b)=>b-a);
  return (levels[0]+.05)/(levels[1]+.05);
}
const profiles=new Set([...groups.map(g=>themes.resolve(g.slug)),
  ...items.flatMap(c=>[c.theme,...c.editions.map(e=>e.theme)]),themes.resolve("arquivo")]);
for(const theme of profiles){
  for(const text of [theme.ink,theme.accent]){
    for(const surface of [theme.background,theme.panel]){
      assert.ok(contrast(text,surface)>=4.5,theme.id+" contraste "+text+" em "+surface);
    }
  }
}
console.log("OK: 42 composições, variantes, fallback e contraste AA das paletas de texto.");
