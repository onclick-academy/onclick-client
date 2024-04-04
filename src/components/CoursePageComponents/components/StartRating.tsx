import React from 'react'

interface StarRateProps {
  rating: number
}

const StarRate: React.FC<StarRateProps> = ({ rating }) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i}>&#9733;</span>) // Full star
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      stars.push(<span key={i}>&#9733;</span>) // Half star
    } else {
      stars.push(<span key={i}>&#9734;</span>) // Empty star
    }
  }
  return <div>{stars}</div>
}

export default StarRate
