/**
 * Amit's Digital Clone — Interview App v2
 * Self-contained React component. Runs as a Claude artifact or standalone React app.
 * Persistence: localStorage keyed by "amitCloneAnswers"
 * Output: generates amit.md context file + answers.json on completion
 */

import { useState, useEffect, useCallback } from "react";

// ─── Question Bank ────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "identity",
    title: "IDENTITY",
    subtitle: "Who you are at the core — not the bio, the essence",
    color: "#7C3AED",
    questions: [
      {
        id: "q1_essence",
        number: 1,
        prompt: "Describe yourself in one sentence to a stranger on a plane. Not your title — your essence. What do you actually do in the world?",
        placeholder: "e.g. I spend my life building the infrastructure that lets kids discover what they're capable of...",
        hint: "Skip the job title. What would make a stranger lean in and say 'tell me more'?",
      },
      {
        id: "q2_contrarian_belief",
        number: 2,
        prompt: "What is your single most contrarian belief — the thing you are genuinely convinced of that most educated, reasonable people would push back on?",
        placeholder: "e.g. I believe standardised testing doesn't measure intelligence — it measures compliance training...",
        hint: "The more uncomfortable it makes you to say out loud, the more right you probably are.",
      },
      {
        id: "q3_childhood_obsession",
        number: 3,
        prompt: "What were you obsessed with as a child that still shows up — transformed — in your work today?",
        placeholder: "e.g. I was obsessed with how things worked. I'd take apart everything...",
        hint: "The thing you couldn't stop doing before anyone told you it mattered.",
      },
      {
        id: "q4_greatest_strength",
        number: 4,
        prompt: "What is your greatest professional strength — the one that shows up unmistakably in your best work? Give a concrete example.",
        placeholder: "e.g. Seeing the pattern across disconnected domains before anyone else does. In 2019, I noticed...",
        hint: "What do people come to you for that they can't get from anyone else in the room?",
      },
      {
        id: "q5_biggest_frustration",
        number: 5,
        prompt: "What frustrates you most — about K12 education, about how organisations work, about how people think? The thing that makes you want to flip a table.",
        placeholder: "e.g. The gap between what we know about learning science and what actually happens in classrooms...",
        hint: "Real frustration, not polished criticism. The thing you've said a hundred times.",
      },
    ],
  },
  {
    id: "how_i_think",
    title: "HOW I THINK",
    subtitle: "Your cognitive operating system — decision process, mental models, first principles",
    color: "#0891B2",
    questions: [
      {
        id: "q6_decision_process",
        number: 6,
        prompt: "Walk me through exactly how you make a hard decision. Not the ideal process — your actual process. Step by step, what happens in your head?",
        placeholder: "e.g. First I write down the decision in one sentence. Then I ask who else has faced this...",
        hint: "Describe the last hard call you made and trace the actual mental steps.",
      },
      {
        id: "q7_mental_models",
        number: 7,
        prompt: "Name 2–3 mental models or frameworks you return to constantly. For each: what is it, and give a real example of how you've applied it.",
        placeholder: "e.g. 1. Inversion — I always ask 'what would make this fail?' before asking 'how do I succeed?'...",
        hint: "The tools you reach for automatically. Not the ones you think you should use.",
      },
      {
        id: "q8_signature_question",
        number: 8,
        prompt: "What is the one question you always ask — the question that cuts through noise, exposes the real issue, or reframes a problem in any situation?",
        placeholder: "e.g. 'What does success actually look like in 90 days, and who decides?'",
        hint: "The question that makes people pause. That they've heard you ask a dozen times.",
      },
      {
        id: "q9_stuck_protocol",
        number: 9,
        prompt: "When you're genuinely stuck — intellectually, strategically, creatively — what do you do? Where do you go, who do you call, what ritual do you use?",
        placeholder: "e.g. I go for a long walk and dictate voice notes. Or I call [name] and argue out loud...",
        hint: "The actual behaviour, not the aspirational one.",
      },
      {
        id: "q10_best_decision",
        number: 10,
        prompt: "Describe a decision you've made that you are most proud of. What was the context, what made it hard, and why was it the right call?",
        placeholder: "e.g. In 2023, when everyone said we should scale revenue first, I chose to...",
        hint: "A decision that required genuine courage or unconventional thinking — not a lucky outcome.",
      },
    ],
  },
  {
    id: "how_i_build",
    title: "HOW I BUILD (GSL)",
    subtitle: "Your theory of change, vision, and non-negotiables for GSL Innovation Factory",
    color: "#059669",
    questions: [
      {
        id: "q11_gsl_mission",
        number: 11,
        prompt: "Describe GSL Innovation Factory's mission in one sentence — your version, not the official one. What is this really about?",
        placeholder: "e.g. We exist to prove that every school in India can be a place where kids want to show up...",
        hint: "What would you say at 11pm to someone who just doesn't get why this matters?",
      },
      {
        id: "q12_k12_broken",
        number: 12,
        prompt: "What is the most important thing that's broken in K12 education that almost nobody is talking about? Not the obvious critique — the real, underlying problem.",
        placeholder: "e.g. The real problem isn't curriculum or technology — it's that teachers have no agency...",
        hint: "The diagnosis that, if you got the whole sector in a room, most would resist but couldn't refute.",
      },
      {
        id: "q13_theory_of_change",
        number: 13,
        prompt: "What is your theory of change — specifically, how does GSL fix that broken thing? What is the mechanism by which your work creates the change you want?",
        placeholder: "e.g. If we can change what teachers believe is possible in 3 hours, they change what they allow students to do...",
        hint: "The specific causal chain. Not 'we do X therefore good things happen' — the precise lever.",
      },
      {
        id: "q14_hard_yes_list",
        number: 14,
        prompt: "List 5 things you would immediately say YES to for GSL — the things that perfectly fit your mission, model, and values. No hesitation required.",
        placeholder: "e.g. 1. A pilot in a government school in a Tier 3 city\n2. A partnership with a university doing learning research...",
        hint: "If someone pitched you these tomorrow, you'd say yes before they finished the sentence.",
      },
      {
        id: "q15_hard_no_list",
        number: 15,
        prompt: "List 5 things you would say NO to at GSL — no matter how attractive the packaging, no matter who's asking. Your absolute constraints.",
        placeholder: "e.g. 1. Ed-tech that replaces teachers rather than empowering them\n2. Scaling before we have proof...",
        hint: "The things that would require you to become a different person to accept.",
      },
      {
        id: "q16_live_decisions",
        number: 16,
        prompt: "What are the 3 most important decisions you are currently wrestling with at GSL? For each: what are you deciding and why is it hard?",
        placeholder: "e.g. 1. Whether to expand to a new state — hard because we don't have the team depth yet...",
        hint: "The decisions sitting in your head right now, unresolved.",
      },
      {
        id: "q17_success_in_5_years",
        number: 17,
        prompt: "What does GSL success look like in 5 years — in concrete, observable, specific terms? Not aspirational language — what would you actually see, measure, and point to?",
        placeholder: "e.g. 200 schools running our model with fidelity. NPS from teachers above 70. At least 3 government state partnerships...",
        hint: "If I walked in in 5 years, what would I see that would tell me you won?",
      },
    ],
  },
  {
    id: "how_i_communicate",
    title: "HOW I COMMUNICATE",
    subtitle: "Your voice, register, humour, and the phrases that make you unmistakably you",
    color: "#DC2626",
    questions: [
      {
        id: "q18_voice_sample",
        number: 18,
        prompt: "Write 3–5 sentences on any topic you care about deeply — exactly as you'd write them, not polished. This is raw voice capture. Go.",
        placeholder: "Just write. Don't edit. Don't clean it up. The messiness is the point...",
        hint: "Write it in one pass. The first draft IS the data.",
      },
      {
        id: "q19_humour_signature",
        number: 19,
        prompt: "How do you use humour in professional contexts? Give a specific example of the kind of joke, aside, or observation you'd make in a serious meeting.",
        placeholder: "e.g. I tend toward dry observations about the gap between what people say and what they mean...",
        hint: "Not what you think good humour is — what you actually do.",
      },
      {
        id: "q20_overused_phrases",
        number: 20,
        prompt: "What phrases do you use constantly — the verbal tics and expressions that people who know you well would immediately recognise as yours?",
        placeholder: "e.g. 'The real question is...', 'Let's steelman the other side', 'That's a feature not a bug'...",
        hint: "The phrases your team finishes for you. The ones you don't notice yourself saying.",
      },
      {
        id: "q21_never_say_list",
        number: 21,
        prompt: "What words, phrases, or communication styles make you cringe — the ones you consciously avoid? What signals bad thinking or lazy communication to you?",
        placeholder: "e.g. 'Synergy', 'best practice', 'scalable solution'... anything that could mean anything...",
        hint: "The corporate speak that makes you internally check out. The buzzwords that substitute for thinking.",
      },
      {
        id: "q22_register_shifts",
        number: 22,
        prompt: "How does your communication change based on audience? Specifically: how do you write to a sceptical school principal vs. an excited early-stage founder?",
        placeholder: "e.g. Principal: I lead with their constraint (time, risk, proof) before I lead with my idea...",
        hint: "Two specific, concrete examples of the same Amit adapting tone, content, and framing.",
      },
    ],
  },
  {
    id: "intellectual_universe",
    title: "INTELLECTUAL UNIVERSE",
    subtitle: "The thinkers, books, and frameworks that built the mental OS you run on",
    color: "#D97706",
    questions: [
      {
        id: "q23_five_thinkers",
        number: 23,
        prompt: "Name the 5 thinkers — alive or dead, any field — who have most shaped how you see the world. For each: the one idea from them that genuinely changed you.",
        placeholder: "e.g. 1. Richard Feynman — the idea that if you can't explain it simply you don't understand it...",
        hint: "Not the thinkers you're supposed to admire. The ones who actually rewired something.",
      },
      {
        id: "q24_world_changing_book",
        number: 24,
        prompt: "What is the one book that changed how you see everything — not a favourite, the one where you were a different person after you finished it? What was the specific insight?",
        placeholder: "e.g. The book: [Title]. The insight: [Not the summary — the specific thing that landed]...",
        hint: "One book, one insight. The insight is more important than the book.",
      },
      {
        id: "q25_cross_domain_superpower",
        number: 25,
        prompt: "What is your cross-domain superpower — a pattern, skill, or insight from one field that you've successfully applied in an entirely different field?",
        placeholder: "e.g. I learned systems thinking from ecology and it's the lens I now use for school culture change...",
        hint: "The move that makes people ask 'where did that come from?' — because it came from somewhere unexpected.",
      },
      {
        id: "q26_thinker_to_argue",
        number: 26,
        prompt: "If you could put your single best idea in front of one thinker — living or dead — who would best stress-test it, what would they likely say against it?",
        placeholder: "e.g. I'd want [thinker]. My best idea is [X]. They would say [specific counter-argument]...",
        hint: "The strongest possible critic of your strongest possible idea.",
      },
      {
        id: "q27_what_clone_must_get_right",
        number: 27,
        prompt: "If your AI clone gets only one thing perfectly right about how you think, decide, and communicate — what is that one thing, above everything else?",
        placeholder: "e.g. That I never settle for surface-level diagnoses. I always push to the underlying cause...",
        hint: "The thing that, if missing, makes the clone useless — even if everything else is right.",
      },
    ],
  },
  {
    id: "active_context",
    title: "ACTIVE CONTEXT",
    subtitle: "Live state — what's actually in play right now",
    color: "#0F766E",
    questions: [
      {
        id: "q28_active_projects",
        number: 28,
        prompt: "What are your 3–5 active GSL projects right now? For each: what is it in one sentence, where does it stand, and what is the single biggest blocker?",
        placeholder: "e.g. Project 1: Innovator Lab pilot at DPS — in Year 2, 4 schools. Blocker: teacher confidence to run without scripts...",
        hint: "Write it like a status update to a board member who knows nothing. Brief and honest.",
      },
      {
        id: "q29_avoided_decision",
        number: 29,
        prompt: "What is the one decision you have been actively avoiding? Name it. And: what would have to be true for you to finally make it?",
        placeholder: "e.g. Whether to hire a Head of Operations. I'd make it if I had 3 months of runway beyond current...",
        hint: "The decision that keeps getting moved to next quarter's agenda.",
      },
      {
        id: "q30_clone_tasks",
        number: 30,
        prompt: "What do you want your digital clone to do for you that you never have time to do yourself? Be specific — not 'help me think', but actual tasks it should handle.",
        placeholder: "e.g. 1. Draft first-pass responses to inbound partnership emails in my voice\n2. Review proposals against my YES/NO list...",
        hint: "The tasks that pile up, get done at midnight, or just don't get done. Your clone's job description.",
      },
    ],
  },
];

