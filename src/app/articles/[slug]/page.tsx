import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

type ArticlePageProps = {
  params: { slug: string };
};

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
    <Layout>
      <div className="p-8 max-w-2xl mx-auto">
        <ArticleComponent />
      </div>
    </Layout>
  );
}
