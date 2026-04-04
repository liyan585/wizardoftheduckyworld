"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import IntroScene from "../components/IntroScene";
import ParticleOverlay from "../components/ParticleOverlay";
import QuizStep from "../components/QuizStep";
import { scenes } from "../data/scenes";
import { questions } from "../data/questions";
import { findResult, initialScores, applyAnswer, loadProgress, saveProgress, clearProgress, QuizState } from "../lib/scoring";
import { playClick } from "../lib/clickSound";

const FADE_DURATION = 0.9;

type EndPhase = "hmm" | "loading" | "endScene" | null;

export default function Home() {
  const router = useRouter();

  const [currentScene, setCurrentScene] = useState(0);
  const [fading, setFading] = useState(false);
  const lastSceneClick = useRef(0);
  const [endPhase, setEndPhase] = useState<EndPhase>(null);
  const resultKeyRef = useRef<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    scores: initialScores(),
  });

  const { currentQuestion, scores } = quizState;
  const questionProgress = currentQuestion + 1;

  useEffect(() => {
    const saved = loadProgress();
    if (saved && saved.currentQuestion < questions.length) setQuizState(saved);
    else clearProgress();
  }, []);

  useEffect(() => {
    if (currentQuestion < questions.length) {
      saveProgress(quizState);
    }
  }, [quizState, currentQuestion]);

  const advanceScene = () => {
    const now = Date.now();
    if (now - lastSceneClick.current < 1000) return;
    lastSceneClick.current = now;

    const next = currentScene + 1;
    const isInstant = scenes[currentScene]?.instant || scenes[next]?.instant;

    if (isInstant) {
      setCurrentScene(next);
      return;
    }

    setFading(true);
    setTimeout(() => {
      setCurrentScene(next);
      setFading(false);
    }, FADE_DURATION * 1000);
  };

  // Phase 1: hmm.mp3 plays → loading screen
  useEffect(() => {
    if (endPhase !== "hmm") return;
    const hmm = new Audio("/hmm.mp3");
    hmm.play().catch(() => {});
    hmm.onended = () => setEndPhase("loading");
    return () => { hmm.pause(); };
  }, [endPhase]);

  // Phase 2: loading spinner for 1.5s → end scene
  useEffect(() => {
    if (endPhase !== "loading") return;
    const timer = setTimeout(() => setEndPhase("endScene"), 200);
    return () => clearTimeout(timer);
  }, [endPhase]);

  // Phase 3: i.png + i1.mp3 with 0.3s delay, wait for user interaction to navigate
  useEffect(() => {
    if (endPhase !== "endScene" || !resultKeyRef.current) return;
    const resultType = resultKeyRef.current;
    const i1 = new Audio("/i1.mp3");
    const timer = setTimeout(() => {
      i1.play().catch(() => {});
    }, 300);

    let navigating = false;
    const navigate = () => {
      if (navigating) return;
      navigating = true;
      // Fade out i.png then navigate
      const overlay = document.getElementById("end-scene-fade");
      if (overlay) {
        overlay.style.transition = "opacity 0.9s ease-in-out";
        overlay.style.opacity = "1";
      }
      setTimeout(() => {
        router.push(`/result/${resultType}`);
      }, 900);
    };

    window.addEventListener("click", navigate);
    window.addEventListener("keydown", navigate);
    window.addEventListener("wheel", navigate, { passive: true });

    return () => {
      clearTimeout(timer);
      i1.pause();
      window.removeEventListener("click", navigate);
      window.removeEventListener("keydown", navigate);
      window.removeEventListener("wheel", navigate);
    };
  }, [endPhase, router]);

  const answerQuestion = (answerIndex: number) => {
    const question = questions[currentQuestion];
    const selectedAnswer = question.answers[answerIndex];
    const updatedScores = applyAnswer(scores, selectedAnswer.weights);
    const nextQuestion = currentQuestion + 1;

    setQuizState((prev) => ({
      ...prev,
      currentQuestion: nextQuestion,
      answers: { ...prev.answers, [question.id]: answerIndex },
      scores: updatedScores,
    }));

    if (nextQuestion >= questions.length) {
      const resultType = findResult(updatedScores).key;
      clearProgress();
      resultKeyRef.current = resultType;
      setEndPhase("hmm");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <ParticleOverlay />
      {currentScene < scenes.length ? (
        <>
          <div className="relative h-screen w-full">
            <IntroScene
              key={`scene-${currentScene}`}
              scene={scenes[currentScene]}
              onNext={advanceScene}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-black z-20"
              animate={{ opacity: fading ? 1 : 0 }}
              transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
            />
            {/* Skip button from b.png onwards */}
            {currentScene >= 2 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.08, boxShadow: "0 0 10px #A88458" }}
                whileTap={{ scale: 0.92, filter: "brightness(0.8)" }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                onClick={() => { playClick(); setCurrentScene(scenes.length); }}
                className="absolute top-5 right-5 z-30 rounded-lg px-4 py-1.5 text-xs font-semibold text-amber-950 cursor-pointer"
                style={{
                  fontFamily: "var(--font-irish-grover)",
                  background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
                  border: "1.5px solid #462901",
                }}
              >
                Skip to Questions
              </motion.button>
            )}
          </div>
        </>
      ) : endPhase === "hmm" || endPhase === "loading" ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid min-h-screen place-items-center bg-black"
        >
          <div
            className="h-10 w-10 rounded-full border-4"
            style={{
              borderColor: "#A88458",
              borderTopColor: "transparent",
              animation: "spin 1.2s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </motion.div>
      ) : endPhase === "endScene" ? (
        <motion.div
          key="end-scene"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-screen w-full"
        >
          <Image
            src="/i.png"
            alt="End scene"
            fill
            className="object-contain"
            priority
          />
          <div
            id="end-scene-fade"
            className="pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: 0 }}
          />
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {currentQuestion < questions.length ? (
            <QuizStep key={`question-${currentQuestion}`} question={questions[currentQuestion]} onAnswer={answerQuestion} progress={questionProgress} />
          ) : null}
        </AnimatePresence>
      )}
    </div>
  );
}
