import { useEffect, useState, useCallback, useRef } from 'react'
import './PostSection.css'
import { initializeCarouselEnhancements } from '../utils/carousel.ts'

/* ── Types ── */
type Post = {
  id: string
  category: string
  title: string
  subtitle: string
  image: string
}

/* ── Data ── */
const posts: Post[] = [
  {
    id: 'bday1',
    category: 'Birthday',
    title: 'Themed Birthday Parties',
    subtitle: 'Custom setups for every age — from whimsical to elegant.',
    image: '/bdayevent1.jpg',
  },
  {
    id: 'bday2',
    category: 'Birthday',
    title: 'Celebrations with a View',
    subtitle: 'Beachfront birthdays with curated décor and coastal backdrops.',
    image: '/bdayevent2.jpg',
  },
  {
    id: 'bday3',
    category: 'Birthday',
    title: 'Milestone Moments',
    subtitle: 'Intimate gatherings or grand affairs — every detail considered.',
    image: '/bdayevent3.jpg',
  },
  {
    id: 'grand1',
    category: 'Corporate',
    title: 'Grand Company Events',
    subtitle: 'Sophisticated setups for galas, year-end parties, and team celebrations.',
    image: '/gt1.jpg',
  },
  {
    id: 'grand2',
    category: 'Corporate',
    title: 'Elegant Evening Affairs',
    subtitle: 'Refined décor and ambient lighting transform our venue after dark.',
    image: '/gt2.jpg',
  },
  {
    id: 'grand3',
    category: 'Corporate',
    title: 'Large-Scale Productions',
    subtitle: 'Full venue transformations for awards nights and company milestones.',
    image: '/gt3.jpg',
  },
  {
    id: 'debut1',
    category: 'Debut',
    title: 'Grand 18th Birthdays',
    subtitle: 'Fairytale debuts with themed styling and unforgettable entrances.',
    image: '/debut1.jpg',
  },
  {
    id: 'debut2',
    category: 'Debut',
    title: 'A Night to Remember',
    subtitle: 'Elegant table settings, floral arches, and personalized touches.',
    image: '/debut2.jpg',
  },
  {
    id: 'debut3',
    category: 'Debut',
    title: 'Starlit Celebrations',
    subtitle: 'Open-air receptions under string lights by the coast.',
    image: '/debut3.jpg',
  },
  {
    id: 'wedding1',
    category: 'Wedding',
    title: 'Seaside Wedding Receptions',
    subtitle: 'Romantic coastal settings with breathtaking sunset backdrops.',
    image: '/wedding1.jpg',
  },
  {
    id: 'wedding2',
    category: 'Wedding',
    title: 'Timeless Elegance',
    subtitle: 'Classic white-and-greenery setups that let the ocean speak.',
    image: '/wedding2.jpg',
  },
  {
    id: 'xmas1',
    category: 'Holiday',
    title: 'Festive Christmas Parties',
    subtitle: 'Family gatherings wrapped in holiday cheer and warm lighting.',
    image: '/xmas1.jpg',
  },
  {
    id: 'xmas2',
    category: 'Holiday',
    title: 'Seasonal Magic',
    subtitle: 'Twinkling lights, festive tablescapes, and coastal Christmas spirit.',
    image: '/xmas2.jpg',
  },
  {
    id: 'bdayx1',
    category: 'Birthday',
    title: 'Playful Setups',
    subtitle: 'Colorful balloon installations and themed tables that delight.',
    image: '/bday1.jpg',
  },
  {
    id: 'bdayx2',
    category: 'Birthday',
    title: 'Sunset Celebrations',
    subtitle: 'Golden-hour parties with lounge seating and tropical accents.',
    image: '/bday2.jpg',
  },
]

/* ── Category Filter ── */
const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]

