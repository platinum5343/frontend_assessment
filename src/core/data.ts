export interface ServiceOption {
  name: string;
  values: string[];
}

export interface MarketPricing {
  price: number;
  currency: string;
  symbol: string;
  originalPrice?: number;
  featured: boolean;
}

export interface ServiceFilters {
  useCase: "corporate" | "events" | "startup" | "personal";
  industry: "tech" | "hospitality" | "education" | "entertainment";
  popularity: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: "digital" | "gifts" | "create" | "studio" | "prints";
  description: string;
  image: string;
  included: string[];
  turnaround: string;
  options: ServiceOption[];
  relatedSlugs: string[];
  marketSpecific: Record<string, MarketPricing>;
  filters: ServiceFilters;
}

export interface MarketConfig {
  currency: string;
  symbol: string;
  country: string;
}

const MARKET_CONFIGS: Record<string, MarketConfig> = {
  ng: { currency: "NGN", symbol: "₦", country: "Nigeria" },
  us: { currency: "USD", symbol: "$", country: "United States" },
  uk: { currency: "GBP", symbol: "£", country: "United Kingdom" },
  ca: { currency: "CAD", symbol: "$", country: "Canada" },
};

export function getMarketConfig(market: string): MarketConfig {
  return MARKET_CONFIGS[market] ?? MARKET_CONFIGS["ng"];
}

export const USE_CASES = ["all", "corporate", "events", "startup", "personal"] as const;
export const INDUSTRIES = ["all", "tech", "hospitality", "education", "entertainment"] as const;
export const SORT_OPTIONS = ["popularity", "price"] as const;
export const PAGE_SIZE = 9;

export function filterAndSortServices(
  services: Service[],
  market: string,
  params: {
    category?: string;
    search?: string;
    sortBy?: string;
    useCase?: string;
    industry?: string;
    page?: string;
  }
): {
  services: Service[];
  pagination: { page: number; totalPages: number; totalResults: number };
  appliedFilters: Record<string, string>;
} {
  const category = params.category ?? "all";
  const search = params.search ?? "";
  const sortBy = params.sortBy ?? "popularity";
  const useCase = params.useCase ?? "all";
  const industry = params.industry ?? "all";
  const page = parseInt(params.page ?? "1", 10) || 1;

  let filtered = services.filter((s) => market in s.marketSpecific);

  if (category !== "all") {
    filtered = filtered.filter((s) => s.category === category);
  }

  if (useCase !== "all") {
    filtered = filtered.filter((s) => s.filters.useCase === useCase);
  }

  if (industry !== "all") {
    filtered = filtered.filter((s) => s.filters.industry === industry);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }

  if (sortBy === "price") {
    filtered.sort(
      (a, b) =>
        (a.marketSpecific[market]?.price ?? 0) -
        (b.marketSpecific[market]?.price ?? 0)
    );
  } else {
    filtered.sort((a, b) => b.filters.popularity - a.filters.popularity);
  }

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  return {
    services: paginated,
    pagination: { page: safePage, totalPages, totalResults },
    appliedFilters: { category, search, sortBy, useCase, industry },
  };
}

