/* Navegação real do Atlas com Chromium, inclusive no celular. */
const {chromium}=require("playwright");
const {pathToFileURL}=require("node:url");
const path=require("node:path");
const assert=require("node:assert/strict");
const site=pathToFileURL(path.resolve("index.html")).href;
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
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
  console.log("OK: Atlas navegável em 375, 768 e 1440px com busca, filtros, comparação e retorno.");
 }finally{await browser.close()}
})().catch(err=>{console.error(err);process.exitCode=1});