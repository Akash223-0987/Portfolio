import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Lightbulb, Code, GraduationCap, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

const navLinks = [
  { name: 'Home', href: '#home', icon: <Home size={18} /> },
  { name: 'About', href: '#about', icon: <User size={18} /> },
  { name: 'Skills', href: '#skills', icon: <Lightbulb size={18} /> },
  { name: 'Projects', href: '#projects', icon: <Code size={18} /> },
  { name: 'Education', href: '#education', icon: <GraduationCap size={18} /> },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [...navLinks.map(link => link.name.toLowerCase()), 'contact'];
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

    // passive: true prevents the listener from blocking scroll paint
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    // GPU-promoted layer so the navbar never triggers main-thread repaints
    <div
      className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full pointer-events-none px-4"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <nav
        className={cn(
          // Only transition the properties that actually change — avoids layout recalc on "all"
          'pointer-events-auto transition-[background-color,border-color,box-shadow] duration-300 overflow-visible flex flex-col rounded-full border',
          isScrolled || mobileMenuOpen
            ? 'bg-neutral-950/70 backdrop-blur-xl border-white/10 shadow-2xl'
            : 'bg-white/5 backdrop-blur-md border-white/10'
        )}
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        <div className="flex justify-between items-center h-14 px-6 md:px-8 max-w-5xl relative gap-4 md:gap-8">

          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center h-8 cursor-pointer"
            onClick={(e) => scrollToSection(e as any, '#home')}
          >
            <span className="text-xl font-bold tracking-tighter text-white">
              D AKASH DORA
            </span>
          </div>

          {/* Desktop Nav Links + Contact */}
          <div className="hidden md:flex items-center gap-3">
            {/* Regular links pill */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name.toLowerCase();
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 group',
                      isActive ? 'text-white' : 'text-neutral-200 hover:text-white'
                    )}
                  >
                    {/*
                      Always rendered — no mount/unmount so no layout jitter.
                      Animates opacity + scale on the compositor thread only.
                    */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/10"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35, mass: 0.6 }}
                      style={{ willChange: 'opacity, transform' }}
                    />
                    <span className="relative z-10 flex items-center mt-[1px]">
                      {link.icon}
                    </span>
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Standalone Contact CTA — contextual hide when in contact section */}
            <AnimatePresence>
              {activeSection !== 'contact' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-[1.5px] rounded-full overflow-hidden group ml-2"
                >
                  <motion.div
                    className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#34d399_100%)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  />
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
                      bg-neutral-950 text-white hover:bg-neutral-900 transition-all duration-300
                      w-full h-full z-10 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] whitespace-nowrap"
                  >
                    <Mail size={15} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="tracking-wide">Contact</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-200 hover:text-white focus:outline-none p-1 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden w-full px-4 pb-4 overflow-hidden rounded-b-3xl"
            >
              <div className="flex flex-col space-y-1 mt-2 border-t border-white/10 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      activeSection === link.name.toLowerCase()
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="opacity-100">{link.icon}</span>
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
  );
}
