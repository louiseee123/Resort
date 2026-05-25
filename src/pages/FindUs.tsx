import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import './FindUs.css'

type LocationContent = {
  eyebrow: string
  title: string
  subtitle: string
  resortName: string
  address: string
  mapEmbedUrl: string
  phone: string
  email: string
  highlights: string[]
}

const fallbackLocationContent: LocationContent = {
  eyebrow: 'Location',
  title: 'Where the Horizon\nMeets Your Stay',
  subtitle: 'Perched along the tranquil western coast of Cebu - a sanctuary removed from the noise, yet effortlessly within reach.',
  resortName: 'Villa Susane Resort',
  address: 'Abucayan, Balamban, Cebu, Philippines',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.20600457358546!2d123.71970162668845!3d10.477310025899227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9091328822d3d%3A0xd37afc461fcc0b42!2sVilla%20Susane%20Events%20Place!5e0!3m2!1sen!2sus!4v1778309544937!5m2!1sen!2sus',
  phone: '0929 479 9835',
  email: 'balambanbooking@gmail.com',
  highlights: [
    'Complimentary parking',
    'Tricycle & motorcycle accessible',
    'Near Abucayan Chapel',
    'Scenic coastal route',
  ],
}

export default function FindUs() {
  const [copied, setCopied] = useState(false)
  const [content, setContent] = useState<LocationContent>(fallbackLocationContent)

  const address = content.address

  useEffect(() => {
    let isMounted = true

    client
      .fetch<Partial<LocationContent> | null>(`
        *[_type == "locationSection"][0]{
          eyebrow,
          title,
          subtitle,
          resortName,
          address,
          mapEmbedUrl,
          phone,
          email,
          highlights
        }
      `)
      .then((data) => {
        if (!isMounted || !data) return
        setContent({
          ...fallbackLocationContent,
          ...data,
          highlights: data.highlights?.length ? data.highlights : fallbackLocationContent.highlights,
          mapEmbedUrl: data.mapEmbedUrl || fallbackLocationContent.mapEmbedUrl,
        })
      })
      .catch(() => {
        if (isMounted) setContent(fallbackLocationContent)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = address
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="location" className="findus-section" aria-label="Location">
      {/* ── Ambient Background Elements ── */}
      <div className="findus-bg-orb findus-bg-orb--top" aria-hidden="true" />
      <div className="findus-bg-orb findus-bg-orb--bottom" aria-hidden="true" />

      <div className="findus-container">
        {/* ── Section Header ── */}
        <div className="findus-header reveal">
          
          <span className="findus-eyebrow" data-sanity="locationSection.eyebrow">{content.eyebrow}</span>
          <h2 className="findus-title" data-sanity="locationSection.title">
            {content.title.split('\n').map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className="findus-subtitle" data-sanity="locationSection.subtitle">
            {content.subtitle}
          </p>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="findus-content reveal">
          
          {/* ── Left Column: Map ── */}
          <div className="findus-map-column">
            <div className="findus-map-frame">
              {/* Decorative corner accents */}
              <span className="findus-map-corner findus-map-corner--tl" aria-hidden="true" />
              <span className="findus-map-corner findus-map-corner--tr" aria-hidden="true" />
              <span className="findus-map-corner findus-map-corner--bl" aria-hidden="true" />
              <span className="findus-map-corner findus-map-corner--br" aria-hidden="true" />

              {/* Gradient overlays for depth */}
              <div className="findus-map-gradient findus-map-gradient--top" aria-hidden="true" />
              <div className="findus-map-gradient findus-map-gradient--bottom" aria-hidden="true" />

              <iframe
                title="Villa Susane Resort Location"
                src={content.mapEmbedUrl}
                className="findus-map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-sanity="locationSection.mapEmbedUrl"
              />
            </div>

            {/* ── Travel Time Cards ── */}
            <div className="findus-travel-grid">
              <div className="findus-travel-card">
                <div className="findus-travel-card-inner">
                  <span className="findus-travel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 6v6l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="findus-travel-info">
                    <span className="findus-travel-label">Cebu City</span>
                    <span className="findus-travel-time">~1.5 hrs away</span>
                  </div>
                </div>
                <div className="findus-travel-dot-pattern" aria-hidden="true" />
              </div>

              <div className="findus-travel-card">
                <div className="findus-travel-card-inner">
                  <span className="findus-travel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 6v6l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="findus-travel-info">
                    <span className="findus-travel-label">Toledo City</span>
                    <span className="findus-travel-time">~45 mins away</span>
                  </div>
                </div>
                <div className="findus-travel-dot-pattern" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* ── Right Column: Details ── */}
          <div className="findus-details-column">
            <div className="findus-details-card">
              
              {/* Address Block */}
              <div className="findus-address-block">
                <div className="findus-address-icon-shell">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <span className="findus-address-label">Resort Address</span>
                  <h3 className="findus-address-name" data-sanity="locationSection.resortName">{content.resortName}</h3>
                  <p className="findus-address-text" data-sanity="locationSection.address">{content.address}</p>
                  <button 
                    onClick={handleCopy} 
                    className={`findus-copy-btn ${copied ? 'findus-copy-btn--copied' : ''}`}
                    aria-label={copied ? 'Address copied' : 'Copy address to clipboard'}
                  >
                    {copied ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Copy address
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Ornamental Divider */}
              <div className="findus-ornament-divider" aria-hidden="true">
                <span className="findus-ornament-dot" />
                <span className="findus-ornament-line" />
                <span className="findus-ornament-diamond" />
                <span className="findus-ornament-line" />
                <span className="findus-ornament-dot" />
              </div>

              {/* Property Highlights */}
              <div className="findus-highlights">
                <span className="findus-highlights-label">Property Access</span>
                <div className="findus-highlights-grid" data-sanity="locationSection.highlights">
                  {content.highlights.map((highlight) => (
                    <div className="findus-highlight-item" key={highlight}>
                      <span className="findus-highlight-check">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ornamental Divider */}
              <div className="findus-ornament-divider" aria-hidden="true">
                <span className="findus-ornament-dot" />
                <span className="findus-ornament-line" />
                <span className="findus-ornament-diamond" />
                <span className="findus-ornament-line" />
                <span className="findus-ornament-dot" />
              </div>

              {/* Contact Methods */}
              <div className="findus-contact-block">
                <span className="findus-contact-label-text">Get in touch</span>
                <div className="findus-contact-list">
                  <a href={`tel:${content.phone.replace(/\D/g, '')}`} className="findus-contact-link">
                    <div className="findus-contact-link-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="findus-contact-link-text">
                      <span data-sanity="locationSection.phone">{content.phone}</span>
                      <small>Available daily, 8AM – 8PM</small>
                    </div>
                    <svg className="findus-contact-link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  <a href={`mailto:${content.email}`} className="findus-contact-link">
                    <div className="findus-contact-link-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="findus-contact-link-text">
                      <span data-sanity="locationSection.email">{content.email}</span>
                      <small>We respond within 24 hours</small>
                    </div>
                    <svg className="findus-contact-link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Primary CTA */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(content.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="findus-primary-cta"
              >
                <span className="findus-primary-cta-text">Open in Google Maps</span>
                <span className="findus-primary-cta-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
