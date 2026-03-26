import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import AdditionalServices from './components/AdditionalServices';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashLogo from './components/SplashLogo';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SplashLogo show={showSplash} onFinish={() => setShowSplash(false)} />
      <div className="min-h-screen bg-brand-dark">
        <Navigation />
        <Hero />
        <About />
        <Services />
        <AdditionalServices />
        <WhyChooseUs />
        <Gallery />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
