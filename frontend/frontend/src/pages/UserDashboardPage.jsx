import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  BarChart3, 
  History, 
  Bookmark, 
  User, 
  LogOut,
  ArrowUpRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Button, Card, Badge } from '../components/CommonUI';
import { Link } from 'react-router-dom';

export function UserDashboardPage() {
  const recentPredictions = [
    { model: 'BMW 3 Series', date: '12 Sep 2026', price: '₹ 8,42,000', status: 'Completed' },
    { model: 'Hyundai Creta', date: '10 Sep 2026', price: '₹ 11,20,000', status: 'Completed' },
    { model: 'Honda City', date: '05 Sep 2026', price: '₹ 7,80,000', status: 'Completed' },
    { model: 'Audi A4', date: '02 Sep 2026', price: '₹ 9,60,000', status: 'Completed' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <Card className="p-4 space-y-1">
            <div className="pb-4 mb-2 border-b border-[#132E4F]">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8DA7C4]">Navigation</span>
            </div>
            
            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#087BFF]/15 text-[#00B9FF] text-xs font-semibold">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link to="/predict" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8DA7C4] hover:text-[#EAF4FF] hover:bg-[#06101D] text-xs font-medium">
              <Car className="w-4 h-4" /> Predict Price
            </Link>
            <Link to="/compare" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8DA7C4] hover:text-[#EAF4FF] hover:bg-[#06101D] text-xs font-medium">
              <BarChart3 className="w-4 h-4" /> Compare Cars
            </Link>
            <Link to="/market-insights" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8DA7C4] hover:text-[#EAF4FF] hover:bg-[#06101D] text-xs font-medium">
              <TrendingUp className="w-4 h-4" /> Market Insights
            </Link>
            <Link to="/history" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8DA7C4] hover:text-[#EAF4FF] hover:bg-[#06101D] text-xs font-medium">
              <History className="w-4 h-4" /> History
            </Link>
            <Link to="/saved" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8DA7C4] hover:text-[#EAF4FF] hover:bg-[#06101D] text-xs font-medium">
              <Bookmark className="w-4 h-4" /> Saved Cars
            </Link>
            <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8DA7C4] hover:text-[#EAF4FF] hover:bg-[#06101D] text-xs font-medium">
              <User className="w-4 h-4" /> Profile
            </Link>

            <div className="pt-4 mt-4 border-t border-[#132E4F]">
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 w-full transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </Card>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Welcome greeting banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#EAF4FF]">Welcome back, Rahul!</h1>
              <p className="text-xs text-[#8DA7C4]">Here's what's happening with your car insights.</p>
            </div>
            <Link to="/predict">
              <Button variant="cyanGlow" size="sm">
                + New Prediction
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-xs text-[#8DA7C4]">Total Predictions</div>
              <div className="text-2xl font-bold text-[#EAF4FF] mt-1">12</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-[#8DA7C4]">Saved Cars</div>
              <div className="text-2xl font-bold text-[#00B9FF] mt-1">5</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-[#8DA7C4]">Favorite Brands</div>
              <div className="text-2xl font-bold text-[#EAF4FF] mt-1">3</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-[#8DA7C4]">Avg. Valuated</div>
              <div className="text-2xl font-bold text-[#10B981] mt-1">₹ 8.2 L</div>
            </Card>
          </div>

          {/* Recent Predictions Table & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-8 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#EAF4FF]">Recent Predictions</h3>
                <Link to="/history" className="text-xs text-[#00B9FF] hover:underline">View All</Link>
              </div>

              <div className="space-y-3">
                {recentPredictions.map((car, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#06101D] border border-[#132E4F]/70 text-xs">
                    <div>
                      <h4 className="font-semibold text-[#EAF4FF]">{car.model}</h4>
                      <p className="text-[11px] text-[#8DA7C4]">{car.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#00B9FF]">{car.price}</span>
                      <Link to="/results">
                        <Button variant="outline" size="sm" className="px-2 py-1 text-[11px]">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions Card */}
            <Card className="lg:col-span-4 p-5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#EAF4FF]">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/predict" className="block">
                  <Button variant="primary" size="sm" className="w-full justify-start text-xs">
                    Predict a Car
                  </Button>
                </Link>
                <Link to="/compare" className="block">
                  <Button variant="secondary" size="sm" className="w-full justify-start text-xs">
                    Compare Cars
                  </Button>
                </Link>
                <Link to="/market-insights" className="block">
                  <Button variant="secondary" size="sm" className="w-full justify-start text-xs">
                    View Market Trends
                  </Button>
                </Link>
              </div>

              <div className="p-3 rounded-lg bg-[#087BFF]/10 border border-[#087BFF]/30 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#00B9FF] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Need help?
                </div>
                <p className="text-[11px] text-[#8DA7C4]">
                  Ask AutoValue AI chatbot anything about your vehicle's depreciation curve.
                </p>
                <Link to="/chatbot" className="inline-block text-[11px] text-[#00B9FF] font-semibold hover:underline">
                  Launch Assistant →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

