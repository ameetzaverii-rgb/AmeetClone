# VOICE EVAL — DOES IT SOUND LIKE AMIT?

*Evaluation framework for clone voice quality.*
*Run after every significant update to amit.md or voice-samples.md.*
*Target score: ≥4.0/5.0 average across all criteria.*

---

## EVAL ACTIVATION

```
You are running a Voice Eval on Amit's Digital Clone.

Load: amit.md + voice-samples.md
Test set: [5 test topics below]
Evaluator: Amit himself rates each response 1-5 on each criterion

For each topic:
1. Ask the clone to respond in Amit's voice (default mode, no special instructions)
2. Amit reads the response
3. Amit scores each criterion independently
4. Record score + any notes on the gap
```

---

## EVALUATION CRITERIA (5 dimensions, scored 1–5 each)

### Criterion 1: Sounds Like Amit
*Would Amit say "yes, that sounds like something I'd write"?*

| Score | Description |
|-------|-------------|
| 5 | Amit could have written this. Voice is unmistakable. |
| 4 | Mostly right — one or two phrases feel slightly off |
| 3 | Content is right but voice is generic. Sounds like a smart AI, not Amit |
| 2 | Recognisably trying to be Amit but missing the register |
| 1 | Could be anyone. No Amit voice present. |

### Criterion 2: Uses Amit's Phrases
*Does it use the actual phrases and verbal signatures from Q20?*

| Score | Description |
|-------|-------------|
| 5 | Multiple recognisable phrases used naturally and correctly |
| 4 | One or two phrases land well |
| 3 | Paraphrases Amit's style but doesn't use his actual vocabulary |
| 2 | Generic vocabulary. No recognisable phrases. |
| 1 | Uses phrases from Amit's never-say list. |

### Criterion 3: Correct Register
*Is the formality level, directness, and length right?*

| Score | Description |
|-------|-------------|
| 5 | Exactly right for this context — direct without being blunt, brief without being curt |
| 4 | Mostly right, slightly too formal or too casual |
| 3 | Noticeable register mismatch — either too polished or too casual |
| 2 | Wrong register for the context |
| 1 | Completely wrong — formal when it should be direct, or vice versa |

### Criterion 4: Correct Humour
*Is humour used in the right moments, in the right way, at the right level?*

| Score | Description |
|-------|-------------|
| 5 | Humour lands in exactly the way Amit's humour lands — sharp, dry, well-timed |
| 4 | Humour is present and mostly right, slightly off in timing or intensity |
| 3 | No humour where Amit would use it, or humour that's too light/too heavy |
| 2 | Humour that doesn't fit Amit's style at all |
| 1 | No humour in a response where Amit definitely would have been funny |

### Criterion 5: No Hallucinated Opinions
*Does the clone express only opinions Amit actually holds?*

| Score | Description |
|-------|-------------|
| 5 | Every opinion expressed is recognisably Amit's — nothing invented |
| 4 | Opinions are mostly right — one nuance that Amit would refine |
| 3 | Some opinions that Amit holds, some that feel generic or inferred |
| 2 | Several opinions that Amit might not recognise as his own |
| 1 | Clone has clearly invented positions Amit doesn't hold |

---

## TEST TOPICS (Standard Set)

*Use these 5 topics for every eval session. Do not change them — consistency matters.*

1. **Topic 1 — K12 core belief:** "What's your take on standardised testing in India?"
2. **Topic 2 — GSL strategy:** "Should GSL take a government grant that comes with curriculum constraints?"
3. **Topic 3 — Personal work style:** "How do you decide what to work on in the morning?"
4. **Topic 4 — Contrarian opinion:** "What do most ed-tech companies get wrong?"
5. **Topic 5 — Live decision:** "We have an opportunity to expand to [new geography] — what do you think?"

---

## EVAL SCORECARD

| Date | Version | T1 | T2 | T3 | T4 | T5 | Avg | C1 | C2 | C3 | C4 | C5 | Notes |
|------|---------|----|----|----|----|----|----|----|----|----|----|-----|-------|
| | v0.1 | | | | | | | | | | | | |
| | v0.2 | | | | | | | | | | | | |
| | | | | | | | | | | | | | |

*C1=Sounds Like Amit, C2=Uses Phrases, C3=Register, C4=Humour, C5=No Hallucinations*

---

## FAILURE MODE ANALYSIS

*When score drops below 4.0, run this diagnosis:*

**Is the gap in amit.md completeness?**
- Which section of amit.md is thin? (voice samples, phrases, opinions)
- What would you add to fix it?

**Is the gap in the system prompt?**
- Is the instruction unclear about a specific aspect of voice?
- What constraint is missing?

**Is the gap in the model's context window?**
- Is amit.md too long and key sections getting cut?
- What can be trimmed without losing signal?

---

## PASSING THRESHOLD

**Ready to use as default clone:** Average score ≥4.0/5.0 across all 5 topics and all 5 criteria
**Ready for debate mode:** Average score ≥4.5/5.0
**Ready for external use (emails to real people):** Average score ≥4.0/5.0 + Criterion 5 = 5.0 (zero hallucinations)
