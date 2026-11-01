# Optional objectives and alternative approaches

For the compatible v0.1.19 authored `maxPerAction` field, see `ACTION_LIMIT_GUIDE.md`. It applies independently to these optional and alternative objectives when they require player evidence.

For competing whole-quest routes, use the v0.1.20 `exclusiveGroup` policy in `EXCLUSIVE_ROUTES_GUIDE.md`. Alternative objectives within a stage remain different sufficient approaches and can both record observed work; they do not commit an exclusive quest route.

Questism v0.1.15 adds two authored objective fields. They are available in Library presets and imported packs, including `/quest validate`. Generated quests cannot set either field. Existing packs without these fields retain their previous all-objectives-required behavior.

```json
{
  "id": "archive_visit",
  "title": "Visit the archive",
  "stages": [
    {
      "id": "permission",
      "title": "Find a permitted way inside",
      "objectives": [
        {
          "id": "clerk_permission",
          "text": "Hear the clerk grant permission to enter.",
          "alternativeGroup": "permission"
        },
        {
          "id": "archivist_escort",
          "text": "Hear an archivist agree to escort you inside.",
          "alternativeGroup": "permission"
        },
        {
          "id": "closing_hours",
          "text": "Hear today's closing time from a member of staff.",
          "optional": true
        }
      ]
    },
    {
      "id": "enter",
      "title": "Choose to enter",
      "objectives": [
        {
          "id": "enter_room",
          "text": "Enter the reading room after receiving permission.",
          "evidenceSource": "player"
        }
      ]
    }
  ]
}
```

`optional` must be a boolean. An omitted value or `false` means required. An optional objective can record observed progress while its stage is current, but never blocks advancement. At least one nonoptional objective must exist in every stage.

`alternativeGroup` is a lowercase ID using the ordinary Questism ID rules. At least two objectives in the same stage must share it. A group is satisfied when any one member reaches its own target. Two half-finished alternatives do not add up to a completed alternative. Every alternative group in the stage must be satisfied, alongside every ungrouped required objective. Group IDs are local to the stage and can be reused elsewhere.

An objective cannot be both optional and a member of an alternative group. The group already defines the required choice; optional work should use a separate objective. Alternatives are different sufficient approaches, not mutually exclusive routes: the system can record both if both actually happen before the stage ends. It does not choose an approach, write dialogue, grant permission or infer player consent.

Optional objectives and unfinished alternatives close when the stage advances. Their actual counts remain in the journal, including partial counts and zeroes. They are not silently marked complete or backfilled later. If optional content must remain playable afterward, put it in a separate questline unlocked by prerequisites or a stage milestone.

The ordinary progress report is unchanged:

```json
{"op":"progress","quest":"archive_visit","stage":"permission","objective":"clerk_permission","value":1,"evidence":"exact observed quote from this exchange"}
```

The usual exact-source, player-action, stage, distinct-item and accepted-history checks still apply. `optional` and `alternativeGroup` belong to definitions, never to progress events. A model cannot add them to an event to bypass a requirement. Each batch is validated before any event is applied. All current-stage events in a valid auto batch are recorded before stage completion is evaluated, so an observed optional result in that same batch is retained regardless of event order. At most eight events fit in a report.

In Suggest mode, each objective update requires its own approval. Approve any optional work you want to retain before approving the last required update. Once a stage advances, outstanding optional or alternative proposals for that stage are stale; reject them rather than approving them later. An accepted proposal cannot rewrite an earlier stage.

Cards, headers, notices and active context label these goals `[Optional]` and `[One of GROUP]`. Required work appears first in headers and notices. Short headers can show only part of a choice group; inspect the quest card for every current option. Future-stage and locked quest detail remains withheld. Context budget limits still apply and can omit a packet; stored progress is retained.

`/quest next ID` and `/quest complete ID` are explicit manual overrides. They advance stages and apply authored stage effects, but do not select an alternative or fill optional counts. Already recorded choices and optional counts are preserved. Ordinary ungrouped required counts retain the existing manual-completion behavior. These commands establish no story action, reward, NPC permission or agreement. `/quest set` remains an explicit correction for a current objective. Undo reverses the full transaction, including counts and stage flags.

Stage `setFlags` are shared effects of finishing that stage; they do not identify which alternative was taken and do not award a bonus for optional work. This release does not add branch-specific rewards, mutually exclusive routes, deadlines, repeatability or automatic inventory. Use separate authored questlines for independent content and keep descriptive promises distinct from maintained mechanics.

See `objective_choices/` for a complete two-quest configured example. Use its configured Library with the root Input/Context/Output wrappers in a fresh adventure. Existing saves retain their installed definitions during upgrade; editing a preset does not overwrite them. Use a fresh adventure or a new quest ID to install changed definitions.
