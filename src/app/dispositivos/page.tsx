"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const E = [0.16, 1, 0.3, 1] as const;

const DEVICES = [
  {
    id: "node",
    name: "CraftNode S1",
    tag: "Nodo de sensores edge",
    desc: "Dispositivo de adquisición multicanal diseñado para entornos industriales. Captura, filtra y pre-procesa señales en el borde antes de transmitir.",
    variables: ["Vibración triaxial (±16g)", "Temperatura (-40°C a +85°C)", "Corriente (0–50A)", "Presión (0–100 bar)"],
    connectivity: ["MQTT / TLS", "WiFi 2.4/5 GHz", "Ethernet industrial", "4G LTE (opcional)"],
    edge: "Preprocesamiento FFT en dispositivo · Latencia <10ms · Funciona offline con buffer local",
    ip: "IP65",
    icon: (
      <svg viewBox="0 0 120 80" className="w-full h-28" fill="none" aria-hidden="true">
        <rect x="20" y="15" width="80" height="50" rx="6" fill="#131519" stroke="#23262D" strokeWidth="1.5" />
        <rect x="28" y="22" width="28" height="18" rx="3" fill="#0A0B0D" stroke="#23262D" strokeWidth="1" />
        <rect x="64" y="22" width="28" height="18" rx="3" fill="#0A0B0D" stroke="#23262D" strokeWidth="1" />
        <rect x="28" y="46" width="64" height="12" rx="2" fill="#0A0B0D" stroke="#23262D" strokeWidth="1" />
        <circle cx="42" cy="31" r="4" fill="#C8A968" opacity="0.8" />
        <circle cx="78" cy="31" r="4" fill="#4FD1C5" opacity="0.8" />
        <path d="M32 52h20M56 52h10M70 52h18" stroke="#333740" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="15" r="3" fill="#23262D" />
        <circle cx="100" cy="15" r="3" fill="#23262D" />
        <circle cx="20" cy="65" r="3" fill="#23262D" />
        <circle cx="100" cy="65" r="3" fill="#23262D" />
        <text x="34" y="34" fill="#9BA1AB" fontSize="7" fontFamily="monospace">VIB</text>
        <text x="70" y="34" fill="#9BA1AB" fontSize="7" fontFamily="monospace">TEMP</text>
        <text x="34" y="62" fill="#9BA1AB" fontSize="6" fontFamily="monospace">CRAFTENGINE S1</text>
      </svg>
    ),
  },
  {
    id: "gateway",
    name: "CraftGateway G1",
    tag: "Gateway industrial IoT",
    desc: "Concentrador de datos multi-protocolo. Agrega señales de múltiples nodos y equipos, ejecuta modelos de Edge AI y transmite al data lake.",
    variables: ["Entradas digitales x8", "Entradas analógicas 4–20mA x4", "RS-485 / Modbus", "OPC-UA client"],
    connectivity: ["Ethernet Gigabit", "WiFi industrial 5 GHz", "4G LTE dual-SIM", "VPN industrial"],
    edge: "Inferencia de modelos TinyML · Almacenamiento local 64GB · Sync diferencial en baja conectividad",
    ip: "IP67",
    icon: (
      <svg viewBox="0 0 120 80" className="w-full h-28" fill="none" aria-hidden="true">
        <rect x="15" y="10" width="90" height="60" rx="5" fill="#131519" stroke="#23262D" strokeWidth="1.5" />
        <rect x="23" y="18" width="74" height="8" rx="2" fill="#0A0B0D" stroke="#23262D" strokeWidth="1" />
        <rect x="23" y="30" width="74" height="28" rx="2" fill="#0A0B0D" stroke="#23262D" strokeWidth="1" />
        <text x="27" y="25" fill="#C8A968" fontSize="6" fontFamily="monospace">CRAFTENGINE G1  GATEWAY</text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={27 + i * 12} y={34} width="8" height="18" rx="1" fill="#131519" stroke="#333740" strokeWidth="1" />
        ))}
        <rect x="75" y="34" width="18" height="18" rx="1" fill="#131519" stroke="#333740" strokeWidth="1" />
        <circle cx="84" cy="43" r="5" fill="#4FD1C5" opacity="0.6" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={31 + i * 12} cy={43} r={2} fill={i === 0 ? "#C8A968" : "#333740"} />
        ))}
        <path d="M25 62h10M40 62h8M53 62h5M63 62h8M76 62h20" stroke="#333740" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const SPECS_COMMON = [
  { label: "Certificación", value: "CE · FCC · IP65–IP67" },
  { label: "Alimentación", value: "PoE / 9–48V DC / batería backup" },
  { label: "Temperatura operación", value: "-20°C a +70°C" },
  { label: "MTBF dispositivo", value: "> 50,000 horas" },
];

