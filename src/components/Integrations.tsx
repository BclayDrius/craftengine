"use client";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const INTEGRATIONS = [
  { cat: "ERP", items: ["SAP S/4HANA", "Oracle ERP", "Microsoft Dynamics"] },
  { cat: "SCADA / HMI", items: ["Siemens WinCC", "Ignition", "InTouch AVEVA"] },
  { cat: "CMMS", items: ["SAP PM", "IBM Maximo", "eMaint"] },
  { cat: "Protocolos", items: ["OPC-UA", "Modbus RTU/TCP", "MQTT", "REST API"] },
  { cat: "Historian", items: ["OSIsoft PI", "Canary", "InfluxDB"] },
  { cat: "BI / Reportes", items: ["Power BI", "Grafana", "Tableau"] },
];

const ENTERPRISE = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L3 5v4c0 3.5 2.7 6.7 6 7.5C12.3 15.7 15 12.5 15 9V5L9 2z" stroke="#C8A968" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M6.5 9.5l2 2 3-3" stroke="#C8A968" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Seguridad industrial",
    body: "Los datos no salen de tu infraestructura si no lo autorizas. Opciones de despliegue on-premise, VPN o cloud privado.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="#C8A968" strokeWidth="1.3" />
        <path d="M9 5v4l3 3" stroke="#C8A968" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: "Alta disponibilidad",
    body: "Arquitectura redundante. Si el servicio central cae, el Edge AI local sigue generando alertas sin interrupción.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 9h12M9 3l6 6-6 6" stroke="#C8A968" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Integración incremental",
    body: "Empieza con un activo o una línea. El sistema crece sin necesidad de parar la operación o hacer un roll-out big-bang.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="12" height="12" rx="2" stroke="#C8A968" strokeWidth="1.3" />
        <path d="M6 9h6M6 6h4M6 12h3" stroke="#C8A968" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: "Trazabilidad completa",
    body: "Cada predicción queda registrada con timestamp, versión de modelo y variables. Auditable para ISO 55000 y otras normas.",
  },
];

export default function Integrations() {
  return (
    <section className="py-24 lg:py-32 bg-surface-elevated" aria-labelledby="integrations-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 max-w-xl"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: E }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Integración enterprise</p>
          <h2 id="integrations-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Se conecta con tu stack.<br />Sin reemplazar nada.
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed">
            CRAFTENGINE habla los protocolos de la industria. Conecta con lo que ya tienes instalado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Integrations grid */}
          <motion.div
            className="rounded-xl border border-border bg-surface p-6"
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: E }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted mb-5">Sistemas conectados</p>
            <div className="grid grid-cols-2 gap-4">
              {INTEGRATIONS.map((cat) => (
                <div key={cat.cat}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gold mb-2">{cat.cat}</p>
                  <ul className="flex flex-col gap-1">
                    {cat.items.map((item) => (
                      <li key={item} className="font-mono text-xs text-muted flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-border-strong shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-5 font-mono text-[11px] text-muted border-t border-border pt-4">
              ¿Tu sistema no está aquí? Lo evaluamos sin costo en el diagnóstico inicial.
            </p>
          </motion.div>

          {/* Enterprise reliability */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: E }}
          >
            {ENTERPRISE.map((item, i) => (
              <motion.div key={item.title}
                className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-3"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: E }}
              >
                <div className="w-8 h-8 rounded-lg border border-border bg-surface-elevated flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
