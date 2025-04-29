"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/solid";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectClient({ project, nextProject, prevProject }) {
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const footerRef = useRef(null);
  const nextProjectProgressBarRef = useRef(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);

  useGSAP(
    () => {
      gsap.set(projectNavRef.current, {
        opacity: 0,
        y: -100,
      });

      gsap.to(projectNavRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.to(projectDescriptionRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.75,
        ease: "power3.out",
      });

      const navScrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        // markers: true,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, {
              scaleX: self.progress,
            });
          }
        },
      });

      const footerScrollTrigger = ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 3}px`,
        // markers: true,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          if (projectNavRef.current && !isTransitioning) {
            gsap.to(projectNavRef.current, {
              y: -100,
              duration: 0.5,
              ease: "power2.inOut",
            });
          }
        },
        onLeaveBack: () => {
          if (projectNavRef.current && !isTransitioning) {
            gsap.to(projectNavRef.current, {
              y: 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
          }
        },
        onUpdate: (self) => {
          if (nextProjectProgressBarRef.current && shouldUpdateProgress) {
            gsap.set(nextProjectProgressBarRef.current, {
              scaleX: self.progress,
            });
          }
          if (self.progress >= 1 && !isTransitioning) {
            setShouldUpdateProgress(false);
            setIsTransitioning(true);

            const tl = gsap.timeline();
            tl.set(nextProjectProgressBarRef.current, {
              scaleX: 1,
            });
            tl.to(
              [
                footerRef.current?.querySelector(".project-footer-copy"),
                footerRef.current?.querySelector(".next-project-progress"),
              ],
              {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut",
              }
            );
            tl.call(() => {
              window.location.href = `/projects/${nextProject.slug}`;
            });
          }
        },
      });
    },

    {
      dependencies: [nextProject.slug, isTransitioning, shouldUpdateProgress],
    }
  );

  return (
    <ReactLenis root>
      <div className="project-page">
        <div
          className="project-nav w-full md:w-1/2 flex justify-between items-center gap-2 p-1 fixed top-0 left-1/2 -translate-x-1/2 z-50"
          ref={projectNavRef}
        >
          <div className="link cursor-pointer hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-[#c6c6be]">
            <ArrowLongLeftIcon className="size-4 inline-block" />
            <Link href={`/projects/${prevProject.slug}`}>Previous</Link>
          </div>
          <div className="project-page-scroll-progress relative flex-[2] h-[30px] flex justify-center items-center rounded-full border border-solid border-[#c6c6be] overflow-hidden bg-[rgba(255,255,255,0.25)] backdrop-blur-xl">
            <p>{project.title}</p>
            <div
              className="project-page-scroll-progress-bar absolute top-0 left-0 w-full h-full bg-[#c6c6be] scale-x-0 origin-[center_left] will-change-transform -z-[1]"
              ref={progressBarRef}
            ></div>
          </div>
          <div className="link cursor-pointer hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-[#c6c6be]">
            <Link href={`/projects/${nextProject.slug}`}>Next</Link>
            <ArrowLongRightIcon className="size-4 inline-block" />
          </div>
        </div>
        <div className="project-hero relative w-full h-svh flex justify-center items-center">
          <h1 className="text-6xl md:text-9xl font-bold">{project.title}</h1>
          <p
            id="project-description"
            className="opacity-0 absolute bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            ref={projectDescriptionRef}
          >
            {project.description}
          </p>
        </div>
        <div className="project-images flex flex-col items-center gap-4">
          {project.images &&
            project.images.map((image, index) => (
              <div
                className="project-img w-[90%] md:w-1/2 h-[75svh] rounded-2xl overflow-hidden"
                key={index}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
        <div
          className="project-footer relative w-full h-svh flex justify-center items-center"
          ref={footerRef}
        >
          <h1 className="text-6xl md:text-9xl font-bold">
            {nextProject.title}
          </h1>
          <div className="project-footer-copy absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p>Next Story</p>
          </div>
          <div className="next-project-progress absolute bottom-[25%] w-1/2 h-[4px] bg-[#c6c6be]">
            <div
              className="next-project-progress-bar absolute top-0 left-0 w-full h-full bg-black scale-x-0 will-change-transform"
              ref={nextProjectProgressBarRef}
            ></div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}
