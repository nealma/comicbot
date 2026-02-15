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
    try {
      return new Function(code);
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
    // Velite's compiled MDX uses arguments[0] to destructure {Fragment, jsx, jsxs}
    const result = Component(runtime);
    // result = {default: function(props)}
    if (result && typeof result.default === "function") {
      return result.default({ components: sharedComponents });
    }
    return null;
  } catch {
    return <p>Error rendering content</p>;
  }
}
