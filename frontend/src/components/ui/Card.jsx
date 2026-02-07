import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className, delay = 0, hoverEffect = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverEffect ? { y: -10, transition: { duration: 0.3 } } : {}}
      className={cn(
        "glass-panel rounded-2xl p-6 bg-white/80",
        hoverEffect && "hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
