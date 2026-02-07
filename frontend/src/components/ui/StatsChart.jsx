export const StatsChart = ({ data, color = "sky" }) => {
  // Simple mock data visualizer using SVG
  // data should be array of numbers 0-100
  const points = data.map((val, i) => `${i * (100 / (data.length - 1))},${100 - val}`).join(' ');
  
  const colors = {
    sky: { stroke: "#0ea5e9", fill: "rgba(14, 165, 233, 0.1)" },
    emerald: { stroke: "#10b981", fill: "rgba(16, 185, 129, 0.1)" },
    purple: { stroke: "#8b5cf6", fill: "rgba(139, 92, 246, 0.1)" },
    rose: { stroke: "#f43f5e", fill: "rgba(244, 63, 94, 0.1)" }
  };

  const theme = colors[color] || colors.sky;

  return (
    <div className="w-full h-16 relative overflow-hidden rounded-lg">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
           <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" style={{ stopColor: theme.stroke, stopOpacity: 0.2 }} />
             <stop offset="100%" style={{ stopColor: theme.stroke, stopOpacity: 0 }} />
           </linearGradient>
        </defs>
        <path 
           d={`M0,100 ${points} 100,100 Z`} 
           fill={`url(#grad-${color})`} 
        />
        <polyline 
           points={points} 
           fill="none" 
           stroke={theme.stroke} 
           strokeWidth="2" 
           strokeLinecap="round" 
           strokeLinejoin="round" 
           vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};
