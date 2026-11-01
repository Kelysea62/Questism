# Questism v0.1.29 beta — player and creator guide

Questism v0.1.29 beta candidate: 1207/1207 current local checks across 48 suites passed. No fresh native playthrough was run for this wording patch. The v0.1.28 Gemma pass is historical predecessor evidence, not a v0.1.29 native certificate.

Start with START_HERE.md. Install one Library and the three root hooks. The generic Library starts empty; configured Libraries include their own preset definitions and setup.

## Voluntary quests

Quests are optional, even tracked/auto-assigned. Follow the player's scene; do not redirect it, nag or invent quest pressure. Preserve NPC motives and logical consequences. Required objectives define completion, not obligation.

Leaving work unfinished needs no abandonment command. Tracking prioritizes context without committing the player to that quest.

## Controls

Edit the labeled settings in the Questism Control Panel Entry. The engine retains valid saved choices; creator defaults initialize fresh saves.

| Control | Meaning |
| --- | --- |
| Enabled | Turn AI quest updates and quest guidance on or off; commands remain available |
| New quests | Off, Suggest or Auto for model-created offers; independent from authored quests |
| AI progression | Off, Suggest or Auto for reports about offers, acceptance and progress |
| Context budget | Bound quest guidance supplied to the model; 1,500–12,000 characters |
| Notifications | Show quest update notices |
| Quest header | Show a short current-objective header |
| Quest pauses | Separate available, received, resumed and completed updates from narration |
| Resume with action | Wait for a new player action after a quest notice |
| Completion verification | Hold proposed AI progress for a separate source-bound review |
| Compact reports | Use short current-turn event references instead of model-copied JSON proof |

Generic defaults preserve compatibility: New quests off, AI progression Suggest, budget 6000, notifications on, and the remaining optional controls off. The five-stop profile uses authored automatic progression, budget 10000, headers, pauses, action resumption, completion verification and compact reports.

Suggest queues proposals for inspection; `/quest approve ID` and `/quest reject ID` decide each proposal. Auto still validates evidence, stage, conditions, history and policy before applying an accepted report. Completion verification adds a model review; it does not guarantee semantic accuracy. Omitted or rejected reports do not authorize inferred progress.

## Common commands

| Command | Purpose |
| --- | --- |
| `/quest help` | Full command reference |
| `/quest journal` | Browse revealed quests |
| `/quest categories` | Browse revealed category counts |
| `/quest show ID` | Inspect one revealed quest |
| `/quest track ID` | Prioritize an active quest's context |
| `/quest start ID` | Explicitly accept an available quest |
| `/quest decline ID` | Close an unaccepted offer |
| `/quest reconsider ID` | Reopen consideration if authored policy and current gates permit |
| `/quest abandon ID` | Abandon active work when authored policy permits |
| `/quest resume ID` | Resume retained work if permitted and current gates match |
| `/quest proposals` | Inspect pending suggestions |
| `/quest validate` | Preview the pack placed in Control Panel Notes |
| `/quest import` | Separately import validated new quest definitions |
| `/quest undo` | Explicitly correct the latest retained quest transaction |

Use commands at the beginning of a Story or Do action. Commands use a normal host generation and replace its response with an interface report; they do not intentionally advance the scene. Correction commands such as set, next, complete, scene, offer and unlock are listed in `/quest help`. They are manual interventions, not automatic-path evidence.

## Evidence, choices and rewards

Quest availability does not prove an NPC offer, and an offer does not establish agreement. Player-source objectives and natural acceptance bind current player input. Intentions, promises, headers and interface notices are not completed action evidence. Several questlines may remain active concurrently. Tracking changes context priority, not quest state.

The current stage's ordinary required objectives must all finish. Optional work never blocks. Each alternative group needs one completed member. Authored stage milestones can unlock other quests while a parent remains active. A fully completed prerequisite remains distinct from an intermediate milestone.

Rewards are descriptive; Questism does not grant inventory, money, stats, attraction or consent. Typed flags and recorded scene snapshots are authored bookkeeping. The narrator still has to respect player sovereignty and character knowledge.

## Authoring

Edit a sample's quest_pack.json and its setup.js, where present, then run `node build_configured.cjs` from this folder. Save copies of custom generated Libraries before rebuilding all six supplied profiles. Do not add setup declarations to a Library that already includes them. Use fresh adventures or new IDs for changed definitions.

Use `node inspect_pack.cjs --help` for creator-only JSON/DOT inspection. Structural analysis is advisory: it cannot prove narrative recognition, NPC willingness or complete route feasibility. Do not inject creator exports containing future quest definitions into player/narrator context.

Detailed references: OBJECTIVE_GUIDE.md, CONDITION_GUIDE.md, ACTION_LIMIT_GUIDE.md, ABANDONMENT_GUIDE.md, REFUSAL_GUIDE.md, JOURNAL_GUIDE.md, STATUS_CONDITIONS_GUIDE.md, EXCLUSIVE_ROUTES_GUIDE.md, ROUTE_ANALYSIS_GUIDE.md and CREATOR_INSPECTOR.md. These retain feature-specific historical explanations; TEST_EVIDENCE.json and KNOWN_LIMITS.md define this beta's current validation scope.

If progress stalls, inspect the saved journal, scene and Last report issue in the Control Panel. Diagnostics can describe discarded output. Report the attempted action, expected objective, actual saved result, model/settings, version and whether Retry, edits or manual commands were involved. Avoid sharing an entire private adventure when a relevant excerpt is enough.
