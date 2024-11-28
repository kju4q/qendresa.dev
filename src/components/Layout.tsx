import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#282a36] font-mono">
      <div className="container max-w-2xl mx-auto px-4 py-8 bg-[#282a36] rounded-lg shadow-[0_0_10px_rgba(98,114,164,0.1)]">
        <Header />
        {children}
      </div>
    </div>
  );
}
