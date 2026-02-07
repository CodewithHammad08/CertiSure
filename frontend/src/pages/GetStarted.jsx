import { motion } from 'framer-motion';
import { User, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

export const GetStarted = () => {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Welcome to CertiSure</h1>
          <p className="text-slate-600 text-lg">Select your role to continue.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/login-user" className="group">
            <Card className="h-full flex flex-col items-center text-center p-12 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-xl group-hover:shadow-blue-500/10">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <User className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900">User Login</h2>
              <p className="text-slate-600 mb-8">
                Access your certificates, verify assets, and manage your personal portfolio.
              </p>
              <Button variant="outline" className="w-full justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                Continue as User
              </Button>
            </Card>
          </Link>

          <Link to="/login-admin" className="group">
            <Card delay={0.1} className="h-full flex flex-col items-center text-center p-12 transition-all duration-300 group-hover:border-emerald-500 group-hover:shadow-xl group-hover:shadow-emerald-500/10">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <ShieldCheck className="w-10 h-10 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Admin Portal</h2>
              <p className="text-slate-600 mb-8">
                Manage organization settings, issue certificates, and view analytics.
              </p>
              <Button variant="outline" className="w-full justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600">
                Continue as Admin
              </Button>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};
