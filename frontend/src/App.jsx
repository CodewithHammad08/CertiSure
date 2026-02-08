import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Features } from './pages/Features';
import { GetStarted } from './pages/GetStarted';
import { LoginUser } from './pages/LoginUser';
import { LoginAdmin } from './pages/LoginAdmin';
import { RegisterUser } from './pages/RegisterUser';
import { RegisterInstitute } from './pages/RegisterInstitute';
import { Dashboard } from './pages/Dashboard';
import { UserInsight } from './pages/UserInsight';
import { Verify } from './pages/Verify';
import { Result } from './pages/Result';
import { Insight } from './pages/Insight';
import { IssueCertificate } from './pages/IssueCertificate';
import { IssuedLog } from './pages/IssuedLog';
import { Settings } from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/verify" element={<Verify />} />
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/login-user" element={<LoginUser />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/register-institute" element={<RegisterInstitute />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/user-insight" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserInsight />
              </ProtectedRoute>
            } />
            <Route path="/insight" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <Insight />
              </ProtectedRoute>
            } />
            <Route path="/issue" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <IssueCertificate />
              </ProtectedRoute>
            } />
            <Route path="/issued-log" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <IssuedLog />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/result" element={<Result />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="*" element={<div className="h-screen flex items-center justify-center text-2xl">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
