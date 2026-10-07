import Link from "next/link";
import type { Metadata } from "next";
import React from "react";
import { getMarketConfig, type MarketConfig } from "@/core/data";

const SUPPORTED_MARKETS = ["ng", "us", "uk", "ca"];

const ECOYSTEM_PILLARS = [
  {
    id: "studio",
    name: "Studio by Branda",
    description:
      "Strategic brand identities, positioning, logo design, and style guides.",
  },
  {
    id: "digital",
    name: "Digital by Branda",
    description:
      "High-performance web development, mobile applications, and digital expansion.",
  },
  {
    id: "create",
    name: "Create by Branda",
    description:
      "Creative problem-solving, UI/UX conceptual design, and custom PR strategy.",
  },
  {
    id: "gifts",
    name: "Gifts by Branda",
    description:
      "End-to-end corporate customized gifting solutions, sourcing, and on-brand distribution packaging.",
  },
  {
    id: "prints",
    name: "Prints by Branda",
    description:
      "Premium corporate stationery, large format banners, apparel manufacturing, and print materials.",
  },
];

const BUSINESS_STAGES = [
  {
    stage: "Ideation Stage",
    title: "Foundations Are Everything",
    description:
      "Your brand is taking shape, and establishing a solid foundation is crucial for long-term success. Branda ensures your brand identity is clear, cohesive, and built to last.",
    items: [
      "Complete Digital Brand Setup – Developing a brand-aligned website and customized social media templates.",
      "Brand Strategy Framework – Defining your mission, vision, values, and positioning.",
    ],
  },
  {
    stage: "Startup Stage",
    title: "Building Visibility & Trust",
    description:
      "Your business is making its market debut, and creating strong brand awareness is essential for attracting customers and building credibility.",
    items: [
      "Website Development & Digital Presence – Launching a fully functional, brand-aligned website.",
      "Workspace Development – Establishing branded office spaces for team productivity.",
      "Marketing & Promotional Materials – High-quality business cards, flyers, brochures, and digital ads.",
    ],
  },
  {
    stage: "Enterprise Stage",
    title: "Scale Without Compromise",
    description:
      "You need scalable systems, consistent brand execution across regions, and infrastructure that grows with your ambitions.",
    items: [
      "Scalable Digital Infrastructure – E-commerce capable websites with custom landing pages.",
      "Enterprise Brand Guidelines – Ensuring consistency across thousands of touchpoints globally.",
      "PR & SEO Strategy – Integrated PR and SEO strategy that improves brand visibility and online reputation.",
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}): Promise<Metadata> {
  const { market } = await params;
  const config = getMarketConfig(market);
  return {
    title: `About Us · ${config.country} · Branda V2`,
    description: `Learn how Branda serves 500+ corporate clients across ${config.country} with integrated branding solutions.`,
  };
}

export async function generateStaticParams() {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const config: MarketConfig = getMarketConfig(market);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 py-24 text-center border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            The Most Reliable Branding Partner for Your Brand
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            An all-in-one ecosystem bringing multiple branding solutions
            together under one roof — eliminating middleman costs and vendor
            management stress.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={`/${market}`}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Browse Services in {config.country}
            </Link>
          </div>
        </div>
      </section>

      {/* Real Metrics Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">
                500+
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Active Corporate Clients
              </h3>
              <p className="text-sm text-slate-600">
                Including Truecaller, GT Bank, Dangote, Swipe Nigeria, and
                Reliance InfoSystems
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">
                5,000+
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                High-Quality Products Delivered
              </h3>
              <p className="text-sm text-slate-600">
                Globally across Nigeria, USA, UK, and Canada
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">
                4
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                International Markets
              </h3>
              <p className="text-sm text-slate-600">
                Nigeria, USA, United Kingdom, and Canada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Branda Ecosystem Pillars */}
      <section className="py-20 bg-slate-50/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              The Integrated Branda Ecosystem
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our five specialized sub-studios work in perfect harmony to
              deliver end-to-end branding solutions — from ideation to
              execution and beyond.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ECOYSTEM_PILLARS.map((pillar) => (
              <Link
                key={pillar.id}
                href={`/${market}/services`}
                className="group block bg-white border border-slate-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-100/80 transition-all duration-300 ease-out"
              >
                <div
                  className={`
                    mb-4 flex h-12 w-12 items-center justify-center rounded-xl
                    bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100
                    group-hover:scale-110 transition-transform
                  `}
                >
                  <EcosystemIcon pillarId={pillar.id} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {pillar.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Business Stage Framework */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              How We Serve Your Business Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              No matter your stage, Branda adapts our integrated solution set
              to meet your evolving needs.
            </p>
          </div>

          <div className="space-y-12">
            {BUSINESS_STAGES.map((businessStage, index) => (
              <div
                key={businessStage.stage}
                className={`
                  rounded-2xl border border-slate-100 p-8
                  hover:shadow-xl hover:shadow-slate-100/60 transition-shadow
                  ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"}
                `}
              >
                <div className="mb-6 flex items-center gap-4">
                  <span
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full
                      bg-emerald-600 text-white font-bold text-lg
                    `}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
                      {businessStage.stage}
                    </h3>
                    <h4 className="text-2xl font-bold text-slate-900">
                      {businessStage.title}
                    </h4>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {businessStage.description}
                </p>

                <ul className="space-y-3">
                  {businessStage.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <span className="text-emerald-600 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-emerald-900 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="text-lg text-slate-200 mb-8">
            Join 500+ companies that trust Branda for their branding journey.
            From startups to multinationals, we help you build a brand the
            world can&apos;t ignore.
          </p>
          <Link
            href={`/${market}/contact`}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:scale-105 shadow-lg"
          >
            Request a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

function EcosystemIcon({ pillarId }: { pillarId: string }) {
  const icons: Record<string, React.ReactElement> = {
    studio: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 17h2M9 9h6M7 20h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v13a2 2 0 002 2z"
        />
      </svg>
    ),
    digital: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17h4.5M9.75 13h4.5m-4.5-4h.01M9.75 5h4.5a2 2 0 012 2v11a2 2 0 01-2 2h-4.5a2 2 0 01-2-2V7a2 2 0 012-2z"
        />
      </svg>
    ),
    create: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6l4 2M8 8l4 4 4-4"
        />
      </svg>
    ),
    gifts: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15l9-5-9-5-9 5 9 5zM12 15V15m0 0l-9-5v10l9 5m0 0l9-5v-10"
        />
      </svg>
    ),
    prints: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16l4-4v10a2 2 0 01-2 2H6a2 2 0 01-2-2V12l2 4z"
        />
      </svg>
    ),
  };

  return icons[pillarId] ?? icons.studio;
}
