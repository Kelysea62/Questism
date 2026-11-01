"use strict";
// Creator-only local inspector. No game account, network, or model calls.
const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm"), crypto = require("node:crypto");
const ROOT = __dirname;
const helper = fs.readFileSync(path.join(ROOT, "dependency_graph.js"), "utf8");
const dependencies = vm.runInNewContext(helper + "\nQuestismDependencies;", {}, { timeout: 2000 });
const routeHelper = fs.readFileSync(path.join(ROOT, "route_analysis.js"), "utf8");
const routes = vm.runInNewContext(routeHelper + "\nQuestismRouteAnalysis;", {}, { timeout: 2000 });
function inspect(text) {
  const source = fs.readFileSync(path.join(ROOT, "library.js"), "utf8");
  if (!source.includes(helper.trim())) throw new Error("The bundled dependency helper differs from dependency_graph.js.");
  if (!source.includes(routeHelper.trim())) throw new Error("The bundled route helper differs from route_analysis.js.");
  const version = source.match(/const VERSION = "([^"]+)"/)[1];
  const a = { state: {}, storyCards: [], history: [{ type: "start", text: "Isolated creator validation; no story actions are inferred." }] };
  const panes = Object.fromEntries(["input", "context", "output"].map(name => [name, fs.readFileSync(path.join(ROOT, name + ".js"), "utf8")]));
  const hook = (name, value = "") => {
    const cx = { ...a, text: value, info: { actionCount: a.history.length, maxChars: 30000, memoryLength: 0 },
      __add(keys, entry, type, title, description) { a.storyCards.push({ id: a.storyCards.length + 1, keys, entry, type, title, description }); return a.storyCards.length; } };
    const result = vm.runInNewContext("const addStoryCard = (...args) => __add(...args);\n" + source + "\n" + panes[name], cx, { timeout: 3000 });
    a.state = cx.state; a.storyCards = cx.storyCards; return result;
  };
  const command = name => {
    const result = hook("input", "/quest " + name); a.history.push({ type: "story", text: result.text }); hook("context", "Creator command context.");
    const output = hook("output", "Discarded placeholder generation."); a.history.push({ type: "continue", text: output.text }); hook("context", "Accepted creator interface report."); return output.text;
  };
  hook("context", "Creator initialization.");
  a.storyCards.find(c => c.type === "Questism Control").description = text.replace(/^\uFEFF/, "");
  const preview = command("validate");
  if (!/^\[Questism interface\]\nQuest pack validation passed: \d+ definitions; \d+ new quests\./.test(preview)) return { version, valid: false, structuralOnly: true, errors: [preview.replace(/^\[Questism interface\]\n/, "")], warnings: [], modelRecognitionTested: false };
  const imported = command("import");
  if (!/^\[Questism interface\]\n(?:Recorded #\d+\. Quest pack imported\.|No change needed\.)/.test(imported)) throw new Error("Validated import failed: " + imported);
  // Export plain JSON snapshots, not references with VM-realm prototypes.
  const defs = JSON.parse(JSON.stringify(a.state.Questism.world.defs)), analysis = JSON.parse(JSON.stringify(dependencies.analyse(defs)));
  const layer = new Map(analysis.potentialLayers.flatMap((ids, i) => ids.map(id => [id, i])));
  const warnings = preview.includes("\nWarnings:\n") ? preview.split("\nWarnings:\n")[1].split("\n") : [];
  return {
    version, valid: true, structuralOnly: true, inputSHA256: crypto.createHash("sha256").update(text).digest("hex"),
    assumptions: ["Narrative objectives, offers and player acceptance are not simulated.", "Flag, location, day and time satisfiability is not solved.", "Compatible route prerequisite proofs do not solve flag/scene or narrative feasibility.", "Noncompleted lifecycle status timing is deferred, never certified possible or impossible.", "Potential layers are dependency viability, not actual starts or completions."],
    questCount: Object.keys(defs).length, potentialLayers: analysis.potentialLayers, blocked: analysis.blocked, edges: analysis.edges,
    routeAnalysis: JSON.parse(JSON.stringify(routes.analyse(defs))),
    quests: Object.keys(defs).map(id => ({ id, title: defs[id].title, category: defs[id].category || "uncategorized", refusal: defs[id].refusal || "reoffer", exclusiveGroup: defs[id].exclusiveGroup || null, potentialLayer: layer.get(id), requires: defs[id].requires, requiresAny: defs[id].requiresAny, milestones: (defs[id].conditions || []).filter(c => Object.hasOwn(c, "quest") && Object.hasOwn(c, "stage")), statusConditions: (defs[id].conditions || []).filter(c => Object.hasOwn(c, "quest") && Object.hasOwn(c, "status")) })),
    exclusiveGroups: [...new Set(Object.values(defs).map(d => d.exclusiveGroup).filter(Boolean))].sort().map(id => ({ id, quests: Object.keys(defs).filter(key => defs[key].exclusiveGroup === id) })),
    objectiveLimits: Object.keys(defs).flatMap(quest => defs[quest].stages.flatMap(stage => stage.objectives.filter(o => o.maxPerAction != null).map(o => ({ quest, stage: stage.id, objective: o.id, target: o.target, maxPerAction: o.maxPerAction, evidenceSource: o.evidenceSource })))),
    warnings, errors: [], modelRecognitionTested: false
  };
}
function dot(report) {
  const lines = ["digraph Questism {", "  rankdir=LR;", '  label="Structural dependency preview only";'];
  if (!report.valid) lines.push("  invalid [shape=box,label=" + JSON.stringify("INVALID PACK\n" + report.errors.join("\n")) + "];");
  else {
    lines.push("  // Exclusive-route prerequisite analysis: " + (report.routeAnalysis?.status || "not supplied") + "; advisory only.");
    for (const q of report.quests) lines.push("  " + JSON.stringify(q.id) + " [label=" + JSON.stringify(q.title + "\n[" + q.id + "]" + (q.category && q.category !== "uncategorized" ? "\nCategory: " + q.category : "") + (q.exclusiveGroup ? "\nExclusive group: " + q.exclusiveGroup : "")) + (report.routeAnalysis?.blocked.includes(q.id) ? ',color="orange",style="dashed"' : "") + "];");
    for (const e of report.edges) lines.push("  " + JSON.stringify(e.from) + " -> " + JSON.stringify(e.to) + " [style=" + (e.kind === "any" ? "dashed" : ["milestone", "status"].includes(e.kind) ? "dotted" : "solid") + (e.kind === "status" ? ',color="blue"' : "") + ",label=" + JSON.stringify(e.kind === "milestone" ? "STAGE " + e.stage : e.kind === "status" ? "STATUS " + e.status : e.kind.toUpperCase()) + "];");
  }
  return lines.concat("}", "").join("\n");
}
function sameFile(a, b, filesystem = fs) {
  const key = p => process.platform === "win32" ? p.toLowerCase() : p;
  if (key(a) === key(b)) return true;
  try {
    if (key(filesystem.realpathSync(a)) === key(filesystem.realpathSync(b))) return true;
    const x = filesystem.statSync(a), y = filesystem.statSync(b);
    return x.ino !== 0 && x.ino === y.ino && x.dev === y.dev;
  } catch (_) { return false; }
}
function main(args) {
  if (!args.length || args[0] === "--help") { console.log("Usage: node inspect_pack.cjs PACK.json [--json REPORT.json] [--dot GRAPH.dot]\nReads JSON only. Validates using isolated Input/Context/Output hooks; no account, model or network access. Exit 1 means invalid input. Graphs are creator-only and can contain unrevealed definitions."); return; }
  const input = path.resolve(args[0]), outputs = {};
  for (let i = 1; i < args.length; i += 2) {
    if (!["--json", "--dot"].includes(args[i]) || !args[i + 1] || outputs[args[i]]) throw new Error("Use each of --json REPORT and --dot GRAPH at most once.");
    outputs[args[i]] = path.resolve(args[i + 1]);
  }
  const destinations = Object.values(outputs);
  // Include configured panes, setup, packs and test/helper sources. Generated
  // JSON/DOT reports remain replaceable; source aliases never do.
  const sourceFiles = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith(".") || entry.name === "node_modules") return [];
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.(?:js|cjs)$/.test(entry.name) || ["quest_pack.json", "demo_quest_pack.json", "scenario_setup.json", "validation_cases.json"].includes(entry.name) ? [file] : [];
  });
  const protectedFiles = [input, ...sourceFiles(ROOT)];
  if (destinations.some(p => protectedFiles.some(f => sameFile(p, f))) || destinations.some((p, i) => destinations.slice(0, i).some(q => sameFile(p, q)))) throw new Error("Input, bundled source and output files must be distinct; input and source are read-only.");
  let report;
  try { if (fs.statSync(input).size > 1000000) throw new Error("Input file exceeds the inspector's 1 MB read limit."); report = inspect(fs.readFileSync(input, "utf8")); }
  catch (error) { report = { valid: false, structuralOnly: true, errors: [error.message], warnings: [], modelRecognitionTested: false }; }
  const json = JSON.stringify(report, null, 2) + "\n";
  if (outputs["--json"]) fs.writeFileSync(outputs["--json"], json);
  if (outputs["--dot"]) fs.writeFileSync(outputs["--dot"], dot(report));
  process.stdout.write(json); if (!report.valid) process.exitCode = 1;
}
if (require.main === module) { try { main(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; } }
module.exports = { inspect, dot, sameFile };
