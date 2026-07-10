"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { getClient } from "@/lib/supabase";

type State = "idle" | "sending" | "done" | "error";

const reasons = [
  "General question",
  "Product availability",
  "Insurance & billing",
  "Repair or service",
  "Something else",
];

export function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: reasons[0],
    message: "",
  });
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const client = getClient();
    if (!client) {
      setState("error");
      setError("Messaging is not configured yet.");
      return;
    }
    setState("sending");
    setError("");
    const { error: err } = await client.from("inquiries").insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      reason: form.reason,
      message: form.message.trim(),
      status: "new",
    });
    if (err) {
      setState("error");
      setError("We couldn't send that. Please try again or call us.");
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="paper-card flex flex-col items-center gap-3 py-12 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sageWash text-sage">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="font-display text-2xl text-ink">Message received</h3>
        <p className="max-w-sm font-body text-sm text-inkSoft">
          Thank you for reaching out. A member of our team will be in touch within
          one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="paper-card space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Full name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="field-input"
            placeholder="Dana Whitfield"
          />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="field-input"
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="field-label">
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="field-input"
            placeholder="(415) 555-0000"
          />
        </div>
        <div>
          <label htmlFor="reason" className="field-label">
            How can we help?
          </label>
          <select
            id="reason"
            value={form.reason}
            onChange={(e) => update("reason", e.target.value)}
            className="field-input"
          >
            {reasons.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="field-label">
          Your message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="field-input resize-none"
          placeholder="Tell us a little about what you're looking for…"
        />
      </div>
      {state === "error" && (
        <p className="font-body text-sm text-clayDeep">{error}</p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn-clay w-full">
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </button>
    </form>
  );
}
