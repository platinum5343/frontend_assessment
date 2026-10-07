"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMarketConfig } from "@/core/data";

const SUPPORTED_MARKETS = ["ng", "us", "uk", "ca"];

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const pathname = usePathname();
  const segment = pathname.split("/")[1] || "ng";
  const market = SUPPORTED_MARKETS.includes(segment) ? segment : "ng";
  const config = getMarketConfig(market);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4.735A10 10 0 1112 2a10 10 0 010 20z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          We encountered an unexpected error while rendering this page.
          {error.digest && (
            <span className="block text-xs text-gray-400">
              Reference: {error.digest}
            </span>
          )}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={reset}
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Try again
          </button>

          <Link
            href={`/${market}`}
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Return to {config.country} home
          </Link>
        </div>
      </div>
    </div>
  );
}
