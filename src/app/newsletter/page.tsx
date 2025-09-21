"use client";

import { TransitionLayout, Footer } from "../../components";
import Link from "next/link";
import { useState } from "react";
import "../home/home.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Using Mailchimp API
      const formData = new FormData();
      formData.append("EMAIL", email);

      const response = await fetch(
        "https://dev.us2.list-manage.com/subscribe/post?u=31019c919d5a82ec4aec90b68&id=6b56961ad2&f_id=00b6c7e3f0",
        {
          method: "POST",
          body: formData,
          mode: "no-cors", // Required for Mailchimp
        }
      );

      // With no-cors mode, we can't check response status
      // So we assume success if no error was thrown
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still show success for better UX, but log the error
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TransitionLayout variant="default">
      <div id="home-page-container">
        <div id="home-content">
          <div className="max-w-2xl mx-auto px-6 py-2 space-y-4">
            <section id="newsletter" className="mb-8 mt-8">
              {/* <p className="text-2xl font-medium text-[#f8f8f2] mb-6">
                thoughts from
                <br />
                <span className="text-[#ff79c6]">7 days of vibe coding</span>
              </p> */}

              <div className="space-y-6">
                <p className="text-[#f8f8f2] font-medium">
                  Sometimes I build things for fun, sometimes I write about what
                  I learn.
                </p>

                <div className="space-y-4">
                  <p className="text-[#6272a4] text-sm leading-relaxed">
                    What you'll get: updates on my experimental projects,
                    breakdowns of tools I'm exploring, and honest takes on
                    development life.
                  </p>

                  {/* <p className="text-[#6272a4] text-sm leading-relaxed">
                    When I finish a vibe coding sprint, I'll share what worked,
                    what didn't, and what I learned along the way.
                  </p> */}

                  <p className="text-[#6272a4] text-sm leading-relaxed">
                    Plus the occasional reflection on community, open source,
                    and finding your own path in tech.
                  </p>

                  {/* <p className="text-[#50fa7b] text-sm font-medium">
                    No fluff, just real stuff.
                  </p> */}
                </div>

                <div className="border border-[#44475a] rounded-lg p-6 bg-[#282a36]/30">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 bg-[#44475a] border border-[#6272a4] rounded text-[#f8f8f2] placeholder-[#6272a4] focus:outline-none focus:border-[#50fa7b] focus:ring-1 focus:ring-[#50fa7b]"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#50fa7b] text-[#282a36] font-medium py-2 px-4 rounded hover:bg-[#50fa7b]/90 focus:outline-none focus:ring-2 focus:ring-[#50fa7b] focus:ring-offset-2 focus:ring-offset-[#282a36] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Subscribing..." : "Subscribe"}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="text-4xl">✨</div>
                      <h3 className="text-xl font-medium text-[#50fa7b]">
                        You're in!
                      </h3>
                      <p className="text-[#f8f8f2]">
                        Thanks for joining the vibe! I'll share my latest
                        experiments and learnings with you soon.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setEmail("");
                        }}
                        className="text-[#ff79c6] hover:underline text-sm"
                      >
                        Subscribe another email?
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-xs text-[#6272a4] space-y-1">
                  <p>• No spam, just thoughtful content</p>
                  <p>• Unsubscribe anytime</p>
                  <p>• Typically 1-2 emails per month</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#44475a]">
                  <p className="text-[#6272a4] text-sm">
                    You can also follow my writing on{" "}
                    <Link
                      href="https://qendresahoti.substack.com"
                      className="text-[#ff79c6] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Substack
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </TransitionLayout>
  );
}
