"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "@/core/data";

const CATEGORIES = [
  { id: "all", name: "All Services" },
  { id: "digital", name: "Digital" },
  { id: "gifts", name: "Gifts" },
  { id: "create", name: "Create" },
  { id: "studio", name: "Studio" },
  { id: "prints", name: "Prints" },
] as const;

interface ServicesGridProps {
  services: Service[];
  market: string;
}

export default function ServicesGrid({ services, market }: ServicesGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <>
      <motion.div
        className="mb-8 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {CATEGORIES.map((category) => (
          <motion.button
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

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
          {filtered.map((service, i) => {
            const pricing = service.marketSpecific[market];
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
                  className="group block bg-white border border-slate-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-100/80 transition-all duration-300 ease-out"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {service.name}
                    </h3>
                    {pricing.featured && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                      >
                        Featured
                      </motion.span>
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
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
