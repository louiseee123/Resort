import { useEffect, useRef, useState } from 'react'
import { client } from '../sanityClient'
import './HeroSection.css'

type HeroContent = {
  eyebrow: string
  title: string
  accentTitle: string
  subtitle: string
  backgroundImage: string
  buttonText: string
  features: string[]
}

const fallbackHero: HeroContent = {
  eyebrow: 'WELCOME TO',
  title: 'Villa Susane',
  accentTitle: 'Events Place',
  subtitle: 'Your private escape in Abucayan, Balamban, Cebu',
  backgroundImage: '/bgnew.jpg',
  buttonText: 'Discover More',
  features: ['Private Pool', 'Function Hall', 'Event Ready'],
}

export default function HeroSection({ onLearnMore }: { onLearnMore: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(0)
  const [content, setContent] = useState<HeroContent>(fallbackHero)

  useEffect(() => {
    let isMounted = true

    client
      .fetch<Partial<HeroContent> | null>(`
        *[_type == "heroSection"][0]{
          eyebrow,
          title,
          accentTitle,
          subtitle,
          buttonText,
          features,
          "backgroundImage": backgroundImage.asset->url
        }
      `)
      .then((data) => {
        if (!isMounted || !data) return
        setContent({
          ...fallbackHero,
          ...data,
          features: data.features?.length ? data.features : fallbackHero.features,
          backgroundImage: data.backgroundImage || fallbackHero.backgroundImage,
        })
      })
      .catch(() => {
        if (isMounted) setContent(fallbackHero)
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxStyle = {
    transform: `translateY(${scrolled * 0.35}px) scale(${1 + scrolled * 0.00015})`,
    backgroundImage: `url(${content.backgroundImage})`,
  }

  return (
    <section id="home" className="hero-section">
      {/* Animated Gradient Background */}
      <div className="hero-bg-gradient" />
      
      {/* Background Image with Overlay */}
      <div className="hero-bg-wrapper">
        <div 
          className="hero-bg-image" 
          ref={heroRef}
          style={parallaxStyle}
          data-sanity="heroSection.backgroundImage"
        />
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
        <p className="hero-label" data-sanity="heroSection.eyebrow">
          <span className="hero-label-line"></span>
          {content.eyebrow}
          <span className="hero-label-line"></span>
        </p>

        <h1 className="hero-title" data-sanity="heroSection.title">
          {content.title}
          <span className="hero-title-accent" data-sanity="heroSection.accentTitle">{content.accentTitle}</span>
        </h1>

        <div className="hero-divider">
          <div className="hero-divider-line" />
          <div className="hero-divider-icon">✦</div>
          <div className="hero-divider-line" />
        </div>

        <p className="hero-subtitle" data-sanity="heroSection.subtitle">
          {content.subtitle}
        </p>

        <div className="hero-features" data-sanity="heroSection.features">
          {content.features.map((feature) => (
            <div className="hero-feature" key={feature}>
              <span className="hero-feature-dot" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <button className="hero-btn" onClick={onLearnMore}>
          <span data-sanity="heroSection.buttonText">{content.buttonText}</span>
          <svg className="hero-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line">
          <span className="hero-scroll-dot" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="hero-bottom-fade" />
    </section>
  )
}
