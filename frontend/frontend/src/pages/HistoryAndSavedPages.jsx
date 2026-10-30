import React from 'react';
import { Card, Button, Input } from '../components/CommonUI';
import { User, Mail, Phone, Calendar, ArrowRight, Bookmark, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-[#EAF4FF]">Profile Information</h1>
      <p className="text-xs text-[#8DA7C4]">Manage your personal details and account settings.</p>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#132E4F]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#087BFF] to-[#00B9FF] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            R
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#EAF4FF]">Rahul Sharma</h2>
            <p className="text-xs text-[#8DA7C4]">rahul.sharma@example.com</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#087BFF]/20 text-[#00B9FF] border border-[#087BFF]/40">
              Verified Auto Enthusiast
            </span>
          </div>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6" onSubmit={(e) => e.preventDefault()}>
          <Input label="Full Name" defaultValue="Rahul Sharma" />
          <Input label="Email Address" defaultValue="rahul.sharma@example.com" type="email" />
          <Input label="Phone Number" defaultValue="+91 98765 43210" />
          <Input label="Primary City" defaultValue="Mumbai" />
          <div className="sm:col-span-2 pt-2">
            <Button variant="cyanGlow" size="sm">Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export function PredictionHistoryPage() {
  const historyList = [
    { id: 1, date: '12 Sep 2026', car: 'BMW 3 Series (2022 Diesel)', price: '₹ 8,42,000', confidence: '87%' },
    { id: 2, date: '10 Sep 2026', car: 'Hyundai Creta (2021 Petrol)', price: '₹ 11,20,000', confidence: '82%' },
    { id: 3, date: '05 Sep 2026', car: 'Honda City (2020 Petrol)', price: '₹ 7,80,000', confidence: '76%' },
    { id: 4, date: '02 Sep 2026', car: 'Audi A4 (2020 Diesel)', price: '₹ 9,60,000', confidence: '81%' },
    { id: 5, date: '02 Sep 2026', car: 'Maruti Baleno (2019 Petrol)', price: '₹ 6,20,000', confidence: '74%' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#EAF4FF]">Prediction History</h1>
        <p className="text-xs text-[#8DA7C4]">View all your past car price predictions.</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#06101D] border-b border-[#132E4F] text-[#8DA7C4]">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Car Details</th>
                <th className="p-4">Predicted Price</th>
                <th className="p-4">Confidence</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132E4F]">
              {historyList.map((item) => (
                <tr key={item.id} className="hover:bg-[#06101D]/50 transition-colors">
                  <td className="p-4 text-[#8DA7C4]">{item.date}</td>
                  <td className="p-4 font-semibold text-[#EAF4FF]">{item.car}</td>
                  <td className="p-4 font-bold text-[#00B9FF]">{item.price}</td>
                  <td className="p-4 text-[#10B981]">{item.confidence}</td>
                  <td className="p-4 text-right">
                    <Link to="/results">
                      <Button variant="outline" size="sm" className="text-[11px] px-2.5 py-1">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function SavedCarsPage() {
  const savedCars = [
    {
      id: 1,
      name: 'BMW 3 Series',
      specs: '2022 • Diesel • Automatic',
      price: '₹ 8,42,000',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Mercedes C-Class',
      specs: '2021 • Petrol • Automatic',
      price: '₹ 9,10,000',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      name: 'Hyundai Creta',
      specs: '2021 • Diesel • Manual',
      price: '₹ 11,20,000',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      name: 'Audi A4',
      specs: '2020 • Petrol • Automatic',
      price: '₹ 9,60,000',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#EAF4FF]">Saved Cars</h1>
        <p className="text-xs text-[#8DA7C4]">Your favorite cars for quick access and tracking.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {savedCars.map((car) => (
          <Card key={car.id} className="p-4 flex flex-col justify-between">
            <div>
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#EAF4FF]">{car.name}</h3>
                  <p className="text-xs text-[#8DA7C4]">{car.specs}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#00B9FF]">{car.price}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#132E4F]">
              <Link to="/results" className="flex-1">
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  View Analysis
                </Button>
              </Link>
              <Button variant="danger" size="sm" icon={Trash2} title="Remove saved car" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

