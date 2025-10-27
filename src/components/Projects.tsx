import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";

const projects = [
  {
    title: "Shopify eBay Importer",
    description:
      "Built an integration platform to sync and manage products across Shopify and eBay with real-time processing and AI-driven features.",
    highlights: [
      "Real-time product fetching with AWS SQS & Lambda",
      "Dashboard for sync status and analytics",
      "AI-driven category suggestions & error resolution using embeddings and vector DB",
    ],
    technologies: ["React.js", "FastAPI", "Shopify API", "eBay API", "AWS", "AI Embeddings"],
  },
  {
    title: "FavLoyalty – Loyalty & Rewards Platform",
    description:
      "Enterprise SaaS application for Shopify merchants featuring loyalty points, referrals, and tiered rewards system.",
    highlights: [
      "Responsive frontend with React.js",
      "Integration with Shopify Polaris design system",
      "Analytics dashboards and configurable reward settings",
    ],
    technologies: ["React.js", "Polaris", "FastAPI", "MySQL"],
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Code className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="mt-2">{project.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
