"use client";

import { useState } from "react";
import Link from "next/link";

export function NewCompanyForm() {
  const [name, setName] = useState("");
  const [tier, setTier] = useState<"teaser" | "full">("teaser");
  const [contentJson, setContentJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ slug: string; accessCode: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tier, contentJson }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setResult(data);
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-6">
        <h2 className="text-lg font-semibold text-white">
          {name} is live
        </h2>
        <p className="mt-2 text-sm text-neutral-300">
          Share this access code with the client. It won&apos;t be shown again
          — if it&apos;s lost, delete and recreate the company.
        </p>
        <p className="mt-4 rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 font-mono text-lg tracking-wider text-white">
          {result.accessCode}
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <Link href="/admin" className="text-indigo-400 hover:underline">
            Back to companies
          </Link>
          <Link href={`/admin/${result.slug}`} className="text-indigo-400 hover:underline">
            View usage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Company name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Tier</label>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={tier === "teaser"}
              onChange={() => setTier("teaser")}
            />
            Teaser (draft, for prospects)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={tier === "full"}
              onChange={() => setTier("full")}
            />
            Full (paid engagement)
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Kit JSON (from Néstōr)
        </label>
        <p className="mb-2 text-xs text-neutral-500">
          Paste the JSON Néstōr generated for this company. Any
          section you leave out of the JSON is created empty — that
          section just won&apos;t show up on their site.
        </p>
        <textarea
          value={contentJson}
          onChange={(e) => setContentJson(e.target.value)}
          rows={12}
          placeholder="{ &quot;icpSegments&quot;: [...], &quot;battlecards&quot;: [...], ... }"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 font-mono text-xs outline-none focus:border-indigo-500"
        />
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Create company + access code"}
      </button>
    </form>
  );
}
