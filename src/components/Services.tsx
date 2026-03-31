import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Car,
  Wrench,
  Sparkles,
  Clock,
  Palette,
  Cog,
} from 'lucide-react';

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
    <path d="M10 4h4l1 4H9l1-4z" />
    <path d="M5 10h10l2-2h4v4h-4l-2-2H5z" />
    <path d="M9 12v4c0 1.7 1.3 3 3 3h2" />
    <path d="M12 12l-1.5 1.5" />
    <path d="M12 19v2" />
    <path d="M10 21h4" />
    <path d="M21 9l1-1" />
    <path d="M22 11h1" />
    <path d="M21 13l1 1" />
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

const DiamondIcon = ({ className }: { className?: string }) => (
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
    <path d="M12 3l4 5-4 13-4-13 4-5z" />
    <path d="M8 8h8" />
    <path d="M12 3L8 8l4 5 4-5-4-5z" />
  </svg>
);

const RainIcon = ({ className }: { className?: string }) => (
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
    <path d="M7 15c-1.7 0-3-1.3-3-3 0-1.6 1.2-2.9 2.7-3A4.5 4.5 0 0 1 11 6c1.8 0 3.4 1.1 4.1 2.7.3-.1.6-.1.9-.1 2 0 3.5 1.5 3.5 3.4S18.1 15 16.2 15H7z" />
    <path d="M8 18l-1 2" />
    <path d="M12 18l-1 2" />
    <path d="M16 18l-1 2" />
  </svg>
);

const FilmSheetIcon = ({ className }: { className?: string }) => (
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
    <path d="M7 4h10a2 2 0 0 1 2 2v12.5a1.5 1.5 0 0 1-2.4 1.2l-2.1-1.6-2.1 1.6a1.5 1.5 0 0 1-1.8 0l-2.1-1.6-2.1 1.6A1.5 1.5 0 0 1 5 18.5V6a2 2 0 0 1 2-2z" />
    <path d="M9 8h6" />
    <path d="M9 12h6" />
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

const WheelIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 4v6" />
    <path d="M12 14v6" />
    <path d="M4 12h6" />
    <path d="M14 12h6" />
    <path d="M6.8 6.8l4.2 4.2" />
    <path d="M13 13l4.2 4.2" />
    <path d="M17.2 6.8L13 11" />
    <path d="M11 13l-4.2 4.2" />
  </svg>
);

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
      icon: SprayGunIcon,
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
      icon: DoorIcon,
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
      icon: WheelIcon,
      title: 'Felgenreparatur & Felgenlackierung',
      description:
        'Reparatur und hochwertige Lackierung Ihrer Felgen',
    },
    {
      icon: Car,
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
      icon: RiderBikeIcon,
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
      icon: DiamondIcon,
      title: 'Polieren & Hochglanzfinish',
      description: 'Perfekter Glanz durch professionelles Polieren',
    },
    {
      icon: RainIcon,
      title: 'Lackversiegelung',
      description: 'Langanhaltender Schutz durch Keramikversiegelung',
    },
    {
      icon: Car,
      title: 'Leasingrückläufer',
      description: 'Professionelle Aufbereitung für Leasingrückgaben',
    },
    {
      icon: FilmSheetIcon,
      title: 'Teilfolierungen',
      description: 'Hochwertige Folierungen für individuelle Akzente',
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="pt-[calc(5rem+2cm)] pb-[calc(5rem+2cm)] bg-gradient-to-b from-brand-dark/50 via-black/30 to-brand-dark/55"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-[calc(4rem+2cm)]"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Unsere Leistungen
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vom Smart Repair bis zur Komplettlackierung – wir bieten Ihnen das
            komplette Spektrum professioneller Fahrzeuglackierung und
            sowie Reparatur kleiner Lack- und Karosserieschäden in Ellwangen
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
