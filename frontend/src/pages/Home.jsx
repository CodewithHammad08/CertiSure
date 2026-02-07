import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-16 gradient-bg overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md border border-white/50 rounded-full text-slate-600 text-sm font-medium mb-8 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              Trusted by 500+ Institutions
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 font-heading tracking-tight">
              Validate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-emerald-500 animate-gradient-x">Authenticity</span>
              <br /> in Seconds.
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              The blockchain-powered standard for digital credential verification. Secure, instant, and tamper-proof.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="text-lg px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1" onClick={() => navigate('/verify')}>
                Start Verification
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/50 backdrop-blur-md border-white/60 text-slate-700 hover:bg-white/80" onClick={() => navigate('/#how-it-works')}>
                How It Works
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                   </div>
                 ))}
              </div>
              <div>
                <span className="text-slate-900 font-bold">2M+</span> Certificates Verified
              </div>
            </div>
          </motion.div>

          {/* Dynamic Floating Glass Cards */}
          <div className="relative h-[600px] w-full flex items-center justify-center perspective-1000">
             {/* Main Card */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
               animate={{ opacity: 1, scale: 1, rotateY: 0 }}
               transition={{ duration: 1, delay: 0.2, type: "spring" }}
               className="relative z-20 w-80 glass-panel rounded-3xl p-6"
             >
                <div className="flex items-center justify-between mb-8">
                   <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <ShieldCheck className="text-sky-600 w-5 h-5" />
                   </div>
                   <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">VERIFIED</div>
                </div>
                <div className="space-y-4 mb-6">
                   <div className="h-2 w-3/4 bg-slate-200 rounded-full"></div>
                   <div className="h-2 w-1/2 bg-slate-200 rounded-full"></div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                   <div className="w-12 h-16 bg-white border border-slate-200 rounded flex items-center justify-center shadow-sm">
                      <span className="text-[10px] font-bold text-slate-300">PDF</span>
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-800">Degree_Final.pdf</div>
                      <div className="text-xs text-slate-500">2.4 MB • Just now</div>
                   </div>
                </div>
             </motion.div>

             {/* Floating Elements */}
             <motion.div 
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-20 right-10 z-10 glass-panel p-4 rounded-2xl flex items-center gap-3"
             >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                   <CheckCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                   <div className="text-xs font-bold text-slate-700">Calculated Score</div>
                   <div className="text-sm font-bold text-purple-600">99.8%</div>
                </div>
             </motion.div>

             <motion.div 
               animate={{ y: [10, -10, 10] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-32 -left-4 z-30 glass-panel p-4 rounded-2xl flex items-center gap-3"
             >
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                   <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm font-bold text-slate-700">Blockchain Secured</div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="text-center mb-16"
            >
               <h2 className="text-3xl font-bold mb-4 font-heading text-slate-900">How It Works</h2>
               <p className="text-slate-600 max-w-2xl mx-auto">Our AI-powered verification process ensures accurate results in seconds.</p>
            </motion.div>
            
            <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={{
                  hidden: { opacity: 0 },
                  visible: {
                     opacity: 1,
                     transition: {
                        staggerChildren: 0.2
                     }
                  }
               }}
               className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
               <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full -z-10 opacity-20"></div>
               {[
                  { title: "Upload", desc: "Upload your certificate document in PDF or image format", step: 1 },
                  { title: "Validate", desc: "Our system extracts and validates document metadata", step: 2 },
                  { title: "Verify", desc: "AI analyzes patterns and cross-references databases", step: 3 },
                  { title: "Result", desc: "Get instant verification result with confidence score", step: 4 }
               ].map((item, idx) => (
                  <motion.div 
                     key={idx} 
                     variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                     }}
                     whileHover={{ y: -5 }}
                     className="text-center relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                     <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl relative z-10">
                        {item.step}
                     </div>
                     <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                     <p className="text-sm text-slate-600">{item.desc}</p>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>
    </div>
  );
};
