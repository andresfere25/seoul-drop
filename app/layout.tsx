import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seoul Drop — Productos coreanos auténticos en Colombia",
  description: "K-Beauty, K-Pop, Stationery y Snacks directamente desde Seúl. Envíos a todo Colombia.",
  keywords: "kbeauty colombia, kpop colombia, cosméticos coreanos, seoul drop",
  openGraph: {
    title: "Seoul Drop",
    description: "Lo mejor de Corea, llegando a Colombia 🇰🇷",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
