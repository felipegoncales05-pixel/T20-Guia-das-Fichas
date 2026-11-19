/* Entradas editoriais solicitadas. Retratos de referência e créditos estão em
   assets/planned-art/sources.json; não definem variantes, regras ou build T20. */
(()=>{
  const entries=[
    ["toji","Toji","Jujutsu Kaisen","jjk","png","https://jujutsukaisen.jp/character/index_2nd.php","Jujutsu Kaisen anime"],
    ["aizen","Aizen","Bleach","bleach","png","https://bleach-anime.com/en/character/?chara=80","BLEACH Thousand-Year Blood War"],
    ["vegitto","Vegitto","Dragon Ball","dragonball","jpg","https://en.dragon-ball-official.com/news/01_4032.html","Dragon Ball Official / Legends"],
    ["gogeta","Gogeta","Dragon Ball","dragonball","jpg","https://en.dragon-ball-official.com/news/01_4435.html","Dragon Ball Official / Gekishin Squadra"],
    ["soul-of-cinder","Soul of Cinder","Dark Souls III","dark-souls","jpg","https://www.cookandbecker.com/en/article/118/the-withered-beauty-of-dark-souls-iii.html","FromSoftware / Cook and Becker"],
    ["isaac","Isaac","The Binding of Isaac","binding-of-isaac","jpg","https://store.steampowered.com/app/250900/The_Binding_of_Isaac_Rebirth/","The Binding of Isaac: Rebirth / Steam"],
    ["adao","Adão","Shuumatsu no Valkyrie","shuumatsu","webp","https://ragnarok-official.com/1st/character/","Record of Ragnarok anime"],
    ["grimm","Grimm","Black Souls","black-souls","jpg","https://store.steampowered.com/app/3755860/BLACK_SOULS/","BLACK SOULS / Steam"],
    ["sekiro","Sekiro","Sekiro: Shadows Die Twice","sekiro","jpg","https://www.sekirothegame.com/gallery?filter=art","Sekiro / Activision"],
    ["kaneki","Kaneki","Tokyo Ghoul","tokyo-ghoul","png","https://www.marv.jp/special/tokyoghoul/first/chara.html","Tokyo Ghoul anime / Marvelous"]
  ];
  window.T20_PLANNED=entries.map(([id,name,universe,catalogCategory,format,sourcePage,artCredit],index)=>({
    id,name,universe,catalogCategory,portrait:"./assets/planned-art/"+id+"."+format,
    sourcePage,artCredit,
    number:"P"+String(index+1).padStart(2,"0"),status:"pendente",label:"ADAPTAÇÃO PENDENTE"
  }));
})();
