/* Laboratório local: fichas pessoais nunca entram no catálogo do repositório. */
(()=>{
 "use strict";
 const engine=window.T20_BUILD_ENGINE,rules=window.T20_RULES;
 if(!engine||!rules)return;
 const KEY="t20-laboratorio-v1",planned=()=>window.T20_AUTOMATIC_SEEDS||window.T20_PLANNED||[];
 const concepts=window.T20_CONCEPTS;
 const seedDraft=s=>window.T20_BUILD_PRESETS?.fromPlanned(s,engine)||concepts?.fromPlanned(s,engine)||engine.makeDraft({catalogId:s.id,name:s.name,work:s.universe,theme:s.catalogCategory});
 const esc=v=>String(v??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
 let drafts=[],active="",host=null,message="";
 try{const raw=JSON.parse(localStorage.getItem(KEY)||"[]");if(Array.isArray(raw))drafts=raw.slice(0,40).map(x=>{try{return engine.normalize(x)}catch{return null}}).filter(Boolean)}catch{}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(drafts));return true}catch{message="Armazenamento local indisponível; exporte o JSON para preservar a ficha.";return false}}
 const current=()=>drafts.find(x=>x.id===active);
 const option=(value,label,selected)=>'<option value="'+esc(value)+'"'+(selected?' selected':'')+'>'+esc(label)+'</option>';
 const choice=(id,label,value,items)=>'<label class="lab-field">'+label+'<select data-field="'+id+'">'+items.map(x=>option(x[0],x[1],value===x[0])).join("")+'</select></label>';
 const input=(id,label,value,placeholder="")=>'<label class="lab-field">'+label+'<input data-field="'+id+'" value="'+esc(value)+'" placeholder="'+esc(placeholder)+'" maxlength="1000"></label>';
 const textarea=(id,label,value,placeholder="")=>'<label class="lab-field">'+label+'<textarea data-field="'+id+'" rows="3" placeholder="'+esc(placeholder)+'" maxlength="2000">'+esc(value)+'</textarea></label>';
 const sourceLink=(source)=>source?'<a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.book==='jda-1.3'?'Jogo do Ano v1.3':'Fonte')+' · p. '+esc(source.page)+' · '+esc(source.section)+'</a>':'';
 function toolbar(){return '<header class="lab-heading"><a class="back-link" href="#/">← VOLTAR AO ARQUIVO</a><span class="kicker">O SISTEMA // EDIÇÃO LOCAL</span><h1>LABORATÓRIO<br><em>DE BUILDS.</em></h1><p>Monte uma ficha pessoal e acompanhe exatamente o que foi conferido. Cálculos parciais e escolhas pendentes são identificados antes da mesa.</p><div class="lab-heading-actions"><button type="button" data-lab-action="new">CRIAR FICHA</button><label>IMPORTAR JSON<input type="file" id="labImport" accept=".json,application/json" hidden></label><button type="button" data-lab-action="export"'+(current()?'':' disabled')+'>EXPORTAR FICHA</button><button type="button" data-lab-action="audit-export">AUDITORIA 69 + 4</button><button type="button" data-lab-action="backup-export">BACKUP DOSSIÊS</button></div><small>Salvo neste navegador · JSON versionado · nenhuma publicação automática.</small></header>'}
 function sidebar(){return '<aside class="lab-sidebar"><h2>Meus rascunhos</h2>'+(drafts.length?drafts.map(d=>'<button type="button" class="lab-draft'+(d.id===active?' active':'')+'" data-lab-open="'+esc(d.id)+'"><strong>'+esc(d.name)+'</strong><small>'+esc(d.work||'Criação original')+' · '+d.levels.length+' nível(is)</small></button>').join(""):'<p>Nenhuma ficha pessoal ainda.</p>')+'<h2>Iniciar a partir de um dossiê</h2><p>As dez entradas do catálogo mantêm seus IDs e imagens; este botão abre uma proposta narrativa editável de 12 níveis, ainda não validada.</p>'+planned().map(p=>'<button type="button" class="lab-seed" data-lab-seed="'+esc(p.id)+'">'+esc(p.name)+'</button>').join("")+'</aside>'}
 function identity(d){return '<section class="lab-panel"><div class="lab-panel-head"><span>01 / IDENTIDADE</span><h2>'+esc(d.name)+'</h2></div><div class="lab-grid">'+input('name','NOME',d.name)+input('work','OBRA / CONTEXTO',d.work)+choice('theme','IDENTIDADE VISUAL',d.theme,[['arquivo','Arquivo'],['jojo','Mangá'],['cyberpunk','Cyberpunk'],['signal','HUD'],['cinza','Cinza'],['dourado','Dourado']])+textarea('description','CONCEITO NARRATIVO',d.description,'Descreva a adaptação, sem atribuir mecânicas não conferidas.')+'</div><p class="lab-hint">'+(d.catalogId?'Vinculado ao dossiê '+esc(d.catalogId)+'; o original permanece intacto.':'Ficha criada localmente.')+'</p></section>'}
 function sources(d){return '<section class="lab-panel"><div class="lab-panel-head"><span>02 / BIBLIOTECA</span><h2>Fontes permitidas</h2></div><div class="lab-books">'+rules.books.map(b=>'<div class="lab-book"><label><input type="checkbox" data-book-id="'+esc(b.id)+'" '+(d.allowedBooks.includes(b.id)?'checked ':'')+(b.id==='jda-1.3'?'disabled ':'')+'><strong>'+esc(b.name)+'</strong><small>'+esc(b.edition||'edição a conferir')+'</small></label><span>'+(b.id==='jda-1.3'?'Regras parcialmente indexadas':'Referência de planejamento: opções mecânicas ainda BLOQUEADAS até catalogação e autorização')+'</span><a href="'+esc(b.url)+'" target="_blank" rel="noopener noreferrer">Consultar fonte</a></div>').join("")+'</div><p class="lab-hint">Marcar um suplemento apenas registra intenção de consulta; não libera poderes, magias ou itens sem fonte, página e pré-requisitos verificados. Novos livros selecionados entram na lista de pendências da ficha.</p></section>'}

 function specializations(d,report){
   const opts=engine.options;
   const declared=Object.entries(opts.basics).filter(([id])=>!rules.classes[id]).map(([,x])=>x.name).join(", ");
   const entryClasses=[...new Set(d.levels.map(x=>x.classId).filter(Boolean))];
   const variantRows=entryClasses.map(id=>{
    const index=d.levels.findIndex(x=>x.classId===id),selected=d.levels[index].variantId;
    const usable=Object.values(opts.variants).filter(x=>x.status==="verificado"&&x.baseClassId===id&&d.allowedBooks.includes(x.source.book));
    const active=opts.variants[selected];
    const comparison=report.rows.filter(x=>x.classId===id&&x.variantId).flatMap(x=>[
     ...x.removedGrants.map(k=>"REMOVIDA: "+(rules.abilities[k]?.name||k)),
     ...x.addedGrants.map(k=>"ADICIONADA: "+(rules.abilities[k]?.name||k))
    ]);
    return '<div class="lab-specialization"><strong>'+esc(rules.classes[id]?.name||id)+'</strong>'+
      choice('variant:'+index,'CLASSE VARIANTE',selected,[['','Classe básica (sem variante)'],...usable.map(x=>[x.id,x.name])])+
      (active?'<p class="lab-pending">'+esc(active.status!=="verificado"?"Não verificada — efeitos bloqueados":active.name)+'</p>':'')+
      (comparison.length?'<ul>'+comparison.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':'<small>Sem substituições verificadas aplicadas nesta build.</small>')+
      '</div>';
   }).join('');
   const distinctionRows=d.distinctions.map((item,i)=>{
    const meta=opts.distinctions[item.id];
    return '<div class="lab-specialization"><strong>'+esc(meta?.name||item.id)+'</strong>'+
     choice('distinctionAdmission:'+i,'ADMISSÃO',item.admission,[['pretendida','Pretendida'],['admissao-pendente','Admissão narrativa pendente'],['admitida','Admitida pela mesa'],['incompativel','Reprovada']])+
     input('distinctionApproval:'+i,'AUTORIZAÇÃO / REGISTRO DA MESA',item.approval)+
     textarea('distinctionNotes:'+i,'NOTAS DA DISTINÇÃO',item.notes)+
     '<p class="lab-pending">Poderes bloqueados até verificação do texto, página, requisitos e admissão.</p></div>';
   }).join('');
   const rec=engine.recommend(d);
   return '<section class="lab-panel lab-classes"><div class="lab-panel-head"><span>03 / ARQUITETURA</span><h2>CLASSES // CAMINHOS DE PODER</h2></div>'+
    '<p class="lab-hint">CLASSE BÁSICA → VARIANTE → CAMINHO → MULTICLASSE → DISTINÇÕES. Uma especialização não concede um segundo nível de classe nem duplica habilidades. Escolha uma variante apenas na primeira entrada da respectiva classe.</p>'+
    (variantRows||'<p class="lab-hint">Selecione uma classe nos avanços para comparar suas especializações.</p>')+
    '<div class="lab-specialization"><strong>CATÁLOGO MECÂNICO PENDENTE</strong><p>'+esc(declared)+'. Nomes identificados, mas PV/PM, proficiências, poderes ou progressão ainda precisam de conferência.</p><p>Variantes de Heróis de Arton: '+Object.values(opts.variants).map(x=>esc(x.name)+' (bloqueada)').join(', ')+'. A fonte promocional não contém as substituições necessárias.</p>'+
    (entryClasses.includes('arcanista')?'<p>Caminho do Arcanista: <strong>'+esc(d.arcanePath||'pendente')+'</strong>. Altere a seleção na área de atributos. Feiticeiro permanece com linhagem a conferir.</p>':'')+'</div>'+
    '<div class="lab-specialization"><strong>DISTINÇÃO // CONQUISTA</strong>'+
    choice('distinctionAdd','REGISTRAR DISTINÇÃO PRETENDIDA','',[['','Selecione para registrar'],...Object.values(opts.distinctions).filter(x=>!d.distinctions.some(z=>z.id===x.id)).map(x=>[x.id,x.name+' · regra pendente'])])+
    distinctionRows+'<p class="lab-hint">Admissão pela mesa não habilita poderes não catalogados. Nenhum bônus é concedido automaticamente.</p></div>'+
    '<div class="lab-grid">'+input('narrativeSubclass','ARQUÉTIPO / SUBCLASSE NARRATIVA',d.narrativeSubclass,'Ex.: Espadachim sobrenatural (sem efeito mecânico)')+'</div>'+
    '<div class="lab-specialization"><strong>ANALISAR BUILD // RECOMENDAR ESPECIALIZAÇÃO</strong><p>'+esc(rec.note)+'</p>'+
    (rec.variants.length?'<ul>'+rec.variants.map(v=>'<li>'+esc(v.name)+'</li>').join('')+'</ul>':'<small>Resultado inconclusivo: nenhuma alteração automática recomendada.</small>')+'</div></section>';
  }
 
 function attributes(d,report){
  const orig=rules.origins?.[d.originId],opts=Object.entries(rules.origins||{});
  const benefits=orig?'<div class="lab-grid">'+[0,1].map(i=>choice('originBenefit:'+i,'BENEFÍCIO '+(i+1),d.originBenefits[i]||'',[['','Escolha pendente'],...orig.choices.map(name=>[name,name])])).join('')+'</div>':'';
  return '<section class="lab-panel"><div class="lab-panel-head"><span>03 / CRIAÇÃO</span><h2>Atributos e origem</h2></div><div class="lab-grid">'+
   choice('raceId','RAÇA',d.raceId,[['','Pendente'],['humano','Humano · JdA p. 19']])+
   choice('originId','ORIGEM',d.originId,[['','Escolha a origem'],...opts.map(([id,o])=>[id,o.name])])+
   choice('arcanePath','CAMINHO DE ARCANISTA',d.arcanePath,[['','Sem Arcanista'],['mago','Mago · grimório'],['bruxo','Bruxo · foco'],['feiticeiro','Feiticeiro · linhagem a conferir']])+
   '</div>'+benefits+
   '<p class="lab-hint">Compra: '+report.attributeCost+' / 10 pontos. A origem concede escolhas de benefícios; itens e demais efeitos exigem conferência. '+sourceLink({book:'jda-1.3',page:'17',section:'Atributos',url:rules.multiclass.url})+'</p>'+
   '<div class="lab-attrs">'+engine.KEYS.map(k=>'<label>'+k+'<select data-attr="'+k+'">'+Object.keys(rules.pointBuy).map(v=>option(v,v+' · custo '+rules.pointBuy[v],d.attributes[k]===Number(v))).join('')+'</select><span>Final '+(report.attributes[k]>=0?'+':'')+report.attributes[k]+'</span></label>').join('')+'</div>'+
   (d.raceId==='humano'?'<fieldset class="lab-bonuses"><legend>HUMANO // +1 EM TRÊS ATRIBUTOS DIFERENTES</legend>'+engine.KEYS.map(k=>'<label><input type="checkbox" data-race-bonus="'+k+'"'+(d.raceBonuses.includes(k)?' checked':'')+'>'+k+'</label>').join('')+'</fieldset>':'')+
   input('trainedSkills','PERÍCIAS PREVISTAS (SEPARADAS POR VÍRGULA)',d.trainedSkills.join(', '),'Ex.: Luta, Fortitude, Furtividade')+
   '<p class="lab-hint">Versátil humano e proficiências devem ser conferidos com os benefícios de criação; esta lista registra a proposta, não concede treino extra automaticamente.</p></section>';
 }
 function spellbook(d){
  const levels=d.levels.filter(x=>x.classId==='arcanista').length;
  if(!levels)return '';
  return '<section class="lab-panel"><div class="lab-panel-head"><span>05 / MAGIAS</span><h2>Grimório e aprendizagem</h2></div><p class="lab-hint">Arcanista '+levels+' · '+esc(d.arcanePath||'caminho pendente')+'. Círculos dependem do nível de Arcanista. Mago precisa memorizar magias; Bruxo precisa de foco. Confira aprimoramentos, fonte e custo antes de usar. As magias listadas são propostas e podem ser editadas.</p>'+
   '<div class="lab-spell-grid">'+d.spellbook.map((s,i)=>'<article class="lab-ability"><strong>'+esc(s.name)+' · '+s.circle+'º círculo</strong><p>Nível da classe '+s.classLevel+' · '+esc(s.why)+'</p><p><b>Como usar:</b> '+esc(s.how)+'</p><small>'+esc(s.source)+'</small><button type="button" data-lab-remove-spell="'+i+'">REMOVER MAGIA</button></article>').join('')+'</div>'+
   '<form id="labSpellForm" class="lab-grid"><label class="lab-field">MAGIA<input name="name" maxlength="80" required placeholder="Nome oficial"></label><label class="lab-field">CÍRCULO<select name="circle"><option value="1">1º círculo</option><option value="2">2º círculo</option><option value="3">3º círculo</option></select></label><label class="lab-field">NÍVEL DE ARCANISTA NA AQUISIÇÃO<input name="classLevel" type="number" min="1" max="12" value="1"></label><label class="lab-field">JUSTIFICATIVA<input name="why" maxlength="350" required placeholder="Por que escolheu?"></label><label class="lab-field">COMO USAR<input name="how" maxlength="400" required placeholder="Quando, ação e custo"></label><button type="submit">REGISTRAR MAGIA</button></form></section>';
 }
 function abilityCard(a,classLevel,why="",usage="",selectedVersion=""){
  if(!a)return '<p class="lab-pending">Habilidade sem manual validado. Conferir regras antes de usar.</p>';
  const eligible=a.versions?.filter(v=>v.minClassLevel<=classLevel)||[];
  const activeVersion=eligible.find(v=>v.id===selectedVersion)||eligible.at(-1);
  const versions=a.versions?.length?'<div class="lab-version-audit"><b>Versões e patamares</b><ul>'+a.versions.map(v=>'<li>'+(classLevel>=v.minClassLevel?'DISPONÍVEL':'AINDA NÃO ADQUIRIDA')+' — '+esc(v.label)+' (nível da classe '+v.minClassLevel+')</li>').join('')+'</ul><p>Versões de patamar NÃO são versões da obra original. Não aplicar opções bloqueadas nem somar todas as versões.</p></div>':'';
  return '<details class="lab-ability"><summary>'+esc(a.name)+(activeVersion?' · '+esc(activeVersion.label):'')+'</summary><div><p><b>Quando:</b> '+esc(a.manual.action)+' <b>Custo:</b> '+esc(a.manual.cost)+'</p><p><b>Efeito:</b> '+esc(a.manual.effect)+'</p><p><b>Exemplo na mesa:</b> '+esc(a.manual.example)+'</p><p><b>Limitações:</b> '+esc(a.manual.limit)+'</p>'+(why?'<p><b>Por que esta escolha:</b> '+esc(why)+'</p>':'<p class="lab-pending">Justificativa específica do personagem pendente.</p>')+(usage?'<p><b>Uso na build:</b> '+esc(usage)+'</p>':'<p class="lab-pending">A explicação de uso específica ainda falta.</p>')+versions+'<p><b>Regra ambígua?</b> Registre a edição, aprimoramento, conflito de interpretação e decisão da mesa na seção deste nível; o texto oficial prevalece sobre o reflavor.</p><small>'+sourceLink(a.source)+'</small></div></details>'
 }
 function levelCard(d,row,i){
  const saved=d.levels[i],cls=rules.classes[saved.classId];
  const variant=row.variant?.status==='verificado'?row.variant:null;
   const prohibited=new Set(variant?.powers?.remove||[]);
   const exclusive=new Set(variant?.powers?.exclusive||[]);
   const powers=Object.entries(rules.abilities).filter(([id,a])=>a.kind==='poder'&&
    (a.classId===saved.classId&&!prohibited.has(id)||a.classId===variant?.id&&exclusive.has(id)))
    .map(([id,a])=>[id,a.name+(a.requires?.classLevel?' · classe '+a.requires.classLevel:'')]);
  return '<article class="lab-level"><div class="lab-level-title"><span>NÍVEL GLOBAL '+String(i+1).padStart(2,'0')+'</span><strong>'+(cls?esc(cls.name)+' '+row.classLevel:'Classe pendente')+'</strong>'+(row.pv!==null?'<small>PV base '+row.pv+' · PM base '+row.pm+'</small>':'')+'</div>'+(row.removedGrants?.length||row.addedGrants?.length?'<div class="lab-change"><strong>CLASSE ORIGINAL VS VARIANTE</strong> · removidas: '+esc(row.removedGrants.map(id=>rules.abilities[id]?.name||id).join(', ')||'nenhuma')+' · novas: '+esc(row.addedGrants.map(id=>rules.abilities[id]?.name||id).join(', ')||'nenhuma')+'</div>':'')+'<div class="lab-grid">'+choice('class:'+i,'CLASSE DESTE AVANÇO',saved.classId,[['','Escolha a classe'],...Object.entries(rules.classes).map(([id,c])=>[id,c.name])])+(cls&&row.classLevel>=row.powerFrom?choice('power:'+i,'PODER DE CLASSE',saved.powerId,[['','Escolha pendente'],...powers]):'')+'</div>'+(row.newClass?'<p class="lab-hint">Entrada em outra classe: ganha habilidades de classe de 1º nível e PV subsequentes; não recebe novamente perícias ou proficiências iniciais.</p>':'')+(row.grants.length?'<div class="lab-grants"><b>GANHOS AUTOMÁTICOS CONFERIDOS NA TABELA</b>'+row.grants.map(g=>abilityCard(g.ability,row.classLevel,saved.why,saved.usage)).join("")+'</div>':'')+(saved.powerId&&rules.abilities[saved.powerId]?abilityCard(rules.abilities[saved.powerId],row.classLevel,saved.why,saved.usage,saved.powerVersion):'')+
  '<details class="lab-ability lab-supplement"><summary>OPÇÃO DE SUPLEMENTO / REGISTRO EM REVISÃO'+(saved.customPowerName?' — '+esc(saved.customPowerName):'')+'</summary><div class="lab-grid">'+
  input('customPowerName:'+i,'NOME DA OPÇÃO',saved.customPowerName,'Deixe vazio se não usar conteúdo suplementar.')+
  choice('customPowerBook:'+i,'LIVRO / SUPLEMENTO',saved.customPowerBook,[['','Selecione a obra'],...rules.books.filter(b=>b.id!=='jda-1.3').map(b=>[b.id,b.name])])+
  input('customPowerEdition:'+i,'EDIÇÃO / NÚMERO DA REVISTA',saved.customPowerEdition)+
  input('customPowerPage:'+i,'PÁGINA / SEÇÃO',saved.customPowerPage)+
  textarea('customPowerPrereqs:'+i,'PRÉ-REQUISITOS A CONFERIR',saved.customPowerPrereqs)+
  textarea('customPowerEffect:'+i,'EFEITO MECÂNICO RESUMIDO',saved.customPowerEffect)+
  textarea('customPowerVersions:'+i,'OUTRAS VERSÕES / APRIMORAMENTOS',saved.customPowerVersions)+
  textarea('customPowerAmbiguity:'+i,'DIVERGÊNCIAS E DECISÃO DA MESA',saved.customPowerAmbiguity)+
  '</div><p>Este registro é editorial e não modifica automaticamente PV, PM, dano, ações ou pré-requisitos. Não copie longos trechos do livro; resuma e cite.</p></details>'+(saved.powerId&&rules.abilities[saved.powerId]?.versions?.length?choice('powerVersion:'+i,'VERSÃO / PATAMAR DA HABILIDADE',saved.powerVersion,[['','Automática pelo nível da classe'],...rules.abilities[saved.powerId].versions.filter(v=>v.minClassLevel<=row.classLevel).map(v=>[v.id,v.label])]):'')+'<div class="lab-grid">'+textarea('why:'+i,'POR QUE NESTE NÍVEL?',saved.why,'Função narrativa e motivo da escolha.')+textarea('usage:'+i,'COMO USAR?',saved.usage,'Condições e estratégia, sem efeito inventado.')+textarea('synergy:'+i,'SINERGIA A CONFERIR',saved.synergy)+textarea('limits:'+i,'LIMITES / DECISÃO DA MESA',saved.limits)+textarea('sourceNote:'+i,'FONTE, ERRATA E INTERPRETAÇÃO ESCOLHIDA',saved.sourceNote,'Edição, página e versões em conflito.')+'</div><small>'+sourceLink(row.source)+'</small></article>'
 }
 function progression(d,report){const distribution=Object.entries(report.levelsByClass).map(([id,n])=>rules.classes[id].name+' '+n).join(' / ');return '<section class="lab-panel"><div class="lab-panel-head"><span>04 / MULTICLASSE</span><h2>Distribuição de níveis</h2></div><p class="lab-hint">Cada linha é um avanço global. O nível de classe é contado separadamente. O exemplo Guerreiro 8 / Ladino 4 é apenas um formato possível, não uma ficha pronta.</p><div class="lab-summary"><strong>'+esc(distribution||'Classe pendente')+'</strong><span>PV base: '+(report.basePV??'—')+' · PM base: '+(report.basePM??'—')+'</span><small>'+esc(report.summary)+'</small></div>'+report.rows.map((row,i)=>levelCard(d,row,i)).join("")+'<div class="lab-row-actions"><button type="button" data-lab-action="add-level"'+(d.levels.length>=12?' disabled':'')+'>ADICIONAR NÍVEL</button><button type="button" data-lab-action="remove-level"'+(d.levels.length<=1?' disabled':'')+'>REMOVER ÚLTIMO</button></div></section>'}
 function inventory(d){return '<section class="lab-panel"><div class="lab-panel-head"><span>05 / INVENTÁRIO</span><h2>Registro de equipamentos</h2></div><p class="lab-hint">Itens aqui são anotações narrativas; não alteram ataque, Defesa ou carga até que as regras e a fonte sejam cadastradas.</p>'+d.inventory.map((item,i)=>'<div class="lab-item"><strong>'+esc(item.quantity)+'× '+esc(item.name)+'</strong><span>'+esc(item.note)+'</span><button type="button" data-lab-remove-item="'+i+'">REMOVER</button></div>').join("")+'<form id="labItemForm" class="lab-grid"><label class="lab-field">ITEM<input name="name" maxlength="100" required></label><label class="lab-field">QUANTIDADE<input name="quantity" type="number" min="1" max="99" value="1"></label><label class="lab-field">NOTA / FONTE<input name="note" maxlength="300"></label><button type="submit">REGISTRAR ITEM</button></form></section>'}
 function combat(d){const fields=[['style','ESTILO DE COMBATE'],['opening','INÍCIO DE COMBATE'],['combos','COMBINAÇÕES A CONFERIR'],['resources','GESTÃO DE RECURSOS'],['strengths','PONTOS FORTES'],['weaknesses','PONTOS FRACOS'],['evolution','EVOLUÇÃO DO NÍVEL 1 AO 12']];return '<section class="lab-panel"><div class="lab-panel-head"><span>06 / MESA</span><h2>Guia de combate</h2></div><p class="lab-hint">Registre a estratégia da adaptação. Uma sequência só deve ser tratada como legal após conferir ações, custos, duração e pré-requisitos na fonte.</p><div class="lab-grid">'+fields.map(([id,label])=>textarea('combat:'+id,label,d.combat[id],'Pendente de decisão e conferência.')).join('')+'</div></section>'}
 function audit(d,report){return '<section class="lab-panel lab-audit"><div class="lab-panel-head"><span>07 / CONFERÊNCIA</span><h2>'+report.issues.length+' pendência(s)</h2></div><p>Este rascunho não está aprovado para jogar. A lista mostra o que falta antes de fazer cálculos completos ou publicar uma adaptação.</p><ul>'+report.issues.map(v=>'<li>'+esc(v)+'</li>').join("")+'</ul>'+textarea('notes','DECISÕES E CORREÇÕES',d.notes,'Registre as decisões pendentes da mesa.')+'<p><a href="./docs/laboratorio.md">Como revisar e versionar uma ficha local</a></p></section>'}
 function editor(d){const report=engine.evaluate(d);return '<div class="lab-editor">'+identity(d)+sources(d)+specializations(d,report)+attributes(d,report)+progression(d,report)+spellbook(d)+inventory(d)+combat(d)+audit(d,report)+'<button type="button" class="lab-delete" data-lab-action="delete">EXCLUIR ESTE RASCUNHO LOCAL</button></div>'}
 function draw(){if(!host)return;const d=current();host.innerHTML='<div class="container lab-shell">'+toolbar()+(message?'<p class="lab-message" role="status">'+esc(message)+'</p>':'')+'<div class="lab-layout">'+sidebar()+(d?editor(d):'<div class="lab-empty"><h2>Comece uma ficha</h2><p>Crie uma ficha pessoal ou abra um dos dez dossiês para trabalhar em uma cópia local. As entradas oficiais não são modificadas.</p></div>')+'</div></div>';document.title='Laboratório de Builds // O Sistema T20'}
 function render(root,seedId){host=root;document.body.removeAttribute('data-theme');document.body.removeAttribute('data-art');document.body.removeAttribute('data-world');document.body.removeAttribute('data-family');document.body.removeAttribute('data-pattern');document.body.removeAttribute('data-finish');document.body.removeAttribute('data-lineage');document.body.removeAttribute('data-variant');document.body.style?.removeProperty?.('--char-color');document.body.dataset.lab='true';
  if(seedId){const seed=planned().find(x=>x.id===seedId);if(seed){let d=drafts.find(x=>x.catalogId===seedId);if(!d){d=seedDraft(seed);drafts.unshift(d);save()}active=d.id}}
  draw()}
 function owns(target){return !!target.closest?.('.lab-shell')}
 function handleClick(evt){const t=evt.target;if(!owns(t))return false;
  const open=t.closest('[data-lab-open]'),seed=t.closest('[data-lab-seed]'),act=t.closest('[data-lab-action]'),remove=t.closest('[data-lab-remove-item]'),removeSpell=t.closest('[data-lab-remove-spell]');
  if(open){active=open.dataset.labOpen;message='';draw();return true}
  if(seed){const s=planned().find(x=>x.id===seed.dataset.labSeed);if(s){let d=drafts.find(x=>x.catalogId===s.id);if(!d){d=seedDraft(s);drafts.unshift(d);save()}active=d.id;draw()}return true}
  const d=current();if(!act&&!remove&&!removeSpell)return false;
  if(remove&&d){d.inventory.splice(Number(remove.dataset.labRemoveItem),1);save();draw();return true}
  if(removeSpell&&d){d.spellbook.splice(Number(removeSpell.dataset.labRemoveSpell),1);save();draw();return true}
  if(act?.dataset.labAction==='new'){if(drafts.length>=40){message='Limite de 40 rascunhos locais; exporte e remova um antes de continuar.';draw();return true}const n=engine.makeDraft();drafts.unshift(n);active=n.id;save();draw();return true}
  if(act?.dataset.labAction==='audit-export'){window.T20_CLASS_REVIEW?.exportReport();return true}
  if(act?.dataset.labAction==='backup-export'){window.T20_CLASS_REVIEW?.exportBackup();return true}
  if(!d)return true;
  if(act.dataset.labAction==='add-level'&&d.levels.length<12)d.levels.push(engine.emptyLevel());
  if(act.dataset.labAction==='remove-level'&&d.levels.length>1)d.levels.pop();
  if(act.dataset.labAction==='delete'){drafts=drafts.filter(x=>x.id!==d.id);active='';save()}
  if(act.dataset.labAction==='export'){const blob=new Blob([engine.exportJSON(d)],{type:'application/json'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='o-sistema-'+d.id+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),2000);return true}
  save();draw();return true
 }
 function handleInput(evt){if(!owns(evt.target))return false;const d=current();if(!d)return false;const t=evt.target;
  if(t.dataset.attr){d.attributes[t.dataset.attr]=Number(t.value);save();return true}
  if(t.dataset.raceBonus){d.raceBonuses=t.checked?[...new Set([...d.raceBonuses,t.dataset.raceBonus])]:d.raceBonuses.filter(x=>x!==t.dataset.raceBonus);save();return true}
  if(t.dataset.bookId){if(t.dataset.bookId==='jda-1.3')return true;const id=t.dataset.bookId;d.allowedBooks=t.checked?[...new Set([...d.allowedBooks,id])]:d.allowedBooks.filter(x=>x!==id);save();return true}
  const key=t.dataset.field;if(!key)return false;
  const [field,index]=key.split(':');if(index!==undefined){
   if(field==='originBenefit'){d.originBenefits[Number(index)]=t.value;save();return true}
   if(field==='class'){d.levels[Number(index)].classId=t.value;d.levels[Number(index)].variantId='';d.levels[Number(index)].powerId='';d.levels[Number(index)].powerVersion=''}else if(field==='variant'){const level=d.levels[Number(index)];if(!d.levels.slice(0,Number(index)).some(x=>x.classId===level.classId))level.variantId=t.value}
    else if(field==='distinctionAdmission'&&d.distinctions[Number(index)])d.distinctions[Number(index)].admission=t.value;
    else if(field==='distinctionApproval'&&d.distinctions[Number(index)])d.distinctions[Number(index)].approval=t.value;
    else if(field==='distinctionNotes'&&d.distinctions[Number(index)])d.distinctions[Number(index)].notes=t.value;
    else if(field==='power'){d.levels[Number(index)].powerId=t.value;d.levels[Number(index)].powerVersion=''}else if(field==='combat'&&d.combat[index]!==undefined)d.combat[index]=t.value;else if(d.levels[Number(index)])d.levels[Number(index)][field]=t.value}
  else if(field==='trainedSkills')d.trainedSkills=t.value.split(',').map(x=>x.trim()).filter(Boolean);
  else if(field==='originId'){d.originId=t.value;d.originBenefits=[]}
   else if(field==='distinctionAdd'){if(t.value&&!d.distinctions.some(x=>x.id===t.value))d.distinctions.push(engine.options.distinctItem({id:t.value}));draw();}
  else d[field]=t.value;
  save();return true
 }
 function refresh(){draw()}
 function handleImport(evt){if(evt.target.id!=='labImport')return false;const file=evt.target.files?.[0];if(!file)return true;
  file.text().then(text=>{try{const d=engine.importJSON(text);if(drafts.some(x=>x.id===d.id))throw Error('Este ID já existe. Exporte o rascunho atual antes de substituí-lo.');if(drafts.length>=40)throw Error('Limite de 40 rascunhos locais.');drafts.unshift(d);active=d.id;message='JSON importado como rascunho local; regras continuam sujeitas à conferência.';save()}catch(error){message=error.message||'JSON inválido.'}draw()});evt.target.value='';return true
 }
 function handleSubmit(evt){
  if(evt.target.id==='labSpellForm'){evt.preventDefault();const d=current();if(!d)return true;const values=Object.fromEntries(new FormData(evt.target));d.spellbook.push({...values,circle:Number(values.circle),classLevel:Number(values.classLevel),source:'Tormenta20 — Jogo do Ano v1.3, Cap. 4 (a conferir)'});Object.assign(d,engine.normalize(d));save();draw();return true}
  if(evt.target.id!=='labItemForm')return false;evt.preventDefault();const d=current();if(!d)return true;const values=Object.fromEntries(new FormData(evt.target));d.inventory.push({name:values.name,note:values.note,quantity:values.quantity});Object.assign(d,engine.normalize(d));save();draw();return true}
 document.addEventListener('click',handleClick);
 document.addEventListener('input',handleInput);
 document.addEventListener('change',evt=>{if(handleImport(evt))return;if(handleInput(evt))refresh()});
 document.addEventListener('submit',handleSubmit);
 window.T20_LAB={render,list:()=>drafts.slice()};
})();
