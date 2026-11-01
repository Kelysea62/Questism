Questism v0.1.29 beta candidate: 1207/1207 current local checks across 48 suites passed. No fresh native playthrough was run for this wording patch. The v0.1.28 Gemma pass is historical predecessor evidence, not a v0.1.29 native certificate. Earlier version-specific results below are historical.

Questism v0.1.28 beta: 1,200/1,200 exact-byte local checks across 47 suites passed. The final fresh Gemma five-stop path passed, including locked-successor checks, reload, deliberate ending and retained input. One false NPC delivery was rejected; a legitimate ordinary follow-up recovered the introduction before the real offer. See COMPACT_REPORTS.md, RELEASE_NOTES_v0.1.28.md and LIVE_PLAYTEST_v028.json. Optimized Context OFF; Raw Model Output ON. Earlier version-specific sections below are historical.

## Completion verification

Authored objectives may specify source-bound `verification` criteria. See [COMPLETION_VERIFICATION.md](COMPLETION_VERIFICATION.md). Verification is opt-in via `verifyProgress`; the five-stop sample enables it. Eligibility and conditions still do not prove an offer, acceptance or action.

## Optional authored NPC offer phrase (v0.1.25)

An authored giver may set `offerPhrase` to one exact 8–200 character request on a single line. The delivery evidence must include that full phrase, copied from the current NPC narration. Introductions, greetings and eligibility cannot substitute. This is an optional additional gate; unconfigured givers retain the existing exact-quote protocol. The giver may defer or refuse; never force the player to agree. Quote the phrase only in an actual offer, not a hypothetical or interface explanation. This gate validates a literal source, not every possible meaning of dialogue.

Example: `"giver":{"id":"teacher","name":"Teacher","instruction":"If willing, ask the following request and leave the reply open.","offerPhrase":"Would you show Isabelle around the school?"}`. Keep the phrase a clear request, not a place name. Changing a pack does not rewrite installed save definitions; use a fresh adventure. Acceptance and performance remain separate later events. Explicit manual offer corrections stay overrides and cannot certify a native path.

> Historical release: v0.1.23. See START_HERE.md, STATUS_CONDITIONS_GUIDE.md and RELEASE_NOTES_v0.1.23.md. Earlier version-specific results below are historical.

# Questism v0.1.11 · Conditions and quest givers

A quest can be saved without being sent to the story model. Questism keeps the complete registered definitions and progression in persistent Adventure script state. It sends selected current information to the model each normal turn. Story Cards display the saved record; they are not the source of truth.

## The quest lifecycle

| State | Meaning | Ordinary model context and cards |
| --- | --- | --- |
| Locked | Required quests, milestones or conditions are unmet. | No quest detail or readable card. |
| Eligible | An authored NPC quest meets its gates but has not been delivered. | No readable card or ordinary quest-list detail. One eligible present giver may receive targeted delivery instructions. |
| Available | An ordinary quest is unlocked, or an NPC has offered it. | A readable card and bounded ID/title offer list. Not yet accepted. Unmet current conditions make the retained offer temporarily blocked. |
| Active | The player accepted it, or an authored automatic assignment occurred. | Current objectives enter the script packet automatically, within its budget. |
| Completed / failed | The quest reached its recorded outcome. | Retained card and journal; excluded from the regular active packet. |

Ordinary quests have no giver and skip eligible. An authored `autoStart: true` quest is assigned as soon as its gates unlock. It does not establish player dialogue, feelings, movement or consent. NPC-given quests cannot also use `autoStart: true`.

Active quests do not require their names in the story or a `/quest list` command. Several questlines can be active together. `/quest track ID` raises context priority; `/quest untrack ID` does not stop the quest. The header shows up to three active quests, one current objective each when several are active, and a count of any additional lines.

Every owned quest card has a reserved ID trigger. Its ordinary title and character names are not native triggers. This prevents titles such as “Breakfast, Again” from activating through generic fragments. The Entry contains revealed current information and recent progress; Notes contain the retained detailed journal. Do not pin these cards or add broad triggers. Questism cannot remove spoilers from unrelated cards or story history.

## Install a configured sample

For the new opening/conditions example, use `another_chance_conditions/library.txt` in Library, together with root `input.txt`, `context.txt` and `output.txt`. Save all four panes and start a fresh private Adventure. Its README explains the sample gates and optional household route seeds. The separate `another_chance_opening` folder retains the earlier three-quest outline fixture.

Use the configured Library instead of the generic empty-preset Library. Do not paste a second `QUESTISM_PRESETS` declaration. Keep Raw Model Output enabled for the previously tested reporting configuration. No extra model call or external quest service is used.

