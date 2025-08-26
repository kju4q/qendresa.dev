import { TransitionLayout, Footer } from "../../components";
import Image from "next/image";
import Link from "next/link";
import "../home/home.css";

export default function About() {
  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content" className="flex flex-col items-center">
          <div className="max-w-2xl mt-12">
            <p className="mb-3 text-[#6272a4]">
              Hi, I'm <span className="font-bold text-[#ff79c6]">Qendresa</span>
              , or just{" "}
              <a
                href="https://twitter.com/kjut4q"
                target="_blank"
                rel="noopener noreferrer"
                className="italic text-[#50fa7b] hover:underline inline-flex items-center"
              >
                Q <span className="ml-1">🐦</span>
              </a>
              . I’m a developer and community builder who loves creating things
              that bring people together. I build tools, write my learnings, and
              explore how communities can flourish through technology. I care
              about making technology feel simple, approachable, and human.
            </p>

            <p className="mb-3 text-[#6272a4]">
              Outside of work, I’m someone who feels most alive with music
              around me. I love dancing, exploring new places, and capturing
              small moments with my camera. Those pieces of joy fuel the energy
              I bring back into my work.
            </p>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#50fa7b] mb-2 mt-3">
                My Background
              </h2>
              <p className="mb-3 text-[#6272a4]">
                I started my career building web applications and working with
                cloud infrastructure, where I learned how much design and
                usability matter. From the beginning I was drawn to open source
                and the way it connects people through shared tools and
                knowledge. Over time I became most passionate about creating UI
                libraries, developer tools, and community-driven projects that
                help others build faster and better. Now I am exploring how AI
                can expand that work by making creativity, collaboration, and
                technology even more accessible.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  );
}
