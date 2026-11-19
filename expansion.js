/* Expansão multiverso — somente regras oficiais com reflavor.
   Esta camada acrescenta personagens sem alterar as cinco fichas originais. */
(()=>{
const data=window.T20_DATA, guides=window.T20_GUIDE;
if(!data||!guides) return;
const art={
 yoru:"https://statico.soapcentral.com/editor/2025/08/82cc1-17555889435280-1920.jpg",
 diego:"https://renote.net/files/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeUhkWWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ%3D%3D--30051562fdccb2811baa77c80dfcc1b79eb84587/%E3%83%87%E3%82%A3%E3%82%A8%E3%82%B4.png",
 diegoAlt:"https://img3.wikia.nocookie.net/__cb20140718123302/jjba/images/f/f0/Diego%27s-World.png",
 ado:"https://static.zerochan.net/Ado.%28Nico.Nico.Singer%29.1024.4360839.webp",
 cyrene:"https://static.zerochan.net/Cyrene.%28Honkai.Star.Rail%29.full.4623397.jpg",
 marin:"https://bisquedoll-anime.com/assets/img/char_img_01.png",
 makima:"https://images8.alphacoders.com/128/thumb-1920-1284789.jpg",
 optimus:"https://vignette.wikia.nocookie.net/transformers-prime/images/a/a1/Optimus_prime_prime_beast_hunters_promo_by_barricade24-dau08wv.png/revision/latest?cb=20180308090000&path-prefix=pl"
};
const order=["CON","CAR","SAB","INT","FOR","DEX"];
const label={CON:"Constituição",CAR:"Carisma",SAB:"Sabedoria",INT:"Inteligência",FOR:"Força",DEX:"Destreza"};
const skillAttr={
 "Luta":"FOR","Pontaria":"DEX","Fortitude":"CON","Reflexos":"DEX","Vontade":"SAB",
 "Iniciativa":"DEX","Cavalgar":"DEX","Furtividade":"DEX","Acrobacia":"DEX",
 "Atletismo":"FOR","Percepção":"SAB","Intuição":"SAB","Sobrevivência":"SAB",
 "Adestramento":"CAR","Atuação":"CAR","Diplomacia":"CAR","Enganação":"CAR",
 "Intimidação":"CAR","Misticismo":"INT","Investigação":"INT","Conhecimento":"INT",
 "Nobreza":"INT","Ladinagem":"DEX","Ofício (armeiro)":"INT","Ofício (engenhoqueiro)":"INT",
 "Ofício (alquimista)":"INT","Ofício (costureira)":"INT","Ofício (maquiagem)":"INT",
 "Ofício (artesão)":"INT","Cura":"SAB","Guerra":"INT","Pilotagem":"DEX"
};
const doc={
 core:"https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf",
 heroes:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/",
 threats:"https://jamboeditora.com.br/produto/ameacas-de-arton/"
};
const make=(x)=>{
 const attrs=order.map(k=>({key:k,buy:x.buy[k]||0,race:x.raceBonus[k]||0,value:(x.buy[k]||0)+(x.raceBonus[k]||0),why:x.whys[k]||"Atributo secundário."}));
 const values=Object.fromEntries(attrs.map(a=>[a.key,a.value]));
 const skills=x.skills.map(s=>{let name=Array.isArray(s)?s[0]:s;const desc=Array.isArray(s)?s[1]:"Perícia treinada";const attr=skillAttr[name]||"INT";return [name,(values[attr]+2>=0?"+":"")+(values[attr]+2),desc]});
 return {
  id:x.id,number:x.number,name:x.name,universe:x.universe,label:x.label,symbol:x.symbol,theme:x.theme,
  portrait:{url:x.image,credit:x.credit,page:x.source},
  excerpt:x.excerpt,info:{race:x.race,className:x.className,origin:x.origin,devotion:x.devotion,role:x.role,partner:x.partner||"Nenhum parceiro automático"},
  stats:x.stats,attrs,summary:x.summary,history:x.history,skills,initial:x.initial,
  gear:x.gear.map(g=>({name:g[0],rule:g[1],detail:g[2],qty:g[3]||"1",image:g[4],source:g[5],credit:g[6]})),
  attacks:x.attacks.map(a=>({name:a[0],test:a[1],damage:a[2],cost:a[3],detail:a[4]})),
  progression:x.progression.map((p,i)=>[String(i+1),p[0],p[1]]),
  techniques:x.techniques.map(t=>({level:t[0],name:t[1],mechanic:t[2],cost:t[3],effect:t[4],flavor:t[5]})),
  notes:{overview:x.notes[0],attributes:x.notes[1],equipment:x.notes[2],abilities:x.notes[3],progression:x.notes[4],techniques:x.notes[5]},
  media:[{name:x.name+" — arte",image:x.image,source:x.source,credit:x.credit},...(x.media||[])],
  sources:x.sources.map(k=>({name:k[0],url:k[1]})),
  _config:{classPage:x.page,levelHow:x.levelHow||[],extraRefs:x.extraRefs||{},basicHow:x.basicHow||[]}
 };
};
const profiles=[
{
 id:"yoru",number:"06",name:"Yoru",universe:"Chainsaw Man",label:"WAR DEVIL // ARSENAL",symbol:"⚔",theme:"yoru",image:art.yoru,
 credit:"Painel de Chainsaw Man, reproduzido em SoapCentral",source:"https://chainsaw-man.fandom.com/wiki/Yoru",
 race:"Humana (corpo compartilhado com Asa)",className:"Inventora",origin:"Artesã",devotion:"Sem devoção",role:"Armas fabricadas, combate e preparação",
 buy:{CON:1,CAR:0,SAB:1,INT:3,FOR:2,DEX:2},raceBonus:{INT:1,FOR:1,DEX:1},
 whys:{CON:"Resistir aos confrontos.",CAR:"Personalidade intimidadora, não diplomática.",SAB:"Instinto predatório.",INT:"Criar e explorar armas.",FOR:"Empunhar armas perigosas.",DEX:"Atacar antes do alvo."},
 stats:{pv:13,pm:4,defense:15,speed:"9 m",hpGain:4,pmGain:4},page:"68–71",
 excerpt:"Toda arma é uma escolha. A culpa é parte da história; o dano segue as regras.",
 summary:"Inventora humana com Ofício (armeiro) e Engenhosidade. Protótipo e fabricação oficial são a aproximação para as armas geradas pela Demônio da Guerra, sem transformar pessoas ou objetos instantaneamente.",
 history:["Yoru é o Demônio da Guerra, que divide o corpo de Asa Mitaka. Sua habilidade na obra transforma objetos que considera seus em armas, cuja potência se relaciona com culpa e propriedade.","Em Arton, isso vira fabricação, protótipos, melhorias e engenhocas. Transformar seres humanos em armas, gerar arsenal do nada ou usar contratos demoníacos não é gratuito nem uma função oficial do Inventor."],
 skills:[["Ofício (armeiro)","Criar armamentos"],["Ofício (engenhoqueiro)","Preparar dispositivos"],["Luta","Espadas e armas de contato"],["Pontaria","Armas à distância"],["Misticismo","Estudar efeitos"],["Guerra","Táticas bélicas"],["Iniciativa","Agir antes do alvo"],["Fortitude","Suportar ferimentos"],["Vontade","Manter a consciência na guerra"]],
 initial:["Engenhosidade — gastar PM para melhorar perícias", "Protótipo — item superior dentro das regras do Inventor","Ofício (armeiro) treinado; humano concede treino/poder geral", "Origem Artesã: Vontade treinada + Frutos do Trabalho; Humano (Versátil): Fortitude treinada + Sortudo"],
 gear:[
 ["Espada da guerra","Espada longa oficial","O visual sugere uma espada criada a partir de algo possuído, mas usa uma espada existente ou fabricada.", "1"],
 ["Protótipo bélico","Protótipo de Inventor","Escolha um item superior permitido pela classe; melhorias têm custo, limite e fabricação reais.","1"],
 ["Ferramentas de armeira","Instrumentos de Ofício","Exigidos para o tempo de fabricação; nenhuma arma nasce por comando verbal.","1"],
 ["Jaqueta escolar","Traje de viajante","Uniforme de Asa e Yoru, sem bônus sobrenatural.","1"],
 ["Arsenal futuro","Armas superiores / engenhocas","Armas adicionais e dispositivos são obtidos com recursos oficiais, não com vítimas transformadas.","Progressão"]
 ],
 attacks:[["Golpe da Guerra","+5","1d8+3","0 PM","Espada longa, atributo FOR +3, Luta treinada +2; arma deve estar disponível."],["Engenhosidade","Teste de perícia","Bônus conforme PM","Variável","Foco em Ofício e tática; não aumenta dano de espada por si só."]],
 progression:[
 ["Engenhosidade · Protótipo","Arsenal básico"],
 ["Armeiro","Usar INT em armas fabricadas"],
 ["Maestria em Perícia","Reduzir falhas na fabricação"],
 ["Balística","Trabalhar com armas de alcance"],
 ["Engenhoqueiro","Primeiros dispositivos da guerra"],
 ["Manutenção Eficiente","Manter engenhocas e equipamentos"],
 ["Encontrar Fraqueza (automático) · Saque Rápido","Identificar vulnerabilidades"],
 ["Aumento de Atributo (INT)","Criar armas melhores"],
 ["Fabricar Item Mágico Menor (automático) · Aumento de Atributo (DEX)","Equipamentos extraordinários"],
 ["Autômato","Aliado mecânico obtido legalmente"],
 ["Aumento de Atributo (FOR)","Impulso físico"],
 ["Aumento de Atributo (CON)","Aguentar a própria guerra"]
 ],
 techniques:[
 [1,"Espada do Remorso","Espada longa","0 PM","Ataque com arma real usando FOR. O vínculo emocional é narrativa.","Transformar arrependimento em lâmina."],
 [1,"Arsenal da Guerra","Protótipo","Item da classe","Possui um item superior permitido; sua obtenção segue o Inventor.","O primeiro instrumento de Yoru."],
 [2,"Arma Reivindicada","Armeiro","Passivo","Usa INT para atacar e causar dano com arma fabricada por ela, conforme requisitos do poder.","A técnica supera a força bruta."],
 [5,"Transmutação Industrial","Engenhoqueiro","Conforme engenhoca","Simula efeito de magia apenas por uma engenhoca fabricada e ativada.","A arma parece mudar de forma."],
 [7,"Ponto Fraco","Encontrar Fraqueza","Conforme classe","Identifica fraqueza de inimigo nos limites da habilidade.","Nenhuma defesa é perfeita."]
 ],
 notes:[
 "O corpo compartilhado de Asa é interpretação narrativa de uma humana; não concede dupla consciência com ações extras.",
 "Compra de 10 pontos. Humano: +1 INT, FOR e DEX. Atributos elevados representam fabricar e manejar armas.",
 "Toda arma criada deve obedecer a preço, tempo de trabalho, materiais, propriedades e limites de equipamentos de Tormenta20.",
 "Armeiro e Engenhoqueiro não permitem fabricar armas instantaneamente no combate. Uma arma fabricada de pessoa não é regra oficial.",
 "Inventor recebe poderes desde o nível 2 e várias melhorias de fabricação automáticas. Revisar custos e os pré-requisitos do poder ao subir.",
 "O peso emocional das armas é narrativa; não altera dano, crítico ou bônus de ataque."
 ],
 sources:[["Yoru — Chainsaw Man Wiki","https://chainsaw-man.fandom.com/wiki/Yoru"],["Tormenta20 — Inventor",doc.core]],
 levelHow:[
 "Escolha a arma/protótipo dentro do limite permitido; Engenhosidade melhora Ofício, não transforma gente.",
 "Armeiro permite usar INT em armas que a própria personagem fabricou, respeitando sua proficiência.",
 "Maestria em Perícia favorece Ofício e evita falhas desastrosas na produção.",
 "Balística reforça ataques com armas à distância; apenas armas elegíveis usam o benefício.",
 "Construa uma engenhoca de efeito legal, registre o custo, espaço e a magia simulada.",
 "Mantenha o estoque de engenhocas e pague manutenção e ativação conforme o poder.",
 "Encontrar Fraqueza é automático. Saque Rápido melhora trocas de armamento sem ignorar ações de ataque.",
 "INT aumenta a capacidade de criação e perícias técnicas; revise a distribuição, custos e patamares.",
 "Fabricar Item Mágico Menor é automático e necessita dos recursos e regras de fabricação do nível.",
 "O Autômato exige materiais, fabricação e segue regras de parceiro, nunca ganha ações de jogador.",
 "Aumente FOR para representar armamento pesado, dentro das restrições de aumento de atributo.",
 "Aumente CON para sobreviver às consequências da guerra. Confirme limitações de patamar."
 ]
},
{
 id:"diego",number:"07",name:"Diego Brando",universe:"JoJo — Steel Ball Run",label:"SCARY MONSTERS // JÓQUEI",symbol:"🦖",theme:"diego",image:art.diego,
 credit:"Arte de Diego Brando · RENOTE",source:"https://jojowiki.com/Dio_Brando_(Steel_Ball_Run)",
 race:"Humano",className:"Druida",origin:"Amigo dos Animais",devotion:"Megalokk",role:"Metamorfose, perseguição e animais",partner:"Silver Bullet; raptor como parceiro quando liberado",
 buy:{CON:1,CAR:1,SAB:2,INT:0,FOR:2,DEX:3},raceBonus:{CON:1,SAB:1,DEX:1},
 whys:{CON:"Resistir aos golpes.",CAR:"Presença arrogante.",SAB:"Instintos do dinossauro.",INT:"Improvisação predatória.",FOR:"Mordida e manobras.",DEX:"Velocidade de corredor."},
 stats:{pv:18,pm:7,defense:16,speed:"9 m",hpGain:6,pmGain:4},page:"61–63",
 excerpt:"Um campeão de corrida cujo verdadeiro instinto é sobreviver como predador.",
 summary:"Druida humano de Megalokk com Forma Selvagem a partir do nível 2. Scary Monsters é a estética de dinossauro; as formas usam os bônus oficiais de animal. Silver Bullet é um cavalo, não parceiro automático.",
 history:["Diego Brando participa da Steel Ball Run como um jóquei ambicioso e competitivo. A técnica Scary Monsters permite assumir características de dinossauro e dominar criaturas na história.","Esta é a versão original, diferente do Diego paralelo que possui THE WORLD. O botão Alternative abre um dossiê mecânico separado, sem mesclar as duas versões."],
 skills:[["Sobrevivência","Instintos de predador"],["Vontade","Determinação"],["Luta","Garras e mordida"],["Cavalgar","Silver Bullet"],["Adestramento","Aliados animais"],["Iniciativa","Caça veloz"],["Reflexos","Fuga e esquiva"],["Percepção","Detectar presas"]],
 initial:["Devoto fiel de Megalokk — cumprir obrigações da divindade","Empatia Selvagem e duas magias de 1º círculo","Presas Primordiais e Olhar Amedrontador (poderes concedidos, se escolhidos)","Origem Amigo dos Animais: Adestramento treinado + Amigo Especial (cavalo comum); Humano (Versátil): Reflexos treinado + Sortudo"],
 gear:[
 ["Silver Bullet","Cavalo comum","Montaria obtida conforme a origem; o benefício de parceiro exige uma fonte mecânica.","1",art.diego,"https://jojowiki.com/Silver_Bullet","REN OTE / JoJo Wiki"],
 ["Garras e presas","Armas naturais / poder concedido","No nível 1 a mordida de Presas Primordiais custa PM; Formas Selvagens têm ataques próprios.","Variável"],
 ["Traje de jóquei","Traje de viajante","Verde-água ou azul esverdeado, com desenho em losangos.","1"],
 ["Companheiro raptor","Companheiro Animal","Aliado que usa regras de parceiro, não ficha de monstro independente. Disponível mais tarde.","Nível 3"],
 ["Sela e arreios","Equipamento de montaria","Adquirir de acordo com preços e benefícios oficiais.","A adquirir"]
 ],
 attacks:[["Mordida inicial","+4","1d6+2","1 PM","Presas Primordiais, quando ativada, usa FOR no ataque e dano."],["Forma Selvagem","Conforme forma","Armas naturais","3 PM a partir do nível 2","Somente a forma escolhida concede seus bônus; não acumula todas simultaneamente."]],
 progression:[
 ["Devoto Fiel · Empatia Selvagem · Magias","Primeiras presas"],
 ["Forma Selvagem · Caminho dos Ermos (automático)","Scary Monsters desperta"],
 ["Companheiro Animal","Raptor subordinado"],
 ["Sentidos Aguçados","Caçador perceptivo"],
 ["Ginete","Dominar o combate montado"],
 ["Forma Selvagem Aprimorada · 2º círculo","Raptor maior e mais perigoso"],
 ["Presas Afiadas","Golpes naturais aprimorados"],
 ["Companheiro Animal Aprimorado","Raptor fortalecido"],
 ["Magia Natural","Conjurar na forma de dinossauro"],
 ["Aumento de Atributo (SAB) · 3º círculo","Instinto aprimorado"],
 ["Companheiro Animal","Segundo aliado, se limite permitir"],
 ["Forma Selvagem Superior","Metamorfose máxima"]
 ],
 techniques:[
 [1,"Primeira Mordida","Presas Primordiais","1 PM","Mordida natural conforme poder concedido.","O monstro aparece antes da transformação completa."],
 [2,"Scary Monsters","Forma Selvagem","3 PM","Assuma uma forma animal com aparência de dinossauro.","Garras, escamas e olhos de predador."],
 [3,"Dinosaur Pack","Companheiro Animal","Passivo após obtenção","Aliado mecânico conforme tipo escolhido; não converte inimigos.","Um caçador não está sozinho."],
 [6,"Apex Raptor","Forma Selvagem Aprimorada","6 PM totais","Transformação melhorada, observando tamanho e atributos oficiais.","A forma do predador se expande."],
 [12,"Primeval Monster","Forma Selvagem Superior","10 PM totais","Usa o grau superior da forma escolhida, sem novos poderes de infecção.","O topo da cadeia alimentar."]
 ],
 notes:[
 "Diego original possui Scary Monsters, não THE WORLD. Clique em Alternative para abrir a variante paralela.",
 "A distribuição utiliza 10 pontos de compra; bônus humanos em DES, CON e SAB.",
 "Silver Bullet entra como cavalo físico da origem. O parceiro precisa de poder ou concessão específica.",
 "A transformação de outras pessoas em dinossauros não é um efeito padrão de Forma Selvagem, Empatia Selvagem ou Companheiro Animal.",
 "Gastos de Forma Selvagem e acesso a círculos dependem das habilidades de Druida. Ao subir de nível revise o estágio exato.",
 "Formas não oferecem simultaneamente todos os bônus, e magias seguem as obrigações de Megalokk."
 ],
 sources:[["Scary Monsters — JoJo Wiki","https://jojowiki.com/Scary_Monsters"],["Diego Brando — JoJo Wiki","https://jojowiki.com/Dio_Brando_(Steel_Ball_Run)"]],
 levelHow:[
 "Use Presas Primordiais quando precisar morder e Olhar Amedrontador para intimidar nos limites das regras.",
 "Gaste ação completa e 3 PM para assumir uma forma. Seus bônus substituem os de outras formas e não criam um NPC extra.",
 "O parceiro raptor fornece bônus conforme o tipo de aliado. Ele não ataca com uma ficha própria por padrão.",
 "Sentidos Aguçados facilita rastrear e perceber o perigo; aplica seus testes de perícia normais.",
 "Ginete é o poder para atacar montado sem penalidade aplicável, mantendo as regras do cavalo.",
 "Forma Selvagem Aprimorada aumenta bônus e custo total; o 2º círculo de magias também é liberado.",
 "Presas Afiadas melhora armas naturais conforme seu pré-requisito e efeito.",
 "Aprimore seu companheiro sem extrapolar o limite de parceiros da campanha.",
 "Magia Natural permite conjurar na forma selvagem obedecendo execução, PM, resistências e escolas.",
 "SAB melhora magias, perícias e CDs. O 3º círculo surge no 10º de Druida.",
 "Segundo Companheiro Animal cria novo parceiro apenas se o poder puder ser escolhido de novo e couber no limite.",
 "Forma Selvagem Superior é o ápice de transformação pelas regras oficiais; não concede infecção."
 ]
},
{
 id:"ado",number:"08",name:"Ado",universe:"J-pop · Cantora japonesa",label:"BLUE ROSE // VOZ",symbol:"♫",theme:"ado",image:art.ado,
 credit:"Arte ilustrada de Ado · Kuda Aer, via Zerochan",source:"https://www.universal-music.co.jp/ado/",
 race:"Humana",className:"Barda",origin:"Artista",devotion:"Nenhuma obrigatória",role:"Suporte musical, debuffs e presença de palco",
 buy:{CON:1,CAR:3,SAB:2,INT:1,FOR:0,DEX:2},raceBonus:{CON:1,CAR:1,DEX:1},
 whys:{CON:"Fôlego de apresentações.",CAR:"Presença vocal marcante.",SAB:"Interpretação emocional.",INT:"Conhecimento musical.",FOR:"Não é uma combatente física.",DEX:"Movimento performático."},
 stats:{pv:14,pm:8,defense:15,speed:"9 m",hpGain:5,pmGain:4},page:"44–46",
 excerpt:"A voz atravessa o silêncio. A rosa azul floresce entre notas e sombras.",
 summary:"Barda humana de temática vocal azul-neon: Inspiração, Atuação e magias arcanas de Encantamento/Ilusão/Evocação representam a performance. Ado é uma cantora real; a arte é um avatar ilustrado, sem pressupor aparência pessoal.",
 history:["Ado é uma artista japonesa reconhecida por performances vocais intensas e pela identidade visual da rosa azul. Sua presença pública é representada principalmente por ilustrações e clipes, não por um retrato obrigatório.","No Tormenta20, Ado inspira aliados como Barda e aplica efeitos mágicos com interpretação vocal. O som não produz dano de área automaticamente; cada efeito requer uma magia ou poder definido no livro."],
 skills:[["Atuação","Voz e palco"],["Reflexos","Movimento"],["Diplomacia","Comunicar emoções"],["Iniciativa","Entrada no refrão"],["Intuição","Ler o público"],["Percepção","Escuta refinada"],["Misticismo","Afinidade musical"],["Vontade","Suportar pressão"],["Enganação","Expressar histórias"],["Cura","Ajudar colegas de apresentação"]],
 initial:["Inspiração +1 — ação padrão, 2 PM, ajuda aliados","Duas magias de 1º círculo: Adaga Mental e Criar Ilusão","Três escolas escolhidas: Encantamento, Ilusão e Evocação","Origem Artista: Enganação treinada + Dom Artístico; Humano (Versátil): Cura treinada + Sortudo"],
 gear:[
 ["Microfone azul","Instrumento musical (reflavor)","Foco cênico para Atuação, não amplificador de magia ou arma gratuita.","1",art.ado,"https://www.universal-music.co.jp/ado/","Ado / Universal"],
 ["Rosa azul","Adereço de cena","Marca de identidade visual, sem bônus mecânico.","1"],
 ["Capa escura de palco","Traje de artista","Representa a figura ilustrada; couro leve +2 Defesa sob o traje.","1"],
 ["Mochila de turnê","Kit de viagem","Itens usuais de personagem, sem equipamento mágico inicial.","1"]
 ],
 attacks:[["Adaga Mental","Vontade vs CD 14","2d6 psíquico","1 PM","Magia de 1º círculo; ação e resistência conforme texto oficial."],["Inspiração","Aliados próximos","+1 testes perícia","2 PM","Bônus de perícia até o fim da cena, não dano ou cura automática."]],
 progression:[
 ["Inspiração +1 · 1º círculo","Primeiro concerto"],
 ["Arte Mágica · Eclético (automático)","Presença sobrenatural"],
 ["Música: Balada Fascinante","Prender a atenção do alvo"],
 ["Aumentar Repertório","Vozes e efeitos novos"],
 ["Aumento de Atributo (CAR) · Inspiração +2","A voz cresce"],
 ["Melodia Curativa · 2º círculo","Refrão que reanima"],
 ["Aumentar Repertório","Repertório avançado"],
 ["Fascinar em Massa","Alcançar multidões"],
 ["Melodia Restauradora · Inspiração +3","Aliviar condições"],
 ["Aumento de Atributo (CON) · 3º círculo","Performance mais resistente"],
 ["Aumento de Atributo (CAR)","Presença extraordinária"],
 ["Aumentar Repertório","Concerto final"]
 ],
 techniques:[
 [1,"Blue Rose Overture","Inspiração","2 PM","Inspiração +1 em testes de perícia de aliados em alcance curto.","A primeira nota reúne o grupo."],
 [1,"Vocal Break","Adaga Mental","1 PM","Dano psíquico e condição nos limites da magia.","Um grito atravessa a defesa emocional."],
 [3,"Palco Hipnótico","Música: Balada Fascinante","Conforme poder","Usa Atuação e as limitações de Fascinar.","Silêncio absoluto da plateia."],
 [6,"Refrão Restaurador","Melodia Curativa","Conforme poder","Recuperação por habilidade oficial, com alvos, ação e PM definidos.","Uma nota levanta os aliados."],
 [8,"Encore","Fascinar em Massa","Conforme poder","Estende Fascinar a vários alvos, conforme pré-requisitos.","O concerto domina a cena."]
 ],
 notes:[
 "Ado é uma artista real; o dossiê usa persona ilustrada creditada, não atribui aparência física não divulgada.",
 "CAR é atributo-chave de Bardo. Cálculos incluem sua adição inicial à reserva de PM.",
 "O microfone é adereço, não item mágico nem arma com dano sônico gratuito.",
 "Atuação, Inspiração e magias são recursos distintos; não se pode substituir qualquer magia por canção sem custo.",
 "Bardo ganha 2º círculo no nível 6 e 3º no 10. Inspiração cresce nos níveis 5 e 9.",
 "Inspiração e magia consomem recursos; não transmitem música nem reproduzem canções existentes."
 ],
 sources:[["Ado — Universal Music Japan","https://www.universal-music.co.jp/ado/"],["Ado — site oficial","https://ado-official.com/"]],
 levelHow:[
 "Ative Inspiração por 2 PM antes de uma rodada difícil; lance Adaga Mental ou Criar Ilusão respeitando a escola.",
 "Arte Mágica aumenta CD enquanto Inspiração está ativa; Eclético é automático e amplia testes não treinados.",
 "Fascinar depende de Atuação e condições de alcance, atenção e duração do poder.",
 "Aumentar Repertório adiciona magias legais das escolas ou conforme a exceção oficial do poder.",
 "CAR sobe de +4 para +5, afeta CD/PM/Atuação; Inspiração +2 requer custo aprimorado.",
 "Melodia Curativa usa Inspiração como fundamento; 2º círculo permite magias novas, não de qualquer escola.",
 "Novas magias de suporte ou controle respeitam escolas de Bardo.",
 "Fascinar em Massa exige Música: Balada Fascinante e as condições do poder; não hipnotiza todos sem resistência.",
 "Melodia Restauradora requer Melodia Curativa; Inspiração +3 aumenta alcance tático de buffs.",
 "CON +1 reforça PV e Fortitude; o 3º círculo fica disponível para magia nova.",
 "CAR pode crescer mais uma vez em novo patamar, mantendo o cálculo de CD e PM.",
 "Selecione magias que realmente conheça e use seus custos; a performance visual não concede efeitos extras."
 ]
},
{
 id:"cyrene",number:"09",name:"Cyrene",universe:"Honkai: Star Rail · Amphoreus",label:"REMEMBRANCE // GELO",symbol:"❋",theme:"cyrene",image:art.cyrene,
 credit:"Arte promocional da HoYoverse, reproduzida em Zerochan",source:"https://www.hoyoverse.com/en-us/news/160640",
 race:"Humana (visual de Amphoreus)",className:"Arcanista — Feiticeira Feérica",origin:"Herdeira (reflavor narrativo)",devotion:"Nenhuma obrigatória",role:"Magias de controle, gelo e suporte",
 buy:{CON:1,CAR:3,SAB:1,INT:2,FOR:0,DEX:2},raceBonus:{CON:1,CAR:1,DEX:1},
 whys:{CON:"Suportar pressões de Amphoreus.",CAR:"Ligação emocional e magia.",SAB:"Memórias e intuição.",INT:"Conhecimento de ciclos.",FOR:"Não depende de força física.",DEX:"Movimento etéreo."},
 stats:{pv:10,pm:10,defense:13,speed:"9 m",hpGain:5,pmGain:6},page:"37–39",
 excerpt:"Gelo, lembranças e vínculos que persistem mesmo quando o amanhã muda.",
 summary:"Feiticeira humana de Linhagem Feérica. Encantamento, Ilusão e efeitos de frio são apresentados como poderes de Reminiscência; Conjurar Monstro só vira memosprite ao obter a magia e continua usando suas estatísticas oficiais.",
 history:["Cyrene é uma personagem cinco estrelas de Gelo e do Caminho da Reminiscência em Honkai: Star Rail. Sua identidade se conecta ao encerramento da jornada de Amphoreus e a lembranças preservadas.","Esta build enfatiza apoio e controle do campo, com magia arcana de gelo e ilusão. Um memosprite não existe como entidade gratuita no nível 1: a representação precisa de um Familiar ou de uma magia que gere criatura nas regras."],
 skills:[["Misticismo","Efeitos arcanos"],["Vontade","Preservar lembranças"],["Intuição","Reconhecer emoções"],["Diplomacia","Laços do grupo"],["Percepção","Observar o tempo"],["Reflexos","Evitar perigos"],["Conhecimento","História e ciclos"],["Iniciativa","Ação coordenada"],["Nobreza","História de Amphoreus"]],
 initial:["Caminho Feiticeira com Linhagem Feérica básica","Enganação treinada e magia extra de Encantamento/Ilusão da linhagem","Magias iniciais como Sono e Área Escorregadia; escolha e disponibilidade conforme Feiticeiro","Origem Herdeira: Nobreza treinada + Herança, escolhendo item dentro do limite da origem; Humano (Versátil): Percepção treinada + Magia Ilimitada"],
 gear:[
 ["Cristal de memória","Adereço arcano","O foco não é exigido para Feiticeira. O objeto é símbolo de lembranças, não item mágico gratuito.","1",art.cyrene,"https://www.hoyoverse.com/en-us/news/160640","HoYoverse"],
 ["Laços de gelo","Traje de viajante","Vestido celestial; sem armadura no nível 1 para preservar conjuração.","1"],
 ["Memosprite","Familiar / Conjurar Monstro","Aparece apenas quando o poder ou magia correspondente é adquirido, com estatísticas oficiais.","Bloqueado no nível 1"],
 ["Diário de lembranças","Livro comum","Registrar histórias é função narrativa, não feitiço novo.","1"]
 ],
 attacks:[["Área Escorregadia","Reflexos CD 14","Controle de terreno","1 PM","Dificulta a movimentação na área conforme magia de 1º círculo."],["Sono","Vontade CD 14","Condição conforme magia","1 PM","Efeito de sono de 1º círculo, com imunidades e resistências normais."]],
 progression:[
 ["Linhagem Feérica · 1º círculo","Primeiras memórias"],
 ["Familiar","Memosprite simbólico"],
 ["Magia Pungente","Resistências mais difíceis"],
 ["Poder Mágico","Mais energia arcana"],
 ["Fortalecimento Arcano · 2º círculo","Magia e memórias mais fortes"],
 ["Herança Aprimorada","Memória feérica amadurece"],
 ["Fortalecimento Arcano","Magia mais efetiva"],
 ["Magia Acelerada","Reações velozes"],
 ["Raio Arcano · 3º círculo","Laços memoráveis"],
 ["Raio Elemental","Ataque de gelo e lentidão"],
 ["Conhecimento Mágico","Novos efeitos de gelo"],
 ["Aumento de Atributo (CAR)","Memória viva"]
 ],
 techniques:[
 [1,"Frostbound Memory","Área Escorregadia","1 PM","Controla o chão pelas regras de magia, sem congelar criaturas automaticamente.","Um campo de gelo florido aparece."],
 [1,"Sonhos do Passado","Sono","1 PM","Incapacita alvos apenas se cumpridas as condições de resistência.","Um sussurro atravessa a memória."],
 [2,"Memória Companheira","Familiar","Poder de classe","Familiar concede benefícios oficiais de parceiro especial, não turno completo.","Um ser recordado acompanha Cyrene."],
 [6,"Recordação Coletiva","Herança Aprimorada","Passivo","Magias de Encantamento e Ilusão melhoram a CD e podem custar menos PM.","O vínculo se intensifica."],
 [9,"Memosprite Evocado","Conjurar Monstro (se aprendido)","Custo da magia","O monstro usa regras da magia e não é o memosprite original literal.","Recordações tomam forma."]
 ],
 notes:[
 "Cyrene foi anunciada pela HoYoverse como personagem de Gelo, 5★ e Caminho da Reminiscência. A build não cria o sistema de Remembrance Path em T20.",
 "Humana com bônus em CON, CAR e DEX. Magias usam CAR, não dano físico.",
 "Traje e cristal não fornecem bônus; Familiar não é invocação livre.",
 "Linhagem Feérica concede treinamento em Enganação e uma magia extra; é distinta de poderes escolhidos em níveis posteriores.",
 "Arcanista alcança o 2º círculo no nível 5 e o 3º no 9. Feiticeiro aprende menos magias que Bruxo/Mago; confira cada escolha.",
 "Memosprite é nome narrativo para Familiar ou Conjurar Monstro. Não acumula ataques, ações ou dano de aliados como no HSR."
 ],
 sources:[["Cyrene — anúncio da HoYoverse","https://www.hoyoverse.com/en-us/news/160640"],["Cyrene — guia de habilidades (KeqingMains)","https://hsr.keqingmains.com/cyrene/"]],
 levelHow:[
 "Escolha as magias do Feiticeiro. A linhagem Feérica fornece Enganação e uma magia extra compatível.",
 "O Familiar concede bônus de espécie; descreva como memosprite sem criar ficha extra de combate.",
 "Magia Pungente custa PM adicional para elevar CD das magias que permitam resistência.",
 "Poder Mágico aumenta a reserva em função do nível; aplique retroativamente.",
 "Fortalecimento Arcano soma +1 à CD das magias. O 2º círculo permite aprender Conjurar Monstro para representar o memosprite.",
 "Herança Aprimorada só pode ser escolhida a partir do nível 6 e melhora Encantamento e Ilusão.",
 "Fortalecimento Arcano aumenta CD de magia de modo permanente.",
 "Magia Acelerada altera a execução de uma magia pagando os custos e limites oficiais.",
 "Raio Arcano permite dano de essência com resistência. O 3º círculo fica disponível para magias aprendidas.",
 "Raio Elemental exige Raio Arcano e permite causar frio e lentidão conforme o poder.",
 "Conhecimento Mágico permite selecionar novos efeitos de suporte e frio.",
 "CAR +1 aumenta CD, perícias sociais e PM total no novo patamar."
 ]
},
{
 id:"marin",number:"10",name:"Marin Kitagawa",universe:"My Dress-Up Darling",label:"COSPLAY // EXPRESSÃO",symbol:"✿",theme:"marin",image:art.marin,
 credit:"Retrato oficial de Marin · bisquedoll-anime.com",source:"https://bisquedoll-anime.com/",
 race:"Humana",className:"Barda",origin:"Artista",devotion:"Nenhuma obrigatória",role:"Ilusão, disfarce e apoio social",
 buy:{CON:1,CAR:3,SAB:1,INT:2,FOR:0,DEX:2},raceBonus:{CAR:1,INT:1,DEX:1},
 whys:{CON:"Fôlego para eventos.",CAR:"Expressividade e magnetismo.",SAB:"Atenção aos outros.",INT:"Conhecimento de personagens.",FOR:"Não é lutadora profissional.",DEX:"Poses e acrobacias."},
 stats:{pv:13,pm:8,defense:15,speed:"9 m",hpGain:4,pmGain:4},page:"44–46",
 excerpt:"Cada figurino conta uma história. Seu verdadeiro talento é dar vida a personagens.",
 summary:"Barda humana com atuação, Enganação, ilusão e repertório de personagens. Marin interpreta e veste cosplays, enquanto Wakana Gojo frequentemente confecciona as peças; a ficha não atribui a ela fabricação profissional de roupas.",
 history:["Marin Kitagawa é uma estudante expansiva e apaixonada por anime, jogos e cosplay. Seu vínculo com Wakana Gojo desenvolve-se por meio de figurinos, performances e confiança mútua.","Em Arton, sua arte inspira o grupo e suas magias de Ilusão são a maneira de representar maquiagem, figurino e dramatização extraordinários. Cosplay não muda atributos, raça ou classe de verdade."],
 skills:[["Atuação","Interpretar personagens"],["Reflexos","Movimentação"],["Enganação","Disfarces e imitação"],["Diplomacia","Fazer amizades"],["Acrobacia","Poses e movimentos"],["Intuição","Ler reações"],["Percepção","Notar detalhes de figurino"],["Conhecimento","Cultura pop e referências"],["Ofício (maquiagem)","Maquiagem e acabamento"]],
 initial:["Inspiração +1 via performance e encenação","Magias iniciais: Criar Ilusão e Enfeitiçar","Escolas: Ilusão, Encantamento e Transmutação","Origem Artista: Atraente + Dom Artístico; Humano (Versátil): Percepção treinada + Sortudo"],
 gear:[
 ["Uniforme de Marin","Traje de viajante","Visual escolar casual, sem ganho de Defesa por estilo.","1",art.marin,"https://bisquedoll-anime.com/","Site oficial"],
 ["Kit de maquiagem","Ferramentas de Ofício","Materiais usados com tempo e perícia, não magia gratuita.","1"],
 ["Cosplay de Shizuku-tan","Traje especial de aparência","Figurino criado com ajuda de Gojo. Não concede poderes da personagem retratada.","A adquirir"],
 ["Câmera e acessórios","Itens mundanos","Referências de poses, poses fotográficas e registro de figurinos.","A adquirir"],
 ["Armadura leve escondida","Armadura de couro","Defesa +2 sob o traje, se compatível com a cena e regras de armadura.","1"]
 ],
 attacks:[["Criar Ilusão","Vontade conforme magia","Ilusão visual","1 PM","Não cria objetos físicos permanentes nem muda atributos."],["Inspiração","Aliados em alcance curto","+1 em perícias","2 PM","Pode ser interpretada como performance de cosplay que motiva o grupo."]],
 progression:[
 ["Inspiração +1 · 1º círculo","Primeiro cosplay"],
 ["Música: Balada Fascinante · Eclético (automático)","Dominar a atenção"],
 ["Arte Mágica","Cenas mais convincentes"],
 ["Aumentar Repertório","Novos personagens"],
 ["Aumento de Atributo (CAR) · Inspiração +2","Palco maior"],
 ["Paródia · 2º círculo","Reproduzir efeitos de magia vista, conforme poder"],
 ["Aumentar Repertório","Novos disfarces"],
 ["Fascinar em Massa","Cosplay de multidão"],
 ["Aumento de Atributo (INT) · Inspiração +3","Mais referências"],
 ["Aumentar Repertório · 3º círculo","Figurino épico"],
 ["Aumento de Atributo (CAR)","Performance inesquecível"],
 ["Aumentar Repertório","Cosplay final"]
 ],
 techniques:[
 [1,"Shizuku-tan Cosplay","Criar Ilusão","1 PM","Efeito visual com limites de magia, não transformação real.","O figurino ganha magia."],
 [1,"Cosplay Motivation","Inspiração","2 PM","+1 aos testes de perícia dos aliados em alcance curto até o fim da cena.","Uma apresentação encoraja o grupo."],
 [2,"Perfect Pose","Música: Balada Fascinante","Conforme poder","Captura atenção dos alvos nas condições de Atuação.","O público prende a respiração."],
 [6,"Imitação de Cena","Paródia","Conforme poder","Pode copiar uma magia vista sob as condições de Paródia.","A personagem de ficção parece viva."],
 [8,"Convenção Completa","Fascinar em Massa","Conforme poder","Estende Fascinar aos alvos válidos.","Todo o salão assiste."]
 ],
 notes:[
 "Marin é estudante e cosplayer; as roupas profissionais são confeccionadas em colaboração com Gojo, sem bônus gratuitos de equipamento.",
 "CAR4 e INT3 são prioridades da performance e da pesquisa.",
 "Cosplay não concede as habilidades da personagem interpretada. Itens precisam ser adquiridos ou fabricados legalmente.",
 "Magias de ilusão e encenação têm duração, resistência e área; o visual não modifica as regras.",
 "Bardo aprende novos círculos nos níveis 6 e 10; Inspiração melhora nos níveis 5 e 9.",
 "Paródia tem condições de magia observada e custo; nenhum visual permite lançar feitiços de outro sistema indiscriminadamente."
 ],
 sources:[["My Dress-Up Darling — site oficial","https://bisquedoll-anime.com/"],["Marin Kitagawa — personagem","https://en.wikipedia.org/wiki/Marin_Kitagawa"]],
 levelHow:[
 "Comece apoiando com Inspiração e Criar Ilusão; maquiagem mundana depende de tempo e itens.",
 "Fascinar usa Atuação para desviar atenção, Eclético é automático e auxilia testes não treinados.",
 "Arte Mágica melhora a dificuldade das magias quando Inspiração está ativa.",
 "Aumentar Repertório aprende magias permitidas pelo poder e escolas, sem trocar a classe.",
 "CAR cresce e Inspiração +2 amplia o suporte quando investe o custo adicional.",
 "Paródia tem pré-requisitos e depende de uma magia vista. O 2º círculo amplia efeitos de ilusão.",
 "Aprenda novas magias para representar outros figurinos e cenas.",
 "Fascinar em Massa exige Música: Balada Fascinante; não afeta uma cidade automaticamente.",
 "INT melhora Conhecimento, Misticismo e Ofício; Inspiração +3 melhora a potência do suporte.",
 "O 3º círculo permite magias mais elaboradas, desde que conhecidas e das escolas apropriadas.",
 "CAR ganha outro +1 no novo patamar e amplia atuação social.",
 "Feche a progressão escolhendo mais magias e aperfeiçoando apresentações."
 ]
},
{
 id:"makima",number:"11",name:"Makima",universe:"Chainsaw Man",label:"CONTROL DEVIL // AUTORIDADE",symbol:"◎",theme:"makima",image:art.makima,
 credit:"Ilustração de Makima por eastman, via Wallpaper Abyss",source:"https://chainsaw-man.fandom.com/wiki/Makima",
 race:"Humana (aparência do demônio)",className:"Arcanista — Feiticeira Feérica",origin:"Membro de Guilda",devotion:"Sem devoção",role:"Controle mental, manipulação e pressão social",
 buy:{CON:1,CAR:3,SAB:2,INT:2,FOR:0,DEX:1},raceBonus:{CON:1,CAR:1,INT:1},
 whys:{CON:"Sobrevivência silenciosa.",CAR:"Autoridade esmagadora.",SAB:"Leitura estratégica.",INT:"Manipulação de planos.",FOR:"Não depende de força física.",DEX:"Movimentos contidos."},
 stats:{pv:10,pm:10,defense:11,speed:"9 m",hpGain:5,pmGain:6},page:"37–39",
 excerpt:"Uma ordem sussurrada pode ser mais perigosa que qualquer espada.",
 summary:"Feiticeira de Linhagem Feérica: magias de Encantamento e Ilusão representam influência e controle, sem dominação automática de qualquer criatura. A hierarquia da Segurança Pública é o reflavor da origem Membro de Guilda.",
 history:["Makima é uma figura da Segurança Pública em Chainsaw Man, cujas relações de poder e manipulação são parte central da narrativa. Sua identidade está ligada ao Demônio do Controle.","No Tormenta20, sua capacidade de impor vontades é representada por magias com CD, resistência e alcance. Contratos ilimitados, mortes substituídas e controle automático de adversários não surgem pela classe."],
 skills:[["Enganação","Controlar narrativas"],["Diplomacia","Influenciar terceiros"],["Intimidação","Ordens ameaçadoras"],["Vontade","Foco absoluto"],["Misticismo","Magias mentais"],["Intuição","Detectar hesitação"],["Percepção","Vigilância"],["Investigação","Planejamento"]],
 initial:["Feiticeira Feérica básica: treino Enganação e magia extra de Encantamento/Ilusão","Magias como Enfeitiçar e Sono, respeitando número de magias aprendidas","Origem Membro de Guilda: Diplomacia treinada + Rede de Contatos; Humano (Versátil): Intuição treinada + Foco em Perícia (Diplomacia)","Carisma +4 define CD e reserva inicial de PM"],
 gear:[
 ["Terno da Segurança Pública","Traje da corte / viajante","Visual formal de Makima. Não oferece bônus de controle de NPCs.","1",art.makima,"https://chainsaw-man.fandom.com/wiki/Makima","Chainsaw Man"],
 ["Documentos de autoridade","Insígnia narrativa","Identificação institucional, sem poderes de comando universais.","1"],
 ["Telefone e recados","Itens mundanos","Comunicação e coordenação, apenas onde a ambientação permitir.","1"],
 ["Laços de contrato","Magias de Encantamento","Não são contratos gratuitos: cada magia tem custo e resistência próprios.","Habilidades"]
 ],
 attacks:[["Enfeitiçar","Vontade CD 14","Condição social","1 PM","O alvo recebe a condição prevista na magia; não vira escravo permanente."],["Sono","Vontade CD 14","Controle limitado","1 PM","A criatura pode resistir; tem imunidades e limitações de círculo."]],
 progression:[
 ["Linhagem Feérica básica · 1º círculo","Primeira influência"],
 ["Conhecimento Mágico","Aprimorar repertório mental"],
 ["Magia Pungente","Elevar a dificuldade"],
 ["Poder Mágico","Reservas para contratos"],
 ["Fortalecimento Arcano · 2º círculo","Pressão mental avançada"],
 ["Herança Aprimorada","Controle feérico amadurecido"],
 ["Conhecimento Mágico (Dissipar Magia)","Preparar contramágica"],
 ["Aumento de Atributo (CAR)","Autoridade aumentada"],
 ["Magia Acelerada · 3º círculo","Ordens rápidas"],
 ["Contramágica Aprimorada","Silenciar ações mágicas"],
 ["Conhecimento Mágico","Novos efeitos de influência"],
 ["Magia Ilimitada","Domínio mais intenso"]
 ],
 techniques:[
 [1,"Silêncio Obediente","Enfeitiçar","1 PM","Condição prevista pela magia com resistência; não concede servo permanente.","Uma ordem basta para tentar conquistar confiança."],
 [1,"Autoridade Inquietante","Sono","1 PM","Efeito mágico de sono; certas criaturas são imunes.","A presença faz o adversário fraquejar."],
 [3,"Controle Amplificado","Magia Pungente","Custo +1 PM","Aumenta CD de magias elegíveis, respeitando seu limite de gasto.","Ninguém escapa facilmente do olhar."],
 [6,"Manipulação Refinada","Herança Aprimorada","Passivo","Melhora CD de Encantamento/Ilusão e reduz custo dessas escolas.","A ordem se torna mais difícil de resistir."],
 [10,"Calem-se","Contramágica Aprimorada","Conforme poder","Contramágica como reação, seguindo requisitos de Dissipar Magia.","Até a magia do inimigo para."]
 ],
 notes:[
 "Makima é o Demônio do Controle; a raça humana representa apenas a aparência. Isso não dá imunidades ou contratos de chefe.",
 "CAR4 aumenta a CD; depois cresce por Aumento de Atributo no nível 8.",
 "Terno, identificação e telefone não são itens mágicos. A posse de documentos não escraviza NPCs.",
 "Feiticeira Feérica ganha magia extra e Enganação. Controle mental sempre respeita testes de resistência.",
 "Círculos: 1º no nível 1, 2º no nível 5, 3º no nível 9. Feiticeiro aprende magias em ritmo próprio.",
 "Não existe controle ilimitado de criaturas inferiores com essa build; escolhas sociais e combates obedecem à mesa."
 ],
 sources:[["Makima — Chainsaw Man Wiki","https://chainsaw-man.fandom.com/wiki/Makima"],["Linhagem Feérica — Tormenta20",doc.core]],
 levelHow:[
 "Escolha magias iniciais de influência dentro do repertório do Feiticeiro e a magia extra da linhagem.",
 "Conhecimento Mágico adiciona duas magias conhecidas de círculos já disponíveis.",
 "Pague PM adicional por Magia Pungente ao lançar um controle decisivo.",
 "Poder Mágico aumenta PM totais retroativamente, sem criar uma bateria externa.",
 "Fortalecimento Arcano aumenta a CD em +1. O 2º círculo surge no 5º.",
 "Herança Aprimorada a partir do 6º reforça Encantamento/Ilusão da Feiticeira.",
 "Conhecimento Mágico permite aprender Dissipar Magia para cumprir o requisito de Contramágica Aprimorada.",
 "CAR sobe de +4 para +5; atualize CD e PM, sem controlar um NPC gratuitamente.",
 "Magia Acelerada permite acelerar a execução, com custos. O 3º círculo fica disponível.",
 "Contramágica Aprimorada exige Dissipar Magia conhecida e respeita suas reações.",
 "Novas magias podem ampliar controle, mas cada alvo continua tendo suas resistências.",
 "Magia Ilimitada aumenta limites de aprimoramento; cuidado com consumo de PM."
 ]
},
{
 id:"optimus",number:"12",name:"Optimus Prime",universe:"Transformers · Autobots",label:"AUTOBOT // COMANDANTE",symbol:"⬡",theme:"optimus",image:art.optimus,
 credit:"Optimus Prime Beast Hunters (arte promocional), via Transformers Wiki",source:"https://tfwiki.net/wiki/Optimus_Prime_(Prime)",
 race:"Golem de Ferro",className:"Paladino",origin:"Sem Origem (regra racial)",devotion:"Khalmyr / paladino do bem se permitido",role:"Tanque, proteção, apoio e dano sagrado",
 buy:{CON:2,CAR:3,SAB:1,INT:1,FOR:2,DEX:0},raceBonus:{CON:1,CAR:-1,FOR:2},
 whys:{CON:"Estrutura metálica resistente.",CAR:"Liderança e sacrifício.",SAB:"Juízo equilibrado.",INT:"Memória de séculos.",FOR:"Poder mecânico.",DEX:"Movimentos controlados."},
 stats:{pv:23,pm:5,defense:14,speed:"9 m",hpGain:8,pmGain:3},page:"82–84; raça p. 27",
 excerpt:"Liberdade é o direito de todos os seres sencientes. A esperança ainda se transforma.",
 summary:"Golem de Ferro Paladino: Chassi e sem origem representam corpo Autobot; Golpe Divino, Código do Herói, Aura Sagrada e Cura pelas Mãos representam a liderança e proteção de Optimus. Transformação em caminhão NÃO é habilidade racial ou de classe: apenas estética até o mestre permitir outro recurso oficial.",
 history:["Optimus Prime é um líder dos Autobots em Transformers, conhecido por seu senso de justiça, sacrifício e defesa da liberdade. O visual adotado nesta ficha é inspirado em Transformers Prime/Beast Hunters.","Como Golem Paladino, é um construto consciente equipado para defender aliados. A figura de caminhão, o blaster de íons e o tamanho colossal exigiriam outras regras, itens e autorização do mestre; não são vantagens iniciais."],
 skills:[["Luta","Lâmina energon"],["Vontade","Ideal de liberdade"],["Fortitude","Resistência do chassi"],["Diplomacia","Comando sábio"],["Guerra","Tática autobot"],["Percepção","Vigilância"],["Intuição","Identificar riscos"]],
 initial:["Golem de Ferro: FOR +2, CON +1, CAR −1; Chassi +2 Defesa e penalidade de armadura","Sem Origem: escolha um poder geral em vez dos benefícios de origem; sugestão Estilo de Duas Mãos","Paladino 1: Abençoado, Código do Herói e Golpe Divino","Devoção a Khalmyr: Coragem Total e Reparar Injustiça, observando Obrigações e Restrições; sem transformação ou laser grátis"],
 gear:[
 ["Lâmina energon","Montante (arma marcial de duas mãos)","Visual energético; sem dano elemental automático. Verifique aquisição legal da arma.","1",art.optimus,"https://tfwiki.net/wiki/Optimus_Prime_(Prime)","Transformers Wiki"],
 ["Chassi de Ferro","Racial Golem","A Defesa 14 usa 10 +2 do Chassi +2 de armadura leve. Consulte a penalidade de armadura −2 do Chassi.","1"],
 ["Armadura leve","Armadura de couro","Proteção conservadora sob o chassi; sem armadura pesada gratuita ou melhorias sobrenaturais.","1"],
 ["Blaster de íons","Arma de fogo futura","Somente após adquirir uma arma de fogo oficial e munição; o feixe energético é narrativa.","Não inicial"],
 ["Alt mode: caminhão","Representação narrativa","Não concede deslocamento maior, carga, voo ou transformação mecânica sem regra e autorização.","Não habilitado"]
 ],
 attacks:[["Lâmina energon","+6","2d6+4","0 PM","Montante com FOR +4, Luta treinada +2; dano físico normal."],["Golpe Divino","+6","2d6+4 + 1d8","2 PM conforme classe","Ataque de Paladino com efeito divino, respeitando custo e bônus do poder."]],
 progression:[
 ["Abençoado · Código do Herói · Golpe Divino","Autobot inicial"],
 ["Cura pelas Mãos · Virtude: Compaixão","Reparar aliados"],
 ["Aura Sagrada · Ataque Poderoso","Proteger o esquadrão"],
 ["Julgamento Divino: Iluminação","Inspirar a resistência"],
 ["Bênção da Justiça · Golpe Divino +2d8 · Aumento de Atributo (FOR)","Poder do Prime"],
 ["Cura pelas Mãos 2d8+2 · Combate Defensivo","Proteção em combate"],
 ["Aura de Cura","Força da liderança"],
 ["Virtude Paladinesca: Humildade","Fortalecer a coragem"],
 ["Golpe Divino +3d8 · Foco em Arma","Energon concentrado"],
 ["Cura pelas Mãos 3d8+3 · Aumento de Atributo (CON)","Resistência de aço"],
 ["Orar (Benção)","Dever e oração"],
 ["Virtude Paladinesca: Caridade","O último Autobot resiste"]
 ],
 techniques:[
 [1,"Energon Blade","Montante","0 PM","Golpe físico normal com arma marcial de duas mãos; não causa energia gratuita.","Uma lâmina ilumina a batalha."],
 [1,"Autobot Valor","Golpe Divino","Conforme classe","Ataque com bônus/dano de Golpe Divino e gasto de PM.","Poder para defender, nunca dominar."],
 [2,"Repair Protocol","Cura pelas Mãos","Conforme classe","Cura oficial a toque; os alvos devem ser elegíveis e a ação consumida.","Mecânica e esperança."],
 [3,"Autobot Formation","Aura Sagrada","1 PM se exigido","Aura de Paladino melhora testes de resistência de aliados na área.","Nenhum Autobot fica para trás."],
 [9,"Matrix of Leadership","Golpe Divino +3d8","Conforme classe","Dano divino oficial; a Matriz é somente simbologia.","A liderança ilumina o golpe."],
 [12,"Till All Are One","Virtudes / Aura","Conforme habilidades","Defesa, cura e coordenação do grupo sem transformação em veículo gratuita.","Até que todos sejam um."]
 ],
 notes:[
 "Optimus é um Golem de Ferro de tamanho Médio nas regras, mesmo que seja um robô gigante na obra. Alt-mode e blaster exigem novas aquisições/regras oficiais disponíveis.",
 "Golem ganha FOR +2, CON +1, CAR −1. A soma da compra utiliza 10 pontos e não recebe bônus humano.",
 "Sem Origem é obrigatório para Golem; em troca recebe um poder geral. Escudo ou arma energética precisam ser obtidos nas regras, nada grátis.",
 "Golpe Divino, auras e cura usam PM. Não incluem poder de invocar Autobots como NPCs.",
 "Paladino ganha Cura pelas Mãos no nível 2, Aura Sagrada no 3 e Golpe Divino mais forte em níveis altos. Use custos oficiais.",
 "Não há transformação livre em caminhão ou combinação de veículos; o visual é interpretação sem alteração de deslocamento ou ações."
 ],
 sources:[["Optimus Prime — Transformers Wiki","https://tfwiki.net/wiki/Optimus_Prime_(Prime)"],["Golem e Paladino — Tormenta20",doc.core]],
 levelHow:[
 "Use Golpe Divino dentro dos custos e cumpra o Código do Herói. O golem não escolhe origem.",
 "Cura pelas Mãos remove ferimentos dentro das regras. Compaixão é poder paladinesco sugerido.",
 "Aura Sagrada protege companheiros próximos. Encouraçado só funciona com a armadura indicada no poder.",
 "Julgamento Divino se usa apenas nas condições e alvos do julgamento escolhido.",
 "FOR aumenta para +5; Bênção da Justiça e Golpe Divino +2d8 são automáticos no 5º.",
 "A cura cresce para 2d8+2. Combate Defensivo troca acerto por proteção.",
 "Aura de Cura usa Aura Sagrada para recuperar PV de aliados no alcance.",
 "Humildade é uma virtude: permite obter PM temporários mediante oração e conduta.",
 "Golpe Divino +3d8 é automático; Foco em Arma exige escolha exata da arma.",
 "Cura pelas Mãos cresce para 3d8+3; CON +1 melhora PV e Fortitude.",
 "Orar ensina magia divina de 1º círculo; Benção usa SAB como atributo-chave.",
 "Caridade reduz custos de habilidades que têm aliados como alvo; é a terceira virtude escolhida."
 ]
}
];
const normal=profiles.map(make);
data.characters.push(...normal);
const diegoBase=normal.find(x=>x.id==="diego");
const diegoAlt=make({
 id:"diego",number:"07/ALT",name:"Diego Brando — Alternative",universe:"JoJo — Steel Ball Run",label:"THE WORLD // TEMPO PARADO",symbol:"◷",theme:"diego-alt",
 image:art.diegoAlt,credit:"Diego paralelo e THE WORLD · JoJo Wikia",source:"https://jojowiki.com/Parallel_World_Diego",
 race:"Humano",className:"Guerreiro",origin:"Herói Camponês",devotion:"Livre",role:"Ataques precisos, ações extras e combate montado",partner:"Silver Bullet (cavalo a adquirir/autorização)",
 buy:{CON:1,CAR:1,SAB:1,INT:1,FOR:2,DEX:3},raceBonus:{CON:1,FOR:1,DEX:1},
 whys:{CON:"Resistência contra o destino.",CAR:"Presença calculista.",SAB:"Percepção do tempo.",INT:"Planejamento de emboscadas.",FOR:"Lançamento e golpes.",DEX:"Movimentos inacreditavelmente rápidos."},
 stats:{pv:22,pm:6,defense:16,speed:"9 m",hpGain:7,pmGain:3},page:"64–66; origem p. 91–92",
 excerpt:"O segundo Diego não precisa de dinossauros. Ele controla instantes de batalha.",
 summary:"Guerreiro humano de Heroi Camponês com Surto Heroico e Coração Heroico. THE WORLD é representado por uma ação adicional uma vez por rodada, Golpe Pessoal e Ataque Extra; NÃO congela literalmente o tempo.",
 history:["Esta é a contraparte de Diego Brando trazida de outro universo no arco final de Steel Ball Run. Diferentemente do original, ele possui THE WORLD, um Stand capaz de parar o tempo por um intervalo.","A ficha usa Guerreiro e efeitos de economia de ações de Tormenta20 para simular essa vantagem. Parar o Tempo é uma magia arcana avançada, não liberada por Guerreiro de nível 12."],
 skills:[["Luta","Ataques de THE WORLD"],["Pontaria","Facas e arremessos"],["Cavalgar","Jóquei extraordinário"],["Iniciativa","Ataque antes do alvo"],["Reflexos","Tempo de reação"],["Percepção","Antecipar o inimigo"],["Fortitude","Sobreviver"],
 ["Guerra","Calcular vantagens"]],
 initial:["Ataque Especial +4 (Guerreiro 1)","Coração Heroico +3 PM e Surto Heroico (origem)","Humano (Versátil): Percepção treinada + Sortudo","THE WORLD é o nome dos efeitos; Stand não tem turno independente"],
 gear:[
 ["Facas arremessáveis","Adagas oficiais","Lançamentos repetidos durante o 'tempo parado', sem multiplicar ações indevidamente.","4",art.diegoAlt,"https://jojowiki.com/Parallel_World_Diego","JoJo"],
 ["THE WORLD","Reflavor de poderes","Stand humanoide dourado. Não tem PV, Defesa nem iniciativa próprios.","Efeito"],
 ["Silver Bullet","Cavalo comum","Adquirir ou ter autorização do mestre, pois Herói Camponês não concede cavalo.","A adquirir"],
 ["Roupa do jóquei","Traje de viajante","Azul e dourado com losangos; sem bônus de defesa mágica.","1"],
 ["Armadura de couro","Armadura leve","Defesa +2 na ficha.","1"]
 ],
 attacks:[["Dagas lançadas","+6","1d4+3","0 PM","Facas usam FOR no dano; DES no ataque se a arma for de arremesso leve conforme regra."],["THE WORLD: Tempo Parado","Ação adicional","Conforme ataque","5 PM","Surto Heroico concede uma ação padrão ou de movimento, uma vez por rodada."]],
 progression:[
 ["Ataque Especial +4 · Surto Heroico · Coração Heroico","THE WORLD básico"],
 ["Estilo de Arremesso","Facas em sequência"],
 ["Ginete · Durão (automático)","Tempo montado"],
 ["Arremesso Múltiplo","Chuva de facas"],
 ["Golpe Pessoal · Ataque Especial +8","Lâmina certeira"],
 ["Arqueiro · Ataque Extra (automático)","Mais ações, ainda limitadas"],
 ["Foco em Arma (adaga)","Dagas precisas"],
 ["Disparo Preciso","Alvo em combate próximo"],
 ["Na Mosca · Ataque Especial +12","Facada inevitável"],
 ["Golpe Pessoal II","THE WORLD refinado"],
 ["Especialização em Arma (adaga)","Acerto letal"],
 ["Mestre em Arma (adaga)","Poder máximo marcial"]
 ],
 techniques:[
 [1,"THE WORLD","Surto Heroico","5 PM","Ação padrão ou de movimento extra no turno, só uma vez por rodada.","O mundo parece imóvel."],
 [2,"Knife Rain","Estilo de Arremesso","Passivo","Saque e dano seguem o poder escolhido; não cria facas extras.","Lâminas pairam na cena."],
 [5,"Time-Stop Strike","Golpe Pessoal","PM conforme efeitos","Ataque especial com propriedades selecionadas e teto de PM por golpe.","Um golpe no intervalo entre segundos."],
 [6,"Temporal Barrage","Ataque Extra","2 PM","Outro ataque na ação agredir uma vez por rodada.","Os golpes se acumulam."],
 [10,"Five Seconds","Golpe Pessoal II + Surto Heroico","Custos somados","Combina técnicas se houver ações e PM suficientes; não suspende as ações dos inimigos.","O Stand domina a cena."]
 ],
 notes:[
 "A forma Alternative é outro Diego, não evolução de Scary Monsters. Não pode usar Forma Selvagem junto com THE WORLD pela troca visual.",
 "Compra 10 pontos; humano +1 em FOR, CON e DEX. Destina-se a Guerreiro, não Druida.",
 "Silver Bullet não é gratuito na origem Herói Camponês. THE WORLD não é um aliado NPC.",
 "Surto Heroico fornece somente uma ação adicional, e não paralisa criaturas. Golpe Pessoal não congela tempo.",
 "A evolução segue Guerreiro e recursos de Coração Heroico, inclusive +3 PM nos níveis 5 e 11.",
 "O poder literal de parar o tempo exige recursos de nível superior não presentes nesta versão."
 ],
 sources:[["Parallel World Diego — JoJo Wiki","https://jojowiki.com/Parallel_World_Diego"],["THE WORLD — JoJo Wiki","https://jojowiki.com/The_World_(Steel_Ball_Run)"]],
 levelHow:[
 "Surto Heroico: 5 PM, uma ação adicional uma vez por rodada. Ataque Especial dá +4 em acerto/dano por 1 PM.",
 "Estilo de Arremesso melhora uso de facas em ataques à distância e saque conforme o poder.",
 "Ginete remove a penalidade de ataque montado. Durão reduz dano gastando PM (habilidade automática).",
 "Arremesso Múltiplo permite um arremesso adicional sob suas condições e custo; exige arma reserva.",
 "Escolha propriedades de Golpe Pessoal permitidas para adaga, respeitando custo máximo por golpe.",
 "Arqueiro melhora dano à distância; Ataque Extra é automático e custa 2 PM por mais um ataque.",
 "Foco em Arma aumenta ataque com adagas sem alterar o tempo.",
 "Disparo Preciso reduz a penalidade de atacar alvo envolvido em combate.",
 "Na Mosca dá dado adicional com gasto, se o ataque acertar. Ataque Especial sobe para +12.",
 "Escolha um segundo Golpe Pessoal; ele não substitui o primeiro automaticamente.",
 "Especialização em Arma soma +2 dano em adagas.",
 "Mestre em Arma aumenta dado e permite repetir ataque pagando PM. Ainda não é Parar o Tempo literal."
 ]
});
window.T20_ALTERNATES={diego:{normal:diegoBase,alternative:diegoAlt}};
const indexText=(p,i)=>({
 why:p[2],
 use:(p._config?.levelHow||[])[i]||"Use os efeitos legais do poder, seguindo custos e pré-requisitos.",
 ref:[["core",p._config?.classPage||"cap. 1","Classe, habilidade e progressão"]]
});
for(const c of [...normal,diegoAlt]){
 const cfg=c._config;
 c.skillReference=cfg.classPage;
 const basic=[
  {name:c.initial[0],why:c.summary,use:c.notes.abilities,ref:[["core",cfg.classPage,"Classe, habilidades e nível 1"]]},
  {name:c.gear[0].name,why:c.gear[0].detail,use:c.notes.equipment,ref:[["core","cap. 3, Equipamentos","Armas, armaduras e itens"]]},
  {name:"Limites da adaptação",why:c.notes.overview,use:c.notes.techniques,ref:[["core","cap. 5, Regras do Jogo","Ações, testes, duração e PM"]]}
 ];
 const g={levels:c.progression.map((p,i)=>indexText({...p,2:p[2],_config:cfg},i)),basics:basic};
 // Para notas por nível, o significado vem do texto dos guias de uso; páginas são as do livro.
 g.levels=c.progression.map(([n,power,why],i)=>({
  why, use:cfg.levelHow[i]||"Leia a habilidade e aplique seus custos oficiais.",
  ref:[["core",cfg.classPage,"Nível "+n+" — "+power]]
 }));
 if(c.id==="diego"&&c.theme==="diego")g.levels[1].ref.push(["core","61–63","Forma Selvagem"]);
 if(c.id==="optimus")g.levels[0].ref.push(["core","27","Golem: Sem Origem, Chassi"]);
 if(c.id==="yoru")g.levels[0].ref.push(["core","68–71","Inventor e Protótipo"]);
 if(c.id==="ado"||c.id==="marin")g.levels[0].ref.push(["core","44–46","Bardo e Inspiração"]);
 if(c.theme==="diego-alt")window.T20_ALTERNATE_GUIDES={diego:g};
 else guides.people[c.id]=g;
 delete c._config;
}
})();
