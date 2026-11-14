import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Trophy } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { Reveal, SectionHeader } from "@/components/Section";
import { FlowDiagram, type FlowStep } from "@/components/FlowDiagram";

const LINKEDIN_POST = "https://lnkd.in/p/gm7m-V5p";

const meta = [
  { label: "Role", value: "Idea originator & Generative AI Engineer" },
  { label: "Company", value: "TalentGum" },
  { label: "Timeline", value: "2026 – Present" },
  { label: "Status", value: "2 modules live · 1 in progress" },
];

const modules = [
  {
    index: "A",
    name: "Class summaries & parent reports",
    status: "Live",
    text: "A personalized AI summary for every student after each class, rolled up into a monthly report for parents.",
    href: "#summaries",
  },
  {
    index: "B",
    name: "Public speaking evaluator",
    status: "Live",
    text: "Students record a 30–60 second speech and get AI feedback the moment they stop speaking.",
    href: "#speaking",
  },
  {
    index: "C",
    name: "Class Buddy chatbot",
    status: "In progress",
    text: "The heart of the original pitch: a RAG-powered assistant that answers questions about each class.",
    href: "#chatbot",
  },
];

const summarySteps: FlowStep[] = [
  {
    label: "Class ends",
    sub: "summary job created",
    detail:
      "When a class finishes, a summary job is created for every student in it. Jobs arrive in bursts, since many classes end at the same time.",
  },
  {
    label: "Redis queue",
    sub: "absorbs traffic spikes",
    detail:
      "Jobs go into a Redis-backed queue instead of hitting the LLM directly, so post-class traffic spikes are smoothed out and nothing is dropped under load.",
  },
  {
    label: "Worker",
    sub: "prompt + context",
    detail:
      "Workers pick jobs off the queue and build the prompt from the class context, using prompt engineering tuned for accuracy, tone and token cost.",
  },
  {
    label: "LLM router",
    sub: "timeouts · retries · failover",
    chips: ["GLM key 1", "GLM key 2", "OpenAI fallback"],
    detail:
      "Requests go to the primary LLM (GLM), load-balanced across two keys. Every call has a timeout and retries; if the primary provider is slow or down, the router fails over to OpenAI so summaries keep generating during outages.",
  },
  {
    label: "Output guardrails",
    sub: "validate before saving",
    detail:
      "The response is checked before anything reaches a student or parent: structure, length and content are validated so only on-topic, appropriate summaries are saved.",
  },
  {
    label: "Summary JSON → UI",
    sub: "stored & displayed",
    detail:
      "The validated summary is stored as structured JSON and rendered in a UI designed for AI output of unpredictable length.",
  },
];

const reportSteps: FlowStep[] = [
  {
    label: "8 class summaries",
    sub: "structured JSON",
    detail:
      "The monthly report reuses the structured summary JSON already produced after each class, so there is no need to re-process raw class data.",
  },
  {
    label: "Report generation",
    sub: "LLM over the month",
    detail:
      "The LLM reads the month's summaries together and writes a parent-facing view of the child's progress across the 8 classes.",
  },
  {
    label: "Monthly parent report",
    sub: "topics + ratings",
    detail:
      "Parents see what their child learned, with each topic rated according to the child's performance.",
  },
];

const speakingSteps: FlowStep[] = [
  {
    label: "Student speaks",
    sub: "30 – 60 sec",
    detail: "The student records a short speech in the browser.",
  },
  {
    label: "WebSocket stream",
    sub: "audio sent while recording",
    detail:
      "Audio streams to the backend over a WebSocket while the student is still speaking, instead of uploading one file at the end.",
  },
  {
    label: "Real-time transcription",
    sub: "gpt-realtime-whisper",
    detail:
      "OpenAI's streaming speech-to-text (gpt-realtime-whisper) turns audio into text in real time, so the transcript is ready the moment the student stops.",
  },
  {
    label: "AI evaluator",
    sub: "public speaking rubric",
    detail: "The transcript is evaluated against public speaking criteria to produce the student's feedback.",
  },
  {
    label: "Instant feedback",
    sub: "no waiting screen",
    detail:
      "Feedback appears right after the speech ends. Feedback that arrives after a long wait loses its value for the student.",
  },
];

const chatbotSteps: FlowStep[] = [
  {
    label: "Class transcript",
    sub: "Whisper / Deepgram",
    detail: "Class audio is transcribed with Whisper or Deepgram.",
  },
  {
    label: "Filter & enrich",
    sub: "LLM pre-processing",
    detail:
      "An LLM filters noise out of the raw transcript and enriches it, so only useful classroom content is indexed.",
  },
  {
    label: "Semantic chunking",
    sub: "meaning-based splits",
    detail:
      "Content is split on meaning rather than fixed sizes, so each chunk holds a complete idea that can be retrieved on its own.",
  },
  {
    label: "Embeddings → Qdrant",
    sub: "vector store",
    detail: "Chunks are embedded and stored in Qdrant, the vector database behind retrieval.",
  },
  {
    label: "Hybrid search + re-rank",
    sub: "keyword + vector",
    chips: ["keyword", "vector", "re-ranker"],
    detail:
      "Retrieval combines keyword and vector search, so exact terms like topic names aren't missed, then a re-ranker orders the candidates so the most relevant context reaches the LLM.",
  },
  {
    label: "Grounded answer",
    sub: "FastAPI · LLM",
    detail:
      "A FastAPI service passes the retrieved context to the LLM, which answers the student's or parent's question grounded in what actually happened in class.",
  },
];

