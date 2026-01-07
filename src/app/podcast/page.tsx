import { TransitionLayout, Footer } from "../../components";
import Link from "next/link";
import podcasts from "../../lib/content/podcasts";
import "../home/home.css";

export default function Podcast() {
  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content">
          <div className="max-w-2xl mx-auto px-6 py-2 space-y-4">
            <section id="podcast" className="mb-8 mt-8">
              <h2 className="text-lg font-mono text-[#50fa7b] mb-2">Podcast</h2>
              <ul className="space-y-1 text-sm">
                {podcasts.map((podcast, index) => (
                  <li key={index} className="group">
                    <div className="flex flex-col space-y-1 mb-8">
                      <Link
                        href={podcast.href}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] leading-relaxed"
                        target={
                          podcast.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          podcast.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {podcast.title}
                      </Link>
                      <span className="text-[#ff79c6] text-xs font-medium">
                        {podcast.platform}
                      </span>
                      <span className="text-[#6272a4] text-xs">
                        {podcast.description}
                      </span>
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
