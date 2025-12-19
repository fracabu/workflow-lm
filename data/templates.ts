export interface TemplateData {
  title: string;
  desc: string;
  scenario: string;
  agentCount: number;
  category?: string;
}

export const PRIMARY_TEMPLATES: TemplateData[] = [
  {
    title: "M&A Due Diligence",
    desc: "Financial Auditor, Legal Risk Assessor, IP Validator, Ops Analyst & HR Integrator.",
    scenario: "Perform comprehensive due diligence for a merger acquisition. Include a Financial Auditor for books, a Legal Risk Assessor for liabilities, an IP Validator for patents, an Operations Analyst, and an HR Integrator.",
    agentCount: 5,
    category: "Finance"
  },
  {
    title: "Global Supply Chain",
    desc: "Route Planner, Customs Officer, Inventory Forecaster, Risk Mgr & Carrier Negotiator.",
    scenario: "Optimize a global logistics network. I need a Route Planner, a Customs Compliance Officer, an Inventory Forecaster, a Supply Chain Risk Manager, and a Carrier Negotiator.",
    agentCount: 6,
    category: "Supply Chain"
  },
  {
    title: "SaaS Enterprise Architecture",
    desc: "System Architect, Security Lead, DB Specialist, API Designer & DevOps.",
    scenario: "Design a scalable enterprise SaaS platform. Include a System Architect, a Cloud Security Lead, a Database Specialist, an API Designer, and a DevOps Engineer.",
    agentCount: 5,
    category: "Tech"
  },
  {
    title: "Clinical Trial Mgmt",
    desc: "Trial Coordinator, Data Manager, Patient Liaison, Ethics Officer & Biostatistician.",
    scenario: "Manage a Phase III clinical trial. I need a Trial Coordinator, a Clinical Data Manager, a Patient Liaison, an Ethics Compliance Officer, and a Biostatistician.",
    agentCount: 5,
    category: "Healthcare"
  }
];

