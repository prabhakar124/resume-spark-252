import { Reveal, SectionHeader } from "@/components/Section";

const skillCategories = [
  {
    title: "AI / GenAI",
    skills: [
      "LLMs",
      "RAG",
      "AI Agents",
      "LangChain",
      "LangGraph",
      "Embeddings",
      "Prompt Engineering",
      "Hybrid Search",
      "Re-ranking",
    ],
    featured: true,
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "Redux", "Material-UI", "HTML", "CSS"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "RESTful APIs", "Swagger", "Pytest", "Locust"],
  },
  {
    title: "Languages",
    skills: ["JavaScript", "Python"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "Qdrant"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Git", "GitHub", "AWS", "CI/CD Pipelines", "Docker"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="03"
          label="Toolkit"
          title={
            <>
              The <em className="text-primary">stack</em> I reach for.
            </>
          }
          intro="AI at the core, with the full-stack fundamentals to take it to production."
        />

        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, i) => (
              <div
                key={cat.title}
                className={`bg-background p-6 md:p-8 ${
                  cat.featured ? "sm:col-span-2 lg:row-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="mb-6 flex items-baseline justify-between">
                  <h3 className={`font-serif tracking-tight ${cat.featured ? "text-3xl" : "text-2xl"}`}>
                    {cat.title}
                  </h3>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className={`flex flex-wrap gap-1.5 ${cat.featured ? "gap-2" : ""}`}>
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className={
                        cat.featured
                          ? "rounded-sm border border-primary/30 bg-primary/5 px-2.5 py-1 text-sm text-foreground"
                          : "tag text-xs"
                      }
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
