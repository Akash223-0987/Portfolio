import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const educationData = [
  {
    id: 1,
    title: 'Class 12th',
    institution: 'Kendriya Vidyalaya Berhampur',
    date: '2023',
    description: 'Completed higher secondary education with a strong foundation in science and mathematics.',
  },
  {
    id: 2,
    title: 'B.Tech in Computer Science',
    institution: 'Vellore Institute of Technology (VIT) AP, Andhra Pradesh',
    date: '2024 - Present',
    description: 'Pursuing undergraduate degree with a focus on core computer science subjects, software engineering, and modern web development technologies.',
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto" />
        </motion.div>

        <div className="relative border-l-2 border-emerald-500/30 ml-4 md:ml-0 md:pl-0">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 relative flex group"
            >
              {/* Timeline marker with pulsing animation */}
              <div className="absolute -left-[21px] md:-left-[21px] top-0">
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 border-4 border-neutral-950 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                    <GraduationCap size={16} className="text-white relative z-10" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pl-12 md:pl-16 w-full">
                <div className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-neutral-800/80 transition-colors shadow-lg shadow-black/20 hover:border-emerald-500/30 relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                    <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 whitespace-nowrap border border-emerald-500/20 shadow-[0_0_10px_rgba(79,70,229,0.1)]">
                      {item.date}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-medium text-neutral-300 border-b border-white/5 pb-3 mb-4">{item.institution}</h4>
                  
                  <p className="text-neutral-200 leading-relaxed text-base">
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
