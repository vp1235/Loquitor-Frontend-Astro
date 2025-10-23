import React, { useState, useEffect } from 'react';
import { ChevronRight, Database, GitBranch, Globe, Brain, ArrowRight, Server, FileSearch, Network, BookOpen, FlaskConical, Layers } from 'lucide-react';
import { useVibe } from '../context/VibeContext';
// TODO: Re-enable demos once bugs are fixed
// import AIAgentDemo from './AIAgentDemo';
// import SpreadsheetAnalyzer from './SpreadsheetAnalyzer';
// import TransformersDemo from './TransformersDemo';
import { getVibeContent, consultationServices } from '../config/vibeContent';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { vibe } = useVibe();

  // Get content based on current vibe
  const content = getVibeContent(vibe);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 backdrop-blur rounded-full border border-emerald-300 dark:border-emerald-500/30 transition-colors duration-300">
              <content.hero.badge.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm text-emerald-700 dark:text-emerald-300">{content.hero.badge.text}</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="text-slate-900 dark:text-white">{content.hero.title.line1}</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                {content.hero.title.line2}
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('capabilities').scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center text-white">
                {content.hero.primaryCTA}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('consultation').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all backdrop-blur">
                {content.hero.secondaryCTA}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 blur-3xl pointer-events-none" />
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-2xl transition-colors duration-300">
              <div className="space-y-6">
                {content.capabilities.map((cap, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                      activeFeature === index
                        ? 'bg-slate-100 dark:bg-slate-800/50 border border-emerald-300 dark:border-emerald-500/30 shadow-lg'
                        : 'opacity-60'
                    }`}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${cap.gradient} rounded-lg flex items-center justify-center`}>
                      <cap.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{cap.title}</h3>
                    </div>
                    {activeFeature === index && (
                      <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="capabilities" className="relative z-10 px-6 lg:px-12 py-20 bg-slate-100/50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{content.sectionTitle}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">{content.sectionSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.capabilities.map((capability, index) => (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-2xl p-8 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${capability.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <capability.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{capability.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl p-12 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Network className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Deployment Flexibility</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Local, API, and hybrid deployment options with seamless integration</p>
              </div>
              <div className="text-center">
                <FileSearch className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Document Intelligence</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Advanced analysis of internal and external documents in real-time</p>
              </div>
              <div className="text-center">
                <Database className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Data Processing</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Agentic systems for comprehensive data analysis and insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Services */}
      <section id="consultation" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Consultation Services</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Expert guidance for your AI journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {consultationServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-2xl p-8 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive Demos - Temporarily disabled until bugs are fixed */}
          {/* <div className="space-y-8 mb-12">
            <div className="grid lg:grid-cols-2 gap-8">
              <AIAgentDemo vibe={vibe} />
              <SpreadsheetAnalyzer vibe={vibe} />
            </div>

            <TransformersDemo vibe={vibe} />
          </div> */}

          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white shadow-2xl">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg mb-8 text-emerald-50">
                Schedule a free consultation to discuss your AI needs and explore how we can help transform your business.
              </p>
              <button
                onClick={() => window.location.href = 'mailto:contact@loquitor.ai'}
                className="px-10 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-xl">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="relative z-10 px-6 lg:px-12 py-20 bg-slate-100/50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Research Collaborations</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Advancing AI through theoretical statistics</p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-2xl p-12 transition-colors duration-300">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <BookOpen className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Institutional Partnerships</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  We collaborate with various institutions on theoretical statistics research
                  that contributes to advancing AI capabilities and understanding.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-600 dark:text-slate-400">
                    <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    Theoretical statistics research
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-slate-400">
                    <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    AI model optimization studies
                  </li>
                  <li className="flex items-center text-slate-600 dark:text-slate-400">
                    <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    Applied research initiatives
                  </li>
                </ul>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="min-w-0 overflow-hidden bg-gradient-to-br from-emerald-600/10 to-teal-600/10 dark:from-emerald-600/20 dark:to-teal-600/20 rounded-lg p-4 sm:p-6 border border-emerald-300 dark:border-emerald-500/20 transition-colors duration-300">
                  <FlaskConical className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400 mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 break-words leading-snug">Research</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-500 break-words">Active Projects</div>
                </div>

                <div className="min-w-0 overflow-hidden bg-gradient-to-br from-blue-600/10 to-cyan-600/10 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-lg p-4 sm:p-6 border border-blue-300 dark:border-blue-500/20 transition-colors duration-300">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 break-words leading-snug">Theory</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-500 break-words">Statistical Models</div>
                </div>

                <div className="min-w-0 overflow-hidden bg-gradient-to-br from-orange-600/10 to-amber-600/10 dark:from-orange-600/20 dark:to-amber-600/20 rounded-lg p-4 sm:p-6 border border-orange-300 dark:border-orange-500/20 transition-colors duration-300">
                  <GitBranch className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400 mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400 break-words leading-snug">Applied</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-500 break-words">Real Solutions</div>
                </div>

                <div className="min-w-0 overflow-hidden bg-gradient-to-br from-slate-600/10 to-zinc-600/10 dark:from-slate-600/20 dark:to-zinc-600/20 rounded-lg p-4 sm:p-6 border border-slate-300 dark:border-slate-500/20 transition-colors duration-300">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600 dark:text-slate-400 mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-slate-600 dark:text-slate-400 break-words leading-snug">Impact</div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-500 break-words">Industry Wide</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Flexible Architecture</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Deploy how you need, where you need</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all">
              <Server className="w-10 h-10 text-orange-600 dark:text-orange-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Local Deployment</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">On-premise solutions for maximum control and security</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all">
              <Globe className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">API Integration</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Cloud-based API access for scalability and ease</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all">
              <Layers className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hybrid Solutions</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Combine local and API models for optimal performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 bg-slate-100/50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to Build Your
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Custom AI Solution?
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
            Let's discuss how Loquitor can transform your enterprise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = 'mailto:contact@loquitor.ai'}
              className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-xl hover:shadow-emerald-500/25 text-white">
              Contact Us
            </button>
            <button
              onClick={() => document.getElementById('capabilities').scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all backdrop-blur">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 px-6 lg:px-12 py-8 mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <span className="text-xl font-bold">Loquitor</span>
          </div>
          <div className="text-sm text-slate-500 flex items-center gap-4">
            <span>© 2025 Loquitor, LLC. All rights reserved.</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms</a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
