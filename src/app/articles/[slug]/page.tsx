import dynamic from "next/dynamic";

type ArticlePageProps = {
  params: { slug: string };
};

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;

  // Dynamically import the article component based on the slug
  const ArticleComponent = dynamic(() =>
    import(`../${slug}`).catch(() => () => <h1>Article Not Found</h1>)
  );

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <ArticleComponent />
    </div>
  );
}
