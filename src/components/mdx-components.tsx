"use client";

import { useState, type ReactNode, type HTMLAttributes } from "react";
import Link from "next/link";
import {
  ClipboardCopy,
  Check,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

/* ─────────────────────────────────────────────
 * CodeBlock - pre wrapper with copy button
 * ───────────────────────────────────────────── */

interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  children?: ReactNode;
}

function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeEl = (
      (props as Record<string, unknown>)["data-rehype-pretty-code-figure"]
        ? document.querySelector("[data-rehype-pretty-code-figure] code")
        : null
    ) as HTMLElement | null;

    // Try to extract text from children
    const pre = document.querySelector("pre:hover code");
    const text = pre?.textContent || "";

    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-6">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-200/80 dark:bg-gray-700/80 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-all z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <ClipboardCopy className="w-4 h-4" />
        )}
      </button>
      <pre
        {...props}
        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 overflow-x-auto text-sm leading-relaxed"
      >
        {children}
      </pre>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Callout - tip / warning / info box
 * ───────────────────────────────────────────── */

type CalloutVariant = "tip" | "warning" | "info";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutVariant,
  {
    icon: typeof Info;
    bgClass: string;
    borderClass: string;
    iconClass: string;
    titleClass: string;
  }
> = {
  info: {
    icon: Info,
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-200 dark:border-blue-800",
    iconClass: "text-blue-500",
    titleClass: "text-blue-800 dark:text-blue-300",
  },
  tip: {
    icon: Lightbulb,
    bgClass: "bg-green-50 dark:bg-green-950/30",
    borderClass: "border-green-200 dark:border-green-800",
    iconClass: "text-green-500",
    titleClass: "text-green-800 dark:text-green-300",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-200 dark:border-amber-800",
    iconClass: "text-amber-500",
    titleClass: "text-amber-800 dark:text-amber-300",
  },
};

function Callout({ variant = "info", title, children }: CalloutProps) {
  const config = calloutConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={`my-6 rounded-xl border ${config.borderClass} ${config.bgClass} p-4`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconClass}`} />
        <div className="min-w-0 flex-1">
          {title && (
            <div className={`font-semibold text-sm mb-1 ${config.titleClass}`}>
              {title}
            </div>
          )}
          <div className="text-sm text-gray-700 dark:text-gray-300 [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Image - responsive image with optional caption
 * ───────────────────────────────────────────── */

interface MdxImageProps {
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

function MdxImage({ src, alt, caption, width, height }: MdxImageProps) {
  return (
    <figure className="my-8">
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <img
          src={src}
          alt={alt || ""}
          width={width}
          height={height}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {(caption || alt) && (
        <figcaption className="mt-2.5 text-center text-sm text-gray-500 dark:text-gray-400">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  );
}

/* ─────────────────────────────────────────────
 * Styled HTML Elements for Prose
 * ───────────────────────────────────────────── */

function H1(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4 tracking-tight"
    />
  );
}

function H2(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4 tracking-tight scroll-mt-24 border-b border-gray-200 dark:border-gray-800 pb-2"
    />
  );
}

function H3(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-3 scroll-mt-24"
    />
  );
}

function H4(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      {...props}
      className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-2 scroll-mt-24"
    />
  );
}

function H5(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      {...props}
      className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2 scroll-mt-24"
    />
  );
}

function H6(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      {...props}
      className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-4 mb-2 uppercase tracking-wide scroll-mt-24"
    />
  );
}

function P(props: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className="text-base leading-7 text-gray-700 dark:text-gray-300 my-4"
    />
  );
}

function A({
  href,
  children,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  const isExternal = href?.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 underline underline-offset-2 decoration-primary-300 dark:decoration-primary-700 hover:decoration-primary-500 dark:hover:decoration-primary-400 transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href || "#"}
      className="text-primary-600 dark:text-primary-400 underline underline-offset-2 decoration-primary-300 dark:decoration-primary-700 hover:decoration-primary-500 dark:hover:decoration-primary-400 transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
}

function UL(props: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      {...props}
      className="my-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300 marker:text-primary-400 dark:marker:text-primary-500"
    />
  );
}

function OL(props: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      {...props}
      className="my-4 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300 marker:text-primary-500 dark:marker:text-primary-400"
    />
  );
}

function Blockquote(props: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-primary-500 bg-primary-50/50 dark:bg-primary-950/20 pl-4 py-3 text-gray-700 dark:text-gray-300 italic rounded-r-lg [&>p]:my-0"
    />
  );
}

function Table(props: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table
        {...props}
        className="w-full text-sm text-left text-gray-700 dark:text-gray-300"
      />
    </div>
  );
}

function TH(props: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700"
    />
  );
}

function TD(props: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className="px-4 py-3 border-b border-gray-100 dark:border-gray-800"
    />
  );
}

function HR(props: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      {...props}
      className="my-8 border-gray-200 dark:border-gray-800"
    />
  );
}

/* ─────────────────────────────────────────────
 * Export MDX Components Map
 * ───────────────────────────────────────────── */

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  a: A,
  ul: UL,
  ol: OL,
  blockquote: Blockquote,
  table: Table,
  th: TH,
  td: TD,
  hr: HR,
  pre: CodeBlock,
  img: MdxImage,
  Callout,
  Image: MdxImage,
  CodeBlock,
};

export { CodeBlock, Callout, MdxImage, H1, H2, H3, H4, H5, H6, P, A, UL, OL, Blockquote, Table, TH, TD, HR };
