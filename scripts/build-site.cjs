/* O Sistema // T20 — reconstrução determinística dos bundles de produção.
 * node scripts/build-site.cjs [--check]
 * Arquivos fonte permanecem editáveis; bundles são ativos no GitHub Pages. */
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const css=["styles.css","responsive.css","rentarou.css","expansion.css","mega.css","catalog.css","character-art.css","card-worlds.css","review.css","visual-direction.css","signature-finish.css","planned.css","art-portraits.css","build-lab.css","performance.css"];
const js=["data.js","guide.js","rentarou-guide.js","expansion.js","expansion-runtime.js","mega-data.js","mega-runtime.js","catalog-media.js","acheron-samurai.js","heroes-custom.js","d-salvage.js","user-gallery.js","local-media.js","character-art.js","catalog-cover-art.js","review-data.js","visual-direction.js","planned-data.js","build-concepts.js","rules-catalog.js","class-options.js","herois-variants.js","build-engine.js","build-presets.js","automatic-dossiers.js","archive-revisions.js","catalog-revision.js","umamusume-data.js","umamusume-runtime.js","crossovers-data.js","crossovers-runtime.js","wave7-data.js","wave7-fate.js","wave8-data.js","wave7-forms.js","wave7-art.js","wave7-runtime.js","build-lab.js","app.js","card-worlds.js","remote-portraits.js"];
function read(p){return fs.readFileSync(path.join(root,p),"utf8")}
function assemble(){
 const cssOutput=css.map(p=>"/* "+p+" */\n"+read(p)+"\n").join("");
 const chunks=[[0,13,"site-core.bundle.js"],[13,26,"site-engine.bundle.js"],[26,41,"site-expansion.bundle.js"]];
 const output=[["site.min.css",cssOutput]];
 for(const [from,to,name] of chunks){
  const body=js.slice(from,to).map(p=>"\n/* "+p+" */\n"+read(p)+"\n").join("");
  new vm.Script(body,{filename:name});
  output.push([name,body]);
 }
 return output;
}
function main(){
 const check=process.argv.includes("--check");let errors=0;
 for(const [name,body] of assemble()){
  const pathname=path.join(root,name);
  const current=fs.existsSync(pathname)?fs.readFileSync(pathname,"utf8"):null;
  if(check){
   if(current!==body){console.error("DESATUALIZADO: "+name);errors++;}
  }else{fs.writeFileSync(pathname,body);console.log("GERADO: "+name+" ("+body.length+" caracteres)")}
 }
 if(check&&errors)process.exitCode=1;
 else if(check)console.log("Bundles consistentes.");
}
if(require.main===module)main();
module.exports={js,css,assemble};
