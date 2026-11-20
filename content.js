/* ===== Course content: European Portuguese (pt-PT) only =====
   Spelling follows the 1990 Orthographic Agreement as used in Portugal
   (facto, contacto, receção, ótimo, fatura). `nf` lists forms that are
   not used in Portugal; typed answers using them are marked wrong. */

const UNITS = [
{
  id: "u1", pt: "Olá!", en: "Greetings & basics",
  note: `<p><b>Obrigado / obrigada</b> agrees with <i>the person speaking</i>: men say <b>obrigado</b>, women say <b>obrigada</b>.</p>
<p><b>Como estás?</b> uses <b>tu</b> (friends, family, people your age). <b>Como está?</b> is the polite form for strangers and older people.</p>
<p>In Portugal the little word <b>me</b> goes <i>after</i> the verb in a plain statement: <b>Chamo-me Ana</b>. After a question word or <b>não</b> it moves in front: <b>Como te chamas?</b>, <b>Não me lembro</b>.</p>
<p><b>Até já</b> means "see you in a minute" and is extremely common in Portugal.</p>`,
  words: [
    { pt: "olá", en: "hello" },
    { pt: "bom dia", en: "good morning" },
    { pt: "boa tarde", en: "good afternoon" },
    { pt: "boa noite", en: "good evening / good night" },
    { pt: "adeus", en: "goodbye" },
    { pt: "até logo", en: "see you later" },
    { pt: "até já", en: "see you in a bit", tip: "Very Portuguese: you'll see the person again soon, often within minutes." },
    { pt: "até amanhã", en: "see you tomorrow" },
    { pt: "obrigado", en: "thank you (said by a man)", alt: ["obrigada"] },
    { pt: "obrigada", en: "thank you (said by a woman)", alt: ["obrigado"] },
    { pt: "por favor", en: "please" },
    { pt: "desculpe", en: "sorry / excuse me (polite)" },
    { pt: "com licença", en: "excuse me (to get past)" },
    { pt: "de nada", en: "you're welcome" },
    { pt: "sim", en: "yes" },
    { pt: "não", en: "no" }
  ],
  phrases: [
    { pt: "Tudo bem?", en: "How's it going?" },
    { pt: "Como estás?", en: "How are you? (informal)" },
    { pt: "Como está?", en: "How are you? (polite)" },
    { pt: "Estou bem, obrigado.", en: "I'm fine, thank you.", alt: ["Estou bem, obrigada."] },
    { pt: "Muito prazer.", en: "Nice to meet you." },
    { pt: "Chamo-me Ana.", en: "My name is Ana.", tip: "In a plain statement, me goes after the verb: Chamo-me." },
    { pt: "Como te chamas?", en: "What's your name? (informal)" },
    { pt: "Como se chama?", en: "What's your name? (polite)" }
  ]
},
{
  id: "u2", pt: "Eu sou…", en: "People & the verb ser",
  note: `<p>Portuguese usually drops the subject: <b>Sou estudante</b> already means "I am a student".</p>
<p><b>Tu</b> is the normal informal "you" in Portugal. With strangers use <b>o senhor</b> / <b>a senhora</b>, or simply the verb without any pronoun: <b>É do Porto?</b></p>
<p>Calling someone <b>você</b> to their face can sound cold or even rude in Portugal, so avoid it while you're learning. <b>Vocês</b> (plural "you") is completely normal.</p>
<p><b>Ser</b> = to be (identity, origin, profession): sou, és, é, somos, são.</p>`,
  words: [
    { pt: "eu", en: "I" },
    { pt: "tu", en: "you (informal)" },
    { pt: "ele", en: "he" },
    { pt: "ela", en: "she" },
    { pt: "nós", en: "we" },
    { pt: "eles", en: "they (men / mixed group)" },
    { pt: "elas", en: "they (women)" },
    { pt: "vocês", en: "you (plural)" },
    { pt: "o senhor", en: "you (polite, to a man)" },
    { pt: "a senhora", en: "you (polite, to a woman)" },
    { pt: "sou", en: "I am" },
    { pt: "és", en: "you are (informal)" },
    { pt: "somos", en: "we are" },
    { pt: "são", en: "they are" },
    { pt: "o amigo", en: "friend (male)", alt: ["amigo"] },
    { pt: "a amiga", en: "friend (female)", alt: ["amiga"] }
  ],
  phrases: [
    { pt: "Eu sou estudante.", en: "I am a student.", alt: ["Sou estudante."] },
    { pt: "Tu és português?", en: "Are you Portuguese? (to a man, informal)" },
    { pt: "Ela é portuguesa.", en: "She is Portuguese." },
    { pt: "Nós somos amigos.", en: "We are friends.", alt: ["Somos amigos."] },
    { pt: "De onde és?", en: "Where are you from? (informal)" },
    { pt: "Sou de Inglaterra.", en: "I'm from England." },
    { pt: "Eles são de Lisboa.", en: "They are from Lisbon." },
    { pt: "O senhor é do Porto?", en: "Are you from Porto? (polite, to a man)" }
  ]
},
{
  id: "u3", pt: "Números", en: "Numbers & age",
  note: `<p><b>Um / uma</b> and <b>dois / duas</b> change with gender: <b>um café</b>, <b>uma água</b>, <b>dois cafés</b>, <b>duas águas</b>.</p>
<p>Watch the spelling of 16, 17 and 19: <b>dezasseis, dezassete, dezanove</b>.</p>
<p>Age uses <b>ter</b> (to have): <b>Tenho vinte anos</b> = "I have twenty years".</p>
<p>In Portugal a possessive takes the article: <b>o meu número</b>, <b>a minha casa</b>.</p>`,
  words: [
    { pt: "zero", en: "zero" },
    { pt: "um", en: "one", alt: ["uma"] },
    { pt: "dois", en: "two", alt: ["duas"] },
    { pt: "três", en: "three" },
    { pt: "quatro", en: "four" },
    { pt: "cinco", en: "five" },
    { pt: "seis", en: "six" },
    { pt: "sete", en: "seven" },
    { pt: "oito", en: "eight" },
    { pt: "nove", en: "nine" },
    { pt: "dez", en: "ten" },
    { pt: "onze", en: "eleven" },
    { pt: "doze", en: "twelve" },
    { pt: "treze", en: "thirteen" },
    { pt: "catorze", en: "fourteen" },
    { pt: "quinze", en: "fifteen" },
    { pt: "dezasseis", en: "sixteen", nf: ["dezesseis"] },
    { pt: "dezassete", en: "seventeen", nf: ["dezessete"] },
    { pt: "dezoito", en: "eighteen" },
    { pt: "dezanove", en: "nineteen", nf: ["dezenove"] },
    { pt: "vinte", en: "twenty" },
    { pt: "trinta", en: "thirty" },
    { pt: "cem", en: "one hundred" }
  ],
  phrases: [
    { pt: "Tenho vinte anos.", en: "I am twenty years old." },
    { pt: "Quantos anos tens?", en: "How old are you? (informal)" },
    { pt: "O meu número é nove, um, dois.", en: "My number is nine, one, two." },
    { pt: "São dez euros.", en: "That's ten euros." },
    { pt: "Tenho dois irmãos.", en: "I have two brothers." }
  ]
},
{
  id: "u4", pt: "No café", en: "At the café",
  note: `<p>Order with <b>Queria…</b> ("I would like…"). It's the normal polite form in Portugal; <b>Quero</b> sounds blunt.</p>
<p><b>Um café</b> in Portugal is an espresso. In Lisbon people also say <b>uma bica</b>; in Porto, <b>um cimbalino</b>.</p>
<p>Breakfast is <b>o pequeno-almoço</b>. Juice is <b>sumo</b>.</p>
<p>Ask for water and you'll hear <b>Fresca ou natural?</b> (chilled or room temperature).</p>`,
  words: [
    { pt: "um café", en: "an espresso", tip: "In Lisbon also uma bica; in Porto um cimbalino." },
    { pt: "uma bica", en: "an espresso (Lisbon)" },
    { pt: "um galão", en: "a milky coffee in a glass" },
    { pt: "uma meia de leite", en: "half coffee, half milk (in a cup)" },
    { pt: "um pastel de nata", en: "a custard tart" },
    { pt: "uma torrada", en: "a slice of buttered toast" },
    { pt: "uma tosta mista", en: "a toasted ham and cheese sandwich" },
    { pt: "um sumo de laranja", en: "an orange juice" },
    { pt: "uma água", en: "a water" },
    { pt: "um copo", en: "a glass" },
    { pt: "a conta", en: "the bill" },
    { pt: "o pequeno-almoço", en: "breakfast" },
    { pt: "o almoço", en: "lunch" },
    { pt: "o jantar", en: "dinner" }
  ],
  phrases: [
    { pt: "Queria um café, por favor.", en: "I'd like an espresso, please." },
    { pt: "Quanto é?", en: "How much is it?" },
    { pt: "Pode trazer a conta, por favor?", en: "Can you bring the bill, please?" },
    { pt: "Para beber?", en: "Anything to drink?" },
    { pt: "Mais alguma coisa?", en: "Anything else?" },
    { pt: "Só isso, obrigado.", en: "Just that, thanks.", alt: ["Só isso, obrigada."] },
    { pt: "É para levar.", en: "It's to take away." },
    { pt: "Fresca ou natural?", en: "Chilled or room temperature?" }
  ]
},
{
  id: "u5", pt: "Na cidade", en: "Getting around",
  note: `<p><b>Ficar</b> gives the location of things that don't move: <b>Onde fica a estação?</b></p>
<p>Little words merge: <b>de + o = do</b>, <b>em + a = na</b>, <b>a + a = à</b>. So: <b>à esquerda</b>, <b>na rua</b>, <b>perto do metro</b>.</p>
<p>In Lisbon you get around by <b>o metro</b>, <b>o autocarro</b>, <b>o elétrico</b> (the famous 28 tram) and <b>o comboio</b> to Sintra or Cascais.</p>`,
  words: [
    { pt: "o comboio", en: "the train", alt: ["comboio"], nf: ["trem"] },
    { pt: "o autocarro", en: "the bus", alt: ["autocarro"], nf: ["ônibus"] },
    { pt: "o metro", en: "the metro", alt: ["metro"] },
    { pt: "o elétrico", en: "the tram", alt: ["elétrico"] },
    { pt: "a estação", en: "the station", alt: ["estação"] },
    { pt: "a paragem", en: "the bus stop", alt: ["paragem"] },
    { pt: "o bilhete", en: "the ticket", alt: ["bilhete"] },
    { pt: "a rua", en: "the street", alt: ["rua"] },
    { pt: "à esquerda", en: "on the left" },
    { pt: "à direita", en: "on the right" },
    { pt: "em frente", en: "straight ahead" },
    { pt: "perto", en: "near" },
    { pt: "longe", en: "far" },
    { pt: "a casa de banho", en: "the toilet", alt: ["casa de banho"], nf: ["banheiro"] }
  ],
  phrases: [
    { pt: "Onde fica a estação?", en: "Where is the station?" },
    { pt: "Onde é a casa de banho?", en: "Where is the toilet?" },
    { pt: "Um bilhete para o Porto, por favor.", en: "A ticket to Porto, please." },
    { pt: "Vire à esquerda.", en: "Turn left. (polite)" },
    { pt: "Siga em frente.", en: "Go straight ahead. (polite)" },
    { pt: "É perto daqui?", en: "Is it near here?" },
    { pt: "A que horas parte o comboio?", en: "What time does the train leave?" },
    { pt: "Estou perdido.", en: "I'm lost. (said by a man)", alt: ["Estou perdida."] }
  ]
},
{
  id: "u6", pt: "Casa e família", en: "Home & family",
  note: `<p>Possessives keep the article in Portugal: <b>a minha mãe</b>, <b>o meu pai</b>, <b>os meus pais</b>.</p>
<p><b>Num</b> = em + um: <b>Moro num apartamento</b>.</p>
<p>Flats are described by bedrooms: a <b>T2</b> has two bedrooms, a <b>T0</b> is a studio. You'll see this in every rental advert.</p>
<p>The fridge is <b>o frigorífico</b>.</p>`,
  words: [
    { pt: "a casa", en: "the house / home", alt: ["casa"] },
    { pt: "o quarto", en: "the bedroom", alt: ["quarto"] },
    { pt: "a cozinha", en: "the kitchen", alt: ["cozinha"] },
    { pt: "a sala", en: "the living room", alt: ["sala"] },
    { pt: "o frigorífico", en: "the fridge", alt: ["frigorífico"], nf: ["geladeira"] },
    { pt: "a mãe", en: "the mother", alt: ["mãe"] },
    { pt: "o pai", en: "the father", alt: ["pai"] },
    { pt: "os pais", en: "the parents", alt: ["pais"] },
    { pt: "o irmão", en: "the brother", alt: ["irmão"] },
    { pt: "a irmã", en: "the sister", alt: ["irmã"] },
    { pt: "o filho", en: "the son", alt: ["filho"] },
    { pt: "a filha", en: "the daughter", alt: ["filha"] },
    { pt: "o avô", en: "the grandfather", alt: ["avô"] },
    { pt: "a avó", en: "the grandmother", alt: ["avó"] },
    { pt: "o marido", en: "the husband", alt: ["marido"] },
    { pt: "a mulher", en: "the wife / the woman", alt: ["mulher"] }
  ],
  phrases: [
    { pt: "Esta é a minha mãe.", en: "This is my mother." },
    { pt: "Tens filhos?", en: "Do you have children? (informal)" },
    { pt: "Moro num apartamento.", en: "I live in a flat." },
    { pt: "A minha casa é pequena.", en: "My house is small." },
    { pt: "O meu pai chama-se João.", en: "My father is called João." },
    { pt: "Procuro um T2 em Lisboa.", en: "I'm looking for a two-bedroom flat in Lisbon." }
  ]
},
{
  id: "u7", pt: "À mesa", en: "Food & restaurants",
  note: `<p><b>Gostar</b> always takes <b>de</b>: <b>Gosto de peixe</b>, <b>Gosto do bacalhau</b> (de + o).</p>
<p>The menu is <b>a ementa</b>. Bread, olives or cheese brought to your table before you order (<b>o couvert</b>) are charged if you eat them.</p>
<p><b>Fiambre</b> is cooked ham; <b>presunto</b> is cured ham.</p>`,
  words: [
    { pt: "o pão", en: "bread", alt: ["pão"] },
    { pt: "o queijo", en: "cheese", alt: ["queijo"] },
    { pt: "o fiambre", en: "cooked ham", alt: ["fiambre"] },
    { pt: "o presunto", en: "cured ham", alt: ["presunto"] },
    { pt: "o peixe", en: "fish", alt: ["peixe"] },
    { pt: "a carne", en: "meat", alt: ["carne"] },
    { pt: "o bacalhau", en: "salt cod", alt: ["bacalhau"] },
    { pt: "o frango", en: "chicken", alt: ["frango"] },
    { pt: "o arroz", en: "rice", alt: ["arroz"] },
    { pt: "as batatas", en: "potatoes", alt: ["batatas"] },
    { pt: "a sopa", en: "soup", alt: ["sopa"] },
    { pt: "a sobremesa", en: "dessert", alt: ["sobremesa"] },
    { pt: "a ementa", en: "the menu", alt: ["ementa"], nf: ["cardápio"] },
    { pt: "o prato do dia", en: "the dish of the day", alt: ["prato do dia"] },
    { pt: "o vinho", en: "wine", alt: ["vinho"] }
  ],
  phrases: [
    { pt: "Uma mesa para dois, por favor.", en: "A table for two, please." },
    { pt: "A ementa, por favor.", en: "The menu, please." },
    { pt: "Qual é o prato do dia?", en: "What's the dish of the day?" },
    { pt: "Gosto muito de peixe.", en: "I really like fish." },
    { pt: "Não como carne.", en: "I don't eat meat." },
    { pt: "Sou vegetariano.", en: "I'm vegetarian. (man)", alt: ["Sou vegetariana."] },
    { pt: "Estava ótimo!", en: "It was excellent!" }
  ]
},
{
  id: "u8", pt: "O dia a dia", en: "Daily life & estar a",
  note: `<p>To say what's happening right now, Portugal uses <b>estar a + infinitive</b>: <b>Estou a trabalhar</b> ("I'm working").</p>
<p>You'll hear the <i>-ndo</i> form in parts of the Alentejo and Algarve, but <b>estar a</b> is the standard to learn.</p>
<p><b>Morar</b> and <b>viver</b> both mean "to live (somewhere)".</p>`,
  words: [
    { pt: "trabalhar", en: "to work" },
    { pt: "estudar", en: "to study" },
    { pt: "comer", en: "to eat" },
    { pt: "beber", en: "to drink" },
    { pt: "dormir", en: "to sleep" },
    { pt: "ler", en: "to read" },
    { pt: "falar", en: "to speak" },
    { pt: "viver", en: "to live" },
    { pt: "morar", en: "to live (reside)" },
    { pt: "gostar de", en: "to like" },
    { pt: "fazer", en: "to do / to make" },
    { pt: "aprender", en: "to learn" },
    { pt: "acordar", en: "to wake up" },
    { pt: "sair", en: "to go out" }
  ],
  phrases: [
    { pt: "Estou a aprender português.", en: "I'm learning Portuguese.", tip: "Estar a + infinitive is how Portugal says -ing." },
    { pt: "Estás a trabalhar?", en: "Are you working? (informal)" },
    { pt: "Ela está a dormir.", en: "She is sleeping." },
    { pt: "O que estás a fazer?", en: "What are you doing? (informal)" },
    { pt: "Falo um pouco de português.", en: "I speak a little Portuguese." },
    { pt: "Moro em Lisboa.", en: "I live in Lisbon.", alt: ["Vivo em Lisboa."] },
    { pt: "Acordo às sete.", en: "I wake up at seven." },
    { pt: "Pode falar mais devagar, por favor?", en: "Can you speak more slowly, please?" }
  ]
},
{
  id: "u9", pt: "Tempo e horas", en: "Days & time",
  note: `<p><b>É uma hora</b> (singular) but <b>São duas horas</b>, <b>São três e meia</b>.</p>
<p>Weekdays are written in lower case: <b>segunda-feira</b>. In speech people often drop <i>-feira</i>: <b>Até segunda!</b></p>
<p>Timetables use the 24-hour clock: <b>às 18h30</b> is read <b>às dezoito e trinta</b>.</p>`,
  words: [
    { pt: "hoje", en: "today" },
    { pt: "amanhã", en: "tomorrow" },
    { pt: "ontem", en: "yesterday" },
    { pt: "de manhã", en: "in the morning" },
    { pt: "à tarde", en: "in the afternoon" },
    { pt: "à noite", en: "at night" },
    { pt: "segunda-feira", en: "Monday" },
    { pt: "terça-feira", en: "Tuesday" },
    { pt: "quarta-feira", en: "Wednesday" },
    { pt: "quinta-feira", en: "Thursday" },
    { pt: "sexta-feira", en: "Friday" },
    { pt: "sábado", en: "Saturday" },
    { pt: "domingo", en: "Sunday" },
    { pt: "o fim de semana", en: "the weekend", alt: ["fim de semana"] },
    { pt: "a semana", en: "the week", alt: ["semana"] },
    { pt: "o mês", en: "the month", alt: ["mês"] }
  ],
  phrases: [
    { pt: "Que horas são?", en: "What time is it?" },
    { pt: "É uma hora.", en: "It's one o'clock." },
    { pt: "São três e meia.", en: "It's half past three." },
    { pt: "São dez para as cinco.", en: "It's ten to five." },
    { pt: "Hoje é sexta-feira.", en: "Today is Friday." },
    { pt: "Até segunda!", en: "See you on Monday!" },
    { pt: "Amanhã de manhã.", en: "Tomorrow morning." }
  ]
},
{
  id: "u10", pt: "Às compras", en: "Shopping",
  note: `<p>At almost every till you'll be asked <b>Quer fatura com contribuinte?</b>: do you want your tax number (<b>NIF</b>) on the receipt?</p>
<p><b>Multibanco</b> is the Portuguese card and cash-machine network. "Can I pay by card?" = <b>Posso pagar com cartão?</b></p>
<p>Your mobile phone is <b>o telemóvel</b>, and the butcher's is <b>o talho</b>.</p>`,
  words: [
    { pt: "a loja", en: "the shop", alt: ["loja"] },
    { pt: "o supermercado", en: "the supermarket", alt: ["supermercado"] },
    { pt: "a farmácia", en: "the pharmacy", alt: ["farmácia"] },
    { pt: "a pastelaria", en: "the pastry shop", alt: ["pastelaria"] },
    { pt: "o talho", en: "the butcher's", alt: ["talho"], nf: ["açougue"] },
    { pt: "o dinheiro", en: "money", alt: ["dinheiro"] },
    { pt: "o cartão", en: "the card", alt: ["cartão"] },
    { pt: "caro", en: "expensive" },
    { pt: "barato", en: "cheap" },
    { pt: "o saco", en: "the bag", alt: ["saco"] },
    { pt: "o telemóvel", en: "the mobile phone", alt: ["telemóvel"], nf: ["celular"] },
    { pt: "o tamanho", en: "the size", alt: ["tamanho"] },
    { pt: "a fatura", en: "the receipt", alt: ["fatura"] }
  ],
  phrases: [
    { pt: "Quanto custa?", en: "How much does it cost?" },
    { pt: "Posso pagar com cartão?", en: "Can I pay by card?" },
    { pt: "Quer fatura com contribuinte?", en: "Do you want your tax number on the receipt?" },
    { pt: "É muito caro.", en: "It's very expensive." },
    { pt: "Só estou a ver, obrigado.", en: "I'm just looking, thanks.", alt: ["Só estou a ver, obrigada."] },
    { pt: "Tem um tamanho maior?", en: "Do you have a bigger size?" },
    { pt: "Precisa de saco?", en: "Do you need a bag?" }
  ]
},
{
  id: "u11", pt: "Como um português", en: "Sound like a local",
  note: `<p><b>Pois</b> does a lot of work: "yes", "right", "exactly", "I know". <b>Pois, pois</b> can also mean "yeah, sure" (doubtful).</p>
<p><b>Rapariga</b> and <b>rapaz</b> are the everyday words for girl and boy; <b>miúdo / miúda</b> is a kid.</p>
<p><b>Bué</b> ("loads", "really") is Lisbon slang: <b>bué fixe</b> = really cool.</p>
<p><b>Se calhar</b> = maybe. You'll hear it constantly.</p>`,
  words: [
    { pt: "fixe", en: "cool" },
    { pt: "giro", en: "nice / cute", alt: ["gira"] },
    { pt: "pois", en: "right / yeah / indeed" },
    { pt: "se calhar", en: "maybe" },
    { pt: "está bem", en: "OK", alt: ["tá bem"] },
    { pt: "já está", en: "done / that's it" },
    { pt: "o miúdo", en: "the kid", alt: ["miúdo", "a miúda"] },
    { pt: "a rapariga", en: "the girl", alt: ["rapariga"] },
    { pt: "o rapaz", en: "the boy", alt: ["rapaz"] },
    { pt: "bué", en: "loads / really (slang)" },
    { pt: "ora essa", en: "not at all / don't mention it" },
    { pt: "a sério?", en: "really?", alt: ["a sério"] }
  ],
  phrases: [
    { pt: "Isso é muito fixe!", en: "That's really cool!" },
    { pt: "Pois, pois.", en: "Yeah, right." },
    { pt: "Se calhar vou amanhã.", en: "Maybe I'll go tomorrow." },
    { pt: "Vamos embora?", en: "Shall we go?" },
    { pt: "Não faz mal.", en: "It doesn't matter." },
    { pt: "Tenho saudades tuas.", en: "I miss you. (informal)" },
    { pt: "Bom fim de semana!", en: "Have a good weekend!" }
  ]
}
];

