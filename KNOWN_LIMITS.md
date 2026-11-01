# Questism v0.1.29 beta candidate — tested limits

No fresh native playthrough was run for the v0.1.29 wording patch. The new optionality rule remains dependent on model obedience. The historical v0.1.28 native acceptance run used Gemma 4 31B v1.0.0, response length 400, temperature 0.7, context length 16000, Optimized Context off and Raw Model Output on. Questism used a 10000-character guidance budget and the five-stop profile. Other models and script combinations need their own acceptance tests.

- The 1,207 current local checks validate engine structure, provenance and lifecycle with supplied reports. They do not certify model understanding. Independent completion review is another model judgment, not an oracle.
- One v0.1.28 native run completed the required path with recovery: an introduction-only false offer was rejected, then a genuine classroom follow-up advanced the introduction before the real request. A gym-visit promise omitted bookkeeping and changed nothing. This was not a zero-error first pass.
- Native refusal branches, Suggest-mode play, adversarial reviewer accuracy and long-input compact fallback were not rerun on v0.1.29 bytes. Their structural safeguards are covered locally where applicable.
- Compact player references require canonical current input of 8–300 characters. Longer or shorter inputs retain the legacy explicit-ID/exact-quote protocol; native fallback outside that range is unverified. Turn Compact reports off for legacy guidance when needed. See COMPACT_REPORTS.md.
- Resume with action protects the post-notice boundary. It is not a general guarantee that a model will obey every player-sovereignty instruction on ordinary Continue turns.
- Existing saves preserve installed definitions and controls. Editing a preset does not retrofit the saved questline. Compatible migration and history protections were tested locally; evaluate an upgrade in a separate copy before relying on it in a long-running story.
- The five-stop sample deliberately enables bounded rejected-output logging in the script console. Generic logging is off. Set QUESTISM_DEBUG_REPORTS to false in that sample's setup and rebuild to disable it; changed profiles require their own verification.

Private adventure URLs, account identifiers, raw transcripts and diagnostic capture payloads are excluded from this install package. The complete development archive retains the detailed acceptance evidence, source fixtures and regression suites.
