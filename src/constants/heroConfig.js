/**
 * Shared hero section configuration: animation frames, scroll, and copy.
 */

export const HERO_FRAME_CONFIG = {
  totalFrames: 240,
  imagePath: '/orange-juice-bottle-animation-frames/ezgif-frame-',
  imageExtension: 'png',
  scrollEnd: '+=400%',
  scrub: 1,
  phraseHold: 0.5,
  phraseFadeOut: 0.2,
  phraseBreak: 0.2,
  phraseFadeIn: 0.1,
  phraseOffsetY: 10,
  phraseScaleInactive: 0.96,
  tagline: 'Pure & Natural',
  phrases: [
    { progress: 0, text: '100% Pure Orange Juice' },
    { progress: 0.08, text: 'Squeezed from fresh oranges' },
    { progress: 0.18, text: 'No added sugars' },
    { progress: 0.28, text: 'Rich in Vitamin C' },
    { progress: 0.40, text: 'Taste the sunshine' },
    { progress: 0.52, text: 'Natural goodness in every drop' },
    { progress: 0.64, text: 'Fresh. Simple. Real.' },
    { progress: 0.76, text: 'Nothing but oranges' },
    { progress: 0.88, text: 'Pour the good stuff' },
    { progress: 1, text: 'ORANGE Juice' },
  ],
}

export function getFramePath(index, config = HERO_FRAME_CONFIG) {
  const { imagePath, imageExtension, totalFrames } = config
  const num = Math.min(index + 1, totalFrames)
  return `${imagePath}${String(num).padStart(3, '0')}.${imageExtension}`
}

export function getActivePhraseIndex(progress, config = HERO_FRAME_CONFIG) {
  const { phrases } = config
  for (let i = phrases.length - 1; i >= 0; i--) {
    if (progress >= phrases[i].progress) return i
  }
  return 0
}

export function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}
