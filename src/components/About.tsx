import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Wrench, Trophy } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
              Mit jahrelanger Erfahrung und echter Meisterkompetenz steht das
              Lackierzentrum De Michele für höchste Qualität in der
              Fahrzeuglackierung und Karosseriearbeit in Ellwangen.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Von der Ausbildung über die Gesellenzeit bis zur Meisterschule
              und der Position als Abteilungsleiter – jeder Schritt wurde mit
              Präzision und Leidenschaft gegangen. Heute führen wir einen
              eigenständigen Meisterbetrieb, der Tradition mit modernster
              Technik verbindet.
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
