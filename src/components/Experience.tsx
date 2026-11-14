import { Reveal, SectionHeader } from "@/components/Section";
import { CaseStudyButton } from "@/components/CaseStudyButton";

type Job = {
  company: string;
  monogram: string;
  accent: "" | "accent-teal" | "accent-violet";
  role: string;
  startYear: string;
  period: string;
  current: boolean;
  summary: string;
  stack: string[];
  achievements: string[];
  caseStudy?: { href: string; title: string; note?: string };
};

const experiences: Job[] = [
  {
    company: "TalentGum",
    monogram: "TG",
    accent: "",
    role: "Generative AI Engineer",
    startYear: "2026",
    period: "February 2026 - Present",
    current: true,
    summary: "Building Class Buddy, my award-winning AI learning companion, into production.",
    stack: ["Next.js", "Redux", "FastAPI", "LLMs", "Redis", "WebSockets", "RAG", "Qdrant"],
    achievements: [
      "Won 1st prize in the TalentGum AI Innovation Challenge 2026 with Class Buddy, which the company then adopted for production",
      "Shipped AI class summaries and monthly parent reports, made reliable with Redis queueing, output guardrails, and GLM → OpenAI failover",
      "Shipped a real-time public speaking evaluator: WebSocket audio streaming with gpt-realtime-whisper for instant feedback",
      "Building the Class Buddy chatbot: a RAG pipeline with FastAPI, embeddings, Qdrant, hybrid search, and re-ranking",
      "Developing the Next.js e-learning platform with Redux and reusable components, integrating the AI backend APIs",
    ],
    caseStudy: {
      href: "/projects/class-buddy",
      title: "Class Buddy: from competition win to production AI",
      note: "1st Prize, TalentGum AI Innovation Challenge 2026",
    },
  },
  {
    company: "Activant Solutions PVT LTD",
    monogram: "AS",
    accent: "accent-teal",
    role: "Web Application Developer",
    startYear: "2025",
    period: "September 2025 - February 2026",
    current: false,
    summary: "Frontend for an enterprise Shopify loyalty & rewards SaaS.",
    stack: ["Next.js", "React.js", "Shopify Polaris", "Node.js"],
    achievements: [
      "Frontend development of an enterprise SaaS app for Shopify merchants using Next.js, React.js and Polaris",
      "Implemented background jobs and async workflows in Node.js",
      "Built a responsive, high-performance UI and developed analytics dashboards, points, and rewards modules",
      "Ensured scalable, reusable UI components and a seamless user experience",
    ],
  },
  {
    company: "Infoshor Software PVT LTD",
    monogram: "IS",
    accent: "accent-violet",
    role: "Associate Software Developer",
    startYear: "2023",
    period: "February 2023 - August 2025",
    current: false,
    summary: "Full-stack web applications with React, Python and MySQL on AWS.",
    stack: ["React.js", "Python", "MySQL", "AWS"],
    achievements: [
      "Developed and maintained web applications using React.js, Python and MySQL",
      "Improved system performance and scalability through optimized database design and AWS deployment",
      "Collaborated with cross-functional teams to deliver user-focused features and reduce delivery time",
      "Ensured high code quality through best practices, code reviews, and Git",
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="01"
          label="Experience"
          title={
            <>
              Where I've been <em className="text-primary">building</em>.
            </>
          }
          intro="From full-stack web apps to production LLM systems — each role pushed further into AI."
        />

        <ol>
          {experiences.map((job, i) => (
            <li
              key={job.company}
              className={`${job.accent} relative grid gap-4 md:grid-cols-[170px_1fr] md:gap-10`}
            >
              {/* Year column */}
              <Reveal className="md:pt-7 md:text-right">
                <p className="font-serif text-5xl leading-none tracking-tight text-primary md:text-6xl">
                  {job.startYear}
                </p>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">{job.period}</p>
              </Reveal>

              {/* Timeline rail + card */}
              <div
                className={`relative border-l-2 pl-6 md:pl-10 ${
                  i === experiences.length - 1 ? "border-transparent" : "border-border"
                } pb-12 md:pb-16`}
              >
                <span
                  aria-hidden
                  className={`absolute -left-[9px] top-8 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary ${
                    job.current ? "bg-primary" : "bg-background"
                  }`}
                >
                  {job.current && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  )}
                </span>

                <Reveal delay={0.05}>
                  <article
                    className={`relative overflow-hidden rounded-md border bg-card transition-colors ${
                      job.current
                        ? "border-primary/50 shadow-[0_24px_50px_-30px_hsl(var(--primary)/0.6)]"
                        : "border-border hover:border-foreground/25"
                    }`}
                  >
                    {/* Coloured top band */}
                    <div className="h-1.5 w-full bg-primary" />

                    <div className="p-6 md:p-8">
                      <header className="flex flex-wrap items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-primary font-serif text-2xl italic text-primary-foreground">
                          {job.monogram}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h3 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
                              {job.company}
                            </h3>
                            {job.current && (
                              <span className="rounded-sm bg-primary px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary-foreground">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="mt-1 font-medium text-primary">{job.role}</p>
                        </div>
                      </header>

                      <p className="mt-5 border-l-2 border-primary pl-4 text-lg leading-snug">
                        {job.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {job.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-sm border border-primary/25 bg-primary/5 px-2 py-0.5 font-mono text-[11px] text-foreground/80"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <ul className="mt-6 grid gap-x-8 gap-y-3 border-t border-border pt-6 lg:grid-cols-2">
                        {job.achievements.map((a) => (
                          <li key={a} className="flex gap-3 text-[14.5px] leading-relaxed text-muted-foreground">
                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>

                      {job.caseStudy && (
                        <CaseStudyButton
                          to={job.caseStudy.href}
                          title={job.caseStudy.title}
                          note={job.caseStudy.note}
                        />
                      )}
                    </div>
                  </article>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
