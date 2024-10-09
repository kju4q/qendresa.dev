import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#282a36] font-mono">
      <div className="container max-w-2xl mx-auto px-4 py-8 bg-[#282a36] rounded-lg shadow-[0_0_10px_rgba(98,114,164,0.1)]">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/placeholder-image.jpg"
            width={100}
            height={100}
            alt="Header image"
            className="mb-4 rounded-full border-2 border-[#ff79c6]"
          />
          <h1 className="text-3xl font-bold text-center text-[#50fa7b] tracking-wider">
            &lt;Articles /&gt;
          </h1>
        </div>

        <p className="mb-8 text-[#6272a4] text-center">
          Hi, I am Qendresa, Q for short. I'm a developer, open sourcer-er, and
          community builder. I like writing code, talking to people and
          sometimes documenting. On the side, I'm usually daydreaming about my
          next project or chocolates.
        </p>

        <ul className="space-y-4">
          {[1, 2, 3].map((article) => (
            <li
              key={article}
              className="border border-[#44475a] p-4 rounded-lg hover:bg-[#44475a] transition-colors duration-300"
            >
              <Link
                href={`/article/${article}`}
                className="text-[#8be9fd] hover:underline block text-center"
              >
                Article_{article}.title
              </Link>
              <p className="text-[#f8f8f2] mt-2 text-center">
                console.log("Brief description of article {article}...")
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
