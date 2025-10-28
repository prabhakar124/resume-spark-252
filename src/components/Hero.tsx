import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold opacity-0 animate-fade-in-up">
          Hi, I'm <span className="gradient-text">Prabhakar Tiwari</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground opacity-0 animate-fade-in-up stagger-1">
          Full-Stack Developer | React.js • Python • FastAPI
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up stagger-2">
          2+ years of experience building scalable web applications with expertise in
          React, FastAPI, AWS, and GenAI technologies. Passionate about creating
          intuitive user experiences and clean, maintainable code.
        </p>
        <div className="flex flex-wrap gap-4 justify-center opacity-0 animate-fade-in-up stagger-3">
          <Button 
            onClick={() => scrollToSection("contact")} 
            size="lg"
            className="group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Contact Me
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          <Button variant="outline" size="lg" asChild className="group">
            <a href="tel:7073150463">
              <Phone className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              7073150463
            </a>
          </Button>
        </div>
        <div className="flex gap-4 justify-center opacity-0 animate-fade-in-up stagger-4">
          <Button 
            variant="outline" 
            size="icon" 
            asChild
            className="hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            asChild
            className="hover:border-accent hover:bg-accent/10 transition-all duration-300"
          >
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
