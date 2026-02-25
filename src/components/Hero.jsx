import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HERO_FRAME_CONFIG,
  getFramePath,
  getActivePhraseIndex,
  easeInOut,
} from '../constants/heroConfig'

gsap.registerPlugin(ScrollTrigger)

/**
 * Compute opacity, y, and scale for one phrase element based on scroll progress.
 */
function getPhraseStyle(i, progress, elements, config) {
  const {
    phrases,
    phraseHold,
    phraseFadeOut,
    phraseBreak,
    phraseFadeIn,
    phraseOffsetY,
    phraseScaleInactive,
  } = config

  const activeIndex = getActivePhraseIndex(progress, config)
  const isLast = activeIndex === phrases.length - 1
  let opacity = 0
  let y = i < activeIndex ? -phraseOffsetY : phraseOffsetY
  let scale = phraseScaleInactive

  if (i < activeIndex || i > activeIndex + 1) {
    return { opacity, y, scale }
  }

  if (i === activeIndex) {
    if (isLast) {
      return { opacity: 1, y: 0, scale: 1 }
    }
    const nextP = phrases[activeIndex + 1]?.progress ?? 1
    const range = nextP - phrases[activeIndex].progress
    const rawT = range > 0 ? (progress - phrases[activeIndex].progress) / range : 0
    let t = 0
    if (rawT > phraseHold && rawT <= phraseHold + phraseFadeOut) {
      t = easeInOut((rawT - phraseHold) / phraseFadeOut)
    } else if (rawT > phraseHold + phraseFadeOut) {
      t = 1
    }
    opacity = 1 - Math.min(1, t)
    y = -t * phraseOffsetY
    scale = 1 - (1 - phraseScaleInactive) * Math.min(1, t)
    return { opacity, y, scale }
  }

  // i === activeIndex + 1 (next phrase coming in)
  const prevP = phrases[activeIndex].progress
  const range = (phrases[activeIndex + 1]?.progress ?? 1) - prevP
  const rawT = range > 0 ? (progress - prevP) / range : 0
  const threshold = phraseHold + phraseFadeOut + phraseBreak
  const t =
    rawT <= threshold ? 0 : easeInOut((rawT - threshold) / phraseFadeIn)
  opacity = Math.min(1, t)
  y = phraseOffsetY - t * phraseOffsetY
  scale = phraseScaleInactive + (1 - phraseScaleInactive) * Math.min(1, t)
  return { opacity, y, scale }
}

function Hero() {
  const sectionRef = useRef(null)
  const frameImageRef = useRef(null)
  const phraseContainerRef = useRef(null)
  const phraseRefs = useRef([])
  const lastFrameIndex = useRef(-1)

  useEffect(() => {
    const section = sectionRef.current
    const frameImage = frameImageRef.current
    const container = phraseContainerRef.current
    const elements = phraseRefs.current.filter(Boolean)

    if (!section || !frameImage || !container || !elements.length) return

    gsap.set(container, { position: 'relative', minHeight: '1.5em', width: '100%' })
    gsap.set(elements, {
      position: 'absolute',
      left: '50%',
      top: 0,
      xPercent: -50,
      y: 0,
      opacity: 0,
    })
    gsap.set(elements[0], { opacity: 1 })

    function updateFrame(progress) {
      const { totalFrames } = HERO_FRAME_CONFIG
      const frameIndex = Math.min(
        Math.floor(progress * totalFrames),
        totalFrames - 1
      )
      if (frameIndex !== lastFrameIndex.current) {
        lastFrameIndex.current = frameIndex
        frameImage.src = getFramePath(frameIndex)
      }
    }

    function updatePhrases(progress) {
      elements.forEach((el, i) => {
        const { opacity, y, scale } = getPhraseStyle(
          i,
          progress,
          elements,
          HERO_FRAME_CONFIG
        )
        gsap.set(el, { opacity, y, scale })
      })
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: HERO_FRAME_CONFIG.scrollEnd,
      scrub: HERO_FRAME_CONFIG.scrub,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress
        updateFrame(progress)
        updatePhrases(progress)
      },
    })

    let ticking = false
    const onResize = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        ticking = false
      })
    }
    window.addEventListener('resize', onResize)

    return () => {
      trigger.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="hero-section" ref={sectionRef}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-canvas-wrapper">
        <img
          ref={frameImageRef}
          className="hero-canvas"
          src={getFramePath(0)}
          alt="Hero animation frame"
        />
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-tagline">{HERO_FRAME_CONFIG.tagline}</p>
        <h1 className="hero-title">
          <span className="line">
            <span className="phrase-container" ref={phraseContainerRef}>
              {HERO_FRAME_CONFIG.phrases.map((p, i) => (
                <span
                  key={i}
                  className={`phrase${i === 0 ? ' active' : ''}`}
                  ref={(el) => { phraseRefs.current[i] = el }}
                  data-progress={p.progress}
                >
                  {p.text}
                </span>
              ))}
            </span>
          </span>
        </h1>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="arrow" />
      </div>
    </div>
  )
}

export default Hero
