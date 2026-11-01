# Compatible route prerequisite analysis

Questism v0.1.21 adds bounded creator analysis to `/quest validate` and the offline inspector. It identifies incompatible combinations of quest prerequisites and exclusive route commitments, including transitive dependencies and completed-stage gates. It produces advisory findings and compatible assignment examples, without changing quest state or runtime evidence rules.

The basic dependency validator still checks schema, references, milestones and structural cycles as before. The new analysis is separate: a graph can be connected yet require two quests whose acceptance rules prohibit completing both.

As of v0.1.23, exact `completed` status conditions carry the same completion proof as `requires`. Other lifecycle statuses depend on ordering and may change, so they explicitly defer analysis with `incomplete`, `deferredStatusQuests` and unresolved `unknown` entries. No `blocked` finding is certified for an incomplete result. Independent positive proofs and independently grounded OR escapes can remain. Status edges do not mean a source is completed; see `STATUS_CONDITIONS_GUIDE.md`.

## A useful distinction

Suppose `restore` and `copy` share `exclusiveGroup: "archive_plan"`:

```json
{"id":"impossible_review","title":"Incompatible Review","requires":["restore","copy"],"stages":[{"id":"review","title":"Review","objectives":[{"id":"listen","text":"Hear the review."}]}]}
```

This requires both competing routes and has no compatible normal prerequisite proof. Validation names `impossible_review` in a `STRUCTURAL ROUTE CONFLICT` advisory. By contrast, a shared followup using `requiresAny: ["restore", "copy"]` has two compatible choices. It does not require or select both.

The same checks cover indirect prerequisites, a quest requiring its own competitor, and completed-stage conditions carrying a parent's route choice. Repeated dependence on the same route is harmless. Independent groups can combine. An OR cycle with a genuine independent escape remains possible; choices from separate alternatives are never merged as if they happened in one world.

## Use the tools

Put the candidate pack in the Control Panel Notes and use `/quest validate`. It examines the candidate together with installed definitions and reports a scoped complete/incomplete result. It installs nothing and consumes no quest transaction. `/quest import` remains a separate explicit action.

For local JSON/DOT reports:

```text
node inspect_pack.cjs exclusive_routes/quest_pack.json
node inspect_pack.cjs fixtures/route_conflict_pack.json --json route-report.json --dot route-report.dot
```

The fixture is deliberately a creator diagnostic example, not a configured play scenario. Its `impossible_review` is incompatible; `shared_review` is the corrected alternative pattern. Orange dashed DOT nodes mark advisory route conflicts. ALL/ANY/milestone edges keep their existing meanings. An incomplete analysis never colors an unresolved node as impossible.

The inspector's `valid: true` still means the pack passed schema/reference/basic structural checks. Advisory route conflicts appear separately under `routeAnalysis` and warnings; they do not mean the story is playable. Basic schema/reference/cycle failures remain errors. Existing imports and saved transactions are preserved, including older packs with incompatible authoring rules. The new analysis is never called by state replay to reject or erase them.

## Read a route report

| Field | Meaning |
| --- | --- |
| `status`, `complete` | Whether this bounded search exhausted its work under the stated abstraction |
| `possible` | Quests with at least one compatible static prerequisite proof, considered independently |
| `blocked` | Quests with no such proof, populated only after a complete search |
| `unknown` | Unproved quests when a resource bound or unmodeled lifecycle timing prevented completion; these are not certified impossible |
| `deferredStatusQuests` | Quests with noncompleted status predicates whose temporal requirements are not modeled |
| `witnesses` | One compatible group-to-quest assignment example per proved quest |
| `proofCounts` | Number of currently retained minimal choice assignments; provisional when analysis is incomplete |
| `limits`, `steps`, `reasons` | Resource bounds, charged work and any reason the search stopped |
| `scope` | The precise abstraction; actual story events and current eligibility are outside it |

Witnesses for different quests may conflict with each other. Each is an independent possible plan, not one combined playthrough or a player decision. An empty assignment means no exclusive route commitment is needed in that proof; it does not mean no work is required. Proof counts are not numbers of story paths, endings or rewards.

During an incomplete search, proof counts can grow or shrink: a later less restrictive proof may replace several provisional ones. Already proved witnesses remain valid, but the final minimal assignment count is unknown. `unknown` can be empty if every quest has a proof while some additional alternatives remain unexplored.

The helper preserves every incomparable minimal choice assignment and discards only supersets already covered by a less restrictive proof. It propagates grounded proofs through prerequisites and alternatives, rather than enumerating invented story actions. Defaults allow 50,000 charged steps, 128 proofs per family and 2,048 stored quest proofs. Temporary merge families are bounded too. Exhaustion reports `incomplete`, keeps already proved witnesses, and leaves `blocked` empty. It never clips alternatives and then certifies the remainder impossible.

The pure helper supports bounded limit arguments for local developer tools/tests. The command and inspector use the same defaults. There is no new gameplay control and no extra model call.

## Scope and compatibility

This analyses static definitions from an uncommitted starting point. It does not evaluate the current adventure's selected route, reset commitments, unlock a quest or predict current availability. Completion of a stage carries its parent quest's choice; stage objectives are assumed satisfiable for this abstraction. Flags, scene/time/day restrictions, NPC willingness, actual offers, player agreement, narrative recognition, future storage capacity and manual prerequisite overrides are not solved.

`complete` certifies only that scoped search. A compatible proof is not a promised playable story, and a current route blocked by an earlier player choice can still have an independent static proof. Fix an advisory by revising the authored dependency design, using separate followups or a suitable `requiresAny`; changed saved definitions still require fresh adventures or new IDs.

Creator reports include dormant quest IDs, group membership and future dependencies. Keep them outside ordinary narrator/player context. An explicit in-adventure validation report can enter story history; Questism cannot make the model forget details already in that history. The engine's normal packets do not automatically include analysis findings or uninstalled definitions.

The v0.1.21 introduction preserved actual v0.1.20 saves and all five pack definitions. Current v0.1.23 preserves actual v0.1.22 saves and pending interpretations, and adds the independent status-gated task to objective_choices. No new persistent lock, inferred progress, mechanical reward or route-reset behavior is introduced. Libraries are rebuilt from the tested source.

## Verification

The focused suite has 32 cases covering pure analysis and actual Input/Context/Output commands, resource exhaustion, legacy import replay, source edits, Retry, reload, current-choice isolation and all configured packs. Two cases compare both reachable quests and witness assignments against an independent exhaustive completion-state simulator across 256 small graphs. Nine mutations demonstrate detection of incompatible merging, missing choices/milestones, incorrectly mandatory alternatives, bad dominance, false budget certification, missing bounds, missing migration and disconnected diagnostics.

These local simulations establish behavior under the stated abstraction. They do not establish real-model recognition or narrative reliability. Live website testing remains excluded. Current counts and tested hashes are in `validation_summary.json`.
