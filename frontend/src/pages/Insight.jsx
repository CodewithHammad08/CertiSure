import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Sidebar } from '../components/layout/Sidebar';
import { StatsChart } from '../components/ui/StatsChart';
import { 
  Building, Award, Users, TrendingUp, 
  MoreVertical, FileText, Download
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Insight = () => {
  const stats = [
    { title: "Certificates Issued", value: "8,450", icon: <Award className="text-violet-600" />, trend: "+24%", color: "purple", data: [65, 75, 70, 80, 85, 90, 95] },
    { title: "Active Students", value: "3,200", icon: <Users className="text-indigo-600" />, trend: "+12%", color: "sky", data: [40, 45, 50, 55, 60, 65, 70] },
    { title: "Verification Hits", value: "12.5k", icon: <TrendingUp className="text-emerald-600" />, trend: "+45%", color: "emerald", data: [30, 40, 45, 60, 75, 80, 90] },
    { title: "Plan Usage", value: "85%", icon: <Building className="text-rose-600" />, trend: "Premium", color: "rose", data: [85, 85, 85, 85, 85] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role="institute" />
      <div className="flex-1 md:ml-64 p-8 pt-24">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">Institute Insights</h1>
            <p className="text-slate-500">MIT University • Business Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
                onClick={() => alert("Downloading Institute Report...")}
                size="sm" 
                className="bg-violet-600 hover:bg-violet-700 text-white border-none flex items-center gap-2"
            >
               <Download size={16} /> Export Report
            </Button>
             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                <span className="font-bold text-slate-600">MI</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} delay={index * 0.1} className="glass-panel border-none p-0 overflow-hidden">
               <div className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">{stat.icon}</div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
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
                <h3 className="font-heading font-bold text-lg text-slate-900">Recent Issuance Batches</h3>
                <button onClick={() => alert("Viewing all batches...")} className="text-sm text-violet-600 font-medium hover:text-violet-700">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { batch: "Class of 2024 - B.Tech", count: 450, status: "Completed", date: "Oct 24, 2024" },
                  { batch: "MBA Sem 3 Results", count: 120, status: "Completed", date: "Oct 20, 2024" },
                  { batch: "Summer Internship Certs", count: 85, status: "Processing", date: "Just now" },
                  { batch: "Physics Dept. Awards", count: 12, status: "Draft", date: "Yesterday" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{item.batch}</div>
                        <div className="text-xs text-slate-500">{item.count} Certificates</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Processing' ? 'bg-sky-100 text-sky-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-slate-400">{item.date}</span>
                      <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
             <Card className="glass-panel border-none h-full bg-gradient-to-br from-violet-900 to-indigo-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <h3 className="font-heading font-bold text-lg mb-6 relative z-10">Subscription Plan</h3>
                
                <div className="space-y-6 relative z-10">
                   <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                      <div className="text-sm text-violet-200 mb-1">Current Plan</div>
                      <div className="text-2xl font-bold">Enterprise Tier</div>
                      <div className="text-xs text-violet-300 mt-2">Renews on Dec 31, 2025</div>
                   </div>

                   <div>
                      <div className="flex justify-between text-sm mb-2 opacity-80">
                         <span>Credits Used</span>
                         <span className="text-white">8,450 / 10,000</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                         <div className="h-full w-[85%] bg-pink-500 rounded-full"></div>
                      </div>
                   </div>
                   
                   <div className="pt-4">
                      <ul className="space-y-3 text-sm text-violet-200">
                         <li className="flex items-center gap-2"><Award size={14} /> Unlimited Api Access</li>
                         <li className="flex items-center gap-2"><Award size={14} /> Custom Branding</li>
                         <li className="flex items-center gap-2"><Award size={14} /> 24/7 Support</li>
                      </ul>
                   </div>

                   <button 
                        onClick={() => alert("Redirecting to Billing Portal...")}
                        className="w-full py-3 bg-white text-violet-900 rounded-xl font-bold text-sm hover:bg-violet-50 transition-colors mt-4"
                   >
                      Manage Subscription
                   </button>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
