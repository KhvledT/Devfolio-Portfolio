import { useState, useEffect } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showHeroAnimation, setShowHeroAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // عند انتهاء أنيميشن الخروج للبريلودر
  const handlePreloaderExitComplete = () => {
    setShowHeroAnimation(true);
  };

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <Preloader show={showPreloader} onExitComplete={handlePreloaderExitComplete} />
      <GlobalStyles />
      <Header />
      <main id="main-content" style={{ overflow: 'hidden', width: '100%' }}>
        <Hero startAnimation={showHeroAnimation} />
        <About />
        <Services />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
