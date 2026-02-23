import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface AskAIButtonProps {
  onClick: () => void;
  isMobile?: boolean;
}

export default function AskAIButton({ onClick, isMobile = false }: AskAIButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onClick();
  };

  if (isMobile) {
    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group"
      >
        <Bot size={18} className="text-emerald-400 group-hover:animate-pulse" />
        Ask ARC
      </button>
    );
  }

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
      {/* Background Glow on hover */}
      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 rounded-full transition-colors pointer-events-none" />

      {/* Simplified AI Icon */}
      <div className="relative flex items-center justify-center">
        <Bot size={16} className="text-emerald-400 group-hover:animate-pulse" />
      </div>

      <span className="tracking-wide text-neutral-300 group-hover:text-emerald-400 transition-colors">Ask ARC</span>
    </motion.button>
  );
}
