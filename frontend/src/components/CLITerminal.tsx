import { useState, useRef, useEffect, useCallback } from 'react';
import { streamChatMessage } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Minimize2, Maximize2 } from 'lucide-react';

// ─── Type Definitions ─────────────────────────────────────────────────────────
interface OutputLine {
  id: number;
  type: 'command' | 'output' | 'error' | 'success' | 'info' | 'ascii' | 'link';
  content: string;
  href?: string;
}

// Lines before id is assigned
type RawLine = Omit<OutputLine, 'id'>;

// ─── ID counter ────────────────────────────────────────────────────────────────
let lineIdCounter = 1;
function makeLines(lines: RawLine[]): OutputLine[] {
  return lines.map(l => ({ ...l, id: lineIdCounter++ }));
}

// ─── Banner ────────────────────────────────────────────────────────────────────
function getBanner(): RawLine[] {
  return [
    { type: 'ascii',  content: ' █████╗ ██╗  ██╗ █████╗ ███████╗██╗  ██╗' },
    { type: 'ascii',  content: '██╔══██╗██║ ██╔╝██╔══██╗██╔════╝██║  ██║' },
    { type: 'ascii',  content: '███████║█████╔╝ ███████║███████╗███████║' },
    { type: 'ascii',  content: '██╔══██║██╔═██╗ ██╔══██║╚════██║██╔══██║' },
    { type: 'ascii',  content: '██║  ██║██║  ██╗██║  ██║███████║██║  ██║' },
    { type: 'ascii',  content: '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝' },
    { type: 'output', content: '' },
    { type: 'info',   content: "  Welcome to Akash's Portfolio Terminal v2.0 — powered by ARC AI" },
    { type: 'output', content: '  Type  help  to see all commands.  Try  ask <question>  to chat with AI.' },
    { type: 'output', content: '' },
  ];
}

