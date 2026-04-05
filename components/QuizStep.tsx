"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Question } from "../data/questions";
import { playClick, unlockAudio } from "../lib/clickSound";

type QuizStepProps = {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  progress: number;
};

/*
 * All positions derived from Figma specs (frame: 1920 × 1080 px)
 * Card: left 1064px, top 81px, 606.74 × 919px
 * Buttons inside card: left 106.06px (→ 1170.06px abs), width 394.62px, height 78.21px
 * Button tops (card-relative): 437 | 538.21 | 639.42 | 740.64  → add card top 81
 * Sorcerer Ducky: card-relative left 125.09px, top 841.85px, width 356.56px
 */
const BTN_LEFT   = "60.94%";  // 1170.06 / 1920
const BTN_WIDTH  = "20.55%";  // 394.62 / 1920
const BTN_HEIGHT = "7.24%";   // 78.21 / 1080

const OPTION_TOPS = [
  "47.96%",  // (81 + 437)    / 1080
  "57.33%",  // (81 + 538.21) / 1080
  "66.71%",  // (81 + 639.42) / 1080
  "76.08%",  // (81 + 740.64) / 1080
];

const FOOTER_LEFT  = "61.93%";  // (1064 + 125.09) / 1920
const FOOTER_WIDTH = "18.57%";  // 356.56 / 1920
const FOOTER_TOP   = "85.45%";  // (81 + 841.85) / 1080

export default function QuizStep({ question, onAnswer }: QuizStepProps) {
  const [showFact, setShowFact] = useState(false);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen w-full items-center justify-center bg-black"
    >
      {/* Container matches image exactly — max width by height, or max height by width */}
      <div
        className="relative"
        style={{
          aspectRatio: "1920 / 1080",
          width: "min(100vw, calc(100vh * 1920 / 1080))",
          height: "min(100vh, calc(100vw * 1080 / 1920))",
        }}
      >
        <Image
          src={question.bg}
          alt={`Question ${question.id}`}
          fill
          className="object-fill"
          priority
        />

        {/* Scroll of Truth - i icon */}
        <motion.button
          onClick={() => { playClick(); setShowFact(!showFact); }}
          animate={{
            boxShadow: [
              "0 0 4px #A88458, 0 0 8px rgba(168,132,88,0.4)",
              "0 0 10px #FFEBD4, 0 0 20px rgba(168,132,88,0.6)",
              "0 0 4px #A88458, 0 0 8px rgba(168,132,88,0.4)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: 1.15, boxShadow: "0 0 16px #FFEBD4, 0 0 30px rgba(168,132,88,0.8)" }}
          whileTap={{ scale: 0.9 }}
          className="scroll-truth-icon"
          style={{
            position: "absolute",
            top: "2%",
            left: "2%",
            borderRadius: "50%",
            background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
            border: "max(1px, 0.1vw) solid #462901",
            fontFamily: "var(--font-irish-grover)",
            color: "#462901",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
          }}
        >
          i
        </motion.button>

        {/* Fact popup */}
        <AnimatePresence>
          {showFact && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowFact(false)}
              className="scroll-truth-fact"
              style={{
                position: "absolute",
                top: "7%",
                left: "2%",
                background: "rgba(0, 0, 0, 0.85)",
                border: "max(1px, 0.1vw) solid #A88458",
                zIndex: 30,
                cursor: "pointer",
              }}
            >
              <p
                className="scroll-truth-fact-text"
                style={{
                  fontFamily: "var(--font-irish-grover)",
                  color: "#FFEBD4",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                <span className="scroll-truth-fact-title" style={{ color: "#A88458" }}>Scroll of Truth</span>
                <br />
                {question.fact}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {question.answers.map((answer, idx) => (
          <motion.button
            key={idx}
            onClick={() => { unlockAudio(); playClick(); onAnswer(idx); }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 0.6vw #A88458" }}
            whileTap={{ scale: 0.96, boxShadow: "0 0 0.3vw #462901", filter: "brightness(0.88)" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              position: "absolute",
              top: OPTION_TOPS[idx],
              left: BTN_LEFT,
              width: BTN_WIDTH,
              height: BTN_HEIGHT,
              background: "linear-gradient(273.35deg, #A88458 -13.8%, #FFEBD4 54.84%, #E0C8AA 92.96%)",
              border: "max(1px, 0.154vw) solid #462901",
              borderRadius: "0.833vw",
              fontFamily: "var(--font-irish-grover)",
              fontSize: "clamp(8px, 0.917vw, 18px)",
              color: "#462901",
              textAlign: "center",
              lineHeight: "1.19",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 1%",
            }}
          >
            {answer.label}
          </motion.button>
        ))}

        {/* Sorcerer Ducky footer text */}
        <p
          style={{
            position: "absolute",
            top: FOOTER_TOP,
            left: FOOTER_LEFT,
            width: FOOTER_WIDTH,
            fontFamily: "var(--font-irish-grover)",
            fontSize: "clamp(10px, 1.894vw, 36px)",
            lineHeight: "1.21",
            textAlign: "center",
            color: "#462901",
            margin: 0,
          }}
        >
          Wizard Ducky
        </p>
      </div>
    </motion.div>
  );
}
