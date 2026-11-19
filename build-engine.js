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
  catalogId:short(seed.catalogId,60),name:short(seed.name||"Nova ficha",100),work:short(seed.work,100),description:"",theme:short(seed.theme||"arquivo",30),raceId:"",raceBonuses:[],originId:"",originBenefits:[],trainedSkills:[],arcanePath:"",spellbook:[],allowedBooks:["jda-1.3"],attributes:Object.fromEntries(KEYS.map(k=>[k,0])),levels:[emptyLevel()],inventory:[],combat:Object.fromEntries(COMBAT.map(k=>[k,""])),notes:"",status:"rascunho"});
 function normalize(raw){
  if(!raw||typeof raw!=="object"||raw.schemaVersion!==VERSION||!/^local-[a-z0-9-]{8,70}$/.test(raw.id||""))throw Error("Formato de ficha local inválido.");
  if(!Array.isArray(raw.levels)||!raw.levels.length||raw.levels.length>MAX_LEVEL||!Array.isArray(raw.allowedBooks)||!Array.isArray(raw.inventory))throw Error("Progressão ou livros inválidos.");
  if(raw.inventory.length>80)throw Error("Inventário excede o limite de 80 registros.");
  const clean=makeDraft({id:raw.id,catalogId:raw.catalogId,name:raw.name,work:raw.work,theme:raw.theme});
  clean.description=short(raw.description,1000);clean.notes=short(raw.notes,2000);
  clean.combat=Object.fromEntries(COMBAT.map(k=>[k,short(raw.combat?.[k],2000)]));
  clean.raceId=short(raw.raceId,40);clean.originId=short(raw.originId,40);
  clean.originBenefits=Array.isArray(raw.originBenefits)?raw.originBenefits.slice(0,2).map(x=>short(x,70)):[];
  clean.trainedSkills=Array.isArray(raw.trainedSkills)?[...new Set(raw.trainedSkills.slice(0,25).map(x=>short(x,70)))]:[];
  clean.arcanePath=["mago","bruxo","feiticeiro"].includes(raw.arcanePath)?raw.arcanePath:"";
  clean.spellbook=Array.isArray(raw.spellbook)?raw.spellbook.slice(0,45).map(x=>({name:short(x?.name,80),circle:Number(x?.circle)||0,classLevel:Number(x?.classLevel)||0,why:short(x?.why,350),how:short(x?.how,400),source:short(x?.source,120)})).filter(x=>x.name):[];
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
  const arcaneSpells=new Set([
    ["Criar Ilusão",1],["Hipnotismo",1],["Sono",1],["Enfeitiçar",1],["Disfarce Ilusório",1],["Imagem Espelhada",1],["Adaga Mental",1],
    ["Armadura Arcana",1],["Seta Infalível de Talude",1],["Teia",1],["Amedrontar",1],["Leque Cromático",1],["Explosão de Chamas",1],["Conjurar Monstro",1],
    ["Invisibilidade",2],["Sussurros Insanos",2],["Campo de Força",2],["Camuflagem Ilusória",2],["Aparência Perfeita",2],
    ["Bola de Fogo",2],["Velocidade",2],["Metamorfose",2],["Dissipar Magia",2],["Toque Vampírico",2],["Desespero Esmagador",2],
    ["Ilusão Lacerante",3],["Miragem",3],["Imobilizar",3]
   ].map(([name,circle])=>name+"|"+circle));
  if(!allowed.has("jda-1.3"))issues.push("A edição básica verificada precisa estar permitida para usar estas classes.");
  for(const id of allowed){const book=rules.books.find(b=>b.id===id);if(book?.status!=="parcial")issues.push(book.name+": opções mecânicas ainda não catalogadas; a autorização da mesa não as verifica.")}
  let cost=0;for(const k of KEYS)cost+=rules.pointBuy[sheet.attributes[k]];
  if(cost>rules.pointBudget)issues.push("Compra de atributos excede 10 pontos ("+cost+").");
  if(cost<rules.pointBudget)issues.push("Compra de atributos incompleta: "+cost+" de 10 pontos usados.");
  if(sheet.raceId&&sheet.raceId!=="humano")issues.push("Raça sem regras cadastradas neste catálogo.");
  if(!sheet.raceId)issues.push("Raça ainda não escolhida.");
  if(sheet.raceId==="humano"&&(sheet.raceBonuses.length!==3||new Set(sheet.raceBonuses).size!==3))issues.push("Humano exige três atributos diferentes para o bônus racial.");
  const origin=rules.origins?.[sheet.originId];
  if(!origin)issues.push("Origem não cadastrada ou pendente.");
  else if(sheet.originBenefits.length!==2||sheet.originBenefits.some(x=>!origin.choices.includes(x)))issues.push("Escolha exatamente dois benefícios de perícia válidos da origem "+origin.name+".");
  const arcanistLevels=sheet.levels.filter(x=>x.classId==="arcanista").length;
  if(arcanistLevels&&!sheet.arcanePath)issues.push("Arcanista exige caminho definido: Bruxo, Mago ou Feiticeiro.");
  if(sheet.arcanePath==="feiticeiro"&&arcanistLevels)issues.push("Feiticeiro: linhagem e habilidades próprias ainda não cadastradas.");
  for(const spell of sheet.spellbook){
   if(!arcaneSpells.has(spell.name+"|"+spell.circle))issues.push("Magia "+spell.name+": círculo/nome não indexado neste laboratório.");
   if(!spell.classLevel||spell.classLevel>arcanistLevels||spell.classLevel<1+4*(spell.circle-1))issues.push("Magia "+spell.name+": círculo não liberado no nível da classe Arcanista.");
   if(!spell.why.trim()||!spell.how.trim())issues.push("Magia "+spell.name+": explique escolha e uso.");
  }
  const attrs=Object.fromEntries(KEYS.map(k=>[k,sheet.attributes[k]+(sheet.raceId==="humano"&&sheet.raceBonuses.includes(k)?1:0)]));
  let pv=0,pm=0,canCalculate=true;
  for(let i=0;i<sheet.levels.length;i++){
   const row=sheet.levels[i],cls=rules.classes[row.classId];
   if(row.customPowerName){
    const book=rules.books.find(b=>b.id===row.customPowerBook);
    if(!book||!allowed.has(book.id))issues.push("Nível "+(i+1)+": suplemento da opção "+row.customPowerName+" não selecionado ou não cadastrado.");
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
   if(row.classId==="arcanista"&&classLevel===1)pm+=(sheet.arcanePath==="feiticeiro"?attrs.CAR:attrs.INT);
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
     if(selected.has(row.powerId)&&!ability.repeatable)issues.push("Nível "+(i+1)+": poder repetido sem regra que permita repetição.");
     for(const requiredPower of ability.requires?.powers||[])if(!selected.has(requiredPower))issues.push("Nível "+(i+1)+": "+ability.name+" requer o poder "+(rules.abilities[requiredPower]?.name||requiredPower)+".");
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
  if(sheet.raceId==="humano"&&!sheet.trainedSkills.length)issues.push("Humano: identifique perícias treinadas e o benefício Versátil escolhido.");
  // Poderes, magias e opções de origem não alteram automaticamente os subtotais acima.
  // O subtotal não inclui efeitos condicionais, origens, magias, distinções ou erratas.
  return {sheet,attributes:attrs,attributeCost:cost,rows,levelsByClass:counts,basePV:canCalculate?pv:null,basePM:canCalculate?pm:null,
   issues:[...new Set(issues)],complete:false,summary:"Subtotal de PV/PM por níveis de classe, Constituição e atributo-chave de Arcanista; poderes, itens, origem e ajustes situacionais não incluídos."};
 }
 function importJSON(json){if(typeof json!=="string"||json.length>250000)throw Error("Arquivo muito grande.");return normalize(JSON.parse(json))}
 function exportJSON(sheet){return JSON.stringify(normalize(sheet),null,2)}
 const api={VERSION,KEYS,MAX_LEVEL,makeDraft,emptyLevel,normalize,evaluate,importJSON,exportJSON,rules};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 if(typeof window!=="undefined")window.T20_BUILD_ENGINE=api;
})();
