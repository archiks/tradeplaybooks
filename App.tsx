import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Home, LogIn } from 'lucide-react';

// Simple Router
enum Route {
  HOME = 'HOME',
  ADMIN = 'ADMIN',
  LOGIN = 'LOGIN'
}

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>(Route.HOME);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('portal') === 'admin') {
      setCurrentRoute(Route.LOGIN);
    }
  }, []);

  const navigate = (route: Route) => {
    setCurrentRoute(route);
    // Optional: Scroll to top on route change
    window.scrollTo(0, 0);
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAdminAuthenticated(true);
      navigate(Route.ADMIN);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 font-sans selection:bg-accent-cyan selection:text-black">
      {/* Floating Nav for Demo purposes */}
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="pointer-events-auto">
            <button
              onClick={() => navigate(Route.HOME)}
              className="font-serif font-bold text-xl tracking-tighter text-white hover:text-gold-400 transition-colors focus:outline-none"
            >
              Perpetual Futures Playbook<span className="text-accent-cyan">™</span>
            </button>
          </div>
          <div className="pointer-events-auto flex gap-4">
            {currentRoute === Route.ADMIN && (
              <button
                onClick={() => navigate(Route.HOME)}
                className="text-sm font-medium text-gray-400 hover:text-white flex items-center gap-2 transition-colors focus:outline-none"
              >
                <Home className="w-4 h-4" /> Exit Admin
              </button>
            )}
          </div>
        </div>
      </nav>

      <main>
        {currentRoute === Route.HOME && <LandingPage />}
        {currentRoute === Route.LOGIN && <AdminLogin onLogin={handleLogin} />}
        {currentRoute === Route.ADMIN && isAdminAuthenticated && <AdminDashboard />}
        {currentRoute === Route.ADMIN && !isAdminAuthenticated && <AdminLogin onLogin={handleLogin} />}
      </main>
    </div>
  );
};

// Admin Login Component
const AdminLogin: React.FC<{ onLogin: (success: boolean) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation
    setTimeout(() => {
      if (email === 'admin@perpetualplaybook.com' && password === 'admin') {
        onLogin(true);
      } else {
        alert('Invalid credentials. (Hint: admin@perpetualplaybook.com / admin)');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/10 rounded-full blur-[120px]" />

      <div className="glass p-10 rounded-3xl w-full max-w-md relative z-10 border border-white/5 shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="font-bold text-3xl text-white mb-2 italic tracking-tight">PF <span className="text-accent-cyan">Portal</span></h2>
          <p className="text-gray-400 text-sm">Institutional Terminal Access</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Authentication Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan/50 transition-colors"
              placeholder="admin@perpetualplaybook.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Access Key</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-cyan/50 transition-colors"
              placeholder="•••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-cyan text-black font-bold rounded-xl py-3 hover:bg-accent-cyan/80 transition-all shadow-lg shadow-accent-cyan/10 disabled:opacity-50"
          >
            {loading ? 'Verifying Credentials...' : 'Access Terminal'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest font-bold">Encrypted Credentials</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
            <code className="text-[11px] text-accent-cyan font-mono">admin@perpetualplaybook.com</code>
            <span className="text-gray-600">/</span>
            <code className="text-[11px] text-accent-cyan font-mono">admin</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;