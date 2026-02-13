"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Search, X, Command, FileText } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import FlexSearchModule from "flexsearch";

// basePath for non-Link URLs (fetch, img) — Link components auto-prefix
const ASSET_BASE = "/comicbot";

interface SearchResult {
  slug: string;
  title: string;
  description?: string;
}

interface SearchIndexEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  // Global Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border border-gray-200 dark:border-gray-700"
        onClick={() => setOpen(true)}
        aria-label={t("search")}
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline text-xs">{t("search")}</span>
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </button>

      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function SearchDialog({ open, onClose }: SearchDialogProps) {
  const t = useTranslations("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<any>(null);
  const [entries, setEntries] = useState<SearchIndexEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search index
  useEffect(() => {
    if (!open) return;

    const loadIndex = async () => {
      try {
        const res = await fetch(`${ASSET_BASE}/search-index.json`);
        const data: SearchIndexEntry[] = await res.json();
        setEntries(data);

        const FlexIndex = (FlexSearchModule as any).Index || (FlexSearchModule as any).default?.Index || FlexSearchModule;
        const searchIndex = new FlexIndex({
          tokenize: "forward",
          resolution: 9,
        });

        data.forEach((entry, i) => {
          searchIndex.add(
            i,
            `${entry.title} ${entry.description} ${entry.content} ${entry.tags.join(" ")}`
          );
        });

        setIndex(searchIndex);
      } catch {
        // Search index not available
      }
    };

    loadIndex();
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          // We need the parent to handle opening
          // This is handled by the SearchButton
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Search
  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      setSelectedIndex(0);

      if (!index || !searchQuery.trim()) {
        setResults([]);
        return;
      }

      const ids = index.search(searchQuery, { limit: 10 });
      const searchResults: SearchResult[] = (ids as number[]).map((id) => ({
        slug: entries[id].slug,
        title: entries[id].title,
        description: entries[id].description,
      }));

      setResults(searchResults);
    },
    [index, entries]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-x-4 top-[15vh] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg">
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              className="flex-1 py-4 text-base bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto">
            {query && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {t("noResults")}
              </div>
            )}

            {results.length > 0 && (
              <ul className="py-2">
                {results.map((result, i) => (
                  <li key={result.slug}>
                    <Link
                      href={`/blog/${result.slug}`}
                      className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                        i === selectedIndex
                          ? "bg-primary-50 dark:bg-primary-950/50"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                      onClick={onClose}
                    >
                      <FileText className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {result.title}
                        </div>
                        {result.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {result.description}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {!query && (
              <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                {t("placeholder")}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono">
                  &uarr;&darr;
                </kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono">
                  &crarr;
                </kbd>
                select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono">
                esc
              </kbd>
              close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SearchDialog };
