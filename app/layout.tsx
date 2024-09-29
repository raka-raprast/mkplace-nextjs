import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AppBar from "./custom_components/appbar";
import Footer from "./custom_components/footer";
// import { Link } from "lucide-react";
// import Button from "./components/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MkPlace",
  description: "Place to market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppBar />
        <div className="px-6 md:px-12 lg:px-24 py-6 max-w-full overflow-x-hidden">
          {children}
        </div>
        <div className="container">
         <Footer/>
        </div>
      </body>
    </html>
  );
}
