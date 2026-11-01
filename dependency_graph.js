/* Shared structural prerequisite analysis; no story state or host calls.
 * Input definitions have already passed Questism's authored schema checks.
 * Being structurally startable never proves an actual narrative event.
 */
const QuestismDependencies = (() => {
  "use strict";
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  function analyse(defs) {
    if (!defs || typeof defs !== "object" || Array.isArray(defs)) throw new Error("Expected normalized quest definitions.");
    const keys = Object.keys(defs);
    if (keys.length > 128) throw new Error("Dependency analysis permits at most 128 quests.");
    const milestones = new Map(), lifecycle = new Map(), edges = [];
    for (const key of keys) {
      const d = defs[key];
      if (!d || !Array.isArray(d.requires) || !Array.isArray(d.requiresAny) || !Array.isArray(d.stages)) throw new Error("Expected normalized definition: " + key + ".");
      const stages = (d.conditions || []).filter(c => own(c, "quest") && own(c, "stage")); milestones.set(key, stages);
      const statuses = (d.conditions || []).filter(c => own(c, "quest") && own(c, "status")); lifecycle.set(key, statuses);
      for (const c of stages) {
        if (!own(defs, c.quest) || !defs[c.quest].stages.some(stage => stage.id === c.stage)) throw new Error("Missing milestone " + c.quest + "/" + c.stage + " for " + key + ".");
        edges.push({ from: c.quest, to: key, kind: "milestone", stage: c.stage });
      }
      for (const c of statuses) {
        if (!own(defs, c.quest)) throw new Error("Missing status quest " + c.quest + " for " + key + ".");
        edges.push({ from: c.quest, to: key, kind: "status", status: c.status });
      }
      for (const [kind, deps] of [["all", d.requires], ["any", d.requiresAny]]) for (const dep of deps) {
        if (!own(defs, dep)) throw new Error("Missing prerequisite " + dep + " for " + key + ".");
        edges.push({ from: dep, to: key, kind });
      }
    }
    const reached = new Set(), potentialLayers = [];
    // Fixed point of AND(all + milestones) AND OR(any). A simple DFS would
    // incorrectly reject a cycle whose OR list has a reachable escape route.
    while (reached.size < keys.length) {
      const layer = keys.filter(key => {
        const d = defs[key];
        return !reached.has(key) && d.requires.every(dep => reached.has(dep)) &&
          (!d.requiresAny.length || d.requiresAny.some(dep => reached.has(dep))) &&
          milestones.get(key).every(c => reached.has(c.quest)) &&
          lifecycle.get(key).every(c => reached.has(c.quest));
      });
      if (!layer.length) break;
      potentialLayers.push(layer);
      for (const key of layer) reached.add(key);
    }
    return { potentialLayers, blocked: keys.filter(key => !reached.has(key)), edges, structuralOnly: true };
  }
  return { analyse };
})();
