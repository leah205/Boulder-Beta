// import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import ProviderWrapper from "@/tests/ProviderWrapper";
expect.extend(matchers);
import auth_api from "@/features/authentication/auth_service";
import user_api from "@/features/users/userService";
import { vi } from "vitest";
import { createTestUser, createTestClimb } from "@/tests/factories";
import userApi from "@/features/users/userService";
import mountainSvg from "@assets/mountain.svg";
vi.mock("@/features/authentication/auth_service");
vi.mock("@/features/climbs/climbService");
vi.mock("@/features/users/userService");

const user1 = createTestUser();
const climb1 = createTestClimb({
  creatorId: user1.id,
  id: 1,
  grade: "V3",
  sent: false,
  color: "blue",
  picture: null,
});
const climb2 = createTestClimb({
  creatorId: user1.id,
  id: 2,
  grade: null,
  color: "pink",
  sent: true,
  picture: null,
});

vi.mocked(auth_api.getUserFromToken).mockResolvedValue(user1);

vi.mocked(user_api.getMyClimbs).mockResolvedValue([climb1, climb2]);
vi.mocked(userApi.getUserData).mockResolvedValue(user1);

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
    expect(card1Img.style.backgroundImage).toBe(`url("${mountainSvg}")`);

    const card1Sent = within(climbCards[0]).queryByTestId("sent-check");
    expect(card1Sent).not.toBeInTheDocument();

    const card2Sent = within(climbCards[1]).getByTestId("sent-check");
    expect(card2Sent).toBeInTheDocument();
  });
});
