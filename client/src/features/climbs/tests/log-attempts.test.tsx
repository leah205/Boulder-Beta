import { createTestClimb, createTestUser } from "@/tests/factories";
import ProviderWrapper from "@/tests/ProviderWrapper";
import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { describe, it, expect, beforeEach } from "vitest";

import auth_api from "@/features/authentication/auth_service";
import user_api from "@/features/users/userService";
import userApi from "@/features/users/userService";
import userEvent from "@testing-library/user-event";
import climbApi from "../climbService";

const user = createTestUser();
const climb1 = createTestClimb();
const climb2 = createTestClimb({ picture: "picture.png" });

vi.mocked(auth_api.getUserFromToken).mockResolvedValue(user);

vi.mocked(userApi.getUserData).mockResolvedValue(user);

describe("log attempt flow", () => {
  it("clicks log attempt no climb picture", async () => {
    vi.mocked(climbApi.getClimb).mockResolvedValue(climb1);
    const user = userEvent.setup();
    render(
      <ProviderWrapper initRoute={`/climbs/${climb1.id}`}></ProviderWrapper>,
    );
    const attemptButton = await screen.findByText("Log Attempt");
    await user.click(attemptButton);

    const AttemptTagModal = screen.queryByTestId("modal-text");
    expect(AttemptTagModal).not.toBeInTheDocument();
    // no modal
    // calls api
  });

  it("log attempt with climb picture", async () => {
    vi.mocked(climbApi.getClimb).mockResolvedValue(climb2);
    const user = userEvent.setup();

    render(
      <ProviderWrapper initRoute={`/climbs/${climb2.id}`}></ProviderWrapper>,
    );
    const attemptButton = await screen.findByText("Log Attempt");
    await user.click(attemptButton);

    const AttemptTagModal = screen.queryByTestId("modal-text");
    expect(AttemptTagModal).toBeInTheDocument();
  });

  it("log send with climb picture", async () => {
    vi.mocked(climbApi.getClimb).mockResolvedValue(climb2);
    const user = userEvent.setup();

    render(
      <ProviderWrapper initRoute={`/climbs/${climb2.id}`}></ProviderWrapper>,
    );
    const attemptButton = await screen.findByText("Log Attempt");
    await user.click(attemptButton);

    const AttemptTagModal = screen.queryByTestId("modal-text");
    expect(AttemptTagModal).not.toBeInTheDocument();
  });

  it("log recorded attempt, attempt modal closes on x", async () => {
    const user = userEvent.setup();

    render(
      <ProviderWrapper initRoute={`/climbs/${climb2.id}`}></ProviderWrapper>,
    );
    const recordButton = await screen.findByRole("button", { name: "Record" });
    const recordModal = screen.getByTestId("record-modal");
    await user.click(recordButton);
    const file = new File(["hello"], "hello.png", { type: "video/mp4" });
    const input = screen.getByLabelText("Upload a video");
    await user.upload(input, file);
    const logAttempt = within(recordModal).getByText("Log Attempt");
    await user.click(logAttempt);
    const AttemptTagModal = screen.queryByTestId("modal-text");
    expect(AttemptTagModal).toBeInTheDocument();
    const closeModal = screen.getByRole("button", { name: "x" });
    await user.click(closeModal);
    expect(AttemptTagModal).not.toBeInTheDocument();
  });
});
