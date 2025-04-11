import React from 'react';
import styles from './Work.module.css';

const Work = () => {
  const backgroundImage = '/home/work.png';
  return (
    <div 
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.card}>
        <h2 className={styles.title}>Trabalhe na AstraZeneca</h2>
        <p className={styles.description}>
          Junte-se aos mais de 70 mil funcionários da AstraZeneca, transforme sua carreira e faça parte da missão de expandir as fronteiras da ciência com a gente!
        </p>
        <button className={styles.button}>
          Acesse nossa página de carreiras
        </button>
      </div>
    </div>
  );
};

export default Work;