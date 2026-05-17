import { useState } from 'react'
import './ReviewsSection.css'

type Review = {
  quote: string
  context: string
  author: string
  proofImage: string
  detail: string
}

const reviews: Review[] = [
  {
    quote: 'Wonderful experience! Stunning decor, accommodating staff, delicious food, and great value.',
    context: 'Family Celebration',
    author: 'Gafnie Lyn Fuentes',
    proofImage: '/review1.jpg',
    detail: 'Such a wonderful experience! The staff were incredibly accommodating, and the decor was absolutely stunning. For such an affordable price, we got so much value: delicious food, comfortable accommodation, and a beautiful cake. We’ll definitely be back!',
  },
  {
    quote: 'Thank you for making my 18th Debut fantasy dream come true!',
    context: '18th Debut',
    author: 'Shona',
    proofImage: '/review2.jpg',
    detail: 'Thank you very much for being part of my 18th Debut Celebration. I really enjoyed my night and am super grateful that you guys made an effort to make my fantasy dream come true!',
  },
  {
    quote: 'Nice ambiance, good food, and hassle-free booking! 👍',
    context: 'Christmas Party',
    author: 'Au Acevedo-Bendebel',
    proofImage: '/review3.jpg',
    detail: 'We thoroughly enjoyed our Christmas party at Villa Susane! It features a nice ambiance, good food, and a completely hassle-free booking experience. 👍👍👍👍👍',
  },
  {
    quote: 'An experience I will remember and cherish forever! 🥰',
    context: 'Special Event',
    author: 'Jade Nicole Ramos',
    proofImage: '/review4.jpg',
    detail: 'Thank you so much to Villa Susane and the staff for making this event happen! It is an experience that I will remember and cherish forever.',
  },
]

export default function ReviewsSection() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const openLightbox = (image: string) => {
    setLightboxImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    document.body.style.overflow = ''
  }

  return (
    <section id="reviews" className="reviews-section" aria-label="Guest reviews">
      <div className="reviews-container">
        <div className="section-header reveal">
          <span className="section-tag">GUEST NOTES</span>
          <h2 className="section-title">Reviews From Recent Visits</h2>
          <p className="section-subtitle">Real stories from real celebrations — see what our guests have to say.</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <article className="review-card reveal" style={{ animationDelay: `${index * 0.1}s` }} key={`${review.author}-${index}`}>
              <div className="review-text-panel">
                <div className="review-header">
                  <span className="review-context">{review.context}</span>
                  <span className="review-rating">★★★★★</span>
                </div>
                <p className="review-quote">“{review.quote}”</p>
                <div className="review-detail">
                  <p>{review.detail}</p>
                </div>
                <div className="review-author-wrapper">
                  <span className="review-author">— {review.author}</span>
                  <svg className="review-quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10 11H6C4.9 11 4 11.9 4 13V17C4 18.1 4.9 19 6 19H10C11.1 19 12 18.1 12 17V13C12 11.9 11.1 11 10 11ZM10 17H6V13H10V17ZM18 11H14C12.9 11 12 11.9 12 13V17C12 18.1 12.9 19 14 19H18C19.1 19 20 18.1 20 17V13C20 11.9 19.1 11 18 11ZM18 17H14V13H18V17Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              <div className="review-proof-panel" onClick={() => openLightbox(review.proofImage)}>
                <img src={review.proofImage} alt={`Screenshot from ${review.author}'s ${review.context}`} loading="lazy" />
                <div className="review-proof-overlay">
                  <span>Click to enlarge</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image viewer">
              ×
            </button>
            <img src={lightboxImage} alt="Review screenshot enlarged" />
          </div>
        </div>
      )}
    </section>
  )
}