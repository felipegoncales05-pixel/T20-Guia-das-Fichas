/* Diagnóstico reproduzível do manifesto de imagens do catálogo. */
const assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const {js}=require("../scripts/build-site.cjs");
const context={window:{}};
for(const file of js){
 if(["build-lab.js","app.js","remote-portraits.js"].includes(file))break;
 vm.runInNewContext(fs.readFileSync(file,"utf8"),context,{filename:file});
}
const w=context.window,catalog=w.T20_DATA.characters;
const covers=w.T20_CATALOG_COVERS||{};
const errors=[],hosts=new Map(),externalOnly=[],dataPosters=[];
let local=0,remote=0,poster=0,checked=0;
const isRemote=s=>/^https:\/\//.test(s||"");
const isPoster=s=>/^data:image\/svg\+xml/.test(s||"");
const resolved=s=>{
 const clean=String(s||"").split(/[?#]/)[0];
 if(!clean.startsWith("./assets/"))return null;
 return path.join(process.cwd(),clean.slice(2));
};
function checkMedia(value,label,required=true){
 const src=String(value||"");
 if(!src){if(required)errors.push(label+" sem fonte");return}
 checked++;
 const file=resolved(src);
 if(file){
  local++;
  if(!fs.existsSync(file))errors.push(label+" aponta para arquivo ausente: "+src);
  else if(fs.statSync(file).size<20)errors.push(label+" aponta para arquivo vazio: "+src);
 }else if(isRemote(src)){
  remote++;
  const host=new URL(src).hostname;hosts.set(host,(hosts.get(host)||0)+1);
 }else if(isPoster(src)){poster++;dataPosters.push(label)}
 else errors.push(label+" usa URL não reconhecida: "+src.slice(0,120));
}
assert.equal(catalog.length,319,"O catálogo não contém 319 fichas");
for(const c of catalog){
 const portrait=c.portrait||{};
 checkMedia(portrait.url,c.id+" / retrato");
 if(portrait.fallback)checkMedia(portrait.fallback,c.id+" / pôster reserva");
 if(isRemote(portrait.url)&&!portrait.fallback)externalOnly.push(c.id);
 for(const [i,item] of (c.media||[]).entries())checkMedia(item.image,c.id+" / galeria "+i,false);
 for(const [i,item] of (c.gear||[]).entries())if(item.image)checkMedia(item.image,c.id+" / equipamento "+i,false);
}
for(const [id,entry] of Object.entries(covers)){
 checkMedia(entry.image,"capa "+id);
 assert.ok(entry.source,"Capa "+id+" sem crédito de fonte");
}
console.log("MÍDIAS "+JSON.stringify({characters:catalog.length,checked,local,remote,poster,remoteWithoutLocalFallback:externalOnly.length,topRemoteHosts:[...hosts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,16)}));
console.log("RETRATOS EXTERNOS SEM RESERVA DECLARADA: "+externalOnly.slice(0,50).join(", ")+(externalOnly.length>50?" ...":""));
if(errors.length){console.error("ASSETS AUSENTES: "+errors.slice(0,50).join("\n"));process.exitCode=1}
else console.log("OK: referências a arquivos locais verificadas; fontes remotas exigem testes de rede separados.");
