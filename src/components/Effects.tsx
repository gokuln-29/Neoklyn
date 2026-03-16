"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    // Custom cursor setup (only runs once completely)
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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(reqId);
    };
  }, []);

  useEffect(() => {
    // Hover effects and Scroll reveal (re-runs on each page navigation)
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

    // small timeout to ensure DOM is ready on new page
    setTimeout(attachHover, 100);

    // Scroll reveal
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('up'), i * 100);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    const attachReveal = () => {
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    };
    setTimeout(attachReveal, 100);

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      document.querySelectorAll('.reveal').forEach(el => obs.unobserve(el));
    };
  }, [pathname]);

  return (
    <>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
    </>
  );
}
