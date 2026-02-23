import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

const educationData = [
  {
    id: 1,
    title: 'Class 12th',
    institution: 'Kendriya Vidyalaya, Berhampur',
    date: '2023',
    description: 'Completed higher secondary education with a strong foundation in science and mathematics.',
    icon: BookOpen,
    color: '#34d399',
  },
  {
    id: 2,
    title: 'B.Tech in Computer Science Engineering (Data Analytics)',
    institution: 'Vellore Institute of Technology (VIT-AP), Andhra Pradesh',
    date: '2024 – Present',
    description: 'Pursuing Computer Science Engineering with a specialization in Data Analytics, focusing on programming, data analysis, and modern software development.',
    icon: GraduationCap,
    color: '#10b981',
  },
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven line draw
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Education</h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">

          {/* Static background track */}
          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />

          {/* Animated glowing line that draws down on scroll */}
          <div className="absolute left-5 top-0 bottom-0 w-[2px] overflow-hidden rounded-full">
            <motion.div
              className="w-full rounded-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, #34d399, #10b981, #059669)',
                boxShadow: '0 0 6px rgba(52,211,153,0.3)',
              }}
            />
          </div>

          {/* Items */}
          {educationData.map((item, index) => {
            const Icon = item.icon;
            const delay = index * 0.18;
            return (
              <div key={item.id} className="relative mb-14 last:mb-0 pl-16">

                {/* Glowing dot on the timeline */}
                <motion.div
                  className="absolute left-0 top-1"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: delay + 0.1 }}
                >
                  {/* Ping halo */}
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-10"
                    style={{ backgroundColor: item.color }}
                  />
                  {/* Core circle */}
                  <div
                    className="relative w-10 h-10 rounded-full border-4 border-neutral-950 flex items-center justify-center shadow-md"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}40`,
                    }}
                  >
                    <Icon size={16} className="text-neutral-950" strokeWidth={2.5} />
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: -48, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 80, damping: 18, delay }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative bg-neutral-900/60 backdrop-blur-md border border-white/8
                    hover:border-emerald-500/40 rounded-2xl p-6 md:p-8
                    shadow-xl shadow-black/30 group
                    transition-colors duration-300 hover:bg-neutral-800/70"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
                  />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{item.title}</h3>
                    <span
                      className="self-start text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap"
                      style={{
                        color: item.color,
                        borderColor: item.color + '44',
                        backgroundColor: item.color + '11',
                      }}
                    >
                      {item.date}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-emerald-400/80 mb-3 border-b border-white/6 pb-3">
                    {item.institution}
                  </p>

                  <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
