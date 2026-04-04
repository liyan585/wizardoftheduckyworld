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
    text: "A cloaked figure offers you unlimited free cloud storage  forever, no strings, no cost. Your gut whispers...",
    bg: "/q1withoutoptions.png",
    answers: [
      { label: "Free? Yeah, what's the catch.", weights: { INTJ: 2, ENTP: 1 } },
      { label: "Free is free. Future me can deal.", weights: { ESFP: 2, ENFP: 1 } },
      { label: "If it's free, I'm the product. Seen this before.", weights: { INTP: 2, INFJ: 1 } },
      { label: "Feels off? I'm gone.", weights: { ISTP: 2, ISFJ: 1 } },
    ],
  },
  {
    id: 2,
    text: "The wizard produces a glowing orb pulsing with the words: OPEN SOURCE. What do your eyes see?",
    bg: "/q2withoutoptions.png",
    answers: [
      { label: "If I can read it, I trust it. Otherwise… we ball.", weights: { INTP: 2, INTJ: 1 } },
      { label: "I don't open repos. I just assume smarter people did.", weights: { ENFP: 2, ESFP: 1 } },
      { label: "Stars + recent commit = spiritually verified.", weights: { ESTJ: 2, ISTJ: 1 } },
      { label: "Open source just means the drama is public.", weights: { ENTP: 2, INFP: 1 } },
    ],
  },
  {
    id: 3,
    text: "Brace yourself, seeker. Every photo you've ever taken lives unencrypted on a server controlled by someone else. Right now. Always has. You...",
    bg: "/q3withoutoptions.png",
    answers: [
      { label: "Oh no. We migrate. Right now.", weights: { ENTJ: 2, INTJ: 1 } },
      { label: "That's… concerning. Anyway.", weights: { ISFP: 2, ESFP: 1 } },
      { label: "My server, my rules.", weights: { ISTP: 2, INTP: 1 } },
      { label: "They had a lock icon. It felt legit.", weights: { ESFJ: 2, ISFJ: 1 } },
    ],
  },
  {
    id: 4,
    text: "The wizard leans forward, eyes narrowing. 'What is end-to-end encryption to you - truly?'",
    bg: "/q4withoutoptions.png",
    answers: [
      { label: "Bare minimum. No encryption, no install.", weights: { ISTJ: 2, ESTJ: 1 } },
      { label: "I look for it. Rare, but I notice.", weights: { INFJ: 2, ENFJ: 1 } },
      { label: "There's a lock icon. Good enough.", weights: { ESFP: 2, ESTP: 1 } },
      { label: "That's step one. The real stuff is deeper.", weights: { INTJ: 2, ISTP: 1 } },
    ],
  },
  {
    id: 5,
    text: "A goblin, small, greedy, surprisingly fast snatches your phone and vanishes into the fog. Your very first thought is...",
    bg: "/q5withoutoptions.png",
    answers: [
      { label: "Already handled. I was ready for this goblin.", weights: { ESTJ: 2, ESTP: 1 } },
      { label: "My entire life was on that phone.", weights: { INFP: 2, ISFP: 1 } },
      { label: "Data's gone. The goblin has it.", weights: { ENFJ: 2, ESFJ: 1 } },
      { label: "2FA is on. I think?", weights: { ESTP: 2, ENTP: 1 } },
    ],
  },
  {
    id: 6,
    text: "Look into this mirror, seeker. Every company that holds your data stares back  smiling. What stirs inside you?",
    bg: "/q6withoutoptions.png",
    answers: [
      { label: "I've been degoogling since 2019. Not stopping now.", weights: { INTJ: 2, INFJ: 1 } },
      { label: "It already knows everything. What is the point?", weights: { ISFP: 2, INFP: 1 } },
      { label: "This is a problem everyone should hear about it.", weights: { ENFJ: 2, ENTJ: 1 } },
      { label: "The ads work. I got good headphones.", weights: { ENTP: 2, ESTP: 1 } },
    ],
  },
  {
    id: 7,
    text: "The wizard unfurls a scroll. Every app you use has a privacy-first, open-source alternative listed beside it. What do you do?",
    bg: "/q7withoutoptions.png",
    answers: [
      { label: "I switch immediately. Cause why not?", weights: { ENTJ: 2, ESTJ: 1 } },
      { label: "I will research every option first. See you in three weeks.", weights: { INFP: 2, INTP: 1 } },
      { label: "I want to switch. Then I see the UI.", weights: { ENFP: 2, ISFP: 1 } },
      { label: "I'm testing all of them in a controlled environment.", weights: { ISTJ: 2, ISTP: 1 } },
    ],
  },
  {
    id: 8,
    text: "The wizard already knows the answer. He asks about your passwords anyway  to see if you'll be honest.",
    bg: "/q8withoutoptions.png",
    answers: [
      { label: "20+ chars. Unique. Managed. Don't @ me.", weights: { ISTP: 2, ISTJ: 1 } },
      { label: "Same password. Slight remix. I know.", weights: { ESFP: 2, ENFJ: 1 } },
      { label: "Written down. Offline. Untouchable.", weights: { ISFJ: 2, INFJ: 1 } },
      { label: "Random + manager. No one understands it.", weights: { ESTP: 2, ESFJ: 1 } },
    ],
  },
  {
    id: 9,
    text: "A portal shimmers. Beyond it  a world where every person controls their own data. No surveillance. No brokers. No tracking. You step through and feel...",
    bg: "/q9withoutoptions.png",
    answers: [
      { label: "Home. When do I move in?", weights: { INFJ: 2, INTJ: 1 } },
      { label: "Relief. Didn't know it was this heavy.", weights: { ISFJ: 2, ISFP: 1 } },
      { label: "Looks great. Who runs this?", weights: { ENTP: 2, ENTJ: 1 } },
      { label: "…What do I complain about now?", weights: { ENFP: 2, ESFJ: 1 } },
    ],
  },
  {
    id: 10,
    text: "And finally, seeker, when you are gone, feathers scattered, pond empty, what becomes of your digital data?",
    bg: "/q10withoutoptions.png",
    answers: [
      { label: "Handled. There's a plan. I think.", weights: { ENTJ: 2, ESTJ: 1 } },
      { label: "Floating across accounts I don't remember signing up for.", weights: { ESFJ: 2, ENFP: 1 } },
      { label: "Encrypted. Access is a team effort.", weights: { INTP: 2, ISTP: 1 } },
      { label: "Future me will figure it out.", weights: { ESTP: 2, INFP: 1 } },
    ],
  },
];
