import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMarketConfig } from "@/core/data";
import { MarketProvider } from "./context";
import Header from "./components/header";

const SUPPORTED_MARKETS = ["ng", "us", "uk", "ca"];

export default async function MarketLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;

  if (!SUPPORTED_MARKETS.includes(market)) {
    notFound();
  }

  const config = getMarketConfig(market);

  return (
    <MarketProvider value={{ market, config }}>
      <Header />
      <main className="flex-1">{children}</main>
    </MarketProvider>
  );
}

export async function generateStaticParams() {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}
