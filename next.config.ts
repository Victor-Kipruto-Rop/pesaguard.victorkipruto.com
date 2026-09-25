import type { NextConfig } from "next";

type Header = { key: string; value: string };

/**
 * Baseline security headers for every route.
 *
 * The CSP allows inline scripts and styles because Next.js injects inline
 * hydration data and the pages carry JSON-LD; a nonce-based CSP would require
 * dynamic rendering for every route. External origins are limited to Google
 * Fonts, which styles/globals.css imports. The CSP is production-only because
 * the dev server needs eval for fast refresh.
 */
export function securityHeaders(production: boolean): Header[] {
  const headers: Header[] = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
    { key: "Strict-Transport-Security", value: "max-age=31536000" },
  ];

  if (production) {
    headers.push({
      key: "Content-Security-Policy",
      value: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' data: https://fonts.gstatic.com",
        "img-src 'self' data:",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ].join("; "),
    });
  }

  return headers;
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    // The per-topic API pages duplicated the docs. Keep their URLs alive.
    return [
      { source: "/api/authentication", destination: "/documentation/authentication", permanent: true },
      { source: "/api/transactions", destination: "/documentation/transactions", permanent: true },
      { source: "/api/reconciliation", destination: "/documentation/reconciliation", permanent: true },
      { source: "/api/fraud", destination: "/documentation/fraud", permanent: true },
      { source: "/api/webhooks", destination: "/documentation/webhooks", permanent: true },
      { source: "/api/reference", destination: "/api", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders(process.env.NODE_ENV === "production") }];
  },
};

export default nextConfig;
