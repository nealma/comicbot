"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { List, ChevronDown } from "lucide-react";

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const t = useTranslations("blog");
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Extract headings from DOM
  useEffect(() => {
    const elements = document.querySelectorAll("article h2, article h3");
    const items: TocHeading[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName[1]),
    }));
    setHeadings(items);
  }, []);

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <List className="w-4 h-4" />
          {t("tableOfContents")}
        </h3>
        <ul className="space-y-1 text-sm border-l-2 border-gray-200 dark:border-gray-700">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left py-1.5 transition-colors border-l-2 -ml-[2px] ${
                  heading.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === heading.id
                    ? "border-primary-500 text-primary-600 dark:text-primary-400 font-medium"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: Collapsible */}
      <div className="lg:hidden mb-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4" />
            {t("tableOfContents")}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isCollapsed ? "" : "rotate-180"
            }`}
          />
        </button>

        {!isCollapsed && (
          <ul className="px-4 pb-3 space-y-1 text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  type="button"
                  onClick={() => {
                    scrollToHeading(heading.id);
                    setIsCollapsed(true);
                  }}
                  className={`block w-full text-left py-1.5 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                    heading.level === 3 ? "pl-4" : "pl-0"
                  } ${
                    activeId === heading.id
                      ? "text-primary-600 dark:text-primary-400 font-medium"
                      : ""
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
