"use client";

import Link from "next/link";
import { getRecentPosts } from "../../utils/getArticles";
import dynamic from "next/dynamic";
import projects from "../../lib/content/projects";

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
      <div className="flex flex-col justify-between h-full min-h-[calc(100vh-5rem)]">
        <div className="flex-grow-0">
          <div className="max-w-2xl mx-auto px-6 py-4 space-y-8 mt-12">
            {/* Writing Section */}
            <section id="writing">
              <h2 className="text-lg font-mono text-[#50fa7b] mb-3">Writing</h2>
              <ul className="space-y-2 text-sm">
                {recentPosts.map((post) => (
                  <li key={post.slug} className="group">
                    <div className="flex flex-col space-y-1">
                      <Link
                        href={`/articles/${post.slug}`}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] leading-relaxed"
                      >
                        {post.title}
                      </Link>
                      <span className="text-[#6272a4] font-mono text-xs">
                        {post.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Projects Section */}
            <section id="projects">
              <h2 className="text-lg font-mono text-[#50fa7b] mb-3">
                Projects
              </h2>
              <ul className="space-y-2 text-sm">
                {projects.map((project, index) => (
                  <li key={index} className="group">
                    <div className="flex flex-col space-y-1">
                      <Link
                        href={project.href}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6]"
                        target={
                          project.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          project.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {project.title}
                      </Link>
                      <span className="text-[#6272a4] leading-relaxed">
                        {project.blurb}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#44475a] mt-8">
          <div className="max-w-2xl mx-auto px-6">
            <nav className="flex flex-wrap justify-center space-x-2 py-2 text-xs text-[#6272a4] font-mono">
              <Link
                href="/"
                className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]"
              >
                terminal
              </Link>
              <span>·</span>
              <Link
                href="/about"
                className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]"
              >
                about
              </Link>
              <span>·</span>
              <Link
                href="#writing"
                className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]"
              >
                blog
              </Link>
              <span>·</span>
              <Link
                href="#projects"
                className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]"
              >
                projects
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </TransitionLayout>
  );
}
