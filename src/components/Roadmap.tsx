"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const PHASES = [
  {
    num: "1",
    label: "Diagnóstico",
    time: "48–72 horas",
    free: true,
    deliverables: [
      "Análisis de activos y fuentes de datos",
      "Mapa de riesgo operativo",
      "Identificación de quick wins",
      "Propuesta de piloto personalizada",
    ],
    color: "border-border",
    numColor: "text-muted",
  },
  {
    num: "2",
    label: "Piloto",
    time: "4–8 semanas",
    free: false,
    deliverables: [
      "Captura e integración de datos",
      "Primer modelo predictivo entrenado",
      "Dashboard de alertas funcionando",
      "Validación con eventos históricos",
    ],
    color: "border-gold/40",
    numColor: "text-gold",
    highlight: true,
  },
  {
    num: "3",
    label: "Escalado",
    time: "2–4 meses",
    free: false,
    deliverables: [
      "Modelos para todos los activos críticos",
      "Integración con CMMS / ERP",
      "Alertas automáticas al equipo",
      "KPIs y reportes operativos",
    ],
    color: "border-border",
    numColor: "text-muted",
  },
  {
    num: "4",
    label: "Sistema completo",
    time: "Continuo",
    free: false,
    deliverables: [
      "Plataforma en producción estable",
      "Reentrenamiento automático (feedback loop)",
      "Soporte técnico y evolución del modelo",
      "Expansión a nuevas plantas o líneas",
    ],
    color: "border-border",
    numColor: "text-muted",
  },
];

export default function Roadmap() {
  return (
    <section className="py-24 lg:py-32 bg-surface-elevated" aria-labelledby="roadmap-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 max-w-xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: E }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Ruta del cliente</p>
          <h2 id="roadmap-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            De diagnóstico gratuito<br />a sistema completo
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            Cada fase es autónoma. Puedes evaluar resultados antes de comprometerte con la siguiente. El riesgo siempre es bajo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHASES.map((p, i) => (
            <motion.div
              key={p.num}
              className={`relative rounded-xl border p-6 flex flex-col gap-4 ${p.highlight ? "bg-surface" : "bg-surface"} ${p.color}`}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: E }}
            >
              {p.free && (
                <span className="absolute top-4 right-4 font-mono text-[10px] border border-success/40 text-success rounded-full px-2 py-0.5">
                  Gratuito
                </span>
              )}

              <div className="flex items-center gap-3">
                <span className={`font-display text-3xl font-bold ${p.numColor}`}>{p.num}</span>
                <div>
                  <p className="font-display font-semibold text-foreground">{p.label}</p>
                  <p className="font-mono text-[11px] text-muted">{p.time}</p>
                </div>
              </div>

              {/* Connector dot (between phases) */}
              {i < PHASES.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-px bg-border" aria-hidden="true" />
              )}

              <ul className="flex flex-col gap-2 flex-1">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                      <path d="M2 6.5l2.5 2.5 5.5-5.5" stroke={p.highlight ? "#C8A968" : "#9BA1AB"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-muted leading-snug">{d}</span>
                  </li>
                ))}
              </ul>

              {p.highlight && (
                <a href="#contacto"
                  className="mt-2 w-full rounded-lg bg-gold px-4 py-2 text-xs font-display font-semibold text-surface text-center hover:opacity-90 transition-opacity">
                  Empezar aquí
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
