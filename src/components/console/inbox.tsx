"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Loader2,
  Inbox as InboxIcon,
  Mail,
  Phone,
  RefreshCw,
} from "lucide-react";
import { getClient } from "@/lib/supabase";

type Status = "new" | "read" | "replied" | "archived";
const STATUSES: Status[] = ["new", "read", "replied", "archived"];

type Row = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  status: Status;
  // inquiries
  reason?: string | null;
  message?: string | null;
  // quotes
  product?: string | null;
  details?: string | null;
};

type Source = { key: "inquiries" | "quote_requests"; label: string };
const SOURCES: Source[] = [
  { key: "inquiries", label: "Messages" },
  { key: "quote_requests", label: "Quote requests" },
];

const statusStyle: Record<Status, string> = {
  new: "bg-clayWash text-clayDeep",
  read: "bg-paperDeep text-inkSoft",
  replied: "bg-sageWash text-sage",
  archived: "bg-line/60 text-muted",
};

export function Inbox() {
  const [source, setSource] = useState<Source["key"]>("inquiries");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");

  const load = useCallback(async () => {
    setLoading(true);
    const client = getClient();
    if (!client) {
      setLoading(false);
      return;
    }
    const { data } = await client
      .from(source)
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }, [source]);

  useEffect(() => {
    void load();
  }, [load]);

  async function setStatus(id: string, status: Status) {
    const client = getClient();
    if (!client) return;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    await client.from(source).update({ status }).eq("id", id);
  }

  const shown =
    filter === "all" ? rows : rows.filter((r) => r.status === filter);
  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = rows.filter((r) => r.status === s).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-pillish border border-line bg-shell p-1">
          {SOURCES.map((s) => (
            <button
              key={s.key}
              onClick={() => setSource(s.key)}
              className={`rounded-pillish px-4 py-1.5 font-body text-sm font-medium transition ${
                source === s.key
                  ? "bg-clay text-shell"
                  : "text-inkSoft hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-note border border-line px-3 py-2 font-body text-xs font-medium text-inkSoft transition hover:border-clay hover:text-clay"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={`All (${rows.length})`}
        />
        {STATUSES.map((s) => (
          <FilterChip
            key={s}
            active={filter === s}
            onClick={() => setFilter(s)}
            label={`${s} (${counts[s] ?? 0})`}
          />
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-12 font-body text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : shown.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-muted">
          <InboxIcon className="h-6 w-6" />
          <p className="font-body text-sm">Nothing here yet.</p>
        </div>
      ) : (
        <ul className="mt-5 space-y-4">
          {shown.map((r) => (
            <li key={r.id} className="rounded-panel border border-line bg-shell p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg text-ink">{r.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-sm text-inkSoft">
                    <a
                      href={`mailto:${r.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-clay"
                    >
                      <Mail className="h-3.5 w-3.5" /> {r.email}
                    </a>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone}`}
                        className="inline-flex items-center gap-1.5 hover:text-clay"
                      >
                        <Phone className="h-3.5 w-3.5" /> {r.phone}
                      </a>
                    )}
                  </div>
                </div>
                <span
                  className={`rounded-pillish px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide ${statusStyle[r.status]}`}
                >
                  {r.status}
                </span>
              </div>

              <div className="mt-3 rounded-note bg-paper p-4">
                {source === "inquiries" ? (
                  <>
                    <p className="font-body text-xs uppercase tracking-label text-muted">
                      {r.reason}
                    </p>
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-ink">
                      {r.message}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-body text-xs uppercase tracking-label text-muted">
                      Interested in
                    </p>
                    <p className="mt-1 font-body text-sm font-medium text-ink">
                      {r.product}
                    </p>
                    {r.details && (
                      <p className="mt-2 font-body text-sm leading-relaxed text-inkSoft">
                        {r.details}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="font-body text-xs text-muted">
                  {formatDate(r.created_at)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(r.id, s)}
                      disabled={r.status === s}
                      className={`rounded-note px-3 py-1.5 font-body text-xs font-medium capitalize transition ${
                        r.status === s
                          ? "cursor-default bg-ink text-shell"
                          : "border border-line text-inkSoft hover:border-clay hover:text-clay"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-pillish px-3 py-1.5 font-body text-xs font-medium capitalize transition ${
        active
          ? "bg-ink text-shell"
          : "border border-line text-inkSoft hover:border-clay hover:text-clay"
      }`}
    >
      {label}
    </button>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
