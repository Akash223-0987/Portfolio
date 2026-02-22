import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout() {
  const token = localStorage.getItem('admin_token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen flex bg-black text-neutral-200">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="w-64 bg-neutral-950 border-r border-white/10 flex flex-col items-start p-6"
      >
        <div className="flex items-center gap-2 mb-12">
          <div className="h-8 w-8 bg-emerald-500 rounded-lg" />
          <h2 className="text-xl font-bold text-white tracking-tight">Admin</h2>
        </div>

        <nav className="flex-1 w-full space-y-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              location.pathname === '/admin/dashboard'
                ? 'bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-neutral-400 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft size={18} />
            Back to Site
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 pb-8 w-full rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-auto text-left"
        >
          <LogOut size={18} />
          Logout
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
