import { describe, it, expect, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import api from "./auth_service";
import "@testing-library/jest-dom/vitest";
import auth_api from "@/features/authentication/auth_service";
import userApi from "@/features/users/userService";
import { createTestUser } from "@/tests/factories";

import * as matchers from "@testing-library/jest-dom/matchers";
import ProviderWrapper from "@/tests/ProviderWrapper";
expect.extend(matchers);

const user1 = createTestUser();

vi.mock("@/features/authentication/auth_service");
vi.mock("@/features/users/userService");
// vi.mocked(auth_api.getUserFromToken).mockResolvedValue(user1);
vi.mocked(userApi.getUserData).mockResolvedValue(user1);

describe("authentication", () => {
  it("directs unauthenticated user to sign in page on page load", async () => {
    render(<ProviderWrapper />);

    await waitFor(() => {
      const signInButton = screen.getByRole("button");
      expect(signInButton.textContent).toMatch(/Sign In/);
    });
  });

  it("directs authenticated user to my climbs page on page load", async () => {
    vi.mocked(api.getUserFromToken).mockResolvedValue({
      id: 1,
      username: "leah",
    });
    render(<ProviderWrapper initRoute="/" />);
    const climbsHeader = await screen.findByText("My Climbs");
    expect(climbsHeader).toBeInTheDocument();
  });

  it("signs user out when they click sign out", async () => {
    const user = userEvent.setup();
    vi.mocked(api.getUserFromToken).mockResolvedValue({
      id: 1,
      username: "leah",
    });

    render(<ProviderWrapper />);

    expect(api.getUserFromToken).toHaveBeenCalled();
    const climbsHeader = await screen.findByText("My Climbs");
    expect(climbsHeader).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /Signout/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Sign In" }));
    });
  });

  // it("navigates to signout", async () => {
  //   const user = userEvent.setup();
  //   render(<ProviderWrapper initRoute="/signin" />);
  //   const SignupBtn = await screen.findByText("Don't have an account?", {
  //     exact: false,
  //   });

  //   expect(SignupBtn).toBeInTheDocument();
  //   await user.click(SignupBtn);

  //   const confirmPasswordField =
  //     await screen.findByLabelText("Confirm Password:");
  //   expect(confirmPasswordField).toBeInTheDocument();
  // });
});
