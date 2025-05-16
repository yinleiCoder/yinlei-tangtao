"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function PhysicsDrivenText() {
  const containerRef = useRef(null);
  const physicsEnabled = useRef(false);
  const lastProgress = useRef(0);
  const charElements = useRef([]);
  const charBodies = useRef([]);
  const highlightWords = ["磊", "唐", "涛", "爱", "美", "丽", "缘"];

  useGSAP(
    () => {
      const { chars: words } = SplitText.create("p", {
        type: "chars",
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.chars, {
            duration: 2,
            x: 26,
            autoAlpha: 0,
            stagger: 0.06,
          });
        },
      });

      const { Engine, Runner, World, Bodies, Body, Events } = Matter;
      const engine = Engine.create({
        gravity: { x: 0, y: 0 },
      });
      const runner = Runner.create();
      Runner.run(runner, engine);
      //   const render = Render.create({
      //     element: containerRef.current,
      //     engine: engine,
      //     options: {
      //       width: window.innerWidth,
      //       height: window.innerHeight,
      //       wireframes: false,
      //       background: "transparent",
      //     },
      //   });
      //   Render.run(render);
      const floor = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 5,
        window.innerWidth,
        20,
        { isStatic: true }
      );
      World.add(engine.world, floor);

      const wordsToHighlight = words.filter((word) =>
        highlightWords.some((highlight) => word.textContent.includes(highlight))
      );
      wordsToHighlight.forEach((word) => {
        const chars = word.textContent.split("");
        const wordRect = word.getBoundingClientRect();
        const textBoxRect = containerRef.current.getBoundingClientRect();
        word.style.opacity = 1;

        chars.forEach((char, charIndex) => {
          const charSpan = document.createElement("span");
          charSpan.className = "char";
          charSpan.textContent = char;
          charSpan.style.position = "absolute";
          containerRef.current.appendChild(charSpan);
          const charWidth = word.offsetWidth / chars.length;
          const x = wordRect.left - textBoxRect.left + charIndex * charWidth;
          const y = wordRect.top - textBoxRect.top;
          charSpan.style.left = `${x}px`;
          charSpan.style.top = `${y}px`;
          charSpan.style.color = getComputedStyle(word).color;
          charElements.current.push(charSpan);

          const body = Bodies.rectangle(
            x + charWidth / 2,
            y + charSpan.offsetHeight / 2,
            charWidth,
            charSpan.offsetHeight,
            {
              restitution: 0.75,
              friction: 0.5,
              frictionAir: 0.0175,
              isStatic: true,
            }
          );
          World.add(engine.world, body);
          charBodies.current.push({
            body,
            element: charSpan,
            initialX: x,
            initialY: y,
          });
        });
      });

      function resetAnimation() {
        engine.gravity.y = 0;
        charBodies.current.forEach(({ body, element, initialX, initialY }) => {
          Body.setStatic(body, true);
          Body.setPosition(body, {
            x: initialX + element.offsetWidth / 2,
            y: initialY + element.offsetHeight / 2,
          });
          Body.setAngle(body, 0);
          Body.setVelocity(body, { x: 0, y: 0 });
          Body.setAngularVelocity(body, 0);

          element.style.transform = "none";
          element.style.opacity = 0;
        });
        words.forEach((word) => {
          gsap.to(word, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.in",
          });
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          //   markers: true,
          end: `+=${window.innerHeight * 4}px`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const isScrollingDown = self.progress > lastProgress.current;
            lastProgress.current = self.progress;

            if (
              self.progress >= 0.6 &&
              !physicsEnabled.current &&
              isScrollingDown
            ) {
              physicsEnabled.current = true;
              engine.gravity.y = 1;

              charBodies.current.forEach(({ body, element }) => {
                element.style.opacity = 1; // because of global.css
                element.style.color = "red";
                Body.setStatic(body, false);
                Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
                Body.setVelocity(body, {
                  x: (Math.random() - 0.5) * 5,
                  y: -Math.random() * 5,
                });
              });

              gsap.to(
                words.filter((word) =>
                  highlightWords.some((hw) => word.textContent.includes(hw))
                ),
                {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );
            } else if (
              self.progress < 0.6 &&
              physicsEnabled.current &&
              !isScrollingDown
            ) {
              physicsEnabled.current = false;
              resetAnimation();
            }
          },
        },
      });

      Events.on(engine, "afterUpdate", () => {
        charBodies.current.forEach(({ body, element, initialX, initialY }) => {
          if (physicsEnabled.current) {
            const deltaX =
              body.position.x - (initialX + element.offsetWidth / 2);
            const deltaY =
              body.position.y - (initialY + element.offsetHeight / 2);
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${body.angle}rad)`;
          }
        });
      });
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <section
      className="textBox relative w-full h-screen p-2 overflow-hidden bg-[#1a1a1a] flex flex-col justify-center items-center"
      ref={containerRef}
    >
      <p className="text-white text-base md:text-2xl max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] leading-[2rem] md:leading-[2.5rem]">
        2025年4月19日上午11点左右，人头涌动的遂宁市河东新区紫竹路小学校校门口，一眼就认出了唐涛，淡黄色的碎花裙，扎起的短发，干练、端庄、美丽、漂亮。手机上的照片收藏了200多张你的照片，但本人确实和照片不大一样，更瘦、更美，声音和微信语音略微有些许出入。第一次挽胳膊，第一次牵手，第一次亲亲，第一次吃饭，第一次和你漫步在夜晚的城市街道，第一次骑着电动车拥抱你，第一次送你上班等，数不清的第一次唤起我那久违的心动。因为一个人，爱上一座城，那年第一次来遂宁河东新区面试计算机教师，对周围的环境不是很满意，一切都是冥冥中注定的缘分，因为你，我爱上了河东新区。爱意随风起，风止意难平，祝你以后幸福快乐！永远爱你、陪伴你的狗子，磊。
      </p>
    </section>
  );
}
