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
  const [isVisible, setIsVisible] = useState(false);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const largeCursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastPosition = useRef<Position>({ x: 0, y: 0 });

  // detect if it's a touch device
  const checkTouchDevice = useCallback(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    setIsTouchDevice(isTouch);

    // if it's a touch device, hide cursor immediately
    if (isTouch) {
      setIsVisible(false);
      setHasMouseMoved(false);
    }
  }, []);

  // handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // only process if not a touch device
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isTouch) return;

    const target = e.target as HTMLElement;
    const interactive =
      target.closest(
        "a, button, input, textarea, select, label, [role='button']"
      ) !== null;

    setIsPointer(interactive);
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
    setHasMouseMoved(true);
  }, []);

  // hide cursor when leaving the viewport
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // show cursor when returning to the viewport
  const handleMouseEnter = useCallback(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (!isTouch && hasMouseMoved) {
      setIsVisible(true);
    }
  }, [hasMouseMoved]);

  // smooth animation of the large cursor
  const animateFollower = useCallback(() => {
    if (largeCursorRef.current && isVisible && !isTouchDevice) {
      const dx = position.x - lastPosition.current.x;
      const dy = position.y - lastPosition.current.y;

      lastPosition.current.x += dx * 0.2;
      lastPosition.current.y += dy * 0.2;

      largeCursorRef.current.style.left = `${lastPosition.current.x}px`;
      largeCursorRef.current.style.top = `${lastPosition.current.y}px`;
    }
    requestRef.current = requestAnimationFrame(animateFollower);
  }, [position, isVisible, isTouchDevice]);

  // main effect
  useEffect(() => {
    setMounted(true);
    checkTouchDevice();

    // detect window size changes
    const handleResize = () => {
      checkTouchDevice();
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // initialize listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", checkTouchDevice);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // start animation
    requestRef.current = requestAnimationFrame(animateFollower);

    // cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", checkTouchDevice);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
    animateFollower,
    checkTouchDevice,
  ]);

  // reset cursor when changing from touch to non-touch device
  useEffect(() => {
    if (!isTouchDevice && hasMouseMoved) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isTouchDevice, hasMouseMoved]);

  // don't render if it's a touch device or if mouse hasn't moved
  if (!mounted || (isTouchDevice && !hasMouseMoved)) return null;

  return (
    <>
      {/* small cursor */}
      <div
        className={`${styles.flare} ${styles.small} ${
          isPointer ? styles.pointer : ""
        } ${!isVisible || isTouchDevice ? styles.hidden : ""}`}
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible && !isTouchDevice ? 1 : 0,
        }}
      />
      {/* large cursor */}
      <div
        ref={largeCursorRef}
        className={`${styles.flare} ${styles.large} ${
          isPointer ? styles.pointer : ""
        } ${!isVisible || isTouchDevice ? styles.hidden : ""}`}
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible && !isTouchDevice ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
