"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { getClient } from "@/lib/supabase";

type State = "idle" | "sending" | "done" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    const client = getClient();
    if (!client) {
      setState("error");
      setMessage("Signup is not configured yet.");
      return;
    }
    setState("sending");
    const { error } = await client
      .from("newsletter_signups")
      .insert({ email: email.trim().toLowerCase(), source: "footer" });
    if (error) {
      // A duplicate email is a friendly no-op.
      if (error.code === "23505") {
        setState("done");
        setMessage("You're already on the list — thank you.");
        return;
      }
      setState("error");
      setMessage("Something went wrong. Please try again.");
      return;
    }
    setState("done");
    setMessage("Thank you — you're subscribed.");
    setEmail("");
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 font-body text-sm text-sage">
        <Check className="h-4 w-4" /> {message}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="flex overflow-hidden rounded-pillish border border-line bg-paper focus-within:border-clay">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          className="w-full bg-transparent px-4 py-2.5 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="flex items-center bg-clay px-4 text-shell transition hover:bg-clayDeep disabled:opacity-60"
          aria-label="Subscribe"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {state === "error" && (
        <p className="font-body text-xs text-clayDeep">{message}</p>
      )}
    </form>
  );
}
