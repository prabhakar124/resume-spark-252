import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Activant Solutions PVT LTD",
    role: "Web Application Developer",
    period: "August 2025 - Present",
    current: true,
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
    current: false,
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
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Work Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building innovative solutions and growing with every project
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`relative flex items-center ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 hidden md:flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse" />
                  <div className="relative w-12 h-12 bg-background rounded-full flex items-center justify-center border-4 border-primary/20">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Card */}
                <div className={`w-full md:w-[calc(50%-4rem)] ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <Card className="group relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Current badge */}
                    {exp.current && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-lg animate-pulse">
                          Current
                        </span>
                      </div>
                    )}

                    <CardHeader className="relative z-10">
                      <div className={`flex items-start gap-4 ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-300">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                            {exp.role}
                          </CardTitle>
                          <p className="text-lg font-semibold text-muted-foreground mb-2">
                            {exp.company}
                          </p>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">{exp.period}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, achIdx) => (
                          <motion.li
                            key={achIdx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * achIdx }}
                            className="flex items-start gap-3 group/item"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                            <span className="text-muted-foreground leading-relaxed">
                              {achievement}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>

                    {/* Corner decoration */}
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full" />
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Total Experience", value: "2.5+ Years" },
            { label: "Companies Worked", value: "2" },
            { label: "Key Projects", value: "5+" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="text-3xl font-bold gradient-text mb-2">
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