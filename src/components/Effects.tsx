"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cur = document.getElementById('cursor');
      const ring = document.getElementById('cursor-ring');
      let mx = 0, my = 0, rx = 0, ry = 0;

      const handleMouseMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        if (cur) {
          cur.style.left = mx + 'px';
          cur.style.top = my + 'px';
        }
      };

      document.addEventListener('mousemove', handleMouseMove);

      let reqId: number;
      const animRing = () => {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        if (ring) {
          ring.style.left = rx + 'px';
          ring.style.top = ry + 'px';
        }
        reqId = requestAnimationFrame(animRing);
      };
      animRing();

      const curCleanup = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(reqId);
      };

      return curCleanup;
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduceMotion = mq.matches;

    const ctx = gsap.context(() => {
      const cur = document.getElementById('cursor');
      const ring = document.getElementById('cursor-ring');

      let elements = document.querySelectorAll('a, button, .service-item, .sc, .market, .tcard');

      const handleEnter = () => {
        if (cur) cur.style.transform = 'translate(-50%,-50%) scale(2.5)';
        if (ring) ring.style.transform = 'translate(-50%,-50%) scale(0.6)';
      };
      const handleLeave = () => {
        if (cur) cur.style.transform = 'translate(-50%,-50%) scale(1)';
        if (ring) ring.style.transform = 'translate(-50%,-50%) scale(1)';
      };

      const attachHover = () => {
        elements = document.querySelectorAll('a, button, .service-item, .sc, .market, .tcard');
        elements.forEach(el => {
          el.addEventListener('mouseenter', handleEnter);
          el.addEventListener('mouseleave', handleLeave);
        });
      }

      setTimeout(attachHover, 100);

      gsap.set('.reveal', { opacity: 0, y: 40 });

      if (reduceMotion) {
        gsap.set('.reveal', { opacity: 1, y: 0 });
      } else {
        ScrollTrigger.batch('.reveal', {
          onEnter: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          }),
          start: 'top 88%'
        });
      }

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return (
    <>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
    </>
  );
}
