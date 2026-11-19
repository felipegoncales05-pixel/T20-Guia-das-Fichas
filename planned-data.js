/* Entradas editoriais solicitadas. Não são builds T20: nenhuma classe, atributo,
   nível, habilidade, página, retrato canônico ou fonte de regra foi fornecida. */
(()=>{
  const entries=[
    ["toji","Toji","Jujutsu Kaisen","jjk"],
    ["aizen","Aizen","Bleach","bleach"],
    ["vegitto","Vegitto","Dragon Ball","dragonball"],
    ["gogeta","Gogeta","Dragon Ball","dragonball"],
    ["soul-of-cinder","Soul of Cinder","Dark Souls III","dark-souls"],
    ["isaac","Isaac","The Binding of Isaac","binding-of-isaac"],
    ["adao","Adão","Shuumatsu no Valkyrie","shuumatsu"],
    ["grimm","Grimm","Black Souls","black-souls"],
    ["sekiro","Sekiro","Sekiro: Shadows Die Twice","sekiro"],
    ["kaneki","Kaneki","Tokyo Ghoul","tokyo-ghoul"]
  ];
  window.T20_PLANNED=entries.map(([id,name,universe,catalogCategory],index)=>({
    id,name,universe,catalogCategory,
    number:"P"+String(index+1).padStart(2,"0"),status:"pendente",label:"ADAPTAÇÃO PENDENTE"
  }));
})();
