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
    <article className="py-12 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href={`/${market}`}
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← Back to {config.country}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
              {service.name}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {service.description}
            </p>

            <div className="mt-8">
              <h2 className="text-sm font-medium text-slate-900 mb-3">
                What&apos;s Included
              </h2>
              <ul className="space-y-2">
                {service.included.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="text-emerald-600 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-medium text-slate-900">Turnaround</h2>
              <p className="mt-1 text-sm text-slate-600">{service.turnaround}</p>
            </div>

            {pricing?.featured && (
              <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Featured Service
              </div>
            )}
          </div>

          <div>
            {pricing ? (
              <ServiceForm service={service} market={market} config={config} />
            ) : (
              <p className="text-sm text-slate-500">
                This service is not yet available in {config.country}.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
