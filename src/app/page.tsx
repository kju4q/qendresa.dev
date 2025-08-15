'use client';

import Link from "next/link";
import { getRecentPosts } from "../utils/getArticles";
import { TransitionLayout } from "../components";
import projects from "../lib/content/projects";

export default function Home() {
  const recentPosts = getRecentPosts(8); // Limit to 8 most recent posts

  return (
    <TransitionLayout variant="default">

      <div className="mt-4 flex flex-col gap-12">
        {/* Writing Section */}
        <section id="writing">
          <h2 className="text-lg font-mono text-[#50fa7b] mb-6">
            Writing
          </h2>
          <ul className="space-y-4 text-sm">
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
          <h2 className="text-lg font-mono text-[#50fa7b] mb-6">
            Projects
          </h2>
          <ul className="space-y-4 text-sm">
            {projects.map((project, index) => (
              <li key={index} className="group">
                <div className="flex flex-col space-y-1">
                  <Link
                    href={project.href}
                    className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6]"
                    target={project.href.startsWith('http') ? '_blank' : undefined}
                    rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {project.title}
                  </Link>
                  <span className="text-[#6272a4] leading-relaxed">{project.blurb}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-4 border-t border-[#44475a] text-xs text-center text-[#6272a4] font-mono">
        <nav className="flex flex-wrap justify-center space-x-2">
          <Link href="/" className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]">
            home
          </Link>
          <span>·</span>
          <Link href="/about" className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]">
            about
          </Link>
          <span>·</span>
          <Link href="/#writing" className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]">
            blog
          </Link>
          <span>·</span>
          <Link href="/#projects" className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]">
            projects
          </Link>
          <span>·</span>
          <Link href="/labs/terminal" className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]">
            terminal
          </Link>
        </nav>
      </footer>
    </TransitionLayout>
  );
}
