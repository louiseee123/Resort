import { useState, useEffect, useRef, useCallback } from 'react';
import './Packages.css';

interface PackageData {
  title: string
  description: string
  price: string
  pax: string
  images: string[]
  badge?: string
  includes?: string[]
}

export default function Packages({
  onAskAboutThis,
}: {
  onAskAboutThis: () => void
}) {
  const packages: PackageData[] = [
     {
      title: 'Phase 1 Area Package',
      description: 'Perfect for small gatherings and get togethers.',
      price: '₱10,000',
      pax: '10 persons',
      images: [
        '/bdayevent1.jpg',
        '/bdayevent2.jpg',
        '/bdayevent3.jpg',
      ],
      badge: '10 PAX',
      includes: [
        'Venue Area only Access',
        '4-6 Hours Usage',
        '10 Pax free pool use',
        'Villa Susane, Abucayan, Balamban, Cebu',
      ],
    },
    {
      title: 'Food Package with Pool Access',
      description: 'Complete venue experience with premium accommodations, private pool access, and entertainment facilities for your special event.',
      price: '₱15,000',
      pax: 'Up to 20-30 Persons',
      images: [
        '/pool3.jpg',
        '/balconyview1.jpg',
        '/rooms1.jpg',
      ],
      badge: '20-30 PAX',
      includes: [
        '8 Food trays',
        'Free entrance and pool access',
        'Tables and Chairs',
        'Villa Susane, Abucayan, Balamban, Cebu',
      ],
    },
    {
      title: 'All-in-One Event Package',
      description: 'Perfect for celebrations with complete event setup, catering, and entertainment systems.',
      price: '₱35,000',
      pax: '50 guests',
      images: [
        '/bdayevent1.jpg',
        '/bdayevent2.jpg',
        '/bdayevent3.jpg',
      ],
      badge: '50 PAX',
      includes: [
        'Exclusive Phase 1 Access',
        '4 Main Dishes, Dessert, Rice & Drinks',
        'Balloon Backdrop & Celebrant Name', 
        'Professional Sound System & Microphone',
        'Perfect for Birthdays, Christenings, or Reunions',
        'Villa Susane, Abucayan, Balamban, Cebu',
      ],
    },
    {
      title: 'Grand Celebration Package',
      description: 'The ultimate experience for large gatherings with grand function hall and premium amenities.',
      price: '₱60,000',
      pax: '100 guests',
      images: [
        '/gt1.jpg',
        '/gt2.jpg',
        '/gt3.jpg',
      ],
      badge: '100 PAX',
      includes: [
        'Exclusive Grand Function Hall',
        '4 Main Dishes, Dessert, Rice & Drinks',
        'Premium Balloon Backdrop & Name', 
        'Professional Sounds & Mic System',
        '4 to 6 Hours Venue Use',
        'Perfect for Birthdays, Christenings, & Reunions',
        'Villa Susane, Abucayan, Balamban, Cebu',
      ],
    },
  ]

  // Carousel component for each package
  const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)


    // Clear interval function
    const clearAutoAdvance = useCallback(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, []);

    // Start auto-advance function
    const startAutoAdvance = useCallback(() => {
      if (images.length <= 1) return;
      clearAutoAdvance();
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    }, [images.length, clearAutoAdvance]);

    // Next slide function
    const nextSlide = useCallback((e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % images.length);
      // Reset auto-advance timer on manual navigation
      if (!isHovered) {
        clearAutoAdvance();
        startAutoAdvance();
      }
    }, [isHovered, clearAutoAdvance, startAutoAdvance]);

    // Previous slide function
    const prevSlide = useCallback((e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      // Reset auto-advance timer on manual navigation
      if (!isHovered) {
        clearAutoAdvance();
        startAutoAdvance();
      }
    }, [images.length, isHovered, clearAutoAdvance, startAutoAdvance]);

    // Go to specific slide
    const goToSlide = useCallback((index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex(index);
      if (!isHovered) {
        clearAutoAdvance();
        startAutoAdvance();
      }
    }, [isHovered, clearAutoAdvance, startAutoAdvance]);

    // Handle hover events
    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
      clearAutoAdvance();
    }, [clearAutoAdvance]);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      startAutoAdvance();
    }, [startAutoAdvance]);

    // Start auto-advance on mount
    useEffect(() => {
      if (images.length > 1) {
        startAutoAdvance();
      }
      return () => clearAutoAdvance();
    }, [images.length, startAutoAdvance, clearAutoAdvance]);

    return (
      <div 
        className="package-carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="carousel-container">
          <div 
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="carousel-slide">
                <img src={img} alt={`${title} - image ${idx + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              className="carousel-btn prev" 
              onClick={prevSlide}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className="carousel-btn next" 
              onClick={nextSlide}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="carousel-dots">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={(e) => goToSlide(idx, e)}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="image-overlay" />
      </div>
    );
  };

  return (
    <section id="packages" className="packages-section" aria-label="Packages">
      <div className="packages-top-rule" aria-hidden="true">
        <span className="rule-line" />
        <span className="rule-diamond">◆</span>
        <span className="rule-line" />
      </div>

      <div className="packages-container">
        <div className="section-header reveal">
          <span className="section-tag">CURATED EXPERIENCES</span>
          <h2 className="section-title">Event Packages</h2>
          <p className="section-subtitle">Choose a package and let us handle every detail of your perfect celebration</p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div
              key={pkg.title}
              className="package-card-wrapper reveal"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="package-card">
                {pkg.badge && <span className="package-badge">{pkg.badge}</span>}
                
                <ImageCarousel images={pkg.images} title={pkg.title} />
                
                <div className="package-content">
                  <h3 className="package-title">{pkg.title}</h3>
                  <p className="package-description">{pkg.description}</p>
                  
                  {pkg.includes && (
                    <ul className="package-includes">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="package-include-item">
                          <svg className="include-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="package-meta">
                    <div className="package-price">
                      <span className="price-label">Package Rate</span>
                      <span className="price-amount">{pkg.price}</span>
                    </div>
                    <div className="package-pax">{pkg.pax}</div>
                  </div>

                  <button className="package-button" onClick={onAskAboutThis}>
                    <span>Ask About This</span>
                    <svg className="button-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}