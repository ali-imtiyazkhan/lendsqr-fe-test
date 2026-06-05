import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { setAuthenticated } from "../../lib/auth";
import RequireAuth from "./RequireAuth";

function renderAuthRoute(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<p>Login page</p>} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<p>Protected content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("RequireAuth", () => {
  it("redirects unauthenticated users to login", () => {
    renderAuthRoute("/dashboard");

    expect(screen.getByText("Login page")).toBeInTheDocument();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("renders child routes when authenticated", () => {
    setAuthenticated();

    renderAuthRoute("/dashboard");

    expect(screen.getByText("Protected content")).toBeInTheDocument();
    expect(screen.queryByText("Login page")).not.toBeInTheDocument();
  });
});