export default function DispositivosPage() {
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
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Hardware industrial</p>
              <h1 className="font-display font-bold text-foreground leading-tight tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}>
                Dispositivos IoT edge<br /><span className="text-gold">diseñados para planta</span>
              </h1>
              <p className="mt-5 text-base lg:text-lg text-muted leading-relaxed">
                Hardware robusto para entornos industriales reales — no kits de prototipado. Vibración, temperatura, corriente y presión en un nodo compacto que se integra en minutos.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="#contacto-dispositivos"
                  className="rounded-lg bg-gold px-6 py-3 text-sm font-display font-semibold text-surface hover:opacity-90 transition-opacity">
                  Cotizar dispositivos
                </Link>
                <Link href="/#contacto"
                  className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors">
                  Ver plataforma completa →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Device cards */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {DEVICES.map((d, i) => (
                <motion.div key={d.id}
                  className="rounded-xl border border-border bg-surface-elevated overflow-hidden"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: E }}>
                  {/* Device render */}
                  <div className="bg-surface border-b border-border p-8 flex items-center justify-center">
                    {d.icon}
                  </div>
                  {/* Specs */}
                  <div className="p-6 flex flex-col gap-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-gold">{d.tag}</span>
                      <h2 className="mt-1 font-display text-xl font-bold text-foreground">{d.name}</h2>
                      <p className="mt-2 text-sm text-muted leading-relaxed">{d.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Variables</p>
                        <ul className="space-y-1">
                          {d.variables.map((v) => (
                            <li key={v} className="font-mono text-xs text-muted flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                              {v}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Conectividad</p>
                        <ul className="space-y-1">
                          {d.connectivity.map((c) => (
                            <li key={c} className="font-mono text-xs text-muted flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-teal shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border bg-surface p-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-gold mb-1">Edge AI</p>
                      <p className="font-mono text-xs text-muted">{d.edge}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs border border-border rounded px-2 py-1 text-muted">{d.ip}</span>
                      <Link href="#contacto-dispositivos"
                        className="rounded-lg border border-gold/40 px-4 py-2 font-mono text-xs text-gold hover:bg-gold/5 transition-colors">
                        Cotizar →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Common specs */}
            <motion.div className="mt-8 rounded-xl border border-border bg-surface p-6"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, ease: E }}>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted mb-4">Especificaciones comunes</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {SPECS_COMMON.map((s) => (
                  <div key={s.label}>
                    <p className="font-mono text-[10px] text-muted mb-0.5">{s.label}</p>
                    <p className="font-mono text-xs text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section id="contacto-dispositivos" className="py-16 lg:py-20 bg-surface-elevated">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, ease: E }}>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                ¿Quieres los dispositivos, la plataforma, o ambos?
              </h2>
              <p className="text-base text-muted mb-8">
                Puedes adquirir los dispositivos independientemente o como parte de un proyecto CRAFTENGINE completo. Contáctanos y diseñamos la solución correcta para tu planta.
              </p>
              <Link href="/#contacto"
                className="inline-flex rounded-lg bg-gold px-8 py-3.5 text-sm font-display font-semibold text-surface hover:opacity-90 transition-opacity">
                Hablar con un especialista
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
