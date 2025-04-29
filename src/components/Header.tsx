import React, { useState, useEffect } from 'react';
import { Menu, X, Code, LineChart, ScrollText } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-blue-950/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className="h-7 w-7 text-blue-400" />
            <span className="text-xl font-bold text-white">PilotLine<span className="text-blue-400">.app</span></span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavItem icon={<LineChart className="h-4 w-4" />} label="Market Opportunity" onClick={() => scrollToSection('market')} />
            <NavItem icon={<ScrollText className="h-4 w-4" />} label="Campaign 1" onClick={() => scrollToSection('campaign1')} />
            <NavItem icon={<ScrollText className="h-4 w-4" />} label="Campaign 2" onClick={() => scrollToSection('campaign2')} />
            <button 
              className="px-4 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-500 transition duration-300 shadow-md"
              onClick={() => scrollToSection('contact')}
            >
              Invest Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-white hover:bg-blue-800/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavItem label="Market Opportunity" onClick={() => scrollToSection('market')} />
            <MobileNavItem label="Campaign 1" onClick={() => scrollToSection('campaign1')} />
            <MobileNavItem label="Campaign 2" onClick={() => scrollToSection('campaign2')} />
            <button 
              className="w-full text-left block px-4 py-3 bg-blue-600 rounded-md text-white font-medium"
              onClick={() => scrollToSection('contact')}
            >
              Invest Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick }) => {
  return (
    <button 
      className="flex items-center space-x-1 text-gray-300 hover:text-white transition duration-300"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const MobileNavItem: React.FC<Omit<NavItemProps, 'icon'>> = ({ label, onClick }) => {
  return (
    <button 
      className="block w-full text-left px-4 py-3 text-white hover:bg-blue-800/50 rounded-md"
      onClick={onClick}
    >
      {label}
    </button>
  );
};