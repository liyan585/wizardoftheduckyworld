"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ResultType } from "../data/results";
import { playClick } from "../lib/clickSound";

import ParticleOverlay from "./ParticleOverlay";

type ResultCardProps = {
  result: ResultType;
};

type Phase = "result" | "j" | "k" | "kBlur";

export default function ResultCard({ result }: ResultCardProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("result");

  const onShare = async () => {
    playClick();
    const shareText = `I got '${result.title}'. Check out yours, visiting the world of the Ducky Wizard.\n\nwww.wizardoftheduckyworld.com\n\nPowered by Ente – ente.com`;

    if (navigator.share) {
      await navigator.share({ text: shareText }).catch(() => {});
      return;
    }

    await navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard!");
  };

  // After 4s play i2.mp3, when it ends cross-dissolve to j.png
  useEffect(() => {
    if (phase !== "result") return;
    const timer = setTimeout(() => {
      const i2 = new Audio("/i2.mp3");
      i2.onended = () => setPhase("j");
      i2.play().catch(() => {
        // Audio blocked on mobile — skip ahead after a fallback delay
        setPhase("j");
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [phase]);

  // j.png for 2 seconds then cross-dissolve to k.png
  useEffect(() => {
    if (phase !== "j") return;
    const sfxTimer = setTimeout(() => { new Audio("/magisfx.mp3").play().catch(() => {}); }, 500);
    const timer = setTimeout(() => setPhase("k"), 2000);
    return () => { clearTimeout(sfxTimer); clearTimeout(timer); };
  }, [phase]);

  // k.png for 3 seconds then blur out and show button
  useEffect(() => {
    if (phase !== "k") return;
    const timer = setTimeout(() => setPhase("kBlur"), 4500);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <ParticleOverlay />
      {/* Result phase */}
      <AnimatePresence>
        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src="/result_bg.png"
              alt="background"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.52 }}
              className="relative z-10 flex h-full flex-col items-center justify-center"
            >
              <div className="relative" style={{ height: "min(80vh, calc(90vw * 630 / 420))", aspectRatio: "420 / 630" }}>
                <Image
                  src={result.image}
                  alt={result.title}
                  fill
                  className="object-contain"
                  priority
                />
                {/* Clickable ente.com overlay on the card */}
                <a
                  href="https://ente.com"
                  target="_blank"
                  rel="noopener"
                  className="absolute cursor-pointer z-10"
                  style={{ bottom: "0%", left: "10%", right: "10%", height: "10%" }}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <motion.a
                  href={result.image}
                  download={`sorcerer-ducky-${result.key}.png`}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.06, boxShadow: "0 0 12px #A88458" }}
                  whileTap={{ scale: 0.94, filter: "brightness(0.85)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="rounded-xl cursor-pointer no-underline font-semibold text-amber-950"
                  style={{
                    fontFamily: "var(--font-irish-grover)",
                    background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
                    border: "1.5px solid #462901",
                    fontSize: "clamp(10px, 1.2vw, 14px)",
                    padding: "clamp(4px, 0.6vh, 10px) clamp(10px, 1.5vw, 20px)",
                  }}
                >
                  Download
                </motion.a>
                <motion.button
                  onClick={onShare}
                  whileHover={{ scale: 1.06, boxShadow: "0 0 12px #A88458" }}
                  whileTap={{ scale: 0.94, filter: "brightness(0.85)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="rounded-xl cursor-pointer font-semibold text-amber-950"
                  style={{
                    fontFamily: "var(--font-irish-grover)",
                    background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
                    border: "1.5px solid #462901",
                    fontSize: "clamp(10px, 1.2vw, 14px)",
                    padding: "clamp(4px, 0.6vh, 10px) clamp(10px, 1.5vw, 20px)",
                  }}
                >
                  Share
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* j.png phase */}
      <AnimatePresence>
        {phase === "j" && (
          <motion.div
            key="j"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: "brightness(0) blur(8px)" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src="/j.png" alt="j" fill className="object-contain" priority />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Green glowy flash between j and k */}
      <AnimatePresence>
        {(phase === "k" || phase === "kBlur") && (
          <motion.div
            key="k-flash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(80,255,120,0.7) 0%, rgba(20,180,60,0.5) 40%, rgba(0,40,10,0.9) 100%)",
              boxShadow: "inset 0 0 120px rgba(80,255,120,0.4)",
            }}
          />
        )}
      </AnimatePresence>

      {/* k.png phase (stays for kBlur too) */}
      <AnimatePresence>
        {(phase === "k" || phase === "kBlur") && (
          <motion.div
            key="k"
            initial={{ opacity: 0, scale: 0.92, x: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, -4, 5, -3, 4, -2, 0],
            }}
            transition={{
              opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
              x: { duration: 0.5, ease: "easeOut" },
            }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ filter: phase === "kBlur" ? "blur(12px) brightness(0.6)" : "blur(0px) brightness(1)" }}
              transition={{ duration: 1.2 }}
              className="relative h-full w-full"
            >
              <Image src="/k.png" alt="k" fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result card + buttons after k blurs */}
      <AnimatePresence>
        {phase === "kBlur" && (
          <motion.div
            key="endButtons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute inset-0 z-20 flex items-center px-8"
            style={{ justifyContent: "flex-start", paddingLeft: "13%" }}
          >
            <div className="flex w-full max-w-5xl items-center gap-8">
              {/* Left half: result card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="relative flex-1"
                style={{ aspectRatio: "420 / 630", maxHeight: "80vh" }}
              >
                <Image
                  src={result.image}
                  alt={result.title}
                  fill
                  className="object-contain"
                />
                <a
                  href="https://ente.com"
                  target="_blank"
                  rel="noopener"
                  className="absolute cursor-pointer z-10"
                  style={{ bottom: "0%", left: "10%", right: "10%", height: "10%" }}
                />
              </motion.div>

              {/* Right half: buttons stacked */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <motion.button
                  onClick={() => { playClick(); router.push("/"); }}
                  whileHover={{ scale: 1.08, boxShadow: "0 0 16px #A88458" }}
                  whileTap={{ scale: 0.92, filter: "brightness(0.8)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="rounded-xl px-8 py-3 text-lg font-semibold text-amber-950 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-irish-grover)",
                    background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
                    border: "2px solid #462901",
                  }}
                >
                  Play Again
                </motion.button>
                <motion.a
                  href={result.image}
                  download={`sorcerer-ducky-${result.key}.png`}
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.08, boxShadow: "0 0 16px #A88458" }}
                  whileTap={{ scale: 0.92, filter: "brightness(0.8)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="rounded-xl px-8 py-3 text-lg font-semibold text-amber-950 cursor-pointer no-underline text-center"
                  style={{
                    fontFamily: "var(--font-irish-grover)",
                    background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
                    border: "2px solid #462901",
                  }}
                >
                  Download
                </motion.a>
                <motion.button
                  onClick={onShare}
                  whileHover={{ scale: 1.08, boxShadow: "0 0 16px #A88458" }}
                  whileTap={{ scale: 0.92, filter: "brightness(0.8)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="rounded-xl px-8 py-3 text-lg font-semibold text-amber-950 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-irish-grover)",
                    background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
                    border: "2px solid #462901",
                  }}
                >
                  Share
                </motion.button>
                <motion.a
                  href="https://ente.com"
                  target="_blank"
                  rel="noopener"
                  onClick={() => playClick()}
                  whileHover={{ scale: 1.08, boxShadow: "0 0 16px #A88458" }}
                  whileTap={{ scale: 0.92, filter: "brightness(0.8)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="rounded-xl px-8 py-3 text-lg font-semibold text-amber-950 cursor-pointer no-underline text-center"
                  style={{
                    fontFamily: "var(--font-irish-grover)",
                    background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
                    border: "2px solid #462901",
                  }}
                >
                  Visit ente.com
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
