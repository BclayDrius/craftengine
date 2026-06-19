"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const E = [0.16, 1, 0.3, 1] as const;

const INDUSTRIES = [
  {
    id: "mineria",
    label: "Minería",
    icon: "⛏",
    headline: "Cada parada en minería cuesta cien mil dólares o más",
    sub: "Motores de correas, chancadoras, bombas de pulpa y compresores de alta presión — los activos más críticos y los menos tolerantes al downtime.",
    pains: [
      "Fallas imprevistas en correas transportadoras generan paradas de 8–24 horas",
      "Motores y reductores sin monitoreo continuo pierden MTBF sin razón aparente",
      "Bombas de pulpa con desgaste no detectado hasta la ruptura catastrófica",
      "Compresores de alta presión sin historial de vibración = mantenimiento a ciegas",
    ],
    cases: [
      {
        title: "Motor de correa transportadora",
        result: "Detección de desequilibrio 11 días antes de la falla proyectada. Costo evitado: $180K.",
      },
      {
        title: "Bomba de pulpa — cobre",
        result: "Predicción de desgaste de impeler. MTBF extendido 28 %. Sin paradas no planificadas en 6 meses.",
      },
    ],
    kpis: ["MTBF ↑ 40%", "Paradas ↓ 42%", "Costos mantenimiento ↓ 27%"],
  },
  {
    id: "manufactura",
    label: "Manufactura",
    icon: "🏭",
    headline: "Una línea parada es producción que no recuperas",
    sub: "Prensas, robots, hornos, líneas de ensamble — cada minuto cuenta. La detección temprana de anomalías es la diferencia entre un ajuste menor y una parada de turno.",
    pains: [
      "Robots y prensas sin análisis de vibración pierden calidad antes de fallar visiblemente",
      "Hornos y estaciones térmicas con lecturas manuales e intermitentes",
      "OEE bajo sin causa raíz identificada — el equipo adivina qué variable mejorar",
      "Mantenimiento preventivo basado en calendario que sub-optimiza o sobre-mantiene",
    ],
    cases: [
      {
        title: "Prensa hidráulica de estampado",
        result: "Anomalía de presión detectada en fase temprana. OEE mejoró 16 puntos porcentuales.",
      },
      {
        title: "Robot de ensamble — línea automotriz",
        result: "Desalineación de eje detectada 5 días antes de falla. Costo de parada evitado: $95K.",
      },
    ],
    kpis: ["OEE ↑ 16%", "Paradas de turno ↓ 55%", "Rechazos por calidad ↓ 23%"],
  },
  {
    id: "energia",
    label: "Energía",
    icon: "⚡",
    headline: "En energía, la confiabilidad no es opcional",
    sub: "Turbinas, generadores, transformadores y subestaciones operan bajo condiciones extremas. La falla en un activo crítico no solo es cara — puede ser peligrosa.",
    pains: [
      "Turbinas con vibraciones no monitorizadas en tiempo real — solo inspecciones periódicas",
      "Transformadores sin análisis de temperatura de aceite continuo",
      "Generadores diésel sin predicción de vida útil de cojinetes",
      "Datos de SCADA sin modelo predictivo — mucho dato, cero predicción",
    ],
    cases: [
      {
        title: "Turbina de gas — planta de ciclo combinado",
        result: "Detección de degradación de cojinete 3 semanas antes. Parada programada en ventana de mantenimiento.",
      },
      {
        title: "Generador de respaldo — data center",
        result: "Monitoreo continuo con alerta automática. Disponibilidad del 99.98 % en 12 meses.",
      },
    ],
    kpis: ["Disponibilidad ↑ 2.1%", "MTTR ↓ 51%", "Incidentes críticos ↓ 67%"],
  },
  {
    id: "logistica",
    label: "Logística",
    icon: "🚚",
    headline: "La flota parada es dinero que no circula",
    sub: "Camiones, montacargas, grúas, bandas de clasificación — el mantenimiento reactivo en logística rompe cadenas de suministro y SLAs.",
    pains: [
      "Flota de vehículos pesados con mantenimiento por kilometraje — no por condición real",
      "Grúas pórtico sin monitoreo de motor y estructura",
      "Bandas transportadoras en centros de distribución sin análisis de tensión",
      "Elevadores de carga sin historial de carga vs. desgaste",
    ],
    cases: [
      {
        title: "Flota de camiones de carga pesada",
        result: "Modelo de predicción de falla de motor por km y condición. Paradas no planificadas ↓ 60 %.",
      },
      {
        title: "Grúa pórtico — puerto",
        result: "Monitoreo de vibración en motor de izado. Falla de rodamiento detectada antes de daño catastrófico.",
      },
    ],
    kpis: ["Disponibilidad flota ↑ 18%", "Paradas no planificadas ↓ 60%", "Costo por km ↓ 14%"],
  },
  {
    id: "alimentos",
    label: "Alimentos",
    icon: "🍎",
    headline: "Calidad e inocuidad no admiten sorpresas",
    sub: "Líneas de procesamiento, envasadoras, pasteurizadores y sistemas de frío — la variabilidad en proceso se convierte en rechazo de producto, pérdida de certificación y retiro de lote.",
    pains: [
      "Pasteurizadores con variaciones de temperatura sin alerta automática",
      "Envasadoras con desajuste de sellado detectado cuando ya hay defectos de producto",
      "Cámaras de frío con compresores sin monitoreo de COP (eficiencia real)",
      "Líneas de molienda y mezclado sin análisis de torque y desgaste",
    ],
    cases: [
      {
        title: "Pasteurizador de leche — planta láctea",
        result: "Detección de variación de temperatura fuera de norma 20 min antes de afectar el lote. Pérdida evitada: $40K.",
      },
      {
        title: "Envasadora de alta velocidad",
        result: "Predicción de falla de sellador por vibración. Downtime reducido en 78 %.",
      },
    ],
    kpis: ["Rechazos de lote ↓ 44%", "Paradas de línea ↓ 39%", "Eficiencia energética ↑ 12%"],
  },
];

