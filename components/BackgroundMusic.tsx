"use client";

import { useEffect, useRef } from "react";

const START_TIME = 63; // 00:01:03
const TARGET_VOLUME = 0.5;
const FADE_DURATION = 1000; // ms

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  const startWithFade = (audio: HTMLAudioElement) => {
    if (startedRef.current) return;
    startedRef.current = true;
    audio.volume = 0;
    audio.currentTime = START_TIME;
    audio.play().catch(() => {});

    const steps = 40;
    const interval = FADE_DURATION / steps;
    const increment = TARGET_VOLUME / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      audio.volume = Math.min(TARGET_VOLUME, increment * step);
      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    // Try autoplay immediately
    audio.currentTime = START_TIME;
    audio.play()
      .then(() => {
        startedRef.current = true;
        // Fade in
        const steps = 40;
        const interval = FADE_DURATION / steps;
        const increment = TARGET_VOLUME / steps;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          audio.volume = Math.min(TARGET_VOLUME, increment * step);
          if (step >= steps) clearInterval(timer);
        }, interval);
      })
      .catch(() => {
        // Browser blocked autoplay — wait for first interaction
        const onInteract = () => {
          startWithFade(audio);
          window.removeEventListener("click", onInteract);
          window.removeEventListener("keydown", onInteract);
        };
        window.addEventListener("click", onInteract);
        window.addEventListener("keydown", onInteract);
      });

    return () => {
      audio.pause();
    };
  }, []);

  return null;
}
