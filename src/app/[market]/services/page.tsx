import ServicesGrid from "./components/services-grid";
import {
  SERVICES,
  getMarketConfig,
  filterAndSortServices,
} from "@/core/data";

const SUPPORTED_MARKETS = ["ng", "us", "uk", "ca"];

export async function generateStaticParams() {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const config = getMarketConfig(market);
  return {
    title: `Services · ${config.country} · Branda V2`,
    description: `Browse all ${config.currency} branding services available in ${config.country}.`,
  };
}

export default async function ServicesPage({
  params,
  searchParams,
}: {
  params: Promise<{ market: string }>;
  searchParams: Promise<{
    category?: string;
    search?: string;
    sortBy?: string;
    useCase?: string;
    industry?: string;
    page?: string;
  }>;
}) {
  const { market } = await params;
  const resolvedSearchParams = await searchParams;
  const config = getMarketConfig(market);

  const { services: paginatedServices, pagination, appliedFilters } =
    filterAndSortServices(SERVICES, market, resolvedSearchParams);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 py-16 text-center border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Branding Services for {config.country}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            All prices shown in {config.currency} ({config.symbol}). Discover
            premium, custom branded solutions crafted for your business.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ServicesGrid
          services={paginatedServices}
          market={market}
          pagination={pagination}
          appliedFilters={appliedFilters}
        />
      </div>
    </div>
  );
}
