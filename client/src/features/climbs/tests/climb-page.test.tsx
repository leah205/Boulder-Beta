import auth_api from "@/features/authentication/auth_service";
import climbApi from "../climbService";
import ProviderWrapper from "@/tests/ProviderWrapper";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  createTestAttemptWithVideo,
  createTestClimb,
  createTestUser,
} from "@/tests/factories";
import { vi } from "vitest";

vi.mock("@/features/authentication/auth_service");
vi.mock("@/features/climbs/climbService");

const user1 = createTestUser(1, "leah");
const climb1 = createTestClimb(user1.id, {
  id: 1,
  grade: "V8",
  picture: "fake_url",
});
const attempt1 = createTestAttemptWithVideo(climb1.id, {
  send: false,
  video: {
    clip: "fake_clip",
    post: {
      id: 1,
      attemptId: 1,
      description: null,
    },
  },
});
const attempt2 = createTestAttemptWithVideo(climb1.id, {
  send: true,
  video: {
    clip: "fake_clip_2",
    post: null,
  },
});

const attempt3 = createTestAttemptWithVideo(climb1.id, {
  send: true,
  video: null,
});

vi.mocked(auth_api.getUserFromToken).mockResolvedValue(user1);
vi.mocked(climbApi.logAttempt).mockResolvedValue({});
vi.mocked(climbApi.getClimb).mockResolvedValue(climb1);
vi.mocked(climbApi.getAttempts).mockResolvedValue([
  attempt1,
  attempt2,
  attempt3,
]);

describe("climb header rendering", () => {
  it("renders climb card correctly", async () => {
    render(<ProviderWrapper initRoute="/climbs/1" />);

    const cardImg = await screen.findByTestId("climb-pic");
    const grade = await screen.findByText("V8");

    expect(cardImg.style.backgroundImage).toBe(`url("fake_url")`);
    expect(grade).toBeInTheDocument();
  });
});

describe("attempts rendering", () => {
  it("renders attempts correctly", async () => {
    render(<ProviderWrapper initRoute="/climbs/1" />);
    const attemptRows = await screen.findAllByTestId("attempt-row");
    expect(attemptRows.length).toBe(3);
    expect(within(attemptRows[0]).getByText("Attempt")).toBeInTheDocument();
    expect(within(attemptRows[1]).getByText("Send")).toBeInTheDocument();
    expect(within(attemptRows[0]).getByRole("button")).toHaveTextContent(
      "View",
    );

    expect(
      within(attemptRows[2]).queryByRole("button"),
    ).not.toBeInTheDocument();
  });

  it("toggles video", async () => {
    const user = userEvent.setup();
    render(<ProviderWrapper initRoute="/climbs/1" />);

    const attemptRows = await screen.findAllByTestId("attempt-row");
    const viewButton = within(attemptRows[0]).getByRole("button", {
      name: "View",
    });
    await user.click(viewButton);
    expect(within(attemptRows[0]).getByTestId("video_source")).toHaveAttribute(
      "src",
      "fake_clip",
    );
    const hideButton = within(attemptRows[0]).getByRole("button", {
      name: "Hide",
    });
    await user.click(hideButton);
    expect(
      within(attemptRows[0]).queryByTestId("video_source"),
    ).not.toBeInTheDocument();
  });

  it("record modal works", async () => {
    const user = userEvent.setup();
    render(<ProviderWrapper initRoute="/climbs/1" />);
    const recordButton = await screen.findByRole("button", { name: "Record" });
    await user.click(recordButton);
    const input = screen.queryByLabelText("Upload a video:");
    expect(input).toBeInTheDocument();
    const closeBtn = screen.getByRole("button", { name: "x" });
    await user.click(closeBtn);
    expect(input).not.toBeInTheDocument();
  });

  it("conditional go to post/publish", async () => {
    const user = userEvent.setup();
    render(<ProviderWrapper initRoute="/climbs/1" />);

    const attemptRows = await screen.findAllByTestId("attempt-row");
    const viewButton0 = within(attemptRows[0]).getByRole("button", {
      name: "View",
    });
    await user.click(viewButton0);
    expect(within(attemptRows[0]).getByText("Go to post")).toBeInTheDocument();

    const viewButton1 = within(attemptRows[1]).getByRole("button", {
      name: "View",
    });
    await user.click(viewButton1);
    expect(within(attemptRows[1]).getByText("Publish")).toBeInTheDocument;
  });
});
