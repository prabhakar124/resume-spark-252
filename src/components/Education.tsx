import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const education = [
  {
    institution: "BMIT College Sitapura, Jaipur",
    degree: "Bachelor's in Civil Engineering",
    type: "degree",
    location: "Jaipur, Rajasthan",
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    institution: "GIP Technologies Pvt. Ltd.",
    degree: "MERN Stack Internship",
    period: "August 2022 - January 2023",
    type: "certification",
    location: "Jaipur, Rajasthan",
    icon: Award,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    institution: "Grras Solutions Pvt. Ltd.",
    degree: "MERN Stack Certification & Training",
    period: "January 2022 - July 2022",
    type: "certification",
    location: "Jaipur, Rajasthan",
    icon: Award,
    gradient: "from-green-500 to-emerald-500",
  },
];

export const Education = () => {
  return (
    <section id="education" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 to-primary/5" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education & Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Continuous learning and professional development journey
          </p>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-card to-card/50 backdrop-blur hover:shadow-2xl hover:shadow-primary/20">
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Floating decoration */}
                <motion.div
                  className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${edu.gradient} rounded-full blur-2xl opacity-30`}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <CardHeader className="relative z-10">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <motion.div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${edu.gradient} text-white shadow-xl flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <edu.icon className="h-8 w-8" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors mb-2">
                            {edu.degree}
                          </CardTitle>
                          <p className="text-lg font-semibold text-muted-foreground mb-3">
                            {edu.institution}
                          </p>
                        </div>

                        {/* Type badge */}
                        <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${edu.gradient} text-white text-sm font-bold shadow-lg`}>
                          {edu.type === "degree" ? "Degree" : "Certificate"}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        {edu.period && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">{edu.period}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">{edu.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Corner decorations */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Learning philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary to-accent text-white">
              <GraduationCap className="h-8 w-8" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Lifelong Learner</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Committed to continuous learning and staying updated with the latest technologies
            and industry best practices
          </p>
        </motion.div>
      </div>
    </section>
  );
};