import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_MARKETS = ["ng", "us", "uk", "ca"];

const REGION_TO_MARKET: Record<string, string> = {
  NG: "ng",
  US: "us",
  GB: "uk",
  CA: "ca",
};

const INTERNAL_PATH_PREFIXES = ["/_next", "/_vercel", "/api", "/_action", "/__nextjs", "/_build"];

const STATIC_FILE_REGEX = /\.(ico|png|jpg|jpeg|gif|webp|svg|css|js|mjs|json|woff|woff2|ttf|eot|mp4|webm|ogg|mp3|wav|pdf|xml|txt)(\?.*)?$/i;

function isInternalPath(pathname: string): boolean {
  if (INTERNAL_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }
  if (pathname === "/favicon.ico" || pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return true;
  }
  if (STATIC_FILE_REGEX.test(pathname)) {
    return true;
  }
  return false;
}

function hasMarketPrefix(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 0 && SUPPORTED_MARKETS.includes(segments[0]);
}

function detectMarketFromAcceptLanguage(acceptLanguage: string | null): string | null {
  if (!acceptLanguage) return null;

  const entries = acceptLanguage
    .split(",")
    .map((entry) => {
      const [locale, ...params] = entry.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? parseFloat(qParam.split("=")[1]) : 1;
      return { locale: locale.trim(), q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { locale } of entries) {
    const regionMatch = locale.match(/^[a-z]{2}-([A-Za-z]{2})$/i);
    if (regionMatch) {
      const region = regionMatch[1].toUpperCase();
      const market = REGION_TO_MARKET[region];
      if (market) return market;
    }
  }
  return null;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|_vercel|api|robots.txt|sitemap.xml|.*\\..+$).*)"],
};

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (isInternalPath(pathname)) {
    return NextResponse.next();
  }

  if (hasMarketPrefix(pathname)) {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get("accept-language");
  const detectedMarket = detectMarketFromAcceptLanguage(acceptLanguage);
  const targetMarket = detectedMarket ?? "ng";

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${targetMarket}` : `/${targetMarket}${pathname}`;

  return NextResponse.redirect(url);
}
