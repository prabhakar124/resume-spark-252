import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";

export const openChatbot = () => window.dispatchEvent(new Event("open-chatbot"));

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const stats = [
  { value: "~4 yrs", label: "Shipping web & AI products" },
  { value: "RAG · Agents", label: "LLM systems in production" },
  { value: "Next.js · FastAPI", label: "Full-stack, end to end" },
];

const TerminalCard = () => (
  <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-[0_30px_60px_-30px_hsl(var(--foreground)/0.25)]">
    <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
      </div>
      <span className="font-mono text-[11px] text-muted-foreground">rag-pipeline.py</span>
    </div>
    <div className="space-y-3 p-5 font-mono text-[12.5px] leading-relaxed">
      <p>
        <span className="text-primary">❯</span> query
        <span className="text-muted-foreground"> "what does prabhakar build?"</span>
      </p>
      <p className="text-muted-foreground">
        <span className="text-foreground">↳ embed</span> · semantic chunks → vectors
      </p>
      <p className="text-muted-foreground">
        <span className="text-foreground">↳ retrieve</span> · qdrant · hybrid + rerank · top_k=5
      </p>
      <p className="text-muted-foreground">
        <span className="text-foreground">↳ generate</span> · llm · grounded
      </p>
      <div className="rounded-sm border-l-2 border-primary bg-muted/60 px-3 py-2.5 font-sans text-[13.5px] leading-relaxed text-foreground">
        AI products that actually ship — RAG pipelines, learning assistants and agentic
        workflows, plus the fast, clean Next.js interfaces people use them through.
        <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] bg-primary animate-blink" />
      </div>
    </div>
  </div>
);

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <HeroBackground />

      <div className="container-page relative">
        <motion.div {...fade(0)} className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="eyebrow flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Currently Generative AI Engineer @ TalentGum
          </span>
          <span className="eyebrow">Jaipur, India</span>
        </motion.div>

        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.h1
              {...fade(0.08)}
              className="font-serif text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.92] tracking-tight"
            >
              Prabhakar
              <br />
              <span className="italic text-primary">Tiwari</span>
            </motion.h1>

            <motion.p
              {...fade(0.18)}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              Generative AI Engineer building{" "}
              <span className="text-foreground">RAG systems, AI agents and LLM-powered products</span>
              {" "}— and the scalable web apps that put them in people's hands.
            </motion.p>

            <motion.div {...fade(0.28)} className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={openChatbot}
                className="group inline-flex h-11 items-center gap-2 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                Ask my AI assistant
              </button>
              <a
                href="#contact"
                className="group inline-flex h-11 items-center gap-2 rounded-sm border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="ml-1 flex items-center gap-1">
                {[
                  { href: "mailto:prabhakartiwari0209@gmail.com", icon: Mail, label: "Email" },
                  { href: "tel:7073150463", icon: Phone, label: "Call" },
                  {
                    href: "https://linkedin.com/in/prabhakar-tiwari-619169249/",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div {...fade(0.35)} className="lg:col-span-5">
            <TerminalCard />
          </motion.div>
        </div>

        <motion.dl
          {...fade(0.45)}
          className="mt-20 grid grid-cols-1 border-t border-border sm:grid-cols-3 md:mt-28"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 sm:px-6 ${i > 0 ? "border-t border-border sm:border-l sm:border-t-0" : "sm:pl-0"}`}
            >
              <dt className="eyebrow mb-2">{s.label}</dt>
              <dd className="font-serif text-3xl tracking-tight">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};
