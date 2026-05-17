export type RateRoom = {
  id: number
  name: string
  description: string
  price: string
  guests: string
  image: string
  badge?: string
  priceRows?: { label: string; price: string; note?: string }[]
  inclusions?: { icon: string; label: string; value: string }[]
  images?: { url: string; label: string }[]
}

import { useState } from 'react'
import './Rates.css'

export default function Rates({
  rooms,
  onBook,
}: {
  rooms: RateRoom[]
  onBook: (room: RateRoom) => void
}) {
  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>({})

  // Room data with carousel images and inclusions
  const hotelRooms: RateRoom[] = [
    {
      id: 101,
      name: 'Rooms Pool View',
      description: 'Wake to the sound of gentle waves in our signature cabana.',
      price: '₱5,000',
      guests: '10 guests',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: '10 PAX',
      images: [
        { url: '/room2.jpg', label: 'King Bed' },
        { url: '/roomterrace1.jpg ', label: 'Pool-side Terrace' },
        { url: '/bedroom4.jpg', label: 'Mixed King Bed and Bunk Beds' },
      ],
      inclusions: [
        { icon: '', label: 'Bed', value: 'King Bed/Bunk Bed' },
        { icon: '', label: 'Bath', value: 'Hot/Cold Shower' },
        { icon: '', label: 'Room Type', value: 'Family Room' },
        { icon: '', label: 'Check-in/out', value: '2:00 PM - 12:00 PM' },
      ],
    },
    {
      id: 103,
      name: 'Day Use Room',
      description: 'A comfortable room option for daytime visits and small group rest breaks.',
      price: 'PHP 2,500',
      guests: 'Up to 10 guests',
      image: '/room-ocean.jpg',
      badge: '10AM-5PM',
      images: [
        { url: '/rooms1.jpg', label: 'Day Use Room' },
        { url: '/balcony1.jpg', label: 'Relaxing Balcony' },
        { url: '/pool.jpg', label: 'Pool Access Nearby' },
      ],
      inclusions: [
        { icon: '', label: 'Use Time', value: '10:00 AM - 5:00 PM' },
        { icon: '', label: 'Guests', value: 'Up to 10 people' },
        { icon: '', label: 'Rate', value: 'PHP 2,500' },
        { icon: '', label: 'Availability', value: 'Subject to schedule' },
      ],
    },
    {
      id: 102,
      name: 'Standard Room',
      description: 'Nestled among tropical gardens with a private terrace.',
      price: 'PHP 2,500',
      guests: '2-4 guests',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: '2-4 PAX',
      images: [
        { url: '/bed1.jpg', label: 'Queen Bed' },
        { url: '/roombathroom1.jpg', label: 'Hot and Cold Showers' },
        { url: '/bedroom2.jpg', label: 'Queen Bed' },
      ],
      inclusions: [
       { icon: '', label: 'Bed', value: 'Queen Sized Bed' },
        { icon: '', label: 'Bath', value: 'Hot/Cold Shower' },
        { icon: '', label: 'Room Type', value: 'Standard Room' },
        { icon: '', label: 'Check-in/out', value: '2:00 PM - 12:00 PM' },
      ],
    }
    
    
  ]

  const nextImage = (roomId: number, imagesLength: number) => {
    setActiveImageIndex((prev) => {
      const current = prev[roomId] ?? 0
      return { ...prev, [roomId]: (current + 1) % imagesLength }
    })
  }

  const prevImage = (roomId: number, imagesLength: number) => {
    setActiveImageIndex((prev) => {
      const current = prev[roomId] ?? 0
      return { ...prev, [roomId]: (current - 1 + imagesLength) % imagesLength }
    })
  }

  return (
    <section id="rates" className="rates-section">
      <div className="rates-container">
        {/* ── Walk-in Rates ── */}
        <div className="section-header reveal">
          <span className="section-tag">PRICING & ACCESS</span>
          <h2 className="section-title">Walk-In Rates</h2>
          <p className="section-subtitle">
            On-site rates vary by weekday, weekend & holiday access, time of day, and cottage or table capacity. No booking required.
          </p>
        </div>

        <div className="walkin-rates-grid reveal">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`walkin-rate-card ${room.badge ? 'walkin-rate-card--featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="walkin-rate-content">
                <div className="walkin-rate-header">
                  <div>
                    <h3 className="walkin-rate-name">{room.name}</h3>
                    <span className="walkin-rate-guests">{room.guests}</span>
                  </div>
                  {room.badge && <span className="walkin-rate-badge">{room.badge}</span>}
                </div>
                <p className="walkin-rate-description">{room.description}</p>
                <div className="walkin-price-list">
                  {(room.priceRows || [{ label: 'Rate', price: room.price }]).map((row) => (
                    <div className="walkin-price-row" key={`${room.id}-${row.label}`}>
                      <div>
                        <span className="walkin-price-label">{row.label}</span>
                        {row.note && <span className="walkin-price-note">{row.note}</span>}
                      </div>
                      <span className="walkin-rate-price">{row.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        

        {/* ── Room Cards ── */}
        <div className="hotel-rooms-section">
          <div className="section-header reveal">
            <span className="section-tag">STAY WITH US</span>
            <h2 className="section-title">Rooms</h2>
          </div>

          <div className="room-grid">
            {hotelRooms.map((room, idx) => {
              const current = activeImageIndex[room.id] ?? 0
              const images = room.images || []
              const imagesCount = images.length || 1

              return (
                <div
                  key={room.id}
                  className="room-card reveal"
                  style={{ animationDelay: `${idx * 0.12}s` }}
                >
                  {/* Image Carousel */}
                  <div className="room-carousel">
                    <div className="room-carousel-viewport">
                      <div
                        className="room-carousel-track"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                      >
                        {images.map((img, imgIndex) => (
                          <div key={imgIndex} className="room-carousel-slide">
                            <img
                              src={img.url}
                              alt={img.label}
                              className="room-carousel-image"
                              loading="lazy"
                            />
                            <div className="room-carousel-overlay">
                              <span className="room-carousel-label">{img.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Badge */}
                    {room.badge && <span className="room-badge">{room.badge}</span>}

                    {/* Arrows */}
                    {imagesCount > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.preventDefault(); prevImage(room.id, imagesCount) }}
                          className="room-carousel-arrow room-carousel-arrow-left"
                          aria-label="Previous image"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); nextImage(room.id, imagesCount) }}
                          className="room-carousel-arrow room-carousel-arrow-right"
                          aria-label="Next image"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        {/* Dots */}
                        <div className="room-carousel-dots">
                          {images.map((_, dotIndex) => (
                            <button
                              key={dotIndex}
                              onClick={(e) => {
                                e.preventDefault()
                                setActiveImageIndex((prev) => ({ ...prev, [room.id]: dotIndex }))
                              }}
                              className={`room-carousel-dot ${dotIndex === current ? 'room-carousel-dot-active' : ''}`}
                              aria-label={`Go to image ${dotIndex + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="room-card-content">
                    <h3 className="room-card-title">{room.name}</h3>
                    <p className="room-card-description">{room.description}</p>

                    {/* Price & Guests */}
                    <div className="room-card-meta">
                      <div className="room-card-price">
                        <span className="room-price-amount">{room.price}</span>
                        <span className="room-price-period">/ night</span>
                      </div>
                      <span className="room-card-guests">{room.guests}</span>
                    </div>

                    {/* Inclusions */}
                    {room.inclusions && (
                      <div className="room-inclusions">
                        {room.inclusions.map((item, i) => (
                          <div key={i} className="inclusion-item">
                            <span className="inclusion-icon">{item.icon}</span>
                            <div className="inclusion-text">
                              <span className="inclusion-label">{item.label}</span>
                              <span className="inclusion-value">{item.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button className="book-button" onClick={() => onBook(room)}>
                      <span>Inquire</span>
                      <svg className="button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
