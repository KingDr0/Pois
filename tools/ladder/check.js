/* Checks that every example sentence only uses words taught in its lesson or earlier.
   Usage: node check.js [maxLesson] */
const fs = require("fs");
const vm = require("vm");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + "/../../content.js", "utf8") + "\nthis.conjugate = conjugate; this.IRREGULAR = IRREGULAR;", ctx);
const conjugate = ctx.conjugate;

const rows = fs.readFileSync(__dirname + "/words.txt", "utf8").split("\n").filter(l => l.trim() && !l.startsWith("#")).map(l => l.split("|"));
const info = Object.fromEntries(rows.map(r => [r[0], { pos: r[1], alt: r[4] ? r[4].split(",").map(s => s.trim()) : [] }]));
const lessons = JSON.parse(fs.readFileSync(__dirname + "/lessons.json", "utf8"));
const lessonOf = {}; lessons.forEach((l, i) => l.forEach(w => lessonOf[w] = i));
const ex = fs.readFileSync(__dirname + "/examples.txt", "utf8").split("\n").filter(l => l.trim() && !l.startsWith("#")).map(l => l.split("|"));

const norm = s => s.toLowerCase().normalize("NFC");
const FREE = new Set(["joão", "ana", "rita", "pedro", "maria", "tiago", "inês", "sofia", "miguel", "lisboa", "porto", "portugal", "sintra", "coimbra", "faro", "algarve", "madeira", "benfica", "europa", "espanha", "brasil", "tejo", "braga", "évora", "açores", "euro", "euros", "natal"]);

/* form -> set of lemmas */
const F = new Map();
const add = (form, lemma) => { form = norm(form); if (!F.has(form)) F.set(form, new Set()); F.get(form).add(lemma); };
const plural = w => /ão$/.test(w) ? [w.replace(/ão$/, "ões"), w.replace(/ão$/, "ães"), w.replace(/ão$/, "ãos")]
  : /[rzs]$/.test(w) ? [w + "es", w] : /al$/.test(w) ? [w.replace(/al$/, "ais")] : /el$/.test(w) ? [w.replace(/el$/, "éis")] : /ol$/.test(w) ? [w.replace(/ol$/, "óis")] : /il$/.test(w) ? [w.replace(/il$/, "is"), w.replace(/il$/, "eis")]
  : /m$/.test(w) ? [w.replace(/m$/, "ns")] : /ês$/.test(w) ? [w.replace(/ês$/, "eses")] : [w + "s"];
const fem = w => /o$/.test(w) ? [w.replace(/o$/, "a")] : /or$/.test(w) ? [w + "a"] : /ês$/.test(w) ? [w.replace(/ês$/, "esa")] : /eu$/.test(w) ? [w.replace(/eu$/, "eia")] : /ão$/.test(w) ? [w.replace(/ão$/, "ã"), w.replace(/ão$/, "ona")] : [];
const unaccent = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

for (const [w, { pos, alt }] of Object.entries(info)) {
  add(w, w); alt.forEach(a => { add(a, w); plural(a).forEach(p => add(p, w)); });
  if (pos === "verb") {
    const c = conjugate(w);
    ["pres", "perf", "imp"].forEach(t => c[t].forEach(f => add(f, w)));
    const stem = w.slice(0, -2), ty = w.slice(-2), vowel = ty === "ar" ? "a" : ty === "er" ? "e" : "i";
    /* future, conditional */
    ["ei", "ás", "á", "emos", "ão"].forEach(e => add(w + e, w)); ["ia", "ias", "ia", "íamos", "iam"].forEach(e => add(w + e, w));
    /* participles */
    const pp = ty === "ar" ? stem + "ado" : stem + "ido"; [pp, pp.replace(/o$/, "a"), pp + "s", pp.replace(/o$/, "as")].forEach(f => add(f, w));
    /* present subjunctive / polite imperative */
    const eu = c.pres[0]; if (eu && eu.endsWith("o")) { const sb = eu.slice(0, -1) + (ty === "ar" ? "e" : "a"); [sb, sb + "s", sb + "mos", sb + "m"].forEach(f => add(f, w)); }
    /* gerund (rare in Portugal, allowed in checks) */ add(stem + vowel + "ndo", w);
  } else if (["noun", "adj", "num", "pron"].includes(pos)) {
    plural(w).forEach(p => add(p, w)); fem(w).forEach(f => { add(f, w); plural(f).forEach(p => add(p, w)); });
  }
}
/* irregular participles, subjunctives and other forms used in examples */
const extra = { feito: "fazer", feita: "fazer", feitos: "fazer", dito: "dizer", visto: "ver", vista: "ver", posto: "pôr", escrito: "escrever", aberto: "abrir", vindo: "vir", ganho: "ganhar", pago: "pagar", aceite: "aceitar",
  morto: "morrer", morta: "morrer", entregue: "entregar", seja: "ser", sejam: "ser", esteja: "estar", tenha: "ter", vá: "ir", vamos: "ir", faça: "fazer", diga: "dizer", saiba: "saber", queira: "querer", possa: "poder",
  haja: "haver", farei: "fazer", farás: "fazer", fará: "fazer", faremos: "fazer", farão: "fazer", direi: "dizer", dirá: "dizer", diz: "dizer", fiz: "fazer", fomos: "ir", foi: "ser", traz: "trazer", trago: "trazer",
  sido: "ser", estado: "estar", tido: "ter", ido: "ir", havido: "haver", podido: "poder", sabido: "saber", querido: "querer", dado: "dar", vai: "ir", vou: "ir", vês: "ver", lê: "ler", leio: "ler",
  sente: "sentir", dá: "dar", põe: "pôr", põem: "pôr", pões: "pôr", vem: "vir", vêm: "vir", tem: "ter", têm: "ter", mantém: "manter", sai: "sair", cai: "cair", ponha: "pôr", traga: "trazer", diz: "dizer", venha: "vir", veja: "ver", dê: "dar", meses: "mês", constituído: "constituir", incluído: "incluir", incluída: "incluir", juntos: "junto", junta: "junto", juntas: "junto", teu: "tu", tua: "tu", teus: "tu", tuas: "tu", vosso: "você", vossa: "você" };
