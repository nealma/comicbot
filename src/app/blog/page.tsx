import { getAllPosts } from "@/lib/content";
import { BlogListContent } from "@/components/blog-list-content";

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListContent posts={posts} />;
}
