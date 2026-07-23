import { expect, afterEach, beforeAll, afterAll, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

import { vi } from "vitest";

expect.extend(matchers);

import { server } from "@/tests/node";

beforeAll(async () => {
  server.listen({ onUnhandledRequest: "warn" });
});

vi.mock("@/features/authentication/auth_service");
vi.mock("@/features/users/userService");
vi.mock("@/features/climbs/climbService");

afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
