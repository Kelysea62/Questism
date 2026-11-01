# Current quest status conditions

Questism v0.1.23 lets authored quests depend on another quest's exact current recorded status. This supports independent recovery or alternative opportunities after failure, abandonment or refusal. It creates no player decision, NPC knowledge, dialogue, work or reward.

```json
"conditions": [
  {"quest": "archive_visit", "status": "declined"},
  {"location": "archive_lobby"}
]
```

These predicates are ANDed with all other conditions, `requires` and `requiresAny`. Use exactly `quest` and `status` in a status predicate. A separate predicate can require a completed stage; do not mix `stage` and `status` in one object. Status conditions are authored-only, including explicit creator imports. Generated quests cannot define them. Referenced quests must exist in the combined installed/imported roster; missing references and structural dependency deadlocks reject the whole pack. Dry-run validation warns about contradictory exact statuses on one source.

## Supported values

| Status | What it records |
| --- | --- |
| `available` | A goal is available or an NPC offer was recorded; no acceptance implied |
| `active` | Accepted by the player or automatically assigned by an authored `autoStart` |
| `completed` | Recorded completion, including explicit manual correction |
| `failed` | An evidenced, accepted failure report or explicit failure correction |
| `abandoned` | Explicit player abandonment of an active authored quest |
| `declined` | Explicit player interface refusal of an unaccepted offer |
| `awaiting_offer` | Explicit reconsideration is waiting for a fresh NPC offer |

Hidden `locked` and `eligible` states are excluded. Values are exact lowercase strings. There is no list/OR-of-statuses predicate, elapsed-time check or historical "ever declined" query. A recorded interface refusal is not spoken dialogue and does not mean an NPC heard it. An automatic assignment is active without establishing player acceptance. Write giver instructions accordingly.

## Keep the events separate

Matching a gate makes a task eligible; a present giver still needs an actual fresh narrator offer before it is available. Player acceptance is later, and objective work later still. A newly accepted source outcome cannot also qualify and deliver its followup in the same report batch: record the source outcome first, then offer on a later turn. Unaccepted output or prose without a valid report changes no status. Suggest mode waits for approval.

Changing a source status withdraws an undelivered eligible opportunity. A previously delivered offer remains visible but acceptance rechecks current gates. Already active quests keep their progress and can finish if the source changes; status conditions are entry/recovery gates, not continuous objective restrictions. Explicit resumption and reconsideration check current conditions again. An old source-bound suggestion is rejected while gates are false; it can become approvable again when gates return true and its original source is still valid. Explicit decline or abandonment of the target clears its own suggestions.

Exclusive route commitments still apply. A failure or abandonment does not release its route, and a status-gated competitor cannot bypass it. A separate ungrouped recovery task can be appropriate. Manual `unlock` deliberately bypasses a quest's prerequisites; it does not clear a competing commitment or complete its source. Mechanical flags may be authored stage effects, but reward text remains descriptive: no inventory, money, stats or access is granted.

## Creator inspection and proof limits

The offline inspector exports `statusConditions` separately from `milestones`, plus dotted blue `STATUS value` edges. JSON/DOT contain future definitions and are creator-only. They never enter ordinary context automatically. Structural layers validate dependency connectivity, not narrative feasibility or simultaneous status satisfaction.

The bounded route helper models `completed` status as completion of its source, carrying that source's exclusive route. Other statuses depend on changeable ordering, so it explicitly returns `incomplete`, names `deferredStatusQuests`, keeps `blocked` empty and leaves unproved quests in `unknown`. It never treats refusal as completion or certifies unmodeled timing. Independent positive proofs can remain, including an OR descendant with an independently proved escape. Witnesses remain separate scoped plans, not a combined playthrough or current eligibility. See `ROUTE_ANALYSIS_GUIDE.md`.

```text
node inspect_pack.cjs objective_choices/quest_pack.json
node test_v0123_status_conditions.cjs
node test_v0123_mutations.cjs
```

## Configured example and persistence

The generic objective-choice pack adds **The Lobby Ledger** after declining the archive-entry goal while in the lobby. The clerk may independently offer form sorting without claiming to have heard the interface command. A later agreement and actual alphabetizing are required. Completing it sets only its authored tracker flag; the entry remains declined with zero work and the archivist favor stays locked. It grants no room permission or movement. Ordinary entry completion leaves the recovery locked. The package includes creator previews and full supplied-report traces for both paths.

The status predicate reads the existing ledger-derived record, adding no parallel state. Undo, Retry and source edits roll back the source and its dependent transactions; repeated hooks/reload do not duplicate them. Actual v0.1.22 saves and compatible pending output are preserved without retrofitting installed definitions. To use changed sample definitions, start a fresh adventure or author new IDs. Importing a new quest can use current outcomes of an existing source.

The focused suite has 47 cases and eleven meaningful source mutations. Reverse-ordered availability/automatic-assignment chains settle within their original transaction, including initialization and import, without manufacturing player acceptance. These simulations validate engine behavior with supplied reports, not model recognition, NPC willingness or narrative reliability. Live website testing is excluded. Current release counts and tested hashes are in `validation_summary.json`.
