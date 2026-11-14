import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Trophy,
  ShieldCheck,
  Layers,
  Filter,
  Gauge,
  LayoutTemplate,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { Reveal, SectionHeader } from "@/components/Section";
import { ReliabilityDiagram } from "@/components/classbuddy/ReliabilityDiagram";
import { ParentReportVisual } from "@/components/classbuddy/ParentReportVisual";
import { SpeakingDemo } from "@/components/classbuddy/SpeakingDemo";
import { RetrievalExplorer } from "@/components/classbuddy/RetrievalExplorer";

const LINKEDIN_POST = "https://lnkd.in/p/gm7m-V5p";

type Accent = "accent-steel" | "accent-sage" | "accent-brass";

const meta = [
  { label: "Role", value: "Idea originator & Generative AI Engineer" },
  { label: "Company", value: "TalentGum" },
  { label: "Timeline", value: "2026 – Present" },
  { label: "Status", value: "2 modules live · 1 in progress" },
];

const modules: {
  id: string;
  letter: string;
  accent: Accent;
  name: string;
  short: string;
  status: "Live" | "In progress";
  text: string;
}[] = [
  {
    id: "summaries",
    letter: "A",
    accent: "accent-steel",
    name: "Class summaries & parent reports",
    short: "Summaries",
    status: "Live",
    text: "A personalized AI summary for every student after each class, rolled up into a monthly report for parents.",
  },
  {
    id: "speaking",
    letter: "B",
    accent: "accent-sage",
    name: "Public speaking evaluator",
    short: "Speaking",
    status: "Live",
    text: "Students record a 30–60 second speech and get AI feedback the moment they stop speaking.",
  },
  {
    id: "chatbot",
    letter: "C",
    accent: "accent-brass",
    name: "Class Buddy chatbot",
    short: "Chatbot",
    status: "In progress",
    text: "The heart of the original pitch: a RAG-powered assistant that answers questions about each class.",
  },
];

const productionLessons = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    text: "40s timeouts, 2 retries and multi-provider failover (GLM → OpenAI) so the feature survives provider downtime.",
  },
  {
    icon: Layers,
    title: "Handling load",
    text: "A Redis queue plus a semaphore of 8 concurrent requests per GLM key, so bursts are processed steadily without 429 errors.",
  },
  {
    icon: Filter,
    title: "Quality & safety",
    text: "Prompt engineering plus output guardrails that check every summary before students or parents see it.",
  },
  {
    icon: Gauge,
    title: "Cost & latency",
    text: "Tuning prompts and context to keep token usage and response time down at production volume.",
  },
  {
    icon: LayoutTemplate,
    title: "UI for uncertain output",
    text: "Interfaces that stay clean whether the AI returns two lines or two paragraphs.",
  },
];

const stack = [
  "Next.js",
  "Redux",
  "FastAPI",
  "Python",
  "GLM",
  "OpenAI",
  "gpt-realtime-whisper",
  "Redis",
  "WebSockets",
  "Qdrant",
  "Whisper / Deepgram",
];

/* ---------- Building blocks ---------- */

const StatusBadge = ({ status }: { status: "Live" | "In progress" }) =>
  status === "Live" ? (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
      Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-primary px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      Building now
    </span>
  );

