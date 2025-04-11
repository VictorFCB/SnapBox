import React, { useState, useEffect } from 'react';
import styles from './Searches.module.css';

const Searches = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const cards = [
    { image: '/home/searches1.png', title: 'Doenças Cardiovasculares, Renais & Metabólicas', description: 'Há mais de 100 anos, inovamos no tratamento de doenças cardiovasculares e metabólicas. Nosso objetivo continua sendo responder às necessidades ainda não atendidas por meio dos nossos programas globais de gerenciamento de ciclo de vida de produtos, nossa linha de Pesquisa & Desenvolvimento e lançamentos de produtos' },
    { image: '/home/searches2.png', title: 'Doenças Cardiovasculares, Renais & Metabólicas', description: 'Há mais de 100 anos, inovamos no tratamento de doenças cardiovasculares e metabólicas. Nosso objetivo continua sendo responder às necessidades ainda não atendidas por meio dos nossos programas globais de gerenciamento de ciclo de vida de produtos, nossa linha de Pesquisa & Desenvolvimento e lançamentos de produtos' },
    { image: '/home/searches3.png', title: 'Doenças Cardiovasculares, Renais & Metabólicas', description: 'Há mais de 100 anos, inovamos no tratamento de doenças cardiovasculares e metabólicas. Nosso objetivo continua sendo responder às necessidades ainda não atendidas por meio dos nossos programas globais de gerenciamento de ciclo de vida de produtos, nossa linha de Pesquisa & Desenvolvimento e lançamentos de produtos' }
  ];

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
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
  }, [isMobile]);

  return (
    <div className={styles.searchesContainer}>
      <h2 className={styles.searchesTitle}>Acreditamos no que a ciência pode fazer pelas pessoas</h2>
      <div className={styles.cardDisplayContainer}>
        {isMobile ? (
          <div className={styles.card} key={currentCardIndex}>
              <div className={styles.imageContainer}>
                <img src={cards[currentCardIndex].image} alt={`Card ${currentCardIndex + 1}`} className={styles.cardImage} />
                <button className={`${styles.navButton} ${styles.prev}`} onClick={goToPreviousCard}>
                  &lt;
                </button>
                <button className={`${styles.navButton} ${styles.next}`} onClick={goToNextCard}>
                  &gt;
                </button>
              </div>

              <h3 className={styles.cardTitle}>{cards[currentCardIndex].title}</h3>
              <p className={styles.cardDescription}>{cards[currentCardIndex].description}</p>
              <button className={styles.learnMoreBtn}><p>Saiba Mais</p></button>
          </div>
        ) : (
          <div className={styles.horizontalCards}>
            <button className={`${styles.navButton} ${styles.prev}`} onClick={goToPreviousCard}>
              &lt;
            </button>
            {cards.map((card, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.imageContainer}>
                  <img src={card.image} alt={`Card ${index + 1}`} className={styles.cardImage} />
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
                <button className={styles.learnMoreBtn}><p>Saiba Mais</p></button>
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
          {cards.map((_, index) => (
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

export default Searches;
