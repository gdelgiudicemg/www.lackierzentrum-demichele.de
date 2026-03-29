import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  Home,
  Info,
  Wrench,
  Image as ImageIcon,
  Phone,
} from 'lucide-react';

type NavigationProps = {
  onNavigateToSection?: (sectionId: string) => void;
  onOpenGalleryPage?: (categoryId?: string) => void;
  hideLogo?: boolean;
};

const Navigation = ({
  onNavigateToSection,
  onOpenGalleryPage,
  hideLogo = false,
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const update = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
    };

    update();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    }

    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
    }, 0);
    return () => window.clearTimeout(t);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToSection = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      scrollToSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home', Icon: Home },
    { id: 'about', label: 'Über uns', Icon: Info },
    { id: 'services', label: 'Leistungen', Icon: Wrench },
    { id: 'gallery', label: 'Galerie', Icon: ImageIcon },
    { id: 'contact', label: 'Kontakt', Icon: Phone },
  ];

  const galleryCategories = [
    { id: 'fahrzeuglackierung', label: 'Fahrzeuglackierung' },
    { id: 'unfallinstandsetzung', label: 'Unfallinstandsetzung' },
    { id: 'oldtimerrestaurierung', label: 'Oldtimerrestaurierung' },
    { id: 'smart-repair', label: 'Smart Repair' },
    { id: 'matt-lackierung', label: 'Matt Lackierung' },
    { id: 'industrieteilelackierung', label: 'Industrieteilelackierung' },
    { id: 'custom-designs', label: 'Custom Designs' },
    { id: 'motorrad-und-rollerlackierung', label: 'Motorrad- & Rollerlackierung' },
  ];

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-brand-dark/70 backdrop-blur-md'
      }`}
    >
      <div className="hidden md:block bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-2 text-sm text-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white/80">Ludwig-Lutz-Straße 29, 73479 Ellwangen</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+497961401887" className="hover:text-brand-gold transition-colors">
              Telefon: 07961 401887
            </a>
            <button
              onClick={() => navigateToSection('contact')}
              className="px-4 py-1.5 rounded-full text-white font-semibold bg-gradient-to-r from-brand-gold/90 via-amber-400 to-brand-blue hover:brightness-110 transition-all"
            >
              Jetzt Termin vereinbaren
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-[74px] md:h-[78px] py-0">
          {!hideLogo && (
            <button
              type="button"
              className="flex-shrink-0 h-14 md:h-16 flex items-center"
              onClick={() => navigateToSection('hero')}
            >
              <img
                src="/insert.png"
                alt="Lackierzentrum De Michele"
                className="h-full w-auto max-w-[70vw] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/daniele.jpeg';
                }}
              />
            </button>
          )}

          <div className="hidden md:flex items-center justify-end flex-1 gap-2">
            {navItems.map(({ id, label, Icon }) => {
              if (id !== 'gallery') {
                return (
                  <button
                    key={id}
                    onClick={() => navigateToSection(id)}
                    className="group relative shrink-0 rounded-full px-4 py-2 text-white font-semibold text-sm bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all duration-300 flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4 text-brand-gold" />
                    <span>{label}</span>
                    <span
                      className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(255,80,0,0.22), rgba(255,215,0,0.22), rgba(0,122,255,0.22))',
                      }}
                    />
                  </button>
                );
              }

              return (
                <div key={id} className="relative group shrink-0">
                  <button
                    onClick={() => navigateToSection(id)}
                    className="group relative shrink-0 rounded-full px-4 py-2 text-white font-semibold text-sm bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all duration-300 flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4 text-brand-gold" />
                    <span>{label}</span>
                    <span
                      className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(255,80,0,0.22), rgba(255,215,0,0.22), rgba(0,122,255,0.22))',
                      }}
                    />
                  </button>

                  <div className="absolute left-0 top-full mt-2 w-[320px] rounded-2xl bg-brand-dark/98 backdrop-blur-md border border-white/15 shadow-2xl overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto z-[120]">
                    <div className="p-2">
                      {galleryCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            if (onOpenGalleryPage) {
                              onOpenGalleryPage(category.id);
                            } else {
                              navigateToSection('gallery');
                            }
                          }}
                          className="w-full text-left rounded-xl px-3 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden ml-auto text-white p-3"
          >
            {isMobileMenuOpen ? <X size={34} /> : <Menu size={34} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-dark/98 backdrop-blur-md">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => navigateToSection(id)}
                className="w-full flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-left text-white hover:bg-white/15 transition-colors font-semibold"
              >
                <Icon className="w-5 h-5 text-brand-gold" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
