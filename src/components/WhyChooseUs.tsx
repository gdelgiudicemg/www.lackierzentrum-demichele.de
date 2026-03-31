import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Clock, Target, Users, Shield, Zap } from 'lucide-react';

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.98, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.6 },
    },
  };

  const reasons = [
    {
      icon: Award,
      title: 'Meisterbetrieb',
      description:
        'Zertifizierter Meisterbetrieb mit höchsten Qualitätsstandards',
    },
    {
      icon: Clock,
      title: 'Langjährige Erfahrung',
      description:
        'Über 10 Jahre Erfahrung in der Fahrzeuglackierung und Karosseriearbeit',
    },
    {
      icon: Target,
      title: 'Präzision und Qualität',
      description:
        'Höchste Präzision und Qualität bei jedem einzelnen Arbeitsschritt',
    },
    {
      icon: Users,
      title: 'Persönliche Beratung',
      description:
        'Individuelle Beratung und maßgeschneiderte Lösungen für Sie',
    },
    {
      icon: Zap,
      title: 'Schnelle Terminvergabe',
      description: 'Kurze Wartezeiten und flexible Terminplanung',
    },
    {
      icon: Shield,
      title: 'Zuverlässiger Service',
      description:
        'Von der Beratung bis zur Fertigstellung – auf uns ist Verlass',
    },
  ];

  return (
    <section
      ref={ref}
      className="pt-[calc(5rem+2cm)] pb-[calc(5rem+2cm)] bg-gradient-to-b from-brand-dark/50 via-black/30 to-brand-dark/55"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-[calc(4rem+2cm)]"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Warum Lackierzentrum De Michele?
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vertrauen Sie auf Meisterkompetenz, Erfahrung und
            Kundenorientierung
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-brand-blue/50 group text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-brand-blue/20 rounded-full p-4 group-hover:bg-brand-blue/30 transition-colors">
                  <reason.icon className="w-12 h-12 text-brand-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-400">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
