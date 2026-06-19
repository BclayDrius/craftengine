"use client";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const E = [0.16, 1, 0.3, 1] as const;

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, to, { duration: 2, ease: [0.16, 1, 0.3, 1] as const });
    const unsub = mv.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
    });
    return () => { ctrl.stop(); unsub(); };
  }, [inView, mv, to, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const METRICS = [
  { label: "MTBF", direction: "↑", value: 34, suffix: "%", desc: "Tiempo medio entre fallas" },
  { label: "MTTR", direction: "↓", value: 47, suffix: "%", desc: "Tiempo medio de reparación" },
  { label: "OEE", direction: "↑", value: 18, suffix: "%", desc: "Eficiencia operativa global" },
  { label: "Paradas no planificadas", direction: "↓", value: 38, suffix: "%", desc: "Eventos de downtime no esperados" },
  { label: "Costos de mantenimiento", direction: "↓", value: 23, suffix: "%", desc: "Vs. mantenimiento reactivo" },
  { label: "Vida útil de activos", direction: "↑", value: 21, suffix: "%", desc: "Extensión de vida operativa" },
];

const DIR_COLOR: Record<string, string> = { "↑": "text-success", "↓": "text-gold" };

export default function KPIs() {
  return (
    <section className="py-20 lg:py-28 bg-surface" aria-labelledby="kpis-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: E }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-gold">Resultados medidos</p>
          <h2 id="kpis-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            KPIs que cambian la ecuación
          </h2>
          <p className="mt-3 text-base text-muted">Promedio de clientes en producción con CRAFTENGINE.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="rounded-xl border border-border bg-surface-elevated p-5 flex flex-col gap-2"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: E }}
            >
              <div className="flex items-baseline gap-1.5">
                <span className={`font-mono text-2xl font-bold ${DIR_COLOR[m.direction]}`}>
                  <CountUp to={m.value} suffix={m.suffix} />
                </span>
                <span className={`font-mono text-lg font-bold ${DIR_COLOR[m.direction]}`}>{m.direction}</span>
              </div>
              <p className="font-mono text-[11px] font-semibold text-foreground leading-tight">{m.label}</p>
              <p className="font-mono text-[10px] text-muted leading-tight">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-6 text-center font-mono text-[11px] text-muted"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4, ease: E }}
        >
          * Resultados varían según industria, calidad de datos y complejidad del entorno. Se establecen KPIs objetivos antes del piloto.
        </motion.p>
      </div>
    </section>
  );
}
