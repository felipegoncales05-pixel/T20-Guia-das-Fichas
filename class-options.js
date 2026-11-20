/* O SISTEMA // Fase IV. Metadados verificáveis e resolução conservadora.
   Identificar uma opção em um catálogo NÃO valida suas regras mecânicas. */
(()=>{
 "use strict";
 const herois="https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/";
 const jda="https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf";
 const baseNames={
  arcanista:"Arcanista",barbaro:"Bárbaro",bardo:"Bardo",bucaneiro:"Bucaneiro",
  cacador:"Caçador",cavaleiro:"Cavaleiro",clerigo:"Clérigo",druida:"Druida",
  guerreiro:"Guerreiro",inventor:"Inventor",ladino:"Ladino",lutador:"Lutador",
  nobre:"Nobre",paladino:"Paladino"
 };
 // Apenas quatro classes têm progressões codificadas no motor atual.
 const basics=Object.fromEntries(Object.entries(baseNames).map(([id,name])=>
  [id,{id,name,source:{book:"jda-1.3",edition:"v1.3",url:jda},
   status:["arcanista","guerreiro","ladino","lutador"].includes(id)?"parcial":"pendente",
   note:"Acesso a PV, PM, poderes, perícias e progressão depende de cadastro mecânico conferido."}]));
 basics.treinador={id:"treinador",name:"Treinador",source:{book:"herois",url:herois},
  status:"pendente",note:"Classe básica de Heróis de Arton; mecânica não verificada."};
 // A página da editora confirma os NOMES, não o parent/efeito de cada variante.
 const variants={
  alquimista:{id:"alquimista",name:"Alquimista",baseClassId:null,source:{book:"herois",url:herois},
   status:"pendente",note:"A filiação de classe, substituições e números precisam da edição adquirida."},
  necromante:{id:"necromante",name:"Necromante",baseClassId:null,source:{book:"herois",url:herois},
   status:"pendente",note:"É uma variante publicada; poderes e substituições não foram conferidos."},
  duelista:{id:"duelista",name:"Duelista",baseClassId:null,source:{book:"herois",url:herois},
   status:"pendente",note:"Não presumir classe base ou poderes por semelhança narrativa."}
 };
 const paths={
  arcanista:{
   bruxo:{id:"bruxo",name:"Bruxo",source:{book:"jda-1.3",page:"37",url:jda},status:"parcial"},
   mago:{id:"mago",name:"Mago",source:{book:"jda-1.3",page:"37",url:jda},status:"parcial"},
   feiticeiro:{id:"feiticeiro",name:"Feiticeiro",source:{book:"jda-1.3",page:"37",url:jda},status:"parcial",
    note:"Linhagens e habilidades ainda não codificadas; impedir aprovação."}
  }
 };
 const distinctions={
  "cavaleiro-corvo":{id:"cavaleiro-corvo",name:"Cavaleiro do Corvo",source:{book:"herois",url:herois},status:"pendente"},
  "guerreiro-magico":{id:"guerreiro-magico",name:"Guerreiro Mágico",source:{book:"herois",url:herois},status:"pendente"},
  "medico-salistick":{id:"medico-salistick",name:"Médico de Salistick",source:{book:"herois",url:herois},status:"pendente"}
 };
 const ADMISSIONS=["pretendida","admissao-pendente","admitida","incompativel"];
 const distinctItem=(raw={})=>({
  id:String(raw.id||"").slice(0,80),
  admission:ADMISSIONS.includes(raw.admission)?raw.admission:"pretendida",
  approval:String(raw.approval||"").slice(0,240),
  notes:String(raw.notes||"").slice(0,600),
  powerIds:Array.isArray(raw.powerIds)?[...new Set(raw.powerIds.filter(x=>typeof x==="string").slice(0,30))]:[]
 });
 function evaluateDistinctions(entries){
  const issues=[],details=[];
  for(const item of entries){
   const spec=distinctions[item.id];
   const validated=spec?.status==="verificado"&&spec?.source?.page&&spec?.powers;
   if(!validated){issues.push("Distinção "+(spec?.name||item.id)+": regras de admissão e poderes não verificadas; nenhum benefício concedido.");}
   else if(item.admission!=="admitida"||!item.approval.trim())issues.push("Distinção "+spec.name+": aprovação narrativa da mesa pendente.");
   else for(const powerId of item.powerIds)if(!spec.powers[powerId])issues.push("Poder de distinção "+powerId+" não cadastrado.");
   details.push({id:item.id,name:spec?.name||item.id,status:!validated?"bloqueada":item.admission,granted:validated&&item.admission==="admitida"&&!!item.approval.trim()?item.powerIds.filter(p=>!!spec.powers[p]):[]});
  }
  return {issues,details};
 }
 /*
  Registro mecânico extensível:
  {id,baseClassId,status:"verificado",source:{book,edition,page,url},
   stats:{initialPV,gainPV,gainPM},levels:{1:{remove:[...],add:[...]},...}}
  Uma regra verificada deve informar substituições com IDs existentes. Nunca
  acumular um grant substituído ao seu sucessor por engano.
 */
 function resolveClassStep({classId,classLevel,variantId="",classRule,abilities={},allowedBooks=["jda-1.3"],registry=variants}){
  const normal=(classRule?.grants?.[classLevel]||[]).slice();
  const result={grants:normal,retained:normal.slice(),removed:[],added:[],issues:[],
   calculable:true,powerFrom:classRule?.powerFrom,exclusivePowers:[],removedPowers:[],stats:classRule?{initialPV:classRule.initialPV,gainPV:classRule.gainPV,gainPM:classRule.gainPM}:null,variant:null};
  if(!variantId)return result;
  const variant=registry[variantId];
  result.variant=variant||null;
  if(!variant||variant.status!=="verificado"||variant.baseClassId!==classId
   ||!variant.source?.book||!variant.source?.edition||!variant.source?.page
   ||!allowedBooks.includes(variant.source.book)){
   result.issues.push("Variante "+(variant?.name||variantId)+": regra de substituição, filiação, página ou fonte não verificada/permitida.");
   result.calculable=false;return result;
  }
  if(variant.powerFrom!==undefined){
   if(!Number.isInteger(variant.powerFrom)||variant.powerFrom<1||variant.powerFrom>12){
    result.issues.push("Patamar de poder inválido na variante "+variant.name);
    result.calculable=false;return result;
   }
   result.powerFrom=variant.powerFrom;
  }
  result.exclusivePowers=(variant.powers?.exclusive||[]).slice();
  result.removedPowers=(variant.powers?.remove||[]).slice();
  if(result.exclusivePowers.some(id=>abilities[id]?.kind!=="poder"||abilities[id]?.classId!==variant.id||!abilities[id]?.manual)
    ||result.removedPowers.some(id=>abilities[id]?.kind!=="poder"||abilities[id]?.classId!==classId)){
   result.issues.push("Lista de poderes exclusivos/removidos inválida na variante "+variant.name);
   result.calculable=false;return result;
  }
  // Uma variante é uma progressão própria. Sem política registrada, não
  // presumir herança automática das habilidades da classe original.
  if(!["lista-explicita","substituicoes-verificadas"].includes(variant.grantPolicy)){
   result.issues.push("Variante "+variant.name+": política de preservação ausente; não herdar habilidades implicitamente.");
   result.calculable=false;return result;
  }
  const target=variant.levels?.[classLevel];
  if(variant.grantPolicy==="lista-explicita"&&!target){
   result.issues.push("Variante "+variant.name+": tabela explícita ausente no nível de classe "+classLevel+".");
   result.calculable=false;return result;
  }
  const remove=target?.remove||[],add=target?.add||[];
  const keep=variant.grantPolicy==="lista-explicita"?(target?.keep||[]):normal.filter(id=>!remove.includes(id));
  if(remove.some(id=>!normal.includes(id))
   ||keep.some(id=>!normal.includes(id))
   ||new Set(keep).size!==keep.length
   ||add.some(id=>!abilities[id]?.manual)
   ||new Set(add).size!==add.length
   ||add.some(id=>keep.includes(id))
   ||(variant.grantPolicy==="lista-explicita"&&remove.some(id=>keep.includes(id)))){
   result.issues.push("Variante "+variant.name+": substituições inconsistentes no nível de classe "+classLevel+".");
   result.calculable=false;return result;
  }
  result.retained=keep.slice();
  result.removed=normal.filter(id=>!keep.includes(id));
  result.added=add.slice();result.grants=[...result.retained,...result.added];
  if(variant.stats)for(const key of ["initialPV","gainPV","gainPM"]){
   if(Object.prototype.hasOwnProperty.call(variant.stats,key)){
    if(!Number.isFinite(variant.stats[key])||variant.stats[key]<0){result.calculable=false;result.issues.push("PV/PM inválidos na variante "+variant.name+".")}
    else result.stats[key]=variant.stats[key];
   }
  }
  return result;
 }
 function recommend(sheet,rulebook){
  const first=sheet.levels?.find(x=>x.classId)?.classId||"";
  const compatible=Object.values(variants).filter(v=>v.status==="verificado"&&v.baseClassId===first&&sheet.allowedBooks?.includes(v.source?.book));
  const status=compatible.length?"comparar":"sem-variantes-verificadas";
  return {status,current:first,variants:compatible.map(v=>({id:v.id,name:v.name,source:v.source})),
   paths:first==="arcanista"?Object.values(paths.arcanista).map(x=>({id:x.id,name:x.name,status:x.status})):[],
   note:compatible.length?"Compare perdas, ganhos e pré-requisitos antes de decidir.":"Nenhuma variante mecanicamente verificada para esta classe. Não gerar otimização fictícia."};
 }
 const api={basics,variants,paths,distinctions,ADMISSIONS,distinctItem,evaluateDistinctions,resolveClassStep,recommend};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 if(typeof window!=="undefined")window.T20_CLASS_OPTIONS=api;
})();
