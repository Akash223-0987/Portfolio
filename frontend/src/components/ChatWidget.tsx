import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '../utils';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      text: "Hi! I'm Akash's AI assistant. Ask me anything about his projects, skills, or experience.",
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, []);

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
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-[0_4px_24px_rgba(79,70,229,0.5)] transition-colors group"
          >
            <Sparkles size={22} className="group-hover:rotate-12 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] h-[540px] bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 bg-neutral-900/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                  <Bot size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">Ask AI</p>
                  <p className="text-xs text-neutral-200 mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-200 hover:text-white flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                  placeholder="Ask me anything..."
                  className="flex-1 bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
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
