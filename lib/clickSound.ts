let ctx: AudioContext | null = null;
let audioUnlocked = false;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

/** Call from any user-gesture handler to unlock audio playback on mobile */
export function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  // Resume AudioContext if suspended
  const ac = getCtx();
  if (ac.state === "suspended") ac.resume().catch(() => {});

  // Play a silent HTML audio element to unlock HTMLAudioElement.play()
  const silent = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");
  silent.play().catch(() => {});
}

export function playClick() {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(120, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ac.currentTime + 0.15);

    gain.gain.setValueAtTime(0.129, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.18);

    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.18);
  } catch {}
}
