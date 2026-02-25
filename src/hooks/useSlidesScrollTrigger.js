import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sets up ScrollTrigger-based pinning and scale/fade for slide panels.
 * All panels except the last get a timeline; the last section is left static.
 */
export function useSlidesScrollTrigger(wrapperRef) {
  const triggersRef = useRef([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const panels = gsap.utils.toArray('.section')
    const panelsToAnimate = panels.slice(0, -1)
    triggersRef.current = []

    panelsToAnimate.forEach((panel) => {
      const innerPanel = panel.querySelector('.section-inner')
      if (!innerPanel) return

      const panelHeight = innerPanel.offsetHeight
      const windowHeight = window.innerHeight
      const difference = panelHeight - windowHeight
      const fakeScrollRatio =
        difference > 0 ? difference / (difference + windowHeight) : 0

      if (fakeScrollRatio) {
        panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'bottom bottom',
          end: fakeScrollRatio
            ? `+=${innerPanel.offsetHeight}`
            : 'bottom top',
          pinSpacing: false,
          pin: true,
          scrub: true,
        },
      })

      triggersRef.current.push(tl.scrollTrigger)

      if (fakeScrollRatio) {
        tl.to(innerPanel, {
          yPercent: -100,
          y: windowHeight,
          duration: 1 / (1 - fakeScrollRatio) - 1,
          ease: 'none',
        })
      }
      tl.fromTo(
        panel,
        { scale: 1, opacity: 1 },
        { scale: 0.7, opacity: 0.5, duration: 0.9 }
      ).to(panel, { opacity: 0, duration: 0.1 })
    })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      triggersRef.current.forEach((t) => t.kill())
      triggersRef.current = []
      window.removeEventListener('resize', onResize)
    }
  }, [])
}
