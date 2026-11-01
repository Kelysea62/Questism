# Questism

A reusable quest engine for AI Dungeon. Use the root plain-text install panes: [library.txt](library.txt), [input.txt](input.txt), [context.txt](context.txt) and [output.txt](output.txt). They contain no Another Chance quest pack, NPC roster or scenario policy.

**Current version: v0.1.29 beta candidate.** Quests are voluntary, including tracked or automatically assigned quests. Required objectives describe completion criteria, not an obligation to pursue a quest. Model interpretation remains fallible.

## Install the generic engine

1. Open each root `.txt` file and copy its full contents into the matching AI Dungeon script pane:

   | AI Dungeon pane | Copy from |
   | --- | --- |
   | Library | [library.txt](library.txt) |
   | Input | [input.txt](input.txt) |
   | Context | [context.txt](context.txt) |
   | Output | [output.txt](output.txt) |

2. Save all four and enable the script. Turn **Optimized Context OFF** and **Raw Model Output ON**.
3. Start a fresh test adventure. Questism creates its Control Panel card when the hooks initialize.
4. Add your authored `{"quests":[...]}` JSON to the Control Panel card's Notes. Run `/quest validate`, then `/quest import`. The root engine starts without quests, and AI-created quests are off by default.

Read [START_HERE.md](START_HERE.md), [GUIDE.md](GUIDE.md) and [KNOWN_LIMITS.md](KNOWN_LIMITS.md). Settings include independent Off/Suggest/Auto choices for quest generation and progression, optional completion review, headers and quest interludes.

The `.txt` panes contain the same JavaScript bytes as their `.js` source files, with no explanatory wrapper to remove. JavaScript files remain the source used by builds and tests. `npm run build:samples` refreshes all four root text panes and the six configured text Libraries together.

## Features

- Persistent quest cards, current stages, objective counts and progression journals.
- Several active questlines, tracking priorities, categories and a paginated journal.
- Required and optional objectives, alternative solutions, distinct-item tracking and per-action limits.
- ALL/ANY prerequisites, completed-stage milestones, typed flags, scene gates and competing authored routes.
- Separate NPC delivery, player acceptance and task performance.
- Explicit decline/reconsideration and authored abandonment/resumption policies.
- Source-bound evidence, stale-report rejection, accepted-history reconciliation, Undo/Retry and compatible migration guards.
- Creator JSON validation, configured-Library builds and bounded prerequisite/route inspection.

Rewards are descriptive. Questism does not manage inventory, currency, stats or relationship success.

## Separate example packs

Each folder's `library.txt` includes that example's setup and quests. Use it instead of the root `library.txt`, paired with root `input.txt`, `context.txt` and `output.txt`. Do not paste setup declarations twice.

| Folder | Example |
| --- | --- |
| [objective_choices](objective_choices) | Generic archive tasks with required, optional and alternative objectives |
| [branching_dependencies](branching_dependencies) | Mandatory, alternative and milestone prerequisites |
| [exclusive_routes](exclusive_routes) | Competing authored commissions |
| [another_chance_five_stop](another_chance_five_stop) | Another Chance integration: breakfast, school, an NPC guide offer, five required destinations, explicit closure and a dependent return quest |
| [another_chance_conditions](another_chance_conditions) | Separate earlier conditions and conversation sample |
| [another_chance_opening](another_chance_opening) | Separate original opening sample |

The three Another Chance samples share IDs: choose one per fresh adventure. Their setting and conversation policies belong to those packs. They are not enabled by installing the generic root Library.

## Creator access

The engine source and editable pack JSON are available here. Creators can also import authored JSON through the Control Panel without changing JavaScript. Imports install definitions into the current adventure and cannot replace an existing definition.

For quests automatically loaded into every fresh adventure, the current supported method is a configured Library built from presets and setup. An enabled-only shared script does **not yet** automatically bootstrap a scenario's quest definitions from a dedicated Creator Setup card. That is a remaining authoring feature, not an existing capability. Changed definitions need a fresh adventure or new quest IDs.

## Local checks and creator tools

Run these commands from the repository root:

```sh
npm test
npm run build:samples
node inspect_pack.cjs demo_quest_pack.json
```

The checked-in focused suite exercises actual v0.1.28 save upgrades, pending progress, Undo/source edits, unrelated actions, Continue and bounded optionality guidance through local Input/Context/Output hooks. It supplies reports and does not test live model obedience. The bundled fixture is the prior generic engine, not a private adventure.

The complete v0.1.29 development gate recorded **1,207/1,207 checks across 48 suites**. This repository includes the focused seven-check suite and the curated install distribution; it does not include the full historical development archive or private playtest transcripts. See [TEST_EVIDENCE.json](TEST_EVIDENCE.json).

The preceding v0.1.28 Gemma integration run completed the automatic five-stop path with one rejected false offer and ordinary dialogue recovery. **The changed v0.1.29 wording has not been rerun in a fresh live playthrough.** Current source publication is a beta candidate; the AI Dungeon public listing remains a draft.

## Authoring references

[Objectives](OBJECTIVE_GUIDE.md) · [Conditions](CONDITION_GUIDE.md) · [Action limits](ACTION_LIMIT_GUIDE.md) · [Refusal](REFUSAL_GUIDE.md) · [Abandonment](ABANDONMENT_GUIDE.md) · [Journal](JOURNAL_GUIDE.md) · [Status conditions](STATUS_CONDITIONS_GUIDE.md) · [Exclusive routes](EXCLUSIVE_ROUTES_GUIDE.md) · [Creator inspection](CREATOR_INSPECTOR.md) · [Route analysis](ROUTE_ANALYSIS_GUIDE.md) · [Compact reports](COMPACT_REPORTS.md) · [Completion review](COMPLETION_VERIFICATION.md)
