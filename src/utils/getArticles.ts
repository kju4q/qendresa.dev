interface Article {
  slug: string;
  title: string;
  date: string;
}

// Sample articles data - in a real app, this would come from a CMS or database
const articles: Article[] = [
  {
    slug: "LiquidityFragmentationInLayer2sAndBeyond",
    title: "Liquidity Fragmentation in Layer 2s and Beyond",
    date: "2025-07-30"
  },
  {
    slug: "EthereumScalabilityChallenge",
    title: "Ethereum Scalability Challenge",
    date: "2025-06-15"
  },
  {
    slug: "BuildingDecentralizedApplications",
    title: "Building Decentralized Applications",
    date: "2025-05-22"
  },
  {
    slug: "IntroductionToSmartContracts",
    title: "Introduction to Smart Contracts",
    date: "2025-04-10"
  },
  {
    slug: "WebDevelopmentTrends2025",
    title: "Web Development Trends 2025",
    date: "2025-03-05"
  },
  {
    slug: "ProgrammingWithTypescript",
    title: "Programming with TypeScript",
    date: "2025-02-18"
  },
  {
    slug: "BlockchainInteroperability",
    title: "Blockchain Interoperability",
    date: "2025-01-25"
  },
  {
    slug: "ZeroKnowledgeProofs",
    title: "Zero Knowledge Proofs",
    date: "2024-12-12"
  },
  {
    slug: "TheFutureOfCrypto",
    title: "The Future of Crypto",
    date: "2024-11-05"
  },
  {
    slug: "BuildingReactComponents",
    title: "Building React Components",
    date: "2024-10-20"
  }
];

export function getArticles(): Article[] {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRecentPosts(limit: number = 10): Article[] {
  return getArticles().slice(0, limit);
}
