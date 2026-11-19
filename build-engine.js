/* O Sistema // motor conservador do laboratório. Nunca usa a última classe
   para recalcular os níveis anteriores nem promove um rascunho a aprovado. */
(()=>{
 "use strict";
 const rules=typeof module!=="undefined"&&module.exports?require("./rules-catalog.js"):window.T20_RULES;
 const KEYS=["FOR","DES","CON","INT","SAB","CAR"],MAX_LEVEL=12,VERSION=1;
 const COMBAT=["style","opening","combos","resources","strengths","weaknesses","evolution"];
 const short=(v,n=500)=>String(v??"").slice(0,n);
 const emptyLevel=()=>({classId:"",variantId:"",powerId:"",powerVersion:"",why:"",usage:"",synergy:"",limits:"",sourceNote:"",
  customPowerName:"",customPowerBook:"",customPowerPage:"",customPowerEdition:"",customPowerPrereqs:"",customPowerEffect:"",customPowerVersions:"",customPowerAmbiguity:""});
 const makeDraft=(seed={})=>({schemaVersion:VERSION,id:seed.id&&/^local-[a-z0-9-]{8,70}$/.test(seed.id)?seed.id:"local-"+(globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2)),
  catalogId:short(seed.catalogId,60),name:short(seed.name||"Nova ficha",100),work:short(seed.work,100),description:"",theme:short(seed.theme||"arquivo",30),raceId:"",raceBonuses:[],originId:"",allowedBooks:["jda-1.3"],attributes:Object.fromEntries(KEYS.map(k=>[k,0])),levels:[emptyLevel()],inventory:[],combat:Object.fromEntries(COMBAT.map(k=>[k,""])),notes:"",status:"rascunho"});
 function normalize(raw){
  if(!raw||typeof raw!=="object"||raw.schemaVersion!==VERSION||!/^local-[a-z0-9-]{8,70}$/.test(raw.id||""))throw Error("Formato de ficha local inválido.");
  if(!Array.isArray(raw.levels)||!raw.levels.length||raw.levels.length>MAX_LEVEL||!Array.isArray(raw.allowedBooks)||!Array.isArray(raw.inventory))throw Error("Progressão ou livros inválidos.");
  if(raw.inventory.length>80)throw Error("Inventário excede o limite de 80 registros.");
  const clean=makeDraft({id:raw.id,catalogId:raw.catalogId,name:raw.name,work:raw.work,theme:raw.theme});
  clean.description=short(raw.description,1000);clean.notes=short(raw.notes,2000);
  clean.combat=Object.fromEntries(COMBAT.map(k=>[k,short(raw.combat?.[k],2000)]));
  clean.raceId=short(raw.raceId,40);clean.originId=short(raw.originId,40);
  clean.raceBonuses=Array.isArray(raw.raceBonuses)?raw.raceBonuses.filter(k=>KEYS.includes(k)).slice(0,6):[];
  clean.allowedBooks=[...new Set(raw.allowedBooks.map(x=>short(x,40)))];
  if(clean.allowedBooks.some(id=>!rules.books.some(b=>b.id===id)))throw Error("Livro não cadastrado na edição do laboratório.");
  for(const key of KEYS){const v=raw.attributes?.[key];clean.attributes[key]=Number.isInteger(v)&&v>=-1&&v<=4?v:0}
  clean.levels=raw.levels.map(row=>Object.fromEntries(Object.keys(emptyLevel()).map(key=>[key,short(row?.[key],["classId","variantId","powerId","powerVersion"].includes(key)?60:600)])));
  clean.inventory=raw.inventory.map(item=>({name:short(item?.name,100),note:short(item?.note,300),quantity:Math.min(99,Math.max(1,Number.parseInt(item?.quantity,10)||1))})).filter(x=>x.name);
  return clean;
 }
 function evaluate(raw){
  const sheet=normalize(raw),issues=[],rows=[],counts={},selected=new Set();
  const allowed=new Set(sheet.allowedBooks);
  if(!allowed.has("jda-1.3"))issues.push("A edição básica verificada precisa estar permitida para usar estas classes.");
  for(const id of allowed){const book=rules.books.find(b=>b.id===id);if(book?.status!=="parcial")issues.push(book.name+": opções mecânicas ainda não catalogadas; a autorização da mesa não as verifica.")}
  let cost=0;for(const k of KEYS)cost+=rules.pointBuy[sheet.attributes[k]];
  if(cost>rules.pointBudget)issues.push("Compra de atributos excede 10 pontos ("+cost+").");
  if(cost<rules.pointBudget)issues.push("Compra de atributos incompleta: "+cost+" de 10 pontos usados.");
  if(sheet.raceId&&sheet.raceId!=="humano")issues.push("Raça sem regras cadastradas neste catálogo.");
  if(!sheet.raceId)issues.push("Raça ainda não escolhida.");
  if(sheet.raceId==="humano"&&(sheet.raceBonuses.length!==3||new Set(sheet.raceBonuses).size!==3))issues.push("Humano exige três atributos diferentes para o bônus racial.");
  if(sheet.originId)issues.push("Origem informada sem regras cadastradas nesta edição do laboratório.");
  else issues.push("Origem e seus benefícios ainda não foram conferidos no catálogo.");
  const attrs=Object.fromEntries(KEYS.map(k=>[k,sheet.attributes[k]+(sheet.raceId==="humano"&&sheet.raceBonuses.includes(k)?1:0)]));
  let pv=0,pm=0,canCalculate=true;
  for(let i=0;i<sheet.levels.length;i++){
   const row=sheet.levels[i],cls=rules.classes[row.classId];
   if(row.customPowerName){
    const book=rules.books.find(b=>b.id===row.customPowerBook);
    if(!book||!allowed.has(book.id))issues.push("Nível "+(i+1)+": suplemento da opção ""+row.customPowerName+"" não selecionado ou não cadastrado.");
    if(!row.customPowerPage.trim()||!row.customPowerEdition.trim()||!row.customPowerPrereqs.trim()||!row.customPowerEffect.trim())
     issues.push("Nível "+(i+1)+": opção de suplemento exige página, edição, pré-requisitos e efeito conferidos.");
    if(!row.why.trim()||!row.usage.trim())issues.push("Nível "+(i+1)+": descreva por que escolheu e como usaria a opção do suplemento.");
    if(row.customPowerVersions.trim()&&!row.customPowerAmbiguity.trim())issues.push("Nível "+(i+1)+": registre quais versões divergem e a interpretação adotada.");
    issues.push("Nível "+(i+1)+": opção de suplemento em revisão editorial, sem efeito automático no cálculo: "+row.customPowerName+".");
   }
   if(row.variantId){issues.push("Nível "+(i+1)+": variante de classe sem regra de substituição e compatibilidade cadastrada.");canCalculate=false}
   if(!cls||!allowed.has(cls?.source.book)){
    issues.push("Nível "+(i+1)+": classe ausente ou livro não permitido.");
    canCalculate=false;rows.push({globalLevel:i+1,classId:row.classId,classLevel:null,pv:null,pm:null,grants:[],choice:null,firstClass:false});continue;
   }
   counts[row.classId]=(counts[row.classId]||0)+1;
   const classLevel=counts[row.classId],firstClass=i===0;
   // A primeira entrada numa classe adicional usa o ganho subsequente de PV.
   const hpDelta=firstClass?cls.initialPV+attrs.CON:Math.max(1,cls.gainPV+attrs.CON);
   pv+=hpDelta;pm+=cls.gainPM;
   const grants=(cls.grants[classLevel]||[]).map(id=>({id,ability:rules.abilities[id]||null}));
   for(const grant of grants)if(!grant.ability?.manual)issues.push("Nível "+(i+1)+": manual de "+grant.id+" ainda não integrado.");
   if(grants.length&&(!row.why.trim()||!row.usage.trim()))issues.push("Nível "+(i+1)+": registre por que e como usa os ganhos automáticos desta classe.");
   if(classLevel>=cls.powerFrom){
    if(!row.powerId)issues.push("Nível "+(i+1)+": escolha de poder de "+cls.name+" pendente.");
   }else if(row.powerId)issues.push("Nível "+(i+1)+": não há escolha de poder nesta entrada de classe.");
   const ability=rules.abilities[row.powerId];
   if(row.powerId){
    if(!ability||ability.kind!=="poder"||ability.classId!==row.classId||!allowed.has(ability.source.book))issues.push("Nível "+(i+1)+": poder inexistente ou incompatível com a classe/livro.");
    else{
     if(selected.has(row.powerId))issues.push("Nível "+(i+1)+": poder repetido sem regra que permita repetição.");
     selected.add(row.powerId);
     if(ability.requires?.classLevel>classLevel)issues.push("Nível "+(i+1)+": "+ability.name+" requer nível "+ability.requires.classLevel+" de "+cls.name+".");
     for(const [key,min] of Object.entries(ability.requires?.attributes||{}))if(attrs[key]<min)issues.push("Nível "+(i+1)+": "+ability.name+" requer "+key+" "+min+".");
     if(!row.why.trim()||!row.usage.trim())issues.push("Nível "+(i+1)+": justifique a escolha e descreva o uso de "+ability.name+".");
     if(row.powerVersion){const version=ability.versions?.find(v=>v.id===row.powerVersion);if(!version||classLevel<version.minClassLevel)issues.push("Nível "+(i+1)+": versão indisponível de "+ability.name+".")}
    }
   }
   rows.push({globalLevel:i+1,classId:row.classId,classLevel,firstClass,pv:canCalculate?pv:null,pm:canCalculate?pm:null,hpDelta,pmDelta:cls.gainPM,grants,choice:ability||null,
    newClass:classLevel===1&&!firstClass,source:cls.source,reason:row.why,usage:row.usage});
  }
  if(!sheet.name.trim())issues.push("Nome obrigatório.");
  if(sheet.raceId==="humano")issues.push("Versátil humano: escolha de perícias ou poder geral ainda não integrada.");
  // O subtotal não inclui efeitos condicionais, origens, magias, distinções ou erratas.
  return {sheet,attributes:attrs,attributeCost:cost,rows,levelsByClass:counts,basePV:canCalculate?pv:null,basePM:canCalculate?pm:null,
   issues:[...new Set(issues)],complete:false,summary:"PV/PM de classe e Constituição; modificadores de outros recursos não incluídos."};
 }
 function importJSON(json){if(typeof json!=="string"||json.length>250000)throw Error("Arquivo muito grande.");return normalize(JSON.parse(json))}
 function exportJSON(sheet){return JSON.stringify(normalize(sheet),null,2)}
 const api={VERSION,KEYS,MAX_LEVEL,makeDraft,emptyLevel,normalize,evaluate,importJSON,exportJSON,rules};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 if(typeof window!=="undefined")window.T20_BUILD_ENGINE=api;
})();
