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
      <body className="min-h-screen bg-[#08080a] text-zinc-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
