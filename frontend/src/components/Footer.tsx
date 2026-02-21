export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-neutral-500 text-sm">
          &copy; {currentYear} D AKASH DORA. All rights reserved.
        </p>
        <p className="text-neutral-600 text-xs mt-2">
          Designed & Built with React, TypeScript
        </p>
      </div>
    </footer>
  );
}
