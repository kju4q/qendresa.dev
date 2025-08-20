import { TransitionLayout, Footer } from "../../components";
import Image from "next/image";
import Link from "next/link";
import "../home/home.css";

export default function About() {
  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content" className="flex flex-col items-center">
          <div className="max-w-2xl mx-auto">
          <p className="mb-3 text-[#6272a4]">
            Hi, I'm <span className="font-bold text-[#ff79c6]">Qendresa</span>,
            or simply{" "}
            <a
              href="https://twitter.com/kjut4q"
              target="_blank"
              rel="noopener noreferrer"
              className="italic text-[#50fa7b] hover:underline inline-flex items-center"
            >
              Q <span className="ml-1">🐦</span>
            </a>
            . As a developer, open-source contributor, and community builder, I
            thrive at the intersection of technology and collaboration. My
            journey is about writing meaningful code, engaging with people, and
            documenting my learning.
          </p>

          <p className="mb-3 text-[#6272a4]">
            When I'm not coding, you'll find me daydreaming about my next
            project, indulging in chocolates, or exploring ways to make
            decentralized systems more inclusive and efficient.
          </p>

          <h2 className="text-xl font-semibold text-[#50fa7b] mb-2 mt-3">
            My Background
          </h2>
          <p className="mb-3 text-[#6272a4]">
            With a background in software engineering and blockchain technology,
            I've worked on a variety of projects from web applications to
            decentralized protocols. I'm particularly interested in the
            intersection of user experience design and blockchain technology,
            finding ways to make complex technologies accessible to everyone.
          </p>

          <h2 className="text-xl font-semibold text-[#50fa7b] mb-2 mt-3">
            What I'm Doing Now
          </h2>
          <p className="mb-3 text-[#6272a4]">
            Currently, I'm focusing on building tools for Web3 developers and
            researching Layer 2 solutions for blockchain scaling. I'm also
            committed to documenting my journey through writing and
            open-sourcing my projects whenever possible.
          </p>

          <div className="mt-3 text-center">
            <Link
              href="/home"
              className="text-[#50fa7b] hover:underline inline-flex items-center"
            >
              Return to home
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
        </div>
        
        <Footer />
      </div>
    </TransitionLayout>
  );
}
