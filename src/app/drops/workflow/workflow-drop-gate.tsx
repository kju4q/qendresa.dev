"use client";

import { useEffect, useRef, useState } from "react";

type GateStatus =
  | "checking"
  | "ready"
  | "invalid"
  | "used"
  | "error"
  | "submitting"
  | "unlocked";

type GateForm = {
  firstName: string;
  lastName: string;
  email: string;
};

type WorkflowDropGateProps = {
  token: string;
};

const workflowSteps = [
  "Outcome in 1 sentence (definition of done)",
  "Constraints (stack, style, edge cases)",
  "Plan first, then code",
  "Build in small chunks",
  "Verify + iterate (do not dump everything at once)",
];

const workflowTemplate = `Outcome (1 sentence)
- "When I can ________, this is done."

Constraints
- Stack:
- Style:
- Edge cases:
- Non-goals:

Plan (3-7 steps)
1.
2.
3.

Build (small chunks)
- Ship chunk #1:
- Ship chunk #2:

Verify + iterate
- Tests / checks:
- What to refine:`;

const promptCards = [
  {
    id: "prompt-plan",
    title: "Prompt 1 - clarify + plan",
    body:
      "Act as my senior engineer. Ask any missing questions about the outcome and constraints below. Then give me a short plan (3-7 steps) before any code.",
  },
  {
    id: "prompt-build",
    title: "Prompt 2 - build in chunks",
    body:
      "Implement step 1 only. Provide the smallest change set and ask me to confirm before continuing.",
  },
  {
    id: "prompt-verify",
    title: "Prompt 3 - verify",
    body:
      "Review this change for bugs, regressions, and missing tests. Be critical.",
  },
];

