import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/main.scss";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SessionClientProvider from "@/components/session-client-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Popcon Movie"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionClientProvider>
          <div className="wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </SessionClientProvider>
      </body>
    </html>
  );
}
