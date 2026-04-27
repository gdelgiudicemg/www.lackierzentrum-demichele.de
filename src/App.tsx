import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
import ImpressumPage from './components/ImpressumPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [page, setPage] = useState<'home' | 'gallery' | 'impressum'>('home');
  const [galleryCategoryId, setGalleryCategoryId] = useState<string | undefined>(undefined);
  const backgroundSrc = encodeURI('/sfondo per sito.png');
  useEffect(() => {
    if (showSplash) {
      setShowContent(false);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = '';
    const t = setTimeout(() => setShowContent(true), 350);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [showSplash]);

  useEffect(() => {
    if (page !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  const navigateToSection = (sectionId: string) => {
    setPage('home');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const openGalleryPage = (categoryId?: string) => {
    setGalleryCategoryId(categoryId);
    setPage('gallery');
  };

  const openImpressumPage = () => {
    setPage('impressum');
  };

  return (
    <>
      <SplashLogo show={showSplash} onFinish={() => setShowSplash(false)} />
      <div className="min-h-screen relative bg-black">
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[0]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${backgroundSrc}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
        </div>
        <motion.div
          className="relative z-[60]"
          initial={false}
          animate={
            showContent
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 24, filter: 'blur(10px)' }
          }
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ pointerEvents: showContent ? 'auto' : 'none' }}
        >
          <Navigation
            onNavigateToSection={navigateToSection}
            onOpenGalleryPage={openGalleryPage}
            hideLogo={page === 'gallery'}
          />
          {page === 'home' ? (
            <>
              <Hero onOpenGalleryPage={openGalleryPage} />
              <About />
              <Services />
              <AdditionalServices />
              <WhyChooseUs />
              <Gallery
                onOpenGalleryPage={() => {
                  openGalleryPage();
                }}
              />
              <CTA />
              <Contact />
            </>
          ) : page === 'gallery' ? (
            <GalleryPage
              initialCategoryId={galleryCategoryId}
              onBack={() => {
                setPage('home');
                setTimeout(() => {
                  document
                    .getElementById('gallery')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }, 0);
              }}
            />
          ) : (
            <ImpressumPage />
          )}
          <Footer onNavigateToSection={navigateToSection} onOpenImpressumPage={openImpressumPage} />
        </motion.div>
      </div>
    </>
  );
}

export default App;
