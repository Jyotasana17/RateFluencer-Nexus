import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ratefluencer Nexus | Predict Influence Before It Happens",
  description:
    "AI influencer intelligence, creator discovery, campaign simulation, and viral content generation in a cinematic command center."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  );
}
