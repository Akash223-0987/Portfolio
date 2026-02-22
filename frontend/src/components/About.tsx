import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-6 text-neutral-300 text-lg md:text-xl leading-relaxed text-center">
            <p>
              I am a Computer Science student specializing in Data Analytics and Full-Stack Engineering, driven by the goal of building intelligent, data-centric applications. My work spans from developing <strong className="text-white">Kairos</strong>, an AI chatbot, and <strong className="text-white">Press Pulse</strong>, an automated sentiment analysis pipeline, to architecting secure cloud platforms like <strong className="text-white">NubesVault</strong>.
            </p>
            <p>
              With professional internship experience in both data analysis and backend development, I excel at combining robust engineering with actionable insights. Whether I'm creating immersive computer vision projects like my <strong className="text-white">gesture-based Mario game</strong> or building scalable financial tools like <strong className="text-white">Spendora</strong>, I focus on delivering seamless, performant solutions that bridge the gap between complex data and end-user needs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
