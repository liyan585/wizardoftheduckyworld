"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Question } from "../data/questions";

type QuizStepProps = {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  progress: number;
};

// Vertical start position (% of image height) for each of the 4 option slots,
// measured from question_1.png reference.
const OPTION_TOPS = ["56.5%", "66%", "75.5%", "85%"];

export default function QuizStep({ question, onAnswer }: QuizStepProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen w-full items-center justify-center bg-black"
    >
      {/* Wrapper maintains the 16:9 aspect ratio of the Figma frame */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "16 / 9", maxHeight: "100vh" }}
      >
        <Image
          src={question.bg}
          alt={`Question ${question.id}`}
          fill
          className="object-contain"
          priority
        />

        {question.answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            style={{
              position: "absolute",
              top: OPTION_TOPS[idx],
              left: "59%",
              right: "4%",
              height: "8%",
            }}
            className="flex items-center px-3 text-left text-[clamp(9px,1vw,13px)] font-medium leading-tight
                       text-amber-950 bg-amber-50/60 border border-amber-800/40 rounded-sm
                       hover:bg-amber-100/80 transition-colors"
          >
            {answer.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
