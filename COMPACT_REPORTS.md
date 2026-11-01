# Compact reports · v0.1.28

Turn Optimized Context **off** in Gameplay → Memory System and Raw Model Output **on**. `compactReports: true` is optional and defaults off in the generic engine/older unconfigured saves. It is enabled with `verifyProgress: true` in the five-stop test pack. Existing paired angle/square JSON, explicit IDs and literal evidence remain supported.

## Intent lines and fixed source binding

After real narration, use the actual supplied references, optionally grouped:

```text
[QUESTISM]
event_COPY_THE_SUPPLIED_TOKEN value=1
scene place_COPY_THE_SUPPLIED_TOKEN; npc_id; 1; morning
[/QUESTISM].
```

These are placeholders, not usable tokens. Progress values are absolute totals. Authored delivery/acceptance use their supplied event token alone. Distinct objectives may add `items=id1,id2` with the permitted item IDs. Use `none` alone when no update qualifies. Other event types, dynamic creation or extra fields use the existing JSON API; do not mix JSON with compact reference lines in one response.

Reference lines carry proposed intent, not model-authored proof. Optional pipe text is ignored commentary and never becomes evidence. The script assigns sources by the exact supplied operation:

- Player progress and acceptance always bind the exact current canonical player input, even if the model appends a narrator hint. Player tokens are supplied only for inputs of 8–300 characters. They never bind older input or narrator-invented behavior.
- NPC progress and unconfigured giver delivery bind an exact contiguous excerpt of at most the final 300 characters of the current real narration, with an eight-character minimum. Leading display headers/checkbox rows, trailing or inline imitation interface text and machine reference rows are excluded before binding. Missing real prose fails closed. A source reference is provenance, not proof of fulfillment; completion verification still judges authored criteria.
- A giver with `offerPhrase` additionally requires that complete authored request actually occur in current NPC narration. Binding preserves the spoken substring and capitalization. Eligibility or a model-reported token cannot substitute for the request. A missing delivery event also records nothing.
- Scene lines bind current real narration. A location reference selects exactly one safe public ID from the current snapshot, declared registry or revealed conditions. It does not guess compound paths or establish presence. Clear absent NPCs; keep unchanged day/time; use `-` for unknown/empty values. A supplied nonce-bound scene line may omit the `scene` label. Whitespace around NPC-list separators is harmless.

Current event/location references freeze history basis, input, world fingerprint, revision and policy. Only choices actually delivered in context remain usable, bounded to 64 event choices and 16 public locations. Source edits, stale/unknown choices, changed world or inappropriate operations reject. Context Suggest cannot become Auto merely by switching settings before Output. Expanded pending events, proposals and ledger operations contain literal IDs/evidence, not aliases or comments. Scene/progress updates remain atomic; independent verification still holds progress until acceptance.

Nonce prefixes identify this turn’s bookkeeping even if the model places a line outside its group. Such lines are collected into the same batch and removed from narration. A stale companion invalidates the batch; lines are never silently applied separately. Multiple/mixed groups or JSON/line mixtures reject. Ordinary prose, scene headings and JSON narration without reserved references remain prose.

For actions outside the player-token length range, use legacy explicit-ID JSON with exact 8–300-character current evidence, or turn Compact reports off to use legacy guidance. Model fallback on long actions was not validated natively in this release. Bounded frozen NPC catch-up remains available through the existing literal JSON source protocol; compact line sources themselves are current only.

## Diagnostics

Normal control-card transport diagnostics retain only bounded structural information, fingerprints and known field names/types. Rejected-event diagnostics may retain a bounded revealed quote; none are evidence or model recovery instructions.

An optional creator constant enables private rejected-output capture:

```js
const QUESTISM_DEBUG_REPORTS = true;
```

The generic engine leaves it undefined/off. The private five-stop test setup enables it; set its constant to false to disable it. Root Output logs at most 18,000 raw characters when a report issue changes, inside a try/catch so logging failure cannot change hook behavior. Raw capture stays in the private Output console, out of story, cards, saved quest proof and model context. Do not install the old standalone diagnostic Output capture pane.

Legacy JSON still requires complete, valid source-bound content. Existing one-trailing-delimiter normalization accepts only an entire valid JSON root after one non-data suffix is removed; no interior repair, guessed identifiers or normalized evidence strings occurs. The terminal compact JSON compatibility form permits a complete object with optional final period, under an actual compact request. Incomplete JSON, concatenated roots, two trailing periods and unknown root fields reject.

See RELEASE_NOTES_v0.1.28.md and LIVE_PLAYTEST_v028.json for actual native results and limits.
