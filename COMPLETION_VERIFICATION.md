# Completion verification · v0.1.26

Enable `verifyProgress: true` in creator configuration, or **Completion verification: on** in the control card. It is off by default for compatible existing scenarios and on in the standalone `another_chance_five_stop` sample. Install that sample's Library with the root Input/Context/Output panes. Start a fresh private adventure; do not combine overlapping Another Chance packs.

A narrative report is a proposal. Exact quotation establishes provenance, not fulfillment. When verification is enabled, any AI batch containing progress is held atomically after its narrative response is accepted. Headers, counts, rewards, stage transitions, and successor eligibility stay unchanged. Press Continue for a separate generation that sees only the current objectives and frozen accepted sources. Typed actions wait and remain in the action box.

The reviewer must decide every required criterion, quoting its permitted source exactly. Missing checks, wrong request IDs, invented quotes, uncertain decisions, malformed output, and budget overflow cannot advance the quest. Reviewer prose is discarded. A successful decision is still provisional until its deterministic interface response is accepted in story history. Final source and lifecycle validation then runs again under the more restrictive saved/current policy. Suggest mode still produces a proposal requiring approval.

After a completed review, choose your next player action. No-input Continue cannot create voluntary player movement or decisions. Quest interludes remain separate.

## Author criteria

An authored objective may contain 1–6 criteria with unique IDs:

```json
"verification": [
  {"id":"conversation", "text":"An actual family conversation has occurred.", "source":"recent"},
  {"id":"finish_leave", "text":"The CURRENT player explicitly finishes eating and leaves the table. A bite, question or promise is insufficient.", "source":"player"}
]
```

| Source | Permitted quote |
| --- | --- |
| `player` | Only the frozen current accepted player input |
| `narrator` | Current accepted narrator response; an already eligible frozen NPC progress scene when applicable |
| `exchange` | Current accepted player input or narrator response |
| `recent` | At most five recent accepted actions, each at most 1,500 characters, bounded by this quest's last semantic change; interface notices and commands excluded |

A player-action objective must retain at least one `player` criterion. Earlier actions never become current player proof. Missing optional author criteria fall back to a fulfillment check based on the objective. The current exchange is provided as contextual data so failed or obstructed attempts can be rejected, but context does not expand the allowed quotation source.

Review the result, not a matching location word. Use separate criteria for distinct required outcomes. Keep criterion wording concrete. Sample romance policies remain in their packs; the generic verifier has no character- or location-specific logic.

## Recovery and limits

Review requests freeze the original accepted-history prefix, quest state, checkpoint, literal reports, and applicable policy. Source edits invalidate them. History Retry/Undo removes verified transactions and can restore a still-valid review from its internal ledger proof. Manual `/quest undo` cancels that review. World-changing commands and disabling verification discard unverified work. Read-only journal commands preserve it. Reload and repeated hooks must not duplicate progress.

The entire review must fit the configured context budget and host limit. Sources are never silently shortened to fit. Increase the budget if the interface reports overflow. Review storage is bounded; oversized requests fail closed. Large batches or many criteria may also exceed a model's response length, leaving progress unchanged until a valid review is returned.

This is an independent model check, not a deterministic language-understanding guarantee. A reviewer can still misunderstand evidence. Source binding, required check coverage, atomic application, and rollback are enforced by code; semantic judgment requires live testing. Legacy mode deliberately retains the older single-report behavior. Manual correction commands remain explicit overrides and are not automatic-path evidence.
