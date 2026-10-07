import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">Page not found</p>
        <p className="mt-2 text-sm text-gray-500">
          The page you are looking for does not exist or is not available in this market.
        </p>
        <Link
          href="/ng"
          className="mt-6 inline-block rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}
