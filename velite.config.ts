import { defineConfig, defineCollection, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { writeFileSync } from "fs";

const computedFields = <T extends { slug: string; body: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
  readingTime: Math.ceil(data.body.split(/\s+/g).length / 200),
});

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      updated: s.isodate().optional(),
      published: s.boolean().default(true),
      locale: s.enum(["zh", "en"]),
      tags: s.array(s.string()).default([]),
      categories: s.array(s.string()).default([]),
      author: s.string().default("码上同行"),
      cover: s.string().optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/comicbot/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: { dark: "github-dark", light: "github-light" },
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
  prepare: ({ posts }) => {
    // Generate search index
    const searchIndex = posts
      .filter((p) => p.published)
      .map((p) => ({
        slug: p.slugAsParams,
        title: p.title,
        description: p.description || "",
        locale: p.locale,
        tags: p.tags,
        categories: p.categories,
      }));
    writeFileSync(
      "public/search-index.json",
      JSON.stringify(searchIndex, null, 2)
    );

    // Generate RSS feed
    const rssItems = posts
      .filter((p) => p.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20)
      .map(
        (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>https://nealma.github.io/comicbot/blog/${p.slugAsParams}</link>
      <description>${escapeXml(p.description || "")}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid>https://nealma.github.io/comicbot/blog/${p.slugAsParams}</guid>
    </item>`
      )
      .join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>码上同行 - Code Journey Together</title>
    <link>https://nealma.github.io/comicbot</link>
    <description>A father-daughter tech blog about coding adventures</description>
    <language>zh-CN</language>
    <atom:link href="https://nealma.github.io/comicbot/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;
    writeFileSync("public/feed.xml", rss);
  },
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
