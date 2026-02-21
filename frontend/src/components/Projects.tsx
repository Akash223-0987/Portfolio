import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { projects } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Featured Projects</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent ml-4 hidden md:block" />
          </div>
          <div className="w-20 h-1 bg-emerald-500 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative flex flex-col h-full bg-[#0a0f1c]/80 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-8 flex flex-col h-full relative z-20">
                
                {/* Header: Folder Icon and Links */}
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500">
                    <FolderGit2 className="text-emerald-400 group-hover:text-emerald-300 w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-300"
                    >
                      <Github size={22} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-400 hover:text-emerald-400 transition-colors hover:scale-110 transform duration-300"
                      >
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content: Title and Description */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow group-hover:text-neutral-300 transition-colors duration-300">
                  {project.description}
                </p>
                
                {/* Footer: Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold bg-neutral-900 border border-white/5 text-emerald-400/80 rounded-full group-hover:border-emerald-500/30 group-hover:text-emerald-300 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
