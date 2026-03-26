import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-dark via-black to-brand-dark overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-15"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-transparent to-brand-dark/90"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Perfekte Lackierungen.
            <br />
            <span className="bg-gradient-to-r from-brand-red via-brand-gold/90 to-brand-blue bg-clip-text text-transparent">
              Präzise Karosseriearbeit.
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
              className="bg-brand-red text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-red/90 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-brand-red/50"
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
