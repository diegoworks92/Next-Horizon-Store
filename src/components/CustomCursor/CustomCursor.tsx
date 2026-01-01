"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./customCursor.module.sass";

interface Position {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const largeCursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastPosition = useRef<Position>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    const isInteractive =
      target.closest(
        "a, button, input, textarea, select, label, [role='button']"
      ) !== null;

    setIsPointer(isInteractive);
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const animateFollower = useCallback(() => {
    if (largeCursorRef.current) {
      const dx = position.x - lastPosition.current.x;
      const dy = position.y - lastPosition.current.y;

      lastPosition.current.x += dx * 0.2;
      lastPosition.current.y += dy * 0.2;

      largeCursorRef.current.style.left = `${lastPosition.current.x}px`;
      largeCursorRef.current.style.top = `${lastPosition.current.y}px`;
    }

    requestRef.current = requestAnimationFrame(animateFollower);
  }, [position]);

  useEffect(() => {
    setMounted(true);

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove);
      requestRef.current = requestAnimationFrame(animateFollower);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove, animateFollower]);

  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* small cursor */}
      <div
        className={`${styles.flare} ${styles.small} ${
          isPointer ? styles.pointer : ""
        }`}
        style={{
          left: position.x,
          top: position.y,
        }}
      />

      {/* large cursor */}
      <div
        ref={largeCursorRef}
        className={`${styles.flare} ${styles.large} ${
          isPointer ? styles.pointer : ""
        }`}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    </>
  );
};

export default CustomCursor;
