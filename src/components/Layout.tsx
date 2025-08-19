import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
  variant?: "default" | "article" | "wide";
};

export default function Layout({ children, variant = "default" }: LayoutProps) {
  return (
    <div className="min-h-screen font-mono bg-[#282a36] flex flex-col">
      <div className="w-full flex justify-center">
        <div
          className={`${
            variant === "default"
              ? "container max-w-4xl px-6"
              : variant === "article"
              ? "container max-w-6xl px-8"
              : "w-full px-8"
          }`}
        >
          <Header />
        </div>
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
