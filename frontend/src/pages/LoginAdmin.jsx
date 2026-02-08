import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, Eye, EyeOff, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

export const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  // We need to import supabase to check role here if AuthContext doesn't provide it immediately
  // But wait, we can just use the import from lib/supabaseClient
  // We need to add the import at top of file
  // For now, let's just use login and then fetch profile manually to be sure

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await login(email, password);
      
      // Fetch role to decide where to go
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profile?.role === 'institute') {
         navigate('/insight');
      } else if (profile?.role === 'admin') {
         navigate('/dashboard');
      } else {
         setError("Access Denied: Not an admin/institute account");
         // Optional: logout
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20 flex items-center justify-center gradient-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-emerald-100/50 rounded-3xl shadow-2xl p-8 relative z-10"
      > 
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -5 }}
            className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-slate-500">Secure access for administrators</p>
        </motion.div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'email' ? 'text-emerald-600' : 'text-slate-700'}`}>Work Email</label>
            <div className="relative group">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-emerald-500' : 'text-slate-400'}`} />
              <input 
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-400" 
                placeholder="admin@certisure.com" 
                required
              />
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} delay={1} className="text-xs text-slate-400 mt-2 ml-1">
               Try <span className="font-mono text-emerald-600 font-bold">institute@edu.com</span> for Insight Demo
            </motion.p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-medium mb-2 transition-colors ${focusedField === 'password' ? 'text-emerald-600' : 'text-slate-700'}`}>Password</label>
            <div className="relative group">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-emerald-500' : 'text-slate-400'}`} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-12 py-4 bg-white/50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-400" 
                placeholder="••••••••" 
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                 <input type="checkbox" className="peer w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all cursor-pointer" />
              </div>
              <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Keep me logged in</span>
            </label>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>}
            <Button disabled={loading} className="w-full justify-center py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/30 text-lg font-bold border-none rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? 'Accessing Portal...' : 'Access Portal'} <ArrowRight size={20} className="ml-2" />
            </Button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-8 text-center text-sm text-slate-600">
          Don't have an account? <Link to="/register-institute" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">Register Institute</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
