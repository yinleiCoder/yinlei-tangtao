"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ContactMe() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const container = containerRef.current;
      const svg = svgRef.current;
      const leftEyeBox = leftEyeRef.current;
      const rightEyeBox = rightEyeRef.current;
      const mouse = svg.createSVGPoint();

      const createEye = (element) => {
        gsap.set(element, {
          transformOrigin: "center",
        });
        let bbox = element.getBBox();

        let centerX = bbox.x + bbox.width / 2;
        let centerY = bbox.y + bbox.height / 2;

        const rotateTo = contextSafe((point) => {
          let dx = point.x - centerX;
          let dy = point.y - centerY;
          let angle = Math.atan2(dy, dx);

          gsap.to(element, {
            duration: 0.3,
            rotation: `${angle}rad_short`,
          });
        });

        return {
          element,
          rotateTo,
        };
      };

      const leftEye = createEye(leftEyeBox);
      const rightEye = createEye(rightEyeBox);

      let requestId = null;

      const onFrame = () => {
        let point = mouse.matrixTransform(svg.getScreenCTM().inverse());

        leftEye.rotateTo(point);
        rightEye.rotateTo(point);

        requestId = null;
      };

      const onMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        if (!requestId) {
          requestId = requestAnimationFrame(onFrame);
        }
      };

      container.addEventListener("mousemove", onMouseMove);

      return () => {
        container.removeEventListener("mousemove", onMouseMove);
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div
      className="w-full h-screen bg-[#cdea67] flex justify-center items-center overflow-hidden"
      ref={containerRef}
    >
      <svg
        id="svg"
        ref={svgRef}
        viewBox="0 0 1000 1000"
        className="fixed w-full h-full pointer-events-none z-20"
      >
        <g id="left-eye" ref={leftEyeRef}>
          <circle
            className="eye-outer"
            cx="400"
            cy="500"
            r="100"
            stroke="#0f0f0f"
            strokeWidth="2"
            fill="#fff"
          />
          <circle
            className="eye-inner"
            cx="480"
            cy="500"
            r="20"
            fill="#0f0f0f"
          />
        </g>
        <g id="right-eye" ref={rightEyeRef}>
          <circle
            className="eye-outer"
            cx="600"
            cy="500"
            r="100"
            stroke="#0f0f0f"
            strokeWidth="2"
            fill="#fff"
          />
          <circle
            className="eye-inner"
            cx="680"
            cy="500"
            r="20"
            fill="#0f0f0f"
          />
        </g>
      </svg>
      <div className="w-full flex flex-col justify-between items-center">
        <div>
          <a
            href="#"
            className="text-[175px] leading-[175px] h-[175px] text-[#0f0f0f] font-extrabold overflow-hidden uppercase"
          >
            yinleilei.com
          </a>
        </div>
        <div className="flex gap-5">
          <a
            href="https://www.youtube.com/@leiyin1998"
            target="_blank"
            className="text-[175px] leading-[175px] h-[175px] text-[#0f0f0f] font-extrabold overflow-hidden uppercase"
          >
            Youtube
          </a>
          <a
            href="https://space.bilibili.com/355529756?spm_id_from=333.788.0.0"
            target="_blank"
            className="text-[175px] leading-[175px] h-[175px] text-[#0f0f0f] font-extrabold overflow-hidden uppercase"
          >
            Bilibili
          </a>
        </div>
        <div>
          <a
            href="#"
            className="text-[175px] leading-[175px] h-[175px] text-[#0f0f0f] font-extrabold overflow-hidden uppercase"
          >
            Tel: 137-9595-0539
          </a>
        </div>
      </div>
    </div>
  );
}
