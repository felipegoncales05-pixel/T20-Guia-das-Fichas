/* Referências de consulta e instruções originais resumidas, sem reproduzir textos dos livros. */
window.T20_GUIDE = {
 books: {
  core:{name:"Tormenta20 — Jogo do Ano v1.3",url:"https://jamboeditora.com.br/wp-content/uploads/2024/12/Tormenta20-Edicao-Jogo-do-Ano-v1.3.pdf",edition:"v1.3 · 2024"},
  heroes:{name:"Heróis de Arton",url:"https://jamboeditora.com.br/produto/tormenta20-herois-de-arton/",edition:"v1.1 · 2025"},
  threats:{name:"Ameaças de Arton",url:"https://jamboeditora.com.br/produto/ameacas-de-arton/",edition:"Consulte edição usada na mesa"}
 },
 instructions:"As páginas são as numerações impressas do livro, não necessariamente o índice do visualizador de PDF. Alguns efeitos de magias têm apenas capítulo/índice indicado quando a página exata do verbete não pôde ser verificada.",
 people:{
 gyro:{
  levels:[
   {why:"Começar como arremessador confiável: a Steel Ball é uma azagaia com visual diferente.",use:"Ataque com Pontaria; Acuidade usa DES no ataque e dano, Estilo de Arremesso soma +2 no dano. Ataque Especial custa 1 PM para +4 em ataque ou dano.",ref:[["core","64–66","Ataque Especial"],["core","124–125","Acuidade com Arma e Estilo de Arremesso"],["core","95–96","Origem Soldado"]]},
   {why:"Reproduzir dois lançamentos em sequência.",use:"Uma vez por rodada, após atacar com uma arma arremessada, gaste 1 PM e lance outra contra o mesmo alvo. Precisa de uma segunda esfera.",ref:[["core","124–125","Arremesso Múltiplo"]]},
   {why:"Lutar de Valkyrie sem a penalidade normal dos ataques montados.",use:"Ginete remove a penalidade de ataque à distância montado. Durão é automático do Guerreiro: ao sofrer dano, pode gastar 3 PM para reduzi-lo à metade.",ref:[["core","126","Ginete"],["core","66","Durão"]],automatic:"Durão é habilidade de classe, não escolha adicional."},
   {why:"Arremessar quando aliados já estejam engajados com o oponente.",use:"Disparo Preciso remove a penalidade de −5 em ataques à distância contra inimigos envolvidos em combate corpo a corpo.",ref:[["core","124–125","Disparo Preciso"]]},
   {why:"Criar a primeira técnica exclusiva de ricochete.",use:"Escolha Golpe Pessoal (arma: azagaia) com Preciso e Ricocheteante: 2 PM, role dois dados de ataque e use o melhor; a esfera retorna. Ataque Especial aumenta para +8.",ref:[["core","65–66","Golpe Pessoal, Preciso e Ricocheteante"],["core","64–65","Ataque Especial +8"]]},
   {why:"Transformar Sabedoria em precisão de dano e acelerar a cadência.",use:"Arqueiro adiciona SAB (+3) ao dano de ataques à distância. Ataque Extra é automático: ao agredir, gaste 2 PM por outro ataque, uma vez por rodada.",ref:[["core","64–66","Arqueiro e Ataque Extra"]],automatic:"Ataque Extra é habilidade de classe."},
   {why:"Cumprir a exigência do Spin de deslocamento; não é um bônus gratuito de dano.",use:"Arremesso Potente permite substituir DES por FOR no teste com arma de arremesso, mas Gyro normalmente continua usando DES por ser maior. É requisito para Arremesso Devastador.",ref:[["core","124–125","Arremesso Potente"]]},
   {why:"O Spin deixa de ser somente dano e passa a controlar o campo.",use:"Ao acertar ataque com arma de arremesso, pague 1 PM para tentar derrubar ou empurrar com o próprio resultado do ataque, conforme o poder.",ref:[["heroes","78","Arremesso Devastador"]]},
   {why:"Fazer uma esfera causar impacto adicional num lançamento decisivo.",use:"Na Mosca: gaste 1 PM num ataque à distância; se acertar, adicione um dado de dano da arma. Ataque Especial sobe automaticamente para +12.",ref:[["heroes","79","Na Mosca"],["core","64–65","Ataque Especial +12"]]},
   {why:"Representar a Golden Rectangle como técnica preparada.",use:"Escolha um SEGUNDO Golpe Pessoal (não substitui automaticamente o primeiro). Sugestão: Carregado, Preciso, Penetrante, Impactante e Ricocheteante. Confira o custo total, as ações e o limite de PM com o mestre.",ref:[["heroes","68","Carregado / novos efeitos de Golpe Pessoal"],["core","65–66","Efeitos de Golpe Pessoal"]]},
   {why:"Consolidar o dano físico das Steel Balls.",use:"Especialização em Arma (azagaia): +2 nas rolagens de dano com essa arma, continuamente.",ref:[["core","65–66","Especialização em Arma"]]},
   {why:"Concluir o domínio do Spin e o uso da arma escolhida.",use:"Mestre em Arma aumenta o dano base da azagaia em um passo. Em ataques com ela, é possível pagar 2 PM para rolar o teste novamente, conforme o poder.",ref:[["core","66","Mestre em Arma"]]}
  ],
  basics:[
   {name:"Acuidade com Arma",why:"Permite o Gyro usar sua maior característica: Destreza.",use:"Aplica DES em ataque e dano com a azagaia, em vez de FOR.",ref:[["core","124","Acuidade com Arma"]]},
   {name:"Steel Balls / azagaia",why:"Evita inventar estatísticas de arma.",use:"Mantenha alcance, tipo de dano, recarga e regras da azagaia oficial; só a aparência muda.",ref:[["core","cap. 3, seção Armas","Azagaia"]]},
   {name:"Valkyrie",why:"Preservar o combate de jóquei sem conceder parceiro gratuito.",use:"A montaria normal deve ser adquirida. Os benefícios de um parceiro exigem poder ou aprovação do mestre.",ref:[["core","cap. 3, seção Montarias; p. 260","Montaria / parceiro"]]}
  ]
 },
 d:{
  levels:[
   {why:"O cyberdeck é uma interface visual para o foco mágico de Bruxo.",use:"Aprenda Adaga Mental, Raio do Enfraquecimento e Seta Infalível de Talude. Cada uma custa PM, usa sua execução e continua sendo magia pelas regras.",ref:[["core","37","Bruxo e magias do 1º círculo"],["core","cap. 4, verbetes por nome","Magias iniciais"]]},
   {why:"O netrunner intensifica o dano dos quickhacks.",use:"Arcano de Batalha soma INT (+4) às rolagens de dano de magias que causem dano. Aprenda uma magia nova de 1º círculo ao subir de nível.",ref:[["core","38","Arcano de Batalha"],["core","37","Aprendizado de magias"]]},
   {why:"Dar presença mecânica à interface da Capri sem inventar uma segunda personagem.",use:"Familiar: escolha um familiar oficial (como cobra). Ele concede apenas os benefícios da espécie e se comunica telepaticamente.",ref:[["core","38","Familiar e opções"]]},
   {why:"Forçar a dificuldade de resistir a um hack decisivo.",use:"Magia Pungente permite pagar +1 PM para aumentar em +2 a CD da magia lançada; é um custo opcional por uso.",ref:[["core","38","Magia Pungente"]]},
   {why:"As magias ficam mais difíceis de resistir e o 2º círculo libera Dissipar Magia.",use:"Fortalecimento Arcano aumenta a CD das suas magias em +1 permanentemente. A partir do nível 5 você pode aprender magias do 2º círculo.",ref:[["core","37–38","Fortalecimento Arcano / 2º círculo"],["core","cap. 4, Dissipar Magia","Dissipar Magia"]]},
   {why:"Expandir a reserva de energia e liberar o Campo de Força.",use:"Poder Mágico concede +1 PM por nível de Arcanista, inclusive níveis anteriores. Campo de Força é magia do 2º círculo e gera proteção mágica temporária, não uma armadura permanente.",ref:[["core","38–39","Poder Mágico"],["core","cap. 4, Campo de Força","Campo de Força"]]},
   {why:"Evitar que o corpo caia enquanto o cyberdeck permanece funcional.",use:"Foco Vital permite sobreviver a dano fatal segurando o foco, mas o foco absorve o excedente e pode ser destruído. Velocidade é uma magia aprendida nesse patamar.",ref:[["core","38","Foco Vital"],["core","cap. 4, Velocidade","Magia Velocidade"]]},
   {why:"Simular quickhacks executados em sequência e furtividade digital.",use:"Magia Acelerada altera a execução de uma magia para livre, pagando os custos e respeitando restrições de execução. A magia adicional proposta é Invisibilidade.",ref:[["core","131","Magia Acelerada"],["core","cap. 4, Invisibilidade","Invisibilidade"]]},
   {why:"Melhorar a precisão de uma escola de quickhacks e obter magias de 3º círculo.",use:"Escolha Encantamento para Especialista em Escola: +2 na CD dessa escola. O nível 9 também libera magias de 3º círculo, como Relâmpago.",ref:[["core","38","Especialista em Escola"],["core","37","Magias de 3º círculo"]]},
   {why:"Interromper técnicas arcanas hostis e liberar a Telecinesia.",use:"Contramágica Aprimorada permite tentar contramágica como reação, uma vez por rodada. Exige conhecer Dissipar Magia. Telecinesia é uma magia, sem capacidades adicionais de hack.",ref:[["core","38","Contramágica Aprimorada"],["core","cap. 4, Telecinesia","Telecinesia"]]},
   {why:"Acrescentar flexibilidade ao repertório neural.",use:"Conhecimento Mágico faz aprender duas magias extras de círculos que já possa usar, além da magia aprendida normalmente neste nível.",ref:[["core","38","Conhecimento Mágico"]]},
   {why:"Concluir a evolução como netrunner de alto poder.",use:"Aumento de Atributo (INT) aumenta INT de +4 para +5; revise CD das magias e PM. Como sugestão de nova magia escolha Voo (3º círculo).",ref:[["core","38","Aumento de Atributo / Arcanista"],["core","cap. 4, Voo","Magia Voo"]]}
  ],
  basics:[
   {name:"Cyberdeck / foco arcano",why:"Bruxo exige um objeto para canalizar magias.",use:"Empunhe o foco e mantenha a outra mão livre conforme o Caminho do Bruxo; se perder o foco, há teste especial de Misticismo.",ref:[["core","37","Caminho do Bruxo"]]},
   {name:"Quickhacks",why:"Reproduzir sabotagem sem criar novas regras.",use:"São magias normais: alvo, CD, círculo, custo, ação e duração vêm do capítulo de magias.",ref:[["core","cap. 4","Conjuração e magias"]]}
  ]
 },
 david:{
  levels:[
   {why:"Sandevistan consome energia rapidamente, enquanto Briga representa a base corporal.",use:"Surto Heroico custa 5 PM para ganhar ação padrão ou de movimento (1x/rodada). Golpe Relâmpago custa 1 PM para outro ataque desarmado quando agride. Coração Heroico concede +3 PM iniciais.",ref:[["core","91","Herói Camponês e Coração Heroico"],["core","130–131","Surto Heroico"],["core","76","Briga e Golpe Relâmpago"]]},
   {why:"Melhorar a mobilidade do edgerunner.",use:"Atlético aumenta o deslocamento terrestre em 3 m e oferece benefícios de Atletismo conforme a descrição oficial.",ref:[["core","127–130","Atlético"]]},
   {why:"Reproduzir reforços corporais e resistência a golpes.",use:"Braços Calejados soma FOR na Defesa enquanto estiver sem armadura, limitado pelo nível. Casca Grossa vem automaticamente da classe, somando CON à Defesa.",ref:[["core","76","Braços Calejados"],["core","75–77","Casca Grossa"]],automatic:"Casca Grossa é habilidade de classe."},
   {why:"Aumentar o vigor do corpo implantado.",use:"Sarado soma FOR aos PV máximos e em Fortitude. O bônus aumenta se a Força aumentar posteriormente.",ref:[["core","77","Sarado"]]},
   {why:"Tirar inimigos do equilíbrio e fortalecer ataques desarmados.",use:"Rasteira usa manobra associada à luta desarmada. Automaticamente Briga aumenta o dado para 1d8 e Golpe Cruel melhora a margem de ameaça.",ref:[["core","76–77","Rasteira, Briga e Golpe Cruel"]],automatic:"Briga 1d8 e Golpe Cruel vêm da classe no nível 5."},
   {why:"Executar combinações cada vez mais longas.",use:"Trocação pode gerar novos socos após acertos desarmados pagando PM progressivos. Interrompa se errar ou não tiver PM.",ref:[["core","77","Trocação"]]},
   {why:"Melhorar Gorilla Arms de modo permanente.",use:"Aumento de Atributo eleva FOR para +5, melhorando ataque, dano, PV de Sarado e a Defesa de Braços Calejados. Casca Grossa ganha +1 automático.",ref:[["core","76–77","Aumento de Atributo e Casca Grossa"]]},
   {why:"Socar criaturas com proteções resistentes.",use:"Punhos de Adamante modifica seus golpes desarmados conforme o poder, tornando-os mais eficazes contra certas resistências.",ref:[["core","77","Punhos de Adamante"]]},
   {why:"Usar sobrecarga com custo defensivo.",use:"Golpe Imprudente amplia dano durante Golpe Relâmpago, mas diminui a Defesa. Briga cresce para 1d10 e Golpe Violento eleva o multiplicador crítico automaticamente.",ref:[["core","77","Golpe Imprudente, Briga e Golpe Violento"]],automatic:"Briga 1d10 e Golpe Violento vêm da classe."},
   {why:"Aprimorar a potência dos implantes.",use:"Trincado adiciona CON (+3) ao dano desarmado de David. É bônus de dano, não um novo ataque.",ref:[["core","77","Trincado"]]},
   {why:"Lutar sob pressão e resistir a contra-ataques.",use:"Confiança dos Ringues dá PM temporários quando inimigos erram ataques corpo a corpo. Casca Grossa ganha mais +1 à Defesa neste nível.",ref:[["core","76–77","Confiança dos Ringues e Casca Grossa"]]},
   {why:"Representar uma sequência devastadora final.",use:"Antes de atacar, pague 2 PM e anuncie quantos golpes acertará. Se conseguir, o último golpe recebe bônus de dano cumulativo conforme o número anunciado.",ref:[["core","77","Sequência Destruidora"]]}
  ],
  basics:[
   {name:"Sandevistan",why:"A mecânica é um estouro temporário de ações.",use:"É o Surto Heroico da origem: não concede iniciativa automática ou ações infinitas.",ref:[["core","130–131","Surto Heroico"]]},
   {name:"Coração Heroico",why:"Aumenta a quantidade de ativações disponíveis.",use:"+3 PM no nível 1 e +3 PM adicionais quando entra nos níveis 5 e 11.",ref:[["core","91","Coração Heroico"]]},
   {name:"Gorilla Arms",why:"Músculos reforçados são melhor representados por Lutador.",use:"Briga, Trocação, Punhos de Adamante e Trincado são poderes/regras, não equipamentos gratuitos.",ref:[["core","75–77","Lutador"]]}
  ]
 },
 cipher:{
  levels:[
   {why:"Uma ladra felina de verdade; Moreau Gato é parte mecânica da ficha.",use:"As garras e sentidos são raciais. Ataque Furtivo acrescenta 1d6 ao ataque válido uma vez por rodada. Especialista melhora perícias pagando 1 PM. Punguista é da origem e Farsa do Fingidor depende da devoção a Hyninn.",ref:[["threats","305–306","Moreau — Herança do Gato"],["core","72–74","Ladina e Especialista"],["core","88–89","Criminoso / Punguista"],["core","cap. 2, poderes concedidos","Farsa do Fingidor"]]},
   {why:"Permitir que as garras sejam controladas por Destreza.",use:"Acuidade troca FOR por DES em ataque e dano com armas leves/naturais que atendam ao poder. Evasão é automática e evita dano quando passa em certos testes de Reflexos.",ref:[["core","124","Acuidade com Arma"],["core","73","Evasão"]],automatic:"Evasão é recebida automaticamente pela classe."},
   {why:"Elevar furtividade e a capacidade de roubar.",use:"Mente Criminosa soma INT (+3) aos valores de Ladinagem e Furtividade. Ataque Furtivo aumenta automaticamente para 2d6.",ref:[["core","73–74","Mente Criminosa e Ataque Furtivo"]]},
   {why:"Abrir brechas para um golpe de ladra.",use:"Finta Aprimorada permite fintar como ação de movimento. Esquiva Sobrenatural é automática: Cipher não é surpreendida.",ref:[["core","125","Finta Aprimorada"],["core","74","Esquiva Sobrenatural"]],automatic:"Esquiva Sobrenatural é de classe."},
   {why:"Simular a marca Patron para amplificar um golpe decisivo.",use:"Gaste ação de movimento e 3 PM para estudar uma criatura em alcance curto. Seu próximo Ataque Furtivo válido dentro da janela dobra os dados furtivos.",ref:[["core","73","Assassinar"]]},
   {why:"Atacar junto com seus aliados.",use:"Uma vez por rodada, quando um aliado causa dano a inimigo adjacente a Cipher, pague 2 PM para atacar esse inimigo corpo a corpo.",ref:[["core","74","Oportunismo"]]},
   {why:"Transformar movimento felino em enganação ofensiva.",use:"Finta Acrobática soma DES nos testes de Enganação para fintar, atendendo aos pré-requisitos de treinamento.",ref:[["heroes","71","Finta Acrobática"]]},
   {why:"Escapar pela frente do inimigo e confundir a percepção.",use:"Enganar os Olhos se aplica quando passa por um inimigo com Acrobacia. Ele pode considerá-la invisível por uma rodada, salvo resistência. Olhos nas Costas é automático e impede flanqueamento.",ref:[["heroes","71","Enganar os Olhos"],["core","74","Olhos nas Costas"]],automatic:"Olhos nas Costas é habilidade de classe."},
   {why:"Melhorar Ataque Furtivo quando os dados quase atingem o máximo.",use:"Ataque Furtivo Letal permite novos dados em resultados específicos dos dados do furtivo. Ataque Furtivo base já está em 5d6 neste patamar.",ref:[["heroes","71","Ataque Furtivo Letal"],["core","73","Ataque Furtivo"]]},
   {why:"Abrir combate com uma ação extra.",use:"Emboscar: na primeira rodada de combate, pode pagar 2 PM por uma ação padrão adicional. Evasão Aprimorada é automática.",ref:[["core","73–74","Emboscar e Evasão Aprimorada"]],automatic:"Evasão Aprimorada é de classe."},
   {why:"Fazer mais de um ataque furtivo na mesma rodada.",use:"Assassino em Série permite pagar 2 PM para aplicar Ataque Furtivo pela segunda vez na rodada se ambos os ataques cumprirem as condições. O dano furtivo base chega a 6d6.",ref:[["heroes","71","Assassino em Série"],["core","73","Ataque Furtivo"]]},
   {why:"Reproduzir a suprema como execução preparada.",use:"Mestre Assassino aprimora Assassinar com opções adicionais pagas separadamente. Exige Cura e Percepção treinadas, além de Assassinar e Ataque Furtivo Letal.",ref:[["heroes","72","Mestre Assassino"]]}
  ],
  basics:[
   {name:"Herança do Gato",why:"Representar a identidade felina sem homebrew.",use:"Garras, sentidos e redução de dano por queda seguem exclusivamente os traços raciais Moreau.",ref:[["threats","305–306","Moreau Gato"]]},
   {name:"Ataque Furtivo",why:"A principal fonte de dano da ladra.",use:"Requer alvo desprevenido, flanqueado ou outras condições previstas; não se aplica indiscriminadamente.",ref:[["core","73","Ataque Furtivo"]]},
   {name:"Hyninn",why:"Complementa os truques e enganação.",use:"Consulte as obrigações da divindade e a condição de devota antes de usar Farsa do Fingidor.",ref:[["core","cap. 2, deuses e poderes concedidos","Hyninn / Farsa do Fingidor"]]}
  ]
 }
}};
