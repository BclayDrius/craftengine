import Link from "next/link";
import Image from "next/image";

const NAV_COLS = [
  {
    heading: "Plataforma",
    links: [
      { label: "Capacidades", href: "#plataforma" },
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Dispositivos", href: "/dispositivos" },
      { label: "Agendar diagnóstico", href: "#contacto" },
    ],
  },
  {
    heading: "Industrias",
    links: [
      { label: "Minería", href: "/industrias" },
      { label: "Manufactura", href: "/industrias" },
      { label: "Energía", href: "/industrias" },
      { label: "Logística", href: "/industrias" },
    ],
  },
  {
    heading: "Empresa",
    links: [
      { label: "Sobre CRAFTENGINE", href: "#" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/craftengine", external: true },
      { label: "Política de privacidad", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface" aria-label="Pie de página">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <Image
                src="/logo.jpg"
                alt="CRAFTENGINE"
                width={160}
                height={48}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Convertimos la señal cruda de tus máquinas en decisiones de mantenimiento antes de que ocurra el fallo.
            </p>
            <p className="font-mono text-xs text-muted tracking-wider uppercase mt-auto">
              CRAFTENGINE — Datos que anticipan.
            </p>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{col.heading}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted hover:text-foreground transition-colors duration-150"
                      {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} CRAFTENGINE. Todos los derechos reservados.
          </p>
          {/* LinkedIn icon */}
          <Link
            href="https://www.linkedin.com/company/craftengine"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CRAFTENGINE en LinkedIn"
            className="text-muted hover:text-foreground transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
