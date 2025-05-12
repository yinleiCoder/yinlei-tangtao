import { ReactLenis } from "lenis/react";
import DiamondRing from "./components/DiamondRing";
import CircularTextSliderSongs from "./components/CircularTextSliderSongs";

export default function Home() {
  return (
    <ReactLenis root>
      <main className="w-full h-[3000vh] relative">
        <CircularTextSliderSongs />
        <DiamondRing />
      </main>
    </ReactLenis>

  );
}
