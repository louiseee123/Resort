import './Amenities.css'

interface AmenityData {
  id: number
  name: string
  description: string
  image: string
  featured?: boolean
}

const amenities: AmenityData[] = [
  {
    id: 1,
    name: 'Billiards Room',
    description: 'A refined space with a professional-grade table, perfect for friendly games or evening gatherings.',
    image: 'https://images.unsplash.com/photo-1632432008457-35c2da4e9eaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    name: 'Infinity Pools',
    description: 'Two-tier infinity pools with panoramic ocean views, sun loungers, and poolside service.',
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Breakfast Terrace',
    description: 'Fresh tropical breakfast served daily with local fruits, pastries, and ocean breezes.',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Evening Snacks',
    description: 'Curated small plates and craft cocktails served at sunset on the beachfront deck.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Resort-Wide WiFi',
    description: 'High-speed internet throughout the property, from your cabana to the shoreline.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
]

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="amenities-section"
      aria-label="Amenities"
    >
      {/* Decorative top rule */}
      <div className="amenities-top-rule" aria-hidden="true">
        <span className="rule-line" />
        <span className="rule-diamond">◆</span>
        <span className="rule-line" />
      </div>

      <div className="amenities-container">
        <div className="section-header reveal">
          <span className="section-tag">INDULGE IN COMFORT</span>
          <h2 className="section-title">Resort Amenities</h2>
          <p className="section-subtitle">Every detail designed for your perfect coastal escape</p>
        </div>

        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.id}
              className="amenity-card-wrapper reveal"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="amenity-card">
                {amenity.featured && <span className="amenity-badge">POPULAR</span>}
                <div className="amenity-image">
                  <img src={amenity.image} alt={amenity.name} loading="lazy" />
                  <div className="image-overlay" />
                </div>
                <div className="amenity-content">
                  <h3 className="amenity-title">{amenity.name}</h3>
                  <p className="amenity-description">{amenity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}