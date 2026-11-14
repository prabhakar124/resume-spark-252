import { ArrowRight, ArrowDown, FileText } from "lucide-react";

/**
 * Module A add-on: 8 class-summary JSON files feed one monthly parent report.
 * Topic names and ratings are an illustrative sample, not real student data.
 */

const sampleTopics = [
  { topic: "Storytelling structure", rating: 4 },
  { topic: "Voice & pace", rating: 3 },
  { topic: "Stage confidence", rating: 4 },
  { topic: "Vocabulary", rating: 5 },
];

export const ParentReportVisual = () => (
  <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1.1fr]">
    {/* 8 summaries */}
    <div>
      <p className="eyebrow mb-3">Input · 8 class summaries</p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex h-16 flex-col items-center justify-center rounded-sm border border-border bg-card"
          >
            <span className="font-mono text-[13px] text-primary">{"{ }"}</span>
            <span className="mt-1 font-mono text-[10px] text-muted-foreground">class {i + 1}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-center gap-2 py-2 text-muted-foreground lg:flex-col lg:px-2">
      <span className="font-mono text-[10px] uppercase tracking-wider">LLM</span>
      <ArrowRight className="hidden h-5 w-5 text-primary lg:block" />
      <ArrowDown className="h-5 w-5 text-primary lg:hidden" />
    </div>

    {/* Report card */}
    <div className="rounded-md border border-primary/40 bg-card shadow-[0_20px_40px_-28px_hsl(var(--primary)/0.6)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <FileText className="h-4 w-4 text-primary" />
          Monthly parent report
        </p>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">sample</span>
      </div>
      <div className="space-y-3 px-4 py-4">
        <p className="text-sm text-muted-foreground">What your child learned across 8 classes:</p>
        {sampleTopics.map((t) => (
          <div key={t.topic} className="flex items-center justify-between gap-3">
            <span className="text-sm">{t.topic}</span>
            <span className="flex gap-1" aria-label={`${t.rating} out of 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`h-2 w-5 rounded-full ${i < t.rating ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
