import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "VORTEX TECHNO STUDIO | AI Music Forge & 50+ Sonic Roles for Suno.AI",
  description:
    "The ultimate AI music studio for making all kinds of Techno with Suno.AI. 50+ sound descriptions, sonic roles, Web Audio live synthesis, 16-step sequencer, and smart prompt engineering. Create peak-time, acid, industrial, dub, melodic, and raw techno.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-red-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