export const SERVICES: Service[] = [
  {
    id: "svc_001",
    slug: "logo-design",
    name: "Logo Design",
    category: "digital",
    description:
      "A professionally crafted logo that captures your brand identity, values, and target audience. Includes multiple concepts and unlimited revisions.",
    image: "https://images.unsplash.com/photo-1621329165004-2f0619408757",
    included: [
      "3 custom logo concepts",
      "Unlimited revisions",
      "Vector and raster formats (AI, EPS, PNG, JPG)",
      "Brand color palette",
      "Black & white variations",
    ],
    turnaround: "5-7 business days",
    options: [
      {
        name: "Package",
        values: ["Basic", "Standard", "Premium"],
      },
      {
        name: "Revisions",
        values: ["Unlimited", "Up to 3 rounds"],
      },
    ],
    relatedSlugs: ["brand-guidelines", "business-cards"],
    marketSpecific: {
      ng: {
        price: 85000,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 120000,
        featured: true,
      },
      us: {
        price: 450,
        currency: "USD",
        symbol: "$",
        originalPrice: 650,
        featured: true,
      },
      uk: {
        price: 380,
        currency: "GBP",
        symbol: "£",
        originalPrice: 550,
        featured: true,
      },
      ca: {
        price: 620,
        currency: "CAD",
        symbol: "$",
        originalPrice: 800,
        featured: true,
      },
    },
    filters: {
      useCase: "startup",
      industry: "tech",
      popularity: 98,
    },
  },
  {
    id: "svc_002",
    slug: "branded-mugs",
    name: "Branded Mugs",
    category: "gifts",
    description:
      "Premium ceramic mugs printed with your custom design or logo. Perfect for corporate gifts, events, and promotional giveaways with vibrant, long-lasting prints.",
    image: "https://images.unsplash.com/photo-1555646186-8ce5a1b3fe64",
    included: [
      "Custom print on both sides",
      "Premium 11oz ceramic mug",
      "Multiple color options",
      "Dishwasher and microwave safe",
    ],
    turnaround: "3-5 business days",
    options: [
      {
        name: "Quantity",
        values: ["12 pcs", "24 pcs", "48 pcs"],
      },
      {
        name: "Mug Color",
        values: ["White", "Black", "Navy", "Red"],
      },
    ],
    relatedSlugs: ["branded-tote-bags", "promotional-pens"],
    marketSpecific: {
      ng: {
        price: 2500,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 3500,
        featured: true,
      },
      us: {
        price: 18,
        currency: "USD",
        symbol: "$",
        originalPrice: 25,
        featured: false,
      },
      uk: {
        price: 15,
        currency: "GBP",
        symbol: "£",
        originalPrice: 22,
        featured: false,
      },
      ca: {
        price: 24,
        currency: "CAD",
        symbol: "$",
        originalPrice: 33,
        featured: false,
      },
    },
    filters: {
      useCase: "corporate",
      industry: "tech",
      popularity: 76,
    },
  },
  {
    id: "svc_003",
    slug: "business-cards",
    name: "Business Cards",
    category: "prints",
    description:
      "High-quality custom-printed business cards on premium paper stock. Choose from elegant templates or provide your own design for a memorable first impression.",
    image: "https://images.unsplash.com/photo-1587133319634-7e4e5b7e8b1a",
    included: [
      "100 premium business cards",
      "Double-sided printing",
      "Custom design support",
      "Matte or glossy finish",
    ],
    turnaround: "2-3 business days",
    options: [
      {
        name: "Paper Type",
        values: ["300gsm Premium", "350gsm Luxe"],
      },
      {
        name: "Finish",
        values: ["Matte", "Glossy", "Soft Touch"],
      },
    ],
    relatedSlugs: ["logo-design", "brand-guidelines"],
    marketSpecific: {
      ng: {
        price: 15000,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 20000,
        featured: false,
      },
      us: {
        price: 80,
        currency: "USD",
        symbol: "$",
        originalPrice: 110,
        featured: false,
      },
      uk: {
        price: 68,
        currency: "GBP",
        symbol: "£",
        originalPrice: 95,
        featured: false,
      },
      ca: {
        price: 110,
        currency: "CAD",
        symbol: "$",
        originalPrice: 145,
        featured: false,
      },
    },
    filters: {
      useCase: "corporate",
      industry: "hospitality",
      popularity: 82,
    },
  },
  {
    id: "svc_004",
    slug: "event-backdrops",
    name: "Event Backdrops",
    category: "studio",
    description:
      "Eye-catching custom event backdrops and banners for conferences, trade shows, and celebrations. Professionally printed with high-resolution graphics and sturdy framing.",
    image: "https://images.unsplash.com/photo-1562145493-72275f5b023d",
    included: [
      "Custom design and printing",
      "8x8ft or 10x10ft size",
      "Aluminum or fiberglass frame",
      "Carrying bag included",
    ],
    turnaround: "7-10 business days",
    options: [
      {
        name: "Size",
        values: ["8x8ft", "10x10ft", "12x8ft"],
      },
      {
        name: "Frame Type",
        values: ["Aluminum", "Fiberglass", "Pop-up"],
      },
    ],
    relatedSlugs: ["branded-roll-up-banners", "event-flyers"],
    marketSpecific: {
      ng: {
        price: 120000,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 160000,
        featured: false,
      },
      us: {
        price: 750,
        currency: "USD",
        symbol: "$",
        originalPrice: 950,
        featured: false,
      },
      uk: {
        price: 630,
        currency: "GBP",
        symbol: "£",
        originalPrice: 800,
        featured: false,
      },
      ca: {
        price: 1020,
        currency: "CAD",
        symbol: "$",
        originalPrice: 1280,
        featured: false,
      },
    },
    filters: {
      useCase: "events",
      industry: "entertainment",
      popularity: 65,
    },
  },
  {
    id: "svc_005",
    slug: "social-media-graphics",
    name: "Social Media Graphics",
    category: "create",
    description:
      "Engaging social media content templates including Instagram posts, stories, LinkedIn banners, and Facebook covers tailored to your brand aesthetic.",
    image: "https://images.unsplash.com/photo-1611095973515-7c2c2a0a2b30",
    included: [
      "5 Instagram post templates",
      "10 Instagram story templates",
      "LinkedIn and Facebook cover designs",
      "Brand color integration",
      "Editable PSD & Canva links",
    ],
    turnaround: "3-4 business days",
    options: [
      {
        name: "Platform",
        values: ["Instagram", "All Platforms"],
      },
      {
        name: "Templates Count",
        values: ["10 templates", "20 templates", "30+ templates"],
      },
    ],
    relatedSlugs: ["logo-design", "brand-guidelines"],
    marketSpecific: {
      ng: {
        price: 45000,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 60000,
        featured: true,
      },
      us: {
        price: 250,
        currency: "USD",
        symbol: "$",
        originalPrice: 320,
        featured: true,
      },
      uk: {
        price: 210,
        currency: "GBP",
        symbol: "£",
        originalPrice: 280,
        featured: true,
      },
      ca: {
        price: 340,
        currency: "CAD",
        symbol: "$",
        originalPrice: 430,
        featured: true,
      },
    },
    filters: {
      useCase: "startup",
      industry: "tech",
      popularity: 89,
    },
  },
  {
    id: "svc_006",
    slug: "brand-guidelines",
    name: "Brand Guidelines",
    category: "digital",
    description:
      "A comprehensive brand style guide documenting your visual identity, typography, color codes, usage rules, and brand voice to ensure consistency across all touchpoints.",
    image: "https://images.unsplash.com/photo-1586281380248-8a532d5f0a5f",
    included: [
      "Complete visual identity documentation",
      "Typography and font pairing guide",
      "Color palette with HEX, RGB, and CMYK values",
      "Logo usage and misuse rules",
      "Brand voice and messaging tone",
    ],
    turnaround: "4-6 business days",
    options: [
      {
        name: "Format",
        values: ["PDF", "Interactive PDF", "Editable Figma File"],
      },
      {
        name: "Add-ons",
        values: ["Basic", "Plus Brand Kit", "Full Stationery Suite"],
      },
    ],
    relatedSlugs: ["logo-design", "business-cards"],
    marketSpecific: {
      ng: {
        price: 180000,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 250000,
        featured: false,
      },
      us: {
        price: 950,
        currency: "USD",
        symbol: "$",
        originalPrice: 1300,
        featured: false,
      },
      uk: {
        price: 800,
        currency: "GBP",
        symbol: "£",
        originalPrice: 1100,
        featured: false,
      },
      ca: {
        price: 1300,
        currency: "CAD",
        symbol: "$",
        originalPrice: 1750,
        featured: false,
      },
    },
    filters: {
      useCase: "corporate",
      industry: "tech",
      popularity: 71,
    },
  },
  {
    id: "svc_007",
    slug: "branded-tote-bags",
    name: "Branded Tote Bags",
    category: "gifts",
    description:
      "Eco-friendly cotton and jute tote bags custom-printed with your brand design. Sustainable promotional items ideal for corporate gifting and event swag.",
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf32",
    included: [
      "Natural cotton or jute material",
      "Custom logo or design printing",
      "Eco-friendly inks",
      "Assorted handle colors",
    ],
    turnaround: "5-7 business days",
    options: [
      {
        name: "Material",
        values: ["Cotton", "Jute", "Canvas"],
      },
      {
        name: "Handle Color",
        values: ["Black", "Natural", "Red"],
      },
    ],
    relatedSlugs: ["branded-mugs", "promotional-pens"],
    marketSpecific: {
      ng: {
        price: 3500,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 5000,
        featured: false,
      },
      us: {
        price: 22,
        currency: "USD",
        symbol: "$",
        originalPrice: 30,
        featured: false,
      },
      uk: {
        price: 18,
        currency: "GBP",
        symbol: "£",
        originalPrice: 25,
        featured: false,
      },
      ca: {
        price: 29,
        currency: "CAD",
        symbol: "$",
        originalPrice: 38,
        featured: false,
      },
    },
    filters: {
      useCase: "events",
      industry: "education",
      popularity: 58,
    },
  },
  {
    id: "svc_008",
    slug: "event-flyers",
    name: "Event Flyers & Posters",
    category: "prints",
    description:
      "Professionally designed and printed flyers and posters to promote your event, product launch, or announcement. Available in multiple sizes with premium finishes.",
    image: "https://images.unsplash.com/photo-1587614297650-9c1b09d1c3c3",
    included: [
      "Up to 3 design iterations",
      "High-quality CMYK printing",
      "Multiple paper stock options",
      "Delivery in PDF print-ready format",
      "Same-day print service available",
    ],
    turnaround: "2-4 business days",
    options: [
      {
        name: "Size",
        values: ["A5 Flyer", "A4 Poster", "A3 Poster", "A2 Poster"],
      },
      {
        name: "Quantity",
        values: ["50 pcs", "100 pcs", "250 pcs", "500 pcs"],
      },
    ],
    relatedSlugs: ["event-backdrops", "social-media-graphics"],
    marketSpecific: {
      ng: {
        price: 12000,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 16000,
        featured: false,
      },
      us: {
        price: 65,
        currency: "USD",
        symbol: "$",
        originalPrice: 90,
        featured: false,
      },
      uk: {
        price: 55,
        currency: "GBP",
        symbol: "£",
        originalPrice: 78,
        featured: false,
      },
      ca: {
        price: 88,
        currency: "CAD",
        symbol: "$",
        originalPrice: 120,
        featured: false,
      },
    },
    filters: {
      useCase: "events",
      industry: "entertainment",
      popularity: 62,
    },
  },
  {
    id: "svc_009",
    slug: "branded-roll-up-banners",
    name: "Branded Roll-up Banners",
    category: "studio",
    description:
      "Professional roll-up banner stands with custom prints for trade shows, retail spaces, and storefronts. Lightweight, portable, and designed for maximum visual impact.",
    image: "https://images.unsplash.com/photo-1611095973515-7c2c2a0a2b30",
    included: [
      "Custom high-resolution print",
      "Aluminum tripod base",
      "Adjustable height pole",
      "Protective carrying case",
    ],
    turnaround: "5-7 business days",
    options: [
      {
        name: "Size",
        values: ["31.5x83.5in", "33.5x83.5in", "35.5x83.5in"],
      },
      {
        name: "Base",
        values: ["Aluminum", "Fabric Weighted"],
      },
    ],
    relatedSlugs: ["event-backdrops", "branded-tote-bags"],
    marketSpecific: {
      ng: {
        price: 75000,
        currency: "NGN",
        symbol: "₦",
        originalPrice: 100000,
        featured: false,
      },
      us: {
        price: 420,
        currency: "USD",
        symbol: "$",
        originalPrice: 550,
        featured: false,
      },
      uk: {
        price: 350,
        currency: "GBP",
        symbol: "£",
        originalPrice: 460,
        featured: false,
      },
      ca: {
        price: 570,
        currency: "CAD",
        symbol: "$",
        originalPrice: 740,
        featured: false,
      },
    },
    filters: {
      useCase: "corporate",
      industry: "hospitality",
      popularity: 54,
    },
  },
];
