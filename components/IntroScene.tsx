"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Scene } from "../data/scenes";
import { playClick, unlockAudio } from "../lib/clickSound";

type IntroSceneProps = {
  scene: Scene;
  onNext: () => void;
};

export default function IntroScene({ scene, onNext }: IntroSceneProps) {
  const isVideo = !!scene.video;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isVideo) {
      const handleKey = (e: KeyboardEvent) => { if (e.key === "Enter") onNext(); };
      const handleScroll = () => onNext();
      window.addEventListener("keydown", handleKey);
      window.addEventListener("wheel", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("keydown", handleKey);
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [onNext, isVideo]);

  useEffect(() => {
    if (!scene.audio) return;
    const audio = new Audio(scene.audio);
    const timer = setTimeout(() => {
      audio.play().catch(() => {});
    }, 300);
    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, [scene.audio]);

  if (isVideo) {
    return (
      <div className="relative h-screen w-full bg-black">
        <video
          ref={videoRef}
          src={scene.video}
          autoPlay
          playsInline
          onEnded={onNext}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <motion.div
      key={scene.id}
      initial={{ opacity: scene.instant ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: scene.instant ? 0 : 0.4 }}
      className="absolute inset-0 cursor-pointer"
      onClick={() => { unlockAudio(); playClick(); onNext(); }}
    >
      <Image
        src={scene.image!}
        alt={`Scene ${scene.id}`}
        fill
        className="object-contain"
        priority
      />

      {scene.id === 1 && (
        <motion.p
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 right-0 text-center tracking-widest uppercase"
          style={{ bottom: "8%", fontFamily: "var(--font-irish-grover)", color: "#FFEBD4", textShadow: "0 0 8px #A88458, 0 0 20px #462901", fontSize: "clamp(10px, 1.2vw, 16px)" }}
        >
          press enter to open the door
        </motion.p>
      )}
    </motion.div>
  );
}
