/* Calculadora de progressão da expansão.
   Valida a estrutura do nível escolhido; escolha opcional e bônus situacionais requerem mesa. */
(()=>{
const src=window.T20_MEGA;if(!src)return;
const val=(c,k)=>c.attrs.find(a=>a.key===k)?.value||0;
const levelDelta=(c,n,k)=>{
 let t=0;
 for(let i=1;i<=Math.min(12,n);i++){
   const title=c.progression[i-1]?.[1]||"";
   if(title.includes("Aumento de Atributo")){
     const explicit=title.match(/Aumento de Atributo \((CON|CAR|SAB|INT|FOR|DEX)\)/);
     const key=explicit?.[1]||c._mega.mainAttr;
     if(k===key)t++;
   }
 }
 return t;
};
const pmAttr=klass=>["Arcanista","Clérigo","Druida","Bardo","Nobre","Paladino"].includes(klass);
const stats=(c,n)=>{
 const klass=c._mega.className,R=src.classes[klass],delta=k=>levelDelta(c,n,k);
 const total=k=>val(c,k)+delta(k),con=total("CON"),main=total(c._mega.mainAttr);
 const hpBonus=delta("CON")*n;
 const initialCasterBonus=pmAttr(klass)?delta(c._mega.mainAttr):0;
 let pm=c.stats.pm+(n-1)*R.pm+initialCasterBonus;
 let pv=c.stats.pv+(n-1)*c.stats.hpGain+hpBonus;
 let defense=c.stats.defense+(klass==="Nobre"?delta("CAR"):delta("DEX"));
 let attack=(total("FOR")+2+Math.floor(n/2)+(n>=7?2:0));
 let extra="Nível "+n+" / "+klass;
 if(klass==="Guerreiro")extra="Ataque Especial +"+(n>=9?12:n>=5?8:4);
 if(klass==="Bardo")extra="Inspiração +"+(n>=9?3:n>=5?2:1);
 if(klass==="Ladino")extra="Ataque Furtivo "+(1+Math.floor((n-1)/2))+"d6 (se válido)";
 if(klass==="Druida")extra=n>=12?"Forma Selvagem Superior":n>=6?"Forma Selvagem Aprimorada":n>=2?"Forma Selvagem":"Magias de 1º círculo";
 if(klass==="Arcanista"||klass==="Clérigo")extra="Magias do "+(n>=9?"3º":n>=5?"2º":"1º")+" círculo (se aprendidas)";
 if(klass==="Paladino")extra="Golpe Divino e habilidades paladinescas";
 const magicDC=["Arcanista","Bardo","Clérigo","Druida"].includes(klass)?10+Math.floor(n/2)+main:null;
 const damage=klass==="Arcanista"||klass==="Clérigo"||klass==="Bardo"||klass==="Druida"?"Conforme magia e círculo":"Arma base "+(R.damage)+"+"+total("FOR");
 return {
  level:n,pv,pm,defense,move:c.stats.speed,attack:(attack>=0?"+":"")+attack,damage,extra,magicDC,
  attributeInt:total("INT"),attributeStr:total("FOR"),floor:Math.floor(n/2),training:n>=7?4:2,
  explanation:"PV e PM acompanham a progressão da classe e os aumentos escolhidos. A árvore indica uma PROPOSTA: só considere cada poder adquirido após conferir pré-requisitos, escolhas de poder e limites de PM no livro. "+c._mega.description
 };
};
const skill=(c,entry,n)=>{
 const name=entry[0],attr=src.skillAttr[name]||"INT";
 const b=val(c,attr)+levelDelta(c,n,attr)+2+Math.floor(n/2)+(n>=7?2:0);
 return (b>=0?"+":"")+b;
};
src.delta=levelDelta;src.stats=stats;src.skill=skill;
})();
