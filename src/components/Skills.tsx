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
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
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
