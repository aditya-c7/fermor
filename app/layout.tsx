import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fermor.in"),
  title: "Fermor - Financial clarity for India",
  description:
    "Invest, track and plan in one place. 158 free calculators for SIP, tax, loans and retirement, built for India.",
  openGraph: {
    title: "Fermor - Financial clarity for India",
    description:
      "Invest, track and plan in one place. 158 free calculators for India.",
    type: "website",
    locale: "en_IN",
    url: "https://fermor.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fermor - Financial clarity for India",
    description:
      "Invest, track and plan in one place. 158 free calculators for India.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-4 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:text-sm"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
