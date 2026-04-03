export type Answer = {
  label: string;
  weights: Record<string, number>;
};

export type Question = {
  id: number;
  text: string;
  bg: string;
  answers: Answer[];
};

export const questions: Question[] = [
  {
    id: 1,
    text: "When collaborating online, you're typically:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Clear and logical", weights: { INTJ: 2, ISTJ: 1, ENTP: 0, ENFP: 0 } },
      { label: "Fun and supportive", weights: { ENFP: 2, ESFP: 1, INTJ: 0, ISTJ: 0 } },
      { label: "Inventive and sketching", weights: { INTP: 2, ENTP: 1, ISFJ: 0 } },
      { label: "Protective and steady", weights: { ISFJ: 2, ISTJ: 1, ENFP: 0 } },
    ],
  },
  {
    id: 2,
    text: "Your avatar in group chat would be:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Minimal, sleek", weights: { INTJ: 2, INTP: 1, ENFP: 0 } },
      { label: "Bright memes", weights: { ENFP: 2, ESFP: 1, INTJ: 0 } },
      { label: "Helpful checklist", weights: { ISTJ: 2, ESTJ: 1 } },
      { label: "Art and creative flow", weights: { INFP: 2, ISFP: 1 } },
    ],
  },
  {
    id: 3,
    text: "In a hackathon, you focus on:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Strategy and structure", weights: { INTJ: 2, ENTJ: 1 } },
      { label: "UI energy and look", weights: { ESFP: 2, ENFP: 1 } },
      { label: "Problem-solving logic", weights: { INTP: 2, ISTP: 1 } },
      { label: "User empathy", weights: { ISFJ: 2, INFJ: 1 } },
    ],
  },
  {
    id: 4,
    text: "When you see a code bug, you:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Document root cause", weights: { ISTJ: 2, INTJ: 1 } },
      { label: "Experiment quick fixes", weights: { ENTP: 2, ESTP: 1 } },
      { label: "Ask team how it feels", weights: { ENFP: 2, INFJ: 1 } },
      { label: "Stay calm and persist", weights: { ISFJ: 2, ISTP: 1 } },
    ],
  },
  {
    id: 5,
    text: "You share your best productivity tip as:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Long-term systems", weights: { INTJ: 2, ISTJ: 1 } },
      { label: "Mindfulness boost", weights: { INFP: 2, ISFP: 1 } },
      { label: "Networking and connections", weights: { ENFJ: 2, ESFJ: 1 } },
      { label: "Quick wins", weights: { ESTP: 2, ENTP: 1 } },
    ],
  },
  {
    id: 6,
    text: "A friend calls you the team's:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Architect", weights: { INTJ: 2, INFJ: 1 } },
      { label: "Firestarter", weights: { ENFP: 2, ESFP: 1 } },
      { label: "Keystone", weights: { ISFJ: 2, ISTJ: 1 } },
      { label: "Brainstormer", weights: { ENTP: 2, INTP: 1 } },
    ],
  },
  {
    id: 7,
    text: "Your favorite digital habit is:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Tracking progress", weights: { ISTJ: 2, ENTJ: 1 } },
      { label: "Sharing stories", weights: { ENFP: 2, ESFJ: 1 } },
      { label: "Learning new frameworks", weights: { INTP: 2, INTJ: 1 } },
      { label: "Clarifying relationships", weights: { INFJ: 2, INFP: 1 } },
    ],
  },
  {
    id: 8,
    text: "On weekend coding you are:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Prototype fast", weights: { ESTP: 2, ENTP: 1 } },
      { label: "Perfecting UX", weights: { INFP: 2, ENFP: 1 } },
      { label: "Rewriting architecture", weights: { INTJ: 2, ISTJ: 1 } },
      { label: "Supporting friends", weights: { ISFJ: 2, ESFJ: 1 } },
    ],
  },
  {
    id: 9,
    text: "Favorite online community vibe:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Deep thinkers", weights: { INTJ: 2, INTP: 1 } },
      { label: "Playful creatives", weights: { ENFP: 2, ISFP: 1 } },
      { label: "Organized experts", weights: { ISTJ: 2, ENTJ: 1 } },
      { label: "Empathy champions", weights: { INFJ: 2, ESFJ: 1 } },
    ],
  },
  {
    id: 10,
    text: "Your digital bio says you are:",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Strategic thinker", weights: { INTJ: 2, INFJ: 1 } },
      { label: "Community builder", weights: { ENFP: 2, ESFJ: 1 } },
      { label: "Pragmatic doer", weights: { ISTJ: 2, ESTP: 1 } },
      { label: "Curious explorer", weights: { INTP: 2, ENTP: 1 } },
    ],
  },
];
