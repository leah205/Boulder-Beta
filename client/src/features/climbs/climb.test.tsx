import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import ProviderWrapper from "@/tests/ProviderWrapper";
expect.extend(matchers);
import auth_api from "@/features/authentication/auth_service";
import climb_api from "@/features/climbs/climbService";
import user_api from "@/features/users/userService";
import { vi } from "vitest";

vi.mock("@/features/authentication/auth_service");
vi.mock("@/features/climbs/climbService");
vi.mock("@/features/users/userService");

vi.mocked(auth_api.getUserFromToken).mockResolvedValue({
  id: 1,
  username: "leah",
});

vi.mocked(user_api.getMyClimbs).mockResolvedValue([
  {
    id: 1,
    grade: "V3",
    color: "blue",
    sent: false,
    uploadedAt: new Date(),
    creatorId: 1,
    picture: undefined,
    published: false,
    rating: null,
  },
  {
    id: 2,
    grade: null,
    color: "pink",
    sent: true,
    uploadedAt: new Date(),
    creatorId: 1,
    picture: undefined,
    published: false,
    rating: 5,
  },
]);

describe("log climb", () => {
  it("renders form component on log form page", async () => {
    render(<ProviderWrapper initRoute="/log-climb" />);
    const button = await screen.findByText("Save Climb");
    expect(button).toBeInTheDocument();
  });
});

describe("my climbs ", () => {
  it("renders climb cards", async () => {
    render(<ProviderWrapper initRoute="/my-climbs" />);
    const climbsHeader = await screen.findByText("My Climbs");
    expect(climbsHeader).toBeInTheDocument();
    const climbCards = await screen.findAllByTestId("climb-card");
    expect(climbCards.length).toBe(2);

    const card1Img = within(climbCards[0]).getByTestId("climb-pic");
    expect(card1Img.style.backgroundImage).toBe(
      `url("/src/assets/mountain.svg")`,
    );

    const card1Sent = within(climbCards[0]).queryByTestId("sent-check");
    expect(card1Sent).not.toBeInTheDocument();

    const card2Sent = within(climbCards[1]).getByTestId("sent-check");
    expect(card2Sent).toBeInTheDocument();
  });
});
