"use client";
import { motion } from "framer-motion";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

function AnomalyMini() {
  return (
    <svg viewBox="0 0 280 80" className="w-full h-16" aria-hidden="true">
      <path
        d="M0,50 L30,45 L60,52 L90,42 L120,50 L140,48 L155,38 L165,18 L172,5 L178,22 L185,40 L200,50 L230,45 L260,50 L280,48"
        fill="none"
        stroke="#C8A968"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="172" cy="5" r="3.5" fill="#4FD1C5" />
      <line x1="172" y1="0" x2="172" y2="80" stroke="#4FD1C5" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
    </svg>
  );
}

const CARDS = [
  {
    size: "large",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L3 7v6l7 5 7-5V7L10 2z" stroke="#C8A968" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="#C8A968" />
      </svg>
    ),
    eyebrow: "Core",
    title: "Detección de anomalías",
    body: "Modelos de Machine Learning entrenados sobre señales de operación real. Anticipamos fallos con precisión de diagnóstico del 93.7 % antes de que el equipo se detenga.",
    extra: <AnomalyMini />,
    tag: "ML Predictivo",
  },
  {
    size: "normal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <polyline points="2,14 7,8 12,11 18,4" stroke="#C8A968" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="1" width="18" height="18" rx="3" stroke="#333740" strokeWidth="1" />
      </svg>
    ),
    eyebrow: "Señal",
    title: "Análisis de telemetría",
    body: "Procesamos vibración, corriente, temperatura y presión de sistemas complejos. Interpretamos la física detrás del dato, no solo el dato.",
    tag: "Tiempo real",
  },
  {
    size: "normal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="7" height="14" rx="1.5" stroke="#C8A968" strokeWidth="1.5" />
        <rect x="11" y="7" width="7" height="10" rx="1.5" stroke="#C8A968" strokeWidth="1.5" />
        <path d="M5.5 8h0m4 0h0" stroke="#9BA1AB" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    eyebrow: "Inteligencia",
    title: "Dashboards operativos",
    body: "Consolidación de bases relacionales y métricas de rendimiento en interfaces accionables. OEE, MTBF y disponibilidad en tiempo real.",
    tag: "BI · Operaciones",
  },
  {
    size: "large",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="#C8A968" strokeWidth="1.5" />
        <path d="M10 7v3.5l2.5 2.5" stroke="#C8A968" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 2.5l1.5 1.5M14 2.5L12.5 4" stroke="#9BA1AB" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    eyebrow: "Diferenciador",
    title: "Diagnóstico explicable",
    body: "Cada alerta incluye la causa física probable — desequilibrio de rotor, desgaste de rodamiento, cavitación — y el porcentaje de confianza. No una caja negra; ingeniería transparente.",
    extra: (
      <div className="mt-3 space-y-1.5">
        {[
          { label: "Desequilibrio rotor", pct: 84, color: "bg-gold" },
          { label: "Desalineación eje", pct: 11, color: "bg-border-strong" },
          { label: "Resonancia estructural", pct: 5, color: "bg-border-strong" },
        ].map(({ label, pct, color }) => (
          <div key={label}>
            <div className="flex justify-between mb-0.5">
              <span className="font-mono text-[10px] text-muted">{label}</span>
              <span className="font-mono text-[10px] text-gold">{pct}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-border overflow-hidden">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
    tag: "XAI",
  },
];

export default function Solutions() {
  return (
    <section id="soluciones" className="py-24 lg:py-36 bg-surface" aria-labelledby="solutions-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-16 max-w-2xl" {...FADE_UP}>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">
            Soluciones
          </p>
          <h2 id="solutions-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Del ruido de la máquina<br />a la decisión correcta
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Cuatro capacidades que convierten telemetría cruda en acciones de mantenimiento con evidencia física.
          </p>
        </motion.div>

        {/* Bento grid — 2-col on md+, asymmetric */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              className={`group relative flex flex-col rounded-xl border border-border bg-surface-elevated p-6 transition-all duration-300
                hover:border-border-strong hover:bg-surface-subtle
                ${card.size === "large" && i === 0 ? "lg:col-span-2" : ""}
                ${card.size === "large" && i === 3 ? "lg:col-span-2" : ""}
              `}
              {...FADE_UP}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface">
                  {card.icon}
                </div>
                <span className="font-mono text-[10px] text-muted uppercase tracking-wider border border-border rounded-full px-2 py-0.5">
                  {card.tag}
                </span>
              </div>

              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gold">{card.eyebrow}</p>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted flex-1">{card.body}</p>

              {card.extra && <div className="mt-4">{card.extra}</div>}

              {/* Hover accent line */}
              <span className="absolute bottom-0 left-6 right-6 h-px bg-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
