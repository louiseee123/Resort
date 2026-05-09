import './ContactSection.css'

export default function ContactSection({
  coralBtn: _coralBtn,
  sectionLabel: _sectionLabel,
  sectionHeading: _sectionHeading,
  sectionSubtitle: _sectionSubtitle,
  inputFieldStyle: _inputFieldStyle,
  onSubmit,
}: {
  coralBtn: React.CSSProperties
  sectionLabel: React.CSSProperties
  sectionHeading: React.CSSProperties
  sectionSubtitle: React.CSSProperties
  inputFieldStyle: React.CSSProperties
  onSubmit: (e: React.FormEvent) => void
}) {

  return (
    <section id="contact" className="contact-section" aria-label="Contact">
      <div className="contact-container">
        <div className="section-header reveal">
          <span className="section-tag">GET IN TOUCH</span>
          <h2 className="section-title">Plan Your Stay</h2>
          <p className="section-subtitle">Tell us what you're dreaming of. We'll handle the details.</p>
        </div>

        <div className="contact-grid reveal">
          {/* Contact form */}
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input id="name" type="text" name="name" required placeholder="Juan Dela Cruz" className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input id="email" type="email" name="email" required placeholder="juan@email.com" className="form-input" />
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input id="phone" type="tel" name="phone" required placeholder="+63 912 345 6789" className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="guests">Number of Guests</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <select id="guests" name="guests" className="form-input form-select" defaultValue="">
                    <option value="" disabled>Select guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="checkIn">
                  <svg className="label-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Check-in Date
                </label>
                <input id="checkIn" type="date" name="checkIn" required className="form-input form-date" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="checkOut">
                  <svg className="label-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Check-out Date
                </label>
                <input id="checkOut" type="date" name="checkOut" required className="form-input form-date" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Special Requests</label>
              <div className="input-wrapper">
                <svg className="input-icon textarea-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <textarea id="message" name="message" rows={3} placeholder="Any special requests or preferences..." className="form-input form-textarea" />
              </div>
            </div>

            <div className="form-footer">
              <p className="form-note">
                We typically respond within 24 hours.
              </p>
              <div className="form-contact-inline">
                <span>Or reach us directly:</span>
                <a href="tel:+639123456789" className="inline-contact-link">+63 912 345 6789</a>
                <span className="inline-separator">·</span>
                <a href="mailto:hello@balambanresort.ph" className="inline-contact-link">hello@balambanresort.ph</a>
              </div>
            </div>

            <button type="submit" className="submit-button">
              <span>Send Inquiry</span>
              <svg className="button-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}