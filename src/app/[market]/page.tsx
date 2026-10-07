import Link from "next/link";
import { SERVICES } from "@/core/data";
import { getMarketConfig } from "@/core/data";

interface MarketPageProps {
  params: Promise<{ market: string }>;
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
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Branding Services for {config.country}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          All prices shown in {config.currency} ({config.symbol}).
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {marketServices.map((service) => {
            const pricing = service.marketSpecific[market];
            return (
              <Link
                key={service.id}
                href={`/${market}/services/${service.slug}`}
                className="block rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{service.description}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  {pricing.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {pricing.symbol}{pricing.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-gray-900">
                    {pricing.symbol}{pricing.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">({pricing.currency})</span>
                </div>
                {pricing.featured && (
                  <span className="mt-2 inline-block text-xs font-medium text-indigo-600">
                    Featured
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
