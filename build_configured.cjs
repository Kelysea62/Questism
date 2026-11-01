"use strict";
// Rebuild ready-to-paste Libraries from the single tested engine source.
const fs = require("node:fs"), path = require("node:path"), crypto = require("node:crypto");
const root = __dirname, source = fs.readFileSync(path.join(root, "library.js"), "utf8");
const marker = "const QUESTISM_PRESETS = [];";
if (source.split(marker).length !== 2) throw new Error("Expected one empty preset declaration.");
const outputs = [];
for (const name of ["another_chance_opening", "another_chance_conditions", "objective_choices", "branching_dependencies", "exclusive_routes", "another_chance_five_stop"]) {
  const dir = path.join(root, name), pack = JSON.parse(fs.readFileSync(path.join(dir, "quest_pack.json"), "utf8"));
  const setup = fs.existsSync(path.join(dir, "setup.js")) ? fs.readFileSync(path.join(dir, "setup.js"), "utf8") : 'const QUESTISM_CONFIG = {"header":true,"pauseEvents":true,"newQuests":"off","progression":"auto"};\n';
  const text = setup + "\n" + source.replace(marker, "const QUESTISM_PRESETS = " + JSON.stringify(pack.quests, null, 2) + ";");
  fs.writeFileSync(path.join(dir, "library.js"), text);
  outputs.push({ path: name + "/library.js", quests: pack.quests.length, stages: pack.quests.reduce((n,q) => n + q.stages.length, 0), sha256: crypto.createHash("sha256").update(text).digest("hex") });
}
console.log(JSON.stringify(outputs, null, 2));
