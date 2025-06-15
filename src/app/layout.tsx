import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Questrial } from 'next/font/google';
import "./globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-medium-image-zoom/dist/styles.css";
import Header from "./components/header";
import Footer from "./components/footer";

const harmoniaSans = localFont({
  src: [
    {
      path: '../fonts/Harmonia Sans W01 Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Harmonia Sans W01 Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-harmonia-sans',
  display: 'swap',
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOCCIANI",
  description: "Discover timeless fashion in modern design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${harmoniaSans.variable} ${questrial.variable}`}>
      <body
        className={`
          font-harmonia-sans
          antialiased
          text-black
          min-h-screen
          flex flex-col
          bg-white
        `}
      >
        <Header />
        <main className="flex-1 bg-transparent">
          <div className="w-full">
        {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
