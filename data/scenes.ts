export type Scene = {
  id: number;
  image?: string;
  video?: string;
  instant?: boolean;
  audio?: string;
};

export const scenes: Scene[] = [
  { id: 1, image: "/y.png" },
  { id: 2, video: "/1.mp4" },
  { id: 3, image: "/b.png", audio: "/b1.mp3" },
  { id: 4, image: "/c.png", audio: "/c1.mp3" },
  { id: 5, image: "/d.png", audio: "/d1.mp3" },
  { id: 6, image: "/e.png", audio: "/e1.mp3" },
  { id: 7, image: "/f.png", audio: "/f1.mp3" },
  { id: 8, image: "/g.png", audio: "/g1.mp3" },
  { id: 9, image: "/h.png", audio: "/h1.mp3" },
];
