import './Amenities.css'

interface AmenityData {
  id: number
  name: string
  description: string
  image: string
  icon: string
  span?: 'wide' | 'tall' | 'featured' | 'normal'
}

const amenities: AmenityData[] = [
  {
    id: 1,
    name: 'Resort Pool',
    description: 'Two-tier infinity pools with panoramic views, sun loungers, and poolside service.',
    image: '/pool3.jpg',
    icon: '',
    span: 'featured',
  },
  {
    id: 2,
    name: 'Billiards Room',
    description: 'Professional-grade table for friendly games or evening gatherings.',
    image: '/recreation1.jpg',
    icon: '',
    span: 'tall',
  },
  {
    id: 3,
    name: 'Catering and Events Services',
    description: 'High-speed internet from your cabana to the shoreline.',
    image: '/bdayevent2.jpg',
    icon: '',
    span: 'tall',
  },
  {
    id: 4,
    name: 'Your Favorite Filipino Dishes',
    description: 'Fresh tropical breakfast served daily with local fruits and ocean breezes.',
    image: '/foodmenu1.jpg',
    icon: '',
    span: 'wide',
  },
  {
    id: 5,
    name: 'Air Conditioned Rooms',
    description: 'Signature massages and soothing treatments to restore your energy.',
    image: '/room2.jpg',
    icon: '',
    span: 'normal',
  },
  {
    id: 6,
    name: 'Your Favorite Brews',
    description: 'Curated small plates and drinks served at sunset on the beachfront deck.',
    image: '/matcha1.jpg',
    icon: '',
    span: 'normal',
  },
  {
    id: 7,
    name: 'Night Pools',
    description: 'Shaded lounging with fresh towels and attentive poolside service.',
    image: '/nightpool1.jpg',
    icon: '',
    span: 'normal',
  },
  {
    id: 8,
    name: 'Free wifi',
    description: 'Explore nearby coves and viewpoints with local guide support.',
    image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: '',
    span: 'wide',
  },
]

export default function Amenities() {
  return (
    <section id="amenities" className="amenities-section" aria-label="Amenities">
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

        <div className="bento-grid">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.id}
              className={`bento-card bento-${amenity.span || 'normal'} reveal`}
              style={{ transitionDelay: `${index * 0.07}s` }}
            >
              {amenity.image ? (
                <>
                  <img
                    src={amenity.image}
                    alt={amenity.name}
                    className="bento-img"
                    loading="lazy"
                  />
                  <div className="bento-img-overlay" />
                </>
              ) : (
                <div className="bento-no-img" />
              )}

              <div className="bento-content">
                <span className="bento-icon" aria-hidden="true">{amenity.icon}</span>
                <div>
                  <h3 className="bento-name">{amenity.name}</h3>
                  <p className="bento-desc">{amenity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}