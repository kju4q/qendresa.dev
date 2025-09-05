"use client";

import Link from "next/link";
import { getRecentPosts } from "../../utils/getArticles";
import dynamic from "next/dynamic";
import { Footer } from "../../components";
import "./home.css";

const TransitionLayout = dynamic(
  () => import("../../components/TransitionLayout"),
  {
    ssr: false,
  }
);

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
                  <li key={post.slug} className="group">
                    <div className="flex flex-col space-y-1">
                      <Link
                        href={`/articles/${post.slug}`}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] leading-relaxed"
                      >
                        {post.title}
                      </Link>
                      <span className="text-[#6272a4] text-xs">
                        {post.description}
                      </span>
                    </div>
                  </li>
                ))}

                {/* Substack Link */}
                <li className="group">
                  <div className="flex flex-col space-y-1 mt-8">
                    <Link
                      href="https://qendresahoti.substack.com/p/unmasking-the-llm-what-really-happens"
                      className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] leading-relaxed"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unmasking the LLM: What Really Happens between Your
                      Question and its Answer (and How to Trust it!)
                    </Link>
                    <span className="text-[#6272a4] text-xs">
                      How I measure LLM speed, check if code actually works, and
                      prove the results you see are real.
                    </span>
                  </div>
                </li>
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
