const { useState, useEffect, useRef } = React;

const API_URL = "http://localhost:3000/api";

// --- Components ---

const Navbar = ({ activePage, onNavigate, user, onLogout }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'landing', label: 'Home', hidden: false },
        { id: 'how-it-works', label: 'How It Works', hidden: false },
        { id: 'pricing', label: 'Pricing', hidden: false },
        { id: 'dashboard', label: user ? (user.role === 'admin' ? 'Dashboard' : 'Insights') : 'Dashboard', hidden: false },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span className="font-poppins font-bold text-xl text-slate-800">CertifyGuard</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`text-sm font-medium transition-colors ${activePage === item.id ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                        {user ? (
                            <button onClick={onLogout} className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors">
                                Sign Out
                            </button>
                        ) : (
                            <button onClick={() => onNavigate('login')} className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors">
                                Sign In
                            </button>
                        )}
                    </div>

                    <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100">
                    <div className="px-4 py-4 space-y-3">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                                className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                            >
                                {item.label}
                            </button>
                        ))}
                        {user ? (
                            <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="block w-full px-4 py-2 bg-slate-800 text-white rounded-lg font-medium">
                                Sign Out
                            </button>
                        ) : (
                            <button onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }} className="block w-full px-4 py-2 bg-slate-800 text-white rounded-lg font-medium">
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};


const Landing = ({ onNavigate }) => (
    <section className="min-h-full pt-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
                        <span className="w-2 h-2 bg-sky-500 rounded-full pulse-ring"></span> Trusted by 500+ Institutions
                    </div>
                    <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                        Secure Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Verification</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Advanced AI-powered platform to detect fake certificates instantly. Protect your institution's integrity with military-grade verification technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => onNavigate('verify')} className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-sky-500/25 transition-all">
                            Verify Now
                        </button>
                        <button onClick={() => onNavigate('how-it-works')} className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                            Learn More
                        </button>
                    </div>
                    <div className="mt-12 flex items-center gap-8">
                        <div className="text-center">
                            <div className="font-poppins text-3xl font-bold text-slate-900">99.8%</div>
                            <div className="text-sm text-slate-500">Accuracy Rate</div>
                        </div>
                        <div className="w-px h-12 bg-slate-200"></div>
                        <div className="text-center">
                            <div className="font-poppins text-3xl font-bold text-slate-900">2M+</div>
                            <div className="text-sm text-slate-500">Verified</div>
                        </div>
                        <div className="w-px h-12 bg-slate-200"></div>
                        <div className="text-center">
                            <div className="font-poppins text-3xl font-bold text-slate-900">&lt;3s</div>
                            <div className="text-sm text-slate-500">Response</div>
                        </div>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="relative fade-in">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl blur-3xl opacity-20"></div>
                    <div className="relative bg-white rounded-3xl p-8 card-shadow">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-sm font-medium text-slate-500">Live Verification Demo</span>
                            <span className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Online
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-slate-800">certificate_2024.pdf</div>
                                    <div className="text-sm text-slate-500">Uploaded just now</div>
                                </div>
                                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-emerald-800">VERIFIED</div>
                                        <div className="text-sm text-emerald-600">Confidence: 98.7%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const HowItWorks = () => (
    <section className="min-h-full pt-16 gradient-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16 fade-in">
                <h1 className="font-poppins text-4xl font-bold text-slate-900 mb-4">How It Works</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our AI-powered verification process ensures accurate results in seconds</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[{ icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12", title: "Upload", desc: "Upload document" },
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", title: "Validate", desc: "Metadata validation" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Verify", desc: "AI Cross-check" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Result", desc: "Instant Report" }].map((step, i) => (
                    <div key={i} className="text-center fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="w-20 h-20 bg-white rounded-2xl card-shadow flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} /></svg>
                        </div>
                        <h3 className="font-poppins text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Pricing = ({ onNavigate }) => (
    <section className="min-h-full pt-16 gradient-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h1 className="font-poppins text-4xl font-bold text-slate-900 mb-4">Pricing Plans</h1>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {/* Free Trial */}
                <div className="bg-white rounded-2xl p-8 card-shadow card-hover">
                    <h3 className="font-poppins text-xl font-semibold text-slate-900 mb-2">Free Trial</h3>
                    <div className="mb-6"><span className="font-poppins text-4xl font-bold text-slate-900">$0</span> / 14 days</div>
                    <button onClick={() => onNavigate('login')} className="w-full py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all">Start Free</button>
                </div>
                {/* Annual */}
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-8 card-shadow card-hover relative text-white">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 text-sm font-semibold rounded-full">Most Popular</div>
                    <h3 className="font-poppins text-xl font-semibold mb-2">Annual Plan</h3>
                    <div className="mb-6"><span className="font-poppins text-4xl font-bold">$59</span> / year</div>
                    <button onClick={() => onNavigate('login')} className="w-full py-3 bg-white text-sky-600 rounded-xl font-semibold hover:bg-sky-50 transition-all">Get Started</button>
                </div>
                {/* Lifetime */}
                <div className="bg-white rounded-2xl p-8 card-shadow card-hover">
                    <h3 className="font-poppins text-xl font-semibold text-slate-900 mb-2">Lifetime Access</h3>
                    <div className="mb-6"><span className="font-poppins text-4xl font-bold text-slate-900">$599</span> / forever</div>
                    <button onClick={() => onNavigate('login')} className="w-full py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all">Contact Sales</button>
                </div>
            </div>
        </div>
    </section>
);

const Login = ({ onLogin, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });
            const data = await res.json();

            if (res.ok) {
                onLogin(data.user);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Connection error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-full pt-16 gradient-bg">
            <div className="min-h-full flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md fade-in">
                    <div className="bg-white rounded-2xl p-8 card-shadow">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h2 className="font-poppins text-2xl font-bold text-slate-900">{role === 'admin' ? 'Admin Portal' : 'Institution Portal'}</h2>
                            <p className="text-slate-500 mt-2 text-sm">Sign in to access your dashboard</p>
                        </div>

                        <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                            <button onClick={() => setRole('admin')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === 'admin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Admin</button>
                            <button onClick={() => setRole('institution')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === 'institution' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Institution</button>
                        </div>

                        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-500/25 transition-all">
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                        <p className="text-center mt-6 text-sm text-slate-500">Don't have an account? <button onClick={() => onNavigate('pricing')} className="text-sky-600 hover:text-sky-700 font-medium">Request Access</button></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Dashboard = ({ user, onNavigate }) => {
    const [stats, setStats] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/stats/dashboard?role=${user.role}&userId=${user.id}`);
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };
        fetchStats();
    }, [user]);

    useEffect(() => {
        if (!stats || !document.getElementById('dashboard-chart')) return;

        const ctx = document.getElementById('dashboard-chart');
        if (chartRef.current) chartRef.current.destroy();

        const verified = stats.verified || 0;
        const fake = stats.fake || 0;
        const suspicious = stats.suspicious || 0;

        chartRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Verified', 'Fake', 'Suspicious'],
                datasets: [{
                    data: [verified, fake, suspicious],
                    backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                cutout: '75%'
            }
        });

        return () => { if (chartRef.current) chartRef.current.destroy(); };
    }, [stats]);

    if (!stats) return <div className="p-8 text-center">Loading dashboard...</div>;

    return (
        <section className="min-h-full pt-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 fade-in">
                    <div>
                        <h1 className="font-poppins text-2xl font-bold text-slate-900">{user.role === 'admin' ? 'Dashboard' : 'Insights'}</h1>
                        <p className="text-slate-500">Welcome back, {user.name || 'User'}</p>
                    </div>
                    <button onClick={() => onNavigate('verify')} className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-500/25 transition-all flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        Verify Certificate
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stats Cards */}
                    <div className="bg-white rounded-2xl p-6 card-shadow card-hover fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
                        </div>
                        <div className="font-poppins text-3xl font-bold text-slate-900">{stats.verified || 0}</div>
                        <div className="text-sm text-slate-500">Certificates Verified</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 card-shadow card-hover fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">-3.2%</span>
                        </div>
                        <div className="font-poppins text-3xl font-bold text-slate-900">{stats.fake || 0}</div>
                        <div className="text-sm text-slate-500">Fake Detected</div>
                    </div>

                    {user.role === 'admin' && (
                        <div className="bg-white rounded-2xl p-6 card-shadow card-hover fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                </div>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8</span>
                            </div>
                            <div className="font-poppins text-3xl font-bold text-slate-900">{stats.connected || 0}</div>
                            <div className="text-sm text-slate-500">Institutions Connected</div>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl p-6 card-shadow card-hover fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Avg</span>
                        </div>
                        <div className="font-poppins text-3xl font-bold text-slate-900">2.3s</div>
                        <div className="text-sm text-slate-500">Response Time</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Verification Analytics</h3>
                        <div className="relative h-64">
                            <canvas id="dashboard-chart"></canvas>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Real-time Activity Log</h3>
                        <div className="space-y-4">
                            {/* Static recent activity for now */}
                            {[
                                { color: 'bg-emerald-500', text: 'Verified: IIT Bombay', time: 'Just now' },
                                { color: 'bg-red-500', text: 'Fake: ID-2024-X9Y', time: '5 mins ago' },
                                { color: 'bg-blue-500', text: 'System Check', time: '1 hr ago' }
                            ].map((log, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full ${log.color}`}></div>
                                        <span className="text-sm font-medium text-slate-700">{log.text}</span>
                                    </div>
                                    <span className="text-xs text-slate-500">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Verify = ({ onNavigate, onVerificationComplete }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cert_id: '',
        name: '',
        institute: '',
        year: ''
    });

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id.replace('cert-', '')]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file && !formData.cert_id) {
            alert("Please upload a file or enter a Certificate ID");
            return;
        }

        setLoading(true);
        const data = new FormData();
        if (file) data.append('certificate', file); // Backend expects 'certificate' not 'image'
        data.append('cert_id', formData.cert_id || 'UNKNOWN');
        data.append('name', formData.name);
        data.append('institute', formData.institute);
        data.append('year', formData.year);

        try {
            const res = await fetch(`${API_URL}/verify`, { method: 'POST', body: data });
            const resultData = await res.json();

            if (resultData.success) {
                // Map backend response format to frontend Result component expectation
                onVerificationComplete({
                    prediction: resultData.result,
                    confidence: parseFloat(resultData.confidence) || 0.99,
                    details: resultData.details?.ai_analysis || 'Verified by System'
                });
                onNavigate('result');
            } else {
                alert('Verification failed: ' + resultData.error);
            }
        } catch (err) {
            console.error(err);
            alert('Connection error during verification.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-full pt-16 gradient-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-10 fade-in">
                    <h1 className="font-poppins text-3xl font-bold text-slate-900 mb-2">Verify Certificate</h1>
                    <p className="text-slate-600">Upload a certificate document to verify its authenticity</p>
                </div>
                <div className="bg-white rounded-2xl p-8 card-shadow fade-in">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div
                            className={`upload-zone rounded-2xl p-8 text-center cursor-pointer ${file ? 'border-emerald-400 bg-emerald-50' : ''}`}
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            <input type="file" id="file-input" accept=".pdf,.png,.jpg,.jpeg" className="hidden" onChange={handleFileChange} />
                            {!file ? (
                                <div id="upload-placeholder">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-sky-100 rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                    </div>
                                    <p className="text-slate-700 font-medium mb-1">Drop your certificate here or click to browse</p>
                                    <p className="text-sm text-slate-500">Supports PDF, PNG, JPG (Max 10MB)</p>
                                </div>
                            ) : (
                                <div id="upload-success">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-slate-700 font-medium mb-1">{file.name}</p>
                                    <p className="text-sm text-emerald-600">File uploaded successfully</p>
                                </div>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Certificate ID</label>
                                <input type="text" id="cert-id" value={formData.cert_id} onChange={handleInputChange} placeholder="e.g., CERT-2024-001234" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Candidate Name</label>
                                <input type="text" id="cert-name" value={formData.name} onChange={handleInputChange} placeholder="e.g., John Smith" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Issuing Institute</label>
                                <input type="text" id="cert-institute" value={formData.institute} onChange={handleInputChange} placeholder="e.g., Stanford University" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Year of Issue</label>
                                <input type="number" id="cert-year" value={formData.year} onChange={handleInputChange} placeholder="e.g., 2024" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2">
                            {loading ? 'Verifying...' : 'Verify Now'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const Result = ({ result, onNavigate }) => {
    if (!result) return <div className="p-16 text-center">No result to display.</div>;

    const statusConfig = {
        'verified': { color: 'emerald', text: 'VERIFIED', icon: 'M5 13l4 4L19 7', subtitle: 'This certificate is authentic' },
        'fake': { color: 'red', text: 'FAKE DETECTED', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', subtitle: 'This certificate appears to be fraudulent' },
        'suspicious': { color: 'amber', text: 'SUSPICIOUS', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', subtitle: 'Manual verification recommended' }
    };

    // Exact match or fallback
    const predictionKey = result.prediction ? result.prediction.toLowerCase() : 'suspicious';
    const config = statusConfig[predictionKey] || statusConfig['suspicious'];
    const confidence = (result.confidence * 100).toFixed(1);

    // AI Analysis Data
    const analysisDetails = result.details || 'System Analysis Complete';
    const logosDetected = result.report_data?.logos_detected || [];
    const suspiciousLines = result.report_data?.suspicious_lines || [];
    const visualScore = result.report_data?.visual_score || "N/A";

    const handleDownloadReport = () => {
        const reportContent = `
CERTIFYGUARD FORENSIC REPORT
============================
Date: ${new Date().toLocaleString()}
Status: ${config.text}
Confidence: ${confidence}%

DETAILS
-------
Primary Finding: ${analysisDetails}
Visual Fraud Score: ${visualScore}

AI DETECTION
------------
Logos/Watermarks Detected: ${logosDetected.length > 0 ? logosDetected.join(', ') : 'None'}

SUSPICIOUS CONTENT
------------------
${suspiciousLines.length > 0 ? suspiciousLines.map(l => `- "${l}"`).join('\n') : 'No suspicious phrases found.'}

----------------------------
Generated by CertifyGuard AI
        `;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Forensic_Report_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <section className="min-h-full pt-16 gradient-bg">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl card-shadow overflow-hidden fade-in">
                    <div className={`p-8 text-center text-white bg-gradient-to-br from-${config.color}-500 to-${config.color}-600`}>
                        <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={config.icon} /></svg>
                        </div>
                        <h1 className="font-poppins text-4xl font-bold mb-2">{config.text}</h1>
                        <p className="text-white/80">{config.subtitle}</p>
                    </div>

                    <div className="p-8">
                        {/* Confidence Bar */}
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                            <span className="text-slate-600">AI Confidence Score</span>
                            <div className="flex items-center gap-3">
                                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full bg-${config.color}-500 rounded-full`} style={{ width: `${confidence}%` }}></div>
                                </div>
                                <span className="font-semibold text-slate-900">{confidence}%</span>
                            </div>
                        </div>

                        {/* Detailed Analysis */}
                        <div className="space-y-4 mb-8">
                            <h3 className="font-semibold text-slate-900 border-b pb-2">Analysis Details</h3>

                            <div className="flex justify-between items-start">
                                <span className="text-slate-600">Primary Finding</span>
                                <span className="font-medium text-slate-900 text-right max-w-[60%]">{analysisDetails}</span>
                            </div>

                            {logosDetected.length > 0 && (
                                <div className="flex justify-between items-start">
                                    <span className="text-red-500 font-medium">Logos Detected</span>
                                    <span className="font-bold text-red-600 text-right">{logosDetected.join(', ')}</span>
                                </div>
                            )}

                            {suspiciousLines.length > 0 && (
                                <div className="mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Suspicious Patterns</span>
                                    <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                                        {suspiciousLines.map((line, idx) => (
                                            <li key={idx} className="truncate">{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-between"><span className="text-slate-600">Timestamp</span> <span className="font-medium text-slate-900">{new Date().toLocaleString()}</span></div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => onNavigate('verify')} className="flex-1 py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors">Verify Another</button>
                            <button onClick={handleDownloadReport} className="flex-1 py-3 px-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <span className="font-poppins font-bold text-xl">CertifyGuard</span>
                </div>
                <div className="flex items-center gap-8 text-sm text-slate-400">
                    <span>© 2025 CertifyGuard. All rights reserved.</span>
                </div>
            </div>
        </div>
    </footer>
);

// --- Main App Component ---

const App = () => {
    // Initial page from hash or default to 'landing'
    const getInitialPage = () => {
        const hash = window.location.hash.replace('#', '');
        return hash || 'landing';
    };

    const [page, setPage] = useState(getInitialPage);
    const [user, setUser] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);

    // Sync state to URL hash
    useEffect(() => {
        window.location.hash = page;
    }, [page]);

    // Handle back/forward buttons
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && hash !== page) {
                setPage(hash);
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [page]);

    const handleLogin = (userData) => {
        setUser(userData);
        setPage('dashboard');
    };

    const handleLogout = () => {
        setUser(null);
        setPage('landing');
    };

    const renderPage = () => {
        switch (page) {
            case 'landing': return <Landing onNavigate={setPage} />;
            case 'how-it-works': return <HowItWorks />;
            case 'pricing': return <Pricing onNavigate={setPage} />;
            case 'login': return <Login onLogin={handleLogin} onNavigate={setPage} />;
            case 'dashboard': return user ? <Dashboard user={user} onNavigate={setPage} /> : <Login onLogin={handleLogin} onNavigate={setPage} />;
            case 'verify': return <Verify onNavigate={setPage} onVerificationComplete={setVerificationResult} />;
            case 'result': return <Result result={verificationResult} onNavigate={setPage} />;
            default: return <Landing onNavigate={setPage} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar activePage={page} onNavigate={setPage} user={user} onLogout={handleLogout} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
