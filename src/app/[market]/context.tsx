"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { MarketConfig } from "@/core/data";

export interface MarketContextValue {
  market: string;
  config: MarketConfig;
}

export const MarketContext = createContext<MarketContextValue | null>(null);

export function useMarket(): MarketContextValue {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
}

export function MarketProvider({ children, value }: { children: ReactNode; value: MarketContextValue }) {
  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}
