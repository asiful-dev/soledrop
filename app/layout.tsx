import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/features/auth/context/auth-context";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import { Toaster } from "@/shared/ui-components/controls/sonner";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soledrop.vercel.app"),
  title: {
    default: "SoleDrop — Level up your sole",
    template: "%s | SoleDrop",
  },
  description:
    "The dopest sneaker marketplace for Gen-Z sneakerheads. Drop-ready. Always fresh. Verified kicks for the culture.",
  keywords: [
    "sneakers",
    "shoes",
    "kicks",
    "streetwear",
    "Gen Z",
    "marketplace",
  ],
  openGraph: {
    title: "SoleDrop — Level up your sole",
    description:
      "The premium sneakers marketplace. Verified kicks, exclusive drops, and more.",
    url: "https://soledrop.vercel.app",
    siteName: "SoleDrop",
    images: [
      {
        url: "/og-image-soledrop.png",
        width: 1200,
        height: 630,
        alt: "SoleDrop — Premium Sneakers Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoleDrop — Level up your sole",
    description:
      "The premium sneakers marketplace. Verified kicks, exclusive drops, and more.",
    images: ["/og-image-soledrop.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
