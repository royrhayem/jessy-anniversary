import type { Metadata, Viewport } from "next";
import { ProgressProvider } from "@/lib/progress";
import "./globals.css";

/* Deliberately boring and corporate. She may see this in the QR preview —
   nothing here can hint at what the site actually is. */
export const metadata: Metadata = {
  title: "RewardHub™ — Employee Recognition Portal",
  description: "Redeem your service award.",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0e14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
