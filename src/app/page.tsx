import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsConstellation } from "@/components/sections/SkillsConstellation";
import { ProjectsUniverse } from "@/components/sections/ProjectsUniverse";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { EngineeringActivity } from "@/components/sections/EngineeringActivity";
import { Contact } from "@/components/sections/Contact";

/**
 * Home page — assembles all primary sections in document order.
 * The Hero opens the narrative, followed by About, Skills, Projects,
 * Architecture, Activity, and Contact as the closing call-to-action.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SkillsConstellation />
      <ProjectsUniverse />
      <ArchitectureSection />
      <EngineeringActivity />
      <Contact />
    </>
  );
}
