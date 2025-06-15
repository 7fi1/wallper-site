import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "./fonts/fonts";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Wallper — Live Wallpapers for Your Mac",
  description:
    "Wallper App brings you the best dynamic live wallpapers in one place. Elevate your desktop experience with performance and elegance.",
  keywords: [
    "live wallpapers",
    "dynamic wallpapers",
    "mac wallpapers",
    "wallpaper app",
    "desktop backgrounds",
    "Wallper",
    "custom wallpapers",
  ],
  authors: [{ name: "Wallper Team", url: "https://wallper.app" }],
  creator: "Wallper Team",
  themeColor: "#000000",
  colorScheme: "dark",
  applicationName: "Wallper",
  referrer: "origin-when-cross-origin",

  openGraph: {
    title: "Wallper — Stunning Live Wallpapers for Your Mac",
    description:
      "Transform your desktop with Wallper. Beautiful, performance-optimized live wallpapers designed for macOS.",
    url: "https://wallper.app",
    siteName: "Wallper",
    images: [
      {
        url: "https://wallper.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wallper App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Wallper — Live Wallpapers for Your Mac",
    description:
      "Discover a new era of desktop aesthetics. Wallper delivers high-quality live wallpapers with seamless integration.",
    creator: "@wallperapp",
    images: ["https://wallper.app/og-image.png"],
  },

  metadataBase: new URL("https://wallper.app"),
  alternates: {
    canonical: "/",
  },
};
const REDDIT_PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID!;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R7N8SPW14W"
        />
        <Script id="ga-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R7N8SPW14W');
          `}
        </Script>

        <Script
          id="reddit-pixel"
          dangerouslySetInnerHTML={{
            __html: `
      !function(w,d,t,r,u){
        w[u]=w[u]||[];
        w[u].push({'event':'pageview'});
        var s=d.createElement(t);s.async=1;s.src=r;
        var f=d.getElementsByTagName(t)[0];f.parentNode.insertBefore(s,f);
      }(window,document,'script','https://www.redditstatic.com/ads/pixel.js','rdt');
      
      window.rdt && window.rdt('init', ${REDDIT_PIXEL_ID});
      window.rdt && window.rdt('track', 'PageVisit');
    `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
