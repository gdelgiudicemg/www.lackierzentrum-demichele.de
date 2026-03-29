import { motion } from 'framer-motion';
import { ChevronDown, Car, Wrench, Sparkles, Shield } from 'lucide-react';

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
      className="relative min-h-screen flex items-start justify-center bg-gradient-to-br from-brand-dark/50 via-black/30 to-brand-dark/55 overflow-hidden"
      style={{ paddingTop: 'var(--nav-h)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-transparent to-brand-dark/90"></div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(40rem 28rem at 10% 26%, rgba(234, 57, 43, 0.6), transparent 60%), radial-gradient(36rem 26rem at 90% 22%, rgba(0, 122, 255, 0.55), transparent 60%)',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'screen',
        }}
      />

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
              className="text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,180,0,0.9), rgba(255,215,0,0.95) 30%, rgba(0,122,255,0.95))',
              }}
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

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: 'Fahrzeuglackierungen', Icon: Car },
            { label: 'Unfallinstandsetzung', Icon: Wrench },
            { label: 'Smart Repair', Icon: Sparkles },
            { label: 'Oldtimer-Restaurierung', Icon: Shield },
          ].map(({ label, Icon }) => (
            <div
              key={label}
              className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: 'linear-gradient(90deg, rgba(255,0,0,0.25), rgba(255,215,0,0.25), rgba(0,122,255,0.25))' }} />
              <div className="relative z-10 px-5 py-4 flex items-center gap-3">
                <Icon className="w-6 h-6 text-brand-gold" />
                <span className="text-white font-medium">{label}</span>
              </div>
            </div>
          ))}
        </div>

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
