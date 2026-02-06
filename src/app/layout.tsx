import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "@/styles/globals.css";
import SpotlightCursor from "@/components/SpotlightCursor";

export const metadata: Metadata = {
  title: "Hassan Karasu | Visual Artist & Photographer",
  description:
    "Exploring the quiet spaces between light and shadow. Passage, silence, and human presence as trace.",
  keywords: [
    "visual artist",
    "photographer",
    "art photography",
    "light and shadow",
    "Hassan Karasu",
  ],
  authors: [{ name: "Hassan Karasu" }],
  openGraph: {
    title: "Hassan Karasu | Visual Artist & Photographer",
    description:
      "Exploring the quiet spaces between light and shadow. Passage, silence, and human presence as trace.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500&family=Noto+Kufi+Arabic:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SpotlightCursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
