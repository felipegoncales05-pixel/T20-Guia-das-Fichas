/* Cálculos de níveis para os novos dossiês — sem alterar os cinco originais. */
(()=>{
const expanded=new Set(["yoru","diego","ado","cyrene","marin","makima","optimus"]);
const val=(c,k)=>c.attrs.find(x=>x.key===k)?.value||0;
const delta=(c,n,k)=>{
 if(c.id==="d"&&k==="INT"&&n>=12)return 1;
 if(c.id==="david"&&k==="FOR"&&n>=7)return 1;
 if(c.id==="rentarou"&&k==="CAR")return (n>=5?1:0)+(n>=11?1:0);
 if(c.id==="yoru")return (k==="INT"&&n>=8)||(k==="DEX"&&n>=9)||(k==="FOR"&&n>=11)||(k==="CON"&&n>=12)?1:0;
 if(c.id==="diego"&&c.theme==="diego"&&k==="SAB"&&n>=10)return 1;
 if(c.id==="ado"&&k==="CAR")return(n>=5?1:0)+(n>=11?1:0);
 if(c.id==="cyrene"&&k==="CAR"&&n>=10)return 1;
 if(c.id==="marin"&&k==="CAR")return(n>=5?1:0)+(n>=11?1:0);
 if(c.id==="marin"&&k==="INT"&&n>=9)return 1;
 if(c.id==="makima"&&k==="CAR"&&n>=8)return 1;
 if(c.id==="optimus"&&k==="FOR"&&n>=5)return 1;
 if(c.id==="optimus"&&k==="CON"&&n>=10)return 1;
 return 0;
};
const trained=(n)=>n>=7?4:2;
const signed=(n)=>(n>=0?"+":"")+n;
const attrBySkill={
 "Luta":"FOR","Pontaria":"DEX","Fortitude":"CON","Reflexos":"DEX","Vontade":"SAB","Iniciativa":"DEX","Cavalgar":"DEX","Furtividade":"DEX","Acrobacia":"DEX","Atletismo":"FOR","Percepção":"SAB","Intuição":"SAB","Sobrevivência":"SAB","Adestramento":"CAR","Atuação":"CAR","Diplomacia":"CAR","Enganação":"CAR","Intimidação":"CAR","Misticismo":"INT","Investigação":"INT","Conhecimento":"INT","Guerra":"INT","Ofício (armeiro)":"INT","Ofício (engenhoqueiro)":"INT","Ofício (maquiagem)":"INT","Ofício (costureira)":"INT","Ladinagem":"DEX"
};
const stats=(c,n)=>{
 const a=(k)=>val(c,k)+delta(c,n,k);
 const half=Math.floor(n/2),con=a("CON"),car=a("CAR"),str=a("FOR"),dex=a("DEX"),int=a("INT");
 const o={level:n,pv:c.stats.pv+(n-1)*c.stats.hpGain,pm:c.stats.pm+(n-1)*c.stats.pmGain,defense:c.stats.defense+delta(c,n,"DEX"),move:c.stats.speed,
 attack:"—",damage:"Conforme habilidade",extra:"",magicDC:null,attributeInt:int,attributeStr:str,floor:half,training:trained(n),explanation:""};
 if(c.id==="yoru"){
  o.pv+=n>=12?n:0;
  o.attack=signed(str+2+half+(n>=7?2:0));o.damage="Espada 1d8+"+str;
  o.extra="Ofício (armeiro) "+signed(int+2+half+(n>=7?2:0));
  o.explanation="Inventora: 4 PM por nível, fabricação mediante tempo, ferramentas e Tibares; INT melhora a perícia de Ofício. Constituição elevada no 12º adiciona PV retroativamente.";
 }else if(c.id==="diego"&&c.theme==="diego"){
  o.pm+=delta(c,n,"SAB");
  o.attack=signed(str+2+half+(n>=7?2:0));
  o.damage=n>=2?"Forma Selvagem: consultar forma ativa":"Mordida 1d6+"+str;
  o.magicDC=10+half+a("SAB");
  o.extra=n>=12?"Forma Selvagem Superior":n>=6?"Forma Selvagem Aprimorada":n>=2?"Forma Selvagem":"Presas Primordiais";
  o.explanation="Druida: transformação usa apenas os bônus de uma forma por vez. Aumento de SAB no 10º aumenta a CD e +1 PM total, não por nível.";
 }else if(c.id==="diego"){
  o.pm+=(n>=5?3:0)+(n>=11?3:0);
  o.attack=signed(dex+2+half+(n>=7?2:0));
  o.damage="Adaga 1d4+"+str;
  o.extra="Ataque Especial "+signed(n>=9?12:n>=5?8:4);
  o.explanation="Guerreiro paralelo: Surto Heroico custa 5 PM por ação padrão ou movimento extra, só uma vez por rodada. Coração Heroico adiciona +3 PM no 5º e 11º.";
 }else if(c.id==="ado"||c.id==="marin"){
  o.pm+=delta(c,n,"CAR");
  o.attack=signed(dex+2+half+(n>=7?2:0));
  o.damage="Magias do "+(n>=10?"3º":n>=6?"2º":"1º")+" círculo";
  o.magicDC=10+half+car;
  o.extra="Inspiração +"+(n>=9?3:n>=5?2:1);
  o.explanation="Barda: Inspiração dá bônus em testes de perícia e exige PM. PM incluem CAR do primeiro nível e aumentos de CAR posteriores; sem magias grátis além do repertório.";
 }else if(c.id==="cyrene"||c.id==="makima"){
  if(n>=4)o.pm+=n; // Poder Mágico no 4º nível.
  o.pm+=delta(c,n,"CAR");
  o.magicDC=10+half+car+(c.id==="cyrene"&&n>=7?1:0)+(c.id==="makima"&&n>=9?1:0);
  o.extra="Magias do "+(n>=9?"3º":n>=5?"2º":"1º")+" círculo";
  o.explanation="Feiticeira: CD básica de magia e PM são calculados com CAR; Poder Mágico acrescenta PM retroativos. A CD exibida não inclui modificadores de escola ou gastos opcionais.";
 }else if(c.id==="optimus"){
  o.pv+=n>=10?n:0;
  o.attack=signed(str+2+half+(n>=7?2:0));
  o.damage="Montante 2d6+"+str+(n>=9?" + 3d8":n>=5?" + 2d8":" + 1d8")+" (Golpe Divino, se usado)";
  o.extra="Chassi +2 Defesa • Sem Origem";
  o.explanation="Golem Paladino: Chassi concede +2 na Defesa; paladino recebe 3 PM por nível. CON elevada no 10º soma PV retroativamente. Transformação em caminhão não é gratuita.";
 }
 return o;
};
const skill=(c,entry,n)=>{
 const k=attrBySkill[entry[0]]||"INT";
 let b=val(c,k)+delta(c,n,k)+trained(n)+Math.floor(n/2);
 if(c.id==="diego"&&c.theme==="diego"&&n>=4&&entry[0]==="Percepção")b+=2;
 return signed(b);
};
window.T20_EXPANSION={expanded,stats,skill,delta};
})();
