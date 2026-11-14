import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHeader = ({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: string;
}) => (
  <Reveal className="mb-12 grid gap-6 border-t border-border pt-6 md:mb-16 md:grid-cols-12">
    <p className="eyebrow md:col-span-3">
      <span className="text-primary">{index}</span>
      <span className="mx-2">/</span>
      {label}
    </p>
    <div className="md:col-span-9">
      <h2 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">{intro}</p>
      )}
    </div>
  </Reveal>
);
