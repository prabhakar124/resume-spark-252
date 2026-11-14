import { useState } from "react";
import { ArrowRight } from "lucide-react";

export type FlowStep = {
  label: string;
  sub?: string;
  detail: string;
  /** Alternatives inside one step, e.g. primary / fallback providers */
  chips?: string[];
};

/**
 * Pipeline diagram: horizontal on large screens, vertical on small ones.
 * Hover (desktop) or tap a step to read what it does.
 */
export const FlowDiagram = ({ title, steps }: { title: string; steps: FlowStep[] }) => {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <figure className="overflow-hidden rounded-md border border-border bg-card">
      <figcaption className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">{title}</span>
        <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
          hover or tap a step
        </span>
      </figcaption>

      <div className="p-4 md:p-6">
        <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch">
          {steps.map((step, i) => (
            <li key={step.label} className="flex flex-col items-center gap-2 lg:min-w-0 lg:flex-1 lg:flex-row">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`flex h-full w-full flex-col items-start rounded-sm border px-3 py-3 text-left transition-colors ${
                  active === i
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-foreground/30"
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${active === i ? "text-primary" : "text-muted-foreground"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 text-sm font-medium leading-snug">{step.label}</span>
                {step.sub && (
                  <span className="mt-1 font-mono text-[10.5px] leading-snug text-muted-foreground">
                    {step.sub}
                  </span>
                )}
                {step.chips && (
                  <span className="mt-2 flex flex-wrap gap-1">
                    {step.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                )}
              </button>
              {i < steps.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 rotate-90 text-muted-foreground lg:rotate-0"
                />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-4 flex gap-3 rounded-sm border-l-2 border-primary bg-muted/60 px-4 py-3">
          <span className="font-mono text-xs text-primary">
            {String(active + 1).padStart(2, "0")}
          </span>
          <p className="text-[15px] leading-relaxed">
            <span className="font-medium">{current.label}.</span>{" "}
            <span className="text-muted-foreground">{current.detail}</span>
          </p>
        </div>
      </div>
    </figure>
  );
};
