import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";

/**
 * Understated call-to-action leading to a case study page.
 * Default: headline + award on the left, button on the right.
 * `compact`: stacked vertically, for narrow side panels.
 */
export const CaseStudyButton = ({
  to,
  title,
  note,
  compact = false,
}: {
  to: string;
  /** One-line headline for the case study */
  title: string;
  /** Supporting line, e.g. the award */
  note?: string;
  compact?: boolean;
}) => (
  <div
    className={
      compact
        ? "flex flex-col gap-4"
        : "mt-8 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"
    }
  >
    <div className="min-w-0">
      <p className="eyebrow text-primary">Case study</p>
      <p className={`mt-1.5 font-serif leading-snug tracking-tight ${compact ? "text-xl" : "text-xl md:text-2xl"}`}>
        {title}
      </p>
      {note && (
        <p className="mt-1.5 flex items-start gap-1.5 text-sm text-muted-foreground">
          <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {note}
        </p>
      )}
    </div>
    <Link
      to={to}
      className={`group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-primary/90 ${
        compact ? "w-full" : "self-start sm:self-auto"
      }`}
    >
      Read case study
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  </div>
);
