import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, HelpCircle } from 'lucide-react';
import { Button, Card, Badge } from '../components/CommonUI';

export function AIChatbotPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Great question! The difference in valuation between the two cars can be due to:\n1. Mileage (years may be higher)\n2. Transmission type (manual vs automatic)\n3. Location/demand market demand\n4. Service history (more complete history = higher value)\n5. Condition factor (accidents reduce value)\n\nWould you like me to compare both cars side by side?",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');

  const promptSuggestions = [
    "Why is my car valued lower than expected?",
    "Compare two cars for resale yield",
    "Tips to increase my vehicle's resale value",
    "General car valuation questions"
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { sender: 'user', text: input, time: 'Just now' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        {
          sender: 'bot',
          text: "I am analyzing the specific market parameters for your request. Based on current sales trends, vehicle condition and service regularity are currently yielding a +10% premium in your area.",
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#EAF4FF] flex items-center gap-2">
          <Bot className="w-6 h-6 text-[#00B9FF]" />
          Ask AutoValue AI
        </h1>
        <p className="text-xs text-[#8DA7C4]">
          Get instant answers about car valuation, market trends, inspection factors and more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[620px]">
        {/* Left Side: Avatar & Prompt Recommendations */}
        <Card className="lg:col-span-4 p-5 flex flex-col justify-between">
          <div>
            <div className="text-center py-4 border-b border-[#132E4F]">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#087BFF] to-[#00B9FF] mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(0,185,255,0.4)] mb-3">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-[#EAF4FF]">AutoValue Assistant</h3>
              <p className="text-[11px] text-[#00B9FF]">AI Car Market Advisor</p>
            </div>

            <div className="mt-6 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8DA7C4]">I can help you with:</span>
              <div className="space-y-2">
                {promptSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(item)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#06101D] border border-[#132E4F] hover:border-[#00B9FF]/50 text-xs text-[#8DA7C4] hover:text-[#EAF4FF] transition-all"
                  >
                    💡 {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#526D82] text-center pt-4 border-t border-[#132E4F]">
            Responses are generated based on historical car sales trends.
          </div>
        </Card>

        {/* Right Side: Chat Window */}
        <Card className="lg:col-span-8 p-0 flex flex-col overflow-hidden border-[#132E4F]">
          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* User message sample */}
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-2xl rounded-tr-none bg-[#087BFF] text-white p-3.5 text-xs shadow-md">
                Why is my BMW valued lower than another 2022 BMW?
              </div>
            </div>

            {/* Messages */}
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'rounded-tr-none bg-[#087BFF] text-white'
                      : 'rounded-tl-none bg-[#06101D] border border-[#132E4F] text-[#EAF4FF]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input box */}
          <form onSubmit={handleSend} className="p-4 bg-[#06101D] border-t border-[#132E4F] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#0B1B30] border border-[#132E4F] rounded-lg px-4 py-2.5 text-xs text-[#EAF4FF] placeholder-[#526D82] focus:outline-none focus:border-[#087BFF]"
            />
            <Button variant="cyanGlow" size="sm" type="submit" icon={Send}>
              Send
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

