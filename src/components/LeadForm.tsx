"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = Record<string, string>;
type Errors = Record<string, string>;

const INDUSTRIES = [
  "Minería", "Manufactura", "Energía", "Logística y transporte",
  "Alimentos y bebidas", "Petróleo y gas", "Otro",
];

function validate(data: FormState): Errors {
  const errs: Errors = {};
  if (!data.nombre?.trim()) errs.nombre = "Requerido";
  if (!data.empresa?.trim()) errs.empresa = "Requerido";
  if (!data.cargo?.trim()) errs.cargo = "Requerido";
  if (!data.email?.trim()) {
    errs.email = "Requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errs.email = "Correo inválido";
  }
  if (!data.industria) errs.industria = "Selecciona una industria";
  if (!data.reto?.trim()) errs.reto = "Cuéntanos tu reto operativo";
  return errs;
}

const INPUT_CLASS = (err: boolean) =>
  `w-full rounded-lg border bg-surface-elevated px-3.5 py-2.5 text-sm text-foreground placeholder-muted/40 outline-none transition-colors duration-150 ${
    err ? "border-danger" : "border-border focus:border-gold"
  }`;

export default function LeadForm() {
  const [form, setForm] = useState<FormState>({});
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // TODO: POST to /api/leads — integrate with CRM (HubSpot / Notion / custom)
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 lg:py-36 bg-surface-elevated" aria-labelledby="form-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-start">

          {/* Left — value prop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gold">Diagnóstico gratuito</p>
            <h2 id="form-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Empieza con un<br />diagnóstico sin costo
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted max-w-md">
              En 48 horas analizamos tu entorno operativo, identificamos los activos de mayor riesgo y diseñamos un piloto de bajo riesgo sobre tu infraestructura existente.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Sin reemplazar tu SCADA, PLC ni ERP actual",
                "Piloto en producción en menos de 30 días",
                "Modelos entrenados con tus propios datos",
                "Diagnóstico explicable — no caja negra",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="#C8A968" strokeWidth="1.2" />
                    <path d="M5 8.5l2 2 4-4" stroke="#C8A968" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-muted">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-4">¿También puedes interesarte</p>
              <div className="flex flex-wrap gap-2">
                {["Dispositivos IoT edge", "Asesoría a medida", "Ambos"].map((t) => (
                  <span key={t} className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                    className="flex flex-col items-center text-center py-10 gap-4"
                    role="alert" aria-live="polite"
                  >
                    <div className="w-12 h-12 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                        <path d="M5 11.5l4 4 8-8" stroke="#4CAF82" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">¡Diagnóstico solicitado!</h3>
                    <p className="text-sm text-muted max-w-xs">
                      Un especialista de CRAFTENGINE se pondrá en contacto en menos de 48 horas.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={onSubmit} noValidate className="flex flex-col gap-4"
                    aria-label="Formulario de diagnóstico"
                  >
                    {/* Row 1: nombre + empresa */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: "nombre", label: "Nombre", placeholder: "Juan García", autoComplete: "name" },
                        { name: "empresa", label: "Empresa", placeholder: "Industrias del Norte", autoComplete: "organization" },
                      ].map((f) => (
                        <div key={f.name} className="flex flex-col gap-1.5">
                          <label htmlFor={f.name} className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{f.label}</label>
                          <input id={f.name} name={f.name} type="text" placeholder={f.placeholder}
                            autoComplete={f.autoComplete} required value={form[f.name] ?? ""} onChange={onChange}
                            aria-invalid={!!errors[f.name]} className={INPUT_CLASS(!!errors[f.name])} />
                          {errors[f.name] && <p className="font-mono text-[10px] text-danger" role="alert">{errors[f.name]}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Row 2: cargo + email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: "cargo", label: "Cargo", placeholder: "Dir. de Operaciones", autoComplete: "organization-title" },
                        { name: "email", label: "Correo corporativo", placeholder: "juan@empresa.com", autoComplete: "email" },
                      ].map((f) => (
                        <div key={f.name} className="flex flex-col gap-1.5">
                          <label htmlFor={f.name} className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{f.label}</label>
                          <input id={f.name} name={f.name} type={f.name === "email" ? "email" : "text"}
                            placeholder={f.placeholder} autoComplete={f.autoComplete} required
                            value={form[f.name] ?? ""} onChange={onChange}
                            aria-invalid={!!errors[f.name]} className={INPUT_CLASS(!!errors[f.name])} />
                          {errors[f.name] && <p className="font-mono text-[10px] text-danger" role="alert">{errors[f.name]}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Industria */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="industria" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Industria</label>
                      <select id="industria" name="industria" required value={form.industria ?? ""} onChange={onChange}
                        aria-invalid={!!errors.industria}
                        className={`${INPUT_CLASS(!!errors.industria)} bg-surface-elevated`}
                      >
                        <option value="" disabled>Selecciona tu industria</option>
                        {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                      {errors.industria && <p className="font-mono text-[10px] text-danger" role="alert">{errors.industria}</p>}
                    </div>

                    {/* Interés */}
                    <div className="flex flex-col gap-2">
                      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">¿En qué tienes interés?</p>
                      <div className="flex flex-wrap gap-2">
                        {["Dispositivos IoT", "Asesoría / modelos a medida", "Ambos"].map((opt) => (
                          <label key={opt} className={`cursor-pointer rounded-lg border px-3 py-2 font-mono text-xs transition-colors duration-150
                            ${form.interes === opt ? "border-gold text-gold bg-gold/5" : "border-border text-muted hover:border-border-strong"}`}>
                            <input type="radio" name="interes" value={opt} className="sr-only"
                              checked={form.interes === opt} onChange={onChange} />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Reto */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reto" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Reto operativo principal</label>
                      <textarea id="reto" name="reto" rows={3} required value={form.reto ?? ""} onChange={onChange}
                        placeholder="Ej: Paradas no planificadas en compresor 2-3 veces/mes, sin visibilidad anticipada…"
                        aria-invalid={!!errors.reto}
                        className={`${INPUT_CLASS(!!errors.reto)} resize-none`} />
                      {errors.reto && <p className="font-mono text-[10px] text-danger" role="alert">{errors.reto}</p>}
                    </div>

                    <button type="submit" disabled={loading}
                      className="mt-1 w-full rounded-lg bg-gold px-6 py-3 text-sm font-display font-semibold text-surface transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? "Enviando…" : "Agendar diagnóstico gratuito"}
                    </button>
                    <p className="text-center font-mono text-[10px] text-muted">Tu información es confidencial. No compartimos datos con terceros.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
