import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/NavbarFooter';
import { HomePage } from './pages/HomePage';
import { PredictPage } from './pages/PredictPage';
import { PredictionResultPage } from './pages/PredictionResultPage';
import { MarketInsightsPage } from './pages/MarketInsightsPage';
import { CompareCarsPage } from './pages/CompareCarsPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import { ProfilePage, PredictionHistoryPage, SavedCarsPage } from './pages/HistoryAndSavedPages';
import { AIChatbotPage } from './pages/AIChatbotPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#06101D] text-[#EAF4FF] selection:bg-[#087BFF]/30 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<PredictPage />} />
            <Route path="/results" element={<PredictionResultPage />} />
            <Route path="/market-insights" element={<MarketInsightsPage />} />
            <Route path="/compare" element={<CompareCarsPage />} />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history" element={<PredictionHistoryPage />} />
            <Route path="/saved" element={<SavedCarsPage />} />
            <Route path="/chatbot" element={<AIChatbotPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

