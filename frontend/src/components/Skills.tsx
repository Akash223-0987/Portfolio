import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

// Icons mapping
import { 
  SiPython, SiC, SiCplusplus, SiR, 
  SiHtml5, SiCss3, SiJavascript, SiReact, 
  SiNodedotjs, SiExpress, SiMysql, SiMongodb, 
  SiFirebase, SiSupabase, SiPandas, SiNumpy, 
  SiScikitlearn, SiTailwindcss, SiBootstrap, SiTypescript
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { BsBarChartFill, BsGraphUp } from 'react-icons/bs';

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  'Python': { icon: <SiPython className="w-full h-full" />, color: '#3776AB' },
  'C': { icon: <SiC className="w-full h-full" />, color: '#A8B9CC' },
  'C++': { icon: <SiCplusplus className="w-full h-full" />, color: '#00599C' },
  'Java': { icon: <FaJava className="w-full h-full" />, color: '#007396' },
  'R': { icon: <SiR className="w-full h-full" />, color: '#276DC3' },
  'HTML': { icon: <SiHtml5 className="w-full h-full" />, color: '#E34F26' },
  'CSS': { icon: <SiCss3 className="w-full h-full" />, color: '#1572B6' },
  'JavaScript': { icon: <SiJavascript className="w-full h-full" />, color: '#F7DF1E' },
  'React.js': { icon: <SiReact className="w-full h-full" />, color: '#61DAFB' },
  'Node.js': { icon: <SiNodedotjs className="w-full h-full" />, color: '#339933' },
  'Express.js': { icon: <SiExpress className="w-full h-full" />, color: '#ffffff' },
  'REST APIs': { icon: <TbApi className="w-full h-full" />, color: '#0096D6' },
  'MySQL': { icon: <SiMysql className="w-full h-full" />, color: '#4479A1' },
  'MongoDB': { icon: <SiMongodb className="w-full h-full" />, color: '#47A248' },
  'Firebase': { icon: <SiFirebase className="w-full h-full" />, color: '#FFCA28' },
  'Supabase': { icon: <SiSupabase className="w-full h-full" />, color: '#3ECF8E' },
  'Pandas': { icon: <SiPandas className="w-full h-full" />, color: '#150458' },
  'NumPy': { icon: <SiNumpy className="w-full h-full" />, color: '#4DABCF' },
  'Scikit-learn': { icon: <SiScikitlearn className="w-full h-full" />, color: '#F7931E' },
  'Matplotlib': { icon: <BsBarChartFill className="w-full h-full" />, color: '#ffffff' },
  'Seaborn': { icon: <BsGraphUp className="w-full h-full" />, color: '#4C72B0' },
  'TypeScript': { icon: <SiTypescript className="w-full h-full" />, color: '#3178C6' },
  'TailwindCSS': { icon: <SiTailwindcss className="w-full h-full" />, color: '#06B6D4' },
  'Bootstrap': { icon: <SiBootstrap className="w-full h-full" />, color: '#7952B3' },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].title);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Technical Arsenal</h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto" />
        </motion.div>

        {/* Pill Navbar for Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 px-2">
          {skillCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveTab(category.title)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base cursor-pointer ${
                activeTab === category.title
                  ? 'text-emerald-950 bg-emerald-400 shadow-[0_4px_20px_rgba(16,185,129,0.3)]'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-white/10 hover:border-emerald-500/50 hover:bg-neutral-800'
              }`}
            >
              <span className="relative z-10 font-bold">{category.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content (Logos Only) */}
        <div className="min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-wrap justify-center gap-8 md:gap-14 relative z-10 max-w-4xl mx-auto">
                {skillCategories.find(c => c.title === activeTab)?.skills.map((skill, index) => {
                  const iconData = iconMap[skill];
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05, type: 'spring' }}
                      className="w-20 h-20 md:w-28 md:h-28 bg-neutral-900/40 border border-white/5 rounded-3xl flex flex-col items-center justify-center p-5 md:p-8 text-neutral-400 hover:bg-neutral-800 transition-all duration-300 cursor-help group relative"
                      style={{ 
                        '--hover-color': iconData?.color || '#10b981'
                      } as React.CSSProperties}
                    >
                      {/* Render Icon from Map, dynamically applying the color variable on hover */}
                      <div className="w-full h-full transition-all duration-300 group-hover:![color:var(--hover-color)] group-hover:drop-shadow-[0_0_12px_var(--hover-color)]">
                        {iconData?.icon || <span className="text-3xl font-bold flex items-center justify-center h-full">{skill.substring(0, 2)}</span>}
                      </div>
                      
                      {/* Floating Tooltip visible only on hover colored dynamically */}
                      <div 
                        className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950 border text-xs font-bold font-mono py-1.5 px-3 rounded-md pointer-events-none whitespace-nowrap z-20"
                        style={{
                          borderColor: 'var(--hover-color)',
                          color: 'var(--hover-color)',
                          boxShadow: '0 4px 20px -2px var(--hover-color)'
                        }}
                      >
                        {skill}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
