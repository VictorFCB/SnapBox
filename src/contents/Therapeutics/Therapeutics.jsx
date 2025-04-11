import React, { useState, useEffect } from 'react';
import styles from './Therapeutics.module.css';

const Therapeutics = ({ title, images, descriptions }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(goToNextCard, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile, currentCardIndex]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardContainer}>
        {isMobile ? (
          <div className={styles.card} key={currentCardIndex}>
            <div className={styles.imageContainer}>
              <img
                src={images[currentCardIndex].image}
                alt={`Card ${currentCardIndex + 1}`}
                className={styles.cardImage}
              />
              <button className={`${styles.navButton} ${styles.prev}`} onClick={goToPreviousCard}>
                &lt;
              </button>
              <button className={`${styles.navButton} ${styles.next}`} onClick={goToNextCard}>
                &gt;
              </button>
            </div>
            <p className={styles.description}>{descriptions[currentCardIndex]}</p>
          </div>
        ) : (
          <div className={styles.horizontalCards}>
            <button className={`${styles.navButton} ${styles.prev}`} onClick={goToPreviousCard}>
              &lt;
            </button>
            {images.map((image, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.imageContainer}>
                  <img
                    src={image.image}
                    alt={`Card ${index + 1}`}
                    className={styles.cardImage}
                  />
                </div>
                <p className={styles.description}>{descriptions[index]}</p>
              </div>
            ))}
            <button className={`${styles.navButton} ${styles.next}`} onClick={goToNextCard}>
              &gt;
            </button>
          </div>
        )}
      </div>

      {isMobile && (
        <div className={styles.indicators}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${index === currentCardIndex ? styles.indicatorActive : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Therapeutics;