import { useEffect, useState } from "react";
import { ArrowDown, CheckCircle2, Layers, RotateCw, Timer, Zap, ZapOff } from "lucide-react";

/**
 * Module A: animated system diagram of the summary pipeline.
 * Shows the request policy: 40s timeout per LLM call, 2 retries, a
 * semaphore of 8 concurrent requests per GLM key (to avoid 429s), and
 * failover to OpenAI. Toggling an outage reroutes jobs to the fallback.
 */

const TIMEOUT_S = 40;
const RETRIES = 2;
const SEMAPHORE = 8;

const ROUTES = {
  glm1: "M140 196 H610 C630 196 630 76 650 76 H820 C840 76 840 196 855 196 H990",
  glm2: "M140 196 H990",
  openai: "M140 196 H610 C630 196 630 311 650 311 H820 C840 311 840 196 855 196 H990",
};

const NORMAL_STEPS = [
  "Acquire semaphore slot (≤ 8 / key)",
  "Call GLM",
  "Response within 40s",
  "Release slot",
  "Summary ✓",
];
const OUTAGE_STEPS = [
  "Attempt 1",
  "Timeout 40s",
  "Retry 1",
  "Timeout 40s",
  "Retry 2",
  "Timeout 40s",
  "Fail over → OpenAI",
  "Summary ✓",
];

type NodeState = "idle" | "active" | "down";

const nodeClass = (s: NodeState) =>
  s === "down"
    ? "fill-destructive/10 stroke-destructive"
    : s === "active"
      ? "fill-primary/10 stroke-primary"
      : "fill-card stroke-border";

