'use client';

import { useState } from 'react';
import { 
  BoltIcon, 
  WrenchScrewdriverIcon, 
  ChartBarIcon, 
  ArrowPathIcon,
  ShieldCheckIcon,
  ArrowsPointingOutIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartPieIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CurrencyDollarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const features = [
  {
    name: 'Dynamic Charging Scheduling',
    description: 'Optimize charging times to minimize electricity costs and maximize fleet availability.',
    icon: BoltIcon,
  },
  {
    name: 'Predictive Maintenance',
    description: 'AI-powered system that predicts and prevents charging infrastructure issues before they occur.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Real-Time Dashboard',
    description: 'Comprehensive monitoring of fleet status, energy usage, and cost savings in real-time.',
    icon: ChartBarIcon,
  },
  {
    name: 'V2G Integration',
    description: 'Vehicle-to-Grid technology that turns your fleet into a revenue-generating asset.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Enterprise Security',
    description: 'Military-grade encryption and security protocols to protect your fleet data.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Scalable Infrastructure',
    description: 'Cloud-native architecture that grows with your fleet operations.',
    icon: ArrowsPointingOutIcon,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'Fleet Manager',
    company: 'Green Logistics Inc.',
    content: 'VoltPilot has reduced our charging costs by 35% and improved our fleet uptime significantly.',
    stats: {
      savings: '35%',
      uptime: '98%',
    },
  },
  {
    name: 'Michael Chen',
    title: 'Operations Director',
    company: 'Urban Transit Solutions',
    content: 'The predictive maintenance features have saved us thousands in unexpected repairs.',
    stats: {
      savings: '42%',
      uptime: '99%',
    },
  },
];

const pillars = [
  {
    name: 'Cost Savings',
    description: 'Reduce operational costs through smart charging and V2G revenue.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Reliability',
    description: 'Ensure fleet availability with predictive maintenance and real-time monitoring.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Environmental Impact',
    description: 'Contribute to grid stability and reduce carbon emissions through optimized charging.',
    icon: GlobeAltIcon,
  },
];

const steps = [
  {
    name: 'Setup',
    description: 'Connect your fleet and charging infrastructure to VoltPilot.',
    icon: 1,
  },
  {
    name: 'Integrate',
    description: 'Seamlessly integrate with your existing systems and APIs.',
    icon: 2,
  },
  {
    name: 'Optimize',
    description: 'Let our AI optimize your charging schedules and maintenance.',
    icon: 3,
  },
  {
    name: 'Report',
    description: 'Track performance and generate detailed reports.',
    icon: 4,
  },
];

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="EV trucks charging at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              VoltPilot: Revolutionize Your Fleet's Charging and Efficiency
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              End-to-end smart charging solutions for heavy-duty and commercial EV fleets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#007bff] hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg">
                Request a Demo
              </button>
              <button className="bg-white hover:bg-gray-100 text-[#007bff] px-8 py-3 rounded-lg font-semibold text-lg">
                Try for Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Fleets
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to optimize your EV fleet operations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-[#007bff]/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-[#007bff]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Proof Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Results, Real Savings
            </h2>
            <p className="text-xl text-gray-600">
              See how VoltPilot is transforming fleet operations
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`bg-gray-50 p-6 rounded-lg ${
                    activeTestimonial === index ? 'ring-2 ring-[#007bff]' : ''
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#39FF14]">
                        {testimonial.stats.savings}
                      </p>
                      <p className="text-sm text-gray-600">Cost Savings</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-[#39FF14] mr-2" />
                    <span className="text-gray-600">
                      {testimonial.stats.uptime} Uptime
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              {/* Placeholder for charts */}
              <div className="h-64 bg-white rounded-lg shadow-inner flex items-center justify-center">
                <p className="text-gray-500">Cost Savings & Uptime Charts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why VoltPilot Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose VoltPilot?
            </h2>
            <p className="text-xl text-gray-600">
              Three pillars of excellence for your fleet operations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.name}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-[#007bff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <pillar.icon className="h-8 w-8 text-[#007bff]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {pillar.name}
                </h3>
                <p className="text-gray-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How VoltPilot Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to optimize your fleet operations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.name} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-12 h-12 bg-[#007bff] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.name}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {step.icon < 4 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                    <ArrowRightIcon className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2F4F4F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">VoltPilot</h3>
              <p className="text-gray-300">
                Smart charging solutions for modern fleets.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">info@voltpilot.com</p>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 VoltPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
