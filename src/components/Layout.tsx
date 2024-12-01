import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
  variant?: "default" | "article" | "wide"; // Add "article" for a wide layout
};

export default function Layout({ children, variant = "default" }: LayoutProps) {
  return (
    <div
      className={`min-h-screen font-mono ${
        variant === "wide"
          ? "bg-white"
          : "bg-[#282a36] flex justify-center items-center"
      }`}
    >
      <div
        className={`${
          variant === "default"
            ? "container max-w-2xl px-4 py-8"
            : variant === "article"
            ? "container max-w-6xl px-8 py-12" // Adjusted width for articles
            : "w-full px-8 py-12"
        } bg-[#282a36] rounded-lg shadow-[0_0_10px_rgba(98,114,164,0.1)]`}
      >
        <Header />
        {children}
      </div>
    </div>
  );
}
