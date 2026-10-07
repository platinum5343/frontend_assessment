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
    <div className="space-y-6">
      <div className="flex items-baseline gap-3">
        {pricing.originalPrice && (
          <span className="text-lg text-gray-400 line-through">
            {pricing.symbol}
            {pricing.originalPrice.toLocaleString()}
          </span>
        )}
        <span className="text-3xl font-bold text-gray-900">
          {pricing.symbol}
          {unitPrice.toLocaleString()}
        </span>
        {pricing.featured && (
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
            Featured
          </span>
        )}
      </div>
      <span className="text-sm text-gray-500">
        Price in {config.currency} ({config.symbol})
      </span>

      <div className="space-y-4">
        {service.options.map((option: ServiceOption) => (
          <div key={option.name}>
            <label className="block text-sm font-medium text-gray-700">
              {option.name}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {option.values.map((value: string) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleSelectOption(option.name, value)}
                  className={`
                    cursor-pointer rounded-md border px-4 py-2 text-sm font-medium
                    transition-colors
                    ${
                      selectedOptions[option.name] === value
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Quantity:</label>
        <button
          type="button"
          onClick={() => handleQuantityChange(-1)}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          −
        </button>
        <span className="text-sm font-medium text-gray-900">{quantity}</span>
        <button
          type="button"
          onClick={() => handleQuantityChange(1)}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          +
        </button>
      </div>

      {Object.keys(selectedOptions).length > 0 && (
        <div className="rounded-md bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-700">
            Total: {pricing.symbol}
            {totalPrice.toLocaleString()}
          </h4>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!pricing}
          className="flex-1 rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? "Added to Cart ✓" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={handleOrderNow}
          disabled={!pricing}
          className="flex-1 rounded-md border border-indigo-600 px-6 py-3 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
