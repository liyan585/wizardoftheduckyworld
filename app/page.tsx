"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import IntroScene from "../components/IntroScene";
import QuizStep from "../components/QuizStep";
import { scenes } from "../data/scenes";
import { questions } from "../data/questions";
import { findResult, initialScores, applyAnswer, loadProgress, saveProgress, clearProgress, QuizState } from "../lib/scoring";

export default function Home() {
  const router = useRouter();

  const [currentScene, setCurrentScene] = useState(0);
  const lastSceneClick = useRef(0);
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

  const currentResult = useMemo(() => {
    if (currentQuestion >= questions.length) {
      return findResult(scores);
    }
    return null;
  }, [currentQuestion, scores]);

  const advanceScene = () => {
    const now = Date.now();
    if (now - lastSceneClick.current < 400) return;
    lastSceneClick.current = now;
    setCurrentScene((prev) => prev + 1);
  };

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
      router.push(`/result/${resultType}`);
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentScene < scenes.length ? (
          <IntroScene key={`scene-${currentScene}`} scene={scenes[currentScene]} onNext={advanceScene} />
        ) : currentQuestion < questions.length ? (
          <QuizStep key={`question-${currentQuestion}`} question={questions[currentQuestion]} onAnswer={answerQuestion} progress={questionProgress} />
        ) : currentResult ? (
          <div className="grid min-h-screen place-items-center text-center">
            <p className="text-xl font-semibold">Redirecting to your final result...</p>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
