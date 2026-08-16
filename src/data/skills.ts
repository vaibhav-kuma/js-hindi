import type { TechGroup, TechnologyNode } from "@/lib/types";

export const techGroups: TechGroup[] = [
  {
    id: "languages",
    label: "Languages",
    description: "Core programming languages used across projects.",
  },
  {
    id: "backend",
    label: "Backend Engineering",
    description: "APIs, services and server-side application frameworks.",
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interface layer for the platforms and dashboards.",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    description: "Detection, response, intelligence and hardening.",
  },
  {
    id: "ai",
    label: "AI & Agentic Systems",
    description: "Machine learning, LLMs, agents and AI-driven security.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Data",
    description: "Containers, orchestration, queues, datastores and pipelines.",
  },
];

/**
 * Technology constellation nodes.
 * `projects` references ProjectConfig slugs from data/projects.ts and drives
 * the "used in" exploration on the Skills section.
 */
export const techNodes: TechnologyNode[] = [
  // Languages
  { id: "cpp", label: "C++", group: "languages", projects: [] },
  {
    id: "python",
    label: "Python",
    group: "languages",
    projects: ["soc-platform", "vadt", "threat-detection-monitoring-dashboard"],
  },
  { id: "java", label: "Java", group: "languages", projects: [] },
  { id: "javascript", label: "JavaScript", group: "languages", projects: ["soc-platform"] },
  {
    id: "typescript",
    label: "TypeScript",
    group: "languages",
    projects: ["soc-platform", "legacy-lift-ai"],
  },

  // Backend
  { id: "fastapi", label: "FastAPI", group: "backend", projects: ["soc-platform"] },
  { id: "flask", label: "Flask", group: "backend", projects: ["vadt"] },
  { id: "nodejs", label: "Node.js", group: "backend", projects: ["legacy-lift-ai"] },
  { id: "nestjs", label: "NestJS", group: "backend", projects: ["legacy-lift-ai"] },
  { id: "restapi", label: "REST APIs", group: "backend", projects: ["soc-platform", "vadt"] },

  // Frontend
  { id: "react", label: "React", group: "frontend", projects: ["soc-platform", "vadt"] },
  { id: "vue", label: "Vue.js", group: "frontend", projects: ["dark-exposure"] },
  { id: "tailwind", label: "Tailwind CSS", group: "frontend", projects: ["soc-platform"] },

  // Cybersecurity
  {
    id: "threat-detection",
    label: "Threat Detection",
    group: "cybersecurity",
    projects: ["soc-platform", "vadt", "threat-detection-monitoring-dashboard"],
  },
  {
    id: "siem",
    label: "SIEM",
    group: "cybersecurity",
    projects: ["soc-platform", "threat-detection-monitoring-dashboard"],
  },
  { id: "edr", label: "EDR", group: "cybersecurity", projects: ["soc-platform"] },
  {
    id: "mitre-attack",
    label: "MITRE ATT&CK",
    group: "cybersecurity",
    projects: ["soc-platform", "vadt", "threat-detection-monitoring-dashboard"],
  },
  {
    id: "vuln-assessment",
    label: "Vulnerability Assessment",
    group: "cybersecurity",
    projects: ["soc-platform"],
  },
  {
    id: "security-automation",
    label: "Security Automation",
    group: "cybersecurity",
    projects: ["soc-platform", "threat-detection-monitoring-dashboard"],
  },
  {
    id: "threat-intel",
    label: "Threat Intelligence",
    group: "cybersecurity",
    projects: ["soc-platform", "dark-exposure"],
  },
  { id: "splunk", label: "Splunk", group: "cybersecurity", projects: ["vadt"] },
  {
    id: "yara",
    label: "YARA Rules",
    group: "cybersecurity",
    projects: ["threat-detection-monitoring-dashboard"],
  },
// AI
  {
    id: "ml",
    label: "Machine Learning",
    group: "ai",
    projects: ["threat-detection-monitoring-dashboard"],
  },
  {
    id: "llm",
    label: "LLM Integration",
    group: "ai",
    projects: ["soc-platform", "legacy-lift-ai"],
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    group: "ai",
    projects: ["soc-platform", "legacy-lift-ai"],
  },
  { id: "rag", label: "RAG", group: "ai", projects: [] },
  {
    id: "ai-security",
    label: "AI Security",
    group: "ai",
    projects: ["soc-platform", "legacy-lift-ai"],
  },

  // Infrastructure & Data
  {
    id: "docker",
    label: "Docker",
    group: "infrastructure",
    projects: ["soc-platform", "legacy-lift-ai", "vadt", "threat-detection-monitoring-dashboard"],
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    group: "infrastructure",
    projects: ["soc-platform", "legacy-lift-ai"],
  },
  {
    id: "kafka",
    label: "Kafka",
    group: "infrastructure",
    projects: ["soc-platform", "threat-detection-monitoring-dashboard"],
  },
  {
    id: "redis",
    label: "Redis",
    group: "infrastructure",
    projects: ["soc-platform", "legacy-lift-ai"],
  },
  {
    id: "elasticsearch",
    label: "Elasticsearch",
    group: "infrastructure",
    projects: ["soc-platform", "threat-detection-monitoring-dashboard"],
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    group: "infrastructure",
    projects: ["soc-platform", "legacy-lift-ai"],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    group: "infrastructure",
    projects: ["vadt", "threat-detection-monitoring-dashboard"],
  },
  {
    id: "prometheus",
    label: "Prometheus",
    group: "infrastructure",
    projects: ["threat-detection-monitoring-dashboard"],
  },
  {
    id: "grafana",
    label: "Grafana",
    group: "infrastructure",
    projects: ["threat-detection-monitoring-dashboard"],
  },
  {
    id: "influxdb",
    label: "InfluxDB",
    group: "infrastructure",
    projects: ["threat-detection-monitoring-dashboard"],
  },
];

