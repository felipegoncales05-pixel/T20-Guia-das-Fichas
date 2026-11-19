// Teste real de viewport usando Chromium/Playwright; screenshots opcionais no CI.
const {chromium}=require("playwright");
const {pathToFileURL}=require("node:url");
const path=require("node:path");
const fs=require("node:fs");
const assert=require("node:assert/strict");
const sizes=[[320,700],[360,740],[375,812],[390,844],[430,932],[600,900],[768,1024],[820,1180],[1024,768],[1440,900],[844,390]];
const site=pathToFileURL(path.resolve("index.html")).href;
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
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
  for(const [width,height] of sizes){
   const page=await browser.newPage({viewport:{width,height}});
   const errors=[];
   page.on("pageerror",err=>errors.push(String(err)));
   await page.route(/^https?:\/\//,route=>route.abort()); // Testa também fallbacks de imagens
   await page.goto(site,{waitUntil:"load"});
   assert.equal(await page.locator(".roster-card").count(),5);
   assert.ok(await page.locator(".top-right .top-version").isVisible());
   assert.ok(await page.locator(".hero-mark").isVisible());
   await assertLayout(page,width+" catálogo");
   if(width===375||width===768)await page.screenshot({path:"tests/screenshots/"+width+"-catalogo.png"});
   for(const id of ["gyro","d","david","cipher","rentarou"]){
    await page.goto(site+"#/"+id+"/overview",{waitUntil:"load"});
    assert.equal(await page.locator(".detail-tabs button").count(),7);
    await assertLayout(page,width+" "+id+" dossiê");
    if(width===375&&(id==="gyro"||id==="rentarou"))await page.screenshot({path:"tests/screenshots/375-"+id+".png"});
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
   console.log("OK viewport "+width+"x"+height+" — 5 dossiês e interações");
   await page.close();
  }
  console.log("VALIDADO: 11 viewports e cinco fichas sem corte horizontal.");
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
