import { motion } from 'framer-motion';
import {
  ChevronDown,
  Car,
  Wrench,
  Sparkles,
  Paintbrush,
  Palette,
  Clock,
  Cog,
} from 'lucide-react';
import { useMemo } from 'react';
import { galleryImages } from 'virtual:gallery-images';

type HeroProps = {
  onOpenGalleryPage?: (categoryId?: string) => void;
};

const SprayGunIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M4 10h10l2-2h4v4h-4l-2-2H4z" />
    <path d="M9 10v-3h5" />
    <path d="M10 12v3c0 1.7 1.3 3 3 3h2" />
    <path d="M16 12v2" />
    <path d="M20 6v-1" />
    <path d="M18 6v-1" />
    <path d="M22 6v-1" />
  </svg>
);

const DoorIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M4 14l1-3a3 3 0 0 1 2.8-2h8.4a3 3 0 0 1 2.8 2l1 3v4H4v-4z" />
    <path d="M8 18h8" />
    <path d="M12 9v9" />
    <path d="M14.5 14h.01" />
    <circle cx="8" cy="18" r="1" />
    <circle cx="16" cy="18" r="1" />
  </svg>
);

const RiderBikeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <circle cx="7" cy="17" r="3" />
    <circle cx="17" cy="17" r="3" />
    <circle cx="12" cy="6" r="1.5" />
    <path d="M12 7.5l-1.5 3.5 3 1" />
    <path d="M14 9.5h2l2 3.5" />
    <path d="M12 10h3l-2 6" />
    <path d="M10.5 11l-3.5 6" />
    <path d="M15 6.5l-1 3" />
  </svg>
);

const Hero = ({ onOpenGalleryPage }: HeroProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const categories = useMemo(() => {
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
      'motorrad-und-rollerlackierung': 'Motorrad- & Rollerlackierung',
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
  }, []);

  const categoryIcon = (id: string, label: string) => {
    const slug = id.toLowerCase();
    if (slug.includes('fahrzeuglackierung')) return SprayGunIcon;
    if (slug.includes('unfallinstandsetzung')) return Wrench;
    if (slug.includes('smart-repair')) return DoorIcon;
    if (slug.includes('oldtimerrestaurierung')) return Clock;
    if (slug.includes('matt-lackierung')) return Paintbrush;
    if (slug.includes('industrieteilelackierung')) return Cog;
    if (slug.includes('custom-designs')) return Palette;
    if (slug.includes('motorrad-und-rollerlackierung')) return RiderBikeIcon;
    const text = `${id} ${label}`.toLowerCase();
    if (text.includes('auto') || text.includes('car')) return Car;
    if (text.includes('karosserie') || text.includes('instand')) return Wrench;
    if (text.includes('matt') || text.includes('lack')) return Paintbrush;
    if (text.includes('design') || text.includes('effekt')) return Palette;
    if (text.includes('motor') || text.includes('bike')) return RiderBikeIcon;
    if (text.includes('oldtimer') || text.includes('klassik') || text.includes('classic')) return Clock;
    return Sparkles;
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start justify-center bg-gradient-to-br from-brand-dark/50 via-black/30 to-brand-dark/55 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-transparent to-brand-dark/90"></div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(40rem 28rem at 10% 26%, rgba(234, 57, 43, 0.6), transparent 60%), radial-gradient(36rem 26rem at 90% 22%, rgba(0, 122, 255, 0.55), transparent 60%)',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'screen',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mt-[2cm] text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Jede Lackierung ein Meisterstück.
            <br />
            <span className="block mt-[2cm] bg-gradient-to-r from-brand-red via-brand-gold/90 to-brand-blue bg-clip-text text-transparent">
              Präzision, Glanz und Perfektion!
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Ihr Lackierzentrum in Ellwangen
          </p>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Von Smart Repair bis Komplettlackierung – professionelle
            Fahrzeugveredelung mit Meisterkompetenz
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,0,0,0.90), rgba(255,0,255,0.95) 30%, rgba(0,122,255,0.95))',
              }}
            >
              Jetzt Termin anfragen
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              Leistungen ansehen
            </button>
          </div>
        </motion.div>

        {categories.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {categories.map((category) => {
              const Icon = categoryIcon(category.id, category.label);
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    if (onOpenGalleryPage) {
                      onOpenGalleryPage(category.id);
                    } else {
                      scrollToSection('gallery');
                    }
                  }}
                  className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 text-left"
                >
                  <div
                    className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(255,0,0,0.25), rgba(255,0,255,0.25), rgba(0,122,255,0.25))',
                    }}
                  />
                  <div className="relative z-10 px-5 py-4 flex items-center gap-3">
                    <Icon className="w-6 h-6 text-brand-gold" />
                    <span className="text-white font-medium">{category.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown
            size={40}
            className="text-white animate-bounce cursor-pointer"
            onClick={() => scrollToSection('about')}
          />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;
