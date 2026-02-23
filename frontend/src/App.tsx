import { useState } from 'react';
import Home from './pages/Home';
import { motion } from 'framer-motion';
import { SparklesCore } from './components/ui/sparkles';
import AskAIButton from './components/AskAIButton';
import AskAIModal from './components/AskAIModal';

function App() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen text-neutral-200 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black">

        {/* Aceternity Sparkles Background */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#10b981"
            speed={1}
          />
        </div>

        {/* Background dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_10%,_#000000_100%)] z-10" />
        
        {/* Subtle grid pattern fading at the bottom */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)] mix-blend-screen opacity-50" />

        {/* Subtle animated Glowing Orbs to mix with Galaxy */}
        <motion.div
           animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
           transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
           className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,78,59,0.2)_0%,transparent_60%)] z-10 will-change-transform mix-blend-screen"
        />
        
        <motion.div
           animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
           transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
           className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(19,78,74,0.15)_0%,transparent_60%)] z-10 will-change-transform mix-blend-screen"
        />
      </div>

      <Home onOpenAI={() => setIsAIModalOpen(true)} />

      {/* Global AI Floating interface (Mobile Only) */}
      <AskAIButton onClick={() => setIsAIModalOpen(true)} isFloating />
      <AskAIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  );
}
export default App;
