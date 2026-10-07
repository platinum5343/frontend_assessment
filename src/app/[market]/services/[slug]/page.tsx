import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, getMarketConfig, type MarketConfig } from "@/core/data";
import ServiceForm from "../components/service-form";

const SUPPORTED_MARKETS = ["ng", "us", "uk", "ca"];

const MARKET_LOCALES: Record<string, string> = {
  ng: "en-NG",
  us: "en-US",
  uk: "en-GB",
  ca: "en-CA",
};

type Props = {
  params: Promise<{ market: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const paths: { market: string; slug: string }[] = [];
  for (const market of SUPPORTED_MARKETS) {
    for (const service of SERVICES) {
      paths.push({ market, slug: service.slug });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { market, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const config = getMarketConfig(market);

  const alternateUrls: Record<string, string> = {};
  for (const m of SUPPORTED_MARKETS) {
    const locale = MARKET_LOCALES[m] ?? m;
    alternateUrls[locale] = `/${m}/services/${slug}`;
  }

  return {
    title: `${service.name} · ${config.country} · Branda V2`,
    description: service.description,
    alternates: {
      canonical: `/${market}/services/${slug}`,
      languages: alternateUrls,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { market, slug } = await params;

  if (!SUPPORTED_MARKETS.includes(market)) {
    notFound();
  }

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const config: MarketConfig = getMarketConfig(market);

  const pricing = service.marketSpecific[market];

  return (
    <article className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href={`/${market}`}
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            ← Back to {config.country}
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{service.name}</h1>
            <p className="mt-4 text-lg text-gray-600">{service.description}</p>

            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">What&apos;s Included</h2>
              <ul className="mt-3 space-y-2">
                {service.included.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-indigo-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">Turnaround</h2>
              <p className="mt-1 text-sm text-gray-600">{service.turnaround}</p>
            </div>
          </div>

          <div>
            {pricing ? (
              <ServiceForm service={service} market={market} config={config} />
            ) : (
              <p className="text-sm text-gray-500">
                This service is not yet available in {config.country}.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
