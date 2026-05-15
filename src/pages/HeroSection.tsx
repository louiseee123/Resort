import { useEffect, useRef } from 'react'
import './HeroSection.css'

export default function HeroSection({ onLearnMore }: { onLearnMore: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleParallax)
    return () => window.removeEventListener('scroll', handleParallax)
  }, [])

  return (
    <section
      id="home"
      className="hero-section"
    >
      {/* Animated Gradient Background */}
      <div className="hero-bg-gradient" />
      
      {/* Background Image with Overlay */}
      <div className="hero-bg-wrapper">
        <div className="hero-bg-image" ref={heroRef} />
        <div className="hero-overlay" />
        <div className="hero-noise" />
      </div>

      {/* Ornamental Top Rule */}
      <div className="hero-top-rule" aria-hidden="true">
        <span className="hero-rule-line" />
        <span className="hero-rule-diamond">◆</span>
        <span className="hero-rule-line" />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-badge">
          
        </div>

        <p className="hero-label">
          <span className="hero-label-line"></span>
          WELCOME TO
          <span className="hero-label-line"></span>
        </p>

        <h1 className="hero-title">
          Villa Susane
          <span className="hero-title-accent">Events Place</span>
        </h1>

        <div className="hero-divider">
          <div className="hero-divider-line" />
          <div className="hero-divider-icon">✦</div>
          <div className="hero-divider-line" />
        </div>

        <p className="hero-subtitle">
          Your private escape in Abucayan, Balamban, Cebu
        </p>

        <div className="hero-features">
          <div className="hero-feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v4M12 18v4M4 12H2M6 12H4M20 12h-2M22 12h-2M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M16.24 16.24l2.83 2.83M7.76 7.76L4.93 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Private Pool</span>
          </div>
          <div className="hero-feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Function Hall</span>
          </div>
          <div className="hero-feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v4M12 22v-4M4 12H2M6 12H4M20 12h-2M22 12h-2M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M16.24 16.24l2.83 2.83M7.76 7.76L4.93 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Event Ready</span>
          </div>
        </div>

        <button className="hero-btn" onClick={onLearnMore}>
          <span>Discover More</span>
          <svg className="hero-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <div className="hero-scroll-text">Scroll</div>
        <div className="hero-scroll-line">
          <div className="hero-scroll-dot" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="hero-bottom-fade" />
    </section>
  )
}