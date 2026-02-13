import { getAllTags, getAllPosts } from "@/lib/content";
import { TagsContent } from "@/components/tags-content";

export const metadata = {
  title: "Tags",
};

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();
  return <TagsContent tags={tags} posts={posts} />;
}
