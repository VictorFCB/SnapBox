import React, { useState, useEffect } from 'react';
import Head from '../../contents/Head/Head';
import Therapeutics from '../../contents/Therapeutics/Therapeutics';
import UsefulLinks from '../../contents/UsefulLinks/UsefulLinks';
import SupportProgram from '../../contents/SupportProgram/SupportProgram';
import Work from '../../contents/Work/Work';
import Searches from '../../contents/Searches/Searches';
import MoreAbout from '../../contents/MoreAbout/MoreAbout';
import Test from '../../contents/Test/Test';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [headData, setHeadData] = useState(null);
  const [therapeuticsData, setTherapeuticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/json/home.json');
      const data = await response.json();
      setHeadData(data.components.find(component => component.name === 'Head'));
      setTherapeuticsData(data.components.find(component => component.name === 'Therapeutics'));
    };

    fetchData();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!headData || !therapeuticsData) return null;

  const backgroundImage = isMobile ? headData.backgrounds[1].mobile : headData.backgrounds[0].desktop;
  const title = headData.title;
  const paragraph1 = headData.texts[0].text;
  const paragraph2 = headData.texts[1].text;

  const therapeuticsTitle = therapeuticsData.title;
  const images = therapeuticsData.images;
  const descriptions = images.map(item => item.description); 

  return (
    <div>
      <Head
        backgroundImage={backgroundImage}
        title={title}
        paragraph1={paragraph1}
        paragraph2={paragraph2}
      />
      <Therapeutics 
        title={therapeuticsTitle} 
        images={images} 
        descriptions={descriptions} 
      />
      <UsefulLinks />
      <SupportProgram />
      <Work />
      <Searches />
      <MoreAbout />
      {/* <Test /> */}
    </div>
  );
};

export default Home;
