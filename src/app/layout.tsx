import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/app/components/nav";

const avertaRegular = localFont({
  src: "../fonts/Averta-Regular.otf",
  variable: "--font-averta-regular",
  weight: "400",
});

const avertaExtraBold = localFont({
  src: "../fonts/Averta-ExtraBold.otf",
  variable: "--font-averta-extrabold",
  weight: "800",
});

const noeDisplayBold = localFont({
  src: "../fonts/NoeDisplay-Bold.ttf",
  variable: "--font-noe-display-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Test Ped",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${avertaRegular.variable} 
          ${avertaExtraBold.variable} 
          ${noeDisplayBold.variable} 
          antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
