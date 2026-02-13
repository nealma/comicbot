"use client";

import { useTranslations } from "next-intl";
import { Code2, Heart, Rocket, BookOpen } from "lucide-react";

export function AboutContent() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        {t("about.title")}
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          {t("about.content")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-12">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900/50 border border-primary-200 dark:border-primary-800">
          <Code2 className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {t("nav.blog")}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Web development, Python, algorithms, and more.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-coral-50 to-coral-100 dark:from-coral-950/30 dark:to-coral-900/20 border border-coral-200 dark:border-coral-800/50">
          <Heart className="w-8 h-8 text-coral-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Together
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Learning side by side, one line of code at a time.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/50">
          <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Journal
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Documenting our learning journey for others to follow.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
          <Rocket className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Projects
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Building real projects together to learn by doing.
          </p>
        </div>
      </div>
    </div>
  );
}
