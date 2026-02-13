"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "@/i18n/locale-provider";
import { PostCard } from "./post-card";
import Link from "next/link";
import { ArrowRight, Code2, Heart } from "lucide-react";
import type { Post } from "@/lib/content";

export function HomeContent({ posts }: { posts: Post[] }) {
  const t = useTranslations();
  const { locale } = useLocale();

  const filteredPosts = posts
    .filter((post) => post.locale === locale)
    .slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
            <Code2 className="w-4 h-4" />
            <span>Father & Daughter Coding Adventures</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-coral-500 bg-clip-text text-transparent mb-6">
            {t("home.hero")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("home.heroSub")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/comicbot/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25"
            >
              {t("home.viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/comicbot/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 font-medium transition-all hover:shadow-lg"
            >
              <Heart className="w-4 h-4 text-coral-500" />
              {t("about.title")}
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t("home.latestPosts")}
          </h2>
          <Link
            href="/comicbot/blog"
            className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
          >
            {t("home.viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            {t("blog.noPosts")}
          </p>
        )}
      </section>
    </>
  );
}
