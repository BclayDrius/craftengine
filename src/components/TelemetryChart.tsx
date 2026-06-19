"use client";
import { motion, useReducedMotion } from "framer-motion";

// Pre-computed signal points — deterministic to avoid hydration mismatches
const SIGNAL: [number, number][] = [
  [0, 130], [24, 115], [48, 145], [72, 120], [96, 150], [120, 118],
  [144, 145], [168, 122], [192, 148], [216, 115], [240, 142], [264, 118],
  [288, 150], [312, 120], [336, 145], [360, 115], [384, 148], [408, 120],
  [432, 142], [456, 118], [480, 130], [496, 115], [508, 100], [520, 82],
  [532, 58], [542, 35], [548, 24], [555, 40], [562, 62], [572, 88],
  [584, 112], [596, 126], [608, 140], [624, 118], [640, 135], [656, 148],
  [672, 120], [688, 140], [704, 116], [720, 138], [740, 128], [760, 135],
];

const SECONDARY: [number, number][] = [
  [0, 170], [24, 162], [48, 175], [72, 165], [96, 178], [120, 161],
  [144, 174], [168, 163], [192, 176], [216, 160], [240, 172], [264, 162],
  [288, 177], [312, 164], [336, 173], [360, 162], [384, 176], [408, 162],
  [432, 171], [456, 162], [480, 168], [496, 163], [508, 157], [520, 152],
  [532, 146], [542, 155], [548, 160], [555, 164], [562, 168], [572, 170],
  [584, 168], [596, 164], [608, 170], [624, 162], [640, 170], [656, 175],
  [672, 163], [688, 170], [704, 162], [720, 170], [740, 165], [760, 168],
];

const NORMAL_SECTION = SIGNAL.slice(0, 21); // x=0 to x=480

function toPath(pts: [number, number][]): string {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

function toBandPath(pts: [number, number][], offset: number): string {
  const upper = pts.map(([x, y]): [number, number] => [x, y - offset]);
  const lower = [...pts].reverse().map(([x, y]): [number, number] => [x, y + offset]);
  return [...upper, ...lower].map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ") + " Z";
}

const ANOMALY_X = 548;
const ANOMALY_Y = 24;

export default function TelemetryChart() {
  const reduceMotion = useReducedMotion();

  const lineAnim = reduceMotion
    ? {}
    : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 2.6, ease: [0.16, 1, 0.3, 1] as const } };

  const anomalyAnim = reduceMotion
    ? {}
    : { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 2.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <div className="relative w-full rounded-xl border border-border bg-surface-elevated overflow-hidden shadow-2xl">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="font-mono text-xs text-muted tracking-wider uppercase">Monitor · Vibración C-01</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold">LIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        </div>
      </div>

      {/* Channel labels */}
      <div className="flex items-center gap-5 px-4 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-gold inline-block rounded" />
          <span className="font-mono text-[10px] text-muted">Vib. Principal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-border-strong inline-block rounded" />
          <span className="font-mono text-[10px] text-muted">Vib. Secundaria</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 bg-gold/10 border border-gold/20 inline-block rounded" />
          <span className="font-mono text-[10px] text-muted">Banda normal ±2σ</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="px-2 pb-2 pt-1">
        <svg
          viewBox="0 0 760 220"
          className="w-full"
          aria-label="Gráfico de telemetría de vibración con detección de anomalía"
          role="img"
        >
          <defs>
            <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8A968" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#C8A968" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="anomalyGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4FD1C5" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#4FD1C5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[50, 90, 130, 170].map((y) => (
            <line
              key={y}
              x1={0} y1={y} x2={760} y2={y}
              stroke="#23262D"
              strokeWidth={1}
            />
          ))}

          {/* Y-axis labels */}
          {[
            { y: 50, label: "HIGH" },
            { y: 130, label: "NOM" },
            { y: 175, label: "LOW" },
          ].map(({ y, label }) => (
            <text key={y} x={6} y={y - 4} fill="#9BA1AB" fontSize={8} fontFamily="monospace">
              {label}
            </text>
          ))}

          {/* Normal operating band */}
          <path
            d={toBandPath(NORMAL_SECTION, 24)}
            fill="url(#bandGrad)"
            stroke="none"
          />

          {/* Anomaly zone highlight */}
          <rect
            x={490} y={0} width={130} height={220}
            fill="url(#anomalyGlow)"
          />

          {/* Secondary signal */}
          <path
            d={toPath(SECONDARY)}
            fill="none"
            stroke="#333740"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />

          {/* Main signal — animated */}
          <motion.path
            d={toPath(SIGNAL)}
            fill="none"
            stroke="#C8A968"
            strokeWidth={2}
            strokeLinejoin="round"
            {...lineAnim}
          />

          {/* Anomaly vertical rule */}
          <motion.line
            x1={ANOMALY_X} y1={0} x2={ANOMALY_X} y2={220}
            stroke="#4FD1C5"
            strokeWidth={1}
            strokeDasharray="4 3"
            {...anomalyAnim}
          />

          {/* Anomaly peak marker — outer pulse ring */}
          <motion.circle
            cx={ANOMALY_X} cy={ANOMALY_Y} r={14}
            fill="none"
            stroke="#4FD1C5"
            strokeWidth={1}
            opacity={0.35}
            {...anomalyAnim}
          />

          {/* Anomaly peak marker — inner dot */}
          <motion.circle
            cx={ANOMALY_X} cy={ANOMALY_Y} r={4}
            fill="#4FD1C5"
            {...anomalyAnim}
          />

          {/* Anomaly label */}
          <motion.g {...anomalyAnim}>
            <rect x={562} y={8} width={88} height={18} rx={3} fill="#131519" stroke="#4FD1C5" strokeWidth={0.8} />
            <text x={567} y={20} fill="#4FD1C5" fontSize={9} fontFamily="monospace">ANOMALÍA · 84.2%</text>
          </motion.g>

          {/* X-axis time labels */}
          {[
            { x: 0, label: "T-12m" },
            { x: 190, label: "T-8m" },
            { x: 380, label: "T-4m" },
            { x: 548, label: "T-0" },
            { x: 700, label: "+2m" },
          ].map(({ x, label }) => (
            <text key={x} x={x + 2} y={215} fill="#9BA1AB" fontSize={8} fontFamily="monospace">
              {label}
            </text>
          ))}
        </svg>
      </div>

      {/* Alert footer */}
      <motion.div
        className="mx-3 mb-3 flex items-center gap-3 rounded-lg border border-teal/30 bg-teal/5 px-4 py-2.5"
        {...anomalyAnim}
      >
        <span className="w-2 h-2 rounded-full bg-teal animate-pulse shrink-0" />
        <span className="font-mono text-xs text-teal">Anomalía detectada</span>
        <span className="ml-auto font-mono text-xs text-muted">Causa probable: desequilibrio de rotor</span>
      </motion.div>
    </div>
  );
}
