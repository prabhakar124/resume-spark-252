import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Activant Solutions PVT LTD",
    role: "Web Application Developer",
    period: "August 2025 - Present",
    achievements: [
      "Built and deployed an AI chatbot to assist users with intelligent, context-aware responses",
      "Implemented background jobs and event-driven workflows using asynchronous processing to handle notifications, data updates, and scheduled tasks efficiently",
      "Integrated AI-powered image generation features to enhance user experience and automate media creation",
    ],
  },
  {
    company: "Infoshor Software PVT LTD",
    role: "Associate Software Developer",
    period: "February 2023 - August 2025",
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
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <Card key={exp.company} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.role}
                    </CardTitle>
                    <p className="text-lg text-muted-foreground mt-1">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
