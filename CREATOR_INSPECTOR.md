The copy-and-paste library.txt, input.txt, context.txt and output.txt panes, including sample library.txt files, are also protected from inspector export overwrite. Other report destinations remain usable.

# Structural prerequisite inspection

v0.1.24 protects every distributed JavaScript/CJS source, including configured Libraries and setup, and authored pack/validation inputs from export overwrite. Both JSON and DOT destinations are checked before either write, using path, realpath and file identity. Generated report destinations remain replaceable. Keep source files as inputs and use separate report filenames.

Questism v0.1.17 corrects how imports validate mixed prerequisites and adds a local creator tool. It does not infer events, run a model or access an AI Dungeon account.

## AND, OR and milestones

A quest needs every `requires` quest completed, at least one `requiresAny` quest completed when that list is nonempty, and every authored condition satisfied. A `quest` + `stage` condition needs that earlier stage completed, even if its quest has later stages still active.

The old validator treated every alternative as mandatory when looking for cycles. For example, it rejected this viable dependency structure:

- `access` needs `service` **or** `registration`.
- `service` needs `access`.
- `registration` has no quest prerequisite.

Registration provides an independent way into the graph. Completing it can make access eligible; completing access can then make service eligible. The service option is redundant on the first fresh run but can legitimately remain in a modular authored rule. A loop alone is not proof of a deadlock when an OR branch has a viable escape.

The shared analyser computes a bounded fixed point of mandatory prerequisites, alternative lists and milestone dependencies. It rejects missing references, missing stages and components with no structural route to start. An ALL cycle, a self-only alternative, or an OR cycle with no escape still rejects the entire import. An unrelated available quest does not rescue a disconnected deadlock. Existing schema, provenance and progression checks remain in force.

Structural viability is separate from actual eligibility. Passing analysis does not complete a seed, speak for an NPC, deliver an offer, accept a quest or satisfy a flag/scene gate. Runtime checks still require real recorded prerequisite completion and actual offers/acceptance where configured.

## Offline tool

Run with Node 18 or later from the release folder:

```text
node inspect_pack.cjs branching_dependencies/quest_pack.json
node inspect_pack.cjs branching_dependencies/quest_pack.json --json branch-plan.json --dot branch-plan.dot
```

With no output arguments, the report goes to stdout only. Output directories must already exist. `--help` prints usage. Exit 0 means the pack passed the current engine's structural/schema checks; exit 1 means invalid input or an I/O/argument failure. An invalid pack's requested DOT artifact is explicitly labeled `INVALID PACK`, rather than leaving an old successful graph as the apparent result.

The tool reads JSON only. It initializes the bundled Library/Input/Context/Output hooks inside isolated local VM state, previews the pack using the real `/quest validate`, and imports it only into that disposable state to obtain normalized definitions. It uses the exact same dependency helper embedded in Library. No saved adventure, account, model or website is used. Engine reply recognition is anchored to complete interface result prefixes; success-like strings in an invalid field name are data and cannot turn a rejected pack into a successful report.

Reports include potential dependency layers, ALL/ANY/milestone edges, required milestone IDs, the input hash and schema/condition warnings. DOT uses solid ALL edges, dashed ANY edges and dotted milestone edges. Titles and IDs are quoted data. The pack and bundled source paths are protected from use as output destinations; direct-path checks and file-identity unit tests are included.

**Creator-only:** these reports and graphs contain complete definitions, including unrevealed quests and future milestones. Keep them outside player/narrator context. They do not change the engine's bounded current-stage packets or dormant metadata privacy.

## Coverage limits

Potential layers are a structural plan, not a schedule or actual starts/completions. The tool does not prove that flags can be obtained, scenes can be reached at the right time, NPCs will offer a task, the player will accept it, or prose will fulfill an objective. Contradictory equality gates warn, but full temporal/narrative route reachability is not solved. Models are not called and recognition is not certified.

The inspector reads at most 1 MB from a file, and the engine retains its 180000-character Notes limit and normal schema/storage bounds. JavaScript setup files are not evaluated as pack input. A pack may require a separately authored initial setup when installed in an adventure; the report does not assume that setup's flags or scene.

