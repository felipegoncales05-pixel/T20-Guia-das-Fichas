/* Registro editorial local. Nenhuma decisão vem aprovada por padrão.
   O exportador permite transportar as anotações entre navegadores. */
(()=>{
  "use strict";
  const KEY="t20-guia-revisao-v1";
  const TYPES=["fonte","regra","decisão","pendência","correção"];
  const STATUSES=["pendente","aprovado"];
  let records=[];
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||"[]");
    if(Array.isArray(saved))records=saved.filter(valid).slice(0,2000);
  }catch{ /* Ambiente sem armazenamento: a sessão continua editável. */ }
  function valid(r){return r&&typeof r.id==="string"&&typeof r.title==="string"&&typeof r.body==="string"&&TYPES.includes(r.type)&&STATUSES.includes(r.status)&&typeof r.character==="string"&&typeof r.variant==="string"&&typeof r.url==="string"&&typeof r.page==="string"&&typeof r.createdAt==="string"}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(records))}catch{return false}return true}
  function add(input){
    const record={id:globalThis.crypto?.randomUUID?.()||String(Date.now())+Math.random().toString(36).slice(2),
      type:TYPES.includes(input.type)?input.type:"pendência",status:"pendente",
      title:String(input.title||"").trim().slice(0,160),body:String(input.body||"").trim().slice(0,2000),
      character:String(input.character||"geral").slice(0,80),variant:String(input.variant||"principal").slice(0,80),
      url:/^https:\/\//.test(input.url||"")?String(input.url).slice(0,1000):"",
      page:String(input.page||"").trim().slice(0,100),createdAt:new Date().toISOString()};
    if(!record.title||!record.body)throw Error("Título e descrição são obrigatórios.");
    records.unshift(record);save();return record;
  }
  function change(id,status){const item=records.find(r=>r.id===id);if(!item||!STATUSES.includes(status))return false;item.status=status;save();return true}
  function remove(id){const before=records.length;records=records.filter(r=>r.id!==id);if(before===records.length)return false;save();return true}
  function importRecords(json){const parsed=JSON.parse(json);if(!Array.isArray(parsed)||parsed.length>2000||!parsed.every(valid))throw Error("Arquivo de revisão inválido.");records=parsed;save();return records.length}
  window.T20_REVIEW={list:()=>records.slice(),add,change,remove,importRecords,exportRecords:()=>JSON.stringify(records,null,2),types:TYPES};
})();
