import React, { useState } from 'react';
import { Layers, ArrowRight, Check, X } from 'lucide-react';
import { Card, Button, Select } from '../components/CommonUI';

export function CompareCarsPage() {
  const [carA, setCarA] = useState('BMW 3 Series');
  const [carB, setCarB] = useState('Audi A4');

  const comparisonSpecs = [
    { label: 'Estimated AI Value', carA: '₹ 8,42,000', carB: '₹ 9,60,000' },
    { label: 'Confidence Score', carA: '87%', carB: '84%' },
    { label: 'Year', carA: '2022', carB: '2021' },
    { label: 'Mileage', carA: '32,000 km', carB: '28,000 km' },
    { label: 'Fuel Type', carA: 'Diesel', carB: 'Petrol' },
    { label: 'Transmission', carA: 'Automatic', carB: 'Automatic' },
    { label: 'Expected 1-Yr Depreciation', carA: '~8.2%', carB: '~9.5%' },
    { label: 'Market Demand Index', carA: 'High (8.8/10)', carB: 'Moderate (7.5/10)' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[#EAF4FF] mb-2">Compare Cars</h1>
        <p className="text-sm text-[#8DA7C4]">
          Compare market pricing, depreciation rates, and specifications side by side.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Car 1 Selector */}
        <Card className="p-5 space-y-3">
          <Select 
            label="Vehicle 1" 
            value={carA} 
            onChange={(e) => setCarA(e.target.value)}
            options={['BMW 3 Series', 'Mercedes C-Class', 'Audi A4', 'Hyundai Creta']}
          />
          <img 
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80" 
            alt="Car 1" 
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="text-center">
            <h3 className="font-bold text-base text-[#EAF4FF]">{carA}</h3>
            <p className="text-xs text-[#00B9FF] font-medium">Estimated Value: ₹ 8,42,000</p>
          </div>
        </Card>

        {/* Car 2 Selector */}
        <Card className="p-5 space-y-3">
          <Select 
            label="Vehicle 2" 
            value={carB} 
            onChange={(e) => setCarB(e.target.value)}
            options={['Audi A4', 'BMW 3 Series', 'Mercedes C-Class', 'Honda City']}
          />
          <img 
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80" 
            alt="Car 2" 
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="text-center">
            <h3 className="font-bold text-base text-[#EAF4FF]">{carB}</h3>
            <p className="text-xs text-[#00B9FF] font-medium">Estimated Value: ₹ 9,60,000</p>
          </div>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="p-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#00B9FF] mb-4">Metric Comparison</h3>
        <div className="divide-y divide-[#132E4F]">
          {comparisonSpecs.map((spec, idx) => (
            <div key={idx} className="grid grid-cols-3 py-3 text-xs">
              <span className="font-medium text-[#8DA7C4]">{spec.label}</span>
              <span className="text-[#EAF4FF] font-semibold">{spec.carA}</span>
              <span className="text-[#EAF4FF] font-semibold">{spec.carB}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

