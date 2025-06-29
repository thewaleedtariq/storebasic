// src/polyfills.ts
export { };
/**
 * Next.js runs completely in the browser. Some Node-centric libraries
 * look at `process.versions.node` to detect features and fail if the
 * value is missing or an empty string.
 *
 * We inject a safe value early in the module graph so every subsequent
 * import sees it.
 */
// Removed global declaration for 'process' to avoid type conflicts

// Provide a minimal, browser-friendly `process`
if (typeof globalThis.process === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).process = { browser: true, env: {}, versions: { node: "18.0.0" } }
} else {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proc = globalThis.process as any
  if (!proc.versions) proc.versions = {}
  if (!proc.versions.node || proc.versions.node === "") {
    proc.versions.node = "18.0.0"
  }
}