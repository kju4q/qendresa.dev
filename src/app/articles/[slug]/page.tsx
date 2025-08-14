// Page metadata component (Server Component)
import type { Metadata } from "next";
import { getArticles } from "@/utils/getArticles";

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

// Article Page Component (Client Component)
"use client";

import { useState } from 'react';
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { Loading } from "@/components";

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Dynamically import the article component based on the slug
  const ArticleComponent = dynamic(
    () => import(`../${slug}`)
      .then((mod) => {
        setIsLoading(false);
        return mod.default;
      })
      .catch((error) => {
        console.error(`Failed to load article: ${slug}`, error);
        setIsLoading(false);
        setHasError(true);
        return () => null;
      }),
    { 
      loading: () => <Loading />,
      ssr: true
    }
  );

  if (hasError) {
    return (
      <Layout variant="article">
        <div className="p-8">
          <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-red-500 text-center mb-6">
              Article Not Found
            </h1>
            <p className="text-center">
              The article you're looking for doesn't exist or couldn't be loaded.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout variant="article">
      <div className="p-8">
        <ArticleComponent />
      </div>
    </Layout>
  );
}
