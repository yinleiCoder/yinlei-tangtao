import Link from "next/link";
import DiamondRing from "./components/DiamondRing";
import DirectionAwareMagnetically from "./components/DirectionAwareMagnetically";

export default function Home() {
  return (
    <div className="home w-full bg-[#1a1a1a] flex flex-col items-center">
      <DirectionAwareMagnetically />
      <div className="w-full h-svh link flex justify-center items-center gap-1 px-2 group cursor-pointer">
        <Link href="/projects" className="group-hover:text-lg transition">
          <DiamondRing />
        </Link>
      </div>
    </div>
  );
}
