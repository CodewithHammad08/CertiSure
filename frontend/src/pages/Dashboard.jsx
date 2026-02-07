import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Sidebar } from '../components/layout/Sidebar';
import { StatsChart } from '../components/ui/StatsChart';
import { Button } from '../components/ui/Button';
import { 
  ShieldCheck, AlertTriangle, Building, Clock, 
  MoreVertical, FileText
} from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { title: "Certificates Verified", value: "1,248", icon: <ShieldCheck className="text-sky-600" />, trend: "+12%", color: "sky", data: [65, 59, 80, 81, 56, 55, 40, 88, 95] },
    { title: "Fake Detected", value: "14", icon: <AlertTriangle className="text-rose-600" />, trend: "-5%", color: "rose", data: [28, 48, 40, 19, 86, 27, 90, 14] },
    { title: "Connected Inst.", value: "52", icon: <Building className="text-violet-600" />, trend: "+2", color: "purple", data: [12, 19, 3, 5, 2, 3, 52] },
    { title: "Avg. Response", value: "1.2s", icon: <Clock className="text-emerald-600" />, trend: "-0.3s", color: "emerald", data: [4, 3, 2, 2.5, 1.5, 1.2] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8 pt-24">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
             <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white border-none flex items-center gap-2">
                Export Report
             </Button>
             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                <span className="font-bold text-slate-600">A</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} delay={index * 0.1} className="glass-panel border-none p-0 overflow-hidden">
               <div className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">{stat.icon}</div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
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
                <h3 className="font-heading font-bold text-lg text-slate-900">Recent Activity</h3>
                <button className="text-sm text-sky-600 font-medium hover:text-sky-700">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "John Doe", id: "CERT-8821", status: "Verified", time: "2 mins ago" },
                  { name: "Sarah Smith", id: "CERT-9923", status: "Verified", time: "15 mins ago" },
                  { name: "Unknown User", id: "CERT-1102", status: "Fake", time: "1 hour ago" },
                  { name: "Mike Johnson", id: "CERT-4451", status: "Suspicious", time: "3 hours ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Fake' ? 'bg-rose-100 text-rose-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-slate-400">{item.time}</span>
                      <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
             <Card className="glass-panel border-none h-full bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <h3 className="font-heading font-bold text-lg mb-6 relative z-10">System Status</h3>
                
                <div className="space-y-6 relative z-10">
                   <div>
                      <div className="flex justify-between text-sm mb-2 opacity-80">
                         <span>API Latency</span>
                         <span className="text-emerald-400">12ms</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                         <div className="h-full w-1/4 bg-emerald-500 rounded-full"></div>
                      </div>
                   </div>
                   
                   <div>
                      <div className="flex justify-between text-sm mb-2 opacity-80">
                         <span>Nodes Active</span>
                         <span className="text-sky-400">14/15</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                         <div className="h-full w-[95%] bg-sky-500 rounded-full"></div>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-slate-700">
                      <p className="text-xs text-slate-400 mb-4">Last system update: Today, 09:00 AM</p>
                      <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                         View System Logs
                      </button>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
