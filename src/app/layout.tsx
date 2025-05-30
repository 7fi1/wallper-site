import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import PreloadWrapper from "./components/Preloader/PreloaderWrapper";
import { inter } from "./fonts/fonts";

export const metadata: Metadata = {
  title: "Wallper — Live Wallpapers for your Mac",
  description:
    "Wappler App brings you the best live wallpapers in one place...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PreloadWrapper>{children}</PreloadWrapper>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
