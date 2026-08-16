import type { TimelineEntry } from "@/lib/types";

/**
 * Engineering trajectory — every entry is verifiable from the GitHub profile
 * (repository creation/push dates). No employment, certifications or academic
 * credentials are claimed because no reliable source material exists for them.
 */
export const timeline: TimelineEntry[] = [
  {
    date: "Jun 2024",
    title: "Engineering journey begins on GitHub",
    description:
      "Created the account and shipped the first repositories — a Java sorting visualizer and the js-hindi JavaScript learning series.",
    repoName: "Sorting-visualizer",
    repoUrl: "https://github.com/vaibhav-kuma/Sorting-visualizer",
    tags: ["Java", "Algorithms", "JavaScript"],
  },
  {
    date: "Aug 2024",
    title: "First security experiments",
    description:
      "Security_matrix — an early Python security research project that set the direction for the security tooling that followed.",
    repoName: "Security_matrix",
    repoUrl: "https://github.com/vaibhav-kuma/Security_matrix",
    tags: ["Python", "Security"],
  },
  {
    date: "Jan 2025",
    title: "Full-stack backend systems",
    description:
      "Built chat applications and a job-board backend with Node.js and TypeScript — the first production-style full-stack systems.",
    repoName: "chat_Application",
    repoUrl: "https://github.com/vaibhav-kuma/chat_Application",
    tags: ["Node.js", "TypeScript", "Backend"],
  },
  {
    date: "Mar 2025",
    title: "AI meets security and data",
    description:
      "Shipped -AI-driven-security-monitoring, a document-ingestion RAG pipeline, and a cryptocurrency-prediction ML notebook.",
    repoName: "-AI-driven-security-monitoring",
    repoUrl: "https://github.com/vaibhav-kuma/-AI-driven-security-monitoring",
    tags: ["Python", "RAG", "ML", "Security"],
  },
  {
    date: "May–Jul 2025",
    title: "Security tooling suite",
    description:
      "A focused series of defensive tooling: YARA antivirus scanner, security-log analyser, vulnerability analyser, password checker and web scanner.",
    repoName: "Antivirus_scanner",
    repoUrl: "https://github.com/vaibhav-kuma/Antivirus_scanner",
    tags: ["YARA", "Python", "Blue Team"],
  },
  {
    date: "Jun–Aug 2025",
    title: "Threat detection engineering",
    description:
      "VADT set up a real-time threat-detection dashboard (Flask + React + MongoDB, MITRE ATT&CK tagging, Splunk alerts) and a lightweight containerized SIEM.",
    repoName: "VADT",
    repoUrl: "https://github.com/vaibhav-kuma/VADT",
    tags: ["Flask", "React", "MongoDB", "MITRE ATT&CK"],
  },
  {
    date: "Nov 2025",
    title: "Observability & intelligence wave",
    description:
      "Shipped the Threat-Detection-Monitoring-Dashboard (Grafana + Prometheus + Kafka + Elasticsearch + ML tracking), ShadowWatch AI dark-web agent, and Payload-Generator.",
    repoName: "Threat-Detection-Monitoring-Dashboard",
    repoUrl: "https://github.com/vaibhav-kuma/Threat-Detection-Monitoring-Dashboard",
    tags: ["Grafana", "Prometheus", "Kafka", "ML"],
  },
  {
    date: "Feb 2026",
    title: "Platform-scale & agentic AI",
    description:
      "DarkExposure threat-intelligence platform (Laravel + Vue) and AgentHub — an AI-agent ecosystem in TypeScript.",
    repoName: "DarkExposure",
    repoUrl: "https://github.com/vaibhav-kuma/DarkExposure",
    tags: ["Laravel", "Vue.js", "Threat Intelligence"],
  },
  {
    date: "Jun 2026",
    title: "Backend engineering deep-dive",
    description:
      "Backend-Engineering — an in-depth Java-based backend curriculum repo — plus the first cyber-portfolio iteration.",
    repoName: "Backend-Engineering",
    repoUrl: "https://github.com/vaibhav-kuma/Backend-Engineering",
    tags: ["Java", "Backend", "Systems Design"],
  },
  {
    date: "Jul 2026",
    title: "Flagship builds ship",
    description:
      "SOC_plateform (AI-driven unified security operations platform — 15 microservices) and legacy-lift-ai (AI-agent SaaS for legacy modernization).",
    repoName: "SOC_plateform",
    repoUrl: "https://github.com/vaibhav-kuma/SOC_plateform",
    tags: ["FastAPI", "Kafka", "React", "AI"],
  },
  {
    date: "Ongoing",
    title: "Building & shipping",
    description:
      "Actively iterating across security, AI and backend projects — with VADT and new ventures being pushed continuously.",
    repoName: "VADT",
    repoUrl: "https://github.com/vaibhav-kuma/VADT",
    tags: ["Ongoing"],
  },
];