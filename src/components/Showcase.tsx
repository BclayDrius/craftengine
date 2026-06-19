"use client";
import { motion } from "framer-motion";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

const EQUIPMENT = [
  { id: "C-01", name: "Compresor C-01", health: 94, status: "ok" },
  { id: "M-03", name: "Motor M-03", health: 61, status: "warn" },
  { id: "P-07", name: "Bomba P-07", health: 88, status: "ok" },
  { id: "T-02", name: "Turbina T-02", health: 76, status: "info" },
];

const ALERTS = [
  {
    severity: "danger",
    title: "Motor M-03 — anomalía",
    sub: "Desequilibrio de rotor · 84.2 %",
    time: "hace 4 min",
  },
  {
    severity: "warn",
    title: "Bomba P-07 — mantenimiento",
    sub: "Próximo en 12 días · MTBF proyectado",
    time: "Programado",
  },
  {
    severity: "info",
    title: "Turbina T-02 — monitoreo",
    sub: "Vibración en límite superior ±2σ",
    time: "Tendencia",
  },
];

const STATUS_COLOR: Record<string, string> = {
  ok: "bg-success",
  warn: "bg-warn",
  danger: "bg-danger",
  info: "bg-teal",
};

const SEVERITY_COLOR: Record<string, { dot: string; border: string; text: string }> = {
  danger: { dot: "bg-danger", border: "border-danger/30", text: "text-danger" },
  warn: { dot: "bg-warn", border: "border-warn/30", text: "text-warn" },
  info: { dot: "bg-teal", border: "border-teal/30", text: "text-teal" },
};

function MiniChart() {
  return (
    <svg viewBox="0 0 460 90" className="w-full" aria-hidden="true">
      {/* Grid */}
      {[20, 45, 70].map((y) => (
        <line key={y} x1={0} y1={y} x2={460} y2={y} stroke="#23262D" strokeWidth={1} />
      ))}
      {/* Normal band */}
      <rect x={0} y={28} width={300} height={34} fill="#C8A968" fillOpacity={0.05} />
      {/* Signal */}
      <polyline
        points="0,50 30,44 60,52 90,42 120,50 150,45 180,52 210,42 240,48 270,44 290,42 308,38 320,30 330,18 338,8 344,22 352,36 365,46 380,50 410,44 440,50 460,47"
        fill="none"
        stroke="#C8A968"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Anomaly marker */}
      <circle cx={338} cy={8} r={4} fill="#4FD1C5" />
      <line x1={338} y1={0} x2={338} y2={90} stroke="#4FD1C5" strokeWidth={0.8} strokeDasharray="3 2" opacity={0.5} />
      {/* Labels */}
      <text x={4} y={18} fill="#9BA1AB" fontSize={8} fontFamily="monospace">ALTA</text>
      <text x={4} y={48} fill="#9BA1AB" fontSize={8} fontFamily="monospace">NOM</text>
      <text x={4} y={76} fill="#9BA1AB" fontSize={8} fontFamily="monospace">BAJA</text>
    </svg>
  );
}

const FEATURES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2l1.5 3.5L13 6.5l-2.5 2.5.6 3.5L8 11l-3.1 1.5.6-3.5L3 6.5l3.5-1L8 2z" stroke="#C8A968" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Diagnóstico físico explicable",
    body: "Cada alerta indica causa probable, porcentaje de confianza y acción recomendada.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="#C8A968" strokeWidth="1.2" />
        <path d="M5 8h6M5 5.5h3M5 10.5h4" stroke="#C8A968" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Alertas priorizadas por impacto",
    body: "Priorización automática por MTBF proyectado, costo de downtime y urgencia operativa.",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" stroke="#C8A968" strokeWidth="1.2" />
        <path d="M8 5v3.5l2 2" stroke="#C8A968" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Tendencia de degradación",
    body: "Proyección de vida útil restante con bandas de confianza estadística.",
  },
];

export default function Showcase() {
  return (
    <section id="producto" className="py-24 lg:py-36 bg-surface" aria-labelledby="showcase-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-14 max-w-2xl" {...FADE_UP}>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Producto</p>
          <h2 id="showcase-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Diagnóstico en tiempo real,<br />sin reemplazar tu infraestructura
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Conectamos sobre tus PLCs, SCADAs y redes OPC-UA existentes. El panel consolida salud de activos, alertas priorizadas y diagnóstico físico en una sola interfaz.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          className="rounded-xl border border-border bg-surface-elevated overflow-hidden shadow-2xl"
          {...FADE_UP}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
            <span className="w-2.5 h-2.5 rounded-full bg-danger/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-warn/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
            <span className="ml-3 font-mono text-xs text-muted flex-1 text-center">
              CRAFTENGINE — Panel de Activos Industriales
            </span>
            <span className="font-mono text-[10px] text-gold border border-gold/30 rounded px-2 py-0.5">● ACTIVO</span>
          </div>

          {/* Three-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] min-h-[340px]">
            {/* Sidebar — equipment list */}
            <div className="border-b lg:border-b-0 lg:border-r border-border p-4 flex flex-col gap-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mb-2">Equipos</p>
              {EQUIPMENT.map((eq) => (
                <div
                  key={eq.id}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${eq.id === "M-03" ? "bg-surface-subtle border border-border" : "hover:bg-surface-subtle"}`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_COLOR[eq.status]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-foreground truncate">{eq.name}</p>
                    <p className={`font-mono text-[10px] ${eq.health >= 80 ? "text-success" : eq.health >= 70 ? "text-warn" : "text-danger"}`}>
                      Salud {eq.health}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Main area — chart */}
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">Vibración — Motor M-03</p>
                  <p className="font-mono text-[10px] text-muted mt-0.5">Canal: Rodamiento delantero · Eje X · mm/s²</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-danger border border-danger/30 rounded px-2 py-0.5">ALERTA ALTA</span>
                </div>
              </div>

              <MiniChart />

              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold mb-1.5">Diagnóstico físico</p>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1 shrink-0" />
                  <p className="font-mono text-xs text-muted">
                    Causa probable: <span className="text-foreground">Desequilibrio de rotor</span> — probabilidad 84.2 % · MTBF reducido 34 %
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1 shrink-0" />
                  <p className="font-mono text-xs text-muted">
                    Acción: <span className="text-foreground">Balanceo dinámico</span> recomendado antes de 48 h
                  </p>
                </div>
              </div>
            </div>

            {/* Right panel — alerts */}
            <div className="border-t lg:border-t-0 lg:border-l border-border p-4 flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mb-1">Alertas activas</p>
              {ALERTS.map((a) => {
                const c = SEVERITY_COLOR[a.severity];
                return (
                  <div key={a.title} className={`rounded-lg border ${c.border} bg-surface p-3`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
                      <p className={`font-mono text-[10px] font-semibold ${c.text} leading-tight`}>{a.title}</p>
                    </div>
                    <p className="font-mono text-[10px] text-muted">{a.sub}</p>
                    <p className="font-mono text-[9px] text-border-strong mt-1">{a.time}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Feature bullets */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="flex items-start gap-3"
              {...FADE_UP}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md border border-border bg-surface-elevated">
                {f.icon}
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
