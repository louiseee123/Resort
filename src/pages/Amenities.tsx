import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import './Amenities.css'

interface AmenityData {
  id: number
  name: string
  description: string
  image: string
  icon: string
  span?: 'wide' | 'tall' | 'featured' | 'normal'
}

type AmenitiesContent = {
  eyebrow: string
  title: string
  subtitle: string
}

const fallbackAmenitiesContent: AmenitiesContent = {
  eyebrow: 'INDULGE IN COMFORT',
  title: 'Resort Amenities',
  subtitle: 'Every detail designed for your perfect coastal escape',
}

const fallbackAmenities: AmenityData[] = [
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
  const [content, setContent] = useState<AmenitiesContent>(fallbackAmenitiesContent)
  const [amenities, setAmenities] = useState<AmenityData[]>(fallbackAmenities)

  useEffect(() => {
    let isMounted = true

    Promise.all([
      client.fetch<Partial<AmenitiesContent> | null>(`
        *[_type == "amenitiesSection"][0]{
          eyebrow,
          title,
          subtitle
        }
      `),
      client.fetch<Array<Omit<AmenityData, 'id' | 'icon' | 'span'> & { _id: string }>>(`
        *[_type == "amenity"] | order(_createdAt asc){
          _id,
          name,
          description,
          "image": image.asset->url
        }
      `),
    ])
      .then(([sectionData, amenityData]) => {
        if (!isMounted) return

        if (sectionData) {
          setContent({
            ...fallbackAmenitiesContent,
            ...sectionData,
          })
        }

        if (amenityData.length) {
          setAmenities(
            amenityData.map((amenity, index) => ({
              id: index + 1,
              name: amenity.name,
              description: amenity.description,
              image: amenity.image || '',
              icon: '',
              span: fallbackAmenities[index]?.span || 'normal',
            })),
          )
        }
      })
      .catch(() => {
        if (!isMounted) return
        setContent(fallbackAmenitiesContent)
        setAmenities(fallbackAmenities)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="amenities" className="amenities-section" aria-label="Amenities">
     

      <div className="amenities-container">
        <div className="section-header reveal">
          <span className="section-tag" data-sanity="amenitiesSection.eyebrow">{content.eyebrow}</span>
          <h2 className="section-title" data-sanity="amenitiesSection.title">{content.title}</h2>
          <p className="section-subtitle" data-sanity="amenitiesSection.subtitle">{content.subtitle}</p>
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
                    data-sanity="amenity.image"
                  />
                  <div className="bento-img-overlay" />
                </>
              ) : (
                <div className="bento-no-img" />
              )}

              <div className="bento-content">
                <span className="bento-icon" aria-hidden="true">{amenity.icon}</span>
                <div>
                  <h3 className="bento-name" data-sanity="amenity.name">{amenity.name}</h3>
                  <p className="bento-desc" data-sanity="amenity.description">{amenity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