/* ===== Verbs, ranked by real usage =====
   Ranking and counts: CLUL "Multifunctional Computational Lexicon of Contemporary Portuguese",
   a 16.2-million-word European Portuguese corpus (newspapers, 186 works of Portuguese literature,
   technical and school books, and speech). A few lemmatisation artefacts in the source
   (formar, reservar, cercar, fossar) are left out. Tenses: present, preterite, imperfect.
   Portugal writes -ámos in the preterite of -ar verbs (falámos) and -amos in the present (falamos). */
const PERSONS = ["eu", "tu", "ele / ela", "nós", "eles / elas"];
const TENSES = { pres: "Present", perf: "Past (preterite)", imp: "Imperfect" };

const VERB_FREQ = [
["ser",333747],["ter",117212],["estar",65520],["fazer",47273],["ir",45510],["haver",42560],["poder",42138],["dizer",39890],["dar",27265],["ver",23316],
["dever",22034],["saber",21639],["querer",20593],["ficar",18031],["vir",17884],["passar",15936],["deixar",12979],["encontrar",12785],["chegar",12042],["falar",10202],
["levar",10145],["começar",10132],["parecer",10094],["considerar",8509],["continuar",8488],["apresentar",8422],["conhecer",8329],["pensar",8140],["conseguir",7872],["partir",7650],
["pôr",7613],["acabar",7532],["chamar",7518],["existir",7303],["sentir",7271],["tornar",7182],["viver",7163],["referir",7061],["entrar",6931],["sair",6656],
["voltar",6565],["seguir",6482],["ouvir",6448],["criar",6439],["manter",6301],["gostar",6243],["permitir",6046],["andar",5919],["tratar",5774],["perder",5741],
["receber",5682],["tomar",5624],["olhar",5595],["contar",5521],["acontecer",5519],["afirmar",5451],["constituir",5288],["abrir",5271],["mostrar",5186],["ganhar",5183],
["achar",5181],["esperar",5057],["trabalhar",4986],["pedir",4953],["realizar",4951],["utilizar",4887],["servir",4728],["escrever",4533],["representar",4520],["ler",4409],
["tentar",4403],["pagar",4388],["aparecer",4309],["cair",4208],["correr",4158],["colocar",4138],["morrer",4110],["surgir",4042],["lembrar",4033],["trazer",4000],
["prever",3956],["procurar",3938],["atingir",3926],["explicar",3919],["verificar",3867],["marcar",3733],["obter",3593],["responder",3557],["pretender",3544],["incluir",3491],
["defender",3480],["garantir",3428],["ligar",3421],["usar",3394],["aumentar",3377],["acompanhar",3293],["revelar",3265],["provocar",3130],["decidir",3122],["lançar",3103],
["tirar",3101],["subir",3090],["estabelecer",3059],["resolver",3051],["desenvolver",3049],["levantar",3037],["perguntar",3028],["construir",3020],["sofrer",2994],["preparar",2991],
["precisar",2976],["nascer",2965],["entender",2963],["bater",2958],["aceitar",2902],["obrigar",2887],["anunciar",2880],["esquecer",2858],["registar",2826],["mudar",2823],
["mandar",2821],["acrescentar",2819],["assumir",2805],["vencer",2743],["compreender",2740],["escolher",2659],["comprar",2641],["reconhecer",2636],["juntar",2617],["vender",2597],
["envolver",2584],["comer",2557],["concluir",2540],["dirigir",2540],["perceber",2527],["acusar",2517],["terminar",2496],["iniciar",2490],["jogar",2489],["transformar",2484],
["faltar",2451],["cumprir",2439],["exigir",2437],["fechar",2432],["apontar",2427],["evitar",2421],["produzir",2409],["admitir",2400],["sentar",2393],["oferecer",2392],
["definir",2378],["ajudar",2369],["indicar",2367],["parar",2359],["acreditar",2358],["descobrir",2339],["recordar",2325],["situar",2325],["ocupar",2305],["descer",2290],
["meter",2288],["integrar",2285],["participar",2279],["aplicar",2272],["decorrer",2267],["matar",2249],["estudar",2229],["observar",2200],["valer",2194],["aproveitar",2193],
["entregar",2188],["regressar",2188],["funcionar",2172],["reunir",2172],["ocorrer",2167],["efetuar",2137],["avançar",2130],["tocar",2126],["julgar",2117],["confirmar",2114],
["deitar",2111],["fugir",2094],["publicar",2091],["impor",2060],["retirar",2053]
];
/* Everyday verbs from the course that fall outside the top 185 of the corpus. */
const VERB_EXTRAS = ["morar", "jantar", "beber", "aprender", "acordar", "dormir"];

