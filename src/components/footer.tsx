"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Rss } from "lucide-react";

const BASE_PATH = "/comicbot";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} {t("copyright")}. All rights reserved.
          </div>

          {/* Built with */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t("builtWith")}
          </div>

          {/* RSS Link */}
          <Link
            href={`${BASE_PATH}/feed.xml`}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="RSS Feed"
          >
            <Rss className="w-4 h-4" />
            <span>RSS</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
