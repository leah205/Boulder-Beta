import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { createRoutesStub } from "react-router-dom";
import router from "@/routes.tsx";

import App from "@/App";

describe("app", () => {
  it("renders", () => {
    render(<RouterProvider router={router} />);
    expect(true).toBeTruthy();
  });
});
