import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Gauge, 
  Sliders, 
  Wrench, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { Button, Card, Badge, Input, Select } from '../components/CommonUI';

import { predictionApi, buildPredictionPayload, validatePredictionForm } from '../services/predictionApi';

export function PredictPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: 'BMW',
    model: '3 Series',
    variant: 'Luxury Line',
    year: '2022',
    mileage: '32000',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    owner: '1st Owner',
    condition: 'Excellent',
    city: 'Mumbai',
  });

  const [modelInfo, setModelInfo] = useState(null);
  const [infoError, setInfoError] = useState('');
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const submitting = useRef(false);
  const mounted = useRef(false);
  const [infoAttempt, setInfoAttempt] = useState(0);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    let active = true;
    setIsLoadingInfo(true);
    setInfoError('');
    predictionApi.getModelInfo().then(info => {
      if (!active) return;
      setModelInfo(info);
      setFormData(previous => {
        const brand = info.brand_models[previous.brand] ? previous.brand : Object.keys(info.brand_models)[0];
        const models = info.brand_models[brand];
        return { ...previous, brand, model: models.includes(previous.model) ? previous.model : models[0] };
      });
    }).catch(error => { if (active) setInfoError(error.message); })
      .finally(() => { if (active) setIsLoadingInfo(false); });
    return () => { active = false; };
  }, [infoAttempt]);

  const changeBrand = event => {
    const brand = event.target.value;
    setFormData(previous => ({ ...previous, brand, model: modelInfo?.brand_models[brand]?.[0] || '' }));
    setErrors({});
    setApiError('');
  };

  const steps = [
    { id: 1, label: 'Vehicle' },
    { id: 2, label: 'Usage' },
    { id: 3, label: 'Specifications' },
    { id: 4, label: 'Condition' },
  ];

  const handleNext = async () => {
    if (submitting.current || !modelInfo) return;
    setApiError('');
    const allErrors = validatePredictionForm(formData, modelInfo);
    const stepFields = { 1: ['brand', 'model', 'year'], 2: ['mileage', 'owner'], 3: ['fuelType', 'transmission'] };
    const visibleErrors = currentStep === 4 ? allErrors : Object.fromEntries(
      Object.entries(allErrors).filter(([key]) => stepFields[currentStep]?.includes(key))
    );
    setErrors(visibleErrors);
    if (Object.keys(visibleErrors).length) {
      if (currentStep === 4) {
        setCurrentStep(['brand', 'model', 'year'].some(key => allErrors[key]) ? 1 : allErrors.mileage || allErrors.owner ? 2 : 3);
      }
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }
    submitting.current = true;
    setIsSubmitting(true);
    try {
      const prediction = await predictionApi.predict(buildPredictionPayload(formData));
      if (mounted.current) navigate('/results', { state: { prediction } });
    } catch (error) {
      if (mounted.current) setApiError(error.message);
    } finally {
      submitting.current = false;
      if (mounted.current) setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#EAF4FF] mb-2">Predict Your Car Value</h1>
        <p className="text-sm text-[#8DA7C4]">
          Enter your vehicle details below to get an accurate price prediction powered by AI and historical used-car listing data.
        </p>
      </div>

      {/* Stepper Wizard Indicator matching master reference */}
      <div className="flex items-center justify-center max-w-xl mx-auto mb-10">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step.id === currentStep 
                    ? 'bg-[#087BFF] text-white shadow-[0_0_15px_rgba(8,123,255,0.7)]' 
                    : step.id < currentStep 
                      ? 'bg-[#10B981] text-white' 
                      : 'bg-[#0B1B30] border border-[#132E4F] text-[#8DA7C4]'
                }`}
              >
                {step.id}
              </div>
              <span className={`text-[11px] mt-1.5 ${step.id === currentStep ? 'text-[#00B9FF] font-medium' : 'text-[#8DA7C4]'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 -mt-5 ${step.id < currentStep ? 'bg-[#10B981]' : 'bg-[#132E4F]'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Form Container Card */}
      <Card className="p-8 border-[#132E4F] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-lg font-semibold text-[#EAF4FF] border-b border-[#132E4F] pb-3">
              {currentStep === 1 && "Vehicle Information"}
              {currentStep === 2 && "Usage & Odometer"}
              {currentStep === 3 && "Technical Specifications"}
              {currentStep === 4 && "Condition & Location"}
            </h2>

            {currentStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Brand"
                  value={formData.brand}
                  error={errors.brand}
                  aria-label="brand"
                  aria-invalid={!!errors.brand}
                  onChange={changeBrand}
                  options={modelInfo ? Object.keys(modelInfo.brand_models).map(brand => ({ value: brand, label: brand === 'Maruti' ? 'Maruti Suzuki' : brand })) : [formData.brand]}
                />
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Model"
                  value={formData.model}
                  error={errors.model}
                  aria-label="model"
                  aria-invalid={!!errors.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  options={modelInfo?.brand_models[formData.brand] || [formData.model]}
                />
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Variant"
                  value={formData.variant}
                  onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                  options={['Luxury Line', 'Sport Line', 'M Sport', 'Base Variant', 'Top Variant']}
                />
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Manufacturing Year"
                  value={formData.year}
                  error={errors.year}
                  aria-label="year"
                  aria-invalid={!!errors.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  options={Array.from({ length: new Date().getFullYear() - 1994 }, (_, index) => String(new Date().getFullYear() - index))}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Total Kilometers Driven"
                  placeholder="e.g. 35000"
                  type="number"
                  min="0"
                  max="499999"
                  disabled={isSubmitting}
                  value={formData.mileage}
                  error={errors.mileage}
                  aria-label="Total Kilometers Driven"
                  aria-invalid={!!errors.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                />
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Ownership Status"
                  value={formData.owner}
                  error={errors.owner}
                  aria-label="owner"
                  aria-invalid={!!errors.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  options={['1st Owner', '2nd Owner', '3rd Owner', '4th+ Owner']}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Fuel Type"
                  value={formData.fuelType}
                  error={errors.fuelType}
                  aria-label="fuelType"
                  aria-invalid={!!errors.fuelType}
                  onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                  options={modelInfo?.supported_categories.fuelType || [formData.fuelType]}
                />
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Transmission Type"
                  value={formData.transmission}
                  error={errors.transmission}
                  aria-label="transmission"
                  aria-invalid={!!errors.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  options={['Automatic', 'Manual']}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Overall Condition"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  options={['Excellent', 'Good', 'Fair', 'Needs Work']}
                />
                <Select
                  disabled={isSubmitting || isLoadingInfo}
                  label="Registration City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  options={['Mumbai', 'Delhi', 'Bengaluru', 'Kolkata', 'Hyderabad', 'Chennai', 'Pune']}
                />
              </div>
            )}

            {currentStep === 4 && (
              <p className="text-xs text-[#8DA7C4]">Variant, condition and city are retained in this form but are not used by the current model.</p>
            )}
            {Number(formData.year) > (modelInfo?.training_dataset.year_max || 2020) && (
              <p role="status" className="text-xs text-amber-300 border border-[#132E4F] rounded-lg p-3">Training data ends in {modelInfo?.training_dataset.year_max || 2020}. Estimates for newer cars may be unreliable.</p>
            )}
            {isLoadingInfo && <p role="status" className="text-xs text-[#00B9FF]">Loading supported vehicles...</p>}
            {infoError && (
              <div role="alert" className="text-xs text-red-400 space-y-2">
                <p>{infoError}</p>
                <Button variant="outline" size="sm" onClick={() => setInfoAttempt(value => value + 1)}>Retry connection</Button>
              </div>
            )}
            {apiError && <p role="alert" className="text-xs text-red-400 border border-red-500/30 rounded-lg p-3">{apiError}</p>}
            {isSubmitting && <p role="status" className="text-xs text-[#00B9FF]">Calculating your car's estimated value...</p>}

            {/* Step navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#132E4F]">
              <Button
                variant="outline"
                disabled={currentStep === 1 || isSubmitting}
                onClick={() => { setCurrentStep(Math.max(1, currentStep - 1)); setErrors({}); setApiError(''); }}
              >
                Previous
              </Button>

              <Button variant="cyanGlow" onClick={handleNext} disabled={isSubmitting || isLoadingInfo || !modelInfo} aria-busy={isSubmitting}>
                {isSubmitting ? 'Predicting...' : currentStep === 4 ? 'Predict Price' : 'Next Step'}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Right Visual helper card */}
          <div className="lg:col-span-4 bg-[#06101D] border border-[#132E4F] rounded-xl p-5 text-center">
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" 
              alt="Car Preview" 
              className="w-full h-36 object-cover rounded-lg mb-4"
            />
            <h3 className="text-sm font-semibold text-[#EAF4FF] mb-1">Your car's value, in your hands</h3>
            <p className="text-xs text-[#8DA7C4] mb-4">
              Trained on historical Indian used-car listings. Estimates are not current market quotes.
            </p>
            <div className="flex items-center justify-around text-xs text-[#00B9FF] pt-2 border-t border-[#132E4F]">
              <span>⚡ Fast</span>
              <span>🎯 Accurate</span>
              <span>🔒 Secure</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

