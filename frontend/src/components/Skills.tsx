import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbApi } from 'react-icons/tb';

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Skill definition: name, logo URL or JSX, brand color
const skillCategories = [
  {
    title: 'Languages',
    icon: '{ }',
    skills: [
      { name: 'Python',     logo: `${DEV}/python/python-original.svg`,          color: '#3776AB' },
      { name: 'TypeScript', logo: `${DEV}/typescript/typescript-original.svg`,  color: '#3178C6' },
      { name: 'JavaScript', logo: `${DEV}/javascript/javascript-original.svg`,  color: '#F7DF1E' },
      { name: 'Java',       logo: `${DEV}/java/java-original.svg`,              color: '#f89820' },
      { name: 'C',          logo: `${DEV}/c/c-original.svg`,                    color: '#A8B9CC' },
      { name: 'C++',        logo: `${DEV}/cplusplus/cplusplus-original.svg`,    color: '#00599C' },
      { name: 'R',          logo: `${DEV}/r/r-original.svg`,                    color: '#276DC3' },
    ],
  },
  {
    title: 'Frontend',
    icon: '◻',
    skills: [
      { name: 'React.js',   logo: `${DEV}/react/react-original.svg`,                  color: '#61DAFB' },
      { name: 'HTML5',      logo: `${DEV}/html5/html5-original.svg`,                  color: '#E34F26' },
      { name: 'CSS3',       logo: `${DEV}/css3/css3-original.svg`,                    color: '#1572B6' },
      { name: 'TailwindCSS',logo: `${DEV}/tailwindcss/tailwindcss-original.svg`,      color: '#06B6D4' },
      { name: 'Bootstrap',  logo: `${DEV}/bootstrap/bootstrap-original.svg`,          color: '#7952B3' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙',
    skills: [
      { name: 'Node.js',    logo: `${DEV}/nodejs/nodejs-original.svg`,          color: '#339933' },
      { name: 'Express.js', logo: `${DEV}/express/express-original.svg`,        color: '#ffffff', dark: true },
      { name: 'REST APIs',  logo: null,                                          color: '#0096D6' },
      { name: 'FastAPI',    logo: `${DEV}/fastapi/fastapi-original.svg`,         color: '#009688' },
    ],
  },
  {
    title: 'Databases',
    icon: '🗄',
    skills: [
      { name: 'MySQL',      logo: `${DEV}/mysql/mysql-original.svg`,            color: '#4479A1' },
      { name: 'MongoDB',    logo: `${DEV}/mongodb/mongodb-original.svg`,        color: '#47A248' },
      { name: 'Firebase',   logo: `${DEV}/firebase/firebase-original.svg`,      color: '#FFCA28' },
      { name: 'Supabase',   logo: `${DEV}/supabase/supabase-original.svg`,      color: '#3ECF8E' },
    ],
  },
  {
    title: 'Data & ML',
    icon: '📊',
    skills: [
      { name: 'Pandas',       logo: `${DEV}/pandas/pandas-original.svg`,           color: '#150458', dark: true },
      { name: 'NumPy',        logo: `${DEV}/numpy/numpy-original.svg`,             color: '#4DABCF' },
      { name: 'Scikit-learn', logo: `${DEV}/scikitlearn/scikitlearn-original.svg`, color: '#F7931E' },
      { name: 'Matplotlib',   logo: `${DEV}/matplotlib/matplotlib-original.svg`,   color: '#11557c' },
      { name: 'Seaborn',      logo: 'https://seaborn.pydata.org/_static/logo-mark-lightbg.svg', color: '#4C72B0' },
      { name: 'Power BI',     logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', color: '#F2C811' },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].title);

  const activeCategory = skillCategories.find(c => c.title === activeTab)!;

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto">
            Technologies I build with, every day.
          </p>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-5" />
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(cat.title)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer select-none ${
                activeTab === cat.title
                  ? 'bg-emerald-500 text-neutral-950 shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                  : 'text-neutral-400 bg-neutral-900/60 border border-white/8 hover:border-emerald-500/40 hover:text-white hover:bg-neutral-800/80'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.28 }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {activeCategory.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
                  className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl
                    w-[100px] sm:w-[110px] md:w-[120px]
                    bg-neutral-900/50 border border-white/6 hover:border-white/20
                    backdrop-blur-sm hover:bg-neutral-800/70
                    transition-all duration-300 cursor-default hover:-translate-y-1
                    hover:shadow-[0_8px_32px_-8px_var(--glow)]"
                  style={{ '--glow': skill.color + '66' } as React.CSSProperties}
                >
                  {/* Logo */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300
                      group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_var(--glow)]
                      ${skill.dark ? 'bg-white p-1.5' : ''}`}
                  >
                    {skill.logo ? (
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <TbApi className="w-full h-full" style={{ color: skill.color }} />
                    )}
                  </div>

                  {/* Name */}
                  <span className="text-xs font-semibold text-neutral-400 group-hover:text-white text-center leading-tight transition-colors duration-200">
                    {skill.name}
                  </span>

                  {/* Colored bottom accent on hover */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 rounded-full transition-all duration-300"
                    style={{ backgroundColor: skill.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