const ALL_QUESTIONS = SECTIONS.flatMap((s) => s.questions.map((q) => ({ ...q, sectionId: s.id })));
const STORAGE_KEY = "amitCloneAnswers_v2";

// ─── Compiler: answers.json → amit.md ─────────────────────────────────────────

function compileAmitMd(answers, meta = {}) {
  const get = (id) => (answers[id] || "").trim() || "_[not answered]_";
  const date = new Date().toISOString().split("T")[0];

  return `# AMIT — DIGITAL CLONE CONTEXT FILE
<!-- Generated from interview. Target: ≤4,000 tokens. -->
<!-- Last updated: ${date} | Completed: ${meta.completed ? "Yes" : "Partial"} -->

---

## IDENTITY

**Name:** Amit Zaveri
**Essence:** ${get("q1_essence")}

**Contrarian belief:**
> ${get("q2_contrarian_belief")}

**Childhood obsession that still shows up:**
${get("q3_childhood_obsession")}

**Greatest strength:**
${get("q4_greatest_strength")}

**What frustrates me most:**
${get("q5_biggest_frustration")}

---

## HOW I THINK

**Decision process:**
${get("q6_decision_process")}

**Core mental models:**
${get("q7_mental_models")}

**Signature question:**
> "${get("q8_signature_question")}"

**Stuck protocol:**
${get("q9_stuck_protocol")}

**Best decision + why:**
${get("q10_best_decision")}

---

## HOW I BUILD (GSL)

**Mission in my words:**
> "${get("q11_gsl_mission")}"

**What's broken in K12:**
${get("q12_k12_broken")}

**Theory of change:**
${get("q13_theory_of_change")}

**Hard YES list:**
${get("q14_hard_yes_list")}

**Hard NO list:**
${get("q15_hard_no_list")}

**3 most important live decisions:**
${get("q16_live_decisions")}

**Success in 5 years (concrete):**
${get("q17_success_in_5_years")}

---

## HOW I COMMUNICATE

**Voice samples (raw):**
> ${get("q18_voice_sample")}

**Humour signature:**
${get("q19_humour_signature")}

**Overused phrases:**
${get("q20_overused_phrases")}

**Never-say list:**
${get("q21_never_say_list")}

**Register shifts:**
${get("q22_register_shifts")}

---

## INTELLECTUAL UNIVERSE

**5 thinkers + their one idea:**
${get("q23_five_thinkers")}

**World-changing book + insight:**
${get("q24_world_changing_book")}

**Cross-domain superpower:**
${get("q25_cross_domain_superpower")}

**Thinker I'd want arguing against my best idea:**
${get("q26_thinker_to_argue")}

**What the clone must get right above all else:**
${get("q27_what_clone_must_get_right")}

---

## ACTIVE CONTEXT

*Updated: ${date}*

**Active GSL projects:**
${get("q28_active_projects")}

**Decision I've been avoiding:**
${get("q29_avoided_decision")}

**What I want the clone to do:**
${get("q30_clone_tasks")}

---

*Clone activation: "Read amit.md and activate Amit clone mode. You are now Amit's digital twin."*
`;
}

