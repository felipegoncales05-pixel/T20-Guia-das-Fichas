// Teste real de viewport usando Chromium/Playwright; screenshots opcionais no CI.
const {chromium}=require("playwright");
const {pathToFileURL}=require("node:url");
const path=require("node:path");
const fs=require("node:fs");
const assert=require("node:assert/strict");
const quick=process.env.T20_QUICK==="1";
const sizes=quick?[[375,812],[768,1024],[1440,900]]:[[320,700],[360,740],[375,812],[390,844],[430,932],[600,900],[768,1024],[820,1180],[1024,768],[1440,900],[844,390]];
const site=pathToFileURL(path.resolve("index.html")).href;
async function revealAllCards(page){
 // A interseção acrescenta lotes automaticamente; clicar via DOM em uma única
 // transação evita a corrida entre contagem do botão e seu desaparecimento.
 await page.evaluate(()=>{
  for(let i=0;i<22;i++){
   const load=document.querySelector("[data-load-more]");
   if(!load)break;
   load.click();
  }
 });
 assert.equal(await page.locator("[data-load-more]").count(),0,"Paginação não terminou.");
}
const allIds=["gyro","d","david","cipher","rentarou","yoru","diego","ado","cyrene","marin","makima","optimus","jojo-dio1","jojo-kars","jojo-dio3","jojo-kira","jojo-diavolo","jojo-pucci","jojo-valentine","jojo-tooru","yuta","goku","hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine","hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae","em-herta","em-acheron","em-phantylia","em-diamond","em-taravan","em-zandar","em-shuhu","em-zephyro","em-celenova","em-irontomb","em-archforger","em-asat","em-luxbane","elster","jojo-jonathan","jojo-joseph","jojo-jotaro","jojo-josuke4","jojo-giorno","jojo-jolyne","jojo-johnny","jojo-gappy","denji","satoru-gojo","shigaraki","midoriya"];
const plannedIds=["toji","aizen","vegitto","gogeta","soul-of-cinder","isaac","adao","grimm","sekiro","kaneki"];
const representativeIds=["gyro","d","david","diego","jojo-johnny","jojo-valentine","jojo-jolyne","jojo-jonathan","em-acheron","satoru-gojo","midoriya","goku","elster"];
fs.mkdirSync("tests/screenshots",{recursive:true});
async function assertLayout(page,label){
 const p=await page.evaluate(()=>({
  width:document.documentElement.clientWidth,
  scroll:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),
  tabs:[...document.querySelectorAll(".detail-tabs [role=tab]")].map(el=>{
   const r=el.getBoundingClientRect();
   return [r.left,r.right,r.height,getComputedStyle(el).display,el.textContent.trim()];
  })
 }));
 if(p.scroll>p.width+2){
  const offenders=await page.evaluate(()=>[...document.querySelectorAll('body *')].map(el=>{
   const box=el.getBoundingClientRect();
   return {element:el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(typeof el.className==='string'&&el.className?'.'+el.className.trim().split(/\s+/).join('.'):''),left:Math.round(box.left),right:Math.round(box.right),width:Math.round(box.width)};
  }).filter(x=>x.right>document.documentElement.clientWidth+2||x.left< -2).slice(0,20));
  console.error(label+" elementos que ultrapassam a tela",offenders);
 }
 assert.ok(p.scroll<=p.width+2,label+" overflow "+JSON.stringify(p));
 for(const t of p.tabs)assert.ok(t[0]>=-2&&t[1]<=p.width+2&&t[2]>=40&&t[3]!=="none",label+" aba inacessível "+t[4]);
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:["--no-sandbox"]});
 try{
  for(const [width,height] of sizes){
   const page=await browser.newPage({viewport:{width,height}});
   const errors=[];
   page.on("pageerror",err=>errors.push(String(err)));
   await page.route(/^https?:\/\//,route=>route.abort()); // Testa também fallbacks de imagens
   await page.goto(site,{waitUntil:"load"});
   assert.equal(await page.locator(".roster-card").count(),24,"Catálogo deve iniciar com 24 cards");
   assert.ok(await page.locator(".top-right .top-version").isVisible());
   assert.ok(await page.locator(".hero-mark").isVisible());
   await assertLayout(page,width+" catálogo");
   if([375,768,1440].includes(width))await page.screenshot({path:"tests/screenshots/"+width+"-entrada.png"});
   const names=await page.locator(".roster-card h3").allTextContents();
   const collator=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:true});
   assert.deepEqual(names,[...names].sort(collator.compare),width+": fichas fora da ordem alfabética");
   assert.match(await page.locator("#resultsCount").textContent(),/319 DE 319/);
   await page.locator("#universe").selectOption("fate");
   assert.ok([24,48,72,96,98].includes(await page.locator(".roster-card").count()),width+": Fate deve carregar em lotes");
   assert.match(await page.locator("#resultsCount").textContent(),/98 DE 319/);
   await revealAllCards(page);
   assert.equal(await page.locator(".roster-card").count(),98,width+": 98 Espíritos Heroicos de Fate");
   assert.equal(await page.locator('[data-open="fate-artoria"]').count(),1,width+": Artoria não deve duplicar cards");
   assert.equal(await page.locator('[data-card-switch="fate-artoria"]').count(),7,width+": faltam formas de Artoria");
   await page.locator("#universe").selectOption("the-boys");
   assert.equal(await page.locator(".roster-card").count(),12,width+": Os Sete e grupo The Boys da expansão VIII");
   await page.locator("#universe").selectOption("blue-lock");
   assert.equal(await page.locator(".roster-card").count(),2,width+": Isagi e Rin");
   await page.locator("#universe").selectOption("one-punch-man");
   assert.equal(await page.locator(".roster-card").count(),1,width+": Saitama");
   await page.locator("#universe").selectOption("kamen-rider");
   assert.equal(await page.locator(".roster-card").count(),1,width+": Sento Kiryu");
   await page.locator("#universe").selectOption("all");
   await page.locator("#universe").selectOption("wuwa");
   assert.equal(await page.locator(".roster-card").count(),3,width+": crossover WuWa incompleto");
   await page.locator("#universe").selectOption("overwatch");
   assert.equal(await page.locator(".roster-card").count(),1,width+": D.Va não aparece");
   await page.locator("#universe").selectOption("all");
   await page.locator("#universe").selectOption("umamusume");
   assert.ok([24,48,57].includes(await page.locator(".roster-card").count()),width+": Uma deve carregar em lotes e a interseção pode antecipar um lote");
   await revealAllCards(page);
   assert.equal(await page.locator(".roster-card").count(),57,width+": faltam Umas no filtro");
   assert.ok(await page.locator('[data-open="uma-daitaku-helios"]').count()===1,width+": Helios ausente");
   assert.ok(await page.locator('[data-open="uma-matikanetannhauser"]').count()===1,width+": Mambo ausente");
   await page.locator("#universe").selectOption("all");
    await revealAllCards(page);
    if([375,1440].includes(width)){
      await page.locator('[data-card-switch="fate-artoria"][data-card-mode="alter"]').click();
      assert.equal(await page.locator('[data-card-switch="fate-artoria"][data-card-mode="alter"]').getAttribute('aria-pressed'),'true',width+': Artoria Alter selecionada');
      await page.locator('[data-open="fate-artoria"]').click();
      assert.match(await page.locator('#character-title').textContent(),/Artoria.*Alter/i,width+': dossiê Alter');
      assert.ok(page.url().includes('/fate-artoria/alter'),width+': URL da versão Alter');
      await page.locator('[data-fate-character="fate-artoria"][data-fate-mode="caster"]').click();
      assert.match(await page.locator('#character-title').textContent(),/Caster/i,width+': mudou para Caster Artoria');
      assert.ok(page.url().includes('/fate-artoria/caster'),width+': URL da Caster');
      await page.goto(site,{waitUntil:'load'});
      await revealAllCards(page);
    }
    // Fase III: categoria Chrysos e alternadores de Diego/Goku.
    await page.locator("#universe").selectOption("chrysos");
    const heirs=await page.locator(".roster-card").evaluateAll(nodes=>nodes.map(node=>node.dataset.open));
    assert.ok(heirs.includes("cyrene")&&heirs.includes("cipher"),width+": herdeiros incompletos");
    assert.equal(heirs.length,new Set(heirs).size,width+": herdeiros duplicados");
    assert.ok(!heirs.includes("em-acheron"),width+": Emanador no filtro Chrysos");
    if([375,1440].includes(width))await page.locator("#roster").screenshot({path:"tests/screenshots/"+width+"-chrysos-fase3.png"});
    await page.locator("#universe").selectOption("all");
    await revealAllCards(page);
    for(const [id,labels] of [["diego",["SM","TW"]],["goku",["DBZ","GT","DAIMA","SUPER"]]]){
      const buttons=page.locator('[data-card-switch="'+id+'"]');
      assert.deepEqual(await buttons.allTextContents(),labels,width+": siglas incorretas em "+id);
      const coords=await buttons.evaluateAll(nodes=>nodes.map(n=>({y:n.getBoundingClientRect().y,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height})));
      assert.ok(coords.every(n=>Math.abs(n.y-coords[0].y)<=2&&n.height<=36&&n.width>=15),width+": seletor não horizontal/compacto em "+id);
      assert.equal(await buttons.first().getAttribute("aria-pressed"),"true",width+": primeira versão não ativa em "+id);
      if([375,1440].includes(width))await page.locator('[data-open="'+id+'"]').screenshot({path:"tests/screenshots/"+width+"-"+id+"-fase3-antes.png"});
      await buttons.last().click();
      assert.equal(await page.locator('[data-card-switch="'+id+'"]').last().getAttribute("aria-pressed"),"true",width+": variante não alternou em "+id);
      assert.equal(await page.evaluate(()=>location.hash),"",width+": alternador abriu o dossiê de "+id);
      if([375,1440].includes(width))await page.locator('[data-open="'+id+'"]').screenshot({path:"tests/screenshots/"+width+"-"+id+"-fase3-depois.png"});
    }
    await page.locator("#search").fill("MAKIMA");
   await page.waitForFunction(()=>document.querySelectorAll(".roster-card").length===1,{timeout:5000});
   assert.equal(await page.locator(".roster-card").count(),1,width+": busca por personagem");
   assert.match(await page.locator("#resultsCount").textContent(),/01 DE 319/);
   await page.locator("[data-clear-search]").click();
   await revealAllCards(page);
   assert.equal(await page.locator(".roster-card").count(),319,width+": limpar busca");
   await page.locator("#universe").selectOption("jojo");
   assert.ok(await page.locator(".roster-card").count()>=8,width+": filtro JoJo");
   await page.locator("#universe").selectOption("mha");
   assert.equal(await page.locator(".roster-card").count(),2,width+": filtro My Hero Academia");
   await page.locator("#universe").selectOption("all");
    await revealAllCards(page);
   assert.equal(await page.locator(".roster-card[data-pending]").count(),0,width+": fichas ainda pendentes");
    for(const id of plannedIds)assert.equal(await page.locator('[data-open="'+id+'"]').count(),1,width+": ficha automática não está no catálogo");
    const tojiCard=page.locator('[data-open="toji"]');
    await tojiCard.scrollIntoViewIfNeeded();
    const art=tojiCard.locator('.photo img:not(.portrait-underlay)');
    await page.waitForFunction(()=>document.querySelector('[data-open="toji"] .photo img:not(.portrait-underlay)')?.naturalWidth>0,null,{timeout:10000});
    assert.ok(await art.evaluate(el=>el.naturalWidth>0),width+": retrato de Toji não carregou");
    assert.equal(await page.locator('[data-open="shigaraki"] img[data-cover-volume*="Volume 25"]').count(),1,width+": falta capa do volume 25");
    assert.equal(await page.locator('[data-open="jojo-dio1"] img[data-cover-volume]').count(),0,width+": Dio Brando não restaurado");
    if([375,1440].includes(width))await page.locator('[data-open="toji"]').screenshot({path:"tests/screenshots/"+width+"-toji-ficha-ativa.png"});
   if([375,1440].includes(width)){
    await page.locator("#search").fill("Celenova");
    await page.waitForFunction(()=>document.querySelector('[data-open="em-celenova"]')&&document.querySelectorAll(".roster-card").length===1,{timeout:5000});
    const celenova=page.locator('[data-open="em-celenova"]');
    const celenovaArt=celenova.locator('img:not(.portrait-underlay)');
    await celenovaArt.scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.querySelector('[data-open="em-celenova"] img:not(.portrait-underlay)')?.naturalWidth>0,null,{timeout:15000});
    await celenovaArt.evaluate(el=>el.decode());
    assert.equal(await celenova.locator('.card-body').evaluate(el=>getComputedStyle(el).borderTopWidth),"0px","Faixa horizontal atravessou Celenova");
    await celenova.screenshot({path:"tests/screenshots/"+width+"-celenova-depois.png"});
    await page.locator("[data-clear-search]").click();
   }
   if([375,1440].includes(width)){
    await page.locator("#universe").selectOption("cyberpunk");
    assert.equal(await page.locator(".roster-card").count(),2);
    const capri=page.locator('[data-open="d"] .capri-gaze');
    // A HUD fica ativa somente enquanto o card recebe interação.
    await page.locator('[data-open="d"]').hover();
    await capri.scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.querySelector('[data-open="d"] .capri-gaze')?.naturalWidth>0);
    assert.ok(await capri.evaluate(el=>el.naturalWidth>0),"Retrato local da Capri não carregou");
    assert.equal(await page.locator('[data-open="d"] .capri-eye').count(),0,"Ponto extra no rosto");
    assert.equal(await page.locator('[data-open="david"] .psycho-echo').count(),1);
    await page.locator('[data-open="d"]').hover({position:{x:100,y:95}});
    await page.waitForFunction(()=>!!document.querySelector('[data-open="d"]')?.style.getPropertyValue("--capri-x"));
    assert.ok(Math.abs(Number.parseInt(await page.locator('[data-open="d"]').evaluate(el=>el.style.getPropertyValue("--capri-x")),10))<=2);
    await page.locator("#roster").screenshot({path:"tests/screenshots/"+width+"-cyberpunk.png"});
    const laugh=await page.locator(".capri-laugh").evaluate(el=>{const a=el.getAnimations()[0];a.pause();a.currentTime=14100;return Number(getComputedStyle(el).opacity)});
    const mouth=await page.locator(".capri-mouth").evaluate(el=>{const a=el.getAnimations()[0];a.pause();a.currentTime=14100;return {opacity:Number(getComputedStyle(el).opacity),transform:getComputedStyle(el).transform,loaded:el.naturalWidth>0}});
    assert.ok(laugh>.9&&mouth.opacity>.9&&mouth.transform!=="none"&&mouth.loaded,"Boca e risada da Capri fora de sincronia");
    await page.locator("#roster").screenshot({path:"tests/screenshots/"+width+"-capri-risada.png"});
    for(const selector of [".capri-laugh",".capri-mouth"])await page.locator(selector).evaluate(el=>el.getAnimations()[0].currentTime=0);
    await page.locator('[data-open="david"]').hover();
    const opacity=await page.locator(".psycho-echo").evaluate(el=>{const a=el.getAnimations()[0];a.pause();a.currentTime=13620;return Number(getComputedStyle(el).opacity)});
    await page.locator(".psycho-error").evaluate(el=>{const a=el.getAnimations()[0];a.pause();a.currentTime=13620});
    assert.ok(opacity>0&&opacity<=.18,"Glitch de David intenso ou ausente: "+opacity);
    await page.locator("#roster").screenshot({path:"tests/screenshots/"+width+"-cyberpunk-pulso.png"});
    await page.locator("#universe").selectOption("all");
    await revealAllCards(page);
   }
   if([375,768,1440].includes(width)){
    await page.locator('[data-card-switch="diego"][data-card-mode="alternative"]').click();
    assert.equal(await page.locator('[data-open="diego"]').getAttribute("data-variant"),"alternative");
    assert.match(await page.locator('[data-open="diego"] img:not(.portrait-underlay)').getAttribute("src"),/diego-alternative\.webp$/);
    await page.locator('[data-open="diego"]').click();
    await page.locator('body[data-art="diego"][data-variant="alternative"]').waitFor();
    assert.equal(await page.locator('.hero-portrait img:not(.portrait-underlay)').getAttribute("src"),'./assets/card-art/diego-alternative.webp');
    await assertLayout(page,width+" Diego alternativo a partir do card");
    await page.locator('.back-link').click();
    await revealAllCards(page);
    await page.locator('[data-card-switch="goku"][data-card-mode="super"]').click();
    assert.equal(await page.locator('[data-open="goku"]').getAttribute("data-variant"),"super");
    assert.match(await page.locator('[data-open="goku"]').textContent(),/Dragon Ball Super/);
    assert.match(await page.locator('[data-open="goku"] img:not(.portrait-underlay)').getAttribute("src"),/goku-super\.webp$/);
    await assertLayout(page,width+" variantes no catálogo");
   }
   await page.locator('[data-open="ado"]').scrollIntoViewIfNeeded();
   const poster=page.locator('[data-open="ado"] .portrait-underlay');
   await poster.waitFor();
   await page.waitForFunction(()=>document.querySelector('[data-open="ado"] .portrait-underlay')?.naturalWidth>0,{timeout:10000});
   assert.ok(await poster.isVisible(),width+": imagem offline de reserva ausente");
   if([375,768,1440].includes(width)){
    await page.locator('#roster-title').scrollIntoViewIfNeeded();
    await page.screenshot({path:"tests/screenshots/"+width+"-catalogo.png"});
   }
   for(const id of (!quick&&[375,768,1440].includes(width)?allIds:representativeIds)){
    await page.goto(site+"#/"+id+"/overview",{waitUntil:"load"});
    assert.equal(await page.locator(".detail-tabs button").count(),9);
    assert.ok(await page.locator("body").getAttribute("data-finish"),id+": acabamento ausente");
    assert.ok(await page.locator(".section-context").isVisible(),id+": assinatura interna ausente");
    if([375,1440].includes(width)&&["d","david","jojo-jolyne","em-acheron","elster","goku"].includes(id))
     await page.locator(".detail-hero").screenshot({path:"tests/screenshots/"+width+"-"+id+"-capa.png"});
    if(id==="em-acheron")assert.match(await page.locator("#detail-section").textContent(),/Samurai|katana/i);
    if(width===375&&["jojo-dio1","jojo-dio3","d","jojo-valentine","gyro","jojo-pucci","jojo-kira","jojo-tooru","jojo-diavolo","em-zandar"].includes(id)){
     const portrait=page.locator(".hero-portrait img:not(.portrait-underlay)");
     await portrait.scrollIntoViewIfNeeded();
     assert.match(await portrait.getAttribute("src"),/assets\/art-optimized\/[a-z0-9-]+\.webp$/);
     await portrait.evaluate(el=>el.decode());
     assert.ok(await portrait.evaluate(el=>el.naturalWidth>0),id+": imagem WebP local não carregou no celular");
    }
    if(width===375&&["ado","diego","elster","goku","hsr-aglaea","em-acheron"].includes(id)){
     const portrait=page.locator(".hero-portrait img:not(.portrait-underlay)");
     await portrait.scrollIntoViewIfNeeded();
     await portrait.evaluate(el=>el.decode());
     assert.ok(await portrait.evaluate(el=>el.naturalWidth>0),id+": retrato local não carregou");
     assert.match(await portrait.getAttribute("src"),/assets\/card-art\/[a-z0-9-]+\.webp$/);
    }
    await assertLayout(page,width+" "+id+" dossiê");
    if(width===375&&(id==="gyro"||id==="rentarou"))await page.screenshot({path:"tests/screenshots/375-"+id+".png"});
    if(id==="diego"){
     await page.locator("[data-diego-toggle]").click();
     await page.locator("#character-title").getByText(/Alternative/).waitFor();
     assert.equal(await page.locator("body").getAttribute("data-theme"),"diego-alt");
     assert.equal(await page.locator("body").getAttribute("data-finish"),"foil");
     if([375,1440].includes(width))await page.locator(".detail-hero").screenshot({path:"tests/screenshots/"+width+"-diego-alternative.png"});
     await assertLayout(page,width+" diego / THE WORLD");
     await page.locator("[data-diego-toggle]").click();
     assert.equal(await page.locator("body").getAttribute("data-theme"),"diego");
    }
    if(id==="goku"&&[375,1440].includes(width)){
     for(const variant of ["gt","daima","super"]){
      await page.goto(site+"#/goku/"+variant+"/overview",{waitUntil:"load"});
      assert.equal(await page.locator("body").getAttribute("data-variant"),variant);
      assert.match(await page.locator(".hero-portrait img:not(.portrait-underlay)").getAttribute("src"),new RegExp("goku-"+variant+"\\.webp$"));
      await assertLayout(page,width+" Goku / "+variant);
      await page.locator(".detail-hero").screenshot({path:"tests/screenshots/"+width+"-goku-"+variant+".png"});
     }
     await page.goto(site+"#/goku/overview",{waitUntil:"load"});
    }
    await page.locator('[data-tab="attributes"]').click();
    await page.locator(".attr-row").first().waitFor();
    assert.equal(await page.locator("#detail-section").getAttribute("data-tab"),"attributes");
    assert.equal(await page.locator(".attr-row").count(),6);
    await assertLayout(page,width+" "+id+" radar");
    if(width===375&&id==="gyro")await page.screenshot({path:"tests/screenshots/375-radar.png"});
    await page.locator('[data-tab="equipment"]').click();
    await page.locator(".gear-card").first().waitFor();
    await page.locator(".gear-card").last().locator("summary").click();
    assert.equal(await page.locator(".gear-card").last().getAttribute("open"),"");
    await assertLayout(page,width+" "+id+" inventário");
    await page.locator('[data-tab="progression"]').click();
    await page.locator("#levelSelect").waitFor();
    await page.locator("#levelSelect").evaluate(el=>{el.value="12";el.dispatchEvent(new Event("input",{bubbles:true}))});
    assert.equal((await page.locator("#selectedLevel").textContent()).trim(),"12");
    assert.equal((await page.locator("#globalLevelText").textContent()).trim(),"12");
    const maxPV=Number((await page.locator("[data-stat=PV]").textContent()).trim());
    const maxPM=Number((await page.locator("[data-stat=PM]").textContent()).trim());
    assert.ok(maxPV>13&&maxPM>=36,id+": nível não atualizou PV/PM");
    assert.ok(await page.locator("#levelReadout").textContent().then(t=>t.includes("COMO USAR NA MESA")));
    assert.equal(await page.locator(".level-item").count(),12);
    await assertLayout(page,width+" "+id+" progressão");
    await page.locator('[data-tab="techniques"]').click();
    await page.locator(".tech-card").first().waitFor();
    await assertLayout(page,width+" "+id+" técnicas");
    await page.locator('[data-tab="sources"]').click();
    await page.locator(".source-link").first().waitFor();
    assert.equal(await page.locator(".source-level").count(),12,id+": páginas por nível");
    await assertLayout(page,width+" "+id+" fontes");
   }
   for(const id of (!quick&&width===375?plannedIds:["toji","soul-of-cinder","isaac"])){
     await page.goto(site+"#/"+id+"/overview",{waitUntil:"load"});
     assert.equal(await page.locator(".detail-tabs button").count(),9,id+": navegação incompleta");
     assert.equal(await page.locator("body").getAttribute("data-pending"),null,id+": ficha não deve ficar pendente");
     assert.ok(await page.locator(".global-level-picker").isVisible(),id+": controle de nível ausente");
     assert.ok(await page.locator("[data-stat=PV]").count()>0,id+": PV indisponível");
     await assertLayout(page,width+" "+id+" dossiê completo");
     if([375,1440].includes(width)&&["toji","soul-of-cinder","isaac"].includes(id))
      await page.locator(".detail-hero").screenshot({path:"tests/screenshots/"+width+"-"+id+"-dossie.png"});
     await page.locator('[data-tab="progression"]').click();
     await page.locator(".level-item").first().waitFor();
     assert.equal(await page.locator(".level-item").count(),12,id+": doze níveis não apresentados");
     await page.locator("#levelSelect").evaluate(el=>{el.value="12";el.dispatchEvent(new Event("input",{bubbles:true}))});
     assert.equal((await page.locator("#selectedLevel").textContent()).trim(),"12",id+": nível não atualizado");
     await assertLayout(page,width+" "+id+" progressão automática");
     await page.locator('[data-tab="sources"]').click();
     await page.locator(".source-level").first().waitFor();
     assert.equal(await page.locator(".source-level").count(),12,id+": páginas de cada nível ausentes");
     await page.locator('[data-tab="review"]').click();
     await page.locator("#reviewForm").waitFor();
     await assertLayout(page,width+" "+id+" revisão");
    }
    if(width===375){
    await page.locator('#reviewForm [name="title"]').fill("Fonte a conferir");
    await page.locator('#reviewForm [name="body"]').fill("Verificar regras e páginas antes de montar a build.");
    await page.locator('#reviewForm button[type="submit"]').click();
    assert.match(await page.locator("#reviewRecords").textContent(),/Fonte a conferir/);
    assert.equal(await page.locator("#reviewRecords .review-entry").count(),1);
   }
   if([375,1440].includes(width)){
    await page.goto(site+"#/laboratorio",{waitUntil:"load"});
    await page.locator('[data-lab-seed="toji"]').click();
    assert.match(await page.locator('.lab-editor').textContent(),/Toji/);
    assert.equal(await page.locator('.lab-draft').count(),1);
    assert.match(await page.locator('.lab-summary').textContent(),/Guerreiro 8 \/ Ladino 4/,"Roteiro inicial de Toji ausente");
    assert.equal(await page.locator('.lab-level').count(),12,"Roteiro não contém 12 níveis");
    await page.locator('[data-field="class:0"]').selectOption('lutador');
    assert.match(await page.locator('.lab-summary').textContent(),/Lutador 1 \/ Guerreiro 7 \/ Ladino 4/);
    assert.match(await page.locator('.lab-summary').textContent(),/PV base: 103 · PM base: 40/);
    await page.locator('[data-book-id="herois"]').check();
    assert.doesNotMatch(await page.locator('.lab-audit').textContent(),/Heróis de Arton.*opções mecânicas ainda não catalogadas/,"Livro parcialmente catalogado não deve bloquear variantes verificadas");
    await page.locator('[data-field="variant:0"]').selectOption('atleta');
    assert.match(await page.locator('.lab-level').first().textContent(),/Façanha Atlética/,"Variante Atleta não aplicada na interface");
    assert.doesNotMatch(await page.locator('.lab-level').first().locator('.lab-grants').textContent(),/Golpe Relâmpago/,"Variante Atleta herdou Golpe Relâmpago indevidamente");
    await page.locator('[data-field="variant:0"]').selectOption('');
    assert.equal(await page.locator('[data-field="originId"]').inputValue(),"soldado","Origem de Toji ausente");
    await assertLayout(page,width+" laboratório");
    await page.screenshot({path:"tests/screenshots/"+width+"-laboratorio.png",fullPage:true});
    const downloadPromise=page.waitForEvent('download');
    await page.locator('[data-lab-action="export"]').click();
    const download=await downloadPromise;
    assert.match(download.suggestedFilename(),/^o-sistema-local-.*\.json$/);
    const exported=await download.path();
    await page.locator('[data-lab-action="delete"]').click();
    assert.equal(await page.locator('.lab-draft').count(),0);
    await page.locator('#labImport').setInputFiles(exported);
    await page.locator('.lab-draft').first().waitFor();
    assert.match(await page.locator('.lab-summary').textContent(),/Lutador 1 \/ Guerreiro 7 \/ Ladino 4/,"Importação JSON não preservou multiclasse");
    await page.reload();
    await page.locator('.lab-draft').first().click();
    assert.match(await page.locator('.lab-summary').textContent(),/Lutador 1 \/ Guerreiro 7 \/ Ladino 4/,"Rascunho local não persistiu");
    await page.goto(site+'#/toji/overview',{waitUntil:'load'});
    await page.getByRole('link',{name:'ABRIR CÓPIA NO LABORATÓRIO'}).click();
    await page.locator('.lab-draft').first().waitFor({state:"visible"});
    assert.equal(await page.locator('.lab-draft').count(),1,"Abrir do dossiê duplicou ficha pessoal");
    await page.goto(site,{waitUntil:'load'});
    assert.equal(await page.locator('.roster-card').count(),24,"Ficha pessoal alterou o lote inicial");
    assert.match(await page.locator("#resultsCount").textContent(),/319 DE 319/);
   }
   assert.deepEqual(errors,[]);
   console.log("OK viewport "+width+"x"+height+" — 319 dossiês e interações");
   await page.close();
  }
  const reduced=await browser.newPage({viewport:{width:375,height:812},reducedMotion:"reduce"});
  await reduced.route(/^https?:\/\//,route=>route.abort());
  await reduced.goto(site,{waitUntil:"load"});
  await reduced.locator("#universe").selectOption("cyberpunk");
  assert.equal(await reduced.locator(".capri-gaze").evaluate(el=>getComputedStyle(el).transform),"none","Olhos se movem sob movimento reduzido");
  for(const selector of [".capri-laugh",".capri-mouth",".psycho-echo",".psycho-error"])
   assert.equal(await reduced.locator(selector).evaluate(el=>getComputedStyle(el).animationName),"none",selector+" animado sob movimento reduzido");
  await reduced.locator('[data-open="d"]').hover();
  assert.equal(await reduced.locator('[data-open="d"]').evaluate(el=>el.style.getPropertyValue("--capri-x")),"","HUD reage sob movimento reduzido");
  await reduced.close();
  console.log("Movimento reduzido validado: Capri e David sem animações.");
  console.log("VALIDADO: 11 viewports, 319 fichas completas e dez builds automáticas sem corte horizontal.");
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
