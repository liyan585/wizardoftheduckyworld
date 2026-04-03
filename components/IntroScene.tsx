"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Scene } from "../data/scenes";

type IntroSceneProps = {
  scene: Scene;
  onNext: () => void;
};

export default function IntroScene({ scene, onNext }: IntroSceneProps) {
  return (
    <motion.div
      key={scene.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-screen w-full cursor-pointer"
      onClick={onNext}
    >
      <Image
        src={scene.image}
        alt={`Scene ${scene.id}`}
        fill
        className="object-contain"
        priority
      />
    </motion.div>
  );
}
