/* FASE V — elenco principal de Umamusume. Arquétipos individuais para
 * Tormenta20 Jogo do Ano + Ameaças/Heróis de Arton. Dados de construção
 * originais: não contém habilidades copiadas do jogo ou trechos dos livros. */
(()=>{
 "use strict";
 const p=[
 // [id, nome, arco, classe, variante ou vazio, raça oficial, atributos, assinatura, estilo/tema, cor, slug oficial]
 ["special-week","Special Week","Spica","Lutador","Atleta","Centauro","racer","Promessa das duas mães","Superar a própria insegurança e avançar mesmo na reta final.","#e9a5db","specialweek"],
 ["silence-suzuka","Silence Suzuka","Spica","Lutador","Atleta","Moreau do Coelho","speed","A paisagem da liderança","Controle de corrida, disparada na dianteira e manutenção de ritmo.","#82c9ad","silencesuzuka"],
 ["tokai-teio","Tokai Teio","Spica","Lutador","Atleta","Sátiro","speed","Imperador que volta a correr","Saltos, recuperação e técnica veloz após cada derrota.","#96bcef","tokaiteio"],
 ["mejiro-mcqueen","Mejiro McQueen","Spica","Cavaleiro","","Centauro","endurance","Nobreza e resistência","Disciplina, proteção da equipe e endurance de longas distâncias.","#b7a3df","mejiromcqueen"],
 ["gold-ship","Gold Ship","Spica","Guerreiro","","Moreau da Hiena","brawler","Estratégia caótica","Força, provocações imprevisíveis e investidas inesperadas.","#e5a2bd","goldship"],
 ["vodka","Vodka","Spica","Guerreiro","","Moreau do Lobo","racer","Espírito de motociclista","Investidas ousadas, ímpeto e competição frontal.","#a1b2cd","vodka"],
 ["daiwa-scarlet","Daiwa Scarlet","Spica","Bucaneiro","","Meio-Elfo","finesse","Primeiro lugar absoluto","Precisão, presença e técnica competitiva sem perder elegância.","#ed7778","daiwascarlet"],
 ["kitasan-black","Kitasan Black","Temporada 3","Paladino","","Centauro","endurance","Coração que inspira","Resistência para ir além do limite e apoio aos companheiros.","#e28e6d","kitasanblack"],
 ["satono-diamond","Satono Diamond","Temporada 3","Nobre","","Qareen","charisma","Vencer a tradição","Paciência, comando e determinação elegante.","#98c1a4","satonodiamond"],
 ["satono-crown","Satono Crown","Temporada 3","Nobre","","Moreau da Raposa","tactician","Surpresa estratégica","Planejamento, discurso e ataque final calculado.","#c192cf","satonocrown"],
 ["cheval-grand","Cheval Grand","Temporada 3","Lutador","Atleta","Moreau do Coelho","endurance","Força discreta","Confiar em si e sustentar uma corrida longa.","#929ac9","chevalgrand"],
 ["duramente","Duramente","Temporada 3","Guerreiro","","Centauro","brawler","Força silenciosa","Ataque agressivo, pressão e explosões de aceleração.","#b14f5b","duramente"],
 ["sounds-of-earth","Sounds of Earth","Temporada 3","Bardo","","Sátiro","charisma","Sinfonia de corrida","Performance musical e coordenação de grupo.","#cbb6aa","soundsofearth"],
 ["nice-nature","Nice Nature","Canopus","Ladino","","Moreau do Gato","finesse","Terceiro lugar, grande coração","Aproveitar oportunidades, ajudar e sobreviver à pressão.","#c88a8e","nicenature"],
 ["twin-turbo","Twin Turbo","Canopus","Lutador","Atleta","Moreau do Coelho","speed","Turbo integral","Acelerar desde o início e sustentar o máximo possível.","#70aadc","twinturbo"],
 ["ikuno-dictus","Ikuno Dictus","Canopus","Inventor","","Meio-Elfo","tactician","Planilhas e persistência","Analisar adversários, preparar equipamentos e otimizar ritmo.","#8ba3ae","ikunodictus"],
 ["matikanetannhauser","Matikanetannhauser (Mambo)","Canopus","Lutador","Atleta","Moreau do Coelho","endurance","Mambo! Nunca desiste","Resiliência otimista, passos constantes e talento de recuperação.","#a5a4d9","matikanetannhauser"],
 ["daitaku-helios","Daitaku Helios","Palco e Rivais","Bardo","","Sátiro","charisma","Gyaru no máximo volume","Energia de festa, ritmo, animação e apoio ao grupo.","#62c6e7","daitakuhelios"],
 ["mejiro-palmer","Mejiro Palmer","Canopus","Cavaleiro","","Centauro","racer","Líder improvável","Ritmo prolongado, resistência e lealdade ao time.","#78bca2","mejiropalmer"],
 ["daiichi-ruby","Daiichi Ruby","Palco e Rivais","Nobre","","Elfo","charisma","Elegância imperturbável","Diplomacia, serenidade e comando disciplinado.","#b76d80","daiichiruby"],
 ["k-s-miracle","K.S. Miracle","Palco e Rivais","Paladino","","Suraggel Aggelus","support","Dedicação protetora","Dever, proteção e determinação altruísta.","#b1cbd9","ksmiracle"],
 ["yamanin-zephyr","Yamanin Zephyr","Palco e Rivais","Druida","","Dahllan","support","Vento livre","Afinidade natural e deslocamento sob condições do terreno.","#a4d3b7","yamaninzephyr"],
 ["rice-shower","Rice Shower","Temporada 2","Ladino","","Suraggel Sulfure","finesse","Sombra da vitória","Superar medo e culpa por meio de precisão e discrição.","#867ca8","riceshower"],
 ["mihono-bourbon","Mihono Bourbon","Temporada 2","Inventor","","Moreau da Raposa","tactician","Precisão de máquina","Protocolo tático, equipamento e corrida previsível.","#a3a8ce","mihonobourbon"],
 ["biwa-hayahide","Biwa Hayahide","BNW","Inventor","","Elfo","tactician","Cálculo perfeito","Tática, matemática e preparação minuciosa.","#c4b4a5","biwahayahide"],
 ["narita-taishin","Narita Taishin","BNW","Ladino","","Moreau do Gato","finesse","Reta final implacável","Ataque furtivo metafórico: aparecer apenas no momento certo.","#a9a3c1","naritataishin"],
 ["winning-ticket","Winning Ticket","BNW","Lutador","Atleta","Centauro","racer","Correr com emoção","Explosão emotiva e persistência no objetivo.","#d7b891","winningticket"],
 ["oguri-cap","Oguri Cap","Cinderella Gray","Guerreiro","","Centauro","endurance","O prodígio de Kasamatsu","Vigor, economia de energia e velocidade em qualquer pista.","#9faeb8","oguricap"],
 ["tamamo-cross","Tamamo Cross","Cinderella Gray","Arcanista","","Qareen","mind","Raio branco","Magia elétrica como releitura da aceleração explosiva.","#b1b7de","tamamocross"],
 ["inari-one","Inari One","Cinderella Gray","Ladino","","Moreau da Raposa","finesse","Espírito rebelde de Edo","Velocidade, oportunismo e bravura urbana.","#d29b89","inarione"],
 ["super-creek","Super Creek","Cinderella Gray","Clérigo","","Suraggel Aggelus","support","Cuidado maternal","Curar e oferecer segurança ao time sem benefícios gratuitos.","#a2cbd3","supercreek"],
 ["yaeno-muteki","Yaeno Muteki","Cinderella Gray","Lutador","","Moreau do Leão","brawler","Disciplina marcial","Técnica corporal, concentração e golpes precisos.","#e29d74","yaenomuteki"],
 ["bamboo-memory","Bamboo Memory","Cinderella Gray","Paladino","","Moreau do Lobo","racer","Código da justiça","Vigilância, proteção e corrida determinada.","#7cb49c","bamboomemory"],
 ["mejiro-ardan","Mejiro Ardan","Cinderella Gray","Nobre","","Elfo","charisma","Elegância e fragilidade","Apoio, coragem e autocuidado nas provas de resistência.","#a7bce5","mejiroardan"],
 ["sakura-chiyono-o","Sakura Chiyono O","Cinderella Gray","Lutador","Atleta","Dahllan","racer","Cerejeira que não recua","Preparar o sprint com coragem e paciência.","#ebabb7","sakurachiyonoo"],
 ["symboli-rudolf","Symboli Rudolf","Lendas","Nobre","","Meio-Elfo","charisma","A Imperatriz","Autoridade, estratégia e comando de companheiras.","#9d8eaf","symbolirudolf"],
 ["air-groove","Air Groove","Lendas","Nobre","","Elfo","tactician","A Imperatriz do ar","Liderança disciplinada, ordem e leitura tática.","#a4b4e3","airgroove"],
 ["narita-brian","Narita Brian","Lendas","Guerreiro","","Centauro","brawler","Sombra voraz","Poder de ataque contínuo e pressão devastadora.","#888b94","naritabrian"],
 ["sakura-bakushin-o","Sakura Bakushin O","Lendas","Lutador","Atleta","Moreau do Coelho","speed","BAKUSHIN!","Pura velocidade em linha reta e entusiasmo inabalável.","#f0b19e","sakurabakushino"],
 ["haru-urara","Haru Urara","Lendas","Lutador","Atleta","Moreau do Coelho","racer","Alegria sem vitórias","Esforço, resistência emocional e cooperação.","#e4a8b1","haruurara"],
 ["grass-wonder","Grass Wonder","Geração Dourada","Guerreiro","","Dahllan","finesse","Gentileza de aço","Calma, técnica refinada e precisão decisiva.","#8cafac","grasswonder"],
 ["el-condor-pasa","El Condor Pasa","Geração Dourada","Lutador","","Moreau do Leão","brawler","Luchadora invencível","Luta corporal, máscara e carisma atlético.","#e8ae83","elcondorpasa"],
 ["king-halo","King Halo","Geração Dourada","Nobre","","Meio-Elfo","charisma","O sangue de primeira","Pressão social, dignidade e liderança elegante.","#95b3ad","kinghalo"],
 ["taiki-shuttle","Taiki Shuttle","Geração Dourada","Caçador","","Moreau da Raposa","racer","Sprint internacional","Velocidade de aproximação e ataques à distância.","#d5ad95","taikishuttle"],
 ["hishi-amazon","Hishi Amazon","Lendas","Guerreiro","","Moreau do Leão","brawler","Rainha da academia","Força, rivalidade e proteção de colegas.","#c991a4","hishiamazon"],
 ["fuji-kiseki","Fuji Kiseki","Lendas","Bardo","","Qareen","charisma","Espetáculo da pista","Presença teatral e inspiração social.","#d09da8","fujikiseki"],
 ["seiun-sky","Seiun Sky","Geração Dourada","Ladino","","Moreau da Raposa","finesse","Preguiça calculista","Armadilhas táticas e vantagens por posicionamento.","#8eb6d0","seiunsky"],
 ["nishino-flower","Nishino Flower","Geração Dourada","Bardo","","Meio-Elfo","charisma","Gentileza floral","Apoio positivo e motivação que não ignora regras de magia.","#e7c6c2","nishinoflower"],
 ["curren-chan","Curren Chan","Lendas","Bardo","","Moreau do Gato","charisma","Fofura estratégica","Autoconfiança, atuação e leitura social.","#e6aec5","currenchan"],
 ["narita-top-road","Narita Top Road","Road to the Top","Lutador","Atleta","Centauro","racer","Rumo ao topo","Treino dedicado, resistência e precisão de trajetória.","#d8ac95","naritatoproad"],
 ["admire-vega","Admire Vega","Road to the Top","Ladino","","Suraggel Sulfure","finesse","Estrela solitária","Mobilidade discreta e gerenciamento de riscos.","#8f8cab","admirevega"],
 ["tm-opera-o","T.M. Opera O","Road to the Top","Bardo","","Qareen","charisma","O teatro da vitória","Carisma performático e liderança extravagante.","#ddaf66","tmoperao"],
 ["meisho-doto","Meisho Doto","Road to the Top","Clérigo","","Moreau do Coelho","support","Gentileza resiliente","Resistência tímida e auxílio em horas difíceis.","#9fb7ba","meishodoto"],
 ["jungle-pocket","Jungle Pocket","Nova Era","Guerreiro","","Moreau do Leão","brawler","Vontade selvagem","Combate determinado e arrancada na hora decisiva.","#d59a7f","junglepocket"],
 ["agnes-tachyon","Agnes Tachyon","Nova Era","Inventor","","Elfo","tactician","Ciência da velocidade","Preparações, experimentos e engenharia de desempenho.","#b8c6cc","agnestachyon"],
 ["manhattan-cafe","Manhattan Cafe","Nova Era","Arcanista","","Suraggel Sulfure","mind","Café e presenças ocultas","Magias sutis e leitura do sobrenatural com custos reais.","#9da1b1","manhattancafe"],
 ["dantsu-flame","Dantsu Flame","Nova Era","Lutador","Atleta","Centauro","endurance","Chama de perseverança","Treino incansável e avanços no segundo tempo.","#cb8b81","dantsuflame"]
 ];
 const pictures={
 "special-week":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/e529e8ff6a1746fa8a3af030c65f0cc4/specialweek_02_2.png",
 "silence-suzuka":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/7296e365fcfe47709048d7152f5020cb/silencesuzuka_02.png",
 "tokai-teio":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/22d0e81b38644f22bbe1714c3125ff23/tokaiteio_02.png",
 "mejiro-mcqueen":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/d7e165c2452344e7ac47467513fd53ba/mejiromcqueen_02.png",
 "gold-ship":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/a3e95391f9f84d539da524afd78264f0/goldship_02.png",
 "kitasan-black":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/8df216d476cb4ccfb67b6d47cb85167f/kitasanblack_02.png",
 "satono-diamond":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/73515e5e8dc34bd8ab2bf1d410782b2d/satonodiamond_02.png",
 "oguri-cap":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/82b20a3edaaf424c8aece70590a9d7e2/oguricap_02.png",
 "daitaku-helios":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/07320f4d49f840448c268aaa630747f2/daitakuhelios_02.png",
 "matikanetannhauser":"https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/f859d3a9353645a1a78972704657c489/matikanetannhauser_02.png"
 };
 window.T20_UMA_SEEDS=p.map(([slug,name,arc,klass,variant,race,focus,title,concept,color,officialSlug])=>({
  id:"uma-"+slug,slug,name,arc,klass,variant,race,focus,title,concept,color,
  official:"https://umamusume.jp/character/"+officialSlug,
  image:pictures[slug]||null
 }));
})();
