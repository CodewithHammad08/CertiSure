import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Removed local cn function

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20",
  secondary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20",
  outline: "border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 bg-white",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  glow: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
};

export const Button = ({ 
  children, 
  variant = "primary", 
  className, 
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
