import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { galleryImages } from 'virtual:gallery-images';

type GalleryPageProps = {
  onBack: () => void;
  initialCategoryId?: string;
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

const GalleryPage = ({ onBack, initialCategoryId }: GalleryPageProps) => {
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
  }, []);

  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    const ids = new Set(categories.map((c) => c.id));
    if (initialCategoryId && ids.has(slugify(initialCategoryId))) return slugify(initialCategoryId);
    return categories[0]?.id ?? '';
  });

  useEffect(() => {
    if (initialCategoryId) setActiveCategoryId(canonicalizeCategoryId(slugify(initialCategoryId)));
  }, [initialCategoryId]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const imagesByCategory = useMemo(() => {
    const byCategory = Object.fromEntries(categories.map((c) => [c.id, [] as string[]])) as Record<string, string[]>;
    for (const image of galleryImages) {
      const decoded = decodeURI(image);
      const marker = '/images/';
      const markerIndex = decoded.indexOf(marker);
      const relative = markerIndex >= 0 ? decoded.slice(markerIndex + marker.length) : decoded;
      const parts = relative.split('/').filter(Boolean);
      const gallerieIdx = parts.findIndex((p) => slugify(p) === 'gallerie');
      const catSeg = gallerieIdx >= 0 && parts[gallerieIdx + 1] ? parts[gallerieIdx + 1] : parts[0] || '';
      const categoryId = canonicalizeCategoryId(slugify(catSeg));
      if (categoryId && byCategory[categoryId]) byCategory[categoryId].push(image);
    }
    return byCategory;
  }, [categories]);

  const galleryItems = useMemo(() => {
    const activeImages = imagesByCategory[activeCategoryId] || [];
    const activeLabel =
      categories.find((c) => c.id === activeCategoryId)?.label || 'Galerie';
    return activeImages.map((image) => ({
      image,
      title: activeLabel,
    }));
  }, [activeCategoryId, imagesByCategory, categories]);

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.99, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.55 } },
  };

  return (
    <main className="pb-20 bg-gradient-to-b from-brand-dark/50 via-black/30 to-brand-dark/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Galerie
            </h1>
            <p className="text-gray-300 text-lg">
              Weitere Fotos unserer Arbeiten
            </p>
          </div>
          <button
            onClick={onBack}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/15 transition-all duration-300"
          >
            Zurück
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((category) => {
            const isActive = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border transition-all duration-300 ${
                  isActive
                    ? 'bg-white/15 border-white/25 text-white'
                    : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {galleryItems.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 text-center text-gray-300">
            Noch keine Bilder in dieser Kategorie.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={gridVariants}
            initial="hidden"
            animate="show"
          >
            {galleryItems.map((item) => (
              <motion.div
                key={item.image}
                variants={itemVariants}
                className="relative group overflow-hidden rounded-lg aspect-video"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-lg font-semibold">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-blue/50 transition-colors duration-300 rounded-lg"></div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default GalleryPage;
