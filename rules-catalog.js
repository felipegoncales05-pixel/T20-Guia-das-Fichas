/* Índice pequeno e auditável. Só os campos abaixo foram conferidos na edição
   indicada; a presença de um livro não habilita suas opções automaticamente. */
(()=>{
 "use strict";
 const pdf="https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf";
 const books=[
  {id:"jda-1.3",name:"Tormenta20 — Edição Jogo do Ano",edition:"v1.3",url:pdf,status:"parcial",note:"Multiclasse, compra de atributos e parte de três classes conferidas. Erratas posteriores e demais opções pendentes."},
  {id:"herois",name:"Heróis de Arton",url:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/",status:"catalogar"},
  {id:"ameacas",name:"Ameaças de Arton",url:"https://jamboeditora.com.br/produto/ameacas-de-arton/",status:"catalogar"},
  {id:"atlas",name:"Atlas de Arton",url:"https://jamboeditora.com.br/produto/atlas-de-arton/",status:"catalogar"},
  {id:"deuses",name:"Deuses de Arton",url:"https://jamboeditora.com.br/produto/tormenta20-deuses-de-arton/",status:"catalogar"},
  {id:"dragao-brasil",name:"Dragão Brasil",url:"https://jamboeditora.com.br/",status:"mesa",note:"Cada número e opção precisam de fonte e autorização da mesa."}
 ];
 const ref=(page,section)=>({book:"jda-1.3",page,section,url:pdf});
 const classes={
  guerreiro:{name:"Guerreiro",initialPV:20,gainPV:5,gainPM:3,source:ref("64–67","O Guerreiro"),powerFrom:2,
   grants:{1:["ataque-especial"],3:["durao"],5:["ataque-especial"],6:["ataque-extra"],9:["ataque-especial"]}},
  ladino:{name:"Ladino",initialPV:12,gainPV:3,gainPM:4,source:ref("72–74","O Ladino"),powerFrom:2,
   grants:{1:["ataque-furtivo","especialista"],2:["evasao"],3:["ataque-furtivo"],4:["esquiva-sobrenatural"],5:["ataque-furtivo"],7:["ataque-furtivo"],8:["olhos-nas-costas"],9:["ataque-furtivo"],10:["evasao-aprimorada"],11:["ataque-furtivo"]}},
  lutador:{name:"Lutador",initialPV:20,gainPV:5,gainPM:3,source:ref("75–77","O Lutador"),powerFrom:2,
   grants:{1:["briga","golpe-relampago"],3:["casca-grossa"],5:["briga","golpe-cruel"],7:["casca-grossa"],9:["briga","golpe-violento"],11:["casca-grossa"]}}
 };
 const abilities={
  "ataque-especial":{name:"Ataque Especial",kind:"automática",classId:"guerreiro",source:ref("65","Ataque Especial"),
   versions:[{id:"base",minClassLevel:1,label:"Bônus +4, 1 PM"},{id:"nivel-5",minClassLevel:5,label:"Até +8, custo maior"},{id:"nivel-9",minClassLevel:9,label:"Até +12, custo maior"}],
   manual:{action:"Ao fazer um ataque",cost:"1 PM para +4; progressão por nível de guerreiro",effect:"Escolha bônus no teste de ataque ou no dano; a progressão permite aumentar o bônus com PM adicionais.",limit:"Não concede ataque nem ação extra. Use o patamar que o nível de guerreiro alcançou.",example:"Antes de resolver um ataque, gaste o PM e declare se o bônus irá ao acerto ou ao dano."}},
  "ataque-extra":{name:"Ataque Extra",kind:"automática",classId:"guerreiro",source:ref("67","Ataque Extra"),minClassLevel:6,
   manual:{action:"Ao usar a ação agredir",cost:"2 PM",effect:"Um ataque adicional.",limit:"Uma vez por rodada; não antecipa o 6º nível de guerreiro.",example:"Após agredir, pague 2 PM para acrescentar um ataque na mesma rodada."}},
  "durao":{name:"Durão",kind:"automática",classId:"guerreiro",source:ref("67","Durão"),minClassLevel:3,
   manual:{action:"Quando sofre dano",cost:"3 PM",effect:"Reduz esse dano à metade.",limit:"Depende de sofrer dano e do gasto de PM; não evita outros efeitos do ataque.",example:"Ao receber um golpe, pague 3 PM para reduzir o dano recebido pela metade."}},
  "briga":{name:"Briga",kind:"automática",classId:"lutador",source:ref("76","Briga"),
   versions:[{id:"base",minClassLevel:1,label:"1d6"},{id:"nivel-5",minClassLevel:5,label:"1d8"},{id:"nivel-9",minClassLevel:9,label:"1d10"}],
   manual:{action:"Ataque desarmado",cost:"Sem custo próprio",effect:"Dano base desarmado de acordo com o nível de lutador.",limit:"O dado depende do tamanho e do nível na classe; não adiciona ataques por si só.",example:"No 5º nível de lutador, um ataque desarmado usa o dado de Briga daquele patamar."}},
  "golpe-relampago":{name:"Golpe Relâmpago",kind:"automática",classId:"lutador",source:ref("76","Golpe Relâmpago"),
   manual:{action:"Quando usa agredir para um ataque desarmado",cost:"1 PM",effect:"Permite um ataque desarmado adicional.",limit:"A condição da ação e o gasto de PM continuam obrigatórios.",example:"Use agredir com um golpe desarmado; pague 1 PM para o ataque adicional."}},
  "ataque-furtivo":{name:"Ataque Furtivo",kind:"automática",classId:"ladino",source:ref("72–73","Ataque Furtivo"),
   versions:[1,3,5,7,9,11].map(n=>({id:"nivel-"+n,minClassLevel:n,label:"+"+((n+1)/2)+"d6"})),
   manual:{action:"Uma vez por rodada, ao acertar alvo desprevenido em corpo a corpo/alcance curto ou alvo que esteja flanqueando",cost:"Sem custo próprio",effect:"Dano extra que aumenta a cada dois níveis de ladino.",limit:"Alvo imune a crítico é imune a Ataque Furtivo; verifique alvo e alcance antes de somar dados.",example:"Contra alvo desprevenido em alcance curto, some os dados do seu nível de ladino em um ataque válido nesta rodada."}},
  "especialista":{name:"Especialista",kind:"automática",classId:"ladino",source:ref("73","Especialista"),
   manual:{action:"Ao testar uma das perícias treinadas escolhidas para Especialista",cost:"1 PM",effect:"Dobra o bônus de treinamento nessa perícia.",limit:"Escolha até Inteligência perícias treinadas (mínimo 1); não funciona em testes de ataque.",example:"Escolha uma perícia treinada na criação; quando for testá-la, pague 1 PM para dobrar o bônus de treinamento."}},
  "evasao":{name:"Evasão",kind:"automática",classId:"ladino",source:ref("73","Evasão"),
   manual:{action:"Ao passar em teste de Reflexos que reduziria dano à metade",cost:"Sem custo próprio",effect:"Não sofre esse dano.",limit:"Falha causa dano normal; não funciona com armadura pesada ou condição imóvel.",example:"Passe em Reflexos contra um efeito que permitiria meio dano e anule esse dano."}},
  "esquiva-sobrenatural":{name:"Esquiva Sobrenatural",kind:"automática",classId:"ladino",source:ref("74","Esquiva Sobrenatural"),
   manual:{action:"Passiva",cost:"Sem custo próprio",effect:"Você nunca fica surpreendido.",limit:"Não concede ação adicional nem impede outras condições.",example:"Em uma emboscada, aplique a regra de não ficar surpreendido."}},
  "olhos-nas-costas":{name:"Olhos nas Costas",kind:"automática",classId:"ladino",source:ref("74","Olhos nas Costas"),
   manual:{action:"Passiva",cost:"Sem custo próprio",effect:"Você não pode ser flanqueado.",limit:"Não impede outros modos de ficar desprevenido.",example:"Contra inimigos em lados opostos, não aplique a condição de flanqueado."}},
  "evasao-aprimorada":{name:"Evasão Aprimorada",kind:"automática",classId:"ladino",source:ref("74","Evasão Aprimorada"),
   manual:{action:"Ao fazer Reflexos contra efeito que permite reduzir dano à metade",cost:"Sem custo próprio",effect:"Se passar, não sofre dano; se falhar, sofre metade.",limit:"Não funciona com armadura pesada ou na condição imóvel.",example:"Numa falha em Reflexos contra o efeito adequado, receba metade do dano."}},
  "casca-grossa":{name:"Casca Grossa",kind:"automática",classId:"lutador",source:ref("77","Casca Grossa"),
   versions:[{id:"nivel-3",minClassLevel:3,label:"Con na Defesa"},{id:"nivel-7",minClassLevel:7,label:"Con +1 na Defesa"},{id:"nivel-11",minClassLevel:11,label:"Con +2 na Defesa"}],
   manual:{action:"Passiva a partir do nível 3 de lutador",cost:"Sem custo próprio",effect:"Soma Constituição à Defesa, limitada pelo nível; recebe +1 adicional nos níveis 7 e 11.",limit:"Não se aplica com armadura pesada; não concede redução de dano.",example:"No nível 7 de lutador, sem armadura pesada, confira o limite do nível ao somar Constituição e o bônus adicional."}},
  "golpe-cruel":{name:"Golpe Cruel",kind:"automática",classId:"lutador",source:ref("77","Golpe Cruel"),minClassLevel:5,
   manual:{action:"Passiva nos ataques desarmados",cost:"Sem custo próprio",effect:"Margem de ameaça aumenta em +1.",limit:"Não aumenta o multiplicador de crítico nem se aplica a ataques armados.",example:"Ao rolar o ataque desarmado, use a margem de ameaça ajustada."}},
  "golpe-violento":{name:"Golpe Violento",kind:"automática",classId:"lutador",source:ref("77","Golpe Violento"),minClassLevel:9,
   manual:{action:"Passiva nos ataques desarmados",cost:"Sem custo próprio",effect:"Multiplicador de crítico aumenta em +1.",limit:"Não altera a margem de ameaça nem se aplica a ataques armados.",example:"Quando houver crítico com ataque desarmado, aplique o multiplicador ajustado."}},
  "impeto":{name:"Ímpeto",kind:"poder",classId:"guerreiro",source:ref("66–67","Poder de Guerreiro — Ímpeto"),
   manual:{action:"Ao se deslocar",cost:"1 PM",effect:"Aumenta o deslocamento em 6 m por uma rodada.",limit:"Não concede outra ação de movimento.",example:"Pague 1 PM antes de se mover para alcançar uma posição mais distante nesta rodada."}},
  "ataque-reflexo":{name:"Ataque Reflexo",kind:"poder",classId:"guerreiro",source:ref("65","Poder de Guerreiro — Ataque Reflexo"),requires:{attributes:{DES:1}},
   manual:{action:"Quando alvo em alcance fica desprevenido ou sai voluntariamente do alcance",cost:"1 PM",effect:"Um ataque corpo a corpo contra esse alvo.",limit:"Uma vez por alvo a cada rodada; requer Des 1.",example:"Um inimigo sai voluntariamente do seu alcance: gaste 1 PM para atacá-lo dentro da condição indicada."}},
  "valentao":{name:"Valentão",kind:"poder",classId:"guerreiro",source:ref("67","Poder de Guerreiro — Valentão"),
   manual:{action:"Ao atacar alvo em uma das condições listadas",cost:"Sem custo próprio",effect:"Bônus de +2 em ataque e dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos.",limit:"Não causa essas condições por conta própria.",example:"Contra um alvo flanqueado, aplique o bônus somente enquanto a condição durar."}},
  "assassinar":{name:"Assassinar",kind:"poder",classId:"ladino",source:ref("73","Poder de Ladino — Assassinar"),requires:{classLevel:5},
   manual:{action:"Ação de movimento para analisar criatura em alcance curto",cost:"3 PM",effect:"O primeiro Ataque Furtivo que causar dano ao alvo dentro do prazo dobra seus dados extras.",limit:"Exige 5º nível de ladino; não dobra todos os danos do ataque.",example:"Analise um alvo, depois cumpra as condições de Ataque Furtivo até o fim do próximo turno."}},
  "ate-acertar":{name:"Até Acertar",kind:"poder",classId:"lutador",source:ref("76","Poder de Lutador — Até Acertar"),
   manual:{action:"Após errar ataque desarmado",cost:"Sem custo próprio",effect:"Bônus cumulativo de +2 em ataque e dano desarmado contra o mesmo oponente.",limit:"Termina ao acertar ou no fim da cena; não vale contra outro alvo.",example:"Após errar um alvo, aplique o bônus no próximo golpe desarmado contra ele."}},
  "bracos-calejados":{name:"Braços Calejados",kind:"poder",classId:"lutador",source:ref("76","Poder de Lutador — Braços Calejados"),
   manual:{action:"Passiva enquanto estiver sem armadura",cost:"Sem custo próprio",effect:"Soma Força à Defesa, limitada pelo nível.",limit:"Não funciona com armadura; verifique outros bônus de Defesa antes de acumular.",example:"Sem armadura, confira o limite do nível ao calcular a Defesa."}}
 };
 const catalog={schema:1,books,classes,abilities,races:{humano:{name:"Humano",source:ref("19","Humano"),bonus:"+1 em três atributos diferentes",note:"Versátil exige escolha de perícias ou poder geral, ainda não automatizada."}},pointBuy:{"-1":-1,"0":0,"1":1,"2":2,"3":4,"4":7},pointBudget:10,multiclass:ref("35","Subindo de nível / Multiclasse")};
 if(typeof module!=="undefined"&&module.exports)module.exports=catalog;
 if(typeof window!=="undefined")window.T20_RULES=catalog;
})();
