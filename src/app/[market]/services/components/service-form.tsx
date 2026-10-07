"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore, type CartItem } from "@/core/store";
import type { Service, ServiceOption } from "@/core/data";
import type { MarketConfig } from "@/core/data";

interface ServiceFormProps {
  service: Service;
  market: string;
  config: MarketConfig;
}

export default function ServiceForm({
  service,
  market,
  config,
}: ServiceFormProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    service.options.forEach((opt) => {
      initial[opt.name] = opt.values[0];
    });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const pricing = service.marketSpecific[market];
  if (!pricing) {
    return null;
  }

  const unitPrice = pricing.price;
  const totalPrice = unitPrice * quantity;

  function handleSelectOption(optionName: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  }

  function handleQuantityChange(delta: number) {
    setQuantity((prev) => Math.max(1, prev + delta));
  }

  function handleAddToCart() {
    const cartItem: Omit<CartItem, "quantity"> & { quantity?: number } = {
      serviceId: service.id,
      slug: service.slug,
      name: service.name,
      selectedOptions,
      price: unitPrice,
    };
    addItem({ ...cartItem, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  function handleOrderNow() {
    const cartItem: Omit<CartItem, "quantity"> & { quantity?: number } = {
      serviceId: service.id,
      slug: service.slug,
      name: service.name,
      selectedOptions,
      price: unitPrice,
    };
    addItem({ ...cartItem, quantity });
    router.push(`/${market}/checkout`);
  }

  return (
    <div className="bg-slate-50/30 border border-slate-100 rounded-2xl p-6 space-y-6">
      <div className="flex items-baseline gap-3">
        {pricing.originalPrice && (
          <span className="text-lg text-slate-400 line-through">
            {pricing.symbol}
            {pricing.originalPrice.toLocaleString()}
          </span>
        )}
        <span className="text-3xl font-bold text-slate-900">
          {pricing.symbol}
          {unitPrice.toLocaleString()}
        </span>
        {pricing.featured && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Featured
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500">
        Price in {config.currency} ({config.symbol})
      </p>

      <div className="space-y-4">
        {service.options.map((option: ServiceOption) => (
          <div key={option.name}>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {option.name}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {option.values.map((value: string) => {
                const isSelected = selectedOptions[option.name] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleSelectOption(option.name, value)}
                    aria-pressed={isSelected}
                    className={`
                      relative border-2 border-slate-100 rounded-xl p-4 cursor-pointer
                      text-center text-sm font-medium text-slate-700
                      hover:border-slate-300 hover:bg-slate-100
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                      transition-all
                      ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/30 text-emerald-700"
                          : "bg-white hover:bg-slate-50"
                      }
                    `}
                  >
                    <span className="flex items-center justify-center">
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-slate-700">Quantity</label>
        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            className="rounded-l-xl px-4 py-2 text-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            −
          </button>
          <span className="px-4 py-2 text-base font-semibold text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            className="rounded-r-xl px-4 py-2 text-lg font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {Object.keys(selectedOptions).length > 0 && (
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-slate-600">
              Total ({quantity} × unit)
            </span>
            <span className="text-xl font-bold text-slate-900">
              {pricing.symbol}
              {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!pricing}
          className={`
            flex-1 rounded-xl bg-emerald-600 text-white py-4 text-sm font-bold
            text-center hover:bg-emerald-700 shadow-xl shadow-emerald-600/20
            transition-all duration-200
            disabled:cursor-not-allowed disabled:opacity-50
          `}
        >
          {added ? "Added to Cart ✓" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={handleOrderNow}
          disabled={!pricing}
          className={`
            flex-1 rounded-xl border-2 border-slate-900 text-slate-900 py-4
            text-sm font-bold text-center hover:bg-slate-900 hover:text-white
            transition-all duration-200
            disabled:cursor-not-allowed disabled:opacity-50
          `}
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
