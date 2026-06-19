import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRAFTENGINE — Mantenimiento Predictivo Industrial y Analítica de Telemetría",
  description:
    "CRAFTENGINE convierte la señal cruda de tus máquinas en decisiones de mantenimiento antes de que ocurra el fallo. Plataforma de mantenimiento predictivo y analítica de telemetría operativa para manufactura, energía y minería.",
  keywords: [
    "mantenimiento predictivo",
    "telemetría industrial",
    "machine learning industrial",
    "predictive maintenance",
    "analítica operativa",
    "IIoT",
    "detección de anomalías",
    "industria 4.0",
  ],
  openGraph: {
    title: "CRAFTENGINE — Mantenimiento Predictivo Industrial",
    description:
      "Detecta el fallo antes de que pare la línea. Analítica de telemetría industrial con Machine Learning.",
    type: "website",
    locale: "es_ES",
    siteName: "CRAFTENGINE",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRAFTENGINE — Mantenimiento Predictivo Industrial",
    description: "Detecta el fallo antes de que pare la línea.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CRAFTENGINE",
              description:
                "Plataforma de mantenimiento predictivo y analítica de telemetría industrial.",
              url: "https://craftengine.io",
              sameAs: ["https://www.linkedin.com/company/craftengine"],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
