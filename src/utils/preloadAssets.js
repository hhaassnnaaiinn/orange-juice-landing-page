import { HERO_FRAME_CONFIG, getFramePath } from '../constants/heroConfig'

/** Static assets that must be loaded before revealing the app */
const STATIC_ASSETS = [
  '/orange-juice-background.png',
  '/orange-juice-bottle.png',
]

/**
 * Build list of all hero animation frame URLs (0..totalFrames-1).
 */
function getHeroFrameUrls() {
  const { totalFrames } = HERO_FRAME_CONFIG
  return Array.from({ length: totalFrames }, (_, i) => getFramePath(i))
}

/**
 * Load a single image; resolves when onload or onerror.
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = () => reject(new Error(`Failed to load: ${src}`))
    img.src = src
  })
}

/**
 * Preload all critical assets. Optionally report progress (0–1).
 * @param { (progress: number) => void } [onProgress]
 * @returns { Promise<void> }
 */
export function preloadAllAssets(onProgress) {
  const staticUrls = [...STATIC_ASSETS]
  const frameUrls = getHeroFrameUrls()
  const allUrls = [...staticUrls, ...frameUrls]
  const total = allUrls.length
  let loaded = 0

  const report = () => {
    if (typeof onProgress === 'function') {
      onProgress(loaded / total)
    }
  }

  const loadNext = (url) =>
    loadImage(url).then(() => {
      loaded++
      report()
    })

  report()
  return Promise.all(allUrls.map(loadNext)).then(() => {})
}
