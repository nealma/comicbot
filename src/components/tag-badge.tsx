"use client";

import Link from "next/link";


interface TagBadgeProps {
  tag: string;
  link?: boolean;
  count?: number;
}

export function TagBadge({ tag, link = false, count }: TagBadgeProps) {
  const badge = (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/50 hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-default">
      <span>#</span>
      <span>{tag}</span>
      {count !== undefined && (
        <span className="text-primary-400 dark:text-primary-500">
          ({count})
        </span>
      )}
    </span>
  );

  if (link) {
    return (
      <Link
        href={`/tags/${encodeURIComponent(tag)}`}
        className="inline-block"
      >
        {badge}
      </Link>
    );
  }

  return badge;
}
