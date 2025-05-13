import ProjectClient from "./project-client";
import { projects } from "@/data/projects";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  
  const project = projects.find((project) => project.slug === slug);

  const currentIndex = projects.findIndex((project) => project.slug === slug);
  const nextIndex = (currentIndex + 1) % projects.length;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

  const nextProject = projects[nextIndex];
  const prevProject = projects[prevIndex];

  return (
    <ProjectClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  );
}
