import React from 'react';
import styles from './MoreAbout.module.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const MoreAbout = () => {
  const cards = [
    {
      image: '/home/moreabout1.png',
      title: 'Relatório Anual da AstraZeneca',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image: '/home/moreabout2.png',
      title: 'Site Global AstraZeneca',
      description: 'Visite o site global da empresa para saber mais sobre nossos resultados trimestrais e o trabalho científico que nos conecta com nossos parceiros.',
    },
  ];

  return (
    <div className={styles.moreAboutContainer}>
      <h2 className={styles.moreAboutTitle}>Saiba mais sobre a AstraZeneca</h2>

      <div className={`${styles.cardDisplayContainer}`}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={card.image} alt={`Card ${index + 1}`} className={styles.cardImage} />
            </div>
            <div className={styles.texts} >
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
            <button className={styles.learnMoreBtn}>
              <p>Visitar</p> <FaExternalLinkAlt className={styles.ctaIcon} />
            </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MoreAbout;
