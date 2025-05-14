"use client";

import { Barlow } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import Link from "next/link";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

gsap.registerPlugin(useGSAP, SplitText);

export default function Persons({ data }) {
  const personBoxRef = useRef(null);
  const personImageRef = useRef(null);
  const personNameRef = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const handlers = [];
      const handlerLeaves = [];
      const personImage = personImageRef.current;
      const personName = personNameRef.current;

      const personImages = personImage.querySelectorAll(".imgBox");
      const nameElements = personName.querySelectorAll(".name");
      const nameHeadings = personName.querySelectorAll(".name h1");

      nameHeadings.forEach((heading) => {
        const split = new SplitText(heading, { type: "chars" });
        split.chars.forEach((char) => {
          char.classList.add("letter");
        });
      });

      const defaultLetters = nameElements[0].querySelectorAll(".letter");
      gsap.set(defaultLetters, { y: "100%" });

      const onMouseEnter = contextSafe((e, img, letters) => {
        gsap.to(img, {
          width: 200,
          height: 200,
          duration: 0.5,
          ease: "power4.out",
        });

        gsap.to(letters, {
          y: "-100%",
          ease: "power4.out",
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: "center",
          },
        });
      });

      const onMouseLeave = contextSafe((e, img, letters) => {
        gsap.to(img, {
          width: 100,
          height: 100,
          duration: 0.5,
          ease: "power4.out",
        });

        gsap.to(letters, {
          y: "0%",
          ease: "power4.out",
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: "center",
          },
        });
      });

      const onBoxMouseEnter = contextSafe(() => {
        gsap.to(defaultLetters, {
          y: "0%",
          ease: "power4.out",
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: "center",
          },
        });
      });

      const onBoxMouseLeave = contextSafe(() => {
        gsap.to(defaultLetters, {
          y: "100%",
          ease: "power4.out",
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: "center",
          },
        });
      });

      if (window.innerWidth >= 900) {
        personImages.forEach((img, index) => {
          const correspondingName = nameElements[index + 1];
          const letters = correspondingName.querySelectorAll(".letter");
          const handler = (e) => onMouseEnter(e, img, letters);
          handlers.push(handler);
          const handlerLeave = (e) => onMouseLeave(e, img, letters);
          handlerLeaves.push(handlerLeave);
          img.addEventListener("mouseenter", handler);
          img.addEventListener("mouseleave", handlerLeave);
        });

        personImage.addEventListener("mouseenter", onBoxMouseEnter);
        personImage.addEventListener("mouseleave", onBoxMouseLeave);
      }

      return () => {
        personImages.forEach((img, index) => {
          img.removeEventListener("mouseenter", handlers[index]);
          img.removeEventListener("mouseleave", handlerLeaves[index]);
        });
        personImage.removeEventListener("mouseenter", onBoxMouseEnter);
        personImage.removeEventListener("mouseleave", onBoxMouseLeave);
      };
    },
    { dependencies: [] }
  );

  return (
    <section
      ref={personBoxRef}
      className={`family ${barlow.className} relative w-full h-svh flex flex-col-reverse md:flex-col justify-center items-center gap-5 overflow-hidden text-white`}
    >
      <div
        ref={personImageRef}
        className="person-images flex-wrap md:flex-nowrap max-w-[90%] md:max-w-max flex justify-center items-center"
      >
        {data.map((person) => (
          <Link key={person.id} href={`projects/${person.slug}`}>
            <div className="imgBox relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] p-[2.5px] md:p-[5px] cursor-pointer will-change-[width,height]">
              <img
                className="w-full h-full object-cover rounded-md"
                src={person.images[0]}
              />
            </div>
          </Link>
        ))}
      </div>
      <div
        ref={personNameRef}
        className={`person-names w-full h-[4rem] md:h-[20rem] [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] overflow-hidden ${barlow.className}`}
      >
        <div className="name default">
          <h1 className="absolute w-full text-center uppercase font-extrabold leading-[1] text-white select-none t text-[4rem] md:text-[20rem] translate-y-[-100%]">
            My Family
          </h1>
        </div>
        {data.map((person) => (
          <div className="name" key={person.id}>
            <h1 className="absolute w-full text-center uppercase font-extrabold leading-[1] text-red-700 select-none text-[4rem] md:text-[20rem] translate-y-full">
              {person.title}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
}
