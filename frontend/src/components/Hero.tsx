import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};
const letterVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Hero() {
  const nameLetters = 'D AKASH DORA'.split('');

  return (
    <section id="home" className="min-h-screen flex relative overflow-hidden items-center justify-center text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">

          {/* Left Column — text: appears 2nd on mobile, 1st on desktop */}
          <div className="w-full flex justify-center lg:justify-start order-last lg:order-first">
            <div className="w-full max-w-xl text-center lg:text-left">

              {/* Name: letter stagger — smaller on mobile */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3 leading-[1.1] flex flex-wrap justify-center lg:justify-start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {nameLetters.map((char, i) => (
                  <motion.span key={i} variants={letterVariants} className={char === ' ' ? 'mr-3 sm:mr-4' : ''}>
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Static subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-emerald-400 mb-5"
              >
                Full Stack Developer &amp; Data Analyst
              </motion.p>

              {/* Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
                className="text-base sm:text-lg text-neutral-300 mb-8 leading-relaxed"
              >
                Building scalable web applications and data-driven systems that transform ideas into intelligent solutions.
              </motion.p>

              {/* Buttons — full width on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <button
                  onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                >
                  View Projects
                  <ArrowRight size={18} />
                </button>
                <a
                  href="/D_AKASH_DORA_Resume.pdf"
                  download
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all duration-300 backdrop-blur-md"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </motion.div>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-10 pt-8 border-t border-white/10"
              >
                <a href="https://github.com/Akash223-0987" target="_blank" rel="noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                  <Github size={19} className="text-neutral-300 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="https://leetcode.com/u/akash-321" target="_blank" rel="noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-[#FFA116]/50 hover:bg-[#FFA116]/10 transition-all duration-300">
                  <SiLeetcode size={19} className="text-neutral-300 group-hover:text-[#FFA116] transition-colors duration-300" />
                </a>
                <a href="https://www.linkedin.com/in/d-akash-dora-b91b5b321" target="_blank" rel="noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 transition-all duration-300">
                  <Linkedin size={19} className="text-neutral-300 group-hover:text-[#5badee] transition-colors" />
                </a>
                <a href="mailto:akashdora2@gmail.com"
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-[#EA4335]/50 hover:bg-[#EA4335]/10 transition-all duration-300">
                  <Mail size={19} className="text-neutral-300 group-hover:text-[#f08a85] transition-colors" />
                </a>
                <a href="https://www.instagram.com/__.akashdora.__?igsh=aW5wejZ5MmI3amh5" target="_blank" rel="noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-[#E1306C]/50 hover:bg-gradient-to-tr hover:from-[#f09433]/15 hover:via-[#e6683c]/15 hover:to-[#bc1888]/15 transition-all duration-300">
                  <Instagram size={19} className="text-neutral-300 group-hover:text-[#E1306C] transition-colors" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Profile Card — appears 1st on mobile, 2nd on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex justify-center items-center relative order-first lg:order-last lg:ml-8"
          >
            <div className="relative w-48 h-56 sm:w-64 sm:h-[300px] md:w-72 md:h-[360px] lg:w-80 lg:h-[420px] group">
              {/* Glow ring */}
              <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-transparent opacity-25 group-hover:opacity-50 transition-opacity duration-500 blur-[2px] z-0" />
              {/* Offset border */}
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-3xl translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-emerald-400/40" />
              {/* Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl z-10 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <img
                  src="/profile.png"
                  alt="D Akash Dora"
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=AD&background=171717&color=34d399&size=512';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm tracking-wide">D AKASH DORA</p>
                </div>
              </div>
              {/* Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5 bg-neutral-900/95 backdrop-blur-md border border-emerald-600/30 px-3 py-1.5 rounded-full shadow-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 whitespace-nowrap">Available for Work</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
