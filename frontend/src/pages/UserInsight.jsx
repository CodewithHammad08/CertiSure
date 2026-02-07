import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Sidebar } from '../components/layout/Sidebar';
import { StatsChart } from '../components/ui/StatsChart';
import { 
  ShieldCheck, Eye, Download, Award, 
  Clock, Share2
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const UserInsight = () => {
  const stats = [
    { title: "My Certificates", value: "4", icon: <Award className="text-violet-600" />, trend: "Active", color: "purple", data: [4, 4, 4, 4, 4] },
    { title: "Profile Views", value: "128", icon: <Eye className="text-sky-600" />, trend: "+24 this week", color: "sky", data: [10, 15, 20, 18, 25, 30, 40] },
    { title: "Verifications", value: "45", icon: <ShieldCheck className="text-emerald-600" />, trend: "100% Success", color: "emerald", data: [5, 8, 12, 15, 20, 35, 45] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role="user" />
      <div className="flex-1 md:ml-64 p-8 pt-24">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">My Insights</h1>
            <p className="text-slate-500">Candidate Analytics Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                <span className="font-bold text-slate-600">JD</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} delay={index * 0.1} className="glass-panel border-none p-0 overflow-hidden">
               <div className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">{stat.icon}</div>
                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {stat.trend}
                    </span>
                 </div>
                 <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                 <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.title}</div>
               </div>
               <div className="h-16 w-full -mb-1 opacity-50">
                  <StatsChart data={stat.data} color={stat.color} />
               </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass-panel border-none">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-lg text-slate-900">My Certificates</h3>
                <Button size="sm" variant="outline" className="text-xs">Manage All</Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Bachelor of Computer Science", issuer: "MIT University", date: "Oct 2023", status: "Verified" },
                  { name: "Advanced React Certification", issuer: "Udemy", date: "Aug 2023", status: "Verified" },
                  { name: "UI/UX Design Fundamentals", issuer: "Google", date: "Jun 2023", status: "Verified" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                        <Award className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.issuer} • {item.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        {item.status}
                      </span>
                      <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                        <Download size={16} />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
             <Card className="glass-panel border-none h-full bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <h3 className="font-heading font-bold text-lg mb-6 relative z-10">Profile Strength</h3>
                
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center justify-center py-6">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-800" />
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="56" className="text-sky-400" />
                         </svg>
                         <div className="absolute text-3xl font-bold">85%</div>
                      </div>
                   </div>

                   <p className="text-sm text-blue-200 text-center">
                      Complete your profile to increase trust score and visibility.
                   </p>

                   <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 border-none font-bold">
                      Update Profile
                   </Button>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
