import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="home w-full h-svh flex justify-center items-center">
      <div className="link flex items-center gap-1 px-2 group cursor-pointer">
        <ArrowLongRightIcon className="size-4 inline-block group-hover:size-5" />
        <Link
          href="/projects"
          className="group-hover:text-lg transition"
        >
          Our Love Story
        </Link>
      </div>
    </div>
  );
}
