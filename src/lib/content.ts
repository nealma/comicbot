// @ts-nocheck
// This file provides typed access to Velite content
// The .velite directory is generated at build time
import { posts as allPosts } from "#site/content";

export interface Post {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  updated?: string;
  published: boolean;
  locale: "zh" | "en";
  tags: string[];
  categories: string[];
  author: string;
  cover?: string;
  body: string;
  readingTime: number;
}

export function getAllPosts(): Post[] {
  return (allPosts as Post[])
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostsByLocale(locale: string): Post[] {
  return getAllPosts().filter((post) => post.locale === locale);
}

export function getPostBySlug(slug: string): Post | undefined {
  return (allPosts as Post[]).find((post) => post.slugAsParams === slug);
}

export function getAllTags(locale?: string): { tag: string; count: number }[] {
  const filtered = locale ? getPostsByLocale(locale) : getAllPosts();
  const tagMap = new Map<string, number>();
  filtered.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(
  locale?: string
): { category: string; count: number }[] {
  const filtered = locale ? getPostsByLocale(locale) : getAllPosts();
  const catMap = new Map<string, number>();
  filtered.forEach((post) => {
    post.categories.forEach((cat) => {
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    });
  });
  return Array.from(catMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string, locale?: string): Post[] {
  const filtered = locale ? getPostsByLocale(locale) : getAllPosts();
  return filtered.filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(
  category: string,
  locale?: string
): Post[] {
  const filtered = locale ? getPostsByLocale(locale) : getAllPosts();
  return filtered.filter((post) => post.categories.includes(category));
}
