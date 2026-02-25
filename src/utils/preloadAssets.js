import { HERO_FRAME_CONFIG, getFramePath } from '../constants/heroConfig'

/** Array where preloaded Image objects for hero frames will be stored (index = frame index) */
export const PRELOADED_FRAMES = []

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
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ src, ok: true, img })
    img.onerror = () => resolve({ src, ok: false, img })
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
  const total = staticUrls.length + frameUrls.length
  let loaded = 0

  const report = () => {
    if (typeof onProgress === 'function') {
      onProgress(loaded / total)
    }
  }

  const staticPromises = staticUrls.map((url) =>
    loadImage(url).then(() => {
      loaded++
      report()
    })
  )

  // Limit concurrent frame requests to avoid overwhelming hosts (502s)
  const MAX_CONCURRENCY = 6

  const loadFramesWithConcurrency = async () => {
    let i = 0
    const workers = Array.from({ length: Math.min(MAX_CONCURRENCY, frameUrls.length) }, async () => {
      while (i < frameUrls.length) {
        const idx = i++
        // eslint-disable-next-line no-await-in-loop
        const res = await loadImage(frameUrls[idx])
        PRELOADED_FRAMES[idx] = res.ok ? res.img : null
        loaded++
        report()
      }
    })
    await Promise.all(workers)
  }

  report()
  return Promise.all([Promise.all(staticPromises), loadFramesWithConcurrency()]).then(() => {})
}
