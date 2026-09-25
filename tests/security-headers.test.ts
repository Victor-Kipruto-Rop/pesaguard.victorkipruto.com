import { describe, expect, it } from "vitest";
import { securityHeaders } from "../next.config";

const byKey = (production: boolean) =>
  Object.fromEntries(securityHeaders(production).map((header) => [header.key, header.value]));

describe("security headers", () => {
  it("always sends the baseline headers", () => {
    const headers = byKey(false);
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Referrer-Policy"]).toBeDefined();
    expect(headers["Permissions-Policy"]).toBeDefined();
    expect(headers["Strict-Transport-Security"]).toBeDefined();
    expect(headers["Content-Security-Policy"]).toBeUndefined();
  });

  it("adds a CSP in production that blocks framing and plugins", () => {
    const csp = byKey(true)["Content-Security-Policy"];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("https://fonts.googleapis.com");
    expect(csp).toContain("https://fonts.gstatic.com");
  });
});
