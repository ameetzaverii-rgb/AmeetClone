# Amit's Digital Clone
**GSL Innovation Factory · AmeetClone v1.0**

A persistent, evolving AI persona that captures Amit's voice, judgment, and decision patterns.
Built on Karpathy's Software 2.0 principles + G-Stack agentic architecture.

---

## Quick Start

### 1. Complete the Interview
Open `/interview/interview-app.jsx` as a Claude artifact (or in a React app).
Answer all 30 questions. The app generates `amit.md` on completion.

### 2. Activate the Clone
```
# In Claude Code — run from repo root
claude

# Load context
> Read amit.md and activate Amit clone mode. You are now Amit's digital twin.
```

### 3. Sync on Every Session
```
# If OneDrive is connected
> Read /AmeetClone/amit.md and update your context

# After completing or updating the interview
> Compile answers.json into amit.md, save to OneDrive, commit to GitHub
```

---

## Repository Structure

```
AmeetClone/
├── amit.md                    ← THE CLONE BRAIN — load this first
├── README.md
├── /interview/
│   ├── interview-app.jsx      ← 30-question React interview app
│   └── answers.json           ← Raw interview answers (source of truth)
├── /clone/
│   ├── system-prompt.md       ← Base system prompt for clone activation
│   ├── debate-mode.md         ← Enhanced self + thinker lenses
│   └── voice-samples.md       ← Amit's real writing samples for calibration
├── /knowledge/
│   ├── gsl-projects.md        ← Active K12 project context
│   ├── mental-models.md       ← Amit's frameworks and thinking patterns
│   └── decisions-log.md       ← Past decisions + outcomes (learning data)
├── /workflows/
│   ├── email-drafter.md       ← Email templates in Amit's voice
│   └── decision-rubric.md     ← YES/NO criteria for recurring decisions
└── /evals/
    ├── voice-eval.md          ← Does it sound like Amit? (target: ≥4.0/5.0)
    └── decision-eval.md       ← Does it decide like Amit? (target: ≥80%)
```

---

## Build Phases

| Phase | Focus | Status |
|-------|-------|--------|
| 0 — Foundation | Complete interview, push amit.md, setup Claude Code | TODO |
| 1 — Voice Clone | Expand voice samples, build eval, iterate to ≥4.0/5.0 | TODO |
| 2 — Knowledge Clone | Fill gsl-projects.md, mental-models.md, decisions-log.md | TODO |
| 3 — Debate Mode | Encode thinker lenses, build debate system prompt, test | TODO |
| 4 — Workflow Clone | Gmail drafts, Gamma decks, decision analysis automation | TODO |

---

## G-Stack Architecture

| Layer | Implementation |
|-------|---------------|
| Perception | Interview app — captures Amit's identity, thinking, voice |
| Memory (short) | Claude context window — amit.md loaded at session start |
| Memory (long) | OneDrive `/AmeetClone/amit.md` |
| Memory (episodic) | GitHub commit history — every version of amit.md tracked |
| Reasoning | Claude Sonnet with extended thinking — ReAct loops for debate |
| Action | Gmail drafts, Gamma decks, GitHub commits via Claude Code |
| Orchestration | Claude Code CLI |

---

## Success Metrics

- **Voice score ≥ 4.0/5.0** — Amit rates clone responses as "sounds like me"
- **Decision alignment ≥ 80%** — clone makes same call as Amit on historical decisions
- **Debate quality** — ≥3 genuine challenges per session
- **Time-to-useful-output < 30 seconds** — context loads fast, response immediately usable
- **Zero hallucinated opinions** — clone never invents Amit's beliefs

---

## Persistence

| Storage | What it holds |
|---------|--------------|
| `localStorage` (interview app) | Interview answers — survives browser sessions |
| OneDrive `/AmeetClone/amit.md` | Compiled context — readable by Claude Code every session |
| GitHub repo | Full version history of amit.md |
| Claude Project Instructions | amit.md pasted here — auto-loaded in every conversation |

---

*"The bottleneck is not compute. It's data quality, context design, and prompt engineering." — Karpathy*
