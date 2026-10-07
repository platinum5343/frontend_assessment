"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { useMarket } from "../context";

const MARKETS = [
  { code: "ng", name: "Nigeria" },
  { code: "us", name: "United States" },
  { code: "uk", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
] as const;

export default function Header() {
  const { market, config } = useMarket();
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  const currentMarket = MARKETS.find((m) => m.code === market) ?? MARKETS[0];
  const otherMarkets = MARKETS.filter((m) => m.code !== market);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href={`/${market}`}
              className="text-xl font-bold text-gray-900 hover:text-gray-700"
            >
              Branda V2
            </Link>
            <nav className="flex items-center space-x-6">
              <Link
                href={`/${market}`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Services
              </Link>
              <Link
                href={`/${market}`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                About
              </Link>
              <Link
                href={`/${market}`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {config.currency} · {config.symbol}
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMarketOpen(!isMarketOpen)}
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {currentMarket.name}
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              {isMarketOpen && (
                <Fragment>
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                    onMouseLeave={() => setIsMarketOpen(false)}
                  >
                    <div className="py-1">
                      {otherMarkets.map((m) => (
                        <Link
                          key={m.code}
                          href={`/${m.code}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsMarketOpen(false)}
                        >
                          {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
