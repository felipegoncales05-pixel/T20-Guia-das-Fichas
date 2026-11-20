/* FASE IV // Manifesto de auditoria dos 69 dossiês e quatro versões extras.
   Não altera os personagens: congela a referência original e lista pendências. */
(()=>{
 "use strict";
 const data=window.T20_DATA;
 if(!data||!Array.isArray(data.characters))return;
 const engine=window.T20_BUILD_ENGINE,books=window.T20_RULES;
 const commit="0ef894e9e6ddde95133ff8bcbfc400dc1b399d5d";
 const clone=value=>JSON.parse(JSON.stringify(value??null));
 const getGuide=c=>c?c._guide||window.T20_GUIDE?.people?.[c.id]||{levels:[]}:null;
 const list=[...data.characters.map(c=>({key:c.id,version:"principal",character:c,guide:getGuide(c)}))];
 const diego=window.T20_ALTERNATES?.diego?.alternative;
 if(diego)list.push({key:"diego:alternative",version:"THE WORLD",character:diego,
  guide:window.T20_ALTERNATE_GUIDES?.diego||getGuide(diego)});
 const goku=window.T20_GOKU_VARIANTS||{};
 for(const id of ["gt","daima","super"])if(goku[id])list.push({key:"goku:"+id,version:id.toUpperCase(),character:goku[id],guide:getGuide(goku[id])});
 const entries=list.map(({key,version,character:c,guide})=>{
  const draft=c?._auto?.draft||null;
  let evaluation=null;
  if(draft)try{const result=engine.evaluate(draft);evaluation={
   levels:result.rows.length,issues:result.issues,
   basePV:result.basePV,basePM:result.basePM,
   classes:result.levelsByClass,classVariants:result.classVariants,
   complete:result.complete
  }}catch(error){evaluation={error:String(error.message||error)}}
  const progression=Array.isArray(c.progression)?c.progression:[];
  const guideLevels=Array.isArray(guide?.levels)?guide.levels:[];
  const reasons=[];
  if(progression.length!==12)reasons.push("Progressão do dossiê não contém 12 níveis.");
  if(guideLevels.length!==12)reasons.push("Guia não contém 12 explicações de nível.");
  if(!draft)reasons.push("Não há build normalizada no motor; texto do dossiê não comprova legalidade mecânica.");
  else reasons.push("Proposta do laboratório ainda é rascunho, não aprovada mecanicamente.");
  if(evaluation?.issues?.length)reasons.push("O motor aponta "+evaluation.issues.length+" pendências.");
  const oldBuild=draft?draft.levels.map((x,i)=>({globalLevel:i+1,classId:x.classId,variantId:x.variantId,powerId:x.powerId,
   why:x.why,usage:x.usage,sourceNote:x.sourceNote})):[];
  return {
   id:key,characterId:c.id,version,name:c.name,work:c.universe,category:c.catalogCategory,
   portrait:c.portrait?.url||null,
   oldBuildDescription:c.info?.className||c.info?.class||c._auto?.classPath||null,
   previousLevels:oldBuild,progressionLength:progression.length,guideLevels:guideLevels.length,
   sourceCount:Array.isArray(c.sources)?c.sources.length:0,
   evaluation,decision:"AGUARDANDO FONTE / DECISÃO DA MESA",
   proposedChange:null,guideDecision:"PRESERVAR ATÉ VALIDAÇÃO",
   technicalStatus:progression.length===12&&guideLevels.length===12?"estrutura-presente":"estrutura-incompleta",
   mechanicalStatus:"não-validado",narrativeStatus:"revisão-individual-pendente",
   editorialStatus:"pendente",reasons
  };
 });
 const ids=entries.map(x=>x.id);
 const validation={
  expectedMain:69,actualMain:data.characters.length,
  expectedVariants:4,actualVariants:entries.length-data.characters.length,
  uniqueIds:new Set(ids).size===ids.length,
  allHaveTwelveLevels:entries.every(x=>x.progressionLength===12),
  approvedCount:entries.filter(x=>x.editorialStatus==="aprovado").length
 };
 const backup={
  originCommit:commit,kind:"backup-editorial-leitura",
  count:list.length,
  original:list.map(x=>({id:x.key,version:x.version,character:clone(x.character),guide:clone(x.guide)}))
 };
 const report={title:"O SISTEMA // FASE IV — AUDITORIA",originalCommit:commit,
  preserved:true,validation,entries};
 const save=(value,fileName)=>{
  const a=document.createElement("a"),blob=new Blob([JSON.stringify(value,null,2)],{type:"application/json"});
  a.href=URL.createObjectURL(blob);a.download=fileName;a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
 };
 window.T20_CLASS_REVIEW={report,backup,
  entries:()=>entries.map(clone),
  exportReport:()=>save(report,"t20-fase-iv-auditoria-73-registros.json"),
  exportBackup:()=>save(backup,"t20-fase-iv-backup-dossies.json")};
})();
