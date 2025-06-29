/* -------------------------------------------------------------------------- */
/* Fix for browser bundles that expect a valid `process.versions.node`.       */
/* This _must_ run before any other imports (especially @nodelib/*).          */
/* -------------------------------------------------------------------------- */
declare const process: any // eslint-disable-line @typescript-eslint/no-explicit-any
if (typeof process === "object") {
  if (!process.versions) process.versions = {}
  if (!process.versions.node || process.versions.node === "") {
    process.versions.node = "18.0.0"
  }
}
import type React from "react"
import type { Metadata } from "next"
import { Questrial } from "next/font/google"
import "./globals.css"
import "react-medium-image-zoom/dist/styles.css"
import Header from "./components/header"
import Footer from "./components/footer"

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MOCCIANI",
  description: "Discover timeless fashion in modern design.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${questrial.variable}`}>
      <body
        className={`
          antialiased
          text-black
          min-h-screen
          flex flex-col
          bg-white
        `}
      >
        <Header />
        <main className="flex-1 bg-transparent">
          <div className="w-full">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
