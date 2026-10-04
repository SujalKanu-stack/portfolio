import fs from "fs";
import path from "path";
import { PROJECTS } from "@/data/content";
import ProjectsClient from "./ProjectsClient";

export default function Projects() {
  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  const agrichainDiskPath = path.join(process.cwd(), "public", "projects", "agrichain.png");
  const hasAgrichainImage = fs.existsSync(agrichainDiskPath);

  if (!hasAgrichainImage && process.env.NODE_ENV === "development") {
    console.warn("[Projects] Notice: Place your AgriChain screenshot at /public/projects/agrichain.png");
  }

  return (
    <ProjectsClient
      featuredProject={featuredProject}
      otherProjects={otherProjects}
      hasAgrichainImage={hasAgrichainImage}
    />
  );
}