To configure your own fresh Adventure, place the quest array in the existing `QUESTISM_PRESETS` constant and append one optional setup constant:

```js
const QUESTISM_SETUP = {
  flags: {
    jo_romance_enabled: true,
    flora_romance_enabled: true,
    breakfast_finished: false
  },
  scene: {
    location: "bedroom",
    npcs: [],
    day: 1,
    time: "morning"
  },
  sceneRegistry: {
    actors: {jo: "Jo", flora: "Flora", mrs_l: "Mrs. L", isabelle: "Isabelle"},
    locations: ["bedroom", "home", "school", "homeroom"]
  }
};
```

Setup is read only when the Adventure initializes. Changing it later does not overwrite saved flags, scene, definitions or progress. Existing Adventures can import new quest IDs through the control card's Notes and `/quest import`, then set the required initial flags and scene with the commands below. Imports cannot replace an already installed definition. A changed definition needs a new ID or a fresh Adventure.

## Public scene names

`sceneRegistry` is optional creator setup for names and IDs that are safe to show the model from the start. `actors` maps NPC IDs to their public names; `locations` lists public location IDs. The supplied sample declares Jo, Flora, Mrs. L, Isabelle, and its four ordinary locations. A registry entry identifies an entity; it does not establish current presence or unlock a quest. Do not place hidden identities or secret locations in this explicitly public registry.

Without a registry, scene guidance derives its mapping from revealed quests and the already observed scene. It does not enumerate every locked quest giver or condition location. Creator setup is initialized once, so adding a registry to code does not silently add it to an existing Adventure.

## Author conditions

`conditions` is optional, authored-only, and an array of at most 32 predicates. Every predicate must match, in addition to `requires` and `requiresAny`.

| Predicate | Meaning |
| --- | --- |
| `{"flag":"jo_romance_enabled","equals":true}` | A saved flag exists and exactly equals the supplied typed value. |
| `{"quest":"school","stage":"explore"}` | That stage has completed, even if later stages of the quest are still active. |
| `{"quest":"school","status":"declined"}` | That quest's exact current recorded status matches; see STATUS_CONDITIONS_GUIDE.md for the seven supported statuses and timing limits. |
| `{"location":"homeroom"}` | Saved current location equals this ID. |
| `{"day":1}` | Saved day equals this nonnegative integer. |
| `{"time":"morning"}` | Saved time equals this ID. |

Flags accept `null`, booleans, finite numbers, or strings up to 500 characters. `true` and `"true"` are different. A missing flag does not satisfy `equals: false`; initialize it to false when that is intended. The engine stores at most 128 named flags. There are no arithmetic, greater-than, date-range or arbitrary executable predicates in this version.

IDs use lowercase letters followed by lowercase letters, digits, underscores or hyphens, up to 48 characters. Quest and milestone references must exist in the combined registered pack. Missing stages and structural deadlocks reject the entire import. An OR cycle with a viable escape can be valid; see CREATOR_INSPECTOR.md. Keep IDs stable across a line.

Here is a complete small authored pack showing a second quest unlocked by a milestone while its parent remains active:

```json
{
  "quests": [
    {
      "id": "school",
      "title": "Back to School",
      "autoStart": true,
      "stages": [
        {
          "id": "homeroom",
          "title": "Join homeroom",
          "objectives": [
            {
              "id": "arrive",
              "text": "Enter Mrs. L's homeroom and join the class.",
              "evidenceSource": "player"
            }
          ]
        },
        {
          "id": "school_day",
          "title": "Continue the school day",
          "objectives": [
            {
              "id": "attend",
              "text": "Attend the next scheduled class.",
              "evidenceSource": "player"
            }
          ]
        }
      ]
    },
    {
      "id": "isabelle_tour",
      "title": "Isabelle's School Tour",
      "description": "Mrs. L has a task connected to Isabelle's first day.",
      "conditions": [
        {"quest": "school", "stage": "homeroom"},
        {"location": "homeroom"},
        {"time": "morning"}
      ],
      "giver": {
        "id": "mrs_l",
        "name": "Mrs. L",
        "instruction": "Introduce Isabelle as a new student if that has not happened. Ask whether the player would show her around after homeroom. Leave the player's answer open."
      },
      "stages": [
        {
          "id": "tour",
          "title": "Show Isabelle around",
          "objectives": [
            {
              "id": "finish_tour",
              "text": "Visit two distinct school areas with Isabelle and finish the tour.",
              "evidenceSource": "player"
            }
          ],
          "setFlags": {"isabelle_tour_finished": true}
        }
      ]
    }
  ]
}
```

