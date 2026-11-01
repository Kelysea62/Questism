# Player-selected exclusive quest routes

Questism v0.1.20 adds the optional authored quest field `exclusiveGroup`. Quests sharing a lowercase ID are competing routes. A player may consider several offers; accepting one commits its recorded route and blocks acceptance of the others. Quests without this field keep their previous behavior.

```json
{
  "quests": [
    {
      "id": "restore_volume", "title": "Restore the Original",
      "exclusiveGroup": "exhibit_plan",
      "stages": [{"id":"restore","title":"Restore","objectives":[
        {"id":"binding","text":"Actually repair the damaged binding.","evidenceSource":"player"}
      ]}]
    },
    {
      "id": "copy_passage", "title": "Prepare a Working Copy",
      "exclusiveGroup": "exhibit_plan",
      "stages": [{"id":"copy","title":"Copy","objectives":[
        {"id":"passage","text":"Actually transcribe the exhibit passage.","evidenceSource":"player"}
      ]}]
    }
  ]
}
```

This minimal example has creator-declared available goals; it does not invent NPC dialogue. Add ordinary `giver` and `conditions` fields when a present character must actually offer a task before acceptance. The complete `exclusive_routes/` sample does that and includes a shared followup.

## Choosing a route

The existing `/quest start ID` command explicitly accepts an available quest. An AI `accept` report may also interpret the player's explicit agreement under the usual latest-player-input evidence rules. Auto mode commits only after its matching visible response enters accepted history. Suggest mode queues an interpretation for explicit approval; a proposal alone commits nothing. Use Suggest when you want to review the model's interpretation before it commits.

Eligibility, NPC offers, considering or tracking a task, questions and empty reports do not commit a route. Narrator-written agreement and no-input Continue cannot supply player acceptance. Grouped quests cannot use `autoStart: true`; automatic assignment must not select a route. Omitted or false `autoStart` is valid. Generated quests cannot define `exclusiveGroup`.

Declining an unaccepted route in v0.1.22 also commits nothing. The player may choose a competing offer, which can then block reconsideration of the declined route. Refusal does not free an already accepted commitment. See `REFUSAL_GUIDE.md` for the distinct unaccepted-offer states and fresh NPC renewal.

Acceptance and objective completion remain distinct. A batch cannot accept an unstarted quest and also progress it. Acceptance fills no objectives and establishes no additional player action, NPC consent, faction membership, permission or reward. Describe the commitment clearly without inventing the player's answer.

## Commitment and competing offers

Active, completed, failed and abandoned routes retain commitment. Abandonment follows its existing authored policy and does not switch routes; resumption retains progress. A prerequisite unlock cannot bypass a competing commitment. Manual completion still requires an active quest, so it cannot select an unaccepted alternative.

Commitment is derived from retained lifecycle records rather than a second mutable lock. Conflicting acceptance events in one enabled report reject the whole batch before changes or proposals. Different groups remain independent. Separate competing suggestions may coexist while neither route is selected; once one commits, approving another fails against current state. Inspect and reject stale proposals rather than treating old evidence as a new decision.

An already delivered competitor stays recorded with actual counts and `ROUTE BLOCKED` in cards, `/quest show`, list and journal views. Its saved status remains `available`, as with existing temporarily blocked offers, while acceptance is disallowed. Waiting or changing scene conditions cannot free a route block. Unrevealed competitors remain locked and retained in engine definitions. Later imports of new competitors are blocked too. Existing definitions cannot be rewritten.

The lock constrains mechanical acceptance, not what the player may write or how an NPC reacts. Correct misread records deliberately rather than inventing an in-story reversal.

## History and persistence

Undo of the original acceptance restores the preceding world, including competing offers. `/quest undo` removes only the latest retained transaction; later progress or dependent changes may need to be undone first. Source edits and Retry reconcile supported records and downstream effects through normal provenance checks. Repeated hooks and reload cannot commit twice.

Rebase preserves the selected route in its new baseline and discards older undo history. It does not release the choice. Edits crossing a saved checkpoint still require review; erased records are not reconstructed and there is no redo. This release has no route-reset command. Use this policy for choices intended to remain committed after failure or abandonment.

Actual v0.1.19 saves retain installed definitions, counts, settings, ledger and compatible pending reports. Membership is not retrofitted during upgrade. Use fresh adventures or new IDs for changed policies.

## Visibility and authoring

Current cards, available-offer context, NPC offer cues and notices explain commitment. Player/narrator packets do not enumerate private group IDs, hidden sibling titles, future objectives or dormant membership lists. Context budgets can omit whole rows or packets; saved definitions remain available to the engine.

The offline inspector exports full creator-only metadata: each quest's `exclusiveGroup`, an `exclusiveGroups` roster and group labels in DOT nodes. Keep those reports outside player/narrator context. Dependency edges remain ALL/ANY/milestone edges, not route decisions.

Dependency layers alone do not solve combinations of competing routes. As of v0.1.21, a separate bounded creator analysis checks compatible prerequisite/commitment proofs and names specific conflicts or incomplete results. It remains advisory and does not change current eligibility. Put followups outside the group, requiring the chosen quest's completion; use `requiresAny` for a shared followup. Full route satisfiability with flags, scenes and narrative feasibility remains unsolved. See `ROUTE_ANALYSIS_GUIDE.md`.

Group IDs follow ordinary Questism ID rules. A group may initially contain one quest so future packs can extend it. There is one group per quest and commitment occurs at acceptance. This release adds no nested groups, reversible switching, repeatability, timers or inventory rewards.

## Verification boundary

Public-hook tests supply reports for auto/manual acceptance, actual NPC offers, both configured routes and a later review, conflicts, stale approvals, source edits, Retry, Undo, repeated hooks, reload, rebase, imports and actual prior-version saves. Source mutations demonstrate regression sensitivity. See current route/mutation reports and `validation_summary.json`.

Live website testing is excluded. These tests validate mechanical behavior and provenance, not real-model recognition or narrative reliability. Rewards stay descriptive and historical missing-report limitations remain unresolved.
