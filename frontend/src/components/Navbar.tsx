import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Lightbulb, Code, Briefcase, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';
import Dock from './Dock';

const navLinks = [
  { name: 'Home', href: '#home', icon: <Home size={18} /> },
  { name: 'About', href: '#about', icon: <User size={18} /> },
  { name: 'Skills', href: '#skills', icon: <Lightbulb size={18} /> },
  { name: 'Projects', href: '#projects', icon: <Code size={18} /> },
  { name: 'Experience', href: '#experience', icon: <Briefcase size={18} /> },
  { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = navLinks.map(link => link.name.toLowerCase());
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="fixed top-6 left-4 md:left-8 z-50 flex pointer-events-none">
        <nav
          className={cn(
            'pointer-events-auto transition-all duration-300 overflow-hidden flex flex-col rounded-[2rem]',
            isScrolled || mobileMenuOpen
              ? 'bg-neutral-950/60 backdrop-blur-xl shadow-2xl'
              : 'bg-transparent'
          )}
        >
          <div className="flex justify-center items-center h-14 px-6 md:px-8 min-w-[280px] relative">
            <div className="flex-shrink-0 flex items-center h-8 overflow-hidden">
              <AnimatePresence>
                {isScrolled && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                  >
                    <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-xl font-bold tracking-tighter text-white">
                      D AKASH DORA
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="md:hidden absolute right-4 flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-neutral-400 hover:text-white focus:outline-none p-1 transition-colors"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden w-full px-4 pb-4"
              >
                <div className="flex flex-col space-y-1 mt-2 border-t border-white/5 pt-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={cn(
                        'block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        activeSection === link.name.toLowerCase()
                          ? 'bg-indigo-500/15 text-indigo-400'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="opacity-70">{link.icon}</span>
                        {link.name}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Desktop Bottom Dock */}
      <div className="hidden md:block fixed bottom-0 inset-x-0 z-50 pointer-events-none h-32">
        <Dock
          items={navLinks.map((link) => ({
            icon: link.icon,
            label: link.name,
            onClick: () => {
              const element = document.querySelector(link.href);
              if (element) {
                window.scrollTo({
                  top: element.getBoundingClientRect().top + window.scrollY - 80,
                  behavior: 'smooth'
                });
              }
            }
          }))}
          panelHeight={68}
          baseItemSize={52}
          magnification={82}
          className="pointer-events-auto bg-neutral-950/40 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10 mb-5 px-6 !border !border-white/10"
        />
      </div>
    </>
  );
}
