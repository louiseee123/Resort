import { useState, useEffect, useCallback } from 'react'
import './App.css'
import HeroSection from './pages/HeroSection'
import AdminReservations from './pages/AdminReservations'
import Amenities from './pages/Amenities'
import Rates from './pages/Rates'
import Packages from './pages/Packages'
import ContactSection from './pages/ContactSection'
import PostsSection from './pages/PostsSection'
import FindUs from './pages/FindUs'



/* ----------------------------------------------------------
   Types
   ---------------------------------------------------------- */
interface RoomData {
  id: number
  name: string
  description: string
  price: string
  guests: string
  image: string
  badge?: string
}

/* ----------------------------------------------------------
   Data
   ---------------------------------------------------------- */
const rooms: RoomData[] = [
  {
    id: 1,
    name: 'Weekday Pool Access',
    description: 'Adults ₱150 · Children (3ft & below) ₱100. Perfect for a relaxed day by the pool.',
    price: '₱150',
    guests: 'Adults',
    image: '/room-ocean.jpg',
    badge: 'WEEKDAY DEAL',
  },
  {
    id: 2,
    name: 'Weekend / Holiday / Night Pool Access',
    description: 'Adults ₱200 · Children (3ft & below) ₱150. Includes on-site pool use for the day or for night access.',
    price: '₱200',
    guests: 'Adults',
    image: '/room-garden.jpg',
    badge: 'POPULAR',
  },
  {
    id: 3,
    name: 'Table Cottage Rentals (Capacity-Based)',
    description: '4–6 people: ₱300 · 10–20 people: ₱500 · 20–30 people: ₱1,000. Choose the cottage size that fits your group.',
    price: '₱300+',
    guests: 'Capacity-based',
    image: '/room-beachfront.jpg',
    badge: 'GROUP FAVORITE',
  },
  {
    id: 4,
    name: 'Day Use Room (10AM–5PM)',
    description: '₱2,500 for up to 10 people. Covers full day use from 10:00 AM to 5:00 PM (subject to availability).',
    price: '₱2,500',
    guests: 'Up to 10 people',
    image: '/room-ocean.jpg',
    badge: 'DAY PASS',
  },
]

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Posts', href: '#posts' },
  { label: 'Rates', href: '#rates' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

/* ----------------------------------------------------------
   Custom hook for scroll-triggered animations
   ---------------------------------------------------------- */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ----------------------------------------------------------
   Alert Component
   ---------------------------------------------------------- */
function Alert({ message, color, onClose }: { message: string; color: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className="alert-slide"
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        background: color,
        color: '#FFFDF7',
        padding: '1rem 2rem',
        borderRadius: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '0.95rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap',
      }}
    >
      {message}
    </div>
  )
}

/* ----------------------------------------------------------
   Booking Modal Component
   ---------------------------------------------------------- */
function BookingModal({
  room,
  isOpen,
  onClose,
  onSubmit,
}: {
  room: RoomData | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (roomName: string, form: {
    checkIn: string
    checkOut: string
    guests: string
    name: string
    email: string
    phone: string
    requests: string
  }) => void
}) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    requests: '',
  })

  if (!isOpen || !room) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(room.name, formData)
    onClose()
    setFormData({ checkIn: '', checkOut: '', guests: '2', name: '', email: '', phone: '', requests: '' })
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        background: 'rgba(0,109,119,0.4)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFDF7',
          border: '2px solid #006D77',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#FF8360',
            color: '#FFFDF7',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#ff6b42' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#FF8360' }}
        >
          ✕
        </button>

        <h3
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '1.5rem',
            color: '#006D77',
            marginBottom: '0.5rem',
          }}
        >
          Reserve {room.name}
        </h3>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            color: '#6B7B7C',
            marginBottom: '1.5rem',
          }}
        >
          {room.price} / night · {room.guests}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-field">
              <label className="form-label">Check-in Date</label>
              <input
                type="date"
                required
                className="form-input"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Check-out Date</label>
              <input
                type="date"
                required
                className="form-input"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Number of Guests</label>
            <input
              type="number"
              min={1}
              max={30}
              required
              className="form-input"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              required
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Special Requests (Optional)</label>
            <textarea
              rows={3}
              className="form-textarea"
              value={formData.requests}
              onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-coral"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------
   Main App Component
   ---------------------------------------------------------- */
