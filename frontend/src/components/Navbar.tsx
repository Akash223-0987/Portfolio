import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Lightbulb, Code, GraduationCap, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';
import AskAIButton from './AskAIButton';

const navLinks = [
  { name: 'Home', href: '#home', icon: <Home size={18} /> },
  { name: 'About', href: '#about', icon: <User size={18} /> },
  { name: 'Skills', href: '#skills', icon: <Lightbulb size={18} /> },
  { name: 'Projects', href: '#projects', icon: <Code size={18} /> },
  { name: 'Education', href: '#education', icon: <GraduationCap size={18} /> },
];

export default function Navbar({ onOpenAI }: { onOpenAI: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Define all target sections for active state monitoring
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust detection range for mobile/desktop headers
          return rect.top >= -200 && rect.top <= 400;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    // Extract ID (e.g. "#skills" -> "skills")
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    // Close menu FIRST so the scroll calculation is accurate 
    // or keep it open for a split second for the animation
    setMobileMenuOpen(false);

    if (element) {
      // Small timeout ensures the menu-closing layout shift doesn't mess with scroll position
      setTimeout(() => {
        const offset = 80; // height of the navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  return (
    // GPU-promoted layer so the navbar never triggers main-thread repaints
    <div
      className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full pointer-events-none px-4"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <motion.nav
        layout
        initial={false}
        className={cn(
          'pointer-events-auto transition-[background-color,border-color,box-shadow] duration-200 overflow-hidden flex flex-col border',
          isScrolled || mobileMenuOpen
            ? 'bg-neutral-950/85 backdrop-blur-xl border-white/10 shadow-2xl'
            : 'bg-white/5 backdrop-blur-md border-white/10',
          mobileMenuOpen ? 'rounded-[2.5rem] w-full max-w-[95vw] sm:max-w-[420px]' : 'rounded-full'
        )}
        transition={{
          layout: { type: 'spring', stiffness: 600, damping: 45, mass: 1 },
          opacity: { duration: 0.1 }
        }}
        style={{ willChange: 'transform, height' }}
      >
        <div className="flex justify-between items-center h-14 px-6 md:px-8 max-w-[1200px] relative gap-4 md:gap-8">

          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center h-8 cursor-pointer"
            onClick={(e) => scrollToSection(e as any, '#home')}
          >
            <span className="text-lg sm:text-xl font-bold tracking-tighter text-white">
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

            <AskAIButton onClick={onOpenAI} />



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
                    className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,rgba(52,211,153,0.7)_100%)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
                      bg-neutral-950 text-white hover:bg-neutral-900 transition-all duration-300
                      w-full h-full z-10 whitespace-nowrap"
                  >
                    <Mail size={15} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="tracking-wide">Contact</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="md:hidden flex items-center pr-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-200 hover:text-white focus:outline-none p-2 transition-colors relative z-10"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {mobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 600, 
                damping: 45,
                opacity: { duration: 0.2 }
              }}
              className="md:hidden w-full px-6 pb-6 overflow-hidden"
            >
              <div className="flex flex-col space-y-2 mt-2 border-t border-white/5 pt-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 + 0.1, duration: 0.3 }}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'block px-5 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-300',
                      activeSection === link.name.toLowerCase()
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className={cn(
                         "transition-colors duration-300",
                         activeSection === link.name.toLowerCase() ? "text-emerald-400" : "text-neutral-400"
                      )}>
                        {link.icon}
                      </span>
                      {link.name}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


    </div>
  );
}