const VERB_EN = {
ser:"to be (permanent)",ter:"to have",estar:"to be (temporary)",fazer:"to do / make",ir:"to go",haver:"there is / to have (aux.)",poder:"to be able to, can",dizer:"to say, to tell",dar:"to give",ver:"to see",
dever:"must, should; to owe",saber:"to know (facts, how to)",querer:"to want",ficar:"to stay; to be located; to become",vir:"to come",passar:"to pass; to spend (time)",deixar:"to leave; to let",encontrar:"to find; to meet",chegar:"to arrive",falar:"to speak",
levar:"to take, to carry",começar:"to begin",parecer:"to seem",considerar:"to consider",continuar:"to continue",apresentar:"to present, to introduce",conhecer:"to know (people, places)",pensar:"to think",conseguir:"to manage to, to get",partir:"to leave; to break",
"pôr":"to put",acabar:"to finish",chamar:"to call",existir:"to exist",sentir:"to feel",tornar:"to become; to make",viver:"to live",referir:"to mention, to refer",entrar:"to enter",sair:"to go out, to leave",
voltar:"to come back",seguir:"to follow",ouvir:"to hear, to listen",criar:"to create; to raise",manter:"to keep, to maintain",gostar:"to like",permitir:"to allow",andar:"to walk; to go around",tratar:"to deal with; to treat",perder:"to lose; to miss",
receber:"to receive",tomar:"to take; to have (a drink)",olhar:"to look",contar:"to count; to tell",acontecer:"to happen",afirmar:"to state, to claim",constituir:"to make up, to constitute",abrir:"to open",mostrar:"to show",ganhar:"to win; to earn",
achar:"to think (opinion); to find",esperar:"to wait; to hope",trabalhar:"to work",pedir:"to ask for, to order",realizar:"to carry out; to achieve",utilizar:"to use",servir:"to serve",escrever:"to write",representar:"to represent",ler:"to read",
tentar:"to try",pagar:"to pay",aparecer:"to appear",cair:"to fall",correr:"to run",colocar:"to place, to put",morrer:"to die",surgir:"to arise, to emerge",lembrar:"to remember; to remind",trazer:"to bring",
prever:"to foresee, to predict",procurar:"to look for",atingir:"to reach",explicar:"to explain",verificar:"to check",marcar:"to mark; to book; to score",obter:"to obtain",responder:"to answer",pretender:"to intend",incluir:"to include",
defender:"to defend",garantir:"to guarantee",ligar:"to call (phone); to switch on",usar:"to use; to wear",aumentar:"to increase",acompanhar:"to go with; to follow",revelar:"to reveal",provocar:"to cause, to provoke",decidir:"to decide",lançar:"to launch; to throw",
tirar:"to take out; to take (a photo)",subir:"to go up",estabelecer:"to establish",resolver:"to solve",desenvolver:"to develop",levantar:"to lift; to withdraw (money)",perguntar:"to ask (a question)",construir:"to build",sofrer:"to suffer",preparar:"to prepare",
precisar:"to need",nascer:"to be born",entender:"to understand",bater:"to hit; to knock",aceitar:"to accept",obrigar:"to force, to oblige",anunciar:"to announce",esquecer:"to forget",registar:"to register, to record",mudar:"to change; to move",
mandar:"to send; to order",acrescentar:"to add",assumir:"to take on, to assume",vencer:"to win, to beat",compreender:"to understand",escolher:"to choose",comprar:"to buy",reconhecer:"to recognise",juntar:"to join, to put together",vender:"to sell",
envolver:"to involve",comer:"to eat",concluir:"to conclude",dirigir:"to direct; to drive",perceber:"to understand, to get",acusar:"to accuse",terminar:"to finish",iniciar:"to begin",jogar:"to play (a game)",transformar:"to transform",
faltar:"to be missing; to skip",cumprir:"to fulfil, to keep (a promise)",exigir:"to demand",fechar:"to close",apontar:"to point; to note down",evitar:"to avoid",produzir:"to produce",admitir:"to admit",sentar:"to sit",oferecer:"to offer; to give (a gift)",
definir:"to define",ajudar:"to help",indicar:"to indicate",parar:"to stop",acreditar:"to believe",descobrir:"to discover, to find out",recordar:"to remember, to recall",situar:"to locate, to place",ocupar:"to occupy",descer:"to go down",
meter:"to put in",integrar:"to integrate, to be part of",participar:"to take part",aplicar:"to apply",decorrer:"to take place; to elapse",matar:"to kill",estudar:"to study",observar:"to observe",valer:"to be worth",aproveitar:"to make the most of",
entregar:"to deliver, to hand in",regressar:"to return",funcionar:"to work (function)",reunir:"to gather, to meet",ocorrer:"to occur",efetuar:"to carry out",avançar:"to move forward",tocar:"to touch; to play (music); to ring",julgar:"to judge; to think",confirmar:"to confirm",
deitar:"to lay down; to throw away",fugir:"to run away",publicar:"to publish",impor:"to impose",retirar:"to remove, to withdraw",
morar:"to live (reside)",jantar:"to have dinner",beber:"to drink",aprender:"to learn",acordar:"to wake up",dormir:"to sleep"
};

