import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockGetUser = vi.hoisted(() => vi.fn());

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}));

const mockNextCookiesSet = vi.fn();

vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    NextResponse: {
      next: vi.fn(() => ({
        status: 200,
        cookies: { set: mockNextCookiesSet },
      })),
      redirect: vi.fn((url: URL) => ({
        status: 307,
        headers: new Headers({ location: url.toString() }),
      })),
    },
  };
});

import proxy from "./proxy";

beforeEach(() => {
  vi.clearAllMocks();
});

function makeRequest(path: string): NextRequest {
  return new NextRequest(new URL(`https://example.com${path}`));
}

function authAs(userId = "test-user-id") {
  mockGetUser.mockResolvedValue({ data: { user: { id: userId } } });
}

function noAuth() {
  mockGetUser.mockResolvedValue({ data: { user: null } });
}

describe("proxy", () => {
  it("redirects authenticated user from /auth/login to /", async () => {
    authAs();
    const request = makeRequest("/auth/login");

    const result = await proxy(request);

    expect(result.status).toBe(307);
    expect(result.headers.get("location")).toBe("https://example.com/");
  });

  it("passes through /auth/login without authenticated user", async () => {
    noAuth();
    const request = makeRequest("/auth/login");

    const result = await proxy(request);

    expect(result.status).toBe(200);
    expect(result.cookies).toBeDefined();
  });

  it("redirects unauthenticated user from /profile to /auth/login?next=%2Fprofile", async () => {
    noAuth();
    const request = makeRequest("/profile");

    const result = await proxy(request);

    expect(result.status).toBe(307);
    expect(result.headers.get("location")).toBe("https://example.com/auth/login?next=%2Fprofile");
  });

  it("redirects unauthenticated user from /onboarding/step1 to /auth/login?next=%2Fonboarding%2Fstep1", async () => {
    noAuth();
    const request = makeRequest("/onboarding/step1");

    const result = await proxy(request);

    expect(result.status).toBe(307);
    expect(result.headers.get("location")).toBe(
      "https://example.com/auth/login?next=%2Fonboarding%2Fstep1",
    );
  });

  it("redirects unauthenticated user from / to /auth/login?next=%2F", async () => {
    noAuth();
    const request = makeRequest("/");

    const result = await proxy(request);

    expect(result.status).toBe(307);
    expect(result.headers.get("location")).toBe("https://example.com/auth/login?next=%2F");
  });

  it("passes through protected route with authenticated user", async () => {
    authAs();
    const request = makeRequest("/profile");

    const result = await proxy(request);

    expect(result.status).toBe(200);
    expect(result.cookies).toBeDefined();
  });

  it("passes through unrestricted route /auth/callback regardless of auth state", async () => {
    noAuth();
    const request = makeRequest("/auth/callback");

    const result = await proxy(request);

    expect(result.status).toBe(200);
    expect(result.cookies).toBeDefined();
  });
});
