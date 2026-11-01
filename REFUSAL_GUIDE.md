# Declining offers and reconsidering them

Questism v0.1.22 adds two explicit player commands:

```text
/quest decline QUEST_ID
/quest reconsider QUEST_ID
```

Decline closes an unaccepted recorded offer or a pending reconsideration. It creates no acceptance, completed objective, NPC reaction, penalty, relationship change or reward. Active quests use the existing abandonment commands instead. Hidden, completed, failed and abandoned records cannot be declined as unaccepted offers.

The commands work on authored goals and generated offers. A player may close an offer even when its current acceptance gates are blocked. The default policy allows later reconsideration; old definitions remain unchanged in saved data and acquire no new field automatically.

## Authored policy

Presets and creator imports may set:

```json
"refusal": "reoffer"
```

| Policy | Effect |
| --- | --- |
| omitted or `"reoffer"` | Explicit reconsideration is permitted when current conditions and route rules allow it |
| `"final"` | Decline is retained as final; reconsideration is unavailable, while Undo remains a deliberate correction within retained history |

Generated quests cannot invent this metadata. Their omitted field uses the normal reconsiderable default. False, null, off, resume and other values are invalid. Refusal policy controls recovery, not whether a player must accept an offer. It is separate from `abandonment`, which applies after activation.

Changing a preset or imported definition does not overwrite an installed quest. Use fresh adventures or new IDs to install a different authored policy. In the configured `objective_choices` sample, the initial archive goal has final refusal and the archivist's offered favor permits a fresh re-offer. Other sample definitions remain unchanged.

## NPC offers stay separate

An authored quest with a `giver` follows:

```text
available -> decline -> declined
declined -> reconsider -> awaiting_offer
awaiting_offer -> actual fresh NPC delivery -> available
available -> later player acceptance -> active
```

Reconsideration checks current prerequisites, flag/location/day/time conditions and any competing route commitment. Giver presence is checked for actual delivery, so requesting reconsideration never summons a character. While waiting, the giver may be absent, defer or refuse. The record stays visible even if scene conditions later stop matching.

For AI interpretation, only a fresh current NPC quote can support renewed delivery. Repeating an old offer in player input, reusing an earlier suggestion, or pressing Continue with an old agreement cannot provide that proof. Delivery and acceptance remain different accepted turns. No quest progress is awarded for reopening consideration.

The existing `/quest offer ID` remains an explicit manual correction after reconsideration when gates and giver presence match. It records an interface override, never actual NPC dialogue or acceptance. It cannot reopen a still-declined record. Keep that correction distinct from a verified fresh offer when reporting tests.

The player can decline again while awaiting an offer. A closed `declined` record cannot be reopened by a model-reported offer or ordinary acceptance command. Its refusal must first be reconsidered explicitly, unless corrected through retained history.

## Goals without a giver

For a creator-declared goal or generated opportunity without an authored `giver`, reconsideration returns to `available` directly. This restores interface availability; it does not declare new NPC dialogue, consent, standing promises or player acceptance. The engine cannot enforce a named giver's renewed willingness without that authored identity. Creators needing a fresh NPC delivery boundary should define the giver and its conditions.

Quest notices call these records available goals and do not manufacture a new NPC offer. All rewards remain descriptive; no inventory, currency, stats or relationships are maintained by refusal/reconsideration.

## Player control and history

These are player-only interface commands in this release. AI `decline` and `reconsider` events are unsupported. Natural refusal or a quoted command in dialogue does not silently change mechanical status when the report is empty. Use the explicit command to close the record. A command does not write a spoken refusal or decide how the NPC reacts.

Decline removes that quest's tracking priority and queued suggestions, preserving unrelated proposals. Old acceptance proof cannot become usable again when a fresh offer returns the same quest to its original stage and counts. Undo of decline restores the preceding world and suggestions as an explicit correction.

Declining a competing route does not select it. Accepting a different route can block later reconsideration. Completion prerequisites, stage effects and rewards are never satisfied by refusal. Existing manual offer/unlock/completion commands do not bypass the declined state.

Retry of a retained command returns its cached interface report without executing it twice. Removing/editing its accepted command reconciles the transaction. Removing reconsideration also removes dependent re-offer, acceptance and completion effects supported by that later interval. Reload and repeated hooks retain the state. Rebase preserves refusal and intentionally clears older undo history; it cannot undo a final choice from a discarded ledger. Existing Undo/rebase retention limits still apply.

With quest pauses enabled, decline invalidates an obsolete queued available notice. Reconsidering a goal or recording a fresh NPC offer may queue the usual availability notice. Neither that notice nor the command response supplies story evidence or acceptance.

## Journal and visibility

`declined` and `awaiting_offer` are retained revealed states:

```text
/quest list declined
/quest list awaiting_offer
/quest journal declined category side
/quest journal awaiting_offer
/quest show QUEST_ID
```

Categories count them normally. Cards retain current objectives and the detailed journal; no count or completed stage is filled in. Waiting records show unmet conditions or missing giver presence. Closed/waiting records are excluded from acceptance cues; a willing present giver receives a bounded renewal cue only after explicit reconsideration. Unrevealed quests remain private and cannot be discovered by these commands.

The creator-only inspector exports each quest's effective refusal policy. Static route analysis still considers independent paths from uncommitted definitions; it does not reopen current refusals or certify an NPC's willingness.

## Verification and limits

The release adds 51 public-hook cases and ten source mutations, including the complete configured archive-favor route through refusal, reconsideration, a fresh offer, separate acceptance, actual work and reload. Tests cover stale suggestions, competing routes, source edits, Retry, Undo, controls/Notes migration, pending old delivery, paused notices, both new journal filters and an explicitly labeled manual offer correction. The previous release's root and configured Libraries are retained for a repeatable unsupported-feature baseline.

Tests supply reports through actual Input/Context/Output hooks. They validate state and provenance, not real-model recognition, fresh NPC willingness or narrative reliability. Live testing remains excluded. Missing historical reports and semantic duplicate generated offers remain unresolved; declining a record does not identify every paraphrased duplicate the model might invent.
