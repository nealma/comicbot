import { getAllCategories, getAllPosts } from "@/lib/content";
import { CategoriesContent } from "@/components/categories-content";

export const metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const posts = getAllPosts();
  return <CategoriesContent categories={categories} posts={posts} />;
}
