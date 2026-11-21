/* Fase IX. Referências das séries e escopo editorial em docs/fase-ix-cosmos.md. */
(()=>{
 "use strict";
 const rules=window.T20_RULES;
 const gold="Os Cavaleiros do Zodíaco";
 const classic="https://www.saintseiya-gold.com/en/character.html";
 const wiki="https://saintseiyapedia.com/wiki/Gold_Saint";
 const omega="https://www.toei-anim.co.jp/tv/seiya/character.html";
 const g="https://www.saintseiyapedia.com/wiki/Saint_Seiya_Episode.G";
 const nd="https://arc.akitashoten.co.jp/comics/seinntoseiya/16";
 const lost="https://bonutzuu.wordpress.com/2020/06/26/list-of-gold-saints-in-saint-seiya-the-lost-canvas-meiou-shinwa-from-gaidens-encyclopedia-of-saints/";
 const dw="https://saintseiyapedia.com/wiki/Gold_Saint#Dark_Wing";
 const movie="https://www.crunchyroll.com/id/news/latest/2014/3/4/11-gold-saints-cast-for-saint-seiya-2014-cg-film-announced";
 const eras={
  classico:["Clássico",classic,"#e4bd65"],
  nd:["Next Dimension · Século XVIII",nd,"#e1cd81"],
  mitico:["Next Dimension · Era Mitológica",nd,"#b2ddbe"],
  tlc:["The Lost Canvas · Século XVIII",wiki,"#ddb074"],
  antigos:["The Lost Canvas · Séculos XIII–XV",lost,"#cdb098"],
  futuro:["The Lost Canvas · Futuro alternativo",wiki,"#c8cbeb"],
  omega:["Saint Seiya Ω",omega,"#f6c17c"],
  dark:["Dark Wing",dw,"#bd9be3"],
  ga:["Episódio G Assassin",g,"#b8d2e7"]
 };
 const classes={guarda:"Guerreiro",escudo:"Guerreiro",lancas:"Guerreiro",quebra:"Guerreiro",lamina:"Guerreiro",arco:"Guerreiro",
  punhos:"Lutador",pressao:"Lutador",muralha:"Lutador",arrancada:"Lutador",rua:"Ladino",cronista:"Ladino",invasao:"Ladino",
  barreira:"Arcanista",esfera:"Arcanista",gelo:"Arcanista",mente:"Arcanista",ilusao:"Arcanista",tumulo:"Arcanista",botica:"Arcanista",artificio:"Arcanista",ossos:"Arcanista"};
 const raceReasons={
  humano:"Humano preserva a origem do personagem. Os três bônus são dirigidos aos atributos da build e Versátil fecha treinos complementares.",
  minotauro:"O Minotauro representa a força de investida e o corpo resistente. Couro Rígido dá Defesa e os chifres são opcionais.",
  "moreau-leao":"A Herança do Leão converte a presença felina em rugido, boa mobilidade e força. A origem canônica e a linhagem de Arton são distintas.",
  elfo:"O Elfo dá Inteligência, mobilidade e PM para repetir técnicas de Cosmo, ao preço de Constituição menor.",
  aggelus:"A herança Aggelus representa o Cosmo luminoso. Luz e traços raciais servem de apoio à classe.",
  sulfure:"O Sulfure transforma aura sombria em Escuridão racial e melhora mobilidade e manipulação.",
  dahllan:"A Dahllan oferece ligação mecânica com plantas e uma proteção ativável, clara base para técnicas vegetais.",
  "qareen-agua":"O Qareen da Água mantém o tema glacial com RD a frio e Névoa racial. As rajadas geladas vêm do repertório arcano.",
  "qareen-ar":"O Qareen do Ar combina resistência elétrica, uma descarga de toque e bons atributos para o repertório arcano.",
  "qareen-terra":"O Qareen da Terra combina proteção e cura real pela Tatuagem Mística. A ficha escolhe Curar Ferimentos para apoio.",
  "qareen-fogo":"O Qareen do Fogo oferece resistência ao fogo e uma magia ofensiva racial. Técnicas maiores são adquiridas pela classe.",
  lefou:"O Lefou dá estrutura a uma força que cobra preço no corpo. A deformidade é uma tradução para Arton do visual e das capacidades.",
  anao:"O Anão mantém a estatura e a resistência do personagem. Duro como Pedra aumenta os PV e as tradições favorecem ferramentas de combate.",
  kliren:"O Kliren justifica técnica e improviso com Ofício e Engenhosidade, tendo a vulnerabilidade a impacto como contrapeso.",
  goblin:"O Goblin combina estatura pequena, Destreza e escalada. Ofícios e fuga continuam sujeitos a testes.",
  hynne:"O Hynne oferece estatura pequena, boa Destreza e uma defesa reativa pela Sorte Salvadora.",
  osteon:"Osteon é a raça esquelética do Jogo do Ano. A build aproveita resistência e mobilidade, com as limitações de cura de um morto-vivo.",
  "golem-ferro-grande":"O chassi de ferro Grande e a fonte de vapor traduzem o corpo blindado e o armamento pesado. O propulsor tem limite e custo de regra.",
  "golem-bronze-v":"Chassi de bronze com FOR e DES favorece investidas e manobras rápidas. A fonte alquímica modela a recarga com consumíveis.",
  "golem-bronze-n":"Chassi de bronze com FOR e CON mantém o drone resistente e móvel. A arma e o escudo representam ferramentas instaladas.",
  "golem-bronze-uzi":"Chassi de bronze Pequeno encaixa no drone operário. INT sustenta o Solver; a fonte de energia não concede o efeito de uma magia grátis.",
  "golem-espelhos":"O Golem de Espelhos traduz a natureza de IA e a imitação de habilidades. O grimório representa as rotinas que Caine consegue conjurar."
 };
 const styles={
  guerreiro:["leitura do alvo","manobra de precisão","romper a defesa","finalização controlada"],
  lutador:["entrar na guarda","controle de alcance","pressão do Cosmo","golpe de clímax"],
  ladino:["reconhecimento","entrada e saída","janela de exploração","cobertura e extração"],
  arcanista:["preparação da técnica","controle do espaço","defesa reativa","combinação arcana"]
 };
 const zodiac={"Áries":"♈","Touro":"♉","Gêmeos":"♊","Câncer":"♋","Leão":"♌","Virgem":"♍",
  "Libra":"♎","Escorpião":"♏","Sagitário":"♐","Capricórnio":"♑","Aquário":"♒","Peixes":"♓","Ofiúco":"⛎"};
 const seeds=[],forms=[];
 function seed(spec){
  const className=classes[spec.build];
  const race=rules.races[spec.raceId].name;
  const identity=spec.identity||spec.signature.toUpperCase();
  const [image,imageSource,imageCredit]=window.T20_COSMOS_PORTRAITS?.[spec.id]||[];
  return {color:"#a8c2d9",...spec,image,imageSource,imageCredit,className,race,identity,raceReason:spec.raceReason||raceReasons[spec.raceId],
   styles:styles[className.toLowerCase()],concept:spec.concept||spec.tactic,weapon:spec.signature,
   bookPage:{Guerreiro:"64–67",Lutador:"75–77",Ladino:"72–74",Arcanista:"36–42"}[className]};
 }
 function saint(era,row){
  const [slug,name,sign,build,raceId,signature,canon,tactic,aliases="",override]=row;
  const [arc,link,color]=eras[era];
  const id="cdz-"+era+"-"+slug;
  const s=seed({id,name:name+" de "+sign,universe:gold+" — "+arc,group:"cdz",arc,color,posterMark:zodiac[sign],
   source:override||link,build,raceId,signature,canon,tactic,aliases:[aliases,sign,"Saint Seiya Gold Saint Cavaleiro de Ouro Cavaleiros de Ouro Cavaleiros dos Zodíacos"].join(" "),
   concept:"Casa de "+sign+". "+tactic});
  seeds.push(s);
  return s;
 }
 const classicRows=[
  ["mu","Mu","Áries","barreira","elfo","Muralha de Cristal","Discípulo de Shion, Mu repara Armaduras e combate com psicocinese.","Prepare Armadura Arcana, use Campo de Força para se proteger e desloque ameaças com Telecinesia.","Mū Mu de Aries"],
  ["aldebaran","Aldebaran","Touro","muralha","minotauro","Grande Chifre","O Cavaleiro brasileiro de Touro combate com força concentrada e protege a passagem adiante.","Firme a linha, agarre ou derrube um inimigo e converta a abertura em um golpe de Briga.","Aldebarã"],
  ["saga","Saga","Gêmeos","esfera","sulfure","Explosão Galáctica","Saga combina o poder das técnicas dimensionais com uma luta interna por controle.","Abra com projéteis de essência. Use Salto Dimensional para evadir e Relâmpago em linha quando conseguir separar os aliados."],
  ["deathmask","Máscara da Morte","Câncer","tumulo","sulfure","Ondas do Inferno","O guardião de Câncer usa o poder de Praesepe para confrontar as almas dos adversários.","Amedronte alvos vulneráveis e combine Amarras Etéreas com dano de trevas. Mantenha a saída para a retaguarda.","Deathmask Máscara Mortal"],
  ["aiolia","Aiolia","Leão","pressao","moreau-leao","Relâmpago de Plasma","O irmão de Aiolos é conhecido pela pressão de seus golpes e pelo Plasma Relâmpago.","Use Voadora na entrada e Trocação quando acertar. O Rugido se resolve antes pela ação e custo raciais.","Aioria"],
  ["shaka","Shaka","Virgem","mente","aggelus","Tesouro do Céu","Shaka eleva seu Cosmo ao restringir os próprios sentidos e ataca os sentidos dos rivais.","Exija Vontade com Adaga Mental e Hipnotismo. Reserve Imobilizar para um alvo prioritário e use Campo de Força para sobreviver ao foco."],
  ["dohko","Dohko","Libra","lancas","humano","Cólera dos Cem Dragões","Sobrevivente da Guerra Santa anterior, Dohko orienta Shiryu e guarda o arsenal de Libra.","Controle a passagem com alabarda. Ataque Reflexo pune a abertura e o Golpe Pessoal usa a arma escolhida.","Dōko Mestre Ancião"],
  ["milo","Milo","Escorpião","lamina","sulfure","Agulha Escarlate","A técnica de Milo escala em golpes sucessivos e tem Antares como culminação.","Florete leve de precisão, Acuidade e Golpe Pessoal Letal representam as agulhas. Use Ataque Extra para pressão controlada.","Miro Antares"],
  ["aiolos","Aiolos","Sagitário","arco","aggelus","Flecha de Sagitário","Salvou a pequena Atena e deixou a Armadura de Sagitário como legado.","Cubra aliados com Disparo Preciso e reserve Ataque Especial para as flechas decisivas.","Aioros"],
  ["shura","Shura","Capricórnio","lamina","humano","Excalibur","A técnica de Shura transforma os membros em uma lâmina de Cosmo capaz de cortar o que toca.","Use uma florete como estatísticas de Excalibur. Some Esgrimista ao dano e marque a finalização pelo Golpe Pessoal."],
  ["camus","Camus","Aquário","gelo","qareen-agua","Execução Aurora","Camus ensina o gelo a Hyoga e luta com técnicas que criam e manipulam frio extremo.","Use Névoa para negar linhas de visão e Sopro das Uivantes para punir grupos sem aliados no cone."],
  ["aphrodite","Afrodite","Peixes","tumulo","dahllan","Rosas Diabólicas Reais","Cultiva rosas para controlar a passagem e debilitar rivais.","Controle terreno com a magia racial e use Raio do Enfraquecimento como rosa tóxica. Reserve Toque Vampírico para contragolpes de curto alcance.","Aphrodite"],
  ["kanon","Kanon","Gêmeos","esfera","sulfure","Triângulo Dourado","Depois de agir como Dragão Marinho, Kanon assume Gêmeos na Guerra Santa de Hades.","Amarras e Salto Dimensional representam a distorção do campo; gaste suas maiores rajadas com o alvo isolado.","Kanon Dragão Marinho",wiki]
 ];
 classicRows.forEach(row=>saint("classico",row));

 const dimensionRows=[
  ["shion","Shion","Áries","barreira","elfo","Revolução Estelar","Shion e Dohko são promovidos no início da Guerra Santa do século XVIII. Shion depois se torna Grande Mestre.","Escolha Abjuração e prepare barreiras antes do confronto. Use Seta de Talude como estilhaços controlados.","Sion Grande Mestre"],
  ["ox","Ox","Touro","muralha","minotauro","Grande Chifre","Ox é um guardião de Touro da geração de Shion e Dohko.","Mantenha a frente imóvel. Use a sobrevivência de Casca Grossa para abrir espaço e derrube o primeiro adversário que passar."],
  ["cain","Cain","Gêmeos","barreira","elfo","Outra Dimensão","Cain é uma das identidades ligadas à Armadura de Gêmeos no século XVIII.","Troque de ângulo com Salto Dimensional e bloqueie perseguidores com Amarras Etéreas.","Caim"],
  ["abel","Abel","Gêmeos","esfera","sulfure","Explosão Galáctica","Abel é a identidade hostil que disputa a presença de Gêmeos com Cain.","Aproveite o mesmo Cosmo de Gêmeos para ofensiva: separe alvos com Teia e alinhe Relâmpago."],
  ["deathtoll","Deathtoll","Câncer","tumulo","sulfure","Caixão Omertà","Emprega caixões e técnicas de Câncer ligadas ao mundo dos mortos.","Imobilize com Amarras Etéreas, escolha o alvo que ameaça a retaguarda e assombre-o com trevas.","Death Toll"],
  ["kaiser","Kaiser","Leão","pressao","moreau-leao","Presas de Leão","Guardião da casa de Leão, convive com seus leões Goldie e Blondie.","Faça rugir primeiro para pressionar e gaste Trocação apenas depois de conectar o golpe. Os mascotes são aliados narrativos."],
  ["shijima","Shijima","Virgem","mente","aggelus","Quatro Portas de Buda","Guardião de Virgem que usa o silêncio e cria provações sensoriais.","Adaga Mental e Sono são o primeiro teste. Em níveis altos, use Imobilizar e Miragem para canalizar a travessia."],
  ["dohko","Dohko","Libra","punhos","humano","Dragão Ascendente","Dohko ainda jovem participa da nova Guerra Santa depois da promoção a Cavaleiro de Ouro.","Combata desarmado e guarde a armadura e suas armas como recursos de equipamento separados do ataque de Briga.","Dōko jovem"],
  ["ecarlate","Écarlate","Escorpião","lamina","sulfure","Agulha Escarlate","O Escorpião de Next Dimension manifesta uma transparência peculiar ligada à história com Odysseus.","Em vez de sumir do tabuleiro, procure cobertura e use Acuidade com Arma para perfurações precisas.","Ecarlate Scarlet"],
  ["gestalt","Gestalt","Sagitário","arco","humano","Flecha da Deusa","A imagem de centauro de Gestalt está ligada à intervenção de Odysseus e ao cavalo de sua infância.","Trate o aspecto centauro como parte visual e mantenha as regras de arqueiro. Disparo Preciso permite atirar entre os combatentes."],
  ["izo","Izō","Capricórnio","lamina","humano","Excalibur de Izō","Guerreiro de postura samurai, Izō empunha sua técnica cortante como legado da casa.","Florete representa o corte veloz. Especialização melhora o dano e Ataque Reflexo vigia a circulação.","Izo"],
  ["mystoria","Mystoria","Aquário","gelo","qareen-agua","Pó de Diamante","Mystoria confronta Hyoga com o gelo de Aquário.","Entre com Seta de Talude como cristais e prepare Sopro das Uivantes quando o círculo estiver liberado."],
  ["cardinale","Cardinale","Peixes","tumulo","dahllan","Rosa Sangrenta","Cardinale usa rosas letais e confronta Shijima no século XVIII.","Prenda a passagem com plantas, enfraqueça o alvo e aplique Toque Vampírico como a rosa sugadora."],
  ["odysseus","Odysseus","Ofiúco","botica","qareen-terra","Médico do Santuário","O médico Odysseus retorna como o Cavaleiro de Ouro de Ofiúco na Guerra Santa do século XVIII.","Proteja o corredor com abjurações. Use Curar Ferimentos da tatuagem quando um aliado precisar de cura real.","Odisseu Serpentário Ophiuchus"]
 ];
 dimensionRows.forEach(row=>saint("nd",row));
 saint("mitico",["asclepio","Asclépio","Ofiúco","mente","qareen-terra","Vontade de Ofiúco","O antigo Cavaleiro de Ouro retorna ao possuir o corpo de Odysseus.","Priorize controle mental testável e cura racial pontual. A posse é parte da história e usa o próprio personagem em T20.","Asclepius Asclepios Esculápio Serpentário"]);

 const canvasRows=[
  ["shion","Shion","Áries","barreira","elfo","Muralha de Cristal","O jovem Shion da história de Shiori Teshirogi é aluno de Hakurei e herda o dever de manter o Santuário.","Monte defesa reativa com Campo de Força e abra caminhos com Telecinesia.","Sion"],
  ["hasgard","Hasgard","Touro","muralha","minotauro","Titan Nova","Hasgard assume o nome Aldebaran e treina jovens como Teneo.","Guarde seus PV altos para proteger a dupla da frente. Rasteira e Lutador de Chão seguram inimigos antes da Trocação.","Rasgado Aldebaran"],
  ["aspros","Aspros","Gêmeos","esfera","elfo","Outra Dimensão","Aspros domina técnicas dimensionais e é o irmão de Deuteros.","Escolha Salto Dimensional para alcançar o ângulo do disparo e mantenha campo de força para quando o inimigo encurtar."],
  ["deuteros","Deuteros","Gêmeos","esfera","qareen-fogo","Erupção Negra","Deuteros treina isolado na Ilha Kanon, em ambiente vulcânico, antes de assumir Gêmeos.","Use fogo racial no alcance curto. Depois de conjurar, troque de posição para explorar o alcance do Raio Poderoso.","Defteros"],
  ["manigoldo","Manigoldo","Câncer","tumulo","sulfure","Chamas Demoníacas","Discípulo de Sage, Manigoldo luta contra entidades espirituais com técnicas de Câncer.","Mantenha alvo preso com Amarras. Use a vertente de trevas para concentrar o dano em vez de depender de expulsões de alma automáticas."],
  ["regulus","Regulus","Leão","pressao","moreau-leao","Pressão de Plasma","O prodígio de Leão analisa movimentos após observá-los.","Até Acertar transforma leitura em perseguição calculada. Use golpes serializados só quando o primeiro acerto confirmar a abertura.","Régulus"],
  ["ilias","Ilias","Leão","punhos","moreau-leao","Instinto do Leão","Ilias é pai de Regulus e Cavaleiro de Leão anterior à guerra principal.","Encurte o combate com pressão de punhos apoiada no Rugido Imponente. Defenda a retaguarda antes de perseguir.","Ílias"],
  ["asmita","Asmita","Virgem","mente","aggelus","Tesouro do Céu","Asmita liga seu Cosmo à criação do rosário que contém as almas dos espectros.","Use magias de Vontade e distribua seu espaço de conjuração pelo campo; cada contenção usa a duração legal."],
  ["dohko","Dohko","Libra","punhos","humano","Cólera dos Cem Dragões","Na cronologia de Lost Canvas, Dohko luta ao lado de Tenma e sobrevive à guerra.","Golpe Relâmpago e Trocação representam a sequência de dragões. Escolha a abertura antes de gastar PM.","Dōko"],
  ["kardia","Kardia","Escorpião","lamina","sulfure","Katakeo de Antares","Kardia é conhecido por sua condição cardíaca e por concentrar calor na técnica de Antares.","Ataque com florete e Golpe Pessoal. A build favorece dano veloz e a decisão arriscada de encurtar o combate.","Cardia Katakaio"],
  ["sisifo","Sísifo","Sagitário","arco","aggelus","Flecha da Esperança","Sísifo reconhece Sasha e age como um líder entre os Cavaleiros de Ouro.","Priorize tiros que salvam a frente, com Disparo Preciso. Use Arqueiro e sua SAB para fortalecer a arma.","Sisyphos Sisifus Sisyphus"],
  ["el-cid","El Cid","Capricórnio","lamina","humano","Excalibur","El Cid afia o próprio Cosmo até transformá-lo em corte preciso; combate no domínio dos sonhos.","Abra com ataques de baixo custo por Acuidade e finalize o inimigo no alcance usando Golpe Pessoal."],
  ["degel","Dégel","Aquário","gelo","qareen-agua","Esquife de Gelo","Aluno de Krest, Dégel trata o gelo como ciência e contenção.","Modele o esquife com Amarras Etéreas e o frio com Sopro das Uivantes. Não converta contenção em morte automática."],
  ["albafica","Albafica","Peixes","tumulo","dahllan","Rosa Sangrenta","Albafica cultiva rosas venenosas e leva o próprio sangue tóxico ao combate.","Bloqueie entradas com plantas. Concentre a técnica com Toque Vampírico e controle os aliados no mapa."],
  ["teneo","Teneo","Touro","quebra","minotauro","Legado de Hasgard","Aluno de Hasgard, torna-se o sucessor de Touro depois da Guerra Santa.","Use marreta de duas mãos para pancadas comprometidas. Durão ajuda quando Teneo se expõe para proteger um companheiro.","Teneo Aldebaran"],
  ["zaphiri","Zaphiri","Escorpião","lamina","sulfure","Guardião de Escorpião","Antecessor de Kardia, Zaphiri aparece em uma história ligada ao poder de Poseidon.","Acuidade e Golpe de Raspão apoiam uma esgrima que desgasta sem exigir magia exclusiva."],
  ["lugonis","Lugonis","Peixes","tumulo","dahllan","Sangue de Rosas","Antecessor e mestre de Albafica, ligado às rosas tóxicas da tradição de Peixes.","Use a progressão de trevas para representar toxina e sangue. A magia racial segura a área de aproximação.","Rugonis"]
 ];
 canvasRows.forEach(row=>saint("tlc",row));

 const olderRows=[
  ["gateguard","Gateguard","Áries","esfera","elfo","Cosmo do Áries Anterior","Guardião de Áries na geração antiga, Gateguard entra em conflito com aliados do Santuário.","Use explosões de alcance e proteção de Abjuração quando precisar manter espaço."],
  ["francisca","Francisca","Touro","quebra","minotauro","Investida de Touro","Francisca é o Touro da geração anterior a Hasgard, presente nos gaidens.","Ache um corredor de investida e guarde resistência para receber a resposta. A marreta é o golpe de massa em Arton."],
  ["sage","Sage","Câncer","tumulo","sulfure","Selo de Câncer","Sage é titular de Câncer na guerra anterior, chega a Grande Mestre e treina Manigoldo.","Use proteção contra aproximação e controle o alvo por testes antes de lançar sua técnica de trevas."],
  ["itia","Itia","Libra","lancas","humano","Equilíbrio de Libra","Itia foi Cavaleiro de Libra antes de tornar-se Grande Mestre; sua história atravessa gerações.","Escolha uma arma longa para bloquear entrada e rotacione entre ataques, manobras e Durão.","Itea"],
  ["aeras","Aeras","Sagitário","arco","aggelus","Flecha da Guerra Antiga","Titular da geração antiga, Aeras figura nos relatos da Guerra Santa de Lost Canvas.","Posicione-se na segunda linha. Tire proveito de Arqueiro para dano sustentado antes de investir em Golpe Pessoal.","Aerus"],
  ["krest","Krest","Aquário","gelo","qareen-agua","Zero do Veterano","Krest, também grafado Krjest, atravessa várias eras e é mestre de Dégel.","Use Névoa como quebra de visão e Campo de Força para segurar o posto enquanto canaliza gelo.","Krjest Krést"],
  ["avenir","Avenir","Áries","barreira","elfo","Retorno de Áries","Um Cavaleiro de Áries vindo de um futuro devastado atua ao lado de Sage e Hakurei na guerra do século XV.","Trate viajar no tempo como contexto. Use Salto Dimensional para a sua mobilidade em jogo e prepare magias defensivas.","Avenir do futuro","https://www.saintseiyapedia.com/wiki/Avenir"]
 ];
 olderRows.forEach(row=>saint("antigos",row));
 const unnamed=[
  ["antigos","gemeos-xv","Sem nome · séc. XV","Gêmeos","esfera","elfo"],
  ["antigos","leao-xv","Sem nome · séc. XV","Leão","punhos","moreau-leao"],
  ["antigos","escorpiao-xv","Sem nome · séc. XV","Escorpião","lamina","sulfure"],
  ["antigos","peixes-xv","Sem nome · séc. XV","Peixes","tumulo","dahllan"],
  ["antigos","leao-xiii","Sem nome · séc. XIII","Leão","muralha","moreau-leao"],
  ["antigos","capricornio-xiii","Sem nome · séc. XIII","Capricórnio","lamina","humano"],
  ["futuro","libra","Sem nome · futuro","Libra","lancas","humano"],
  ["futuro","sagitario","Sem nome · futuro","Sagitário","arco","aggelus"]
 ];
 unnamed.forEach(([era,id,name,sign,build,race])=>saint(era,[id,"Cavaleiro "+name,sign,build,race,
  "Sentinela de "+sign,"A fonte identifica o posto ou a Armadura de "+sign+"; a identidade pessoal e o repertório não foram revelados.",
  "Esta build é uma proposta de mesa inspirada na tradição de "+sign+". Seu equipamento e seus poderes pertencem a Tormenta20.","Gold Saint anônimo sem nome",wiki]));

 const omegaRows=[
  ["kiki","Kiki","Áries","barreira","elfo","Reparo e Cristal","Kiki, antigo ajudante de Mu, assume Áries e repara Armaduras de seus aliados.","Apoie com Abjuração. Conserto usa Ofício (artesão); proteção em combate vem do repertório."],
  ["harbinger","Harbinger","Touro","muralha","minotauro","Grande Chifre","Harbinger aceita a armadura e valoriza confrontos que põem a força à prova.","Resista na passagem com Casca Grossa. Use Rasteira e pressione com Trocação quando o rival baixar a guarda."],
  ["paradox","Paradox","Gêmeos","ilusao","sulfure","Destino Cruzado","Paradox distorce a percepção e confronta os rivais com futuros possíveis.","Apresente alternativas por Criar Ilusão e avance para Miragem, mantendo os testes e limites da magia."],
  ["integra","Integra","Gêmeos","barreira","elfo","Outra Dimensão","Irmã de Paradox, Integra defende Atena usando técnicas de Gêmeos.","Retire aliados do foco por posicionamento, bloqueie rivais e alcance boa linha com Salto Dimensional."],
  ["schiller","Schiller","Câncer","tumulo","sulfure","Ondas do Mundo dos Mortos","O Cavaleiro de Câncer usa mortos e confronta Yuna em seu domínio.","Use medo, tenacidade e dano de trevas no ritmo legal de cada magia. Nenhuma técnica remove o jogador da mesa por decreto."],
  ["mycenae","Mycenae","Leão","pressao","moreau-leao","Presas do Rei","O Cavaleiro de Leão atua como mentor de Eden e defende seus próprios ideais.","Rugido breve, investida e Briga mantêm a identidade do Leão. Poupe PM para Punhos de Adamante.","Micenas Mykenae"],
  ["fudo","Fudō","Virgem","mente","aggelus","Julgamento de Virgem","O Virgem de Ômega usa técnicas ligadas a um protetor irado e provações do espírito.","Controle a próxima ação do oponente com magias de Vontade. Guarde a reação de Campo de Força para o turno exposto.","Fudo"],
  ["genbu","Genbu","Libra","lancas","humano","Defesa de Libra","Discípulo do Mestre Ancião, Genbu protege os Cavaleiros de Bronze e empunha armas de Libra.","Bloqueie corredores com arma longa e use Durão ao manter a passagem ocupada."],
  ["shiryu","Shiryu","Libra","lancas","humano","Dragão da Balança","Shiryu sucede Genbu no posto de Libra e leva o legado de Dohko à linha de frente.","Lute com arma longa e use os níveis altos para ataque de cobertura. A técnica do Dragão é representada pelo Golpe Pessoal.","Shiryū Shiryu Dragão"],
  ["sonia","Sonia","Escorpião","lamina","lefou","Tempestade Escarlate","Sonia, filha de Mars, ocupa a casa de Escorpião após atuar com o lado marciano.","Use Esgrimista para perfurar pontos frágeis e reserve Golpe Pessoal para a janela em que a defesa falhar.","Sônia"],
  ["seiya","Seiya","Sagitário","arco","aggelus","Flecha de Atena","O antigo Cavaleiro de Pégaso assume oficialmente Sagitário em Ômega.","Arco longo e Ataque Especial para acertar um alvo-chave. Disparo Preciso mantém a cobertura mesmo em combate misto.","Seya Pégaso Pegasus","https://www.toei-anim.co.jp/tv/seiya/character/seiya/index.html"],
  ["ionia","Ionia","Capricórnio","mente","qareen-terra","Dominação da Linguagem","Ionia usa palavras para comandar ações e tem ligação com a escola Palaestra.","Trate a linguagem como magias de Encantamento com Vontade e alvos válidos; a build se protege com abjurações."],
  ["tokisada","Tokisada","Aquário","artificio","elfo","Manipulação do Tempo","Tokisada usa técnicas ligadas ao tempo e ocupa Aquário antes de outro papel no arco de Pallas.","Use Velocidade, contenção e Salto Dimensional para simular tempo relativo com ações mensuráveis."],
  ["amor","Amor","Peixes","tumulo","sulfure","Aprisionamento de Trevas","Amor manipula trevas e encurrala oponentes com técnicas de Peixes.","Trave a rota inimiga com Amarras e concentre dano de trevas. Controle o gasto antes de sustentar efeitos simultâneos."]
 ];
 omegaRows.forEach(row=>saint("omega",row));

 const darkRows=[
  ["theseus","Theseus Gavras","Áries","barreira","elfo","Defesa de Áries","Theseus é o titular de Áries na continuidade de Dark Wing.","Use Abjuração para resistir e Telecinesia quando for preciso deslocar o problema.","Teseu Theseus"],
  ["ain","Ain","Touro","quebra","minotauro","Investida de Touro","O grupo de Ouro de Dark Wing tem Ain na casa de Touro.","Apoie a linha com marreta; ataque com força plena só depois de fixar o inimigo."],
  ["sojiro","Sōjirō Tokitō","Gêmeos","esfera","elfo","Frente Dimensional","Sōjirō, irmão de Shōichirō, ocupa a casa de Gêmeos de Dark Wing.","Corte a distância com uma técnica arcana e preserve PM para sair de emboscadas.","Sojiro Tokito Soujirou"],
  ["crematorio","Crematorio","Câncer","tumulo","sulfure","Guardião de Praesepe","Crematorio é o titular de Câncer em Dark Wing.","Use a escola de Necromancia para pressão de curto alcance sem avançar além da cobertura.","Crematório"],
  ["vasilios","Vasilios","Leão","pressao","moreau-leao","Pressão Felina","Vasilios ocupa a casa de Leão de Dark Wing.","Escolha uma investida curta e pressione com sequência de golpes. Rugido e Trocação custam PM separados."],
  ["renge","Renge","Virgem","mente","aggelus","Vigília de Virgem","Renge é a titular de Virgem na formação de Dark Wing.","Controle aproximação com Encantamento e guarde uma defesa para enfrentar inimigos resistentes à mente."],
  ["kogetsuki","Kōgetsuki","Libra","lancas","humano","Equilíbrio de Libra","Kōgetsuki ocupa o posto de Libra no elenco de Dark Wing.","Mantenha uma rota defensiva com arma alongada. Use Luta para manobras e libere espaço para aliados.","Kogetsuki Kougetsuki"],
  ["eulalia","Eulalia","Escorpião","lamina","sulfure","Agulha de Escorpião","Eulalia é a titular de Escorpião em Dark Wing.","Espere o avanço adversário para responder com Ataque Reflexo. A florete representa as perfurações.","Eulália"],
  ["aiolos","Aiolos","Sagitário","arco","aggelus","Flecha de Sagitário","A linha alternativa de Dark Wing identifica Aiolos como titular de Sagitário.","Aponte de uma posição elevada e só gaste Ataque Especial quando for preciso acertar uma flecha decisiva.","Aioros"],
  ["eito","Eito","Capricórnio","lamina","humano","Corte de Capricórnio","Eito porta Capricórnio no elenco de Dark Wing.","Use Acuidade, Esgrimista e um corte letal para manter a função de duelista; trabalhe sempre à distância real da arma."],
  ["tristan","Tristan","Aquário","gelo","qareen-agua","Frente Fria","Tristan ocupa Aquário em Dark Wing.","Crie névoa como cobertura antes de conjurar frio em cone. Nas etapas finais, use Magia Pungente contra pressão corpo a corpo.","Tristão"],
  ["alfreed","Alfreed","Peixes","tumulo","dahllan","Jardim de Peixes","Alfreed figura como titular de Peixes em Dark Wing. A ficha adota o motivo da casa para a adaptação de mesa.","Use plantas para controlar a retirada e um arcano de trevas para a segunda linha.","Afreed Alfrid"]
 ];
 darkRows.forEach(row=>saint("dark",row));

 const episodeRows=[
  ["ikki","Ikki","Leão","esfera","qareen-fogo","Fênix do Leão","Ikki assume Leão entre os sucessores dourados do Episódio G.","Use a resistência racial ao fogo para sustentar a linha de canalização. Explosão de Chamas e Raio Arcano fazem a vez das chamas da Fênix."],
  ["shun","Shun","Virgem","barreira","aggelus","Correntes de Proteção","Shun figura como sucessor de Virgem em G Assassin, com a proteção dos outros como motor do combate.","Amarras Etéreas representam a corrente. Monte defesa antes de prender o invasor e mantenha distância para reagir.","Shun Andrômeda"],
  ["hyoga","Hyoga","Aquário","gelo","qareen-agua","Execução Aurora","Hyoga passa a exercer a função de Aquário no futuro do Episódio G.","Combine o frio com imobilização e use Campo de Força contra ataque concentrado. Névoa ajuda a retirada.","Hyōga Cisne"],
  ["lancelot","Lancelot","Câncer","lamina","sulfure","Lâmina do Lost World","O Gladiador Lancelot junta-se aos Lost Saints como Cavaleiro de Câncer.","Use golpes de espada ágil, duelos e Escuridão racial para preparar o confronto. O submundo do Lost World informa a história."]
 ];
 episodeRows.forEach(row=>saint("ga",row));

 function form(parentId,key,label,revision){
  const parent=seeds.find(s=>s.id===parentId);
  if(!parent)throw Error("Forma sem dossiê principal: "+parentId);
  forms.push(seed({...parent,...revision,id:parentId+"--"+key,parentId,key,label,isAlt:true,
   name:parent.name+" — "+label}));
 }
 const variant=(parentId,key,label,arc,source,change={})=>{
  const parent=seeds.find(s=>s.id===parentId);
  form(parentId,key,label,{universe:gold+" — "+arc,arc,source,canon:parent.canon+" Nesta ficha, a adaptação segue "+arc+".",...change});
 };
 for(const row of classicRows.slice(0,12)){
  const id="cdz-classico-"+row[0];
  variant(id,"alma-de-ouro","Alma de Ouro","Soul of Gold",classic,{color:"#f4cc69",
   canon:row[6]+" Em Soul of Gold, desperta a forma divina da Armadura.",
   tactic:row[7]+" Trate a Armadura Divina como a representação visual de proteção e avance por equipamento e habilidades da build."});
  variant(id,"episodio-g","Episódio G","Episódio G",g,{color:"#efca80"});
  if(row[0]!=="dohko")variant(id,"lenda","Lenda do Santuário","A Lenda do Santuário",movie,row[0]==="milo"?
   {canon:"A releitura cinematográfica apresenta Milo como mulher no posto de Escorpião.",
    tactic:"Use uma duelista de ataques velozes. Acuidade e Esgrimista representam a técnica de agulhas desta versão."}:{});
 }
 for(const slug of ["mu","saga","deathmask","aiolia","milo","aphrodite","shaka","aldebaran"])
  variant("cdz-classico-"+slug,"saintia-sho","Saintia Shô","Saintia Shô","https://www.akitashoten.co.jp/series/3583");
 for(const slug of ["mu","shaka","dohko","aiolos","camus"])
  variant("cdz-classico-"+slug,"lost-world","Lost World","Episódio G Assassin · Lost World",g,{
   canon:"Esta contraparte integra a força dourada do Lost World, cuja história diverge da cronologia principal.",
   color:"#9e96c8"
  });
 variant("cdz-omega-kiki","assassin","G Assassin","Episódio G Assassin",g);
 variant("cdz-omega-shiryu","assassin","G Assassin","Episódio G Assassin",g);
 variant("cdz-omega-shiryu","requiem","G Requiem","Episódio G Requiem",g,{build:"punhos"});
 variant("cdz-omega-seiya","requiem","G Requiem","Episódio G Requiem",g,{build:"arco"});
 variant("cdz-classico-shura","assassin","G Assassin","Episódio G Assassin",g,{color:"#a0bddb"});
 variant("cdz-classico-shura","requiem","G Requiem","Episódio G Requiem",g);
 variant("cdz-ga-ikki","requiem","G Requiem","Episódio G Requiem",g,{build:"pressao"});
 variant("cdz-nd-shion","grande-mestre","Grande Mestre","Clássico · Grande Mestre",wiki,{build:"botica"});
 variant("cdz-classico-aiolos","time-odyssey","Time Odyssey","Time Odyssey","https://www.kana.fr/produit/saint-seiya-time-odyssey-t1/");
 const hades="https://lineup.toei-anim.co.jp/ja/ova/seiya_hades/";
 for(const [parent,title,sign] of [
  ["cdz-omega-seiya","Seiya","Sagitário"],["cdz-omega-shiryu","Shiryu","Libra"],["cdz-ga-ikki","Ikki","Leão"],
  ["cdz-ga-shun","Shun","Virgem"],["cdz-ga-hyoga","Hyoga","Aquário"]
 ])variant(parent,"armadura-classica","Armadura de Ouro · Clássico","Clássico · uso temporário",hades,{
  canon:title+" veste a Armadura de "+sign+" em combate na série clássica; o dossiê principal registra sua titularidade posterior em outra continuidade."
 });

 const cyber="https://www.cyberpunk.net/pt-br/edgerunners2";
 const glitch="https://www.glitchprod.com/murder-drones";
 const db="https://en.dragon-ball-official.com/";
 const extras=[
  {id:"senshi",name:"Senshi",universe:"Dungeon Meshi",group:"dungeon-meshi",arc:"Delicious in Dungeon",build:"guarda",raceId:"anao",origin:"guarda",signature:"Cozinheiro da Masmorra",
   canon:"Senshi é um anão, cozinheiro e aventureiro que prepara refeições com monstros da masmorra.",
   tactic:"Use machado e escudo na frente. Prepare pratos com Ofício (cozinheiro) e Gororoba na exploração e divida o estoque com a equipe.",
   item:"Machado de batalha. A panela reforçada é representada pelo escudo leve, comprado separadamente.",
   source:"https://deliciousindungeon.com/characters/senshi/",aliases:"Delicious in Dungeon Dungeon Food",color:"#b58e50"},
  {id:"lucy",name:"Lucy Kushinada",universe:"Cyberpunk: Edgerunners",group:"cyberpunk",arc:"Edgerunners",build:"invasao",raceId:"kliren",signature:"Trilha-rede da Lua",
   canon:"Lucy é uma netrunner que usa infiltração e o monofio no universo de Edgerunners.",
   tactic:"Mãos Rápidas e Ladinagem representam invasão de dispositivos acessíveis. Disfarce Ilusório, invisibilidade e Sussurros Insanos entram pelos círculos de Ventanista.",
   item:"Monofio representado por adaga no corpo a corpo, com regra integral da adaga.",
   source:"https://cyberpunk.fandom.com/wiki/Lucyna_Kushinada",aliases:"Lucy Kishinada Lucyna Kushinada netrunner",color:"#86dee1"},
  {id:"weak",name:"Kingsley Weakly",universe:"Cyberpunk: Edgerunners 2",group:"cyberpunk",arc:"Edgerunners 2",build:"guarda",raceId:"minotauro",signature:"O Rei Veterano",
   canon:"O veterano conhecido como Weak já teve o apelido King e carrega o peso da antiga glória.",
   tactic:"Conserve posição, antecipe a saída do alvo com Ataque Reflexo e use Durão para sobreviver ao revide.",
   source:cyber,aliases:"Weak King Kingsley",color:"#d5ac75"},
  {id:"adam-smasher",name:"Adam Smasher",universe:"Cyberpunk: Edgerunners / Cyberpunk 2077",group:"cyberpunk",arc:"Night City",build:"quebra",raceId:"golem-ferro-grande",signature:"Plataforma de Cerco",
   canon:"Smasher é um mercenário de corpo quase inteiramente mecanizado, associado à Arasaka.",
   tactic:"Pressione de perto com arma pesada e Ataque Especial. Use o cone de Vapor como alternativa tática quando puder pegar vários inimigos.",
   item:"Marreta apropriada ao tamanho Grande. O aspecto visual pode ser o de um braço mecânico.",
   source:"https://cyberpunk.fandom.com/wiki/Adam_Smasher",color:"#db685f"},
  {id:"talia",name:"Talia",universe:"Cyberpunk: Edgerunners 2",group:"cyberpunk",arc:"Edgerunners 2",build:"arrancada",raceId:"lefou",signature:"Cria da Maelstrom",
   canon:"Talia cresceu em ambiente corporativo e se endureceu em contato com a Maelstrom e sua fixação por implantes.",
   tactic:"Tome a iniciativa com Voadora ou Rasteira. Combine golpes de pressão sem gastar toda a mana antes de ter uma saída.",
   source:cyber,color:"#df776f"},
  {id:"roman",name:"Roman Carax",universe:"Cyberpunk: Edgerunners 2",group:"cyberpunk",arc:"Edgerunners 2",build:"cronista",raceId:"humano",signature:"Câmera de Night City",
   canon:"Roman é um cinéfilo que tenta registrar histórias reais num mundo dominado pela neurodança.",
   tactic:"Use Investigação, Percepção e Furtividade para observar. Evite abrir o combate e use Escapista para voltar com o registro.",
   item:"A câmera é um acessório de investigação. A besta leve é um recurso de defesa, com recarga normal.",
   source:cyber,color:"#efc186"},
  {id:"caine",name:"Caine",universe:"The Amazing Digital Circus",group:"digital-circus",arc:"Digital Circus",build:"ilusao",raceId:"golem-espelhos",purpose:"reflexos-combate",signature:"Mestre de Picadeiro",
   canon:"Caine é a IA que conduz o circo digital e impõe aventuras aos humanos presos ali.",
   tactic:"Plante ilusões no mapa, use magias de camuflagem e revele o cenário com Miragem. Espelhos imita uma habilidade com o custo racial em vez de reescrever o jogo.",
   source:"https://www.glitchprod.com/the-amazing-digital-circus",color:"#ee85a5"},
  {id:"md-v",name:"V",universe:"Murder Drones",group:"murder-drones",arc:"Disassembly Drones",build:"pressao",raceId:"golem-bronze-v",purpose:"reflexos-combate",signature:"Desmontagem Agressiva",
   canon:"V é um drone de desmonte que usa o próprio corpo armado em combate.",
   tactic:"Avance com Voadora e Trocação. A fonte alquímica é um recurso de recuperação de PM, e as asas no traje não mudam o deslocamento.",
   source:glitch,aliases:"Serial Designation V Drone V",color:"#f4ce6c"},
  {id:"md-n",name:"N",universe:"Murder Drones",group:"murder-drones",arc:"Disassembly Drones",build:"escudo",raceId:"golem-bronze-n",signature:"Desmontagem Protetora",
   canon:"N é um drone de desmonte amistoso que se alia a Uzi.",
   tactic:"Use escudo, bloqueie aproximação e acione Durão ao proteger a retirada. Estilo de Arma e Escudo e Solidez sustentam a frente.",
   source:glitch,aliases:"Serial Designation N Drone N",color:"#edd492"},
  {id:"md-uzi",name:"Uzi Doorman",universe:"Murder Drones",group:"murder-drones",arc:"Absolute Solver",build:"artificio",raceId:"golem-bronze-uzi",purpose:"reflexos-combate",signature:"Absolute Solver",
   canon:"Uzi começa como drone operária que constrói uma arma e manifesta poderes ligados ao Solver.",
   tactic:"O foco visual é a arma de Uzi. Comece com Seta de Talude e use Telecinesia no 9º nível de Arcanista para deslocar alvos e objetos.",
   source:glitch,aliases:"Uzi Solver Worker Drone",color:"#c59cf2"},
  {id:"vegeta",name:"Vegeta",universe:"Dragon Ball Z",group:"dragonball",arc:"Dragon Ball Z",build:"punhos",raceId:"moreau-leao",formKey:"z",label:"DBZ",signature:"Orgulho do Príncipe",
   canon:"O príncipe Saiyajin de Dragon Ball Z passa de invasor a rival e aliado dos defensores da Terra.",
   tactic:"Golpe Relâmpago e Trocação representam pressão física e explosões de ki no corpo a corpo. Use o Rugido como postura de desafio.",
   source:db,aliases:"DBZ GT Daima Super Saiyajin Majin Galick Gun Final Flash",color:"#8eb3fa"},
  {id:"sans",name:"Sans",universe:"Undertale",group:"undertale",arc:"Undertale",build:"ossos",raceId:"osteon",signature:"Encontro no Corredor",
   canon:"Sans é um esqueleto que usa ossos, atalhos e alterações de movimento no confronto de Undertale.",
   tactic:"Use Área Escorregadia para a primeira armadilha e Salto Dimensional para escapar. Telecinesia representa o deslocamento de alvos em níveis altos.",
   source:"https://undertale.wiki/w/Sans",aliases:"Sans the Skeleton Gaster Blaster",color:"#77bfeb"}
 ];
 seeds.push(...extras.map(seed));
 form("vegeta","gt","GT",{universe:"Dragon Ball GT",arc:"Dragon Ball GT",build:"pressao",arcaneLevels:6,color:"#f58c82",
  signature:"Final Shine",canon:"Em GT, Vegeta chega ao Super Saiyajin 4 com o auxílio das Ondas Blutz.",
  tactic:"Lutador 6 libera Trocação. Passe a Bruxo 6 para representar o Final Shine com Raio Arcano e rajadas à distância. A transformação é descrita sem ganhos extras."});
 form("vegeta","daima","Daima",{universe:"Dragon Ball Daima",arc:"Dragon Ball Daima",build:"arrancada",color:"#e6bc77",
  signature:"Vanguarda de Daima",canon:"Em Daima, Vegeta é revertido a uma aparência infantil e demonstra Super Saiyajin 3.",
  tactic:"Use investida, acrobacias e ataques desarmados em sequência. A aparência Mini é cosmética para a herança Moreau escolhida, conservando o tamanho da ficha."});
 form("vegeta","super","Super",{universe:"Dragon Ball Super",arc:"Dragon Ball Super",build:"muralha",arcaneLevels:4,color:"#b695f6",
  signature:"Pressão do Ultra Ego",canon:"Em Dragon Ball Super, Vegeta desenvolve o Super Saiyajin Blue e, no mangá, aprende o Ultra Ego.",
  tactic:"Lutador 8 dá resistência e permite Punhos de Adamante. Os quatro níveis de Bruxo trazem rajadas que representam destruição, com dano e resistência próprios."});

 window.T20_COSMOS_DATA={seeds,forms};
})();
