import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';

type GalleryPageProps = {
  onBack: () => void;
};

const GalleryPage = ({ onBack }: GalleryPageProps) => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const imageFiles = useMemo(
    () => [
      'WhatsApp Image 2026-03-26 at 16.39.12.jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.13 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.13 (2).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.13.jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.14 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.14 (2).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.14 (3).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.14.jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.15.jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.16 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.16.jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.17 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.17.jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.18.jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.22 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.22.jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.23 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.23 (2).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.23 (5).jpeg',
      'WhatsApp Image 2026-03-26 at 16.39.23.jpeg',
      'WhatsApp Image 2026-03-26 at 16.40.14 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.40.14 (2).jpeg',
      'WhatsApp Image 2026-03-26 at 16.40.14 (3).jpeg',
      'WhatsApp Image 2026-03-26 at 16.40.14.jpeg',
      'WhatsApp Image 2026-03-26 at 16.40.15 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.40.15.jpeg',
      'WhatsApp Image 2026-03-26 at 16.42.18 (1).jpeg',
      'WhatsApp Image 2026-03-26 at 16.42.18 (2).jpeg',
      'WhatsApp Image 2026-03-26 at 16.42.19 (1).jpeg',
    ],
    []
  );

  const galleryItems = useMemo(
    () =>
      imageFiles.map((fileName, index) => ({
        image: encodeURI(`/images/${fileName}`),
        title: `Foto ${(index + 1).toString().padStart(2, '0')}`,
      })),
    [imageFiles]
  );

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
    <main className="pt-28 pb-20 bg-gradient-to-b from-brand-dark via-black to-brand-dark">
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
      </div>
    </main>
  );
};

export default GalleryPage;
