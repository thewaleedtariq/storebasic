import type React from "react"
import "../polyfills" /* <-- executes BEFORE anything else */

export default function PolyfilledLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /* Just pass-through after polyfilling */
  return children
}