export default function App() {
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null)
  const [alert, setAlert] = useState<{ message: string; color: string } | null>(null)

  useScrollReveal()

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > window.innerHeight - 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const openBookingModal = useCallback((room: RoomData) => {
    setSelectedRoom(room)
    setModalOpen(true)
  }, [])

  const handleBookingSubmit = useCallback(
    (roomName: string, form: { checkIn: string; checkOut: string; guests: string; name: string; email: string; phone: string; requests: string }) => {
      const STORAGE_KEY = 'balamban_reservations'
      const now = new Date().toISOString()
      const newReservation = {
        roomName,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests) || 0,
        name: form.name,
        email: form.email,
        phone: form.phone,
        requests: form.requests,
        createdAt: now,
      }
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        const parsed = raw ? (JSON.parse(raw) as unknown[]) : []
        const list = Array.isArray(parsed) ? parsed : []
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, newReservation]))
      } catch { /* storage unavailable */ }
      setAlert({ message: `Booking request received for ${roomName}! We will contact you shortly.`, color: '#2A9D8F' })
    },
    []
  )

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setAlert({ message: "Thank you for your inquiry! We'll be in touch soon.", color: '#2A9D8F' })
    ;(e.target as HTMLFormElement).reset()
  }, [])

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  /* Shared style objects — still used by sub-components via props */
  const coralBtn = {
    display: 'inline-block',
    padding: '1rem 2.5rem',
    borderRadius: '50px',
    background: '#FF8360',
    color: '#FFFDF7',
    border: 'none',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '0.95rem',
    letterSpacing: '0.03em',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  } as React.CSSProperties

  const sectionLabel = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: '#FF8360',
    marginBottom: '0.75rem',
  } as React.CSSProperties

  const sectionHeading = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    color: '#006D77',
    letterSpacing: '-0.01em',
    marginBottom: '0.75rem',
  } as React.CSSProperties

  const sectionSubtitle = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
    color: '#6B7B7C',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  } as React.CSSProperties

  const inputFieldStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '1px solid rgba(0,109,119,0.18)',
    background: '#FFFDF7',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    color: '#1A2B2C',
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
  } as React.CSSProperties

  if (new URLSearchParams(window.location.search).get('key') === 'admin') {
    return <AdminReservations />
  }

  return (
    <div>
      {/* ── Grain texture overlay ── */}
      <div className="grain-overlay" />

      {/* ── Alert ── */}
      {alert && <Alert message={alert.message} color={alert.color} onClose={() => setAlert(null)} />}

      {/* ── Booking Modal ── */}
      <BookingModal room={selectedRoom} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleBookingSubmit} />

      {/* ══════════════════════════════════════════
          HEADER / NAVIGATION
      ══════════════════════════════════════════ */}
      <header
        className={`navbar${headerScrolled ? ' scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: headerScrolled ? '64px' : '80px',
          display: 'flex',
          alignItems: 'center',
          /* Transparent by default; .scrolled class adds the glass effect */
          background: headerScrolled ? 'rgba(0, 109, 119, 0.96)' : 'transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 3rem)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home') }}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '1.25rem',
              color: '#FFFDF7',
              letterSpacing: '-0.01em',
            }}
          >
            Villa Susane
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                style={{ color: '#FDFCDC', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.03em' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger — three animated spans */}
          <button
            className={`mobile-hamburger${mobileMenuOpen ? ' open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <span style={{ background: '#FDFCDC' }} />
            <span style={{ background: '#FDFCDC' }} />
            <span style={{ background: '#FDFCDC' }} />
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(0, 109, 119, 0.97)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                style={{ color: '#FDFCDC', fontWeight: 400, fontSize: '1.1rem' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <HeroSection onLearnMore={() => scrollToSection('#rates')} />

      {/* ══════════════════════════════════════════
          POSTS SECTION
      ══════════════════════════════════════════ */}
      <PostsSection />

      {/* ══════════════════════════════════════════
          RATES SECTION
      ══════════════════════════════════════════ */}
      <Rates rooms={rooms} onBook={openBookingModal} />

      {/* ══════════════════════════════════════════
          AMENITIES SECTION
      ══════════════════════════════════════════ */}
      <Amenities />

      {/* ══════════════════════════════════════════
          FIND US / LOCATION SECTION
      ══════════════════════════════════════════ */}
      <FindUs sectionLabel={sectionLabel} sectionHeading={sectionHeading} />


      {/* ══════════════════════════════════════════
          PACKAGES SECTION
      ══════════════════════════════════════════ */}
      <Packages onAskAboutThis={() => scrollToSection('#contact')} />

      {/* ══════════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════════ */}
      <ContactSection
        coralBtn={coralBtn}
        sectionLabel={sectionLabel}
        sectionHeading={sectionHeading}
        sectionSubtitle={sectionSubtitle}
        inputFieldStyle={inputFieldStyle}
        onSubmit={handleContactSubmit}
      />

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer
        style={{
          background: 'linear-gradient(160deg, #006D77 0%, #004f57 100%)',
          color: '#FDFCDC',
          padding: 'clamp(3rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Footer orb decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,131,96,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="reveal"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            paddingBottom: '3rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '1.5rem', color: '#FFFDF7', marginBottom: '0.5rem' }}>
              Villa Susane Resort
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(253,252,220,0.7)', lineHeight: 1.7 }}>
              Your private escape on the western coast of Cebu.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FF8360', marginBottom: '1rem' }}>
              Contact
            </h4>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(253,252,220,0.8)', marginBottom: '0.5rem', lineHeight: 1.7 }}>
              Abucayan, Balamban, Cebu, Philippines
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(253,252,220,0.8)', marginBottom: '0.5rem' }}>
              +63 (032) 123 4567
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(253,252,220,0.8)' }}>
              reservations@balambanresort.ph
            </p>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FF8360', marginBottom: '1rem' }}>
              Follow Us
            </h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[
                {
                  href: 'https://www.facebook.com/villasusane.roomsnvenue',
                  label: 'Facebook',
                  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                },
                {
                  href: '#',
                  label: 'Instagram',
                  path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
                },
                {
                  href: '#',
                  label: 'Twitter',
                  path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                },
              ].map(({ href, label, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    color: 'rgba(253,252,220,0.8)',
                    transition: 'color 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                    display: 'inline-flex',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#FF8360'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(253,252,220,0.8)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            borderTop: '1px solid rgba(253,252,220,0.12)',
            padding: '1.5rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(253,252,220,0.45)' }}>
            © 2024 Balamban Coastal Resort. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(253,252,220,0.45)' }}>
            Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  )
}