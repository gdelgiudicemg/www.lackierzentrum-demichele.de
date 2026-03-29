import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send, Clock } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const headerVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
  };

  const columnLeftVariants = {
    hidden: { opacity: 0, x: -56, filter: 'blur(12px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
  };

  const columnRightVariants = {
    hidden: { opacity: 0, x: 56, filter: 'blur(12px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
  };

  const staggerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55 } },
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@lackierzentrum-demichele.de?subject=Terminanfrage von ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ATelefon: ${formData.phone}%0D%0A%0D%0ANachricht:%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-gradient-to-b from-brand-dark/50 via-black/30 to-brand-dark/55"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Kontakt
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nehmen Sie Kontakt mit uns auf – wir freuen uns auf Ihre Anfrage
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            variants={columnLeftVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Kontaktinformationen
            </h3>

            <motion.div
              className="space-y-6"
              variants={staggerVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
            >
              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="flex-shrink-0">
                  <div className="bg-brand-blue/20 rounded-full p-3">
                    <MapPin className="w-6 h-6 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Adresse</h4>
                  <p className="text-gray-400">
                    Ludwig-Lutz-Straße 29
                    <br />
                    73479 Ellwangen (Jagst)
                    <br />
                    Deutschland
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="flex-shrink-0">
                  <div className="bg-brand-blue/20 rounded-full p-3">
                    <Mail className="w-6 h-6 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <a
                    href="mailto:info@lackierzentrum-demichele.de"
                    className="text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    info@lackierzentrum-demichele.de
                  </a>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="flex-shrink-0">
                  <div className="bg-brand-blue/20 rounded-full p-3">
                    <Clock className="w-6 h-6 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Öffnungszeiten</h4>
                  <p className="text-gray-400">
                    Montag–Freitag: 08:00–17:00
                    <br />
                    Samstag: 09:00–12:00
                    <br />
                    Sonntag: geschlossen
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
            >
              <h4 className="text-white font-semibold mb-4">
                Lackierzentrum De Michele
              </h4>
              <p className="text-gray-400 mb-4">
                Ihr zertifizierter Meisterbetrieb für Fahrzeuglackierung und
                Karosseriearbeit in Ellwangen.
              </p>
              <div className="space-y-3">
                <motion.div
                  className="aspect-video bg-black/40 rounded-lg overflow-hidden border border-white/10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <iframe
                    title="Google Maps - Lackierzentrum De Michele"
                    src="https://www.google.com/maps?q=Ludwig-Lutz-Stra%C3%9Fe%2029%2C%2073479%20Ellwangen%20(Jagst)%2C%20Deutschland&output=embed"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </motion.div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ludwig-Lutz-Stra%C3%9Fe%2029%2C%2073479%20Ellwangen%20(Jagst)%2C%20Deutschland"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-brand-gold transition-colors"
                >
                  <MapPin className="w-5 h-5 text-brand-blue" />
                  In Google Maps öffnen
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={columnRightVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Anfrage senden
            </h3>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={staggerVariants}
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
                  placeholder="Ihr Name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
                  placeholder="ihre.email@beispiel.de"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-white mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
                  placeholder="Ihre Telefonnummer"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-white mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors resize-none"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-brand-blue text-white px-6 py-4 rounded-lg font-semibold hover:bg-brand-blue/90 transition-all duration-300 flex items-center justify-center gap-2 group"
                variants={itemVariants}
              >
                Nachricht senden
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
