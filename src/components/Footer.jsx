import { useRef, useEffect } from 'react'
import { getSiteMeta } from '../utils/siteMeta'

function Footer() {
  const creditRef = useRef(null)
  useEffect(() => {
    if (creditRef.current) {
      creditRef.current.textContent = getSiteMeta().line
    }
  }, [])

  return (
    <footer className="app-footer" role="contentinfo">
      <p className="app-footer__credit" ref={creditRef} />
    </footer>
  )
}

export default Footer
