import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button, Card, Input } from '../components/CommonUI';

export function LoginPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-[#132E4F] overflow-hidden bg-[#0B1B30] shadow-2xl">
        
        {/* Left Branding side with Car visual matching reference */}
        <div className="relative p-8 flex flex-col justify-between bg-[#06101D] border-b md:border-b-0 md:border-r border-[#132E4F]">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#00B9FF]">AutoValue AI</span>
            <h2 className="text-2xl font-black text-[#EAF4FF] mt-2">Welcome Back!</h2>
            <p className="text-xs text-[#8DA7C4] mt-1">Sign in to your account</p>
          </div>

          <div className="py-6">
            <img 
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80" 
              alt="Luxury Car" 
              className="w-full h-36 object-cover rounded-xl shadow-lg border border-[#132E4F]"
            />
          </div>

          <ul className="text-xs text-[#8DA7C4] space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-[#00B9FF]">✔</span> Save your predictions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00B9FF]">✔</span> View comprehensive price history
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00B9FF]">✔</span> Get personalized market insights
            </li>
          </ul>
        </div>

        {/* Right Form side */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#EAF4FF]">Login</h3>
            <p className="text-xs text-[#8DA7C4]">Enter your credentials to continue</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="Email Address" placeholder="Enter your email" type="email" />
            <Input label="Password" placeholder="Enter your password" type="password" />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#8DA7C4] cursor-pointer">
                <input type="checkbox" className="rounded bg-[#06101D] border-[#132E4F] text-[#087BFF]" />
                Remember me
              </label>
              <a href="#" className="text-[#00B9FF] hover:underline">Forgot password?</a>
            </div>

            <Button variant="cyanGlow" className="w-full">
              Login
            </Button>

            <div className="relative text-center my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#132E4F]"></div></div>
              <span className="relative bg-[#0B1B30] px-2 text-[11px] text-[#8DA7C4]">OR</span>
            </div>

            <Button variant="secondary" className="w-full text-xs">
              Continue with Google
            </Button>
            <Button variant="secondary" className="w-full text-xs">
              Continue with GitHub
            </Button>

            <p className="text-center text-xs text-[#8DA7C4] pt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#00B9FF] font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export function SignupPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-[#132E4F] overflow-hidden bg-[#0B1B30] shadow-2xl">
        
        {/* Left Branding side */}
        <div className="relative p-8 flex flex-col justify-between bg-[#06101D] border-b md:border-b-0 md:border-r border-[#132E4F]">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#00B9FF]">AutoValue AI</span>
            <h2 className="text-2xl font-black text-[#EAF4FF] mt-2">Join AutoValue AI</h2>
            <p className="text-xs text-[#8DA7C4] mt-1">Create your account and start exploring car market insights</p>
          </div>

          <div className="py-6">
            <img 
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80" 
              alt="Car front" 
              className="w-full h-36 object-cover rounded-xl shadow-lg border border-[#132E4F]"
            />
          </div>

          <ul className="text-xs text-[#8DA7C4] space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-[#00B9FF]">✔</span> Predict car values with 98% accuracy
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00B9FF]">✔</span> Save and track multiple vehicles
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00B9FF]">✔</span> Real-time regional market insights
            </li>
          </ul>
        </div>

        {/* Right Form side */}
        <div className="p-8 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-[#EAF4FF]">Create Account</h3>
            <p className="text-xs text-[#8DA7C4]">Fill in your details to get started</p>
          </div>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <Input label="Full Name" placeholder="Enter your full name" />
            <Input label="Email Address" placeholder="Enter your email" type="email" />
            <Input label="Password" placeholder="Create a strong password" type="password" />
            <Input label="Confirm Password" placeholder="Confirm your password" type="password" />

            <Button variant="cyanGlow" className="w-full mt-2">
              Sign Up
            </Button>

            <div className="relative text-center my-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#132E4F]"></div></div>
              <span className="relative bg-[#0B1B30] px-2 text-[11px] text-[#8DA7C4]">OR</span>
            </div>

            <Button variant="secondary" className="w-full text-xs">
              Continue with Google
            </Button>
            <Button variant="secondary" className="w-full text-xs">
              Continue with GitHub
            </Button>

            <p className="text-center text-xs text-[#8DA7C4] pt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00B9FF] font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