/** Big coloured opener for each module: letter, name, at-a-glance facts, the hard part */
const ModuleBanner = ({
  letter,
  name,
  status,
  pitch,
  glance,
  hardPart,
}: {
  letter: string;
  name: string;
  status: "Live" | "In progress";
  pitch: string;
  glance: { label: string; value: string }[];
  hardPart: ReactNode;
}) => (
  <Reveal>
    <div
      className={`relative overflow-hidden rounded-md border-2 bg-primary/[0.06] ${
        status === "Live" ? "border-primary/40" : "border-dashed border-primary/50"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-4 select-none font-serif text-[14rem] italic leading-none text-primary/10 md:text-[20rem]"
      >
        {letter}
      </span>
      <div className="relative grid gap-6 p-6 md:grid-cols-12 md:gap-8 md:p-10">
        <div className="flex items-start md:col-span-2">
          <span className="flex h-16 w-16 items-center justify-center rounded-md bg-primary font-serif text-4xl italic text-primary-foreground md:h-24 md:w-24 md:text-6xl">
            {letter}
          </span>
        </div>
        <div className="md:col-span-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-primary">Module {letter}</span>
            <StatusBadge status={status} />
          </div>
          <h2 className="mt-3 font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl">{name}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{pitch}</p>
          <dl className="mt-8 grid gap-4 border-t border-primary/25 pt-5 sm:grid-cols-3">
            {glance.map((g) => (
              <div key={g.label}>
                <dt className="eyebrow">{g.label}</dt>
                <dd className="mt-1 font-medium">{g.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

    <div className="mt-12 grid gap-3 md:grid-cols-12 md:gap-8">
      <p className="eyebrow pt-2 text-primary md:col-span-2">The hard part</p>
      <p className="font-serif text-3xl leading-[1.15] tracking-tight md:col-span-10 md:text-[2.6rem]">
        {hardPart}
      </p>
    </div>
  </Reveal>
);

/** Illustrative timeline: why streaming transcription makes feedback instant */
const LatencyCompare = () => {
  const Row = ({
    label,
    segments,
  }: {
    label: string;
    segments: { text: string; grow: number; kind: "speak" | "wait" | "work" | "done" }[];
  }) => (
    <div>
      <p className="eyebrow mb-2">{label}</p>
      <div className="flex h-12 gap-1 overflow-hidden rounded-sm text-[11px] font-medium md:text-xs">
        {segments.map((s) => (
          <div
            key={s.text}
            style={{ flexGrow: s.grow }}
            className={`flex min-w-0 basis-0 items-center justify-center truncate px-2 ${
              s.kind === "speak"
                ? "bg-foreground/80 text-background"
                : s.kind === "wait"
                  ? "bg-[repeating-linear-gradient(135deg,hsl(var(--muted-foreground)/0.25)_0_6px,transparent_6px_12px)] text-muted-foreground ring-1 ring-inset ring-border"
                  : s.kind === "work"
                    ? "bg-primary/25 text-foreground"
                    : "bg-primary text-primary-foreground"
            }`}
          >
            <span className="truncate">{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="rounded-md border border-border bg-card p-5 md:p-8">
      <div className="space-y-6">
        <Row
          label="Record first, process after"
          segments={[
            { text: "Student speaks", grow: 5, kind: "speak" },
            { text: "Upload · transcribe · evaluate", grow: 4, kind: "wait" },
            { text: "Feedback", grow: 1.4, kind: "done" },
          ]}
        />
        <Row
          label="Class Buddy: stream while speaking"
          segments={[
            { text: "Student speaks + live transcription", grow: 5, kind: "work" },
            { text: "Feedback", grow: 1.4, kind: "done" },
          ]}
        />
      </div>
      <p className="mt-5 font-mono text-[11px] text-muted-foreground">
        Illustrative, not to scale. The waiting block disappears because transcription happens
        during the speech.
      </p>
    </div>
  );
};

/** Sticky A · B · C switcher that shows which module you're reading */
const ModuleNav = () => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["overview", ...modules.map((m) => m.id), "stack"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const show = modules.some((m) => m.id === active);

  return (
    <div
      className={`fixed inset-x-0 top-16 z-30 flex justify-center px-4 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      <nav className="mt-3 flex gap-1 rounded-md border border-border bg-background/90 p-1 shadow-sm backdrop-blur-md">
        {modules.map((m) => (
          <a
            key={m.id}
            href={`#${m.id}`}
            className={`${m.accent} flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm transition-colors ${
              active === m.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="font-serif text-base italic">{m.letter}</span>
            <span className="hidden sm:inline">{m.short}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

/* ---------- Page ---------- */

const ClassBuddy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const prevTitle = document.title;
    document.title = "Class Buddy case study · Prabhakar Tiwari";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar minimal />
      <ModuleNav />

      <main>
        {/* Header */}
        <header id="top" className="pt-28 md:pt-36">
          <div className="container-page">
            <Link
              to="/#projects"
              className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to work
            </Link>

            <Reveal className="mt-10">
              <p className="eyebrow text-primary">Case study · TalentGum</p>
              <h1 className="mt-4 font-serif text-[clamp(3.25rem,9vw,7rem)] leading-[0.92] tracking-tight">
                Class <em className="text-primary">Buddy</em>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                From a winning competition idea to production AI: an AI learning companion for
                students, parents and teachers, now being built at TalentGum.
              </p>

              <a
                href={LINKEDIN_POST}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 rounded-sm border border-primary/40 bg-primary/5 px-4 py-3 transition-colors hover:border-primary"
              >
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm">
                  <span className="font-medium">1st Prize</span> · TalentGum AI Innovation Challenge 2026
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-16 grid grid-cols-2 border-t border-border md:grid-cols-4">
                {meta.map((m, i) => (
                  <div
                    key={m.label}
                    className={`py-5 pr-4 ${i % 2 === 1 ? "border-l border-border pl-4 md:pl-6" : ""} ${
                      i === 2 ? "border-t border-border md:border-l md:border-t-0 md:pl-6" : ""
                    } ${i === 3 ? "border-t border-border md:border-t-0" : ""}`}
                  >
                    <dt className="eyebrow mb-1.5">{m.label}</dt>
                    <dd className="text-sm font-medium">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        {/* 01 Origin */}
        <section className="py-20 md:py-28">
          <div className="container-page">
            <SectionHeader
              index="01"
              label="The origin"
              title={
                <>
                  An idea that <em className="text-primary">won</em>, then shipped.
                </>
              }
            />
            <Reveal className="grid gap-10 md:grid-cols-12">
              <ol className="relative space-y-6 md:col-span-3">
                {["Pitched the idea", "Live demo to judges & CEO", "Won 1st prize", "Adopted for production"].map(
                  (s, i) => (
                    <li key={s} className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] ${
                          i === 2 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                        }`}
                      >
                        {i === 2 ? <Trophy className="h-3.5 w-3.5" /> : i + 1}
                      </span>
                      <span className={`text-sm ${i === 2 ? "font-medium text-primary" : ""}`}>{s}</span>
                    </li>
                  )
                )}
              </ol>
              <div className="space-y-5 text-lg leading-relaxed md:col-span-7 md:col-start-5">
                <p>
                  Class Buddy started as my entry in the{" "}
                  <span className="font-medium">TalentGum AI Innovation Challenge 2026</span>. I
                  pitched the idea and gave a live demo to the judging panel, which included our
                  CEO, and <span className="font-medium text-primary">won 1st prize</span>.
                </p>
                <p className="text-muted-foreground">
                  The company then adopted the idea for production. I'm now building it as part of
                  the team, taking it from a competition demo to features real students and
                  parents use.
                </p>
                <a
                  href={LINKEDIN_POST}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 text-base font-medium hover:text-primary"
                >
                  Read the announcement on LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 02 Overview */}
        <section id="overview" className="border-y border-border bg-muted/40 py-20 md:py-28">
          <div className="container-page">
            <SectionHeader
              index="02"
              label="What it is"
              title={
                <>
                  Three modules, one <em className="text-primary">companion</em>.
                </>
              }
              intro="Class Buddy turns every class into something students and parents can learn from after it ends."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {modules.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.06} className={m.accent}>
                  <a
                    href={`#${m.id}`}
                    className={`group flex h-full flex-col overflow-hidden rounded-md border-2 bg-card transition-transform hover:-translate-y-1 ${
                      m.status === "Live" ? "border-primary/40" : "border-dashed border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between bg-primary/10 px-6 py-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary font-serif text-3xl italic text-primary-foreground">
                        {m.letter}
                      </span>
                      <StatusBadge status={m.status} />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-serif text-2xl leading-tight tracking-tight">{m.name}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{m.text}</p>
                      <span className="mt-auto pt-6 text-sm font-medium text-primary">
                        Jump to module {m.letter} ↓
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Module A — Summaries */}
        <section id="summaries" className="accent-steel py-20 md:py-28">
          <div className="container-page">
            <ModuleBanner
              letter="A"
              name="Class summaries & parent reports"
              status="Live"
              pitch="After every class, Class Buddy writes a personalized summary for each student, then rolls a month of them into a report for parents."
              glance={[
                { label: "Runs", value: "After every class" },
                { label: "Produces", value: "Student summaries + monthly parent report" },
                { label: "Built for", value: "Reliability under load" },
              ]}
              hardPart={
                <>
                  The prototype was easy. Production meant keeping summaries flowing through{" "}
                  <em className="text-primary">traffic spikes and LLM outages</em>, every day.
                </>
              }
            />

            <Reveal className="mt-14">
              <ReliabilityDiagram />
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="eyebrow mb-6">What production taught me</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {productionLessons.map((l) => (
                  <div key={l.title} className="rounded-md border border-border bg-card p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <l.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 font-medium">{l.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <div className="grid gap-8 rounded-md border border-border bg-muted/50 p-6 lg:grid-cols-12 md:p-8">
                <div className="lg:col-span-4">
                  <p className="eyebrow text-primary">Built on top · Monthly parent report</p>
                  <p className="mt-3 font-serif text-2xl leading-snug tracking-tight">
                    8 class summaries → one report parents actually read.
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    It reuses the structured summary JSON to show what the child learned, with each
                    topic rated by performance.
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <ParentReportVisual />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Module B — Speaking (teal) */}
        <section id="speaking" className="accent-sage border-y border-border bg-primary/[0.04] py-20 md:py-28">
          <div className="container-page">
            <ModuleBanner
              letter="B"
              name="Public speaking evaluator"
              status="Live"
              pitch="Students record a 30–60 second speech and get AI feedback the moment they stop speaking."
              glance={[
                { label: "Input", value: "30–60 sec voice recording" },
                { label: "Produces", value: "Instant AI feedback" },
                { label: "Built for", value: "Real-time speed" },
              ]}
              hardPart={
                <>
                  Not the evaluation, the <em className="text-primary">speed</em>. Feedback that
                  arrives after a long wait loses its value.
                </>
              }
            />

            <Reveal className="mt-14">
              <SpeakingDemo />
            </Reveal>

            <Reveal className="mt-14 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow text-primary">The fix</p>
                <p className="mt-3 font-serif text-2xl leading-snug tracking-tight">
                  Transcribe <em className="text-primary">while</em> the student speaks.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Audio streams over WebSockets to OpenAI's gpt-realtime-whisper, so the transcript
                  is ready the moment they finish and evaluation starts straight away.
                </p>
              </div>
              <div className="lg:col-span-8">
                <LatencyCompare />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Module C — Chatbot (violet, in progress) */}
        <section id="chatbot" className="accent-brass py-20 md:py-28">
          <div className="container-page">
            <ModuleBanner
              letter="C"
              name="Class Buddy chatbot"
              status="In progress"
              pitch="The core of the original competition idea: an assistant students and parents can ask about their classes."
              glance={[
                { label: "Learns from", value: "Class transcripts" },
                { label: "Produces", value: "Answers grounded in what was taught" },
                { label: "Status", value: "Building now" },
              ]}
              hardPart={
                <>
                  Answering from what <em className="text-primary">actually happened in class</em>,
                  not from what the model guesses.
                </>
              }
            />

            <Reveal className="mt-14">
              <RetrievalExplorer />
            </Reveal>
          </div>
        </section>

        {/* Stack + CTA */}
        <section id="stack" className="border-t border-border bg-muted/40 py-20 md:py-28">
          <div className="container-page grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="eyebrow mb-4">
                <span className="text-primary">03</span>
                <span className="mx-2">/</span>Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-7">
              <h2 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Want to talk about building <em className="text-primary">production AI</em>?
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-sm bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Get in touch <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/#projects"
                  className="inline-flex h-11 items-center gap-2 rounded-sm border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground"
                >
                  <ArrowLeft className="h-4 w-4" /> More projects
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default ClassBuddy;
