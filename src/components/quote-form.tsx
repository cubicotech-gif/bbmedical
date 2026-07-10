"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Check, Loader2 } from "lucide-react";
import { getClient } from "@/lib/supabase";
import { catalog } from "@/lib/catalog";

type State = "idle" | "sending" | "done" | "error";

const productOptions = [
  "Not sure yet — help me choose",
  ...catalog.flatMap((c) => c.products.map((p) => p.name)),
];

export function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product: productOptions[0],
    details: "",
  });
  const [state, setState] = useState<State>("idle");

  // Read a ?product= hint from the URL without forcing dynamic rendering.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wanted = params.get("product");
    if (wanted && productOptions.includes(wanted)) {
      setForm((f) => ({ ...f, product: wanted }));
    }
  }, []);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const client = getClient();
    if (!client) {
      setState("error");
      return;
    }
    setState("sending");
    const { error } = await client.from("quote_requests").insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      product: form.product,
      details: form.details.trim() || null,
      status: "new",
    });
    setState(error ? "error" : "done");
  }

  if (state === "done") {
    return (
      <div className="rounded-panel border border-sage/30 bg-sageWash/50 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage text-shell">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-2xl text-ink">Quote requested</h3>
        <p className="mx-auto mt-2 max-w-sm font-body text-sm text-inkSoft">
          We'll price it out with any insurance details in mind and reach back
          shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-panel border border-clay/25 bg-clayWash/30 p-6 sm:p-8"
    >
      <div className="overline">
        <ClipboardList className="h-3.5 w-3.5" /> No-obligation quote
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className="field-label">
            Name
          </label>
          <input
            id="q-name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="q-email" className="field-label">
            Email
          </label>
          <input
            id="q-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="q-phone" className="field-label">
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            id="q-phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="q-product" className="field-label">
            Product of interest
          </label>
          <select
            id="q-product"
            value={form.product}
            onChange={(e) => update("product", e.target.value)}
            className="field-input"
          >
            {productOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="q-details" className="field-label">
          Anything we should know? <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="q-details"
          rows={3}
          value={form.details}
          onChange={(e) => update("details", e.target.value)}
          className="field-input resize-none"
          placeholder="Insurance provider, timing, sizing, etc."
        />
      </div>
      {state === "error" && (
        <p className="mt-3 font-body text-sm text-clayDeep">
          Something went wrong — please call us at the number below.
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn-clay mt-5 w-full">
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Request my quote"
        )}
      </button>
    </form>
  );
}
