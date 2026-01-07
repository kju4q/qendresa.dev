import Link from "next/link";
import { getRecentPosts } from "../../utils/getArticles";
import { Footer } from "../../components";
import TransitionLayout from "../../components/TransitionLayout";
import "./home.css";

export default function HomePage() {
  const recentPosts = getRecentPosts(8); // Limit to 8 most recent posts

  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content">
          <div className="max-w-2xl mx-auto px-6 py-2 space-y-4">
            {/* Writing Section */}
            <section id="writing" className="mb-8 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-mono text-[#50fa7b] mb-2">
                  Writing
                </h2>
              </div>
              <ul className="space-y-1 text-sm">
                {recentPosts.map((post) => (
                  <li key={post.slug} className="group mb-8">
                    <div className="flex flex-col space-y-1">
                    <Link
                        href={post.externalUrl ?? `/articles/${post.slug}`}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] leading-relaxed"
                        target={post.externalUrl ? "_blank" : undefined}
                        rel={post.externalUrl ? "noopener noreferrer" : undefined}
                      >
                        {post.title}
                      </Link>
                      <span className="text-[#6272a4] text-xs">
                        {post.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </TransitionLayout>
  );
}
