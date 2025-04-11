import React, { useEffect, useState } from 'react';
import './Test.css';

const Test = () => {
  const images = [
    { src: '/home/therapeutics1.png', alt: 'Imagem 1', description: 'Descrição 1' },
    { src: '/home/therapeutics2.png', alt: 'Imagem 2', description: 'Descrição 2' },
    { src: '/home/therapeutics3.png', alt: 'Imagem 3', description: 'Descrição 3' },
    { src: '/home/therapeutics4.png', alt: 'Imagem 4', description: 'Descrição 4' },
    { src: '/home/therapeutics5.png', alt: 'Imagem 5', description: 'Descrição 5' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [isMobile]);

  return (
    <div className="test-container">
      <h1 className="test-title">Título do Componente</h1>
      <div className="cards-container">
        {isMobile ? (
          <div className="cardss" key={currentIndex}>
            <div className="image-container">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="card-image"
              />
              <button className="nav-button prev" onClick={goToPreviousCard}>
                &lt;
              </button>
              <button className="nav-button next" onClick={goToNextCard}>
                &gt;
              </button>
            </div>
            <p className="card-description">{images[currentIndex].description}</p>
          </div>
        ) : (
          images.map((image, index) => (
            <div className="cardss" key={index}>
              <img
                src={image.src}
                alt={image.alt}
                className="card-image"
              />
              <p className="card-description">{image.description}</p>
            </div>
          ))
        )}
      </div>
      {isMobile && (
        <div className="indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Test;
