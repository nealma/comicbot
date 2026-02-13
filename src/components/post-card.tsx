"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Calendar, Clock } from "lucide-react";
import { TagBadge } from "@/components/tag-badge";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/content";

const BASE_PATH = "/comicbot";

export function PostCard({ post }: { post: Post }) {
  const t = useTranslations("blog");
  const { title, description, date, tags, slugAsParams, readingTime, locale, cover } = post;

  return (
    <Link href={`${BASE_PATH}/blog/${slugAsParams}`} className="group block">
      <article className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary-500/10 dark:hover:shadow-primary-400/5 transition-all duration-300 hover:-translate-y-1">
        {cover && (
          <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-5 sm:p-6 flex flex-col gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {title}
          </h2>

          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(date, locale)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} {t("readingTime")}
            </span>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.slice(0, 3).map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-gray-400 dark:text-gray-500 self-center">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
