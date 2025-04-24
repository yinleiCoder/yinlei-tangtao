import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="home w-full h-svh flex justify-center items-center">
      <div className="link flex items-center gap-1 px-2">
        <ArrowLongRightIcon className="size-4 inline-block"/>
        <Link href="/projects">All Projects</Link>
      </div>
    </div>
  );
}
