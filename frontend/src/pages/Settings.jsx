import { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Lock, Bell, Globe, Shield, CreditCard, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: <User size={18} /> },
    { id: 'security', label: 'Security & Login', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'billing', label: 'Billing & Plan', icon: <CreditCard size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role={user?.role || 'user'} />
      <div className="flex-1 md:ml-64 p-8 pt-24">
        <header className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-500">Manage your profile, preferences, and security settings</p>
        </header>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Settings Nav */}
          <div className="lg:col-span-1">
             <Card className="glass-panel border-none p-2 space-y-1">
                {tabs.map((tab) => (
                   <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                         activeTab === tab.id 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                   >
                      {tab.icon} {tab.label}
                   </button>
                ))}
             </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
             <Card className="glass-panel border-none p-8">
                {activeTab === 'profile' && (
                   <div className="space-y-8 animate-fade-in">
                      <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-blue-200">
                            {user?.name?.charAt(0) || 'U'}
                         </div>
                         <div>
                            <h3 className="text-xl font-bold text-slate-900">{user?.name || 'User Name'}</h3>
                            <p className="text-slate-500">{user?.role === 'institute' ? 'Institute Account' : 'Candidate Account'}</p>
                            <Button variant="outline" size="sm" className="mt-3 border-slate-200">Change Avatar</Button>
                         </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Display Name</label>
                            <input type="text" defaultValue={user?.name} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input type="email" defaultValue={user?.email} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all bg-slate-50" readOnly />
                         </div>
                         <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Bio / Description</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" placeholder="Tell us a bit about yourself..."></textarea>
                         </div>
                      </div>
                      
                       <div className="flex justify-end pt-4">
                          <Button onClick={() => alert("Profile updated successfully!")} className="bg-slate-900 text-white">
                             <Save className="w-4 h-4 mr-2" /> Save Changes
                          </Button>
                       </div>
                   </div>
                )}

                {activeTab === 'security' && (
                   <div className="space-y-6 animate-fade-in">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Password & Security</h3>
                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 text-amber-800 text-sm">
                         <Lock className="w-5 h-5 flex-shrink-0" />
                         <p>Two-factor authentication is recommended for Institute accounts to ensure maximum security for certificate issuance.</p>
                      </div>

                      <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                            <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                         </div>
                         <div className="grid md:grid-cols-2 gap-4">
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                              <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                              <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                           </div>
                         </div>
                      </div>

                       <div className="flex justify-end pt-4">
                          <Button onClick={() => alert("Password update simulation complete.")} className="bg-slate-900 text-white">Update Password</Button>
                       </div>
                   </div>
                )}

                {(activeTab === 'notifications' || activeTab === 'billing') && (
                   <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                         {activeTab === 'notifications' ? <Bell className="w-8 h-8 text-slate-400" /> : <CreditCard className="w-8 h-8 text-slate-400" />}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Coming Soon</h3>
                      <p className="text-slate-500 max-w-sm mx-auto mt-2">This feature is currently under development and will be available in the next update.</p>
                   </div>
                )}
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
