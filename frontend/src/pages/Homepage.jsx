import React, { useState } from 'react'

const Homepage = () => {
  const [certId, setCertId] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)

  const handleVerify = (e) => {
    e.preventDefault()
    if (!certId) return
    
    setIsVerifying(true)
    // Simulate API call for demo
    setTimeout(() => {
      setIsVerifying(false)
      setVerificationResult({
        valid: true,
        issuer: 'Tech Institute',
        date: '2024-02-15',
        recipient: 'Alex Johnson'
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">CertiCheck</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#verify" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Verify</a>
              <a href="#features" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">How it Works</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Login
              </button>
              <button className="bg-white text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-cyan-50 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                Issue Certificate
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
            Live Verification System
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
            Trust, but <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">Verify.</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
            The global standard for secure digital credential verification. 
            Eliminate fraud and build unshakable trust with instant, tamper-proof certificate validation.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#verify" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-1">
              Verify Certificate
            </a>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white border border-slate-700 font-bold text-lg hover:bg-slate-800 hover:border-slate-600 transition-all">
              Issue Certificate
            </button>
          </div>
        </div>
      </section>

      {/* Trust / Problem Section */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group p-8 rounded-3xl bg-slate-950 border border-slate-800 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Eliminate Fraud</h3>
              <p className="text-slate-400 leading-relaxed">Fake certificates undermine credibility. Our cryptographic signatures make forgery mathematically impossible.</p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-slate-950 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Verification</h3>
              <p className="text-slate-400 leading-relaxed">No more email chains or manual checks. Verify credentials in milliseconds via ID or QR code.</p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-slate-950 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Standard</h3>
              <p className="text-slate-400 leading-relaxed">Trusted by institutions worldwide. Accessible from any device, anywhere, at any time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Three simple steps to secure credentialing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-800 via-cyan-500/30 to-slate-800 z-0"></div>

            {[
              { step: "01", title: "Issue", desc: "Organization issues a secure digital certificate with a unique ID." },
              { step: "02", title: "Share", desc: "Recipient receives the certificate and shares the QR code or ID." },
              { step: "03", title: "Verify", desc: "Verifier scans the QR or enters ID to confirm authenticity instantly." }
            ].map((item, index) => (
              <div key={index} className="relative z-10 text-center group">
                <div className="w-24 h-24 mx-auto bg-slate-950 border-2 border-slate-800 group-hover:border-cyan-500/50 rounded-full flex items-center justify-center mb-8 shadow-lg transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <span className="text-3xl font-bold text-slate-700 group-hover:text-cyan-400 transition-colors">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Demo UI */}
      <section id="verify" className="py-24 bg-slate-900/30 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Try It Yourself</h2>
          
          <div className="bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-2xl font-semibold text-white mb-8">Verify a Certificate</h3>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <input 
                type="text" 
                placeholder="Enter Certificate ID (e.g. CERT-8829)" 
                className="flex-1 bg-slate-900 border border-slate-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600 text-lg"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
              />
              <button 
                onClick={handleVerify}
                disabled={isVerifying}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking
                  </span>
                ) : 'Verify Now'}
              </button>
            </div>

            {verificationResult && (
              <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8 animate-fade-in-up backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3 text-green-400 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="font-bold text-xl">Verified Successfully</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-2xl mx-auto mt-6">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Issued To</p>
                    <p className="text-white font-semibold">{verificationResult.recipient}</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Issuer</p>
                    <p className="text-white font-semibold">{verificationResult.issuer}</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Date</p>
                    <p className="text-white font-semibold">{verificationResult.date}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <span className="font-bold text-xl text-white">CertiCheck</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">Securing the future of digital credentials with advanced cryptographic verification.</p>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors">Contact Support</a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-900 text-center">
            <p className="text-slate-600 text-xs">© 2024 CertiCheck. Built by Team Vitality.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage