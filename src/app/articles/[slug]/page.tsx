import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { getArticles } from "@/utils/getArticles";
import type { Metadata } from "next";

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

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;

  // Dynamically import the article component based on the slug
  const ArticleComponent = dynamic(() =>
    import(`../${slug}`)
      .then((mod) => mod.default)
      .catch(() => () => (
        <h1 className="text-red-500 text-center">Article Not Found</h1>
      ))
  );

  return (
    <Layout variant="article">
      <div className="p-8">
        <ArticleComponent />
      </div>
    </Layout>
  );
}
