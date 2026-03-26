import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

type NavigationProps = {
  onNavigateToSection?: (sectionId: string) => void;
};

const Navigation = ({ onNavigateToSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToSection = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      scrollToSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Über uns' },
    { id: 'services', label: 'Leistungen' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'contact', label: 'Kontakt' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigateToSection('hero')}
          >
            <img
              src="/logo.png"
              alt="Lackierzentrum De Michele"
              className="h-12 w-auto"
              onError={(e) => {
                e.currentTarget.src = '/daniele.jpeg';
              }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToSection(item.id)}
                className="text-white hover:text-brand-gold transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigateToSection('contact')}
              className="bg-brand-blue text-white px-6 py-2 rounded-full hover:bg-brand-blue/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              Termin anfragen
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-dark/98 backdrop-blur-md">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToSection(item.id)}
                className="block w-full text-left text-white hover:text-brand-gold transition-colors duration-300 py-2 font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigateToSection('contact')}
              className="w-full bg-brand-blue text-white px-6 py-3 rounded-full hover:bg-brand-blue/90 transition-all duration-300 font-medium mt-4"
            >
              Termin anfragen
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
