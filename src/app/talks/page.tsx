import { TransitionLayout, Footer } from "../../components";
import Link from "next/link";
import "../home/home.css";

// Talks data - you can update this with your actual talks
const talks = [
  {
    title: "Building Scalable APIs Using Serverless",
    href: "https://www.youtube.com/watch?v=1Is6A0qapt8",
    event: "Open Source Summit 2022 - Linux Foundation",
    description:
      "A practical guide to building scalable APIs without managing servers. Walked through creating a serverless jewelry API using AWS Lambda, DynamoDB, and API Gateway, demonstrating how to handle automatic scaling, cost optimization, and reduced operational overhead in real-world applications",
  },
];

export default function Talks() {
  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content">
          <div className="max-w-2xl mx-auto px-6 py-2 space-y-4">
            <section id="talks" className="mb-8 mt-8">
              <h2 className="text-lg font-mono text-[#50fa7b] mb-2">Talks</h2>
              <ul className="space-y-1 text-sm">
                {talks.map((talk, index) => (
                  <li key={index} className="group">
                    <div className="flex flex-col space-y-1 mb-8">
                      <Link
                        href={talk.href}
                        className="text-[#f8f8f2] group-hover:text-[#ff79c6] focus:outline-none focus:text-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] leading-relaxed"
                        target={
                          talk.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          talk.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {talk.title}
                      </Link>
                      <span className="text-[#ff79c6] text-xs font-medium">
                        {talk.event}
                      </span>
                      <span className="text-[#6272a4] text-xs">
                        {talk.description}
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
