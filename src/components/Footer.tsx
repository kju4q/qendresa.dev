"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#44475a] mt-auto">
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
            href="/blog"
            className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]"
          >
            blog
          </Link>
          <span>·</span>
          <Link
            href="/projects"
            className="hover:text-[#50fa7b] focus:text-[#50fa7b] focus:outline-none focus:ring-1 focus:ring-[#50fa7b]"
          >
            projects
          </Link>
        </nav>
      </div>
    </footer>
  );
}
