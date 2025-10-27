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
    <section id="education" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Education & Certifications
        </h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <Card key={edu.institution} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  {edu.type === "degree" ? (
                    <GraduationCap className="h-6 w-6 text-primary" />
                  ) : (
                    <Award className="h-6 w-6 text-accent" />
                  )}
                  <div>
                    <CardTitle className="text-xl">{edu.degree}</CardTitle>
                    <p className="text-muted-foreground mt-1">{edu.institution}</p>
                    {edu.period && (
                      <p className="text-sm text-muted-foreground mt-1">{edu.period}</p>
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
