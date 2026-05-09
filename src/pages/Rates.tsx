export type RateRoom = {
  id: number
  name: string
  description: string
  price: string
  guests: string
  image: string
  badge?: string
}

import './Rates.css'

export default function Rates({
  rooms,
  onBook,
}: {
  rooms: RateRoom[]
  onBook: (room: RateRoom) => void
}) {

  const hotelRooms = [
    {
      id: 101,
      name: 'Ocean View Cabana',
      description: 'Wake to the sound of gentle waves in our signature cabana. Features a private deck, king-size bed, and panoramic ocean views.',
      price: '₱3,500',
      guests: '2 guests',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 102,
      name: 'Garden Suite',
      description: 'Nestled among tropical gardens, this spacious suite offers tranquility and comfort with a private terrace and rainfall shower.',
      price: '₱2,800',
      guests: '2 guests',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 103,
      name: 'Beachfront Room for Two',
      description: 'Steps from the shore, this intimate room puts you right on the sand. Perfect for couples seeking a private beach escape.',
      price: '₱2,000',
      guests: '2 guests',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'BEST VALUE',
    },
  ]

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
                <div className="walkin-rate-info">
                  <div className="walkin-rate-header">
                    <h3 className="walkin-rate-name">{room.name}</h3>
                    {room.badge && <span className="walkin-rate-badge">{room.badge}</span>}
                  </div>
                  <span className="walkin-rate-guests">{room.guests}</span>
                </div>
                <div className="walkin-rate-price-block">
                  <span className="walkin-rate-price">{room.price}</span>
                  <span className="walkin-rate-period">per entry</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="section-divider reveal" aria-hidden="true">
          <span className="divider-line" />
          <span className="divider-icon">✦</span>
          <span className="divider-line" />
        </div>

        {/* ── Cabanas & Suites ── */}
        <div className="hotel-rooms-section">
          <div className="section-header reveal">
            <span className="section-tag">STAY WITH US</span>
            <h2 className="section-title">Cabanas & Suites</h2>
          </div>

          <div className="room-grid">
            {hotelRooms.map((room, index) => (
              <div
                key={room.id}
                className="room-card-wrapper reveal"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <div className="room-card">
                  {room.badge && <span className="room-badge">{room.badge}</span>}
                  <div className="room-image">
                    <img src={room.image} alt={room.name} loading="lazy" />
                    <div className="image-overlay" />
                  </div>
                  <div className="room-content">
                    <h3 className="room-title">{room.name}</h3>
                    <p className="room-description">{room.description}</p>
                    <div className="room-meta">
                      <div className="room-price">
                        <span className="price-amount">{room.price}</span>
                        <span className="price-period"> / night</span>
                      </div>
                      <div className="room-guests">{room.guests}</div>
                    </div>
                    <button className="book-button" onClick={() => onBook(room)}>
                      <span>Reserve</span>
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

      </div>
    </section>
  )
}