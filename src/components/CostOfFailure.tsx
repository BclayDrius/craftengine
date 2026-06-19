"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const STATS = [
  {
    value: "$50K+",
    unit: "/ hora",
    label: "Costo de una parada no planificada en manufactura pesada",
    note: "Promedio industria — producción perdida + daño secundario + mano de obra emergente",
  },
  {
    value: "7–12%",
    unit: "producción anual",
    label: "Pérdida productiva atribuida a mantenimiento reactivo",
    note: "Equivalente a semanas enteras de operación que nunca recuperarás",
  },
  {
    value: "3×",
    unit: "más caro",
    label: "Costo del mantenimiento reactivo vs. el predictivo",
    note: "Dato referenciado por Deloitte y el U.S. Department of Energy",
  },
  {
    value: "68%",
    unit: "son predecibles",
    label: "De las fallas críticas se pueden anticipar con los datos correctos",
    note: "Condición: los datos existen y están bien capturados — CRAFTENGINE los aprovecha",
  },
];

export default function CostOfFailure() {
  return (
    <section
      className="py-24 lg:py-32 bg-surface relative overflow-hidden"
      aria-labelledby="cost-heading"
    >
      {/* Subtle danger tint behind section */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #E5564B 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: E }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-danger">El costo del desconocimiento</p>
          <h2 id="cost-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            No saber qué va a fallar<br />tiene un precio exacto
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            No es hipotético. Cada hora de parada, cada falla no anticipada, cada reparación de emergencia es dinero que ya salió.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              className="group rounded-xl border border-border bg-surface-elevated p-6 flex flex-col gap-3 hover:border-border-strong transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: E }}
            >
              <div>
                <span className="font-display font-bold text-danger leading-none" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
                  {s.value}
                </span>
                <span className="ml-2 font-mono text-sm text-muted">{s.unit}</span>
              </div>
              <p className="font-display font-semibold text-sm text-foreground leading-snug">{s.label}</p>
              <p className="font-mono text-[11px] text-muted leading-relaxed">{s.note}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease: E }}
        >
          <p className="font-display text-lg text-muted">
            ¿Cuánto le estás pagando al{" "}
            <span className="text-foreground font-semibold">desconocimiento?</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
