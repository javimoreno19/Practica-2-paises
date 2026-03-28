import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paises del Mundo",
  description: "Práctica Next.js - REST Countries API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
