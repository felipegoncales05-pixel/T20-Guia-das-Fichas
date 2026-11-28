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
for(const file of ["atlas-themes.js","atlas-art.js","atlas.js"]){
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
const art=ctx.window.T20_ATLAS_ART;
assert.equal(groups.length,42,"Cada obra identificada tem sua própria entrada");
assert.equal(new Set(groups.map(group=>themes.resolve(group.slug).drawing)).size,groups.length,
  "Cada universo tem um ornamento original próprio");
assert.equal(new Set(groups.map(group=>themes.resolve(group.slug).layout)).size,groups.length,
  "Cada universo possui uma composição de capa própria");
for(const group of groups){
  const theme=themes.resolve(group.slug);
  assert.equal(theme.id,group.slug,"Tema próprio ausente em "+group.name);
  assert.match(theme.reference,/^https:\/\//);
  assert.ok(art.layouts.includes(theme.layout),"Ilustração ausente em "+group.name);
  assert.ok(theme.composition&&theme.motion&&theme.flare,"Direção incompleta em "+group.name);
}
assert.equal(new Set(groups.map(group=>art.scene(themes.resolve(group.slug)))).size,42);
const directoryGroups=groups.filter(group=>themes.resolve(group.slug).directory);
assert.deepEqual(Array.from(directoryGroups,group=>group.slug),["honkai-star-rail","cyberpunk"]);
const pilotItems=items.filter(item=>directoryGroups.some(group=>group.slug===item.universeSlug));
assert.equal(pilotItems.length,43);
assert.ok(pilotItems.every(item=>item.portrait===ctx.window.T20_DATA.characters.find(c=>c.id===item.id).portrait),
  "A galeria deve reutilizar o retrato cadastrado no dossiê");
assert.equal(themes.resolve("honkai-star-rail/chrysos").directory.style,"astral");
assert.equal(themes.resolve("cyberpunk/edgerunners-2").directory.style,"night-city");
assert.ok(new Set(groups.map(group=>themes.resolve(group.slug).composition)).size>=12);
assert.ok(new Set(groups.map(group=>themes.resolve(group.slug).motion)).size>=20);
assert.equal(themes.resolve("origem-desconhecida").id,"arquivo");
assert.equal(api.createIndex([{id:"x",name:"Nova ficha",universe:"Obra não identificada"}])[0].theme.id,"arquivo");
assert.equal(api.createIndex([{id:"novo-lloyd",catalogCategory:"manhwa",universe:"The Greatest Estate Developer"}])[0].theme.id,
  "the-greatest-estate-developer");
assert.equal(api.createIndex([{id:"novo-jojo",universe:"JoJo · Parte 7"}])[0].theme.layout,"western");
assert.equal(items.find(c=>c.id==="goku").editions.length,4);
assert.equal(items.find(c=>c.id==="goku").editions.find(e=>e.key==="gt").theme.id,"dragon-ball/gt");
const boys=items.filter(c=>c.universeSlug==="the-boys");
assert.equal(boys.length,12);
assert.equal(boys.filter(c=>c.theme.id==="the-boys/equipe-principal").length,6);
assert.equal(boys.filter(c=>c.theme.id==="the-boys/prime-video").length,6);
assert.equal(api.createIndex([{id:"new-boys",universe:"The Boys · equipe principal"}])[0].theme.id,
  "the-boys/equipe-principal","A obra deve definir o tema quando vier sem categoria");
assert.equal(themes.forWork("the-boys","the boys").id,"the-boys","O registro genérico conserva o tema da franquia");
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
