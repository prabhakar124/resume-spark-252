import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold">
          Hi, I'm <span className="text-primary">Prabhakar Tiwari</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Full-Stack Developer | React.js • Python • FastAPI
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          2+ years of experience building scalable web applications with expertise in
          React, FastAPI, AWS, and GenAI technologies. Passionate about creating
          intuitive user experiences and clean, maintainable code.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => scrollToSection("contact")} size="lg">
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="tel:7073150463">
              <Phone className="mr-2 h-5 w-5" />
              7073150463
            </a>
          </Button>
        </div>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
