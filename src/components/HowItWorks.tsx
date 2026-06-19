"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    num: "01",
    title: "Capturamos tus datos",
    detail: "Conectamos sensores industriales (vibración, corriente, temperatura, presión) o integramos tus fuentes existentes: SCADA, PLC, ERP, Excel, historian. No necesitas datos perfectos para empezar.",
    tag: "Diagnóstico gratuito",
  },
  {
    num: "02",
    title: "Limpiamos y estructuramos",
    detail: "Los datos industriales suelen estar fragmentados y ruidosos. Nuestro equipo de data engineering los prepara: normalización, etiquetado de eventos, alineación temporal y auditoría de calidad.",
    tag: "Data engineering",
  },
  {
    num: "03",
    title: "Entrenamos modelos específicos",
    detail: "Seleccionamos el tipo de modelo correcto para tu caso — forecasting, detección de anomalías, clasificación de falla, survival analysis. Lo entrenamos con tus datos, no con datos genéricos.",
    tag: "Modelado IA",
  },
  {
    num: "04",
    title: "Validamos con datos reales",
    detail: "Antes de desplegar en producción, validamos el modelo con datos históricos etiquetados y lo ajustamos contigo. Mides la precisión antes de comprometer la operación.",
    tag: "Validación",
  },
  {
    num: "05",
    title: "Desplegamos alertas en tiempo real",
    detail: "El sistema corre en producción. Las alertas llegan a tu dashboard, tu CMMS o tu correo — con causa física probable y acción recomendada. Sin parar la planta en ningún momento del proceso.",
    tag: "Producción",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-surface" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Left sticky label */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6 lg:sticky lg:top-24 self-start"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: E }}
          >
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Implementación</p>
              <h2 id="how-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Cinco pasos.<br />Sin parar<br />tu operación.
              </h2>
              <p className="mt-5 text-base text-muted leading-relaxed">
                El proceso es progresivo e invasivo cero. Cada fase tiene un entregable concreto y un punto de decisión — nunca te comprometemos ciegamente con la siguiente.
              </p>
            </div>

            <div className="rounded-xl border border-gold/20 bg-surface-elevated p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold mb-3">Garantía de proceso</p>
              {[
                "Integración sin reemplazar infraestructura",
                "Primer resultado en < 30 días",
                "Puedes parar entre fases sin penalidad",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 mb-2 last:mb-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                    <path d="M3 7.5l2.5 2.5 5.5-5.5" stroke="#C8A968" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-muted">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right steps */}
          <div className="lg:col-span-3 flex flex-col gap-0">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                className="relative flex gap-5 pb-8 last:pb-0"
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: E }}
              >
                {/* Timeline line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[1.3rem] top-10 bottom-0 w-px bg-border" aria-hidden="true" />
                )}

                {/* Number badge */}
                <div className="shrink-0 w-11 h-11 rounded-full border border-border bg-surface-elevated flex items-center justify-center z-10">
                  <span className="font-mono text-xs font-semibold text-gold">{s.num}</span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 pb-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-semibold text-foreground">{s.title}</h3>
                    <span className="shrink-0 font-mono text-[10px] border border-border rounded-full px-2 py-0.5 text-muted">
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
