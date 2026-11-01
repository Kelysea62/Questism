"use strict";
// Local host for public Input/Context/Output hooks. Model reports are supplied
// by tests; this host does not measure natural-language recognition.
const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm"), assert = require("node:assert/strict");
const ROOT = path.resolve(__dirname, ".."), clone = value => JSON.parse(JSON.stringify(value));
const LIBRARY = fs.readFileSync(process.env.QUESTISM_OBJECTIVES_LIBRARY || path.join(ROOT, "library.js"), "utf8");
const PANES = Object.fromEntries(["input", "context", "output"].map(name => [name, fs.readFileSync(path.join(ROOT, name + ".js"), "utf8")]));
const config = { progression: "auto", newQuests: "off", header: true, pauseEvents: false, notifications: false, budget: 12000 };
const wire = events => "\n<QUESTISM>" + JSON.stringify({ events }) + "</QUESTISM>.";
function adventure(options = {}) {
  const a = options.saved ? clone(options.saved) : { state: {}, cards: [], actions: [{ type: "start", text: "A unique quiet day in the public archive lobby." }], count: 1 };
  let source = options.source || LIBRARY;
  source = source.replace("const QUESTISM_PRESETS = [];", "const QUESTISM_PRESETS = " + JSON.stringify(options.presets || []) + ";");
  if (options.config !== null) source += "\nconst QUESTISM_CONFIG = " + JSON.stringify({ ...config, ...options.config }) + ";\n";
  a.generation = null;
  a.hook = (name, text = "", extra = {}) => {
    const cx = { console: { log: (...args) => { a.debugLogs = [...(a.debugLogs || []), ...args.map(String)].slice(-4); } }, state: a.state, storyCards: a.cards, history: clone(a.actions), text,
      info: { actionCount: a.generation ?? a.count, maxChars: 30000, memoryLength: 0, ...extra },
      __add(keys, entry, type, title, description) { a.cards.push({ id: a.cards.length + 1, keys, entry, type, title, description }); return a.cards.length; } };
    const result = vm.runInNewContext("const addStoryCard = (...args) => __add(...args);\n" + source + "\n" + PANES[name], cx, { timeout: 2000 });
    a.state = clone(cx.state); a.cards = clone(cx.storyCards); return clone(result);
  };
  a.world = () => a.state.Questism.world;
  a.control = () => a.cards.find(c => c.type === "Questism Control");
  a.observe = () => { a.generation = null; return a.hook("context", "The accepted archive story context."); };
  a.append = (type, text) => { a.actions.push({ type, text }); a.count++; };
  a.begin = (input = "I wait quietly.") => { a.generation = a.count; const result = a.hook("input", input); assert(!result.stop, "story action must not be stopped"); a.append("story", result.text); return { inputIndex: a.actions.length - 1 }; };
  a.context = t => { t.context = a.hook("context", "The current accepted story.").text; return t; };
  a.output = (t, raw) => { t.output = a.hook("output", raw).text; t.outputIndex = a.actions.length; return t; };
  a.turn = (events = [], input = "I wait quietly.", prose = "The clerk stays at the desk.") => a.output(a.context(a.begin(input)), prose + wire(events));
  a.keep = t => { a.append("continue", t.output); a.observe(); return t; };
  a.menu = command => { const t = a.output(a.context(a.begin("/quest " + command)), "Unwanted model text."); assert.match(t.output, /Questism interface/); assert(!t.output.includes("Unwanted model text")); return a.keep(t); };
  a.saved = () => clone({ state: a.state, cards: a.cards, actions: a.actions, count: a.count });
  if (!options.saved) a.observe();
  return a;
}
module.exports = { ROOT, LIBRARY, adventure, wire, clone };
