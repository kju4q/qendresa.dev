import { notFound } from "next/navigation";
import { Footer, TransitionLayout } from "@/components";
import WorkflowDropGate from "./workflow-drop-gate";
import "../../home/home.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Workflow Drop",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function getToken(
  searchParams?: Promise<Record<string, string | string[] | undefined>>
) {
  const resolved = searchParams ? await searchParams : undefined;
  const raw = resolved?.token;
  if (Array.isArray(raw)) {
    return raw[0] || "";
  }
  return raw || "";
}

export default async function WorkflowDropPage({ searchParams }: PageProps) {
  const token = await getToken(searchParams);
  if (!token) {
    notFound();
  }

  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content">
          <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
            <WorkflowDropGate token={token} />
          </div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  );
}
