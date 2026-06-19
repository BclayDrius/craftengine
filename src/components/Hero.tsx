"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import TelemetryChart from "./TelemetryChart";

const E = [0.16, 1, 0.3, 1] as const;

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: E },
});

const METRICS = [
  { value: "−38%", label: "paradas no planificadas" },
  { value: "+21%", label: "vida útil de activos" },
  { value: "< 30d", label: "primer piloto en producción" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-surface bg-grid pt-16"
      aria-label="Hero — CRAFTENGINE plataforma de inteligencia predictiva"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle at 70% 30%, #C8A968 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          <div className="flex flex-col">
            <motion.p
              className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-gold"
              {...FADE(0.1)}
            >
              Plataforma de Inteligencia Predictiva · IA + IoT
            </motion.p>

            <motion.h1
              className="font-display font-bold text-foreground leading-[1.04] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)" }}
              {...FADE(0.2)}
            >
              Sabe qué va a fallar{" "}
              <span className="text-gold">antes de que ocurra.</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg leading-relaxed text-muted max-w-xl"
              {...FADE(0.3)}
            >
              CRAFTENGINE es la plataforma end-to-end que captura señales de tus equipos, entrena modelos predictivos con tus propios datos y despliega alertas en tiempo real — sin reemplazar tu infraestructura existente.
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap items-center gap-4" {...FADE(0.4)}>
              <Link
                href="#contacto"
                className="inline-flex items-center rounded-lg bg-gold px-6 py-3 text-sm font-display font-semibold text-surface transition-opacity duration-150 hover:opacity-90"
              >
                Agendar diagnóstico
              </Link>
              <Link
                href="#plataforma"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-150"
              >
                Ver la plataforma
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>

            <motion.div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-8" {...FADE(0.5)}>
              {METRICS.map((m) => (
                <div key={m.label}>
                  <p className="font-display font-bold text-xl text-gold">{m.value}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted uppercase tracking-wide">{m.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: E }}
          >
            <TelemetryChart />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