export const CATEGORY_TEMPLATES: Record<string, TemplateData[]> = {
  'Tech': [
    {
      title: "Cybersecurity SOC",
      desc: "Threat Hunter, Incident Responder, Forensics, Malware Analyst & Comms.",
      scenario: "Staff a Security Operations Center (SOC). Include a Threat Hunter, an Incident Responder, a Digital Forensics Expert, a Malware Analyst, and a Crisis Communicator.",
      agentCount: 5
    },
    {
      title: "Legacy Migration",
      desc: "Code Analyzer, Refactoring Specialist, DB Migrator, QA & Architect.",
      scenario: "Migrate a legacy mainframe system to the cloud. I need a Legacy Code Analyzer, a Refactoring Specialist, a Database Migration Expert, a QA Automation Engineer, and a Cloud Architect.",
      agentCount: 5
    },
    {
      title: "Mobile App Factory",
      desc: "iOS Lead, Android Lead, UI/UX, Backend & QA.",
      scenario: "Build a cross-platform mobile application. Include an iOS Lead, an Android Lead, a UI/UX Designer, a Backend Engineer, and a QA Tester.",
      agentCount: 5
    },
    {
      title: "Data Lakehouse",
      desc: "Data Engineer, ETL Developer, Data Steward & Governance Lead.",
      scenario: "Architect a corporate Data Lakehouse. I need a Data Engineer, an ETL Developer, a Data Steward for quality, and a Data Governance Lead.",
      agentCount: 4
    },
    {
      title: "Microservices Decomp",
      desc: "Domain Architect, API Designer, DB Splitter & Service Mesh Ops.",
      scenario: "Break a monolith into microservices. I need a Domain Architect, an API Gateway Designer, a Database Decoupling Specialist, and a Service Mesh Operator.",
      agentCount: 4
    },
    {
      title: "IoT Smart City",
      desc: "Sensor Network Mgr, Edge Processor, Anomaly Detector & Dash Viz.",
      scenario: "Manage a smart city sensor grid. I need a Sensor Network Manager, an Edge Data Processor, an Anomaly Detector for outages, and a Dashboard Visualizer.",
      agentCount: 4
    },
    {
      title: "DevRel Content Engine",
      desc: "Dev Advocate, Tech Writer, Code Sample Gen & Community Mgr.",
      scenario: "Run a Developer Relations content machine. I need a Developer Advocate, a Technical Writer, a Code Sample Generator, and a Community Manager.",
      agentCount: 4
    },
    {
      title: "Accessibility Fixer",
      desc: "WCAG Auditor, Screen Reader Tester, Frontend Remediator.",
      scenario: "Make a website WCAG 2.1 compliant. I need a WCAG Auditor, a Virtual Screen Reader Tester, and a Frontend Remediation Specialist.",
      agentCount: 3
    },
    {
      title: "Blockchain DAO",
      desc: "Proposal Analyst, Voting Coordinator, Treasury Guard & Smart Contract Audit.",
      scenario: "Manage a DAO (Decentralized Autonomous Organization). I need a Proposal Analyst, a Voting Coordinator, a Treasury Guardian, and a Smart Contract Auditor.",
      agentCount: 4
    },
    {
      title: "QA Automation Suite",
      desc: "Test Scripter, Browser Simulator, API Tester, Report Analyzer.",
      scenario: "Build an end-to-end testing suite. I need a Selenium/Playwright Scripter, a Browser Simulator, an API Load Tester, and a Failure Report Analyzer.",
      agentCount: 4
    },
    {
      title: "K8s Cluster Ops",
      desc: "Helm Chart Dev, Pod Autoscaler, Ingress Mgr, Secret Guard.",
      scenario: "Manage Kubernetes clusters. I need a Helm Chart Developer, a Pod Autoscaling Logic Agent, an Ingress Configuration Manager, and a Secret Security Guardian.",
      agentCount: 4
    },
    {
      title: "DB Tuning Squad",
      desc: "Query Analyzer, Index Recommender, Schema Normalizer.",
      scenario: "Optimize a slow SQL database. I need a Slow Query Analyzer, an Indexing Strategy Recommender, and a Schema Normalization Expert.",
      agentCount: 3
    }
  ],
  'Finance': [
    {
      title: "Portfolio Rebalancing",
      desc: "Asset Allocator, Risk Manager, Tax Expert, Market Analyst & Trader.",
      scenario: "Rebalance a high-net-worth investment portfolio. Include an Asset Allocator, a Risk Manager, a Tax Efficiency Expert, a Market Analyst, and an Execution Trader.",
      agentCount: 5
    },
    {
      title: "Audit Defense Team",
      desc: "Transaction Scanner, Policy Matcher, Anomaly Detector & Report Gen.",
      scenario: "Prepare for a corporate financial audit. I need a Transaction Scanner, a Policy Compliance Matcher, an Anomaly Detector for irregularities, and a Report Generator.",
      agentCount: 4
    },
    {
      title: "Credit Risk Model",
      desc: "Data Scientist, Risk Analyst, Regulatory Officer & Validator.",
      scenario: "Develop a new credit risk scoring model. Include a Data Scientist, a Credit Risk Analyst, a Regulatory Compliance Officer, and a Model Validator.",
      agentCount: 4
    },
    {
      title: "Crypto Trading Bot",
      desc: "Sentiment Analyzer, Technical Analyst, Order Executor & Wallet Guard.",
      scenario: "Build an automated crypto trading system. I need a Sentiment Analyzer for news, a Technical Analyst for charts, an Order Executor, and a Wallet Security Guard.",
      agentCount: 4
    },
    {
      title: "Tax Haven Scout",
      desc: "Intl Tax Lawyer, Compliance Officer & Entity Structurer.",
      scenario: "Analyze international tax efficiencies (legally). I need an International Tax Lawyer, a Compliance Officer, and a Corporate Entity Structurer.",
      agentCount: 3
    },
    {
      title: "Forensic Accounting",
      desc: "Fraud Investigator, Transaction Tracer & Asset Recovery.",
      scenario: "Investigate corporate embezzlement. I need a Fraud Investigator, a Transaction Tracer, and an Asset Recovery Specialist.",
      agentCount: 3
    },
    {
      title: "PE Dealflow",
      desc: "Market Scouter, Financial Modeler, Cap Table Analyst & DD Lead.",
      scenario: "Manage Private Equity deal flow. I need a Market Opportunity Scouter, a Financial Modeler, a Cap Table Analyst, and a Due Diligence Lead.",
      agentCount: 4
    },
    {
      title: "Personal Wealth",
      desc: "Budget Coach, Investment Advisor, Estate Planner & Tax Pro.",
      scenario: "Manage family wealth. I need a Budgeting Coach, an Investment Advisor, an Estate Planner, and a Personal Tax Professional.",
      agentCount: 4
    },
    {
      title: "IPO Readiness",
      desc: "S-1 Drafter, SOX Compliance, Investor Relations, Roadshow Mgr.",
      scenario: "Prepare a startup for IPO. I need an S-1 Filing Drafter, a SOX Compliance Officer, an Investor Relations Agent, and a Roadshow Coordinator.",
      agentCount: 4
    },
    {
      title: "Expense Control",
      desc: "Receipt OCR, Policy Checker, Reimbursement Approver.",
      scenario: "Automate employee expense reports. I need a Receipt OCR Scanner, a Policy Compliance Checker, and a Reimbursement Approval Bot.",
      agentCount: 3
    }
  ],
  'Real Estate': [
    {
      title: "Commercial Dev",
      desc: "Feasibility Analyst, Zoning Expert, Cost Estimator, Architect & Legal.",
      scenario: "Assess feasibility for a new commercial complex. Include a Market Feasibility Analyst, a Zoning/Permit Expert, a Construction Cost Estimator, a Concept Architect, and a Legal Advisor.",
      agentCount: 5
    },
    {
      title: "Property Valuation",
      desc: "Market Analyst, Inspector AI, Comp Adjuster & Report Writer.",
      scenario: "Generate a detailed property valuation. I need a Local Market Analyst, a Virtual Property Inspector, a Comparable Sales Adjuster, and a Valuation Report Writer.",
      agentCount: 4
    },
    {
      title: "REIT Management",
      desc: "Portfolio Mgr, Tenant Relations, Maintenance Coord & Financial Analyst.",
      scenario: "Manage a Real Estate Investment Trust portfolio. I need a Portfolio Manager, a Tenant Relations Agent, a Maintenance Coordinator, and a Financial Analyst.",
      agentCount: 4
    },
    {
      title: "Smart Building OS",
      desc: "Energy Mgr, Security Integrator, HVAC Optimizer & UX Concierge.",
      scenario: "Optimize a smart office building. I need an Energy Efficiency Manager, a Security Systems Integrator, an HVAC Optimizer, and a Tenant Experience Concierge.",
      agentCount: 4
    },
    {
      title: "Tenant Screening",
      desc: "Credit Checker, Background Investigator, Reference Caller.",
      scenario: "Screen tenants for a luxury apartment complex. I need a Credit Checker, a Criminal Background Investigator, and a Reference Verification Agent.",
      agentCount: 3
    },
    {
      title: "Urban Renewal",
      desc: "City Planner, Community Liaison, Enviro Consultant & Grants Mgr.",
      scenario: "Plan an urban renewal project. I need a City Planner, a Community Liaison, an Environmental Consultant, and a Government Grants Manager.",
      agentCount: 4
    },
    {
      title: "House Flip Team",
      desc: "General Contractor, Interior Designer, Market Analyst & Real Estate Agent.",
      scenario: "Execute a house flip. I need a General Contractor for estimates, an Interior Designer for staging, a Market Analyst for pricing, and a Listing Agent.",
      agentCount: 4
    },
    {
      title: "HOA Manager",
      desc: "Bylaw Enforcer, Fee Collector, Community Comms.",
      scenario: "Manage a Home Owners Association. I need a Bylaw Enforcer, a Fee Collection Agent, and a Community Communications Officer.",
      agentCount: 3
    },
    {
      title: "Lease Abstraction",
      desc: "Doc Scanner, Term Extractor, Critical Date Notifier.",
      scenario: "Abstract commercial lease data. I need a Document Scanner, a Legal Term Extractor, and a Critical Date Notification Agent.",
      agentCount: 3
    }
  ],
  'HR': [
    {
      title: "Talent Acquisition",
      desc: "Sourcing Bot, Resume Screener, Interview Scheduler & Diversity Officer.",
      scenario: "Scale up engineering hiring. I need a Candidate Sourcing Bot, a Resume Screener, an Interview Scheduler, and a Diversity & Inclusion Officer.",
      agentCount: 4
    },
    {
      title: "Employee Onboarding",
      desc: "IT Provisioner, Training Mentor, HR Admin & Buddy.",
      scenario: "Automate new hire onboarding. I need an IT Provisioning Coordinator, a Training Mentor, an HR Administrator, and a Social Buddy.",
      agentCount: 4
    },
    {
      title: "Performance Review",
      desc: "Feedback Collector, 360 Analyzer, Goal Tracker & Coach.",
      scenario: "Manage the annual performance review cycle. I need a Feedback Collector, a 360-Degree Analyzer, a Goal Tracker, and a Career Coach.",
      agentCount: 4
    },
    {
      title: "Culture Audit",
      desc: "Survey Analyst, Org Psychologist, DEI Consultant.",
      scenario: "Assess company culture health. I need a Survey Data Analyst, an Organizational Psychologist, and a DEI Consultant.",
      agentCount: 3
    },
    {
      title: "Payroll Auditor",
      desc: "Payroll Analyst, Tax Specialist, Compliance Officer.",
      scenario: "Audit payroll for errors. I need a Payroll Data Analyst, a Tax Withholding Specialist, and a Labor Law Compliance Officer.",
      agentCount: 3
    },
    {
      title: "Remote Work Ops",
      desc: "IT Support, Remote Policy Writer, Async Comms Coach.",
      scenario: "Transition a team to remote work. I need a Remote IT Support Agent, a Policy Writer, and an Async Communications Coach.",
      agentCount: 3
    },
    {
      title: "Executive Search",
      desc: "Exec Researcher, Outreach Specialist, Negotiation Coach.",
      scenario: "Headhunt a new CEO. I need an Executive Researcher, a Discrete Outreach Specialist, and a Compensation Negotiation Coach.",
      agentCount: 3
    },
    {
      title: "Conflict Resolution",
      desc: "Mediator Bot, Policy Ref, Statement Taker.",
      scenario: "Resolve an HR dispute between employees. I need a Neutral Mediator Bot, a Company Policy Reference Agent, and a Statement Taker.",
      agentCount: 3
    },
    {
      title: "Benefits Admin",
      desc: "Enrollment Guide, Q&A Support, Vendor Liaison.",
      scenario: "Manage open enrollment for benefits. I need an Enrollment Guide, a 24/7 Q&A Support Bot, and an Insurance Vendor Liaison.",
      agentCount: 3
    },
    {
      title: "Exit Interviewer",
      desc: "Interviewer, Trend Analyzer, Retention Strategist.",
      scenario: "Analyze employee turnover. I need an Exit Interviewer, a Trend Analyzer for reasons, and a Retention Strategist.",
      agentCount: 3
    }
  ],
  'Legal': [
    {
      title: "Contract Negotiation",
      desc: "Clause Analyzer, Risk Highlighter, Counter-Offer Strategist & Compliance.",
      scenario: "Negotiate a complex B2B contract. I need a Clause Analyzer, a Risk Highlighter, a Counter-Offer Strategist, and a Regulatory Compliance Officer.",
      agentCount: 4
    },
    {
      title: "IP Protection",
      desc: "Trademark Scanner, Patent Searcher, Infringement Monitor & Filing Agent.",
      scenario: "Protect corporate Intellectual Property. I need a Trademark Scanner, a Patent Searcher, an Infringement Monitor, and a Filing Agent.",
      agentCount: 4
    },
    {
      title: "Litigation Support",
      desc: "Discovery Searcher, Evidence Logger, Case Law Researcher & Drafter.",
      scenario: "Support a litigation team. I need an E-Discovery Searcher, an Evidence Logger, a Case Law Researcher, and a Legal Document Drafter.",
      agentCount: 4
    },
    {
      title: "Divorce Settlement",
      desc: "Asset Valuator, Custody Planner, Mediation Bot.",
      scenario: "Facilitate a divorce settlement. I need an Asset Valuator, a Custody Arrangement Planner, and a Neutral Mediation Bot.",
      agentCount: 3
    },
    {
      title: "Visa Processing",
      desc: "Doc Verifier, Eligibility Checker, Application Filer.",
      scenario: "Process employee immigration visas. I need a Document Verifier, an Eligibility Criteria Checker, and an Application Filling Assistant.",
      agentCount: 3
    },
    {
      title: "GDPR Compliance",
      desc: "Data Mapper, Privacy Officer, Regulatory Auditor.",
      scenario: "Ensure GDPR compliance for a software product. I need a Data Flow Mapper, a Privacy Officer, and a Regulatory Auditor.",
      agentCount: 3
    },
    {
      title: "Estate Planning",
      desc: "Will Drafter, Trust Advisor, Beneficiary Coord.",
      scenario: "Create a comprehensive estate plan. I need a Will Drafter, a Trust Advisor, and a Beneficiary Coordinator.",
      agentCount: 3
    },
    {
      title: "Privacy Policy Gen",
      desc: "Jurisdiction Checker, Policy Drafter, TOS Generator.",
      scenario: "Generate legal docs for a SaaS app. I need a Jurisdiction Checker, a Privacy Policy Drafter, and a Terms of Service Generator.",
      agentCount: 3
    },
    {
      title: "Merger Filing",
      desc: "Antitrust Analyst, Filing Clerk, Disclosure Reviewer.",
      scenario: "Prepare FTC merger filings. I need an Antitrust Risk Analyst, a Filing Clerk, and a Disclosure Reviewer.",
      agentCount: 3
    },
    {
      title: "Real Estate Close",
      desc: "Title Searcher, Escrow Agent, Deed Drafter.",
      scenario: "Close a residential property deal. I need a Title Searcher, an Escrow Agent, and a Deed Drafter.",
      agentCount: 3
    }
  ],
  'Healthcare': [
    {
      title: "Hospital Admin",
      desc: "Bed Manager, Staff Scheduler, Patient Intake & Inventory.",
      scenario: "Optimize hospital operations. I need a Bed Management Coordinator, a Staff Scheduler, a Patient Intake Agent, and a Medical Inventory Manager.",
      agentCount: 4
    },
    {
      title: "Telehealth Triage",
      desc: "Symptom Checker, Urgency Ranker, Nurse & Doctor Router.",
      scenario: "Triage telehealth patients. I need a Symptom Checker, an Urgency Ranker, a Triage Nurse, and a Doctor Routing Agent.",
      agentCount: 4
    },
    {
      title: "Rare Disease Detective",
      desc: "Symptom Matcher, Geneticist, Med Lit Reviewer.",
      scenario: "Diagnose a rare condition. I need a Symptom Pattern Matcher, a Geneticist Agent, and a Medical Literature Reviewer.",
      agentCount: 3
    },
    {
      title: "Medical Billing",
      desc: "Coding Specialist, Insurance Negotiator, Policy Reviewer.",
      scenario: "Handle medical billing appeals. I need a CPT Coding Specialist, an Insurance Negotiator, and a Policy Reviewer.",
      agentCount: 3
    },
    {
      title: "Mental Health Bot",
      desc: "CBT Therapist, Crisis Monitor, Mindfulness Coach.",
      scenario: "Provide automated mental health support. I need a CBT Therapist Persona, a Crisis Safety Monitor, and a Mindfulness Coach.",
      agentCount: 3
    },
    {
      title: "Elderly Monitor",
      desc: "Vitals Tracker, Fall Detector, Social Companion.",
      scenario: "Remote monitoring for elderly care. I need a Vitals Tracker, a Fall Detection Alert Agent, and a Social Companion.",
      agentCount: 3
    },
    {
      title: "Pandemic Response",
      desc: "Epidemiologist, Logistics Coord, Public Comms.",
      scenario: "Manage a local outbreak response. I need an Epidemiologist, a Logistics Coordinator for supplies, and a Public Communications Officer.",
      agentCount: 3
    },
    {
      title: "Post-Op Recovery",
      desc: "Wound Care Guide, Pain Tracker, PT Coach.",
      scenario: "Guide a patient through surgery recovery. I need a Wound Care Guide, a Pain Level Tracker, and a Physical Therapy Coach.",
      agentCount: 3
    },
    {
      title: "Nutrition Planner",
      desc: "Dietician, Meal Prepper, Allergen Checker.",
      scenario: "Create a medical diet plan. I need a Registered Dietician Agent, a Meal Prep Scheduler, and an Allergen Checker.",
      agentCount: 3
    },
    {
      title: "Corp Wellness",
      desc: "Challenge Organizer, Health Educator, Stress Relief Coach.",
      scenario: "Run a corporate wellness program. I need a Challenge Organizer, a Health Educator, and a Stress Relief Coach.",
      agentCount: 3
    }
  ],
  'Supply Chain': [
    {
      title: "Warehouse Auto",
      desc: "Inventory Bot, Picker Optimizer, Restock Predictor & Safety Monitor.",
      scenario: "Automate warehouse operations. I need an Inventory Tracking Bot, a Picking Path Optimizer, a Restock Predictor, and a Safety Compliance Monitor.",
      agentCount: 4
    },
    {
      title: "Supplier Risk",
      desc: "Geopolitical Analyst, Financial Health Checker & Alternative Scout.",
      scenario: "Mitigate supply chain risks. I need a Geopolitical Risk Analyst, a Supplier Financial Health Checker, and an Alternative Supplier Scout.",
      agentCount: 3
    },
    {
      title: "Sustainable Source",
      desc: "Carbon Auditor, Fair Trade Inspector, Material Scientist.",
      scenario: "Ensure sustainable sourcing. I need a Carbon Footprint Auditor, a Fair Trade Inspector, and a Material Scientist.",
      agentCount: 3
    },
    {
      title: "Cold Chain Ops",
      desc: "Temp Monitor, Route Optimizer, Spoilage Analyst.",
      scenario: "Manage vaccine cold chain logistics. I need a Temperature Compliance Monitor, a Route Optimizer, and a Spoilage Risk Analyst.",
      agentCount: 3
    },
    {
      title: "Demand Planner",
      desc: "Sales Forecaster, Seasonality Analyst, Stock Balancer.",
      scenario: "Forecast inventory demand. I need a Sales Forecaster, a Seasonality Analyst, and a Stock Balancing Agent.",
      agentCount: 3
    },
    {
      title: "Port Logistics",
      desc: "Customs Broker, Drayage Coord, Container Tracker.",
      scenario: "Manage shipping container logistics. I need a Customs Broker, a Drayage Coordinator, and a Container Tracker.",
      agentCount: 3
    },
    {
      title: "Last Mile Delivery",
      desc: "Route Mapper, Driver Dispatch, Customer Notifier.",
      scenario: "Optimize last-mile package delivery. I need a Route Mapper, a Driver Dispatcher, and a Customer Notification Bot.",
      agentCount: 3
    },
    {
      title: "Vendor Negotiation",
      desc: "RFP Generator, Bid Comparator, Contract Drafter.",
      scenario: "Procure new manufacturing parts. I need an RFP Generator, a Bid Comparison Agent, and a Contract Drafter.",
      agentCount: 3
    }
  ],
  'Marketing': [
    {
      title: "Product Launch",
      desc: "Campaign Manager, Social Lead, PR Agent, Content Creator & Analyst.",
      scenario: "Launch a new consumer product. I need a Campaign Manager, a Social Media Lead, a PR Agent, a Content Creator, and a Performance Analyst.",
      agentCount: 5
    },
    {
      title: "SEO Empire",
      desc: "Keyword Strategist, Technical Auditor, Content Generator & Link Builder.",
      scenario: "Dominate search rankings. I need a Keyword Strategist, a Technical SEO Auditor, a Content Generator, and a Link Building Outreach Agent.",
      agentCount: 4
    },
    {
      title: "Viral TikTok",
      desc: "Trend Watcher, Script Writer, Video Editor, Hashtag Strategist.",
      scenario: "Create a viral TikTok campaign. I need a Trend Watcher, a Short-Form Script Writer, a Video Style Editor, and a Hashtag Strategist.",
      agentCount: 4
    },
    {
      title: "Crisis Rep Mgmt",
      desc: "Social Listener, PR Strategist, Response Drafter.",
      scenario: "Manage a brand reputation crisis. I need a Social Listener, a PR Strategist, and a Response Drafter.",
      agentCount: 3
    },
    {
      title: "ABM Campaign",
      desc: "Target Profiler, Content Personalizer, Outreach Bot.",
      scenario: "Execute Account Based Marketing. I need a Target Account Profiler, a Content Personalizer, and an Outreach Bot.",
      agentCount: 3
    },
    {
      title: "Podcast Growth",
      desc: "Audio Editor, Show Notes Writer, Social Snippet Gen.",
      scenario: "Grow a podcast audience. I need an Audio Editor, a Show Notes Writer, and a Social Media Snippet Generator.",
      agentCount: 3
    },
    {
      title: "Brand Rebrand",
      desc: "Creative Director, Market Researcher, Visual Designer.",
      scenario: "Execute a corporate rebranding. I need a Creative Director, a Market Researcher, and a Visual Designer.",
      agentCount: 3
    },
    {
      title: "Event Promotion",
      desc: "Email Marketer, Social Hype Bot, Ticket Sales Analyst.",
      scenario: "Promote a music festival. I need an Email Marketer, a Social Media Hype Bot, and a Ticket Sales Analyst.",
      agentCount: 3
    },
    {
      title: "User Persona Gen",
      desc: "Data Synthesizer, Interview Simulator, Profile Writer.",
      scenario: "Create detailed user personas from data. I need a Data Synthesizer, a User Interview Simulator, and a Profile Writer.",
      agentCount: 3
    },
    {
      title: "Competitor Intel",
      desc: "Feature Comparator, Pricing Spy, SWOT Generator.",
      scenario: "Build a competitor battlecard. I need a Feature Comparator, a Pricing Spy, and a SWOT Analysis Generator.",
      agentCount: 3
    }
  ],
  'Science': [
    {
      title: "Drug Discovery",
      desc: "Molecule Generator, Docker, Toxicologist, Chemist & Trial Sim.",
      scenario: "Accelerate drug discovery. I need a Molecule Generator, a Docking Simulator, a Toxicologist, a Medicinal Chemist, and a Clinical Trial Simulator.",
      agentCount: 5
    },
    {
      title: "Climate Modeling",
      desc: "Atmospheric Physicist, Oceanographer, Glaciologist & Data Viz.",
      scenario: "Simulate climate change scenarios. I need an Atmospheric Physicist, an Oceanographer, a Glaciologist, and a Data Visualization Expert.",
      agentCount: 4
    },
    {
      title: "Space Mission",
      desc: "Orbital Mechanic, Life Support Sys, Mission Director.",
      scenario: "Plan a Mars mission. I need an Orbital Mechanic, a Life Support Systems Engineer, and a Mission Director.",
      agentCount: 3
    },
    {
      title: "Material Lab",
      desc: "Polymer Chemist, Simulation Analyst, Stress Tester.",
      scenario: "Discover new battery materials. I need a Polymer Chemist, a Molecular Simulation Analyst, and a Stress Tester.",
      agentCount: 3
    },
    {
      title: "AgriTech Science",
      desc: "Soil Sensor Analyst, Crop Disease Doctor, Yield Predictor.",
      scenario: "Optimize precision agriculture. I need a Soil Sensor Analyst, a Crop Disease Diagnostician, and a Yield Predictor.",
      agentCount: 3
    },
    {
      title: "Genomic Seq",
      desc: "DNA Aligner, Variant Caller, Genetic Counselor.",
      scenario: "Analyze DNA sequences. I need a DNA Aligner, a Variant Caller, and a Genetic Counselor.",
      agentCount: 3
    },
    {
      title: "Lab Safety Audit",
      desc: "Chemical Inspector, Protocol Checker, Hazard Logger.",
      scenario: "Audit a chemistry lab for safety. I need a Chemical Storage Inspector, a Protocol Compliance Checker, and a Hazard Logger.",
      agentCount: 3
    },
    {
      title: "Grant Writer",
      desc: "Proposal Drafter, Budget Justifier, Compliance Reviewer.",
      scenario: "Write an NSF research grant. I need a Proposal Text Drafter, a Budget Justifier, and a Compliance Reviewer.",
      agentCount: 3
    },
    {
      title: "Science Comms",
      desc: "Paper Summarizer, Blog Writer, Tweet Generator.",
      scenario: "Translate complex papers for the public. I need a Technical Paper Summarizer, a Popular Science Blog Writer, and a Social Media Generator.",
      agentCount: 3
    }
  ],
  'Creative': [
    {
      title: "Film Studio",
      desc: "Screenwriter, Storyboard Artist, Casting Director & Producer.",
      scenario: "Develop a feature film concept. I need a Screenwriter, a Storyboard Artist, a Casting Director, and a Producer.",
      agentCount: 4
    },
    {
      title: "Game Design",
      desc: "Level Designer, Mechanic Balancer, Lore Writer & Sound Engineer.",
      scenario: "Design an indie RPG. I need a Level Designer, a Game Mechanic Balancer, a Lore Writer, and a Sound Engineer.",
      agentCount: 4
    },
    {
      title: "Novel Writers",
      desc: "Plot Architect, Character Profiler, Dialogue Polisher.",
      scenario: "Write a mystery novel. I need a Plot Architect, a Character Profiler, and a Dialogue Polisher.",
      agentCount: 3
    },
    {
      title: "Fashion Line",
      desc: "Trend Forecaster, Textile Designer, Pattern Maker.",
      scenario: "Design a new clothing collection. I need a Trend Forecaster, a Textile Designer, and a Pattern Maker.",
      agentCount: 3
    },
    {
      title: "Music Album",
      desc: "Composer, Lyricist, Sound Eng, Master Pro.",
      scenario: "Produce a pop album. I need a Melody Composer, a Lyricist, a Sound Engineer, and a Mastering Professional.",
      agentCount: 4
    },
    {
      title: "Comic Team",
      desc: "Script Writer, Penciler, Inker, Letterer.",
      scenario: "Create a comic book issue. I need a Script Writer, a Penciler, an Inker, and a Letterer.",
      agentCount: 4
    },
    {
      title: "Interior Design",
      desc: "Moodboard Gen, Furniture Shopper, Colorist.",
      scenario: "Redesign a modern living room. I need a Moodboard Generator, a Furniture Personal Shopper, and a Color Theory Expert.",
      agentCount: 3
    },
    {
      title: "Stand-up Comedy",
      desc: "Joke Drafter, Punchline Polisher, Heckle Simulator.",
      scenario: "Write a comedy set. I need a Joke Drafter, a Punchline Polisher, and a Heckler Simulator.",
      agentCount: 3
    },
    {
      title: "UX Copywriting",
      desc: "Microcopy Writer, Tone Checker, Error Msg Fixer.",
      scenario: "Refine app interface text. I need a Microcopy Writer, a Brand Tone Checker, and an Error Message Improver.",
      agentCount: 3
    },
    {
      title: "Brand Naming",
      desc: "Brainstormer, Domain Checker, Linguistic Analyst.",
      scenario: "Name a new startup. I need a Creative Brainstormer, a Domain Availability Checker, and a Linguistic Analyst (for bad meanings).",
      agentCount: 3
    }
  ],
  'Education': [
    {
      title: "University Ops",
      desc: "Admissions Officer, Course Scheduler, Student Advisor & Alumni Rel.",
      scenario: "Manage university department operations. I need an Admissions Officer, a Course Scheduler, a Student Advisor, and an Alumni Relations Agent.",
      agentCount: 4
    },
    {
      title: "Personalized Tutor",
      desc: "Curriculum Designer, Quiz Generator, Progress Tracker & Motivator.",
      scenario: "Create a personalized learning path. I need a Curriculum Designer, a Quiz Generator, a Progress Tracker, and a Motivational Coach.",
      agentCount: 4
    },
    {
      title: "IEP Generator",
      desc: "Child Psych, Speech Therapist, Learning Strategist.",
      scenario: "Create an Individualized Education Program. I need a Child Psychologist, a Speech Therapist, and a Learning Strategist.",
      agentCount: 3
    },
    {
      title: "Language Immersion",
      desc: "Convo Partner, Grammar Coach, Cultural Guide.",
      scenario: "Teach Japanese to a beginner. I need a Conversation Partner, a Grammar Coach, and a Cultural Guide.",
      agentCount: 3
    },
    {
      title: "Corporate L&D",
      desc: "Skill Assessor, Content Creator, Engagement Tracker.",
      scenario: "Design a corporate training module. I need a Skill Gap Assessor, a Content Creator, and an Engagement Tracker.",
      agentCount: 3
    },
    {
      title: "College App Coach",
      desc: "Essay Coach, Extracurricular Strategist, Interview Prep.",
      scenario: "Coach a student for Ivy League applications. I need an Essay Coach, an Extracurricular Strategist, and an Interview Prepper.",
      agentCount: 3
    },
    {
      title: "Debate Coach",
      desc: "Argument Builder, Rebuttal Gen, Fallacy Checker.",
      scenario: "Prepare for a competitive debate. I need an Argument Builder, a Rebuttal Generator, and a Logical Fallacy Checker.",
      agentCount: 3
    },
    {
      title: "Study Group",
      desc: "Quiz Master, Concept Explainer, Note Summarizer.",
      scenario: "Host an AI study session. I need a Quiz Master, a Concept Explainer (ELI5), and a Note Summarizer.",
      agentCount: 3
    },
    {
      title: "Syllabus Gen",
      desc: "Curriculum Mapper, Reading Lister, Project Designer.",
      scenario: "Create a University History Syllabus. I need a Curriculum Mapper, a Reading List Generator, and a Project Designer.",
      agentCount: 3
    }
  ]
};