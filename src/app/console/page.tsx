"use client";

import { useEffect, useState } from "react";
import { Lock, LogOut, ImageIcon, MessagesSquare, ShieldAlert } from "lucide-react";
import { ImageManager } from "@/components/console/image-manager";
import { Inbox } from "@/components/console/inbox";
import { sbConfigured } from "@/lib/supabase";

const UNLOCK_KEY = "bbm.console.unlocked";
type Tab = "images" | "inbox";

export default function ConsolePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("images");

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(UNLOCK_KEY) === "1");
    setChecked(true);
  }, []);

  function lock() {
    sessionStorage.removeItem(UNLOCK_KEY);
    setUnlocked(false);
  }

  if (!checked) return <div className="min-h-[60vh]" />;

  if (!unlocked) {
    return (
      <Gate
        onUnlock={() => {
          sessionStorage.setItem(UNLOCK_KEY, "1");
          setUnlocked(true);
        }}
      />
    );
  }

  return (
    <div className="frame min-h-[70vh] py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="overline">BB Medical · Console</span>
          <h1 className="mt-2 font-display text-3xl text-ink">Site management</h1>
        </div>
        <button
          onClick={lock}
          className="inline-flex items-center gap-1.5 rounded-note border border-line px-3 py-2 font-body text-sm font-medium text-inkSoft transition hover:border-clayDeep hover:text-clayDeep"
        >
          <LogOut className="h-4 w-4" /> Lock
        </button>
      </div>

      {!sbConfigured() && (
        <div className="mt-6 flex items-start gap-3 rounded-note border border-clay/40 bg-clayWash/40 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-clayDeep" />
          <p className="font-body text-sm text-clayDeep">
            Supabase isn't configured. Set{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_SB_URL</code> and{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_SB_ANON_KEY</code> to
            manage images and submissions.
          </p>
        </div>
      )}

      <div className="mt-6 inline-flex rounded-pillish border border-line bg-shell p-1">
        <TabButton
          active={tab === "images"}
          onClick={() => setTab("images")}
          icon={ImageIcon}
          label="Images"
        />
        <TabButton
          active={tab === "inbox"}
          onClick={() => setTab("inbox")}
          icon={MessagesSquare}
          label="Submissions"
        />
      </div>

      <div className="mt-8">
        {tab === "images" ? <ImageManager /> : <Inbox />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-pillish px-5 py-2 font-body text-sm font-semibold transition ${
        active ? "bg-clay text-shell" : "text-inkSoft hover:text-ink"
      }`}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const expected = process.env.NEXT_PUBLIC_CONSOLE_KEY;
  const keyMissing = !expected;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (keyMissing) return;
    if (value.trim() === expected) {
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className="frame flex min-h-[70vh] items-center justify-center py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-panel border border-line bg-shell p-8 shadow-lift"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-note bg-clayWash text-clayDeep">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-2xl text-ink">Console access</h1>
        <p className="mt-1.5 font-body text-sm text-inkSoft">
          Enter the passphrase to manage images and submissions.
        </p>

        {keyMissing ? (
          <div className="mt-6 rounded-note border border-clay/40 bg-clayWash/50 p-4 font-body text-sm text-clayDeep">
            No console passphrase is set. Add{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_CONSOLE_KEY</code> to
            your environment (and redeploy) to enable the console.
          </div>
        ) : (
          <div className="mt-6">
            <label htmlFor="key" className="field-label">
              Passphrase
            </label>
            <input
              id="key"
              type="password"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              className="field-input"
              placeholder="••••••••••"
            />
            {error && (
              <p className="mt-2 font-body text-sm text-clayDeep">
                That passphrase didn&apos;t match.
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={keyMissing}
          className="btn-clay mt-5 w-full disabled:opacity-50"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
