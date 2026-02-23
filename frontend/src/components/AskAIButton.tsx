import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface AskAIButtonProps {
  onClick: () => void;
  isFloating?: boolean;
}

export default function AskAIButton({ onClick, isFloating = false }: AskAIButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onClick();
  };

  // Modern Floating Version (Mainly used for Corner Access)
  if (isFloating) {
    return (
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: [0, -8, 0], // Floating bobbing effect
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 }
        }}
        whileHover={{ scale: 1.1, y: -12 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full 
        bg-emerald-600 text-white shadow-[0_10px_40px_rgba(16,185,129,0.5)] border border-emerald-400/50
        backdrop-blur-md transition-all duration-300 pointer-events-auto md:hidden"
      >
        <Bot size={20} className="animate-pulse" />
        <span className="font-bold text-sm tracking-wide">ARC</span>
      </motion.button>
    );
  }

  // Standard Navbar Version (Legacy/Fallback)
  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-semibold 
      bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:border-emerald-600/40 transition-all duration-300 
      group ml-2"
    >
      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 rounded-full transition-colors pointer-events-none" />
      <div className="relative flex items-center justify-center">
        <Bot size={16} className="text-emerald-400 group-hover:animate-pulse" />
      </div>
      <span className="tracking-wide text-neutral-300 group-hover:text-emerald-400 transition-colors">Ask ARC</span>
    </motion.button>
  );
}
