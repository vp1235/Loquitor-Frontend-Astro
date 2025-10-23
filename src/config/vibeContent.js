export const getVibeContent = (vibe) => {
  const content = {
    professional: {
      hero: {
        badge: {
          icon: 'FlaskConical',
          text: 'Research-Driven AI Innovation'
        },
        title: {
          line1: 'AI Solutions',
          line2: 'Built for You'
        },
        subtitle: 'Enterprise AI with complete customization, real-time agentic analysis, and seamless model compatibility across any deployment architecture.',
        primaryCTA: 'Explore Capabilities',
        secondaryCTA: 'Book Consultation'
      },
      capabilities: [
        {
          title: 'Bespoke Enterprise Solutions',
          description: 'Fully customized AI systems tailored to your specific business requirements',
          icon: 'Settings',
          gradient: 'from-emerald-600 to-teal-600'
        },
        {
          title: 'Real-time Agentic Analysis',
          description: 'Advanced agents for external and internal data and document processing',
          icon: 'Activity',
          gradient: 'from-blue-600 to-cyan-600'
        },
        {
          title: 'Universal Model Compatibility',
          description: 'Seamless cross-compatibility between local-API, local, and API models',
          icon: 'Layers',
          gradient: 'from-orange-600 to-amber-600'
        },
        {
          title: 'Model Customization',
          description: 'Fine-tune and adapt models to your domain-specific needs',
          icon: 'Terminal',
          gradient: 'from-slate-600 to-zinc-600'
        }
      ],
      sectionTitle: 'Core Capabilities',
      sectionSubtitle: 'Comprehensive AI infrastructure for enterprise needs'
    },

    dataScience: {
      hero: {
        badge: {
          icon: 'BarChart',
          text: 'Fundamental Statistical Research & Model Optimization'
        },
        title: {
          line1: 'Data-Driven AI',
          line2: 'Backed by Statistics'
        },
        subtitle: 'Advanced LLM solutions grounded in rigorous statistical research, featuring sophisticated model fine-tuning, big data handling, and empirically validated methodologies.',
        primaryCTA: 'Explore Research',
        secondaryCTA: 'View Capabilities'
      },
      capabilities: [
        {
          title: 'Statistical Model Fine-Tuning',
          description: 'Rigorous parameter optimization using advanced statistical methods and empirical validation',
          icon: 'TrendingUp',
          gradient: 'from-blue-600 to-indigo-600'
        },
        {
          title: 'Big Data Processing at Scale',
          description: 'Distributed systems for massive dataset analysis with statistical guarantees on accuracy',
          icon: 'Database',
          gradient: 'from-purple-600 to-pink-600'
        },
        {
          title: 'Research-Grade Analytics',
          description: 'Fundamental statistics research applied to real-world LLM deployment challenges',
          icon: 'FlaskConical',
          gradient: 'from-emerald-600 to-teal-600'
        },
        {
          title: 'Probabilistic Reasoning',
          description: 'Bayesian inference and uncertainty quantification for reliable AI decision-making',
          icon: 'LineChart',
          gradient: 'from-orange-600 to-red-600'
        }
      ],
      sectionTitle: 'Research-Driven Capabilities',
      sectionSubtitle: 'Statistical rigor meets practical AI deployment'
    },

    globalCommerce: {
      hero: {
        badge: {
          icon: 'Globe',
          text: 'Multilingual Cross-Compatible AI for Global Markets'
        },
        title: {
          line1: 'AI Without Borders',
          line2: 'Global by Design'
        },
        subtitle: 'Multilingual AI systems with deep semantic understanding across languages and cultures, powering international commerce with cross-compatible architectures that scale globally.',
        primaryCTA: 'Explore Global Solutions',
        secondaryCTA: 'International Services'
      },
      capabilities: [
        {
          title: 'Multilingual Semantic Understanding',
          description: 'Deep language comprehension across 100+ languages with cultural context preservation',
          icon: 'Languages',
          gradient: 'from-blue-600 to-cyan-600'
        },
        {
          title: 'Cross-Border Commerce Intelligence',
          description: 'AI systems designed for international trade, compliance, and market-specific adaptation',
          icon: 'Globe',
          gradient: 'from-emerald-600 to-teal-600'
        },
        {
          title: 'Universal Model Compatibility',
          description: 'Seamless deployment across regional infrastructures with local and cloud-hybrid options',
          icon: 'Network',
          gradient: 'from-purple-600 to-pink-600'
        },
        {
          title: 'Cultural & Contextual Adaptation',
          description: 'AI that understands regional nuances, regulations, and business practices',
          icon: 'Brain',
          gradient: 'from-orange-600 to-amber-600'
        }
      ],
      sectionTitle: 'Global AI Capabilities',
      sectionSubtitle: 'Breaking language barriers and connecting markets worldwide'
    },

    securityFirst: {
      hero: {
        badge: {
          icon: 'ShieldCheck',
          text: 'Trust, Security & Risk Mitigation at Every Layer'
        },
        title: {
          line1: 'Secure AI',
          line2: 'Built on Trust'
        },
        subtitle: 'Enterprise AI with security-first architecture, comprehensive risk mitigation, and transparent deployment. We invest in robust solutions, never compromising on tokens or trust.',
        primaryCTA: 'Security Overview',
        secondaryCTA: 'Compliance Info'
      },
      capabilities: [
        {
          title: 'Multi-Layer Security Architecture',
          description: 'Defense-in-depth approach with encryption, access controls, and audit trails at every level',
          icon: 'Lock',
          gradient: 'from-red-600 to-orange-600'
        },
        {
          title: 'Risk Mitigation & Compliance',
          description: 'Proactive threat modeling, regulatory compliance, and continuous security monitoring',
          icon: 'ShieldCheck',
          gradient: 'from-blue-600 to-indigo-600'
        },
        {
          title: 'Transparent Model Deployment',
          description: 'Full visibility into AI decision-making with explainable outputs and audit capabilities',
          icon: 'FileSearch',
          gradient: 'from-emerald-600 to-teal-600'
        },
        {
          title: 'Trust-First Token Economics',
          description: 'Quality over cost-cutting: robust solutions without compromising on computational resources',
          icon: 'Zap',
          gradient: 'from-purple-600 to-pink-600'
        }
      ],
      sectionTitle: 'Security & Trust',
      sectionSubtitle: 'Building reliable AI systems you can depend on'
    },

    innovationLab: {
      hero: {
        badge: {
          icon: 'Lightbulb',
          text: 'Semantic Complexity & Adaptive Intelligence'
        },
        title: {
          line1: 'Beyond Standard AI',
          line2: 'Infinite Flexibility'
        },
        subtitle: 'Cutting-edge AI handling niche inventories with descriptive complexity, semantic understanding that evolves with your needs, and commitment to delivering viable products through flexible, adaptive architectures.',
        primaryCTA: 'Explore Innovation',
        secondaryCTA: 'See Capabilities'
      },
      capabilities: [
        {
          title: 'Descriptive Complexity Handling',
          description: 'AI systems that master complex, nuanced product catalogs and technical specifications across diverse domains',
          icon: 'Workflow',
          gradient: 'from-purple-600 to-fuchsia-600'
        },
        {
          title: 'Adaptive Semantic Intelligence',
          description: 'Deep understanding of context, meaning, and relationships in highly specialized knowledge domains',
          icon: 'Brain',
          gradient: 'from-blue-600 to-cyan-600'
        },
        {
          title: 'Flexible Architecture Design',
          description: 'Modular, extensible systems that evolve with your business without complete rewrites',
          icon: 'Cpu',
          gradient: 'from-orange-600 to-red-600'
        },
        {
          title: 'Product-Focused Delivery',
          description: 'Commitment to viable, production-ready solutions with continuous iteration and refinement',
          icon: 'Lightbulb',
          gradient: 'from-emerald-600 to-teal-600'
        }
      ],
      sectionTitle: 'Innovation & Flexibility',
      sectionSubtitle: 'AI that adapts to complexity and grows with your vision'
    }
  };

  return content[vibe] || content.professional;
};

export const consultationServices = [
  {
    title: 'Strategy Consultation',
    description: 'Expert guidance on AI implementation strategy and roadmap planning',
    icon: 'Users',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    title: 'Technical Advisory',
    description: 'Deep technical consultation on model selection, architecture, and optimization',
    icon: 'MessageSquare',
    gradient: 'from-indigo-600 to-blue-600'
  },
  {
    title: 'Rapid Prototyping',
    description: 'Fast proof-of-concept development to validate your AI initiatives',
    icon: 'Zap',
    gradient: 'from-yellow-600 to-orange-600'
  }
];
