/**
 * "How I Build Systems" — a representative distributed-system architecture
 * flow used across the portfolio projects (homepage ArchitectureSection).
 */

export interface SystemStage {
  id: string;
  label: string;
  description: string;
  tokens: string[];
}

export interface SystemArchitecture {
  summary: string;
  stages: SystemStage[];
  principles: string[];
}

/**
 * "How I Build Systems" — a representative distributed-system architecture
 * flow used across the portfolio projects (homepage ArchitectureSection).
 */
export const systemArchitecture: SystemArchitecture = {
  summary:
    "The same spine runs through every project here: a request enters through a controlled edge, services and engines do the thinking, queues decouple the heavy work, durable stores keep state, and observability closes the loop.",
  stages: [
    {
      id: "clients",
      label: "Clients & Users",
      description: "Users, agents, sensors and external systems making requests.",
      tokens: ["Web", "Mobile", "Bots", "Agents"],
    },
    {
      id: "frontend",
      label: "Frontend Interfaces",
      description: "React dashboards and command surfaces that drive the experience.",
      tokens: ["React", "TypeScript", "Dashboards"],
    },
    {
      id: "gateway",
      label: "API Gateway",
      description: "Authentication, authorization, routing and rate limiting.",
      tokens: ["Traefik", "JWT", "RBAC", "Ingress"],
    },
    {
      id: "backend",
      label: "Backend Services",
      description: "Service APIs and business logic — Python and TypeScript ecosystems.",
      tokens: ["FastAPI", "NestJS", "Flask", "REST"],
    },
    {
      id: "ai",
      label: "AI & Detection Engines",
      description: "LLM agents, ML models and detectors that add intelligence.",
      tokens: ["LLMs", "AI Agents", "ML", "MITRE ATT&CK"],
    },
    {
      id: "queue",
      label: "Message Queues",
      description: "Event streaming and async decoupling for scale and reliability.",
      tokens: ["Kafka", "Events", "Async"],
    },
    {
      id: "data",
      label: "Databases & Search",
      description: "Operational state, search and analytical stores.",
      tokens: ["PostgreSQL", "Elasticsearch", "MongoDB", "Redis"],
    },
    {
      id: "observability",
      label: "Monitoring & Alerting",
      description: "Metrics, logs and alerts — the feedback loop for operations.",
      tokens: ["Prometheus", "Grafana", "Splunk", "Alerting"],
    },
  ],
  principles: [
    "Events over tight calls — queues decouple detection from response.",
    "Search wherever analysis happens; the operational store stays authoritative.",
    "Encrypt before you persist; mask PII at the boundary.",
    "Observability is a first-class stage, not an afterthought.",
  ],
};