"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const NODES = [
  {
    step: "01",
    title: "Captura",
    sub: "Edge / Sensores",
    detail: "Vibración, corriente, temperatura, presión — en campo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="3" fill="#C8A968" />
        <circle cx="10" cy="10" r="6.5" stroke="#C8A968" strokeWidth="1.2" opacity="0.5" />
        <circle cx="10" cy="10" r="9.5" stroke="#C8A968" strokeWidth="1" opacity="0.2" />
      </svg>
    ),
    accent: true,
  },
  {
    step: "02",
    title: "Transmisión",
    sub: "IoT / MQTT",
    detail: "Protocolo ligero de mensajería para redes industriales",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 10c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#4FD1C5" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 10c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#4FD1C5" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="10" cy="10" r="1.5" fill="#4FD1C5" />
      </svg>
    ),
    accent: false,
  },
  {
    step: "03",
    title: "Almacenamiento",
    sub: "Data Lake",
    detail: "Historial estructurado, limpiado y listo para ML",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <ellipse cx="10" cy="6" rx="7" ry="2.5" stroke="#9BA1AB" strokeWidth="1.3" />
        <path d="M3 6v4c0 1.38 3.134 2.5 7 2.5S17 11.38 17 10V6" stroke="#9BA1AB" strokeWidth="1.3" />
        <path d="M3 10v4c0 1.38 3.134 2.5 7 2.5S17 15.38 17 14v-4" stroke="#9BA1AB" strokeWidth="1.3" />
      </svg>
    ),
    accent: false,
  },
  {
    step: "04",
    title: "Modelado IA",
    sub: "ML / Predicción",
    detail: "Modelos entrenados con tus datos — regresión, clasificación, series de tiempo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 14l3-4 3 2 3-6 3 5" stroke="#C8A968" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="1" width="18" height="18" rx="3" stroke="#C8A968" strokeWidth="1.2" />
      </svg>
    ),
    accent: true,
  },
  {
    step: "05",
    title: "Despliegue",
    sub: "API / Integración",
    detail: "REST API o webhooks hacia tus sistemas existentes",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M7 4h6a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#9BA1AB" strokeWidth="1.3" />
        <path d="M9 9l2 2-2 2M11 9h-2" stroke="#9BA1AB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: false,
  },
  {
    step: "06",
    title: "Acción",
    sub: "Alertas / CMMS",
    detail: "Notificaciones en tiempo real, órdenes de trabajo automáticas",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2v2M10 16v2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M2 10h2M16 10h2M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="#4FD1C5" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="10" cy="10" r="3" fill="#4FD1C5" opacity="0.8" />
      </svg>
    ),
    accent: false,
  },
];

export default function PlatformPipeline() {
  return (
    <section id="plataforma" className="py-24 lg:py-32 bg-surface" aria-labelledby="pipeline-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: E }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Arquitectura de la plataforma</p>
          <h2 id="pipeline-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            De la señal cruda<br />a la decisión en tiempo real
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            Seis etapas conectadas. Cada una tiene un propósito específico; juntas forman el sistema completo de inteligencia predictiva.
          </p>
        </motion.div>

        {/* Pipeline flow */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[2.75rem] left-[4%] right-[4%] h-px bg-border z-0" aria-hidden="true" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {NODES.map((node, i) => (
              <motion.div
                key={node.step}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: E }}
              >
                {/* Node circle */}
                <div className={`mx-auto w-11 h-11 rounded-full border flex items-center justify-center
                  ${node.accent
                    ? "border-gold/50 bg-surface-elevated shadow-[0_0_20px_rgba(200,169,104,0.15)]"
                    : "border-border bg-surface-elevated"
                  }`}>
                  {node.icon}
                </div>

                {/* Content */}
                <div className="text-center">
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted mb-0.5">{node.step}</p>
                  <p className={`font-display font-semibold text-sm ${node.accent ? "text-gold" : "text-foreground"}`}>
                    {node.title}
                  </p>
                  <p className="font-mono text-[10px] text-muted mt-0.5">{node.sub}</p>
                  <p className="mt-1.5 text-xs text-muted leading-relaxed hidden lg:block">{node.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          className="mt-12 rounded-xl border border-gold/20 bg-surface-elevated px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease: E }}
        >
          <div className="w-8 h-8 rounded-lg border border-gold/30 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v4l3 3" stroke="#C8A968" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="8" cy="8" r="6" stroke="#C8A968" strokeWidth="1.2" />
            </svg>
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-foreground">Se integra sobre tu infraestructura existente</p>
            <p className="mt-0.5 text-sm text-muted">Sin reemplazar PLCs, SCADAs ni ERPs. CRAFTENGINE se conecta, no reemplaza.</p>
          </div>
          <a href="#contacto"
            className="ml-auto shrink-0 rounded-lg border border-gold/40 px-4 py-2 font-mono text-xs text-gold hover:bg-gold/5 transition-colors">
            Ver cómo →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