/* Fully irregular verbs */
const IRREGULAR = {
  ser:   { pres: ["sou","és","é","somos","são"], perf: ["fui","foste","foi","fomos","foram"], imp: ["era","eras","era","éramos","eram"] },
  estar: { pres: ["estou","estás","está","estamos","estão"], perf: ["estive","estiveste","esteve","estivemos","estiveram"], imp: ["estava","estavas","estava","estávamos","estavam"] },
  ter:   { pres: ["tenho","tens","tem","temos","têm"], perf: ["tive","tiveste","teve","tivemos","tiveram"], imp: ["tinha","tinhas","tinha","tínhamos","tinham"] },
  ir:    { pres: ["vou","vais","vai","vamos","vão"], perf: ["fui","foste","foi","fomos","foram"], imp: ["ia","ias","ia","íamos","iam"] },
  haver: { pres: ["hei","hás","há","havemos","hão"], perf: ["houve","houveste","houve","houvemos","houveram"], imp: ["havia","havias","havia","havíamos","haviam"] },
  fazer: { pres: ["faço","fazes","faz","fazemos","fazem"], perf: ["fiz","fizeste","fez","fizemos","fizeram"], imp: ["fazia","fazias","fazia","fazíamos","faziam"] },
  poder: { pres: ["posso","podes","pode","podemos","podem"], perf: ["pude","pudeste","pôde","pudemos","puderam"], imp: ["podia","podias","podia","podíamos","podiam"] },
  querer:{ pres: ["quero","queres","quer","queremos","querem"], perf: ["quis","quiseste","quis","quisemos","quiseram"], imp: ["queria","querias","queria","queríamos","queriam"] },
  dizer: { pres: ["digo","dizes","diz","dizemos","dizem"], perf: ["disse","disseste","disse","dissemos","disseram"], imp: ["dizia","dizias","dizia","dizíamos","diziam"] },
  ver:   { pres: ["vejo","vês","vê","vemos","veem"], perf: ["vi","viste","viu","vimos","viram"], imp: ["via","vias","via","víamos","viam"] },
  prever:{ pres: ["prevejo","prevês","prevê","prevemos","preveem"], perf: ["previ","previste","previu","previmos","previram"], imp: ["previa","previas","previa","prevíamos","previam"] },
  dar:   { pres: ["dou","dás","dá","damos","dão"], perf: ["dei","deste","deu","demos","deram"], imp: ["dava","davas","dava","dávamos","davam"] },
  saber: { pres: ["sei","sabes","sabe","sabemos","sabem"], perf: ["soube","soubeste","soube","soubemos","souberam"], imp: ["sabia","sabias","sabia","sabíamos","sabiam"] },
  vir:   { pres: ["venho","vens","vem","vimos","vêm"], perf: ["vim","vieste","veio","viemos","vieram"], imp: ["vinha","vinhas","vinha","vínhamos","vinham"] },
  "pôr": { pres: ["ponho","pões","põe","pomos","põem"], perf: ["pus","puseste","pôs","pusemos","puseram"], imp: ["punha","punhas","punha","púnhamos","punham"] },
  impor: { pres: ["imponho","impões","impõe","impomos","impõem"], perf: ["impus","impuseste","impôs","impusemos","impuseram"], imp: ["impunha","impunhas","impunha","impúnhamos","impunham"] },
  manter:{ pres: ["mantenho","manténs","mantém","mantemos","mantêm"], perf: ["mantive","mantiveste","manteve","mantivemos","mantiveram"], imp: ["mantinha","mantinhas","mantinha","mantínhamos","mantinham"] },
  obter: { pres: ["obtenho","obténs","obtém","obtemos","obtêm"], perf: ["obtive","obtiveste","obteve","obtivemos","obtiveram"], imp: ["obtinha","obtinhas","obtinha","obtínhamos","obtinham"] },
  trazer:{ pres: ["trago","trazes","traz","trazemos","trazem"], perf: ["trouxe","trouxeste","trouxe","trouxemos","trouxeram"], imp: ["trazia","trazias","trazia","trazíamos","traziam"] },
  ler:   { pres: ["leio","lês","lê","lemos","leem"], perf: ["li","leste","leu","lemos","leram"], imp: ["lia","lias","lia","líamos","liam"] },
  sair:  { pres: ["saio","sais","sai","saímos","saem"], perf: ["saí","saíste","saiu","saímos","saíram"], imp: ["saía","saías","saía","saíamos","saíam"] },
  cair:  { pres: ["caio","cais","cai","caímos","caem"], perf: ["caí","caíste","caiu","caímos","caíram"], imp: ["caía","caías","caía","caíamos","caíam"] },
  pedir: { pres: ["peço","pedes","pede","pedimos","pedem"], perf: ["pedi","pediste","pediu","pedimos","pediram"], imp: ["pedia","pedias","pedia","pedíamos","pediam"] },
  construir: { pres: ["construo","constróis","constrói","construímos","constroem"], perf: ["construí","construíste","construiu","construímos","construíram"], imp: ["construía","construías","construía","construíamos","construíam"] },
  produzir:  { pres: ["produzo","produzes","produz","produzimos","produzem"], perf: ["produzi","produziste","produziu","produzimos","produziram"], imp: ["produzia","produzias","produzia","produzíamos","produziam"] },
  dormir:{ pres: ["durmo","dormes","dorme","dormimos","dormem"], perf: ["dormi","dormiste","dormiu","dormimos","dormiram"], imp: ["dormia","dormias","dormia","dormíamos","dormiam"] }
};
/* -uir verbs like incluir: incluo, incluis, inclui, incluímos, incluem */
["incluir", "concluir", "constituir"].forEach(v => { const s = v.slice(0, -2);
  IRREGULAR[v] = { pres: [s + "o", s + "is", s + "i", s + "ímos", s + "em"], perf: [s + "í", s + "íste", s + "iu", s + "ímos", s + "íram"], imp: [s + "ía", s + "ías", s + "ía", s + "íamos", s + "íam"] }; });