/* ── Component ── */
export default function PostsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter((p) => p.category === activeCategory)
  
  const totalSlides = filteredPosts.length

  /* ── Navigation ── */
  const goTo = useCallback((index: number) => {
    if (isTransitioning || totalSlides === 0) return
    setIsTransitioning(true)
    setCurrentIndex(((index % totalSlides) + totalSlides) % totalSlides)
    setDragOffset(0)
    setTimeout(() => setIsTransitioning(false), 650)
  }, [isTransitioning, totalSlides])

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  /* ── Reset index when category changes ── */
  useEffect(() => {
    setCurrentIndex(0)
    setDragOffset(0)
  }, [activeCategory])

  /* ── Autoplay ── */
  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    if (totalSlides <= 1 || isPaused) return

    autoplayRef.current = setInterval(() => {
      goTo(currentIndex + 1)
    }, 5000)

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [currentIndex, goTo, totalSlides, isPaused])
// ── Carousel Enhancements ──
useEffect(() => {
  const cleanup = initializeCarouselEnhancements(currentIndex, posts, setIsPaused)
  return cleanup
}, [currentIndex])
  /* ── Keyboard ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  /* ── Touch ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentTouch = e.targetTouches[0].clientX
    setTouchEnd(currentTouch)
    if (touchStart !== null) {
      setDragOffset(currentTouch - touchStart)
    }
  }

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) {
      setDragOffset(0)
      return
    }
    const distance = touchStart - touchEnd
    const threshold = 60

    if (Math.abs(distance) > threshold) {
      distance > 0 ? next() : prev()
    }

    setTouchStart(null)
    setTouchEnd(null)
    setDragOffset(0)
  }

  /* ── Current post ── */
  return (
    <section id="posts" className="posts-section" aria-label="Event Showcase">
      {/* ── Ambient background decoration ── */}
      <div className="posts-bg-texture" aria-hidden="true" />
      <div className="posts-bg-orb posts-bg-orb--left" aria-hidden="true" />
      <div className="posts-bg-orb posts-bg-orb--right" aria-hidden="true" />

      <div className="posts-container">
        {/* ── Header ── */}
        <div className="posts-header reveal">
          <div className="posts-header-rule" aria-hidden="true">
  
            
          </div>
          <span className="posts-eyebrow">Event Showcase</span>
          <h2 className="posts-title">Moments We've Hosted</h2>
          <p className="posts-subtitle">
            From intimate birthday dinners to grand wedding receptions — every event at Villa Susane is crafted with intention and a touch of the coast.
          </p>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="posts-filters reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`posts-filter-pill ${activeCategory === cat ? 'posts-filter-pill--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Carousel ── */}
        <div
          className="carousel-shell reveal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Viewport */}
          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                transition: dragOffset !== 0 || isTransitioning
                  ? 'none'
                  : 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className={`carousel-slide ${index === currentIndex ? 'carousel-slide--active' : ''}`}
                >
                  <div className="slide-media">
                    <img
                      src={post.image}
                      alt={`${post.category}: ${post.title}`}
                      className="slide-image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    {/* Gradient overlays for text legibility */}
                    <div className="slide-gradient slide-gradient--top" aria-hidden="true" />
                    <div className="slide-gradient slide-gradient--bottom" aria-hidden="true" />
                  </div>

                  {/* ── Caption Overlay ── */}
                  <div className="slide-caption">
                    <div className="slide-caption-inner">
                      <span className="slide-category-tag">{post.category}</span>
                      <h3 className="slide-title">{post.title}</h3>
                      <p className="slide-subtitle">{post.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Navigation Arrows ── */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prev}
                className="carousel-arrow carousel-arrow--prev"
                aria-label="Previous slide"
                disabled={isTransitioning}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="carousel-arrow carousel-arrow--next"
                aria-label="Next slide"
                disabled={isTransitioning}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          {/* ── Progress Bar ── */}
          {totalSlides > 1 && (
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  animation: isPaused ? 'none' : `progressFill 5s linear`,
                }}
                key={`progress-${currentIndex}-${isPaused}`}
              />
            </div>
          )}

          {/* ── Dot Indicators + Counter ── */}
          {totalSlides > 1 && (
            <div className="carousel-controls-bar">
              <div className="carousel-dots">
                {filteredPosts.map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => goTo(index)}
                    className={`carousel-dot ${index === currentIndex ? 'carousel-dot--active' : ''}`}
                    aria-label={`Go to slide ${index + 1}: ${post.title}`}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
              <span className="carousel-counter">
                <span className="carousel-counter-current">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="carousel-counter-separator">/</span>
                <span className="carousel-counter-total">
                  {String(totalSlides).padStart(2, '0')}
                </span>
              </span>
            </div>
          )}

          {/* ── Pause indicator ── */}
          {isPaused && totalSlides > 1 && (
            <div className="carousel-pause-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="3" width="5" height="18" rx="1" />
                <rect x="14" y="3" width="5" height="18" rx="1" />
              </svg>
              <span>Paused</span>
            </div>
          )}
        </div>

        {/* ── Thumbnail Strip ── */}
        {totalSlides > 1 && (
          <div className="thumbnail-strip reveal">
            <div className="thumbnail-strip-inner">
              {filteredPosts.map((post, index) => (
                <button
                  key={post.id}
                  onClick={() => goTo(index)}
                  className={`thumbnail-card ${index === currentIndex ? 'thumbnail-card--active' : ''}`}
                >
                  <div className="thumbnail-card-media">
                    <img src={post.image} alt="" className="thumbnail-card-image" loading="lazy" />
                    <div className="thumbnail-card-overlay" />
                    {index === currentIndex && (
                      <div className="thumbnail-card-active-indicator">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="thumbnail-card-category">{post.category}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
