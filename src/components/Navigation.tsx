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
import { galleryImages } from 'virtual:gallery-images';

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

  const slugify = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/&/g, 'und')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');

  const canonicalizeCategoryId = (id: string) => {
    const slug = id.toLowerCase();
    if (slug === 'fahrzeuglackierungen') return 'fahrzeuglackierung';
    if (slug === 'oldtimer-restaurierung') return 'oldtimerrestaurierung';
    if (slug === 'matt-lackierungen') return 'matt-lackierung';
    if (slug === 'zweiradlackierung') return 'motorrad-und-rollerlackierung';
    if (slug === 'custom-deisgn' || slug === 'custom-design') return 'custom-designs';
    return slug;
  };

  const galleryCategories = (() => {
    const preferredOrder = [
      'fahrzeuglackierung',
      'oldtimerrestaurierung',
      'smart-repair',
      'matt-lackierung',
      'industrieteilelackierung',
      'motorrad-und-rollerlackierung',
      'custom-designs',
    ] as const;
    const preferredIndex = new Map<string, number>(
      preferredOrder.map((id, idx) => [id, idx])
    );
    const labelOverrides: Record<string, string> = {
      fahrzeuglackierung: 'Fahrzeuglackierung',
      oldtimerrestaurierung: 'Oldtimerrestaurierung',
      'smart-repair': 'Smart Repair',
      'matt-lackierung': 'Matt Lackierung',
      industrieteilelackierung: 'Industrieteilelackierung',
      'motorrad-und-rollerlackierung': 'Zweiradlackierung',
      'custom-designs': 'Custom Designs',
    };

    const set = new Map<string, string>();
    for (const image of galleryImages) {
      const decoded = decodeURI(image);
      const marker = '/images/';
      const idx = decoded.indexOf(marker);
      const relative = idx >= 0 ? decoded.slice(idx + marker.length) : decoded;
      const parts = relative.split('/').filter(Boolean);
      const gallerieIdx = parts.findIndex((p) => slugify(p) === 'gallerie');
      const catSeg = gallerieIdx >= 0 && parts[gallerieIdx + 1] ? parts[gallerieIdx + 1] : parts[0] || '';
      if (!catSeg) continue;
      const id = canonicalizeCategoryId(slugify(catSeg));
      const label = catSeg
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
      if (!set.has(id)) set.set(id, label);
    }
    return Array.from(set.entries())
      .map(([id, label]) => ({ id, label: labelOverrides[id] ?? label }))
      .sort((a, b) => {
        const ai = preferredIndex.get(a.id);
        const bi = preferredIndex.get(b.id);
        if (ai !== undefined && bi !== undefined) return ai - bi;
        if (ai !== undefined) return -1;
        if (bi !== undefined) return 1;
        return a.label.localeCompare(b.label);
      });
  })();

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
            <a href="tel:07961950937099" className="hover:text-brand-gold transition-colors">
              Telefon: 07961-95093 7099
            </a>
            <button
              onClick={() => navigateToSection('contact')}
              className="px-4 py-1.5 rounded-full text-white font-semibold hover:brightness-110 transition-all"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,0,0,0.90), rgba(255,0,255,0.95) 30%, rgba(0,122,255,0.95))',
              }}
            >
              Jetzt Termin vereinbaren
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-[90px] md:h-[96px] py-0">
          {!hideLogo && (
            <button
              type="button"
              className="flex-shrink-0 h-16 md:h-20 flex items-center"
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
                          'linear-gradient(90deg, rgba(255,0,0,0.22), rgba(255,0,255,0.22), rgba(0,122,255,0.22))',
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
                          'linear-gradient(90deg, rgba(255,0,0,0.22), rgba(255,0,255,0.22), rgba(0,122,255,0.22))',
                      }}
                    />
                  </button>

                  <div
                    className="absolute left-0 top-full w-[320px] rounded-2xl bg-black/95 backdrop-blur-md border border-white/15 overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto z-[120]"
                    style={{
                      boxShadow:
                        '0 24px 70px rgba(0,0,0,0.75), 0 0 0 9999px rgba(0,0,0,0.35)',
                    }}
                  >
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
