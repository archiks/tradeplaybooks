import React, { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { RefundPolicy } from './components/legal/RefundPolicy';
import { UserAgreement } from './components/legal/UserAgreement';
import { Home } from 'lucide-react';
import { CartProvider } from './components/shop/cart';
import { NavContext } from './components/shop/nav';
import { CartDrawer } from './components/shop/CartDrawer';
import { ProductPage } from './components/shop/ProductPage';
import { CheckoutPage } from './components/shop/CheckoutPage';
import { OrderConfirmed } from './components/shop/OrderConfirmed';

// Simple Router
export enum Route {
  HOME = 'HOME',
  ADMIN = 'ADMIN',
  LOGIN = 'LOGIN',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  REFUND = 'REFUND',
  AGREEMENT = 'AGREEMENT',
  PRODUCT = 'PRODUCT',
  CHECKOUT = 'CHECKOUT',
  CONFIRMED = 'CONFIRMED'
}

const getRouteFromPath = () => {
  const path = window.location.pathname;
  if (path === '/privacy-policy') return Route.PRIVACY;
  if (path === '/terms-and-conditions') return Route.TERMS;
  if (path === '/refund-policy') return Route.REFUND;
  if (path === '/user-agreement') return Route.AGREEMENT;
  if (path === '/admin') return Route.LOGIN;
  if (path.startsWith('/product/')) return Route.PRODUCT;
  if (path === '/checkout') return Route.CHECKOUT;
  if (path === '/order-confirmed') return Route.CONFIRMED;
  return Route.HOME;
};

const getSlugFromPath = () => {
  const m = window.location.pathname.match(/^\/product\/([^/]+)\/?$/);
  return m ? decodeURIComponent(m[1]) : '';
};

const getPathFromRoute = (route: Route) => {
  if (route === Route.PRIVACY) return '/privacy-policy';
  if (route === Route.TERMS) return '/terms-and-conditions';
  if (route === Route.REFUND) return '/refund-policy';
  if (route === Route.AGREEMENT) return '/user-agreement';
  if (route === Route.ADMIN || route === Route.LOGIN) return '/admin';
  return '/';
};

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>(getRouteFromPath());
  const [productSlug, setProductSlug] = useState(getSlugFromPath());
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const handlePopState = () => { setCurrentRoute(getRouteFromPath()); setProductSlug(getSlugFromPath()); };
    window.addEventListener('popstate', handlePopState);

    const params = new URLSearchParams(window.location.search);
    if (params.get('??portal') === 'admin') {
      setCurrentRoute(Route.LOGIN);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: Route) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', getPathFromRoute(route));
    window.scrollTo(0, 0);
  };

  // Path-based navigation for the shop pages: go('/product/pizza-box'), go('/#catalog')
  const go = useCallback((to: string) => {
    const [path, hash] = to.split('#');
    window.history.pushState({}, '', to);
    setCurrentRoute(getRouteFromPath());
    setProductSlug(getSlugFromPath());
    if (hash) {
      // wait for the home page to render, then jump to the section
      setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 60);
    } else {
      window.scrollTo(0, 0);
    }
    void path;
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAdminAuthenticated(true);
      navigate(Route.ADMIN);
    }
  };

  const isShopSurface = currentRoute !== Route.ADMIN && currentRoute !== Route.LOGIN;

  return (
    <NavContext.Provider value={go}>
    <CartProvider>
    <div className="min-h-screen bg-paper text-ink font-sans">
      {/* Admin-only top bar (the landing page renders its own header) */}
      {(currentRoute === Route.ADMIN || currentRoute === Route.LOGIN) && (
        <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => navigate(Route.HOME)}
              className="pointer-events-auto font-wide font-extrabold text-xl tracking-tight text-white hover:text-press transition-colors"
            >
              Garsabers
            </button>
            {currentRoute === Route.ADMIN && (
              <button
                onClick={() => navigate(Route.HOME)}
                className="pointer-events-auto text-sm font-medium text-slate-500 hover:text-ink flex items-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" /> Exit admin
              </button>
            )}
          </div>
        </nav>
      )}

      <main>
        {currentRoute === Route.HOME && <LandingPage onNavigateToPrivacy={() => navigate(Route.PRIVACY)} onNavigateToTerms={() => navigate(Route.TERMS)} onNavigateToRefund={() => navigate(Route.REFUND)} onNavigateToAgreement={() => navigate(Route.AGREEMENT)} />}
        {currentRoute === Route.PRODUCT && <ProductPage slug={productSlug} />}
        {currentRoute === Route.CHECKOUT && <CheckoutPage />}
        {currentRoute === Route.CONFIRMED && <OrderConfirmed />}
        {currentRoute === Route.REFUND && <RefundPolicy onBack={() => navigate(Route.HOME)} />}
        {currentRoute === Route.AGREEMENT && <UserAgreement onBack={() => navigate(Route.HOME)} />}
        {currentRoute === Route.PRIVACY && <PrivacyPolicy onBack={() => navigate(Route.HOME)} />}
        {currentRoute === Route.TERMS && <TermsAndConditions onBack={() => navigate(Route.HOME)} />}
        {currentRoute === Route.LOGIN && <AdminLogin onLogin={handleLogin} />}
        {currentRoute === Route.ADMIN && isAdminAuthenticated && <AdminDashboard />}
        {currentRoute === Route.ADMIN && !isAdminAuthenticated && <AdminLogin onLogin={handleLogin} />}
      </main>
      {isShopSurface && <CartDrawer />}
    </div>
    </CartProvider>
    </NavContext.Provider>
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
      // Updated credentials
      if (email === 'info@garsabers.com' && password === 'admin') {
        onLogin(true);
      } else {
        alert('Invalid credentials.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]" />

      <div className="bg-[#0F0F12] p-10 rounded-3xl w-full max-w-md relative z-10 border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h2 className="font-bold text-3xl text-white mb-2 italic tracking-tight">Garsabers <span className="text-brand-teal">Portal</span></h2>
          <p className="text-slate-400 text-sm">Authorized Personnel Only</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Authentication Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-teal transition-colors placeholder:text-slate-600"
              placeholder="info@garsabers.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Access Key</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-teal transition-colors placeholder:text-slate-600"
              placeholder="•••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-purple to-brand-teal text-black font-bold rounded-xl py-3 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(153,69,255,0.3)] disabled:opacity-50"
          >
            {loading ? 'Verifying Credentials...' : 'Access Console'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Encrypted Connection</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <code className="text-[11px] text-brand-purple font-mono">info@garsabers.com</code>
            <span className="text-slate-600">/</span>
            <code className="text-[11px] text-brand-teal font-mono">admin</code>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;