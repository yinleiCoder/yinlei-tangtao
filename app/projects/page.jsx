import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <div className="w-full h-svh flex flex-col items-center justify-center overflow-hidden">
      <ul className="project-list absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-4">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="link flex items-center gap-1 px-2 group cursor-pointer">
              <ArrowLongRightIcon className="size-4 inline-block group-hover:size-5 group-hover:text-red-500 transition" />
              <Link
                href={`/projects/${project.slug}`}
                className="group-hover:font-bold group-hover:text-red-500 transition"
              >
                {project.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
