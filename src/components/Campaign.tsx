import React from 'react';
import { useModal } from '../context/ModalContext';
import { ArrowRight, LineChart, Code, Zap, ChevronRight } from 'lucide-react';

interface CampaignProps {
  id: string;
  title: string;
  description: string;
  objective: string;
  image: string;
  reverse?: boolean;
}

export const Campaign: React.FC<CampaignProps> = ({ 
  id, 
  title, 
  description, 
  objective,
  image,
  reverse = false
}) => {
  const { openModal } = useModal();

  const handleLearnMore = () => {
    if (id === 'campaign1') {
      openModal({
        title: "Campaign 1: SAE Season Prototype",
        content: (
          <div className="text-gray-800 space-y-6">
            <p>Deliver a functional prototype by December 2025, aligned with the 2025–2026 Formula SAE season (design: September–December 2025, fabrication: January–March 2026, testing: April 2026, competition: May 2026), targeting 10 beta customers (7 freemium, 2 professional, 1 enterprise, including Gopher Motorsports) to validate core functionality and professional/enterprise integrations within the $210M motorsports SAM.</p>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Technical Scope</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Design Module:</strong> Connect external CAD (Onshape, Fusion 360, SOLIDWORKS PDM) via APIs for design revision tracking and print connections
                </li>
                <li>
                  <strong>Process Module:</strong> Define manufacturing steps via drag-and-drop workflows
                </li>
                <li>
                  <strong>Build Module:</strong> Track CNC/3D printing recipes and generate manual assembly instructions
                </li>
                <li>
                  <strong>Test Module:</strong> Run virtual tests and log physical test results
                </li>
                <li>
                  <strong>Inventory Traceability:</strong> Track raw materials and purchased parts with complete traceability
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Campaign 1 Financials</h4>
              <ul className="list-disc pl-5">
                <li><strong>Revenue:</strong> $36K subscriptions + $47.5K services = $165K ARR</li>
                <li><strong>Costs:</strong> $105.75K (prototype, services, AWS, marketing)</li>
                <li><strong>Gross Margin:</strong> 54%</li>
                <li><strong>Budget:</strong> $60K (team, AWS, legal, misc)</li>
                <li><strong>Funding Ask:</strong> $75K for development and marketing</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Key Milestones</h4>
              <ul className="list-disc pl-5">
                <li><strong>October 2025:</strong> Beta testing with Gopher Motorsports</li>
                <li><strong>December 2025:</strong> Prototype launched, 10 beta customers onboarded</li>
              </ul>
            </div>
          </div>
        ),
      });
    } else {
      openModal({
        title: "Campaign 2: Industry Expansion",
        content: (
          <div className="text-gray-800 space-y-6">
            <p>Scale PilotLine to motorsports (2026–2027, $210M SAM), aerospace (2027–2028, $1.5B SAM), and medical devices (2028–2035, $1.2B SAM), leveraging SAE feedback to refine features, add ancillary functionality, and capture high-value professional/enterprise clients.</p>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Rollout Phases</h4>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Phase 1: Motorsports Expansion (2026–2027)</strong>
                  <ul className="list-circle pl-5 mt-1">
                    <li>Target: Professional motorsports teams and SAE teams</li>
                    <li>Revenue (2027): $1.02M ARR</li>
                  </ul>
                </li>
                <li>
                  <strong>Phase 2: Aerospace Expansion (2027–2028)</strong>
                  <ul className="list-circle pl-5 mt-1">
                    <li>Target: Aerospace startups and mid-sized firms</li>
                    <li>Revenue (2028): $3.36M ARR</li>
                  </ul>
                </li>
                <li>
                  <strong>Phase 3: Medical Device Expansion (2028–2035)</strong>
                  <ul className="list-circle pl-5 mt-1">
                    <li>Target: Medical device startups and manufacturers</li>
                    <li>Revenue (2029): $6.84M ARR, By 2035: $190M ARR</li>
                  </ul>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Financial Projections</h4>
              <ul className="list-disc pl-5">
                <li><strong>Year 1 (2026):</strong> $165K ARR, 54% Gross Margin</li>
                <li><strong>Year 4 (2029):</strong> $6.84M ARR, 88% Gross Margin</li>
                <li><strong>Year 10 (2035):</strong> $190M ARR, 95% Gross Margin</li>
                <li><strong>Exit Potential:</strong> $380M–$1B (5–8x ARR)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Total Funding Ask</h4>
              <ul className="list-disc pl-5">
                <li>Campaign 1: $75K immediate</li>
                <li>Campaign 2: $6.5M over years 2-10</li>
                <li>ROI: 100x returns with $380M–$1B exit</li>
              </ul>
            </div>
          </div>
        ),
      });
    }
  };

  const handleFinancialsClick = () => {
    if (id === 'campaign1') {
      openModal({
        title: "Campaign 1 Financials",
        content: (
          <div className="text-gray-800">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Revenue Breakdown</h4>
              <ul className="list-disc pl-5">
                <li><strong>Subscriptions:</strong> 2 professional ($500/month × 12 = $12K), 1 enterprise ($2,000/month × 12 = $24K) = $36K</li>
                <li><strong>Services:</strong> 2 professional (100 hours × $100 = $10K), 1 enterprise (250 hours × $150 = $37.5K) = $47.5K</li>
                <li><strong>Total ARR:</strong> $36K + $129K (services, annualized) = $165K</li>
              </ul>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Costs Breakdown</h4>
              <ul className="list-disc pl-5">
                <li><strong>Prototype:</strong> $48.5K</li>
                <li><strong>Services:</strong> $27.2K (350 hours × $80/hour)</li>
                <li><strong>AWS:</strong> $0.05K</li>
                <li><strong>Marketing & Sales:</strong> $30K</li>
                <li><strong>Total:</strong> $105.75K</li>
              </ul>
            </div>
            
            <div className="mt-4 text-center">
              <div className="inline-block bg-green-100 px-4 py-2 rounded-lg">
                <span className="font-semibold text-green-800">Gross Margin: 54%</span>
              </div>
            </div>
          </div>
        ),
      });
    } else {
      openModal({
        title: "Campaign 2 Financials",
        content: (
          <div className="text-gray-800 space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Year</th>
                    <th className="py-2 px-4 border-b">Customers</th>
                    <th className="py-2 px-4 border-b">ARR</th>
                    <th className="py-2 px-4 border-b">Costs</th>
                    <th className="py-2 px-4 border-b">Gross Margin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">Year 1 (2026)</td>
                    <td className="py-2 px-4 border-b">10</td>
                    <td className="py-2 px-4 border-b">$165K</td>
                    <td className="py-2 px-4 border-b">$105.75K</td>
                    <td className="py-2 px-4 border-b">54%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Year 2 (2027)</td>
                    <td className="py-2 px-4 border-b">30</td>
                    <td className="py-2 px-4 border-b">$1.02M</td>
                    <td className="py-2 px-4 border-b">$318.16K</td>
                    <td className="py-2 px-4 border-b">69%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Year 3 (2028)</td>
                    <td className="py-2 px-4 border-b">60</td>
                    <td className="py-2 px-4 border-b">$3.36M</td>
                    <td className="py-2 px-4 border-b">$620.32K</td>
                    <td className="py-2 px-4 border-b">82%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Year 4 (2029)</td>
                    <td className="py-2 px-4 border-b">100</td>
                    <td className="py-2 px-4 border-b">$6.84M</td>
                    <td className="py-2 px-4 border-b">$830.54K</td>
                    <td className="py-2 px-4 border-b">88%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Year 10 (2035)</td>
                    <td className="py-2 px-4 border-b">2,000</td>
                    <td className="py-2 px-4 border-b">$190M</td>
                    <td className="py-2 px-4 border-b">$9.81M</td>
                    <td className="py-2 px-4 border-b">95%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-800">Key Financial Insights</h4>
              <ul className="list-disc pl-5 text-blue-900">
                <li>Revenue grows from $165K to $190M over 10 years</li>
                <li>Customer base expands from 10 to 2,000</li>
                <li>Gross margin improves from 54% to 95%</li>
                <li>Exit valuation: $380M–$1B (5–8x ARR)</li>
              </ul>
            </div>
          </div>
        ),
      });
    }
  };

  const handleTechnicalClick = () => {
    if (id === 'campaign1') {
      openModal({
        title: "Campaign 1 Technical Details",
        content: (
          <div className="text-gray-800 space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Core Functionality (December 2025 Beta)</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Design Module:</strong> Connect external CAD (Onshape, Fusion 360, SOLIDWORKS PDM) via APIs for design revision tracking and print connections
                </li>
                <li>
                  <strong>Process Module:</strong> Define manufacturing steps via drag-and-drop workflows, store templates in RDS
                </li>
                <li>
                  <strong>Build Module (Digital):</strong> Simulate assemblies using digital twins (AWS Lambda), visualize sequences
                </li>
                <li>
                  <strong>Build Module (Physical):</strong> Track CNC/3D printing recipes, generate assembly instructions
                </li>
                <li>
                  <strong>Test Module:</strong> Run virtual tests (e.g., CalculiX), log physical test results
                </li>
                <li>
                  <strong>Inventory Traceability:</strong> Order materials, track status, generate reports
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Infrastructure</h4>
              <ul className="list-disc pl-5">
                <li><strong>AWS:</strong> EC2, RDS (MySQL), S3, Lambda, API Gateway</li>
                <li><strong>Cost:</strong> $0.45/customer/month, ~$500 for 10 customers</li>
                <li><strong>CI/CD:</strong> AWS CodePipeline</li>
                <li><strong>Security:</strong> AES-256 encryption, OAuth 2.0, IAM</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Development Timeline</h4>
              <ul className="list-disc pl-5">
                <li><strong>Month 1 (May 2025):</strong> Team onboarding, AWS setup</li>
                <li><strong>Month 2-3:</strong> Design/process modules, CAD APIs</li>
                <li><strong>Month 4-5:</strong> Build/test modules, CNC/3D printing APIs</li>
                <li><strong>Month 6-7:</strong> Beta testing with Gopher Motorsports</li>
                <li><strong>Month 8 (Dec 2025):</strong> Launch prototype for 10 beta customers</li>
              </ul>
            </div>
          </div>
        ),
      });
    } else {
      openModal({
        title: "Campaign 2 Technical Details",
        content: (
          <div className="text-gray-800 space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Technical Enhancements</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Year 2 (2027):</strong> 
                  <ul className="list-circle pl-5 mt-1">
                    <li>CAD version control with Onshape branching</li>
                    <li>Enhanced recipe tracking for diverse CNC/3D printing setups</li>
                    <li>Supplier catalog with 10% commission on parts orders</li>
                  </ul>
                </li>
                <li>
                  <strong>Year 3 (2028):</strong>
                  <ul className="list-circle pl-5 mt-1">
                    <li>OpenFOAM CFD integration</li>
                    <li>Enhanced traceability for AS9100 compliance</li>
                    <li>Aerospace-specific workflow templates</li>
                  </ul>
                </li>
                <li>
                  <strong>Year 4-10 (2029-2035):</strong>
                  <ul className="list-circle pl-5 mt-1">
                    <li>External CAD searching for FDA-approved materials</li>
                    <li>Enterprise dashboards for regulatory reporting</li>
                    <li>FDA compliance features (21 CFR Part 11)</li>
                    <li>Scaled AWS infrastructure</li>
                  </ul>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Team Expansion</h4>
              <ul className="list-disc pl-5">
                <li><strong>Year 1 (2026):</strong> 2 in-house developers ($160K/year)</li>
                <li><strong>Year 2-3:</strong> Add 2 developers ($160K/year)</li>
                <li><strong>Year 4-10:</strong> Scale to 10 developers by 2029, 20 by 2035</li>
                <li><strong>Sales/Marketing:</strong> 2 sales reps by 2027, scaling to 10 by 2035</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Risk Mitigation</h4>
              <ul className="list-disc pl-5">
                <li><strong>Tech Risk:</strong> Reusable API/ETL templates, AWS 99.9% uptime SLA</li>
                <li><strong>Legal Risk:</strong> NDAs, contracts, IP assignments, GDPR/CCPA compliance</li>
                <li><strong>Market Risk:</strong> Gopher Motorsports beta de-risks adoption</li>
                <li><strong>Financial Risk:</strong> Service margins (20-47%) offset costs, 15% contingency</li>
              </ul>
            </div>
          </div>
        ),
      });
    }
  };

  return (
    <section id={id} className="py-20">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
        <div className="w-full md:w-1/2 fade-in">
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-transparent to-slate-900/80 z-10"></div>
            <img 
              src={id === 'campaign1' 
                ? "https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                : "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              } 
              alt={id === 'campaign1' ? "Formula SAE race car" : "Advanced manufacturing line"} 
              className="w-full h-full object-cover object-center transition-transform duration-700 transform scale-100 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={handleLearnMore}
                className="px-4 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-500 transition duration-300 shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-300 mb-4">{description}</p>
          <p className="text-gray-300 mb-6">{objective}</p>
          
          <div className="space-y-3">
            <button 
              onClick={handleLearnMore}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
              <span>Campaign Overview</span>
            </button>
            
            <button 
              onClick={handleFinancialsClick}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <LineChart className="h-5 w-5 mr-1" />
              <span>Financial Projections</span>
            </button>
            
            <button 
              onClick={handleTechnicalClick}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Code className="h-5 w-5 mr-1" />
              <span>Technical Details</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};