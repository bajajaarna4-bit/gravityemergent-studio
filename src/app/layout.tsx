import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verve Studio — Autonomous Full-Stack Web Synthesis",
  description: "Describe any website or app in plain language. AI agents plan, design, write, test, and ship complete premium software.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#08080a] text-zinc-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

