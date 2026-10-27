import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/anton/400.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import Shell from "@/components/Shell";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NexAge Global — Talent Partners & Hospitality Advisory",
  description:
    "Executive search, retained and volume recruitment across the GCC, UK and Europe — plus hospitality advisory. NexAge Global, Dubai.",
  icons: { icon: "/brand/icon.png", apple: "/brand/icon.png" },
};
export const viewport: Viewport = { themeColor: "#04170f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Shell>
          <Nav />
          {children}
          <Footer />
        </Shell>
      </body>
    </html>
  );
}
