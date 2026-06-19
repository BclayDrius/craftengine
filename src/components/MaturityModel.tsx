"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const STAGES = [
  {
    id: "reactivo",
    label: "Reactivo",
    tagline: "Reparas cuando ya se rompió",
    description: "Altos costos de emergencia, paradas largas, daños secundarios. El equipo apaga incendios en lugar de prevenirlos.",
    kpi: "MTTR alto · Costos impredecibles",
    color: "text-danger",
    borderColor: "border-danger/30",
    dotColor: "bg-danger",
    highlight: false,
  },
  {
    id: "preventivo",
    label: "Preventivo",
    tagline: "Reparas según calendarios, no realidad",
    description: "Mejor que reactivo, pero sigues reemplazando piezas que aún funcionan o dejando pasar fallas que el calendario no detecta.",
    kpi: "Mantenimiento innecesario · Baja visibilidad real",
    color: "text-warn",
    borderColor: "border-warn/30",
    dotColor: "bg-warn",
    highlight: false,
  },
  {
    id: "predictivo",
    label: "Predictivo",
    tagline: "Reparas cuando el dato lo dice",
    description: "Los datos de tus equipos hablan antes de que fallen. Actúas en el momento exacto, con evidencia física — no por calendario ni emergencia.",
    kpi: "MTBF ↑ · OEE ↑ · Costos predecibles",
    color: "text-gold",
    borderColor: "border-gold/40",
    dotColor: "bg-gold",
    highlight: true,
  },
];

export default function MaturityModel() {
  return (
    <section className="py-24 lg:py-32 bg-surface-elevated" aria-labelledby="maturity-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 max-w-xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: E }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Modelo de madurez</p>
          <h2 id="maturity-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            ¿En qué etapa está<br />tu operación hoy?
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            La mayoría de las plantas oscilan entre reactivo y preventivo. El predictivo es el salto que transforma la ecuación de costos.
          </p>
        </motion.div>

        {/* Evolution line — desktop horizontal, mobile vertical */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[3.25rem] left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-border" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.id}
                className={`relative rounded-xl border p-6 flex flex-col gap-3 transition-all duration-300
                  ${s.highlight
                    ? "bg-surface border-gold/40 shadow-[0_0_40px_rgba(200,169,104,0.07)]"
                    : "bg-surface border-border"
                  }`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: E }}
              >
                {/* Stage indicator */}
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${s.dotColor}`} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Etapa {i + 1}</span>
                  {s.highlight && (
                    <span className="ml-auto font-mono text-[10px] border border-gold/40 text-gold rounded-full px-2 py-0.5">
                      CRAFTENGINE
                    </span>
                  )}
                </div>

                <div>
                  <h3 className={`font-display text-xl font-bold ${s.color}`}>{s.label}</h3>
                  <p className={`mt-0.5 font-display text-sm font-medium ${s.highlight ? "text-foreground" : "text-muted"}`}>
                    {s.tagline}
                  </p>
                </div>

                <p className="text-sm text-muted leading-relaxed">{s.description}</p>

                <div className={`mt-auto pt-3 border-t ${s.highlight ? "border-gold/20" : "border-border"}`}>
                  <p className="font-mono text-[11px] text-muted">{s.kpi}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
