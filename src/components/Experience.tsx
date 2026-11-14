import { Reveal, SectionHeader } from "@/components/Section";

const experiences = [
  {
    company: "TalentGum",
    role: "Generative AI Engineer",
    period: "February 2026 - Present",
    current: true,
    achievements: [
      "Working on a Next.js-based e-learning platform, integrating APIs to build dynamic UI and managing state using Redux",
      "Developing Class Buddy, an AI-powered learning companion with an AI chatbot and automated class summaries for students, parents, and teachers",
      "Building RAG pipelines using FastAPI, LLMs, embeddings, and Qdrant for context-aware chatbot responses and classroom knowledge retrieval",
      "Integrating AI backend APIs with Next.js, Redux, and reusable frontend components",
    ],
  },
  {
    company: "Activant Solutions PVT LTD",
    role: "Web Application Developer",
    period: "September 2025 - February 2026",
    current: false,
    achievements: [
      "Frontend development of an enterprise SaaS app for Shopify merchants using Next.js, React.js and Polaris",
      "Implemented background jobs and async workflows in Node.js",
      "Built a responsive, high-performance UI and developed analytics dashboards, points, and rewards modules",
      "Ensured scalable, reusable UI components and a seamless user experience",
    ],
  },
  {
    company: "Infoshor Software PVT LTD",
    role: "Associate Software Developer",
    period: "February 2023 - August 2025",
    current: false,
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
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.05}>
              <li className="group grid gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <p className="font-mono text-xs text-muted-foreground">{exp.period}</p>
                  {exp.current && (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-sm bg-primary/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Now
                    </span>
                  )}
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-serif text-3xl leading-tight tracking-tight transition-colors group-hover:text-primary">
                    {exp.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{exp.role}</p>
                </div>

                <ul className="space-y-3 md:col-span-5">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                      <span className="mt-[9px] h-px w-3 shrink-0 bg-primary" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
