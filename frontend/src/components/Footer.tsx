import { Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10 relative z-10 transition-all duration-300 hover:border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <p className="text-neutral-500 text-sm font-medium">
              &copy; {currentYear} D AKASH DORA. All rights reserved.
            </p>
            <p className="text-neutral-600 text-xs mt-1">
              Built with React, TypeScript & FastAPI
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/Akash223-0987/Portfolio.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300"
              title="View Source on GitHub"
            >
              <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Source Code
              </span>
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

