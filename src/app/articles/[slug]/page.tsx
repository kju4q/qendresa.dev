type ArticleProps = {
  params: { slug: string };
};

type Articles = {
  [key: string]: {
    title: string;
    content: string;
  };
};

export default function ArticlePage({ params }: ArticleProps) {
  const { slug } = params;

  // Simulate fetching article content (replace with actual data fetching logic)
  const articles: Articles = {
    "my-first-article": {
      title: "My First Article",
      content: "This is the content of my first article.",
    },
    "my-second-article": {
      title: "My Second Article",
      content: "This is the content of my second article.",
    },
  };

  const article = articles[slug];

  if (!article) {
    return <h1>Article Not Found</h1>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}
