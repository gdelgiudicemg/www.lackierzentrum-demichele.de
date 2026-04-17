import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/images/insert.png"
              alt="Lackierzentrum De Michele"
              className="h-12 mb-4"
              onError={(e) => {
                e.currentTarget.src = '/daniele.jpeg';
              }}
            />
            <p className="text-gray-400 mb-4">
              Ihr zertifizierter Meisterbetrieb für Fahrzeuglackierung und
              Karosseriearbeit in Ellwangen.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  Über uns
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  Leistungen
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  Galerie
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-1" />
                <p className="text-gray-400">
                  Ludwig-Lutz-Straße 29
                  <br />
                  73479 Ellwangen (Jagst)
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <a
                  href="mailto:info@lackierzentrum-demichele.de"
                  className="text-gray-400 hover:text-brand-gold transition-colors"
                >
                  info@lackierzentrum-demichele.de
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Lackierzentrum De Michele. Alle Rechte
              vorbehalten.
            </p>
            <p className="text-gray-400 text-sm">
              <a
                href="https://lackierzentrum-demichele.de"
                className="hover:text-brand-gold transition-colors"
              >
                lackierzentrum-demichele.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
