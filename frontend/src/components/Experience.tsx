import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '../utils';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <div className="w-20 h-1 bg-indigo-500 rounded-full mx-auto" />
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 relative flex group"
            >
              {/* Timeline marker */}
              <div className={cn(
                "absolute -left-[5px] md:-left-[20px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-neutral-950 transition-colors duration-300",
                item.type === 'education' ? "bg-purple-600 border-neutral-950" : "bg-indigo-600 border-neutral-950",
                "group-hover:scale-110"
              )}>
                {item.type === 'education' ? <GraduationCap size={16} className="text-white" /> : <Briefcase size={16} className="text-white" />}
              </div>

              {/* Content */}
              <div className="pl-12 md:pl-16 w-full">
                <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-neutral-800/80 transition-colors shadow-lg shadow-black/20 relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/5 text-neutral-300 whitespace-nowrap border border-white/10">
                      {item.date}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-medium text-indigo-400 mb-4">{item.institution}</h4>
                  
                  <p className="text-neutral-400 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
