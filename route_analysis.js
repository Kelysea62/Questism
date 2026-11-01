/* Bounded creator-only prerequisite proofs under exclusive route commitments.
 * Advisory analysis: never used to accept quests, infer events or replay state.
 * Input definitions have already passed Questism's schema/reference checks.
 */
const QuestismRouteAnalysis = (() => {
  "use strict";
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const compare = (a, b) => a === b ? 0 : a < b ? -1 : 1;
  const DEFAULT = { maxSteps: 50000, maxProofs: 128, maxTotalProofs: 2048 };
  const MAXIMUM = { maxSteps: 250000, maxProofs: 256, maxTotalProofs: 4096 };
  function analyse(defs, options = {}) {
    if (!defs || typeof defs !== "object" || Array.isArray(defs)) throw new Error("Expected normalized quest definitions.");
    if (!options || typeof options !== "object" || Array.isArray(options)) throw new Error("Invalid route analysis limits.");
    const limits = { ...DEFAULT };
    for (const [key, value] of Object.entries(options)) {
      if (!own(MAXIMUM, key) || !Number.isInteger(value) || value < 1 || value > MAXIMUM[key]) throw new Error("Invalid route analysis limit: " + key + ".");
      limits[key] = value;
    }
    const keys = Object.keys(defs);
    if (keys.length > 128) throw new Error("Route analysis permits at most 128 quests.");
    const mandatory = new Map(), deferredStatuses = new Set(), dependents = new Map(keys.map(key => [key, new Set()])), families = new Map(keys.map(key => [key, []]));
    for (const key of keys) {
      const d = defs[key];
      if (!d || !Array.isArray(d.requires) || !Array.isArray(d.requiresAny) || !Array.isArray(d.stages)) throw new Error("Expected normalized definition: " + key + ".");
      const milestones = (d.conditions || []).filter(c => own(c, "quest") && own(c, "stage"));
      const statuses = (d.conditions || []).filter(c => own(c, "quest") && own(c, "status"));
      const completedStatuses = statuses.filter(c => c.status === "completed"), timedStatuses = statuses.filter(c => c.status !== "completed");
      if (timedStatuses.length) deferredStatuses.add(key);
      const required = [...new Set(d.requires.concat(milestones.map(c => c.quest)).concat(completedStatuses.map(c => c.quest)))]; mandatory.set(key, required);
      for (const dep of required.concat(d.requiresAny, timedStatuses.map(c => c.quest))) {
        if (!own(defs, dep)) throw new Error("Missing prerequisite " + dep + " for " + key + ".");
        dependents.get(dep).add(key);
      }
      for (const c of milestones) if (!defs[c.quest].stages.some(stage => stage.id === c.stage)) throw new Error("Missing milestone " + c.quest + "/" + c.stage + ".");
    }
    // A proof is a sorted list of grouped quest IDs that must be committed.
    // Keep every incomparable minimal proof: merging OR branches would falsely
    // combine incompatible worlds, while selecting just one could miss escapes.
    const STOP = {}, reasons = []; let steps = 0, complete = true, totalProofs = 0;
    function halt(reason) { reasons.push(reason); throw STOP; }
    function tick() { if (steps >= limits.maxSteps) halt("step budget exhausted"); steps++; }
    function subset(a, b) {
      if (a.length > b.length) return false;
      for (const choice of a) { tick(); if (!b.includes(choice)) return false; }
      return true;
    }
    function add(family, proof) {
      tick();
      for (const prior of family) if (subset(prior, proof)) return false;
      const kept = family.filter(prior => !subset(proof, prior));
      if (kept.length >= limits.maxProofs) halt("per-quest proof limit exhausted");
      family.splice(0, family.length, ...kept, proof);
      family.sort((a, b) => a.length - b.length || compare(a.join("|"), b.join("|")));
      return true;
    }
    function merge(left, right) {
      tick(); const merged = left.slice();
      for (const choice of right) {
        tick(); if (merged.includes(choice)) continue;
        const group = defs[choice].exclusiveGroup;
        if (merged.some(other => defs[other].exclusiveGroup === group)) return null;
        merged.push(choice);
      }
      return merged.sort();
    }
    function combine(left, right) {
      const result = [];
      for (const a of left) for (const b of right) { const proof = merge(a, b); if (proof) add(result, proof); }
      return result;
    }
    const queue = keys.slice(), queued = new Set(keys);
    try {
      for (let at = 0; at < queue.length; at++) {
        const key = queue[at], d = defs[key], required = mandatory.get(key); queued.delete(key); tick();
        // These exact states depend on ordering and can change after a choice.
        // Do not silently treat them as completion or mix temporal worlds.
        if (deferredStatuses.has(key)) continue;
        if (required.some(dep => !families.get(dep).length) || (d.requiresAny.length && !d.requiresAny.some(dep => families.get(dep).length))) continue;
        // Anchor this quest's own choice first, pruning incompatible parents.
        let candidates = d.exclusiveGroup ? [[key]] : [[]];
        const ordered = required.slice().sort((a, b) => families.get(a).length - families.get(b).length);
        for (const dep of ordered) { candidates = combine(candidates, families.get(dep)); if (!candidates.length) break; }
        if (candidates.length && d.requiresAny.length) {
          const alternatives = [];
          const proofs = d.requiresAny.flatMap(dep => families.get(dep)).slice().sort((a, b) => a.length - b.length || compare(a.join("|"), b.join("|")));
          for (const proof of proofs) add(alternatives, proof);
          candidates = combine(candidates, alternatives);
        }
        let changed = false; const prior = families.get(key), nextFamily = prior.slice();
        for (const proof of candidates) if (add(nextFamily, proof)) changed = true;
        const projectedTotal = totalProofs - prior.length + nextFamily.length;
        if (projectedTotal > limits.maxTotalProofs) halt("total proof limit exhausted");
        if (changed) { families.set(key, nextFamily); totalProofs = projectedTotal; }
        if (changed) for (const next of dependents.get(key)) if (!queued.has(next)) { queue.push(next); queued.add(next); }
      }
    } catch (error) { if (error !== STOP) throw error; complete = false; }
    if (deferredStatuses.size) { complete = false; reasons.push("lifecycle status timing not modelled for: " + [...deferredStatuses].join(", ")); }
    const possible = keys.filter(key => families.get(key).length), unresolved = keys.filter(key => !families.get(key).length);
    return {
      status: complete ? "complete" : "incomplete", complete,
      scope: "Independent static paths from uncommitted definitions: quest prerequisites, completed-stage/completed-status gates and exclusive route commitments only; other lifecycle status timing reports incomplete. Current eligibility, flags, scenes, NPC willingness, player acceptance and narrative objectives are not solved. Manual overrides are excluded.",
      limits, steps, reasons, possible, blocked: complete ? unresolved : [], unknown: complete ? [] : unresolved,
      deferredStatusQuests: [...deferredStatuses],
      proofCounts: Object.fromEntries(keys.map(key => [key, families.get(key).length])),
      witnesses: possible.map(key => ({ quest: key, commitments: families.get(key)[0].map(choice => ({ group: defs[choice].exclusiveGroup, quest: choice })).sort((a, b) => compare(a.group, b.group) || compare(a.quest, b.quest)) })),
      narrativeFeasibilityTested: false
    };
  }
  return { analyse };
})();
