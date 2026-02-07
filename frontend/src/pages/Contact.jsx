import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Contact = () => {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Get in Touch</h1>
        <p className="text-slate-600 text-lg">We'd love to hear from you. Send us a message.</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold mb-1 text-slate-900">Email Us</h3>
                <p className="text-slate-600 text-sm">support@certisure.com</p>
                <p className="text-slate-600 text-sm">sales@certisure.com</p>
              </div>
            </div>
          </Card>
          
          <Card delay={0.1}>
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-emerald-600 mt-1" />
              <div>
                <h3 className="font-bold mb-1 text-slate-900">Live Chat</h3>
                <p className="text-slate-600 text-sm">Available Mon-Fri, 9am - 5pm EST.</p>
              </div>
            </div>
          </Card>

          <Card delay={0.2}>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold mb-1 text-slate-900">Office</h3>
                <p className="text-slate-600 text-sm">123 Blockchain Blvd, Crypto City, CC 10101</p>
              </div>
            </div>
          </Card>
        </div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 glass-panel p-8 rounded-2xl bg-white"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400" placeholder="Doe" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400" placeholder="john@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
            <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400" placeholder="How can we help you?"></textarea>
          </div>
          
          <Button variant="primary" className="w-full justify-center">Send Message</Button>
        </motion.form>
      </div>
    </div>
  );
};
