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
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Card 
              key={project.title} 
              className={`card-hover group relative overflow-hidden border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur opacity-0 animate-scale-in stagger-${idx + 1}`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-base">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm group/item">
                        <span className="text-primary mt-0.5 text-base group-hover/item:scale-125 transition-transform">•</span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline"
                        className="hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-primary-foreground hover:border-transparent transition-all"
                      >
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
