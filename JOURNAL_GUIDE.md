# Categories and the quest journal

Questism v0.1.18 adds a bounded quest browser and authored category labels. These views do not accept quests, create story events, award rewards or decide how the player feels. Normal hook synchronization can still record or reconcile previously accepted story evidence before a view is displayed.

## Author a category

Add a category ID to a preset or imported quest definition:

```json
{"id":"archive_errand","title":"An archive errand","category":"side","stages":[{"id":"sort","title":"Sort the records","objectives":[{"id":"boxes","text":"Actually sort the specified box of records.","evidenceSource":"player"}]}]}
```

Categories use the normal lowercase ID rules: a letter followed by letters, digits, underscores or hyphens, at most 48 characters. Examples include `main`, `side`, `companion` and `faction`; custom IDs are permitted. These are labels, not special engine modes. A `main` label does not require the player to follow it; `faction` grants no membership, `companion` grants no relationship, and `repeatable` does not make a quest repeatable.

Only authored presets/imports can set the field. Generated quests cannot classify themselves as main quests or invent another category. Omitted categories are browsed as `uncategorized` without rewriting their definitions. The field belongs to definitions, not progress reports or control settings.

Upgrades keep saved definitions, flags, progress and history intact. A new category in a preset does not retrofit into an installed quest. Use a fresh adventure or a new ID for changed definitions. `/quest validate` checks the field without installing or revealing it; conflicting edits to existing definitions remain rejected.

## Browse revealed quests

```text
/quest journal
/quest journal active
/quest journal available category side
/quest journal completed category main page 2
/quest journal abandoned category companion
/quest categories
/quest categories page 2
```

The optional first status is `active`, `available`, `completed`, `failed` or `abandoned`. With no status, all revealed records are included. `category ID` and `page N` can follow in either order. IDs and keywords are lowercase. Pages begin at 1; zero, negative, repeated or malformed options are rejected instead of silently changing a filter. Out-of-range pages return a clear correction.

As of v0.1.22, `declined` and `awaiting_offer` are also valid status filters. They remain revealed records and count in categories. A waiting NPC re-offer is not acceptance; blocked current conditions or missing giver presence are shown without hiding the old task. See `REFUSAL_GUIDE.md` for the separate player commands and recovery policy.

Both commands show at most eight rows per page, with explicit Previous/Next commands preserving the selected filters. `/quest show ID` remains the way to inspect full current objectives and the detailed progression journal. Existing `/quest list` commands remain available; `list all` can still show hidden IDs without titles, whereas the new browser always restricts itself to revealed records.

With v0.1.20 exclusive quest routes, delivered competing offers remain in the available filter and display `ROUTE BLOCKED`. This records the earlier offer without permitting acceptance. It is distinct from temporary condition blocking; failure or abandonment of the chosen route does not free it. Hidden competitors and private group IDs remain absent from this browser. See `EXCLUSIVE_ROUTES_GUIDE.md`.

The journal puts active work first, followed by available, abandoned, failed and completed records. Active rows follow the engine's existing tracking/context priority. Other rows show the latest retained quest transaction first, with a stable definition-order tie break. This is retained transaction order, not a wall-clock date or proof of when a story event occurred. Rebase does not reset transaction ID allocation, and Undo/source rollback remove unsupported history from these views.

`*` marks a saved tracking preference. It does not change a quest's displayed lifecycle status or reactivate a completed task. Noncompleted rows show the current stage position. Available offers and resumable abandoned quests whose gates no longer match are labeled temporarily blocked; the view does not bypass those gates.

Category summaries are computed from the current revealed records and include counts by lifecycle status. They are not a separately saved counter that can drift after Undo, source edits or reload.

## Privacy and authority

Locked and eligible quests do not contribute titles, category IDs or category counts to either view. A hidden-only category is absent. Querying its guessed ID gives the same empty result as a nonexistent category. NPC eligibility does not reveal a category; actual recorded delivery must reveal the quest first. Undo or editing that offer can hide its category again.

The engine retains all future definitions internally. Ordinary narrator packets still receive bounded current information, with explicit category lines only for revealed cards/current records. Headers keep their existing bounded format. The offline creator inspector can export full category metadata and future graphs because it is explicitly creator-only; do not paste those exports into narrator/player context.

Journal and category commands use normal deterministic menu reports. Model narration/progress is discarded on their interface turn. They add no quest transaction, and Retry does not replay a mutation. If an earlier history edit invalidates a cached report, the engine returns the existing review notice instead of stale progress. If history reconciliation is paused, both browsers explicitly label their output as retained records needing review; displaying those records does not certify the edited history.

## Samples and coverage

The generic objective-choices sample labels its visit `main` and offered favor `side`; the branching sample uses `main`, `faction` and `side`. These labels do not change their quest gates. Both Another Chance pack definitions remain unchanged and browse as `uncategorized` unless a creator installs a newly authored definition.

Local regressions exercise filtering, pagination, tracking order, completed history, hidden/eligible metadata, delivery/rollback, cached reports, source edits, Retry, Undo, reload and actual v0.1.17 migration. Source mutations verify that broken privacy, filtering, page limits, recency, generated-category policy, menu binding and migration are detected. Supplied reports validate engine behavior, not live-model recognition. Live website testing remains excluded; the previously documented hard-link integration in the offline inspector remains blocked separately from core passing checks.
