/* Direção de arte do Atlas. Os traços SVG são originais e usam uma grade 120 × 100. */
(() => {
  "use strict";
  const fonts = {
    display: "var(--head)", book: "Georgia, serif", slab: "Rockwell, Georgia, serif",
    terminal: "var(--mono)", modern: "var(--body)", action: "Impact, var(--head)"
  };

  // ID, composição, fonte, superfície, painel, texto, acento, direção, traçado, referência, esquema opcional.
  const directions = [
    ["jojo-s-bizarre-adventure","manga","action","#f3e8dc","#fff9ee","#24142f","#7c2459","Páginas de mangá","M8 84 32 14h37L47 84Zm43 0 19-54h39L89 84ZM14 31h16M78 17h31M12 94h89M22 70l20-14-15-6 28-20M60 72l25-17-12-2 22-13M3 63l11-5m16-38 9-6m52 78 16-8","https://jojo-portal.com/","light"],
    ["cavaleiros-do-zodiaco","temple","book","#151b2d","#242938","#fff6df","#f0cf83","Templo celeste","M8 33 60 8l52 25ZM15 40h90M23 46v38m12-38v38m50-38v38m12-38v38M10 89h100M4 97h112M44 55l16-12 13 19-12 13Z","https://www.toei-animation.com/catalog/saint-seiya/"],
    ["fate","ritual","book","#0b182b","#142644","#f1f4ff","#a6e0ff","Arquivo de invocação","M60 6a44 44 0 1 0 .01 0ZM60 14l32 56H28ZM60 86 28 30h64ZM2 50h116M60 1v98","https://www.fate-sn.com/"],
    ["cyberpunk","hud","terminal","#111116","#1d1d24","#f8f5e9","#f8ed52","Terminal de Night City","M5 38V16h37l7 8h42l18 18v41H70l-8-8H15L5 65ZM13 48h46l9 9h40M13 59h26m46 11h13M76 9h38","https://www.cyberpunk.net/us/en/"],
    ["honkai-star-rail","astral","book","#0c1529","#172540","#fbf0d7","#f8d894","Cartografia astral","M8 68Q60 13 112 46 63 92 8 68ZM60 8q3 39 38 42-35 3-38 42-3-39-38-42 35-3 38-42ZM92 10v16m-8-8h16M18 74v14m-7-7h14","https://hsr.hoyoverse.com/en-us/"],
    ["dragon-ball","burst","action","#ffb450","#fff0d3","#2f1c19","#652920","Impacto de energia","M59 3l9 29 27-16-12 30 34 4-30 16 16 27-33-13-10 18-9-22L18 95l13-27L4 55l31-8-16-26 31 14Z","https://en.dragon-ball-official.com/","light"],
    ["uma-musume","track","display","#e6f0df","#f7fcef","#162d28","#175843","Programa de corridas","M2 86Q42 4 116 22M2 96Q42 16 116 32M17 96Q52 28 116 43M74 48l14 9m-8-20 16 10m-7-19 16 10m-6-20 16 10","https://umamusume.com/","light"],
    ["signalis","terminal","terminal","#171719","#222227","#feebee","#ff8c94","Terminal de arquivo","M16 14h88v72H16ZM22 22h76v56H22ZM30 31l16 12-16 12m23 0h29M30 68h4m5 0h4m5 0h4","https://rose-engine.org/signalis/"],
    ["devil-may-cry","gothic","book","#21121a","#371d28","#fff2f5","#ffa1ae","Vitral gótico","M60 4Q14 34 14 63v28h92V63Q106 34 60 4ZM60 13Q34 43 34 63v28m26-78q26 30 26 50v28M60 14v77M44 51l16 19 16-19-16-9Z","https://store.steampowered.com/app/601150/Devil_May_Cry_5/"],
    ["bleach","ink","modern","#f2eee8","#fffdfa","#201d21","#514653","Página em tinta","M8 82 111 18 81 54 94 46 35 85 44 70 4 93ZM89 16l24-7-11 16ZM6 67l22-14M72 88l30-23","https://bleach-anime.com/","light"],
    ["jujutsu-kaisen","fracture","display","#131d2c","#233047","#f5f9ff","#c0ddff","Energia amaldiçoada","M61 6 38 38l22-4-23 35 31-9-20 35M17 12l10 28-16 9 13 29m73-67-9 31 18-6-15 31 20 13M49 17l11 3m19 54 12 8","https://jujutsukaisen.jp/"],
    ["genshin-impact","filigree","book","#e3eef1","#f8faf4","#203443","#285371","Carta de aventura","M60 7 72 24 60 41 48 24ZM60 40v49M58 67Q7 83 17 46q6-15 26 0-17 15-16-4m35 25q51 16 41-21-6-15-26 0 17 15 16-4M41 89h38","https://genshin.hoyoverse.com/","light"],
    ["wuthering-waves","resonance","modern","#111b25","#1a2733","#eff8fa","#b3e3eb","Arquivo de ressonância","M4 53h13l9-11 10 21 13-42 14 61 14-43 10 23 11-9h18M7 17h103M7 88h103","https://www.playstation.com/en-us/games/wuthering-waves/"],
    ["dark-souls","embers","book","#231e1a","#332b24","#fff2df","#edbd88","Arquivo de cinzas","M13 86h94M24 93h72M39 83q-19-18 7-42-1 14 7 18 16-16 8-42 31 26 17 55-8 13-18 13M68 15l5-9m17 35 9-12M25 51l-8-6","https://en.bandainamcoent.eu/dark-souls/dark-souls-iii"],
    ["undertale","pixel","terminal","#141417","#202025","#ffffff","#ff9595","Moldura de diálogo","M14 17h92v66H14ZM39 39h14v7h14v-7h14v21h-7v7h-7v7H53v-7h-7v-7h-7Z","https://undertale.com/"],
    ["murder-drones","hazard","terminal","#231c35","#312744","#fff2ff","#ffdf78","Terminal mecânico","M60 7 109 88H11ZM47 33l11 17-14 17h20l-6 13 23-23H62l12-24M13 14h20m53 0h20M8 91h104","https://www.glitchprod.com/murder-drones"],
    ["blue-lock","score","action","#111c31","#1c2b43","#f2f5ff","#b4d0ff","Quadro tático","M12 13h96v74H12ZM60 13v74m0-51a14 14 0 1 0 .01 0ZM12 33h23v34H12m96-34H85v34h23M21 76l67-56m-22-1h22v21","https://www.bluelock-kc.com/"],
    ["the-boys","press","display","#e4e5e4","#f7f3eb","#241d26","#8a243e","Cartaz publicitário","M10 25h100v6H10Zm0 45h100v6H10Zm50-35 6 12h14l-11 8 4 13-13-8-13 8 4-13-11-8h14Z","https://www.primevideo.com/detail/The-Boys/0KRGHGZCHKS920ZQGY5LBRF7MA","light"],
    ["kamen-rider","chassis","action","#d9e7f1","#f8fcff","#1f2f44","#204c79","Painel de transformação","M9 35 29 15h62l20 20v30L91 85H29L9 65ZM60 27l22 12v22L60 73 38 61V39ZM20 43h18m44 14h18M54 44l12 12m0-12-12 12","https://www.kamen-rider-official.com/","light"],
    ["dungeon-meshi","recipe","slab","#eee1ca","#fff3de","#30271f","#724121","Caderno de culinária","M30 45h60l-7 34H37ZM18 53h14m56 0h14M25 40h70M46 31q-10-10 4-22m11 22q-10-10 4-22m11 22q-10-10 4-22M32 87h56","https://delicious-in-dungeon.com/","light"],
    ["the-amazing-digital-circus","circus","display","#31194a","#46245a","#fff8f0","#ffe182","Pista de circo digital","M12 47 60 9l48 38ZM22 47v39h76V47M60 10 43 47m17-37 17 37M52 85V60h16v25M14 93h92","https://www.glitchprod.com/digital-circus"],
    ["konosuba","quest","slab","#f2e6d3","#fbf4e9","#262337","#334b92","Quadro de missões","M19 23h82v59H19ZM10 29h16m68 0h16M10 75h16m68 0h16M40 68l33-32m-22 0h22v22M36 49h12m-12 8h9","https://konosuba.com/","light"],
    ["chainsaw-man","saw","action","#191c1c","#252929","#fff1e1","#ffd09e","Galeria de personagens","M8 75 20 55l9 3 7-15 10 4 8-15 10 4 9-15 10 4 8-14 17 10-5 18-10 2-4 15-10 2-4 13-10 1-4 14-12 1-6 10Z","https://chainsawman.dog/tvseries/character/"],
    ["my-hero-academia","hero-panel","action","#cbdedb","#f5f7ee","#182424","#155853","Galeria de heróis","M5 12h110v75H66l-18 10 6-10H5ZM63 22 43 52h15l-3 24 24-33H63ZM15 23l20 12M15 75l20-13m50-24 18-15m-18 41 18 12","https://heroaca.com/character/chara_group01/01-01/","light"],
    ["mushoku-tensei","map","book","#eadcc5","#f9edd8","#36291f","#6d482d","Mapa de viagem","M60 8 70 40l32 10-32 10-10 32-10-32-32-10 32-10ZM60 20v60M28 50h64M24 15l16 14m39 42 17 14m0-70L80 29M40 70 24 85","https://mushokutensei.jp/","light"],
    ["marvel","cinema","action","#16171c","#27272d","#f8f4eb","#f5cd79","Cartela cinematográfica","M8 30h104v53H8ZM7 21l99-13 3 13L9 34ZM25 19l14 10m9-13 14 10m9-13 14 10m9-13 14 10M15 70h90","https://movies.disney.com/thunderbolts"],
    ["one-punch-man","impact","action","#f2e7df","#fffaf1","#292027","#8c2432","Quadro de impacto","M4 19 70 40M4 34l50 12M3 64l59-9M4 87l66-24M103 7 81 38m32-9-27 17m30 19-32-12m18 40L79 64M70 44l10-4 8 9-8 12-13-5Z","https://onepunchman-anime.net/","light"],
    ["transformers-autobots","alloy","action","#222a37","#313f50","#f3f7ff","#a9d4ff","Chassi em corte","M8 48h104M18 30h84v38H18ZM28 22h16v54H28Zm48 0h16v54H76ZM49 39h22v21H49ZM8 83h104","https://transformers.hasbro.com/"],
    ["the-100-girlfriends-who-really-really-really-really-really-love-you","ribbon","book","#fbe7ee","#fff8fa","#361f33","#842753","Caderno de comédia romântica","M60 38Q21 1 13 27t47 11Q99 1 107 27T60 38ZM60 38 32 83l-7-14-15-2Zm0 0 28 45 7-14 15-2ZM55 38h10","https://hyakkano.com/","light"],
    ["my-dress-up-darling","stitch","modern","#f6e8ec","#fff7f9","#342334","#892d60","Molde de ateliê","M17 19h77v61H17ZM26 28h12m8 0h12m8 0h12m8 0h3M26 71h12m8 0h12m8 0h12m8 0h3M34 42l48 20M39 62l69-25","https://bisquedoll-anime.com/","light"],
    ["ado","stage","book","#161c3a","#222b4b","#f3f4ff","#bbc9ff","Palco e iluminação","M21 8 8 89h74L45 8Zm52 0L39 89h72L97 8ZM54 76q-10-13 7-18 15 3 4 14-3 4-13 9","https://ado-dokidokihimitsukichi-daigakuimo.com/"],
    ["overwatch","tactics","display","#182b43","#1f3b5b","#f7f9ff","#ffc591","Painel de operação","M17 15H6v18m108 0V15h-11m0 70h11V67M6 67v18h11m43-60v50M34 50h52m-26-16a16 16 0 1 0 .01 0Z","https://overwatch.blizzard.com/"],
    ["fullmetal-alchemist","alchemy","slab","#282525","#403534","#fff0e5","#f5b99b","Diagrama alquímico","M60 5a45 45 0 1 0 .01 0ZM60 12l36 63H24Zm0 74L24 25h72ZM60 23v54M35 50h50M60 42l8 8-8 8-8-8Z","https://www.hagaren.jp/"],
    ["tokyo-ghoul","horror","modern","#231c21","#372931","#fff3f7","#f9a7ac","Recorte de horror urbano","M8 50Q60 6 112 50 60 94 8 50ZM60 30a20 20 0 1 0 .01 0ZM60 40l9 10-9 10-9-10ZM9 83l18-11m68-49 18-11","https://www.marv.jp/special/tokyoghoul/"],
    ["record-of-ragnarok","arena","book","#282136","#3b3049","#fff7ed","#f8d2a0","Arena dos deuses","M23 14 99 79l-8 10L15 24l-1-12Zm74 0L21 79l8 10 76-65 1-12ZM76 82l17-20M27 62l17 20M60 7v14","https://ragnarok-official.com/"],
    ["sekiro","scroll","book","#e9d9ba","#fbedd1","#30271e","#803d2b","Pergaminho de combate","M24 8h72v79H24ZM13 8h94M14 88h92M43 69Q50 30 78 22L47 66l25-16-28 26Z","https://www.sekirothegame.com/","light"],
    ["black-souls","folklore","book","#2c2031","#403046","#fff1ef","#e9b8d8","Livro de contos sombrios","M60 29Q39 7 10 17v66q30-9 50 9 20-18 50-9V17Q81 7 60 29Zm0 0v63M22 34q19-6 29 6M22 49q19-6 29 6m32-25 6 9-6 9-6-9Z","https://www.dlsite.com/maniax/work/=/product_id/RJ203687.html"],
    ["the-binding-of-isaac","sketch","terminal","#382725","#4d3432","#fff3e7","#ffbcb0","Rabisco de porão","M15 18 101 12l6 68-95 5ZM60 25a22 22 0 1 0 .01 0ZM49 44h3m16 0h3M50 57q10-7 20 0M50 48v4m20-4v4M22 93l68-5","https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/"],
    ["the-witcher","bestiary","book","#242925","#343c34","#f7f4e5","#d6d8ad","Página de bestiário","M60 13 38 37 12 22l13 39 35 29 35-29 13-39-26 15ZM31 51l16 8m42-8-16 8M50 71h20l-10 12ZM12 94h96","https://www.thewitcher.com/"],
    ["zenless-zone-zero","street","action","#171819","#282a2f","#fff8ea","#ffe06a","Arquivo de New Eridu","M14 22h92v59H14Zm21 14a12 12 0 1 0 .01 0Zm50 0a12 12 0 1 0 .01 0ZM28 74l8-14h48l8 14M8 88h104","https://store.steampowered.com/app/4162040/Zenless_Zone_Zero/"],
    ["the-greatest-estate-developer","blueprint","terminal","#e5eddb","#f7f8eb","#203129","#25563c","Prancha de engenharia","M20 85V31h80v54ZM37 31V15h46v16M20 50h80M47 85V64h26v21M10 11v78m-5-70 5-8 5 8M15 94h90m-8-5 8 5-8 5","https://www.webtoons.com/en/fantasy/the-greatest-estate-developer/list?title_no=3596","light"],
    ["swordmaster-s-youngest-son","heraldry","book","#10243b","#1d3450","#e9faff","#91dfff","Brasão de linhagem","M17 11h86v39q0 24-43 42-43-18-43-42ZM60 20l6 12-6 28-6-28Zm-15 43h30m-15 0v16M28 35l8 10-8 10m64-20-8 10 8 10","https://tapas.io/series/the-swordmasters-son/info"]
  ];

  // Composição, coreografia e tinta da ilustração. A tinta decorativa fica fora dos controles.
  const artDirection = {
    manga:["panels","panels","#f13685"], temple:["monument","rise","#d7a956"],
    ritual:["seal","invoke","#40bfff"], hud:["console","signal","#e32953"],
    astral:["orbit","orbit","#446ec9"], burst:["impact","strike","#1671d8"],
    track:["track","sprint","#7ce047"], terminal:["terminal","scan","#be3145"],
    gothic:["proscenium","veil","#af2847"], ink:["folio","page","#f06931"],
    fracture:["panels","split","#637cee"], filigree:["landscape","unfold","#87bed8"],
    wave:["scope","pulse","#808cf3"], resonance:["scope","pulse","#67b4d8"], embers:["monument","ash","#b16b39"],
    pixel:["terminal","step","#f45a67"], hazard:["console","lock","#ffbd32"],
    score:["track","dash","#2461d3"], press:["folio","press","#a9304c"],
    chassis:["workshop","lock","#5397dd"], recipe:["folio","unfold","#b46e31"],
    circus:["marquee","spring","#e95aa8"], quest:["folio","page","#ed7c83"],
    saw:["impact","strike","#d96d36"], comic:["panels","spring","#62a94a"],
    "hero-panel":["panels","spring","#e6b928"],
    map:["landscape","page","#98724a"], cinema:["marquee","reel","#ce9845"],
    impact:["impact","split","#e64e4e"], alloy:["workshop","assemble","#3c9bd9"],
    ribbon:["ribbon","sweep","#ee88b0"], stitch:["folio","sew","#e49daf"],
    stage:["proscenium","veil","#536cd7"], tactics:["console","dash","#ff8a3c"],
    alchemy:["seal","pulse","#dc623c"], horror:["proscenium","split","#d43152"],
    arena:["monument","clash","#b04743"], scroll:["landscape","unfold","#be493a"],
    folklore:["folio","sew","#929a6b"], sketch:["terminal","page","#6286b5"],
    bestiary:["folio","press","#8c9b72"], street:["marquee","sweep","#e6a72e"],
    blueprint:["workshop","draft","#7eb363"], heraldry:["proscenium","rise","#56bde9"],
    western:["western","sweep","#407e83"]
  };
  const artFor = layout => {
    const [composition, motion, flare] = artDirection[layout] || artDirection.terminal;
    return {composition,motion,flare};
  };

  const directories = {
    "honkai-star-rail": {
      style:"astral", label:"Compêndio astral",
      description:"Explore os dossiês de Star Rail por continuidade, classe ou raça.",
      partLabels:{"chrysos":"Chrysos","emanadores":"Emanadores","impact-3rd":"Impact 3rd"}
    },
    cyberpunk: {
      style:"night-city", label:"Terminal de Night City",
      description:"Consulte os registros de Night City por série, classe ou raça."
    }
  };

  const registry = new Map(directions.map(
    ([id, layout, font, background, panel, ink, accent, label, drawing, reference, colorScheme="dark"]) =>
      [id, {id, layout, font:fonts[font], background, panel, ink, accent, label, drawing, reference, colorScheme,
        directory:directories[id], ...artFor(layout)}]
  ));

  const variants = {
    "jojo-s-bizarre-adventure": [
      ["phantom-blood","Phantom Blood",/parte 1\b|phantom blood/,"gothic","book","#f6d496"],
      ["battle-tendency","Battle Tendency",/parte 2\b|battle tendency/,"burst","slab","#f9b8a0"],
      ["stardust-crusaders","Stardust Crusaders",/parte 3\b|stardust crusaders/,"ink","action","#e4cdff"],
      ["diamond-is-unbreakable","Diamond Is Unbreakable",/parte 4\b|diamond is unbreakable/,"comic","display","#ffc6ec"],
      ["golden-wind","Golden Wind",/parte 5\b|golden wind|vento aureo/,"filigree","book","#ffda83"],
      ["stone-ocean","Stone Ocean",/parte 6\b|stone ocean/,"stitch","modern","#b0f5cc"],
      ["steel-ball-run","Steel Ball Run",/parte 7\b|steel ball run/,"western","slab","#734119"],
      ["jojolion","JoJolion",/parte 8\b|jojolion/,"wave","modern","#bde2ff"]
    ],
    "cavaleiros-do-zodiaco": [
      ["classico","Clássico",/classico/,"temple","book","#f9d88b"],
      ["next-dimension-mitologica","Next Dimension · Era Mitológica",/next dimension.*mitologica/,"ritual","book","#ffcca7"],
      ["next-dimension","Next Dimension · Século XVIII",/next dimension/,"astral","book","#c8d7ff"],
      ["lost-canvas-futuro","The Lost Canvas · Futuro alternativo",/lost canvas.*futuro/,"fracture","book","#c9b8e5"],
      ["lost-canvas-xiii-xv","The Lost Canvas · Séculos XIII–XV",/lost canvas.*xiii/,"folklore","book","#fbd3ba"],
      ["lost-canvas","The Lost Canvas · Século XVIII",/lost canvas/,"gothic","book","#f5b2bc"],
      ["omega","Omega",/omega|ω/,"burst","display","#b4e9ff"],
      ["dark-wing","Dark Wing",/dark wing/,"fracture","book","#e2b6ff"],
      ["episodio-g","Episódio G Assassin",/episodio g/,"arena","slab","#ffc49a"]
    ],
    fate: [
      ["stay-night","Fate/stay night",/stay night/,"ritual","book","#f4c286"],
      ["zero","Fate/Zero",/\/zero/,"ink","book","#e7d8cc"],
      ["apocrypha","Fate/Apocrypha",/apocrypha/,"heraldry","book","#fcc0c9"],
      ["extra","Fate/EXTRA & CCC",/\/extra/,"hud","modern","#ffb5db"],
      ["grand-order-camelot","Fate/Grand Order · Camelot",/grand order.*camelot/,"temple","book","#ffe0a6"],
      ["grand-order-babylonia","Fate/Grand Order · Babylonia",/grand order.*babylonia/,"filigree","book","#ffe0ad"],
      ["grand-order-lostbelts","Fate/Grand Order · Lostbelts",/grand order.*lostbelts/,"fracture","book","#beb9fd"],
      ["grand-order","Fate/Grand Order · Espíritos Heroicos",/grand order/,"astral","book","#a9d9ff"],
      ["strange-fake","Fate/strange Fake",/strange fake/,"press","display","#ffd899"],
      ["samurai-remnant","Fate/Samurai Remnant",/samurai remnant/,"scroll","book","#ffa99e"]
    ],
    "honkai-star-rail": [
      ["chrysos","Amphoreus e Herdeiros de Chrysos",/chrysos|amphoreus/,"temple","book","#ffd68f"],
      ["emanadores","Emanadores e Lord Ravagers",/emanador|ravager/,"ritual","book","#d7bbff"],
      ["stellaron-hunters","Stellaron Hunters",/stellaron hunters/,"hud","book","#b6c8ff"],
      ["impact-3rd","Honkai Impact 3rd",/impact 3rd/,"wave","book","#fdc0dc"]
    ],
    "dragon-ball": [
      ["z","Dragon Ball Z",/dragon ball z\b/,"burst","action","#ffab5c"],
      ["gt","Dragon Ball GT",/dragon ball gt\b/,"impact","action","#ff9e9a"],
      ["daima","Dragon Ball Daima",/dragon ball daima\b/,"quest","display","#e1c3ff"],
      ["super","Dragon Ball Super",/dragon ball super\b/,"astral","action","#a4e5ff"]
    ],
    "uma-musume": [
      ["cinderella-gray","Cinderella Gray",/cinderella gray/,"ink","display","#d4f4e8"],
      ["road-to-the-top","Road to the Top",/road to the top/,"score","display","#b9dcff"],
      ["nova-era","Nova Era",/nova era/,"cinema","display","#ffdc98"]
    ],
    "the-boys": [
      ["equipe-principal","Equipe principal · Prime Video",/\bequipe principal\b/,"press","display","#862b3f",{
        background:"#dce4e8",panel:"#f3f6f4",ink:"#202b36",
        reference:"https://www.aboutamazon.com/news/entertainment/the-boys-season-4-cast-guide-prime-video"
      }],
      ["prime-video","Os Sete · Prime Video",/\bos sete\b/,"cinema","action","#ffb4ab",{
        background:"#172743",panel:"#213856",ink:"#fff6ec",colorScheme:"dark"
      }]
    ],
    cyberpunk: [
      ["edgerunners-2","Edgerunners 2",/edgerunners 2/,"hazard","terminal","#9df3ff"],
      ["2077","Cyberpunk 2077",/2077/,"chassis","terminal","#ffa4a4"],
      ["edgerunners","Edgerunners",/edgerunners/,"hud","terminal","#ffec57"]
    ]
  };

  for (const [id, entries] of Object.entries(variants)) {
    for (const [part, label, , layout, font, accent, overrides] of entries) {
      const parent = registry.get(id);
      registry.set(id+"/"+part, {
        ...parent, id:id+"/"+part, layout, accent, font:fonts[font], label, ...artFor(layout),
        drawing:directions.find(direction=>direction[1]===layout)?.[8] || parent.drawing,
        ...(id==="jojo-s-bizarre-adventure" && part!=="steel-ball-run" && {
          background:"#23182c", panel:"#372741", ink:"#fff4ef", colorScheme:"dark"
        }),
        ...(id==="dragon-ball" && part!=="z" && {
          background:"#391a15", panel:"#4b2620", ink:"#fff5e0", colorScheme:"dark"
        }),
        ...(id==="uma-musume" && {
          background:"#12291f", panel:"#1d3c2d", ink:"#f7fff4", colorScheme:"dark"
        }),
        ...(id==="dragon-ball" && part==="z" && {accent:parent.accent}),
        ...(part==="steel-ball-run" && {
          background:"#e9d1a8", panel:"#fff1d6", ink:"#3d2b20", colorScheme:"light",
          drawing:"M12 22h96v56H12ZM20 30h80v40H20ZM60 34l5 10h12l-9 8 4 12-12-7-12 7 4-12-9-8h12ZM24 50h12m48 0h12"
        }),
        ...overrides
      });
    }
  }

  const fallback = {
    id:"arquivo", layout:"terminal", ...artFor("terminal"), font:fonts.display, background:"#142733",
    panel:"#1b3541", ink:"#eefbf9", accent:"#a1efe2", label:"Direção artística pendente", colorScheme:"dark",
    drawing:"M10 26h100v56H10Zm0 0V16h36l10 10M21 40h49M21 52h66M21 64h40"
  };
  const workAliases = [
    [/^the boys\b/,"The Boys"],
    [/the greatest estate developer/,"The Greatest Estate Developer"],
    [/swordmaster.s youngest son/,"Swordmaster's Youngest Son"],
    [/the 100 girlfriends/,"The 100 Girlfriends Who Really, Really, Really, Really, Really Love You"],
    [/my dress-up darling/,"My Dress-Up Darling"]
  ];
  const workName = (text, id) => workAliases.find(([pattern])=>pattern.test(text))?.[1]
    || (id==="ado" || /\bado\b/.test(text) ? "Ado" : "");
  const resolve = id => registry.get(id) || fallback;
  const forWork = (universe, work, variant) => {
    const parts = variants[universe];
    const part = parts?.find(([key]) => variant === key) || parts?.find(([, , pattern]) => pattern.test(work));
    return resolve(part ? universe+"/"+part[0] : universe);
  };

  const labelByGroup={
    jojo:"JoJo's Bizarre Adventure",cdz:"Cavaleiros do Zodíaco",fate:"Fate",
    cyberpunk:"Cyberpunk",hsr:"Honkai: Star Rail",chrysos:"Honkai: Star Rail",emanator:"Honkai: Star Rail",
    dragonball:"Dragon Ball",umamusume:"Uma Musume",jjk:"Jujutsu Kaisen",mha:"My Hero Academia",
    dmc:"Devil May Cry",wuwa:"Wuthering Waves",bleach:"Bleach",konosuba:"KonoSuba",
    mushoku:"Mushoku Tensei","mushoku-tensei":"Mushoku Tensei",genshin:"Genshin Impact",marvel:"Marvel",
    "the-boys":"The Boys","blue-lock":"Blue Lock",signalis:"SIGNALIS",chainsaw:"Chainsaw Man",
    "one-punch-man":"One Punch Man",transformers:"Transformers · Autobots",
    "kamen-rider":"Kamen Rider",overwatch:"Overwatch",fma:"Fullmetal Alchemist",
    "tokyo-ghoul":"Tokyo Ghoul","dark-souls":"Dark Souls","digital-circus":"The Amazing Digital Circus",
    "murder-drones":"Murder Drones",undertale:"Undertale","dungeon-meshi":"Dungeon Meshi",
    shuumatsu:"Record of Ragnarok",sekiro:"Sekiro","black-souls":"Black Souls",
    "binding-of-isaac":"The Binding of Isaac",witcher:"The Witcher",
    zenless:"Zenless Zone Zero"
  };
  const norm=s=>String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();
  function groupFor(c){
    const g=String(c.catalogCategory||"").toLowerCase();
    const raw=norm(c.universe);
    if(["chrysos","emanator","hsr"].includes(g)||raw.includes("honkai: star rail"))return "Honkai: Star Rail";
    if(raw.includes("saint seiya")||raw.includes("cavaleiros do zod")||g==="cdz")return "Cavaleiros do Zodíaco";
    if(raw.includes("jojo")||g==="jojo")return "JoJo's Bizarre Adventure";
    if(raw.includes("cyberpunk")||g==="cyberpunk")return "Cyberpunk";
    if(raw.includes("dragon ball")||g==="dragonball")return "Dragon Ball";
    if(/^fate(?:[\s/·:]|$)/.test(raw)||g==="fate")return "Fate";
    if(raw.includes("uma musume")||raw.includes("umamusume")||g==="umamusume")return "Uma Musume";
    const specific=workName(raw,c.id);
    if(specific)return specific;
    if(raw==="transformers")return "Transformers · Autobots";
    if(Object.hasOwn(labelByGroup,g))return labelByGroup[g];
    const name=String(c.universe||"Universo não classificado").split(/\s+[—–]\s+/)[0].trim();
    return name||"Universo não classificado";
  }

  window.T20_ATLAS_THEMES = {resolve, forWork, groupFor, norm};
})();
