import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const imageFiles = [
    'WhatsApp Image 2026-03-26 at 16.39.12.jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.13 (1).jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.13 (2).jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.13 (3).jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.13 (4).jpeg',
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
    'WhatsApp Image 2026-03-26 at 16.39.19.jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.20.jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.21 (1).jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.21.jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.22 (1).jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.22.jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.23 (1).jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.23 (2).jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.23 (3).jpeg',
    'WhatsApp Image 2026-03-26 at 16.39.23 (4).jpeg',
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
    'WhatsApp Image 2026-03-26 at 16.42.18.jpeg',
    'WhatsApp Image 2026-03-26 at 16.42.19 (1).jpeg',
    'WhatsApp Image 2026-03-26 at 16.42.19.jpeg',
  ];

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.98, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.6 },
    },
  };

  const galleryItems = imageFiles.map((fileName, index) => ({
    image: encodeURI(`/images/${fileName}`),
    title: `Arbeit ${(index + 1).toString().padStart(2, '0')}`,
  }));

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 bg-gradient-to-b from-brand-dark via-black to-brand-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Unsere Arbeiten
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ein Einblick in unsere hochwertigen Lackier- und Karosseriearbeiten
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
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
                  <h3 className="text-white text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-blue/50 transition-colors duration-300 rounded-lg"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
