import React from 'react';
import { 
  TrendingUp, 
  BarChart, 
  PieChart as PieIcon, 
  MapPin, 
  DollarSign, 
  Percent 
} from 'lucide-react';
import { Card, Badge } from '../components/CommonUI';
import {
  ResponsiveContainer,
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ScatterChart,
  Scatter,
  CartesianGrid
} from 'recharts';

export function MarketInsightsPage() {
  const brandData = [
    { brand: 'Maruti', avgPrice: 6.2 },
    { brand: 'Hyundai', avgPrice: 8.5 },
    { brand: 'Tata', avgPrice: 7.9 },
    { brand: 'Honda', avgPrice: 9.4 },
    { brand: 'Toyota', avgPrice: 14.2 },
    { brand: 'BMW', avgPrice: 28.5 },
  ];

  const fuelData = [
    { type: 'Petrol', count: 48 },
    { type: 'Diesel', count: 32 },
    { type: 'CNG', count: 12 },
    { type: 'Electric', count: 8 },
  ];

  const cityData = [
    { city: 'Delhi', price: 9.2 },
    { city: 'Mumbai', price: 10.4 },
    { city: 'Bengaluru', price: 10.8 },
    { city: 'Kolkata', price: 8.4 },
    { city: 'Hyderabad', price: 9.6 },
  ];

  const mileageScatter = [
    { mileage: 15, price: 12.5 },
    { mileage: 25, price: 10.8 },
    { mileage: 40, price: 9.2 },
    { mileage: 55, price: 7.8 },
    { mileage: 75, price: 6.4 },
    { mileage: 90, price: 5.1 },
    { mileage: 110, price: 4.2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#EAF4FF] mb-2">Market Insights</h1>
        <p className="text-sm text-[#8DA7C4]">
          Explore the latest trends, statistics and insights from the used car market.
        </p>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-xs text-[#8DA7C4] mb-1">Average Used Car Price</div>
          <div className="text-2xl font-bold text-[#EAF4FF]">₹ 7.8 L</div>
          <div className="text-xs text-[#10B981] mt-1">↑ +12% vs last month</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-[#8DA7C4] mb-1">Most Popular Brand</div>
          <div className="text-2xl font-bold text-[#EAF4FF]">Maruti Suzuki</div>
          <div className="text-xs text-[#00B9FF] mt-1">25% market share</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-[#8DA7C4] mb-1">Avg. Depreciation Rate</div>
          <div className="text-2xl font-bold text-[#EAF4FF]">12.4%</div>
          <div className="text-xs text-[#8DA7C4] mt-1">(per year)</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-[#8DA7C4] mb-1">Most Demanded Fuel</div>
          <div className="text-2xl font-bold text-[#EAF4FF]">Petrol</div>
          <div className="text-xs text-[#00B9FF] mt-1">53% of total listings</div>
        </Card>
      </div>

      {/* Grid of Visual Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Scatter / Mileage vs Price */}
        <Card className="p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-[#EAF4FF] mb-4">Mileage vs Price (in L)</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#132E4F" />
                <XAxis dataKey="mileage" stroke="#8DA7C4" fontSize={10} name="Mileage (k km)" />
                <YAxis dataKey="price" stroke="#8DA7C4" fontSize={10} name="Price (L)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1B30', borderColor: '#132E4F', color: '#FFFFFF' }} 
                  itemStyle={{ color: '#FFFFFF' }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
                <Scatter data={mileageScatter} fill="#00B9FF" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Brand vs Avg Price */}
        <Card className="p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-[#EAF4FF] mb-4">Brand vs Avg. Price (in L)</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBar data={brandData} margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#132E4F" />
                <XAxis dataKey="brand" stroke="#8DA7C4" fontSize={10} />
                <YAxis stroke="#8DA7C4" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1B30', borderColor: '#132E4F', color: '#FFFFFF' }} 
                  itemStyle={{ color: '#FFFFFF' }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
                <Bar dataKey="avgPrice" fill="#087BFF" radius={[4, 4, 0, 0]} />
              </RechartsBar>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* City vs Price */}
        <Card className="p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-[#EAF4FF] mb-4">City vs Avg. Price</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBar data={cityData} margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#132E4F" />
                <XAxis dataKey="city" stroke="#8DA7C4" fontSize={10} />
                <YAxis stroke="#8DA7C4" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1B30', borderColor: '#132E4F', color: '#FFFFFF' }} 
                  itemStyle={{ color: '#FFFFFF' }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
                <Bar dataKey="price" fill="#00B9FF" radius={[4, 4, 0, 0]} />
              </RechartsBar>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
}

