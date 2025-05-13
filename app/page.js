import { ReactLenis } from "lenis/react";
import DiamondRing from "./components/DiamondRing";
import CircularTextSlider from "./components/CircularTextSlider";

export default function Home() {
  return (
    <ReactLenis root>
      <main className="w-full h-[6000vh] relative">
        <CircularTextSlider />
        <DiamondRing />
      </main>
    </ReactLenis>
  );
}
