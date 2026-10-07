import { SERVICES, getMarketConfig } from "@/core/data";
import ServiceGrid from "./components/service-grid";

const SUPPORTED_MARKETS = ["ng", "us", "uk", "ca"];

interface MarketPageProps {
  params: Promise<{ market: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}

export async function generateMetadata({ params }: MarketPageProps) {
  const { market } = await params;
  const config = getMarketConfig(market);
  return {
    title: `${config.country} · Branda V2`,
    description: `Branding services in ${config.currency} for ${config.country}`,
  };
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { market } = await params;
  const config = getMarketConfig(market);
  const marketServices = SERVICES.filter((s) => market in s.marketSpecific);

  return (
    <div className="bg-white text-slate-900">
      <section className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 py-16 text-center border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Branding Services for {config.country}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            All prices shown in {config.currency} ({config.symbol}).
            Discover premium, custom branded solutions crafted for your business.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <ServiceGrid
          services={marketServices}
          market={market}
        />
      </div>
    </div>
  );
}