const productionLessons = [
  {
    title: "Reliability",
    text: "Timeouts, retries and multi-provider failover (GLM → OpenAI) so the feature survives provider downtime.",
  },
  {
    title: "Handling load",
    text: "A Redis queue between class events and the LLM, so bursts of jobs are processed steadily.",
  },
  {
    title: "Quality & safety",
    text: "Prompt engineering plus output guardrails that check every summary before students or parents see it.",
  },
  {
    title: "Cost & latency",
    text: "Tuning prompts and context to keep token usage and response time down at production volume.",
  },
  {
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

const ModuleHeading = ({ status, children }: { status: string; children: React.ReactNode }) => (
  <div className="mb-6 flex flex-wrap items-center gap-3">
    <h3 className="font-serif text-3xl tracking-tight md:text-4xl">{children}</h3>
    <span
      className={`rounded-sm px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
        status === "Live" ? "bg-primary/10 text-primary" : "border border-border text-muted-foreground"
      }`}
    >
      {status}
    </span>
  </div>
);

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
                    className={`py-5 pr-4 ${i % 2 === 1 ? "pl-4 border-l border-border md:pl-6" : ""} ${
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
              <div className="space-y-5 text-lg leading-relaxed md:col-span-7 md:col-start-4">
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
        <section className="border-y border-border bg-muted/40 py-20 md:py-28">
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
                <Reveal key={m.name} delay={i * 0.06}>
                  <a
                    href={m.href}
                    className="group flex h-full flex-col rounded-md border border-border bg-card p-6 transition-colors hover:border-foreground/30"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-serif text-3xl italic text-primary">{m.index}</span>
                      <span
                        className={`rounded-sm px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
                          m.status === "Live"
                            ? "bg-primary/10 text-primary"
                            : "border border-border text-muted-foreground"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl leading-tight tracking-tight">{m.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{m.text}</p>
                    <span className="mt-auto pt-6 font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                      Read more ↓
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Summaries */}
        <section id="summaries" className="py-20 md:py-28">
          <div className="container-page">
            <SectionHeader
              index="03"
              label="Module A"
              title={
                <>
                  Summaries that keep running when an <em className="text-primary">LLM</em> doesn't.
                </>
              }
            />

            <Reveal>
              <ModuleHeading status="Live">Class summaries & parent reports</ModuleHeading>
              <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                After every class, Class Buddy writes a personalized summary for each student. The
                prototype was easy; production meant handling bursts of jobs, provider outages,
                unpredictable output and real cost, every day.
              </p>
              <FlowDiagram title="class-summary-pipeline" steps={summarySteps} />
            </Reveal>

            <Reveal className="mt-14">
              <h4 className="eyebrow mb-6">What production taught me</h4>
              <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
                {productionLessons.map((l) => (
                  <div key={l.title} className="bg-background p-5">
                    <p className="font-medium">{l.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                <span className="text-foreground">The monthly parent report</span> builds on that
                work: it reuses the structured summary JSON from 8 classes to show parents what
                their child learned, with each topic rated by performance.
              </p>
              <FlowDiagram title="monthly-parent-report" steps={reportSteps} />
            </Reveal>
          </div>
        </section>

        {/* 04 Speaking */}
        <section id="speaking" className="border-y border-border bg-muted/40 py-20 md:py-28">
          <div className="container-page">
            <SectionHeader
              index="04"
              label="Module B"
              title={
                <>
                  Feedback the moment the student <em className="text-primary">stops talking</em>.
                </>
              }
            />
            <Reveal>
              <ModuleHeading status="Live">Public speaking evaluator</ModuleHeading>
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Students record a 30–60 second speech and get AI feedback on it. The hardest part
                  wasn't the evaluation, it was <span className="text-foreground">speed</span>:
                  feedback that arrives after a long wait loses its value.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  So audio streams over <span className="text-foreground">WebSockets</span> to
                  OpenAI's <span className="text-foreground">gpt-realtime-whisper</span> while the
                  student speaks. The transcript is built in real time, and evaluation starts as
                  soon as they finish.
                </p>
              </div>
              <FlowDiagram title="speaking-evaluator" steps={speakingSteps} />
            </Reveal>
          </div>
        </section>

        {/* 05 Chatbot */}
        <section id="chatbot" className="py-20 md:py-28">
          <div className="container-page">
            <SectionHeader
              index="05"
              label="Module C · What's next"
              title={
                <>
                  The chatbot at the heart of the <em className="text-primary">pitch</em>.
                </>
              }
            />
            <Reveal>
              <ModuleHeading status="In progress">Class Buddy chatbot</ModuleHeading>
              <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                The module I'm building now is the core of the original competition idea: an
                assistant students and parents can ask about their classes, answering from what
                was actually taught.
              </p>
              <FlowDiagram title="classbuddy-rag-pipeline" steps={chatbotSteps} />
            </Reveal>
          </div>
        </section>

        {/* 06 Stack + CTA */}
        <section className="border-t border-border bg-muted/40 py-20 md:py-28">
          <div className="container-page grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="eyebrow mb-4">
                <span className="text-primary">06</span>
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
