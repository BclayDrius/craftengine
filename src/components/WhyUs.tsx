"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const });
    const unsub = motionVal.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
    });
    return () => { controls.stop(); unsub(); };
  }, [inView, motionVal, to, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

const STATS = [
  {
    value: 94,
    suffix: "%",
    label: "Precisión de\ndiagnóstico predictivo",
    note: "Validado en entornos de manufactura y energía",
  },
  {
    value: 85,
    prefix: "<",
    suffix: "ms",
    label: "Latencia de\ndetección de anomalías",
    note: "Desde adquisición de señal hasta alerta generada",
  },
  {
    value: 30,
    prefix: "<",
    suffix: " días",
    label: "Integración sin\nreemplazar infraestructura",
    note: "Conectamos sobre tus PLCs, SCADAs y redes OPC-UA existentes",
  },
];

const TECH_STACK = [
  "Python", "TensorFlow", "SQL", "Apache Kafka",
  "MQTT", "OPC-UA", "TinyML", "Docker", "Power BI",
];

export default function WhyUs() {
  return (
    <section id="tecnologia" className="py-24 lg:py-36 bg-surface-elevated" aria-labelledby="whyus-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          {/* Left column — narrative */}
          <motion.div className="lg:col-span-2 flex flex-col justify-between gap-12" {...FADE_UP}>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">
                Por qué CRAFTENGINE
              </p>
              <h2 id="whyus-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                El puente entre ingeniería física y ciencia de datos
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                La mayoría de las plataformas de mantenimiento predictivo son dashboards genéricos que agregan datos sin entender la física del equipo. CRAFTENGINE fusiona mecatrónica de precisión con modelos de ML entrenados en señales reales de planta.
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                El resultado es un diagnóstico explicable: cada alerta dice qué está fallando y por qué, con evidencia física — no solo una probabilidad opaca.
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">Stack tecnológico</p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — stats */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="rounded-xl border border-border bg-surface p-6 lg:p-8 flex flex-col sm:flex-row lg:flex-row items-start gap-4 lg:gap-6"
                {...FADE_UP}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              >
                {/* Big number */}
                <div className="shrink-0">
                  <div className="font-display text-4xl lg:text-5xl font-bold text-gold tracking-tight leading-none">
                    <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix} />
                  </div>
                </div>
                {/* Label */}
                <div>
                  <p className="font-display font-semibold text-foreground leading-snug whitespace-pre-line">
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">{s.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
