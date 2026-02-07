import { ShieldCheck, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">CertiSure</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Securing your digital assets with next-generation blockchain verification technology.
            </p>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Integrations</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">API</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full hover:bg-blue-600 hover:border-blue-600 transition-all text-slate-400 hover:text-white shadow-sm">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full hover:bg-blue-600 hover:border-blue-600 transition-all text-slate-400 hover:text-white shadow-sm">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full hover:bg-blue-600 hover:border-blue-600 transition-all text-slate-400 hover:text-white shadow-sm">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-full hover:bg-blue-600 hover:border-blue-600 transition-all text-slate-400 hover:text-white shadow-sm">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} CertiSure. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
