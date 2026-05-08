import type { ReactNode } from 'react'
import './Amenities.css'

interface AmenityData {
  id: number
  name: string
  description: string
  icon: ReactNode
  featured?: boolean
}

const amenities: AmenityData[] = [
  {
    id: 1,
    name: 'Free WiFi',
    description: 'Stay connected throughout the resort.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path
          d="M24 36c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-9.9-7c.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0C7.1 27.8 4 23.2 4 18c0-1.1.9-2 2-2s2 .9 2 2c0 3.9 2.4 7.6 6.1 10zm19.8 0c3.7-2.4 6.1-6.1 6.1-10 0-1.1.9-2 2-2s2 .9 2 2c0 5.2-3.1 9.8-7.3 12.6-.8.6-1.9.5-2.6-.3-.7-.8-.6-2 .2-2.7-.3.1-.4.3-.4.4zM14.5 22c.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0C9 22.3 8 20.2 8 18c0-1.1.9-2 2-2s2 .9 2 2c0 1.4.5 2.7 1.5 3.7v.3zm19 0c1-.9 1.5-2.3 1.5-3.7 0-1.1.9-2 2-2s2 .9 2 2c0 2.2-1 4.3-2.7 5.8-.8.6-1.9.5-2.6-.3-.7-.8-.6-2 .2-2.7-.1.1-.2.2-.4.2-.1.7-.4.7-.4.7zM24 28c-1.1 0-2-.9-2-2 0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Infinity Pool',
    description: 'Swim with endless ocean views.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path
          d="M8 28c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm32 6c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM24 32c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
          fill="currentColor"
        />
        <path
          d="M4 36c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2v4c-4 0-4 2-8 2s-4-2-8-2-4 2-8 2-4-2-8-2v-4z"
          fill="currentColor"
        />
      </svg>
    ),
    featured: true,
  },
  {
    id: 3,
    name: 'Beach Front',
    description: 'Direct access to pristine white sand.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="32" cy="14" r="6" fill="currentColor" />
        <path
          d="M4 38h40c0-6.6-5.4-12-12-12-3.8 0-7.2 1.8-9.4 4.6C21.4 26.6 19.6 26 18 26c-4.4 0-8 3.6-8 8v4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Restaurant',
    description: 'Fresh local cuisine with ocean views.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path
          d="M12 8v18c0 2.2 1.8 4 4 4s4-1.8 4-4V8h-2v18c0 1.1-.9 2-2 2s-2-.9-2-2V8h-2z"
          fill="currentColor"
        />
        <path
          d="M20 8v12c0 3.3 2.7 6 6 6v14h2V26c3.3 0 6-2.7 6-6V8h-2v12c0 2.2-1.8 4-4 4s-4-1.8-4-4V8h-4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Spa & Wellness',
    description: 'Rejuvenate with tropical treatments.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path
          d="M24 4c-2 4-8 12-8 18 0 5 3 10 8 10s8-5 8-10c0-6-6-14-8-18z"
          fill="currentColor"
        />
        <path
          d="M12 28c-2 0-4 2-4 4s2 4 4 4c1.5 0 2.8-.8 3.4-2-.3-1.2-.4-2.4-.4-3.5 0-.5 0-1 .1-1.5-.7-.6-1.6-1-2.1-1zm24 0c-.5 0-1.4.4-2.1 1 .1.5.1 1 .1 1.5 0 1.1-.1 2.3-.4 3.5.6 1.2 1.9 2 3.4 2 2 0 4-2 4-4s-2-4-4-4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Airport Transfers',
    description: 'Comfortable pickup and drop-off arrangements.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M12 18l12-6 12 6v18c0 2-1.5 3.5-3.5 3.5h-17C13.5 39.5 12 38 12 36V18z" fill="currentColor" opacity="0.9" />
        <path d="M22 20h4v6h-4v-6z" fill="currentColor" />
        <path d="M16 30h16v2H16v-2z" fill="currentColor" />
        <path d="M20 12l4-2 4 2v2H20v-2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 7,
    name: 'Event Spaces',
    description: 'Celebrate with private setups for special occasions.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M16 36V18h16v18H16z" fill="currentColor" />
        <path d="M20 12l4-4 4 4" fill="currentColor" />
        <path d="M14 20h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M12 40h24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 8,
    name: 'Local Tours',
    description: 'Curated island experiences with friendly guides.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M24 6c8 0 14 6 14 14 0 12-14 22-14 22S10 32 10 20c0-8 6-14 14-14z" fill="currentColor" opacity="0.9" />
        <path d="M24 14a6 6 0 100 12 6 6 0 000-12z" fill="currentColor" />
        <path
          d="M24 17l1.5 3L29 21l-2.5 1.8L27 26l-3-2-3 2 .5-3.2L17 21l3.5-1 .5-3z"
          fill="#FFFDF7"
          opacity="0.9"
        />
      </svg>
    ),
    featured: true,
  },
  {
    id: 9,
    name: 'Concierge Support',
    description: 'Recommendations and reservations tailored to you.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M18 10h12a6 6 0 010 12H18a6 6 0 010-12z" fill="currentColor" />
        <path d="M12 40c1.5-8 7-12 12-12s10.5 4 12 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M22 26h4v4h-4v-4z" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
]

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="amenitiesSection"
      aria-label="Amenities"
    >
      <div className="amenitiesContainer">
        <div className="amenitiesHeader reveal">
          <p className="amenitiesKicker">INDULGE IN LUXURY</p>
          <h2 className="amenitiesTitle">World-Class Amenities</h2>
          <p className="amenitiesSubtitle">Every detail designed for your perfect coastal escape</p>
        </div>

        <div className="amenitiesGrid">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.id}
              className={`amenityCard reveal ${amenity.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="amenityCardInner">
                <div className="amenityIconWrapper">
                  <div className="amenityIconGlow"></div>
                  <div
                    className="amenityIcon"
                    style={{ color: amenity.featured ? '#FF8360' : '#006D77' }}
                  >
                    {amenity.icon}
                  </div>
                </div>
                <h4 className="amenityName">{amenity.name}</h4>
                <p className="amenityDescription">{amenity.description}</p>
                <div className="amenityHoverLine"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}