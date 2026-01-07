import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import type { ReactElement } from "react";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

const articlesDir = path.join(process.cwd(), "src/content/articles");

function getArticleFiles(): string[] {
  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".mdx"));
}

export function getMdxArticlesMeta(): ArticleMeta[] {
  const files = getArticleFiles();

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(articlesDir, file), "utf8");
      const { data } = matter(source);

      return {
        slug,
        title: String(data.title || slug),
        date: String(data.date || "1970-01-01"),
        description: String(data.description || ""),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getMdxArticleBySlug(slug: string): Promise<{
  meta: ArticleMeta;
  content: ReactElement;
} | null> {
  const filePath = path.join(articlesDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  const compiled = await compileMDX({
    source: content,
    components: { Image },
    options: { parseFrontmatter: false },
  });

  return {
    meta: {
      slug,
      title: String(data.title || slug),
      date: String(data.date || "1970-01-01"),
      description: String(data.description || ""),
    },
    content: compiled.content,
  };
}
