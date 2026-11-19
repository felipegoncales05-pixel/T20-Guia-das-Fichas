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

 // Expansão fundamentada na Edição Jogo do Ano v1.3; todos os textos são sínteses.
 classes.arcanista={name:"Arcanista",initialPV:8,gainPV:2,gainPM:6,source:ref("36–43","O Arcanista"),powerFrom:2,
  grants:{1:["caminho-arcanista","magias-arcanas"],5:["magias-circulo-2"],9:["magias-circulo-3"]}};
 const automatic=(id,name,klass,page,action,cost,effect,limit,example)=>{abilities[id]={name,kind:"automática",classId:klass,source:ref(page,name),
  manual:{action,cost,effect,limit,example}}};
 automatic("caminho-arcanista","Caminho do Arcanista","arcanista","37","Ao adquirir seu primeiro nível de Arcanista","Sem gasto próprio","Escolha Bruxo, Mago ou Feiticeiro; cada caminho modifica a conjuração.","Caminho é escolha permanente; foco, grimório ou linhagem seguem o livro.","O registro de caminho define de onde o poder vem, sem criar magias grátis.");
 automatic("magias-arcanas","Magias Arcanas","arcanista","37–39","Conforme execução de cada magia","Conforme círculo e aprimoramentos","Aprende magias arcanas de círculos liberados por níveis de Arcanista.","Verifique ação, alcance, resistência e aprendizado do caminho; não use círculo maior antes da classe.","Escolha uma magia conhecida, pague o custo e resolva a resistência indicada.");
 automatic("magias-circulo-2","Segundo Círculo","arcanista","37–39","Na progressão de Arcanista 5","Conforme magia","Desbloqueia a possibilidade de aprender magias de 2º círculo.","Não é acesso no nível global 5 caso ainda não tenha cinco níveis de Arcanista.","Uma multiclasse Guerreiro 5/Arcanista 5 só recebe 2º círculo no décimo nível global.");
 automatic("magias-circulo-3","Terceiro Círculo","arcanista","37–39","Na progressão de Arcanista 9","Conforme magia","Desbloqueia a possibilidade de aprender magias de 3º círculo.","Requer nove níveis na classe, não apenas nove níveis totais.","Confira nível da classe e o grimório antes de escolher uma magia de 3º círculo.");
 const pow=(id,name,klass,page,action,cost,effect,limit,example,requires={},opts={})=>{
  abilities[id]={name,kind:"poder",classId:klass,source:ref(page,"Poder de "+klass),
   manual:{action,cost,effect,limit,example},requires,...opts};
 };
 // Guerreiro
 pow("bater-correr","Bater e Correr","guerreiro","65–67","Ao executar investida","2 PM apenas para efeito adicional","Permite seguir o deslocamento após o golpe da investida.","A investida ainda exige a ação e o movimento; não concede deslocamento infinito.","Avance, ataque e finalize o deslocamento restante.");
 pow("destruidor","Destruidor","guerreiro","65–67","Ataque corpo a corpo com arma de duas mãos","Passivo","Refaz resultados baixos do dado de dano da arma.","Requer Força 1 e arma de duas mãos; não afeta todos os dados de dano.", "Use após o ataque acertar e rolar dano da arma.",{attributes:{FOR:1}});
 pow("esgrimista","Esgrimista","guerreiro","65–67","Com arma leve ou ágil","Passivo","Soma Inteligência ao dano, dentro do limite do nível.","Requer Inteligência 1 e arma adequada.", "Acertando com uma arma ágil, confira o bônus de INT.",{attributes:{INT:1}});
 pow("especializacao-arma","Especialização em Arma","guerreiro","65–67","Ao atacar com a arma escolhida","Passivo","Aumenta o dano com a arma definida na aquisição.","A arma específica deve ser registrada; escolher não cria arma no inventário.","Anote katana ou espada longa como especialização definida.",{}, {repeatable:true});
 pow("golpe-raspao","Golpe de Raspão","guerreiro","65–67","Uma vez na rodada após errar ataque","2 PM","Permite causar parcela do dano apesar do erro.","Não aciona efeitos que exigem um ataque acertado.","Errou o golpe: decida gastar PM para causar dano parcial.");
 pow("golpe-pessoal","Golpe Pessoal","guerreiro","65–67","Quando faz um ataque com arma escolhida","Conforme efeitos selecionados","Cria técnica própria a partir dos efeitos legais do Golpe Pessoal.","Requer Guerreiro 5; efeitos exatos e custo precisam ser definidos com a mesa.","Uma técnica de espada reproduz uma finalização, respeitando a soma de PM e limite.",{classLevel:5});
 pow("romper-resistencias","Romper Resistências","guerreiro","65–67","Ao usar Ataque Especial","1 PM adicional","O golpe ignora parte da redução de dano do alvo.","Só acompanha Ataque Especial efetivamente usado.","Pague o extra antes de aplicar a redução de dano.");
 pow("solidez","Solidez","guerreiro","65–67","Enquanto usa escudo","Passivo","Concede proteção adicional em testes de resistência segundo o escudo.","Não funciona sem escudo; confere bônus ao equipamento de fato usado.","Proteja-se com escudo durante uma explosão.");
 pow("tornado-dor","Tornado de Dor","guerreiro","65–67","Ação padrão atingindo vários adjacentes","2 PM","Faz uma manobra de ataque giratório contra alvos no alcance.","Requer Guerreiro 6 e arma corpo a corpo; não é ataque à distância.","Gire a lâmina entre inimigos próximos, calculando o dano legal.",{classLevel:6});
 pow("ambidestria","Ambidestria","guerreiro","65–67","Ao agredir com duas armas","Passivo","Permite dois ataques respeitando penalidade.","Requer Destreza 2 e ao menos uma arma leve.","Use duas armas adequadas e aplique a penalidade ao ataque.",{attributes:{DEX:2}});
 // Ladino
 pow("emboscar","Emboscar","ladino","72–74","Primeira rodada do combate","2 PM","Concede ação padrão adicional na abertura.","Exige treino em Furtividade e só funciona na primeira rodada.","Abra com uma ação decisiva; não repita nas rodadas posteriores.");
 pow("sombra","Sombra","ladino","72–74","Ao usar Furtividade","Passivo","Reduz penalidades de movimento e ações ruidosas ao ocultar-se.","Requer treino em Furtividade; não torna invisível.","Aproxime-se no deslocamento normal sem a penalidade usual.");
 pow("velocidade-ladina","Velocidade Ladina","ladino","72–74","Uma vez por rodada no próprio turno","2 PM","Concede ação de movimento adicional.","Exige Destreza 2 e treino em Iniciativa.","Reposicione-se e então use a ação principal.",{attributes:{DEX:2}});
 pow("mente-criminosa","Mente Criminosa","ladino","72–74","Ao testar Furtividade ou Ladinagem","Passivo","Permite somar Inteligência nas perícias indicadas.","Requer INT 1; não substitui outros requisitos.", "Use conhecimento para infiltração.",{attributes:{INT:1}});
 pow("gatuno","Gatuno","ladino","72–74","Ao escalar ou testar Atletismo","Passivo","Melhora movimentação e escalada.","Não transforma a escalada em teleporte.", "Suba por uma fachada no ritmo permitido.");
 pow("escapista","Escapista","ladino","72–74","Em testes para escapar ou atravessar obstáculos","Passivo","Concede vantagem numérica em situações de fuga especificadas.","Aplica somente aos testes e condições relacionados.","Escape de uma imobilização ou atravesse uma passagem estreita.");
 pow("rolamento-defensivo","Rolamento Defensivo","ladino","72–74","Ao sofrer dano","2 PM","Reduz o dano recebido e deixa o personagem caído.","Requer treino em Reflexos; ficar caído é um custo tático.","Role para evitar parte do golpe e levante-se depois.");
 // Lutador
 pow("arma-improvisada","Arma Improvisada","lutador","75–77","Ao usar objeto improvisado","Passivo","Permite improvisar ataques com objetos como extensões dos golpes.","Objeto pode quebrar; não substitui itens mágicos nem proficiência geral.","Use um bastão improvisado e verifique sua integridade.");
 pow("cabecada","Cabeçada","lutador","75–77","Ao atacar desarmado","2 PM","Deixa o alvo desprevenido para o ataque.","Uma vez por cena por alvo; não controla alvo à distância.","Aproveite a abertura e acerte um golpe corporal.");
 pow("convencido","Convencido","lutador","75–77","Em resistência a medo e efeitos mentais","Passivo","Melhora resistências a medo e mental.","Não garante imunidade a todo controle ou dano psíquico.","Resista melhor a um efeito de intimidação.");
 pow("golpe-baixo","Golpe Baixo","lutador","75–77","Ao acertar ataque desarmado com declaração","2 PM","Pode atordoar caso o alvo falhe em Fortitude.","Limite de uso contra o mesmo alvo durante cena.","Declare antes do ataque e aguarde teste de Fortitude.");
 pow("golpe-imprudente","Golpe Imprudente","lutador","75–77","Ao usar Golpe Relâmpago","Conforme habilidade base","Amplia dano do ataque em troca de queda de Defesa.","Penalidade defensiva dura até o próximo turno.","Aposte na pressão ofensiva e aceite a exposição.");
 pow("lutador-chao","Lutador de Chão","lutador","75–77","Ao agarrar ou derrubar","1 PM para manobra extra","Melhora manobras e permite derrubar após agarrar.","Precisa do alvo no alcance e de agarrar legalmente.","Agarrar e derrubar uma criatura próxima.");
 pow("rasteira","Rasteira","lutador","75–77","Ao atacar desarmado criatura de tamanho válido","2 PM","Pode deixar alvo caído se o ataque acertar.","Limite de tamanho; não derruba qualquer inimigo automaticamente.","Acerte as pernas de um alvo de tamanho permitido.");
 pow("sarado","Sarado","lutador","75–77","Passivo","Sem gasto","Soma Força a determinadas defesas e resistência corporal.","Requer Força 3 e não anula outras condições.","Anote bônus adicional indicado após o investimento em Força.",{attributes:{FOR:3}});
 pow("trocacao","Trocação","lutador","75–77","Depois de acertar golpe desarmado","PM crescentes por golpe extra","Permite continuar golpes contra o mesmo alvo até erro ou falta de PM.","Requer Lutador 6; PM do turno limitam a sequência.", "Após acertar o primeiro golpe, escolha investir mais PM.",{classLevel:6});
 pow("voadora","Voadora","lutador","75–77","Durante investida desarmada","2 PM","Aumenta dano conforme deslocamento e limite do nível.","Exige investida e espaço de movimento, não é voo livre.","Corra e chute ao final da investida.");
 pow("punhos-adamante","Punhos de Adamante","lutador","75–77","Ao atacar desarmado alvo com RD","Passivo","Ignora até parte da RD inimiga nas condições do poder.","Requer Lutador 8; não elimina qualquer imunidade.", "Aplique o ataque desarmado ignorando a RD permitida.",{classLevel:8});
 pow("confianca-ringues","Confiança dos Ringues","lutador","75–77","Quando inimigo erra corpo a corpo contra você","Passivo","Ganha PM temporários limitados pelo nível.","Requer Lutador 8; PM temporários expiram no fim da cena.", "Recupere ímpeto ao desviar de um soco inimigo.",{classLevel:8});
 // Arcanista
 pow("arcano-batalha","Arcano de Batalha","arcanista","39–42","Ao causar dano com uma magia","Passivo","Adiciona o atributo-chave ao dano mágico.","Não aumenta danos de armas comuns ou de magias sem dano.","Some atributo ao dano da magia ofensiva.");
 pow("conhecimento-magico","Conhecimento Mágico","arcanista","39–42","Ao selecionar o poder","Passivo","Aprende duas magias de círculos já disponíveis.","Não desbloqueia círculos novos nem magias exclusivas não permitidas.","Escolha duas magias válidas do grimório do mesmo nível.",{}, {repeatable:true});
 pow("envolto-misterio","Envolto em Mistério","arcanista","39–42","Em situações sociais apropriadas","Passivo","Melhora manipulação de pessoas supersticiosas ou inexperientes.","O mestre determina quem se enquadra; não é controle mental.","Use presença inquietante para apoiar Enganação.");
 pow("especialista-escola","Especialista em Escola","arcanista","39–42","Ao lançar magias de escola selecionada","Passivo","Aumenta CD de uma escola escolhida.","Requer caminho Bruxo ou Mago; escola precisa estar registrada.","Concentre-se em magias de Ilusão para dificultar resistências.");
 pow("fortalecimento-arcano","Fortalecimento Arcano","arcanista","39–42","Ao lançar magia que exige resistência","Passivo","Aumenta a CD de resistência às magias.","Requer cinco níveis de Arcanista; não acumula com cópias indevidas.","Aplique a CD revisada em encantamento.",{classLevel:5});
 pow("magia-pungente","Magia Pungente","arcanista","39–42","Ao lançar magia com resistência","1 PM adicional","Pode tornar mais difícil resistir à magia.","Exige pagar PM e ainda respeitar o limite de gasto.","Antes de lançar Hipnotismo, declare o aprimoramento do poder.");
 pow("poder-magico","Poder Mágico","arcanista","39–42","Passivo","Sem gasto","Amplia PM proporcionalmente aos níveis de Arcanista.","É um efeito adicional ao subtotal de classe; precisa integrar cálculo final.","Ao evoluir Arcanista, atualize PM do poder.");
 pow("raio-arcano","Raio Arcano","arcanista","39–42","Ação padrão contra alvo em alcance curto","Sem custo próprio","Canaliza dano de essência com resistência de Reflexos.","Não é ataque desarmado; não ganha benefícios de Lutador.","Descreva uma lágrima ou descarga arcana e faça o teste da magia.");
 pow("raio-elemental","Raio Elemental","arcanista","39–42","Ao usar Raio Arcano","1 PM","Altera o tipo de dano e pode impor condição conforme elemento.","Requer Raio Arcano; verificar resistência e tipo declarado.","Use um raio frio para reduzir a mobilidade do alvo.",{powers:["raio-arcano"]});
 pow("raio-poderoso","Raio Poderoso","arcanista","39–42","Ao usar Raio Arcano","Sem custo próprio","Aumenta dado de dano e alcance do raio.","Requer Raio Arcano e não concede novo ataque.","Atinja inimigo mais distante com o poder aprimorado.",{powers:["raio-arcano"]});
 pow("fluxo-mana","Fluxo de Mana","arcanista","39–42","Ao sustentar efeitos","Custo individual das magias","Permite sustentar simultaneamente dois efeitos com uma ação livre.","Requer Arcanista 10; cada magia mantém sua duração e custo.","Sustente dois efeitos compatíveis pagando todos os PM.",{classLevel:10});
 pow("familiar","Familiar","arcanista","39–42","Ao adquirir o poder","Ritual para substituir","Adquire parceiro mágico limitado às características de seu tipo.","Não possui ações de personagem adicionais gratuitas.","Escolha forma e benefício do familiar no livro.");
 pow("foco-vital","Foco Vital","arcanista","39–42","Ao sofrer dano que derrubaria PV a zero","Sem gasto próprio","Permite usar o foco como recurso de sobrevivência.","Exige Bruxo e foco empunhado.","O foco absorve o excedente do ataque fatal.");
 // Patrimônio de regras: estes campos foram verificados apenas no livro básico.
 const origins={
  soldado:{name:"Soldado",choices:["Fortitude","Guerra","Luta","Pontaria"],source:ref("87–95","Origem Soldado")},
  criminoso:{name:"Criminoso",choices:["Enganação","Furtividade","Ladinagem"],source:ref("87–95","Origem Criminoso")},
  estudioso:{name:"Estudioso",choices:["Conhecimento","Guerra","Misticismo"],source:ref("87–95","Origem Estudioso")},
  gladiador:{name:"Gladiador",choices:["Atuação","Luta"],source:ref("87–95","Origem Gladiador")},
  eremita:{name:"Eremita",choices:["Misticismo","Religião","Sobrevivência"],source:ref("87–95","Origem Eremita")},
  forasteiro:{name:"Forasteiro",choices:["Cavalgar","Pilotagem","Sobrevivência"],source:ref("87–95","Origem Forasteiro")},
  pivete:{name:"Pivete",choices:["Furtividade","Iniciativa","Ladinagem"],source:ref("87–95","Origem Pivete")}
 };

 const catalog={schema:1,books,classes,abilities,origins,races:{humano:{name:"Humano",source:ref("19","Humano"),bonus:"+1 em três atributos diferentes",note:"Versátil exige escolha de perícias ou poder geral, ainda não automatizada."}},pointBuy:{"-1":-1,"0":0,"1":1,"2":2,"3":4,"4":7},pointBudget:10,multiclass:ref("35","Subindo de nível / Multiclasse")};
 if(typeof module!=="undefined"&&module.exports)module.exports=catalog;
 if(typeof window!=="undefined")window.T20_RULES=catalog;
})();
