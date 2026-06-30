import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const scriptFont = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const bodyFont = Lora({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wedding of Blacky & Cimeng",
  description: "Digital Wedding Invitation - Blacky & Cimeng. Bergabunglah bersama kami dalam merayakan momen bahagia ini.",
  openGraph: {
    title: "The Wedding of Blacky & Cimeng",
    description: "Digital Wedding Invitation - Blacky & Cimeng",
    images: [
      {
        url: "https://github.com/Erman4u/Publish-Image/blob/main/Template12.webp?raw=true",
        width: 1200,
        height: 630,
        alt: "The Wedding of Blacky & Cimeng",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Blacky & Cimeng",
    description: "Digital Wedding Invitation - Blacky & Cimeng",
    images: ["https://github.com/Erman4u/Publish-Image/blob/main/Template12.webp?raw=true"],
  },
  icons: {
    icon: "/assets/Image/Logo-EnP.webp",
    apple: "/assets/Image/Logo-EnP.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${scriptFont.variable} ${serifFont.variable} ${bodyFont.variable} scroll-smooth`}
    >
      <body className="antialiased selection:bg-[#D4AF37] selection:text-white">
        {children}
      </body>
    </html>
  );
}
