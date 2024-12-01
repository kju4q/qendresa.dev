import Link from "next/link";
import "../styles/globals.css";
import { getArticles } from "../utils/getArticles";
import Layout from "../components/Layout";

export default function Home() {
  const articles = getArticles();

  return (
    <Layout variant="default">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold text-center text-[#50fa7b] tracking-wider">
          &lt;Articles /&gt;
        </h1>
      </div>

      <p className="mb-8 text-[#6272a4] text-center">
        Hi, I am Qendresa, Q for short. I'm a developer, open sourcer-er, and
        community builder. I like writing code, talking to people and sometimes
        documenting. On the side, I'm usually daydreaming about my next project
        or chocolates.
      </p>

      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="border p-4 rounded shadow">
            <Link
              href={`/articles/${article.slug}`}
              className="text-blue-600 hover:underline"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
