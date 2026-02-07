import { motion } from 'framer-motion';
import { Sidebar } from '../components/layout/Sidebar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Upload, FileText, Send, User, Calendar, Award } from 'lucide-react';

export const IssueCertificate = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role="institute" />
      <div className="flex-1 md:ml-64 p-8 pt-24">
        <header className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-slate-900">Issue New Certificate</h1>
          <p className="text-slate-500">Generate and secure certificates on the blockchain</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="glass-panel border-none p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-violet-600" /> Candidate Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Student Name</label>
                  <input type="text" placeholder="e.g., Jane Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Student ID / Reg No.</label>
                  <input type="text" placeholder="e.g., MIT-2024-001" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                   <input type="email" placeholder="e.g., student@university.edu" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                </div>
              </div>
            </Card>

            <Card className="glass-panel border-none p-6">
               <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-violet-600" /> Certificate Data
               </h3>
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">Degree / Course Name</label>
                     <input type="text" placeholder="e.g., Bachelor of Computer Science" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Issue Date</label>
                        <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Grade / GPA</label>
                        <input type="text" placeholder="e.g., 3.8/4.0" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                     </div>
                  </div>
               </div>
            </Card>
          </div>

          <div className="space-y-6">
             <Card className="glass-panel border-none p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                   <Upload className="w-5 h-5 text-violet-600" /> Certificate File
                </h3>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                   <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8" />
                   </div>
                   <p className="font-medium text-slate-900">Upload Certificate PDF</p>
                   <p className="text-sm text-slate-500 mt-1">Or drag and drop here</p>
                </div>
             </Card>

             <Card className="glass-panel border-none p-6 bg-gradient-to-br from-violet-900 to-indigo-900 text-white">
                <h3 className="font-bold text-lg mb-4">Ready to Issue?</h3>
                <p className="text-violet-200 text-sm mb-6">
                   This action will mint a new NFT on the blockchain representing this certificate. This process is irreversible.
                </p>
                <div className="flex items-center justify-between text-sm mb-6 p-4 bg-white/10 rounded-xl">
                   <span>Gas Fee Estimate</span>
                   <span className="font-mono font-bold">0.002 ETH</span>
                </div>
                <Button className="w-full bg-white text-violet-900 hover:bg-violet-50 border-none font-bold py-4">
                   <Send className="w-4 h-4 mr-2" /> Issue Certificate
                </Button>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
