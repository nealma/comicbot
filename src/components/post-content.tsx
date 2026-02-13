"use client";

import { useTranslations } from "next-intl";
import { MDXContent } from "@/components/mdx-content";
import { TableOfContents } from "@/components/table-of-contents";
import { ReadingProgress } from "@/components/reading-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Comments } from "@/components/comments";
import { TagBadge } from "@/components/tag-badge";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";
import type { Post } from "@/lib/content";

export function PostContent({ post }: { post: Post }) {
  const t = useTranslations();

  return (
    <>
      <ReadingProgress />
      <ScrollToTop />
      <article className="max-w-6xl mx-auto px-6 py-16">
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
          {/* Main Content */}
          <div>
            {/* Post Header */}
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-coral-500/10 text-coral-500"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {post.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date, post.locale)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} {t("blog.readingTime")}
                </span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </header>

            {/* MDX Body */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXContent code={post.body} />
            </div>

            {/* Comments */}
            <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6">{t("blog.comments")}</h2>
              <Comments />
            </section>
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
