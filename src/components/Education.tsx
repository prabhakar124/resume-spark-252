import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "BMIT College Sitapura, Jaipur",
    degree: "Bachelor's in Civil Engineering",
    type: "degree",
  },
  {
    institution: "GIP Technologies Pvt. Ltd. (Jaipur)",
    degree: "MERN Stack Internship",
    period: "August 2022 - January 2023",
    type: "certification",
  },
  {
    institution: "Grras Solutions Pvt. Ltd. (Jaipur)",
    degree: "MERN Stack Certification & Training",
    period: "January 2022 - July 2022",
    type: "certification",
  },
];

export const Education = () => {
  return (
    <section id="education" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 to-primary/5 -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Education & Certifications
        </h2>
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <Card 
              key={edu.institution} 
              className={`card-hover border-2 border-transparent hover:border-${edu.type === "degree" ? "primary" : "accent"}/20 bg-gradient-to-br from-card to-card/50 backdrop-blur opacity-0 animate-slide-in-right stagger-${idx + 1}`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${edu.type === "degree" ? "from-primary/10 to-primary/5" : "from-accent/10 to-accent/5"} group-hover:scale-110 transition-transform`}>
                    {edu.type === "degree" ? (
                      <GraduationCap className="h-6 w-6 text-primary" />
                    ) : (
                      <Award className="h-6 w-6 text-accent" />
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      {edu.degree}
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${edu.type === "degree" ? "from-primary to-primary-glow" : "from-accent to-accent-glow"}`} />
                    </CardTitle>
                    <p className="text-muted-foreground mt-2 font-medium">{edu.institution}</p>
                    {edu.period && (
                      <p className={`text-sm mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full ${edu.type === "degree" ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20"}`}>
                        {edu.period}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
