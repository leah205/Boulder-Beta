import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import auth_api from "@/features/authentication/auth_service";
import userApi from "@/features/users/userService";
import { createTestUser } from "@/tests/factories";
expect.extend(matchers);

import { server } from "@/tests/node";

beforeAll(async () => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.resetAllMocks();
});
afterAll(() => server.close());
