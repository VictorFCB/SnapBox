import React from 'react';
import styles from './UsefulLinks.module.css'; 
import { FaExternalLinkAlt } from 'react-icons/fa'; 

const UsefulLinks = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Links úteis</h2>
      
      <div className={styles.buttonsContainer}>
        <button className={styles.button}>
          Centro de informações da COVID-19
          <FaExternalLinkAlt className={styles.icon} />
        </button>
        
        <button className={styles.button}>
          Nossa atualização sobre a COVID-19
          <FaExternalLinkAlt className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default UsefulLinks;