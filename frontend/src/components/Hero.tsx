import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const openChat = () => window.dispatchEvent(new CustomEvent('open-chat'));

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex relative overflow-hidden items-center justify-center text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center justify-between">
          
          {/* Left Column: Text and Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full flex justify-center lg:justify-start"
          >
            <div className="max-w-xl text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
            >
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="block text-white"
              >
                D AKASH DORA
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="block mt-2 text-4xl md:text-5xl font-bold text-emerald-400"
              >
                Full Stack Developer & <br />Data Analyst
              </motion.span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl leading-relaxed"
            >
              Building scalable web applications, intelligent data-driven systems, and intuitive user experiences.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={() => {
                  const el = document.querySelector('#projects');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex-shrink-0"
              >
                View Projects
                <ArrowRight size={18} />
              </button>
              <a 
                href="/D_AKASH_DORA_Resume.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all duration-300 backdrop-blur-md flex-shrink-0"
              >
                <Download size={18} />
                Download Resume
              </a>

              {/* ── AI Chat CTA ── */}
              <motion.button
                onClick={openChat}
                animate={{ boxShadow: ['0 0 12px rgba(16,185,129,0.2)', '0 0 28px rgba(16,185,129,0.5)', '0 0 12px rgba(16,185,129,0.2)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex items-center gap-3 px-6 py-3 rounded-lg font-medium text-white overflow-hidden bg-gradient-to-r from-emerald-900/80 to-teal-900/80 hover:from-emerald-800 hover:to-teal-800 transition-all duration-300 group border border-emerald-500/30 backdrop-blur-sm flex-shrink-0"
              >
                {/* sweep shimmer */}
                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />
                
                {/* Tiny Neural AI Logo */}
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-emerald-500/20 border-t-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-[2px] rounded-full border border-teal-500/20 border-b-teal-400 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse" />
                </div>

                <span className="relative z-10 text-emerald-50 shadow-sm font-semibold tracking-wide">Ask AI</span>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex justify-center lg:justify-start items-center gap-6 mt-14 pt-8 border-t border-white/10"
            >
              <a 
                href="https://github.com" target="_blank" rel="noreferrer"
                className="group flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-emerald-400/60 hover:bg-gradient-to-br hover:from-teal-600/20 hover:to-emerald-600/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <Github size={22} className="text-neutral-200 group-hover:text-emerald-300 transition-colors duration-300" />
              </a>
              <a 
                href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="group flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-[#0A66C2]/70 hover:bg-[#0A66C2]/15 transition-all duration-300 hover:shadow-[0_0_16px_rgba(10,102,194,0.45)]"
              >
                <Linkedin size={22} className="text-neutral-200 group-hover:text-[#5badee] transition-colors" />
              </a>
              <a 
                href="mailto:contact@example.com"
                className="group flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-[#EA4335]/60 hover:bg-[#EA4335]/12 transition-all duration-300 hover:shadow-[0_0_16px_rgba(234,67,53,0.35)]"
              >
                <Mail size={22} className="text-neutral-200 group-hover:text-[#f08a85] transition-colors" />
              </a>
            </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center items-center relative perspective-[1000px] mt-8 lg:mt-0"
          >
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full w-3/4 h-3/4 m-auto pointer-events-none" />
            
            {/* Main Card */}
            <div className="relative w-80 h-[420px] rounded-2xl p-[2px] bg-gradient-to-b from-emerald-400 via-teal-900 to-transparent shadow-[0_0_40px_rgba(16,185,129,0.15)] group transition-transform duration-500 hover:scale-[1.02]">
              
              <div className="relative w-full h-full bg-neutral-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                
                {/* Image or Fallback */}
                {/* 
                  Drop a file named profile.jpg or profile.png into the 'public' folder. 
                  Until then, it shows the stunning neon typography fallback! 
                */}
                <img 
                  src="/profile.png" 
                  alt="D Akash Dora" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity hover:mix-blend-normal z-0" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }} 
                />
                
                {/* Fallback Initials (Hidden by default, shows if img fails) */}
                <div className="hidden absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black">
                  <div className="text-emerald-500/30 font-black text-8xl tracking-tighter group-hover:scale-110 group-hover:text-emerald-500/50 transition-all duration-700">
                    AD
                  </div>
                </div>

                {/* Cyberpunk Accents */}
                <div className="absolute top-4 right-4 z-10 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest px-2 py-1 rounded backdrop-blur-sm border border-emerald-500/20">
                  SYS.ONLINE
                </div>

                {/* Floating Info Plate */}
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-neutral-900/60 backdrop-blur-md p-4 rounded-xl border border-white/10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-base font-bold text-white tracking-wide">D Akash Dora</p>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 font-mono">Available for Work</p>
                </div>

                {/* Glowing Corner Borders for Hacker aesthetic */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-xl m-3 transition-all duration-500 group-hover:border-emerald-400 group-hover:w-12 group-hover:h-12 z-10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500/50 rounded-br-xl m-3 transition-all duration-500 group-hover:border-emerald-400 group-hover:w-12 group-hover:h-12 z-10 pointer-events-none" />
                
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
