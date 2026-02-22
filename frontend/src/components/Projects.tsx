import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { projects as staticProjects } from '../data/portfolioData';
import { fetchProjects } from '../services/api';
import type { Project } from '../types';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="flex flex-col h-full rounded-2xl p-7 bg-neutral-900 border border-white/10 hover:border-emerald-500/50 transition-colors group">
        
        {/* Header - Title */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          {project.ongoing && (
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-2">
              Ongoing
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-neutral-400 text-base leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack (Simple text elements) */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
          {project.techStack.map((tech: string, i: number) => (
            <span key={i} className="text-sm font-medium text-neutral-300 flex items-center">
              {tech}
              {i < project.techStack.length - 1 && (
                <span className="ml-4 text-neutral-700">•</span>
              )}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl !== '' ? project.githubUrl : undefined}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors font-medium text-sm"
              aria-label="View Source Code"
            >
              <Github size={18} /> Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl !== '' ? project.liveUrl : undefined}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors text-sm"
            >
              Live Demo <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skeleton Loader ────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col h-full rounded-2xl p-7 bg-neutral-900 border border-white/10 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-8 w-2/3 bg-white/5 rounded" />
        <div className="h-6 w-6 bg-white/5 rounded" />
      </div>
      <div className="space-y-3 mb-6 flex-grow">
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-5/6" />
        <div className="h-4 bg-white/5 rounded w-4/6" />
      </div>
      <div className="flex gap-4 mb-8">
        <div className="h-5 w-16 bg-white/5 rounded" />
        <div className="h-5 w-20 bg-white/5 rounded" />
        <div className="h-5 w-16 bg-white/5 rounded" />
      </div>
      <div className="h-12 w-full bg-white/5 rounded-xl mt-auto" />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(data => {
        // If the DB has projects, use them; otherwise fall back to static data.
        setDisplayProjects(data.length > 0 ? data : staticProjects);
      })
      .catch(() => {
        // Backend offline — silently fall back to static data
        setDisplayProjects(staticProjects);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Ambient bg glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(52,211,153,0.06),_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent hidden md:block" />
          </div>
          <p className="text-neutral-400 text-base mt-2">Things I've built that I'm proud of.</p>
          <div className="w-20 h-1 bg-emerald-500 rounded-full mt-4" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : displayProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
          }
        </div>

      </div>
    </section>
  );
}
