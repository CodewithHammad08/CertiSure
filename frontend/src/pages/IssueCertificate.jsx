import { motion } from 'framer-motion';
import { Sidebar } from '../components/layout/Sidebar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Upload, FileText, Send, User, Calendar, Award } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    candidateName: '',
    courseName: '',
    issueDate: '',
    gradeGpa: '',
    email: '',
    studentId: ''
  });
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/certificates/issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          candidateName: formData.candidateName,
          courseName: formData.courseName,
          issueDate: formData.issueDate,
          metadata: { 
            email: formData.email,
            studentId: formData.studentId,
            grade: formData.gradeGpa
          }
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to issue certificate');

      setStatus({ type: 'success', message: `Certificate Issued! ID: ${data.certificate.certificate_id}` });
      setFormData({ candidateName: '', courseName: '', issueDate: '', gradeGpa: '', email: '', studentId: '' });

    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

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
                  <input name="candidateName" value={formData.candidateName} onChange={handleChange} type="text" placeholder="e.g., Jane Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Student ID / Reg No.</label>
                  <input name="studentId" value={formData.studentId} onChange={handleChange} type="text" placeholder="e.g., MIT-2024-001" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                   <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="e.g., student@university.edu" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
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
                     <input name="courseName" value={formData.courseName} onChange={handleChange} type="text" placeholder="e.g., Bachelor of Computer Science" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Issue Date</label>
                        <input name="issueDate" value={formData.issueDate} onChange={handleChange} type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Grade / GPA</label>
                        <input name="gradeGpa" value={formData.gradeGpa} onChange={handleChange} type="text" placeholder="e.g., 3.8/4.0" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all" />
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
                <div 
                  onClick={() => document.getElementById('file-upload').click()}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                   <input 
                      type="file" 
                      id="file-upload" 
                      className="hidden" 
                      onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                      accept=".pdf,.jpg,.jpeg,.png"
                   />
                   <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="w-8 h-8" />
                   </div>
                   <p className="font-medium text-slate-900">{fileName ? fileName : "Upload Certificate PDF"}</p>
                   <p className="text-sm text-slate-500 mt-1">{fileName ? "Click to change file" : "Or drag and drop here"}</p>
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
                {status.message && (
                  <div className={`p-4 rounded-xl mb-4 text-sm font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                    {status.message}
                  </div>
                )}
                <Button onClick={handleSubmit} disabled={loading} className="w-full bg-white text-violet-900 hover:bg-violet-50 border-none font-bold py-4 disabled:opacity-70 disabled:cursor-not-allowed">
                   {loading ? <span className="flex items-center"><span className="animate-spin mr-2">⏳</span> Issuing...</span> : <span className="flex items-center"><Send className="w-4 h-4 mr-2" /> Issue Certificate</span>}
                </Button>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
