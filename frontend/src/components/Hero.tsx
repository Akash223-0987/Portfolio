import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex relative overflow-hidden items-center text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >


          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              D AKASH DORA
            </span>
            <span className="block mt-2 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500">
              Full Stack Developer & Data Analyst
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
            Building scalable web applications, intelligent data-driven systems, and intuitive user experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button
              onClick={() => {
                const el = document.querySelector('#projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
            >
              View Projects
              <ArrowRight size={18} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-lg font-medium transition-all duration-300 backdrop-blur-md">
              <Download size={18} />
              Download Resume
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white rounded-lg font-medium transition-colors"
            >
              Contact Me
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex items-center gap-6 mt-14 pt-8 border-t border-white/10"
          >
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Linkedin size={24} />
            </a>
            <a href="mailto:contact@example.com" className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
