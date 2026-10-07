"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/core/store";
import { useMarket } from "../context";

const TAX_RATE = 0.075;

export default function CheckoutPage() {
  const { market, config } = useMarket();
  const items = useCartStore((state) => state.items);
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
        <div className="mx-auto max-w-md px-6 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
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
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Order Confirmed!
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Thank you for your order. Your total of{" "}
            <span className="font-bold text-emerald-600">
              {config.symbol}
              {total.toLocaleString()}
            </span>{" "}
            has been received.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            A confirmation email has been sent to your inbox.
          </p>

          <Link
            href={`/${market}`}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            onClick={() => clearCart()}
          >
            Back to {config.country}
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-12 bg-white text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
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
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Your cart is empty
            </h1>
            <p className="mt-2 text-slate-600">
              Add services to your cart before checking out.
            </p>
            <Link
              href={`/${market}`}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Browse Services in {config.country}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Shipping to:{" "}
          <span className="font-medium">{config.country}</span> · Currency:{" "}
          <span className="font-medium">{config.currency}</span>
        </p>

        <div className="mt-8 space-y-4">
          {items.map((item, index) => {
            const itemSubtotal = item.price * item.quantity;
            const optionsStr = Object.entries(item.selectedOptions)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ");

            return (
              <div
                key={`${item.serviceId}-${index}`}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.name}
                    </h3>
                    {optionsStr && (
                      <p className="mt-1 text-sm text-slate-500">
                        {optionsStr}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-slate-500">
                      Quantity: {item.quantity} · Unit:{" "}
                      <span className="font-medium">
                        {config.symbol}
                        {item.price.toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <span className="text-lg font-bold text-slate-900">
                    {config.symbol}
                    {itemSubtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 space-y-3 border-t border-slate-300 pt-6">
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
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href={`/${market}`}
            className="flex-1 text-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Continue Shopping
          </Link>
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm transition-all duration-200"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
