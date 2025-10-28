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
    <section id="experience" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Work Experience
        </h2>
        <div className="relative space-y-12">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent hidden md:block" />
          
          {experiences.map((exp, idx) => (
            <div 
              key={exp.company}
              className={`relative opacity-0 ${idx % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'} stagger-${idx + 1}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent hidden md:block ring-4 ring-background" />
              
              <Card className="ml-0 md:ml-20 card-hover border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        {exp.role}
                      </CardTitle>
                      <p className="text-lg text-muted-foreground mt-2 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <span className="text-primary mt-1 text-lg group-hover:scale-125 transition-transform">•</span>
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
