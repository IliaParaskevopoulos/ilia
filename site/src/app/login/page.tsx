export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-lg bg-indigo-600" />
          <h1 className="text-xl font-semibold">Sales Plays</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Enter the access code you were given.
          </p>
        </div>

        <form
          method="POST"
          action="/api/login"
          className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900 p-6"
        >
          <input type="hidden" name="next" value={next || "/"} />
          <div>
            <label htmlFor="code" className="mb-1.5 block text-sm font-medium">
              Access code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              autoComplete="off"
              placeholder="XXXX-XXXX-XXXX"
              required
              autoFocus
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm font-mono uppercase tracking-wider outline-none focus:border-indigo-500"
            />
          </div>
          {error ? (
            <p className="text-sm text-red-400">
              That code didn&apos;t work. Check with whoever shared this link.
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
