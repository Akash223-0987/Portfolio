import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';
import {
  SiReact, SiTypescript, SiTailwindcss, SiHtml5, SiCss3, SiVite,
  SiPython, SiFastapi, SiNodedotjs, SiSqlite, SiPostgresql, SiPandas, SiOpencv
} from 'react-icons/si';
import { FaJava, FaDatabase, FaChartLine, FaSmile, FaCubes } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';

const skillIcons: Record<string, { icon: React.ElementType, color: string }> = {
  'React': { icon: SiReact, color: '#61DAFB' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'TailwindCSS': { icon: SiTailwindcss, color: '#38bdf8' },
  'HTML5': { icon: SiHtml5, color: '#E34F26' },
  'CSS3': { icon: SiCss3, color: '#1572B6' },
  'Vite': { icon: SiVite, color: '#646CFF' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'FastAPI': { icon: SiFastapi, color: '#009688' },
  'Java': { icon: FaJava, color: '#007396' },
  'REST APIs': { icon: TbApi, color: '#a78bfa' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'SQL': { icon: FaDatabase, color: '#cbd5e1' },
  'DBMS': { icon: FaDatabase, color: '#94a3b8' },
  'SQLite': { icon: SiSqlite, color: '#38bdf8' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'Data Mining': { icon: FaChartLine, color: '#f59e0b' },
  'Sentiment Analysis': { icon: FaSmile, color: '#10b981' },
  'Model Building': { icon: FaCubes, color: '#8b5cf6' },
  'Pandas': { icon: SiPandas, color: '#f8fafc' },
  'OpenCV': { icon: SiOpencv, color: '#5C3EE8' },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].title);
  const SkillBadge = ({ skill }: { skill: string }) => {
    const iconData = skillIcons[skill];
    const IconComponent = iconData?.icon;
    const iconColor = iconData?.color || '#ffffff';

    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.95, y: 20 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            transition: { type: 'spring', stiffness: 200, damping: 20 } 
          }
        }}
        whileHover={{
          y: -4,
        }}
        className="flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] group cursor-default"
      >
        {IconComponent && (
          <IconComponent 
            className="text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 drop-shadow-lg" 
            style={{ color: iconColor }}
          />
        )}
        <span className="text-lg md:text-xl font-bold text-neutral-400 group-hover:text-white transition-colors">{skill}</span>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Technical Arsenal</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 relative z-10">
          {skillCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveTab(category.title)}
              className={`relative px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                activeTab === category.title
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === category.title && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-indigo-600/20 border border-indigo-500/50 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{category.title}</span>
            </button>
          ))}
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { 
                    staggerChildren: 0.05,
                    duration: 0.3 
                  }
                },
                exit: {
                  opacity: 0,
                  y: -20,
                  transition: { 
                    duration: 0.3 
                  }
                }
              }}
              className="flex flex-wrap justify-center gap-4 md:gap-6 py-4"
            >
              {skillCategories.find(c => c.title === activeTab)?.skills.map((skill, sIndex) => (
                <SkillBadge key={sIndex} skill={skill} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
