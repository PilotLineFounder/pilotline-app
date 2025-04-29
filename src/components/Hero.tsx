import React from 'react';
import { ArrowRight, Code, Zap, LineChart } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-slate-900/90"></div>
        <img 
          src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Motorsports engine work" 
          className="w-full h-full object-cover object-center opacity-40"
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Transforming <span className="text-blue-400">Rapid Prototyping</span> for Engineering Innovation
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            PilotLine is a SaaS platform streamlining the design, process, build, and test cycle for pre-commercial rapid prototyping in motorsports, aerospace, and medical devices.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button 
              onClick={scrollToContact}
              className="px-8 py-3 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-500 transition duration-300 shadow-lg flex items-center justify-center gap-2 group"
            >
              Invest Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-transparent border border-blue-400 rounded-md text-blue-400 font-medium hover:bg-blue-900/30 transition duration-300"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in">
          <FeatureCard 
            icon={<Code className="h-8 w-8 text-blue-400" />}
            title="Streamlined Workflows"
            description="Connect external CAD systems via APIs for design revision tracking and print connections."
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-blue-400" />}
            title="20% R&D Cost Reduction"
            description="Reduce prototyping costs through optimized processes and streamlined testing."
          />
          <FeatureCard 
            icon={<LineChart className="h-8 w-8 text-blue-400" />}
            title="$9.7B Market Opportunity"
            description="Targeting motorsports ($7B), aerospace ($50B), and medical devices ($40B)."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-900/50 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-blue-900/50 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};