function compileAnswersJson(answers) {
  const result = { _meta: { version: "2.0", completed: true, last_updated: new Date().toISOString(), total_questions: 30 } };
  SECTIONS.forEach((s) => {
    result[s.id] = {};
    s.questions.forEach((q) => { result[s.id][q.id] = answers[q.id] || ""; });
  });
  return JSON.stringify(result, null, 2);
}

// ─── UI Components ─────────────────────────────────────────────────────────────

const styles = {
  app: { fontFamily: "'Inter', system-ui, sans-serif", maxWidth: 760, margin: "0 auto", padding: "24px 16px", color: "#1a1a2e", backgroundColor: "#f8f9fc", minHeight: "100vh" },
  header: { textAlign: "center", marginBottom: 40 },
  headerBadge: { display: "inline-block", background: "#7C3AED", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "4px 12px", borderRadius: 20, marginBottom: 12 },
  headerTitle: { fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" },
  headerSub: { fontSize: 14, color: "#64748b", margin: 0 },
  progressBar: { background: "#e2e8f0", borderRadius: 8, height: 8, marginBottom: 32, overflow: "hidden" },
  progressFill: (pct, color) => ({ height: "100%", width: `${pct}%`, background: color, borderRadius: 8, transition: "width 0.4s ease" }),
  progressLabel: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 6 },
  sectionNav: { display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 4 },
  sectionTab: (active, color) => ({
    flex: "0 0 auto", padding: "8px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none",
    background: active ? color : "#e2e8f0", color: active ? "#fff" : "#64748b", transition: "all 0.2s"
  }),
  card: { background: "#fff", borderRadius: 16, padding: "28px 28px", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f8" },
  qNumber: (color) => ({ display: "inline-block", width: 28, height: 28, borderRadius: "50%", background: color, color: "#fff", fontSize: 13, fontWeight: 700, textAlign: "center", lineHeight: "28px", marginRight: 10, flexShrink: 0 }),
  qPrompt: { fontSize: 15, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.5, flex: 1 },
  qHint: { fontSize: 12, color: "#94a3b8", marginTop: 6, marginLeft: 38, fontStyle: "italic" },
  textarea: (answered) => ({
    width: "100%", minHeight: 100, marginTop: 14, padding: "12px 14px", fontSize: 14, lineHeight: 1.6,
    border: `1.5px solid ${answered ? "#c4b5fd" : "#e2e8f0"}`, borderRadius: 10, resize: "vertical",
    background: answered ? "#faf5ff" : "#f8fafc", outline: "none", fontFamily: "inherit", color: "#1a1a2e", boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s"
  }),
  charCount: (len) => ({ fontSize: 11, color: len > 50 ? "#10b981" : "#94a3b8", textAlign: "right", marginTop: 4 }),
  outputSection: { background: "#1a1a2e", borderRadius: 16, padding: 28, marginTop: 32 },
  outputTitle: { color: "#c4b5fd", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 16 },
  outputBlock: { background: "#0f172a", borderRadius: 10, padding: 20, marginBottom: 16, maxHeight: 300, overflowY: "auto" },
  outputCode: { color: "#e2e8f0", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 },
  copyBtn: (color) => ({
    padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
    background: color, color: "#fff", marginRight: 10, transition: "opacity 0.2s"
  }),
  saveBtn: { padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, background: "#7C3AED", color: "#fff", width: "100%", marginTop: 24 },
  completeCard: { background: "linear-gradient(135deg, #7C3AED, #0891B2)", borderRadius: 16, padding: 36, textAlign: "center", marginTop: 32 },
  completeTitle: { color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 8px" },
  completeSub: { color: "rgba(255,255,255,0.8)", fontSize: 14, margin: "0 0 24px" },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InterviewApp() {
  const [answers, setAnswers] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAnswers(JSON.parse(saved));
    } catch {}
  }, []);

  // Auto-save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  const handleChange = useCallback((id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const answeredCount = ALL_QUESTIONS.filter((q) => (answers[q.id] || "").trim().length > 20).length;
  const pct = Math.round((answeredCount / ALL_QUESTIONS.length) * 100);

  const section = SECTIONS[activeSection];

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const amitMd = compileAmitMd(answers, { completed: answeredCount === ALL_QUESTIONS.length });
  const answersJson = compileAnswersJson(answers);

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerBadge}>GSL INNOVATION FACTORY</span>
        <h1 style={styles.headerTitle}>Amit's Digital Clone</h1>
        <p style={styles.headerSub}>30-question identity interview · Your answers become the clone's brain</p>
      </div>

      {/* Progress */}
      <div style={styles.progressLabel}>
        <span>{answeredCount} of {ALL_QUESTIONS.length} questions answered</span>
        <span style={{ fontWeight: 700, color: pct === 100 ? "#10b981" : "#7C3AED" }}>{pct}%</span>
      </div>
      <div style={styles.progressBar}>
        <div style={styles.progressFill(pct, pct === 100 ? "#10b981" : "#7C3AED")} />
      </div>

      {/* Section Nav */}
      <div style={styles.sectionNav}>
        {SECTIONS.map((s, i) => {
          const sAnswered = s.questions.filter((q) => (answers[q.id] || "").trim().length > 20).length;
          return (
            <button key={s.id} style={styles.sectionTab(i === activeSection, s.color)} onClick={() => setActiveSection(i)}>
              {s.title} · {sAnswered}/{s.questions.length}
            </button>
          );
        })}
      </div>

      {/* Section Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: section.color, margin: "0 0 4px" }}>{section.title}</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{section.subtitle}</p>
      </div>

      {/* Questions */}
      {section.questions.map((q) => {
        const val = answers[q.id] || "";
        const answered = val.trim().length > 20;
        return (
          <div key={q.id} style={{ ...styles.card, borderLeft: answered ? `4px solid ${section.color}` : "4px solid #f0f0f8" }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={styles.qNumber(section.color)}>{q.number}</span>
              <p style={styles.qPrompt}>{q.prompt}</p>
            </div>
            <p style={styles.qHint}>{q.hint}</p>
            <textarea
              value={val}
              onChange={(e) => handleChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              style={styles.textarea(answered)}
            />
            <p style={styles.charCount(val.length)}>{val.length > 0 ? `${val.length} chars` : "Start typing..."}</p>
          </div>
        );
      })}

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: 12, marginTop: 8, marginBottom: 32 }}>
        {activeSection > 0 && (
          <button onClick={() => setActiveSection(activeSection - 1)} style={{ ...styles.copyBtn("#64748b"), flex: 1 }}>
            ← Previous Section
          </button>
        )}
        {activeSection < SECTIONS.length - 1 && (
          <button onClick={() => setActiveSection(activeSection + 1)} style={{ ...styles.copyBtn(section.color), flex: 1 }}>
            Next Section →
          </button>
        )}
      </div>

      {/* Generate Output */}
      {pct >= 50 && (
        <div>
          <button style={styles.saveBtn} onClick={() => setShowOutput(!showOutput)}>
            {showOutput ? "Hide Output Files" : `Generate Clone Files (${pct}% complete)`}
          </button>

          {showOutput && (
            <div style={styles.outputSection}>
              {/* amit.md output */}
              <p style={styles.outputTitle}>AMIT.MD — CONTEXT FILE (paste into Claude Project Instructions)</p>
              <div style={styles.outputBlock}>
                <pre style={styles.outputCode}>{amitMd}</pre>
              </div>
              <button style={styles.copyBtn("#7C3AED")} onClick={() => copyToClipboard(amitMd, "md")}>
                {copied === "md" ? "✓ Copied!" : "Copy amit.md"}
              </button>

              {/* answers.json output */}
              <p style={{ ...styles.outputTitle, marginTop: 24 }}>ANSWERS.JSON — RAW DATA (save to /interview/answers.json)</p>
              <div style={styles.outputBlock}>
                <pre style={styles.outputCode}>{answersJson}</pre>
              </div>
              <button style={styles.copyBtn("#0891B2")} onClick={() => copyToClipboard(answersJson, "json")}>
                {copied === "json" ? "✓ Copied!" : "Copy answers.json"}
              </button>

              {pct === 100 && (
                <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(16,185,129,0.15)", borderRadius: 10, borderLeft: "4px solid #10b981" }}>
                  <p style={{ color: "#10b981", fontWeight: 700, margin: "0 0 4px", fontSize: 14 }}>Interview complete.</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: 0 }}>
                    Next: Copy amit.md → paste into Claude Project Instructions → commit answers.json to GitHub.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Completion card */}
      {pct === 100 && (
        <div style={styles.completeCard}>
          <h3 style={styles.completeTitle}>The data is captured.</h3>
          <p style={styles.completeSub}>
            All 30 answers saved. Your amit.md is ready. Paste it into Claude Project Instructions to activate the clone.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>
            Activation prompt: <em>"Read amit.md and activate Amit clone mode. You are now Amit's digital twin."</em>
          </p>
        </div>
      )}
    </div>
  );
}
