import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
  variant?: "default" | "article" | "wide";
};

export default function Layout({ children, variant = "default" }: LayoutProps) {
  return (
    <div
      className="min-h-screen font-mono bg-[#282a36] flex justify-center"
    >
      <div
        className={`${
          variant === "default"
            ? "container max-w-4xl px-6 pt-4"
            : variant === "article"
            ? "container max-w-6xl px-8 pt-4"
            : "w-full px-8 pt-4"
        }`}
      >
        <Header />
        {children}
      </div>
    </div>
  );
}
