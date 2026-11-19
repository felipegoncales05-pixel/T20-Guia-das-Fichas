/* O SISTEMA // Correção canônica: Acheron é Samurai (Dragão Brasil 199).
   Executa depois da expansão e antes da interface; não reclassifica outros Emanadores. */
(()=>{
const data=window.T20_DATA, mega=window.T20_MEGA, guide=window.T20_GUIDE;
if(!data||!mega||!guide)return;
const c=data.characters.find(x=>x.id==="em-acheron");if(!c)return;
guide.books.db199={name:"Dragão Brasil nº 199 — classe Samurai",url:"https://jamboeditora.com.br/selos-literarios/dragao-brasil/",edition:"Dragão Brasil 199 · classe opcional; verificar PDF da mesa"};
mega.classes.Samurai={p:20,pg:5,pm:3,page:"Dragão Brasil 199 — seção Samurai",stat:"FOR",weapon:"Katana ancestral",damage:"1d8",skills:["Luta","Vontade","Iniciativa","Percepção"]};
c.info.className="Samurai (Dragão Brasil nº 199)";
c.info.role="Duelista de katana · dano concentrado · Emanadora da Nihilidade";
c.label="NIHILITY // KIAI ANCESTRAL";
c.summary="Samurai opcional da Dragão Brasil nº 199. Sua katana é a Arma Ancestral, o Grito de Kiai concentra seus cortes e a técnica Corte do Vácuo representa parte do visual de aniquilação. Não possui poder literal de eliminar existência nem invocações gratuitas.";
c._mega.className="Samurai";
c._mega.mainAttr="FOR";
c._mega.page="DB 199: Samurai (seção da classe)";
c._mega.description="Acheron adota a classe opcional Samurai da Dragão Brasil nº 199. O Código do Samurai é obrigatório até obter o poder Ronin; a interpretação narrativa não elimina suas restrições.";
const buy={CON:1,CAR:1,SAB:2,INT:0,FOR:3,DEX:2};
const race={CON:1,FOR:1,DEX:1};
for(const a of c.attrs){a.buy=buy[a.key]??0;a.race=race[a.key]??0;a.value=a.buy+a.race;a.why={
CON:"Resiliência de quem atravessa lugares devastados.",CAR:"Presença fria e introspectiva.",SAB:"Sensibilidade ao caminho e instintos de batalha.",INT:"Conhecimento fragmentado de um mundo perdido.",FOR:"Golpes profundos da katana ancestral.",DEX:"Saque preciso e movimentação letal."
}[a.key]}
const score=Object.fromEntries(c.attrs.map(a=>[a.key,a.value]));
c.stats={pv:20+score.CON,pm:3,defense:10+score.DEX+2,speed:"9 m",hpGain:5+score.CON,pmGain:3};
c.skills=[
 ["Luta","+6","Treinada · golpes com katana ancestral"],
 ["Vontade","+4","Treinada · força de vontade da Nihilidade"],
 ["Iniciativa","+5","Treinada · Iaijutsu a partir do 3º nível"],
 ["Percepção","+4","Treinada · detectar aproximações"],
 ["Cavalgar","+5","Treino adicional humano (Versátil) · deslocamento montado"]
];
c.initial=[
 "Arma Ancestral (katana com 1 melhoria até T$ 500): escolha Precisa para habilitar Corte do Vácuo mais adiante.",
 "Código do Samurai: manter a palavra, ajudar inocentes, não mentir, trapacear ou roubar; violar o código faz perder PM até o dia seguinte.",
 "Grito de Kiai: ao atacar corpo a corpo, pague 2 PM para rolar dois dados de ataque e ficar com o melhor; no acerto soma +1d4 de dano (aumenta nos níveis 5 e 9).",
 "Humana: bônus raciais FOR, DES e CON. Versátil concede Cavalgar treinado e Foco em Arma (katana); nenhum poder automático de Emanadora."
];
c.gear=[
 {name:"Katana ancestral de Acheron",rule:"DB 199 · Arma Ancestral (katana precisa)",detail:"Arma superior inicial da classe. 1 melhoria com valor total de até T$ 500. Adquire melhorias extras nos níveis 4, 6 e 8; encantamentos nos níveis 10 e 12. Não reproduz literalmente o poder cósmico da Nihilidade.",qty:"1",image:c.portrait.url,source:"https://jamboeditora.com.br/selos-literarios/dragao-brasil/",credit:"Ilustração do personagem; regras na Dragão Brasil 199"},
 {name:"Bainha cerimonial",rule:"Acessório narrativo",detail:"Serve às cenas de saque da katana; não oferece ataque extra nem vantagem mecânica gratuita.",qty:"1"},
 {name:"Uniforme de peregrina",rule:"Traje de viajante",detail:"Casaco e tons roxo-preto da versão original. Armadura leve padrão apenas se adquirida e vestida.",qty:"1"},
 {name:"Equipamento de viagem",rule:"Kit de aventureira",detail:"Itens ordinários conforme equipamentos e recursos iniciais permitidos pelo mestre.",qty:"1 conjunto"}
];
c.attacks=[
 {name:"Katana ancestral",test:"+6 no nível 1",damage:"1d8+4 corte",cost:"0 PM",detail:"Ataque básico da arma; usando FOR +4, treino de Luta +2. Modificadores específicos da melhoria precisam ser considerados em separado."},
 {name:"Grito de Kiai",test:"Dois dados de ataque, fica o melhor",damage:"Katana +1d4 (nível 1), +1d6 (5), +1d8 (9)",cost:"2 PM",detail:"Dano extra num acerto corpo a corpo e aumento por faixa de nível. É efeito oficial da classe, sem cortes existenciais."},
 {name:"Corte do Vácuo",test:"Ataque com katana",damage:"Dano convertido para essência",cost:"1 PM, após aprender",detail:"Poder Despertar Ancestral com arma precisa; alcance curto. Selecione legalmente o poder de Samurai e mantenha a melhoria exigida."}
];
const levels=[
 ["Arma Ancestral (1 melhoria) · Código do Samurai · Grito de Kiai 1d4","Primeira lâmina: uma katana precisa de custo permitido."],
 ["Ataque Disciplinado","Soma Sabedoria ao dano da arma ancestral (limitado pelo nível)."],
 ["Iaijutsu · Olhar Assustador +1 (automático)","Reação rápida e precisão na primeira rodada; exige Iniciativa treinada."],
 ["Corte da Correnteza · Arma Ancestral (2 melhorias)","Ataques de uma mão com outra livre ganham bônus críticos; escolha segunda melhoria."],
 ["Arma Reverberante · Grito de Kiai 1d6 (automático)","Pague +1 PM com Kiai na arma ancestral para outro dado."],
 ["Arma Veloz · Arma Ancestral (3 melhorias)","Um ataque adicional na ação agredir por 2 PM, uma vez por rodada."],
 ["Equilíbrio Interior","Uma nova chance em resultado natural 1, uma vez por teste."],
 ["Serenidade dos Kami · Arma Ancestral (4 melhorias)","PV temporários ao meditar; completar melhorias oficiais da arma."],
 ["Espírito Incisivo · Olhar Assustador +2 · Kiai 1d8","Melhora multiplicador crítico, presença e impacto do Kiai."],
 ["Despertar Ancestral: Corte do Vácuo · Arma Espiritual (1 encanto)","Katana precisa projeta um corte de essência; escolher primeiro encanto."],
 ["Aumento de Atributo (SAB)","Sabedoria reforça dano disciplinado e habilidades."],
 ["Kiai Estremecedor · Arma Espiritual (2 encantos)","Corte de Kiai pode derrubar inimigos conforme teste de Fortitude; segundo encanto."]
];
c.progression=levels.map((p,i)=>[String(i+1),...p]);
c.techniques=[
 {level:1,name:"Nihility Slash",mechanic:"Grito de Kiai",cost:"2 PM",effect:"Dois dados no teste de ataque e dano extra de Kiai em acerto; aplica somente dano permitido pela classe.",flavor:"Atravessar a paisagem com um único corte."},
 {level:3,name:"Unseen Moment",mechanic:"Iaijutsu",cost:"Passivo",effect:"SAB em Iniciativa e saque livre; bônus de primeira rodada segundo a habilidade.",flavor:"A lâmina parece ter sido sacada antes da percepção."},
 {level:5,name:"Crimson Fracture",mechanic:"Arma Reverberante",cost:"Grito de Kiai +1 PM",effect:"Dado adicional do Kiai quando utilizar a arma ancestral, conforme o poder.",flavor:"A cauda vermelha do golpe atravessa a penumbra."},
 {level:6,name:"Blade Beyond Time",mechanic:"Arma Veloz",cost:"2 PM",effect:"Um ataque adicional quando usa agredir com a katana ancestral, uma vez por rodada.",flavor:"Uma sequência de cortes se sobrepõe."},
 {level:10,name:"Void Severance",mechanic:"Despertar Ancestral — Corte do Vácuo",cost:"1 PM",effect:"Corte de alcance curto, dano de essência e pré-requisito de katana precisa.",flavor:"O vazio se manifesta como efeito mecânico controlado."},
 {level:12,name:"Final Requiem",mechanic:"Kiai Estremecedor",cost:"Grito de Kiai +1 PM",effect:"Os oponentes em alcance curto do alvo ficam caídos se falharem no teste de Fortitude.",flavor:"Uma reverberação derruba quem presencia a lâmina."}
];
c.notes={
 ...c.notes,
 overview:"Acheron utiliza oficialmente a classe OPCIONAL Samurai (DB 199), não Guerreiro. O Código é obrigatório nesta build e poderá gerar complicações narrativas.",
 attributes:"Compra de 10 pontos: CON 1, CAR 1, SAB 2, INT 0, FOR 3, DES 2; humano +1 em CON, FOR e DES. A classe exige treino em Luta e Vontade.",
 equipment:"A Arma Ancestral começa com uma melhoria e melhora nos níveis 4, 6, 8; encanta nos níveis 10 e 12. Visual de katana da Nihilidade, sem dano cósmico literal.",
 abilities:"Grito de Kiai custa 2 PM e rola dois dados no teste de ataque. Arma Veloz custa 2 PM para ataque adicional em ação agredir uma vez por rodada. Corte do Vácuo exige arma precisa.",
 progression:"Samurai da DB 199: 20+CON PV no nível 1, 5+CON por nível adicional e 3 PM por nível. A tabela inclui habilidades automáticas e um poder opcional escolhido em cada nível 2 a 12.",
 techniques:"A técnica é narrativa, o efeito mecânico é o poder da DB 199. Sem eliminar planetas, imortalidade ou alvos por simples ataque."
};
c.sources=[...c.sources.filter(s=>!/Tormenta20|Guerreiro/i.test(s.name)),{name:"Samurai — Dragão Brasil 199 (Jambô Editora)",url:"https://jamboeditora.com.br/selos-literarios/dragao-brasil/"}];
const use=[
 "No 1º nível receba katana ancestral com 1 melhoria e siga o Código. Grito de Kiai custa 2 PM por um ataque corpo a corpo especial.",
 "Ataque Disciplinado aplica SAB no dano da arma ancestral, com limite de nível. Exige SAB pelo menos +1.",
 "Iaijutsu soma SAB à Iniciativa, permite saque livre e bônus na primeira rodada conforme a rolagem; Olhar Assustador +1 é automático.",
 "Corte da Correnteza exige katana em uma mão e outra livre; maior ameaça de crítico, e a arma ancestral ganha segunda melhoria.",
 "Kiai cresce automaticamente a 1d6; Arma Reverberante pode acrescentar outro dado pelo custo extra de 1 PM.",
 "Arma Veloz: ao usar agredir com a katana ancestral, pague 2 PM por um ataque adicional, uma vez por rodada. Terceira melhoria.",
 "Equilíbrio Interior permite repetir um 1 natural, apenas uma vez por teste; Vontade é treinamento obrigatório.",
 "Serenidade dos Kami: ação de movimento e 3 PM por PV temporários igual nível + SAB. Quarta melhoria da katana.",
 "Kiai cresce a +1d8 e Olhar Assustador a +2; Espírito Incisivo melhora o multiplicador crítico.",
 "Com a melhoria Precisa, Corte do Vácuo permite gastar 1 PM para ataque de essência em alcance curto. Arma ganha um encanto.",
 "Aumento de Atributo em SAB adiciona +1; atualize bônus de Ataque Disciplinado, CD e percepção.",
 "Kiai Estremecedor pode derrubar oponentes perto do alvo (Fortitude evita); a arma ancestral recebe segundo encanto."
];
guide.people[c.id]={
 levels:c.progression.map(([n,power,why],i)=>({why,use:use[i],ref:[["db199","seção Samurai, tabela e poderes","Nível "+n+" — "+power],["core","cap. 3","Katana e melhorias"]]})),
 basics:[
 {name:"Arma Ancestral",why:"Representar a espada de Acheron com progressão oficial.",use:"Começa com katana superior e uma melhoria dentro do limite; novas melhorias aos níveis 4, 6 e 8; encantos nos níveis 10 e 12.",ref:[["db199","habilidade Arma Ancestral","Samurai"]]},
 {name:"Grito de Kiai",why:"Simular os cortes devastadores.",use:"Ao atacar corpo a corpo, 2 PM para rolar dois dados e usar o melhor. Se acertar, adiciona 1d4 dano inicialmente, 1d6 no nível 5 e 1d8 no 9.",ref:[["db199","habilidade Grito de Kiai","Samurai"]]},
 {name:"Código do Samurai",why:"É restrição mecânica obrigatória, não mera decoração temática.",use:"Manter promessas, não mentir, trapacear ou roubar e ajudar inocentes; violar o Código faz perder PM até o dia seguinte. O jogador e o mestre devem acertar sua interpretação para Acheron.",ref:[["db199","habilidade Código do Samurai","Samurai"]]},
 {name:"Corte do Vácuo",why:"Aproximar a Nihilidade sem inventar dano infinito.",use:"No nível 10 com katana precisa, pague 1 PM e projete corte de essência em alcance curto como Despertar Ancestral.",ref:[["db199","Despertar Ancestral — Corte do Vácuo","Samurai"]]}
]};
})();
