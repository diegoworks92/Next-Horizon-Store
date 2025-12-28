"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Description.module.sass";
import Link from "next/link";

export const Description = () => {
  const [isClient, setIsClient] = useState(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || videoRefs.current.length === 0) return;

    const handleEnded = () => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex + 1) % videoRefs.current.length
      );
    };

    const currentVideo = videoRefs.current[currentVideoIndex];
    currentVideo?.play();
    currentVideo?.addEventListener("ended", handleEnded);

    return () => {
      currentVideo?.removeEventListener("ended", handleEnded);
    };
  }, [currentVideoIndex, isClient]);

  const videos = [
    "https://videos.pexels.com/video-files/6498514/6498514-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/6153734/6153734-uhd_2732_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/6498238/6498238-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/8464662/8464662-uhd_2560_1440_25fps.mp4",
  ];

  return (
    <section className={styles.Description}>
      <div className={styles.Description__videoContainer}>
        <div className={styles.videoWrapper}>
          {isClient &&
            videos.map((src, index) => (
              <video
                key={index}
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                width="600"
                height="400"
                muted
                autoPlay
                style={{
                  display: currentVideoIndex === index ? "block" : "none",
                  borderRadius: "20px",
                }}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
        </div>
      </div>
      <div className={styles.Description__text}>
        <h2>Bring the future today</h2>
        <p>
          Your Portal to Future Tech! Explore a vast realm of innovative gadgets
          and cutting-edge gear. Stay ahead and transform your digital
          experience with us.
        </p>
        <div className={styles.Description__buttonContainer}>
          <Link href="/store" className={styles.Description__button}>
            Store
          </Link>
        </div>
      </div>
    </section>
  );
};
