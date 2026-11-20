/* O SISTEMA // Fonte: Heróis de Arton, 1ª ed. v1.1 (maio/2025).
 * Somente sínteses de regras e estruturas mecânicas, sem transcrever o livro.
 * Quatro variantes usam classes básicas já parcialmente modeladas.
 * O estado "verificado" atesta APENAS a tabela de 1–12 e os resumos abaixo,
 * nunca o total da ficha (equipamentos, CD e magias podem permanecer parciais). */
(function(root){
 "use strict";
 function install(rules,options){
  if(!rules?.abilities||!options?.variants)return false;
  const url="https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/";
  const source=(page,section)=>({book:"herois",edition:"v1.1 — maio/2025",page,section,url});
  const define=(id,name,classId,page,action,cost,effect,limit,example,versions)=>{
   rules.abilities[id]={name,kind:"automática",classId,source:source(page,name),manual:{action,cost,effect,limit,example}};
   if(versions)rules.abilities[id].versions=versions.map(([minClassLevel,label])=>({id:"nivel-"+minClassLevel,minClassLevel,label}));
  };
  // Atleta, Heróis de Arton, pp. 24–25, Tabela 1-4.
  define("atleta-facanha","Façanha Atlética","atleta","24","Ao fazer teste de perícia","PM escolhidos, até o valor de Força","+2 no teste por PM gasto","Não aumenta ataques automaticamente; respeitar limite de gasto.","Em uma escalada, gaste PM antes de resolver Atletismo.");
  define("atleta-arremesso","Arremesso Atlético","atleta","24–25","Ataques com armas de arremesso","Passiva","Aumenta alcance em um passo; pode usar dado de Briga no lugar do dano da arma.","Somente armas de arremesso; a partir do 10º nível contam como ataques desarmados para habilidades.","Arremesse uma arma no alcance ampliado e escolha o dado de Briga.");
  define("atleta-poderio","Poderio Muscular","atleta","25","Lançar Primor Atlético somente em si","Custo/ação da magia simulada","Concede uma simulação não mágica de Primor Atlético.","Conferir ação, duração e custo da magia básica; não concede lançamentos sobre aliados.","Use antes de uma proeza física relevante.");
  define("atleta-mobilidade","Mais Alto e Mais Rápido","atleta","25","Passiva","Sem custo","+3 m ao deslocamento e deslocamentos de escalada/natação relativos ao deslocamento normal.","Natação não concede respiração aquática; os casos de deslocamento já existente têm regra própria.","Aumente deslocamento, atravesse terreno e conte turnos sem respirar.");
  define("atleta-disciplina","Disciplina Atlética","atleta","25","Após falhar em teste de resistência","2 PM","Rola novamente usando Atletismo em lugar da perícia de resistência.","Somente após falha; a nova rolagem substitui o teste dentro da condição.","Falhe em Reflexos e tente novamente com Atletismo.");
  // Inovador, pp. 30–31, Tabela 1-8.
  define("inovador-equipamento","Do Bom e do Melhor","inovador","30–31","Na criação e ao verificar proficiência","Equipamento inicial, sem PM","Começa com um item superior permitido dentro do limite de preço.","Armas, armaduras e escudos não superiores/não mágicos passam a ser tratados como não proficientes.","Registre o equipamento superior e confronte as proficiências.");
  define("inovador-sequencia","Sequência Especial","inovador","30–31","Ao alternar armas numa sequência","2 PM, podendo aumentar em patamares","Bônus acumulado de ataque e dano com armas diferentes na sequência.","Exige alternância real; termina ao fim da cena ou após uma rodada sem trocar ao menos uma arma.","Abra a sequência e varie a arma para acumular bônus.",
   [[1,"Até +2"],[5,"Até +4"],[9,"Até +6"]]);
  define("inovador-bombardeio","Bombardeio Sequencial","inovador","31","Ao usar preparados alquímicos ou poções","Conforme Sequência Especial","Permite aplicar a sequência também a esses itens.","O bônus acumulado ajusta a CD de resistência nas condições da regra; não concede uso gratuito.","Varie os itens dentro da sequência e acompanhe a CD.");
  define("inovador-acrobacia","Acrobacia Defensiva","inovador","31","Quando sofre dano","2 PM","Subtrai do dano o resultado de um teste de Acrobacia.","Requer o teste e o gasto de PM; não evita automaticamente outros efeitos.","Role Acrobacia e reduza o dano válido.");
  define("inovador-dominio","Domínio Excêntrico","inovador","31","Após uma semana usando equipamento específico","Passiva","Permite proficiência com arma exótica ou de fogo superior/mágica acompanhada por uma semana.","O prazo, o tipo e a qualidade do equipamento devem ser comprovados.","Registre a arma e a semana de familiarização.");
  define("inovador-tecnica","Técnica do Inovador","inovador","31","Ativação para armas empunhadas","2 PM","Permite tratar temporariamente a arma como tendo uma propriedade escolhida entre as previstas.","A tabela chama 'técnica excêntrica'; o texto explicativo chama 'técnica revolucionária'. Nome sujeito a errata; não combinar duas ativações.","Escolha uma propriedade e acompanhe o fim do efeito.");
  // Necromante, pp. 34–35, Tabela 1-11.
  define("necro-caminho","Caminho do Necromante","necromante","34–35","Antes de conjurar, ao conectar-se à morte","PV conforme círculo acessado","Permite magias divinas de necromancia como arcanas e usa Inteligência.","Não aprende Encantamento; ao menos metade das magias aprendidas deve ser Necromancia. Requer conexão custeada em PV.","Antes da cena, conecte-se ao círculo necessário e mantenha os limites.");
  define("necro-mortos","Falar com Mortos","necromante","35","Interação com morto-vivo; a partir do nível 3 com cadáver","1 PM para a opção de cadáver","Permite interação com mortos-vivos por Misticismo e diálogo condicionado com cadáver.","A opção de cadáver exige ação padrão, alcance curto e nível 3; não concede necromancia irrestrita.","Use Misticismo para dialogar; com cadáver, pague PM após alcançar nível 3.");
  define("necro-animar","Animar Cadáver","necromante","35","Ação completa com cadáver apropriado","3 PM inicial; patamares superiores custam mais","Cria parceiro cadáver temporário de categoria adequada.","Um parceiro cadáver por vez; não é personagem adicional, e sacrificar exige condição de dano.","Anime um cadáver em alcance curto como parceiro iniciante.");
  define("necro-necrologia","Necrologia","necromante","35","Passiva","Sem custo","Bônus em Cura, Fortitude e CD de magias de necromancia.","Não aumenta todas as CDs; só aplica a magias identificadas como Necromancia.",
   "Aplique o bônus à resistência de um alvo contra magia necromântica.",[[3,"+2"],[8,"+3"]]);
  define("necro-distorcao","Distorção Necrótica","necromante","35","Ao escolher magia conhecida do primeiro círculo","Sem custo próprio","Transforma escola de magia não necromântica escolhida em Necromancia.","Escolha específica e compatibilidade devem ser registradas; não concede uma magia nova.","Registre a magia escolhida e altere somente sua escola.");
  define("necro-potencia","Necropotência","necromante","35","Na conexão à morte e quando magia derruba inimigo vivo","PV adicionais de conexão","Pode receber PM temporários ao derrotar inimigos vivos com Necromancia.","Depende de dobrar PV da conexão; PM temporários têm limite por cena e expiram.","Conecte-se com custo extra e acompanhe ganhos temporários.");
  // Ventanista, pp. 44–45, Tabela 1-16.
  define("ventanista-charme","Charme","ventanista","44","Passiva no total de PM; testes não ofensivos com gasto","Até Carisma PM, +2 por PM","+Carisma no total de PM e melhora de perícias elegíveis mediante gasto.","Não se aplica a testes de ataque e não é bônus contínuo em perícia.","Gaste PM durante Ladinagem para aumentar um teste.");
  define("ventanista-truques","Truques do Ofício","ventanista","44–45","Simulação não mágica de magias restritas","Conforme magia simulada","Permite simular Encantamento e Ilusão, começando com duas opções e novas escolhas em níveis pares.","O círculo segue o nível do Ventanista; não recebe benefícios de itens e efeitos que exigem magia real.","Registre a simulação e gaste a ação e os PM aplicáveis.");
  define("ventanista-disfarce","Disfarce Elaborado","ventanista","45","Quando usa Enganação para criar disfarce","Penalidade em PM máximos durante o disfarce","Pode simular poderes condicionados a disfarce e pré-requisitos.","Não concede permanentemente poderes; exige cumprir requisitos e registrar a ficção escolhida.","Crie identidade adequada e registre o poder condicional.",[[3,"1 poder"],[9,"2 poderes"]]);
  define("ventanista-virar","Virar a Casaca","ventanista","45","Ao retirar disfarce","1 PM","Pode tentar esconder-se usando Enganação sem a cobertura habitual.","Necessita estar disfarçado e cumprir o gatilho da habilidade.","Tire o disfarce e use Enganação para ocultar-se.");
  define("ventanista-provocar","Provocação Ousada","ventanista","45","Primeiro turno de cena; recuperação no início de turnos","Ação completa","Recupera PM condicionais após provocar adversários e aumentar suas chances de perceber e resistir.","Só funciona se houver risco real validado pelo mestre; recuperação limitada por cena ao nível.","Anuncie a intenção sob risco e acompanhe PM a recuperar.");
  const lv=(keep=[],add=[])=>({keep,add});
  const defineVariant=(id,name,base,page,table,levels)=>{
   options.variants[id]={id,name,baseClassId:base,source:source(page,table),status:"verificado",
    validationScope:"habilidades automáticas e patamares até o nível 12; cálculos derivados permanecem parciais",
    grantPolicy:"lista-explicita",powerFrom:2,powers:{exclusive:[],remove:[]},levels};
  };
  defineVariant("atleta","Atleta","lutador","24–25","Tabela 1-4",{
   1:lv(["briga"],["atleta-facanha"]),
   2:lv([],["atleta-arremesso","atleta-poderio"]),
   3:lv(["casca-grossa"]),
   4:lv(),5:lv(["briga"],["atleta-mobilidade"]),6:lv(),7:lv(["casca-grossa"]),
   8:lv(),9:lv(["briga"],["atleta-disciplina"]),10:lv(),11:lv(["casca-grossa"]),12:lv()
  });
  defineVariant("inovador","Inovador","guerreiro","30–31","Tabela 1-8",{
   1:lv([],["inovador-equipamento","inovador-sequencia"]),
   2:lv([],["inovador-bombardeio"]),3:lv([],["inovador-acrobacia"]),
   4:lv([],["inovador-dominio"]),5:lv([],["inovador-sequencia"]),
   6:lv(),7:lv([],["inovador-tecnica"]),8:lv(),9:lv([],["inovador-sequencia"]),
   10:lv(),11:lv(),12:lv()
  });
  defineVariant("necromante","Necromante","arcanista","34–35","Tabela 1-11",{
   1:lv(["magias-arcanas"],["necro-caminho","necro-mortos"]),
   2:lv([],["necro-animar"]),3:lv([],["necro-necrologia"]),
   4:lv([],["necro-distorcao"]),5:lv(["magias-circulo-2"],["necro-potencia"]),
   6:lv(),7:lv(),8:lv([],["necro-necrologia"]),
   9:lv(["magias-circulo-3"]),10:lv(),11:lv(),12:lv()
  });
  defineVariant("ventanista","Ventanista","ladino","44–45","Tabela 1-16",{
   1:lv([],["ventanista-charme","ventanista-truques"]),
   2:lv(["evasao"]),3:lv([],["ventanista-disfarce"]),4:lv(["esquiva-sobrenatural"]),
   5:lv(),6:lv(),7:lv([],["ventanista-virar"]),8:lv(["olhos-nas-costas"]),
   9:lv([],["ventanista-disfarce"]),10:lv(["evasao-aprimorada"]),
   11:lv([],["ventanista-provocar"]),12:lv()
  });
  // Livro parcialmente indexado: selecionar o livro não habilita opções sem uma
  // declaração individual status=verificado, fonte e tabela completa.
  const book=rules.books.find(b=>b.id==="herois");
  if(book){book.status="parcial";book.edition="v1.1";book.note="Quatro variantes com progressões indexadas; as demais opções continuam pendentes."; }
  return true;
 }
 if(typeof module!=="undefined"&&module.exports)module.exports={install};
 if(root?.T20_RULES&&root?.T20_CLASS_OPTIONS)install(root.T20_RULES,root.T20_CLASS_OPTIONS);
})(typeof window!=="undefined"?window:null);
