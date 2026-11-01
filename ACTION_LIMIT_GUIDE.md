# Authored limits on progress per player action

Questism v0.1.19 adds the objective field `maxPerAction`. Use it when a counted objective explicitly requires separate player actions, such as visiting one new area or tending one plot per action. It is optional: omitting it preserves the previous counting behavior.

```json
{
  "id": "visit_areas",
  "text": "Actually reach two different areas, one per separate player action.",
  "target": 2,
  "evidenceSource": "player",
  "maxPerAction": 1,
  "distinctItems": ["library", "courtyard", "reading_room"]
}
```

The field belongs to an authored preset/imported objective. It must be an integer from 1 through the objective target and requires `evidenceSource: "player"`. Zero, negatives, fractions, strings, null and booleans are invalid. A generated quest cannot define the policy. It works with ordinary counters, distinct items, optional work and alternative objectives. Every objective has its own allowance; completing one does not spend another objective's allowance.

Progress events still report absolute totals. For the example, the first actual library visit can report:

```json
{"op":"progress","quest":"tour","stage":"areas","objective":"visit_areas","value":1,"items":["library"],"evidence":"exact quote from the latest player action"}
```

After that report is accepted, a separate actual courtyard visit can report `value: 2` with `items: ["courtyard"]`. Already recorded IDs do not consume another new-item allowance. Repeating an area provides no extra count. Prefer one progress event per objective in a report; distinct totals must match the engine's existing unique-item rules.

## Atomic report validation

The engine checks the whole enabled report against the saved state before applying changes or queuing suggestions. Across all events for one objective, neither the greatest count increase nor the union of newly recorded distinct IDs may exceed its limit. Duplicate events cannot multiply the allowance. New IDs remain bounded even after an optional objective's numeric target has been reached. A limit of two permits ordinary absolute totals of one and two in one batch; those totals are not added together as three credits.

An over-limit report is rejected in full. It is not clipped, partially applied, or saved for later delivery. Other quest updates in that same enabled batch are rejected too. The last report issue records the reason for inspection. Resubmit only results supported by the current action; an unrelated later action cannot establish a previously uncredited visit. The script validates exact current-source provenance, while the model must still interpret what the action means.

In Suggest mode, an over-limit batch queues nothing. A valid update needs the ordinary explicit approval and is checked again against the current state. Source edits, removed outputs, future-stage events and narration pretending to be player input retain their existing rejection rules. No-input Continue supplies no new player-action evidence. Repeated hooks cannot commit the accepted report twice. Retry, Undo and reload retain the existing accepted-history behavior.

## Visibility and installation

Current quest cards, `/quest show`, and active context explain the policy. Future-stage and locked/eligible details remain withheld. Context budgets can still omit a whole quest packet; omission does not lose saved definitions or progress. The creator-only inspector exports every supplied policy under `objectiveLimits`, with quest/stage/objective IDs and target. Those exports can include future content and must stay outside narrator/player context.

The conditions sample now mechanically enforces its existing tour instruction of one newly visited area per separate player action. The branching sample demonstrates one actual stack-sorting credit per action. Its registration, appointment, NPC offers and player acceptance remain separate events. The original opening and objective-choice packs keep their definitions.

All configured Libraries are rebuilt from the generic engine. Existing adventure definitions stay protected on upgrade; they do not silently acquire limits. Use a fresh adventure or a new quest ID to install the changed objectives. Actual v0.1.18 saves, undo records and uncapped pending updates remain compatible.

Manual `/quest set`, `/quest next` and `/quest complete` remain explicit corrections that bypass AI counting policy. They establish no story action. A changed manual distinct count retains the existing behavior of clearing that objective's item evidence; Undo restores the transaction's prior state. Avoid treating an override as proof of a visit, decision or earned narrative result.

## Scope of the guarantee

This is a bookkeeping limit on AI-reported credit. It does not restrict the player's prose, decide which destinations the player chooses, or prove that a quoted sentence fulfills an objective. It does not grant inventory, money, permissions, relationships or other descriptive rewards. No timers, elapsed days, repeatability, automatic catch-up or deferred player-action recovery are introduced.

Local public-hook tests supply model reports and validate engine behavior. They do not establish real-model recognition or narrative reliability. Live website testing is excluded. See `v0119_action_limit_results.json`, `v0119_mutation_results.json`, `validation_summary.json` and the current release notes for actual verification.
