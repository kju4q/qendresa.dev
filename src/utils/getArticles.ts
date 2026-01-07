import "server-only";

import { getMdxArticlesMeta } from "@/lib/content/articles";

export interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  externalUrl?: string;
}

const externalArticles: Article[] = [
  {
    slug: "substack-unmasking-llm",
    title:
      "Unmasking the LLM: What Really Happens between Your Question and its Answer (and How to Trust it!)",
    date: "2024-12-15",
    description:
      "How I measure LLM speed, check if code actually works, and prove the results you see are real.",
    externalUrl:
      "https://qendresahoti.substack.com/p/unmasking-the-llm-what-really-happens",
  },
];

export function getArticles(): Article[] {
  const mdxArticles = getMdxArticlesMeta();
  const merged = [...mdxArticles, ...externalArticles];

  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRecentPosts(limit: number = 10): Article[] {
  return getArticles().slice(0, limit);
}