const SvgNode = ({
  x,
  y,
  w = 120,
  h = 60,
  title,
  sub,
  state = "idle",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub: string;
  state?: NodeState;
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={6} className="fill-card" />
    <rect x={x} y={y} width={w} height={h} rx={6} strokeWidth={1.5} className={nodeClass(state)} />
    <text x={x + 12} y={y + 26} className="fill-foreground text-[14px] font-medium">
      {title}
    </text>
    <text
      x={x + 12}
      y={y + 45}
      className={`font-mono text-[11px] ${state === "down" ? "fill-destructive" : "fill-muted-foreground"}`}
    >
      {sub}
    </text>
  </g>
);

/** GLM provider node with a live 8-slot semaphore and a 40s timeout badge */
const GlmNode = ({ y, name, inFlight, down }: { y: number; name: string; inFlight: number; down: boolean }) => {
  const x = 650;
  const w = 170;
  return (
    <g>
      <rect x={x} y={y} width={w} height={100} rx={6} className="fill-card" />
      <rect x={x} y={y} width={w} height={100} rx={6} strokeWidth={1.5} className={nodeClass(down ? "down" : "active")} />
      <text x={x + 12} y={y + 24} className="fill-foreground text-[14px] font-medium">
        {name}
      </text>
      {/* Timeout badge */}
      <rect
        x={x + w - 58}
        y={y + 10}
        width={48}
        height={18}
        rx={9}
        strokeWidth={1}
        className={down ? "fill-destructive/15 stroke-destructive" : "fill-card stroke-border"}
      />
      <text
        x={x + w - 34}
        y={y + 23}
        textAnchor="middle"
        className={`font-mono text-[10px] ${down ? "fill-destructive" : "fill-muted-foreground"}`}
      >
        {down ? "40s ✕" : "⏱ 40s"}
      </text>
      <text x={x + 12} y={y + 44} className={`font-mono text-[11px] ${down ? "fill-destructive" : "fill-muted-foreground"}`}>
        {down ? "timed out · retrying" : "primary"}
      </text>
      {/* Semaphore */}
      <text x={x + 12} y={y + 64} className="fill-muted-foreground font-mono text-[10px] uppercase tracking-wider">
        semaphore
      </text>
      <text
        x={x + w - 12}
        y={y + 64}
        textAnchor="end"
        className={`font-mono text-[10px] ${down ? "fill-destructive" : "fill-primary"}`}
      >
        {down ? `0/${SEMAPHORE}` : `${inFlight}/${SEMAPHORE} in flight`}
      </text>
      {Array.from({ length: SEMAPHORE }, (_, i) => (
        <rect
          key={i}
          x={x + 12 + i * 19}
          y={y + 72}
          width={14}
          height={14}
          rx={2}
          strokeWidth={1}
          className={
            down
              ? "fill-none stroke-destructive/60"
              : i < inFlight
                ? "fill-primary stroke-primary transition-[fill] duration-300"
                : "fill-none stroke-border transition-[fill] duration-300"
          }
        />
      ))}
    </g>
  );
};

export const ReliabilityDiagram = () => {
  const [outage, setOutage] = useState(false);
  const [inFlight, setInFlight] = useState<[number, number]>([6, 5]);
  const [step, setStep] = useState(0);

  // Semaphore occupancy fluctuates, never exceeding the limit of 8
  useEffect(() => {
    if (outage) return;
    const id = setInterval(() => {
      setInFlight([4 + Math.floor(Math.random() * 5), 4 + Math.floor(Math.random() * 5)]);
    }, 900);
    return () => clearInterval(id);
  }, [outage]);

  // Walk through the attempt timeline
  const steps = outage ? OUTAGE_STEPS : NORMAL_STEPS;
  useEffect(() => {
    setStep(0);
    const id = setInterval(() => setStep((s) => (s + 1) % (steps.length + 2)), 900);
    return () => clearInterval(id);
  }, [outage, steps.length]);

  const packets = outage
    ? [0, 0.8, 1.6, 2.4].map((b) => ({ route: ROUTES.openai, begin: b }))
    : [0, 0.8, 1.6, 2.4].map((b, i) => ({ route: i % 2 ? ROUTES.glm2 : ROUTES.glm1, begin: b }));

  const policy = [
    { icon: Timer, title: `${TIMEOUT_S}s timeout`, text: "Every LLM call is cut off after 40 seconds instead of hanging." },
    { icon: RotateCw, title: `${RETRIES} retries`, text: "A timed-out call is retried twice before the router gives up on GLM." },
    {
      icon: Layers,
      title: `Semaphore · ${SEMAPHORE} per key`,
      text: "At most 8 concurrent requests per GLM key, to stay under the rate limit and avoid 429 errors.",
    },
  ];

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      {/* Control bar */}
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          <span
            className={`mr-2 font-mono text-[11px] uppercase tracking-wider ${outage ? "text-destructive" : "text-primary"}`}
          >
            {outage ? "● Provider outage" : "● Normal"}
          </span>
          <span className="text-muted-foreground">
            {outage
              ? "GLM calls hit the 40s timeout, retry twice, then fail over to OpenAI."
              : "Two GLM keys, each capped at 8 concurrent requests."}
          </span>
        </p>
        <button
          type="button"
          onClick={() => setOutage((o) => !o)}
          className={`inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-sm border px-3 text-sm font-medium transition-colors ${
            outage
              ? "border-primary bg-primary text-primary-foreground"
              : "border-destructive/50 text-destructive hover:bg-destructive/10"
          }`}
        >
          {outage ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
          {outage ? "Restore GLM" : "Simulate GLM outage"}
        </button>
      </div>

      {/* Desktop: animated SVG */}
      <div className="hidden px-4 py-6 md:block">
        <svg
          viewBox="0 0 1100 370"
          className="h-auto w-full"
          role="img"
          aria-label="Class summary pipeline with 40 second timeouts, 2 retries, a semaphore of 8 per GLM key, and OpenAI failover"
        >
          <defs>
            <marker id="rd-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" className={outage ? "fill-destructive" : "fill-muted-foreground"} />
            </marker>
          </defs>

          {/* Connectors: inactive first, so active routes draw on top */}
          {Object.entries(ROUTES)
            .map(([k, d]) => ({ k, d, active: outage ? k === "openai" : k !== "openai" }))
            .sort((a, b) => Number(a.active) - Number(b.active))
            .map(({ k, d, active }) => (
              <path
                key={k}
                d={d}
                fill="none"
                strokeWidth={active ? 2 : 1.5}
                strokeDasharray={active ? undefined : "5 5"}
                className={active ? "stroke-primary/60" : "stroke-border"}
              />
            ))}

          {/* Retry loop: GLM back into the router */}
          <path
            d="M650 50 C590 50 556 70 556 154"
            fill="none"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            markerEnd="url(#rd-arrow)"
            className={outage ? "stroke-destructive" : "stroke-muted-foreground/60"}
          />
          <text
            x={604}
            y={40}
            textAnchor="middle"
            className={`font-mono text-[11px] ${outage ? "fill-destructive" : "fill-muted-foreground"}`}
          >
            ↻ retry ×{RETRIES}
          </text>

          {/* Failover label */}
          <text
            x={622}
            y={270}
            textAnchor="end"
            className={`font-mono text-[11px] ${outage ? "fill-primary" : "fill-muted-foreground"}`}
          >
            failover after {RETRIES} retries ↘
          </text>

          {/* Moving jobs (under nodes so they "enter" each step) */}
          <g key={outage ? "outage" : "normal"} className="motion-reduce:hidden">
            {packets.map((p, i) => (
              <circle key={i} r={5} className="fill-primary">
                <animateMotion dur="3.2s" repeatCount="indefinite" begin={`${p.begin}s`} path={p.route} />
              </circle>
            ))}
          </g>

          <SvgNode x={20} y={166} title="Class ends" sub="job per student" />
          <g>
            <rect x={170} y={166} width={120} height={60} rx={6} strokeWidth={1.5} className="fill-card stroke-border" />
            <text x={182} y={192} className="fill-foreground text-[14px] font-medium">
              Redis queue
            </text>
            {[0, 1, 2, 3].map((j) => (
              <rect key={j} x={182 + j * 24} y={202} width={18} height={12} rx={2} className="fill-primary/40" />
            ))}
          </g>
          <SvgNode x={330} y={166} title="Worker" sub="builds prompt" />

          {/* Router with policy */}
          <g>
            <rect x={490} y={154} width={120} height={84} rx={6} className="fill-card" />
            <rect x={490} y={154} width={120} height={84} rx={6} strokeWidth={1.5} className={nodeClass("active")} />
            <text x={502} y={178} className="fill-foreground text-[14px] font-medium">
              LLM router
            </text>
            <text x={502} y={198} className="fill-muted-foreground font-mono text-[10.5px]">
              timeout {TIMEOUT_S}s
            </text>
            <text x={502} y={213} className="fill-muted-foreground font-mono text-[10.5px]">
              retries ×{RETRIES}
            </text>
            <text x={502} y={228} className="fill-muted-foreground font-mono text-[10.5px]">
              failover ✓
            </text>
          </g>

          <text x={650} y={16} className="fill-muted-foreground font-mono text-[10px] uppercase tracking-wider">
            LLM providers · max {SEMAPHORE} concurrent / key → no 429s
          </text>
          <GlmNode y={26} name="GLM key 1" inFlight={inFlight[0]} down={outage} />
          <GlmNode y={146} name="GLM key 2" inFlight={inFlight[1]} down={outage} />
          <SvgNode
            x={650}
            y={281}
            w={170}
            title="OpenAI"
            sub={outage ? "fallback active" : "fallback · standby"}
            state={outage ? "active" : "idle"}
          />

          <SvgNode x={855} y={166} w={110} title="Guardrails" sub="validates" />
          <SvgNode x={990} y={166} w={100} title="Summary" sub="JSON → UI" state="active" />
        </svg>
      </div>

      {/* Mobile: stacked version */}
      <ol className="space-y-2 p-4 md:hidden">
        {[
          ["Class ends", "job per student"],
          ["Redis queue", "absorbs traffic spikes"],
          ["Worker", "builds prompt"],
          ["LLM router", `timeout ${TIMEOUT_S}s · retries ×${RETRIES} · failover`],
        ].map(([t, s]) => (
          <li key={t}>
            <div className="rounded-sm border border-border px-3 py-2.5">
              <p className="text-sm font-medium">{t}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{s}</p>
            </div>
            <ArrowDown className="mx-auto mt-2 h-4 w-4 text-muted-foreground" />
          </li>
        ))}
        <li>
          <div className="grid grid-cols-2 gap-2">
            {(["GLM key 1", "GLM key 2"] as const).map((name, k) => (
              <div
                key={name}
                className={`rounded-sm border px-2.5 py-2 ${
                  outage ? "border-destructive bg-destructive/10" : "border-primary bg-primary/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">{name}</p>
                  <span className={`font-mono text-[10px] ${outage ? "text-destructive" : "text-muted-foreground"}`}>
                    {outage ? "40s ✕" : "⏱ 40s"}
                  </span>
                </div>
                <div className="mt-2 flex gap-[3px]">
                  {Array.from({ length: SEMAPHORE }, (_, i) => (
                    <span
                      key={i}
                      className={`h-2.5 flex-1 rounded-[2px] border ${
                        outage
                          ? "border-destructive/60"
                          : i < inFlight[k]
                            ? "border-primary bg-primary"
                            : "border-border"
                      }`}
                    />
                  ))}
                </div>
                <p className={`mt-1 font-mono text-[10px] ${outage ? "text-destructive" : "text-muted-foreground"}`}>
                  {outage ? "timed out · retrying" : `${inFlight[k]}/${SEMAPHORE} in flight`}
                </p>
              </div>
            ))}
          </div>
          <div
            className={`mt-2 rounded-sm border px-2.5 py-2 text-center ${
              outage ? "border-primary bg-primary/10" : "border-dashed border-border"
            }`}
          >
            <p className="text-xs font-medium">OpenAI</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              {outage ? "fallback active" : `fallback after ${RETRIES} retries`}
            </p>
          </div>
          <ArrowDown className="mx-auto mt-2 h-4 w-4 text-muted-foreground" />
        </li>
        <li className="rounded-sm border border-border px-3 py-2.5">
          <p className="text-sm font-medium">Guardrails → Summary</p>
          <p className="font-mono text-[11px] text-muted-foreground">validated JSON → UI</p>
        </li>
      </ol>

      {/* Request policy */}
      <div className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
        {policy.map((p) => (
          <div key={p.title} className="flex gap-3 bg-card px-4 py-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
              <p.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-sm font-medium">{p.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Attempt timeline */}
      <div className="border-t border-border bg-muted/50 px-4 py-4">
        <p className="eyebrow mb-3">{outage ? "One request during an outage" : "One request, normal operation"}</p>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {steps.map((s, i) => {
            const reached = i <= step;
            const isTimeout = s.startsWith("Timeout");
            const isDone = s.startsWith("Summary");
            return (
              <li key={`${s}-${i}`} className="flex items-center gap-1.5">
                <span
                  className={`rounded-sm border px-2 py-1 font-mono text-[11px] transition-colors duration-300 ${
                    !reached
                      ? "border-border text-muted-foreground/50"
                      : isTimeout
                        ? "border-destructive/60 bg-destructive/10 text-destructive"
                        : isDone
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-primary/50 bg-primary/10 text-foreground"
                  }`}
                >
                  {s}
                </span>
                {i < steps.length - 1 && <span className="text-xs text-muted-foreground">→</span>}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Outcome */}
      <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-sm">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
        <span>
          Summaries keep generating{" "}
          <span className="text-muted-foreground">
            {outage
              ? "even with the primary provider down."
              : "with load capped per key, so the provider never returns 429."}
          </span>
        </span>
      </div>
    </div>
  );
};
