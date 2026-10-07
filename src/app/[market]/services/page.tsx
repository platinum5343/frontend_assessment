import Link from "next/link";
import { SERVICES, getMarketConfig } from "@/core/data";

const SUPPORTED_MARKETS = ["ng", "us", "uk", "ca"];

const CATEGORIES = [
  { id: "all", name: "All Services" },
  { id: "digital", name: "Digital" },
  { id: "gifts", name: "Gifts" },
  { id: "create", name: "Create" },
  { id: "studio", name: "Studio" },
  { id: "prints", name: "Prints" },
] as const;

import { useState } from "react";
export async function generateStaticParams() {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const config = getMarketConfig(market);
  return {
    title: `Services · ${config.country} · Branda V2`,
    description: `Browse all ${config.currency} branding services available in ${config.country}.`,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const config = getMarketConfig(market);
  const marketServices = SERVICES.filter((s) => market in s.marketSpecific);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 py-16 text-center border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Branding Services for {config.country}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            All prices shown in {config.currency} ({config.symbol}).
            Discover premium, custom branded solutions crafted for your
            business.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ServicesGrid
          services={marketServices}
          market={market}
        />
      </div>
    </div>
  );
}

function ServicesGrid({
  services,
  market,
}: {
  services: typeof SERVICES;
  market: string;
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`
              rounded-full px-5 py-2 text-sm font-medium transition-all
              ${
                activeCategory === category.id
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => {
          const pricing = service.marketSpecific[market];
          return (
            <Link
              key={service.id}
              href={`/${market}/services/${service.slug}`}
              className="group block bg-white border border-slate-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-100/80 transition-all duration-300 ease-out"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {service.name}
                </h3>
                {pricing.featured && (
                  <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                {service.description}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                {pricing.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {pricing.symbol}
                    {pricing.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-2xl font-bold text-slate-900">
                  {pricing.symbol}
                  {pricing.price.toLocaleString()}
                </span>
                <span className="text-sm text-slate-500">
                  ({pricing.currency})
                </span>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
                  View details
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