`requires` still means all listed quests are completed. `requiresAny` means at least one listed quest is completed. They can be combined with milestone and flag conditions. A stage gate means the named stage has finished; it does not mean the player merely reached it. The engine checks the saved stage record, not the text in another card.

Keep future secrets out of a quest's free-text description. A description is supplied intact when revealed. Future-stage fields are withheld, but they cannot hide spoilers copied into a current description or giver instruction.

## Saved scene and NPC delivery

A complete scene snapshot has `location`, `npcs`, `day` and `time`. `npcs` lists at most 16 locally present NPC IDs. Use empty location/time strings, day 0 and an empty NPC array for unknown information. The snapshot is a last observation, not a clock or location simulator. NPC membership is compared as a set: reordering the same IDs does not change the scene or invalidate an otherwise eligible offer or scene proposal.

When AI progression is enabled and an authored giver or condition needs scene tracking, the prompt can request an evidenced scene report. The model must distinguish an actual arrival from a plan to visit, and a present NPC from a remote message or recollection. It should clear absent NPCs after leaving. Missed or incorrect interpretation can leave a stale snapshot; inspect Scene in the control card and correct it when needed.

Once the prerequisites and conditions match, the NPC quest becomes eligible. Delivery instructions are supplied only when its giver's ID is present in the saved scene and the packet has room. The model may then have that NPC offer the task naturally. The script records delivery from an exact current narrator quote after the visible response enters accepted history. Player dialogue cannot prove that an NPC made an offer. Eligibility alone does not reveal the quest.

A changed scene enables delivery on a later turn. A single report cannot both change the saved scene and deliver an NPC offer; that whole report is rejected. An identical normalized snapshot can accompany an offer because it changes nothing. When the scene changes, report the scene first and defer the offer. The script does not move anyone to make a condition true, force the NPC to speak, or guarantee that the model notices every opportunity. If it omits or misinterprets a report, no deterministic prose parser fills in that missing event.

An eligible quest becomes locked again if its conditions stop matching before delivery. Once available, the offer remains recorded; acceptance still checks its current conditions. When those conditions stop matching, the card and quest list mark the offer temporarily blocked and normal context does not advertise it as presently acceptable. Matching conditions can make that retained offer acceptable again without inventing another NPC delivery. Already active quests retain their progress when the scene changes.

## Acceptance and flags

After a quest is available, `/quest start ID` accepts it. With AI progression enabled, the model can also report an explicit agreement quoted from the latest player input. A question, refusal, intention, narrator-written agreement or no-input Continue does not supply player acceptance. Newly delivered offers cannot also be accepted in the same report, and newly accepted quests cannot gain progress in it.

The engine checks quote provenance and state transitions. The model still judges whether the words truly express agreement or satisfy an objective. Suggest mode lets you review those interpretations before they change state.

Only authored stage completion effects and explicit commands change flags. The model cannot invent an arbitrary flag update. An optional stage `setFlags` object writes its primitive values when the stage completes. These effects share that completion's transaction, persist across reload and reverse with undo. Manual stage-completion overrides apply the same authored effects without claiming the skipped story events occurred.

A switch such as `jo_romance_enabled: true` permits a route opportunity. It does not establish attraction, trust, consent, a relationship or a successful romance. Character cards and scenario instructions must agree with the chosen variant. The supplied household seeds are original, non-graphic adult adaptation examples; they are not completed transcriptions of the game's romance routes.

## Commands and controls

Use commands at the start of Do or Story input; quoted Say dialogue remains dialogue. Commands use the normal generation path and return interface reports.

```text
/quest flag jo_romance_enabled true
/quest flag flora_romance_enabled false
/quest flag relationship_label "acquaintance"
/quest scene {"location":"homeroom","npcs":["mrs_l","isabelle"],"day":1,"time":"morning"}
/quest offer isabelle_tour
/quest start isabelle_tour
/quest undo
```

JSON payloads are parsed intact. Interior spacing inside strings is preserved, including in canonical Do commands; for example, `/quest flag phrase "a  b"` retains the two spaces.

`flag` and `scene` change the saved tracker state, not the story. `offer` is a manual fallback for an eligible quest with a present giver; it reveals the interface offer but establishes no NPC dialogue or player acceptance. `/quest unlock ID` deliberately bypasses that quest's gates; it does not complete its prerequisite quests. Use overrides only when you intend those changes.

