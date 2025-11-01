import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code2, Palette, Server, Database, Cloud, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["JavaScript", "Python"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Frontend",
    icon: Palette,
    skills: ["HTML", "CSS", "React", "Redux", "Material-UI"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["FastAPI", "RESTful APIs", "Swagger", "Pytest", "Locust"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "SQL"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "CI/CD Pipelines"],
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub"],
    color: "from-yellow-500 to-orange-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={category.title} variants={item}>
              <Card className="group relative overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 h-full bg-gradient-to-br from-card to-card/50 backdrop-blur hover:shadow-xl hover:shadow-primary/10">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 from-primary to-accent" />
                
                <CardContent className="p-6 relative z-10">
                  {/* Icon header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {category.title}
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
                    </h3>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-all cursor-default hover:scale-110 px-3 py-1.5"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Years Experience", value: "2.5+" },
            { label: "Technologies", value: "10+" },
            { label: "Projects", value: "5+" },
            { label: "Code Quality", value: "A+" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};