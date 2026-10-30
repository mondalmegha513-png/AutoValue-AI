import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Database, 
  Play
} from 'lucide-react';
import { Button, Card, Badge } from '../components/CommonUI';

export function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to action */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="blue" className="gap-1.5 py-1 px-3">
                <Sparkles className="w-3.5 h-3.5 text-[#00B9FF]" />
                AI-Powered Car Valuation
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#EAF4FF] leading-tight">
                Know What Your <br />
                <span className="text-[#00B9FF] drop-shadow-[0_0_25px_rgba(0,185,255,0.4)]">
                  Car Is Worth.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#8DA7C4] max-w-xl leading-relaxed">
                Get accurate price prediction & valuation with real-time market insights powered by advanced machine learning models.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/predict">
                  <Button variant="cyanGlow" size="lg" className="shadow-[0_0_20px_rgba(0,185,255,0.4)]">
                    Predict Your Car <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>

                <Button variant="secondary" size="lg" icon={Play} className="text-[#EAF4FF]">
                  Watch Video
                </Button>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#132E4F]/60">
                <div>
                  <div className="text-2xl font-bold text-[#EAF4FF]">98%</div>
                  <div className="text-xs text-[#8DA7C4]">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#EAF4FF]">10K+</div>
                  <div className="text-xs text-[#8DA7C4]">Cars Analyzed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#EAF4FF]">50+</div>
                  <div className="text-xs text-[#8DA7C4]">Brands Supported</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#EAF4FF]">24/7</div>
                  <div className="text-xs text-[#8DA7C4]">AI Assistant</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Car graphic with blue glow ring */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl bg-[#0B1B30]/70 border border-[#132E4F] p-4 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(8,123,255,0.25)]">
                {/* Simulated luxury car preview matching design reference */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06101D] via-transparent to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80" 
                  alt="BMW Sedan AutoValue AI" 
                  className="w-full h-full object-cover rounded-xl opacity-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-lg bg-[#06101D]/80 backdrop-blur-md border border-[#132E4F]">
                  <div>
                    <p className="text-xs font-semibold text-white">BMW 3 Series Luxury Line</p>
                    <p className="text-[11px] text-[#00B9FF]">AI Valuation: ₹ 8,42,000</p>
                  </div>
                  <Badge variant="green">98% Match</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EAF4FF] mb-2">How It Works</h2>
          <p className="text-sm text-[#8DA7C4]">Get your car's value in 3 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card glow className="relative p-6 border-[#132E4F]">
            <div className="w-10 h-10 rounded-lg bg-[#087BFF]/20 border border-[#087BFF]/40 flex items-center justify-center text-[#00B9FF] font-bold mb-4">
              1
            </div>
            <h3 className="text-base font-semibold text-[#EAF4FF] mb-2">Enter Details</h3>
            <p className="text-xs text-[#8DA7C4] leading-relaxed">
              Provide basic information including brand, model, manufacturing year, mileage and fuel type.
            </p>
          </Card>

          <Card glow className="relative p-6 border-[#132E4F]">
            <div className="w-10 h-10 rounded-lg bg-[#087BFF]/20 border border-[#087BFF]/40 flex items-center justify-center text-[#00B9FF] font-bold mb-4">
              2
            </div>
            <h3 className="text-base font-semibold text-[#EAF4FF] mb-2">AI Analysis</h3>
            <p className="text-xs text-[#8DA7C4] leading-relaxed">
              Our model analyzes market trends, odometer degradation, and real-time dealer sales transactions.
            </p>
          </Card>

          <Card glow className="relative p-6 border-[#132E4F]">
            <div className="w-10 h-10 rounded-lg bg-[#087BFF]/20 border border-[#087BFF]/40 flex items-center justify-center text-[#00B9FF] font-bold mb-4">
              3
            </div>
            <h3 className="text-base font-semibold text-[#EAF4FF] mb-2">Get Prediction</h3>
            <p className="text-xs text-[#8DA7C4] leading-relaxed">
              View comprehensive value estimate, confidence interval score, and transparent price breakdown factors.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Choose AutoValue AI Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EAF4FF] mb-2">Why Choose AutoValue AI?</h2>
          <p className="text-sm text-[#8DA7C4]">Precision algorithms built specifically for automotive valuation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card glow className="p-5">
            <Cpu className="w-6 h-6 text-[#00B9FF] mb-3" />
            <h4 className="text-sm font-semibold text-[#EAF4FF] mb-1">High Accuracy</h4>
            <p className="text-xs text-[#8DA7C4]">Advanced ensemble ML models trained on real transactional data.</p>
          </Card>

          <Card glow className="p-5">
            <TrendingUp className="w-6 h-6 text-[#087BFF] mb-3" />
            <h4 className="text-sm font-semibold text-[#EAF4FF] mb-1">Detailed Insights</h4>
            <p className="text-xs text-[#8DA7C4]">Market trends & depreciation curve analysis across cities.</p>
          </Card>

          <Card glow className="p-5">
            <Layers className="w-6 h-6 text-[#00B9FF] mb-3" />
            <h4 className="text-sm font-semibold text-[#EAF4FF] mb-1">Explainable AI</h4>
            <p className="text-xs text-[#8DA7C4]">Understand exact component breakdown affecting your car's price.</p>
          </Card>

          <Card glow className="p-5">
            <ShieldCheck className="w-6 h-6 text-[#10B981] mb-3" />
            <h4 className="text-sm font-semibold text-[#EAF4FF] mb-1">Secure & Reliable</h4>
            <p className="text-xs text-[#8DA7C4]">Your data privacy and prediction history are protected with industry standards.</p>
          </Card>
        </div>
      </section>
    </div>
  );
}

