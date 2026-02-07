import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Home = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900"
          >
            Secure Your Future with <br />
            <span className="text-gradient">CertiSure Assurance</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
          >
            The world's most advanced blockchain certification platform. Verify assets, secure identities, and build trust in the digital age.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="glow" size="lg" onClick={() => window.location.href='/get-started'}>Start Free Trial <ArrowRight size={20} /></Button>
            <Button variant="outline" size="lg">View Demo</Button>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Why Choose CertiSure?</h2>
            <p className="text-slate-600">Military-grade encryption meets user-friendly design.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card delay={0.1}>
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-900">Lightning Fast</h3>
              <p className="text-slate-600">
                Verification in milliseconds. Our optimized nodes ensure you never wait for confirmation.
              </p>
            </Card>
            <Card delay={0.2}>
              <Shield className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-900">Unbreakable Security</h3>
              <p className="text-slate-600">
                AES-256 encryption and distributed ledger technology protect your data from any threat.
              </p>
            </Card>
            <Card delay={0.3}>
              <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-900">Global Compliance</h3>
              <p className="text-slate-600">
                Fully compliant with GDPR, CCPA, and international blockchain standards.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Ready to get started?</h2>
                <p className="text-blue-100">Join 10,000+ companies securing their future today.</p>
              </div>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-transparent shadow-lg" size="lg">Get Certified Now</Button>
            </div>
         </div>
      </section>
    </div>
  );
};
