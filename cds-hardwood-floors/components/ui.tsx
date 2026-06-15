import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Centered max-width content wrapper used across every section. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Small uppercase label above headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <As className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </As>
      {intro ? (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark shadow-sm shadow-wood-900/10",
  secondary:
    "bg-ink text-cream hover:bg-wood-900",
  ghost:
    "bg-transparent text-ink ring-1 ring-inset ring-wood-300 hover:bg-wood-50",
};

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

/** Internal/anchor link styled as a button. */
export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const cls = `${baseButton} ${variantClasses[variant]} ${className}`;
  // External / tel: links use a plain anchor; internal routes use next/link.
  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: {
  variant?: ButtonVariant;
} & ComponentProps<"button">) {
  return (
    <button
      className={`${baseButton} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
