# another_chance_conditions — Questism v0.1.29 beta

A compatibility sample with scene, NPC, day/time and typed-flag conditions, plus optional adult conversation seeds. Its original tour uses two distinct areas; use another_chance_five_stop for the current five-stop test.

Install this folder's library.txt with the root input.txt, context.txt and output.txt. Save all four panes and start a fresh adventure. Do not paste setup.js a second time: it is already included in the configured Library.

Another Chance samples share quest IDs. Choose one per fresh adventure. A configured quest pack does not supply an entire fictional setting: retain the scenario opening, characters and player-sovereignty instructions, and apply its scenario_patch.txt where provided. Route permission flags never establish attraction, consent or relationship success.

## Included quests

- Breakfast, Again
- Back to School
- Isabelle's First Day
- A Conversation with Jo
- A Conversation with Flora

quest_pack.json is the editable authored pack. setup.js, where supplied, contains its fresh-save settings. Run `node build_configured.cjs` from the package root after editing source packs or setup. The generated Libraries preserve the common engine.

The release's 1,207 local checks cover engine and sample behavior using supplied reports. Native recognition was verified on the v0.1.28 predecessor five-stop profile with Gemma; v0.1.29 has not been rerun live, and this does not certify every sample or narrative branch on every model. Read ../TEST_EVIDENCE.json and ../KNOWN_LIMITS.md for the evidence and limits.
