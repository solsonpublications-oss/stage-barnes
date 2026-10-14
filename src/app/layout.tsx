import type { Metadata, Viewport } from "next";
import { Fraunces, Literata, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robert-barnes-productions.space-z.ai"),
  title: "R. Ray Barnes Productions — Stage & Screen",
  description:
    "The scripts, screenplays, stage plays, and screen work of Emmy-winning writer & producer R. Ray Barnes — from Queen Pin and Left Behind in Vietnam to The Adventures of Rapman & Homeboy. Inquire about available scripts and project collaborations.",
  keywords: [
    "R. Ray Barnes",
    "R. Ray Barnes Productions",
    "rraybarnesproductions",
    "screenwriter",
    "playwright",
    "stage plays",
    "screenplays",
    "TV scripts",
    "film scripts",
    "Queen Pin",
    "Left Behind in Vietnam",
    "The Adventures of Rapman and Homeboy",
    "Resurrection The Life of Christ",
    "Tony Coleman",
    "Stevie Wonder",
    "Mary Wilson",
    "James Ingram",
    "Lee Greenwood",
    "The Pointer Sisters",
    "Michigan Regional Emmy",
    "Eclipse Award",
    "music producer",
    "songwriter",
    "producer",
  ],
  authors: [{ name: "R. Ray Barnes" }],
  creator: "R. Ray Barnes",
  publisher: "R. Ray Barnes Productions",
  icons: {
    icon: "/images/icon-192.png",
    apple: "/images/apple-icon-180.png",
  },
  openGraph: {
    title: "R. Ray Barnes Productions — Stage & Screen",
    description:
      "The scripts, screenplays, stage plays, and screen work of Emmy-winning writer & producer R. Ray Barnes. Inquire about available scripts and project collaborations.",
    type: "website",
    siteName: "R. Ray Barnes Productions",
    locale: "en_US",
    url: "https://robert-barnes-productions.space-z.ai/",
    images: [
      {
        url: "/images/og-productions.png",
        width: 1344,
        height: 768,
        alt: "R. Ray Barnes Productions — Stage & Screen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "R. Ray Barnes Productions — Stage & Screen",
    description:
      "The scripts, screenplays, stage plays, and screen work of Emmy-winning writer & producer R. Ray Barnes.",
    images: ["/images/og-productions.png"],
    creator: "@rraybarnes",
  },
  manifest: "/manifest.webmanifest",
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: "#150d1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${literata.variable} ${caveat.variable} ${geistMono.variable} antialiased bg-background text-foreground grain ambient-bg`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
