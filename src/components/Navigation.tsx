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
  hideLogo?: boolean;
};

const Navigation = ({ onNavigateToSection, hideLogo = false }: NavigationProps) => {
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

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
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
        <div
          className={`relative flex items-center py-4 md:py-5 ${
            hideLogo ? 'justify-end' : 'justify-center'
          }`}
        >
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden text-white p-3 ${
              hideLogo ? '' : 'absolute right-0'
            }`}
          >
            {isMobileMenuOpen ? <X size={34} /> : <Menu size={34} />}
          </button>
          {!hideLogo && (
            <div
              className="cursor-pointer flex items-center justify-center"
              onClick={() => navigateToSection('hero')}
            >
              <img
                src="/logo.png"
                alt="Lackierzentrum De Michele"
                className="w-[min(1200px,96vw)] md:w-[min(1320px,96vw)] lg:w-[min(1440px,96vw)] h-auto max-h-72 md:max-h-80 lg:max-h-96"
                onError={(e) => {
                  e.currentTarget.src = '/daniele.jpeg';
                }}
              />
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center justify-center flex-wrap gap-3 pb-4">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => navigateToSection(id)}
              className="group relative rounded-full px-4 py-2 text-white font-semibold text-sm bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all duration-300 flex items-center gap-2"
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
          ))}
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
