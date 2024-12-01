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
          &lt;workAndWords /&gt;
        </h1>
      </div>

      <p className="mb-8 text-[#6272a4] text-center">
        Hi, I’m <span className="font-bold text-[#ff79c6]">Qendresa</span>, or
        simply <span className="italic text-[#50fa7b]">Q</span>. As a developer,
        open-source contributor, and community builder, I thrive at the
        intersection of technology and collaboration. My journey is about
        writing meaningful code, engaging with people, and documenting my
        learning.
        <br />
        When I’m not coding, you’ll find me daydreaming about my next project,
        indulging in chocolates, or exploring ways to make decentralized systems
        more inclusive and efficient.
      </p>

      <ul className="space-y-4">
        {articles.map((article) => (
          <li
            key={article.slug}
            className="border p-4 rounded-lg bg-[#1e1f29] hover:bg-[#282a36] transition shadow"
          >
            <Link
              href={`/articles/${article.slug}`}
              className="text-lg font-medium text-[#ff79c6] hover:underline"
            >
              <span className="text-[#ff79c6]">
                {article.title.split(" ")[0]}
              </span>{" "}
              {article.title.split(" ").slice(1).join(" ")}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
