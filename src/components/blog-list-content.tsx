"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n/locale-provider";
import { PostCard } from "./post-card";
import { Pagination } from "./pagination";
import { useState } from "react";
import { POSTS_PER_PAGE } from "@/lib/utils";
import type { Post } from "@/lib/content";

export function BlogListContent({ posts }: { posts: Post[] }) {
  const t = useTranslations();
  const { locale } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts.filter((post) => post.locale === locale);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100">
          {t("blog.title")}
        </h1>
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {paginatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            {t("blog.noPosts")}
          </p>
        )}
      </div>
    </>
  );
}
