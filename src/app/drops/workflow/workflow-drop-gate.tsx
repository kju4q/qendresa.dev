"use client";

import { useEffect, useState } from "react";

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

export default function WorkflowDropGate({ token }: WorkflowDropGateProps) {
  const [status, setStatus] = useState<GateStatus>("checking");
  const [form, setForm] = useState<GateForm>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);

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

        if (response.ok) {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus("submitting");

    try {
      const response = await fetch("/api/drops/workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
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

      if (response.status === 404 || response.status === 400) {
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

  const showForm = status === "ready" || status === "submitting";
  const showContent = status === "unlocked";

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-[#6272a4] text-xs uppercase tracking-[0.3em]">
          Private Drop
        </p>
        <h1 className="text-2xl font-mono text-[#50fa7b]">Workflow That Ships</h1>
        <p className="text-[#f8f8f2] text-sm leading-relaxed">
          Most people ask AI for "the code" and then waste time fixing it. This
          is the workflow I use to ship cleanly and fast, with a one-page
          template and copy/paste prompts you can use today.
        </p>
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
        <div className="border border-[#44475a] rounded-lg p-6 bg-[#282a36]/30">
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
      )}

      {showContent && (
        <>
          <div className="border border-[#44475a] rounded-lg p-5 bg-[#282a36]/40">
            <h2 className="text-sm font-semibold text-[#f8f8f2]">
              The 5-Step Flow
            </h2>
            <ul className="mt-3 space-y-3 text-sm text-[#f8f8f2]">
              {workflowSteps.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-[#50fa7b]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-[#f8f8f2]">
              1-Page Template
            </h2>
            <div className="border border-[#44475a] rounded-lg bg-[#1f2130] p-4 text-sm text-[#f8f8f2]">
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">
                {workflowTemplate}
              </pre>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-[#f8f8f2]">
              Copy/Paste Prompts
            </h2>
            <div className="space-y-3 text-sm text-[#f8f8f2]">
              <div className="border border-[#44475a] rounded-lg bg-[#282a36]/50 p-4">
                <p className="text-[#50fa7b] text-xs uppercase tracking-wide">
                  Prompt 1 — clarify + plan
                </p>
                <p className="mt-2 leading-relaxed">
                  Act as my senior engineer. Ask any missing questions about
                  the outcome and constraints below. Then give me a short plan
                  (3-7 steps) before any code.
                </p>
              </div>
              <div className="border border-[#44475a] rounded-lg bg-[#282a36]/50 p-4">
                <p className="text-[#50fa7b] text-xs uppercase tracking-wide">
                  Prompt 2 — build in chunks
                </p>
                <p className="mt-2 leading-relaxed">
                  Implement step 1 only. Provide the smallest change set and
                  ask me to confirm before continuing.
                </p>
              </div>
              <div className="border border-[#44475a] rounded-lg bg-[#282a36]/50 p-4">
                <p className="text-[#50fa7b] text-xs uppercase tracking-wide">
                  Prompt 3 — verify
                </p>
                <p className="mt-2 leading-relaxed">
                  Review this change for bugs, regressions, and missing tests.
                  Be critical.
                </p>
              </div>
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
