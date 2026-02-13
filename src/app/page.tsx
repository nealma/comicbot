import { getAllPosts } from "@/lib/content";
import { HomeContent } from "@/components/home-content";

export default function HomePage() {
  const posts = getAllPosts();
  return <HomeContent posts={posts} />;
}
