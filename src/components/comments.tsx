"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Giscus from "@giscus/react";

interface CommentsProps {
  repo?: `${string}/${string}`;
  repoId?: string;
  category?: string;
  categoryId?: string;
}

export function Comments({
  repo = "nealma/comicbot",
  repoId = "placeholder",
  category = "Announcements",
  categoryId = "placeholder",
}: CommentsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <Giscus
        id="comments"
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
