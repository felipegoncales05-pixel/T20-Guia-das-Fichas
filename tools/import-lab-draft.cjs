#!/usr/bin/env node
/* Converte um JSON exportado do laboratório em rascunho versionável.
   Não altera data.js, planned-data.js nem o estado de revisão editorial. */
const fs=require('node:fs');
const path=require('node:path');
const engine=require('../build-engine.js');
const input=process.argv[2];
if(!input){console.error('Uso: node tools/import-lab-draft.cjs <exportacao.json>');process.exit(2)}
try{
 const content=fs.readFileSync(input,'utf8');
 const sheet=engine.importJSON(content);
 const report=engine.evaluate(sheet);
 const folder=path.resolve(__dirname,'..','review-drafts');
 const target=path.join(folder,sheet.id+'.json');
 fs.mkdirSync(folder,{recursive:true});
 fs.writeFileSync(target,engine.exportJSON(sheet)+'\n',{flag:'wx'});
 console.log('Rascunho salvo em '+path.relative(path.resolve(__dirname,'..'),target));
 console.log('Status: revisão obrigatória; '+report.issues.length+' pendência(s).');
 for(const issue of report.issues)console.log('- '+issue);
}catch(error){console.error('Importação recusada: '+error.message);process.exitCode=1}
