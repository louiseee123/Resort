import './FindUs.css'

export default function FindUs() {
  return (
    <section id="location" className="findus-section" aria-label="Location">
      {/* Decorative top rule */}
      <div className="findus-top-rule" aria-hidden="true">
        <span className="rule-line" />
        <span className="rule-diamond">◆</span>
        <span className="rule-line" />
      </div>

      <div className="findus-container">
        <div className="section-header reveal">
          <span className="section-tag">FIND US</span>
          <h2 className="section-title">Where Paradise Meets the Coast</h2>
        </div>

        <div className="findus-grid reveal">
          {/* Left: Map */}
          <div className="findus-map-wrapper">
            <iframe
              title="Villa Susane Resort Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.20600457358546!2d123.71970162668845!3d10.477310025899227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9091328822d3d%3A0xd37afc461fcc0b42!2sVilla%20Susane%20Events%20Place!5e0!3m2!1sen!2sus!4v1778309544937!5m2!1sen!2sus"
              className="findus-map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right: Details */}
          <div className="findus-details">
            <div className="findus-address">
              <div className="findus-address-line">
                <svg className="findus-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <p className="findus-place">Abucayan, Balamban, Cebu</p>
                  <p className="findus-country">Philippines</p>
                </div>
              </div>
            </div>

            <p className="findus-description">
              Located on the pristine western coast of Cebu, Villa Susane offers a secluded escape with easy access to local attractions and natural wonders.
            </p>

            <div className="findus-contact">
              <a href="tel:+630321234567" className="findus-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +63 (032) 123 4567
              </a>
              <a href="mailto:reservations@balambanresort.ph" className="findus-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                reservations@balambanresort.ph
              </a>
            </div>

            <a
              href="https://maps.google.com/?q=Abucayan,Balamban,Cebu,Philippines"
              target="_blank"
              rel="noopener noreferrer"
              className="findus-button"
            >
              <span>Get Directions</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}