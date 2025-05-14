import { ReactLenis } from "lenis/react";
import { projects } from "@/data/projects";
import DirectionAwareMagnetically from "../components/DirectionAwareMagnetically";
import Persons from "../components/Persons";

export default function Projects() {
  return (
    <ReactLenis root>
      <Persons data={projects} />
      <DirectionAwareMagnetically />
    </ReactLenis>
  );
}
