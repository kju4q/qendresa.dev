// This is a Server Component
import type { Metadata } from "next";
import { getArticles } from "@/utils/getArticles";
import { getMdxArticleBySlug } from "@/lib/content/articles";
import { ArticleOnlyLayout, Footer } from "@/components";

// Import client component with proper path
import ClientArticle from "./client-article";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// Function to dynamically generate metadata based on the slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);

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
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const mdxArticle = await getMdxArticleBySlug(slug);

  if (mdxArticle) {
    return (
      <ArticleOnlyLayout>
        <div id="home-page-container">
          <div id="home-content" className="p-8">
            <div className="max-w-4xl mx-auto">{mdxArticle.content}</div>
          </div>
          <Footer />
        </div>
      </ArticleOnlyLayout>
    );
  }

  // Return the client component with the slug prop
  return <ClientArticle slug={slug} />;
}
