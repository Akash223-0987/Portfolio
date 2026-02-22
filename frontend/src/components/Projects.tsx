import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projects as staticProjects } from '../data/portfolioData';
import { fetchProjects } from '../services/api';
import type { Project } from '../types';

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for tilt
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 });

  // Spotlight position as plain state
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mouseX.set(nx - 0.5);
    mouseY.set(ny - 0.5);
    setSpotPos({ x: nx * 100, y: ny * 100 });
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  // Accent colors cycling
  const accentColors = ['#34d399', '#818cf8', '#f472b6', '#fb923c', '#38bdf8'];
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col h-full rounded-2xl cursor-default overflow-hidden
          bg-neutral-900/60 backdrop-blur-md
          border border-white/8 transition-[border-color,box-shadow] duration-500"
        whileHover={{ boxShadow: `0 24px 60px -12px ${accent}44` }}
      >
        {/* Dynamic cursor spotlight */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${spotPos.x}% ${spotPos.y}%, ${accent}22 0%, transparent 65%)`,
            }}
          />
        )}

        {/* Top colored accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
        />

        {/* Card body - elevated for 3D effect and clickability */}
        <div 
          className="flex flex-col flex-1 p-7 relative z-10"
          style={{ transform: 'translateZ(30px)' }}
        >

          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            {/* Glowing project number */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black border"
              style={{
                color: accent,
                borderColor: accent + '44',
                backgroundColor: accent + '11',
                boxShadow: `0 0 18px ${accent}33`,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Links */}
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl !== '' ? project.liveUrl : undefined}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, rotate: -8 }}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors pointer-events-auto"
                >
                  <ExternalLink size={15} />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl !== '' ? project.githubUrl : undefined}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors pointer-events-auto"
                >
                  <Github size={15} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Title and Ongoing Badge */}
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-white transition-colors line-clamp-2">
              {project.title}
            </h3>
            {project.ongoing && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase tracking-wider whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ongoing
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-neutral-400 text-sm leading-relaxed flex-grow mb-6">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/6">
            {project.techStack.map((tech: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 + i * 0.04 + 0.3 }}
                className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-lg border"
                style={{
                  color: accent,
                  borderColor: accent + '30',
                  backgroundColor: accent + '0d',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Always-visible CTA */}
          {(project.liveUrl || project.githubUrl) && (
            <a
              href={project.liveUrl || project.githubUrl || undefined}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 mt-5 text-xs font-semibold w-fit px-3 py-1.5 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 pointer-events-auto"
              style={{
                color: accent,
                borderColor: accent + '44',
                backgroundColor: accent + '0d',
                transform: 'translateZ(20px)',
              }}
            >
              {project.liveUrl ? 'Live Demo' : 'View Project'} <ArrowUpRight size={13} />
            </a>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Skeleton Loader ────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="relative flex flex-col h-full rounded-2xl bg-neutral-900/60 border border-white/8 p-7 animate-pulse">
      <div className="flex items-start justify-between mb-6">
        <div className="w-11 h-11 rounded-xl bg-white/5" />
        <div className="flex gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/5" />
          <div className="w-9 h-9 rounded-xl bg-white/5" />
        </div>
      </div>
      <div className="h-6 w-2/3 bg-white/5 rounded-lg mb-3" />
      <div className="space-y-2 flex-grow mb-6">
        <div className="h-4 bg-white/5 rounded" />
        <div className="h-4 bg-white/5 rounded w-5/6" />
        <div className="h-4 bg-white/5 rounded w-4/6" />
      </div>
      <div className="flex gap-2 pt-4 border-t border-white/6">
        <div className="h-6 w-16 bg-white/5 rounded-lg" />
        <div className="h-6 w-20 bg-white/5 rounded-lg" />
        <div className="h-6 w-14 bg-white/5 rounded-lg" />
      </div>
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
