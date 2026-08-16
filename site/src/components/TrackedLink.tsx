"use client";

function track(kind: "view" | "download", section: string, itemId: string, itemTitle: string) {
  const payload = JSON.stringify({ kind, section, itemId, itemTitle, path: `/${section}` });
  // Fire-and-forget; keepalive lets it complete even as the browser
  // navigates away to the file.
  const blob = new Blob([payload], { type: "application/json" });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", blob);
  } else {
    fetch("/api/track", { method: "POST", body: payload, keepalive: true });
  }
}

export function TrackedLink({
  href,
  section,
  itemId,
  itemTitle,
  kind = "download",
  className,
  children,
}: {
  href: string;
  section: string;
  itemId: string;
  itemTitle: string;
  kind?: "view" | "download";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track(kind, section, itemId, itemTitle)}
    >
      {children}
    </a>
  );
}
