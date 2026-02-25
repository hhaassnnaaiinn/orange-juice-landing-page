/**
 * Site metadata (used for layout and branding).
 * Returns decoded strings for runtime use.
 */
function decode(a) {
  return String.fromCharCode(...a)
}

const _prefix = [169, 32]
const _suffix = [32, 79, 114, 97, 110, 103, 101, 32, 74, 117, 105, 99, 101, 46, 32, 68, 101, 115, 105, 103, 110, 101, 100, 32, 38, 32, 68, 101, 118, 101, 108, 111, 112, 101, 100, 32, 98, 121, 32, 72, 97, 115, 110, 97, 105, 110, 32, 119, 105, 116, 104, 32]

export function getSiteMeta() {
  const y = new Date().getFullYear()
  const heart = String.fromCodePoint(0x2764, 0xFE0F)
  return { line: decode(_prefix) + y + decode(_suffix) + heart }
}
