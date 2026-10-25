import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  category: "Video Editing" | "Branding" | "Websites" | "Growth" | string;
  tags: string[];
  cover: string;
  coverAlt: string;
  author: string;
  readTime: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return data as BlogPostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null;
  }

  const files = fs.readdirSync(BLOG_DIR);
  const matchedFile = files.find(
    (f) => f.replace(/\.mdx?$/, "") === slug
  );

  if (!matchedFile) {
    return null;
  }

  const filePath = path.join(BLOG_DIR, matchedFile);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: data as BlogPostMeta,
    content,
  };
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);
  const sameCategory = allPosts.filter((post) => post.category === category);
  const otherCategory = allPosts.filter((post) => post.category !== category);
  return [...sameCategory, ...otherCategory].slice(0, limit);
}
