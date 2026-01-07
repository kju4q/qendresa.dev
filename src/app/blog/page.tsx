import Link from "next/link";
import { getArticles } from "../../utils/getArticles";
import { Footer } from "../../components";
import TransitionLayout from "../../components/TransitionLayout";
import "../home/home.css";

export default function BlogPage() {
  const allPosts = getArticles(); // Get all articles

  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content">
          <div className="max-w-2xl mx-auto px-6 py-2">
            <h1 className="text-2xl font-mono text-[#ff79c6] mt-8 mb-6">
              Blog
            </h1>

            <section>
              <ul className="space-y-2 text-sm">
                {allPosts.map((post) => (
                  <li key={post.slug} className="group">
                    <div className="flex items-center">
                      <span className="text-[#6272a4] font-mono text-xs mr-3 min-w-[80px]">
                        {post.date}
                      </span>
                      <Link
                        href={post.externalUrl ?? `/articles/${post.slug}`}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] leading-relaxed"
                        target={post.externalUrl ? "_blank" : undefined}
                        rel={post.externalUrl ? "noopener noreferrer" : undefined}
                      >
                        {post.title}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </TransitionLayout>
  );
}
