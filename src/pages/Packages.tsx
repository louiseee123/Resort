import './Packages.css'

interface PackageData {
  title: string
  description: string
  price: string
  pax: string
  image: string
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
      title: 'Romance Retreat',
      description: 'An intimate escape designed for two. Enjoy private moments with curated experiences that celebrate your connection.',
      price: '₱12,900',
      pax: '2 guests',
      image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'MOST POPULAR',
      includes: ['Breakfast for two', 'Sunset welcome drinks', 'Late check-out', 'Couples spa credit'],
    },
    {
      title: 'Family Fun Getaway',
      description: 'Room for the whole crew with exciting activities that keep every age smiling from sunrise to sunset.',
      price: '₱15,800',
      pax: '4 guests',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'FAMILY FAVORITE',
      includes: ['Family breakfast buffet', 'Kids activity program', 'Beach picnic setup', 'Adjoining rooms'],
    },
    {
      title: 'Wellness & Spa Days',
      description: 'Recharge mind and body with daily spa access, rejuvenating treatments, and calming wellness rituals.',
      price: '₱18,500',
      pax: '2 guests',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'SERENITY',
      includes: ['Daily spa treatment', 'Wellness session', 'Herbal tea ritual', 'Meditation deck access'],
    },
  ]

  return (
    <section id="packages" className="packages-section" aria-label="Packages" style={{ background: '#FDFCDC', padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)' }}>

      {/* Decorative top rule */}
      <div className="packages-top-rule" aria-hidden="true">
        <span className="rule-line" />
        <span className="rule-diamond">◆</span>
        <span className="rule-line" />
      </div>

      <div className="packages-container">
        <div className="section-header reveal">
          <span className="section-tag">CURATED EXPERIENCES</span>
          <h2 className="section-title">Stay Packages</h2>
          <p className="section-subtitle">Choose a package and let us handle every detail of your perfect escape</p>
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
                <div className="package-image">
                  <img src={pkg.image} alt={pkg.title} loading="lazy" />
                  <div className="image-overlay" />
                </div>
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
                      <span className="price-label">From</span>
                      <span className="price-amount">{pkg.price}</span>
                      <span className="price-period"> / stay</span>
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