/* O Sistema // T20 — sem dependências, sem conta, sem Firebase. */
(()=>{
"use strict";
const data=window.T20_DATA;
const root=document.getElementById("app");
if(!data||!root){return;}
const tabs=[["overview","Dossiê"],["attributes","Atributos iniciais"],["equipment","Equipamentos"],["abilities","Habilidades"],["progression","Progressão"],["techniques","Técnicas"],["sources","Fontes"]];
let search="",universe="all",lastRoute="",toastTimer=null,selectedLevel=1;
const e=(v)=>String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const url=(u)=>/^https:\/\//.test(String(u||""))?e(u):"#";
const icon=(v)=>e(v||"◈");
const charById=(id)=>data.characters.find(c=>c.id===id);
function image(src,alt,css=""){return '<img class="'+e(css)+'" loading="lazy" decoding="async" src="'+url(src)+'" alt="'+e(alt)+'">'}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3200)}
function note(text){return '<aside class="system-note"><span class="who">O SISTEMA // OBSERVAÇÃO</span><p>'+e(text)+'</p></aside>'}

const guides=window.T20_GUIDE||{books:{},people:{}};
const guideFor=(c)=>guides.people[c.id]||{levels:[],basics:[]};
const levelClamp=(v)=>Math.min(12,Math.max(1,Number(v)||1));
const fmt=(n)=>(n>=0?"+":"")+n;
function statFor(c,lvl){
 const n=levelClamp(lvl),floor=Math.floor(n/2),training=n>=7?4:2;
 const con=c.attrs.find(a=>a.key==="CON")?.value||0;
 const intBase=c.attrs.find(a=>a.key==="INT")?.value||0;
 const strBase=c.attrs.find(a=>a.key==="FOR")?.value||0;
 const attrInt=intBase+(c.id==="d"&&n>=12?1:0);
 const attrStr=strBase+(c.id==="david"&&n>=7?1:0);
 let pv=c.stats.pv+(n-1)*c.stats.hpGain;
 let pm=c.stats.pm+(n-1)*c.stats.pmGain;
 let defense=c.stats.defense;
 let move=c.stats.speed;
 let attack="",damage="",extra="",magicDC=null,explanation="";
 if(c.id==="gyro"){
   attack=fmt(6+floor+(n>=7?2:0));
   damage=(n>=12?"1d8":"1d6")+"+"+(6+(n>=6?3:0)+(n>=11?2:0));
   extra="Ataque Especial "+fmt(n>=9?12:n>=5?8:4);
   explanation="Ataque básico de azagaia/Steel Ball; soma metade do nível e treinamento em Pontaria. Arqueiro (+3 no dano) entra no 6º, Especialização (+2) no 11º e Mestre em Arma aumenta o dado no 12º.";
 }else if(c.id==="d"){
   pm+=(n>=6?n:0)+(n>=12?1:0);
   magicDC=10+floor+attrInt+(n>=5?1:0);
   extra="Magias de "+(n>=9?"3º":n>=5?"2º":"1º")+" círculo";
   explanation="CD base das magias: 10 + metade do nível + INT + Fortalecimento Arcano a partir do 5º. Magia Pungente pode adicionar +2 CD ao gastar +1 PM. O 12º nível aumenta INT para +5.";
 }else if(c.id==="david"){
   pv+=(n>=4?attrStr:0);
   if(n>=5)pm+=3;
   if(n>=11)pm+=3;
   defense+=(n>=3?con+Math.min(attrStr,n):0)+(n>=7?1:0)+(n>=11?1:0);
   move=n>=2?"12 m":"9 m";
   attack=fmt(6+floor+(n>=7?2:0)+(n>=7?1:0));
   damage=(n>=9?"1d10":n>=5?"1d8":"1d6")+"+"+(attrStr+(n>=10?con:0));
   extra="Briga "+(n>=9?"1d10":n>=5?"1d8":"1d6");
   explanation="PV incluem Sarado (FOR) desde o 4º; PM incluem Coração Heroico nos níveis 5 e 11; Defesa presume ausência de armadura para Braços Calejados e Casca Grossa. Dano não aplica bônus temporários.";
 }else if(c.id==="rentarou"){
   pm+=(n>=5?3:0)+(n>=11?3:0);
   defense+=(n>=5?1:0)+(n>=11?1:0);
   attack=fmt(2+floor+(n>=7?2:0));
   damage=n>=10?"Palavras Afiadas 6d6":n>=6?"Palavras Afiadas 4d6":n>=2?"Palavras Afiadas 2d6":"Clava 1d6";
   extra="CAR "+fmt(4+(n>=5?1:0)+(n>=11?1:0))+" • Comandar +1";
   explanation="Nobre de apoio: PV aumentam 7 por nível, PM aumentam 4 por nível, além dos +3 PM de Coração Heroico nos níveis 1, 5 e 11. A Defesa inclui couro (+2) e Carisma (Autoconfiança). Palavras Afiadas usa Diplomacia contra Vontade, dano não letal; não é ataque de Luta.";
 }else if(c.id==="cipher"){
   attack=fmt(6+floor+(n>=7?2:0));
   damage=(n>=2?"1d4+4":"1d4")+(n>=1?" + "+(1+Math.floor((n-1)/2))+"d6 furtivo (se válido)":"");
   extra="Ataque Furtivo "+(1+Math.floor((n-1)/2))+"d6";
   explanation="O bônus de ataque inclui metade do nível e treinamento; Acuidade com Arma dá +4 no dano da adaga desde o nível 2. Ataque Furtivo só se soma quando suas condições são atendidas.";
 }
 return {level:n,pv,pm,defense,move,attack,damage,extra,magicDC,attributeInt:attrInt,attributeStr:attrStr,floor,training,explanation};
}
function skillFor(c,entry,level){
 const v=parseInt(entry[1],10),n=levelClamp(level);
 let bonus=v+Math.floor(n/2)+(n>=7?2:0);
 if(c.id==="cipher"&&n>=3&&["Ladinagem","Furtividade"].includes(entry[0]))bonus+=3;
 if(c.id==="david"&&entry[0]==="Fortitude"&&n>=4)bonus+=(n>=7?5:4);
 if(c.id==="david"&&entry[0]==="Atletismo"&&n>=2)bonus+=2;
 if(c.id==="rentarou"){
   if(["Diplomacia","Enganação"].includes(entry[0]))bonus+=(n>=5?1:0)+(n>=11?1:0);
   if(entry[0]==="Diplomacia"&&n>=4)bonus+=2;
 }
 return fmt(bonus);
}
function referenceLinks(refs){
 return (refs||[]).map(([book,pages,term])=>{
  const b=guides.books[book];if(!b)return "";
  return '<a class="ref-link" target="_blank" rel="noopener noreferrer" href="'+url(b.url)+'"><b>'+e(b.name)+'</b><span>p. '+e(pages)+' · '+e(term)+'</span><span aria-hidden="true">↗</span></a>';
 }).join("");
}
function guidePanel(g){
 return '<div class="guide-explanation"><div class="guide-part"><b>POR QUE ESTA ESCOLHA?</b><p>'+e(g.why||"Representa a técnica do personagem.")+'</p></div><div class="guide-part"><b>COMO USAR NA MESA</b><p>'+e(g.use||"Siga as regras do livro.")+'</p></div>'+(g.automatic?'<p class="auto-marker">AUTOMÁTICO // '+e(g.automatic)+'</p>':"")+'<div class="guide-references"><b>ONDE CONSULTAR AS REGRAS</b>'+referenceLinks(g.ref)+'</div></div>';
}
function levelPanel(c,level){
 const g=guideFor(c).levels[level-1]||{};
 return '<div class="guide-panel-head"><span>O SISTEMA // NÍVEL '+String(level).padStart(2,"0")+'</span><strong>'+e(c.progression[level-1]?.[1]||"Evolução")+'</strong></div>'+guidePanel(g);
}
function selectedMetrics(c,n){const v=statFor(c,n);
 return '<div class="live-metrics">'+[
  ["PONTOS DE VIDA",v.pv],["PONTOS DE MANA",v.pm],["DEFESA",v.defense],["MOVIMENTO",v.move],
  [c.id==="d"?"CD DE MAGIA":"ATAQUE BASE",c.id==="d"?v.magicDC:v.attack],
  [c.id==="d"?"CÍRCULO MÁXIMO":"DANO BASE",c.id==="d"?(n>=9?"3º":n>=5?"2º":"1º"):v.damage]
 ].map(([k,val])=>'<div class="live-metric"><span>'+e(k)+'</span><b>'+e(val)+'</b></div>').join("")+'</div><p class="derived-note">'+e(v.explanation)+'</p>';
}

