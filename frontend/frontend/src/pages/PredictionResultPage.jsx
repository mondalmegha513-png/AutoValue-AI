import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Share2, 
  Download, 
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { Button, Card, Badge } from '../components/CommonUI';

import { formatInr, isPredictionResult } from '../services/predictionApi';

export function PredictionResultPage() {
  const { state } = useLocation();
  const prediction = state?.prediction;
  if (!isPredictionResult(prediction)) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <Card className="p-6 border-[#132E4F]">
          <h1 className="text-xl font-bold text-[#EAF4FF] mb-2">No prediction yet</h1>
          <p className="text-sm text-[#8DA7C4] mb-4">Enter your vehicle details to calculate a price estimate.</p>
          <Link to="/predict"><Button variant="cyanGlow">Predict Your Car Value</Button></Link>
        </Card>
      </div>
    );
  }
  const car = prediction.input_received;
  const carName = [car.brand === 'Maruti' ? 'Maruti Suzuki' : car.brand, car.model].join(' ');
  const warnings = [...prediction.warnings];
  if (car.year > 2020) warnings.unshift('Training data ends in 2020. Estimates for newer cars may be unreliable.');
  const breakdownItems = [
    { label: 'Manufacturing Year', amount: String(car.year) },
    { label: 'Kilometres Driven', amount: new Intl.NumberFormat('en-IN').format(car.mileage) + ' km' },
    { label: 'Brand & Model', amount: carName },
    { label: 'Fuel & Transmission', amount: [car.fuelType, car.transmission].join(' / ') },
    { label: 'Ownership', amount: car.owner },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header Back & Actions */}
      <div className="flex items-center justify-between">
        <Link to="/predict" className="inline-flex items-center text-xs text-[#8DA7C4] hover:text-[#00B9FF]">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Predict
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={Share2}>Share</Button>
          <Button variant="outline" size="sm" icon={Bookmark}>Save Car</Button>
        </div>
      </div>

      {/* Main Top Banner Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Highlight Estimate Card */}
        <Card className="lg:col-span-8 p-6 relative overflow-hidden border-[#132E4F]">
          <div className="text-xs uppercase tracking-wider text-[#8DA7C4] mb-1">Your Car's Estimated Value</div>
          <div className="flex flex-wrap items-baseline gap-4 mb-2">
            <h1 className="text-4xl sm:text-5xl font-black text-[#EAF4FF] tracking-tight">
              {formatInr(prediction.predicted_price_inr)}
            </h1>
            <Badge variant="green" className="text-sm px-3 py-1">
              {prediction.model || 'ML Estimate'}
            </Badge>
          </div>
          <p className="text-xs text-[#8DA7C4] mb-6">
            Historical listing-price estimate. Confidence and market range are not provided by this model.
          </p>

          {warnings.length > 0 && (
            <div role="status" className="text-xs text-amber-300 border border-[#132E4F] rounded-lg p-3 mb-4 space-y-1">
              {[...new Set(warnings)].map(warning => <p key={warning}>{warning}</p>)}
            </div>
          )}

          {/* Prediction inputs list */}
          <div className="border-t border-[#132E4F] pt-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#00B9FF]">Prediction Details</h3>
            <div className="space-y-2">
              {breakdownItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#06101D] border border-[#132E4F]/60 text-xs">
                  <span className="text-[#8DA7C4]">{item.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[#EAF4FF] font-medium">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right: Car Summary & Why This Price Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-5">
            <img 
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80" 
              alt="Illustrative car preview" 
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="text-sm font-bold text-[#EAF4FF]">{carName}</h3>
            <p className="text-xs text-[#8DA7C4] mb-3">{car.year} / {car.fuelType} / {car.transmission}</p>
            <Link to="/compare">
              <Button variant="secondary" size="sm" className="w-full">
                Compare Cars
              </Button>
            </Link>
          </Card>

          <Card className="p-5 space-y-3">
            <h4 className="text-xs font-semibold text-[#00B9FF] uppercase tracking-wider">About This Estimate</h4>
            <ul className="text-xs text-[#8DA7C4] space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] font-bold">✔</span>
                <span>Uses the vehicle year, kilometres driven and vehicle specifications shown here.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] font-bold">✔</span>
                <span>Calculated by the trained {prediction.model || 'prediction model'}.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] font-bold">✔</span>
                <span>Variant, condition and city are not inputs to this model.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✖</span>
                <span>Based on historical listing prices, not verified current transaction values.</span>
              </li>
            </ul>

            <Link to="/predict"><Button variant="cyanGlow" size="sm" className="w-full mt-2">Predict Another Car</Button></Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

