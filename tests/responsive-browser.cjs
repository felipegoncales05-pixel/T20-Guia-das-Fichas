// Teste real de viewport usando Chromium/Playwright; screenshots opcionais no CI.
const {chromium}=require("playwright");
const {pathToFileURL}=require("node:url");
const path=require("node:path");
const fs=require("node:fs");
const assert=require("node:assert/strict");
const quick=process.env.T20_QUICK==="1";
const sizes=quick?[[375,812],[768,1024],[1440,900]]:[[320,700],[360,740],[375,812],[390,844],[430,932],[600,900],[768,1024],[820,1180],[1024,768],[1440,900],[844,390]];
const site=pathToFileURL(path.resolve("index.html")).href;
const allIds=["gyro","d","david","cipher","rentarou","yoru","diego","ado","cyrene","marin","makima","optimus","jojo-dio1","jojo-kars","jojo-dio3","jojo-kira","jojo-diavolo","jojo-pucci","jojo-valentine","jojo-tooru","yuta","goku","hsr-aglaea","hsr-tribbie","hsr-mydei","hsr-castorice","hsr-anaxa","hsr-hyacine","hsr-phainon","hsr-hysilens","hsr-cerydra","hsr-evernight","hsr-terrae","em-herta","em-acheron","em-phantylia","em-diamond","em-taravan","em-zandar","em-shuhu","em-zephyro","em-celenova","em-irontomb","em-archforger","em-asat","em-luxbane","elster","jojo-jonathan","jojo-joseph","jojo-jotaro","jojo-josuke4","jojo-giorno","jojo-jolyne","jojo-johnny","jojo-gappy","denji","satoru-gojo","shigaraki","midoriya"];
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
   assert.equal(await page.locator(".roster-card").count(),59);
   assert.ok(await page.locator(".top-right .top-version").isVisible());
   assert.ok(await page.locator(".hero-mark").isVisible());
   await assertLayout(page,width+" catálogo");
   if([375,768,1440].includes(width))await page.screenshot({path:"tests/screenshots/"+width+"-entrada.png"});
   const names=await page.locator(".roster-card h3").allTextContents();
   const collator=new Intl.Collator("pt-BR",{sensitivity:"base",numeric:true});
   assert.deepEqual(names,[...names].sort(collator.compare),width+": fichas fora da ordem alfabética");
   assert.match(await page.locator("#resultsCount").textContent(),/59 DE 59/);
   await page.locator("#search").fill("MAKIMA");
   assert.equal(await page.locator(".roster-card").count(),1,width+": busca por personagem");
   assert.match(await page.locator("#resultsCount").textContent(),/01 DE 59/);
   await page.locator("[data-clear-search]").click();
   assert.equal(await page.locator(".roster-card").count(),59,width+": limpar busca");
   await page.locator("#universe").selectOption("jojo");
   assert.ok(await page.locator(".roster-card").count()>=8,width+": filtro JoJo");
   await page.locator("#universe").selectOption("mha");
   assert.equal(await page.locator(".roster-card").count(),2,width+": filtro My Hero Academia");
   await page.locator("#universe").selectOption("all");
   if([375,768,1440].includes(width)){
    await page.locator('[data-card-switch="diego"][data-card-mode="alternative"]').click();
    assert.equal(await page.locator('[data-open="diego"]').getAttribute("data-variant"),"alternative");
    assert.match(await page.locator('[data-open="diego"] img:not(.portrait-underlay)').getAttribute("src"),/diego-alternative\.webp$/);
    await page.locator('[data-open="diego"]').click();
    await page.locator('body[data-art="diego"][data-variant="alternative"]').waitFor();
    assert.equal(await page.locator('.hero-portrait img:not(.portrait-underlay)').getAttribute("src"),'./assets/card-art/diego-alternative.webp');
    await assertLayout(page,width+" Diego alternativo a partir do card");
    await page.locator('.back-link').click();
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
    await page.locator('#catalogo').scrollIntoViewIfNeeded();
    await page.screenshot({path:"tests/screenshots/"+width+"-catalogo.png"});
   }
   for(const id of (!quick&&[375,768,1440].includes(width)?allIds:representativeIds)){
    await page.goto(site+"#/"+id+"/overview",{waitUntil:"load"});
    assert.equal(await page.locator(".detail-tabs button").count(),9);
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
     await assertLayout(page,width+" diego / THE WORLD");
     await page.locator("[data-diego-toggle]").click();
     assert.equal(await page.locator("body").getAttribute("data-theme"),"diego");
    }
    await page.locator('[data-tab="attributes"]').click();
    await page.locator(".attr-row").first().waitFor();
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
   assert.deepEqual(errors,[]);
   console.log("OK viewport "+width+"x"+height+" — 59 dossiês e interações");
   await page.close();
  }
  console.log("VALIDADO: 11 viewports e 59 fichas sem corte horizontal.");
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
