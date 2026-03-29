import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Wrench, Trophy } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const paintLogoSrc = '/standox.png';

  const sectionVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 44, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -48, filter: 'blur(10px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 48, filter: 'blur(10px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
  };

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55 } },
  };

  const timeline = [
    { year: '2014-2017', title: 'Ausbildung', icon: Wrench },
    { year: '2017-2023', title: 'Geselle', icon: Users },
    { year: '2023-2024', title: 'Meisterschule', icon: Award },
    { year: '2024-2026', title: 'Abteilungsleiter & Meister', icon: Trophy },
    { year: '2026', title: 'Meisterbetrieb', icon: Award },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gradient-to-b from-brand-dark via-black to-brand-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.img
            src={paintLogoSrc}
            alt="Standox"
            className="mx-auto mb-6 h-24 sm:h-32 md:h-40 w-auto max-w-[420px] sm:max-w-[560px] md:max-w-[680px] object-contain drop-shadow-[0_22px_60px_rgba(0,0,0,0.65)]"
            loading="lazy"
            initial={{ opacity: 0, y: 24, scale: 0.92, filter: 'blur(10px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, y: 24, scale: 0.92, filter: 'blur(10px)' }
            }
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
          />
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Über uns
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meisterkompetenz trifft auf Leidenschaft für Perfektion
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          <motion.div
            variants={fadeLeft}
          >
            <img
              src="https://images.pexels.com/photos/3954635/pexels-photo-3954635.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Lackierzentrum"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>

          <motion.div
            variants={fadeRight}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Meisterbetrieb De Michele
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Ein makelloser Lack ist mehr als nur Optik, er steht für
              Werterhalt, Qualität und den perfekten ersten Eindruck. Genau
              dafür steht das Lackierzentrum De Michele.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Als Fahrzeuglackiermeister verbinde ich, Daniele De Michele,
              fundierte Ausbildung, langjährige Praxiserfahrung und höchste
              Ansprüche an meine eigene Arbeit. Nach meiner Ausbildung von 2014
              bis 2017 und mehreren Jahren als Geselle habe ich mein
              handwerkliches Können kontinuierlich weiterentwickelt und
              perfektioniert. Mit dem erfolgreichen Abschluss der Meisterschule
              von 2023 bis 2024 sowie meiner anschließenden Tätigkeit als
              Abteilungsleiter und Meister konnte ich meine Erfahrung weiter
              vertiefen und meine Arbeitsweise auf ein neues Niveau heben.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Heute bringe ich dieses Wissen und diese Erfahrung in mein eigenes
              Unternehmen ein mit dem klaren Anspruch, Lackierarbeiten auf
              höchstem Niveau anzubieten.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Durch den Einsatz modernster Technik und umweltschonender Lacke
              entstehen Ergebnisse, die nicht nur optisch herausragen, sondern
              auch nachhaltig Bestand haben. Dabei arbeite ich effizient, sauber
              und mit einem geschulten Blick fürs Detail, denn echte Qualität
              zeigt sich in jeder einzelnen Nuance.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Das Leistungsspektrum umfasst Lackierarbeiten jeder Art: von Smart
              Repair über Teil- und Komplettlackierungen bis hin zur
              fachgerechten Unfallinstandsetzung. Auch die lacktechnische
              Aufbereitung und Restaurierung von Oldtimern gehört zum Angebot
              mit klarem Fokus auf hochwertige und präzise Lackierung.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Ob kleine Ausbesserung oder umfangreiche Arbeiten jedes Projekt
              wird persönlich betreut und mit größter Sorgfalt umgesetzt.
              Ehrliche Beratung, transparente Abläufe und absolute
              Zuverlässigkeit sind dabei selbstverständlich.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Mein Anspruch ist klar: Ergebnisse zu schaffen, die nicht nur gut
              aussehen, sondern langfristig überzeugen.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              <span className="font-semibold text-brand-gold">
                Vertrauen Sie auf Qualität, Erfahrung und echtes Meisterhandwerk im Lackierzentrum De Michele.
              </span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Unser Weg zum Meisterbetrieb
          </h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={gridVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <item.icon className="w-12 h-12 text-brand-red" />
                </div>
                <p className="text-brand-gold font-semibold mb-2">{item.year}</p>
                <p className="text-white font-medium">{item.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
