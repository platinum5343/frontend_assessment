import Link from "next/link";
import { SERVICES, getMarketConfig } from "@/core/data";

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
    title: `${config.country} · Branda V2`,
    description: `Branding services in ${config.currency} for ${config.country}`,
  };
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const config = getMarketConfig(market);
  const featuredServices = SERVICES.filter(
    (s) => market in s.marketSpecific && s.marketSpecific[market]?.featured
  ).slice(0, 6);

  return (
    <div className="bg-white text-slate-900">
      <section className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 py-16 text-center border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            The Most Reliable Branding Partner for Your Business
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            All prices shown in {config.currency} ({config.symbol}).
            Discover premium, custom branded solutions crafted for your
            business in {config.country}.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={`/${market}/services`}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-all"
            >
              Browse All Services
            </Link>
            <Link
              href={`/${market}/contact`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>

      {featuredServices.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
              Featured Services
            </h2>
            <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
              Our most popular services, handpicked for businesses in{" "}
              {config.country}.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => {
                const pricing = service.marketSpecific[market];
                return (
                  <Link
                    key={service.id}
                    href={`/${market}/services/${service.slug}`}
                    className="group block bg-white border border-slate-100 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-100/80 transition-all duration-300 ease-out"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-baseline gap-2">
                        {pricing?.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            {pricing.symbol}
                            {pricing.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-slate-900">
                          {pricing?.symbol}
                          {pricing?.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
