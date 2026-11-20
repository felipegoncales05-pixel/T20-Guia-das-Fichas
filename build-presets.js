/* O SISTEMA // propostas preenchidas e editáveis.
   Base: Tormenta20 Jogo do Ano v1.3. Nada aprovado automaticamente.
   Não atribuir ao personagem mecânicas da franquia sem poder, item ou magia. */
(()=>{
 "use strict";
 const rules=window.T20_RULES,concepts=window.T20_CONCEPTS;
 if(!rules||!concepts)return;
 const specs={
  toji:{
   title:"Caçador sem Energia Amaldiçoada",origin:"soldado",benefits:["Guerra","Pontaria"],
   buy:{FOR:2,DES:3,CON:2,INT:1,SAB:1,CAR:0},bonuses:["FOR","DES","CON"],
   skills:["Luta","Fortitude","Furtividade","Iniciativa","Percepção","Guerra","Pontaria"],
   flow:[["guerreiro",8],["ladino",4]],
   powers:{guerreiro:["bater-correr","ataque-reflexo","especializacao-arma","golpe-pessoal","impeto","romper-resistencias","golpe-raspao"],ladino:["emboscar","sombra","velocidade-ladina"]},
   gear:["Espada longa — lâmina comum reinterpretada","Adagas — estoque limitado e contado","Traje de viajante","Corda e kit de viagem"],
   ambiguity:"Restrição celestial não concede imunidade a magia; Inverted Spear of Heaven, Playful Cloud e inventário espiritual exigem itens e acordo específicos. Fonte visual não prova efeitos.",
   tactic:"Abrir com posicionamento e iniciativa; Ataque Especial para acerto/dano, depois Emboscar e furtividade quando obtidos. Não gastar PM acima do limite."},
  aizen:{
   title:"Ilusionista e estrategista",origin:"estudioso",benefits:["Conhecimento","Guerra"],
   buy:{FOR:0,DES:2,CON:1,INT:3,SAB:2,CAR:1},bonuses:["INT","SAB","CAR"],
   skills:["Misticismo","Vontade","Conhecimento","Guerra","Enganação","Intuição"],arcanePath:"mago",
   flow:[["arcanista",12]],
   powers:{arcanista:["envolto-misterio","magia-pungente","especialista-escola","fortalecimento-arcano","poder-magico","familiar","arcano-batalha","raio-arcano","fluxo-mana","raio-elemental","raio-poderoso"]},
   gear:["Grimório — exigência do caminho Mago","Espada longa — sem proficiência inicial concedida","Traje formal","Componentes e tinta de escrita"],
   ambiguity:"Kyōka Suigetsu é estética de Criar Ilusão e encantamentos, nunca hipnose inevitável. Hōgyoku e transformações são versões alternativas não atribuídas nesta build.",
   tactic:"Controlar o campo com Criar Ilusão e Hipnotismo; estudar e memorizar as magias segundo regras de Mago, mantendo testes de resistência.",
   spells:[
    ["Criar Ilusão",1,1],["Hipnotismo",1,1],["Sono",1,1],["Enfeitiçar",1,1],
    ["Disfarce Ilusório",1,2],["Imagem Espelhada",1,3],["Adaga Mental",1,4],
    ["Invisibilidade",2,5],["Sussurros Insanos",2,5],["Campo de Força",2,6],
    ["Camuflagem Ilusória",2,7],["Aparência Perfeita",2,8],
    ["Ilusão Lacerante",3,9],["Imobilizar",3,9],["Miragem",3,10],
    ["Teia",1,11],["Dissipar Magia",2,12]
   ]},
  vegitto:{
   title:"Fusão Potara — combate desarmado",origin:"gladiador",benefits:["Atuação","Luta"],
   buy:{FOR:3,DES:2,CON:2,INT:0,SAB:1,CAR:1},bonuses:["FOR","DES","CON"],
   skills:["Fortitude","Luta","Atletismo","Iniciativa","Reflexos","Atuação"],
   flow:[["lutador",9],["guerreiro",3]],
   powers:{lutador:["ate-acertar","bracos-calejados","cabecada","golpe-baixo","golpe-imprudente","trocacao","punhos-adamante","rasteira"],guerreiro:["impeto","valentao"]},
   gear:["Traje e brincos Potara — elementos narrativos","Kit de viagem","Faixas de combate"],
   ambiguity:"Base, SSJ e Blue não são acumuláveis como bônus. Potara não duplica turnos ou fichas; ki é interpretação de PM e técnicas válidas.",
   tactic:"Usar Golpe Relâmpago com planejamento de PM; Trocação somente após Lutador 6 e quando acertar."},
  gogeta:{
   title:"Fusão Metamoru — precisão e investidas",origin:"gladiador",benefits:["Atuação","Luta"],
   buy:{FOR:3,DES:2,CON:2,INT:0,SAB:1,CAR:1},bonuses:["FOR","DES","CON"],
   skills:["Fortitude","Luta","Atletismo","Iniciativa","Reflexos","Atuação"],
   flow:[["lutador",9],["guerreiro",3]],
   powers:{lutador:["voadora","lutador-chao","cabecada","golpe-imprudente","golpe-baixo","trocacao","punhos-adamante","rasteira"],guerreiro:["bater-correr","ataque-reflexo"]},
   gear:["Colete e faixa da fusão — traje mundano","Faixas de combate","Kit de viagem"],
   ambiguity:"SSJ, Blue, SSJ4 e outras aparições são versões distintas; fusão não cria PM extra, voo ou ações livres.",
   tactic:"Combinar investida e Voadora, depois Trocação com PM contados; armas e golpes de energia não são concedidos."},
  "soul-of-cinder":{
   title:"Guardião das cinzas — lâmina e chama",origin:"soldado",benefits:["Guerra","Pontaria"],
   buy:{FOR:3,DES:2,CON:2,INT:1,SAB:1,CAR:0},bonuses:["FOR","CON","INT"],
   skills:["Luta","Fortitude","Guerra","Pontaria","Misticismo","Vontade"],arcanePath:"bruxo",
   flow:[["guerreiro",8],["arcanista",4]],
   powers:{guerreiro:["valentao","bater-correr","especializacao-arma","golpe-pessoal","impeto","romper-resistencias","golpe-raspao"],arcanista:["raio-arcano","arcano-batalha","foco-vital"]},
   gear:["Espada longa — espada do chefe como aparência","Foco arcano — brasa simbólica","Traje cerimonial, sem armadura grátis","Escudo comum, sujeito a proficiência"],
   ambiguity:"Diferentes posturas e segunda fase são mudanças narrativas; armas, efeitos elementais e alternância de classes precisam de ações e equipamentos reais.",
   tactic:"Combater com espada e Ataque Especial; após adquirir Arcanista, usar magias de 1º círculo somente com foco e custos.",
   spells:[["Armadura Arcana",1,1],["Explosão de Chamas",1,1],["Imagem Espelhada",1,1],["Raio do Enfraquecimento",1,2],["Seta Infalível de Talude",1,3],["Criar Ilusão",1,4]]},
  isaac:{
   title:"Lágrimas arcanas — sobrevivência",origin:"eremita",benefits:["Misticismo","Sobrevivência"],
   buy:{FOR:0,DES:2,CON:1,INT:3,SAB:2,CAR:1},bonuses:["INT","DES","CON"],
   skills:["Misticismo","Vontade","Sobrevivência","Conhecimento","Reflexos","Percepção"],arcanePath:"bruxo",
   flow:[["arcanista",12]],
   powers:{arcanista:["raio-arcano","arcano-batalha","familiar","raio-elemental","fortalecimento-arcano","magia-pungente","poder-magico","raio-poderoso","fluxo-mana","envolto-misterio","foco-vital"]},
   gear:["Objeto de estimação — foco de bruxo declarado","Traje simples","Frasco vazio — sem propriedades de item mágico"],
   ambiguity:"Itens de The Binding of Isaac são numerosos e aleatórios. Esta build fixa uma seleção temática; não sorteia relíquias nem concede transformações ilimitadas.",
   tactic:"Representar lágrimas com Raio Arcano, usar Campo de Força para defesa e controlar o posicionamento; foco exigido.",
   spells:[["Armadura Arcana",1,1],["Imagem Espelhada",1,1],["Seta Infalível de Talude",1,1],
    ["Conjurar Monstro",1,2],["Explosão de Chamas",1,3],["Teia",1,4],
    ["Campo de Força",2,5],["Bola de Fogo",2,6],["Invisibilidade",2,7],["Velocidade",2,8],
    ["Ilusão Lacerante",3,9],["Imobilizar",3,10],["Miragem",3,11],["Dissipar Magia",2,12]]},
  adao:{
   title:"Pai da humanidade — resposta marcial",origin:"gladiador",benefits:["Atuação","Luta"],
   buy:{FOR:2,DES:3,CON:2,INT:1,SAB:1,CAR:0},bonuses:["FOR","DES","CON"],
   skills:["Fortitude","Luta","Atletismo","Iniciativa","Reflexos","Atuação"],
   flow:[["lutador",8],["guerreiro",4]],
   powers:{lutador:["ate-acertar","bracos-calejados","convencido","golpe-baixo","golpe-imprudente","trocacao","punhos-adamante"],guerreiro:["valentao","ataque-reflexo","impeto"]},
   gear:["Soco desarmado — sem arma adicional","Traje simples","Kit de viagem"],
   ambiguity:"Olhos do Senhor não copiam automaticamente poderes de inimigos ou deuses. Adaptar reflexos e reação com poderes adquiridos.",
   tactic:"Reagir a deslocamento, usar defesa de Lutador e administrar pressão com Golpe Relâmpago; prever limite de PM."},
  grimm:{
   title:"Espadachim amaldiçoado — jornada sombria",origin:"forasteiro",benefits:["Cavalgar","Sobrevivência"],
   buy:{FOR:2,DES:2,CON:2,INT:3,SAB:0,CAR:0},bonuses:["FOR","INT","CON"],
   skills:["Luta","Fortitude","Sobrevivência","Cavalgar","Misticismo","Vontade"],arcanePath:"bruxo",
   flow:[["guerreiro",8],["arcanista",4]],
   powers:{guerreiro:["esgrimista","bater-correr","especializacao-arma","golpe-pessoal","impeto","romper-resistencias","golpe-raspao"],arcanista:["magia-pungente","raio-arcano","foco-vital"]},
   gear:["Espada longa — substituir conforme versão escolhida","Foco arcano — símbolo do pacto","Traje de viajante","Kit de exploração"],
   ambiguity:"Grimm de BLACK SOULS não é Grimm de Hollow Knight. Aparência, finais e variantes precisam de seleção explícita; magia e maldição não são automáticas.",
   tactic:"Abrir de espada e usar poderes marciais; magia de 1º círculo somente após entrada em Arcanista.",
   spells:[["Criar Ilusão",1,1],["Amedrontar",1,1],["Armadura Arcana",1,1],["Imagem Espelhada",1,2],["Disfarce Ilusório",1,3],["Adaga Mental",1,4]]},
  sekiro:{
   title:"Lobo de um braço — espada e infiltração",origin:"criminoso",benefits:["Furtividade","Ladinagem"],
   buy:{FOR:2,DES:3,CON:2,INT:1,SAB:1,CAR:0},bonuses:["DES","CON","INT"],
   skills:["Luta","Fortitude","Furtividade","Iniciativa","Ladinagem","Reflexos","Percepção"],
   flow:[["guerreiro",8],["ladino",4]],
   powers:{guerreiro:["esgrimista","bater-correr","especializacao-arma","golpe-pessoal","impeto","romper-resistencias","golpe-raspao"],ladino:["sombra","velocidade-ladina","emboscar"]},
   gear:["Katana como espada ou arma permitida pela mesa","Ferramenta protética — sem efeito mecânico gratuito","Traje de shinobi","Kit de escalada mundano"],
   ambiguity:"Ressurreição e postura de Sekiro não equivalem a efeitos automáticos. Cada ferramenta protética necessita de item ou magia oficial correspondente.",
   tactic:"Movimente-se, cubra flancos, ataque com espada. Use Sombra e Velocidade Ladina apenas após adquirir os níveis de Ladino."},
  kaneki:{
   title:"Ghoul — agressão e resiliência",origin:"pivete",benefits:["Furtividade","Iniciativa"],
   buy:{FOR:3,DES:2,CON:3,INT:0,SAB:0,CAR:0},bonuses:["FOR","CON","DES"],
   skills:["Fortitude","Luta","Furtividade","Iniciativa","Atletismo","Reflexos"],
   flow:[["lutador",9],["ladino",3]],
   powers:{lutador:["sarado","bracos-calejados","golpe-imprudente","golpe-baixo","rasteira","trocacao","punhos-adamante","convencido"],ladino:["emboscar","sombra"]},
   gear:["Kagune — aparência dos ataques desarmados","Máscara do Ghoul — traje","Faixas de combate"],
   ambiguity:"Rinkaku/kakuja e fases posteriores não concedem regeneração, membros extra ou resistência gratuita. Separar pré e pós-Tokyo Ghoul:re.",
   tactic:"Trocar defesa por pressão quando vantajoso; Golpe Imprudente exige risco real. Furtividade ajuda a escolher emboscadas."}
 };
 const makeSpell=([name,circle,classLevel],topic)=>({name,circle,classLevel,
  why:"Representar "+topic+" usando uma magia efetivamente aprendida, sem reproduzir poderes absolutos do universo original.",
  how:"Consultar a descrição oficial de "+name+", pagar PM e cumprir execução, alcance, alvo, duração e resistência da edição adotada.",
  source:"Tormenta20 — Jogo do Ano v1.3, Capítulo 4 (Magias)"});
 function fromPlanned(seed,engine){
  const spec=specs[seed.id];
  const draft=concepts.fromPlanned(seed,engine);
  if(!spec)return draft;
  draft.description=spec.title+". "+draft.description;
  draft.raceId="humano";
  draft.originId=spec.origin;draft.originBenefits=spec.benefits;
  draft.attributes=spec.buy;draft.raceBonuses=spec.bonuses;
  draft.trainedSkills=spec.skills;
  draft.arcanePath=spec.arcanePath||"";
  draft.allowedBooks=["jda-1.3"];
  draft.levels=[];
  const occurrences={},whyText=spec.title.toLowerCase();
  for(const [classId,count] of spec.flow)for(let n=0;n<count;n++){
   const level=engine.emptyLevel();
   occurrences[classId]=(occurrences[classId]||0)+1;
   const classLevel=occurrences[classId];
   const powerId=classLevel>=2?spec.powers[classId]?.[classLevel-2]||"":"";
   const power=rules.abilities[powerId];
   level.classId=classId;level.powerId=powerId;
   level.why=power?"Escolhi "+power.name+" para "+whyText+". "+power.manual.effect:
      "Entrada em "+rules.classes[classId].name+" para "+whyText+". "+spec.tactic;
   level.usage=power?"Em mesa: "+power.manual.example+" Condição: "+power.manual.action+". Custo: "+power.manual.cost+".":
      "Adquirir benefícios automáticos do primeiro nível da classe; seguir condições e custos dos poderes listados.";
   level.synergy=spec.tactic;
   level.limits=power?power.manual.limit+" "+spec.ambiguity:spec.ambiguity;
   level.sourceNote="Tormenta20 — Edição Jogo do Ano v1.3; "+(power?power.source.page:rules.classes[classId].source.page)+". Conferir erratas e decisões da mesa.";
   draft.levels.push(level);
  }
  draft.inventory=spec.gear.map(name=>({name,note:"Aquisição e preço sujeitos à criação e regras oficiais; aspecto da obra não oferece bônus gratuito.",quantity:1}));
  draft.spellbook=(spec.spells||[]).map(x=>makeSpell(x,spec.title));
  draft.notes="VERSÃO ADAPTADA: "+spec.title+". "+spec.ambiguity+" Origem: "+seed.sourcePage+". Fontes oficiais de regras: Tormenta20 Edição Jogo do Ano v1.3, capítulos 1, 3 e 4. Suplementos não necessários nesta proposta; se selecionados, exigem catalogação.";
  draft.combat={...draft.combat,
   style:spec.title+". "+spec.tactic,
   opening:spec.tactic,
   combos:"Conferir custo, ação, alcance e interação por nível de classe. Não somar bônus por estética ficcional.",
   resources:"Usar a reserva de PM por nível calculada pelo motor; poderes, magias e itens exigem revisão dos valores finais.",
   strengths:spec.title+". Sinergia de habilidades condicionada aos pré-requisitos efetivamente adquiridos.",
   weaknesses:spec.ambiguity,
   evolution:"Do nível global 1 ao 12, alternar as classes na ordem apresentada. Círculos mágicos são liberados pelo nível de Arcanista, e poderes de ataque pelo nível da respectiva classe."};
  return draft;
 }
 const api={specs,ids:Object.keys(specs),fromPlanned};
 if(typeof module!=="undefined"&&module.exports)module.exports=api;
 window.T20_BUILD_PRESETS=api;
})();
