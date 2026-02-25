import { useRef } from 'react'
import { SLIDE_SECTIONS } from '../constants/slideSections'
import { useSlidesScrollTrigger } from '../hooks/useSlidesScrollTrigger'

function Slides() {
  const wrapperRef = useRef(null)
  useSlidesScrollTrigger(wrapperRef)

  return (
    <div className="slides-wrapper" ref={wrapperRef}>
      {SLIDE_SECTIONS.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          aria-label={section.title}
          className={`section section-${i + 1}${section.long ? ' section--long' : ''}`}
        >
          <div className="section-content">
            <div className="section-inner">{section.content}</div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Slides
