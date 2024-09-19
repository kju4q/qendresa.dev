import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/placeholder-image.jpg"
            width={100}
            height={100}
            alt="Header image"
            className="mb-4"
          />
          <h1 className="text-3xl font-bold text-center">Articles</h1>
        </div>

        <p className="mb-8 text-gray-600 text-center">
          Here you can find a list of our latest articles on various topics.
        </p>

        <ul className="space-y-4">
          {[1, 2, 3].map((article) => (
            <li key={article} className="border p-4 rounded-lg">
              <Link
                href={`/article/${article}`}
                className="text-blue-600 hover:underline block text-center"
              >
                Article {article} Title
              </Link>
              <p className="text-gray-500 mt-2 text-center">
                Brief description of article {article}...
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

{
  /* <div>Blog under construction</div> */
}
