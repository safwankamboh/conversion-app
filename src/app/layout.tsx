import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConvertAll - All-in-One Conversion Tools",
  description:
    "Free online tools for file conversion, unit conversion, currency conversion, and more. Convert PDF, Word, Excel, images, and much more.",
  keywords:
    "converter, pdf converter, unit converter, currency converter, file converter, online tools",
  authors: [{ name: "ConvertAll Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "ConvertAll - All-in-One Conversion Tools",
    description:
      "Free online tools for file conversion, unit conversion, currency conversion, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConvertAll - All-in-One Conversion Tools",
    description:
      "Free online tools for file conversion, unit conversion, currency conversion, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
