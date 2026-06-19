"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

type Option = { label: string; score: number };
type Question = { id: string; text: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: "datos",
    text: "¿Tienes sensores o datos históricos de tus equipos?",
    options: [
      { label: "Sí, múltiples sensores y datos históricos digitalizados", score: 2 },
      { label: "Algunos sensores o datos parciales / en papel", score: 1 },
      { label: "No tenemos nada implementado aún", score: 0 },
    ],
  },
  {
    id: "paradas",
    text: "¿Cuántas paradas no planificadas tienes por mes?",
    options: [
      { label: "Menos de 1 — bien controlado", score: 0 },
      { label: "1 a 3 paradas por mes", score: 1 },
      { label: "4 o más paradas por mes", score: 2 },
    ],
  },
  {
    id: "madurez",
    text: "¿Cómo describes tu mantenimiento actual?",
    options: [
      { label: "Totalmente reactivo — reparamos cuando se rompe", score: 0 },
      { label: "Preventivo por calendario — tenemos programación", score: 1 },
      { label: "Tenemos algunas métricas y KPIs básicos (MTBF, OEE)", score: 2 },
    ],
  },
  {
    id: "historial",
    text: "¿Cuántos años de datos históricos tienes digitalizados?",
    options: [
      { label: "Más de 2 años de datos bien estructurados", score: 2 },
      { label: "Menos de 2 años o datos fragmentados", score: 1 },
      { label: "No tenemos datos digitalizados", score: 0 },
    ],
  },
  {
    id: "tecnica",
    text: "¿Tu equipo puede integrar APIs o sistemas externos?",
    options: [
      { label: "Sí, tenemos capacidad técnica interna", score: 2 },
      { label: "Sí, con apoyo externo", score: 1 },
      { label: "No — necesitamos soporte técnico completo", score: 0 },
    ],
  },
];

type Level = { label: string; desc: string; color: string; borderColor: string; cta: string };

const LEVELS: Record<string, Level> = {
  high: {
    label: "Listo para predicción",
    desc: "Tus datos y madurez de procesos permiten un piloto en 4–8 semanas. CRAFTENGINE puede conectarse y generar las primeras alertas rápidamente.",
    color: "text-success",
    borderColor: "border-success/30",
    cta: "Agendar piloto ahora",
  },
  mid: {
    label: "En camino",
    desc: "Tienes una base sólida. Con preparación básica de datos y sensores en los activos críticos, podrás implementar en 2–3 meses. CRAFTENGINE diseña el plan.",
    color: "text-warn",
    borderColor: "border-warn/30",
    cta: "Ver plan de preparación",
  },
  low: {
    label: "Necesitas preparación de datos",
    desc: "Muchas plantas exitosas empezaron igual. CRAFTENGINE puede ayudarte a construir la base de datos correcta antes del primer modelo — es parte de lo que hacemos.",
    color: "text-muted",
    borderColor: "border-border",
    cta: "Comenzar desde cero",
  },
};

function getLevel(score: number): Level {
  if (score >= 7) return LEVELS.high;
  if (score >= 4) return LEVELS.mid;
  return LEVELS.low;
}

export default function ReadinessScore() {
  const [step, setStep] = useState(0); // 0..4 = questions, 5 = email, 6 = result
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const current = QUESTIONS[step];
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const selectOption = (score: number) => {
    const updated = { ...answers, [current.id]: score };
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStep(QUESTIONS.length); // go to email
    }
  };

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Ingresa un correo válido");
      return;
    }
    setLoading(true);
    // TODO: POST { email, answers, score: totalScore } to /api/readiness-score
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep(QUESTIONS.length + 1); // result
  };

  const level = getLevel(totalScore);

  return (
    <section className="py-24 lg:py-32 bg-surface" aria-labelledby="readiness-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: E }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Evaluación gratuita</p>
            <h2 id="readiness-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              ¿Qué tan listo estás para<br />predicción con IA?
            </h2>
            <p className="mt-5 text-base text-muted leading-relaxed max-w-md">
              Responde 5 preguntas. Recibes un Data Readiness Score personalizado y una recomendación de siguiente paso — sin compromiso.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Diagnóstico en 2 minutos",
                "Sin datos personales innecesarios",
                "Recomendación personalizada por industria",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-sm text-muted">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — quiz widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: E }}
          >
            <div className="rounded-xl border border-border bg-surface-elevated p-6 sm:p-8 min-h-[340px]">
              <AnimatePresence mode="wait">

                {/* Questions */}
                {step < QUESTIONS.length && (
                  <motion.div key={`q-${step}`}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: E }}
                    className="flex flex-col gap-5"
                  >
                    {/* Progress */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full transition-all duration-400"
                          style={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-muted shrink-0">{step + 1} / {QUESTIONS.length}</span>
                    </div>

                    <p className="font-display font-semibold text-foreground leading-snug">{current.text}</p>

                    <div className="flex flex-col gap-2.5">
                      {current.options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => selectOption(opt.score)}
                          className="text-left rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted hover:border-gold/40 hover:text-foreground transition-all duration-150"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Email capture */}
                {step === QUESTIONS.length && (
                  <motion.form key="email"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: E }}
                    onSubmit={submitEmail} noValidate className="flex flex-col gap-5"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-gold mb-2">Casi listo</p>
                      <p className="font-display font-semibold text-foreground">¿Dónde enviamos tu resultado?</p>
                      <p className="mt-1 text-sm text-muted">Calculamos tu Data Readiness Score y te lo enviamos con un plan de acción personalizado.</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rs-email" className="font-mono text-[11px] uppercase tracking-wider text-muted">
                        Correo corporativo
                      </label>
                      <input
                        id="rs-email" type="email" placeholder="tu@empresa.com"
                        value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                        aria-invalid={!!emailError}
                        className={`rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder-muted/40 outline-none transition-colors
                          ${emailError ? "border-danger" : "border-border focus:border-gold"}`}
                      />
                      {emailError && <p className="font-mono text-[10px] text-danger">{emailError}</p>}
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full rounded-lg bg-gold px-5 py-3 text-sm font-display font-semibold text-surface hover:opacity-90 transition-opacity disabled:opacity-60">
                      {loading ? "Calculando…" : "Ver mi resultado →"}
                    </button>
                    <p className="font-mono text-[10px] text-muted text-center">Sin spam. Solo tu resultado y una recomendación.</p>
                  </motion.form>
                )}

                {/* Result */}
                {step === QUESTIONS.length + 1 && (
                  <motion.div key="result"
                    initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: E }}
                    className="flex flex-col gap-5"
                    role="alert" aria-live="polite"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Tu Data Readiness Score</p>
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-display text-5xl font-bold text-gold">{totalScore}</span>
                        <span className="font-display text-xl text-muted">/ 10</span>
                      </div>
                      <p className={`font-display text-xl font-semibold ${level.color}`}>{level.label}</p>
                    </div>

                    <div className={`rounded-lg border ${level.borderColor} p-4`}>
                      <p className="text-sm text-muted leading-relaxed">{level.desc}</p>
                    </div>

                    <a href="#contacto"
                      className="w-full rounded-lg bg-gold px-5 py-3 text-sm font-display font-semibold text-surface text-center hover:opacity-90 transition-opacity">
                      {level.cta} →
                    </a>

                    <button
                      onClick={() => { setStep(0); setAnswers({}); setEmail(""); }}
                      className="text-center font-mono text-[11px] text-muted hover:text-foreground transition-colors"
                    >
                      Reiniciar evaluación
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
