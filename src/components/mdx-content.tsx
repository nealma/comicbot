"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";
import { mdxComponents } from "./mdx-components";

interface MDXContentProps {
  code: string;
}

const sharedComponents = {
  ...mdxComponents,
};

function useMDXComponent(code: string) {
  const fn = useMemo(() => {
    const scope = { ...runtime };
    try {
      const fn = new Function("_components", ...Object.keys(scope), code);
      return fn;
    } catch {
      return null;
    }
  }, [code]);
  return fn;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  if (!Component) return null;

  try {
    const content = Component(sharedComponents, ...Object.values(runtime));
    if (typeof content === "function") {
      return content({ components: sharedComponents });
    }
    return content;
  } catch {
    return <p>Error rendering content</p>;
  }
}
