import { ReactLenis } from "lenis/react";
import PhysicsDrivenText from "../components/PhysicsDrivenText";

export default function Letter() {
  return (
    <ReactLenis root>
      <main className="w-full min-h-svh overflow-x-hidden">
        <PhysicsDrivenText />
      </main>
    </ReactLenis>
  );
}
