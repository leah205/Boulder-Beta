import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ProviderWrapper from "@/tests/ProviderWrapper";
import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { vi } from "vitest";
import {
  createTestPost,
  createTestBeta,
  createTestUser,
} from "@/tests/factories";
import postApi from "@/features/posts/postService";
import auth_api from "@/features/authentication/auth_service";
import userEvent from "@testing-library/user-event";

vi.mock("@/features/authentication/auth_service");
vi.mock("@/features/climbs/climbService");
vi.mock("@/features/users/userService");
vi.mock("@/features/posts/postService");

const post = createTestPost();
const beta1 = createTestBeta();
const beta2 = createTestBeta();
post.betas = [beta1, beta2];
const user1 = createTestUser();

vi.mocked(postApi.getPost).mockResolvedValue(post);
vi.mocked(auth_api.getUserFromToken).mockResolvedValue(user1);

describe("beta form", () => {
  it("opens and closes beta section", async () => {
    const user = userEvent.setup();
    render(<ProviderWrapper initRoute={`/post/${post.id}`} />);

    const betaButton = await screen.findByTestId("open-beta-btn");
    expect(betaButton).toBeInTheDocument();
    await user.click(betaButton);

    const closeBetaSectionBtn = await screen.getByRole("button", { name: "x" });
    await user.click(closeBetaSectionBtn);

    expect(closeBetaSectionBtn).not.toBeInTheDocument();

    await user.click(betaButton);
  });
  it("opens and closes new beta form", async () => {
    const user = userEvent.setup();
    render(<ProviderWrapper initRoute={`/post/${post.id}`} />);

    const betaButton = await screen.findByTestId("open-beta-btn");
    await user.click(betaButton);

    const newBetaBtn = await screen.getByRole("button", { name: "+" });
    await user.click(newBetaBtn);

    expect(screen.getByTestId("new-comment-text")).toBeInTheDocument();
    const closeNewBetaBtn = await screen.getByRole("button", { name: "-" });
    await user.click(closeNewBetaBtn);
    expect(screen.queryByTestId("new-comment-text")).not.toBeInTheDocument();
  });

  it("renders betas", async () => {
    const user = userEvent.setup();
    render(<ProviderWrapper initRoute={`/post/${post.id}`} />);

    const betaButton = await screen.findByTestId("open-beta-btn");
    await user.click(betaButton);

    expect(screen.getByText(beta1.author.username)).toBeInTheDocument();
    expect(screen.getByText(beta1.content)).toBeInTheDocument();
    expect(screen.getByText(beta2.author.username)).toBeInTheDocument();
    expect(screen.getByText(beta2.content)).toBeInTheDocument();
  });

  it("closes beta form on submit beta", async () => {
    const user = userEvent.setup();
    render(<ProviderWrapper initRoute={`/post/${post.id}`} />);

    const betaButton = await screen.findByTestId("open-beta-btn");
    await user.click(betaButton);

    const newBetaBtn = await screen.getByRole("button", { name: "+" });
    await user.click(newBetaBtn);

    const betaInput = screen.getByTestId("new-comment-text");
    await user.type(betaInput, "bla bla bal");

    await user.click(screen.getByText("Submit"));
    expect(screen.queryByTestId("new-comment-text")).not.toBeInTheDocument();
  });
});
