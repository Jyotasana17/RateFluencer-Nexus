import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trend Fatigue Engine AI | Predict What's Dying Before Anyone Else",
  description:
    "Analyze audience fatigue, detect trend burnout, and generate disruptive counter-narratives that capture the exact moment a trend reverses. First-mover advantage for creators.",
  keywords: [
    "trend fatigue",
    "AI content strategy",
    "counter-narrative",
    "creator tools",
    "viral prediction",
    "audience fatigue detection",
  ],
  openGraph: {
    title: "Trend Fatigue Engine AI",
    description:
      "Stop chasing trends. Predict what's dying and ride the counter-wave before anyone else.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  );
}
