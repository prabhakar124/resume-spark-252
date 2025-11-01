import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Phone, Download, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import img from "../../public/nano-banana-2025-10-31T18-11-54.png"

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end order-2 lg:order-1"
        >
          <div className="relative group">
            {/* Glowing ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
            
            {/* Profile image container */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
              <img
                src={img}
                alt="Prabhakar Tiwari"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 order-1 lg:order-2"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            I'm{" "}
            <span className="gradient-text inline-block">
              Prabhakar Tiwari
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl font-semibold text-foreground/80">
              Full-Stack Developer
            </p>
            <div className="flex flex-wrap gap-2">
              {["React.js", "Python", "FastAPI", "AWS"].map((tech, i) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-xl"
          >
            Building scalable web applications with 2+ years of experience.
            Passionate about creating intuitive user experiences and writing
            clean, maintainable code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Let's Talk
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group hover:bg-primary hover:text-primary-foreground transition-all"
              asChild
            >
              <a href="#" download>
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download CV
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <a href="tel:7073150463">
                <Phone className="mr-2 h-5 w-5" />
                Call Me
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"
            >
              <a
                href="https://linkedin.com/in/prabhakar-tiwari-619169249/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("skills")}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
               
          
       