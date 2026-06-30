import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wedding of Blacky & Cimeng",
  description: "Selamat datang di undangan pernikahan digital Blacky & Cimeng. Rabu, 15 Maret 2027.",
  openGraph: {
    title: "The Wedding of Blacky & Cimeng",
    description: "Tanpa mengurangi rasa hormat, kami mengundang Anda untuk menghadiri pernikahan kami.",
    type: "website",
    locale: "id_ID",
    images: ["https://github.com/Erman4u/Publish-Image/blob/main/Template6.webp?raw=true"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Blacky & Cimeng",
    description: "Undangan Pernikahan Digital Blacky & Cimeng",
    images: ["https://github.com/Erman4u/Publish-Image/blob/main/Template6.webp?raw=true"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased selection:bg-gold/30">
        {children}
      </body>
    </html>
  );
}
