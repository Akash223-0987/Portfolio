import { motion } from 'framer-motion';
import { Database, Code2, Cpu, Layout } from 'lucide-react';

const focusAreas = [
  {
    icon: <Layout className="text-emerald-400" size={24} />,
    title: 'Full-Stack Development',
    desc: 'Crafting responsive, high-performance web applications from end to end using modern React, Node.js, and TypeScript.'
  },
  {
    icon: <Cpu className="text-green-400" size={24} />,
    title: 'AI-Integrated Systems',
    desc: 'Connecting AI models (NLP, Computer Vision) into functional web applications and automated pipelines.'
  },
  {
    icon: <Database className="text-emerald-400" size={24} />,
    title: 'Data Analysis & Dashboards',
    desc: 'Extracting actionable insights from messy data and building interactive visualization dashboards.'
  },
  {
    icon: <Code2 className="text-emerald-400" size={24} />,
    title: 'System Design Thinking',
    desc: 'Architecting scalable, modular, and maintainable software patterns that grow seamlessly.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-neutral-200 mb-6">Professional Summary</h3>
            <div className="space-y-6 text-neutral-200 text-lg leading-relaxed">
              <p>
                I am a passionate software engineer with a strong foundation in both software development and data science. My expertise spans building scalable backend services, crafting intuitive frontend interfaces, and performing deep statistical analyses.
              </p>
              <p>
                I thrive at the intersection of product engineering and data analytics—turning complex problems into seamless, performant digital solutions while leveraging AI and ML methodologies to extract maximum value from data.
              </p>
              <p>
                Currently, I'm focusing on strengthening my full-stack expertise and building AI-integrated tooling that simplifies everyday tasks. When I'm not coding, I am usually exploring emerging technology trends or optimizing my personal workflows.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-neutral-900 border border-white/5 hover:bg-neutral-800/80 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {area.icon}
                </div>
                <h4 className="text-lg font-medium text-neutral-200 mb-2">{area.title}</h4>
                <p className="text-sm text-neutral-200 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