/** Hand-curated relations — they drive connected-node highlighting on the constellation. */
export const techLinks: Array<{ source: string; target: string }> = [
  // language → framework
  { source: "python", target: "fastapi" },
  { source: "python", target: "flask" },
  { source: "typescript", target: "nestjs" },
  { source: "typescript", target: "nodejs" },
  { source: "typescript", target: "react" },
  { source: "typescript", target: "vue" },
  // AI edges
  { source: "llm", target: "ai-agents" },
  { source: "llm", target: "ai-security" },
  { source: "ai-agents", target: "ai-security" },
  { source: "ml", target: "ai-security" },
  { source: "ai-security", target: "threat-detection" },
  // security edges
  { source: "threat-detection", target: "siem" },
  { source: "siem", target: "edr" },
  { source: "threat-detection", target: "mitre-attack" },
  { source: "mitre-attack", target: "vuln-assessment" },
  { source: "mitre-attack", target: "yara" },
  { source: "splunk", target: "siem" },
  { source: "threat-intel", target: "threat-detection" },
  // infra edges
  { source: "docker", target: "kubernetes" },
  { source: "docker", target: "kafka" },
  { source: "kafka", target: "elasticsearch" },
  { source: "kafka", target: "redis" },
  { source: "postgresql", target: "redis" },
  // observability
  { source: "prometheus", target: "grafana" },
  { source: "grafana", target: "influxdb" },
  { source: "grafana", target: "elasticsearch" },
  { source: "grafana", target: "kafka" },
  { source: "mongodb", target: "elasticsearch" },
];

export const groupById = Object.fromEntries(
  techGroups.map((group) => [group.id, group]),
) as Record<TechnologyNode["group"], TechGroup>;

export const nodeById = Object.fromEntries(
  techNodes.map((node) => [node.id, node]),
) as Record<string, TechnologyNode>;
