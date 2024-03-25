// Swipe.jsx
import React, { useState, useRef, useEffect } from 'react'
import styles from './Swipe.module.scss'

const Swipe = ({ children, interval = 5000 }) => {
  const [startX, setStartX] = useState(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)
  const numChildren = React.Children.count(children)

  const handleTouchStart = e => {
    setStartX(e.touches[0].clientX)
    setIsSwiping(true)
  }

  const handleTouchMove = e => {
    if (!isSwiping) return
    const currentX = e.touches[0].clientX
    const diff = currentX - startX
    setTranslateX(diff)
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)
    setStartX(null)
    setTranslateX(0)
  }

  const handleTransitionEnd = () => {
    if (translateX < -100) {
      setCurrentIndex(prevIndex => (prevIndex === numChildren - 1 ? 0 : prevIndex + 1))
    } else if (translateX > 100) {
      setCurrentIndex(prevIndex => (prevIndex === 0 ? numChildren - 1 : prevIndex - 1))
    }
    setTranslateX(0)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === numChildren - 1 ? 0 : prevIndex + 1))
    }, interval)

    return () => clearInterval(intervalId)
  }, [interval, numChildren])

  return (
    <div
      ref={containerRef}
      className={styles.swipeContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTransitionEnd={handleTransitionEnd}
      style={{ backgroundColor: 'blue' }}
    >
      <div
        className={styles.swipeContent}
        style={{
          transform: `translateX(-${100 * currentIndex}%)`,
          backgroundColor: 'red'
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className={styles.slide}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Swipe
