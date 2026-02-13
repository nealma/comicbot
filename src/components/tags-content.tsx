"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n/locale-provider";
import { PostCard } from "./post-card";
import { useState } from "react";
import { Tag } from "lucide-react";
import type { Post } from "@/lib/content";

interface TagsContentProps {
  tags: { tag: string; count: number }[];
  posts: Post[];
}

export function TagsContent({ tags, posts }: TagsContentProps) {
  const t = useTranslations();
  const { locale } = useLocale();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const localePosts = posts.filter((p) => p.locale === locale);
  const localeTags = new Map<string, number>();
  localePosts.forEach((post) => {
    post.tags.forEach((tag) => {
      localeTags.set(tag, (localeTags.get(tag) || 0) + 1);
    });
  });
  const filteredTags = Array.from(localeTags.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  const filteredPosts = selectedTag
    ? localePosts.filter((p) => p.tags.includes(selectedTag))
    : [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100">
        <Tag className="inline w-8 h-8 mr-3" />
        {t("tags.title")}
      </h1>
      <div className="flex flex-wrap gap-3 mb-10">
        {filteredTags.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedTag === tag
                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30"
            }`}
          >
            {tag}
            <span className="ml-2 text-xs opacity-70">
              {count} {t("tags.postsTagged")}
            </span>
          </button>
        ))}
      </div>
      {selectedTag && (
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