for (const [f, l] of Object.entries(extra)) add(f, l);
/* clitic pronoun forms */
[["me", "me"], ["te", "tu"], ["ti", "tu"], ["se", "se"], ["si", "se"], ["nos", "nós"], ["vos", "você"], ["lhe", "lhe"], ["lhes", "lhe"], ["o", "o"], ["a", "a"], ["os", "o"], ["as", "a"], ["lo", "o"], ["la", "a"], ["los", "o"], ["las", "a"], ["no", "o"], ["na", "a"], ["mim", "eu"], ["vocês", "você"]].forEach(([f, l]) => add(f, l));
/* contractions -> both parts */
const C = { do: ["de", "o"], da: ["de", "a"], dos: ["de", "o"], das: ["de", "a"], no: ["em", "o"], na: ["em", "a"], nos: ["em", "o"], nas: ["em", "a"], ao: ["a", "o"], aos: ["a", "o"], "à": ["a"], "às": ["a"],
  pelo: ["por", "o"], pela: ["por", "a"], pelos: ["por", "o"], pelas: ["por", "a"], num: ["em", "um"], numa: ["em", "um"], nuns: ["em", "um"], numas: ["em", "um"], dum: ["de", "um"], duma: ["de", "um"],
  dele: ["de", "ele"], dela: ["de", "ela"], deles: ["de", "ele"], delas: ["de", "ela"], nele: ["em", "ele"], nela: ["em", "ela"], neles: ["em", "ele"], nelas: ["em", "ela"],
  deste: ["de", "este"], desta: ["de", "este"], destes: ["de", "este"], destas: ["de", "este"], neste: ["em", "este"], nesta: ["em", "este"], nestes: ["em", "este"], nestas: ["em", "este"],
  desse: ["de", "esse"], dessa: ["de", "esse"], desses: ["de", "esse"], dessas: ["de", "esse"], nesse: ["em", "esse"], nessa: ["em", "esse"], nesses: ["em", "esse"], nessas: ["em", "esse"],
  daquele: ["de", "aquele"], daquela: ["de", "aquele"], naquele: ["em", "aquele"], naquela: ["em", "aquele"], àquele: ["a", "aquele"], àquela: ["a", "aquele"],
  disto: ["de", "isto"], nisto: ["em", "isto"], disso: ["de", "isso"], nisso: ["em", "isso"], daquilo: ["de", "aquilo"], naquilo: ["em", "aquilo"],
  comigo: ["com", "eu"], contigo: ["com", "tu"], connosco: ["com", "nós"], consigo: ["com", "se"], daqui: ["de", "aqui"], dali: ["de", "ali"], daí: ["de", "aí"], doutro: ["de", "outro"], doutra: ["de", "outro"] };

function lemmasOf(tok) {
  const t = norm(tok);
  if (/^\d+([.,]\d+)?%?$/.test(t)) return [["#"]];
  if (FREE.has(t)) return [["#"]];
  const opts = [];
  if (C[t]) opts.push(C[t]);
  if (F.has(t)) for (const l of F.get(t)) opts.push([l]);
  return opts;
}
const maxL = process.argv[2] ? +process.argv[2] : lessons.length;
let problems = 0; const seen = new Set();
for (const [w, pt, en] of ex) {
  seen.add(w);
  const L = lessonOf[w];
  if (L === undefined) { console.log(`NOT IN LADDER: ${w}`); problems++; continue; }
  if (L >= maxL) continue;
  if (!pt || !en) { console.log(`MISSING TEXT: ${w}`); problems++; continue; }
  const toks = pt.replace(/[.,!?¿¡;:"“”«»()…—]/g, " ").split(/\s+/).filter(Boolean).flatMap(t => t.includes("-") ? t.split("-") : [t]);
  const bad = [];
  let usesWord = false;
  for (const tok of toks) {
    const opts = lemmasOf(tok);
    if (opts.some(parts => parts.includes(w))) usesWord = true;
    const ok = opts.some(parts => parts.every(p => p === "#" || (lessonOf[p] !== undefined && lessonOf[p] <= L)));
    if (!ok) bad.push(tok + (opts.length ? `(${opts.map(o => o.join("+")).join("/")}${opts.map(o => o.map(p => lessonOf[p] === undefined ? "?" : "L" + (lessonOf[p] + 1)).join("+")).join("/")})` : "(unknown)"));
  }
  if (!usesWord) bad.push(`[doesn't use "${w}"]`);
  if (bad.length) { problems++; console.log(`L${L + 1} ${w}: ${pt}\n     -> ${bad.join(", ")}`); }
}
const missing = lessons.slice(0, maxL).flat().filter(w => !seen.has(w));
if (missing.length) console.log(`NO EXAMPLE YET (${missing.length}): ${missing.join(", ")}`);
console.log(problems ? `${problems} problem(s)` : "ALL GOOD");
