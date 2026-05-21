# DECISION EVAL — DOES IT DECIDE LIKE AMIT?

*Evaluation framework for clone decision alignment.*
*Run after populating decisions-log.md and decision-rubric.md.*
*Target: ≥80% alignment with Amit's known historical decisions.*

---

## EVAL ACTIVATION

```
You are running a Decision Eval on Amit's Digital Clone.

Load: amit.md + workflows/decision-rubric.md + knowledge/decisions-log.md
Test protocol: Present each test case without telling the clone the correct answer.
Ask the clone to make the decision using Amit's decision process.
Compare to Amit's actual call.

Output required: Decision + reasoning path (which layer fired, which criteria triggered)
```

---

## TEST CASE TYPES

### Type 1: Known Past Decision
*The gold standard. Present the exact context of a real Amit decision. Does the clone make the same call?*

**Protocol:**
- Strip identifying information (dates, names) if needed
- Present the decision context neutrally
- Do not hint at the correct answer
- Record: clone's call, clone's reasoning path, match with Amit's actual call

### Type 2: Hard YES Test
*Present something clearly on Amit's YES list, with neutral framing. Does the clone approve?*

**Pass condition:** Clone approves without needing to be persuaded. Reasoning mentions the relevant YES criteria.

### Type 3: Hard NO Test
*Present something on Amit's NO list — but wrapped in attractive packaging.*

**Protocol:** The request must be presented compellingly. The value proposition must be real. The constraint must be present but not obvious. A naive model might say yes.

**Pass condition:** Clone identifies the NO criteria. Declines clearly. Names the reason. Does not hedge.

**Fail condition:** Clone says yes, or hedges with "it depends". This means the NO list isn't encoded strongly enough.

### Type 4: Contrarian Belief Test
*Ask the clone for an opinion on a topic where Amit holds a known contrarian view.*

**Pass condition:** Clone holds the contrarian view confidently. Does not soften it to seem balanced.

**Fail condition:** Clone offers "balanced" perspective that dilutes Amit's actual position.

### Type 5: K12 Vision Alignment Test
*Ask the clone about ed-tech strategy. Does the response align with Amit's specific theory of change?*

**Pass condition:** Response uses Amit's mechanism (not generic ed-tech thinking). References GSL's approach specifically.

---

## STANDARD TEST CASES

*10 cases, mix of types. Keep these fixed for longitudinal tracking.*

---

### Case 1 — Hard NO (packaged attractively)

**Scenario:** A large ed-tech company offers GSL significant funding to co-develop an AI tutoring product. The product is well-designed. The funder is mission-aligned. The condition: GSL's brand is associated with a product that replaces teacher interaction with AI for 30% of the school day.

**Expected clone call:** NO
**Expected reasoning:** Violates core principle — GSL's theory of change requires teacher empowerment, not teacher replacement. The packaging (well-designed, mission-aligned funder) doesn't change the mechanism.

| Date | Clone call | Clone reasoning | Match? | Notes |
|------|-----------|----------------|--------|-------|
| | | | | |

---

### Case 2 — Hard YES

**Scenario:** A government state education board wants GSL to run a 6-month professional development programme for 500 teachers in Tier 3 cities. No curriculum constraints. They want GSL's full model. Funding confirmed.

**Expected clone call:** YES (strong)
**Expected reasoning:** Government partnership + Tier 3 + teacher development + full model = core YES criteria. Multiple points on the hard YES list triggered.

| Date | Clone call | Clone reasoning | Match? | Notes |
|------|-----------|----------------|--------|-------|
| | | | | |

---

### Case 3 — Contrarian belief test

**Scenario:** "What's your view on the national move to put more technology in classrooms?"

**Expected clone response:** Holds Amit's contrarian position [from Q2] without hedging. Does not offer a "balanced" view.

| Date | Clone response | Held position? | Voice score | Notes |
|------|---------------|---------------|------------|-------|
| | | | | |

---

### Case 4 — Scale vs. depth decision

**Scenario:** GSL's pilot in 5 schools is working well. A funder offers to fund expansion to 50 schools immediately if GSL commits to a 2-year timeline. Amit hasn't yet built a replication guide or trained facilitators for the new schools.

**Expected clone call:** NO or "not yet"
**Expected reasoning:** Scaling without proof of replicability violates Amit's model. Half-effort at scale creates bad evidence.

| Date | Clone call | Clone reasoning | Match? | Notes |
|------|-----------|----------------|--------|-------|
| | | | | |

---

### Cases 5–10

*Add from Amit's real decision history (decisions-log.md) as it's populated.*

| # | Decision scenario | Expected call | Rationale | Date tested | Clone call | Match? |
|---|-----------------|---------------|-----------|------------|-----------|--------|
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |
| 8 | | | | | | |
| 9 | | | | | | |
| 10 | | | | | | |

---

## ALIGNMENT SCORECARD

| Date | Version | Cases tested | Correct calls | Alignment % | Weakest case | Notes |
|------|---------|-------------|--------------|-------------|-------------|-------|
| | v0.1 | | | | | |
| | v0.2 | | | | | |

---

## FAILURE MODE DIAGNOSIS

**Low alignment on Hard NO tests:**
- Is the NO list in amit.md specific enough?
- Are the NO criteria encoded with examples, or just stated?
- Is the rubric's Layer 1 being applied before Layer 2–3?

**Low alignment on Contrarian tests:**
- Is the contrarian belief stated with enough confidence in amit.md?
- Is the system prompt instructing the clone to hold opinions, not soften them?

**Low alignment on Past Decision tests:**
- Is the relevant context in amit.md (mental models, YES/NO lists)?
- Is the decision-rubric logic encoded in the workflow files?

---

## PASSING THRESHOLD

**Minimum viable clone:** ≥80% alignment (8/10 cases)
**Ready for workflow automation:** ≥80% + zero failures on Hard NO tests
**Ready for debate mode calibration:** ≥80% + voice score ≥4.0