export default function IndustriasPage() {
  const [active, setActive] = useState("mineria");
  const ind = INDUSTRIES.find((i) => i.id === active)!;

  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen pt-16">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-surface bg-grid">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: E }}>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Por industria</p>
              <h1 className="font-display font-bold text-foreground leading-tight tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}>
                Inteligencia predictiva<br /><span className="text-gold">para tu industria</span>
              </h1>
              <p className="mt-5 text-base lg:text-lg text-muted leading-relaxed max-w-xl">
                Los activos, los protocolos y los KPIs varían según el sector. CRAFTENGINE adapta los modelos a las condiciones reales de tu operación.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vertical selector + content */}
        <section className="py-16 lg:py-24" aria-label="Selección de industria">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Industrias">
              {INDUSTRIES.map((i) => (
                <button key={i.id} role="tab" aria-selected={active === i.id}
                  onClick={() => setActive(i.id)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 font-mono text-sm transition-all duration-150
                    ${active === i.id
                      ? "border-gold/50 bg-surface-elevated text-foreground"
                      : "border-border bg-surface text-muted hover:border-border-strong"
                    }`}>
                  <span aria-hidden="true">{i.icon}</span>
                  {i.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: E }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                role="tabpanel"
              >
                {/* Pain points */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">{ind.headline}</h2>
                    <p className="mt-3 text-base text-muted leading-relaxed">{ind.sub}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted mb-3">Problemas comunes en {ind.label}</p>
                    <ul className="space-y-2">
                      {ind.pains.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                            <circle cx="7" cy="7" r="6" stroke="#E5564B" strokeWidth="1.2" opacity="0.5" />
                            <path d="M5 7l1.5 1.5 2.5-3" stroke="#E5564B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-sm text-muted">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Cases */}
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold mb-3">Casos representativos</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ind.cases.map((c) => (
                        <div key={c.title} className="rounded-xl border border-border bg-surface-elevated p-5">
                          <p className="font-display font-semibold text-sm text-foreground mb-2">{c.title}</p>
                          <p className="text-sm text-muted leading-relaxed">{c.result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* KPIs + CTA */}
                <div className="flex flex-col gap-6">
                  <div className="rounded-xl border border-gold/20 bg-surface-elevated p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold mb-4">KPIs típicos en {ind.label}</p>
                    <div className="space-y-2">
                      {ind.kpis.map((k) => (
                        <div key={k} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          <span className="font-mono text-sm text-foreground">{k}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href="/#contacto"
                    className="w-full rounded-lg bg-gold px-5 py-3 text-sm font-display font-semibold text-surface text-center hover:opacity-90 transition-opacity">
                    Diagnóstico para {ind.label} →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
