# Questism v0.1.29 beta candidate

Install root library.txt for an empty reusable engine, or one configured sample's library.txt. Pair it with root input.txt, context.txt and output.txt in the matching AI Dungeon panes. Save all four. Configured Libraries already contain their setup; do not paste setup declarations twice. Use a fresh adventure for changed preset definitions. Another Chance samples share IDs: choose one.

The `.txt` install panes are exact copies of the tested JavaScript source. Copy the entire file into its pane; there is no wrapper to remove. The `.js` files remain build/test sources.

Turn **Optimized Context OFF** and **Raw Model Output ON**. The generic engine starts without quests; place an authored {"quests":[...]} pack in Control Panel Notes, then run /quest validate and /quest import. Generated quests start off.

**Quests are voluntary.** Quests are optional, even tracked/auto-assigned. Follow the player's scene; do not redirect it, nag or invent quest pressure. Preserve NPC motives and logical consequences. Required objectives define completion, not obligation. Leaving an active quest unfinished requires no abandonment command. Decline/abandon commands separately change mechanical status when wanted and permitted. Tracking changes context priority, not player commitment.

Questism v0.1.29 beta candidate: 1207/1207 current local checks across 48 suites passed. No fresh native playthrough was run for this wording patch. The v0.1.28 Gemma pass is historical predecessor evidence, not a v0.1.29 native certificate.

Read GUIDE.md, KNOWN_LIMITS.md, RELEASE_NOTES_v0.1.29.md and TEST_EVIDENCE.json. The separate full development archive also contains current regression sources, validation_summary.json, LIVE_PLAYTEST_v029.json and the historical v0.1.28 evidence. Run node validate_all.cjs there for the full local gate.

With Completion verification on, Continue runs a waiting review. With Quest pauses on, acknowledge the notice and resubmit any retained typed action afterward. Resume with action waits for a new action after notices; ordinary model obedience remains model dependent. The five-stop test profile enables bounded rejected-output console logging; set its QUESTISM_DEBUG_REPORTS constant to false and rebuild to disable it. The private scenario has not been updated to v0.1.29 during this patch.
