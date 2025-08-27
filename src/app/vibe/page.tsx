import { TransitionLayout, Footer } from "../../components";
import Link from "next/link";
import "../home/home.css";

const vibeProjects = [
  {
    title: "5 Minute Journal",
    href: "https://5-minute-vibe.vercel.app/",
    blurb:
      "Journaling is my go to for self-reflection and everytime I feel overwhelmed, I write. This is more like a gratitude journal and a little plan for the day. it's fun and simple to make it a habit.",
  },
  {
    title: "One line vibe",
    href: "https://vibe-summary.vercel.app/",
    blurb:
      "Sometimes I don't feel like reading a whole Twitter thread or long blog post, so I built this. Drop a link or paste text and get the gist without the fluff.",
  },
  {
    title: "PromptPin",
    href: "https://promptpin.vercel.app/",
    blurb:
      "I wanted a go-to page for the most interesting AI prompts across all media, so I vibe coded this Pinterest for prompts. First version with AI-generated prompts to get you started.",
  },
];

export default function Vibe() {
  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content" className="flex flex-col items-center">
          <div className="max-w-2xl mt-12">
            <div className="mb-8">
              <p className="mb-6 text-[#6272a4] leading-relaxed">
                Sometimes I do 7 days of vibe coding - these are what come out
                of those fun sprints. Experimental projects built for the joy of
                coding itself.
              </p>
            </div>

            <section className="mb-8">
              <ul className="space-y-4 text-sm">
                {vibeProjects.map((project, index) => (
                  <li key={index} className="group">
                    <div className="flex flex-col space-y-2 p-4 rounded-lg border border-[#44475a] hover:border-[#6272a4] transition-colors">
                      <Link
                        href={project.href}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] font-medium text-base"
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
        <Footer />
      </div>
    </TransitionLayout>
  );
}
