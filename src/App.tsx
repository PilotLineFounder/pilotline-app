import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarketOpportunity } from './components/MarketOpportunity';
import { Campaign } from './components/Campaign';
import { Footer } from './components/Footer';
import { ModalProvider } from './context/ModalContext';
import './styles/animations.css';

function App() {
  return (
    <ModalProvider>
      <div className="relative min-h-screen overflow-x-hidden text-gray-100 bg-gradient-to-br from-blue-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          <main>
            <Hero />
            <MarketOpportunity />
            <Campaign 
              id="campaign1"
              title="Campaign 1: SAE Season Prototype (May 2025–December 2025)"
              description="Deliver a functional prototype by December 2025, aligned with the 2025–2026 Formula SAE season."
              objective="Target 10 beta customers to validate core functionality within the $210M motorsports SAM."
              image="/images/motorsports.jpg"
            />
            <Campaign 
              id="campaign2"
              title="Campaign 2: Industry Expansion (2026–2035)"
              description="Scale PilotLine to motorsports, aerospace, and medical devices, leveraging SAE feedback."
              objective="Achieve $6.84M ARR by Year 4 (2029) and $190M by Year 10 (2035), with a $380M–$1B acquisition."
              image="/images/aerospace.jpg"
              reverse
            />
          </main>
          <Footer />
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;