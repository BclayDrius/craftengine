"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const CATEGORIES = [
  {
    label: "IA / Machine Learning",
    tags: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "SHAP (XAI)"],
  },
  {
    label: "Datos & Ingeniería",
    tags: ["Pandas", "SQL", "Apache Spark", "dbt", "InfluxDB", "TimescaleDB"],
  },
  {
    label: "IoT & Edge",
    tags: ["MQTT", "OPC-UA", "ESP32", "Raspberry Pi", "TinyML", "MODBUS"],
  },
  {
    label: "Backend & API",
    tags: ["FastAPI", "Node.js", "REST API", "WebSockets", "Docker", "Kubernetes"],
  },
  {
    label: "Visualización & BI",
    tags: ["Power BI", "Grafana", "Streamlit", "Plotly", "Metabase"],
  },
  {
    label: "Infraestructura",
    tags: ["AWS", "Azure", "On-premise", "VPN Industrial", "CI/CD"],
  },
];

export default function TechStack() {
  return (
    <section className="py-20 lg:py-28 bg-surface-elevated" aria-labelledby="tech-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 max-w-xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: E }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Stack tecnológico</p>
          <h2 id="tech-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Capacidades reales,<br />no nombres de moda
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            Tecnología seleccionada por idoneidad industrial, no por tendencia. Cada herramienta tiene un rol específico en el pipeline.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              className="rounded-xl border border-border bg-surface p-5"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: E }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold mb-4">{cat.label}</p>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-surface-elevated px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
