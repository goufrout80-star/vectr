"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    let x = innerWidth * .5, y = innerHeight * .5, tx = x, ty = y, frame = 0;
    const move = (event: PointerEvent) => { tx = event.clientX; ty = event.clientY; };
    const tick = () => { x += (tx - x) * .14; y += (ty - y) * .14; if (glow.current) glow.current.style.transform = `translate3d(${x}px,${y}px,0)`; frame = requestAnimationFrame(tick); };
    addEventListener("pointermove", move, { passive: true }); frame = requestAnimationFrame(tick);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
  }, []);
  return <div ref={glow} className="cursor-glow" aria-hidden="true"/>;
}
