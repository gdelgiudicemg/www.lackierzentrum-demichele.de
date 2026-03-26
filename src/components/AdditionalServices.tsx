import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Truck, FileText, MessageCircle, Calendar } from 'lucide-react';

const AdditionalServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
  };

  const additionalServices = [
    {
      icon: Truck,
      title: 'Hol- & Bringservice',
      description:
        'Wir holen Ihr Fahrzeug ab und bringen es nach der Fertigstellung zurück',
    },
    {
      icon: FileText,
      title: 'Versicherungsabwicklung',
      description:
        'Komplette Abwicklung mit Ihrer Versicherung – ohne Stress für Sie',
    },
    {
      icon: MessageCircle,
      title: 'Persönliche Beratung',
      description:
        'Individuelle Beratung und Lösungen für Ihre speziellen Anforderungen',
    },
    {
      icon: Calendar,
      title: 'Schnelle Terminvergabe',
      description:
        'Flexible Terminplanung und kurze Wartezeiten für unsere Kunden',
    },
  ];

  return (
    <section
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
            Zusatzleistungen
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ihr Komfort ist uns wichtig – deshalb bieten wir Ihnen
            umfassenden Service
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-gradient-to-br from-brand-red/12 to-brand-blue/10 backdrop-blur-md border border-white/10 rounded-lg p-8 hover:border-brand-gold/40 transition-all duration-300 hover:scale-105 text-center group"
            >
              <div className="flex justify-center mb-4">
                <service.icon className="w-16 h-16 text-brand-blue group-hover:text-brand-gold transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdditionalServices;