function getRoute(){const parts=decodeURIComponent(location.hash.replace(/^#\/?/,"")).split("/").filter(Boolean);const c=charById(parts[0]);if(!c)return{character:null,tab:"overview"};return{character:c,tab:tabs.some(t=>t[0]===parts[1])?parts[1]:"overview"}}
function linkFor(c,tab="overview"){return "#/"+encodeURIComponent(c.id)+"/"+tab}
function shell(title,number,content,comment){return '<header class="section-head"><div><div class="kicker">O SISTEMA // DOSSIÊ ATIVO</div><h2>'+e(title)+'</h2></div><span class="number">'+e(number)+'</span></header>'+content+(comment?note(comment):"")}
function sourceLink(entry,category){return '<a class="source-link" href="'+url(entry.url)+'" target="_blank" rel="noopener noreferrer"><span><b>'+e(entry.name)+'</b><small>'+e(category||entry.detail||"Referência externa")+'</small></span><i aria-hidden="true">↗</i></a>'}
function card(c){return '<button type="button" class="roster-card '+e(c.theme)+'" data-open="'+e(c.id)+'" aria-label="Abrir ficha de '+e(c.name)+'"><div class="photo">'+image(c.portrait.url,"Retrato ilustrativo de "+c.name)+'</div><span class="card-no">DOSSIÊ // '+e(c.number)+'</span><span class="card-topline" aria-hidden="true"></span><div class="card-body"><span class="card-overline">'+e(c.label)+'</span><h3>'+e(c.name)+'</h3><p>'+e(c.info.race)+' · '+e(c.info.className)+'<br>'+e(c.universe)+'</p><div class="card-action"><span>ACESSAR FICHA</span><b aria-hidden="true">↗</b></div></div></button>'}
function listView(){document.body.removeAttribute("data-theme");document.title="O Sistema // T20 — Arquivo de Fichas";root.innerHTML=
'<div class="container"><section class="landing-hero" aria-label="Arquivo de personagens"><div><div class="kicker">ARQUIVO CENTRAL // FICHAS DE COMBATE</div><h1>QUATRO MUNDOS.<br><em>INFINITAS BUILDS.</em></h1><p>Personagens de outras histórias convertidos em fichas jogáveis de Tormenta20. Selecione um operador, compare os atributos e explore cada técnica até a evolução final.</p></div><div class="hero-mark" aria-hidden="true">T20</div></section>'+
'<div class="stats-strip"><div class="mini-stat"><strong>'+String(data.characters.length).padStart(2,"0")+'</strong><span>DOSSIÊS<br>DISPONÍVEIS</span></div><div class="mini-stat"><strong>12</strong><span>NÍVEIS<br>POR FICHA</span></div><div class="mini-stat"><strong>06</strong><span>ATRIBUTOS<br>POR RADAR</span></div></div>'+
'<section aria-labelledby="roster-title"><div class="list-toolbar"><div><div class="corner-label">SISTEMA DE IDENTIFICAÇÃO // SELEÇÃO</div><h2 id="roster-title">ARQUIVO DE PERSONAGENS</h2></div><div class="filters"><label class="filter-label" for="search">BUSCA</label><input class="search-input" id="search" type="search" placeholder="Buscar personagem..." autocomplete="off" value="'+e(search)+'"><label class="filter-label" for="universe">UNIVERSO</label><select class="filter-select" id="universe"><option value="all">Todos os universos</option><option value="jojo">Steel Ball Run</option><option value="cyberpunk">Cyberpunk</option><option value="hsr">Honkai: Star Rail</option><option value="romcom">100 Namoradas</option></select></div></div><div class="roster-grid" id="roster" aria-live="polite"></div></section>'+
'<div class="rule-note"><b>O SISTEMA //</b><span>Construções independentes, com regras oficiais e alterações apenas de aparência/narrativa. Cada ficha inclui fontes, limitações e pontos que exigem aprovação do mestre.</span></div></div>';
const input=document.getElementById("search"),select=document.getElementById("universe");input.value=search;select.value=universe;updateCards();lastRoute="library"}
function updateCards(){const slot=document.getElementById("roster");if(!slot)return;const matches=data.characters.filter(c=>{const cat=c.id==="gyro"?"jojo":c.id==="cipher"?"hsr":c.id==="rentarou"?"romcom":"cyberpunk";return(universe==="all"||universe===cat)&&(!search||[c.name,c.label,c.info.className,c.universe].join(" ").toLowerCase().includes(search.toLowerCase()))});slot.innerHTML=matches.length?matches.map(card).join(""):'<div class="empty-state">Nenhum dossiê corresponde à busca. Tente outro nome ou universo.</div>'}
function cover(c){return '<section class="detail-hero" aria-labelledby="character-title"><div class="hero-watermark" aria-hidden="true">'+icon(c.symbol)+'</div><div class="hero-copy"><div class="kicker">DOSSIÊ '+e(c.number)+' // '+e(c.label)+'</div><h1 id="character-title">'+e(c.name)+'</h1><p>'+e(c.excerpt)+'</p><div class="hero-chips"><span class="chip strong">NÍVEL INICIAL 01</span><span class="chip">'+e(c.info.race)+'</span><span class="chip">'+e(c.info.className)+'</span></div></div><div class="hero-portrait">'+image(c.portrait.url,"Referência de "+c.name)+'</div></section>'}
function quickStats(c){
 const v=statFor(c,selectedLevel);
 return '<div class="detail-meta" aria-label="Estatísticas do nível selecionado">'+[
 ["PV",v.pv],["PM",v.pm],["DEFESA",v.defense],["MOVIMENTO",v.move]
 ].map(([k,n])=>'<div class="meta-tile"><small>'+e(k)+' // NÍVEL <span data-stat-level>'+String(selectedLevel).padStart(2,"0")+'</span></small><b data-stat="'+e(k)+'">'+e(n)+'</b></div>').join("")+'</div>';
}
function mediaGallery(c){return '<div class="media-grid">'+c.media.map(m=>'<article class="media-card"><div class="media-photo">'+image(m.image,m.name)+'</div><div class="media-caption"><strong>'+e(m.name)+'</strong><small>'+e(m.credit)+'</small><a href="'+url(m.source)+'" target="_blank" rel="noopener noreferrer">VER ORIGEM DA IMAGEM ↗</a></div></article>').join("")+'</div>'}
function overview(c){const info=[["Raça",c.info.race],["Classe",c.info.className],["Origem",c.info.origin],["Divindade",c.info.devotion],["Função",c.info.role],["Companheiro",c.info.partner]];return shell("Identidade e história","01 / DOSSIÊ",'<div class="section-grid"><article class="panel prose"><div class="panel-title">REGISTRO DE PERSONAGEM</div><h3>'+e(c.name)+'</h3>'+c.history.map(p=>"<p>"+e(p)+"</p>").join("")+'<div class="panel-title" style="margin-top:23px">PROPOSTA DE ADAPTAÇÃO</div><p>'+e(c.summary)+'</p></article><aside class="panel"><div class="panel-title">IDENTIFICAÇÃO DE SISTEMA</div><div class="bio-grid">'+info.map(([k,v])=>'<div class="bio-item"><small>'+e(k.toUpperCase())+'</small><strong>'+e(v)+'</strong></div>').join("")+'</div></aside></div><div class="section-head"><div><div class="kicker">ARQUIVO FOTOGRÁFICO</div><h2>Referências visuais</h2></div></div>'+mediaGallery(c),c.notes.overview)}
function radar(c){const cx=180,cy=165,maxR=112,keys=c.attrs.map(a=>({...a,value:a.value+((c.id==="d"&&a.key==="INT"&&selectedLevel>=12)||(c.id==="david"&&a.key==="FOR"&&selectedLevel>=7)?1:0)+(c.id==="rentarou"&&a.key==="CAR"?(selectedLevel>=5?1:0)+(selectedLevel>=11?1:0):0)}));const pos=(i,r)=>{const theta=(-90+i*60)*Math.PI/180;return [cx+Math.cos(theta)*r,cy+Math.sin(theta)*r]};const pts=(r)=>keys.map((a,i)=>pos(i,r)).map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ");const grid=[1,2,3,4,5].map(n=>'<polygon class="radar-grid" points="'+pts(n*maxR/5)+'"/>').join("");const axes=keys.map((a,i)=>{const [x,y]=pos(i,maxR);return '<line class="radar-axis" x1="'+cx+'" y1="'+cy+'" x2="'+x+'" y2="'+y+'"/>'}).join("");const dataPoints=keys.map((a,i)=>pos(i,Math.min(5,Math.max(0,a.value))*maxR/5));const poly=dataPoints.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ");const dots=dataPoints.map(p=>'<circle class="radar-node" cx="'+p[0]+'" cy="'+p[1]+'" r="4"/>').join("");const labels=keys.map((a,i)=>{const [x,y]=pos(i,141);return '<text class="radar-label" x="'+x+'" y="'+(y-4)+'" text-anchor="middle">'+e(a.key)+'</text><text class="radar-value" x="'+x+'" y="'+(y+13)+'" text-anchor="middle">+'+a.value+'</text>'}).join("");return '<svg class="radar-svg" viewBox="0 0 360 335" role="img" aria-label="Radar de atributos CON, CAR, SAB, INT, FOR e DEX"><g>'+grid+axes+'<polygon class="radar-data" points="'+poly+'"/>'+dots+labels+'</g></svg>'}
function attributes(c){const total=c.attrs.reduce((sum,a)=>sum+(a.buy===3?4:a.buy===2?2:a.buy===1?1:a.buy===0?0:0),0);return shell("Atributos iniciais","02 / CONFIGURAÇÃO",'<div class="section-grid"><div class="panel"><div class="panel-title">ANÁLISE HEXAGONAL // STATUS DE STAND</div><div class="radar-zone"><div id="attrRadar">'+radar(c)+'</div><div class="attr-list">'+c.attrs.map(a=>'<div class="attr-row"><strong>'+e(a.key)+'</strong><span>'+e(a.why)+'</span><b data-current-attr="'+e(a.key)+'">+'+(a.value+((c.id==="d"&&a.key==="INT"&&selectedLevel>=12)||(c.id==="david"&&a.key==="FOR"&&selectedLevel>=7)?1:0)+(c.id==="rentarou"&&a.key==="CAR"?(selectedLevel>=5?1:0)+(selectedLevel>=11?1:0):0))+'</b></div>').join("")+'</div></div><p style="font-size:12px;color:var(--faint);margin:4px 0 0">Gráfico ilustrativo de modificadores, escala de 0 a +5; não representa uma nova regra de Tormenta20.</p></div><div class="panel"><div class="panel-title">COMPRA DE ATRIBUTOS // NÍVEL 01</div><table class="attr-breakdown"><thead><tr><th>ATR.</th><th>COMPRA</th><th>RAÇA</th><th>FINAL</th></tr></thead><tbody>'+c.attrs.map(a=>'<tr><td>'+e(a.key)+'</td><td>+'+a.buy+'</td><td>'+(a.race?'+'+a.race:'—')+'</td><td class="highlight">+'+a.value+'</td></tr>').join("")+'</tbody></table><p style="font:12px var(--mono);color:var(--muted);margin:14px 0">Pontos investidos na compra: '+total+'/10. Bônus raciais já incorporados.</p><div class="panel-title" style="margin-top:17px">ATRIBUTOS DERIVADOS // INÍCIO</div><div class="stat-tiles">'+[["PV",c.stats.pv],["PM",c.stats.pm],["DEF",c.stats.defense],["MOV",c.stats.speed]].map(([k,v])=>'<div class="stat-panel"><small>'+k+'</small><b>'+e(v)+'</b></div>').join("")+'</div></div></div>',c.notes.attributes)}
function equipment(c){return shell("Equipamentos","03 / INVENTÁRIO",'<div class="gear-grid">'+c.gear.map((g,i)=>'<details class="gear-card" '+(i===0?"open":"")+'><summary><div class="gear-thumb">'+(g.image?image(g.image,g.name):e(String(i+1).padStart(2,"0")))+'</div><div class="gear-title"><strong>'+e(g.name)+'</strong><small>'+e(g.rule)+'</small></div><span class="gear-chevron" aria-hidden="true">›</span></summary><div class="gear-details"><span class="gear-quantity">QTD // '+e(g.qty)+'</span><p>'+e(g.detail)+'</p>'+(g.source?'<a href="'+url(g.source)+'" target="_blank" rel="noopener noreferrer">REFERÊNCIA VISUAL: '+e(g.credit||g.source)+' ↗</a>':"")+'</div></details>').join("")+'</div><div class="section-head"><div><div class="kicker">ARMAMENTO</div><h2>Ataques iniciais</h2></div></div><div class="attack-grid">'+c.attacks.map(a=>'<article class="attack-card"><h3>'+e(a.name)+'</h3><div class="attack-numbers"><div><small>ATAQUE / TESTE</small><b>'+e(a.test)+'</b></div><div><small>DANO</small><b>'+e(a.damage)+'</b></div><div><small>GASTO</small><b>'+e(a.cost)+'</b></div></div><p>'+e(a.detail)+'</p></article>').join("")+'</div>',c.notes.equipment)}
function abilities(c){
 const basics=guideFor(c).basics||[];
 return shell("Habilidades e perícias","04 / REPERTÓRIO",
 '<div class="section-grid"><div class="panel"><div class="panel-title">HABILIDADES NA CRIAÇÃO</div><h3>Recursos iniciais</h3><ul class="bullets">'+c.initial.map(x=>'<li>'+e(x)+'</li>').join("")+'</ul></div><div class="panel"><div class="panel-title">FUNÇÃO E ESTRATÉGIA</div><h3>Como utilizar a build</h3><p>'+e(c.summary)+'</p></div></div>'+
 '<div class="section-head"><div><div class="kicker">MANUAL DE CAMPO</div><h2>Por que e como usar?</h2></div></div>'+
 '<div class="ability-guide">'+basics.map(g=>'<details class="ability-detail" open><summary><strong>'+e(g.name)+'</strong><span>LER INSTRUÇÕES ⌄</span></summary>'+guidePanel(g)+'</details>').join("")+'</div>'+
 '<div class="section-head"><div><div class="kicker">ADQUIRIDAS ATÉ O NÍVEL ESCOLHIDO</div><h2>Habilidades desbloqueadas</h2></div></div>'+
 '<div id="abilitiesUnlocked" class="ability-guide" aria-live="polite"></div>'+
 '<div class="section-head"><div><div class="kicker">TREINAMENTO // NÍVEL ATUAL</div><h2>Perícias atualizadas</h2></div></div>'+
 '<p class="derived-note">Os bônus abaixo incluem metade do nível, treinamento (+2 até o 6º e +4 do 7º ao 12º) e ajustes permanentes indicados. Bônus situacionais precisam ser aplicados durante a partida.</p>'+
 '<div class="skill-grid" id="skillGrid">'+c.skills.map((entry,i)=>'<div class="skill-item"><strong>'+e(entry[0])+'</strong><b data-skill="'+i+'">'+skillFor(c,entry,selectedLevel)+'</b><small>'+e(entry[2])+'</small></div>').join("")+'</div><div id="skillsAdditional"></div>',
 c.notes.abilities);
}
function progression(c){
 const lvl=selectedLevel;
 return shell("Progressão real","05 / EVOLUÇÃO",
 '<div class="level-bar"><label for="levelSelect">NÍVEL<br>DA FICHA</label><b id="selectedLevel">'+String(lvl).padStart(2,"0")+'</b><input aria-label="Selecionar nível do personagem" id="levelSelect" type="range" min="1" max="12" step="1" value="'+lvl+'"><span class="cap">01 ↔ 12</span></div>'+
 '<div id="progressStats">'+selectedMetrics(c,lvl)+'</div>'+
 '<div class="section-head"><div><div class="kicker">NÍVEL SELECIONADO</div><h2>Como jogar agora</h2></div></div>'+
 '<article id="levelReadout" class="selected-guide" aria-live="polite">'+levelPanel(c,lvl)+'</article>'+
 '<div class="section-head"><div><div class="kicker">DESBLOQUEIOS POR NÍVEL</div><h2>Árvore de evolução</h2></div></div>'+
 '<div class="level-grid" id="levelGrid">'+c.progression.map(([level,power,desc],i)=>'<div class="level-item" data-level="'+e(level)+'"><div class="level-id">'+e(String(level).padStart(2,"0"))+'</div><div><strong>'+e(power)+'</strong><p>'+e(desc)+'</p></div><details class="level-entry"><summary>Por que escolher? Como usar? Onde está no livro?</summary>'+guidePanel(guideFor(c).levels[i]||{})+'</details></div>').join("")+'</div>',
 c.notes.progression);
}
function techniques(c){return shell("Técnicas especiais","06 / MATRIZ DE COMBATE",'<div class="tech-grid">'+c.techniques.map(t=>'<article class="tech-card"><div class="tech-meta"><span>NÍVEL '+String(t.level).padStart(2,"0")+'</span><span>GASTO // '+e(t.cost)+'</span></div><h3>'+e(t.name)+'</h3><div class="mechanic">REGRA BASE: '+e(t.mechanic)+'</div><p>'+e(t.effect)+'</p><em>'+e(t.flavor)+'</em></article>').join("")+'</div>',c.notes.techniques)}
function sources(c){
 const books=Object.values(guides.books||{}).map(b=>sourceLink({name:b.name,url:b.url,detail:b.edition},"Fonte de regras"));
 const media=c.sources.map(s=>sourceLink(s,"Origem / personagem"));
 const images=[c.portrait,...c.media.map(m=>({url:m.image,credit:m.credit,page:m.source}))].map(m=>({name:m.credit,url:m.page}));
 const references=c.progression.map(([lvl,power],i)=>'<div class="source-level"><strong>Nível '+e(lvl)+' · '+e(power)+'</strong><div class="source-level-refs">'+referenceLinks(guideFor(c).levels[i]?.ref||[])+'</div></div>').join("");
 return shell("Fontes e páginas","07 / BIBLIOTECA",
 '<p class="derived-note">'+e(guides.instructions||"As páginas dependem da edição usada pela mesa.")+'</p>'+
 '<div class="section-grid equal"><div class="panel"><div class="panel-title">LIVROS E SUPLEMENTOS</div><div class="source-list">'+books.join("")+'</div></div><div class="panel"><div class="panel-title">OBRAS E REFERÊNCIAS</div><div class="source-list">'+media.join("")+'</div></div></div>'+
 '<div class="section-head"><div><div class="kicker">ÍNDICE DA BUILD</div><h2>Página de cada poder</h2></div></div>'+
 '<div class="source-index">'+references+'</div>'+
 '<div class="section-head"><div><div class="kicker">ARTE & COPYRIGHT</div><h2>Créditos de imagens</h2></div></div>'+
 '<div class="source-list">'+images.map(m=>sourceLink(m,"Imagem externa — titularidade dos criadores")).join("")+'</div>'+
 '<div class="rule-note"><b>AVISO //</b><span>Verifique a mesma edição dos livros e as erratas aplicáveis. Os efeitos resumidos não substituem a descrição integral. Quando a página exata não foi confirmada, o catálogo indica capítulo e verbete, sem inventar número de página.</span></div>',
 "As regras detalhadas estão nos livros oficiais. Nomes de técnicas de outros universos são somente interpretação narrativa.");
}
function detail(c,tab){
 const prev=lastRoute;
 if(!prev.startsWith(c.id+"/"))selectedLevel=1;
 document.body.dataset.theme=c.theme;
 document.title=c.name+" // O Sistema · T20";
 const nav=tabs.map(([key,label],i)=>'<button type="button" role="tab" id="tab-'+e(key)+'" aria-controls="detail-section" aria-selected="'+(key===tab)+'" data-tab="'+e(key)+'"><span aria-hidden="true">'+String(i+1).padStart(2,"0")+' / </span>'+e(label)+'</button>').join("");
 const content={overview,attributes,equipment,abilities,progression,techniques,sources}[tab](c);
 root.innerHTML='<div class="container detail-shell"><a class="back-link" href="#/">← VOLTAR AO ARQUIVO / PERSONAGENS</a>'+cover(c)+quickStats(c)+
 '<div class="global-level-picker"><div><span class="panel-title">FICHA ATIVA // NÍVEL</span><strong>NÍVEL <span id="globalLevelText">'+String(selectedLevel).padStart(2,"0")+'</span></strong><p>Altere aqui para recalcular PV, PM, Defesa e evolução em todas as abas.</p></div><input id="globalLevel" aria-label="Nível atual da ficha" type="range" min="1" max="12" value="'+selectedLevel+'"><a href="'+linkFor(c,"progression")+'">VER EVOLUÇÃO ↗</a></div>'+
 '<nav class="detail-tabs" role="tablist" aria-label="Seções da ficha">'+nav+'</nav><section id="detail-section" role="tabpanel" aria-labelledby="tab-'+e(tab)+'">'+content+'</section>'+
 '<div class="actions-row"><button type="button" class="sys-button primary" data-copy="'+e(c.id)+'">COPIAR FICHA DO NÍVEL ATUAL ↗</button><a class="sys-button" href="#/">VOLTAR AOS DOSSIÊS</a></div></div>';
 updateLevel(selectedLevel);
 lastRoute=c.id+"/"+tab;
}
function updateLevel(v){
 selectedLevel=levelClamp(v);
 const c=getRoute().character;if(!c)return;
 const st=statFor(c,selectedLevel);
 for(const id of ["levelSelect","globalLevel"]){const node=document.getElementById(id);if(node&&Number(node.value)!==selectedLevel)node.value=selectedLevel}
 for(const id of ["selectedLevel","globalLevelText"]){const node=document.getElementById(id);if(node)node.textContent=String(selectedLevel).padStart(2,"0")}
 document.querySelectorAll("[data-stat-level]").forEach(node=>node.textContent=String(selectedLevel).padStart(2,"0"));
 const current={PV:st.pv,PM:st.pm,DEFESA:st.defense,MOVIMENTO:st.move};
 document.querySelectorAll("[data-stat]").forEach(node=>node.textContent=current[node.dataset.stat]);
 document.querySelectorAll(".level-item").forEach(node=>{const n=Number(node.dataset.level);node.classList.toggle("unlocked",n<=selectedLevel);node.classList.toggle("current",n===selectedLevel)});
 const stats=document.getElementById("progressStats");if(stats)stats.innerHTML=selectedMetrics(c,selectedLevel);
 const readout=document.getElementById("levelReadout");if(readout)readout.innerHTML=levelPanel(c,selectedLevel);
 const additional=document.getElementById("skillsAdditional");
 if(additional&&c.id==="rentarou")additional.innerHTML=selectedLevel>=10?'<div class="skill-grid">'+[
  ["Enganação","+6","Educação Privilegiada · nobre 10"],
  ["Investigação","+3","Educação Privilegiada · nobre 10"]
 ].map(x=>'<div class="skill-item"><strong>'+e(x[0])+'</strong><b>'+skillFor(c,x,selectedLevel)+'</b><small>'+e(x[2])+'</small></div>').join("")+'</div>':'<p class="derived-note">Enganação e Investigação serão treinadas ao alcançar o nível 10 (Educação Privilegiada).</p>';
 const unlocked=document.getElementById("abilitiesUnlocked");
 if(unlocked)unlocked.innerHTML=c.progression.slice(0,selectedLevel).map(([n,power],i)=>
  '<details class="ability-detail" '+(i===selectedLevel-1?"open":"")+'><summary><strong>Nível '+e(n)+' — '+e(power)+'</strong><span>EXPLICAÇÃO ⌄</span></summary>'+guidePanel(guideFor(c).levels[i]||{})+'</details>').join("");
 document.querySelectorAll("[data-skill]").forEach(node=>{const entry=c.skills[Number(node.dataset.skill)];if(entry)node.textContent=skillFor(c,entry,selectedLevel)});
 const attrRadar=document.getElementById("attrRadar");if(attrRadar)attrRadar.innerHTML=radar(c);
 document.querySelectorAll("[data-current-attr]").forEach(node=>{const a=c.attrs.find(v=>v.key===node.dataset.currentAttr);if(a)node.textContent=fmt(a.value+((c.id==="d"&&a.key==="INT"&&selectedLevel>=12)||(c.id==="david"&&a.key==="FOR"&&selectedLevel>=7)?1:0)+(c.id==="rentarou"&&a.key==="CAR"?(selectedLevel>=5?1:0)+(selectedLevel>=11?1:0):0))});
}

function render(){const route=getRoute();const key=route.character?route.character.id+"/"+route.tab:"library";if(key===lastRoute)return;const previous=lastRoute;const sameCharacter=!!route.character&&previous.startsWith(route.character.id+"/");if(route.character)detail(route.character,route.tab);else listView();if(sameCharacter){const nav=document.querySelector?.(".detail-tabs");if(nav?.scrollIntoView)nav.scrollIntoView({block:"start",behavior:"instant"});else window.scrollTo({top:0,behavior:"instant"});const active=document.getElementById("tab-"+route.tab);active?.focus?.({preventScroll:true})}else window.scrollTo({top:0,behavior:"instant"})}
function copySummary(c){const a=c.attrs.map(x=>x.key+" "+(x.value>=0?"+":"")+x.value).join(" · ");const st=statFor(c,selectedLevel);return [c.name+" — T20 | O Sistema",c.info.race+" / "+c.info.className+" / "+c.info.origin,"Nível "+selectedLevel+": PV "+st.pv+" · PM "+st.pm+" · Defesa "+st.defense+" · "+st.extra,a,"Habilidades iniciais: "+c.initial.join("; "),"Progressão: "+c.progression.map(x=>"Nv. "+x[0]+": "+x[1]).join(" | "),"Fontes: "+data.rulebooks.map(b=>b.url).join(" ; ")].join("\n")}
document.addEventListener("click",evt=>{const card=evt.target.closest("[data-open]");if(card){location.hash=linkFor(charById(card.dataset.open));return}const tab=evt.target.closest("[data-tab]");if(tab){const char=getRoute().character;if(char)location.hash=linkFor(char,tab.dataset.tab);return}const copy=evt.target.closest("[data-copy]");if(copy){const c=charById(copy.dataset.copy);if(!c)return;if(!navigator.clipboard?.writeText){toast("Cópia indisponível neste navegador. Use o arquivo data.js.");return}navigator.clipboard.writeText(copySummary(c)).then(()=>toast("Resumo de "+c.name+" copiado."),()=>toast("Não foi possível copiar. Verifique permissões."))}});
document.addEventListener("input",evt=>{if(evt.target.id==="search"){search=evt.target.value;updateCards()}if(evt.target.id==="levelSelect"||evt.target.id==="globalLevel"){updateLevel(evt.target.value)}});
document.addEventListener("change",evt=>{if(evt.target.id==="universe"){universe=evt.target.value;updateCards()}});
document.addEventListener("error",evt=>{const im=evt.target;if(!(im instanceof HTMLImageElement))return;const replacement=document.createElement("div");replacement.className="img-fallback";replacement.setAttribute("role","img");replacement.setAttribute("aria-label","Imagem indisponível: "+im.alt);const mark=document.createElement("b");mark.textContent="◈";const msg=document.createElement("span");msg.textContent="IMAGEM EXTERNA INDISPONÍVEL";replacement.append(mark,msg);im.replaceWith(replacement)},true);
document.addEventListener("keydown",evt=>{if(evt.key==="Escape"&&getRoute().character){location.hash="#/"}});
window.addEventListener("hashchange",render);render();
})();