"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Service, MarketConfig } from "@/core/data";
import {
  USE_CASES,
  INDUSTRIES,
  SORT_OPTIONS,
} from "@/core/data";
import { CATEGORIES } from "./categories";

interface ServicesGridProps {
  services: Service[];
  market: string;
  config: MarketConfig;
  pagination: { page: number; totalPages: number; totalResults: number };
  appliedFilters: Record<string, string>;
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

function FilterIcon({ className }: { className?: string }) {
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
        d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 010 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1z"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

export default function ServicesGrid({
  services,
  market,
  config,
  pagination,
  appliedFilters,
}: ServicesGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    appliedFilters.search ?? ""
  );

  const updateURL = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    params.delete("page");
    const query = params.toString();
    router.push(`/${market}/services${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: searchInput });
  };

  const handleSearchClear = () => {
    setSearchInput("");
    updateURL({ search: "" });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    updateURL({ [filterType]: value });
  };

  const handleSortChange = (value: string) => {
    updateURL({ sortBy: value });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/${market}/services?${params.toString()}`, { scroll: true });
  };

  const totalPages = pagination.totalPages;
  const currentPage = pagination.page;

  return (
    <>
      {/* Search Bar */}
      <motion.form
        onSubmit={handleSearch}
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative max-w-2xl">
          <input
            type="search"
            placeholder="Search services by name or keyword..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleSearchClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          )}
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
        <div className="mt-2 flex gap-2">
          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            Search
          </button>
        </div>
      </motion.form>

      {/* Filter Bar: Category + Sort */}
      <motion.div
        className="mb-8 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => handleFilterChange("category", cat.id)}
              className={`
                rounded-full px-5 py-2 text-sm font-medium transition-all
                ${
                  appliedFilters.category === cat.id
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }
              `}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Sort Select */}
        <select
          value={appliedFilters.sortBy ?? "popularity"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="text-sm">
              Sort: {opt === "popularity" ? "Top Rated" : "Price"}
            </option>
          ))}
        </select>

        {/* Active results count */}
        <div className="ml-auto text-sm text-slate-500">
          {pagination.totalResults} results
        </div>
      </motion.div>

      {/* Additional Filters Section */}
      <motion.div
        className="mb-8 flex flex-wrap items-center gap-4 border-b border-slate-100 pb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FilterIcon className="h-4 w-4" />
          <span>More filters:</span>
        </div>

        {/* Use Case Filter */}
        <select
          value={appliedFilters.useCase ?? "all"}
          onChange={(e) => handleFilterChange("useCase", e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          {USE_CASES.map((uc) => (
            <option key={uc} value={uc}>
              {uc === "all"
                ? "All Use Cases"
                : uc.charAt(0).toUpperCase() + uc.slice(1)}
            </option>
          ))}
        </select>

        {/* Industry Filter */}
        <select
          value={appliedFilters.industry ?? "all"}
          onChange={(e) => handleFilterChange("industry", e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>
              {ind === "all"
                ? "All Industries"
                : ind.charAt(0).toUpperCase() + ind.slice(1)}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Service Grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hide"
        animate="show"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <AnimatePresence>
          {services.map((service, i) => {
            const pricing = service.marketSpecific[market];
            if (!pricing) return null;
            return (
              <motion.div
                key={service.id}
                variants={{
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, delay: i * 0.05 },
                  },
                  hide: { opacity: 0, y: 20 },
                }}
              >
                <Link
                  href={`/${market}/services/${service.slug}`}
                  className="group block bg-white border border-slate-100 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-100/80 transition-all duration-300 ease-out"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {pricing.featured && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute left-3 top-3 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                      >
                        Featured
                      </motion.span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
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
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {services.length === 0 && (
        <motion.div
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-slate-500">
            No services match your current filters. Try adjusting your search
            criteria.
          </p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="mt-12 flex justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Previous
          </motion.button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - currentPage) <= 1
              ) {
                return (
                  <motion.button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                      pageNum === currentPage
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pageNum}
                  </motion.button>
                );
              }
              return null;
            })}
          </div>

          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Next
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
