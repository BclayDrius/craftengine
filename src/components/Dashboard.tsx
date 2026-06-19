"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const EQUIPMENT = [
  { id: "C-01", name: "Compresor C-01", health: 94, status: "ok" },
  { id: "M-03", name: "Motor M-03", health: 61, status: "warn" },
  { id: "P-07", name: "Bomba P-07", health: 88, status: "ok" },
  { id: "T-02", name: "Turbina T-02", health: 76, status: "info" },
];

const STATUS_DOT: Record<string, string> = {
  ok: "bg-success", warn: "bg-danger", info: "bg-warn",
};

const ALERTS = [
  { sev: "danger", title: "Motor M-03 — ALTA", sub: "Desequilibrio rotor · 84.2%", time: "hace 4 min" },
  { sev: "warn", title: "Bomba P-07 — MEDIA", sub: "Mantenimiento en 12 días · MTBF", time: "Programado" },
  { sev: "info", title: "Turbina T-02 — BAJA", sub: "Vibración límite superior ±2σ", time: "Tendencia" },
];

const SEV_STYLE: Record<string, { dot: string; border: string; text: string }> = {
  danger: { dot: "bg-danger", border: "border-danger/30", text: "text-danger" },
  warn: { dot: "bg-warn", border: "border-warn/30", text: "text-warn" },
  info: { dot: "bg-teal", border: "border-teal/30", text: "text-teal" },
};

const XAI_VARS = [
  { label: "Temp. rodamiento", pct: 78 },
  { label: "Amp. vibración X", pct: 54 },
  { label: "Corriente fase A", pct: 31 },
  { label: "Frecuencia base", pct: 18 },
];

function MiniChart() {
  return (
    <svg viewBox="0 0 460 90" className="w-full" aria-hidden="true">
      {[22, 46, 70].map((y) => (
        <line key={y} x1={0} y1={y} x2={460} y2={y} stroke="#23262D" strokeWidth={1} />
      ))}
      <rect x={0} y={28} width={300} height={34} fill="#C8A968" fillOpacity={0.05} />
      <polyline
        points="0,50 30,44 60,52 90,42 120,50 150,45 180,52 210,42 240,48 270,44 290,42 308,38 320,30 330,18 338,8 344,22 352,36 365,46 380,50 410,44 440,50 460,47"
        fill="none" stroke="#C8A968" strokeWidth="1.8" strokeLinejoin="round"
      />
      <circle cx={338} cy={8} r={4} fill="#4FD1C5" />
      <line x1={338} y1={0} x2={338} y2={90} stroke="#4FD1C5" strokeWidth={0.8} strokeDasharray="3 2" opacity={0.5} />
      {[
        { x: 4, label: "ALTA" }, { x: 4, y: 46, label: "NOM" }, { x: 4, y: 76, label: "BAJA" },
      ].map(({ x, y = 18, label }) => (
        <text key={label} x={x} y={y} fill="#9BA1AB" fontSize={8} fontFamily="monospace">{label}</text>
      ))}
    </svg>
  );
}

const FEATURES = [
  { title: "Predicción con horizonte temporal", body: "Ve la condición proyectada del activo a 24h, 72h y 7 días." },
  { title: "Alertas priorizadas por impacto", body: "Ordena por costo de downtime, urgencia y probabilidad de falla — no por orden de llegada." },
  { title: "Panel de explicabilidad (XAI)", body: "Cada alerta muestra qué variables físicas la dispararon y con qué peso." },
];

export default function Dashboard() {
  return (
    <section id="producto" className="py-24 lg:py-32 bg-surface" aria-labelledby="dashboard-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: E }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Panel operativo</p>
          <h2 id="dashboard-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Todo tu entorno industrial<br />en una sola interfaz
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Diagnóstico en tiempo real, diagnóstico explicable y decisiones accionables — sin cambiar cómo trabaja tu equipo de mantenimiento.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          className="rounded-xl border border-border bg-surface-elevated overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: E }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
            <span className="w-2.5 h-2.5 rounded-full bg-danger/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-warn/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
            <span className="ml-3 font-mono text-xs text-muted flex-1 text-center">CRAFTENGINE — Panel de Activos Industriales</span>
            <span className="font-mono text-[10px] text-gold border border-gold/30 rounded px-2 py-0.5">● ACTIVO</span>
          </div>

          {/* 4-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_180px_160px] min-h-[360px]">
            {/* Sidebar equipos */}
            <div className="border-b lg:border-b-0 lg:border-r border-border p-4 flex flex-col gap-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mb-2">Equipos</p>
              {EQUIPMENT.map((eq) => (
                <div key={eq.id}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 cursor-pointer transition-colors
                    ${eq.id === "M-03" ? "bg-surface-subtle border border-border" : "hover:bg-surface-subtle"}`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[eq.status]}`} />
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-foreground truncate">{eq.name}</p>
                    <p className={`font-mono text-[10px] ${eq.health >= 80 ? "text-success" : eq.health >= 70 ? "text-warn" : "text-danger"}`}>
                      {eq.health}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Main chart */}
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">Vibración — Motor M-03</p>
                  <p className="font-mono text-[10px] text-muted mt-0.5">Rodamiento delantero · Eje X · mm/s²</p>
                </div>
                <span className="font-mono text-[10px] text-danger border border-danger/30 rounded px-2 py-0.5">ALERTA ALTA</span>
              </div>
              <MiniChart />
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold mb-1.5">Diagnóstico físico</p>
                <p className="font-mono text-xs text-muted">
                  Causa probable: <span className="text-foreground">Desequilibrio de rotor</span> · 84.2% · MTBF reducido 34%
                </p>
                <p className="font-mono text-xs text-muted mt-1">
                  Acción: <span className="text-foreground">Balanceo dinámico</span> recomendado antes de 48h
                </p>
              </div>
            </div>

            {/* Alerts */}
            <div className="border-t lg:border-t-0 lg:border-l border-border p-4 flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mb-1">Alertas</p>
              {ALERTS.map((a) => {
                const c = SEV_STYLE[a.sev];
                return (
                  <div key={a.title} className={`rounded-lg border ${c.border} bg-surface p-2.5`}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
                      <p className={`font-mono text-[10px] font-semibold ${c.text} leading-tight`}>{a.title}</p>
                    </div>
                    <p className="font-mono text-[10px] text-muted">{a.sub}</p>
                    <p className="font-mono text-[9px] text-border-strong mt-0.5">{a.time}</p>
                  </div>
                );
              })}
            </div>

            {/* XAI panel */}
            <div className="border-t lg:border-t-0 lg:border-l border-border p-4 flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gold mb-1">Explicabilidad</p>
              <p className="font-mono text-[10px] text-muted mb-2">Variables que dispararon la alerta:</p>
              {XAI_VARS.map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-[10px] text-muted">{label}</span>
                    <span className="font-mono text-[10px] text-gold">{pct}%</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature bullets */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} className="flex items-start gap-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease: E }}
            >
              <div className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md border border-border bg-surface-elevated">
                <span className="font-mono text-xs font-bold text-gold">{i + 1}</span>
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-foreground">{f.title}</p>
                <p className="mt-1 text-sm text-muted leading-relaxed">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
