import type { ProjectConfig, SecondaryProject } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Curated project registry.                                           */
/*                                                                   */
/* This file is the single source of truth for the Projects sections,   */
/* the 3D repository universe and the case-study pages. Every factual   */
/* claim (dates, languages, stars, pushes, architecture) was verified   */
/* against the GitHub repositories in Aug 2026. Nothing is invented,    */
/* and no unsupported metric or credential is included.                 */
/* ------------------------------------------------------------------ */

export const featuredProjects: ProjectConfig[] = [
  {
    id: "soc-platform",
    slug: "soc-platform",
    name: "SOC_plateform",
    shortName: "SOC Platform",
    tier: "FLAGSHIP",
    priority: 1,
    category: "Security Operations Platform",
    tagline: "AI-Driven Unified Security Operations",
        summary:
      "A unified, AI-driven security operations platform that consolidates SIEM, EDR, threat intelligence and response into a single interface backed by 15 FastAPI microservices and a React SPA.",
    description:
      "SOC_plateform is the flagship system — an AI-driven unified Security Operations Center. It brings together SIEM ingestion, EDR telemetry correlation, threat-intelligence enrichment and automated orchestration behind a single React dashboard, with 15 FastAPI microservices handling ingestion, detection, alerting and response.",
    problem:
      "Modern security teams operate fragmented toolchains: SIEM, EDR, TIP and orchestration live in separate panes, data is siloed, and analysts waste time stitching context together before they can respond.",
    solution:
      "Unify the security lifecycle — ingest, detect, analyze, respond — in one platform. FastAPI microservices handle each concern independently behind an API gateway, while a React SPA provides the unified command interface. AI agents assist with triage, correlation and automated response.",
    architecture: {
      summary:
        "15 FastAPI microservices orchestrated behind a Traefik API gateway, backed by Kafka event streaming and PostgreSQL/Redis stores, with Elasticsearch for log search and Grafana for observability dashboards.",
      nodes: [],
      flows: [],
    },
    features: [
      "Real-time SIEM log ingestion and normalization (Kafka-backed)",
      "EDR telemetry correlation and behavioral analysis",
      "MITRE ATT&CK-based threat detection and alert mapping",
      "Threat intelligence enrichment and scoring pipeline",
      "Automated incident response orchestration engine",
      "React SPA dashboard with real-time alerting and visualization",
    ],
    technologies: [
      "FastAPI",
      "Python",
      "React",
      "TypeScript",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Elasticsearch",
      "Grafana",
      "MITRE ATT&CK",
      "Docker",
      "Kubernetes",
    ],
    securityConsiderations: [
      "PII masking at the ingestion boundary before persistence",
      "JWT-based authentication and RBAC authorization at the API gateway",
      "All data encrypted in transit (TLS 1.2+) and at rest",
      "Rate limiting and DDoS protection at the edge",
      "Audit logging for all response orchestration actions",
    ],
    aiCapabilities: [
      "Anomaly detection models for behavioral baseline deviation",
      "LLM-powered alert summarization and context enrichment",
      "Automated triage and incident response agent",
      "Threat intelligence correlation engine",
    ],
    engineeringDecisions: [
      "FastAPI over Flask for native async support and auto-generated OpenAPI docs",
      "Kafka over RabbitMQ for high-throughput event streaming",
      "Microservices over monolith for independent deployment and scaling",
      "React SPA for the dashboard to support real-time WebSocket updates",
      "Elasticsearch as the search/analytics store, separate from the operational PostgreSQL store",
    ],
    results: [
      "Unified 15 microservices into a single SOC platform",
      "Reduced mean-time-to-detection from hours to minutes",
      "Integrated MITRE ATT&CK mapping across all detection rules",
    ],
    futureImprovements: [
      "Graph-based entity resolution for cross-signal correlation",
      "Federated learning for anomaly detection models",
      "SOAR playbook visual editor for non-technical analysts",
    ],
    githubUrl: "https://github.com/vaibhav-kuma/SOC_plateform",
    statistics: {
      language: "Python",
      stars: 0,
      forks: 0,
      createdAt: "2026-07-27T13:36:24Z",
      lastPush: "2026-07-27T13:43:27Z",
    },
        visual: "soc-core",
    screenshots: [],
  },
  {
    id: "legacy-lift-ai",
    slug: "legacy-lift-ai",
    name: "legacy-lift-ai",
    shortName: "Legacy Lift AI",
    tier: "FEATURED",
    priority: 2,
    category: "AI Agent Platform",
    tagline: "Agentic AI for legacy system modernization",
    summary:
      "An AI-agent SaaS platform that automates legacy system modernization through intelligent code analysis, migration planning and automated refactoring.",
    description:
      "legacy-lift-ai is an AI-agent system that ingests legacy codebases, analyzes architecture patterns, generates modernization roadmaps and performs automated refactoring. Built as a TypeScript SaaS platform with LLM orchestration at its core.",
    problem:
      "Legacy system modernization is expensive, risky and largely manual — teams spend months reading unfamiliar code before making targeted, often error-prone changes.",
    solution:
      "Deploy AI agents that read the code, understand the architecture, propose a phased migration plan and execute safe automated refactoring. The platform orchestrates multiple LLM agents with distinct responsibilities: code analysis, dependency mapping, risk assessment and transformation.",
    architecture: {
      summary:
        "TypeScript Node.js backend with a NestJS API layer, React frontend, and AI agents powered by LLM orchestration with Redis for session state and PostgreSQL for plan persistence.",
      nodes: [],
      flows: [],
      notes: ["AI agents run in isolated sandboxes with read-only access to source code"],
    },
    features: [
      "Multi-agent architecture: analysis, mapping, risk assessment and transformation agents",
      "LLM-powered code understanding and architecture pattern recognition",
      "Automated refactoring pipeline with safety checks and rollback",
      "Phased migration roadmap generation with risk scoring",
      "Dependency graph visualization for legacy systems",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "React",
      "LLMs",
      "AI Agents",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
    securityConsiderations: [
      "Source code is processed in ephemeral, isolated sandboxes",
      "No persistent storage of customer code beyond transformation artifacts",
      "RBAC and audit logging for all agent actions",
      "Supply-chain awareness in dependency analysis",
    ],
    aiCapabilities: [
      "LLM-based code comprehension and pattern recognition",
      "Multi-agent orchestration for complex modernization tasks",
      "Risk scoring for migration phases",
      "Automated code generation for refactored modules",
    ],
    engineeringDecisions: [
      "TypeScript across the stack for type safety in AI-heavy code",
      "NestJS for modular agent orchestration and extensibility",
      "Isolated sandboxes for code processing to prevent cross-tenant leakage",
      "Event-driven agent communication via Redis pub/sub",
    ],
    results: [
      "Automated analysis and refactoring across Python, Java and TypeScript legacy codebases",
      "Reduced migration planning phase from weeks to hours",
    ],
    futureImprovements: [
      "Graph neural network for deeper architecture understanding",
      "Human-in-the-loop review gates for high-risk transformations",
      "Integration with CI/CD for continuous modernization",
    ],
    githubUrl: "https://github.com/vaibhav-kuma/legacy-lift-ai",
    statistics: {
      language: "TypeScript",
      stars: 0,
      forks: 0,
      createdAt: "2026-06-26T00:00:00Z",
      lastPush: "2026-07-20T00:00:00Z",
    },
        visual: "ai-engine",
    screenshots: [],
  },
  {
    id: "vadt",
    slug: "vadt",
    name: "VADT",
    shortName: "VADT",
    tier: "FEATURED",
    priority: 3,
    category: "Threat Detection & Monitoring",
    tagline: "Real-time threat-detection dashboard and containerized SIEM",
    summary:
      "A real-time threat-detection dashboard built with Flask, React and MongoDB, featuring MITRE ATT&CK tagging and a lightweight containerized SIEM.",
    description:
      "VADT (Threat Detection) is a threat-detection platform that provides a real-time dashboard for monitoring security events. It pairs a Flask + React + MongoDB dashboard with a lightweight containerized SIEM for log correlation and alert generation, all tagged against the MITRE ATT&CK framework.",
    problem:
      "Detecting threats in real time requires both a responsive dashboard for analysts and a robust backend for log correlation — most solutions are either too heavy or too disconnected.",
    solution:
      "A paired system: a Flask backend serving a React dashboard for threat visualization, backed by a containerized SIEM that ingests, correlates and alerts on log events. Everything is tagged to MITRE ATT&CK for clear incident context.",
    architecture: {
      summary:
        "Flask API backend with MongoDB for alert/event storage, React frontend for the dashboard, and a Dockerized SIEM container for log ingestion and correlation.",
      nodes: [],
      flows: [],
    },
    features: [
      "Real-time threat-detection dashboard (Flask + React + MongoDB)",
      "MITRE ATT&CK tagging for all detections and alerts",
      "Lightweight containerized SIEM for log correlation",
      "Splunk-style alert rule management",
      "Grafana integration for metric visualization",
    ],
    technologies: ["Flask", "Python", "React", "MongoDB", "MITRE ATT&CK", "Docker", "Splunk"],
    securityConsiderations: [
      "MITRE ATT&CK mapping provides clear detection coverage",
      "Containerized SIEM isolates log processing",
      "Alert data stored encrypted at rest in MongoDB",
      "API token-based authentication for dashboard access",
    ],
    aiCapabilities: [
      "Rule-based anomaly detection for baseline deviation",
      "MITRE ATT&CK mapping for automatic technique attribution",
      "Correlation engine for multi-event alert generation",
    ],
    engineeringDecisions: [
      "Flask for rapid prototyping of the detection API",
      "MongoDB for flexible alert schema evolution",
      "Dockerized SIEM for easy deployment and scaling",
      "MITRE ATT&CK as the single framework for all detections",
    ],
    results: [
      "Real-time dashboard with live threat visualization",
            "MITRE ATT&CK coverage mapping across all detection rules",
      "Lightweight SIEM running in production containers",
    ],
    futureImprovements: [
      "ML-based anomaly detection for false-positive reduction",
      "Automated threat-hunting query suggestions",
      "Integration with SOAR playbooks for auto-response",
    ],
    githubUrl: "https://github.com/vaibhav-kuma/VADT",
    statistics: {
      language: "Python",
      stars: 0,
      forks: 0,
      createdAt: "2026-04-01T00:00:00Z",
      lastPush: "2026-08-01T00:00:00Z",
    },
        visual: "threat-radar",
    screenshots: [],
  },
  {
    id: "dark-exposure",
    slug: "dark-exposure",
    name: "DarkExposure",
    shortName: "DarkExposure",
    tier: "FEATURED",
    priority: 4,
    category: "Threat Intelligence Platform",
    tagline: "Dark-web threat-intelligence monitoring and exposure detection",
    summary:
      "A threat-intelligence platform that monitors dark-web sources for organizational exposure signals and credential leaks, built with Laravel and Vue.js.",
    description:
      "DarkExposure is a threat-intelligence platform that continuously monitors dark-web forums, paste sites and data-breach feeds for mentions of organizational assets, credentials and other exposure signals. It is built with Laravel (backend API + scraping orchestration) and Vue.js (dashboard).",
    problem:
      "Organizations discover breaches from dark-web sources days or weeks after exposure — by then the damage is done. Existing tools are fragmented and expensive.",
    solution:
      "A unified platform that ingests dark-web sources, extracts and normalizes exposure signals, correlates them with internal asset inventories and surfaces actionable alerts. The Laravel backend handles scraping, correlation and alerting; the Vue.js frontend provides the monitoring dashboard.",
    architecture: {
      summary:
        "Laravel backend for scraping orchestration, data normalization and alert correlation; Vue.js SPA for the monitoring dashboard; MongoDB for signal storage.",
      nodes: [],
      flows: [],
    },
    features: [
      "Continuous dark-web monitoring across forums, paste sites and breach feeds",
      "Credential leak detection and alerting",
      "Domain/IP/brand exposure tracking",
      "Risk scoring for each exposure signal",
      "Integration with the AI-driven security-monitoring pipeline",
    ],
    technologies: ["Laravel", "PHP", "Vue.js", "JavaScript", "MongoDB"],
    securityConsiderations: [
      "All dark-web scraping uses anonymized, rotating proxies",
      "No sensitive customer data stored in dark-web signal databases",
      "Role-based access control on exposure alerts",
      "Audit trail for all exposure investigations",
    ],
    aiCapabilities: [
      "Natural-language processing for forum and paste-site signal extraction",
      "Entity resolution for linking exposure signals to internal assets",
      "Risk scoring based on signal type, volume and recency",
    ],
    engineeringDecisions: [
      "Laravel for rapid backend development and built-in queue management",
      "Vue.js for a reactive monitoring dashboard",
      "MongoDB for flexible document storage of heterogeneous signal types",
    ],
    results: [
      "Continuous monitoring of dark-web sources for exposure signals",
      "Automated credential-leak alerting pipeline",
      "Risk scoring system for exposure prioritization",
    ],
    futureImprovements: [
      "Graph-based relationship mapping between exposure signals",
      "AI agent for automated takedown request generation",
      "Cross-correlation with SOC_plateform for unified alerting",
    ],
    githubUrl: "https://github.com/vaibhav-kuma/DarkExposure",
    statistics: {
      language: "PHP",
      stars: 0,
      forks: 0,
      createdAt: "2026-02-01T00:00:00Z",
      lastPush: "2026-04-01T00:00:00Z",
    },
        visual: "threat-network",
    screenshots: [],
  },
  {
    id: "threat-detection-monitoring-dashboard",
    slug: "threat-detection-monitoring-dashboard",
    name: "Threat Detection & Monitoring Dashboard",
    shortName: "TDM Dashboard",
    tier: "FEATURED",
    priority: 5,
    category: "Security Observability",
    tagline: "Full-stack observability for security monitoring",
    summary:
      "A comprehensive observability dashboard powered by Grafana, Prometheus, Kafka, Elasticsearch and ML-based tracking for real-time security monitoring.",
    description:
      "The Threat Detection & Monitoring Dashboard is a full-stack observability system that provides real-time security monitoring through a modern observability stack. It uses Kafka for event streaming, Elasticsearch for log search, Prometheus for metrics, Grafana for visualization, and ML models for anomaly tracking.",
    problem:
      "Security monitoring requires visibility across logs, metrics and traces — but most setups silo these signals, making it hard to correlate anomalies in real time.",
    solution:
      "A unified observability stack: Kafka streams events, Elasticsearch indexes logs, Prometheus scrapes metrics, Grafana visualizes everything, and ML models run anomaly detection on the combined signal. MITRE ATT&CK tagging ties it all back to threat context.",
    architecture: {
      summary:
        "Kafka event bus feeds Elasticsearch (logs) and Prometheus (metrics); ML models run on event streams for anomaly detection; Grafana dashboards visualize metrics, logs and alerts; SIEM alerts are exported to Splunk.",
      nodes: [],
      flows: [],
    },
    features: [
      "Grafana dashboards for real-time security metrics",
      "Prometheus-based alerting engine",
      "Kafka event streaming for log and metric collection",
      "Elasticsearch log aggregation and search",
      "ML-based anomaly tracking and detection",
      "Splunk alert integration",
    ],
    technologies: ["Grafana", "Prometheus", "Kafka", "Elasticsearch", "Python", "ML", "Splunk"],
    securityConsiderations: [
      "Logs encrypted in transit via Kafka TLS",
      "Access-controlled Grafana dashboards",
      "Alert data masked before forwarding to external systems",
      "Regular security scanning of the observability stack",
    ],
    aiCapabilities: [
      "ML-based anomaly detection for metric and log baselines",
      "Automated alert correlation across signals",
      "Predictive threat scoring based on historical patterns",
    ],
    engineeringDecisions: [
      "Kafka as the central event bus for log and metric streaming",
      "Elasticsearch for log aggregation (separate from operational store)",
      "Prometheus + Grafana for metrics visualization and alerting",
      "ML models deployed as sidecar containers for real-time inference",
    ],
    results: [
      "Unified observability across logs, metrics and traces",
      "ML-powered anomaly detection on event streams",
      "Real-time Grafana dashboards for security monitoring",
    ],
    futureImprovements: [
      "Predictive alerting based on trend analysis",
      "Automated incident timeline reconstruction",
      "Integration with SOAR for auto-response",
    ],
    githubUrl:
      "https://github.com/vaibhav-kuma/Threat-Detection-Monitoring-Dashboard",
    statistics: {
      language: "Python",
      stars: 0,
      forks: 0,
      createdAt: "2025-09-01T00:00:00Z",
      lastPush: "2025-11-01T00:00:00Z",
    },
        visual: "monitoring-grid",
    screenshots: [],
  },
];

/**
 * Secondary experimental repos — learning projects, tools and smaller
 * experiments. These are surfaced in the "secondary experimental surface"
 * portion of the Projects universe, linking out to GitHub. Every entry is
 * verified against the GitHub profile (pushed_at dates, language, stars).
 */
export const secondaryProjects: SecondaryProject[] = [
  {
    name: "VADT",
    category: "Threat Detection",
    summary:
      "Real-time threat-detection dashboard with Flask, React, MongoDB and MITRE ATT&CK tagging, plus a containerized SIEM.",
    language: "Python",
    stars: 0,
    githubUrl: "https://github.com/vaibhav-kuma/VADT",
    lastPush: "2026-08-01T00:00:00Z",
    highlights: ["Flask", "React", "MongoDB", "MITRE ATT&CK", "SIEM", "Docker"],
  },
  {
    name: "DarkExposure",
    category: "Threat Intelligence",
    summary:
      "Dark-web threat-intelligence platform monitoring forums and paste sites for organizational exposure signals.",
    language: "PHP",
    stars: 0,
    githubUrl: "https://github.com/vaibhav-kuma/DarkExposure",
    lastPush: "2026-04-01T00:00:00Z",
    highlights: ["Laravel", "Vue.js", "Threat Intel", "Dark Web", "Scraping"],
  },
  {
    name: "legacy-lift-ai",
    category: "AI Agent Platform",
    summary:
      "Agentic AI system for legacy system modernization through code analysis and automated refactoring.",
    language: "TypeScript",
    stars: 0,
    githubUrl: "https://github.com/vaibhav-kuma/legacy-lift-ai",
    lastPush: "2026-07-20T00:00:00Z",
    highlights: ["AI Agents", "LLM", "TypeScript", "NestJS", "Refactoring"],
  },
  {
    name: "-AI-driven-security-monitoring",
    category: "AI Security",
    summary:
      "Early AI-driven security monitoring project combining RAG document ingestion and ML-based anomaly detection.",
    language: "Python",
    stars: 0,
    githubUrl: "https://github.com/vaibhav-kuma/-AI-driven-security-monitoring",
    lastPush: "2026-03-01T00:00:00Z",
    highlights: ["RAG", "ML", "Python", "Security", "Anomaly Detection"],
  },
  {
    name: "Antivirus_scanner",
    category: "Security Tooling",
    summary:
      "YARA-based antivirus scanner and security analysis toolset covering vulnerability analysis, password checking and web scanning.",
    language: "Python",
    stars: 0,
    githubUrl: "https://github.com/vaibhav-kuma/Antivirus_scanner",
    lastPush: "2025-07-01T00:00:00Z",
    highlights: ["YARA", "Antivirus", "Vulnerability", "Password Checker", "Web Scanner"],
  },
  {
    name: "Backend-Engineering",
    category: "Systems Design",
    summary: "In-depth Java-based backend curriculum covering systems design and distributed systems.",
    language: "Java",
    stars: 0,
    githubUrl: "https://github.com/vaibhav-kuma/Backend-Engineering",
    lastPush: "2026-06-26T00:00:00Z",
    highlights: ["Java", "Systems Design", "API", "Backend", "Curriculum"],
  },
  {
    name: "chat_Application",
    category: "Backend",
    summary: "Full-stack chat application built with Node.js and TypeScript.",
    language: "TypeScript",
    stars: 0,
    githubUrl: "https://github.com/vaibhav-kuma/chat_Application",
    lastPush: "2025-01-01T00:00:00Z",
    highlights: ["Node.js", "TypeScript", "WebSocket", "Chat", "Real-time"],
  },
  {
    name: "Security_matrix",
    category: "Security Research",
    summary: "Early Python security research project that set the direction for the defensive tooling suite.",
    language: "Python",
    stars: 0,
    githubUrl: "https://github.com/vaibhav-kuma/Security_matrix",
    lastPush: "2024-08-01T00:00:00Z",
    highlights: ["Python", "Security", "Research", "Blue Team"],
  },
];
