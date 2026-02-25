import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Slides from './components/Slides'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [isReady, setIsReady] = useState(false)

  return (
    <>
      <a href="#about" className="skip-link">Skip to content</a>
      {!isReady ? (
        <Loader onComplete={() => setIsReady(true)} />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <Slides />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