/* Irregular only in the present tense */
const PRES_IRR = {
  sentir: ["sinto","sentes","sente","sentimos","sentem"],
  seguir: ["sigo","segues","segue","seguimos","seguem"],
  conseguir: ["consigo","consegues","consegue","conseguimos","conseguem"],
  servir: ["sirvo","serves","serve","servimos","servem"],
  referir: ["refiro","referes","refere","referimos","referem"],
  descobrir: ["descubro","descobres","descobre","descobrimos","descobrem"],
  subir: ["subo","sobes","sobe","subimos","sobem"],
  fugir: ["fujo","foges","foge","fugimos","fogem"],
  ouvir: ["ouço","ouves","ouve","ouvimos","ouvem"],
  perder: ["perco","perdes","perde","perdemos","perdem"],
  valer: ["valho","vales","vale","valemos","valem"],
  reunir: ["reúno","reúnes","reúne","reunimos","reúnem"]
};

const ENDINGS = {
  ar: { pres: ["o","as","a","amos","am"], perf: ["ei","aste","ou","ámos","aram"], imp: ["ava","avas","ava","ávamos","avam"] },
  er: { pres: ["o","es","e","emos","em"], perf: ["i","este","eu","emos","eram"], imp: ["ia","ias","ia","íamos","iam"] },
  ir: { pres: ["o","es","e","imos","em"], perf: ["i","iste","iu","imos","iram"], imp: ["ia","ias","ia","íamos","iam"] }
};

/* Spelling changes that keep the sound: ficar > fiquei, chegar > cheguei, começar > comecei,
   conhecer > conheço, dirigir > dirijo. */
