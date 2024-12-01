import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="header flex justify-center items-center">
      <div className="flex-column mr-5">
        <h1 className="text-4xl font-extrabold text-[#50fa7b] tracking-wider">
          Qendresa Hoti
        </h1>
        <p className="text-sm font-medium text-[#6272a4] italic">
          Software Engineer | Open Sourcerer
        </p>
      </div>
      <div>
        <Image
          src="/blog-image.png"
          width={200}
          height={200}
          alt="Header image"
          className="mb-4 rounded-full border-2 border-[#ff79c6]"
        />
      </div>
    </div>
  );
}