The real hard-link alias integration test was blocked by `EPERM` when creating test links in this execution environment, both under temporary storage and the workspace. That integration is explicitly recorded as blocked and is not counted among passing checks. Ordinary input/source path protections and simulated file-identity unit checks passed; real alias behavior is not integration-certified here.

See `branching_dependencies/` for a configured example and `pack_inspector_results.json`, `v0117_dependency_results.json` and `validation_summary.json` for exact current verification. The original false-cycle rejection is reproduced against the preserved v0.1.16 source. The inspector also retains a before-fix spoof regression and a meaningful mutation that restores its original substring-recognition defect; those are intentionally failing diagnostic evidence, not current green results.

The offline tool begins with an empty isolated world. Include every prerequisite/milestone definition in the input roster. To inspect an addition that references definitions already installed in a real adventure, use that adventure's `/quest validate` or provide a complete combined pack locally; the inspector does not fetch or infer saved definitions.

## Category exports (v0.1.18)

Creator JSON includes every supplied quest's category or the uncategorized fallback, and DOT labels include explicit categories. These exports still contain unrevealed definitions and remain creator-only. Classification does not change potential dependency layers or imply runtime events.

## Per-action policy exports (v0.1.19)

Creator JSON includes `objectiveLimits`, with the quest, stage, objective, target, `maxPerAction` and required player-evidence source for every capped objective. The actual engine validates each policy before export. The array is empty when the pack omits these limits. It can contain unrevealed future-stage policies, so it remains creator-only. The tool does not simulate actions or prove that a counted action actually occurred; see `ACTION_LIMIT_GUIDE.md`.

## Exclusive quest routes (v0.1.20)

Creator JSON exports each quest's `exclusiveGroup` or null and a full `exclusiveGroups` roster. DOT labels name groups, while edges retain their ALL/ANY/milestone meanings. These exports include dormant membership and remain creator-only; player/narrator packets expose the current consequence without private IDs or hidden sibling lists.

Structural layers do not solve combinations of competing routes. Two roots in the same group can appear in the same layer even though only one may be accepted. Requiring both completions can make a connected pack impossible in normal play. Use separate followups or `requiresAny`; full choice/flag/scene satisfiability remains unsolved. See `EXCLUSIVE_ROUTES_GUIDE.md` and `exclusive_routes/`.

## Compatible prerequisite proofs (v0.1.21)

The inspector and `/quest validate` now share a bounded `route_analysis.js` helper for compatible prerequisite/commitment proofs. Inspector JSON includes `routeAnalysis`: scoped complete/incomplete status, possible quests, blocked findings only after completion, unknown quests, provisional minimal-proof counts, bounds and one independent assignment witness per proved quest. Orange dashed DOT nodes mark advisory conflicts. Existing ALL/ANY/milestone edges retain their meaning.

`valid: true` remains schema/basic structural validity, separate from these advisories. Imports and history replay are not newly rejected. Witnesses for different quests can conflict, and current adventure eligibility is not evaluated. Flags, scenes, NPC willingness, actual acceptance, prose and future storage remain outside scope. Exhaustion never certifies an unexplored route as impossible. Read `ROUTE_ANALYSIS_GUIDE.md` and `fixtures/ROUTE_ANALYSIS_EXAMPLES.md` before using creator reports in a design.

## Refusal metadata (v0.1.22)

Creator JSON includes each quest's effective `refusal` policy, using reoffer when the saved definition omits it. This export does not write a default into the adventure or record a player's choice. Static proofs still consider uncommitted definitions and do not reopen current refusals. Read `REFUSAL_GUIDE.md` before combining final refusal, NPC renewal and exclusive routes.

## Lifecycle status predicates (v0.1.23)

Creator JSON includes each quest's `statusConditions`, separately from completed `milestones`. Dotted blue edges are labeled `STATUS value`. The structural validator checks source references and dependency deadlocks. Completed-status requirements carry their source's route commitment; other lifecycle timing explicitly reports incomplete/unknown in `routeAnalysis`, with `deferredStatusQuests` and no certified blocked set. This does not reject a schema-valid pack or prove its narrative feasibility. `objective_choices/structural_preview.json` and `.dot` demonstrate the new recovery gate. Read `STATUS_CONDITIONS_GUIDE.md` before authoring consequences of a recorded interface choice.
