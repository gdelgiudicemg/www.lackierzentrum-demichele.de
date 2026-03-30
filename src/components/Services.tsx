import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Paintbrush,
  Car,
  Wrench,
  Shield,
  Sparkles,
  Bike,
  Clock,
  Palette,
  Cog,
  Gem,
  Package,
} from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6 },
    },
  };

  const services = [
    {
      icon: Paintbrush,
      title: 'Fahrzeuglackierungen aller Art',
      description:
        'Professionelle Lackierungen für alle Fahrzeugtypen mit modernster Technik',
    },
    {
      icon: Car,
      title: 'Teil- & Komplettlackierungen',
      description:
        'Von einzelnen Bauteilen bis zur vollständigen Neulackierung Ihres Fahrzeugs',
    },
    {
      icon: Wrench,
      title: 'Unfallinstandsetzung',
      description:
        'Fachgerechte Reparatur von Unfallschäden mit Versicherungsabwicklung',
    },
    {
      icon: Sparkles,
      title: 'Smart Repair',
      description:
        'Schnelle und kostengünstige Reparatur kleiner Schäden',
    },
    {
      icon: Wrench,
      title: 'Kratzer- & Dellenbeseitigung',
      description: 'Professionelle Beseitigung von Kratzern und Dellen',
    },
    {
      icon: Cog,
      title: 'Felgenreparatur & Felgenlackierung',
      description:
        'Reparatur und hochwertige Lackierung Ihrer Felgen',
    },
    {
      icon: Package,
      title: 'Kunststoffreparaturen',
      description: 'Fachgerechte Reparatur von Kunststoffteilen',
    },
    {
      icon: Palette,
      title: 'Sonder- & Effektlackierungen',
      description:
        'Individuelle Lackierungen mit besonderen Effekten',
    },
    {
      icon: Cog,
      title: 'Industrielackierungen',
      description: 'Lackierung von Kleinteilen und Bauteilen',
    },
    {
      icon: Bike,
      title: 'Motorrad- & Speziallackierungen',
      description: 'Spezialisierte Lackierungen für Motorräder',
    },
    {
      icon: Clock,
      title: 'Oldtimerrestauration & Lackierung',
      description:
        'Liebevolle Restauration und Lackierung klassischer Fahrzeuge',
    },
    {
      icon: Sparkles,
      title: 'Fahrzeugaufbereitung',
      description: 'Professionelle Aufbereitung Ihres Fahrzeugs',
    },
    {
      icon: Gem,
      title: 'Polieren & Hochglanzfinish',
      description: 'Perfekter Glanz durch professionelles Polieren',
    },
    {
      icon: Shield,
      title: 'Lackversiegelung',
      description: 'Langanhaltender Schutz durch Keramikversiegelung',
    },
    {
      icon: Car,
      title: 'Leasingrückläufer',
      description: 'Professionelle Aufbereitung für Leasingrückgaben',
    },
    {
      icon: Car,
      title: 'Teilfolierungen',
      description: 'Hochwertige Folierungen für individuelle Akzente',
    },
    {
      icon: Palette,
      title: 'Design- & Individualfolierungen',
      description: 'Kreative Folierungen nach Ihren Wünschen',
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 bg-gradient-to-b from-brand-dark/50 via-black/30 to-brand-dark/55"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Unsere Leistungen
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vom Smart Repair bis zur Komplettlackierung – wir bieten Ihnen das
            komplette Spektrum professioneller Fahrzeuglackierung und
            Karosseriearbeit in Ellwangen
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-brand-blue/50 group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <service.icon className="w-10 h-10 text-brand-red group-hover:text-brand-gold transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
