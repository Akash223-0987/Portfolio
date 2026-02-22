import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail, Instagram } from 'lucide-react';

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
                href="mailto:akashdora2@gmail.com"
                className="group flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-[#EA4335]/60 hover:bg-[#EA4335]/12 transition-all duration-300 hover:shadow-[0_0_16px_rgba(234,67,53,0.35)]"
              >
                <Mail size={22} className="text-neutral-200 group-hover:text-[#f08a85] transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/__.akashdora.__?igsh=aW5wejZ5MmI3amh5" target="_blank" rel="noreferrer"
                className="group flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-[#E1306C]/60 hover:bg-gradient-to-tr hover:from-[#f09433]/20 hover:via-[#e6683c]/20 hover:to-[#bc1888]/20 transition-all duration-300 hover:shadow-[0_0_16px_rgba(225,48,108,0.35)]"
              >
                <Instagram size={22} className="text-neutral-200 group-hover:text-[#E1306C] transition-colors" />
              </a>
            </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center items-center relative mt-16 lg:mt-0 lg:ml-8"
          >
            <div className="relative w-64 h-[320px] sm:w-72 sm:h-[380px] md:w-80 md:h-[420px] group">
              {/* Decorative offset border */}
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-3xl translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-emerald-400/60 shadow-[0_0_30px_rgba(52,211,153,0)] group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]" />
              
              {/* Main image container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl z-10 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2">
                <img 
                  src="/profile.png" 
                  alt="D Akash Dora" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=AD&background=171717&color=34d399&size=512';
                  }} 
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
