# Player-controlled abandonment and resumption

For an unaccepted offer, use the v0.1.22 decline/reconsider lifecycle in `REFUSAL_GUIDE.md`. Abandonment applies to active quests and does not substitute for refusal. Reconsidering an NPC task requires a fresh offer before acceptance; resuming an already active-then-abandoned task retains the earlier participation interval rules described below.

Questism v0.1.16 adds an optional authored quest field:

```json
"abandonment": "resume"
```

| Policy | Behavior |
| --- | --- |
| omitted or `"off"` | Keep the previous behavior; the abandonment command is disabled. |
| `"resume"` | The player can abandon an active quest and later explicitly resume its saved stage and progress when current gates permit it. |
| `"final"` | The player can abandon an active quest, but cannot resume it. Undo remains an explicit correction while its transaction remains in history. |

Only presets and creator imports may set this policy. Generated quests cannot invent it, and changing a preset does not overwrite a saved definition. Use a fresh adventure or a new quest ID to install changed definitions. `/quest validate` checks the field without installing anything.

## Player commands and agency

- `/quest abandon ID` changes an active quest to `abandoned`.
- `/quest resume ID` returns a resumable abandoned quest to `active` if its current conditions match.
- `/quest list abandoned` lists these revealed records.
- `/quest show ID` retains the current stage, observed counts and journal, including the policy and blocked-resume status.

These are explicit player interface choices. The model cannot report abandonment or resumption as an AI event, and narrator-written decisions cannot change these states. Asking about an offer, refusing an unaccepted offer, failing a quest, abandoning an active task and completing it remain separate events. The new command accepts only active quests; it does not stand in for refusal or acceptance. The player can always ignore a story opportunity regardless of a pack's mechanical policy.

Abandonment removes the quest from tracked priorities and active guidance. Its card and journal remain, with actual counts and completed milestones intact. No objective, stage, reward, inventory change, attraction or relationship success is awarded by abandonment. Previously completed stages and their authored flags remain true historical records; abandoning a later stage does not revoke them or satisfy a quest-completion prerequisite.

Resumption restores the same stage, counts, optional progress and unique items. It is neither a restart nor an additional reward. It does not create a new NPC offer, guarantee that a character still agrees, move the player, or complete an action. Authored prerequisites and typed flag/location/day/time gates are checked again. An existing explicit prerequisite-unlock override remains effective, as it does for acceptance. Giver presence is required for original NPC delivery; resumption of a previously active task does not demand a fresh offer or implicitly establish presence. Authors should encode any additional ongoing restriction in the available condition system.

Final or disabled policies cannot be bypassed with `/quest resume`. Completed and failed quests cannot be revived with it. `/quest start` still accepts only an available quest, so it cannot restart an abandoned one. `autoStart` does not automatically reactivate an abandoned task. Manual corrections such as Undo remain explicitly separate from normal progression.

With the v0.1.20 `exclusiveGroup` policy, abandoning a selected route retains its commitment and does not enable a competing route. Resumption preserves the original choice. Undo of the original acceptance is an explicit record correction within retained history; rebase keeps the choice. See `EXCLUSIVE_ROUTES_GUIDE.md` before combining these policies.

## Evidence and proposals

Abandonment clears pending suggestions for that quest, including progress and failure suggestions, while leaving unrelated quest proposals alone. Otherwise an old suggestion could become valid again after returning to the same stage and counts. Undo of abandonment restores the earlier world and suggestions as a deliberate correction.

Resumption starts a new participation interval. An older player action cannot supply current player proof; the recent-NPC recovery path also excludes scenes before the abandonment/resumption journal boundary. New progress still needs valid current evidence. Unaccepted raw output never commits merely because a later abandonment command runs.

In Auto mode, accepted observations that commit before the abandonment command remain recorded. In Suggest mode, approve any interpretation you want retained before abandoning; discarded suggestions do not become recorded counts. Resuming never replays discarded reports or completes a backlog of objectives.

## Notices and persistence

With Quest pauses enabled, resumption has a `QUEST RESUMED` notice showing the saved current objectives and counts. Abandonment itself returns a deterministic interface report. Neither response advances the story or provides evidence of a completed objective. Resume with action retains its normal protection after a notice.

Undo, Retry, reload, rebase and history rollback preserve the relevant counts and lifecycle state. New transaction-producing commands are now anchored to the canonical accepted Do/Story action that requested them. Removing, editing or replacing that command invalidates its transaction when the accepted history reveals the mismatch. Retry of a retained command response returns its report without executing the command again.

The command binding fix also applies to new ordinary commands such as start, set and import. Before v0.1.16 those commands used the preceding history boundary, which could retain a removed correction. Compatible upgrades preserve older transactions and records; pre-v0.1.16 commands do not retroactively gain the new fingerprints. Review older manual corrections after editing their historical actions, or use a fresh adventure when those older boundaries matter. Rebase preserves reviewed state and intentionally clears older undo history; it is not automatic reconstruction.

## Example and verification

`objective_choices/` now marks its initial visit as final-abandonable and its offered archivist favor as resumable. The favor's reading-room condition demonstrates a temporarily blocked resume after leaving the room. This is generic pack policy; the Another Chance pack definitions remain unchanged.

The local suite exercises both policies, current gates, proposal invalidation, actual previous-version saves, exact source edits, no-input Continue, Retry, Undo, reload and rollback through real Input/Context/Output hooks. Its reports are supplied by tests. No live website or real-model recognition test was performed. The historical missing school-arrival report and semantic duplicate generated offers remain unresolved.

The new canonical binding covers commands that create retained quest transactions. `/quest undo` and `/quest rebase` intentionally remove older retained transactions rather than creating a redo record. Deleting their command text cannot reconstruct a cleared ledger. Preserve a baseline before discarding retention history when you need that recovery path.
