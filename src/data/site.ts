import type { NavigationItem } from "@/lib/types";

/**
 * Global site configuration.
 */
export const siteConfig = {
  name: "Vaibhav Kumar",
  brand: "VAIBHAV",
  role: "Backend Developer • Cybersecurity Engineer • AI Builder",
  positioning: ["Backend Developer", "Cybersecurity Engineer", "AI Builder"],
  tagline:
    "I build intelligent systems at the intersection of AI, cybersecurity and backend engineering.",
  location: "Dehradun, India",
  blogUrl: "https://zs-shop.space-z.ai/",
  githubUsername: "vaibhav-kuma",
  githubUrl: "https://github.com/vaibhav-kuma",

  email: "vaibhavkumar26412@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/vaibhav-kumar-a19a81232",
  resumeUrl: "https://drive.google.com/file/d/1lUsnXLDl0OcRkf4zustqn5wTFnpwBpMe/view?usp=sharing",

  /** Configurable availability indicator. */
  openToOpportunities: true,

  /** Public URL used for canonical links, sitemap and OG metadata. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaibhav-kumar.dev",

  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "architecture", label: "Architecture" },
    { id: "activity", label: "Activity" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ] satisfies NavigationItem[],
} as const;

export type SiteConfig = typeof siteConfig;