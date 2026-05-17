import { useRef, useState } from 'react'

import './ContactSection.css'

type PackageInquiry = {
  packageName: string
  eventType: string
  guestCount: string
  eventDate: string
  name: string
  phone: string
  email: string
  notes: string
}

type GeneralInquiry = {
  email: string
  message: string
}

function formatDisplayDate(value: string) {
  if (!value) return 'Flexible / to be discussed'

  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

const initialInquiry: PackageInquiry = {
  packageName: '',
  eventType: '',
  guestCount: '',
  eventDate: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
}

const initialGeneralInquiry: GeneralInquiry = {
  email: '',
  message: '',
}

export default function ContactSection({
  coralBtn,
  sectionLabel,
  sectionHeading,
  sectionSubtitle,
  inputFieldStyle,
}: {
  coralBtn: React.CSSProperties
  sectionLabel: React.CSSProperties
  sectionHeading: React.CSSProperties
  sectionSubtitle: React.CSSProperties
  inputFieldStyle: React.CSSProperties
}) {
  const [formData, setFormData] = useState<PackageInquiry>(initialInquiry)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const dateInputRef = useRef<HTMLInputElement>(null)

  const [generalInquiry, setGeneralInquiry] = useState<GeneralInquiry>(initialGeneralInquiry)
  const [generalSending, setGeneralSending] = useState(false)
  const [generalMessage, setGeneralMessage] = useState('')

  // These props are currently reserved for future styling tweaks.
  void coralBtn
  void sectionLabel
  void sectionHeading
  void sectionSubtitle
  void inputFieldStyle

  const updateField = (field: keyof PackageInquiry, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setFormMessage('')
  }

  const handleReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setReviewOpen(true)
  }

  const openDatePicker = () => {
    const dateInput = dateInputRef.current as (HTMLInputElement & { showPicker?: () => void }) | null
    if (!dateInput) return

    dateInput.focus()
    dateInput.showPicker?.()
  }

  const closeReview = () => {
    if (!isSending) setReviewOpen(false)
  }

  const sendInquiry = async () => {
    setIsSending(true)
    setFormMessage('')

    const payload = new FormData()
    payload.append('subject', `${formData.packageName} Package Inquiry!`)
    payload.append('Package of Interest', formData.packageName)
    payload.append('Event Type', formData.eventType)
    payload.append('Approximate Guests', formData.guestCount)
    payload.append('Preferred Event Date', formatDisplayDate(formData.eventDate))
    payload.append('Full Name', formData.name)
    payload.append('Phone', formData.phone)
    payload.append('Email', formData.email)
    payload.append('Event Notes', formData.notes || 'None')

    try {
      const response = await fetch('https://formspree.io/f/mlgvrkjd', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Unable to send inquiry.')

      setFormData(initialInquiry)
      setReviewOpen(false)
      setFormMessage('Package inquiry sent. We will reply with availability and next steps.')
    } catch {
      setFormMessage('We could not send the inquiry right now. Please try again in a moment.')
    } finally {
      setIsSending(false)
    }
  }

  const sendGeneralInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setGeneralSending(true)
    setGeneralMessage('')

    const payload = new FormData()
    payload.append('subject', 'Resort Question/Inquiry')
    payload.append('Email', generalInquiry.email)
    payload.append('Message', generalInquiry.message)

    try {
      const response = await fetch('https://formspree.io/f/mlgvrkjd', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Unable to send inquiry.')

      setGeneralInquiry(initialGeneralInquiry)
      setGeneralMessage('Message sent. We will get back to you soon.')
    } catch {
      setGeneralMessage('We could not send the message right now. Please try again in a moment.')
    } finally {
      setGeneralSending(false)
    }
  }

  return (
    <section id="contact" className="contact-section" aria-label="Package inquiry">
      <div className="contact-container contact-container--split">
        <div className="section-header reveal">
          <span className="section-tag">PACKAGE INQUIRY</span>
          <h2 className="section-title">Tell Us About Your Event</h2>
          <p className="section-subtitle">Share the first few details and we will help shape the right package with you.</p>
        </div>

        <div className="split-layout">
          {/* Left Panel - Contact Details */}
          <div className="contact-left-column">
            <div className="contact-info-panel reveal">
              <div className="contact-info-header">
                <span className="contact-info-badge">CONTACT DIRECTLY</span>
                <h3 className="contact-info-title">Reach us anytime</h3>
                <p className="contact-info-desc">Prefer to talk first? We're just a message or call away.</p>
              </div>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 16.92V19.92C22.0011 20.3985 21.8841 20.869 21.661 21.2875C21.4379 21.706 21.1168 22.0578 20.727 22.3097C20.3372 22.5616 19.8912 22.7052 19.432 22.7262C18.9728 22.7473 18.5156 22.6451 18.105 22.43C15.1985 20.9389 12.7354 18.645 10.97 15.73C10.7549 15.3223 10.6514 14.868 10.6696 14.4118C10.6877 13.9555 10.8268 13.511 11.07 13.12L13 10.06C13.1429 9.82736 13.3394 9.63364 13.5725 9.49616C13.8056 9.35868 14.0681 9.28157 14.337 9.2716C14.6059 9.26164 14.873 9.31918 15.1149 9.43912C15.3568 9.55907 15.566 9.73773 15.724 9.958L17.93 12.991C18.0888 13.2121 18.1931 13.4684 18.2342 13.7385C18.2753 14.0087 18.252 14.2849 18.166 14.544C17.9029 15.2982 17.5105 16.001 17.01 16.62C16.9302 16.7377 16.8734 16.8697 16.8429 17.0089C16.8124 17.1481 16.8088 17.2919 16.8324 17.4324C16.856 17.5729 16.9062 17.7077 16.98 17.8296C17.0538 17.9516 17.1499 18.0585 17.263 18.145C17.3644 18.2198 17.4553 18.3056 17.534 18.4C17.7907 18.7172 17.98 19.0816 18.09 19.472C18.1059 19.523 18.1178 19.5753 18.1255 19.6284C18.1332 19.6815 18.1366 19.7353 18.1355 19.7892C18.1344 19.843 18.129 19.8966 18.1193 19.9494C18.1096 20.0022 18.0957 20.054 18.0779 20.1041"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 2C12.848 2.00117 13.6906 2.12632 14.5 2.37M20.8 6.6C21.628 7.866 22.1391 9.31892 22.28 10.83M19.83 4.15C18.0572 2.41947 15.6964 1.41658 13.19 1.31M21 16C20.9986 15.1512 20.8716 14.3079 20.623 13.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <span className="contact-info-label">Phone / Viber</span>
                    <strong className="contact-info-value">0929 479 9835</strong>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <span className="contact-info-label">Email</span>
                    <strong className="contact-info-value">balambanbooking@gmail.com</strong>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9 6H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="contact-info-content">
                    <span className="contact-info-label">Facebook Page</span>
                    <strong className="contact-info-value">facebook.com/villasusane.roomsnvenue</strong>
                  </div>
                </div>
              </div>

              <div className="contact-info-footer">
                <p>
                  Response within <strong>24 hours</strong>
                </p>
              </div>
            </div>

            {/* Inquiry Card (General Questions) */}
            <div className="contact-inquiry-card reveal">
              <div className="contact-inquiry-header">
                <h3 className="contact-inquiry-title">Got questions? reach us through here</h3>
                <p className="contact-inquiry-desc">Send a quick message and we’ll get back to you.</p>
              </div>

              <form className="contact-inquiry-form" onSubmit={sendGeneralInquiry}>
                <div className="contact-inquiry-field">
                  <label className="form-label" htmlFor="inquiryEmail">
                    Email
                  </label>
                  <input
                    id="inquiryEmail"
                    type="email"
                    className="form-input"
                    value={generalInquiry.email}
                    onChange={(event) => setGeneralInquiry((cur) => ({ ...cur, email: event.target.value }))}
                    required
                    placeholder="you@email.com"
                  />
                </div>

                <div className="contact-inquiry-field">
                  <label className="form-label" htmlFor="inquiryMessage">
                    Message
                  </label>
                  <textarea
                    id="inquiryMessage"
                    className="form-input form-textarea"
                    value={generalInquiry.message}
                    onChange={(event) => setGeneralInquiry((cur) => ({ ...cur, message: event.target.value }))}
                    required
                    rows={4}
                    placeholder="Your questions..."
                  />
                </div>

                <button type="submit" className="submit-button contact-inquiry-submit" disabled={generalSending}>
                  <span>{generalSending ? 'Sending...' : 'Send Message'}</span>
                </button>

                {generalMessage && <p className="contact-inquiry-message">{generalMessage}</p>}
              </form>
            </div>
          </div>

          {/* Right Panel - Form */}
          <form className="contact-form package-inquiry-form reveal" onSubmit={handleReview}>
            <div className="form-intro package-form-intro">
              <div>
                <span className="form-intro-step">Event details</span>
                <p>Share the basics and we will recommend the next step.</p>
              </div>
              <div className="package-form-pill">No commitment yet</div>
            </div>

            <div className="package-form-band">
              <div className="form-row package-top-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="packageName">
                    Package of Interest
                  </label>
                  <select
                    id="packageName"
                    name="Package of Interest"
                    className="form-input form-select"
                    value={formData.packageName}
                    onChange={(event) => updateField('packageName', event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select package
                    </option>
                    <option value="Phase 1 Area Package">Phase 1 Area Package</option>
                    <option value="Food Package with Pool Access">Food Package with Pool Access</option>
                    <option value="All-in-One Event Package">All-in-One Event Package</option>
                    <option value="Grand Celebration Package">Grand Celebration Package</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="eventDate">
                    Preferred Event Date
                  </label>
                  <div className="package-date-shell">
                    <input
                      ref={dateInputRef}
                      id="eventDate"
                      type="date"
                      name="Preferred Event Date"
                      className="form-input package-date-input"
                      value={formData.eventDate}
                      onChange={(event) => updateField('eventDate', event.target.value)}
                    />
                    <button
                      type="button"
                      className="package-date-button"
                      onClick={openDatePicker}
                      aria-label="Open event date picker"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
                        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="eventType">
                    Event Type
                  </label>
                  <input
                    id="eventType"
                    type="text"
                    name="Event Type"
                    required
                    placeholder="Birthday, reunion, christening..."
                    className="form-input"
                    value={formData.eventType}
                    onChange={(event) => updateField('eventType', event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="guestCount">
                    Approximate Guests
                  </label>
                  <select
                    id="guestCount"
                    name="Approximate Guests"
                    className="form-input form-select"
                    value={formData.guestCount}
                    onChange={(event) => updateField('guestCount', event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option value="10-20 people">10-20 people</option>
                    <option value="20-30 people">20-30 people</option>
                    <option value="30-50 people">30-50 people</option>
                    <option value="50-100 people">50-100 people</option>
                    <option value="100+ people">100+ people</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="package-form-band package-form-band--quiet">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="Full Name"
                    required
                    placeholder="Juan Dela Cruz"
                    className="form-input"
                    value={formData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="Phone"
                    required
                    placeholder="+63 912 345 6789"
                    className="form-input"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="Email"
                  required
                  placeholder="juan@email.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Anything We Should Know?
                </label>
                <textarea
                  id="message"
                  name="Event Notes"
                  rows={4}
                  placeholder="Preferred setup, food needs, program flow, or early questions..."
                  className="form-input form-textarea"
                  value={formData.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                />
              </div>
            </div>

            {formMessage && <p className="package-form-message">{formMessage}</p>}

            <div className="form-footer package-form-footer">
              <p className="form-note">You will review these details before anything is sent.</p>
            </div>

            <button type="submit" className="submit-button">
              <span>Review Package Inquiry</span>
              <svg className="button-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>

        {reviewOpen && (
          <div className="package-review-shell" onClick={closeReview}>
            <div className="package-review-modal" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="package-review-close"
                onClick={closeReview}
                aria-label="Close package inquiry review"
              >
                x
              </button>

              <span className="form-intro-step">Review details</span>
              <h3>Package Inquiry Preview</h3>
              <p className="package-review-copy">Confirm the event basics below before we send them to Villa Susane.</p>

              <div className="package-review-highlight">
                <span>Selected package</span>
                <strong>{formData.packageName}</strong>
                <small>
                  {formData.eventType} · {formData.guestCount}
                </small>
              </div>

              <div className="package-review-grid">
                {[
                  ['Event date', formatDisplayDate(formData.eventDate)],
                  ['Guest name', formData.name],
                  ['Phone', formData.phone],
                  ['Email', formData.email],
                ].map(([label, value]) => (
                  <div className="package-review-item" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              {formData.notes && (
                <div className="package-review-note">
                  <span>Notes</span>
                  <p>{formData.notes}</p>
                </div>
              )}

              {formMessage && <p className="package-form-message">{formMessage}</p>}

              <div className="package-review-actions">
                <button
                  type="button"
                  className="package-review-secondary"
                  onClick={() => setReviewOpen(false)}
                  disabled={isSending}
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  className="submit-button package-review-submit"
                  onClick={sendInquiry}
                  disabled={isSending}
                >
                  <span>{isSending ? 'Sending...' : 'Send Inquiry'}</span>
                  {!isSending && (
                    <svg className="button-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

