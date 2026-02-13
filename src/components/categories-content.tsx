"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n/locale-provider";
import { PostCard } from "./post-card";
import { useState } from "react";
import { FolderOpen } from "lucide-react";
import type { Post } from "@/lib/content";

interface CategoriesContentProps {
  categories: { category: string; count: number }[];
  posts: Post[];
}

export function CategoriesContent({ categories, posts }: CategoriesContentProps) {
  const t = useTranslations();
  const { locale } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const localePosts = posts.filter((p) => p.locale === locale);
  const localeCategories = new Map<string, number>();
  localePosts.forEach((post) => {
    post.categories.forEach((cat) => {
      localeCategories.set(cat, (localeCategories.get(cat) || 0) + 1);
    });
  });
  const filteredCategories = Array.from(localeCategories.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const filteredPosts = selectedCategory
    ? localePosts.filter((p) => p.categories.includes(selectedCategory))
    : [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100">
        <FolderOpen className="inline w-8 h-8 mr-3" />
        {t("categories.title")}
      </h1>
      <div className="flex flex-wrap gap-3 mb-10">
        {filteredCategories.map(({ category, count }) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
            }`}
          >
            {category}
            <span className="ml-2 text-xs opacity-70">
              {count} {t("categories.postsInCategory")}
            </span>
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
