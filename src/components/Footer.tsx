import { ArrowUp } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="container-page flex flex-col gap-4 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Prabhakar Tiwari</p>
      <p>Built with React, Tailwind & a RAG-powered assistant.</p>
      <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
        Back to top <ArrowUp className="h-3.5 w-3.5" />
      </a>
    </div>
  </footer>
);
