import { questions } from "../data/questions";
import { results, ResultType } from "../data/results";

export type Scores = Record<string, number>;

export const initialScores = (): Scores => {
  const allKeys = new Set<string>();
  questions.forEach((q) => {
    q.answers.forEach((a) => Object.keys(a.weights).forEach((k) => allKeys.add(k.toLowerCase())));
  });
  return Array.from(allKeys).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as Scores);
};

export const applyAnswer = (scores: Scores, answerWeights: Record<string, number>): Scores => {
  const next = { ...scores };
  Object.entries(answerWeights).forEach(([key, value]) => {
    const lower = key.toLowerCase();
    next[lower] = (next[lower] ?? 0) + value;
  });
  return next;
};

export const findResult = (scores: Scores): ResultType => {
  const winner = Object.entries(scores).reduce(
    (acc, [key, value]) => {
      if (value > acc.score) {
        return { type: key, score: value };
      }
      return acc;
    },
    { type: "intj", score: Number.NEGATIVE_INFINITY }
  );

  const result = results.find((r) => r.key === winner.type);
  if (!result) {
    return results[0];
  }

  return result;
};

export const saveProgress = (state: QuizState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("duckyQuiz", JSON.stringify(state));
};

export const loadProgress = (): QuizState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("duckyQuiz");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuizState;
    return parsed;
  } catch {
    return null;
  }
};

export type QuizState = {
  currentQuestion: number;
  answers: Record<number, number>;
  scores: Scores;
};

export const clearProgress = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("duckyQuiz");
};
