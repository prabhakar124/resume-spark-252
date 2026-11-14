import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, ArrowDownToLine } from "lucide-react";

const links = [
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/** `minimal` is used on sub-pages: section links are replaced by a link home. */
export const Navbar = ({ minimal = false }: { minimal?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [{ id: "top" }, ...links].forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-foreground font-serif text-lg italic text-background transition-colors group-hover:bg-primary">
            P
          </span>
          <span className="hidden font-mono text-xs tracking-wide text-muted-foreground sm:inline">
            prabhakar.tiwari
          </span>
        </a>

        {minimal ? (
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Portfolio
          </Link>
        ) : (
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-sm px-3 py-1.5 text-sm transition-colors ${
                  active === l.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === l.id && <span className="mr-1.5 text-primary">•</span>}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="/Prabhakar_Tiwari_Resume.pdf"
            download="Prabhakar_Tiwari_Resume.pdf"
            className="flex h-9 items-center gap-2 rounded-sm bg-foreground px-3 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowDownToLine className="h-4 w-4" />
            <span>Resume</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
