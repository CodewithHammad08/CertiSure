import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, History, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ role = 'admin' }) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const adminLinks = [
    { icon: <LayoutDashboard size={20} />, label: "Overview", path: "/dashboard" },
    { icon: <FileText size={20} />, label: "Verify New", path: "/verify" },
    { icon: <History size={20} />, label: "History", path: "/history" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  const instituteLinks = [
    { icon: <LayoutDashboard size={20} />, label: "Insight", path: "/insight" },
    { icon: <FileText size={20} />, label: "Issue Cert", path: "/issue" }, // Placeholder
    { icon: <History size={20} />, label: "Issued Log", path: "/issued-log" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  const userLinks = [
    { icon: <LayoutDashboard size={20} />, label: "My Insight", path: "/user-insight" },
    { icon: <FileText size={20} />, label: "Verify", path: "/verify" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  const links = role === 'institute' ? instituteLinks : role === 'user' ? userLinks : adminLinks;

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 glass-panel border-r border-white/20 z-50"
    >
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className={`w-10 h-10 bg-gradient-to-br ${role === 'institute' ? 'from-violet-500 to-purple-600 shadow-purple-500/30' : 'from-sky-500 to-blue-600 shadow-sky-500/30'} rounded-xl flex items-center justify-center shadow-lg`}>
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-slate-800">
            {role === 'institute' ? 'CertiInsight' : 'CertiGuard'}
          </span>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const activeClass = role === 'institute' 
              ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md'
              : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md';

            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? activeClass 
                    : `text-slate-600 hover:bg-white/50 ${role === 'institute' ? 'hover:text-violet-600' : 'hover:text-sky-600'}`
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8">
        <button 
          onClick={logout}
          className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors w-full px-4 py-3 rounded-xl hover:bg-red-50"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </motion.div>
  );
};
