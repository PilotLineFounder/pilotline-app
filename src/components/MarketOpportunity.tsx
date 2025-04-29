import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { ChartContainer } from './ChartContainer';
import { PieChart, BarChart, TrendingUp, Globe } from 'lucide-react';

export const MarketOpportunity: React.FC = () => {
  const { openModal } = useModal();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleMarketClick = (market: string, data: any) => {
    openModal({
      title: `${market} Market Details`,
      content: (
        <div className="text-gray-800">
          <ChartContainer data={data} />
          <div className="mt-4">
            <h4 className="font-semibold text-lg mb-2">Key Insights:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Total market size: ${data.size}B</li>
              <li>PilotLine target: ${(data.size * 0.1).toFixed(1)}B (10% of market)</li>
              <li>Expected R&D cost reduction: 20%</li>
              <li>Serviceable market: ${(data.size * 0.1 * 0.3).toFixed(1)}B</li>
            </ul>
          </div>
        </div>
      ),
    });
  };

  const markets = [
    { 
      name: 'Motorsports', 
      size: 7, 
      icon: <TrendingUp className="h-6 w-6" />,
      data: { 
        size: 7,
        labels: ['Formula 1', 'NASCAR', 'Rally', 'Formula SAE', 'Other'],
        values: [30, 25, 15, 10, 20],
        colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'],
      }
    },
    { 
      name: 'Aerospace', 
      size: 50, 
      icon: <Globe className="h-6 w-6" />,
      data: { 
        size: 50,
        labels: ['Commercial', 'Defense', 'UAV', 'Space', 'Other'],
        values: [35, 30, 15, 15, 5],
        colors: ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'],
      }
    },
    { 
      name: 'Medical Devices', 
      size: 40, 
      icon: <PieChart className="h-6 w-6" />,
      data: { 
        size: 40,
        labels: ['Diagnostics', 'Implants', 'Surgical', 'Monitoring', 'Other'],
        values: [25, 20, 30, 15, 10],
        colors: ['#06B6D4', '#22D3EE', '#67E8F9', '#A5F3FC', '#CFFAFE'],
      }
    }
  ];

  return (
    <section id="market" className="py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Market Opportunity</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            PilotLine targets 10% of industry market size, reflecting average R&D spending across multiple sectors with a total addressable market of $9.7B.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 fade-in">
          {markets.map((market) => (
            <div 
              key={market.name}
              className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-900/50 hover:border-blue-400/30 transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                activeSection === market.name ? 'ring-2 ring-blue-400' : ''
              }`}
              onClick={() => handleMarketClick(market.name, market.data)}
              onMouseEnter={() => setActiveSection(market.name)}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-900/50 rounded-full">
                    {market.icon}
                  </div>
                  <span className="text-2xl font-bold text-blue-400">${market.size}B</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{market.name}</h3>
                
                <p className="text-gray-300 mb-4">
                  {market.name === 'Motorsports' 
                    ? 'Formula 1, NASCAR, Rally, Formula SAE teams.'
                    : market.name === 'Aerospace'
                    ? 'Commercial aviation, defense, UAV manufacturers.'
                    : 'Implants, robotics, diagnostic equipment manufacturers.'}
                </p>
                
                <div className="flex items-center text-sm text-blue-300">
                  <BarChart className="h-4 w-4 mr-1" />
                  <span>Click for details & market breakdown</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg border border-blue-900/50 fade-in">
          <h3 className="text-2xl font-semibold mb-4">Value Proposition</h3>
          <div className="space-y-4">
            <p className="text-gray-300">
              PilotLine's unified platform reduces R&D costs by 20% through streamlined workflows, automated traceability, and optimized testing procedures. Our solution is compelling for R&D teams across industries:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-900/30 p-4 rounded-md border border-blue-800/50">
                <h4 className="font-semibold mb-2">Professional Clients</h4>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  <li>API/ETL integration (50 hours/client at $100/hour)</li>
                  <li>$5K per client</li>
                  <li>Reusable templates for equipment</li>
                </ul>
              </div>
              
              <div className="bg-blue-900/30 p-4 rounded-md border border-blue-800/50">
                <h4 className="font-semibold mb-2">Enterprise Clients</h4>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  <li>Integration (150 hours) plus customization (100 hours)</li>
                  <li>$37.5K per client at $150/hour</li>
                  <li>Tailored solutions for specific requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};