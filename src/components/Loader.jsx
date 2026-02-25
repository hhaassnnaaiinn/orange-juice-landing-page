import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { preloadAllAssets } from '../utils/preloadAssets'

const MIN_DISPLAY_MS = 1200

function Loader({ onComplete }) {
  const containerRef = useRef(null)
  const orbsRef = useRef([])
  const textRef = useRef(null)
  const didComplete = useRef(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const orbs = orbsRef.current.filter(Boolean)
    const text = textRef.current

    if (!container) return

    const runExitAnimation = () => {
      if (didComplete.current) return
      didComplete.current = true

      const tl = gsap.timeline({
        onComplete: () => onComplete?.(),
      })
      tl.to(orbs, {
        scale: 1.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power2.in',
      })
      tl.to(text, { opacity: 0, y: -12, duration: 0.35 }, '-=0.3')
      tl.to(container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      tl.set(container, { pointerEvents: 'none', visibility: 'hidden' })
    }

    const minTimePromise = new Promise((resolve) =>
      setTimeout(resolve, MIN_DISPLAY_MS)
    )
    const preloadPromise = preloadAllAssets((p) => setProgress(p))

    Promise.all([minTimePromise, preloadPromise]).then(() => {
      runExitAnimation()
    })
  }, [onComplete])

  return (
    <div
      className="app-loader"
      ref={containerRef}
      aria-hidden="true"
      role="presentation"
    >
      <div className="app-loader__bg" />
      <div className="app-loader__orbs">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="app-loader__orb"
            ref={(el) => { orbsRef.current[i] = el }}
            style={{ '--orb-i': i }}
          />
        ))}
      </div>
      <p className="app-loader__text" ref={textRef}>
        Pure & Natural
      </p>
      <p className="app-loader__progress" aria-live="polite">
        {Math.round(progress * 100)}%
      </p>
    </div>
  )
}

export default Loader
