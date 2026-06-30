import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://template15-peach.vercel.app/"),
  title: "Aditya & Lestari - Pernikahan Modern Kami",
  description: "Bergabunglah dalam perayaan pernikahan Aditya & Lestari. Undangan digital modern yang elegan.",
  openGraph: {
    title: "Aditya & Lestari - Pernikahan Modern Kami",
    description: "Bergabunglah dalam perayaan pernikahan Aditya & Lestari. Undangan digital modern yang elegan.",
    url: "https://template15-peach.vercel.app/",
    siteName: "EnP Digital Service",
    images: [
      {
        url: "https://github.com/Erman4u/Publish-Image/blob/main/Template%2015.webp?raw=true",
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Aditya & Lestari",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya & Lestari - Pernikahan Modern Kami",
    description: "Bergabunglah dalam perayaan pernikahan Aditya & Lestari. Undangan digital modern yang elegan.",
    images: ["https://github.com/Erman4u/Publish-Image/blob/main/Template%2015.webp?raw=true"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/webp" href="/assets/Image/Logo-EnP.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
