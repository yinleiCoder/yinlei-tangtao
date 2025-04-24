import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { projects } from "@/libs/projects";

export default function Projects() {
  return (
    <ul className="project-list absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-2">
      {projects.map((project) => (
        <li key={project.id}>
          <div className="link flex items-center gap-1 px-2">
            <ArrowLongRightIcon className="size-4 inline-block" />
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
