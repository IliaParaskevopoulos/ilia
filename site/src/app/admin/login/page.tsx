export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-lg bg-neutral-700" />
          <h1 className="text-xl font-semibold">Néstōr Admin</h1>
          <p className="mt-1 text-sm text-neutral-400">Operator access only.</p>
        </div>

        <form
          method="POST"
          action="/api/admin-login"
          className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900 p-6"
        >
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Admin password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            />
          </div>
          {error ? (
            <p className="text-sm text-red-400">Wrong password.</p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-white"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
