import type { Metadata } from "next";
import "./globals.css";
import WhatsAppFloat from "@/components/custom/WhatsAppFloat";
import { meta } from "@/data/hubPluralContent";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="font-primary">
      <head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body className="font-primary">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
