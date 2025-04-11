import React, { useState } from 'react';
import styles from './AppHeader.module.css';
import { FaSearch } from 'react-icons/fa';

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.topHeader}>
        <div className={styles.logo}>
          <img src="/namelogo.png" alt="Logo" />
        </div>
        <ul className={styles.topNav}>
          <li><a href="#">AstraZeneca Websites</a></li>
          <li><a href="#">Global Site</a></li>
          <li><FaSearch className={styles.searchIcon} /></li>
        </ul>
      </div>

      <div
        className={`${styles.hamburgerMenu} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <nav className={`${styles.navMenu} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Sobre <span>&gt;</span></a></li>
          <li><a href="#">Áreas Terapêuticas <span>&gt;</span></a></li>
          <li><a href="#">Pacientes em Primeiro Lugar <span>&gt;</span></a></li>
          <li><a href="#">Sustentabilidade <span>&gt;</span></a></li>
          <li><a href="#">Imprensa <span>&gt;</span></a></li>
          <li><a href="#">Contato <span>&gt;</span></a></li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
