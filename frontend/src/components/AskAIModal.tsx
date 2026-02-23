import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Trash2 } from 'lucide-react';
import { cn } from '../utils';
import { sendChatMessage } from '../services/api';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
}

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskAIModal({ isOpen, onClose }: AskAIModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem('hasSeenAIAnimation');
    if (!hasSeenAnimation && isOpen) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setMessages([
          {
            id: 'welcome',
            type: 'bot',
            text: "System initialized. I'm Akash's AI assistant. Ask me anything about his projects, skills, or experience!",
          }
        ]);
        localStorage.setItem('hasSeenAIAnimation', 'true');
      }, 1000); // 1-second analyzing animation
    } else if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          type: 'bot',
          text: "Welcome back! I'm Akash's AI assistant. How can I help you today?",
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-cleared',
        type: 'bot',
        text: "Chat cleared! Ask me anything about Akash's projects, skills, or experience.",
      }
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping, isAnalyzing]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isAnalyzing) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const chatResponse = await sendChatMessage(userMessage);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: chatResponse.response,
      }]);
    } catch (error) {
      console.error('Failed to get chat response:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: "I'm currently having a little trouble connecting to my central servers. Please try again soon!",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-0"
          onClick={handleOutsideClick}
        >
          {/* Solid Dark Overlay with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-emerald-600/20 shadow-[0_0_20px_rgba(16,185,129,0.08)] rounded-xl overflow-hidden flex flex-col h-[80vh] max-h-[700px] z-10"
          >
            {/* Subtle Grid Line Scan Effect (Solid, No blur) */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] z-0 mix-blend-overlay">
               <motion.div 
                 animate={{ y: ['-100%', '200%'] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                 className="absolute inset-0 h-[2px] bg-emerald-400/20 shadow-[0_0_6px_rgba(52,211,153,0.4)]"
               />
            </div>

            {/* Header */}
            <div className="relative z-10 p-5 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                  <Bot size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">Ask ARC</h2>
                  <p className="text-sm text-neutral-400">Curious about my work? Ask about projects, skills, or technologies I use.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 1 && (
                  <button
                    onClick={handleClearChat}
                    className="w-8 h-8 rounded-md hover:bg-zinc-800 text-neutral-500 hover:text-red-400 flex items-center justify-center transition-colors"
                    aria-label="Clear chat"
                    title="Clear chat"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-md hover:bg-zinc-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-5 bg-zinc-950">
              
              {/* Optional 1-second analyzing animation (runs only once per session) */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex justify-center my-8"
                  >
                    <div className="px-5 py-3 border border-emerald-500/30 bg-zinc-900 rounded-lg flex items-center gap-3">
                      <Bot size={16} className="text-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-sm font-mono tracking-wider animate-pulse">
                        ANALYZING PORTFOLIO...
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn('flex gap-3', msg.type === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                      <Bot size={16} className="text-emerald-400" />
                    </div>
                  )}
                  
                  <div className={cn(
                    'max-w-[85%] px-5 py-3 text-[15px] leading-relaxed overflow-hidden',
                    msg.type === 'user'
                      ? 'bg-zinc-800 text-white rounded-2xl rounded-br-sm'
                      : 'bg-zinc-900 text-neutral-200 border border-zinc-800 rounded-2xl rounded-bl-sm prose prose-invert prose-emerald prose-p:leading-relaxed prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg max-w-none'
                  )}>
                    {msg.type === 'bot' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>

                  {msg.type === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex-shrink-0 flex items-center justify-center mt-1">
                      <User size={16} className="text-neutral-400" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot size={16} className="text-emerald-400" />
                  </div>
                  <div className="px-5 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-sm flex items-center gap-2">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="relative z-10 p-5 border-t border-zinc-800 bg-zinc-900">
              <form onSubmit={handleSend} className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isAnalyzing ? "Initializing connection..." : "Ask me anything..."}
                  disabled={isAnalyzing}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-5 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isAnalyzing}
                  className="h-[52px] px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-neutral-500 flex items-center justify-center text-white font-medium transition-colors flex-shrink-0"
                >
                  <Send size={18} className="mr-2" />
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