export default function WorkflowDropGate({ token }: WorkflowDropGateProps) {
  const [status, setStatus] = useState<GateStatus>("checking");
  const [form, setForm] = useState<GateForm>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const autoRedeemRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    if (!token) {
      setStatus("invalid");
      return;
    }

    const checkToken = async () => {
      try {
        const response = await fetch(
          `/api/drops/workflow?token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );
        if (!isMounted) return;

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          if (data?.autoUnlock && !autoRedeemRef.current) {
            autoRedeemRef.current = true;
            await redeemToken();
            return;
          }
          setStatus("ready");
          return;
        }

        if (response.status === 410) {
          setStatus("used");
          return;
        }

        setStatus("invalid");
      } catch {
        if (isMounted) {
          setStatus("error");
        }
      }
    };

    checkToken();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleChange = (field: keyof GateForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const redeemToken = async (override?: Partial<GateForm>) => {
    setError(null);
    setStatus("submitting");

    try {
      const response = await fetch("/api/drops/workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: override?.email ?? form.email,
          firstName: override?.firstName ?? form.firstName,
          lastName: override?.lastName ?? form.lastName,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("unlocked");
        return;
      }

      if (response.status === 410) {
        setStatus("used");
        return;
      }

      if (response.status === 404) {
        setStatus("invalid");
        setError(data?.error || "This link is not valid.");
        return;
      }

      setStatus("ready");
      setError(data?.error || "Failed to unlock. Please try again.");
    } catch {
      setStatus("ready");
      setError("Failed to unlock. Please try again.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await redeemToken();
  };

  const showForm = status === "ready" || status === "submitting";
  const showContent = status === "unlocked";

  const handleCopy = async (key: string, value: string) => {
    try {
      if (!navigator?.clipboard) {
        setCopiedKey(null);
        return;
      }
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1800);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-xl border border-[#44475a] bg-[#1f2130]/80 p-6">
        <div className="pointer-events-none absolute -right-16 -top-12 h-40 w-40 rounded-full bg-[#50fa7b]/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-[#ff79c6]/10 blur-2xl" />
        <div className="relative space-y-3">
          <p className="text-[#6272a4] text-xs uppercase tracking-[0.3em]">
            Private Drop
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-mono text-[#50fa7b]">
              Workflow That Ships
            </h1>
            <span className="rounded-full border border-[#44475a] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#6272a4]">
              One-page kit
            </span>
          </div>
          <p className="text-[#f8f8f2] text-sm leading-relaxed">
            Most people ask AI for "the code" and then waste time fixing it. This
            is the workflow I use to ship cleanly and fast, with a one-page
            template and copy/paste prompts you can use today.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-[#6272a4]">
            {["Template", "Prompt pack", "5-step flow"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#44475a] px-3 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {status === "checking" && (
        <div className="border border-[#44475a] rounded-lg p-4 bg-[#282a36]/40 text-sm text-[#6272a4]">
          Checking your link...
        </div>
      )}

      {status === "invalid" && (
        <div className="border border-[#44475a] rounded-lg p-4 bg-[#282a36]/40 text-sm text-[#ff79c6]">
          This link is not valid. Reply to the message where you got it and I
          will send a fresh one.
        </div>
      )}

      {status === "used" && (
        <div className="border border-[#44475a] rounded-lg p-4 bg-[#282a36]/40 text-sm text-[#ffb86c]">
          This link has already been used. If this was you, reply and I will
          send a fresh link.
        </div>
      )}

      {status === "error" && (
        <div className="border border-[#44475a] rounded-lg p-4 bg-[#282a36]/40 text-sm text-[#ff5555]">
          Something went wrong while checking this link. Please try again.
        </div>
      )}

      {showForm && (
        <div className="relative overflow-hidden rounded-xl border border-[#44475a] bg-[#282a36]/40 p-6">
          <div className="pointer-events-none absolute -left-24 top-10 h-40 w-40 rounded-full bg-[#8be9fd]/10 blur-2xl" />
          <div className="relative space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-[#f8f8f2]">
                Unlock your copy
              </h2>
              <p className="mt-1 text-xs text-[#6272a4]">
                Add your details to unlock the drop and get future templates.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(event) => handleChange("firstName")(event.target.value)}
                  className="w-full px-4 py-2 bg-[#44475a] border border-[#6272a4] rounded text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#50fa7b] focus:ring-1 focus:ring-[#50fa7b]"
                  required
                  disabled={status === "submitting"}
                  autoComplete="given-name"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(event) => handleChange("lastName")(event.target.value)}
                  className="w-full px-4 py-2 bg-[#44475a] border border-[#6272a4] rounded text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#50fa7b] focus:ring-1 focus:ring-[#50fa7b]"
                  required
                  disabled={status === "submitting"}
                  autoComplete="family-name"
                />
              </div>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(event) => handleChange("email")(event.target.value)}
                className="w-full px-4 py-2 bg-[#44475a] border border-[#6272a4] rounded text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#50fa7b] focus:ring-1 focus:ring-[#50fa7b]"
                required
                disabled={status === "submitting"}
                autoComplete="email"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-[#44475a] border border-[#6272a4] text-[#f8f8f2] font-medium py-2 px-4 rounded hover:bg-[#6272a4] hover:border-[#50fa7b] hover:text-[#50fa7b] focus:outline-none focus:ring-2 focus:ring-[#50fa7b] focus:ring-offset-2 focus:ring-offset-[#282a36] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Unlocking..." : "Unlock the drop"}
              </button>
              {error && <p className="text-xs text-[#ff5555]">{error}</p>}
              <p className="text-xs text-[#6272a4]">
                Your info is added to my newsletter list so I can send the next
                drop. No spam.
              </p>
            </form>
          </div>
        </div>
      )}

      {showContent && (
        <>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="rounded-xl border border-[#44475a] bg-[#282a36]/40 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#f8f8f2]">
                  The 5-Step Flow
                </h2>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#6272a4]">
                  Sequence
                </span>
              </div>
              <ol className="mt-4 space-y-4 text-sm text-[#f8f8f2]">
                {workflowSteps.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-[#44475a] text-xs font-semibold text-[#50fa7b]">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <aside className="rounded-xl border border-[#44475a] bg-[#1f2130] p-5 text-sm text-[#f8f8f2]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#6272a4]">
                Quick use
              </h3>
              <ul className="mt-3 space-y-3 text-sm text-[#f8f8f2]">
                {[
                  "Paste the template into your doc before coding.",
                  "Use Prompt 1 to force clarity before any output.",
                  "Ship one chunk at a time and review the diff.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#50fa7b]" />
                    <span className="text-[#f8f8f2] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-[#f8f8f2]">
                1-Page Template
              </h2>
              <button
                type="button"
                onClick={() => handleCopy("template", workflowTemplate)}
                className="rounded-full border border-[#44475a] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#6272a4] hover:text-[#50fa7b]"
              >
                {copiedKey === "template" ? "Copied" : "Copy template"}
              </button>
            </div>
            <div className="rounded-xl border border-[#44475a] bg-[#1f2130] p-4 text-sm text-[#f8f8f2]">
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">
                {workflowTemplate}
              </pre>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-[#f8f8f2]">
              Copy/Paste Prompts
            </h2>
            <div className="grid gap-4">
              {promptCards.map((prompt) => (
                <div
                  key={prompt.id}
                  className="rounded-xl border border-[#44475a] bg-[#282a36]/50 p-4 text-sm text-[#f8f8f2]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[#50fa7b] text-xs uppercase tracking-wide">
                      {prompt.title}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(prompt.id, prompt.body)}
                      className="rounded-full border border-[#44475a] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#6272a4] hover:text-[#50fa7b]"
                    >
                      {copiedKey === prompt.id ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="mt-2 leading-relaxed">{prompt.body}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-[#44475a] pt-4 text-xs text-[#6272a4]">
            Please keep this link private. If you have questions, reply to the
            message where you got it.
          </div>
        </>
      )}
    </section>
  );
}