| Control | Effect on this feature |
| --- | --- |
| AI progression: off | No automatic scene, delivery, acceptance, progress or failure updates. Commands work. |
| AI progression: suggest | Accepted reports queue reviewable proposals; approve the intended changes. |
| AI progression: auto | Valid accepted reports change state without a separate approval command. |
| New quests: off | Preserve the authored roster; authored giver delivery and progression can still operate. |
| Quest pauses: on | Available, received and completed transitions receive the existing separate update interlude. Eligibility alone does not pause the story. |

The control card shows saved Scene and Flags. Review proposals through `/quest proposals`; stale delivery approval is rejected if the giver or conditions no longer qualify. A scene proposal is bound to its prior saved snapshot and cannot overwrite a scene that has since changed. Pending delivery and acceptance proposals suppress repeated cues; reject an unwanted proposal before requesting another interpretation. Tightening controls before a provisional response is accepted applies conservatively. Turning creation off does not turn authored quest delivery off.

## Context and campaign limits

The registry permits 128 quests, 16 stages per quest and 12 objectives per stage, subject to the existing 250000-byte world and 750000-byte total-save guards. Increasing the record count does not remove those size limits. The wiki's 89-entry map is planning data; this release does not import all 89 quests as a finished campaign.

All active quests compete for a bounded packet, default 6000 characters and configurable from 1500 to 12000. Tracking and scene relevance affect priority. Available offers are supplied as bounded individual rows, with space reserved for acceptance instructions. If not all acceptable offers fit, the control card reports the omission count. Omitted records retain their progress; inspect budget warnings and increase space if needed. A low allowed budget is not a guarantee that every protocol and record will fit. Future stages and locked route text remain saved without being copied into regular context. A ready NPC's targeted offer is the intentional exception for revealing the current opportunity to the model before a public quest card exists.

Runtime tests exercise actual hook state, accepted history, retries, proposals, undo and serialized reload. They use supplied model reports and therefore do not prove semantic recognition. The new native scene/offer/acceptance lifecycle has not yet been playtested. Prior live reports remain evidence only for the version and paths they actually exercised.


## Distinct item objectives (v0.1.12)

An authored objective may set `distinctItems: ["library", "courtyard"]` and `target: 2`. A progress report includes `items: ["library"]` plus `value: 1`. A later report for `courtyard` uses `value: 2`. Repeated IDs never add to the count; unknown IDs or totals inconsistent with the unique stored IDs are rejected. AI-created definitions cannot set this policy. Saved records retain IDs under `items[stageId][objectiveId]` and history transactions restore them on rollback.

IDs establish uniqueness only. The model must still judge whether the player actually visited an area with the required companion. The Another Chance sample asks for one new area on each separate player action and then a later explicit tour ending. A manual scalar correction is an override and can clear an objective's item detail when its count changes; it is not evidence of visits.

## Preview before import (v0.1.14)

/quest validate checks Control Notes using a copied world and the real import transaction path. It validates schema, references, cycles, protected IDs, capacities and current storage reserves. Conflicting typed equality gates warn. This does not analyze all possible routes or prove future gates reachable. Validation does not expose a pack to the narrator or install its definitions.

## Optional and alternative objectives (v0.1.15)

See OBJECTIVE_GUIDE.md for the new authored-only objective fields. They change stage completion requirements, not quest eligibility, NPC delivery or acceptance. Completed-stage prerequisites still become true only when that stage actually finishes (or an explicit manual override finishes it). Stage flags remain shared effects rather than branch-specific rewards.

## Resumption gates (v0.1.16)

An authored abandonment policy is opt-in. The resume policy retains the recorded task's progress and rechecks current prerequisites and typed flag/location/day/time conditions. This does not deliver a new offer or establish current giver consent/presence. Stage milestones already completed remain completed after abandoning a later stage. See ABANDONMENT_GUIDE.md.

## Structural viability (v0.1.17)

The fixed-point validator respects requires as ALL, requiresAny as ANY, and milestone dependencies as mandatory. It rejects components with no structural route to start rather than rejecting every graph back-edge. Actual gates and scene/NPC/player evidence stay unchanged. The offline creator inspector shares this analyser and does not solve dynamic flag/scene/time feasibility or narrative recognition.

## Category metadata (v0.1.18)

`category` is an optional authored-only ID used by the read-only journal and category browser. It is not a predicate, reward, acceptance rule or relationship flag. Locked/eligible category metadata remains hidden in player views. See JOURNAL_GUIDE.md.

The configured offerPhrase gate ignores capitalization only; its words and punctuation remain required. The evidence field must still copy the actual current NPC narration verbatim, including its actual case.
