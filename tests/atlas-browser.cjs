/* Navegação real do Atlas com Chromium, inclusive no celular. */
const {chromium}=require("playwright");
const {pathToFileURL}=require("node:url");
const path=require("node:path");
const fs=require("node:fs");
const assert=require("node:assert/strict");
const site=pathToFileURL(path.resolve("index.html")).href;
const captures=process.env.T20_ATLAS_SCREENSHOTS||"tests/screenshots/atlas";
async function checkWidth(page,width,label){
 const overflow=await page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)
   -document.documentElement.clientWidth);
 assert.ok(overflow<=2,width+"px · "+label+" · overflow "+overflow+"px");
}
async function visitWorld(page,href){
 await page.evaluate(hash=>{location.hash=hash},href);
 const shell=page.locator('.atlas-shell[data-atlas-theme="'+href.split("/").at(-1)+'"]');
 await shell.locator(".atlas-world-hero h1").waitFor();
 return shell;
}
async function reviewThemes(browser,width,height){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:"reduce"});
 const errors=[];
 page.on("pageerror",error=>errors.push(String(error)));
 await page.route(/^https?:\/\//,route=>route.abort());
 await page.goto(site+"#/atlas",{waitUntil:"load"});
 const covers=await page.locator(".atlas-universe").evaluateAll(links=>links.map(link=>({
   href:link.getAttribute("href"),id:link.dataset.atlasTheme,layout:link.dataset.atlasLayout
 })));
 assert.equal(covers.length,42);
 assert.equal(new Set(covers.map(cover=>cover.layout)).size,42);
 await checkWidth(page,width,"Atlas");
 fs.mkdirSync(captures,{recursive:true});
 const capture=label=>page.screenshot({path:path.join(captures,width+"-"+label+".jpg"),quality:84});
 await capture("atlas");
 const compositions=new Set();
 for(const cover of covers){
   const shell=await visitWorld(page,cover.href);
   assert.equal(await shell.getAttribute("data-atlas-layout"),cover.layout);
   assert.ok(await shell.locator(".atlas-result").count());
   assert.equal(await page.locator("body[data-atlas-theme],body[data-world],body[data-family]").count(),0);
   assert.ok(await shell.locator(".atlas-world-visual svg path").count()>=2,"Ilustração "+cover.id);
   assert.equal(await shell.getAttribute("data-atlas-composition"),await page.locator("#siteHeader").getAttribute("data-atlas-chrome"));
   assert.equal(await page.locator("html[data-atlas-motion]").count(),0,"Preferência de movimento reduzido");
   compositions.add(await shell.locator(".atlas-world-hero").evaluate(hero=>getComputedStyle(hero).gridTemplateAreas));
   await checkWidth(page,width,cover.id);
   await capture(cover.id);
 }
 if(width===1440)assert.ok(compositions.size>=4,"Composições estruturalmente distintas no desktop");
 const jojo=await visitWorld(page,"#/atlas/jojo-s-bizarre-adventure");
 await jojo.locator("#atlasContinuity").selectOption("jojo-s-bizarre-adventure/steel-ball-run");
 assert.equal(await page.locator(".atlas-shell").getAttribute("data-atlas-layout"),"western");
 assert.match(await page.locator(".atlas-world-copy h1").textContent(),/Steel Ball Run/);
 await checkWidth(page,width,"Steel Ball Run");
 await capture("jojo-steel-ball-run");
 await page.locator("#atlasSearch").fill("nome inexistente abcxyz");
 assert.ok(await page.locator(".atlas-empty").isVisible());
 await page.locator("[data-atlas-reset]").click();
 assert.equal(await page.locator(".atlas-shell").getAttribute("data-atlas-layout"),"manga");
 await page.locator("[data-atlas-page='1']").click();
 assert.match(await page.locator("#atlasResultCount").textContent(),/PÁGINA 2/);
 const dragon=await visitWorld(page,"#/atlas/dragon-ball");
 await dragon.locator("#atlasContinuity").selectOption("dragon-ball/gt");
 await page.locator("[data-atlas-compare=goku]").focus();
 await page.keyboard.press("Enter");
 assert.equal(await page.locator("[data-atlas-compare=goku]").getAttribute("aria-pressed"),"true");
 assert.equal(await page.evaluate(()=>document.activeElement.dataset.atlasCompare),"goku");
 assert.match(await page.locator(".atlas-compare-slot a").getAttribute("href"),/goku\/gt\/overview/);
 await page.locator(".atlas-result h3 a").first().click();
 await page.locator("#character-title").waitFor();
 assert.equal(await page.locator(".atlas-dossier-link").getAttribute("data-atlas-theme"),"dragon-ball/gt");
 assert.equal(await page.locator("body").getAttribute("data-family"),"ki");
 assert.equal(await page.locator(".atlas-shell").count(),0);
 await page.locator(".atlas-dossier-link").click();
 await page.locator("#atlasContinuity").waitFor();
 assert.equal(await page.locator("#atlasContinuity").inputValue(),"dragon-ball/gt");
 assert.equal(await page.locator(".atlas-shell").getAttribute("data-atlas-theme"),"dragon-ball/gt",
   "O tema da continuidade selecionada deve voltar junto com o filtro");
 assert.equal(await page.locator(".atlas-world-hero h1").textContent(),"Dragon Ball GT");
 assert.match(await page.locator("#atlasResultCount").textContent(),/^1 DE 421/);
 await page.locator("#atlasContinuity").selectOption("dragon-ball/super");
 assert.equal(await page.locator("[data-atlas-compare=goku]").getAttribute("aria-pressed"),"false",
   "Selecionar Goku GT na comparação não seleciona Goku Super");
 await page.locator("[data-atlas-compare=goku]").click();
 assert.deepEqual(await page.locator(".atlas-compare-slot a").evaluateAll(links=>links.map(link=>link.hash)),
   ["#/goku/gt/overview","#/goku/super/overview"]);
 await page.locator("[data-atlas-compare=goku]").click();
 assert.equal(await page.locator(".atlas-compare-slot a").getAttribute("href"),"#/goku/gt/overview");
 const fate=await visitWorld(page,"#/atlas/fate");
 await fate.locator("#atlasContinuity").selectOption("fate/zero");
 assert.equal(await page.locator("#atlasContinuity").evaluate(select=>getComputedStyle(select).colorScheme),"dark");
 const boys=await visitWorld(page,"#/atlas/the-boys");
 await boys.locator("#atlasContinuity").selectOption("the-boys/equipe-principal");
 assert.equal(await page.locator(".atlas-world-hero h1").textContent(),"Equipe principal · Prime Video");
 assert.match(await page.locator("#atlasResultCount").textContent(),/^6 DE 421/);
 assert.equal(await page.locator('#atlasResults [data-atlas-theme="the-boys/equipe-principal"]').count(),6);
 await checkWidth(page,width,"The Boys · equipe principal");
 await page.locator("#atlasContinuity").selectOption("the-boys/prime-video");
 assert.equal(await page.locator(".atlas-world-hero h1").textContent(),"Os Sete · Prime Video");
 assert.equal(await page.locator('#atlasResults [data-atlas-theme="the-boys/prime-video"]').count(),6);
 await checkWidth(page,width,"The Boys · Os Sete");
 const western=await visitWorld(page,"#/atlas/jojo-s-bizarre-adventure");
 await western.locator("#atlasContinuity").selectOption("jojo-s-bizarre-adventure/steel-ball-run");
 assert.equal(await page.locator("#atlasContinuity").evaluate(select=>getComputedStyle(select).colorScheme),"light");
 await page.goto(site+"#/atlas/manhwa",{waitUntil:"load"});
 await page.locator(".atlas-shell h1").filter({hasText:"MANHWA"}).waitFor();
 assert.equal(await page.locator(".atlas-universe").count(),2);
 assert.match(await page.locator("#atlasResultCount").textContent(),/^2 DE 421/);
 await page.goto(site+"#/atlas/j-pop-cantora-japonesa",{waitUntil:"load"});
 await page.locator('.atlas-shell[data-atlas-theme="ado"]').waitFor();
 await visitWorld(page,"#/atlas/honkai-star-rail");
 await page.locator(".atlas-result h3 a").first().click();
 await page.locator("#character-title").waitFor();
 assert.match(await page.locator(".hero-copy h1").evaluate(node=>getComputedStyle(node).fontFamily),/Georgia/);
 await page.goto(site+"#/laboratorio",{waitUntil:"load"});
 await page.waitForFunction(()=>document.body.hasAttribute("data-lab"));
 assert.equal(await page.locator("[data-atlas-theme]").count(),0);
 assert.equal(await page.locator("#siteHeader[data-atlas-chrome]").count(),0);
 await page.goto(site+"#/atlas",{waitUntil:"load"});
 await page.locator("#atlasUniverseList").waitFor();
 assert.equal(await page.locator(".atlas-shell[data-atlas-theme]").count(),0);
 await visitWorld(page,"#/atlas/cyberpunk");
 await page.evaluate(()=>{location.hash="#/atlas/%E0%A4";});
 await page.locator("#atlasUniverseList").waitFor();
 assert.equal(await page.locator(".atlas-universe").count(),42,"Uma URL incompleta volta à central");
 assert.deepEqual(errors,[]);
 await page.close();
}
async function reviewMotion(browser,width,mode){
 const page=await browser.newPage({viewport:{width,height:width===390?844:900},reducedMotion:"no-preference"});
 const errors=[];
 page.on("pageerror",error=>errors.push(error.message));
 await page.route(/^https?:\/\//,route=>route.abort());
 if(mode==="fallback")await page.addInitScript(()=>{document.startViewTransition=undefined;});
 await page.goto(site+"#/atlas",{waitUntil:"load"});
 assert.equal(await page.locator("html[data-atlas-motion]").count(),0,"Acesso direto");
 const world="wuthering-waves",card=page.locator('.atlas-universe[data-atlas-portal="'+world+'"]');
 await card.evaluate(node=>node.scrollIntoView({behavior:"instant",block:"center"}));
 await card.focus();
 const scroll=await page.evaluate(()=>window.scrollY);
 assert.ok(scroll>250,"O portal de teste deve ficar abaixo da primeira tela");
 await page.keyboard.press("Enter");
 await page.locator('html[data-atlas-motion="'+mode+'"]').waitFor({state:"attached"});
 await page.locator('.atlas-shell[data-atlas-theme="'+world+'"]').waitFor();
 await page.locator("html[data-atlas-motion]").waitFor({state:"detached"});
 assert.equal(await page.evaluate(()=>document.activeElement.tagName),"H1","Foco no universo aberto pelo teclado");
 await page.locator(".atlas-trail .back-link").click();
 await page.locator('html[data-atlas-motion="'+mode+'"]').waitFor({state:"attached"});
 await card.waitFor();
 await page.locator("html[data-atlas-motion]").waitFor({state:"detached"});
 assert.ok(await card.evaluate(node=>node.hasAttribute("data-atlas-returned")&&document.activeElement===node));
 assert.ok(Math.abs(await page.evaluate(()=>window.scrollY)-scroll)<4,"Posição da galeria restaurada");
 await page.goBack();
 await page.locator('.atlas-shell[data-atlas-theme="'+world+'"]').waitFor();
 await page.goForward();
 await card.waitFor();
 await page.locator("html[data-atlas-motion]").waitFor({state:"detached"});
 await page.locator("#atlasUniverse").selectOption("fate");
 await page.locator('.atlas-shell[data-atlas-theme="fate"]').waitFor();
 await page.locator("html[data-atlas-motion]").waitFor({state:"detached"});
 await page.locator(".atlas-trail .back-link").click();
 await card.waitFor();
 await page.locator("html[data-atlas-motion]").waitFor({state:"detached"});
 assert.equal(await page.locator("[data-atlas-returned]").count(),0,"O seletor não ativa um portal");
 assert.equal(await page.evaluate(()=>document.activeElement.tagName),"H1","O seletor devolve o foco ao título da central");
 await page.evaluate(()=>{location.hash="#/atlas/fate";});
 await page.locator('html[data-atlas-motion="'+mode+'"]').waitFor({state:"attached"});
 await page.evaluate(()=>{location.hash="#/atlas/honkai-star-rail";});
 await page.evaluate(()=>{location.hash="#/laboratorio";});
 await page.waitForFunction(()=>document.body.hasAttribute("data-lab"));
 await page.locator("html[data-atlas-motion]").waitFor({state:"detached"});
 assert.equal(await page.locator(".atlas-curtain, .atlas-shell, #siteHeader[data-atlas-chrome]").count(),0);
 await page.emulateMedia({reducedMotion:"reduce"});
 await visitWorld(page,"#/atlas/cyberpunk");
 assert.equal(await page.locator("html[data-atlas-motion]").count(),0);
 await checkWidth(page,width,mode);
 assert.deepEqual(errors,[]);
 await page.close();
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:["--no-sandbox"]});
 try{
  for(const width of [375,768,1440]){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];
   page.on("pageerror",err=>errors.push(String(err)));
   await page.route(/^https?:\/\//,route=>route.abort());
   await page.goto(site,{waitUntil:"load"});
   await page.locator(".atlas-header-link").click();
   await page.locator("#atlasResults .atlas-result").first().waitFor();
   assert.equal(await page.locator("#atlasResults .atlas-result").count(),24);
   assert.match(await page.locator("#atlasResultCount").textContent(),/421/);
   assert.ok(await page.locator(".atlas-universe").count()>20);
   await page.locator("#atlasSearch").fill("Gyro Zeppeli");
   assert.equal(await page.locator("#atlasResults .atlas-result").count(),1,"Busca pelo Gyro");
   await page.locator('[data-atlas-compare="gyro"]').click();
   assert.equal(await page.locator(".atlas-compare-slot h3").count(),1);
   await page.locator("#atlasSearch").fill("David Martinez");
   await page.locator('[data-atlas-compare="david"]').click();
   assert.equal(await page.locator(".atlas-compare-slot h3").count(),2,"Comparação de dois dossiês");
   await page.locator("[data-atlas-reset]").click();
   const jojo=page.locator(".atlas-universe").filter({hasText:"JoJo's Bizarre Adventure"}).first();
   await jojo.click();
   await page.locator(".atlas-world-hero").waitFor();
   assert.match(page.url(),/#\/atlas\//);
   assert.ok((await page.locator("#atlasResultCount").textContent()).includes("421"));
   assert.ok(await page.locator("#atlasResults .atlas-result").count()>0);
   const metrics=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,
     scroll:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)}));
   assert.ok(metrics.scroll<=metrics.viewport+2,width+"px atlas overflow "+JSON.stringify(metrics));
   await page.locator(".atlas-result h3 a").first().click();
   await page.locator("#character-title").waitFor();
   await page.goto(site,{waitUntil:"load"});
   assert.equal(await page.locator(".roster-card").count(),24,"Retorno ao catálogo original");
   assert.deepEqual(errors,[],width+"px erros JS no Atlas");
   await page.close();
  }
  for(const [width,height] of [[320,700],[390,844],[768,1024],[1440,900]])await reviewThemes(browser,width,height);
  await reviewMotion(browser,1440,"view");
  await reviewMotion(browser,390,"fallback");
  console.log("OK: 42 rotas em quatro resoluções, 176 capturas e isolamento entre Atlas, dossiê e Laboratório.");
  console.log("OK: entrada, saída, restauração de foco e rolagem, histórico, fallback e movimento reduzido.");
  console.log("OK: Atlas navegável em 375, 768 e 1440px com busca, filtros, comparação e retorno.");
 }finally{await browser.close()}
})().catch(err=>{console.error(err);process.exitCode=1});