// ─── CLI Command Registry ──────────────────────────────────────────────────────
const COMMANDS: Record<string, { description: string; fn: () => RawLine[] }> = {
  help: {
    description: 'List all available commands',
    fn: () => [
      { type: 'info',    content: '┌─────────────────────────────────────────────────────┐' },
      { type: 'info',    content: '│              📟 Available Commands                  │' },
      { type: 'info',    content: '└─────────────────────────────────────────────────────┘' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  🔗  SOCIAL & CONTACT' },
      { type: 'output',  content: '  github         → Open GitHub profile' },
      { type: 'output',  content: '  linkedin        → Open LinkedIn profile' },
      { type: 'output',  content: '  email           → Open email client' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  🧑  PORTFOLIO' },
      { type: 'output',  content: '  whoami          → About Akash' },
      { type: 'output',  content: '  skills          → Tech stack & skills' },
      { type: 'output',  content: '  projects         → List all projects' },
      { type: 'output',  content: '  education        → Education background' },
      { type: 'output',  content: '  experience       → Work experience' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  🚀  PROJECTS (open live)' },
      { type: 'output',  content: '  open kairos      → Launch Kairos AI chatbot' },
      { type: 'output',  content: '  open nubesvault  → Launch NubesVault storage app' },
      { type: 'output',  content: '  open mario       → Gesture Mario on GitHub' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  🤖  AI ASSISTANT (ARC)' },
      { type: 'output',  content: '  ask <question>   → Ask the ARC AI anything about Akash' },
      { type: 'output',  content: '  arc <question>   → Alias for ask' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  ⚙️  SYSTEM' },
      { type: 'output',  content: '  clear            → Clear terminal  (Ctrl+L)' },
      { type: 'output',  content: '  banner           → Show welcome banner' },
      { type: 'output',  content: '  date             → Show current date & time' },
      { type: 'output',  content: '  echo <text>      → Print text to terminal' },
      { type: 'output',  content: '  exit             → Close terminal' },
    ],
  },
  github: {
    description: 'Open GitHub profile',
    fn: () => {
      window.open('https://github.com/Akash223-0987', '_blank');
      return [{ type: 'success', content: '  ✓ Opening GitHub → github.com/Akash223-0987' }];
    },
  },
  linkedin: {
    description: 'Open LinkedIn profile',
    fn: () => {
      window.open('https://www.linkedin.com/in/akash-dora', '_blank');
      return [{ type: 'success', content: '  ✓ Opening LinkedIn → linkedin.com/in/akash-dora' }];
    },
  },
  email: {
    description: 'Open email client',
    fn: () => {
      window.open('mailto:[EMAIL_ADDRESS]', '_blank');
      return [{ type: 'success', content: '  ✓ Opening email client...' }];
    },
  },
  whoami: {
    description: 'About Akash',
    fn: () => [
      { type: 'info',    content: '  ╔══════════════════════════════════════════════╗' },
      { type: 'info',    content: '  ║            D A K A S H   D O R A            ║' },
      { type: 'info',    content: '  ╚══════════════════════════════════════════════╝' },
      { type: 'output',  content: '' },
      { type: 'output',  content: '  👤  Name      : D Akash Dora' },
      { type: 'output',  content: '  🎓  Degree    : B.Tech in CSE (Data Analytics)' },
      { type: 'output',  content: '  🏫  College   : VIT-AP, Andhra Pradesh' },
      { type: 'output',  content: '  📍  Location  : India' },
      { type: 'output',  content: '  💡  Focus     : Full-Stack • AI • Data Analytics' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  Building intelligent systems one commit at a time. 🚀' },
    ],
  },
  skills: {
    description: 'Tech stack & skills',
    fn: () => [
      { type: 'success', content: '  ── Languages ──────────────────────────────────' },
      { type: 'output',  content: '  Python  Java  C  C++  JavaScript  TypeScript  R' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  ── Frontend ───────────────────────────────────' },
      { type: 'output',  content: '  React.js  HTML  CSS  TailwindCSS  Bootstrap' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  ── Backend ────────────────────────────────────' },
      { type: 'output',  content: '  Node.js  Express.js  FastAPI  MySQL  MongoDB' },
      { type: 'output',  content: '  PostgreSQL  Firebase  Supabase  Google Cloud' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  ── Data & ML ──────────────────────────────────' },
      { type: 'output',  content: '  Pandas  NumPy  Scikit-learn  Matplotlib  Power BI' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  ── Tools ──────────────────────────────────────' },
      { type: 'output',  content: '  Git  GitHub  Postman  MATLAB  Jupyter  PyCharm' },
    ],
  },
  projects: {
    description: 'List all projects',
    fn: () => [
      { type: 'info',    content: '  ┌─────────────────────────────────────────────────────┐' },
      { type: 'info',    content: '  │                   📂 Projects                       │' },
      { type: 'info',    content: '  └─────────────────────────────────────────────────────┘' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  [1] Kairos AI' },
      { type: 'output',  content: '      Intelligent AI chatbot • HTML CSS Node.js Express' },
      { type: 'output',  content: '      ↳ Run: open kairos' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  [2] Gesture-Based Mario Game' },
      { type: 'output',  content: '      CV-powered game with hand gestures • Java OpenCV' },
      { type: 'output',  content: '      ↳ Run: open mario' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  [3] NubesVault' },
      { type: 'output',  content: '      Secure cloud storage • React Node MongoDB OAuth' },
      { type: 'output',  content: '      ↳ Run: open nubesvault' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  [4] Press Pulse  [ONGOING]' },
      { type: 'output',  content: '      News aggregation + sentiment analysis • Python FastAPI' },
      { type: 'output',  content: '' },
      { type: 'success', content: '  [5] Spendora  [ONGOING]' },
      { type: 'output',  content: '      Smart expense tracker • React Node PostgreSQL Supabase' },
    ],
  },
  education: {
    description: 'Education background',
    fn: () => [
      { type: 'success', content: '  🎓 Education' },
      { type: 'output',  content: '' },
      { type: 'info',    content: '  ▸ B.Tech in Computer Science Engineering (Data Analytics)' },
      { type: 'output',  content: '    Vellore Institute of Technology (VIT-AP)' },
      { type: 'output',  content: '    2024 – Present' },
      { type: 'output',  content: '' },
      { type: 'info',    content: '  ▸ Class 12th' },
      { type: 'output',  content: '    Kendriya Vidyalaya, Berhampur' },
      { type: 'output',  content: '    2023' },
    ],
  },
  experience: {
    description: 'Work experience',
    fn: () => [
      { type: 'success', content: '  💼 Work Experience' },
      { type: 'output',  content: '' },
      { type: 'info',    content: '  ▸ Data Analyst Intern' },
      { type: 'output',  content: '    Analytics dashboards + customer retention • Python SQL' },
      { type: 'output',  content: '' },
      { type: 'info',    content: '  ▸ Full Stack Developer Intern' },
      { type: 'output',  content: '    Backend microservices + React components • FastAPI React' },
    ],
  },
  banner: {
    description: 'Show welcome banner',
    fn: () => getBanner(),
  },
  date: {
    description: 'Show current date & time',
    fn: () => [
      {
        type: 'info',
        content: `  🕐  ${new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'medium',
        } as Intl.DateTimeFormatOptions)} IST`,
      },
    ],
  },
  exit: {
    description: 'Close terminal',
    fn: () => [{ type: 'info', content: '  Closing terminal... Goodbye! 👋' }],
  },
};

// Project open commands
const OPEN_COMMANDS: Record<string, { url: string; label: string }> = {
  kairos:     { url: 'https://kairos-nine-sepia.vercel.app',                         label: 'Kairos AI' },
  nubesvault: { url: 'https://nubes-vault.vercel.app',                               label: 'NubesVault' },
  mario:      { url: 'https://github.com/Akash223-0987/2D-Game-using-hand-Gestures', label: 'Gesture Mario (GitHub)' },
};

// ─── Component ─────────────────────────────────────────────────────────────────
interface CLITerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CLITerminal({ isOpen, onClose }: CLITerminalProps) {
  const [input, setInput]           = useState('');
  const [history, setHistory]       = useState<OutputLine[]>(() => makeLines(getBanner()));
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized]   = useState(false);
  const [isAIStreaming, setIsAIStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const processCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const cmdLine: OutputLine = { id: lineIdCounter++, type: 'command', content: trimmed };

    setCmdHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const parts = trimmed.toLowerCase().split(/\s+/);
    const cmd   = parts[0];
    const args  = parts.slice(1);

    let responseLines: OutputLine[] = [];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd === 'exit') {
      setHistory(prev => [...prev, cmdLine, ...makeLines(COMMANDS.exit.fn())]);
      setInput('');
      setTimeout(onClose, 800);
      return;
    }

    // ── AI ask / arc command ─────────────────────────────────────────────────
    if ((cmd === 'ask' || cmd === 'arc') && args.length > 0) {
      // Reconstruct question from original raw input (preserve casing)
      const question = raw.trim().slice(cmd.length).trim();
      const thinkingId = lineIdCounter++;
      const responseId = lineIdCounter++;

      setHistory(prev => [
        ...prev,
        cmdLine,
        { id: thinkingId, type: 'info', content: '  [ARC] ◌ Thinking...' },
      ]);
      setInput('');
      setIsAIStreaming(true);

      (async () => {
        try {
          let fullText = '';
          let isFirst = true;

          for await (const chunk of streamChatMessage(question)) {
            if (isFirst) {
              // Replace the "Thinking..." placeholder with first real content
              setHistory(prev =>
                prev.map(l =>
                  l.id === thinkingId
                    ? { ...l, id: responseId, type: 'output' as const, content: `  [ARC] ${chunk}` }
                    : l
                )
              );
              fullText = chunk;
              isFirst = false;
            } else {
              fullText += chunk;
              setHistory(prev =>
                prev.map(l =>
                  l.id === responseId
                    ? { ...l, content: `  [ARC] ${fullText}` }
                    : l
                )
              );
            }
          }

          // If stream ended with no content at all
          if (isFirst) {
            setHistory(prev =>
              prev.map(l =>
                l.id === thinkingId
                  ? { ...l, type: 'error' as const, content: '  [ARC] No response received. Please try again.' }
                  : l
              )
            );
          }
        } catch (err: any) {
          setHistory(prev =>
            prev.map(l =>
              l.id === thinkingId
                ? { ...l, type: 'error' as const, content: `  [ARC] ✗ ${err?.message ?? 'Connection error'}` }
                : l
            )
          );
        } finally {
          setIsAIStreaming(false);
        }
      })();
      return;
    }

    if ((cmd === 'ask' || cmd === 'arc') && args.length === 0) {
      responseLines = makeLines([
        { type: 'info',   content: '  [ARC] Usage: ask <your question about Akash>' },
        { type: 'output', content: '  Example: ask What projects has Akash built?' },
      ]);
    } else if (cmd === 'echo') {
      const text = raw.trim().slice(5).trim();
      responseLines = makeLines([{ type: 'output', content: `  ${text || ''}` }]);
    } else if (cmd === 'open' && args[0]) {
      const proj = OPEN_COMMANDS[args[0]];
      if (proj) {
        window.open(proj.url, '_blank');
        responseLines = makeLines([{ type: 'success', content: `  ✓ Opening ${proj.label} → ${proj.url}` }]);
      } else {
        responseLines = makeLines([{ type: 'error', content: `  ✗ Unknown project: "${args[0]}". Try: open kairos | open nubesvault | open mario` }]);
      }
    } else if (COMMANDS[cmd]) {
      responseLines = makeLines(COMMANDS[cmd].fn());
    } else {
      responseLines = makeLines([
        { type: 'error',  content: `  ✗ Command not found: "${cmd}"` },
        { type: 'output', content: '    Type  help  to see all available commands.' },
      ]);
    }

    setHistory(prev => [...prev, cmdLine, ...responseLines]);
    setInput('');
  }, [onClose]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? '' : cmdHistory[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const allCmds = [...Object.keys(COMMANDS), 'clear', 'open kairos', 'open nubesvault', 'open mario', 'echo', 'ask', 'arc'];
      const match = allCmds.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const getLineColor = (type: OutputLine['type']) => {
    switch (type) {
      case 'command': return 'text-emerald-400';
      case 'error':   return 'text-red-400';
      case 'success': return 'text-emerald-300 font-semibold';
      case 'info':    return 'text-cyan-400';
      case 'ascii':   return 'text-emerald-500 font-bold';
      case 'link':    return 'text-blue-400 underline cursor-pointer';
      default:        return 'text-neutral-300';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`fixed z-[70] flex flex-col font-mono shadow-2xl
              ${isMaximized
                ? 'inset-4 rounded-2xl'
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-3xl h-[75vh] rounded-2xl'
              }`}
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 100%)',
              border: '1px solid rgba(52,211,153,0.2)',
              boxShadow: '0 0 60px rgba(52,211,153,0.08), 0 30px 100px rgba(0,0,0,0.6)',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b shrink-0"
              style={{ borderColor: 'rgba(52,211,153,0.15)' }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  title="Close"
                />
                <button
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
                  title="Minimise"
                />
                <button
                  onClick={() => setIsMaximized(m => !m)}
                  className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors"
                  title="Maximise"
                />
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 text-neutral-400 text-xs tracking-wider">
                <Terminal size={13} className="text-emerald-500" />
                <span>akash@portfolio:~</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMaximized(m => !m)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-white/5 transition-all"
                  title={isMaximized ? 'Restore' : 'Maximise'}
                >
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-white/5 transition-all"
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Output area */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 text-sm leading-relaxed">
              {history.map(line => (
                <div key={line.id} className={`whitespace-pre-wrap break-all ${getLineColor(line.type)}`}>
                  {line.type === 'command' ? (
                    <span>
                      <span className="text-emerald-500 select-none">❯ </span>
                      {line.content}
                    </span>
                  ) : (
                    line.content || '\u00A0'
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-t shrink-0"
              style={{ borderColor: 'rgba(52,211,153,0.15)' }}
            >
              <span className={`text-sm select-none shrink-0 ${isAIStreaming ? 'text-cyan-400 animate-pulse' : 'text-emerald-500'}`}>❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isAIStreaming}
                className="flex-1 bg-transparent text-emerald-100 text-sm outline-none caret-emerald-400 placeholder-neutral-700 disabled:opacity-50"
                placeholder={isAIStreaming ? 'ARC is responding…' : "type a command… (try 'help' or 'ask')"}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>

            {/* Hint strip */}
            <div className="px-4 pb-2.5 flex gap-4 text-[10px] text-neutral-700 shrink-0">
              <span>↑↓ history</span>
              <span>Tab autocomplete</span>
              <span>Ctrl+L clear</span>
              <span className="ml-auto text-cyan-900">ask &lt;question&gt; → ARC AI</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
