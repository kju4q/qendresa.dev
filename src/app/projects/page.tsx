import { TransitionLayout, Footer } from "../../components";
import Link from "next/link";
import projects from "../../lib/content/projects";
import "../home/home.css";

export default function Projects() {
  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content" className="flex flex-col items-center">
          <div className="max-w-2xl mt-12">
            <div className="mb-8">
              <h2 className="text-lg font-mono text-[#50fa7b] mb-4">
                Projects
              </h2>
            </div>

            <section className="mb-8">
              <ul className="space-y-1 text-sm">
                {projects.map((project, index) => (
                  <li key={index} className="group">
                    <div className="flex flex-col space-y-1 mb-8">
                      <Link
                        href={project.href}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] leading-relaxed"
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
                      <span className="text-[#6272a4] text-xs">
                        {project.blurb}
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
