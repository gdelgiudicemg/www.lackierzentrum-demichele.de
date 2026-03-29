import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

type GalleryProps = {
  onOpenGalleryPage?: () => void;
};

const BeforeAfter = ({
  beforeSrc,
  afterSrc,
  title,
}: {
  beforeSrc: string;
  afterSrc: string;
  title: string;
}) => {
  const [value, setValue] = useState(50);
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between gap-4">
        <h3 className="text-white font-semibold">{title}</h3>
        <div className="text-sm text-gray-300">Vorher / Nachher</div>
      </div>
      <div className="relative aspect-video">
        <img
          src={afterSrc}
          alt={`${title} - Nachher`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <img
            src={beforeSrc}
            alt={`${title} - Vorher`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded bg-black/60 text-white">
            Vorher
          </div>
          <div className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded bg-black/60 text-white">
            Nachher
          </div>
        </div>
        <div
          className="absolute top-0 bottom-0"
          style={{ left: `${value}%` }}
        >
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 -translate-x-1/2" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-gold text-black flex items-center justify-center shadow-lg">
            ⇄
          </div>
        </div>
        <input
          aria-label="Vorher/Nachher Slider"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
    </div>
  );
};

const Gallery = ({ onOpenGalleryPage }: GalleryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const beforeAfterPairs = [
    {
      before: encodeURI('/images/1pre.jpeg'),
      after: encodeURI('/images/1 dopo.jpeg'),
      title: 'Arbeit 01',
    },
    {
      before: encodeURI('/images/2 pre.jpeg'),
      after: encodeURI('/images/2 dopo.jpeg'),
      title: 'Arbeit 02',
    },
    {
      before: encodeURI('/images/3 pre.jpeg'),
      after: encodeURI('/images/3 dopo.jpeg'),
      title: 'Arbeit 03',
    },
    {
      before: encodeURI('/images/4 pre.jpeg'),
      after: encodeURI('/images/4 dopo.jpeg'),
      title: 'Arbeit 04',
    },
    {
      before: encodeURI('/images/5 pre.jpeg'),
      after: encodeURI('/images/5 dopo.jpeg'),
      title: 'Arbeit 05',
    },
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

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 bg-gradient-to-b from-brand-dark/50 via-black/30 to-brand-dark/55"
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
            Vorher/Nachher Beispiele – weitere Fotos finden Sie in der Galerie
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {beforeAfterPairs.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
            >
              <BeforeAfter
                beforeSrc={item.before}
                afterSrc={item.after}
                title={item.title}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={onOpenGalleryPage}
            className="text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,80,0,0.9), rgba(255,215,0,0.95) 30%, rgba(0,122,255,0.95))',
            }}
          >
            Mehr Bilder ansehen
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
