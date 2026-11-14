import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/Section";

type CaseStudyLink = { href: string; label: string; badge: string };

const projects: {
  title: string;
  kicker: string;
  description: string;
  highlights: string[];
  technologies: string[];
  caseStudy?: CaseStudyLink;
}[] = [
  {
    title: "TalentGum – E-Learning Platform",
    kicker: "AI · EdTech",
    description:
      "Next.js e-learning platform with Class Buddy, an AI learning companion for students, parents, and teachers.",
    highlights: [
      "Dynamic, responsive UI with REST APIs and Redux",
      "AI chatbot and automated class summaries via Class Buddy",
      "RAG pipelines with FastAPI, LLMs, embeddings, and Qdrant",
      "Transcript workflows with Whisper/Deepgram, LLM filtering, enrichment, and semantic chunking",
      "Reusable frontend components, modules, and helper functions for scalability",
    ],
    technologies: [
      "Next.js",
      "Redux",
      "Python",
      "FastAPI",
      "LLMs",
      "Qdrant",
      "Whisper/Deepgram",
    ],
    caseStudy: {
      href: "/projects/class-buddy",
      label: "Read the Class Buddy case study",
      badge: "🏆 1st Prize · AI Innovation Challenge 2026",
    },
  },
  {
    title: "FavLoyalty – Loyalty & Rewards Platform",
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
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group relative grid gap-8 overflow-hidden rounded-md border border-border bg-card p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground/30 md:grid-cols-12 md:p-10">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-8 select-none font-serif text-[9rem] leading-none text-muted/70 transition-colors group-hover:text-primary/10 md:text-[12rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative md:col-span-7">
                  <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="eyebrow text-primary">{p.kicker}</p>
                    {p.caseStudy && (
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {p.caseStudy.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-muted-foreground">{p.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed">
                        <span className="font-mono text-primary">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  {p.caseStudy && (
                    <Link
                      to={p.caseStudy.href}
                      className="group/link mt-8 inline-flex h-11 items-center gap-2 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      {p.caseStudy.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  )}
                </div>

                <div className="relative md:col-span-5 md:flex md:flex-col md:justify-end">
                  <p className="eyebrow mb-3">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
