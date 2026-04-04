export type Scene = {
  id: number;
  image?: string;
  video?: string;
  instant?: boolean;
  audio?: string;
};

export const scenes: Scene[] = [
  { id: 1, image: "/wizardoftheducky/y.png" },
  { id: 2, video: "/wizardoftheducky/1.mp4" },
  { id: 3, image: "/wizardoftheducky/b.png", audio: "/wizardoftheducky/b1.mp3" },
  { id: 4, image: "/wizardoftheducky/c.png", audio: "/wizardoftheducky/c1.mp3" },
  { id: 5, image: "/wizardoftheducky/d.png", audio: "/wizardoftheducky/d1.mp3" },
  { id: 6, image: "/wizardoftheducky/e.png", audio: "/wizardoftheducky/e1.mp3" },
  { id: 7, image: "/wizardoftheducky/f.png", audio: "/wizardoftheducky/f1.mp3" },
  { id: 8, image: "/wizardoftheducky/g.png", audio: "/wizardoftheducky/g1.mp3" },
  { id: 9, image: "/wizardoftheducky/h.png", audio: "/wizardoftheducky/h1.mp3" },
];
