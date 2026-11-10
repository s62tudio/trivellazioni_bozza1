import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Rende un testo; se è un placeholder [tra parentesi] lo evidenzia. */
export function Text({ children, className = "" }: { children: string; className?: string }) {
  const isPlaceholder = /^\[.*\]$/.test(children.trim());
  if (!isPlaceholder) return <span className={className}>{children}</span>;
  return (
    <span className={`ph ${className}`} title="Contenuto da inserire">
      {children.slice(1, -1)}
    </span>
  );
}

/** Triangolo rovesciato: motivo grafico derivato dal logo. */
export function Wedge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 18" aria-hidden="true" className={className}>
      <path d="M0 0h20L10 18z" fill="currentColor" />
    </svg>
  );
}

export function Eyebrow({
  index,
  children,
  tone = "dark",
}: {
  index?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] ${
        tone === "light" ? "text-white/65" : "text-ink/65"
      }`}
    >
      <Wedge className="h-2.5 w-3 text-brand" />
      {index && <span className={tone === "light" ? "text-brand-300" : "text-brand-700"}>{index}</span>}
      <span>{children}</span>
    </p>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const styles = {
    primary: "bg-brand text-ink hover:bg-ink hover:text-white",
    ghost: "border border-current/30 hover:bg-ink hover:text-white hover:border-ink",
    dark: "bg-ink text-white hover:bg-brand",
  }[variant];

  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-12 items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors duration-300 ${styles} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/** Badge che segnala le fotografie dimostrative. */
export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none inline-block rounded-full bg-ink/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm ${className}`}
    >
      Foto dimostrativa
    </span>
  );
}
