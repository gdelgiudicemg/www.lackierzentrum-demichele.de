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
import GalleryPage from './components/GalleryPage.tsx';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState<'home' | 'gallery'>('home');
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (page === 'gallery') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  const navigateToSection = (sectionId: string) => {
    setPage('home');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <>
      <SplashLogo show={showSplash} onFinish={() => setShowSplash(false)} />
      <div className="min-h-screen bg-brand-dark">
        <Navigation onNavigateToSection={navigateToSection} />
        {page === 'home' ? (
          <>
            <Hero />
            <About />
            <Services />
            <section className="py-14 bg-gradient-to-b from-brand-dark via-black to-brand-dark">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src="/images/insert.png"
                    alt="Insert"
                    loading="lazy"
                    className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
                  />
                </div>
              </div>
            </section>
            <AdditionalServices />
            <WhyChooseUs />
            <Gallery
              onOpenGalleryPage={() => {
                setPage('gallery');
              }}
            />
            <CTA />
            <Contact />
          </>
        ) : (
          <GalleryPage
            onBack={() => {
              setPage('home');
              setTimeout(() => {
                document
                  .getElementById('gallery')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }, 0);
            }}
          />
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
