import React, { useState } from 'react'

const Homepage = () => {
  const [certId, setCertId] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)

  const handleVerify = (e) => {
    e.preventDefault()
    if (!certId) return
    
    setIsVerifying(true)

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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">CertiCheck</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#verify" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Verify</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it Works</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Login
              </button>
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
                Issue Certificate
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] mix-blend-multiply opacity-70"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] mix-blend-multiply opacity-70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Live Verification System
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            Trust, but <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Verify.</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
            The global standard for secure digital credential verification. 
            Eliminate fraud and build unshakable trust with instant, tamper-proof certificate validation.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#verify" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all transform hover:-translate-y-1">
              Verify Certificate
            </a>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              Issue Certificate
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Eliminate Fraud</h3>
              <p className="text-slate-600 leading-relaxed">Fake certificates undermine credibility. Our cryptographic signatures make forgery mathematically impossible.</p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Verification</h3>
              <p className="text-slate-600 leading-relaxed">No more email chains or manual checks. Verify credentials in milliseconds via ID or QR code.</p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Standard</h3>
              <p className="text-slate-600 leading-relaxed">Trusted by institutions worldwide. Accessible from any device, anywhere, at any time.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Three simple steps to secure credentialing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 z-0"></div>

            {[
              { step: "01", title: "Issue", desc: "Organization issues a secure digital certificate with a unique ID." },
              { step: "02", title: "Share", desc: "Recipient receives the certificate and shares the QR code or ID." },
              { step: "03", title: "Verify", desc: "Verifier scans the QR or enters ID to confirm authenticity instantly." }
            ].map((item, index) => (
              <div key={index} className="relative z-10 text-center group">
                <div className="w-24 h-24 mx-auto bg-white border-2 border-slate-100 group-hover:border-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-lg transition-all duration-300">
                  <span className="text-3xl font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="verify" className="py-24 relative bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Try It Yourself</h2>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
            
            <h3 className="text-2xl font-semibold text-slate-900 mb-8">Verify a Certificate</h3>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <input 
                type="text" 
                placeholder="Enter Certificate ID (e.g. CERT-8829)" 
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 px-6 py-4 rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder-slate-400 text-lg"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
              />
              <button 
                onClick={handleVerify}
                disabled={isVerifying}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking
                  </span>
                ) : 'Verify Now'}
              </button>
            </div>

            {verificationResult && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 animate-fade-in-up">
                <div className="flex items-center justify-center gap-3 text-emerald-700 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="font-bold text-xl">Verified Successfully</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-2xl mx-auto mt-6">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Issued To</p>
                    <p className="text-slate-900 font-semibold">{verificationResult.recipient}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Issuer</p>
                    <p className="text-slate-900 font-semibold">{verificationResult.issuer}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Date</p>
                    <p className="text-slate-900 font-semibold">{verificationResult.date}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <span className="font-bold text-xl text-slate-900">CertiCheck</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">Securing the future of digital credentials with advanced cryptographic verification.</p>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Contact Support</a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs">© 2024 CertiCheck. Built by Team Vitality.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage