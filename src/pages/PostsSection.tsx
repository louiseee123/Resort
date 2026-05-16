import { useEffect, useState, useCallback } from 'react'
import './PostSection.css'

type Post = {
  id: string
  caption: string
  image: string
}

const posts: Post[] = [
  {
    id: 'bday',
    caption: 'Birthday Celebration — curated food trays & beachfront moments',
    image: '/bdayevent1.jpg',
  },
  {
    id: 'bday2',
     caption: 'Birthday Celebration — curated food trays & beachfront moments',
    image: '/bdayevent2.jpg',
  },
   {
    id: 'bday3',
     caption: 'Birthday Celebration — curated food trays & beachfront moments', 
    image: '/bdayevent3.jpg',
  },
  
  {
    id: 'grand1',
    caption: 'Grand Celebration — premium function hall experience for big groups',
    image: '/gt1.jpg',
  },
  {
    id: 'grand2',
    caption: 'Grand Celebration — premium function hall experience for big groups',
    image: '/gt2.jpg',
  },
  {
    id: 'grand3',
    caption: 'Grand Celebration — premium function hall experience for big groups',
    image: '/gt3.jpg',
  },
  {
    id: 'debut1',
    caption: 'Grand Debut — premium function hall experience for big groups',
    image: '/debut1.jpg',
  },
  {
    id: 'debut2',
    caption: 'Grand Debut — premium function hall experience for big groups',
    image: '/debut2.jpg',
  },

  {
    id: 'debut4',
    caption: 'Grand Debut — premium function hall experience for big groups',
    image: '/debut3.jpg',
  },

]

/**
 * PostsSection 组件 - 展示过往活动的轮播组件
 * 包含自动播放、触摸滑动、键盘导航等多种交互方式
 */
export default function PostsSection() {

  // 状态管理
  const [currentIndex, setCurrentIndex] = useState(0) // 当前显示的幻灯片索引
  const [isTransitioning, setIsTransitioning] = useState(false) // 是否正在切换幻灯片
  const [touchStart, setTouchStart] = useState<number | null>(null) // 触摸开始位置
  const [touchEnd, setTouchEnd] = useState<number | null>(null) // 触摸结束位置
  const [isPaused, setIsPaused] = useState(false) // 是否暂停自动播放

  const totalSlides = posts.length // 获取幻灯片总数

  // 跳转到指定幻灯片
  const goTo = useCallback((index: number) => {
    // 如果正在切换，则直接返回
    if (isTransitioning) return
    setIsTransitioning(true)
    // 计算目标索引，支持循环切换
    setCurrentIndex(((index % totalSlides) + totalSlides) % totalSlides)
    // 500ms后完成切换
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning, totalSlides])

  // 下一张幻灯片
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  // 上一张幻灯片
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  // Auto-play
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return
    const interval = setInterval(() => {
      goTo(currentIndex + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, goTo, totalSlides, isPaused])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prev, next])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      next()
    } else if (distance < -minSwipeDistance) {
      prev()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section id="posts" className="posts-section" aria-label="Event Showcase">
      {/* Decorative top rule */}
      <div className="posts-top-rule" aria-hidden="true">
        <span className="rule-line" />
        <span className="rule-diamond">◆</span>
        <span className="rule-line" />
      </div>

      <div className="posts-container">
        <div className="section-header reveal">
          <span className="section-tag">EVENT SHOWCASE</span>
          <h2 className="section-title">Past Success Stories</h2>
          <p className="section-subtitle">
            A look at the celebrations we've hosted — beachfront setups, thoughtful details, and unforgettable moments.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="carousel-container reveal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {posts.map((post, index) => (
                <div key={post.id} className="carousel-slide">
                  <div className="slide-image-wrapper">
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="slide-image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="slide-overlay" />
                    
                    {/* Caption */}
                    <div className="slide-caption">
                      <p className="slide-caption-text">{post.caption}</p>
                    </div>

                    {/* Slide counter */}
                    <div className="slide-counter">
                      {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prev}
                className="carousel-arrow carousel-arrow-left"
                aria-label="Previous slide"
                disabled={isTransitioning}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="carousel-arrow carousel-arrow-right"
                aria-label="Next slide"
                disabled={isTransitioning}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          {/* Progress Dots */}
          {totalSlides > 1 && (
            <div className="carousel-dots">
              {posts.map((post, index) => (
                <button
                  key={post.id}
                  onClick={() => goTo(index)}
                  className={`carousel-dot ${index === currentIndex ? 'carousel-dot-active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                >
                  {index === currentIndex && <span className="carousel-dot-progress" />}
                </button>
              ))}
            </div>
          )}

          {/* Pause indicator */}
          {isPaused && totalSlides > 1 && (
            <div className="pause-indicator">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              Paused
            </div>
          )}
        </div>

        {/* Quick nav thumbnails */}
        {totalSlides > 1 && (
          <div className="carousel-thumbnails reveal">
            {posts.map((post, index) => (
              <button
                key={post.id}
                onClick={() => goTo(index)}
                className={`thumbnail-btn ${index === currentIndex ? 'thumbnail-active' : ''}`}
              >
                <div className="thumbnail-image-wrapper">
                  <img src={post.image} alt="" className="thumbnail-image" />
                  {index === currentIndex && <div className="thumbnail-border" />}
                </div>
                <span className="thumbnail-label">
                  {post.caption.split(' — ')[0]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}