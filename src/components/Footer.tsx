import React from 'react';
import { Code, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-16 border-t border-blue-900/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="fade-in">
          <div className="flex items-center space-x-2 mb-4">
            <Code className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">PilotLine<span className="text-blue-400">.app</span></span>
          </div>
          
          <p className="text-gray-300 mb-6 max-w-md">
            A transformative SaaS platform streamlining the design, process, build, 
            test cycle for pre-commercial rapid prototyping across multiple industries.
          </p>
          
          <div className="p-6 bg-gradient-to-br from-blue-900/40 to-slate-800/40 rounded-lg border border-blue-900/50">
            <h3 className="text-xl font-semibold mb-3">Pitch to Investors</h3>
            <p className="text-gray-300 mb-4">
              $75K yields $165K ARR (Year 1), $6.84M (Year 4), $190M (Year 10), with a $380M–$1B exit. 
              Your expertise can accelerate enterprise sales.
            </p>
            <button className="px-5 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-500 transition duration-300 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto">
              Investment Opportunity
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="fade-in">
          <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-slate-800/70 border border-blue-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-slate-800/70 border border-blue-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 bg-slate-800/70 border border-blue-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="I'm interested in learning more about investment opportunities..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-500 transition duration-300 shadow-md flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </form>
          
          <p className="text-gray-400 text-sm mt-6">
            © {new Date().getFullYear()} PilotLine.app. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};