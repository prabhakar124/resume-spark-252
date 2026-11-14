import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Search } from "lucide-react";

/**
 * Module C: why hybrid search + re-ranking.
 * The same transcript chunks are ranked three ways; only hybrid + re-rank
 * puts all the relevant ones in the top 3 sent to the LLM.
 * Chunks, scores and the answer are an illustrative example.
 */

type Mode = "keyword" | "vector" | "hybrid";

const QUESTION = "What did my child learn about storytelling this week?";

const CHUNKS = [
  { id: "a", text: "Today we practised the three-act story structure: setup, conflict, resolution.", relevant: true },
  { id: "b", text: "One student told a story about their first day at school, using pauses to build suspense.", relevant: true },
  { id: "c", text: "Homework: write a one-minute story with a clear beginning, middle and end.", relevant: true },
  { id: "d", text: "Storytelling competition registrations open next Monday.", relevant: false },
  { id: "e", text: "We warmed up our voices with last week's tongue twisters.", relevant: false },
];

const RANKINGS: Record<Mode, { order: string[]; label: string; note: string }> = {
  keyword: {
    order: ["a", "d", "c", "b", "e"],
    label: "Keyword only",
    note: "Matches the word “storytelling”, so an unrelated announcement ranks #2 and the suspense example drops out.",
  },
  vector: {
    order: ["a", "b", "d", "c", "e"],
    label: "Vector only",
    note: "Finds similar meaning, but the announcement still sounds related and pushes the homework out of the top 3.",
  },
  hybrid: {
    order: ["a", "b", "c", "d", "e"],
    label: "Hybrid + re-rank",
    note: "Combines both signals, then a re-ranker scores each chunk against the question. All three relevant chunks reach the LLM.",
  },
};

const TOP_K = 3;
const ingestion = ["Transcript", "Filter & enrich", "Semantic chunks", "Embeddings", "Qdrant"];

export const RetrievalExplorer = () => {
  const [mode, setMode] = useState<Mode>("hybrid");
  const ranking = RANKINGS[mode];
  const ordered = ranking.order.map((id) => CHUNKS.find((c) => c.id === id)!);

  return (
    <div className="space-y-6">
      {/* Ingestion strip */}
      <div>
        <p className="eyebrow mb-3">Indexing (before any question is asked)</p>
        <div className="flex flex-wrap items-center gap-2">
          {ingestion.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-dashed border-primary/50 px-3 py-1 text-sm">{s}</span>
              {i < ingestion.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-dashed border-primary/40 bg-card">
        {/* Question */}
        <div className="flex items-start gap-3 border-b border-border px-5 py-4">
          <Search className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="eyebrow">Parent asks</p>
            <p className="mt-1 font-serif text-xl tracking-tight">“{QUESTION}”</p>
          </div>
        </div>

        {/* Mode switcher */}
        <div className="flex flex-wrap gap-1 border-b border-border bg-muted/50 p-2" role="tablist">
          {(Object.keys(RANKINGS) as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-sm px-3 py-1.5 text-sm transition-colors ${
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {RANKINGS[m].label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Ranked chunks */}
          <div className="p-5">
            <ol className="space-y-2">
              {ordered.map((c, i) => {
                const sent = i < TOP_K;
                return (
                  <motion.li
                    key={c.id}
                    layout
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className={`flex gap-3 rounded-sm border px-3 py-2.5 text-sm ${
                      sent
                        ? c.relevant
                          ? "border-primary/50 bg-primary/[0.07]"
                          : "border-destructive/50 bg-destructive/[0.06]"
                        : "border-border opacity-55"
                    }`}
                  >
                    <span className={`font-mono text-xs ${sent ? "text-primary" : "text-muted-foreground"}`}>
                      #{i + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">{c.text}</span>
                    {sent && !c.relevant && (
                      <span className="shrink-0 self-start font-mono text-[10px] uppercase text-destructive">off-topic</span>
                    )}
                  </motion.li>
                );
              })}
            </ol>
            <p className="mt-3 font-mono text-[11px] text-muted-foreground">
              Top {TOP_K} chunks are sent to the LLM as context.
            </p>
          </div>

          {/* Explanation + answer */}
          <div className="flex flex-col gap-4 border-t border-border p-5 lg:border-l lg:border-t-0">
            <p className="text-sm leading-relaxed text-muted-foreground">{ranking.note}</p>
            <div
              className={`mt-auto rounded-sm p-4 text-sm leading-relaxed transition-opacity ${
                mode === "hybrid" ? "border-l-2 border-primary bg-primary/[0.07]" : "border border-dashed border-border opacity-60"
              }`}
            >
              <p className="mb-2 flex items-center gap-2 font-medium">
                <MessageSquare className="h-4 w-4 text-primary" />
                {mode === "hybrid" ? "Grounded answer" : "Answer quality suffers"}
              </p>
              {mode === "hybrid" ? (
                <p className="text-muted-foreground">
                  This week your child learned the three-act story structure <sup className="text-primary">1</sup>,
                  practised using pauses to build suspense <sup className="text-primary">2</sup>, and has homework to
                  write a one-minute story <sup className="text-primary">3</sup>.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  With an off-topic chunk in the context, the answer can miss what was taught or mention the
                  competition instead.
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="border-t border-border px-5 py-2.5 font-mono text-[11px] text-muted-foreground">
          Illustrative example · module in progress
        </p>
      </div>
    </div>
  );
};
