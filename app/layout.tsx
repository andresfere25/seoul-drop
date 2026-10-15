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
  title: "Kaya | Skincare, K-pop y cultura coreana",
  description: "Una selección de skincare, K-pop y cultura coreana para Colombia. Conoce el primer capítulo de Kaya.",
  keywords: "kbeauty colombia, kpop colombia, cosmeticos coreanos, Kaya",
  openGraph: {
    title: "Kaya",
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