function regularForms(inf) {
  const type = inf.slice(-2), stem = inf.slice(0, -2), e = ENDINGS[type], out = {};
  for (const t of Object.keys(TENSES)) out[t] = e[t].map(x => {
    let s = stem;
    if (type === "ar" && /^e/.test(x)) { if (s.endsWith("c")) s = s.slice(0, -1) + "qu"; else if (s.endsWith("g")) s = s + "u"; else if (s.endsWith("ç")) s = s.slice(0, -1) + "c"; }
    else if (/^[oa]/.test(x) && type !== "ar") { if (s.endsWith("c")) s = s.slice(0, -1) + "ç"; else if (s.endsWith("g")) s = s.slice(0, -1) + "j"; }
    return s + x;
  });
  return out;
}
function conjugate(inf) {
  const base = IRREGULAR[inf] ? { ...IRREGULAR[inf] } : regularForms(inf);
  if (PRES_IRR[inf]) base.pres = PRES_IRR[inf];
  base.en = VERB_EN[inf] || "";
  return base;
}
const verbKind = v => IRREGULAR[v] || PRES_IRR[v] ? "irregular" : JSON.stringify(regularForms(v)) !== JSON.stringify((() => { const t = v.slice(-2), s = v.slice(0, -2), e = ENDINGS[t], o = {}; for (const k of Object.keys(TENSES)) o[k] = e[k].map(x => s + x); return o; })()) ? "spelling change" : "regular";
const VERB_RANK = {}; VERB_FREQ.forEach(([v], i) => VERB_RANK[v] = i + 1);
const VERB_COUNT = Object.fromEntries(VERB_FREQ);
const VERB_LIST = [...VERB_FREQ.map(v => v[0]), ...VERB_EXTRAS];

/* ===== Listening dialogues (all European Portuguese) ===== */
const DIALOGUES = [
  { id: "d1", title: "Na pastelaria", en: "At the pastry shop", lines: [
    ["Empregado", "Bom dia! O que deseja?", "Good morning! What would you like?"],
    ["Cliente", "Bom dia. Queria uma bica e um pastel de nata, por favor.", "Good morning. I'd like an espresso and a custard tart, please."],
    ["Empregado", "Mais alguma coisa?", "Anything else?"],
    ["Cliente", "Não, só isso. Quanto é?", "No, just that. How much is it?"],
    ["Empregado", "São dois euros e dez.", "That's two euros ten."],
    ["Cliente", "Posso pagar com cartão?", "Can I pay by card?"],
    ["Empregado", "Claro. Quer fatura com contribuinte?", "Of course. Do you want your tax number on the receipt?"],
    ["Cliente", "Não, obrigada.", "No, thank you."]
  ], q: [
    { q: "What did the customer order?", o: ["An espresso and a custard tart", "A milky coffee and toast", "An orange juice and a sandwich"], a: 0 },
    { q: "How much did it cost?", o: ["€2.10", "€1.20", "€10.20"], a: 0 }
  ]},
  { id: "d2", title: "Na estação", en: "At the train station", lines: [
    ["Cliente", "Boa tarde. Um bilhete para o Porto, por favor.", "Good afternoon. A ticket to Porto, please."],
    ["Funcionária", "Ida e volta?", "Return?"],
    ["Cliente", "Só ida. A que horas parte o próximo comboio?", "Just one way. What time does the next train leave?"],
    ["Funcionária", "Parte às quinze e trinta, da linha dois.", "It leaves at 15:30, from platform two."],
    ["Cliente", "Quanto tempo demora?", "How long does it take?"],
    ["Funcionária", "Cerca de três horas.", "About three hours."],
    ["Cliente", "Muito obrigado.", "Thank you very much."],
    ["Funcionária", "De nada. Boa viagem!", "You're welcome. Have a good trip!"]
  ], q: [
    { q: "What kind of ticket does he buy?", o: ["One way", "Return", "A monthly pass"], a: 0 },
    { q: "When does the train leave?", o: ["15:30 from platform 2", "13:30 from platform 3", "15:00 from platform 2"], a: 0 }
  ]},
  { id: "d3", title: "O novo vizinho", en: "The new neighbour", lines: [
    ["Rita", "Olá! És o novo vizinho? Chamo-me Rita.", "Hi! Are you the new neighbour? My name's Rita."],
    ["Tom", "Olá, Rita. Sim, chamo-me Tom. Muito prazer.", "Hi, Rita. Yes, I'm Tom. Nice to meet you."],
    ["Rita", "De onde és?", "Where are you from?"],
    ["Tom", "Sou de Inglaterra, mas agora moro aqui em Lisboa.", "I'm from England, but now I live here in Lisbon."],
    ["Rita", "Que fixe! Falas muito bem português.", "How cool! You speak Portuguese really well."],
    ["Tom", "Obrigado! Estou a aprender. Ainda falo um pouco devagar.", "Thanks! I'm learning. I still speak a bit slowly."],
    ["Rita", "Não faz mal. Se calhar podemos tomar um café um dia destes.", "No problem. Maybe we can have a coffee one of these days."],
    ["Tom", "Boa ideia! Até já!", "Good idea! See you!"]
  ], q: [
    { q: "Where is Tom from?", o: ["England", "Porto", "Spain"], a: 0 },
    { q: "What does Rita suggest?", o: ["Having a coffee sometime", "Taking the train together", "Going to dinner tonight"], a: 0 }
  ]},
  { id: "d4", title: "Na farmácia", en: "At the pharmacy", lines: [
    ["Farmacêutica", "Boa tarde, diga.", "Good afternoon, how can I help?"],
    ["Cliente", "Boa tarde. Tenho dores de cabeça. Tem alguma coisa?", "Good afternoon. I have a headache. Do you have anything?"],
    ["Farmacêutica", "Tenho este. Tome um comprimido de oito em oito horas.", "I have this one. Take one tablet every eight hours."],
    ["Cliente", "Posso tomar com o estômago vazio?", "Can I take it on an empty stomach?"],
    ["Farmacêutica", "É melhor depois de comer.", "It's better after eating."],
    ["Cliente", "Está bem. Quanto custa?", "OK. How much is it?"],
    ["Farmacêutica", "São quatro euros e cinquenta.", "That's four euros fifty."]
  ], q: [
    { q: "What's the customer's problem?", o: ["A headache", "A cough", "A stomach ache"], a: 0 },
    { q: "How often should the tablet be taken?", o: ["Every eight hours", "Twice a day", "Every four hours"], a: 0 }
  ]}
];

/* ===== Pronunciation guide: sounds that make Portugal different ===== */
const SOUNDS = [
  { t: "Swallowed vowels", d: "Unstressed e and o almost disappear. This is the sound of Portugal.", ex: ["telefone", "pequeno", "desculpe"], hint: "telefone ≈ t'l-FON; pequeno ≈ p'KEH-nu" },
  { t: "Final -o sounds like u", d: "An unstressed o at the end of a word is a short u.", ex: ["obrigado", "comboio", "rapaz"], hint: "obrigado ≈ o-bri-GAH-du" },
  { t: "S at the end = sh", d: "S or z at the end of a syllable sounds like English sh (or zh before a voiced consonant).", ex: ["dois", "três", "Lisboa"], hint: "dois ≈ doysh; Lisboa ≈ leezh-BOH-a" },
  { t: "Hard D and T", d: "D and t always stay hard, and a final e almost disappears, so noite is just 'noyt'.", ex: ["noite", "tarde", "dia"], hint: "noite ≈ NOYT; tarde ≈ TAHRD" },
  { t: "Nasal ão", d: "Like 'ow' said through the nose.", ex: ["não", "pão", "estação"], hint: "pão ≈ powng (nasal)" },
  { t: "lh and nh", d: "lh is like 'lli' in million; nh is like 'ny' in canyon.", ex: ["filha", "vinho", "senhora"], hint: "filha ≈ FEE-lya; vinho ≈ VEE-nyu" },
  { t: "Strong R", d: "R at the start of a word and rr are pronounced at the back of the throat, a bit like French.", ex: ["rua", "carro", "Rita"], hint: "rua ≈ (throat-R)OO-a" },
  { t: "Lisbon 'ei'", d: "In Lisbon, ei sounds close to English 'eye'.", ex: ["primeiro", "dinheiro", "queijo"], hint: "queijo ≈ KAY-zhu / KAI-zhu" }
];

