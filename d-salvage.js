/* D. — correção visual definitiva: gambiarra de rua, NÃO cyberskeleton.
   A imagem é uma ilustração original gerada para este projeto, hospedada no próprio GitHub Pages. */
(()=>{
const c=window.T20_DATA?.characters?.find(x=>x.id==="d");if(!c)return;
const original=c.portrait?.url;
const asset="./assets/portraits/d-salvage.avif";
c.portrait={url:asset,credit:"Ilustração original para O Sistema: armadura improvisada de sucata local, gerada digitalmente",page:"https://github.com/felipegoncales05-pixel/T20-Guia-das-Fichas"};
c.excerpt="SCRAPFRAME // WASTELAND RIG • proteção improvisada soldada nas ruas, nunca cyberskeleton militar.";
c.label="STREET-RIG // SALVAGE ARMOR";
c.info.role="Netrunner · reparos de rua · armadura de sucata improvisada";
c.summary+=" A vestimenta final de D. é uma gambiarra de peças locais: placas irregulares parafusadas, cintas de contenção, cabos reutilizados, módulos pequenos e metal riscado; não é o cyberskeleton de David Martinez.";
c.history.push("Protocolo de equipamento: o traje de D. foi montado com sucata disponível, peças de origem diferente e reparos de Capri. Possui silhueta ágil e remendada; nenhum módulo militar de exoesqueleto pesado ou cyberskeleton faz parte do design final.");
c.notes.equipment+=" A armadura final é sucata local reaproveitada. Não é o cyberskeleton de David ou um exoesqueleto militar de fábrica.";
const gear=c.gear?.find(x=>/traje|armadura|exoesqueleto|cyberskeleton|cromo/i.test(x.name+" "+x.rule+" "+x.detail));
if(gear){
 gear.name="Scrapframe // armadura da Capri";
 gear.rule="Visual de armadura improvisada · regras de equipamento escolhido";
 gear.detail="Placas metálicas desiguais, peças mecânicas reaproveitadas, fitas, soldas visíveis, marcas amarelas gastas e cabos azulados. A estética de sucata não fornece Defesa adicional; aplique somente bônus de equipamento legal comprado ou construído.";
 gear.image=asset;gear.source=c.portrait.page;gear.credit=c.portrait.credit;
}else c.gear?.unshift({name:"Scrapframe // armadura da Capri",rule:"Visual improvisado; não é cyberskeleton",detail:"Sucata local e módulos consertados, sem bônus automáticos de armadura.",qty:"1",image:asset,source:c.portrait.page,credit:c.portrait.credit});
c.media=[{name:"D. — Scrapframe feito de sucata local",image:asset,source:c.portrait.page,credit:c.portrait.credit},...(c.media||[]).filter(x=>x.image!==original)];
c.sources.push({name:"Arte original da armadura Scrapframe neste projeto",url:c.portrait.page});
})();
