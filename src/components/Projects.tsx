import { Reveal, SectionHeader } from "@/components/Section";
import { CaseStudyButton } from "@/components/CaseStudyButton";

type CaseStudyLink = { href: string; title: string; note: string };

const projects: {
  title: string;
  company: { name: string; monogram: string; accent: "" | "accent-teal" | "accent-violet" };
  kicker: string;
  description: string;
  highlights: string[];
  technologies: string[];
  modules?: { name: string; live: boolean }[];
  caseStudy?: CaseStudyLink;
}[] = [
  {
    title: "TalentGum – E-Learning Platform",
    company: { name: "TalentGum", monogram: "TG", accent: "" },
    kicker: "AI · EdTech",
    description:
      "Next.js e-learning platform and Class Buddy, my award-winning AI learning companion for students, parents, and teachers. Three AI modules, two already live.",
    highlights: [
      "AI class summaries for every student, with Redis queueing, guardrails, and GLM → OpenAI failover",
      "Monthly parent reports built from 8 classes of summary data, with topic-wise performance ratings",
      "Real-time public speaking evaluator using WebSockets and gpt-realtime-whisper for instant feedback",
      "Class Buddy chatbot (in progress): RAG over Whisper/Deepgram class transcripts with Qdrant, hybrid search, and re-ranking",
      "Next.js + Redux frontend with reusable components, modules, and helper functions",
    ],
    technologies: [
      "Next.js",
      "Redux",
      "Python",
      "FastAPI",
      "LLMs",
      "Redis",
      "WebSockets",
      "Qdrant",
      "Whisper/Deepgram",
    ],
    modules: [
      { name: "Class summaries & parent reports", live: true },
      { name: "Public speaking evaluator", live: true },
      { name: "Class Buddy chatbot", live: false },
    ],
    caseStudy: {
      href: "/projects/class-buddy",
      title: "Class Buddy: from competition win to production AI",
      note: "1st Prize, TalentGum AI Innovation Challenge 2026",
    },
  },
  {
    title: "FavLoyalty – Loyalty & Rewards Platform",
    company: { name: "Activant Solutions", monogram: "AS", accent: "accent-teal" },
    kicker: "SaaS · Shopify",
    description:
      "Enterprise SaaS app for Shopify merchants with loyalty points, referrals, and tiered rewards.",
    highlights: [
      "Merchant-friendly UI using Next.js and Shopify Polaris",
      "Analytics dashboards, points settings, and redeem settings",
      "Improved usability and reduced onboarding time",
    ],
    technologies: ["Next.js", "React.js", "Shopify Polaris"],
  },
  {
    title: "Shopify eBay Importer",
    company: { name: "Infoshor Software", monogram: "IS", accent: "accent-violet" },
    kicker: "Integrations · AI",
    description:
      "Integration platform to sync and manage products across Shopify and eBay with real-time processing and AI-driven features.",
    highlights: [
      "Real-time product fetching with AWS SQS & Lambda",
      "Dashboard for sync status and analytics",
      "AI-driven category suggestions and error resolution using embeddings, vector DB, and prompt-based agents",
    ],
    technologies: [
      "React.js",
      "Python",
      "Shopify/eBay APIs",
      "AWS SQS & Lambda",
      "Embeddings",
      "Vector DB",
    ],
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="border-y border-border bg-muted/40 py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="02"
          label="Selected work"
          title={
            <>
              Products I've <em className="text-primary">shipped</em>.
            </>
          }
          intro="Real systems with real users — from AI learning tools to commerce integrations."
        />

        <div className="space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className={p.company.accent}>
              <article className="group grid overflow-hidden rounded-md border border-border bg-card transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/50 md:grid-cols-12">
                {/* Company colour strip, matching the Experience card */}
                <div className="h-1.5 bg-primary md:col-span-12" />

                {/* Main content */}
                <div className="p-6 md:col-span-7 md:p-10">
                  <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-primary/10 py-1 pl-1 pr-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary font-serif text-xs italic text-primary-foreground">
                        {p.company.monogram}
                      </span>
                      <span className="text-xs font-medium text-primary">{p.company.name}</span>
                    </span>
                    <span className="eyebrow">{p.kicker}</span>
                  </div>
                  <h3 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground">{p.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed">
                        <span className="font-mono text-primary">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Side panel */}
                <aside className="flex flex-col gap-8 border-t border-border bg-muted/50 p-6 md:col-span-5 md:border-l md:border-t-0 md:p-8">
                  <p className="flex items-baseline gap-2 font-serif leading-none">
                    <span className="text-5xl tracking-tight text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      / {String(projects.length).padStart(2, "0")}
                    </span>
                  </p>

                  {p.modules && (
                    <div>
                      <p className="eyebrow mb-3">Modules</p>
                      <ul className="divide-y divide-border rounded-sm border border-border bg-card">
                        {p.modules.map((m) => (
                          <li key={m.name} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
                            <span>{m.name}</span>
                            <span
                              className={`shrink-0 rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                                m.live
                                  ? "bg-primary/10 text-primary"
                                  : "border border-dashed border-border text-muted-foreground"
                              }`}
                            >
                              {m.live ? "Live" : "In progress"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="eyebrow mb-3">Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {p.caseStudy && (
                    <div className="mt-auto border-t border-border pt-6">
                      <CaseStudyButton
                        to={p.caseStudy.href}
                        title={p.caseStudy.title}
                        note={p.caseStudy.note}
                        compact
                      />
                    </div>
                  )}
                </aside>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
