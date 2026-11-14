import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Mic, RotateCcw, Sparkles, Radio } from "lucide-react";

/**
 * Module B: real-time simulation of the speaking evaluator.
 * A 60-second speech plays out; the transcript builds word by word while
 * the student "speaks", and feedback appears as soon as the speech ends.
 * The speech and feedback are illustrative samples.
 */

const SPEECH =
  "Good morning everyone. Today I want to talk about why reading a little every day can change the way we think, the way we speak, and even the way we dream. When I was younger, I didn't enjoy reading at all. Books felt long and slow, and I always wanted to play outside instead. Then one summer my grandmother gave me a small book of adventure stories, and she asked me to read just one page every night. One page became two, two became a chapter, and soon I was finishing whole books. Reading taught me new words, but it also taught me patience and imagination. When we read, we travel to new places without ever leaving our room. So my challenge to all of you is simple: read just one page tonight. You might be surprised where it takes you. Thank you.";
const WORDS = SPEECH.split(" ");
const RECORD_MS = 60_000;
const EVAL_MS = 900;
const CHUNK_MS = 250;
const BARS = 28;

type Phase = "idle" | "recording" | "evaluating" | "done";

const formatTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export const SpeakingDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setPhase("recording");
    setElapsed(0);
    const start = performance.now();
    let raf = 0;
    let evalTimer: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const e = Math.min(now - start, RECORD_MS);
      setElapsed(e);
      if (e < RECORD_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("evaluating");
        evalTimer = setTimeout(() => setPhase("done"), EVAL_MS);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(evalTimer);
    };
  }, [inView, run]);

  const progress = elapsed / RECORD_MS;
  const recording = phase === "recording";
  const shownWords = recording ? Math.floor(progress * WORDS.length) : phase === "idle" ? 0 : WORDS.length;
  const chunks = Math.floor(elapsed / CHUNK_MS);

  // Keep the newest words in view as the transcript grows
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shownWords]);

  return (
    <div ref={ref} className="overflow-hidden rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">speaking-evaluator · real-time simulation</span>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restart
        </button>
      </div>

      {/* Speech progress */}
      <div className="h-0.5 w-full bg-border">
        <div className="h-full bg-primary" style={{ width: `${(phase === "idle" ? 0 : recording ? progress : 1) * 100}%` }} />
      </div>

      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Recorder */}
        <div className="flex flex-col items-center justify-center gap-5 border-b border-border p-6 md:border-b-0 md:border-r">
          <div className="relative">
            {recording && (
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/30 [animation-duration:2.4s]" />
            )}
            <span
              className={`relative flex h-16 w-16 items-center justify-center rounded-full ${
                recording ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <Mic className="h-7 w-7" />
            </span>
          </div>

          <div className="flex h-14 w-full max-w-[260px] items-center justify-center gap-[3px]" aria-hidden>
            {Array.from({ length: BARS }, (_, i) => (
              <span
                key={i}
                className={`w-1.5 origin-center rounded-full ${recording ? "animate-wave bg-primary" : "bg-border"}`}
                style={{
                  height: `${30 + ((i * 37) % 70)}%`,
                  animationDelay: `${(i % 7) * 0.16}s`,
                  transform: recording ? undefined : "scaleY(0.25)",
                }}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="font-mono text-2xl tabular-nums">
              {formatTime(phase === "idle" ? 0 : recording ? elapsed : RECORD_MS)}
              <span className="text-base text-muted-foreground"> / 1:00</span>
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              {recording ? "recording…" : phase === "idle" ? "ready" : "speech ended"}
            </p>
          </div>

          <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <Radio className={`h-3.5 w-3.5 ${recording ? "text-primary" : ""}`} />
            WebSocket · {phase === "idle" ? 0 : chunks} audio chunks streamed
          </p>
        </div>

        {/* Transcript + feedback */}
        <div className="flex flex-col p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Live transcript</p>
            <span className="font-mono text-[10px] text-muted-foreground">gpt-realtime-whisper</span>
          </div>
          <div ref={transcriptRef} className="mt-3 h-40 overflow-y-auto pr-2 scroll-smooth">
            <p className="text-[15px] leading-relaxed">
              {WORDS.slice(0, shownWords).join(" ")}
              {recording && (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-blink bg-primary" />
              )}
            </p>
          </div>

          <div className="mt-4 min-h-[124px] border-t border-border pt-4">
            {phase === "evaluating" && (
              <p className="flex items-center gap-2 font-mono text-xs text-primary">
                <Sparkles className="h-4 w-4 animate-pulse" /> Transcript ready, evaluating…
              </p>
            )}
            {phase === "done" && (
              <div className="animate-fade-in-up rounded-sm border-l-2 border-primary bg-primary/[0.07] p-4">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" /> Feedback ready
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">sample</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li>
                    <span className="text-foreground">Strength:</span> a personal story that makes the message memorable.
                  </li>
                  <li>
                    <span className="text-foreground">Try next:</span> pause before the closing challenge to let it land.
                  </li>
                </ul>
              </div>
            )}
            {(phase === "idle" || recording) && (
              <p className="font-mono text-[11px] text-muted-foreground">
                Feedback appears the moment the speech ends.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
