function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Navbar() {
  return (
    <header className="navbar" role="banner">
      <nav className="navbar-inner">
        <a
          href="#"
          className="nav-link nav-link--brand"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Orange Juice
        </a>
        <a
          href="#about"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('about')
          }}
        >
          About
        </a>
        <a
          href="#benefits"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('benefits')
          }}
        >
          Benefits
        </a>
        <a
          href="#contact"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('contact')
          }}
        >
          Contact
        </a>
      </nav>
    </header>
  )
}

export default Navbar
