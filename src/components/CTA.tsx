import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-brand-red/20 via-brand-dark/50 to-brand-blue/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Bereit für perfekte Lackierung?
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Kontaktieren Sie uns jetzt für ein unverbindliches Beratungsgespräch
            und lassen Sie Ihr Fahrzeug in neuem Glanz erstrahlen
          </p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={() => scrollToSection('contact')}
            className="bg-brand-red text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-brand-red/90 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-brand-red/50 inline-flex items-center gap-3 group"
          >
            Jetzt Termin vereinbaren
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
