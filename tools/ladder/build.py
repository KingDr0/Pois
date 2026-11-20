"""Rebuilds words.js from words.txt, examples.txt and lessons.json.
Run `node check.js` first: it confirms every example only uses words taught in its lesson or earlier."""
import json, os
D = os.path.dirname(os.path.abspath(__file__))
rd = lambda f: [l.rstrip("\n").split("|") for l in open(os.path.join(D, f), encoding="utf8") if l.strip() and not l.startswith("#")]
words = rd("words.txt"); rows = {r[0]: r for r in words}; rank = {r[0]: i + 1 for i, r in enumerate(words)}
ex = {r[0]: r for r in rd("examples.txt")}
W = []
for L in json.load(open(os.path.join(D, "lessons.json"), encoding="utf8")):
    for w in L:
        r, e = rows[w], ex[w]
        W.append([w, r[1], r[3], e[1], e[2], rank[w]] + ([r[4]] if r[4] else []))
src = open(os.path.join(D, "../../words.js"), encoding="utf8").read()
tail = src[src.index("const LADDER_TIERS"):]
head = src[:src.index("const LADDER_WORDS")]
open(os.path.join(D, "../../words.js"), "w", encoding="utf8").write(head + "const LADDER_WORDS = [\n" + ",\n".join(json.dumps(x, ensure_ascii=False) for x in W) + "\n];\n" + tail)
print(len(W), "words")
