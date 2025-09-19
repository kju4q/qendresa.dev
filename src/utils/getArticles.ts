interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
}

// Sample articles data - in a real app, this would come from a CMS or database
const articles: Article[] = [
  {
    slug: "substack-unmasking-llm",
    title:
      "Unmasking the LLM: What Really Happens between Your Question and its Answer (and How to Trust it!)",
    date: "2024-12-15",
    description:
      "How I measure LLM speed, check if code actually works, and prove the results you see are real.",
  },
  {
    slug: "LiquidityFragmentationInLayer2sAndBeyond",
    title: "Liquidity Fragmentation in Layer 2s and Beyond",
    date: "2024-07-30",
    description:
      "Exploring the challenges of fragmented liquidity across L2 networks",
  },
  // {
  //   slug: "EthereumScalabilityChallenge",
  //   title: "Ethereum Scalability Challenge",
  //   date: "2025-06-15",
  //   description: "Analyzing Ethereum's path to scaling for global adoption",
  // },
];

export function getArticles(): Article[] {
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRecentPosts(limit: number = 10): Article[] {
  return getArticles().slice(0, limit);
}
