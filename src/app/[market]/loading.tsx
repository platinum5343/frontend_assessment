export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
              <div className="hidden space-x-6 sm:flex">
                <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-14 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
              <div className="h-8 w-32 animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3">
          <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 animate-pulse rounded-full bg-slate-200"
            />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-slate-100 p-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-12 animate-pulse rounded bg-slate-200" />
                </div>
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                <div className="pt-2">
                  <div className="h-7 w-1/4 animate-pulse rounded bg-slate-300" />
                  <div className="mt-1 h-4 w-1/6 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
