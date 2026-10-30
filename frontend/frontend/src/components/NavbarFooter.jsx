import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  BarChart3, 
  Layers, 
  Gauge, 
  HelpCircle, 
  User, 
  Bot,
  LogIn
} from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Predict', path: '/predict' },
    { label: 'Compare', path: '/compare' },
    { label: 'Market', path: '/market-insights' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'AI Chatbot', path: '/chatbot' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#132E4F]/70 bg-[#06101D]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#087BFF] to-[#00B9FF] flex items-center justify-center shadow-[0_0_12px_rgba(0,185,255,0.5)]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#EAF4FF] group-hover:text-[#00B9FF] transition-colors">
            AutoValue <span className="text-[#00B9FF]">AI</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#00B9FF] ${
                  isActive ? 'text-[#00B9FF] font-semibold' : 'text-[#8DA7C4]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden sm:inline-flex items-center text-xs text-[#8DA7C4] hover:text-[#EAF4FF] px-3 py-1.5 rounded-md hover:bg-[#0B1B30]"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="text-xs font-medium text-[#8DA7C4] hover:text-[#EAF4FF] px-3 py-1.5 rounded-lg border border-[#132E4F] hover:border-[#087BFF] transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-xs font-semibold text-white bg-[#087BFF] hover:bg-[#0066DD] px-3.5 py-1.5 rounded-lg shadow-[0_0_12px_rgba(8,123,255,0.4)] transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#132E4F] bg-[#06101D] text-[#8DA7C4] py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-gradient-to-tr from-[#087BFF] to-[#00B9FF] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-[#EAF4FF]">AutoValue AI</span>
            </div>
            <p className="text-xs text-[#8DA7C4] leading-relaxed">
              Smarter Valuation, Better Decisions. Precision ML car pricing models tuned on verified automotive markets.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#EAF4FF] uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-[#00B9FF]">Home</Link></li>
              <li><Link to="/predict" className="hover:text-[#00B9FF]">Predict</Link></li>
              <li><Link to="/compare" className="hover:text-[#00B9FF]">Compare</Link></li>
              <li><Link to="/market-insights" className="hover:text-[#00B9FF]">Market Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#EAF4FF] uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-[#00B9FF]">Blog</a></li>
              <li><a href="#" className="hover:text-[#00B9FF]">API Documentation</a></li>
              <li><a href="#" className="hover:text-[#00B9FF]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#00B9FF]">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#EAF4FF] uppercase tracking-wider mb-3">Contact</h4>
            <p className="text-xs text-[#8DA7C4] mb-1">support@autovalue.ai</p>
            <p className="text-xs text-[#8DA7C4] mb-1">+91 98765 43210</p>
            <p className="text-xs text-[#8DA7C4]">Kolkata, India</p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#132E4F]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#526D82]">
          <p>© 2026 AutoValue AI. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>Powered by Gradient Boosted Regressors</span>
            <span>Manifest V3 Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

