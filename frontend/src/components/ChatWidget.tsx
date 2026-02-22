import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import { cn } from '../utils';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
}



export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [initMode, setInitMode] = useState<'idle' | 'analyzing' | 'ready'>('idle');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isWaking, setIsWaking] = useState(false);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({ isOpen: false, initMode: 'idle' });
  stateRef.current = { isOpen, initMode };

  useEffect(() => {
    const handler = () => {
      // 1. Trigger Wake Sequence
      setIsWaking(true);
      
      // 2. Open chat very quickly (after 150ms just to see the ripple start)
      setTimeout(() => {
        setIsOpen(true);
      }, 150);

      // 3. Clear wake state after the 400ms glass blur is done
      setTimeout(() => {
        setIsWaking(false);
      }, 400);

      // 4. Run the fast inline analysis
      if (stateRef.current.initMode === 'idle') {
        setInitMode('analyzing');
        setTimeout(() => {
          setInitMode('ready');
          setMessages([
            {
              id: 'welcome',
              type: 'bot',
              text: "System ready. All portfolio data has been successfully extracted and indexed. How can I assist you today?",
            }
          ]);
        }, 1200); // Fast 1.2s inline analysis
      }
    };
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setMagnetPos({ x, y });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: inputValue }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: "Thanks for asking! D AKASH is skilled in React, TypeScript, Python, and more. Feel free to explore his projects above!",
      }]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <>
      {/* Trigger button */}
      <AnimatePresence>
        {!isOpen && !isWaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              animate={{ x: magnetPos.x, y: magnetPos.y }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 1.2 }} // Orb expands 1.2x on click
              transition={{
                type: 'spring', stiffness: 300, damping: 20, mass: 0.5
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMagnetPos({ x: 0, y: 0 })}
              onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
              className="relative w-14 h-14 rounded-full flex items-center justify-center group cursor-pointer"
            >
            {/* Intense breathing emerald/teal glow layers */}
            <motion.div 
               animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
               className="absolute inset-[-8px] rounded-full bg-emerald-400/50 blur-[16px] -z-10 pointer-events-none"
            />
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
               className="absolute inset-[-2px] rounded-full bg-teal-400/60 blur-[8px] -z-10 pointer-events-none"
            />
            
            {/* Circular Core Base */}
            <div className="absolute inset-[1px] bg-neutral-950/90 backdrop-blur-md rounded-full border border-white/5 z-0 pointer-events-none" />

            {/* Subtle Node Connection Lines */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none text-emerald-500/40" viewBox="0 0 100 100">
              <motion.line x1="50" y1="50" x2="25" y2="25" stroke="currentColor" strokeWidth="1" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.line x1="50" y1="50" x2="75" y2="35" stroke="currentColor" strokeWidth="1" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
              <motion.line x1="50" y1="50" x2="45" y2="75" stroke="currentColor" strokeWidth="1" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
              <circle cx="25" cy="25" r="1.5" fill="currentColor" />
              <circle cx="75" cy="35" r="1.5" fill="currentColor" />
              <circle cx="45" cy="75" r="1.5" fill="currentColor" />
            </svg>

            {/* Thin Orbital Rings Rotating */}
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
               className="absolute inset-[4px] rounded-full border border-emerald-500/20 border-t-emerald-400 z-10 pointer-events-none"
            />
            <motion.div
               animate={{ rotate: -360 }}
               transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
               className="absolute inset-[8px] rounded-full border border-teal-500/20 border-b-teal-400 z-10 pointer-events-none"
            />

            {/* Central Glowing Dot (AI Brain) */}
            <div className="relative z-20 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] group-hover:scale-125 transition-transform duration-300 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-emerald-300"
              />
            </div>
          </motion.button>
        </motion.div>
        )}
      </AnimatePresence>

      {/* 400ms Glass Blur Action Flash */}
      <AnimatePresence>
        {isWaking && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-neutral-950/20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Background Ripple Overlay (Visible only exactly when opening) */}
      <AnimatePresence>
        {(isOpen || isWaking) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, backgroundColor: 'rgba(52, 211, 153, 0)' }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [1, 5, 8],
              backgroundColor: ['rgba(52, 211, 153, 0)', 'rgba(52, 211, 153, 0.3)', 'rgba(52, 211, 153, 0)']
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-12 right-12 z-[45] w-32 h-32 rounded-full pointer-events-none origin-center"
          />
        )}
      </AnimatePresence>



      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, filter: 'blur(10px)', transformOrigin: 'calc(100% - 24px) calc(100% - 24px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(5px)' }}
            transition={{ type: 'spring', stiffness: 450, damping: 25, mass: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[540px] bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 bg-neutral-900/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                  <Bot size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">Ask AI</p>
                  <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
              <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />
              
              {/* Fast Inline Analysis Animation */}
              {initMode === 'analyzing' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-2.5 justify-start mb-4"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600/15 border border-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-auto">
                    <Bot size={13} className="text-emerald-400" />
                  </div>
                  <div className="px-4 py-3 bg-neutral-800/80 border border-emerald-500/30 rounded-2xl rounded-bl-sm flex flex-col gap-2 min-w-[200px] shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                    <div className="text-emerald-400 text-xs font-mono font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ANALYZING PAGE CONTEXT...
                    </div>
                    <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "linear" }}
                        className="h-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx === messages.length - 1 ? 0.05 : 0 }}
                  className={cn('flex gap-2.5', msg.type === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.type === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-emerald-600/15 border border-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-auto">
                      <Bot size={13} className="text-emerald-400" />
                    </div>
                  )}
                  <div className={cn(
                    'max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                    msg.type === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-sm'
                      : 'bg-neutral-800/80 text-neutral-200 border border-white/5 rounded-bl-sm'
                  )}>
                    {msg.text}
                  </div>
                  {msg.type === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center mt-auto">
                      <User size={13} className="text-neutral-300" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 justify-start"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600/15 border border-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-auto">
                    <Bot size={13} className="text-emerald-400" />
                  </div>
                  <div className="px-4 py-3 bg-neutral-800/80 border border-white/5 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                    {[0, 0.18, 0.36].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay }}
                        className="w-1.5 h-1.5 rounded-full bg-neutral-400"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-neutral-900/40">
              <form onSubmit={handleSend} className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={initMode === 'analyzing' ? "System initializing..." : "Ask me anything..."}
                  disabled={initMode === 'analyzing'}
                  className="flex-1 bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || initMode === 'analyzing'}
                  className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 disabled:text-neutral-500 flex items-center justify-center text-white transition-all flex-shrink-0"
                >
                  <Send size={15} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