/* ===== AI roleplay scenarios (set in Portugal) ===== */
const SCENARIOS = [
  { id: "pastelaria", t: "Order at a pastelaria", where: "A busy pastelaria in Lisbon, morning", goal: "Order a coffee and a pastry, ask the price and pay by card.", role: "the person behind the counter" },
  { id: "comboio", t: "Buy a train ticket", where: "The ticket office at Santa Apolónia station, Lisbon", goal: "Buy a ticket to Coimbra, find out the departure time and platform.", role: "the ticket office clerk" },
  { id: "restaurante", t: "Dinner at a tasca", where: "A small family restaurant (tasca) in Porto", goal: "Get a table, ask about the dish of the day, order and ask for the bill.", role: "the waiter" },
  { id: "vizinho", t: "Meet your neighbour", where: "The stairwell of your new building in Lisbon", goal: "Introduce yourself, say where you're from and what you do.", role: "a friendly neighbour called Rita" },
  { id: "casa", t: "Rent a flat", where: "Viewing a T1 flat with the landlord", goal: "Ask about the rent, the deposit, the bills and when you can move in.", role: "the landlord, Sr. Fernandes" },
  { id: "farmacia", t: "At the pharmacy", where: "A farmácia in your neighbourhood", goal: "Explain you have a cold and ask what to take and how often.", role: "the pharmacist" },
  { id: "direcoes", t: "Ask for directions", where: "A street in Alfama, Lisbon", goal: "Find out how to get to the nearest metro station.", role: "a local passer-by" },
  { id: "compras", t: "Clothes shopping", where: "A clothes shop in Chiado", goal: "Ask for a different size, ask the price and say whether you'll buy it.", role: "the shop assistant" }
];

