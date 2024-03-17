import React, { useState, useEffect, useRef } from "react";
import styles from "./ReviewCounter.module.css";
import Image from "next/image";
import counterBack from "../../img/counterBack.jpeg";
import Review from "../../img/Review.svg";

const ReviewCounter = ({ totalReviews }) => {
  const [count, setCount] = useState(0);
  const [shouldCount, setShouldCount] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !shouldCount && count < totalReviews) {
          setShouldCount(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(counterRef.current);

    return () => {
      const currentRef = counterRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [count, totalReviews, shouldCount]);

  useEffect(() => {
    let interval;
    if (shouldCount) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          const nextCount = prevCount + 10;
          return nextCount >= totalReviews ? totalReviews : nextCount;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [shouldCount, totalReviews]);

  const formatCount = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    }
    return value;
  };

  return (
    <div className={styles["review-counter"]} ref={counterRef}>
      <div className={styles["counter-background"]}>
        <Image src={counterBack} alt="" layout="fill" objectFit="cover" style={{ borderRadius: "7px", border: "none" }} />
      </div>
      <div className={styles["counter-content"]}>
        <div>
          <div className={styles["counter-value"]}>{formatCount(count)}</div>
          <div className={styles["total-reviews"]}>
            Positive Review
          </div>
        </div>
        <div>
          <Image src={Review} alt="review" style={{ width: "60px", height: "50px", marginTop: "15px" }} />
        </div>
      </div>
    </div>
  );
};

export default ReviewCounter;
