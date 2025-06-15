"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import classNames from "classnames"

const navLinks = [
  { label: "FLAT SALE 20%", href: "#", highlight: true },
  { label: "SUMMER' 25", href: "#" },
  { label: "NEW ARRIVALS", href: "#", bold: true },
  { label: "BEST SELLER", href: "#" },
  { label: "MEN", href: "/listing?category=men" },
  { label: "WOMEN", href: "/listing?category=women" },
  { label: "BAGS", href: "/listing?category=bags" },
  { label: "FRAGRANCES", href: "#" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full font-questrial header-border bg-white text-[13.2px] text-black">
      {/* Flash Sale Alert with Marquee */}
      <div className="bg-[#F2F2F2]">
        <div className="animate-marquee whitespace-nowrap py-1 font-harmonia-sans text-[12px] text-[#444444] inline-block min-w-full">
          <span className="inline-block">Flash Sale Alert! Enjoy Flat 20% Off On Selected Items!</span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="w-full px-2 sm:px-4 md:px-6 py-2 sm:py-3">
        <div className="flex items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block" aria-label="Mocciani Home">
              <img
                src="/mocciani_250x.avif"
                alt="Mocciani Logo"
                width={120}
                height={40}
                className="h-8 w-auto sm:h-10"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Link>
          </div>

          {/* Center: Links */}
          <nav className="hidden md:flex gap-5 items-center uppercase font-questrial text-[13.2px] text-black flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={classNames(
                  "hover:underline font-questrial text-[13.2px] text-black",
                  link.highlight && "text-red-600 font-semibold",
                  link.bold && "font-bold",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
            {/* Mobile menu button */}
            <button className="md:hidden hover:text-gray-900 transition-colors" onClick={() => setOpen(!open)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={classNames(
                "block uppercase font-questrial text-[13.2px] text-black",
                link.highlight && "text-red-600 font-semibold",
                link.bold && "font-bold",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
