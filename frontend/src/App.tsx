import Home from './pages/Home';
import { motion } from 'framer-motion';
import Galaxy from './components/Galaxy';

function App() {
  return (
    <div className="bg-black min-h-screen text-neutral-200 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-black">
        {/* Galaxy Background */}
        <div className="absolute inset-0 opacity-60">
          {/* <Galaxy 
            mouseInteraction={false} 
            transparent={true} 
            starSpeed={0.011}
            density={0.9}
            hueShift={0} 
            glowIntensity={0.3}
            twinkleIntensity={0.2}
          /> */}
        </div>

        {/* Background dark gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black z-10" />
        
        {/* Subtle grid pattern fading at the bottom */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Subtle animated Glowing Orbs to mix with Galaxy */}
        <motion.div
           animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
           className="absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-indigo-900/5 blur-[80px] z-10 will-change-transform"
        />
        
        <motion.div
           animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
           transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
           className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/5 blur-[80px] z-10 will-change-transform"
        />
      </div>

      <Home />
    </div>
  );
}
export default App;
