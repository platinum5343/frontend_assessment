"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/core/store";
import { useMarket } from "../context";

const TAX_RATE = 0.075;

export default function CheckoutPage() {
  const { market, config } = useMarket();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  if (confirmed) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <motion.div
          className="mx-auto max-w-md px-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            <svg
              className="h-10 w-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            className="text-slate-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for your order. Your total of{" "}
            <span className="font-bold text-emerald-600">
              {config.symbol}
              {total.toLocaleString()}
            </span>{" "}
            has been received.
          </motion.p>

          <motion.p
            className="text-sm text-slate-500 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A confirmation email has been sent to your inbox.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href={`/${market}`}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              onClick={() => clearCart()}
            >
              Back to {config.country}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-12 bg-white text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <svg
                className="h-8 w-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.89 2.67M7 13h10l-.89-2.67M7 13L5.89 10.33M7 13l-2.5 3.17h12.1L16 13m0 0l2-3.83h-2M7 13V6a1 1 0 011-1h8a1 1 0 011 1v7"
                />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-slate-600 mb-6">
              Add services to your cart before checking out.
            </p>
            <Link
              href={`/${market}/services`}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Browse Services in {config.country}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Checkout
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Shipping to:{" "}
              <span className="font-medium">{config.country}</span> · Currency:{" "}
              <span className="font-medium">{config.currency}</span>
            </p>
          </div>
          <motion.button
            onClick={() => clearCart()}
            className="text-sm text-slate-500 hover:text-red-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All
          </motion.button>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial="hide"
          animate="show"
          variants={{
            show: {
              transition: { staggerChildren: 0.05, delayChildren: 0.1 },
            },
          }}
        >
          <AnimatePresence>
            {items.map((item, index) => {
              const itemSubtotal = item.price * item.quantity;
              const optionsStr = Object.entries(item.selectedOptions)
                .map(([k, v]) => `${k}: ${v}`)
                .join(", ");

              return (
                <motion.div
                  key={`${item.serviceId}-${index}`}
                  className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
                  variants={{
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, delay: index * 0.05 },
                    },
                    hide: { opacity: 0, y: 20 },
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      {optionsStr && (
                        <p className="mt-1 text-sm text-slate-500">
                          {optionsStr}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-slate-500">
                        Unit Price:{" "}
                        <span className="font-medium">
                          {config.symbol}
                          {item.price.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div className="ml-4 flex items-start gap-4">
                      <span className="text-lg font-bold text-slate-900">
                        {config.symbol}
                        {itemSubtotal.toLocaleString()}
                      </span>
                      <motion.button
                        onClick={() =>
                          removeItem(item.serviceId, item.selectedOptions)
                        }
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7L5 7m5 6l6 0m-6 6l6 0"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-sm text-slate-600">Quantity:</span>
                    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white">
                      <motion.button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.serviceId,
                            item.selectedOptions,
                            item.quantity - 1
                          )
                        }
                        className="rounded-l-xl px-3 py-1 text-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        −
                      </motion.button>
                      <span className="px-3 py-1 text-base font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <motion.button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.serviceId,
                            item.selectedOptions,
                            item.quantity + 1
                          )
                        }
                        className="rounded-r-xl px-3 py-1 text-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-8 space-y-3 border-t border-slate-300 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex justify-between text-base">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-medium text-slate-900">
              {config.symbol}
              {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-slate-600">
              Tax ({TAX_RATE * 100}%)
            </span>
            <span className="font-medium text-slate-900">
              {config.symbol}
              {tax.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-300 pt-3 text-lg font-bold">
            <span className="text-slate-900">Total</span>
            <span className="text-emerald-600">
              {config.symbol}
              {total.toLocaleString()}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Link
            href={`/${market}/services`}
            className="flex-1 text-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Continue Shopping
          </Link>
          <motion.button
            type="button"
            onClick={() => setConfirmed(true)}
            className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirm Order
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
