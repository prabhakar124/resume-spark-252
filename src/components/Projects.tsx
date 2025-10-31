import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Sparkles, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
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
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Portfolio Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world applications solving complex business challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <Card className="group relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 h-full bg-gradient-to-br from-card to-card/50 backdrop-blur hover:shadow-2xl hover:shadow-primary/20">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating icon */}
                <motion.div
                  className={`absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br ${project.gradient} rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity`}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <CardHeader className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <project.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors mb-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  {/* Key features */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                      <Code className="h-4 w-4" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, hIdx) => (
                        <motion.li
                          key={hIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * hIdx }}
                          className="flex items-start gap-3 group/item"
                        >
                          <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {highlight}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-accent">
                      <Sparkles className="h-4 w-4" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, tIdx) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * tIdx }}
                        >
                          <Badge
                            variant="outline"
                            className="hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white hover:border-transparent transition-all cursor-default hover:scale-110"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full" />
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent rounded-br-full" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">
              More amazing projects coming soon...
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};