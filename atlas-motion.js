/* Movimento de rota. O hash continua sendo a fonte de verdade para a navegação. */
(() => {
  "use strict";
  const timing = {
    panels:["translateX(-18%) skewX(-9deg)","translateX(16%) skewX(8deg)",310,215],
    rise:["translateY(12%) scale(.98)","translateY(-9%) scale(1.01)",320,220],
    invoke:["scale(.89) rotate(-2deg)","scale(1.09) rotate(2deg)",340,240],
    signal:["translateY(-13%) scaleY(.92)","translateY(8%) scaleY(.89)",230,185],
    scan:["translateY(9%) scaleY(.97)","scaleY(.84) translateY(-6%)",215,185,"steps(5,end)"],
    orbit:["translateX(7%) scale(.92) rotate(2deg)","translateX(-6%) scale(1.08) rotate(-2deg)",350,235],
    strike:["translateX(-21%) scale(1.035)","translateX(17%) scale(.97)",255,185],
    sprint:["translateX(-25%) skewX(-5deg)","translateX(24%) skewX(5deg)",260,185],
    veil:["translateY(5%) scaleY(1.17)","translateY(-12%) scaleY(.91)",320,230],
    page:["translateX(15%) rotate(2.4deg)","translateX(-12%) rotate(-2deg)",295,215],
    split:["translateX(-13%) translateY(7%)","translateX(10%) translateY(-7%)",245,195],
    unfold:["translateY(11%) scaleY(.86)","translateY(-7%) scaleY(.89)",305,215],
    pulse:["scaleX(.86)","scaleX(1.14)",270,200],
    ash:["translateY(7%) scale(1.035)","translateY(-12%) scale(.98)",335,245],
    step:["translateX(10%)","translateX(-9%)",225,180,"steps(4,end)"],
    lock:["translateX(10%) scaleX(1.04)","translateX(-9%) scaleX(.96)",250,195],
    dash:["translateX(19%) skewX(5deg)","translateX(-19%) skewX(-5deg)",255,190],
    press:["translateY(-8%) rotate(-1.4deg)","translateY(10%) rotate(1.4deg)",285,205],
    spring:["translateY(12%) rotate(2deg) scale(.94)","translateY(-10%) rotate(-2deg)",295,210],
    reel:["translateY(18%)","translateY(-17%)",270,195],
    assemble:["translateX(9%) scale(.94)","translateX(-12%) scale(1.04)",300,220],
    sweep:["translateX(16%) skewX(4deg)","translateX(-13%) skewX(-4deg)",305,220],
    sew:["translateX(9%) scaleY(.94)","translateX(-8%) scaleY(1.04)",280,200],
    clash:["scale(1.07) translateX(-5%)","scale(.93) translateX(8%)",280,195],
    draft:["translateY(8%) scaleX(.92)","translateY(-8%) scaleX(1.06)",285,205]
  };
  const sceneReposition={
    panels:"-10% 0",rise:"0 8%",invoke:"0 -5%",signal:"0 -9%",orbit:"7% 1%",
    sprint:"-12% 0",veil:"0 8%",step:"6% 0",press:"0 -7%",sweep:"9% 0"
  };
  const motionDefault="cubic-bezier(.18,.76,.25,1)";
  const motionPreference=window.matchMedia("(prefers-reduced-motion: reduce)");
  const html=document.documentElement;
  let revision=0;
  let active=null;
  let returnPoint=null;

  function themeFor(route){
    if(!route.startsWith("atlas/")||route==="atlas/"||route==="atlas/manhwa")return null;
    const slug=route.slice(6);
    const theme=window.T20_ATLAS_THEMES.resolve(slug==="j-pop-cantora-japonesa"?"ado":slug);
    return theme.id==="arquivo"?null:theme;
  }
  function portal(root,slug){
    return root.querySelector('.atlas-universe[data-atlas-portal="'+slug+'"]');
  }
  function clear(session){
    if(active!==session)return;
    active=null;
    session.portal?.removeAttribute("data-atlas-departing");
    session.curtain?.remove();
    delete html.dataset.atlasMotion;
    delete html.dataset.atlasEffect;
    session.scene?.cancel();
    for(const token of session.tokens)html.style.removeProperty(token);
  }
  function stop(){
    if(!active)return;
    const session=active;
    clear(session);
    session.animation?.cancel();
    session.transition?.skipTransition();
  }
  function fallback(session,theme,outgoing,incoming){
    const curtain=document.createElement("div");
    session.curtain=curtain;
    curtain.className="atlas-curtain";
    curtain.setAttribute("aria-hidden","true");
    curtain.dataset.effect=theme.motion;
    curtain.style.setProperty("--curtain-bg",theme.background);
    curtain.style.setProperty("--curtain-ink",theme.accent);
    curtain.style.setProperty("--curtain-flare",theme.flare);
    curtain.innerHTML="<span></span><span></span><span></span>";
    document.body.append(curtain);
    html.dataset.atlasMotion="fallback";
    html.dataset.atlasEffect=theme.motion;
    const duration=outgoing[3],ease=outgoing[4]||motionDefault;
    session.animation=curtain.animate(
      [{opacity:0,transform:outgoing[1]},{opacity:1,transform:"none"}],
      {duration,easing:ease,fill:"forwards"}
    );
    session.animation.finished.then(()=>{
      if(active!==session)return;
      session.commit();
      session.animation.cancel();
      session.animation=curtain.animate(
        [{opacity:1,transform:"none"},{opacity:0,transform:incoming[0]}],
        {duration:incoming[2],easing:incoming[4]||motionDefault,fill:"forwards"}
      );
      session.animation.finished.then(()=>clear(session),()=>{});
    },()=>{});
  }
  function navigate(root,from,to,render){
    const hash=location.hash;
    if(active?.target===to&&active.hash===hash)return;
    const token=++revision;
    stop();
    if(from===to)return;
    const next=themeFor(to);
    const previousBase=themeFor(from);
    const previousKey=root.querySelector(".atlas-shell[data-atlas-theme]")?.dataset.atlasTheme;
    const previous=previousBase && window.T20_ATLAS_THEMES.resolve(previousKey||previousBase.id);
    const card=from==="atlas/"&&next?portal(root,next.id):null;
    if(card)returnPoint={slug:next.id,top:window.scrollY};
    const restoring=previous&&to==="atlas/"&&returnPoint;
    let committed=false;
    const commit=()=>{
      if(committed||token!==revision||hash!==location.hash)return;
      committed=true;
      render();
      if(restoring){
        const target=portal(root,restoring.slug);
        if(target)target.dataset.atlasReturned="";
        window.scrollTo({top:restoring.top,behavior:"instant"});
        target?.focus({preventScroll:true});
      }else if(from&&to.startsWith("atlas/")){
        root.querySelector(".atlas-hero h1")?.focus({preventScroll:true});
      }
    };
    const artwork=next||previous;
    if(!from||!artwork||motionPreference.matches||document.visibilityState==="hidden"){
      commit();
      return;
    }
    card?.setAttribute("data-atlas-departing","");
    const incoming=timing[(next||artwork).motion].slice();
    const outgoing=timing[(previous||artwork).motion].slice();
    if(window.innerWidth<=570){
      incoming[2]=Math.min(incoming[2],250);
      outgoing[3]=Math.min(outgoing[3],200);
    }
    const values={
      "--atlas-motion-bg":artwork.background,
      "--atlas-motion-flare":artwork.flare,
      "--atlas-motion-in":incoming[0],
      "--atlas-motion-out":outgoing[1],
      "--atlas-motion-in-time":incoming[2]+"ms",
      "--atlas-motion-out-time":outgoing[3]+"ms",
      "--atlas-motion-in-ease":incoming[4]||motionDefault,
      "--atlas-motion-out-ease":outgoing[4]||motionDefault
    };
    const session={target:to,hash,portal:card,commit,tokens:Object.keys(values)};
    active=session;
    if(typeof document.startViewTransition==="function"){
      try{
        for(const [name,value] of Object.entries(values))html.style.setProperty(name,value);
        html.dataset.atlasMotion="view";
        html.dataset.atlasEffect=artwork.motion;
        const transition=document.startViewTransition(commit);
        session.transition=transition;
        transition.ready.then(()=>{
          if(active!==session||!next)return;
          const figure=root.querySelector(".atlas-world-visual .atlas-scene");
          session.scene=figure?.animate?.(
            [{translate:sceneReposition[next.motion]||"0 6%",opacity:.75},{translate:"0 0",opacity:1}],
            {duration:incoming[2],easing:incoming[4]||motionDefault}
          );
        },()=>{});
        transition.finished.then(()=>clear(session),()=>clear(session));
        transition.updateCallbackDone.catch(error=>queueMicrotask(()=>{throw error;}));
        return;
      }catch{
        delete html.dataset.atlasMotion;
      }
    }
    if(typeof HTMLElement.prototype.animate==="function")fallback(session,artwork,outgoing,incoming);
    else{
      clear(session);
      commit();
    }
  }
  motionPreference.addEventListener?.("change",()=>{
    if(!motionPreference.matches||!active)return;
    const {commit}=active;
    stop();
    commit();
  });
  window.T20_ATLAS_MOTION={navigate};
})();
