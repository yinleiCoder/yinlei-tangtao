"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { words } from "@/data/words";
import "./index.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CircularTextSliderSongs() {
  const cursorRef = useRef(null);
  const galleryRef = useRef(null);

  const numberOfItems = words.length;
  const angleIncrement = (2 * Math.PI) / numberOfItems;
  const radius = 1100;

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      const gallery = galleryRef.current;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      for (let i = 0; i < numberOfItems; i++) {
        const wordItem = document.createElement("div");
        wordItem.className = "wordItem";
        const p = document.createElement("p");
        const count = document.createElement("span");
        p.textContent = words[i].name;
        count.textContent = `(${words[i].id})`;
        wordItem.appendChild(p);
        p.appendChild(count);
        gallery.appendChild(wordItem);

        const angle = i * angleIncrement;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const rotation = (angle * 180) / Math.PI;

        gsap.set(wordItem, {
          x: `${x}px`,
          y: `${y}px`,
          rotation: rotation,
        });

        wordItem.addEventListener("mouseover", function () {
          const imgSrc = `/songs/word${i + 1}.jpg`;
          const img = document.createElement("img");
          img.src = imgSrc;
          img.className = "wordItemOfImg";
          img.style.clipPath =
            "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
          cursor.appendChild(img);

          gsap.to(img, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
          });
        });

        wordItem.addEventListener("mouseout", function () {
          const imgs = cursor.getElementsByTagName("img");
          if (imgs.length) {
            const lastImg = imgs[imgs.length - 1];
            Array.from(imgs).forEach((img, index) => {
              if (img !== lastImg) {
                gsap.to(img, {
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                  duration: 1,
                  ease: "power3.out",
                  onComplete: () => {
                    setTimeout(() => {
                      img.remove();
                    }, 1000);
                  },
                });
              }
            });
            gsap.to(lastImg, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: 1,
              ease: "power3.out",
              delay: 0.25,
            });
          }
        });
      }

      function updateWordPosition() {
        const scrollAmount = window.scrollY * 0.0001;
        document.querySelectorAll(".wordItem").forEach((item, index) => {
          const angle = index * angleIncrement + scrollAmount;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const rotation = (angle * 180) / Math.PI;

          gsap.to(item, {
            duration: 0.05,
            x: `${x}px`,
            y: `${y}px`,
            rotation: rotation,
            ease: "elastic.out(1, 0.3)",
          });
        });
      }

      updateWordPosition();

      document.addEventListener("scroll", updateWordPosition);

      function updateMouseHoverImagePosition(e) {
        gsap.to(cursor, {
          x: e.clientX - 150,
          y: e.clientY - 200,
          duration: 1,
          ease: "power3.out",
        });
      }

      document.addEventListener("mousemove", updateMouseHoverImagePosition);

      return () => {
        document.removeEventListener("scroll", updateWordPosition);
        document.removeEventListener(
          "mousemove",
          updateMouseHoverImagePosition
        );
        document.querySelectorAll(".wordItem").forEach((item, index) => {});
      };
    },
    { dependencies: [] }
  );

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[300px] h-[400px] z-0 pointer-events-none"
      ></div>
      <div className="containers">
        <div
          ref={galleryRef}
          className="fixed left-[-75%] w-[200%] h-[100%] overflow-hidden"
        ></div>
      </div>
    </>
  );
}
