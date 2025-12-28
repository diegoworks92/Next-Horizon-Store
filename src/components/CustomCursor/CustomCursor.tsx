"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.css";

interface Position {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const smallCursorRef = useRef<HTMLDivElement>(null);
  const largeCursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastPosition = useRef<Position>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target instanceof Element) {
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue("cursor") === "pointer"
      );
    }
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
    if (!isTouchDevice)
      requestRef.current = requestAnimationFrame(animateFollower);
  }, [position, isTouchDevice]);

  useEffect(() => {
    setMounted(true);

    const checkTouchDevice = () => {
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touch);
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);

    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
      requestRef.current = requestAnimationFrame(animateFollower);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkTouchDevice);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove, animateFollower, isTouchDevice]);

  if (!mounted || isTouchDevice) return null;

  const cursorStyle = isPointer ? { opacity: 0.5 } : {};

  return (
    <>
      <div
        ref={smallCursorRef}
        className={`flare ${isPointer ? "pointer" : ""}`}
        style={{
          ...cursorStyle,
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "12px",
          height: "12px",
          border: "2px solid #ffffff2b",
          borderRadius: "50%",
          mixBlendMode: "screen",
          backdropFilter: "blur(1px)",
          backgroundColor: "#da238a",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 999998,
        }}
      />
      <div
        ref={largeCursorRef}
        className={`flare ${isPointer ? "pointer" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "30px",
          height: "30px",
          border: "2px solid #da238a",
          borderRadius: "50%",
          mixBlendMode: "screen",
          backdropFilter: "blur(1px)",
          backgroundColor: "transparent",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 999999,
        }}
      />
    </>
  );
};

export default CustomCursor;
