import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

import AdminReservations from './pages/AdminReservations'



/* ============================================================
   Balamban Coastal Resort - Single Page Website
   Stack: React + TypeScript + Vite + Tailwind CSS
   ============================================================ */

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
import Amenities from './pages/Amenities'
import Rates from './pages/Rates'

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

/* Amenities were moved to src/pages/Amenities.tsx */

const navLinks = [
  { label: 'Home', href: '#home' },
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

    const elements = document.querySelectorAll('.reveal')
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

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '1px solid rgba(94,91,82,0.25)',
    background: '#FFFDF7',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    color: '#5E5B52',
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
  } as React.CSSProperties

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
        {/* Close button */}
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
          }}
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
            color: '#5E5B52',
            marginBottom: '1.5rem',
          }}
        >
          {room.price} / night · {room.guests}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
                Check-in Date
              </label>
              <input
                type="date"
                required
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
                Check-out Date
              </label>
              <input
                type="date"
                required
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
              Number of Guests
            </label>
            <input
              type="number"
              min={1}
              max={4}
              required
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
              Phone
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
              Special Requests (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.requests}
              onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '50px',
              background: '#FF8360',
              color: '#FFFDF7',
              border: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              marginTop: '0.5rem',
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget
              t.style.background = '#FF9A7A'
              t.style.transform = 'translateY(-2px)'
              t.style.boxShadow = '0 8px 24px rgba(255,131,96,0.35)'
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget
              t.style.background = '#FF8360'
              t.style.transform = 'translateY(0)'
              t.style.boxShadow = 'none'
            }}
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
  const heroRef = useRef<HTMLElement>(null)

  useScrollReveal()

  /* Header scroll effect */
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > window.innerHeight - 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /* Close modal on ESC key */
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
      // Persist reservations for the admin page (localStorage).
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
        const merged = [...list, newReservation]
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      } catch {
        // If storage is unavailable, still show success alert.
      }

      setAlert({ message: `Booking request received for ${roomName}! We will contact you shortly.`, color: '#2A9D8F' })
    },
    []
  )

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setAlert({ message: "Thank you for your inquiry! We'll be in touch soon.", color: '#2A9D8F' })
    const form = e.target as HTMLFormElement
    form.reset()
  }, [])

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /* Shared styles */
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
    color: '#5E5B52',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  } as React.CSSProperties

  const inputFieldStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '1px solid rgba(94,91,82,0.25)',
    background: '#FFFDF7',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    color: '#5E5B52',
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
  } as React.CSSProperties

  if (new URLSearchParams(window.location.search).get('key') === 'admin') {
    return <AdminReservations />
  }

  return (
    <div>
      {/* ====== ALERT ====== */}
      {alert && <Alert message={alert.message} color={alert.color} onClose={() => setAlert(null)} />}

      {/* ====== BOOKING MODAL ====== */}
      <BookingModal room={selectedRoom} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleBookingSubmit} />

      {/* ====== HEADER / NAVIGATION ====== */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: headerScrolled ? '64px' : '80px',
          background: headerScrolled ? 'rgba(0,109,119,0.95)' : 'transparent',
          backdropFilter: headerScrolled ? 'blur(12px)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, height 0.4s ease',
          display: 'flex',
          alignItems: 'center',
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
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Villa Susane Resort
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: '#FDFCDC',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FF8360' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#FDFCDC' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FDFCDC',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className="mobile-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#006D77',
            overflow: 'hidden',
            maxHeight: mobileMenuOpen ? '400px' : '0px',
            opacity: mobileMenuOpen ? 1 : 0,
            transition: 'max-height 0.4s ease, opacity 0.3s ease',
          }}
        >
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: '#FDFCDC',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ====== HERO SECTION ====== */}
      <section
        id="home"
        ref={heroRef}
        style={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'heroFadeIn 1.2s ease forwards',
          }}
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,109,119,0.60) 0%, rgba(0,109,119,0) 60%)',
            animation: 'heroFadeIn 0.8s ease 0.3s forwards',
            opacity: 0,
          }}
        />
        {/* Hero Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: '0 clamp(2rem, 8vw, 6rem)',
            paddingTop: '80px',
          }}
        >
          <p
            className="hero-label"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#FDFCDC',
              opacity: 0.9,
              marginBottom: '1rem',
            }}
          >
            WELCOME TO
          </p>
          <h1
            className="hero-title"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: '#FFFDF7',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              maxWidth: '700px',
            }}
          >
            Villa Susane Resort
          </h1>
          <p
            className="hero-subtitle"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '1.25rem',
              color: '#FDFCDC',
              opacity: 0.95,
              maxWidth: '500px',
              lineHeight: 1.5,
              marginBottom: '2rem',
            }}
          >
            Your private escape in Abucayan, Balamban, Cebu
          </p>
          <a
            href="#rates"
            onClick={(e) => { e.preventDefault(); scrollToSection('#rates') }}

            className="hero-btn"
            style={coralBtn}
            onMouseEnter={(e) => {
              const t = e.currentTarget
              t.style.background = '#FF9A7A'
              t.style.transform = 'translateY(-2px)'
              t.style.boxShadow = '0 8px 24px rgba(255,131,96,0.35)'
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget
              t.style.background = '#FF8360'
              t.style.transform = 'translateY(0)'
              t.style.boxShadow = 'none'
            }}
          >
            Check Availability
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            animation: 'chevronPulse 2s ease-in-out infinite',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.7 }}>
            <path d="M6 9l6 6 6-6" stroke="#FDFCDC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ====== ABOUT / INTRODUCTION ====== */}
      <section
        style={{
          background: '#FFFDF7',
          padding: 'clamp(4rem, 8vw, 8rem) 1rem',
        }}
      >
        <div
          className="reveal"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <p style={sectionLabel}>DISCOVER</p>
          <h2 style={sectionHeading}>A Sanctuary by the Sea</h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: '#FF8360',
              margin: '1rem auto 2rem',
            }}
          />
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '1.05rem',
              color: '#5E5B52',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            Nestled along the pristine coastline of Abucayan, Balamban, Cebu, our resort offers an
            exclusive retreat where turquoise waters meet lush tropical landscapes. Every detail has been
            thoughtfully crafted to provide an atmosphere of understated luxury and natural harmony.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '1.05rem',
              color: '#5E5B52',
              lineHeight: 1.7,
            }}
          >
            Whether you seek the thrill of ocean adventures or the serenity of a private cabana, Balamban
            Coastal Resort invites you to slow down, breathe deeply, and discover the beauty of coastal
            living at its finest.
          </p>
        </div>
      </section>

      {/* ====== RATES SECTION ====== */}
      <Rates rooms={rooms} onBook={openBookingModal} />

      {/* ====== AMENITIES SECTION ====== */}
      <Amenities />



      {/* ====== LOCATION SECTION ====== */}
      <section
        id="location"
        style={{
          background: '#FFFDF7',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)',
        }}
      >
        <div
          className="location-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left: Text */}
          <div className="reveal">
            <p style={sectionLabel}>FIND US</p>
            <h2 style={{ ...sectionHeading, textAlign: 'left' }}>Where Paradise Meets the Coast</h2>
            <div
              style={{
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '1.25rem',
                  color: '#006D77',
                  marginBottom: '0.25rem',
                }}
              >
                Abucayan, Balamban, Cebu
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '1rem',
                  color: '#5E5B52',
                }}
              >
                Philippines
              </p>
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                color: '#5E5B52',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              Located on the pristine western coast of Cebu, Balamban Coastal Resort offers a secluded
              escape with easy access to local attractions and natural wonders.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#5E5B52', marginBottom: '0.35rem' }}>
                <span style={{ color: '#006D77', fontWeight: 500 }}>Phone:</span> +63 (032) 123 4567
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#5E5B52' }}>
                <span style={{ color: '#006D77', fontWeight: 500 }}>Email:</span> reservations@balambanresort.ph
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Abucayan,Balamban,Cebu,Philippines"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...coralBtn,
                background: 'transparent',
                border: '2px solid #006D77',
                color: '#006D77',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.background = '#006D77'
                t.style.color = '#FFFDF7'
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.background = 'transparent'
                t.style.color = '#006D77'
              }}
            >
              Get Directions
            </a>
          </div>

          {/* Right: Map */}
          <div className="reveal" style={{ animationDelay: '0.2s' }}>
            <div
              style={{
                borderRadius: '16px',
                border: '2px solid #006D77',
                overflow: 'hidden',
                aspectRatio: '4/3',
                background: '#FDFCDC',
                position: 'relative',
              }}
            >
              {/* Embedded Google Maps iframe */}
              <iframe
                title="Balamban Coastal Resort Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15719.85703767554!2d123.723611!3d10.383333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a96f0000000000%3A0x0!2sAbucayan%2C%20Balamban%2C%20Cebu!5e0!3m2!1sen!2sph!4v1700000000000"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====== PACKAGES SECTION ====== */}
      <section
        id="packages"
        style={{
          background: '#FDFCDC',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={sectionLabel}>OFFERS</p>
            <h2 style={sectionHeading}>Curated Stay Packages</h2>
            <p style={sectionSubtitle}>Choose a package and let us handle the details</p>
          </div>

          <div
            className="packages-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                title: 'Romance Retreat',
                description: 'Couples’ escape with breakfast for two, sunset welcome drinks, and late check-out (subject to availability).',
                price: 'From \u20b1 12,900',
                badge: 'POPULAR',
              },
              {
                title: 'Family Fun Getaway',
                description: 'Room for the whole crew with complimentary kids’ activities, family breakfast, and beach picnic setup.',
                price: 'From \u20b1 15,800',
                badge: 'FAMILY',
              },
              {
                title: 'Wellness & Spa Days',
                description: 'Recharge with spa access, rejuvenating treatments, and a calming wellness session each day.',
                price: 'From \u20b1 18,500',
                badge: 'SERENITY',
              },
            ].map((pkg, index) => (
              <div
                key={pkg.title}
                className="reveal"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  style={{
                    background: '#FFFDF7',
                    border: '2px solid #006D77',
                    borderRadius: '16px',
                    padding: '1.75rem 1.5rem',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(-6px)'
                    el.style.borderColor = '#FF8360'
                    el.style.boxShadow = '0 18px 40px rgba(255,131,96,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(0)'
                    el.style.borderColor = '#006D77'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {pkg.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: '#2A9D8F',
                        color: '#FFFDF7',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '50px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {pkg.badge}
                    </span>
                  )}

                  <h3
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.35rem',
                      color: '#006D77',
                      marginBottom: '0.5rem',
                      paddingRight: pkg.badge ? '6rem' : 0,
                    }}
                  >
                    {pkg.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                      color: '#5E5B52',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flex: 1,
                    }}
                  >
                    {pkg.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.35rem',
                        color: '#FF8360',
                      }}
                    >
                      {pkg.price}
                    </span>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('#contact')
                      }}
                      style={{
                        ...coralBtn,
                        padding: '0.8rem 1.6rem',
                        fontSize: '0.9rem',
                        flexShrink: 0,
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        const t = e.currentTarget
                        t.style.background = '#FF9A7A'
                        t.style.transform = 'translateY(-2px)'
                        t.style.boxShadow = '0 8px 24px rgba(255,131,96,0.35)'
                      }}
                      onMouseLeave={(e) => {
                        const t = e.currentTarget
                        t.style.background = '#FF8360'
                        t.style.transform = 'translateY(0)'
                        t.style.boxShadow = 'none'
                      }}
                    >
                      Ask About This
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CONTACT / BOOKING INQUIRY ====== */}
      <section
        id="contact"
        style={{
          background: '#FDFCDC',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>

          {/* Section Header */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={sectionLabel}>CONNECT</p>
            <h2 style={sectionHeading}>Get in Touch</h2>
            <p style={sectionSubtitle}>Have questions? Send us a message and we'll respond within 24 hours.</p>
          </div>

          {/* Contact Form */}
          <form className="reveal" onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              className="form-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.25rem',
              }}
            >
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
                  Name
                </label>
                <input type="text" name="name" required placeholder="Your full name" style={inputFieldStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
                  Email
                </label>
                <input type="email" name="email" required placeholder="your@email.com" style={inputFieldStyle} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
                Phone
              </label>
              <input type="tel" name="phone" required placeholder="+63 912 345 6789" style={inputFieldStyle} />
            </div>

            <div
              className="form-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.25rem',
              }}
            >
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
                  Check-in Date
                </label>
                <input type="date" name="checkIn" required style={inputFieldStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
                  Check-out Date
                </label>
                <input type="date" name="checkOut" required style={inputFieldStyle} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#006D77', marginBottom: '0.4rem' }}>
                Message
              </label>
              <textarea name="message" rows={4} placeholder="Tell us about your ideal stay..." style={{ ...inputFieldStyle, resize: 'vertical' }} />
            </div>

            <button
              type="submit"
              style={{
                ...coralBtn,
                width: '100%',
                padding: '1.125rem',
                fontSize: '1rem',
                marginTop: '0.5rem',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.background = '#FF9A7A'
                t.style.transform = 'translateY(-2px)'
                t.style.boxShadow = '0 8px 24px rgba(255,131,96,0.35)'
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.background = '#FF8360'
                t.style.transform = 'translateY(0)'
                t.style.boxShadow = 'none'
              }}
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer
        style={{
          background: '#006D77',
          color: '#FDFCDC',
          padding: 'clamp(3rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem) 0',
        }}
      >
        <div
          className="reveal"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            paddingBottom: '3rem',
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <h3
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: '1.5rem',
                color: '#FFFDF7',
                marginBottom: '0.5rem',
              }}
            >
              Villa Susane Resort
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '0.9rem',
                color: 'rgba(253,252,220,0.8)',
              }}
            >
              Your private escape in Cebu
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#FF8360',
                marginBottom: '1rem',
              }}
            >
              Contact
            </h4>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#FDFCDC', marginBottom: '0.5rem', lineHeight: 1.6 }}>
              Abucayan, Balamban, Cebu, Philippines
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#FDFCDC', marginBottom: '0.5rem' }}>
              +63 (032) 123 4567
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#FDFCDC' }}>
              reservations@balambanresort.ph
            </p>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#FF8360',
                marginBottom: '1rem',
              }}
            >
              Follow Us
            </h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                style={{ color: '#FDFCDC', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FF8360' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#FDFCDC' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                style={{ color: '#FDFCDC', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FF8360' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#FDFCDC' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="#"
                aria-label="Twitter"
                style={{ color: '#FDFCDC', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FF8360' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#FDFCDC' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            borderTop: '1px solid rgba(253,252,220,0.2)',
            padding: '1.5rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(253,252,220,0.6)' }}>
            © 2024 Balamban Coastal Resort. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(253,252,220,0.6)' }}>
            Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  )
}
