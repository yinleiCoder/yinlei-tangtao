import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { projects } from "@/data/projects";
import DirectionAwareMagnetically from "../components/DirectionAwareMagnetically";

export default function Projects() {
  return (
    <div className="w-full h-svh flex flex-col items-center justify-center overflow-hidden">
      <DirectionAwareMagnetically data={projects} />
    </div>
  );
}
