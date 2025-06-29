/**
 * Make Node-feature sniffers happy in the browser.
 * - Some packages (e.g. @nodelib/fs.scandir) read `process.versions.node`
 *   and throw if it's empty or not a semver.
 * - Next-lite provides an empty string.  We patch it to a sane value.
 * The code is idempotent: running twice is safe.
 */
; (() => {
  if (typeof globalThis.process === "undefined") {
    // Minimal stub
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ; (globalThis as any).process = {
      browser: true,
      env: {},
      versions: { node: "18.0.0" },
    }
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proc = globalThis.process as any
  if (typeof proc === 'object' && proc !== null) {
    if (!proc.versions) proc.versions = {}
    const nodeVer = proc.versions.node
    if (typeof nodeVer !== "string" || nodeVer.trim() === "") {
      proc.versions.node = "18.0.0"
    }
  }
})()

export { };
