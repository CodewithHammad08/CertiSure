import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  Zap, Shield, CheckCircle, Globe, Lock, Server, 
  Activity, Users, FileText 
} from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Instant Verification",
      description: "Verify digital assets in milliseconds with our optimized blockchain nodes."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Military-Grade Security",
      description: "AES-256 encryption ensures your data remains tamper-proof."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
      title: "Smart Contracts",
      description: "Automated compliance checks with self-executing smart contracts."
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "Global CDN",
      description: "Access your certificates from anywhere in the world with low latency."
    },
    {
      icon: <Lock className="w-8 h-8 text-rose-600" />,
      title: "Privacy First",
      description: "Zero-knowledge proofs allow verification without revealing sensitive data."
    },
    {
      icon: <Server className="w-8 h-8 text-amber-600" />,
      title: "Decentralized Storage",
      description: "Data is distributed across thousands of nodes for redundancy."
    },
    {
      icon: <Activity className="w-8 h-8 text-cyan-600" />,
      title: "Real-time Analytics",
      description: "Monitor verification attempts and usage stats in real-time."
    },
    {
      icon: <Users className="w-8 h-8 text-lime-600" />,
      title: "Team Collaboration",
      description: "Manage permissions and roles for your entire organization."
    },
    {
      icon: <FileText className="w-8 h-8 text-pink-600" />,
      title: "Audit Trails",
      description: "Complete history of all actions for compliance and auditing."
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20 gradient-bg">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl font-bold mb-4 text-slate-900">Platform Features</h1>
        <p className="text-slate-600 text-lg">Everything you need to secure your digital future.</p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} delay={index * 0.05} className="bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white card-shadow">
            <div className="mb-4 p-3 bg-slate-50 rounded-xl inline-block">{feature.icon}</div>
            <h3 className="font-heading text-xl font-bold mb-2 text-slate-900">{feature.title}</h3>
            <p className="text-slate-600">{feature.description}</p>
          </Card>
        ))}
      </div>

      <div className="text-center mt-20">
        <h2 className="font-heading text-2xl font-bold mb-6 text-slate-900">Ready to experience the future?</h2>
        <Button variant="glow" size="lg" onClick={() => window.location.href='/get-started'}>
          Get Started Now
        </Button>
      </div>
    </div>
  );
};
