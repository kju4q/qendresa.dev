import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";
import { getArticles } from "../utils/getArticles";
import Header from "../components/Header";

export default function Home() {
  const articles = getArticles();

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#282a36] font-mono">
      <div className="container max-w-2xl mx-auto px-4 py-8 bg-[#282a36] rounded-lg shadow-[0_0_10px_rgba(98,114,164,0.1)]">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-[#50fa7b] tracking-wider">
            &lt;Articles /&gt;
          </h1>
        </div>
        <Header />

        <p className="mb-8 text-[#6272a4] text-center">
          Hi, I am Qendresa, Q for short. I'm a developer, open sourcer-er, and
          community builder. I like writing code, talking to people and
          sometimes documenting. On the side, I'm usually daydreaming about my
          next project or chocolates.
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
      </div>
    </div>
  );
}
