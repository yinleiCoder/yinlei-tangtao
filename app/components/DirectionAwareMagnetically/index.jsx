"use client";

import { useEffect, useRef } from "react";

export default function DirectionAwareMagnetically() {
  const containerRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const hightlight = highlightRef.current;
    const gridItems = container.querySelectorAll(".grid-item");
    const firstItem = container.querySelector(".grid-item");

    const highlightColors = [
      "#E24E1B",
      "#4381C1",
      "#F79824",
      "#04A777",
      "#5B8C5A",
      "#2176FF",
      "#818D92",
      "#22AAA1",
    ];

    gridItems.forEach((item, index) => {
      item.dataset.color = highlightColors[index % highlightColors.length];
    });

    const moveToElement = (element) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        hightlight.style.transform = `translate(${
          rect.left - containerRect.left
        }px,${rect.top - containerRect.top}px)`;
        hightlight.style.width = `${rect.width}px`;
        hightlight.style.height = `${rect.height}px`;
        hightlight.style.backgroundColor = element.dataset.color;
      }
    };

    const moveHighlight = (e) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement && hoveredElement.classList.contains("grid-item")) {
        moveToElement(hoveredElement);
      } else if (
        hoveredElement &&
        hoveredElement.parentElement &&
        hoveredElement.parentElement.classList.contains("grid-item")
      ) {
        moveToElement(hoveredElement.parentElement);
      }
    };

    moveToElement(firstItem);

    container.addEventListener("mousemove", moveHighlight);

    return () => {
      container.removeEventListener("mousemove", moveHighlight);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-svh py-[25vh] md:py-0 md:h-svh flex justify-center items-center text-white font-semibold text-2xl"
    >
      <div className="relative mx-auto w-[90%] max-h-max md:max-h-none md:h-[60%] flex flex-col border border-solid border-[rgba(255,255,255,0.2)]">
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center h-full border-b border-solid border-b-[rgba(255,255,255,0.2)]">
          <div className="grid-item flex-1 w-full py-[60px] md:py-0 border-r-none flex justify-center items-center h-full border-b md:border-b-0 md:border-r border-solid md:border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)]">
            <p className="relative z-10">教师编制</p>
          </div>
          <div className="grid-item flex-1 w-full py-[60px] md:py-0 border-r-none flex justify-center items-center h-full border-b md:border-b-0 md:border-r border-solid md:border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)]">
            <p className="relative z-10">程序员</p>
          </div>
          <div className="grid-item flex-1 w-full py-[60px] md:py-0 flex justify-center items-center h-full">
            <p className="relative z-10">陶行知</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center h-full">
          <div className="grid-item flex-1 w-full py-[60px] md:py-0 border-r-none flex justify-center items-center h-full border-b md:border-b-0 md:border-r border-solid md:border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)]">
            <p className="relative z-10">C#</p>
          </div>
          <div className="grid-item flex-1 w-full py-[60px] md:py-0 border-r-none flex justify-center items-center h-full border-b md:border-b-0 md:border-r border-solid md:border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)]">
            <p className="relative z-10">C++</p>
          </div>
          <div className="grid-item flex-1 w-full py-[60px] md:py-0 border-r-none flex justify-center items-center h-full border-b md:border-b-0 md:border-r border-solid md:border-r-[rgba(255,255,255,0.2)] border-b-[rgba(255,255,255,0.2)]">
            <p className="relative z-10">JavaScript</p>
          </div>
          <div className="grid-item flex-1 w-full py-[60px] md:py-0 flex justify-center items-center h-full">
            <p className="relative z-10">游戏逆向</p>
          </div>
        </div>
      </div>
      <div
        ref={highlightRef}
        className="highlight hidden md:block absolute top-0 left-0 bg-white pointer-events-none transition"
      ></div>
    </div>
  );
}
