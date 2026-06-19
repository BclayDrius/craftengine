"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const FU = (delay = 0) => ({
  initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, margin: "-70px" },
  transition: { duration: 0.5, delay, ease: E },
});

const MODEL_TYPES = [
  { label: "Regresión", desc: "¿Cuándo va a fallar?" },
  { label: "Clasificación", desc: "¿Falla sí / no?" },
  { label: "Series de tiempo", desc: "Forecasting de condición" },
  { label: "Anomaly detection", desc: "Comportamiento fuera de norma" },
  { label: "Survival analysis", desc: "Vida útil restante" },
];

export default function Capabilities() {
  return (
    <section className="py-24 lg:py-32 bg-surface-elevated" aria-labelledby="capabilities-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-16 max-w-xl" {...FU()}>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Capacidades núcleo</p>
          <h2 id="capabilities-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Inteligencia completa,<br />no soluciones parciales
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* 1 — Modelos predictivos (large) */}
          <motion.article
            className="lg:col-span-2 group rounded-xl border border-border bg-surface p-6 hover:border-border-strong transition-all duration-300 relative overflow-hidden"
            {...FU(0)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 13l4-5 3 3 4-8 3 6" stroke="#C8A968" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-mono text-[10px] border border-border rounded-full px-2 py-0.5 text-muted">5 tipos de modelo</span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gold mb-1">Núcleo</p>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Modelos predictivos específicos</h3>
            <p className="text-sm text-muted leading-relaxed mb-5">
              Entrenados con tus propios datos históricos. No son modelos genéricos; son modelos que conocen tus máquinas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MODEL_TYPES.map((t) => (
                <div key={t.label} className="flex items-center gap-2.5 rounded-lg border border-border bg-surface-elevated px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="font-mono text-xs text-foreground">{t.label}</span>
                  <span className="font-mono text-[10px] text-muted ml-auto">{t.desc}</span>
                </div>
              ))}
            </div>
            <span className="absolute bottom-0 left-6 right-6 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.article>

          {/* 2 — Detección de anomalías */}
          <motion.article
            className="group rounded-xl border border-border bg-surface p-6 hover:border-border-strong transition-all duration-300 relative"
            {...FU(0.05)}
          >
            <div className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7" stroke="#4FD1C5" strokeWidth="1.3" />
                <path d="M9 6v4M9 12v.5" stroke="#4FD1C5" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gold mb-1">Tiempo real</p>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Detección de anomalías</h3>
            <p className="text-sm text-muted leading-relaxed">
              Streaming de señales. Cuando el comportamiento del equipo se desvía del patrón normal, genera una alerta instantánea con diagnóstico físico.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="font-mono text-[11px] text-teal">Streaming continuo · latencia {"<"} 85ms</span>
            </div>
            <span className="absolute bottom-0 left-6 right-6 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.article>

          {/* 3 — Sistema de decisión */}
          <motion.article
            className="group rounded-xl border border-border bg-surface p-6 hover:border-border-strong transition-all duration-300 relative"
            {...FU(0.1)}
          >
            <div className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h12M9 3l6 6-6 6" stroke="#C8A968" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gold mb-1">Acción</p>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Sistema de decisión</h3>
            <p className="text-sm text-muted leading-relaxed">
              No solo predice — recomienda la acción correcta y prioriza alertas por impacto en producción, costo de falla y urgencia real.
            </p>
            <span className="absolute bottom-0 left-6 right-6 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.article>

          {/* 4 — Edge AI */}
          <motion.article
            className="group rounded-xl border border-border bg-surface p-6 hover:border-border-strong transition-all duration-300 relative"
            {...FU(0.12)}
          >
            <div className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="12" height="8" rx="1.5" stroke="#4FD1C5" strokeWidth="1.3" />
                <path d="M7 5V4M11 5V4M6 13v1M12 13v1" stroke="#4FD1C5" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="9" cy="9" r="1.5" fill="#4FD1C5" />
              </svg>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gold mb-1">IoT</p>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Edge AI</h3>
            <p className="text-sm text-muted leading-relaxed">
              Modelos corriendo directamente en el dispositivo. Decisiones sin depender del cloud — baja latencia, funciona en redes restringidas.
            </p>
            <span className="absolute bottom-0 left-6 right-6 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.article>

          {/* 5 — XAI (large) */}
          <motion.article
            className="lg:col-span-2 group rounded-xl border border-border bg-surface p-6 hover:border-border-strong transition-all duration-300 relative"
            {...FU(0.15)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 2a7 7 0 100 14A7 7 0 009 2z" stroke="#C8A968" strokeWidth="1.3" />
                  <path d="M9 8v2M9 12v.5" stroke="#C8A968" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6 6.5C6.5 5.5 7.5 5 9 5s3 .8 3 2c0 1.5-3 2-3 3.5" stroke="#C8A968" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-mono text-[10px] border border-gold/30 rounded-full px-2 py-0.5 text-gold">Diferenciador</span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gold mb-1">Transparencia</p>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Explainable AI (XAI)</h3>
            <p className="text-sm text-muted leading-relaxed mb-5">
              Cada predicción incluye las variables que la dispararon y su peso relativo. Tu equipo entiende por qué el modelo predijo el fallo — no actúa a ciegas.
            </p>
            <div className="space-y-2">
              {[
                { var: "Temperatura rodamiento", pct: 78 },
                { var: "Amplitud vibración X", pct: 54 },
                { var: "Corriente motor fase A", pct: 31 },
              ].map(({ var: v, pct }) => (
                <div key={v}>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-[11px] text-muted">{v}</span>
                    <span className="font-mono text-[11px] text-gold">{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <span className="absolute bottom-0 left-6 right-6 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.article>

          {/* 6 — Data engineering */}
          <motion.article
            className="group rounded-xl border border-border bg-surface p-6 hover:border-border-strong transition-all duration-300 relative"
            {...FU(0.2)}
          >
            <div className="w-9 h-9 rounded-lg border border-border bg-surface-elevated flex items-center justify-center mb-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 14V8M8 14V4M12 14v-6M16 14V6" stroke="#9BA1AB" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 14h14" stroke="#9BA1AB" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gold mb-1">Fundación</p>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Data engineering & feedback loop</h3>
            <p className="text-sm text-muted leading-relaxed">
              Limpieza, estructuración e integración de tus datos. Los modelos se reentrenan automáticamente con datos nuevos — mejora continua incorporada.
            </p>
            <span className="absolute bottom-0 left-6 right-6 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.article>

        </div>
      </div>
    </section>
  );
}
