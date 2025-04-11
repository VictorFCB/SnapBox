import React from "react";
import styles from "./Head.module.css"; 

const Head = ({ backgroundImage, title, paragraph1, paragraph2 }) => {
  return (
    <section 
      className={styles.headSection} 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.headContent}>
        <h1 className={styles.title}>{title}</h1>
        <p className={`${styles.paragraph} ${styles.paraFirst}`}>{paragraph1}</p>
        <p className={styles.paragraph}>{paragraph2}</p>
      </div>
    </section>
  );
};

export default Head;