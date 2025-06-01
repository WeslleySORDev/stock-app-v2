import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { InventoryProvider } from "@/contexts/InventoryContext";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Stock APP",
  description: "Aplicativo para contagem de estoque em larga escala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${robotoCondensed.variable} antialiased`}>
        <InventoryProvider>{children}</InventoryProvider>
      </body>
    </html>
  );
}
