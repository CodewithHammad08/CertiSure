import { motion } from 'framer-motion';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { FileText, Search, Filter, Download, ExternalLink } from 'lucide-react';

export const IssuedLog = () => {
  const logs = [
    { id: "CERT-2024-8832", student: "Sarah Johnson", course: "B.Sc Computer Science", date: "Oct 24, 2024", txHash: "0x7a...8b2c", status: "Verified" },
    { id: "CERT-2024-8833", student: "Michael Chen", course: "B.Sc Computer Science", date: "Oct 24, 2024", txHash: "0x3c...9d1e", status: "Verified" },
    { id: "CERT-2024-8834", student: "Emma Wilson", course: "B.A. Graphic Design", date: "Oct 23, 2024", txHash: "0x2f...5a4b", status: "Pending" },
    { id: "CERT-2024-8835", student: "James Brown", course: "MBA Finance", date: "Oct 22, 2024", txHash: "0x9e...1f3c", status: "Verified" },
    { id: "CERT-2024-8836", student: "Lucas Miller", course: "M.Sc Physics", date: "Oct 20, 2024", txHash: "0x5d...7e8a", status: "Verified" },
    { id: "CERT-2024-8837", student: "Olivia Davis", course: "B.Tech Engineering", date: "Oct 18, 2024", txHash: "0x1b...4c9d", status: "Revoked" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role="institute" />
      <div className="flex-1 md:ml-64 p-8 pt-24">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">Issued Certificates Log</h1>
            <p className="text-slate-500">Track and manage all certificates issued on the blockchain</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => alert("Filter modal opening...")} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter size={18} /> Filter
             </button>
             <button onClick={() => alert("Exporting CSV...")} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors">
                <Download size={18} /> Export CSV
             </button>
          </div>
        </header>

        <Card className="glass-panel border-none overflow-hidden p-0">
           {/* Search Bar */}
           <div className="p-4 border-b border-slate-100 bg-white/50">
              <div className="relative max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                 <input 
                    type="text" 
                    placeholder="Search by student, ID, or course..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
                 />
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full">
                 <thead className="bg-slate-50 border-b border-slate-100/50">
                    <tr>
                       <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Certificate ID</th>
                       <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                       <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Course / Degree</th>
                       <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Issue Date</th>
                       <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Blockchain TX</th>
                       <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                       <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {logs.map((log, index) => (
                       <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{log.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold">
                                   {log.student.charAt(0)}
                                </div>
                                <span className="text-slate-700">{log.student}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">{log.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-500">{log.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <span className="font-mono text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded flex items-center gap-1 w-fit cursor-pointer hover:bg-sky-100">
                                {log.txHash} <ExternalLink size={10} />
                             </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                log.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                                log.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                             }`}>
                                {log.status}
                             </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                             <button className="text-slate-400 hover:text-violet-600 transition-colors">
                                <FileText size={18} />
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           {/* Pagination */}
           <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <div>Showing 1-6 of 248 results</div>
              <div className="flex gap-2">
                 <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Previous</button>
                 <button className="px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700">1</button>
                 <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
                 <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
                 <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};
