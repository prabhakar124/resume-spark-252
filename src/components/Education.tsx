import { Reveal, SectionHeader } from "@/components/Section";

const education = [
  {
    institution: "BMIT College Sitapura, Jaipur",
    degree: "Bachelor's in Civil Engineering",
    type: "Degree",
    location: "Jaipur, Rajasthan",
  },
  {
    institution: "GIP Technologies Pvt. Ltd.",
    degree: "MERN Stack Internship",
    period: "August 2022 - January 2023",
    type: "Internship",
    location: "Jaipur, Rajasthan",
  },
  {
    institution: "Grras Solutions Pvt. Ltd.",
    degree: "MERN Stack Certification & Training",
    period: "January 2022 - July 2022",
    type: "Certification",
    location: "Jaipur, Rajasthan",
  },
];

export const Education = () => {
  return (
    <section id="education" className="border-t border-border bg-muted/40 py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="04"
          label="Education"
          title={
            <>
              Foundations & <em className="text-primary">training</em>.
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-md border border-border bg-card p-6 transition-colors hover:border-foreground/30">
                <p className="eyebrow mb-6 text-primary">{e.type}</p>
                <h3 className="font-serif text-2xl leading-tight tracking-tight">{e.degree}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.institution}</p>
                <div className="mt-auto flex flex-wrap justify-between gap-2 border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
                  <span>{e.location}</span>
                  {e.period && <span>{e.period}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
