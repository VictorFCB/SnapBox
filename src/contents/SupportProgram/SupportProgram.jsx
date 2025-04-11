import React from 'react';
import styles from './SupportProgram.module.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const SupportProgram = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
        <img src="/home/FazBem.png" alt="Support Program" className={styles.image} />

        </div>
        <div className={styles.contentText}>
        <h2 className={styles.title}>Programa FazBem</h2>
        <p className={styles.description}>
          Conheça o nosso programa de cuidado e apoio ao paciente.
        </p>
        
        <button className={styles.button}>
          Visite
          <FaExternalLinkAlt className={styles.icon} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default SupportProgram;