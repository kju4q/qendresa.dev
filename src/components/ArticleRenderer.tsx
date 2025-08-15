"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { Loading } from "@/components";

export default function ArticleRenderer({ slug }: { slug: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Dynamically import the article component based on the slug
  const ArticleComponent = dynamic(
    () =>
      import(`@/app/articles/${slug}`)
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
      ssr: true,
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
              The article you're looking for doesn't exist or couldn't be
              loaded.
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