/* ===== Word of the Day: everyday Portugal words, each with 3 examples [pt, en, form-to-blank] ===== */
const WOTD = [
  { pt: "a saudade", en: "longing, missing someone or something", note: "Usually plural in ter saudades de… (to miss…). Famous as 'untranslatable'.", ex: [
    ["Tenho saudades de Lisboa.", "I miss Lisbon.", "saudades"],
    ["Que saudades tuas!", "I've missed you so much!", "saudades"],
    ["A saudade é uma palavra muito portuguesa.", "Saudade is a very Portuguese word.", "saudade"]] },
  { pt: "fixe", en: "cool, great", note: "Everyday slang you'll hear constantly.", ex: [
    ["O teu casaco é muito fixe.", "Your jacket is really cool.", "fixe"],
    ["Que fixe!", "How cool!", "fixe"],
    ["Foi uma festa fixe.", "It was a great party.", "fixe"]] },
  { pt: "pois", en: "right, yeah, indeed", note: "The most Portuguese word there is. Pois é = that's how it is.", ex: [
    ["Pois, tens razão.", "Right, you're right.", "Pois"],
    ["Está frio hoje. Pois está!", "It's cold today. It sure is!", "Pois"],
    ["Pois é, a vida é assim.", "Yeah, that's life.", "Pois"]] },
  { pt: "desenrascar-se", en: "to get by, to improvise a way out", note: "O desenrascanço, the art of improvising, is a point of national pride.", ex: [
    ["Não tenho ferramentas, mas vou desenrascar-me.", "I don't have tools, but I'll manage.", "desenrascar-me"],
    ["Ele desenrasca-se sempre.", "He always finds a way.", "desenrasca-se"],
    ["Ela desenrascou-se muito bem.", "She handled it really well.", "desenrascou-se"]] },
  { pt: "a esplanada", en: "café terrace, outdoor seating", ex: [
    ["Vamos sentar-nos na esplanada?", "Shall we sit on the terrace?", "esplanada"],
    ["Está sol e a esplanada está cheia.", "It's sunny and the terrace is full.", "esplanada"],
    ["Bebemos um café na esplanada.", "We had a coffee on the terrace.", "esplanada"]] },
  { pt: "o miradouro", en: "viewpoint", ex: [
    ["O miradouro da Graça tem uma vista linda.", "The Graça viewpoint has a beautiful view.", "miradouro"],
    ["Vamos ver o pôr do sol no miradouro.", "Let's watch the sunset at the viewpoint.", "miradouro"],
    ["Há muitos miradouros em Lisboa.", "There are lots of viewpoints in Lisbon.", "miradouros"]] },
  { pt: "a bica", en: "an espresso (Lisbon)", note: "Se faz favor is a very Portuguese way to say please.", ex: [
    ["Uma bica, se faz favor.", "An espresso, please.", "bica"],
    ["Bebo uma bica depois do almoço.", "I have an espresso after lunch.", "bica"],
    ["Esta bica está muito forte.", "This espresso is very strong.", "bica"]] },
  { pt: "o petisco", en: "small dish to share, snack", ex: [
    ["Pedimos uns petiscos para partilhar.", "We ordered some small dishes to share.", "petiscos"],
    ["O meu petisco preferido são os pastéis de bacalhau.", "My favourite snack is cod fritters.", "petisco"],
    ["Esta tasca tem ótimos petiscos.", "This tavern has great small dishes.", "petiscos"]] },
  { pt: "a tasca", en: "small traditional tavern", ex: [
    ["Jantámos numa tasca em Alfama.", "We had dinner in a tavern in Alfama.", "tasca"],
    ["As tascas são baratas e boas.", "Taverns are cheap and good.", "tascas"],
    ["Conheço uma tasca fantástica.", "I know a fantastic tavern.", "tasca"]] },
  { pt: "giro", en: "nice, cute, pretty", alt: ["gira"], note: "Changes with gender: giro, gira, giros, giras.", ex: [
    ["Que vestido tão giro!", "What a cute dress!", "giro"],
    ["A tua casa é muito gira.", "Your house is really nice.", "gira"],
    ["Foi um dia giro.", "It was a fun day.", "giro"]] },
  { pt: "se calhar", en: "maybe, perhaps", ex: [
    ["Se calhar chove amanhã.", "Maybe it'll rain tomorrow.", "Se calhar"],
    ["Se calhar ele não vem.", "Maybe he isn't coming.", "Se calhar"],
    ["Se calhar é melhor irmos de metro.", "Maybe we'd better take the metro.", "Se calhar"]] },
  { pt: "ainda", en: "still, yet", ex: [
    ["Ainda estás em casa?", "Are you still at home?", "Ainda"],
    ["Ainda não comi.", "I haven't eaten yet.", "Ainda"],
    ["Ela ainda mora no Porto.", "She still lives in Porto.", "ainda"]] },
  { pt: "já", en: "already, right away", ex: [
    ["Já almoçaste?", "Have you had lunch yet?", "Já"],
    ["Vou já!", "Coming right now!", "já"],
    ["Já está pronto.", "It's ready now.", "Já"]] },
  { pt: "imenso", en: "loads, so much", alt: ["imensa"], note: "Very common in Portugal for 'a lot'.", ex: [
    ["Gosto imenso de fado.", "I love fado so much.", "imenso"],
    ["Havia imensa gente na praia.", "There were loads of people on the beach.", "imensa"],
    ["Obrigado, ajudaste-me imenso.", "Thanks, you helped me loads.", "imenso"]] },
  { pt: "o fado", en: "fado (traditional Portuguese song)", ex: [
    ["Ontem fomos ouvir fado em Alfama.", "Yesterday we went to hear fado in Alfama.", "fado"],
    ["O fado é Património da Humanidade.", "Fado is World Heritage.", "fado"],
    ["Gostas de fado?", "Do you like fado?", "fado"]] },
  { pt: "chato", en: "annoying, boring", alt: ["chata"], ex: [
    ["Que chato!", "How annoying!", "chato"],
    ["O filme foi um bocado chato.", "The film was a bit boring.", "chato"],
    ["Não sejas chato!", "Don't be a pain!", "chato"]] },
  { pt: "o bocado", en: "a bit, a piece", note: "Um bocado = a bit. Um bocadinho = a little bit.", ex: [
    ["Estou um bocado cansado.", "I'm a bit tired.", "bocado"],
    ["Queres um bocado de bolo?", "Do you want a piece of cake?", "bocado"],
    ["Espera um bocadinho.", "Wait a moment.", "bocadinho"]] },
  { pt: "a malta", en: "the gang, folks (informal)", ex: [
    ["A malta vai jantar fora hoje.", "The gang is going out for dinner tonight.", "malta"],
    ["Olá, malta!", "Hi, everyone!", "malta"],
    ["A malta do trabalho é fixe.", "The people at work are great.", "malta"]] },
  { pt: "o miúdo", en: "kid", alt: ["a miúda"], ex: [
    ["Os miúdos estão a brincar no parque.", "The kids are playing in the park.", "miúdos"],
    ["Quando era miúdo, morava no Porto.", "When I was a kid, I lived in Porto.", "miúdo"],
    ["Que miúda tão simpática!", "What a lovely girl!", "miúda"]] },
  { pt: "a bola", en: "ball, football", note: "Jogar à bola = to play football. Ver a bola = to watch the match.", ex: [
    ["Vamos jogar à bola?", "Shall we play football?", "bola"],
    ["Ele vê a bola todos os domingos.", "He watches football every Sunday.", "bola"],
    ["Passa-me a bola!", "Pass me the ball!", "bola"]] },
  { pt: "arrumar", en: "to tidy, to put away", ex: [
    ["Tenho de arrumar o quarto.", "I have to tidy my room.", "arrumar"],
    ["Já arrumaste a cozinha?", "Have you tidied the kitchen yet?", "arrumaste"],
    ["Vou arrumar as malas.", "I'm going to pack my bags.", "arrumar"]] },
  { pt: "apetecer", en: "to feel like (doing or having)", note: "Works like gostar in reverse: Apetece-me = I feel like.", ex: [
    ["Apetece-me um gelado.", "I feel like an ice cream.", "Apetece-me"],
    ["O que te apetece fazer hoje?", "What do you feel like doing today?", "apetece"],
    ["Não me apetece sair.", "I don't feel like going out.", "apetece"]] },
  { pt: "a montra", en: "shop window", ex: [
    ["Vi uns sapatos na montra.", "I saw some shoes in the shop window.", "montra"],
    ["As montras estão bonitas no Natal.", "The shop windows look lovely at Christmas.", "montras"],
    ["Gosto de ver montras.", "I like window shopping.", "montras"]] },
  { pt: "a sandes", en: "sandwich", ex: [
    ["Uma sandes de queijo, por favor.", "A cheese sandwich, please.", "sandes"],
    ["Levo uma sandes para o almoço.", "I take a sandwich for lunch.", "sandes"],
    ["Esta sandes de leitão é ótima.", "This roast suckling pig sandwich is great.", "sandes"]] },
  { pt: "o gelado", en: "ice cream", ex: [
    ["Queres um gelado?", "Do you want an ice cream?", "gelado"],
    ["O gelado de morango é o meu preferido.", "Strawberry ice cream is my favourite.", "gelado"],
    ["No verão como muitos gelados.", "In summer I eat lots of ice cream.", "gelados"]] },
  { pt: "o ecrã", en: "screen", ex: [
    ["O ecrã do meu telemóvel partiu-se.", "My phone screen broke.", "ecrã"],
    ["Este ecrã é muito grande.", "This screen is very big.", "ecrã"],
    ["Olha para o ecrã.", "Look at the screen.", "ecrã"]] },
  { pt: "a fila", en: "queue, line", ex: [
    ["Há uma fila enorme no supermercado.", "There's a huge queue at the supermarket.", "fila"],
    ["Estou na fila para o autocarro.", "I'm in the queue for the bus.", "fila"],
    ["Desculpe, está na fila?", "Excuse me, are you in the queue?", "fila"]] },
  { pt: "a constipação", en: "a cold (illness)", note: "False friend: it does NOT mean constipation.", ex: [
    ["Estou com uma constipação.", "I've got a cold.", "constipação"],
    ["Apanhei uma constipação na chuva.", "I caught a cold in the rain.", "constipação"],
    ["Bebe chá para a constipação.", "Drink tea for your cold.", "constipação"]] },
  { pt: "o rebuçado", en: "sweet, boiled candy", ex: [
    ["Queres um rebuçado?", "Do you want a sweet?", "rebuçado"],
    ["Os miúdos adoram rebuçados.", "Kids love sweets.", "rebuçados"],
    ["Tenho rebuçados de mel.", "I have honey sweets.", "rebuçados"]] },
  { pt: "a camisola", en: "jumper, sweater; football shirt", ex: [
    ["Leva uma camisola, está frio.", "Take a jumper, it's cold.", "camisola"],
    ["Comprei uma camisola do Benfica.", "I bought a Benfica shirt.", "camisola"],
    ["Esta camisola é de lã.", "This jumper is wool.", "camisola"]] },
  { pt: "a boleia", en: "a lift, a ride", ex: [
    ["Dás-me boleia até casa?", "Can you give me a lift home?", "boleia"],
    ["Apanhei boleia com o João.", "I got a lift with João.", "boleia"],
    ["Obrigado pela boleia!", "Thanks for the lift!", "boleia"]] },
  { pt: "a propósito", en: "by the way", ex: [
    ["A propósito, já viste o jogo?", "By the way, have you seen the match?", "A propósito"],
    ["A propósito do jantar, onde vamos?", "Speaking of dinner, where are we going?", "A propósito"],
    ["A propósito, obrigado pela ajuda.", "By the way, thanks for the help.", "A propósito"]] },
  { pt: "combinar", en: "to arrange, to agree on", note: "Está combinado! = It's a deal!", ex: [
    ["Combinamos às oito?", "Shall we say eight o'clock?", "Combinamos"],
    ["Está combinado!", "It's a deal!", "combinado"],
    ["Combinei jantar com a Ana.", "I arranged to have dinner with Ana.", "Combinei"]] },
  { pt: "a morada", en: "address", ex: [
    ["Qual é a tua morada?", "What's your address?", "morada"],
    ["Escreve a morada aqui.", "Write the address here.", "morada"],
    ["Mudei de morada.", "I changed address.", "morada"]] },
  { pt: "o chapéu de chuva", en: "umbrella", ex: [
    ["Leva o chapéu de chuva, vai chover.", "Take the umbrella, it's going to rain.", "chapéu de chuva"],
    ["Perdi o meu chapéu de chuva.", "I lost my umbrella.", "chapéu de chuva"],
    ["Está a chover e não tenho chapéu de chuva.", "It's raining and I don't have an umbrella.", "chapéu de chuva"]] },
  { pt: "o Multibanco", en: "cash machine / Portuguese card network", ex: [
    ["Há um Multibanco aqui perto?", "Is there a cash machine near here?", "Multibanco"],
    ["Paguei com o cartão Multibanco.", "I paid with my Multibanco card.", "Multibanco"],
    ["Vou levantar dinheiro ao Multibanco.", "I'm going to take money out at the cash machine.", "Multibanco"]] },
  { pt: "levantar", en: "to withdraw (money); to get up", note: "Levantar-se = to get up (yourself).", ex: [
    ["Preciso de levantar dinheiro.", "I need to take some money out.", "levantar"],
    ["Levanto-me às sete.", "I get up at seven.", "Levanto-me"],
    ["Levanta a mão!", "Raise your hand!", "Levanta"]] },
  { pt: "o frio", en: "cold (weather)", ex: [
    ["Está muito frio hoje.", "It's very cold today.", "frio"],
    ["Tenho frio.", "I'm cold.", "frio"],
    ["Não gosto do frio.", "I don't like the cold.", "frio"]] },
  { pt: "o calor", en: "heat", ex: [
    ["Está imenso calor!", "It's so hot!", "calor"],
    ["Tenho calor.", "I'm hot.", "calor"],
    ["Em agosto faz muito calor no Alentejo.", "In August it's very hot in the Alentejo.", "calor"]] },
  { pt: "a praia", en: "beach", ex: [
    ["Vamos à praia no sábado?", "Shall we go to the beach on Saturday?", "praia"],
    ["A praia da Nazaré tem ondas enormes.", "Nazaré beach has huge waves.", "praia"],
    ["No verão vou à praia todos os dias.", "In summer I go to the beach every day.", "praia"]] },
  { pt: "o casaco", en: "jacket, coat", ex: [
    ["Não te esqueças do casaco.", "Don't forget your jacket.", "casaco"],
    ["Este casaco é muito quente.", "This coat is very warm.", "casaco"],
    ["Onde deixei o meu casaco?", "Where did I leave my jacket?", "casaco"]] },
  { pt: "o pequeno-almoço", en: "breakfast", ex: [
    ["O que comes ao pequeno-almoço?", "What do you have for breakfast?", "pequeno-almoço"],
    ["Tomo o pequeno-almoço às oito.", "I have breakfast at eight.", "pequeno-almoço"],
    ["O pequeno-almoço está incluído?", "Is breakfast included?", "pequeno-almoço"]] }
];
