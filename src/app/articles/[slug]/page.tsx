// This is a Server Component
import type { Metadata } from "next";
import { getArticles } from "@/utils/getArticles";

// Import client component with proper path
import ClientArticle from "./client-article";

type ArticlePageProps = {
  params: { slug: string };
};

// Function to dynamically generate metadata based on the slug
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const articles = getArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (article) {
    return {
      title: `${article.title} - Qendresa Hoti`,
      description: `Explore insights and projects in "${article.title}" on Qendresa Hoti's blog.`,
    };
  }

  return {
    title: "Article Not Found - Qendresa Hoti",
    description:
      "The requested article could not be found on Qendresa Hoti's blog.",
  };
}

// Main page component (Server Component)
export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  
  // Return the client component with the slug prop
  return <ClientArticle slug={slug} />;
}
