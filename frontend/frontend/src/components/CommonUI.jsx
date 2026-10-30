import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  ...props 
}) {
  const base = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-2.5 text-base gap-2.5",
  };

  const variants = {
    primary: "bg-[#087BFF] hover:bg-[#0066DD] text-white shadow-[0_0_15px_-2px_rgba(8,123,255,0.4)] active:scale-[0.98]",
    cyanGlow: "bg-gradient-to-r from-[#087BFF] to-[#00B9FF] hover:opacity-95 text-white font-semibold shadow-[0_0_18px_rgba(0,185,255,0.4)]",
    secondary: "bg-[#0B1B30] hover:bg-[#0E2440] text-[#EAF4FF] border border-[#132E4F] hover:border-[#00B9FF]/40",
    outline: "border border-[#132E4F] hover:border-[#087BFF] text-[#8DA7C4] hover:text-[#EAF4FF] bg-transparent",
    ghost: "text-[#8DA7C4] hover:text-white hover:bg-white/5",
    danger: "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20",
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

export function Card({ children, className = '', glow = false, ...props }) {
  return (
    <div 
      className={`bg-[#0B1B30] border border-[#132E4F] rounded-xl p-5 ${
        glow ? 'hover:border-[#00B9FF]/50 hover:shadow-[0_4px_24px_-4px_rgba(8,123,255,0.25)] transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'blue', className = '' }) {
  const badgeStyles = {
    blue: "bg-[#087BFF]/15 text-[#00B9FF] border border-[#087BFF]/30",
    green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    gray: "bg-slate-800 text-slate-300 border border-slate-700",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Input({ label, error, helperText, className = '', ...props }) {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-xs font-medium text-[#8DA7C4]">{label}</label>}
      <input
        className={`w-full bg-[#06101D] border border-[#132E4F] rounded-lg px-3.5 py-2.5 text-sm text-[#EAF4FF] placeholder-[#4A6482] focus:outline-none focus:border-[#087BFF] focus:ring-1 focus:ring-[#087BFF] transition-all ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {helperText && <p className="text-[11px] text-[#8DA7C4]">{helperText}</p>}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

export function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-xs font-medium text-[#8DA7C4]">{label}</label>}
      <select
        className={`w-full bg-[#06101D] border border-[#132E4F] rounded-lg px-3.5 py-2.5 text-sm text-[#EAF4FF] focus:outline-none focus:border-[#087BFF] focus:ring-1 focus:ring-[#087BFF] transition-all ${className}`}
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={typeof opt === 'string' ? opt : opt.value} className="bg-[#0B1B30] text-[#EAF4FF]">
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

