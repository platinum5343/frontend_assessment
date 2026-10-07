"use client";

import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/core/data";

const CATEGORIES = [
  { id: "all", name: "All Services" },
  { id: "digital", name: "Digital" },
  { id: "gifts", name: "Gifts" },
  { id: "create", name: "Create" },
  { id: "studio", name: "Studio" },
  { id: "prints", name: "Prints" },
] as const;

interface ServiceGridProps {
  services: Service[];
  market: string;
}

export default function ServiceGrid({ services, market }: ServiceGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices =
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
        {filteredServices.map((service) => {
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
                  View service
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
