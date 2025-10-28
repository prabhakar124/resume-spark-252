import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "Python"],
  },
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "React", "Redux", "Material-UI"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "RESTful APIs", "Swagger", "Pytest", "Locust"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "SQL"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "AWS", "CI/CD Pipelines"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <Card 
              key={category.title} 
              className={`card-hover border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur opacity-0 animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
            >
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
