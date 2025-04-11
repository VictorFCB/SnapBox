import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="website-info">
          <h3 className="footer-title">Website AstraZeneca</h3>
          <p className="footer-description">
            Site destinado a informações sobre a AstraZeneca do Brasil. Temos sites específicos, nacionais e internacionais, dirigidos a pacientes e a profissionais de saúde.
          </p>
          <p className="footer-info">Website PromoMats ID: BR-19122 <br /> Última Revisão: 07/2022</p>
        </div>

        <div className="social-media">
          <h3 className="footer-title">Nos siga nas redes sociais:</h3>
          <div className="social-links">
            <img src="/linkedin.png" alt="" className='social-icon' />
            <img src="/instagram.png" alt="" className='social-icon' />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <img src="/logobranco.png" alt="AstraZeneca Logo" className="logo" />
        </div>
        <div className="legal-info">
          <p className="footer-legal">Declaração Legal</p>
          <p className="footer-legal">Política de Privacidade</p>
          <p className="footer-legal">Política de Cookies</p>
          <p className="footer-legal">&copy; AstraZeneca 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
