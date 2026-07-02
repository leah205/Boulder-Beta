import { describe, it, expect } from "vitest";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router-dom";
import { vi } from "vitest";
import router from "@/routes.tsx";
import api from "./auth_service";
import "@testing-library/jest-dom/vitest";
import ProviderWrapper from "@/tests/ProviderWrapper";

vi.mock("./auth_service");

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
    render(<ProviderWrapper />);
    // expect(screen.findByText("My Climbs")).toBeInTheDocument();
    //await waitForElementToBeRemoved(screen.getByText("Sign In"));\

    await waitFor(() => {
      expect(screen.getByText("My Climbs")).toBeInTheDocument();
    });
  });
});
