# another_chance_five_stop — Questism v0.1.29 beta

The current integration sample: breakfast, school, a separately delivered and accepted NPC offer, departure, five required destinations, an explicit ending, and a dependent return quest. The v0.1.28 predecessor of this profile was used in the native Gemma acceptance run; v0.1.29 has not been rerun live.

Install this folder's library.js with the root input.js, context.js and output.js. Save all four panes and start a fresh adventure. Do not paste setup.js a second time: it is already included in the configured Library.

Another Chance samples share quest IDs. Choose one per fresh adventure. A configured quest pack does not supply an entire fictional setting: retain the scenario opening, characters and player-sovereignty instructions, and apply its scenario_patch.txt where provided. Route permission flags never establish attraction, consent or relationship success.

All five destinations are required: library, cafeteria, west wing, right wing and gym. Completing those enters the ending stage; Back to Class stays locked until the player explicitly ends the tour on a later action. Assignment never performs the return. This test profile enables bounded rejected-output logging in the private script console (QUESTISM_DEBUG_REPORTS = true); set it to false and rebuild if you do not want diagnostic captures. The generic root leaves logging off. Any changed profile needs its own verification.

## Included quests

- Breakfast, Again
- Back to School
- Isabelle's Five-Stop Tour
- A Conversation with Jo
- A Conversation with Flora
- Back to Class

quest_pack.json is the editable authored pack. setup.js, where supplied, contains its fresh-save settings. Run `node build_configured.cjs` from the package root after editing source packs or setup. The generated Libraries preserve the common engine.

The release's 1,207 local checks cover engine and sample behavior using supplied reports. Native recognition was verified on the v0.1.28 predecessor five-stop profile with Gemma; v0.1.29 has not been rerun live, and this does not certify every sample or narrative branch on every model. Read ../TEST_EVIDENCE.json and ../KNOWN_LIMITS.md for the evidence and limits.
